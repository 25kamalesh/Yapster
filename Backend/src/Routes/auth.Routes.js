import {  Router } from "express";
import {signUp, SignIn, signOut, updateprofile} from "../Controllers/auth.Controller.js";
import protectedRoute from "../Middlewares/auth.middleware.js";
const authRouter = Router()

authRouter.post('/SignUp' , signUp )

authRouter.post('/SignIn' , SignIn)

authRouter.post('/SignOut' , signOut)

authRouter.put('/update-profile' , protectedRoute , updateprofile)
export default authRouter   