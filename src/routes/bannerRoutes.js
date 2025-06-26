const { buscarTodos, buscarUm, criar, editar, deletar } = require("../controllers/bannerController");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send(await buscarTodos());
});

router.post("/", async(req, res) => {
    res.send(await criar(req));
});

module.exports = router;