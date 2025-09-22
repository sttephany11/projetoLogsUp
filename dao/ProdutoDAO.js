import Produto from "../models/Produto.js";

class ProdutoDAO {
  // Criar produto
  static async criarProduto(nome, descricao, preco, quantidade, usuario_id) {
    return await Produto.create({ nome, descricao, preco, quantidade, usuario_id });
  }

  // Buscar todos produtos
  static async listarProdutos() {
    return await Produto.findAll({ order: [["data_criacao", "DESC"]] });
  }

  // Buscar produto por ID
  static async buscarPorId(id) {
    return await Produto.findByPk(id);
  }

  // Atualizar produto
  static async atualizarProduto(id, dados) {
    const produto = await Produto.findByPk(id);
    if (!produto) return null;
    return await produto.update(dados);
  }

  // Deletar produto
  static async deletarProduto(id) {
    const produto = await Produto.findByPk(id);
    if (!produto) return null;
    await produto.destroy();
    return true;
  }
}

export default ProdutoDAO;
