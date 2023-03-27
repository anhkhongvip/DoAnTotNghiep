import express from "express";
import { authTokenMiddleware } from "../middlewares";
import accountControllers from "../controllers/account.controllers";
const accountRouter = express.Router();
accountRouter.get('/account', authTokenMiddleware, accountControllers.getAccountById);
accountRouter.put('/account', authTokenMiddleware, accountControllers.updateAccount);

export default accountRouter;