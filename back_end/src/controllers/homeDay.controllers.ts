import { Request, Response } from "express";
import { AppDataSource } from "../configs/data-source";
import { Home_Day } from "./../models/Home_Day";

class HomeDayController {
  private homeDayRepository: any;
  constructor() {
    this.homeDayRepository = AppDataSource.getRepository(Home_Day);
  }
  getHomeDayByHomeId = async (req: Request, res: Response) => {
    try {
      let { home_id } = req.params;
      let home_days = await this.homeDayRepository.find({
        home_id,
      });
      res.status(200).json({
        status: 'success',
        message: 'Lấy dữ liệu thành công',
        home_days,
      });
    } catch (error) {}
  };
}

export default new HomeDayController();
