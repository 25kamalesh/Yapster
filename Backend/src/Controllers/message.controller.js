import User from "../Models/Users.model.js";
import Message from "../Models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/Socket.js";

export const getUsersForSidebar = async (request, response, next) => {
    try{
        const loggedInUserId = request.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-passcode ");
        if (filteredUsers.length === 0) {
            return response.status(200).json([]);
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
        
        console.log("Getting messages between:", loggedInUserId, "and", userToChatWithId);
        
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId, receiverId: userToChatWithId },
                { senderId: userToChatWithId, receiverId: loggedInUserId }
            ]
        }).sort({ createdAt: 1 }); // Sort by creation date ascending
        
        console.log("Found messages:", messages.length);
        response.status(200).json(messages);
    }
    catch(error) {
        console.error("Error in getMessages:", error);
        next(error)
}}

export const sendMessage = async (request, response, next) => {
    try {
        const { text, Image } = request.body;
        console.log("Request body:", { text, Image: Image ? "Image present" : "No image" });
        
        const senderId = request.user._id;
        const receiverId = request.params.id;
        let imageUrl;
        
        if (Image) {
            console.log("Uploading image to Cloudinary...");
            const uploadResponse = await cloudinary.uploader.upload(Image);
            imageUrl = uploadResponse.secure_url;
            console.log("Cloudinary URL:", imageUrl);
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            Image: imageUrl
        });
        
        console.log("Saving message:", { text, Image: imageUrl });
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } 
        response.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });
    }
   

    catch(error) {
        console.error("Error in sendMessage:", error);
        next(error)
    }
}
