// imports gerais
const express = require("express");
const cors = require("cors"); 

const app = express();
const port = 8000;

// imports de rotas
const categoriaRoutes = require("./src/routes/categoriaRoutes");
const leadRoutes = require("./src/routes/leadRoutes");
const unidadeRoutes = require("./src/routes/unidadeRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes");
const bannerRoutes = require("./src/routes/bannerRoutes");
const picturesRoutes = require("./src/routes/picturesRoutes");


// middleware que permite requisições de outros dominios
app.use(cors());
// middleware que traduz o json pra javascript
app.use(express.json());

// rota raiz
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// rotas das entidades
app.use("/banners", bannerRoutes);
app.use('/uploads/banners', express.static('./src/uploads/banners'));
app.use("/categorias", categoriaRoutes);
app.use("/leads",leadRoutes);
app.use("/unidades",unidadeRoutes);
app.use("/usuarios", usuarioRoutes); 
app.use("/pictures",picturesRoutes); 

// rota not found
app.use((req, res) => {
    res.status(404).send("Rota não encontrada");
});

// função que aguarda requisições
app.listen(port, () => {
    console.log(`Servidor de pé: http://localhost:${port}`);
});