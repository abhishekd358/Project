import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, unique:true, lowercase:true},
    password:{type:String, required:true, minlength:6},
    image:{type:String, default:""},
    address:{type:String, default:{line1, line2}},
    gender:{type:String, enum:["Male", "Female", "Other", "Not Selected"], default:"Not Selected"},
    dob:{type:String, default:"Not Selected"},
    phone:{type:Number, default:"0000"}
},
{timestamps:true}
)

// avoiding recompiling model during hot reload
const userModel = mongoose.models.User || mongoose.model("User", userSchema) 
export default userModel;