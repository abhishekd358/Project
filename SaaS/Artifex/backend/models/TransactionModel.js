
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:{type: String, required: true},
    plan:{type: String, required:true, unique:true},
    amount: {type:Number, required:true},
    credits: {type:Number, required:true},
    payment: {type:Boolean, default:false},
    date: {type: Number},
})

export const transactionModel = mongoose.model('Transaction', transactionSchema)