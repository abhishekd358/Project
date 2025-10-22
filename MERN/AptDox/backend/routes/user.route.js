import express from 'express'
import { userLogin, userRegister } from '../controllers/user.controller.js'


const userRouter = express.Router()


// Register
// api/user/register
//method : post
userRouter.post('/register', userRegister)

// Login
// api/user/login
//method : post
userRouter.post('/login', userLogin)



export default userRouter;