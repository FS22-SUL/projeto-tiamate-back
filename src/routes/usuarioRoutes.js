// Importa as funções do controller de usuários
const { buscarTodos, buscarUm, criar, editar, deletar } = require("../controllers/usuarioController");
const { rotaProtegida } = require("../utils");

// Inicializa o roteador do Express
const router = require("express").Router();

// Rota para listar todos os usuários
router.get("/", rotaProtegida, async (req, res) => {
    res.send(await buscarTodos());
});

// Rota para buscar um usuário específico pelo ID
router.get("/:id", async (req, res) => {
    res.send(await buscarUm(req.params.id));
});

// Rota para criar um novo usuário
router.post("/", async(req, res) => {
    res.send(await criar(req.body));
});

// Rota para atualizar um usuário existente
router.put("/:id", async(req, res) => {
    res.send(await editar(req.params.id, req.body));
});

// Rota para deletar um usuário
router.delete("/:id", async(req, res) => {
    res.send(await deletar(req.params.id));
});

module.exports = router;