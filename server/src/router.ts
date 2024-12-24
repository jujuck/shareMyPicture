import express from "express";
import { Response } from "express";

const router = express.Router();

router.get("/", (_, res: Response) => {
  console.log(res);
  res.send("Hello wilders");
});

export default router;
