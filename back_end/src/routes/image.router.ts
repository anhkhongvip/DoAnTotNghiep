import express from "express";
import multer from "multer";
import imageControllers from "../controllers/image.controllers";
const storage = multer.diskStorage({});
const upload = multer({ storage });

const imageRouter = express.Router();
imageRouter.post(
  "/upload",
  upload.single("image"),
  imageControllers.uploadImageCloud
);

imageRouter.delete("/upload/:folder/:public_id", imageControllers.deleteImageCloud);

export default imageRouter;
