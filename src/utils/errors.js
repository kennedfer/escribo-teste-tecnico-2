/**
 * Objeto contendo mensagens para diferentes erros.
 * @constant
 * @type {Object}
 */
export const FRIENDLY_ERRORS_RESPONSES = {
    /**
     * Mensagem para o erro de e-mail já existente.
     * @type {Object}
     * @property {string} mensagem - A mensagem de erro correspondente.
     */
    EMAIL_ALREADY_USED: { mensagem: "E-mail já existente" },

    /**
     * Mensagem para o erro de usuário e/ou senha inválidos.
     * @type {Object}
     * @property {string} mensagem - A mensagem de erro correspondente.
     */
    EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD: { mensagem: "Usuário e/ou senha inválidos" },

    /**
     * Mensagem para o erro de token inválido.
     * @type {Object}
     * @property {string} mensagem - A mensagem de erro correspondente.
     */
    INVALID_TOKEN: { mensagem: "Não autorizado" },

    /**
     * Mensagem para o erro de sessão inválida devido a um token expirado.
     * @type {Object}
     * @property {string} mensagem - A mensagem de erro correspondente.
     */
    EXPIRED_TOKEN: { mensagem: "Sessão inválida" },

    /**
     * Mensagem para o erro interno no servidor.
     * @type {Object}
     * @property {string} mensagem - A mensagem de erro correspondente.
     */
    INTERNAL_SERVER_ERROR: { mensagem: "Erro no servidor" },

    /**
     * Mensagem para o erro interno no servidor com sugestão de tentar novamente mais tarde.
     * @type {Object}
     * @property {string} mensagem - A mensagem de erro correspondente.
     */
    INTERNAL_SERVER_ERROR_TRY_AGAIN: { mensagem: "Erro no servidor. Tente novamente mais tarde" },

    /**
     * Mensagem para o erro de endpoint desconhecido.
     * @type {Object}
     * @property {string} mensagem - A mensagem de erro correspondente.
     */
    ENDPOINT_NOT_FOUND: { mensagem: "Rota não encontrada" },
};
