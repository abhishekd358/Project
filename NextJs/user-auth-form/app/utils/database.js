import mongoose from "mongoose"


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://abhidhaware1234:0cNSfkcG3SA9fBQj@cluster0.wuxv9he.mongodb.net/",{dbName:'nextUserAuth'}).then(()=>console.log("DB Connected Successfully.")).catch((error)=>error.message)
    
}

export default connectDB;