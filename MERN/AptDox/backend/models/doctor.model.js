import mongoose, { mongo } from "mongoose";


const doctorSchema = new mongoose.Schema({
   name: {type: String, required:true, trim:true},
   email: {type: String, required:true, unique:true},
   password: {type:String, required:true, minlength:6},
   image: {type:String, required:true},
   speciality: {type:String, required:true},
   degree: {type:String, required:true},
   experience: {type:String, required:true},
   about: {type:String, required:true},
   available: {type:Boolean, required:true},
   fees: {type:Number, required:true},
   address: {type:Object, required:true},
   date: {type:Number, required:true},
   slots_booked:{type:Object, default:{}} // storing default empty value in object
}, 
{minimize:true},
{timestamps:true} // for to store empty value we have to use this
)
// export const DoctorSchema = mongoose.Model("doctor", doctorSchema)    ----- my logic
// to not repeately create again again shcema if it arelady created then we use model.docotrs

const DoctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema) //----industrial

export default DoctorSchema;