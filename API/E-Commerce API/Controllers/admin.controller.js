import { AdminDB } from "../Models/admin.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";





export const adminRegistration = async (req, res) => {
    // take a user body response
    const {name, email, password} = req.body

    if(name == "" || email=="" || password ==""){
        return res.json({message:"All fields are mandatory", success:false})
    }

    // checking email exist or not
    const userExists  = await AdminDB.findOne({email})
    // if exists
    if(userExists){
        return res.json({message:"Admin already registered", success:false})
    }

    // if not exists

    // we hash the user password and save it to DB for safety
     const hashPassword = await bcrypt.hash(password, 10)
    //  console.log(hashPassword)


    // create new user
    const newAdmin = await AdminDB.create({
        name,
        email,
        password:hashPassword
    })
    res.json({message:`${newAdmin.name} Registered Successfully`,success:true})
    
}



// admin Login
export const adminLogin = async (req, res) => {
    const {email, password}= req.body

    // name email should not be empty
    if(email=="" || password == ""){
        return res.json({message:"All fields are mandatory", success:false})
    }

    // check the email in DB exists or not
     const adminExists  = await AdminDB.findOne({email})
    // if exists
    if(!adminExists){
        return res.json({message:"Admin Not Found", success:false})
    }


    // now we compare hash value the user input password convert to hash and then it compare with DB store pasword hashvalue
    const validPassword = await bcrypt.compare(password, adminExists.password)

    // if compare failed means hash value not matched, password wrong
    if(!validPassword){
        return res.json({message:"Enter Valid Password.", success:false})
    }
    // we create a token a foregin key 
    const token = jwt.sign({admin:adminExists.id}, process.env.JWT_SECRET, {expiresIn : '1h' })


    // in all passes above cases then we
    res.json({message: `Welcome Admin! ${adminExists.name} Login Successful`,token, success:true})




    
}

