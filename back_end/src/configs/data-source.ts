import "reflect-metadata";
import {
  Account,
  Category,
  Home,
  Home_Day,
  Contract,
  Home_Image,
  Home_Service,
  Service,
  Review
} from "../models";

import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "hotel_management",
  synchronize: false,
  logging: false,
  entities: [
    Account,
    Category,
    Contract,
    Home,
    Home_Day,
    Home_Image,
    Home_Service,
    Service,
    Review,
  ],
  migrations: ["./dist/src/migrations/*.js"],
});

async function connectDB() {
  try {
    let connect = await AppDataSource.initialize();
    if (connect) {
      console.log("Connect DB success");
    } else {
      console.log("Connect DB fail");
    }
  } catch (error) {
    console.log(error);
  }
}

export { connectDB, AppDataSource };
