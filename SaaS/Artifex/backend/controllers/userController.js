import express from 'express';
import { UserDB } from '../models/userModel.js';
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
import { transactionModel } from '../models/TransactionModel.js';
import Razorpay from "razorpay"; 
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



// razorpay instance
const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// razorpay controller
export const paymentRazorpay = async (req, res) => {
    try {

        const {userId, planId} = req.body

        // if userId and planId is not found
        if(!userId || !planId){
            return res.json({message:'Missing Details', success: false})
        }

        let credits, plan , amount , date

        // we use switch case for particular plans
        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;
            
            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;
            
            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;
            default:
                return res.json({message:'plan not found', success:false})
        }
        date = Date.now();

        const transactionData = {
            userId, plan, amount , credits, date
        }

        const newTransaction = await transactionModel.create(transactionData)

        // we create option here
        const options = {
            amount : amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error);
                return res.json({success:false, message:error})
            }

            res.json({order, success:true})
        })

        
    } catch (error) {
        console.log(error)
        res.json({message:error.message, success:false})
    }
    
}

export const verifyRazorpay = async (req, res) => {
    try {
        const {razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if(orderInfo.status === 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt);
            if(transactionData.payment){
                return res.json({message:'Payment already done', success:false})
            }
            const userData = await UserDB.findById(transactionData.userId);

            const creditBalance = userData.credit + transactionData.credits;

            await UserDB.findByIdAndUpdate(transactionData.userId, {credit: creditBalance}, {new:true});

            await transactionModel.findByIdAndUpdate(transactionData._id, {payment:true}, {new:true});

            res.json({message:'Payment successful!, Credit Added🎉', success:true, credits: creditBalance})
            }else{
                res.json({success:false, message:'Payment failed!'})
            }
        }        
    catch (error) {z
        console.log(error);
        res.json({message:error.message, success:false})
        
    }
    
}



