import mongoose, { Schema } from "mongoose";

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

export const Users = mongoose.model("Users", userSchema);