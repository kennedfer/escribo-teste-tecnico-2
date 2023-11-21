const TOKEN_OPTIONS = {
    expiresIn: '30m'
}

export const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, TOKEN_OPTIONS)
}