const { buscarTodos, buscarUm, criar, editar, deletar } = require("../controllers/bannerController");
const { rotaProtegida } = require("../utils");

const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send(await buscarTodos());
});

router.post("/", rotaProtegida, async(req, res) => {
    res.send(await criar(req));
});

module.exports = router;