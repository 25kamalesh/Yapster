import User from "../Models/Users.model.js";
import Message from "../Models/Message.model.js";

export const getUsersForSidebar = async (request, response, next) => {
    try{
        const loggedInUserId = request.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-passcode ");
        if (!filteredUsers) {
            const error = new Error("No users found");
            error.statusCode = 404;
            throw error;
        }
        response.status(200).json(filteredUsers);
    }   
    catch(error) {
        next(error)
    }
}

export const getMessages = async (request, response, next) => {
    try{
        const userToChatWithId = request.params.id;
        const loggedInUserId = request.user._id;
        const messages = await Message.find({
            $or: [
                { sender: loggedInUserId, receiver: userToChatWithId },
                { sender: userToChatWithId, receiver: loggedInUserId }
            ]
        });
        response.status(200).json(messages);
    }
    catch(error) {
        next(error)
}}

export const sendMessage = async (request, response, next) => {
    try {
        const { text, Image } = request.body;
        const senderId = request.user._id;
        const receiverId = request.params.id;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            Image: imageUrl
        });
        await newMessage.save();

// realtime Functionarlity with Socket.io to be implemented here 
        response.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });
    }
   

    catch(error) {
        next(error)
    }
}
