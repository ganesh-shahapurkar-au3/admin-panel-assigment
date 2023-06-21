import { DataSource } from "typeorm";
import { Product } from "../Entity/Prodcut";
import { config } from "../ormconfig";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.db.synchronize,
  logging: config.db.logging,
  entities: [Product],
});

AppDataSource.initialize().then(() => {
  try {
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
});
