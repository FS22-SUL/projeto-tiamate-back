const { buscarTodos, buscarUm, criar, editar, deletar } = require("../controllers/produtosController");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send(await buscarTodos());
});

router.post("/", async(req, res) => {
    res.send(await criar(req));
});

router.get("/:id", async (req, res) => {
    res.send(await buscarUm(req.params.id));
});

router.put("/:id", async(req, res) => {
    res.send(await editar(req.params.id, req.body));
});

router.delete("/:id", async(req, res) => {
    res.send(await deletar(req.params.id));
});

module.exports = router;