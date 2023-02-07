import express, { Request, Response } from "express";
import * as dotenv from 'dotenv';
import bodyParser from "body-parser";

const PORT = 8080;
const app = express();

app.use(bodyParser.json());
dotenv.config();
app.get("/", (req: Request, res: Response) => {
  res.end("<h1>Hello world!</h1>");
});

app.listen(PORT, () => {
  console.log("App running on port: " + PORT);
});
