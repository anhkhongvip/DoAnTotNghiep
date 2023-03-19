import accountRouter from "./account.router";
import authRouter from "./auth.router";
import imageRouter from "./image.router";
import categoryRouter from "./category.router";
const route = (app: any) => {
  app.use("/api", authRouter);
  app.use("/api", accountRouter);
  app.use("/api", imageRouter);
  app.use("/api", categoryRouter);
};

export default route;
