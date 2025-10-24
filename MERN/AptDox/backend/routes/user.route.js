import express from 'express'
import { bookAppointment, cancelAppointment, getMyAppointment, getUserProfile, updateProfile, userLogin, userRegister } from '../controllers/user.controller.js'
import { authUser } from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()


// Register
// api/user/register
//method : post
userRouter.post('/register', userRegister)

// Login
// api/user/login
//method : post
userRouter.post('/login', userLogin)

// Login
// api/user/get-user-profile
//method : get
userRouter.get('/get-user-profile',authUser, getUserProfile)

// Login
// api/user/user-profile
//method : post
userRouter.put('/update-profile',upload.single('image'),authUser, updateProfile)


// appointment
// api/user/book-appointment
//method : post
userRouter.post('/book-appointment',authUser, bookAppointment)



// user-appointments
// api/user/user-appointments
//method : get
userRouter.get('/user-appointments',authUser, getMyAppointment)


// cancel-appointments
// api/user/cancel-appointments
//method : post
userRouter.post('/cancel-appointment',authUser, cancelAppointment)





export default userRouter;