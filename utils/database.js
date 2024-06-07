import mongoose from 'mongoose'
import mangoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    
    if (isConnected) {
        console.log("MongoDB is already connected")
        return
    }

    try {
        await mangoose.connect(process.env.MONGODB_URL, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        isConnected = true
        console.log("MongoDB is connected")
        
    } catch (error) {
        console.log("this is mangoose error",error)
    }
}