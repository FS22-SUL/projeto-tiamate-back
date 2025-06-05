const mysql = require("mysql2/promise");
const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();

async function executeSQL(comandoSQL){
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

module.exports = {
    executeSQL,
    prisma
}