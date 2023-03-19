import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../configs/data-source";
import { Category } from "./../models/Category";
class CategoryController {
  private categoryRepository: any;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let categories = await this.categoryRepository
        .createQueryBuilder()
        .getMany();
      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy dữ liệu thành công",
          categories,
        },
      });
    } catch (error) {
      res.status(400).json({
        data: {
          status: "error",
          error,
        },
      });
    }
  };
}

export default new CategoryController();
