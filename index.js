// imports gerais
const express = require("express");
const cors = require("cors"); 

const app = express();
const port = 8000;

const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./documentacao.json');

// imports de rotas
const categoriaRoutes = require("./src/routes/categoriaRoutes");
const leadRoutes = require("./src/routes/leadRoutes");
const unidadeRoutes = require("./src/routes/unidadeRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes");
const bannerRoutes = require("./src/routes/bannerRoutes");
const produtoRoutes = require("./src/routes/produtoRoutes");
const picturesRoutes = require("./src/routes/picturesRoutes");
const depoimentosRoutes = require("./src/routes/depoimentosRoutes")
const noticiasRoutes = require("./src/routes/noticiasRoutes");
const { login,criar } = require("./src/controllers/usuarioController");
const { rotaProtegida } = require("./src/utils");
const contatoRoutes = require("./src/routes/contatoRoutes");
const path = require("path");


// middleware que permite requisições de outros dominios
app.use(cors());
// middleware que traduz o json pra javascript
app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.get("/", (req, res) => {
    res.redirect("/docs");
});

app.post("/login", async (req, res) => {
    // #swagger.tags = ['Usuarios']
	// #swagger.description = 'Autentica um usuário'
	/*  #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $usuario_email: 'usuario@email.com',
                    $usuario_senha: '123456'
                }
        } */
	/* #swagger.responses[200] = {
            description: 'Login efetuado',
            schema: {
                usuario_nome: 'chico moedas',
                usuario_email: 'chico@gmail.com',
                token: '...'
            }
    } */
	/* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                status: 422,
                detail: 'mensagem do sistema',
                severity: 'danger'
            }
    } */
    res.send(await login(req.body));
})

// rotas das entidades

app.use("/banners", bannerRoutes);
app.use("/produtos", produtoRoutes);
app.use('/uploads/banners', express.static('./src/uploads/banners'));
app.use('/uploads/produtos', express.static('./src/uploads/produtos'));
app.use('/uploads/depoimentos', express.static('./src/uploads/depoimentos'));
app.use("/categorias", categoriaRoutes);
app.use("/leads",leadRoutes);
app.use("/unidades",unidadeRoutes);
app.use("/usuarios", rotaProtegida, usuarioRoutes); 
app.use("/banners", bannerRoutes);
app.use('/uploads/banners', express.static('./src/uploads/banners'));
app.use("/produtos", produtoRoutes);
app.use('/uploads/produtos', express.static('./src/uploads/produtos'));
app.use("/pictures",picturesRoutes); 
app.use('/uploads/pictures', express.static('./src/uploads/pictures'));
app.use("/depoimentos",depoimentosRoutes); 
app.use('/uploads/depoimentos', express.static('./src/uploads/depoimentos'));
app.use("/noticias",noticiasRoutes); 
app.use('/uploads/noticias', express.static('./src/uploads/noticias'));
app.use("/api", contatoRoutes);

// rota not found
app.use((req, res) => {
    res.status(404).send("Rota não encontrada");
});

// função que aguarda requisições
app.listen(port, () => {
    console.log(`Servidor de pé: http://localhost:${port}`);
});
