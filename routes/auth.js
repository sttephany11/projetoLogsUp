import { Router } from 'express';
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.use((req, _res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('--- /auth DEBUG ---');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body recebido:', req.body);
  }
  next();
});

router.post('/register', async (req, res) => {
  try {
    const nomeUser       = typeof req.body?.nomeUser === 'string' ? req.body.nomeUser.trim() : undefined;
    const rawEmail       = typeof req.body?.emailUser === 'string' ? req.body.emailUser : undefined;
    const senhaUserRaw   = typeof req.body?.senhaUser === 'string' ? req.body.senhaUser : undefined;
    const privilegioUser = typeof req.body?.privilegioUser === 'string' ? req.body.privilegioUser.trim() : undefined;

    const emailUser = rawEmail ? rawEmail.trim().toLowerCase() : undefined;

    if (!nomeUser || !emailUser || !senhaUserRaw || !privilegioUser) {
      return res.status(400).json({
        msg: 'Campos obrigatórios ausentes.',
        detalhes: {
          nomeUser: !!nomeUser,
          emailUser: !!emailUser,
          senhaUser: !!senhaUserRaw,
          privilegioUser: !!privilegioUser
        }
      });
    }


    const existente = await User.findOne({ where: { emailUser } });
    if (existente) {
      return res.status(409).json({ msg: 'E-mail já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senhaUserRaw, 10);

    const novo = await User.create({
      nomeUser,
      emailUser,
      senhaUser: senhaHash, 
      privilegioUser
    });

    return res.status(201).json({
      id: novo.id,
      nomeUser: novo.nomeUser,
      emailUser: novo.emailUser,
      privilegioUser: novo.privilegioUser
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Erro interno.' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const rawEmail     = typeof req.body?.emailUser === 'string' ? req.body.emailUser : undefined;
    const senhaUserRaw = typeof req.body?.senhaUser === 'string' ? req.body.senhaUser : undefined;

    const emailUser = rawEmail ? rawEmail.trim().toLowerCase() : undefined;

    if (!emailUser || !senhaUserRaw) {
      return res.status(400).json({ msg: 'Email e senha são obrigatórios.' });
    }

    const user = await User.findOne({ where: { emailUser } });
    if (!user) return res.status(401).json({ msg: 'Credenciais inválidas.' });

    const ok = await bcrypt.compare(senhaUserRaw, user.senhaUser);
    if (!ok) return res.status(401).json({ msg: 'Credenciais inválidas.' });

    const token = jwt.sign(
      { id: user.id, privilegio: user.privilegioUser },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        nomeUser: user.nomeUser,
        emailUser: user.emailUser,
        privilegioUser: user.privilegioUser
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Erro interno.' });
  }
});

export default router;
