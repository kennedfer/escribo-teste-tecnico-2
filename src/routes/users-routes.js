import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Users } from '../models/models';

export const signupUser = async (request, reply) => {
    try {
        const userData = request.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userData.password, salt);

        userData.password = hashPassword;

        const newUser = new Users(userData);
        try {
            const user = await newUser.save();
            reply.send(user);
        } catch (error) {
            reply.code(500).send("Erro nao criação do usuario");
        }
    } catch (error) {
        reply.code(400).send("Erro no hash");
    }
}

export const longinUser = async (request, reply) => {
    const { email, password } = new Users(request.body);
    const dbUser = await Users.findOne({ email });

    //CONSIDERANDO QUE A POHA DA ROTA VAI TER UMA VALIDAÇÃO DE EMAIL AAAAAAA
    try {
        const isPasswordMatch = await bcrypt.compare(password, dbUser.password);
        if (isPasswordMatch) {
            const token = jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            })
            reply.send({ token, userId: dbUser._id });
        } else {
            reply.code(400).send("senha errada meu comparça");
        }

    } catch (error) {
        reply.code(500).send("Error ao comparar as senhas");
    }
}