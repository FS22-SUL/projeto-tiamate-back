// imports gerais
const express = require("express");
const cors = require("cors"); 

const app = express();
const port = 8000;

// imports de rotas
const categoriaRoutes = require("./src/routes/categoriaRoutes");

// middleware que traduz o json pra javascript
app.use(express.json());

// rota raiz
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// rotas das entidades
app.use("/categorias", categoriaRoutes);


// rota not found
app.use((req, res) => {
    res.status(404).send("Rota não encontrada");
});

// função que aguarda requisições
app.listen(port, () => {
    console.log(`Servidor de pé: http://localhost:${port}`);
});