/**
 * Módulo que exporta utilitários relacionados ás rotas de usuários.
 * @namespace
 * @property {Function} emailIsAlreadyUsed - Função que checa se o email já foi usado em outro usuário.
 * @property {Function} emailNotRegistered - Função que checa se o email está no registro.
 * @property {Function} dontHasAuthorizationHeader - Função que checa se o request tem o header 'Authorization'.
 */
export * as usersHooks from './users-hooks.js';
