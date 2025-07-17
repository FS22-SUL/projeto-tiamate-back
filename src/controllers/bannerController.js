const { prisma } = require("../utils");//banners
const { formidable } = require("formidable");
const { promisify } = require("util");
const path = require("path");
const fs = require("fs");
const copyFileAsync = promisify(fs.copyFile);
const unlinkAsync = promisify(fs.unlink);


async function buscarTodos() {
    try {
        return await prisma.banners.findMany();
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

                if (!files.banner_imagem) {
                    resolve({
                        type: "warning",
                        description: 'O arquivo é obrigatório'
                    });
                }

                const filenameOriginal = files.banner_imagem[0].originalFilename;

                if (!filenameOriginal.includes("png") && !filenameOriginal.includes("jpg")) {
                    resolve({
                        type: "warning",
                        description: 'O arquivo precisa ser do type PNG ou JPG'
                    });
                }

                const oldpath = files.banner_imagem[0].filepath;
                const filename = filenameOriginal.split('.');
                const newFilename = `${filename[0]}-${Date.now()}.${filename[1]}`;
                const newpath = path.join(__dirname, '../uploads/banners', newFilename);

                await copyFileAsync(oldpath, newpath);
                await unlinkAsync(oldpath);

                await prisma.banners.create({
                    data: {
                        banner_nome: fields.banner_nome[0],
                        banner_link: fields.banner_link[0],
                        banner_imagem: `${req.protocol}://${req.headers.host}/uploads/banners/${newFilename}`
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

async function editar(id, req) {
    try {
        const form = formidable({});

        const resultado = new Promise((resolve, reject) => {
            form.parse(req, async (error, fields, files) => {
                if (error) {
                    resolve({
                        type: "error",
                        description: error.message
                    });
                    return;
                }

                let imagemUrl
                // Se for trocar a imagem
                if (files.banner_imagem && files.banner_imagem[0]) {
                    const file = files.banner_imagem[0];
                    const filenameOriginal = file.originalFilename.toLocaleLowerCase();


                    if (!filenameOriginal.endsWith(".png") && !filenameOriginal.endsWith(".jpg") && !filenameOriginal.endsWith(".jpeg")) {
                        resolve({
                            type: "warning",
                            description: "A imagem deve ser PNG ou JPG/JPEG"
                        });
                        return;
                    }

                    const filename = filenameOriginal.split('.');
                    const newFilename = `${filename[0]}-${Date.now()}.${filename[1]}`;
                    const oldPath = file.filepath;
                    const newPath = path.join(__dirname, '../uploads/banners', newFilename);

                    await copyFileAsync(oldPath, newPath);
                    await unlinkAsync(oldPath);

                    imagemUrl = `${req.protocol}://${req.headers.host}/uploads/banners/${newFilename}`
                }

                const data = {
                    banner_nome: fields.banner_nome[0],
                    banner_link: fields.banner_link[0],
                    banner_imagem: imagemUrl
                };

                await prisma.banners.update({
                    data,
                    where: {
                        banner_id: Number(id)
                    }
                });
                resolve({
                    type: "success",
                    description: 'Registro atualizado com sucesso!'
                });
            });
        });
        return resultado;
    } catch (error) {
        return {
            type: "error",
            description: error.message
        };
    }
}

async function deletar(id) {
    try {
        const req = await prisma.banners.delete({
            where: {
                banner_id: Number(id)
            }
        })
        if (req) {
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
}

module.exports = {
    buscarTodos,
    criar,
    editar,
    deletar
}