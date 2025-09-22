// config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // carrega as variáveis do .env

const sequelize = new Sequelize(
  process.env.DB_NAME,      // bdproduto
  process.env.DB_USER,      // root
  process.env.DB_PASSWORD,  // senha
  {
    host: process.env.DB_HOST, // localhost
    port: process.env.DB_PORT, // 3306
    dialect: "mysql",
    logging: false
  }
);

export default sequelize;
