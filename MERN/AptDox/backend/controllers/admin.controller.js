import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import Doctor from '../models/doctor.model.js'
import jwt from 'jsonwebtoken'
import Appointment from '../models/appointment.model.js'
import User from '../models/user.model.js'

// API for adding doctor 
const addDoctor = async(req, res)=>{
    try{
        // --------------------------------taking information from Doctor from frontend

        const {name, email, password,speciality,degree, experience, about, fees, address} = req.body;
        // to get file
        const imgFile = req.file;
        // testing above value getting or not
        // console.log({name, email, password,speciality,degree, experience, about, fees, address},imgFile)

        // check all abover field are necessary 
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({message:"🔴 Please fill all details.", success: false})
        }
        // check email formating is correct or not with validator pakage
        if(!validator.isEmail(email)){
            return res.json({message:"📩 Please enter a valid email.", success:false})
        }

        // check is doctor already email arelady exist in db
        const alreadyExist = await Doctor.findOne({email})
        if(alreadyExist){
            return res.json({message:"😷 Email id already exists", success:false})
        }

        // please enter a strong password
        if(password.length < 6){
            return res.json({message:"🔑 Password should be minimum 6 characters.", success:false})
        }

        //hash the password 
        const hashPwd = await bcrypt.hash(password, 10)


        // we upload the image to cloudinary
        const imageUpload = cloudinary.uploader.upload(imgFile.path, {resource_type: "image"})
        // after upload to cloaudinary we get the link of image
        const imgURL = (await imageUpload).secure_url

        const doctorData = {
            name,
            email,
            image:imgURL,
            password:hashPwd,
            speciality,
            degree,experience,about,fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        // ---------------------------storing all info of Doctor in DB
        const newDoctor = await Doctor.create(doctorData)

        return res.json({message:`${newDoctor.name}, you added successfully 🎈`, success:true})


    }
    catch(error){
        return res.json({message:error.message, success:false})
    }
}

// admin api for handling docotr 

const adminLogin = async (req, res) => {
    try {

        // we not stroring the admin the db we use env varibale to check the admin correct or not.we HARD CODE the admin Login 
        const {email, password} = req.body
        // console.log(email, password)
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            // generate a token
            const token = jwt.sign(email+password, process.env.A_SECRET_KEY)
            return res.json({adminToken:token, success:true})
        }else{
            return res.json({message:"Please Enter Valid Credentials.", success:false})
        }

        
    } catch (error) {
        return res.json({message:error.message, success:false})   
    }
}



// Get all Docotor Data 


const allDoctors = async (req, res) => {
    try {
        
        const doctors = await Doctor.find({}).select('-password') //exclude the specific property from the document       
       return res.json({doctors,success:true})  
    } catch (error) {
        console.log(error)
       return res.json({message:error.message, success:false})
        
    }
    
}


// Get all appointment list 

const getAllAppointment = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
        return res.json({appointments,success:true})
    } catch (error) {
       return res.json({message:error.message, success:false})
    }
}


// appointment cancelleation


// ================ Cancel Appointment===================
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    //Validate input
    if (!appointmentId) {
      return res.json({ message: "Appointment ID is required", success: false });
    }

    //  Find appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.json({ message: "Appointment not found", success: false });
    }

    //  Mark appointment as cancelled
    if (appointment.cancelled) {
      return res.json({ message: "Appointment already cancelled", success: false });
    }

    appointment.cancelled = true;
    await appointment.save();

    //remove the booked slot from doctor’s record
    const { docId, slotDate, slotTime } = appointment;
    const doctor = await Doctor.findById(docId);

    if (!doctor) {
      return res.json({ message: "Doctor not found", success: false });
    }

    let slots_booked = doctor.slots_booked || {};

    if (slots_booked[slotDate]) {
      // Remove the cancelled slot time safely
      slots_booked[slotDate] = slots_booked[slotDate].filter((t) => t !== slotTime);

      // If no slots remain for that date, delete the date key
      if (slots_booked[slotDate].length === 0) {
        delete slots_booked[slotDate];
      }

      await Doctor.findByIdAndUpdate(docId, { slots_booked });
    }

    //  Return response
    return res.json({ message: "Appointment cancelled successfully", success: true });

  } catch (error) {
    // console.error("Cancel Appointment Error:", error);
    return res.json({ message: error.message, success: false });
  }
};

// ============================== ADmin Dashbord

const adminDashboard = async (req, res) => {
  try {
    
    // first we take all the info from the databases
    const doctors = await Doctor.find({})
    const users = await User.find({})
    const appointments = await Appointment.find({})


    // here we counting number docotrs, appointment and users
    const dashData = {
      doctors : doctors.length,
      appointments : appointments.length,
      patients:users.length,

      // latest apointmetnt ko show karenge
      latestAppointments: appointments.reverse().slice(0, 5)
    }
    return res.json({dashData, success:true})
    
  } catch (error) {
    // console.error("Cancel Appointment Error:", error);
    return res.json({ message: error.message, success: false });
  }
}


export {addDoctor, adminLogin, allDoctors, getAllAppointment, cancelAppointment, adminDashboard}