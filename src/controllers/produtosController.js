const { prisma } = require("../utils");
const { formidable } = require("formidable");
const { promisify } = require("util");
const path = require("path");
const fs = require("fs");
const copyFileAsync = promisify(fs.copyFile);
const unlinkAsync = promisify(fs.unlink);


async function buscarTodos() {
    try {
        return await prisma.produtos.findMany();
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }

}

async function buscarUm(id) {
    try {
        return await prisma.produtos.findFirst({
            where: {
               produto_id: Number(id)
            }
        })
    } catch (error) {
        return {
            type: "error",
            description: error.message
        }
    }
    

}

async function criar(req) {
    try {
        const form = formidable({});

        const resultado = new Promise((resolve, reject) => {
            form.parse(req, async (error, fields, files) => {
                if (error) {
                    resolve({
                        type: "error",
                        description: error.message
                    });
                }
               


                if (!files.produto_imagem || !files.produto_imagem[0]) {
                    resolve({
                        type: "warning",
                        description: 'A imagem do produto é obrigatória'
                    });
                }


                const filenameOriginal = files.produto_imagem[0].originalFilename;


                if (!filenameOriginal.includes("png") && !filenameOriginal.includes("jpg")) {
                    resolve({
                        type: "warning",
                        description: 'A imagem precisa ser PNG ou JPG'
                    });
                }

                const oldpath = files.produto_imagem[0].filepath;
                const filename = filenameOriginal.split('.');
                const newFilename = `${filename[0]}-${Date.now()}.${filename[1]}`;
                const newpath = path.join(__dirname, '../uploads/produtos', newFilename);

                await copyFileAsync(oldpath, newpath);
                await unlinkAsync(oldpath);

                

                await prisma.produtos.create({
                    data: {
                        produto_nome: fields.produto_nome[0],
                        produto_preco: parseFloat(fields.produto_preco[0]),
                        produto_descricao: fields.produto_descricao[0],
                        produto_imagem: `${req.protocol}://${req.headers.host}/uploads/produtos/${newFilename}`,
                        categoria_id: parseInt(fields.categoria_id[0])
                    }
                });
                resolve({
                    type: "success",
                    description: 'Registro criado com sucesso!'
                });
            });

        })
        return resultado;
    } catch (error) {
        return {
            type: "error",
            description: error.message
        };
    }
}

async function editar(id, dados) {
    try {
        return await prisma.produtos.update({
            data: dados,
            where: {
                produto_id: Number(id)
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
        return await prisma.produtos.delete({
            where: {
                produto_id: Number(id)
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
    criar,
    buscarUm,
    editar,
    deletar
}