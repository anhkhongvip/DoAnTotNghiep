import express from "express";
import serviceControllers from "../controllers/service.controllers";
const serviceRouter = express.Router();
serviceRouter.get('/services', serviceControllers.getAll);
export default serviceRouter;