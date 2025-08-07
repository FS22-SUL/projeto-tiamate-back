jest.mock('../utils', () => require('../__mocks__/prisma'));
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const controller = require('../controllers/usuarioController');
const { prisma } = require('../utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('Controller: usuarios', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('buscarTodos', () => {
        it('deve retornar todos os usuários', async () => {
            const mockUsers = [{ id: 1, nome: 'João' }];
            prisma.usuarios.findMany.mockResolvedValue(mockUsers);

            const result = await controller.buscarTodos();
            expect(result).toEqual(mockUsers);
        });

        it('deve retornar erro em caso de falha', async () => {
            prisma.usuarios.findMany.mockRejectedValue(new Error('Erro no banco'));

            const result = await controller.buscarTodos();
            expect(result).toEqual({
                type: 'error',
                description: 'Erro no banco'
            });
        });
    });

    describe('buscarUm', () => {
        it('deve retornar um usuário pelo ID', async () => {
            const mockUser = { usuario_id: 1, nome: 'Maria' };
            prisma.usuarios.findFirst.mockResolvedValue(mockUser);

            const result = await controller.buscarUm(1);
            expect(result).toEqual(mockUser);
        });
    });

    describe('criar', () => {
        it('deve criar um usuário com senha criptografada', async () => {
            const dados = { usuario_nome: 'Ana', usuario_senha: '123' };
            bcrypt.hash.mockResolvedValue('hashed_password');
            prisma.usuarios.create.mockResolvedValue({ id: 1, ...dados });

            const result = await controller.criar(dados);
            expect(bcrypt.hash).toHaveBeenCalledWith('123', 10);
            expect(prisma.usuarios.create).toHaveBeenCalledWith({
                data: { ...dados, usuario_senha: 'hashed_password' }
            });
        });
    });

    describe('editar', () => {
        it('deve editar os dados de um usuário', async () => {
            const dados = { usuario_nome: 'Pedro', usuario_email: 'pedro@email.com', usuario_senha: '456' };
            bcrypt.hash.mockResolvedValue('hashed456');
            prisma.usuarios.update.mockResolvedValue({ usuario_id: 1, ...dados, usuario_senha: 'hashed456' });

            const result = await controller.editar(1, dados);
            expect(result).toEqual({ 
                usuario_id: 1, 
                usuario_nome: 'Pedro',
                usuario_email: 'pedro@email.com',
                usuario_senha: 'hashed456' 
            });
        });
    });

    describe('deletar', () => {
        it('deve deletar um usuário pelo ID', async () => {
            prisma.usuarios.delete.mockResolvedValue({ usuario_id: 1 });

            const result = await controller.deletar(1);
            expect(result).toEqual({ usuario_id: 1 });
        });
    });

    describe('login', () => {
        it('deve retornar token e dados do usuário se login for válido', async () => {
            const dados = { usuario_email: 'ana@email.com', usuario_senha: '123' };
            const usuarioMock = {
                usuario_id: 1,
                usuario_email: dados.usuario_email,
                usuario_nome: 'Ana',
                usuario_senha: 'hashed'
            };

            prisma.usuarios.findFirst.mockResolvedValue(usuarioMock);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('token_mockado');

            const result = await controller.login(dados);
            expect(result).toEqual({
                token: 'token_mockado',
                usuario: {
                    usuario_nome: 'Ana',
                    usuario_email: 'ana@email.com'
                }
            });
        });

        it('deve retornar warning se a senha for inválida', async () => {
            prisma.usuarios.findFirst.mockResolvedValue({ usuario_senha: 'hash_incorreto' });
            bcrypt.compare.mockResolvedValue(false);

            const result = await controller.login({
                usuario_email: 'teste@teste.com',
                usuario_senha: 'senhaerrada'
            });

            expect(result).toEqual({
                type: 'warning',
                description: 'usuário ou senha incorreto'
            });
        });

        it('deve retornar warning se usuário não existir', async () => {
            prisma.usuarios.findFirst.mockResolvedValue(null);

            const result = await controller.login({
                usuario_email: 'naoexiste@teste.com',
                usuario_senha: '123'
            });

            expect(result).toEqual({
                type: 'warning',
                description: 'usuário ou senha incorreto'
            });
        });

        it('deve retornar erro em caso de falha', async () => {
            prisma.usuarios.findFirst.mockRejectedValue(new Error('Falha'));

            const result = await controller.login({
                usuario_email: 'teste@teste.com',
                usuario_senha: '123'
            });

            expect(result).toEqual({
                type: 'error',
                description: 'Falha'
            });
        });
    });
});