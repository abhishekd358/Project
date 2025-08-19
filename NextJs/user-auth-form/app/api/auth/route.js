import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";


export async function GET(req){
    return NextResponse.json({message:"This is home route", success:true})
}


// this is route of POST is used for both user Registeration and also for the Login
// https://localhost:3000/api/auth?signup=true
export async function POST(req){
    // connect DB 
    await connectDB();


    // get the url params from 
    const {searchParams} = new URL(req.url);
    console.log(searchParams)
    // now if user want to signup or register then



}