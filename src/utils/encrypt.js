import bcrypt from "bcrypt";

/**
 * Número de rounds para a geração de sal usado no algoritmo de hash.
 * @constant {number}
 */
const SALT_ROUNDS = 10;

/**
 * Gera um hash bcrypt sincronizado para os dados fornecidos.
 *
 * @param {string} data - Os dados a serem hashificados.
 * @returns {string} O hash bcrypt gerado.
 */
export const hashEncrypt = (data) => {
    /**
     * @function bcrypt.hashSync
     * @param {string} data - Os dados a serem 'hashificados'.
     * @param {number} saltRounds - O número de rounds para a geração do sal.
     * @returns {string} O hash bcrypt gerado.
     */
    return bcrypt.hashSync(data, SALT_ROUNDS);
}

/**
 * Compara dados com um hash bcrypt para verificar correspondência.
 *
 * @param {string} data - Os dados a serem comparados.
 * @param {string} encryptData - O hash bcrypt a ser comparado.
 * @returns {boolean} true se os dados correspondem ao hash, false caso contrário.
 */
export const match = (data, encryptData) => {
    /**
     * @function bcrypt.compareSync
     * @param {string} data - Os dados a serem comparados.
     * @param {string} encryptData - O hash bcrypt a ser comparado.
     * @returns {boolean} true se os dados correspondem ao hash, false caso contrário.
     */
    return bcrypt.compareSync(data, encryptData);
}
