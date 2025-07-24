const { buscarTodos, buscarUm, criar, editar, deletar } = require("../controllers/depoimentosController");
const { rotaProtegida } = require("../utils");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send(await buscarTodos());
});

router.get("/:id", async (req, res) => {
    res.send(await buscarUm(req.params.id));
});

router.post("/", rotaProtegida, async(req, res) => {
    res.send(await criar(req));
});

router.post("/", rotaProtegida, async(req, res) => {
    res.send(await criar(req));
});

router.put("/:id", rotaProtegida, async(req, res) => {
    res.send(await editar(req.params.id, req));
});

router.delete("/:id", rotaProtegida, async(req, res) => {
    res.send(await deletar(req.params.id));
});

module.exports = router;