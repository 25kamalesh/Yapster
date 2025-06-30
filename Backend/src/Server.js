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


app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
})); // Enable CORS

// Increase payload size limits for image uploads
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser()) // Add cookie parser middleware

app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/message' , messageRouter)

app.use(ErrorHandler)
app.listen(PORT, async () => {
    console.log(`APP LISTENING ON PORT ${PORT}`)
    await mongoConnect()
})