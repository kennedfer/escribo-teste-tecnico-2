import { FRIENDLY_ERRORS_RESPONSES } from "../utils/errors.js";

/**
 * Envia uma mensagem de erro de endpoint desconhecido
 *
 * @param {FastifyRequest} request - O objeto de requisição fastify.
 * @param {FastifyReply} reply - O objeto de resposta fastify.
 * @returns {void}
 */
export const notFound = (request, reply) => {
    reply.code(404).send(FRIENDLY_ERRORS_RESPONSES.ENDPOINT_NOT_FOUND);
}