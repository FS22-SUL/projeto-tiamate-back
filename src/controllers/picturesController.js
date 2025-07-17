const { prisma } = require("../utils");
const { formidable } = require("formidable");
const { promisify } = require("util");
const path = require("path");
const fs = require("fs");
const copyFileAsync = promisify(fs.copyFile);
const unlinkAsync = promisify(fs.unlink);


async function buscarTodos() {
    try {
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
                picture_id: Number(id)
            }
        });
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

                if (!files.picture_imagem) {
                    resolve({
                        type: "warning",
                        description: 'O arquivo é obrigatório'
                    });
                }

                const filenameOriginal = files.picture_imagem[0].originalFilename;

                if (!filenameOriginal.includes("png") && !filenameOriginal.includes("jpg")) {
                    resolve({
                        type: "warning",
                        description: 'O arquivo precisa ser do type PNG ou JPG'
                    });
                }

                const oldpath = files.picture_imagem[0].filepath;
                const filename = filenameOriginal.split('.');
                const newFilename = `${filename[0]}-${Date.now()}.${filename[1]}`;
                const newpath = path.join(__dirname, '../uploads/pictures', newFilename);

                await copyFileAsync(oldpath, newpath);
                await unlinkAsync(oldpath);

                await prisma.pictures.create({
                    data: {
                        picture_nome: fields.picture_nome[0],
                        picture_imagem: `${req.protocol}://${req.headers.host}/uploads/pictures/${newFilename}`
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
                if (files.picture_imagem && files.picture_imagem[0]) {
                    const file = files.picture_imagem[0];
                    const filenameOriginal = file.originalFilename.toLocaleLowerCase();


                    if (!filenameOriginal.endsWith(".png") && !filenameOriginal.endsWith(".jpg") && !filenameOriginal.endsWith(".jpeg")) {
                        resolve({
                            type: "warning",
                            description: "A imagem deve ser PNG ou JPG/JPEG"
                        });
                        return;
                    }

                    const ext = path.extname(filenameOriginal);
                    const name = path.basename(filenameOriginal, ext);
                    const newFilename = `${name}-${Date.now()}${ext}`;
                    const oldPath = file.filepath;
                    const newPath = path.join(__dirname, '../uploads/pictures', newFilename);

                    await copyFileAsync(oldPath, newPath);
                    await unlinkAsync(oldPath);

                    imagemUrl = `${req.protocol}://${req.headers.host}/uploads/pictures/${newFilename}`
                }

                const data = {
                    picture_nome: fields.picture_nome[0],
                    picture_imagem: imagemUrl
                };

                await prisma.pictures.update({
                    data,
                    where: {
                        picture_id: Number(id)
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
        return await prisma.pictures.delete({
            where: {
                picture_id: Number(id)
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