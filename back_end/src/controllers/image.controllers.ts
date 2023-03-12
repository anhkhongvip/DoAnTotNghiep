import { Request, Response, NextFunction } from "express";
import { cloudinary } from "../configs/uploadCloud";

class ImageController {
  uploadImageCloud = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "images",
      });
      return res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "Upload fail",
        err,
      });
    }
  };

  deleteImageCloud = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { folder, public_id } = req.params;
      await cloudinary.uploader.destroy(`${folder}/${public_id}`);
      return res.status(200).json({
        data: {
          message: "Delete image success",
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        data: {
          message: "Delete image fail",
          err,
        },
      });
    }
  };
}

export default new ImageController();
