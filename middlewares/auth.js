// src/middlewares/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token inválido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, privilegio: decoded.privilegio }; // Adicionando os dados decodificados no req
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Token inválido ou expirado" });
  }
};
