import User from "../models/user.model.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'



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



// user booking appointment 



export {userLogin, userRegister, getUserProfile, updateProfile}