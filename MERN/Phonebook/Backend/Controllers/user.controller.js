import { User } from "../Models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// user Register controller
export const userRegister = async (req, res) => {
  // taking the body and destructure
  try {
    const { name, email, password } = req.body;

    // if empty fields
    if (name == "" || email == "" || password == "") {
      return res.json({ message: "All Field Mandantory", success: false });
    }
    // find In Database that is user email already exists
    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res.json({ message: "User already registerd.", success: false });
    }
    // otherwise we create a new user

    // before creating new user we hash the user password
    const hashPassword = await bcrypt.hash(password, 10)
    const userData = await User.create({ name, email, password:hashPassword });
    res.json({
      message: "User created successfully!!!",
      user: userData,
      success: true,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


// user Login controller
export const userLogin = async (req, res) => {

  try {
    const { email, password } = req.body;

    // if empty fields
    if (email == "" || password == "") {
      return res.json({ message: "All Field Mandantory", success: false });
    }
    // find In Database that is user email already exists or not
    const UserExists = await User.findOne({ email });
    if (!UserExists) {
      return res.json({ message: "User Not Found.", success: false });
    }
    // if exists then we check password is correct or not
    const validPassword = await bcrypt.compare(password, UserExists.password)
   
    if (!validPassword){
      return res.json({ message: "Enter correct password.", success: false });
    }

    // when user login we create token to store the id of the user
    const token = jwt.sign({userId:UserExists._id}, process.env.SECRET_KEY,{expiresIn:'1h'})

    res.json({message:`Welcome ${UserExists.name}, Login Successful.`,your_token:token, success:true})
    
  } catch (error) {
    res.json({ message: error.message });
  }

  
}