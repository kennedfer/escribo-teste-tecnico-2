import { Users } from "../models/models.js";
import { friendlyErrors } from "../utils/errors.js";
import { usersUtils } from "../utils/index.js";

export const emailIsAlreadyUsed = async (request, reply) => {
    const { email } = request.body;
    const user = await Users.findOne({ email });

    if (usersUtils.userIsNotNull(user)) reply.send(friendlyErrors.EMAIL_ALREADY_USED);
}

export const emailNotRegistered = async (request, reply) => {
    const { email } = request.body;
    const user = await Users.findOne({ email });

    if (usersUtils.userIsNull(user)) reply.send(friendlyErrors.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD);
}

export const dontHasAuthorizationHeader = async (request, reply) => {
    if (!request.headers.authorization)
        reply.send(friendlyErrors.INVALID_TOKEN);

    request.token = request.headers.authorization.replace(/^Bearer\s/, '');
}