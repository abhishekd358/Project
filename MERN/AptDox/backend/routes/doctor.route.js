import express from 'express'
import { appointmentsOfDoctor, cancelAppointment, completeAppointment, docDashboard, docProfileUpdate, doctorList, getDoctorProfile, loginDoctor } from '../controllers/doctor.controller.js'
import doctorAuth from '../middlewares/doctorAuth.js'


const doctorRouter = express.Router()


doctorRouter.get('/list', doctorList)


doctorRouter.post('/login', loginDoctor)



// ================= for doctor pages

doctorRouter.get('/appointments', doctorAuth,appointmentsOfDoctor)
doctorRouter.put('/cancel-appointments', doctorAuth,cancelAppointment)
doctorRouter.put('/complete-appointments', doctorAuth,completeAppointment)
doctorRouter.get('/dashboard', doctorAuth,docDashboard)

// profile
doctorRouter.get('/profile', doctorAuth,getDoctorProfile)
doctorRouter.put('/update-profile', doctorAuth,docProfileUpdate)


export default doctorRouter