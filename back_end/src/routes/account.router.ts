import express from "express";
import { authTokenMiddleware } from "../middlewares";
import accountControllers from "../controllers/account.controllers";
const accountRouter = express.Router();
accountRouter.get('/account', authTokenMiddleware, accountControllers.getAccountById);
accountRouter.get('/account/:id', accountControllers.getAccountById);


export default accountRouter;