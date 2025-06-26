import { response, Router } from "express";
import {signUp, SignIn, signOut} from "../Controllers/auth.Controller.js";
const authRouter = Router()

authRouter.post('/SignUp' , signUp )

authRouter.post('/SignIn' , SignIn)

authRouter.post('/SignOut' , signOut)

export default authRouter   