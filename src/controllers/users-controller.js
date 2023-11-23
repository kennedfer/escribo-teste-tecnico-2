import { usersHooks } from '../hooks/index.js';
import { usersRoutes } from '../routes/index.js';

/**
 * Controlador para as rotas relacionadas a usuários.
 * @type {Array<Function>}
 */
export const usersController = [
    /**
     * Rota para registrar um novo usuário.
     *
     * @param {FastifyInstance} fastify - Instância do Fastify.
     * @param {Object} options - Objeto de configuração (não utilizado neste contexto).
     * @param {Function} done - Função de callback para sinalizar que a operação foi concluída.
     * @returns {void}
     */
    (fastify, options, done) => {
        fastify.post(
            '/signup',
            {
                preHandler: [
                    usersHooks.emailIsAlreadyUsed
                ]
            },
            usersRoutes.signupUser
        );
        done();
    },

    /**
     * Rota para realizar o login de um usuário.
     *
     * @param {Object} fastify - Instância do Fastify.
     * @param {Object} options - Objeto de configuração (não utilizado neste contexto).
     * @param {Function} done - Função de callback para sinalizar que a operação foi concluída.
     * @returns {void}
     */
    (fastify, options, done) => {
        fastify.post(
            '/login',
            {
                preHandler: [
                    usersHooks.emailNotRegistered
                ]
            },
            usersRoutes.longinUser
        );
        done();
    },

    /**
     * Rota para obter informações de um usuário autenticado.
     *
     * @param {Object} fastify - Instância do Fastify.
     * @param {Object} options - Objeto de configuração (não utilizado neste contexto).
     * @param {Function} done - Função de callback para sinalizar que a operação foi concluída.
     * @returns {void}
     */
    (fastify, options, done) => {
        fastify.get(
            '/user',
            {
                preHandler: [
                    usersHooks.dontHasAuthorizationHeader
                ]
            },
            usersRoutes.getUser
        );
        done();
    }
];
