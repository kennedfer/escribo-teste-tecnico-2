/**
 * Cria um objeto de resposta com informações específicas do usuário.
 *
 * @param {Object} user - O objeto de usuário do qual as informações serão extraídas.
 * @returns {Object} Um objeto de resposta contendo propriedades específicas do usuário seguindo modelo especificado.
 */
export const createResponse = (user) => {
    return {
        id: user['_id'],
        data_criacao: user['data_criacao'],
        data_atualizacao: user['data_atualizacao'],
        ultimo_login: user['ultimo_login'],
        token: user["token"]
    }
}