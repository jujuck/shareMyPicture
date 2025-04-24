import express from "express";
import { Response } from "express";

import imagesControllers from "./images/images.controllers";
import usersControllers from "./users/user.resolver";

const router = express.Router();

router.get("/", (_, res: Response) => {
  res.send(
    "Bienvenu dans mon App de téléchargement de photo et diffusion instantannée"
  );
});

router.use("/images", imagesControllers);

router.use("/users", usersControllers);

export default router;
