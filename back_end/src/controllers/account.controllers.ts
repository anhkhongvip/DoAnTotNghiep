import { Request, Response } from "express";
import { AppDataSource } from "../configs/data-source";
import { Account } from "../models/Account";
import * as bcrypt from "bcrypt";
import { encodedToken } from "../helper/jwt.helper";

declare module "express-serve-static-core" {
  interface Request {
    userId: (code: number, message: string) => Response;
  }
}

class AccountController {
  private accountRepository: any;

  constructor() {
    this.accountRepository = AppDataSource.getRepository(Account);
  }

  register = async (req: Request, res: Response) => {
    try {
      const { username, password, email } = req.body;
      let emailExist = await this.accountRepository.findOneBy({
        email,
      });
      if (emailExist) {
        res.status(400).json({
          data: {
            message: "Email đã tồn tại",
          },
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        //Generate a password hash(salt + hash)
        const passwordHashed = await bcrypt.hash(password, salt);
        let result = await this.accountRepository.save({
          email,
          username,
          password: passwordHashed,
        });
        if (result) {
          res.status(201).json({
            data: {
              message: "Tạo tài khoản mới thành công",
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const account = await this.accountRepository.findOneBy({
        email,
      });
      if (account) {
        bcrypt.compare(password, account.password, (error, same) => {
          if (same) {
            let token = encodedToken(account.id, process.env.USER_CODE_SECRET);
            // res.cookie("authorization", "Bearer " + token, { signed: true });
            // req.session.token = token;
            // console.log(req.session.token);

            res.status(200).json({
              data: {
                status: "success",
                message: "Đăng nhập thành công",
                token: `Bearer ${token}`,
              },
            });
          } else {
            res.status(400).json({
              data: {
                status: "error",
                message: " Email hoặc mật khẩu không trùng khớp",
              },
            });
          }
        });
      } else {
        res.status(400).json({
          data: {
            status: "error",
            message: " Email hoặc mật khẩu không trùng khớp",
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };

  getAccountById = async (req: Request, res: Response) => {
    const account = await this.accountRepository.findOneBy({
      id: req.userId || req.params.id,
    });
    res.status(200).json({ account });
  };
}

export default new AccountController();
