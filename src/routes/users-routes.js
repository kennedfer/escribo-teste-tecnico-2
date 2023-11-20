import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Users } from '../models/models.js';

export const signupUser = async (request, reply) => {
    try {
        const userData = request.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userData.senha, salt);

        userData.senha = hashPassword;

        const dateNow = Date.now();

        userData.data_criacao = dateNow;
        userData.data_atualizacao = dateNow;
        userData.ultimo_login = dateNow;

        const newUser = new Users(userData);
        try {
            const user = await newUser.save();
            const token = jwt.sign({ id: user["_id"] }, process.env.JWT_SECRET, {
                expiresIn: '30m'
            })

            const hashToken = await bcrypt.hash(token, salt);

            let response = {
                id: user['_id'],
                data_criacao: user['data_criacao'],
                data_atualizacao: user['data_atualizacao'],
                ultimo_login: user['ultimo_login'],
                token: hashToken
            }

            reply.send(response);
        } catch (error) {
            reply.code(500).send("Erro nao criação do usuario " + error.message);
        }
    } catch (error) {
        reply.code(400).send("Erro no haash");
    }
}

export const longinUser = async (request, reply) => {
    const { email, senha } = new Users(request.body);
    const user = await Users.findOne({ email });

    //CONSIDERANDO QUE A POHA DA ROTA VAI TER UMA VALIDAÇÃO DE EMAIL AAAAAAA
    try {
        const isPasswordMatch = await bcrypt.compare(senha, user.senha);
        if (isPasswordMatch) {
            const token = jwt.sign({ id: user["_id"] }, process.env.JWT_SECRET, {
                expiresIn: '30m'
            })
            const salt = await bcrypt.genSalt(10);

            const hashToken = await bcrypt.hash(token, salt);

            console.log(user);

            let response = {
                id: user['_id'],
                data_criacao: user['data_criacao'],
                data_atualizacao: user['data_atualizacao'],
                ultimo_login: user['ultimo_login'],
                token: hashToken
            }


            reply.send(response);
        } else {
            reply.code(400).send("senha errada meu comparça");
        }

    } catch (error) {
        reply.code(500).send("Error ao comparar as senhas " + error.message);
    }
}