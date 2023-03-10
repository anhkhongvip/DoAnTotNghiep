import { NextFunction, Request, Response } from "express";
import { decodedToken } from "../helper/jwt.helper";

declare module "express-serve-static-core" {
  interface Request {
    userId: (code: number, message: string) => Response;
  }
}

export const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let decoded = decodedToken(token, process.env.USER_CODE_SECRET);
      req.userId = decoded.sub;
      next();
    } else {
      res.status(401).json({ status: "error", message: "Unauthorized" });
    }
  } catch (err) {
    res.status(400).json({ status: "error", err });
  }
};
