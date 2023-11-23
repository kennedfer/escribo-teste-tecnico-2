import assert from 'assert';
import supertest from 'supertest';

import { FASTIFY } from '../app.js';
import { Users } from '../models/models.js';
import { SIGNUP_DATA, LOGIN_DATA, WRONG_LOGIN_DATA } from './utils/integration-test-utils.js';

/**
 * Encerra a instância do Fastify após todos os testes.
 * @function
 * @returns {void}
 */
after(() => {
    FASTIFY.close();
});

/**
 * Inicializa o Fastify antes de executar os testes.
 * @function
 * @returns {Promise<void>}
 */
before(async () => await FASTIFY.ready());

/**
 * Conjunto de testes de integração.
 * @group Integration Tests
 */
describe('Testes de Integração:', () => {
    /**
     * Teste ponto a ponto.
     * @memberof Integration Tests
     * @group Teste Point-to-Point:
     */
    describe('Teste Point-to-Point:', () => {
        let token;
        let userId;

        /**
         * Testa o processo de cadastro de um novo usuário usando POST /signup.
         * @function
         * @async
         * @memberof Teste Point-to-Point:
         * @name Deve cadastrar um novo usuário usando POST /signup
         * @returns {Promise<void>}
         */
        it('Deve cadastrar um novo usuário usando POST /signup', async () => {
            const response = await supertest(FASTIFY.server)
                .post('/signup')
                .send(SIGNUP_DATA);

            userId = response.body.id;
            assert.strictEqual(response.status, 201);
            assert.ok(response.body.token); // Garante que o token está presente na resposta
        });

        /**
         * Testa o processo de login usando POST /login.
         * @function
         * @async
         * @memberof Teste Point-to-Point:
         * @name Deve realizar o login usando POST /login
         * @returns {Promise<void>}
         */
        it('Deve realizar o login usando POST /login', async () => {
            const response = await supertest(FASTIFY.server)
                .post('/login')
                .send(LOGIN_DATA);

            assert.strictEqual(response.status, 200);
            assert.ok(response.body.token); // Garante que o token está presente na resposta
            token = response.body.token; // Armazena o token para uso posterior
        });

        /**
         * Testa a obtenção de informações básicas do usuário usando GET /user.
         * @function
         * @async
         * @memberof Teste Point-to-Point:
         * @name Deve obter informações básicas do usuário usando GET /user
         * @returns {Promise<void>}
         */
        it('Deve obter informações básicas do usuário usando GET /user', async () => {
            const response = await supertest(FASTIFY.server)
                .get('/user')
                .set('Authorization', `Bearer ${token}`); // Adiciona o token ao cabeçalho de autorização

            await Users.findByIdAndDelete(userId);// Delata o user para que futuros testes não falhem
            assert.strictEqual(response.status, 200);
        });
    });

    /**
     * Teste para verificar o tratamento de erro ao cadastrar com um e-mail já cadastrado.
     * @memberof Integration Tests
     * @group Teste Email Não Cadastrado:
     */
    describe('Teste Email Já Cadastrado:', () => {
        let userId;

        /**
         * Testa o processo de cadastro de um novo usuário usando POST /signup.
         * @function
         * @async
         * @memberof Teste Email Não Cadastrado:
         * @name Deve cadastrar um novo usuário usando POST /signup
         * @returns {Promise<void>}
         */
        it('Deve cadastrar um novo usuário usando POST /signup', async () => {
            const response = await supertest(FASTIFY.server)
                .post('/signup')
                .send(SIGNUP_DATA);

            userId = response.body.id;
            assert.strictEqual(response.status, 201);
            assert.ok(response.body.token); // Garante que o token está presente na resposta
        });

        /**
         * Testa o tratamento de erro ao tentar cadastrar com um e-mail já usado em POST /signup.
         * @function
         * @async
         * @memberof Teste Email Não Cadastrado:
         * @name Deve receber um erro http 409 ao tentar cadastrar com email já usado em POST /signup
         * @returns {Promise<void>}
         */
        it('Deve receber um erro http 409 ao tentar cadastrar com email já usado em POST /signup', async () => {
            const response = await supertest(FASTIFY.server)
                .post('/signup')
                .send(SIGNUP_DATA);

            await Users.findByIdAndDelete(userId);// Delata o user para que futuros testes não falhem
            assert.strictEqual(response.status, 409);
            // Garante que a propriedade 'mensagem' está presente na resposta
            // pois a propriedade só está presente em caso de erros
            assert.ok(response.body.mensagem);
        });
    });

    /**
     * Teste para verificar o tratamento de erro ao tentar fazer login com e-mail não cadastrado.
     * @memberof Integration Tests
     * @group Teste Email Não Cadastrado:
     */
    describe('Teste Email Não Cadastrado:', () => {
    /**
         * Testa o tratamento de erro ao tentar logar com e-mail não cadastrado em POST /login.
         * @function
         * @async
         * @memberof Teste Email Não Cadastrado:
         * @name Deve receber um erro http 401 ao tentar logar com email não cadastrado em POST /login
         * @returns {Promise<void>}
         */
        it('Deve receber um erro http 401 ao tentar logar com email não cadastrado em POST /login', async () => {
            const response = await supertest(FASTIFY.server)
                .post('/login')
                .send(WRONG_LOGIN_DATA);

            assert.strictEqual(response.status, 401);
            // Garante que a propriedade 'mensagem' está presente na resposta
            // pois a propriedade só está presente em caso de erros
            assert.ok(response.body.mensagem);
        });
    });

    /**
     * Testes de autenticação.
     * @memberof Integration Tests
     * @group Testes de Autenticação:
     */
    describe('Testes de Autenticação:', () => {
    /**
         * Testa o tratamento de erro ao tentar entrar em /user sem o header "Authorization".
         * @function
         * @async
         * @memberof Testes de Autenticação:
         * @name Deve receber um erro http 401 ao tentar entrar em /user sem o header "Authorization"
         * @returns {Promise<void>}
         */
        it('Deve receber um erro http 401 ao tentar entrar em /user sem o header "Authorization"', async () => {
            const response = await supertest(FASTIFY.server)
                .get('/user');

            assert.strictEqual(response.status, 401);
            // Garante que a propriedade 'mensagem' está presente na resposta
            // pois a propriedade só está presente em caso de erros
            assert.ok(response.body.mensagem);
        });

        /**
         * Testa o tratamento de erro ao tentar entrar em /user com token inválido.
         * @function
         * @async
         * @memberof Testes de Autenticação:
         * @name Deve receber um erro http 401 ao tentar entrar em /user com token inválido
         * @returns {Promise<void>}
         */
        it('Deve receber um erro http 401 ao tentar entrar em /user com token inválido', async () => {
            const response = await supertest(FASTIFY.server)
                .get('/user')
                .set('Authorization', 'Bearer tokeninvalido');

            assert.strictEqual(response.status, 401);
            // Garante que a propriedade 'mensagem' está presente na resposta
            // pois a propriedade só está presente em caso de erros
            assert.ok(response.body.mensagem);
        });

        /**
         * Testa o tratamento de erro ao tentar logar com senha errada em POST /signup.
         * @function
         * @async
         * @memberof Testes de Autenticação:
         * @name Deve receber um erro http 401 ao tentar logar com senha errada em POST /signup
         * @returns {Promise<void>}
         */
        it('Deve receber um erro http 401 ao tentar logar com senha errada em POST /signup', async () => {
            const signupResponse = await supertest(FASTIFY.server)
                .post('/signup')
                .send(SIGNUP_DATA);

            const loginResponse = await supertest(FASTIFY.server)
                .post('/login')
                .send({ ...SIGNUP_DATA, senha: 'senhaerrada' });

            assert.strictEqual(signupResponse.status, 201); // Garante que o cadastro aconteceu
            await Users.findByIdAndDelete(signupResponse.body.id);

            assert.strictEqual(loginResponse.status, 401);
            // Garante que a propriedade 'mensagem' está presente na resposta
            // pois a propriedade só está presente em caso de erros
            assert.ok(loginResponse.body.mensagem);
        });
    });

    /**
     * Teste para verificar o se a rota deafult para quando o endpoint for desconhecido esta funcionando
     * @memberof Integration Tests
     * @group Teste Endpoint Desconhecido:
     */
    describe('Teste Endpoint Desconhecido:', () => {
    /**
         * Testa se a rota default funciona
         * @function
         * @async
         * @memberof Teste Endpoint Desconhecido:
         * @name Deve receber um erro http 404 ao tentar usar um endpoint desconhecido
         * @returns {Promise<void>}
         */
        it('Deve receber um erro http 404 ao tentar usar um endpoint desconhecido', async () => {
            const response = await supertest(FASTIFY.server)
                .get('/endpoint-desconhecido');

            assert.strictEqual(response.status, 404);
            // Garante que a propriedade 'mensagem' está presente na resposta
            // pois a propriedade só está presente em caso de erros
            assert.ok(response.body.mensagem);
        });
    });
});
