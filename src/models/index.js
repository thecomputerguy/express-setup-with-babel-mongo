import mongoose from 'mongoose'
import User from './users'
import Message from "./messages";

const connectToDb = () => {
    return mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
}

export {connectToDb}

export default {User, Message}