const { executeSQL, prisma } = require("../utils");

async function buscarTodos() {
    try {
        // return await executeSQL("SELECT * FROM leads;");
        return await prisma.leads.findMany();
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }

}

async function buscarUm(id) {
    try {
        return await prisma.leads.findFirst({
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
    // return await executeSQL(`SELECT * FROM leads WHERE lead_id = ${id};`);

}

async function criar(dados) {
    try {
        return await prisma.leads.create({
            data: dados
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`INSERT INTO leads (categoria_nome) VALUES ("${dados.categoria_nome}");`);

}

async function editar(id, dados) {
    try {
        return await prisma.leads.update({
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
    // return await executeSQL(`UPDATE leads SET categoria_nome = "${dados.categoria_nome}" WHERE lead_id = ${id};`);

}

async function deletar(id) {
    try {
        return await prisma.leads.delete({
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
    // return await executeSQL(`DELETE FROM leads WHERE lead_id = ${id};`);

}

module.exports = {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar
}
