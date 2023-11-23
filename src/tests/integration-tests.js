import assert from 'assert'
import supertest from "supertest";
import { FASTIFY } from "../app.js";
import { Users } from '../models/models.js';

describe('Testes de Integração', () => {
    describe("Teste Point 2 Point:", () => {
        let token;
        let userId;

        it('Deve cadastrar um novo usuário usando POST /signup', async () => {
            const signupData = {
                nome: "meunome",
                email: "meuemail@gmail.com",
                senha: "minhasenha",
                telefones: []
            }

            const response = await supertest(FASTIFY.server)
                .post("/signup")
                .send(signupData);

            userId = response.body.id;
            assert.strictEqual(response.status, 201);
            assert.ok(response.body.token) // Garante que o token está presente na resposta
        });

        it('Deve realizar o login usando POST /login', async () => {
            const loginData = {
                email: 'meuemail@gmail.com',
                senha: 'minhasenha'
            };

            const response = await supertest(FASTIFY.server)
                .post('/login')
                .send(loginData);

            assert.strictEqual(response.status, 200);
            assert.ok(response.body.token); // Garante que o token está presente na resposta
            token = response.body.token; // Armazena o token para uso posterior
        });

        it('Deve obter informações básicas do usuário usando GET /user', async () => {

            const response = await supertest(FASTIFY.server)
                .get('/user')
                .set('Authorization', `Bearer ${token}`); // Adiciona o token ao cabeçalho de autorização


            await Users.findByIdAndDelete(userId);
            assert.strictEqual(response.status, 200);
            // assert.deepStrictEqual(response.body, {
            //     userId: decodedToken.userId,
            //     username: 'testuser' // Você pode ajustar isso conforme sua API retorna as informações do usuário
            // });
        });
    });
});