import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './Routes/auth.Routes.js';
import dotenv from 'dotenv'
import ENV_VARS  from './config/env.js';
import mongoConnect from './lib/mongodb.js';
import ErrorHandler from './Middlewares/error.middleware.js';
import messageRouter from './Routes/message.Routes.js';
import cors from 'cors';

dotenv.config()
const app = express()
const PORT = ENV_VARS.PORT


app.use(express.json())
app.use(cookieParser()) // Add cookie parser middleware
app.use(cors( {
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent with requests        
})); // Enable CORS

app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/message' , messageRouter)

app.use(ErrorHandler)
app.listen(PORT, async () => {
    console.log(`APP LISTENING ON PORT ${PORT}`)
    await mongoConnect()
})