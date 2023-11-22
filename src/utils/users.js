/**
 * Verifica se um objeto de usuário é nulo
 * @param {Object} user - O objeto de usuário que será verificado.
 * @returns {Boolean} Um boolean 'true' caso o parametro 'user' seja nulo e 'false' caso contrário
 */
export const userIsNull = (user) => {
    return user == null;
}

/**
 * Verifica se um objeto de usuário não é nulo
 *
 * @param {Object} user - O objeto de usuário que será verificado.
 * @returns {Boolean} Um boolean 'true' caso o parametro 'user' NÃO for nulo e 'false' caso contrário
 */
export const userIsNotNull = (user) => {
    return user != null;
}