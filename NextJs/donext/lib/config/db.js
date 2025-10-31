import mongoose from "mongoose";

const connectDB =  async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{dbName:'DONEXT-Todo'})
        console.log('Database connected successfully.')
    } catch (error) {
        console.log(error.message) 
    }
}

export default connectDB;