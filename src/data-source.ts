import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource =
  process.env.NODE_ENV === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory",
        entities: ["src/entities/**/*.ts"],
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL,
        // ssl: { rejectUnauthorized: false },
        logging: false,
        entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
        migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
      });
