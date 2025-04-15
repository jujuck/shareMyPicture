import express from "express";
import { Response } from "express";

import imagesControllers from "./images/images.controllers";

const router = express.Router();

router.get("/", (_, res: Response) => {
  res.send(
    "Bienvenu dans mon App de téléchargement de photo et diffusion instantannée"
  );
});

router.use("/images", imagesControllers);

export default router;
