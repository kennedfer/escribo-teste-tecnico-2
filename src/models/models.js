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

    telefones: {
        type: [Object],
        default: [],
        required: true
    }
});

export const Users = mongoose.model("Users", userSchema);