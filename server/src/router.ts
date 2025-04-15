import express from "express";
import { Response } from "express";
const path = require("path");
import imagesControllers from "./images/images.controllers";

const router = express.Router();

router.get("/", (_, res: Response) => {
  res.send(
    "Bienvenu dans mon App de téléchargement de photo et diffusion instantannée"
  );
});

router.use("/images", imagesControllers);

const publicFolderPath = path.join(__dirname, "/../public");
router.get("*.*", express.static(publicFolderPath, { maxAge: "1y" }));

export default router;
