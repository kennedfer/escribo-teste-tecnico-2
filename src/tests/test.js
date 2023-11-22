import assert from 'assert';

import { encryptUtils } from '../utils/index.js'

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
            });
    })

});