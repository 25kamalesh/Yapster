import mongoose from "mongoose";
import User from "../Models/Users.model.js";
import bcrypt from "bcryptjs";
import tokenGeneration from "../lib/token.js";
import cloudinary from "../lib/cloudinary.js";


const signUp = async (request, response, next) => {
    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
        const { email, Fullname, passcode } = request.body;

        if (!(email.trim()) || !(Fullname.trim()) || !(passcode.trim())) {
            const error = new Error("Please Enter all the Fields")
            error.statusCode = 400
            throw error
        }

        if (passcode.length < 6) {
            const error = new Error("PASSCODE MUST BE GREATER THAN 6 character")
            error.statusCode = 400
            throw error
        }

        const usercheck = await User.findOne({ email });
        if (usercheck) {
           const error = new Error("User already exists")
           error.statusCode = 409
           throw  error
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassocode = await bcrypt.hash(passcode, salt);

        const newUser = await User.create(
            [{
                email: email,
                Fullname: Fullname,
                passcode: hashedPassocode,
            }],
            { session: session }
        );

        tokenGeneration(newUser._id, response);
        await session.commitTransaction();
        response.status(201).json({
            success: true,
            message: "user Created",
            _id: newUser[0]._id,
            email: newUser[0].email,
            Fullname: newUser[0].Fullname
            });

    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        await session.endSession();
    }
};

const SignIn = async (request, response , next) => {
    const {email , passcode} = request.body
    try{
       const user  =  await User.findOne({email})
       if(!user) {
        const error = new Error ("Such a user does not exist...Please sign Up!!")
        error.statusCode = 404
        throw error
       }
       const isPasscodeCorrect = await bcrypt.compare(passcode , user.passcode)

       if (!isPasscodeCorrect) {
        const error = new Error ("Please Enter Valid passcode")
        error.statusCode = 401
        throw error
       }

       tokenGeneration(user._id , response)
       response.status(200).json({
        success: true,
        _id: user._id,
        email: user.email,
        profilePicture: user.profilePicture
       })

    }

    catch(error) {
        next(error)
    }
}

const signOut = (request, response ,next) => {
    try{
    response.cookie("jwt" , "" , {maxAge:0})
    response.status(200).json({
        success: true,
        message: "Logout Successfull"}) 
    }
    catch(error) {
        next(error)
    }
    
};

const updateprofile = async (request , response , next) => {
    try{
    const {profilePicture} = request.body
    const userId = request.user._id;

    if (!profilePicture) {
        const error = new Error("Please provide a profile picture URL");
        error.statusCode = 400;
        throw error
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePicture)
    const updatedUser =await User.findByIdAndUpdate(userId,{profilePicture:uploadResponse.secure_url},{new:true});

} 

    catch (error) {
        next(error);
    }
}

const checkauth = (request, response, next) => {
    try{
        response.status(200).json({
            message: "You are authenticated",
            user: request.user
        })
    }
    catch(error) {
        next(error)
    }
}

export { signUp, SignIn, signOut  ,updateprofile , checkauth};