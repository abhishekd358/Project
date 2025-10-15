import mongoose from "mongoose";

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI, 
            {dbName: "AptDox"}
        )
        console.log("📮 Database connected successfully!")
                
    } catch (error) {
        console.error("Database connection error:", error.message)
        process.exit(1)
    }
} 

export default connectDB;