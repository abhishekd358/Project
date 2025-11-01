import dotenv from 'dotenv'
dotenv.config({debug:true})
import connectDB from '@/lib/config/db'
import todoModel from '@/lib/models/todoModel'
import { NextResponse } from 'next/server'


// db conncection call
const loadDB = async () => {
    await connectDB()
    
}
loadDB()



// now we create controller



// 2. POST todo to db
export async function POST (req){
    try {
    const {title, desc} =await req.json()
    // all field must be required 
    if(!title || !desc){
        return NextResponse.json({message:'All field required', success:false})
    }

        await todoModel.create({title, desc})
        return NextResponse.json({message:'Added New Task', success:true})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message:'Internal server error', success:true})
    }

}


// 1. Get all todo
export async function GET (req){
     try {
        const todo = await todoModel.find({})
        return NextResponse.json({todo, success:true})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message:'Internal server error', success:true})
    }

}






// 3. Complete todo to db
export async function PUT (req){
    try {
        const {id} = await req.json()
        // find in db that task is complete
        await todoModel.findByIdAndUpdate(id,{isCompleted:true},{new:true})
        return NextResponse.json({message:'Task Completed ✅', success:true})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message:'Internal server error', success:true})
    }

}



// 4. remove todo to db
export async function DELETE (req){
    try {
        const {id} = await req.json()
        // find in db that task is complete
        await todoModel.findByIdAndDelete(id)
        return NextResponse.json({message:'Task removed 🗑', success:true})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message:'Internal server error', success:true})
    }

}