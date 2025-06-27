import User from "../Models/Users.model.js"
import ENV_VARS from "../config/env.js";
import jwt from "jsonwebtoken";

const protectedRoute  = async (request , response , next) => {
    try{
    const token  = request.cookies.jwt // Fixed: cookies (plural), not cookie
    
    if (!token) {
        const error = new Error("You are not authenticated. Please sign in.");
        error.statusCode = 401;
        throw error; // Added missing throw
    }

    const decodedToken = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decodedToken) {
        const error = new Error("Invalid token. Please sign in again.");
        error.statusCode = 401;
        throw error;
    }
    const userId = decodedToken.userId;
    const user = await User.findById(userId).select("-passcode");
    if (!user) {
        const error = new Error("User not found. Please sign in again.");
        error.statusCode = 404;
        throw error;
    }
    request.user = user; // Attach user to the request object
    next(); // Proceed to the next middleware or route handler
}

   catch(error) { 
    next(error)
}
}

export default protectedRoute