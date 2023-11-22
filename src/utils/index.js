/**
 * Módulo que exporta utilitários relacionados a encriptação.
 * @namespace
 * @property {Function} hashEncrypt - Função para criar um hash apartir do payload
 * @property {Function} match - Função para comparar valores com hashs
 */
export * as encryptUtils from './encrypt.js'

/**
 * Módulo que exporta utilitários relacionados a manipulação de datas.
 * @namespace
 * @property {Function} getCurrentDate - Função para obter a data e hora atuais.
 */
export * as dateUtils from './date.js'

/**
 * Módulo que exporta utilitários relacionados a tokens JWT.
 * @namespace
 * @property {Function} createToken - Função para criar tokens JWT.
 * @property {Function} verifyTokenAndGetId - Função para verificar tokens JWT.
 */
export * as tokensUtils from './tokens.js'

/**
 * Módulo que exporta utilitários relacionados a manipulação de respostas.
 * @namespace
 * @property {Function} createResponse - Função que gera um objeto de resposta com informações específicas do usuário.
 */
export * as responseUtils from './response.js'

/**
 * Módulo que exporta utilitários relacionados a usuários.
 * @namespace
 * @property {Function} userIsNull - Função para verificar se um objeto de usuário é nulo
 * @property {Function} userIsNotNull - Função para verificar se um objeto de usuário NÃO é nulo
 * @property {Function} getUserByRequestEmail - Funão para obter um usúario apartir do email no RequestBody
 */
export * as usersUtils from './users.js'
