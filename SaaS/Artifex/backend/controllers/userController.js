import express from 'express';
import { UserDB } from '../models/userModel.js';
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// Melody Marks


// controllers 

// Register
export const userRegister = async (req, res) => {
    try {

        // taking user name, email, password from the user
    const {name, email, password} = req.body

    // above input value should not be empty
    if(!name || !email || !password ){
        return res.status(400).json({message:'All fields mandantory.', success:false})
    }

    // check if user email already exists in the userDB
    const emailExisits = await UserDB.findOne({email})
    
    // if email exits 
    if(emailExisits){
        return res.json({message: 'User already exists.', success:false})
    }

    // now we hash the password
    const hashpwd = await bcrypt.hash(password, 10);

    // if not exists, we create new user
    const newUser = await UserDB.create({name, email, password:hashpwd})

    // now we create a token to maked verifcation 
    const token = jwt.sign({userId: newUser._id},process.env.SECRET_KEY,{expiresIn: '1h'} )

    // after creating user we send message
    res.json({message: "User created successfully.",user:newUser.name,token:token, credits:newUser.credit, success:true})
        
    } catch (error) {
        return res.json({message:error.message, success:false})
    }
    

}




// user login 
export const userLogin = async (req, res) => {

    try {

        // first user email and password compulsory to enter 
    const {email, password} = req.body

    // above field should not be empty 
    if(!email || !password){
        return res.json({message:'All field mandantory', success:false})
    }

    // check is the email exists or not
    const emailExists = await UserDB.findOne({email})
    // if not exists 
    if(!emailExists){
        return res.json({message: 'User Not Found', success:false})
    }

    // now cheeck the password is correct or not
    const correctPassword = await bcrypt.compare(password, emailExists.password)

    // if not correctpassword enter 
    if(!correctPassword){
        return res.json({message: 'Invalid password', success:false})
    }
    
    // now we create a token to maked verifcation 
    const token = jwt.sign({userId: emailExists._id},process.env.SECRET_KEY,{expiresIn: '1h'} )

    res.json({user:emailExists.name,token:token, credits: emailExists.credit,success:true})
        
    } catch (error) {
        return res.json({message:error.message, success:false})
        
    }


}




// user credit


export const userCredits = async (req, res) => {
    try {
        const id = req.userId
        const user = await UserDB.findById(id)
        res.json({credits:user.credit, user: user.name, success:true})
        
    } catch (error) {
     return res.json({message:error.message, success:false})   
    }
    
}