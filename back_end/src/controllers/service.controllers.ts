import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../configs/data-source";
import { Service } from "./../models/Services";
class ServiceController {
  private serviceRepository: any;

  constructor() {
    this.serviceRepository = AppDataSource.getRepository(Service);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let services = await this.serviceRepository
        .createQueryBuilder()
        .getMany();
      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy dữ liệu thành công",
          services,
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

export default new ServiceController();