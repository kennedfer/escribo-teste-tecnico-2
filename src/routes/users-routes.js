import jwt from 'jsonwebtoken';
import { Users } from '../models/models.js';
import { friendlyErrors } from '../utils/errors.js';
import { dateUtils, encryptUtils, tokensUtils } from '../utils/index.js';

export const signupUser = async (request, reply) => {
    try {
        const dateNow = dateUtils.getCurrentDate();

        const userData = {
            ...request.body,
            data_criacao: dateNow,
            data_atualizacao: dateNow,
            ultimo_login: dateNow

        }

        userData.senha = encryptUtils.hashEncrypt(userData.senha);


        const user = new Users(userData);

        try {
            await user.save();
            const token = tokensUtils.createToken({ id: user["_id"] });

            let response = {
                id: user['_id'],
                data_criacao: user['data_criacao'],
                data_atualizacao: user['data_atualizacao'],
                ultimo_login: user['ultimo_login'],
                token
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
    const { email, senha } = request.body;
    const user = await Users.findOne({ email });

    try {
        const passwordMatch = encryptUtils.compare(senha, user.senha);
        if (passwordMatch) {
            const token = tokensUtils.createToken({ id: user["_id"] });

            user.ultimo_login = dateUtils.getCurrentDate();

            let response = {
                id: user['_id'],
                data_criacao: user['data_criacao'],
                data_atualizacao: user['data_atualizacao'],
                ultimo_login: user['ultimo_login'],
                token
            }

            await user.save();

            reply.send(response);
        } else {
            reply.code(401).send(friendlyErrors.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD);
        }

    } catch (error) {
        reply.code(401).send(friendlyErrors.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD);
    }
}

export const getUser = async (request, reply) => {

    const token = request.headers.authorization.replace(/^Bearer\s/, '');

    try {
        const userId = jwt.verify(token, process.env.JWT_SECRET).id;

        const user = await Users.findById(userId);
        console.log(user);
        console.log(userId)

        if (user == null) reply.send(friendlyErrors.INVALID_TOKEN);

        reply.send(user);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            reply.send(friendlyErrors.INVALID_TOKEN);
        }

        else if (error.name === 'JsonWebTokenError')
            reply.send(friendlyErrors.EXPIRED_TOKEN);

    }
} 