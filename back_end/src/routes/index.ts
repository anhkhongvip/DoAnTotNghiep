import accountRouter from "./account.router";
import authRouter from "./auth.router";
import imageRouter from "./image.router";
const route = (app) => {
  app.use("/api", authRouter);
  app.use("/api", accountRouter);
  app.use("/api", imageRouter);
  
};

export default route;
