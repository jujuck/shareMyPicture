import express, { Response, Request } from "express";
import upload from "../services/upload";
import { Images } from "./images.entities";
import resizeImage from "../services/sharp";

const imagesControllers = express.Router();

imagesControllers.get("/", async (_: any, res: Response) => {
  try {
    res.status(200).json("Hello");
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
