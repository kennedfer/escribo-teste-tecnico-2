import jwt from 'jsonwebtoken';

/**
 * Opções para a criação de token, incluindo o tempo de expiração.
 * @constant {Object}
 */
const TOKEN_OPTIONS = {
    expiresIn: '30m'
}

/**
 * Cria um token JWT com base no payload fornecido.
 *
 * @param {Object} payload - O payload a ser incluído no token.
 * @returns {string} O token JWT gerado.
 */
export const createToken = (payload) => {
    /**
     * @function jwt.sign
     * @param {Object} payload - O payload a ser incluído no token.
     * @param {string} JWT_SECRET - A chave secreta usada para assinar o token.
     * @param {Object} TOKEN_OPTIONS - Opções para a criação do token, incluindo o tempo de expiração.
     * @returns {string} O token JWT gerado.
     */
    return jwt.sign(payload, process.env.JWT_SECRET, TOKEN_OPTIONS);
}

/**
 * Verifica a validade de um token JWT e retorna o ID contido no payload.
 *
 * @param {string} token - O token JWT a ser verificado.
 * @returns {string} O ID extraído do payload do token.
 * @throws {JsonWebTokenError} Se o token não for válido.
 * @throws {TokenExpiredError} Se o token tiver expirado.
 */
export const verifyTokenAndGetId = (token) => {
    /**
     * @function jwt.verify
     * @param {string} token - O token JWT a ser verificado.
     * @param {string} JWT_SECRET - A chave secreta usada para verificar o token.
     * @returns {Object} O payload do token, contendo o ID.
    * @throws {JsonWebTokenError} Se o token não for válido.
    * @throws {TokenExpiredError} Se o token tiver expirado.
     */
    return jwt.verify(token, process.env.JWT_SECRET).id;
}
