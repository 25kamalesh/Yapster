import express from 'express';
import authRouter from './Routes/auth.Routes.js';
import dotenv from 'dotenv'
import  ENV_VARS  from './config/env.js';
import mongoConnect from './lib/mongodb.js';
import ErrorHandler from './Middlewares/error.middleware.js';

dotenv.config()
const app = express()
const PORT = ENV_VARS.PORT 


app.use(express.json())
app.use('/api/v1/auth' , authRouter)


app.use(ErrorHandler)
app.listen(PORT, async () => {
    console.log(`APP LISTENING ON PORT ${PORT}`)
    await mongoConnect()
})