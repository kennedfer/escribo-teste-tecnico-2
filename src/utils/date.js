/**
 * Obtém a data e hora atuais.
 *
 * @returns {Date} O objeto Date representando a data e hora atuais.
 */
export const getCurrentDate = () => {
    /**
     * @class Date
     * @constructs {number} milliseconds - O número de milissegundos desde 1 de janeiro de 1970 00:00:00 UTC.
     * @returns {Date} O objeto Date representando a data e hora atuais.
     */
    return new Date(Date.now());
};
