import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'mysql',
});

// Função async testa a conexão 
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados bem-sucedida');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
  }
}

testConnection();

export default sequelize;
