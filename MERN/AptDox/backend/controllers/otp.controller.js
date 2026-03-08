import otpDB from "../models/otp.model.js";
import generateOTP from "../utils/generateOTP.js";
import sendMail from "../utils/sendEmail.js";
import User from "../models/user.model.js"


export const sendOTP = async (req, res) => {
    try {
        // take email from user
        const {email} = req.body
        if(!email){
            return res.json({message:"Email required", success:false})
        }

        // check first in db is the user areday exist or not
        const emailExists = await User.findOne({email})
        if(emailExists){
            return res.json({message:"User Already Registered. Please Login", success:false})
        }

        const existingOtp = await otpDB.findOne({ email });
        // ============================= if user has make re-call to send otp
        // if exists means user alreay make a call 
        if (existingOtp) {
            if (existingOtp.attempts >= 4) {
                return res.json({ message: "OTP resend limit reached. Please try again later.", success: false });
            }

        // genearte new otp
        const newOTP = generateOTP()

        existingOtp.otp = newOTP
        existingOtp.attempts += 1;
        await existingOtp.save();


        // we send eamil with the custom email msg
        const html = `
        <h2>Your AptDox Verification Code</h2>
        <p>Your OTP is:</p>
        <h1>${newOTP}</h1>
        <p>This OTP expires in 10 minutes.</p>
        `

        // send Email 
        await sendMail(email, "AptDox Email Verification", html)

        return res.json({message:"OTP sent on your email", success:true})
        }

        //  ==================== user fresh call to -send otp
        // No existing record  first time send
        const otp = generateOTP();
        await otpDB.create({ email, otp, attempts: 1});

        const html = `
            <h2>Your AptDox Verification Code</h2>
            <p>Your OTP is:</p>
            <h1 style="letter-spacing:8px">${otp}</h1>
            <p>This OTP expires in 10 minutes.</p>
        `;
        await sendMail(email, "AptDox Email Verification", html);

        return res.json({ message: "OTP sent to your email", success: true });




    } catch (error) {
        return res.json({
            message:error.message,
            success:false
        })
        
    }
}



export const verifyOTP = async (req, res) => {
    try {
        const {email, otp} = req.body

        // if otp or email not ther return
        if(!email){
            return res.json({message:"Email Required", success:false})
        }

        // check if the otp exists with respective email
        const otpData = await otpDB.findOne({email})
        //  if no otp data there then
        if(!otpData){
            return res.json({message:"Enter Correct OTP",success:false})
        }

        //  now check the number of attempt
        if(otpData.attempts >= 5){
            return res.json({message:'Too Many Attempt Yo!', success:false})
        }

        //  now if the attempt is valid then check 
        //  user otp enter and data base otp correct or not
        if(otpData.otp != otp){
            
            // we verify if wrong then attempt will be increse
            otpData.attempts += 1
            await otpData.save()

            return res.json({message:"Enter Valid OTP", success:false})
        }

        // if user enter correct otp 
        otpData.verified = true
        await otpData.save()

        return res.json({message:"OTP verified My Friend!", success:true})
        
    } catch (error) {

        return res.json({
            message:error.message,
            success:false
        })
        
    }


    
}


