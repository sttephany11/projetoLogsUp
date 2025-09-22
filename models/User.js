// src/models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";  

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomeUser: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  emailUser: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  senhaUser: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  privilegioUser: {
    type: DataTypes.ENUM("supervisor", "admin", "operador"),
    allowNull: false,
  },
});


export default User;
