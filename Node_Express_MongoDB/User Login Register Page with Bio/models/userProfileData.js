import mongoose from 'mongoose';



const profileData = new mongoose.Schema({
    name : {type: String},
    email: {type: String, unique:true},
    password:{type: String},
    img_url : {type: String},
    public_id:{type: String},
}
)


export const profileDB = mongoose.model("userdetails", profileData)