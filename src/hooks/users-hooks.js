import { FRIENDLY_ERRORS_RESPONSES } from "../utils/errors.js";
import { usersUtils } from "../utils/index.js";

/**
 * Verifica se o e-mail já está em uso por outro usuário.
 *
 * @param {FastifyRequest} request - O objeto de requisição fastify.
 * @param {FastifyReply} reply - O objeto de resposta fastify.
 * @returns {void}
 */
export const emailIsAlreadyUsed = async (request, reply) => {
    /**
     * Obtém o usuário com base no endereço de e-mail fornecido na requisição.
     * @type {Object}
     */
    const user = await usersUtils.getUserByRequestEmail(request);

    // Verifica se o usuário já existe e envia uma resposta se for o caso.
    if (usersUtils.userIsNotNull(user)) reply.send(FRIENDLY_ERRORS_RESPONSES.EMAIL_ALREADY_USED);
}

/**
 * Verifica se o e-mail não está registrado no sistema.
 *
 * @param {FastifyRequest} request - O objeto de requisição fastify.
 * @param {FastifyReply} reply - O objeto de resposta fastify.
 * @returns {void}
 */
export const emailNotRegistered = async (request, reply) => {
    /**
     * Obtém o usuário com base no endereço de e-mail fornecido na requisição.
     * @type {Object}
     */
    const user = await usersUtils.getUserByRequestEmail(request);

    // Verifica se o usuário não existe e envia uma resposta amigável se for o caso.
    if (usersUtils.userIsNull(user)) reply.send(FRIENDLY_ERRORS_RESPONSES.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD);
}

/**
 * Verifica se a requisição não contém o cabeçalho de autorização.
 *
 * @param {FastifyRequest} request - O objeto de requisição fastify.
 * @param {FastifyReply} reply - O objeto de resposta fastify.
 * @returns {void}
 */
export const dontHasAuthorizationHeader = async (request, reply) => {
    // Verifica se o cabeçalho de autorização está ausente e envia uma resposta amigável se for o caso.
    if (!request.headers.authorization)
        reply.send(FRIENDLY_ERRORS_RESPONSES.INVALID_TOKEN);

    // Substitui "Bearer " no cabeçalho de autorização para obter o token.
    request.token = request.headers.authorization.replace(/^Bearer\s/, '');
}
