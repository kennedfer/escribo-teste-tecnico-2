import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Users } from '../models/models.js';
import { friendlyErrors } from '../utils/errors.js';
import { encryptUtils } from '../utils/index.js';

export const signupUser = async (request, reply) => {
    try {
        const dateNow = new Date(Date.now());

        const userData = {
            ...request.body,
            data_criacao: dateNow,
            data_atualizacao: dateNow,
            ultimo_login: dateNow

        }

        // const salt = await bcrypt.genSalt(10);
        // const hashPassword = await bcrypt.hash(userData.senha, salt);
        userData.senha = encryptUtils.hashEncrypt(userData.senha);


        const newUser = new Users(userData);

        try {
            const user = await newUser.save();
            const token = jwt.sign({ id: user["_id"] }, process.env.JWT_SECRET, {
                expiresIn: '30m'
            })

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
    const { email, senha } = new Users(request.body);
    const user = await Users.findOne({ email });

    //CONSIDERANDO QUE A POHA DA ROTA VAI TER UMA VALIDAÇÃO DE EMAIL AAAAAAA

    //! ATUALIZAR A DATA DO ULTIMO LOGIINNN AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    try {
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        if (passwordMatch) {
            const token = jwt.sign({ id: user["_id"] }, process.env.JWT_SECRET, {
                expiresIn: '30m'
            })

            user.ultimo_login = new Date(Date.now());

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