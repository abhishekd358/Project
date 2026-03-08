import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp:{type: String, required:true},
    email:{type:String, required: true},
    attempts:{type:Number, default:0},
    verified: { type: Boolean, default: false },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:600
    }
})


const otpDB = mongoose.models.otpSchema || mongoose.model('Otp', otpSchema)
export default otpDB