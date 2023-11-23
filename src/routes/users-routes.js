import { Users } from '../models/models.js';
import { FRIENDLY_ERRORS_RESPONSES } from '../utils/errors.js';
import { dateUtils, encryptUtils, responseUtils, tokensUtils, usersUtils } from '../utils/index.js';

/**
 * Registra um novo usuário.
 *
 * @param {FastifyRequest} request - O objeto de requisição express.
 * @param {FastifyReply} reply - O objeto de resposta express.
 * @returns {void}
 */
export const signupUser = async (request, reply) => {
    try {
        /**
         * Obtém a data e hora atuais.
         * @type {Date}
         */
        const dateNow = dateUtils.getCurrentDate();

        /**
         * Dados do usuário a serem inseridos no banco de dados.
         * @type {Object}
         */
        const userData = {
            ...request.body,
            data_criacao: dateNow,
            data_atualizacao: dateNow,
            ultimo_login: dateNow
        };

        // Criptografa a senha do usuário.
        userData.senha = encryptUtils.hashEncrypt(userData.senha);

        /**
         * Instância do modelo Users com os dados do novo usuário.
         * @type {Object}
         */
        const user = new Users(userData);

        try {
            // Salva o novo usuário no banco de dados.
            await user.save();

            // Cria um token para o novo usuário.
            user.token = tokensUtils.createToken({ id: user["_id"] });

            // Envia uma resposta com os detalhes do usuário.
            reply.code(201).send(responseUtils.createResponse(user));

        } catch (error) {
            // Envia uma resposta de erro amigável em caso de falha no salvamento do usuário.
            reply.send(FRIENDLY_ERRORS_RESPONSES.INTERNAL_SERVER_ERROR_TRY_AGAIN);
        }
    } catch (error) {
        // Envia uma resposta de erro amigável em caso de erro geral.
        reply.send(FRIENDLY_ERRORS_RESPONSES.INTERNAL_SERVER_ERROR);
    }
}

/**
 * Realiza o login de um usuário.
 *
 * @param {FastifyRequest} request - O objeto de requisição express.
 * @param {FastifyReply} reply - O objeto de resposta express.
 * @returns {void}
 */
export const longinUser = async (request, reply) => {
    /**
     * Senha fornecida na requisição.
     * @type {string}
     */
    const { senha } = request.body;

    /**
     * Usuário encontrado no banco de dados com base no endereço de e-mail.
     * @type {Object}
     */
    const user = await usersUtils.getUserByRequestEmail(request);

    try {
        // Verifica se a senha fornecida não corresponde à senha armazenada.
        const passwordNotMatch = !encryptUtils.match(senha, user.senha);
        if (passwordNotMatch) reply.code(401).send(FRIENDLY_ERRORS_RESPONSES.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD);

        // Atualiza a última data de login do usuário.
        user["ultimo_login"] = dateUtils.getCurrentDate();
        await user.save();

        // o token é atribuido ao user para uso posterior, ele não é salvo
        user.token = tokensUtils.createToken({ id: user["_id"] });

        // Envia uma resposta com os detalhes do usuário.
        reply.send(responseUtils.createResponse(user));

    } catch (error) {
        reply.send(FRIENDLY_ERRORS_RESPONSES.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD);
    }
}

/**
 * Obtém informações de um usuário autenticado.
 *
 * @param {FastifyRequest} request - O objeto de requisição express.
 * @param {FastifyReply} reply - O objeto de resposta express.
 * @returns {void}
 */
export const getUser = async (request, reply) => {
    try {
        // Verifica o token e obtém o ID do usuário.
        const userId = tokensUtils.verifyTokenAndGetId(request.token);

        // Busca o usuário no banco de dados com base no ID.
        const user = await usersUtils.getUserById(userId);

        // Verifica se o usuário não existe e envia uma resposta de erro amigável.
        if (usersUtils.userIsNull(user)) reply.send(FRIENDLY_ERRORS_RESPONSES.INVALID_TOKEN);

        // Envia as informações do usuário.
        reply.send(responseUtils.createBasicResponse(user));

    } catch (error) {
        // Trata diferentes erros relacionados a tokens.
        switch (error.name) {
            case 'TokenExpiredError': {
                reply.send(FRIENDLY_ERRORS_RESPONSES.EXPIRED_TOKEN);
                break;
            }
            case 'JsonWebTokenError': {
                reply.send(FRIENDLY_ERRORS_RESPONSES.INVALID_TOKEN);
                break;
            }
            default: {
                // Envia uma resposta de erro amigável em caso de falha geral.
                reply.send(FRIENDLY_ERRORS_RESPONSES.INTERNAL_SERVER_ERROR_TRY_AGAIN);
            }
        }
    }
}
