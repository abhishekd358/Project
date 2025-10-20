import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import Doctor from '../models/doctor.model.js'
import jwt from 'jsonwebtoken'
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

export {addDoctor, adminLogin}