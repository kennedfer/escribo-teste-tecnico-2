import Fastify from 'fastify';
import * as dotenv from 'dotenv';
import { usersController } from './controllers/users-controller.js';
import mongoose from 'mongoose';
import { notFoundRoute } from './routes/index.js';
import fastifyCors from '@fastify/cors';

dotenv.config();

/**
 * Cria uma instância do Fastify.
 * @constant {Object} fastify
 */
export const FASTIFY = Fastify({ logger: true });

// Permite que sejam aceitas requisições de qualquer origem
FASTIFY.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST']
});

/**
 * Configura o handler para rotas não encontradas.
 * @method
 * @param {Object} notFoundRoute.notFound - O handler para rotas não encontradas.
 * @returns {void}
 */
FASTIFY.setNotFoundHandler(notFoundRoute.notFound);

/**
 * Registra os controladores das rotas de usuários no Fastify.
 * @method
 * @param {Array<Function>} usersController - Array de controladores de usuários.
 * @returns {void}
 */
usersController.forEach(controller => FASTIFY.register(controller));

try {

    /**
     * Conecta-se ao banco de dados MongoDB via mongoose usando a URI fornecida no arquivo de ambiente.
     * @method
     * @param {string} process.env.MONGODB_URI - A URI do MongoDB obtida do arquivo de ambiente.
     * @returns {void}
     */
    mongoose.connect(process.env.MONGODB_URI);

    /**
     * Inicia o servidor Fastify, escutando na porta fornecida no arquivo de ambiente ou na porta 3000 por padrão.
     * @method
     * @param {Object} process.env.PORT - A porta obtida do arquivo de ambiente ou padrão para 3000.
     * @returns {void}
     */

    FASTIFY.listen({ port: process.env.PORT || 3000 , '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
} catch (error) {
    console.log(error);
}
