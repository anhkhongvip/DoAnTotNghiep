import express from "express";
import homeDayController from "../controllers/homeDay.controllers";
const homeDayRouter = express.Router();
homeDayRouter.get('/home-days/:home_id', homeDayController.getHomeDayByHomeId);

export default homeDayRouter;