import { Router } from "express";
import { getUsersForSidebar , getMessages, sendMessage } from "../Controllers/message.controller.js";
import  protectedRoute  from "../Middlewares/auth.middleware.js";

const messageRouter = Router();

messageRouter.get('/users' , protectedRoute , getUsersForSidebar)
messageRouter.get('/:id' , protectedRoute , getMessages)
messageRouter.post("/send/:id" , protectedRoute , sendMessage)

export default messageRouter;
