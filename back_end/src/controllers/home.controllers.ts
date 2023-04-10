import { Home_Image } from "./../models/Home_Image";
import { Home_Service } from "./../models/Home_Service";
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

  getHomeByAccountId = async (req: Request, res: Response) => {
    try {
      let homes = await this.homeRepository.findBy({
        account_id: req.userId,
      });
      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy dữ liệu thành công",
          homes,
        },
      });
    } catch (error) {
      console.log(error);

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
    let { listServiceSelect, stepProgress } = req.body;
    try {
      const home = await this.homeRepository.findOneBy({
        id: req.params.room_id,
        account_id: req.userId,
      });
      if (home) {
        if (listServiceSelect) {
          let values: any = [];
          await AppDataSource.getRepository(Home_Service)
            .createQueryBuilder()
            .delete()
            .from(Home_Service)
            .where("home_id = :home_id", { home_id: req.params.room_id })
            .execute();
          values = listServiceSelect.map((item) => {
            return { service_id: item, home_id: req.params.room_id };
          });

          await AppDataSource.getRepository(Home_Service)
            .createQueryBuilder()
            .insert()
            .into(Home_Service)
            .values(values)
            .execute();

          this.homeRepository.merge(home, { stepProgress });
          await this.homeRepository.save(home);
          return res.status(200).json({
            data: {
              status: "success",
              message: "Cập nhật nhà thành công",
            },
          });
        } else if (req.body.bannerThumb && req.body.imageList) {
          let { bannerThumb, imageList, stepProgress } = req.body;
          let { url: image_main, public_id } = bannerThumb;
          let values: any = [];
          await AppDataSource.getRepository(Home_Image)
            .createQueryBuilder()
            .delete()
            .from(Home_Image)
            .where("home_id = :home_id", { home_id: req.params.room_id })
            .execute();

          values = imageList.map((item: any) => {
            return {
              url: item.url,
              public_id: item.public_id,
              home_id: req.params.room_id,
            };
          });

          this.homeRepository.merge(home, {
            image_main,
            public_id,
            stepProgress,
          });
          await this.homeRepository.save(home);

          await AppDataSource.getRepository(Home_Image)
            .createQueryBuilder()
            .insert()
            .into(Home_Image)
            .values(values)
            .execute();

          return res.status(200).json({
            data: {
              status: "success",
              message: "Cập nhật nhà thành công",
            },
          });
        } else {
          this.homeRepository.merge(home, req.body);
          await this.homeRepository.save(home);
          return res.status(200).json({
            data: {
              status: "success",
              message: "Cập nhật nhà thành công",
            },
          });
        }
      } else {
        res.status(400).json({
          data: {
            message: "Cập nhật không thành công",
            error: "Fobbiden",
          },
        });
      }
    } catch (error) {
      console.log(error);

      res.status(400).json({
        data: {
          message: "Cập nhật không thành công",
          error,
        },
      });
    }
  };

  findHomeById = async (req: Request, res: Response) => {
    try {
      const home = await this.homeRepository.findOneBy({
        id: req.params.room_id,
      });
      if (home) {
        return res.status(200).json({
          data: {
            status: "success",
            message: "Find successfully",
            home,
          },
        });
      } else {
        res.status(200).json({
          data: {
            status: "success",
            message: "Not found",
            home: [],
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        data: {
          message: "Cập nhật không thành công",
          error,
        },
      });
    }
  };

  findHomes = async (req: Request, res: Response) => {
    try {
      let homes = await this.homeRepository.findBy(req.query);
      return res.status(200).json({
        data: {
          status: "success",
          message: "Tìm kiếm thành công",
          homes,
        },
      });
      ///const homes = await this.homeRepository.query(``);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        data: {
          message: "Lỗi",
          error,
        },
      });
    }
  };

  findServiceByHomeId = async (req: Request, res: Response) => {
    try {
      const service = await AppDataSource.getRepository(Home_Service).query(
        `select * from home_services inner join services on home_services.service_id = services.id where home_services.home_id = ${Number(
          req.params.room_id
        )}`
      );

      if (service) {
        return res.status(200).json({
          data: {
            status: "success",
            message: "Find successfully",
            service,
          },
        });
      } else {
        res.status(200).json({
          data: {
            status: "success",
            message: "Not found",
            service: [],
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        data: {
          message: "Cập nhật không thành công",
          error,
        },
      });
    }
  };
  findImageByHomeId = async (req: Request, res: Response) => {
    try {
      const images = await AppDataSource.getRepository(Home_Image).findBy({
        home_id: Number(req.params.room_id),
      });
      if (images) {
        return res.status(200).json({
          data: {
            status: "success",
            message: "Find successfully",
            images,
          },
        });
      } else {
        res.status(200).json({
          data: {
            status: "success",
            message: "Not found",
            images: [],
          },
        });
      }
    } catch (error) {
      console.log(error);
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
