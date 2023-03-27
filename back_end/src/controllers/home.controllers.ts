import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../configs/data-source";
import { Home } from "./../models/Home";

declare module "express-serve-static-core" {
  interface Request {
    userId: (code: number, message: string) => Response;
  }
}

class HomeController {
  private homeRepository: any;

  constructor() {
    this.homeRepository = AppDataSource.getRepository(Home);
  }

  getAll = async (req: Request, res: Response) => {
    try {
      let homes = await this.homeRepository.createQueryBuilder().getMany();
      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy dữ liệu thành công",
          homes,
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
  createHome = async (req: Request, res: Response) => {
    try {
      console.log(req.userId);
      console.log(req.body);
      let home = await this.homeRepository.create({
        account_id: req.userId,
      });
      const results = await this.homeRepository.save(home);
      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy dữ liệu thành công",
          results,
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

  updateHome = async (req: Request, res: Response) => {
    try {
      const home = await this.homeRepository.findOneBy({
        id: req.params.id,
      });
      this.homeRepository.merge(home, req.body);
      const results = await this.homeRepository(Home).save(home);

      return res.status(200).json({
        data: {
          status: "success",
          message: "Cập nhật nhà thành công",
          results,
        },
      });
    } catch (error) {
      res.status(400).json({
        data: {
          message: "Cập nhật không thành công",
          error,
        },
      });
    }
  };
}

export default new HomeController();
