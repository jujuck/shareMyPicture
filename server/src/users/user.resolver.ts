import express, { Response, Request } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { User } from "./user.entities";
import "dotenv/config";

const usersControllers = express.Router();

usersControllers.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOneByOrFail({ email });

    if (await argon2.verify(user.hash, password)) {
      const token = jwt.sign(
        { email, isConnected: true },
        process.env.SECRET_KEY as string
      );

      res
        .status(200)
        .cookie("wedding_pass", token, {
          httpOnly: true,
          secure: true,
        })
        .json({ isAdmin: true });
    } else {
      res.status(401).json({ isAdmin: false });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

export default usersControllers;
