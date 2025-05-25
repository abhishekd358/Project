import { UserDB } from "../Models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



export const userRegistration = async (req, res) => {
    // take a user body response
    const {name, email, password} = req.body

    if(name == "" || email=="" || password ==""){
        return res.json({message:"All fields are mandatory", success:false})
    }

    // checking email exist or not
    const userExists  = await UserDB.findOne({email})
    // if exists
    if(userExists){
        return res.json({message:"User already registered", success:false})
    }

    // if not exists

    // we hash the user password and save it to DB for safety
     const hashPassword = await bcrypt.hash(password, 10)
    //  console.log(hashPassword)


    // create new user
    const newUser = await UserDB.create({
        name,
        email,
        password:hashPassword
    })
    res.json({message:`${newUser.name} Registered Successfully`,success:true})
    
}



// user Login
export const userLogin = async (req, res) => {
    const {email, password}= req.body

    // name email should not be empty
    if(email=="" || password == ""){
        return res.json({message:"All fields are mandatory", success:false})
    }

    // check the email in DB exists or not
     const userExists  = await UserDB.findOne({email})
    // if exists
    if(!userExists){
        return res.json({message:"User Not Found", success:false})
    }


    // now we compare hash value the user input password convert to hash and then it compare with DB store pasword hashvalue
    const validPassword =  bcrypt.compare(password, userExists.password)

    // if compare failed means hash value not matched, password wrong
    if(!validPassword){
        return res.json({message:"Enter Valid Password.", success:false})
    }

    // we create a token a foregin key 
    const token = jwt.sign({userId:userExists.id},process.env.JWT_SECRET , {expiresIn:"1h"})


    // in all passes above cases then we
    res.json({message: `Welcome! ${userExists.name} Login Successful`,token, success:true})




    
}

