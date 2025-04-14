import multer from "multer";
import { Request } from "express";

let index = 0;
const storage = multer.diskStorage({
  destination(_: Request, file, cb) {
    if (file.fieldname === "images") {
      cb(null, "public/images");
    }
  },
  filename(_: Request, file, cb) {
    const fileArray = file.originalname.split(".");
    const extension = fileArray.pop();
    const id = Date.now();
    cb(null, `${index++}-${id}.${extension}`);
  },
});

const upload = multer({ storage });

export default upload;
