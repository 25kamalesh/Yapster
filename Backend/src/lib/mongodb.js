import mongoose from 'mongoose'
import ENV_VARS from '../config/env.js'

const MONGO_URI = ENV_VARS.MONGO_URI

if (!MONGO_URI) {
    throw new Error ("ERROR READING MONGO_URI..PLEASE CHECK ITS AVAILABILITY")
}

const mongoConnect  = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("CONNECTED TO DB👍")
    }
    catch(error) {
        console.log("ERROR CONNECTING TO DB" , error)
    }
}

export default mongoConnect