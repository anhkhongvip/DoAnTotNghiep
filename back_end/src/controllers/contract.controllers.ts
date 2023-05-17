import { Review } from "./../models/Review";
import { Contract } from "./../models/Contract";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../configs/data-source";
import { Home_Day } from "./../models/Home_Day";
import { Brackets } from "typeorm";

class ContractController {
  private contractRepository: any;
  private homeDayRepository: any;
  private reviewRepository: any;

  constructor() {
    this.contractRepository = AppDataSource.getRepository(Contract);
    this.homeDayRepository = AppDataSource.getRepository(Home_Day);
    this.reviewRepository = AppDataSource.getRepository(Review);
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let contracts = await this.contractRepository.query(
        "select homes.id, homes.title, homes.address, homes.image_main, (select username from accounts where id = homes.account_id) as host, contracts.id, contracts.checkin, contracts.checkout, contracts.total_money, contracts.status, contracts.status_payment, accounts.username from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id"
      );
      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy dữ liệu thành công",
          contracts,
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

  getContractByHost = async (req: Request, res: Response) => {
    try {
      let contracts = [];
      let { status }: any = req.query;
      switch (status) {
        case "upcoming":
          contracts = await this.contractRepository.query(
            `select homes.id, homes.title, homes.address, homes.image_main, contracts.*, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where homes.account_id = ${req.userId} and DATE(contracts.checkin) > DATE(NOW())`
          );
          break;
        case "completed":
          contracts = await this.contractRepository.query(
            `select homes.id, homes.title, homes.address, homes.image_main, contracts.*, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where homes.account_id = ${req.userId} and contracts.status = 5`
          );
          break;
        case "cancelled":
          contracts = await this.contractRepository.query(
            `select homes.id, homes.title, homes.address, homes.image_main, contracts.*, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where homes.account_id = ${req.userId} and contracts.status = 3`
          );
          break;
        case "all":
          contracts = await this.contractRepository.query(
            `select homes.id, homes.title, homes.address, homes.image_main, contracts.*, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where homes.account_id = ${req.userId}`
          );
          break;
        default:
          contracts = [];
      }
      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy dữ liệu thành công",
          contracts,
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

  getContractByGuest = async (req: Request, res: Response) => {
    try {
      let contracts = [];
      let { status }: any = req.query;
      switch (status) {
        case "upcoming":
          contracts = await this.contractRepository.query(
            `select homes.id, homes.title, homes.address, homes.image_main, contracts.*, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where contracts.account_id = ${req.userId} and DATE(contracts.checkin) > DATE(NOW())`
          );
          break;
        case "confirmed":
          contracts = await this.contractRepository.query(
            `select homes.id, homes.title, homes.address, homes.image_main, contracts.*, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where contracts.account_id = ${req.userId} and contracts.status = 1`
          );
          break;
        case "cancelled":
          contracts = await this.contractRepository.query(
            `select homes.id, homes.title, homes.address, homes.image_main, contracts.*, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where contracts.account_id = ${req.userId} and contracts.status = 3`
          );
          break;
        case "all":
          contracts = await this.contractRepository.query(
            `select homes.id, homes.title, homes.address, homes.image_main, contracts.*, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where contracts.account_id = ${req.userId}`
          );
          break;
        default:
          contracts = [];
      }

      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy dữ liệu thành công",
          contracts,
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

  getContractById = async (req: Request, res: Response) => {
    try {
      let { contract_id } = req.params;
      let contract = await this.contractRepository.query(
        `select homes.id, homes.title, homes.address, homes.image_main, contracts.*, accounts.username, accounts.email, accounts.phone_number from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where contracts.id = ${contract_id}`
      );
      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy dữ liệu thành công",
          contract,
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

  findContract = async (req: Request, res: Response) => {
    try {
      let contracts = await this.contractRepository.findBy(req.query);
      return res.status(200).json({
        data: {
          status: "success",
          message: "Tìm kiếm thành công",
          contracts,
        },
      });
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

  findContractByQuery = async (req: Request, res: Response) => {
    let data = req.query;
    console.log(data);

    let contracts: any;
    if (data.status_payment === "completed-transactions") {
      if (data.typeRoom === "all") {
        contracts = await this.contractRepository.query(
          `select homes.title, homes.address, contracts.id, contracts.checkin, contracts.checkout, contracts.updated_at, contracts.total_money, contracts.status_payment, contracts.status, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where homes.account_id = ${req.userId} and contracts.status_payment != 3 and month(contracts.updated_at) >= ${data.startMonth} and year(contracts.updated_at) >= ${data.startYear} and month(contracts.updated_at) <= ${data.endMonth} and year(contracts.updated_at) <= ${data.endYear} `
        );
      } else {
        contracts = await this.contractRepository.query(
          `select homes.title, homes.address, contracts.id, contracts.checkin, contracts.checkout, contracts.updated_at, contracts.total_money, contracts.status_payment, contracts.status, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where homes.account_id = ${req.userId} and contracts.home_id = ${data.typeRoom} and contracts.status_payment != 3 and month(contracts.updated_at) >= ${data.startMonth} and year(contracts.updated_at) >= ${data.startYear} and month(contracts.updated_at) <= ${data.endMonth} and year(contracts.updated_at) <= ${data.endYear}`
        );
      }
    } else if (data.status_payment === "future-transactions") {
      if (data.typeRoom === "all") {
        contracts = await this.contractRepository.query(
          `select homes.title, homes.address, contracts.id, contracts.checkin, contracts.checkout, contracts.updated_at, contracts.total_money, contracts.status_payment, contracts.status, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where homes.account_id = ${req.userId} and (contracts.status_payment = 2 or contracts.status_payment = 3) and contracts.status != 5 and DATE(contracts.checkout) > date(NOW())`
        );
      } else {
        contracts = await this.contractRepository.query(
          `select homes.title, homes.address, contracts.id, contracts.checkin, contracts.checkout, contracts.updated_at, contracts.total_money, contracts.status_payment, contracts.status, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where homes.account_id = ${req.userId} and contracts.home_id = ${data.typeRoom} and (contracts.status_payment = 2 or contracts.status_payment = 3) and contracts.status != 5 and DATE(contracts.checkout) > date(NOW())`
        );
      }
    }
    else if(data.status_payment === 'gross-earnings') {
      contracts = await this.contractRepository.query(
        `select homes.title, homes.address, contracts.id, contracts.checkin, contracts.checkout, contracts.updated_at, contracts.total_money, contracts.status_payment, contracts.status, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where homes.account_id = ${req.userId} and contracts.status_payment != 3 and month(contracts.updated_at) >= ${data.startMonth} and year(contracts.updated_at) >= ${data.startYear} and month(contracts.updated_at) <= ${data.endMonth} and year(contracts.updated_at) <= ${data.endYear} and contracts.status = 5`
      );
    }

    res.status(200).json({
      data: {
        status: "success",
        message: "Tìm kiếm thành công",
        contracts,
      },
    });
  };

  createContract = async (req: Request, res: Response) => {
    try {
      let contract = await this.contractRepository.create({
        account_id: req.userId,
        ...req.body,
      });
      const results = await this.contractRepository.save(contract);
      res.status(200).json({
        data: {
          status: "success",
          message: "Tạo hợp đồng thành công",
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

  updateContract = async (req: Request, res: Response) => {
    try {
      let { contract_id } = req.params;
      let { status } = req.body;
      let dataUpdate = req.body;
      console.log("status", status);

      let contract = await this.contractRepository.findOneBy({
        id: contract_id,
      });
      if (status === 1) {
        let result = await this.homeDayRepository.query(
          `SELECT * FROM hotel_management.home_days where home_id = ${contract.home_id} and (time between  '${contract.checkin}' and '${contract.checkout} and status');`
        );
        if (result.length > 0) {
          return res.status(200).json({
            data: {
              status: "error",
              message: "Xác nhận không thành công, vì đã có người đặt",
            },
          });
        } else {
          await AppDataSource.getRepository(Home_Day).query(
            `call insert_ngay('${contract.checkin}', '${contract.checkout}',${contract.id}, ${contract.home_id})`
          );
        }
      } else if (status === 3) {
        await this.homeDayRepository
          .createQueryBuilder("home_days")
          .delete()
          .from(Home_Day)
          .where("contract_id = :contract_id", { contract_id })
          .execute();
      } else if (status === 5) {
        await this.homeDayRepository
          .createQueryBuilder("home_days")
          .delete()
          .from(Home_Day)
          .where("contract_id = :contract_id", { contract_id })
          .execute();
        let data = {
          contract_id: Number(contract_id),
          home_id: req.body.home_id,
          account_id: req.body.account_id,
        };
        let review = await this.reviewRepository.create({
          ...data,
        });
        let newReview = await this.reviewRepository.save(review);
        dataUpdate = { ...dataUpdate, review_id: newReview.id };
      }

      await this.contractRepository
        .createQueryBuilder()
        .update(Contract)
        .set(dataUpdate)
        .where("id = :contract_id", { contract_id })
        .execute();

      return res.status(200).json({
        data: {
          status: "success",
          message: "Cập nhật thành công",
        },
      });
    } catch (error) {
      res.status(400).json({
        data: {
          status: "error",
          message: "Cập nhật không thành công",
          error,
        },
      });
    }
  };
}

export default new ContractController();
