const { executeSQL, prisma } = require("../utils");

async function buscarTodos() {
    try {
        // return await executeSQL("SELECT * FROM pictures;");
        return await prisma.pictures.findMany();
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }

}

async function buscarUm(id) {
    try {
        return await prisma.pictures.findFirst({
            where: {
                lead_id: Number(id)
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`SELECT * FROM pictures WHERE lead_id = ${id};`);

}

async function criar(dados) {
    try {
        return await prisma.pictures.create({
            data: dados
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`INSERT INTO pictures (categoria_nome) VALUES ("${dados.categoria_nome}");`);

}

async function editar(id, dados) {
    try {
        return await prisma.pictures.update({
            data: dados,
            where: {
                lead_id: Number(id)
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`UPDATE pictures SET categoria_nome = "${dados.categoria_nome}" WHERE lead_id = ${id};`);

}

async function deletar(id) {
    try {
        return await prisma.pictures.delete({
            where: {
                lead_id: Number(id)
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`DELETE FROM pictures WHERE lead_id = ${id};`);

}

module.exports = {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar
}
