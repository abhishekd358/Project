import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{type:String, required:true},
    desc:{type:String, required:true},
    isCompleted:{type:Boolean, default:false},
})


const todoModel = mongoose.models.todo || mongoose.model('todo', todoSchema)

export default todoModel