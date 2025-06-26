import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },

    Fullname:{
        type: String,
        required: true,
    },

    passcode: {
        type: String,
        required: true,
        
    },
    profilePicture: {
        type: String,
    }
},
{timestamps: true});

const User  = new mongoose.model("User" , userSchema)

export default User