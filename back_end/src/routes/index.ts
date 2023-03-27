import { Application } from "express";
import accountRouter from "./account.router";
import authRouter from "./auth.router";
import imageRouter from "./image.router";
import categoryRouter from "./category.router";
import homeRouter from "./home.router";

const route = (app: Application) => {
  app.use("/api", authRouter);
  app.use("/api", accountRouter);
  app.use("/api", imageRouter);
  app.use("/api", categoryRouter);
  app.use("/api", homeRouter);
};

export default route;
