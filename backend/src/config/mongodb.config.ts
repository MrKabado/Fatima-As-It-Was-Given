import mongoose from "mongoose"
import 'dotenv/config'

const URI:string = String(process.env.MONGODB_URI)

export const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.error("MongoDB connection error:", error)
        process.exit(1)
    }
}