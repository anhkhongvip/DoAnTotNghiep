import express from "express";
import categoryControllers from "../controllers/category.controllers";
const categoryRouter = express.Router();
categoryRouter.get('/categories', categoryControllers.getAll);

export default categoryRouter;