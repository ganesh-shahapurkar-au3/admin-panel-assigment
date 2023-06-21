import { Request } from "express";
import path from "path";
import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, "src/dist/ecom-admin-panel/assets/images");
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, `image-${Date.now()}` + path.extname(file.originalname));
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: Function
) => {
  if (!file.originalname.match(/\.(png|jpg)$/)) {
    return cb(new Error("Please upload a Image"));
  }
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export default upload;
