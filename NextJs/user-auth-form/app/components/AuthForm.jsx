"use client";
import React, { useState } from 'react'
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { useRouter} from 'next/navigation'


const AuthForm = () => {
    const [register, isRegister] = useState(false)
    const router = useRouter()
  return (
    <div className="border border-gray-200 bg-pink-50/70 max-w-[40vw] mx-auto px-10 py-12 rounded-lg shadow-md my-20">
      <h1 className="text-center font-bold text-2xl pb-2 text-gray-800">Welcome to Auth!</h1>
      <hr className="pb-8" />


        {/* condtional redering of input based on user requirement of rester or login*/}
        {register && (<div className="flex items-center bg-pink-200/80 rounded-md px-3 my-3 focus-within:ring-2 focus-within:ring-pink-500">
        <div className="pr-3 border-r border-gray-300">
          <FiUser size={24} className="opacity-80 text-gray-700" />
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="pl-3 py-3 w-full bg-transparent placeholder-gray-400 text-gray-900 focus:outline-none"
        />
      </div>)}

      {/* Email */}
      <div className="flex items-center bg-pink-200/80 rounded-md px-3 my-3 focus-within:ring-2 focus-within:ring-pink-500">
        <div className="pr-3 border-r border-gray-300">
          <AiOutlineMail size={24} className="opacity-80 text-gray-700" />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="pl-3 py-3 w-full bg-transparent placeholder-gray-400 text-gray-900 focus:outline-none"
        />
      </div>

      {/* Password */}
      <div className="flex items-center bg-pink-200/80 rounded-md px-3 my-3 focus-within:ring-2 focus-within:ring-pink-500">
        <div className="pr-3 border-r border-gray-300">
          <RiLockPasswordLine size={24} className="opacity-80 text-gray-700" />
        </div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="pl-3 py-3 w-full bg-transparent placeholder-gray-400 text-gray-900 focus:outline-none"
        />
      </div>

      {/* Button */}
      <button className="w-full bg-pink-500 hover:bg-pink-600 transition text-white px-8 py-3 rounded-lg font-bold text-lg mt-6">
         {register ? "Sign Up": "Sign In" }
      </button>

      <div className='mt-4 text-center'>{register ? <p  className="text-gray-700"> Already have account? <button onClick={()=>isRegister(false)} className="text-pink-600 hover:underline font-medium cursor-pointer ">Login</button> </p>: <p  className="text-gray-700"> Don't have account? <button onClick={()=>isRegister(true)}className="text-pink-600 hover:underline font-medium cursor-pointer ">Register</button></p> }</div>
      
    </div>

  )
}

export default AuthForm
