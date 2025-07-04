import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './Routes/auth.Routes.js';
import dotenv from 'dotenv'
import ENV_VARS  from './config/env.js';
import mongoConnect from './lib/mongodb.js';
import ErrorHandler from './Middlewares/error.middleware.js';
import messageRouter from './Routes/message.Routes.js';
import cors from 'cors';
import { app , server, io } from './lib/Socket.js'; // Import the app and server from Socket.js
import path from 'path';



dotenv.config()
const PORT = ENV_VARS.PORT
const NODE_ENV = ENV_VARS.NODE_ENV
const __dirname = path.resolve(); // Get the current directory path

app.use(cors({
    origin: [
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "https://5cd9-2406-7400-c4-84b3-c41c-ede8-88cc-7539.ngrok-free.app"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
})); // Enable CORS

// Increase payload size limits for image uploads
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser()) // Add cookie parser middleware

app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/messages' , messageRouter)

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
}

app.use(ErrorHandler)
server.listen(PORT, async () => {
    console.log(`APP LISTENING ON PORT ${PORT}`)
    await mongoConnect()
})