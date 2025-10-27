import express from 'express'
import { appointmentsOfDoctor, doctorList, loginDoctor } from '../controllers/doctor.controller.js'
import doctorAuth from '../middlewares/doctorAuth.js'


const doctorRouter = express.Router()


doctorRouter.get('/list', doctorList)


doctorRouter.post('/login', loginDoctor)



// ================= for doctor pages

doctorRouter.get('/appointments', doctorAuth,appointmentsOfDoctor)

export default doctorRouter