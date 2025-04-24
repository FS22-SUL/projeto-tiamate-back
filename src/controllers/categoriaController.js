const { executeSQL } = require("../utils");

async function buscarTodos() {
    return await executeSQL("SELECT * FROM categorias;");
}

async function buscarUm(id) {
    return await executeSQL(`SELECT * FROM categorias WHERE categoria_id = ${id};`);
}

async function criar(dados) {
    return await executeSQL(`INSERT INTO categorias (categoria_nome) VALUES ("${dados.categoria_nome}");`);
}

async function editar(id, dados) {
    return await executeSQL(`UPDATE categorias SET categoria_nome = "${dados.categoria_nome}" WHERE categoria_id = ${id};`);
}

async function deletar(id) {
    return await executeSQL(`DELETE FROM categorias WHERE categoria_id = ${id};`);
}

module.exports = {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar
}
