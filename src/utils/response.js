/**
 * Cria um objeto de resposta com informações específicas do usuário.
 *
 * @param {Object} user - O objeto de usuário do qual as informações serão extraídas.
 * @returns {Object} Um objeto de resposta contendo propriedades específicas do usuário seguindo modelo especificado.
 */
export const createResponse = (user) => {
    /**
     * Objeto de resposta contendo as seguintes propriedades:
     * @property {string} id - O ID do usuário, extraído da chave '_id'.
     * @property {string} data_criacao - A data de criação do usuário, extraída da chave 'data_criacao'.
     * @property {string} data_atualizacao - A última data de atualização do usuário, extraída da chave 'data_atualizacao'.
     * @property {string} ultimo_login - A última data de login do usuário, extraída da chave 'ultimo_login'.
     * @property {string} token - O token do usuário, extraído da chave 'token'.
     */
    return {
        id: user['_id'],
        data_criacao: user['data_criacao'],
        data_atualizacao: user['data_atualizacao'],
        ultimo_login: user['ultimo_login'],
        token: user["token"]
    }
}