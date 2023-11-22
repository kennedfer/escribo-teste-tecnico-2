import { Users } from '../models/models.js';
import { FRIENDLY_ERRORS_RESPONSES } from '../utils/errors.js';
import { dateUtils, encryptUtils, responseUtils, tokensUtils, usersUtils } from '../utils/index.js';

export const signupUser = async (request, reply) => {
    try {
        const dateNow = dateUtils.getCurrentDate();

        const userData = {
            ...request.body,
            data_criacao: dateNow,
            data_atualizacao: dateNow,
            ultimo_login: dateNow
        };

        userData.senha = encryptUtils.hashEncrypt(userData.senha);
        const user = new Users(userData);

        try {
            await user.save();
            user.token = tokensUtils.createToken({ id: user["_id"] });
            reply.send(responseUtils.createResponse(user));

        } catch (error) {
            reply.send(FRIENDLY_ERRORS_RESPONSES.INTERNAL_SERVER_ERROR_TRY_AGAIN);
        }
    } catch (error) {
        reply.send(FRIENDLY_ERRORS_RESPONSES.INTERNAL_SERVER_ERROR);
    }
}

export const longinUser = async (request, reply) => {
    const { email, senha } = request.body;
    const user = await Users.findOne({ email });

    try {
        const passwordNotMatch = !encryptUtils.match(senha, user.senha);
        if (passwordNotMatch) reply.code(401).send(FRIENDLY_ERRORS_RESPONSES.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD);

        user["ultimo_login"] = dateUtils.getCurrentDate();
        await user.save();

        user.token = tokensUtils.createToken({ id: user["_id"] });
        reply.send(responseUtils.createResponse(user));

    } catch (error) {
        reply.send(FRIENDLY_ERRORS_RESPONSES.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD);
    }
}

export const getUser = async (request, reply) => {
    try {
        const userId = tokensUtils.verifyTokenAndGetId(request.token);
        const user = await Users.findById(userId);

        if (usersUtils.userIsNull(user)) reply.send(FRIENDLY_ERRORS_RESPONSES.INVALID_TOKEN);

        reply.send(user);
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError': {
                reply.send(FRIENDLY_ERRORS_RESPONSES.EXPIRED_TOKEN);
                break;
            }
            case 'JsonWebTokenError': {
                reply.send(FRIENDLY_ERRORS_RESPONSES.INVALID_TOKEN);
                break;
            }
            default: {
                reply.send(FRIENDLY_ERRORS_RESPONSES.INTERNAL_SERVER_ERROR_TRY_AGAIN);
            }
        }

    }
} 