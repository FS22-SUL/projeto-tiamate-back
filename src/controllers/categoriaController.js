const { executeSQL, prisma } = require("../utils");

async function buscarTodos() {
    try {
        return await prisma.categorias.findMany();
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    //     return await executeSQL("SELECT * FROM categorias;");

}

async function buscarUm(id) {
    try {
        return await prisma.categorias.findFirst({
            where: {
                categoria_id: Number(id)
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`SELECT * FROM categorias WHERE categoria_id = ${id};`);

}

async function criar(dados) {
    try {
        const req = await prisma.categorias.create({
            data: dados
        })
        if(req){
            return {
                type: "success",
                description: "Registro criado com sucesso"
            }
        }
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`INSERT INTO categorias (categoria_nome) VALUES ("${dados.categoria_nome}");`);

}

async function editar(id, dados) {
    try {
        const req = await prisma.categorias.update({
            data: dados,
            where: {
                categoria_id: Number(id)
            }
        })
        if(req){
            return {
                type: "success",
                description: "Registro atualizado com sucesso"
            }
        }
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`UPDATE categorias SET categoria_nome = "${dados.categoria_nome}" WHERE categoria_id = ${id};`);

}

async function deletar(id) {
    try {
        const req = await prisma.categorias.delete({
            where: {
                categoria_id: Number(id)
            }
        })
        if(req){
            return {
                type: "success",
                description: "Registro deletado com sucesso"
            }
        }
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    // return await executeSQL(`DELETE FROM categorias WHERE categoria_id = ${id};`);

}

module.exports = {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar
}
