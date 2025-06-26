import mongoose from "mongoose";
import User from "../Models/Users.model.js";
import bcrypt from "bcryptjs";
import tokenGenerattion from "../lib/token.js";

const signUp = async (request, response, next) => {
    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
        const { email, fullname, passcode } = request.body;
        console.log(typeof passcode);

        if (passcode.length < 6) {
            const error = new Error("PASSCODE MUST BE GREATER THAN 6 character")
            error.statusCode = 400
            throw error
        }

        const usercheck = await User.findOne({ email });
        if (usercheck) {
            return next(new Error("USER ALREADY EXISTS"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassocode = await bcrypt.hash(passcode, salt);

        const newUser = await User.create(
            {
                email: email,
                fullname: fullname,
                passcode: hashedPassocode,
            },
            { session: session }
        );

        tokenGenerattion(newUser._id, response);
        await session.commitTransaction();
        response.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            fullname: newUser.fullname,
        });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        await session.endSession();
    }
};

const SignIn = (request, response) => {
    response.status(200).json({
        Success: true,
        Data: "lets login ",
    });
};

const signOut = (request, response) => {
    response.status(200).json({
        Success: true,
        Data: "expecting you soon",
    });
};

export { signUp, SignIn, signOut };