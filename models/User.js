import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomeUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailUser: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senhaUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  privilegioUser: {
    type: DataTypes.STRING,
    defaultValue: "pendente", // Status de função pendente
  },
  status: {
    type: DataTypes.ENUM("ativo", "pendente"),
    defaultValue: "pendente",
  },
});

export default User;
