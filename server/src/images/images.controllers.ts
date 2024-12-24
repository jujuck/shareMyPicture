import express, { Response, Request } from "express";

const imagesControllers = express.Router();

imagesControllers.get("/", async (_: any, res: Response) => {
  try {
    res.status(200).json("Hello");
  } catch (error) {
    res.sendStatus(500);
  }
});

imagesControllers.post("/", async (_: Request, res: Response) => {
  try {
    res.status(201).json("Hello");
  } catch (error) {
    res.sendStatus(500);
  }
});

export default imagesControllers;
