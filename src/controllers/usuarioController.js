
const { prisma } = require("../utils"); // Supondo que o prisma client esteja em ../utils

/**
 * Busca todos os usuários no banco de dados.
 */
async function buscarTodos() {
    try {
        return await prisma.usuarios.findMany();
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
}

/**
 * Busca um usuário específico pelo seu ID.
 * @param {number} id - O ID do usuário.
 */
async function buscarUm(id) {
    try {
        return await prisma.usuarios.findFirst({
            where: {
                usuario_id: Number(id) // Altera para o campo de ID do usuário
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
}

/**
 * Cria um novo usuário no banco de dados.
 * @param {object} dados - Os dados do novo usuário.
 */
async function criar(dados) {
    try {
        // IMPORTANTE: Em um projeto real, a senha deve ser criptografada aqui
        // antes de ser salva no banco de dados.
        return await prisma.usuarios.create({
            data: dados
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
}

/**
 * Atualiza os dados de um usuário existente.
 * @param {number} id - O ID do usuário a ser editado.
 * @param {object} dados - Os novos dados do usuário.
 */
async function editar(id, dados) {
    try {
        return await prisma.usuarios.update({
            data: dados,
            where: {
                usuario_id: Number(id) // Altera para o campo de ID do usuário
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
}

/**
 * Deleta um usuário do banco de dados.
 * @param {number} id - O ID do usuário a ser deletado.
 */
async function deletar(id) {
    try {
        return await prisma.usuarios.delete({
            where: {
                usuario_id: Number(id) // Altera para o campo de ID do usuário
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
}

module.exports = {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar
}
