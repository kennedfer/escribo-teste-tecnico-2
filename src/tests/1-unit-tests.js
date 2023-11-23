import assert from 'assert';

import { dateUtils, encryptUtils, tokensUtils, usersUtils } from '../utils/index.js'

import * as dotenv from 'dotenv'
dotenv.config();

/**
 * Conjunto de testes unitários.
 * @group Unit Tests
 */
describe('Testes Unitários:', function () {

    /**
     * Testes para a utilidade de criptografia.
     * @memberof Unit Tests
     * @group Encrypt Utils Tests
     */
    describe("Encrypt Utils:", () => {

        /**
         * Testa o método de hash (hashEncrypt) da utilidade de criptografia.
         * @function
         * @memberof Encrypt Utils Tests
         * @name #hashEncrypt()
         */
        describe('#hashEncrypt()', function () {
            /**
             * Testa se a string "texto" é hasheada corretamente.
             * @function
             * @name Deve hashear a string "texto"
             */
            it('Deve hashear a string "texto"', function () {
                assert.notEqual(encryptUtils.hashEncrypt("texto"), "texto");
            });
        }),

            /**
             * Testa o método de comparação (match) da utilidade de criptografia.
             * @function
             * @memberof Encrypt Utils Tests
             * @name #match()
             */
            describe('#match()', function () {
                /**
                 * Testa se a string "texto" é comparada corretamente com um hash válido.
                 * @function
                 * @name Deve comparar a string "texto" com o hash e retornar "true"
                 */
                it('Deve comparar a string "texto" com o hash e retornar "true"', function () {
                    assert.equal(encryptUtils.match("texto", "$2b$10$fgWBeQbGV9iKihACzZEgNuN8HKOAxiQtrFWhbYMa5E.AvCEYhSf62"), true);
                });

                /**
                 * Testa se a string "outrotexto" é comparada corretamente com um hash válido.
                 * @function
                 * @name Deve comparar a string "outrotexto" com o hash e retornar "false"
                 */
                it('Deve comparar a string "outrotexto" com o hash e retornar "false"', function () {
                    assert.equal(encryptUtils.match("outrotexto", "$2b$10$fgWBeQbGV9iKihACzZEgNuN8HKOAxiQtrFWhbYMa5E.AvCEYhSf62"), false);
                });
            });
    });

    /**
     * Testes para a utilidade de tokens.
     * @memberof Unit Tests
     * @group Tokens Utils Tests
     */
    describe("Tokens Utils:", () => {

        /**
         * Testa os métodos de criação e verificação de token da utilidade de tokens.
         * @function
         * @memberof Tokens Utils Tests
         * @name #createToken() && #verifyTokenAndGetId()
         */
        describe('#createToken() && #verifyTokenAndGetId()', function () {
            /**
             * Testa se um JWT token válido é criado corretamente.
             * @function
             * @name Deve criar um JWT token válido
             */
            it('Deve criar um JWT token válido', function () {
                assert.equal(tokensUtils.verifyTokenAndGetId(tokensUtils.createToken({ id: "meuid" })), "meuid");
            });
        }),

            /**
             * Testa o método de verificação de token e obtenção de ID da utilidade de tokens.
             * @function
             * @memberof Tokens Utils Tests
             * @name #verifyTokenAndGetId()
             */
            describe('#verifyTokenAndGetId()', function () {
                /**
                 * Testa se um erro é lançado ao tentar verificar um token inválido.
                 * @function
                 * @name Deve lançar um erro de Token inválido
                 */
                it('Deve lançar um erro de Token inválido', function () {
                    assert.throws(() => tokensUtils.verifyTokenAndGetId("tokeninvalido"))
                });
            })

    });

    /**
     * Testes para a utilidade de usuários.
     * @memberof Unit Tests
     * @group Users Utils Tests
     */
    describe("Users Utils:", () => {

        /**
         * Testa o método de verificação de objeto nulo da utilidade de usuários.
         * @function
         * @memberof Users Utils Tests
         * @name #userIsNull()
         */
        describe('#userIsNull()', function () {
            /**
             * Testa se o valor não é nulo e retorna "false".
             * @function
             * @name Deve checar se o valor é nullo e retornar "false"
             */
            it('Deve checar se o valor é nullo e retornar "false"', function () {
                assert.equal(usersUtils.userIsNull({ texto: "meu objeto não nulo" }), false);
            });

            /**
             * Testa se o valor é nulo e retorna "true".
             * @function
             * @name Deve checar se o valor é nullo e retornar "true"
             */
            it('Deve checar se o valor é nullo e retornar "true"', function () {
                assert.equal(usersUtils.userIsNull(null), true);
            });
        });

        /**
         * Testa o método de verificação de objeto não nulo da utilidade de usuários.
         * @function
         * @memberof Users Utils Tests
         * @name #userIsNotNull()
         */
        describe('#userIsNotNull()', function () {
            /**
             * Testa se o valor não é nulo e retorna "false".
             * @function
             * @name Deve checar se o valor NÃO é nullo e retornar "false"
             */
            it('Deve checar se o valor NÃO é nullo e retornar "false"', function () {
                assert.equal(usersUtils.userIsNotNull(null), false);
            });

            /**
             * Testa se o valor não é nulo e retorna "true".
             * @function
             * @name Deve checar se o valor NÃO é nullo e retornar "true"
             */
            it('Deve checar se o valor NÃO é nullo e retornar "true"', function () {
                assert.equal(usersUtils.userIsNotNull({ texto: "meu objeto não nulo" }), true);
            });
        });

    });

    /**
     * Testes para a utilidade de datas.
     * @memberof Unit Tests
     * @group Date Utils Tests
     */
    describe("Date Utils:", () => {

        /**
         * Testa o método de obtenção da data atual da utilidade de datas.
         * @function
         * @memberof Date Utils Tests
         * @name #getCurrentDate()
         */
        describe('#getCurrentDate()', function () {
            /**
             * Testa se a função retorna um objeto do tipo "Date".
             * @function
             * @name Deve retornar um objeto do "Date"
             */
            it('Deve retornar um objeto do "Date"', function () {
                assert.equal(typeof dateUtils.getCurrentDate(), 'object');
            });
        });

    });

});
