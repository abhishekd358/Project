import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
})


export const UserDB = mongoose.model("Users", userSchema)