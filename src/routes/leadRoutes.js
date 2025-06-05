const { buscarTodos, buscarUm, criar, editar, deletar } = require("../controllers/leadsController");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send(await buscarTodos());
});

router.get("/:id", async (req, res) => {
    res.send(await buscarUm(req.params.id));
});

router.post("/", async(req, res) => {
    res.send(await criar(req.body));
});

router.put("/:id", async(req, res) => {
    res.send(await editar(req.params.id, req.body));
});

router.delete("/:id", async(req, res) => {
    res.send(await deletar(req.params.id));
});

module.exports = router;