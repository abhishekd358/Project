import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";
import Razorpay from "razorpay";
import sessionDB from "../models/session.model.js";
import {} from '../controllers/otp.controller.js'
import sendMail from "../utils/sendEmail.js";
import otpDB from "../models/otp.model.js";
import {sanitize} from '../utils/sanitize.js'
// user Registeration controller

const userRegister = async (req, res) => {
  // take the user input from the body
  const { name, email, password } = req.body;

  const cleanName = sanitize(name)
  const cleanEmail = sanitize(email)
  const cleanPassword = sanitize(password)

  // if no field above should not be empty
  if (!cleanName || !cleanEmail || !cleanPassword) {
    return res.json({ message: "All field are required", success: false });
  }

  //check user must enter valid email with validtaor package
  if (!validator.isEmail(cleanEmail)) {
    return res.json({ message: "Enter valid email address", success: false });
  }

  // name must be 2 char at least
  if (cleanName.length < 2) {
    return res.json({ message: "name at least 2 characters", success: false });
  }

  // now check user enter password length should  not be less than 6 char
  if (cleanPassword.length < 6) {
    return res.json({
      message: "Password must be 6 characters",
      success: false,
    });
  }

  // now check user email arelady exist in db ord not
  const emailExists = await User.findOne({ cleanEmail });
  if (emailExists) {
    return res.json({ message: "Email already exists", success: false });
  }


  // ==== create verified email
  // verify otp 
  const otpRecord = await otpDB.findOne({cleanEmail})

  // if email ka otp nahi hai or verified nahi hai to user register nahi hoga
  if(!otpRecord || !otpRecord.verified){
    return res.json({message:"Please Verify Your Email", success:false})
  }


  // now we hash the password
  const hashPassword = await bcrypt.hash(cleanPassword, 10);

  // other wise we create new user entry to db
  const newUser = await User.create({ cleanName, cleanEmail, password: hashPassword });

  // // delete otp
  await otpDB.deleteMany({cleanEmail})

  //  we create a session as well
  const sessionCreated = await sessionDB.create({
    userId: newUser._id,
    expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })



  // =============== send email
  const html = `
  <h2>Welcome to AptDox 🎉</h2>
  <p>Hello ${newUser.name},</p>
  <p>Your account has been successfully created.</p>
  `

  await sendMail(newUser.email,"Welcome to AptDox",html)

  // when user register then we give him a token
  const token = jwt.sign({ sessionId: sessionCreated._id }, process.env.U_SECRET_KEY);

  return res.json({
    message: `${newUser.name} 🙏🏻 Welcome to AptDox 🎉`,
    token,
    success: true,
  });
};

// new user login

const userLogin = async (req, res) => {
  // take the user input from the body
  const { email, password } = req.body;

  // if no field above should not be empty
  if (!email || !password) {
    return res.json({ message: "All field are required", success: false });
  }

  //check user must enter valid email with validtaor package
  if (!validator.isEmail(email)) {
    return res.json({ message: "Enter valid email address", success: false });
  }

  // now check user enter password length should  not be less than 6 char
  if (password.length < 6) {
    return res.json({
      message: "Password must be 6 characters",
      success: false,
    });
  }

  // now check user email arelady exist in db ord not
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User Not Found", success: false });
  }

  // IF USER EXISTS
  // we hash the unhash the password
  const decodePassword = await bcrypt.compare(password, user.password);
  // console.log(decodePassword);
  // if password not decode return false
  if (!decodePassword) {
    return res.json({
      message: "Please enter correct password",
      success: false,
    });
  }

  // ELSE
  // Now we check the number of session user has if more than 2 : then we delete the 1st one from db and then allow
  const allSessions= await sessionDB.find({userId:user._id}).sort({createdAt:1})

  // if sesssion greatere than 2 then we remove session 1st old session
  if(allSessions.length>=2){
    const oldSession = allSessions[0]
    await sessionDB.findByIdAndDelete(oldSession._id)
  }
  // if user has 1 session or 0 session then we need to create a new one
  const newSession = await sessionDB.create({
    userId:user._id,
    expireAt: new Date(Date.now() + 7 * 24* 60* 60 * 1000)
  })

  // measn user credentials correct then we allow to login and give me a token
  const token = jwt.sign({ sessionId: newSession._id }, process.env.U_SECRET_KEY);

  return res.json({
    message: `${user.name} 🙏🏻 Welcome back to AptDox 🎉`,
    token,
    success: true,
  });
};



// Logout 
const logout = async (req, res) => {
  try {
    await sessionDB.findByIdAndDelete(req.sessionId)
    return res.json({message:"Logout successful", success:true})
    
  } catch (error) {
    return res.json({message:error.message,success:false})
  }
}

// logout from all devices
const logoutAllDevices = async (req, res) => {
  try {
    await sessionDB.deleteMany({userId: req.userId})
    return res.json({message:"Logout From All Devices!", success:true})
    
  } catch (error) {
    return res.json({message:error.message,success:false})
  }
}



// get user profile data

const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    // looking user data in the db
    if (!userId) {
      return res({ message: "Unathorize access", success: false });
    }

    const userData = await User.findById(userId).select("-password");
    return res.json({ success: true, userData });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

// update user profile

