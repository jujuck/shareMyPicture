import express, { Response, Request, NextFunction } from "express";
import upload from "../services/upload";
import { Images } from "./images.entities";
import resizeImage from "../services/sharp";
import jwt from "jsonwebtoken";

const imagesControllers = express.Router();

const checkCookies = (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = jwt.verify(
      req.cookies.wedding_pass,
      process.env.SECRET_KEY as string
    ) as { email: string; isConnected: boolean };
    if (
      payload.email === (process.env.USER_EMAIL as string) &&
      payload.isConnected
    ) {
      next();
    } else {
      throw new Error();
    }
  } catch {
    res.sendStatus(403);
  }
};

imagesControllers.get("/", checkCookies, async (_: any, res: Response) => {
  try {
    let image = await Images.createQueryBuilder("image")
      .where("image.seen = :seen", { seen: false })
      .orderBy("RANDOM()") // Ou RAND() si MySQL
      .getOne();

    // Si aucune image (toute vue, alors une en aléatoire)
    if (!image) {
      image = await Images.createQueryBuilder("image")
        .orderBy("RANDOM()") // Ou RAND() si MySQL
        .getOne();
    }

    // Si image jamais vu, changé son statut
    if (image && !image.seen) {
      image.seen = true;
      image.save();
    }

    res.status(200).json(image);
  } catch (error) {
    res.sendStatus(500);
  }
});

imagesControllers.get("/:id", async (req: Request, res: Response) => {
  try {
    const result = await Images.findOneBy({ id: req.params.id });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(422).json({ error: "Identifiant incorrect" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

imagesControllers.post(
  "/",
  upload.single("images"),
  resizeImage,
  async (req: Request, res: Response) => {
    try {
      const { name, description, tags, orientation } = req.body;
      if (req.file?.filename && name && description && tags) {
        const image = new Images();
        image.name = name;
        image.description = description;
        image.tags = tags;
        image.url = req.file?.filename;
        image.orientation = orientation;
        const result = await image.save();

        res.status(201).json(result);
      } else {
        res.sendStatus(422);
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export default imagesControllers;
