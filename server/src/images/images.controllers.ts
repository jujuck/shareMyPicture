import express, { Response, Request } from "express";
import upload from "../services/upload";
import { Images } from "./images.entities";

const imagesControllers = express.Router();

imagesControllers.get("/", async (_: any, res: Response) => {
  try {
    res.status(200).json("Hello");
  } catch (error) {
    res.sendStatus(500);
  }
});

imagesControllers.post(
  "/",
  upload.single("images"),
  async (req: Request, res: Response) => {
    try {
      if (req.file?.filename) {
        const { name, description, tags } = req.body;

        const image = new Images();
        image.name = name;
        image.description = description;
        image.tags = tags;
        image.url = req.file?.filename;
        const result = await image.save();
        console.log(result);
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
