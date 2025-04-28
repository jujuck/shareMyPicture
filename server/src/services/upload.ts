import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage(); //
// const storage = multer.diskStorage({
//   destination(_: Request, file, cb) {
//     if (file.fieldname === "images") {
//       cb(null, "public/images");
//     }
//   },
//   filename(_: Request, file, cb) {
//     console.log(file);
//     const fileArray = file.originalname.split(".");
//     const extension = fileArray.pop();
//     const id = Date.now();
//     cb(null, `${index++}-${id}.${extension}`);
//   },
// });

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (_: Request, file, cb) => {
    console.log(file);

    if (!file.mimetype.includes("image")) {
      return cb(new Error("Seules les images sont autorisées"));
    }
    cb(null, true);
  },
});

export default upload;
