import { Contract } from "./../models/Contract";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../configs/data-source";
import { Home_Day } from "./../models/Home_Day";

class ContractController {
  private contractRepository: any;

  constructor() {
    this.contractRepository = AppDataSource.getRepository(Contract);
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
      let contracts = await this.contractRepository.query(
        `select homes.id, homes.title, homes.address, homes.image_main, contracts.id, contracts.checkin, contracts.checkout, contracts.numberOfAdults,contracts.numberOfChildrens, contracts.numberOfInfants, contracts.total_money, contracts.status, contracts.status_payment, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where contracts.account_id = ${req.userId}`
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

  getContractByGuest = async (req: Request, res: Response) => {
    try {
      let contracts = await this.contractRepository.query(
        `select homes.id, homes.title, homes.address, homes.image_main, contracts.id, contracts.checkin, contracts.checkout, contracts.total_money, contracts.status, contracts.status_payment, accounts.username as user_booking from contracts left join homes on contracts.home_id = homes.id left join accounts on contracts.account_id = accounts.id where contracts.account_id = ${req.userId}`
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

  getContractById = async (req: Request, res: Response) => {
    try {
      let { contract_id } = req.params;
      let contract = await this.contractRepository.findOneBy({
        id: contract_id,
      });
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
      let contract = await this.contractRepository.findOneBy({
        id: contract_id,
      });
      if (status === 1) {
        await AppDataSource.getRepository(Home_Day).query(
          `call insert_ngay('${contract.checkin}', '${contract.checkout}',${contract.id}, ${contract.home_id})`
        );
      }

      await this.contractRepository
        .createQueryBuilder()
        .update(Contract)
        .set(req.body)
        .where("id = :contract_id", { contract_id })
        .andWhere("account_id = :account_id", { account_id: req.userId })
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
          message: "Cập nhật không thành công",
          error,
        },
      });
    }
  };
}

export default new ContractController();
