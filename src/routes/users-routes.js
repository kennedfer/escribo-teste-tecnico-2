import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Users } from '../models/models.js';
import { errorsMessages } from '../utils/errors.js';

export const signupUser = async (request, reply) => {
    try {
        const userData = request.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userData.senha, salt);

        userData.senha = hashPassword;

        const dateNow = new Date(Date.now());

        userData.data_criacao = dateNow;
        userData.data_atualizacao = dateNow;
        userData.ultimo_login = dateNow;

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
        const isPasswordMatch = await bcrypt.compare(senha, user.senha);
        if (isPasswordMatch) {
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
        } else {
            reply.code(401).send({ mensagem: errorsMessages.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD });
        }

    } catch (error) {
        reply.code(401).send({ mensagem: errorsMessages.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD });
    }
}

export const getUser = (request, reply) => {

    const token = request.headers.authorization.replace(/^Bearer\s/, '');
    const userId = jwt.decode(token).id;


    try {
        const user = Users.findById(userId);
        if (user != null) reply.send({
            mensagem: errorsMessages.INVALID_TOKEN
        });

        reply.send(user);
    } catch (error) {
        reply.send(error);
    }
} 