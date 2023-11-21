import jwt from 'jsonwebtoken';

const TOKEN_OPTIONS = {
    expiresIn: '30m'
}
const JWT_SECRET = process.env.JWT_SECRET;

export const createToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, TOKEN_OPTIONS)
}

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET).id;
}