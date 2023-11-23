/**
 * Dados para simular o processo de cadastro de usuário.
 * @constant {Object} SIGNUP_DATA
 * @property {string} nome - Nome do usuário.
 * @property {string} email - Endereço de e-mail do usuário.
 * @property {string} senha - Senha do usuário.
 * @property {Array} telefones - Lista de números de telefone do usuário.
 */
export const SIGNUP_DATA = {
    nome: "meunome",
    email: "meuemail@gmail.com",
    senha: "minhasenha",
    telefones: []
}

/**
 * Dados para simular o processo de login de usuário.
 * @constant {Object} LOGIN_DATA
 * @property {string} email - Endereço de e-mail do usuário.
 * @property {string} senha - Senha do usuário.
 */
export const LOGIN_DATA = {
    email: 'meuemail@gmail.com',
    senha: 'minhasenha'
};

/**
 * Dados para simular o processo de login de usuário com informações incorretas.
 * @constant {Object} WRONG_LOGIN_DATA
 * @property {string} email - Endereço de e-mail inválido ou desconhecido.
 * @property {string} senha - Senha incorreta.
 */
export const WRONG_LOGIN_DATA = {
    email: "emaildesconhecido@gmail.com",
    senha: "senhaincorreta"
};