const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, gender, dob } = req.body;
    const userId = req.userId;
    const imageFile = req.file;

    if (!name?.trim() || !phone?.trim() || !dob?.trim() || !gender?.trim()) {
      return res.json({ message: "Some data is missing", success: false });
    }

    // find the user data using the userId
    await User.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    // for image
    if (imageFile) {
      // upload in cloudinary
      const imgUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      // this return the image url of cloud
      const imgUrl = imgUpload.secure_url;

      // now we save imgUrl to db
      await User.findByIdAndUpdate(userId, { image: imgUrl });
    }

    return res.json({
      message: "Profile updated successfully!",
      success: true,
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

// ========================== APPOINTMENT
// user booking appointment

const bookAppointment = async (req, res) => {
  // when user book the appointment we take few fields
  const { docId, slotDate, slotTime } = req.body;
  const userId = req.userId;

  if(!docId || !slotDate || !slotTime){
    return res.json({message:'choose all field', success:false})
  }

  //  now we fetch the doctor is availble or not from doctor model
  const docData = await Doctor.findById(docId).select("-password");

  // if doctor  availble field is false
  if (!docData.available) {
    return res.json({
      message: `${docData.name} is not available for appointment.`,
      success: false,
    });
  }

  // if our doctor is availble

  // then we check how much slots or booked & availble
  let slots_booked = docData.slots_booked;

  // user ne chooose kiye date par check karege ki kitne slots time availble hai ya nahi
  if (slots_booked[slotDate]) {
    // on user choose date our doctor availble and if already in that date the user time already present means docotr not availble
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({ message: "Slot not available.", success: false });
    } else {
      // if include nahi hai time means docotr available hai
      slots_booked[slotDate].push(slotTime);
    }
  } else {
    // means user ne choose kiye din par doctor ke pas kohi booking nahi hai to hum new book slot banayenge
    slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);
  }

  // ab user ne to date and time choose kar liya
  //  now we store this info user info and appointment info  to appointment MODEL
  const userData = await User.findById(userId).select("-password");

  // delete docData.slots_booked

  // sab information ek object mai store kar ke appointment MODEL mai save karenge
  const appointmentData = {
    userId,
    docId,
    userData,
    docData,
    amount: docData.fees,
    slotTime,
    slotDate,
    date: Date.now(),
  };

  await Appointment.create(appointmentData);

  // doctor appintment mai bhi save karenge user appoitment
  const doc = await Doctor.findByIdAndUpdate(docId, { slots_booked });

  return res.json({
    message: `Appointment booked with ${doc.name}`,
    success: true,
  });
};

// ========== get doctor appointment data
const getMyAppointment = async (req, res) => {
  try {
    const userId = req.userId;

    const appointments = await Appointment.find({ userId });
    //  console.log('+++++++++++++',appointments);

    return res.json({ appointments, success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};

// ============================ cancel appointement

const cancelAppointment = async (req, res) => {
  try {
    // console.log("++++++++++==1");
    const userId = req.userId;
    // console.log("--------------", userId);
    // taking appointment id from user frontend
    const { id } = req.body;
    const appointmentChoose = await Appointment.findOne({ _id: id, userId });
    // if already value cancel then we return 
    if(appointmentChoose.cancelled){
      return res.json({ message: "Appointment already cancelled by athority.", success: false })
    }


    //  if not found any appointment
    if (!appointmentChoose) {
      return res.json({ message: "Appointment Not Found", success: false });
    }
    // else
    appointmentChoose.cancelled = true;
    await appointmentChoose.save();

    //  now also we have to remove the slot from the appointment as well as from Doctor Database
    const { docId, slotDate, slotTime } = appointmentChoose;
    // finding docotr in db for removing slot
    const doctorData = await Doctor.findById(docId);
    // take all slot_booked from the doctor database
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (t) => t !== slotTime
    ); // we use filter to remove the user cancel time and again we store the array of time

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    return res.json({ message: "Appointment Cancelled", success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};

// =========================================== payment method controller

const razorPayment = async (req, res) => {
  try {
    // first we config our razorpay instance
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const { appointmentId } = req.body; // take the appointment id for which paying
    const appointmentData = await Appointment.findById(appointmentId);
    // check wheter the appointment availbel or not or it already canecle
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        message: "Appointment cancelled or not found.",
        success: false,
      });
    }

    // rzorpay options
    const options = {
      amount: appointmentData.amount * 100, // Amount is in currency subunits. converting paise to rupees multiplying
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    //  razorpay create order method
    const order = await instance.orders.create(options);

    return res.json({ order, success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};


//   ======================== verifying razor payment
//  to verify we have razorpay fetch method

const verifyRazorpay = async (req, res) => {
  try {
     // first we config our razorpay instance
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });


    const {razorpay_order_id} = req.body
    const orderInfo = await instance.orders.fetch(razorpay_order_id)
    
    // console.log(orderInfo)
    if(orderInfo.status === 'paid'){
      // if user payment paid hai then only we mark appointment as paid success in APpointement DB
      await Appointment.findByIdAndUpdate(orderInfo.receipt, {payment:true})
      return res.json({message:'Payment Successful', success:true})
    }else{
      return res.json({message:"Payment Failed", success:false})
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
    
  }
}







export {
  userLogin,
  userRegister,
  getUserProfile,
  updateProfile,
  bookAppointment,
  getMyAppointment,
  cancelAppointment,
  razorPayment,
  verifyRazorpay,
  logout,
  logoutAllDevices
};
