// src/models/Produto.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 

const Produto = sequelize.define('Produto', {
  IdProduto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data_criacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Produto',
  timestamps: false
});

export default Produto;
