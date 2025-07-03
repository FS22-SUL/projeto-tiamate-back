const mysql = require("mysql2/promise");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

async function executeSQL(comandoSQL) {
    const conexao = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        port: 3306,
        database: "tiamate_db"
    });

    const [result] = await conexao.query(comandoSQL);
    conexao.end();

    return result;
}

function rotaProtegida(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SEGREDO, (error) => {
            if (error) {
                res.status(401).send({
                    type: "warning",
                    description: "token inválido"
                })
            }
            next();
        });
    } else {
        res.status(403).send("Não autorizado");
    }
}

module.exports = {
    executeSQL,
    prisma,
    rotaProtegida
}