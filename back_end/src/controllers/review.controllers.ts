import { Review } from "./../models/Review";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../configs/data-source";
class ReviewController {
  private reviewRepository: any;

  constructor() {
    this.reviewRepository = AppDataSource.getRepository(Review);
  }
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let reviews = await this.reviewRepository.createQueryBuilder().getMany();
      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy dữ liệu thành công",
          reviews,
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
  createReview = async (req: Request, res: Response) => {
    try {
      let review = await this.reviewRepository.create({
        ...req.body,
      });
      const results = await this.reviewRepository.save(review);
      res.status(200).json({
        data: {
          status: "success",
          message: "Tạo đánh giá thành công",
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

  updateReview = async (req: Request, res: Response) => {
    try {
      let { review_id } = req.params;
      const review = await this.reviewRepository.findOneBy({
        id: review_id,
        account_id: req.userId,
      });
      if (review) {
        this.reviewRepository.merge(review, req.body);
        await this.reviewRepository.save(review);
        res.status(200).json({
          data: {
            status: "success",
            message: "Cập nhật đánh giá thành công",
          },
        });
      } else {
        res.status(400).json({
          data: {
            status: "error",
            message: "Cập nhật không thành công",
          },
        });
      }
    } catch (error) {
      res.status(400).json({
        data: {
          status: "error",
          error,
        },
      });
    }
  };
  getReviews = async (req: Request, res: Response) => {
    try {
      let { home_id } = req.query;  
      let reviews: any;
      if (home_id) {
        reviews = await this.reviewRepository.query(`select reviews.*, accounts.username, accounts.avatar from (reviews inner join accounts on reviews.account_id = accounts.id) inner join contracts on contracts.id = reviews.contract_id where reviews.home_id = ${home_id} and contracts.status_review = 1`);
      } else {
        reviews = await this.reviewRepository.query(`select reviews.*, accounts.username, accounts.avatar from (reviews inner join accounts on reviews.account_id = accounts.id) inner join contracts on contracts.id = reviews.contract_id where contracts.status_review = 1;`);
      }

      res.status(200).json({
        data: {
          status: "success",
          message: "Lấy đánh giá thành công",
          reviews,
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

export default new ReviewController();
