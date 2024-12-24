import express, { Response, Request } from "express";
import upload from "../services/upload";

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
  async (_: Request, res: Response) => {
    try {
      console.log(req.file);
      console.log(req.body);
      res.status(201).json("Hello");
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

export default imagesControllers;
