import express from "express";
import Produto from "../models/Produto.js";  // Modelo de Produto (sequelize)
import { verificarToken } from "../middlewares/auth.js";  // Middleware para verificação de token

const router = express.Router();

// GET /api/produtos 
router.get("/", verificarToken, async (req, res) => {
  try {
    const produtos = await Produto.findAll();  

  
    if (!produtos || produtos.length === 0) {
      return res.status(404).json({ msg: "Nenhum produto encontrado." });
    }

   
    res.json(produtos); 
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ msg: "Erro ao carregar os produtos." });
  }
});


// POST /api/produtos 
router.post("/", verificarToken, async (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;

 
  if (!nome || !descricao || !preco || !quantidade) {
    return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
  }

  try {
  
    const novoProduto = await Produto.create({
      nome,
      descricao,
      preco,
      quantidade,
      usuario_id: req.user.id, 
    });

    res.status(201).json({
      msg: "Produto criado com sucesso",
      produto: novoProduto,
    });
  } catch (err) {
    console.error("Erro ao criar produto:", err); 
    res.status(500).json({ msg: "Erro ao criar o produto." });
  }
});



// PUT /api/produtos/:id 
router.put("/:id", verificarToken, async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade } = req.body;

  if (!["supervisor", "administrador"].includes(req.user.privilegio)) {
    return res.status(403).json({ msg: "Você não tem permissão para editar produtos." });
  }

  if (!nome || !descricao || !preco || !quantidade) {
    return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
  }

  try {
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ msg: "Produto não encontrado." });
    }

    
    await produto.update({ nome, descricao, preco, quantidade });

    res.json({ msg: "Produto atualizado com sucesso", produto });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ msg: "Erro ao atualizar o produto." });
  }
});


// DELETE /api/produtos/:id 
router.delete("/:id", verificarToken, async (req, res) => {
  const { id } = req.params; // O ID do produto vem da URL

  if (!["supervisor", "administrador"].includes(req.user.privilegio)) {
    return res.status(403).json({ msg: "Você não tem permissão para excluir produtos." });
  }

  try {
   
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ msg: "Produto não encontrado." });
    }

  
    await produto.destroy();
    res.json({ msg: "Produto excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir produto:", err);
    res.status(500).json({ msg: "Erro ao excluir o produto." });
  }
});


export default router;
