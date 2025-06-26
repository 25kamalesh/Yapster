import dotenv from 'dotenv'
dotenv.config()

 const ENV_VARS = {
    JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI:process.env.MONGO_URI,
    PORT : process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
}
export default ENV_VARS;