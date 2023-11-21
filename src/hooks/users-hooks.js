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

    if (user == null) reply.send({
        message: errorsMessages.EMAIL_NOT_REGISTERED_OR_WRONG_PASSWORD
    });
}

export function dontHasAuthorizationHeader(request, reply) {
    //fazer funçoes aaaaaaaaaa
    console.log("eososo");
    try {
        if (!request.headers.authorization)
            reply.send({
                mensagem: errorsMessages.INVALID_TOKEN
            });
        console.log("saiu");
    } catch (error) {
        console.error('Erro:', error);
        reply.code(500).send('Erro interno do servidor');
    }
}