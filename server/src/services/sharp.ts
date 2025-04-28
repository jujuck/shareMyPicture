// imageProcessor.ts
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs/promises";
import "dotenv/config";

const getOrientationFromBuffer = async (
  buffer: Buffer
): Promise<"portrait" | "landscape" | "square"> => {
  const metadata = await sharp(buffer).metadata();

  if (!metadata.width || !metadata.height)
    throw new Error("Impossible de lire les dimensions");

  if (metadata.width > metadata.height) return "landscape";
  if (metadata.height > metadata.width) return "portrait";
  return "square"; // au cas où c’est un carré
};

const quality = process.env.QUALITY || 90;
let index = 0;
const resizeImage = async (req: Request, res: Response, next: NextFunction) => {
  const baseWidth = 2400;
  const baseHeight = 1800;

  if (req.file?.buffer) {
    const orientation = await getOrientationFromBuffer(req.file.buffer);
    let optimizedBuffer;
    const image = sharp(req.file.buffer);
    if (orientation === "portrait") {
      optimizedBuffer = await image
        .resize({ height: baseHeight })
        .toFormat("jpeg")
        .jpeg({ quality: +quality })
        .toBuffer();
    } else {
      optimizedBuffer = await image
        .resize({ width: baseWidth })
        .toFormat("jpeg")
        .jpeg({ quality: +quality })
        .toBuffer();
    }

    const fileArray = req.file.originalname.split(".");
    const extension = fileArray.pop();
    const id = Date.now();
    req.file.filename = `${index++}-${id}.${extension}`;
    req.body.orientation = orientation;
    const outputPath = path.join(
      __dirname,
      "../../public/images",
      req.file.filename
    );

    await fs.writeFile(outputPath, optimizedBuffer);
    next();
  } else {
    res.sendStatus(422);
  }
};

export default resizeImage;
