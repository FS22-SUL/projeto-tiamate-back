// Mocka o controller inteiro
jest.mock('../controllers/usuarioController');

const request = require('supertest');
const express = require('express');
const usuariosRouter = require('../routes/usuarioRoutes');
const controller = require('../controllers/usuarioController');

// Cria um app isolado para testar
const app = express();
app.use(express.json()); // Para permitir req.body
app.use('/usuarios', usuariosRouter);

describe('Rotas: /usuarios', () => {
    beforeEach(() => jest.clearAllMocks());

    it('GET /usuarios deve retornar lista de usuários', async () => {
        controller.buscarTodos.mockResolvedValue([{ id: 1, nome: 'João' }]);

        const res = await request(app).get('/usuarios');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 1, nome: 'João' }]);
        expect(controller.buscarTodos).toHaveBeenCalled();
    });

    it('GET /usuarios/:id deve retornar um usuário específico', async () => {
        controller.buscarUm.mockResolvedValue({ id: 2, nome: 'Maria' });

        const res = await request(app).get('/usuarios/2');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 2, nome: 'Maria' });
        expect(controller.buscarUm).toHaveBeenCalledWith('2');
    });

    it('POST /usuarios deve criar um usuário', async () => {
        const novoUsuario = { nome: 'Lucas', usuario_senha: '123' };
        controller.criar.mockResolvedValue({ id: 3, ...novoUsuario });

        const res = await request(app).post('/usuarios').send(novoUsuario);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 3, ...novoUsuario });
        expect(controller.criar).toHaveBeenCalledWith(novoUsuario);
    });

    it('PUT /usuarios/:id deve atualizar um usuário', async () => {
        const atualizado = { nome: 'Lucas Atualizado', usuario_senha: '456' };
        controller.editar.mockResolvedValue({ id: 3, ...atualizado });

        const res = await request(app).put('/usuarios/3').send(atualizado);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 3, ...atualizado });
        expect(controller.editar).toHaveBeenCalledWith('3', atualizado);
    });

    it('DELETE /usuarios/:id deve remover um usuário', async () => {
        controller.deletar.mockResolvedValue({ message: 'Removido' });

        const res = await request(app).delete('/usuarios/3');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Removido' });
        expect(controller.deletar).toHaveBeenCalledWith('3');
    });
});
