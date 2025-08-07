const jwt = require('jsonwebtoken');
const { rotaProtegida } = require('../utils'); // ajuste o caminho se necessário
const httpMocks = require('node-mocks-http');

jest.mock('jsonwebtoken');

describe('Middleware: rotaProtegida', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    it('deve chamar next() se o token for válido', () => {
        req.headers.authorization = 'Bearer token_valido';

        jwt.verify.mockImplementation((token, segredo, callback) => {
            callback(null); // sem erro → token válido
        });

        rotaProtegida(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('token_valido', process.env.SEGREDO, expect.any(Function));
        expect(next).toHaveBeenCalled();
    });

    it('deve retornar 401 se o token for inválido', () => {
        req.headers.authorization = 'Bearer token_invalido';

        jwt.verify.mockImplementation((token, segredo, callback) => {
            callback(new Error('Token inválido'));
        });

        rotaProtegida(req, res, next);

        const data = JSON.parse(res._getData());

        expect(res.statusCode).toBe(401);
        expect(data).toEqual({
            type: 'warning',
            description: 'token inválido'
        });
    });

    it('deve retornar 403 se não houver token', () => {
        rotaProtegida(req, res, next);

        expect(res.statusCode).toBe(403);
        expect(JSON.parse(res._getData())).toEqual({
            type: 'warning',
            description: 'Não autorizado'
        });
        expect(next).not.toHaveBeenCalled();
    });
});
