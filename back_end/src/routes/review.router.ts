import express from "express";
import reviewControllers from "../controllers/review.controllers";
const reviewRouter = express.Router();
reviewRouter.put('/reviews/:review_id', reviewControllers.updateReview);
reviewRouter.get('/reviews', reviewControllers.getReviews);
export default reviewRouter;