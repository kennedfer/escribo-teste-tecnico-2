import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashEncrypt = (data) => {
    return bcrypt.hashSync(data, saltRounds);
}

export const compare = (data, encryptData) => {
    return bcrypt.compareSync(data, encryptData);
}