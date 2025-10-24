import User from "../models/user.model.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";



// user Registeration controller

const userRegister = async (req, res) => {
    // take the user input from the body
    const {name, email, password}= req.body

    // if no field above should not be empty
    if(!name || !email || !password){
        return res.json({message: "All field are required", success:false})
    }

    //check user must enter valid email with validtaor package
    if(!validator.isEmail(email)){
        return res.json({message: "Enter valid email address", success:false})
    }

    // name must be 2 char at least
    if(name.length < 2){
        return res.json({message: "name at least 2 characters", success:false})
    }

    // now check user enter password length should  not be less than 6 char
    if(password.length < 6){
        return res.json({message: "Password must be 6 characters", success:false})
    }

    // now check user email arelady exist in db ord not 
    const emailExists = await User.findOne({email})
    if(emailExists){
        return res.json({message: "Email already exists", success:false})
    }

    // now we hash the password 
    const hashPassword = await bcrypt.hash(password, 10)

    // other wise we create new user entry to db
    const newUser = await User.create({name, email, password:hashPassword})

    // when user register then we give him a token
    const token =  jwt.sign({id:newUser._id}, process.env.U_SECRET_KEY)

    return res.json({message: `${newUser.name} 🙏🏻 Welcome to AptDox 🎉`,token, success:true})

}



// new user login 

const userLogin = async (req, res) => {

    // take the user input from the body
    const {email, password}= req.body

    // if no field above should not be empty
    if(!email || !password){
        return res.json({message: "All field are required", success:false})
    }

    //check user must enter valid email with validtaor package
    if(!validator.isEmail(email)){
        return res.json({message: "Enter valid email address", success:false})
    }

    // now check user enter password length should  not be less than 6 char
    if(password.length < 6){
        return res.json({message: "Password must be 6 characters", success:false})
    }

    // now check user email arelady exist in db ord not 
    const user = await User.findOne({email})
    if(!user){
        return res.json({message: "User Not Found", success:false})
    }

    // IF USER EXISTS 
    // we hash the unhash the password
    const decodePassword = await bcrypt.compare(password, user.password) 
    console.log(decodePassword)
    // if password not decode return false
    if(!decodePassword){
        return res.json({message: "Please enter correct password", success:false})
    }

    // ELSE
    // measn user credentials correct then we allow to login and give me a token
    const token = jwt.sign({id:user._id}, process.env.U_SECRET_KEY)

    return res.json({message: `${user.name} 🙏🏻 Welcome back to AptDox 🎉`,token, success:true})

}


// get user profile data

const getUserProfile = async (req, res) => {
    
    try {
        const userId = req.userId

    // looking user data in the db
    if(!userId){
        return res({message: "Unathorize access", success:false})
    }

    const userData = await User.findById(userId).select('-password')
    return res.json({success: true, userData})
        
    } catch (error) {
        return res.json({message:error.message,success:false})
        
    }
}


// update user profile

const updateProfile = async (req, res) => {
    try {

        const {name, phone, address, gender,dob } = req.body
        const userId = req.userId
        const imageFile = req.file

        if( !name?.trim() || !phone?.trim() || !dob?.trim() || !gender?.trim()) {
            return res.json({message:"Some data is missing", success: false})
        }

        // find the user data using the userId
        await User.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob,gender})

        // for image
        if(imageFile){
            // upload in cloudinary
            const imgUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})

            // this return the image url of cloud
            const imgUrl = imgUpload.secure_url

            // now we save imgUrl to db
            await User.findByIdAndUpdate(userId, {image:imgUrl})
        }

        return res.json({message:"Profile updated successfully!", success:true})

        
    } catch (error) {
        return res.json({message:error.message,success:false})
        
    }
    
}


// ========================== APPOINTMENT
// user booking appointment 


const bookAppointment = async (req, res) => {
    // when user book the appointment we take few fields
    const {docId, slotDate, slotTime } = req.body
    const userId = req.userId

  
    //  now we fetch the doctor is availble or not from doctor model
    const docData = await Doctor.findById(docId).select('-password')

    // if doctor  availble field is false 
    if(!docData.available){
        return res.json({message:`${docData.name} is not available for appointment.`, success:false})
    }

    // if our doctor is availble 

    // then we check how much slots or booked & availble
    let slots_booked = docData.slots_booked

    // user ne chooose kiye date par check karege ki kitne slots time availble hai ya nahi
    if(slots_booked[slotDate]){ // on user choose date our doctor availble and if already in that date the user time already present means docotr not availble
        if(slots_booked[slotDate].includes(slotTime)){
                return res.json({message:'Slot not available.', success:false})
        }else{
            // if include nahi hai time means docotr available hai 
            slots_booked[slotDate].push(slotTime)
        }

    }else{
        // means user ne choose kiye din par doctor ke pas kohi booking nahi hai to hum new book slot banayenge
        slots_booked[slotDate] = []
        slots_booked[slotDate].push(slotTime)
    }

    // ab user ne to date and time choose kar liya 
    //  now we store this info user info and appointment info  to appointment MODEL 
    const userData = await User.findById(userId).select('-password')

    // delete docData.slots_booked

    // sab information ek object mai store kar ke appointment MODEL mai save karenge
    const appointmentData = {
        userId, docId, userData, docData,
        amount:docData.fees, slotTime, slotDate, 
        date:Date.now()
    }

    await Appointment.create(appointmentData)
    
    // doctor appintment mai bhi save karenge user appoitment 
   const doc = await Doctor.findByIdAndUpdate(docId, {slots_booked})

    return res.json({message: `Appointment booked with ${doc.name}`, success:true})

}



// ========== get doctor appointment data
const getMyAppointment = async (req, res) => {

    try {
     const userId = req.userId
    
     
     const appointments = await Appointment.find({userId})
    //  console.log('+++++++++++++',appointments);
    
    return res.json({appointments, success:true})   
    } catch (error) {
       console.log(error);
       return res.json({message:error.message, success:false})
        
    }

    
}


// ============================ cancel appointement

const cancelAppointment = async (req, res) => {
    
    try {
        console.log("++++++++++==1")
        const userId = req.userId
        console.log("--------------", userId);
    // taking appointment id from user frontend
    const {id} = req.body 
    const appointmentChoose = await Appointment.findOne({_id:id, userId})
    //  if not found any appointment
    if(!appointmentChoose){
        return res.json({ message: "Appointment Not Found", success: false });
    }
    // else
    appointmentChoose.cancelled = true
    await appointmentChoose.save();


    //  now also we have to remove the slot from the appointment as well as from Doctor Database
    const {docId, slotDate, slotTime} = appointmentChoose
    // finding docotr in db for removing slot
    const doctorData = await Doctor.findById(docId)
    // take all slot_booked from the doctor database
    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter((t)=> t !== slotTime) // we use filter to remove the user cancel time and again we store the array of time 

    await Doctor.findByIdAndUpdate(docId, {slots_booked})

    return res.json({message:"Appointment Cancelled", success:true})
        
    } catch (error) {
        console.log(error);
        return res.json({ message: error.message, success: false }); 
    }
}



// =========================================== payment method controller






export {userLogin, userRegister, getUserProfile, updateProfile, bookAppointment, getMyAppointment,cancelAppointment}