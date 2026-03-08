import express from "express"
import { sendOTP, verifyOTP } from "../controllers/otp.controller.js"


const otpRouter = express.Router()



// route for send otp
otpRouter.post("/send-otp", sendOTP)


// verify otp
otpRouter.post("/verify-otp", verifyOTP)




export default otpRouter;