import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{type: String, required:true},
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    credit:{type: Number, default: 100}
})


export const UserDB = mongoose.model('user', userSchema);