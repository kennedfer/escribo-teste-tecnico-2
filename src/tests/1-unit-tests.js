import assert from 'assert';

import { dateUtils, encryptUtils, tokensUtils, usersUtils } from '../utils/index.js'

import * as dotenv from 'dotenv'
dotenv.config();

describe('Testes Unitários:', function () {
    describe("Encrypt Utils:", () => {
        describe('#hashEncrypt()', function () {
            it('Deve hashear a string "texto"', function () {
                assert.notEqual(encryptUtils.hashEncrypt("texto"), "texto");
            });
        }),

            describe('#match()', function () {
                it('Deve comparar a string "texto" com o hash e retornar "true"', function () {
                    assert.equal(encryptUtils.match("texto", "$2b$10$fgWBeQbGV9iKihACzZEgNuN8HKOAxiQtrFWhbYMa5E.AvCEYhSf62"), true);
                });

                it('Deve comparar a string "outrotexto" com o hash e retornar "false"', function () {
                    assert.equal(encryptUtils.match("outrotexto", "$2b$10$fgWBeQbGV9iKihACzZEgNuN8HKOAxiQtrFWhbYMa5E.AvCEYhSf62"), false);
                });
            });
    });

    describe("Tokens Utils:", () => {
        describe('#createToken() && #verifyTokenAndGetId()', function () {
            it('Deve criar um JWT token válido', function () {
                assert.equal(tokensUtils.verifyTokenAndGetId(tokensUtils.createToken({ id: "meuid" })), "meuid");
            });
        }),

            describe('#verifyTokenAndGetId()', function () {
                it('Deve lançar um erro de Token inválido', function () {
                    assert.throws(() => tokensUtils.verifyTokenAndGetId("tokeninvalido"))
                });
            })

    });

    describe("Users Utils:", () => {
        describe('#userIsNull()', function () {
            it('Deve checar se o valor é nullo e retornar "false"', function () {
                assert.equal(usersUtils.userIsNull({ texto: "meu objeto não nulo" }), false);
            });

            it('Deve checar se o valor é nullo e retornar "true"', function () {
                assert.equal(usersUtils.userIsNull(null), true);
            });
        });

        describe('#userIsNotNull()', function () {
            it('Deve checar se o valor NÃO é nullo e retornar "false"', function () {
                assert.equal(usersUtils.userIsNotNull(null), false);
            });

            it('Deve checar se o valor NÃO é nullo e retornar "true"', function () {
                assert.equal(usersUtils.userIsNotNull({ texto: "meu objeto não nulo" }), true);
            });
        });

    });

    describe("Date Utils:", () => {
        describe('#getCurrentDate()', function () {
            it('Deve retornar um objeto do "Date"', function () {
                assert.equal(typeof dateUtils.getCurrentDate(), 'object');
            });
        });

    });

});