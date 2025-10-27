// import Doctor from "../models/doctor.model"

import Doctor from "../models/doctor.model.js"
import Appointment from "../models/appointment.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Available or not functinality we require in admin and Doctor as well

const changeAvailability = async (req, res) => {
    try {
        // taking docId that we wnat to change its available propery
        const {docId} = req.body
        // console.log(docId)
        
        // finding in db particaular docID
        
        const docData = await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId,{available: !docData.available})
        
        return res.json({message:`${docData.name} Availability Changed`,success:true})
        
    } catch (error) {
        console.log(error.message)
        return res.json({message:error.message , success:false})
    }
}



// ------------------------- frontend Doctor list showing

// http://localhost:3000/api/doctor/list 
const doctorList = async (req, res) => {
    try {
        const docList = await Doctor.find({}).select(['-password', '-email'])
        // console.log(docList)
        return res.json({docList, success:true})
        
    } catch (error) {
        console.log(error.message)
        return res.json({message:error.message , success:false})
    }
    
}



//  ==================== doctor login

const loginDoctor = async (req, res) => {
    try {
        const {email, password } = req.body
        const doctor = await Doctor.findOne({email})

        if(!doctor){
            return res.json({message:"Invalid credentials.", success:false})
        }

        // check the pasword
        const isMatch = await bcrypt.compare(password, doctor.password)

        // if password not math resturn 
        if(!isMatch){
            return res.json({message:"Please enter correct password.", success:false})
        }

        // if password correct then we genereate a token and allow to login 
        const dToken = jwt.sign({id:doctor._id}, process.env.D_SECRET_KEY)

        return res.json({message:'Login successful', success:true, doctorToken:dToken})

    } catch (error) {
        console.log(error.message)
        return res.json({message:error.message , success:false})
    }
}


// ================ get doctor appointment fro doctor Panel 

const appointmentsOfDoctor = async (req, res) => {
    try {
        const docId = req.docId
        const appointments = await Appointment.find({docId})
        // console.log(appointments)
        if(!appointments){
            return res.json({message:'No appointments found', success:false})
        }

        return res.json({appointments, success:true})

    } catch (error) {
      console.log(error.message)
        return res.json({message:error.message , success:false})   
    }
}


// ========================= for appointment completion by doctor

const completeAppointment = async (req, res) => {
    
    try {
        const docId = req.docId
        const {appointmentId} = req.body

        const appointmentData = await Appointment.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){
            appointmentData.isCompleted = true
            await appointmentData.save();
            return res.json({message: 'Appointment completed', success:true})
        }else{
            return res.json({message:"Failed to complete the appoinment.", success:false})
        }
        
    } catch (error) {
        console.log(error.message)
        return res.json({message:error.message , success:false})   
    }

}

// ========================= for appointment cancelled by doctor

const cancelAppointment = async (req, res) => {
    
    try {
        const docId = req.docId
        const {appointmentId} = req.body

        const appointmentData = await Appointment.findById(appointmentId)
        // console.log(appointmentData);
        

        if(appointmentData && appointmentData.docId === docId){
            appointmentData.cancelled = true
            await appointmentData.save();
            return res.json({message: 'Appointment cancelled ', success:true})
        }else{
            return res.json({message:"Failed to cancelled the appoinment.", success:false})
        }
        
    } catch (error) {
        console.log(error.message)
        return res.json({message:error.message , success:false})   
    }

}

// ============================ Doctor Dashboard

const docDashboard = async (req, res) => {
    
    try {
        const docId = req.docId
 
       // taking all the respective docotr all appoinmtents
        const appointmentData = await Appointment.find({docId})
        
        let earning = 0
        
            //  loop on every appoinment to fetch the amount 
        appointmentData.map((item)=>{
            // check appointmnet status jab tak complete ho or payment kar li ho user ne tabhi hum earning calaculate karenge
            if(item.isCompleted || item.payment){
                earning += item.amount
            }
        })

        // display no. of patient 
        let patients = []
        appointmentData.map((item)=>{
            // check karenge ke hamare aaray mai patient/user alrady present hai kay nahi hait to hum push karenge appointment
            if(!patients.includes(item.userId)){
                patients.push(item.userId) 
            }
        })
        const dashData = {
            earning,
            appointments: appointmentData.length,
            patients: patients.length,
            latestAppointments: appointmentData.reverse().slice(0,5)
        }
        return res.json({dashData, success:true})
        
        
    } catch (error) {
        console.log(error.message)
        return res.json({message:error.message , success:false})   
    }

}






export {changeAvailability, doctorList, loginDoctor,appointmentsOfDoctor, completeAppointment, cancelAppointment, docDashboard}