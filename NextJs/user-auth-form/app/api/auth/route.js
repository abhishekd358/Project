import { registerUser,loginUser } from "@/app/controllers/userController";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({ message: "This is home route", success: true });
}

// this is route of POST is used for both user Registeration and also for the Login
// https://localhost:3000/api/auth?signup=true
export async function POST(req) {
  // connect DB
  await connectDB();

  // get the url params from
  const { searchParams } = req.nextUrl;
  // console.log(searchParams)

  // now get the searchparams each
  const signUp = searchParams.get("signup");
  const signIn = searchParams.get("signin");
  console.log("login:",signIn,"register:",signUp )

  if (signIn === "true") {
    return loginUser(req); // call login Controller function
  } else if (signUp === "true") {
    return registerUser(req); // call register Controller function
  } else {
    return NextResponse.json({
      message: "route not found!",
      success: false,
    });
  }

//   return Response.json({ message: "working post", signIn, signUp }); // i write Respone way to just let u know that this also useable

}
