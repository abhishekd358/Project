import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String},
    phone:{type:String, required:true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",//collection name
        required: true
    }
}, {timestamps:true})


export const Contact = mongoose.model("Contact", contactSchema)