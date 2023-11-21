import { Users } from '../models/models.js';
import { friendlyErrors } from '../utils/errors.js';
import { dateUtils, encryptUtils, responseUtils, tokensUtils } from '../utils/index.js';

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
            user.token = tokensUtils.createToken({ id: user["_id"] });
            reply.send(responseUtils.createResponse(user));

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
        const passwordNotMatch = !encryptUtils.match(senha, user.senha);
        if (passwordNotMatch) reply.code(401).send(friendlyErrors.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD);

        user["ultimo_login"] = dateUtils.getCurrentDate();
        await user.save();

        user.token = tokensUtils.createToken({ id: user["_id"] });
        reply.send(responseUtils.createResponse(user));

    } catch (error) {
        reply.code(401).send(friendlyErrors.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD);
    }
}

export const getUser = async (request, reply) => {
    try {
        const userId = tokensUtils.verifyToken(request.token);
        const user = await Users.findById(userId);

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