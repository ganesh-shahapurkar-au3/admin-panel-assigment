import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const config = {
  db: {
    type: process.env.DB_TYPE || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_DATABASE || "Product",
    synchronize: process.env.DB_SYNCHRONIZE === "true" || true,
    logging: process.env.DB_LOGGING === "true" || true,
  },
  server: {
    port: process.env.SERVER_PORT || 5000,
  },
};
