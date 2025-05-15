import mongoose from "mongoose";


const ImageSchema = new mongoose.Schema({
    public_id : {type:String, require:true},
    img_url: {type:String, require:true},
    Image_name:{type:String},
}, {timestamps:true})


export const ImageDB = mongoose.model('ImageDB',ImageSchema)
