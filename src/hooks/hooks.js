import { Users } from "../models/models";

export async function emailIsAlreadyUsed(request, reply) {
    const { email } = request.body;
    const user = await Users.findOne({ email });
    if (user == null) reply.send({
        mensagem
    });
}
