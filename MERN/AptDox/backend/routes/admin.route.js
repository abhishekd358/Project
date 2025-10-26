import express from 'express'
import { addDoctor, adminLogin, allDoctors, cancelAppointment, getAllAppointment } from '../controllers/admin.controller.js'
import upload from '../middlewares/multer.js'  // multer config as middleware
import { authAdmin } from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctor.controller.js'




const adminRouter = express.Router()



// add-docotr route
// method- POST
//full path - localhost:3000/api/admin/add-doctor
adminRouter.post('/add-doctor', authAdmin,upload.single('image'), addDoctor)  // we sending image on backend with 'image' name

// admin login route
// method- POST
//full path - localhost:3000/api/admin/login
adminRouter.post('/login',adminLogin)

// get all doctors
// method- GET
//full path - localhost:3000/api/admin/login
adminRouter.get('/all-doctors',authAdmin,allDoctors)


// change avilability
// method- POST
//full path - localhost:3000/api/admin/login
adminRouter.patch('/change-availability',authAdmin,changeAvailability)

// get all appointment
// method- GET
//full path - localhost:3000/api/admin/login
adminRouter.get('/get-appointments',authAdmin,getAllAppointment)

// cancel appointmetnts
// method- PUT
//full path - localhost:3000/api/admin/login
adminRouter.put('/cancel-appointments',authAdmin,cancelAppointment)

// admin dashboard
// method- GET
//full path - localhost:3000/api/admin/login
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter

