import { Users } from "../models/models.js";
import { errorsMessages } from "../utils/errors.js";

export async function emailIsAlreadyUsed(request, reply) {
    const { email } = request.body;
    const user = await Users.findOne({ email });

    if (user != null) reply.send({
        message: errorsMessages.EMAIL_ALREADY_USED
    });
}

export async function emailNotRegistered(request, reply) {
    const { email } = request.body;
    const user = await Users.findOne({ email });

    if (user != null) reply.send({
        message: errorsMessages.EMAIL_ALREADY_USED
    });
}
