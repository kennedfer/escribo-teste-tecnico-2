import mongoose, { Schema } from "mongoose";

/**
 * Definição do esquema mongoose para usuários.
 * @typedef {Object} UserSchema
 * @property {string} nome - O nome do usuário.
 * @property {string} email - O e-mail do usuário.
 * @property {string} senha - A senha do usuário.
 * @property {Date} data_criacao - A data de criação do usuário.
 * @property {Date} data_atualizacao - A última data de atualização do usuário.
 * @property {Date} ultimo_login - A última data de login do usuário.
 * @property {Object[]} telefones - Um array de objetos representando os números de telefone do usuário.
 */
const userSchema = new Schema({
    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    },

    data_criacao: {
        type: Date,
        required: true
    },

    data_atualizacao: {
        type: Date,
        required: true
    },

    ultimo_login: {
        type: Date,
        required: true
    },

    telefones: {
        type: [Object],
        default: [],
        required: true
    }
});

/**
 * Modelo mongoose para usuários.
 * @constant {Model} Users
 */
export const Users = mongoose.model("Users", userSchema);
