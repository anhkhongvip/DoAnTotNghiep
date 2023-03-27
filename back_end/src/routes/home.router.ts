import express from "express";
import { authTokenMiddleware } from "../middlewares";
import homeControllers from "../controllers/home.controllers";
const homeRouter = express.Router();
homeRouter.post('/homes', authTokenMiddleware, homeControllers.createHome);

export default homeRouter;