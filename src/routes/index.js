/**
 * Módulo que exporta as rotas de usuários
 * @namespace
 * @property {Function} signupUser - Função que cadastra um novo registro de usuário.
 * @property {Function} loginUser - Função usada para 'logar' o usuário e enviar um token.
 * @property {Function} getUser - Função que retorna o User com base em seu token.
 */
export * as usersRoutes from './users-routes.js';

/**
 * Módulo que exporta a rota para endpoints desconhecidos
 * @namespace
 * @property {Function} notFound - Função que envia um erro simples de endpoint desconhecido.
 */
export * as notFoundRoute from './not-found-route.js';
