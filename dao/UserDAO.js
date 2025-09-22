import User from "../models/User.js";
import bcrypt from "bcryptjs";

class UserDAO {
  // Criar usuário
  static async criarUsuario(nome, email, senha, privilegio) {
    const hash = await bcrypt.hash(senha, 10);
    return await User.create({
      nomeUser: nome,
      emailUser: email,
      senhaUser: hash,
      privilegioUser: privilegio
    });
  }

  // Buscar usuário pelo email
  static async buscarPorEmail(email) {
    return await User.findOne({ where: { emailUser: email } });
  }

  // Buscar usuário pelo Id
  static async buscarPorId(id) {
    return await User.findByPk(id);
  }
}

export default UserDAO;
