import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
})


export const AdminDB = mongoose.model("Admin", adminSchema)