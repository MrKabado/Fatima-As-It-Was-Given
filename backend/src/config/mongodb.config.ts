import mongoose from "mongoose"
import 'dotenv/config'

const URI:string = String(process.env.MONGODB_URI)

export const connectDB = async () => {
    try {
        if (!URI || URI === 'undefined') {
            throw new Error("MONGODB_URI environment variable is not set")
        }

        await mongoose.connect(URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            connectTimeoutMS: 30000, // 30 seconds
            retryWrites: true,
            w: 'majority'
        })
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.error("MongoDB connection error:", error)
        process.exit(1)
    }
}