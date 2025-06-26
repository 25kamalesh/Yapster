import ENV_VARS from "../config/env.js"
import jwt from 'jsonwebtoken'

const { JWT_EXPIRES_IN  , JWT_SECRET , NODE_ENV}  = ENV_VARS

const tokenGenerattion = (userId , response) => {
    const token  = jwt.sign({userId} , JWT_SECRET , {expiresIn:JWT_EXPIRES_IN})
    response.cookie('jwt', token , {
        httpOnly: true,
        secure: NODE_ENV === "production",
        maxAge: JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    })
}

export default tokenGenerattion