import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js'; 
import authRouter from './routes/auth.js';
import { verificarToken } from './middlewares/auth.js';
import produtosRoutes from './routes/produto.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// roota publica
app.use('/auth', authRouter);

// Rota de produtos 
app.use('/api/produtos', produtosRoutes);

// rota protegida
app.get('/me', verificarToken, (req, res) => {
  res.json({ msg: 'ok', user: req.user });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log('✅ Models sincronizados');
    console.log(`🚀 API rodando: http://localhost:${PORT}`);
  } catch (e) {
    console.error('❌ Erro ao iniciar:', e);
  }
});
