/**
 * Verifica se um objeto de usuário é nulo ou não
 *
 * @param {Object} user - O objeto de usuário que será verificado.
 * @returns {Boolean} Um boolean 'true' caso o parametro 'user' seja nulo e 'false' caso contrário
 */
export const userIsNull = (user) => {
    return user == null;
}

/**
 * Verifica se um objeto de usuário é nulo ou não
 *
 * @param {Object} user - O objeto de usuário que será verificado.
 * @returns {Boolean} Um boolean 'false' caso o parametro 'user' seja nulo e 'true' caso contrário
 */
export const userIsNotNull = (user) => {
    return user != null;
}