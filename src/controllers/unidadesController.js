const { executeSQL, prisma } = require("../utils");

async function buscarTodos() {
    try {
        return await prisma.unidades.findMany();
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    //     return await executeSQL("SELECT * FROM unidades;");

}

async function buscarUm(id) {
    try {
        return await prisma.unidades.findFirst({
            where: {
                unidade_id: Number(id)
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`SELECT * FROM unidades WHERE unidade_id = ${id};`);

}

async function criar(dados) {
    try {
        return await prisma.unidades.create({
            data: dados
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`INSERT INTO unidades (unidade_nome) VALUES ("${dados.unidade_nome}");`);

}

async function editar(id, dados) {
    try {
        return await prisma.unidades.update({
            data: dados,
            where: {
                unidade_id: Number(id)
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`UPDATE unidades SET unidade_nome = "${dados.unidade_nome}" WHERE unidade_id = ${id};`);

}

async function deletar(id) {
    try {
        return await prisma.unidades.delete({
            where: {
                unidade_id: Number(id)
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`DELETE FROM unidades WHERE unidade_id = ${id};`);

}

module.exports = {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar
}
