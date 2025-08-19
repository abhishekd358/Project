import { NextResponse } from "next/server";
import User from "../models/user.js";

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
        message: "User Already Exists!",
        success: false,
      });
    }

    // if user not exists then create a new user in the db
    const newUser = await User.create({ name, email, password });
    return Response.json({
      message: "Registered Successfully",
      newUser,
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
  return Response.json({ message: "login Route" });
};
