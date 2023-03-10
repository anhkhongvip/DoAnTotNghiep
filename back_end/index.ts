import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./src/configs/data-source";
import cors from "cors";
import route from "./src/routes";

const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

connectDB();
route(app);
app.listen(PORT, () => {
  console.log("App running on port: " + PORT);
});
