import accountRouter from "./account.router";
import authRouter from "./auth.router";
const route = (app) => {
  app.use("/api", authRouter);
  app.use("/api", accountRouter);
};

export default route;
