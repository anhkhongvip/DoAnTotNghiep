import express from "express";
import accountControllers from "../controllers/account.controllers";
const authRouter = express.Router();
authRouter.post('/auth/register', accountControllers.register);
authRouter.post('/auth/login', accountControllers.login);

export default authRouter;