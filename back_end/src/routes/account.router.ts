import express from "express";
import { authTokenMiddleware } from "../middlewares";
import accountControllers from "../controllers/account.controllers";
const accountRouter = express.Router();
accountRouter.get('/accounts', authTokenMiddleware, accountControllers.getAccountById);
accountRouter.put('/accounts', authTokenMiddleware, accountControllers.updateAccount);

export default accountRouter;