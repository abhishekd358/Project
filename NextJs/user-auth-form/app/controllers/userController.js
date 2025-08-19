import { NextResponse } from "next/server";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from 'bcrypt'

export const registerUser = async (req) => {
  try {
    // taking the body using eeq.json()
    const body = await req.json(); // make this await beacuse this is async function
    // console.log(body);
    const { name, email, password } = body;

    // now this must be require above name, email , password it can not be null
    if (!name || !email || !password) {
      return Response.json({
        message: "All Field are Required",
        success: false,
      });
    }

    // now checking if user entered email is exists in our db
    const userAlreadyExists = await User.findOne({ email });

    // if user already exists return
    if (userAlreadyExists) {
      return Response.json({
        message: "Email Already Exists!",
        success: false,
      });
    }

    // before creating user hash the password
    const hashPassword = await bcrypt.hash(password, 10)

    // if user not exists then create a new user in the db
    const newUser = await User.create({ name, email, password:hashPassword });
    return Response.json({
      message: "Registered Successfully",
      userDetails:{
        name:name,
        email:email
      },
      success: true,
    });
  } catch (error) {
    console.error("Register error:", error);
    return Response.json(
      {
        message: "Server error",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const loginUser = async (req) => {
    // take the user email and password from the body
    const body = await req.json()
    const {email, password} = body

    // check is the email id user exists in db or not
    const userExists = await User.findOne({email})
    if(!userExists){
        console.log("user not found");
        return Response.json({message:"User Not Found!", success:false})
    }
    // if user exits then check the password
    const verifyPassword = await bcrypt.compare(password, userExists.password)

    // if password not correct
    if(!verifyPassword){
        console.log("invalid pass");
        
        return Response.json({message:"Inavlid password", success:false})
    }

    // here we create a token to userID store
    const token =  jwt.sign({userId: userExists._id}, "16$4$u6" ,{expiresIn: '1h'})
    console.log("login success");
    return Response.json({ message: "User login Successfully",token:token, success:true });
};
