import { Users } from '../models/models.js';

/**
 * Verifica se um objeto de usuário é nulo
 * @param {Object} user - O objeto de usuário que será verificado.
 * @returns {Boolean} Um boolean 'true' caso o parametro 'user' seja nulo e 'false' caso contrário
 */
export const userIsNull = (user) => {
    return user == null;
};

/**
 * Verifica se um objeto de usuário não é nulo
 *
 * @param {Object} user - O objeto de usuário que será verificado.
 * @returns {Boolean} Um boolean 'true' caso o parametro 'user' NÃO for nulo e 'false' caso contrário
 */
export const userIsNotNull = (user) => {
    return user != null;
};

/**
 * Obtém um usúario com base no email do RequestBody
 *
 * @param {FastifyRequest} request - a request de onde será retirado o email.
 * @returns {User | null} Um User apartir do email ou null caso nenhum usuário seja encontrado
 */
export const getUserByRequestEmail = async (request) => {
    /**
     * @typedef {Object} RequestBody
     * @property {string} email - O endereço de e-mail fornecido na requisição.
     */
    const { email } = request.body;

    /**
     * Busca um usuário no banco de dados com base no endereço de e-mail fornecido e o retorna.
     * @type {User | null}
     */
    return await Users.findOne({ email });
};

/**
 * Obtém um usúario com base no id fornecido
 *
 * @param {FastifyRequest} request - a request de onde será retirado o email.
 * @returns {User | null} Um User apartir do id ou null caso nenhum usuário seja encontrado
 */
export const getUserById = async (id) => {
    /**
     * Busca um usuário no banco de dados com base no id fornecido e o retorna.
     * @type {User | null}
     */
    return await Users.findById(id);
};
