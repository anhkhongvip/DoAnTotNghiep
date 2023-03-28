import express from "express";
import { authTokenMiddleware } from "../middlewares";
import homeControllers from "../controllers/home.controllers";
const homeRouter = express.Router();
homeRouter.post('/homes', authTokenMiddleware, homeControllers.createHome);
homeRouter.get('/homes/:room_id', homeControllers.findHomeById);
homeRouter.put('/homes/:room_id', authTokenMiddleware, homeControllers.updateHome);
homeRouter.get('/find-service/:room_id', homeControllers.findServiceByHomeId);
homeRouter.get('/find-image/:room_id', homeControllers.findImageByHomeId);
export default homeRouter;