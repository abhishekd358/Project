import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../context/admin-context/AdminContext";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () => {
    const [state, setState] = useState("Admin")
    // getting the admin context values
    const {setAdminToken,backendUrl}  = useContext(AdminContext)

    // admin name and admin email state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // console.log("---------", password)

    const adminLoginHandler = async(e)=>{
      e.preventDefault()

      try {
        // state base login api hiting specificiallly
        if (state === 'Admin') {
          
          const response = await axios.post(`${backendUrl}/api/admin/login`, {email, password})
          const data = response.data
          console.log(data);
          

          if(data.success){
            // storing token in local storage as well
            localStorage.setItem('adminToken', data.adminToken);
            setAdminToken(data.adminToken)
          }else{
            toast.error(data.message)
          }
        }
      
      } catch (error) {
        console.log(error.message)
        
      }
    }
  


  return (
    <div >
      <form onSubmit={adminLoginHandler} className="min-h-[80vh] flex items-center">
        {/* title */}
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w[340px] sm:min-w-96 border rounded-xl text-sm text-[#5E5E5E5E] shadow-lg">
            <h1 className="text-2xl font-semibold m-auto text-gray-600"><span className="text-primary">{state} </span> Login</h1>
          <div className="w-full">
            {/* email */}
            <p className="text-gray-700 text-md">Email:</p>
            <input onChange={(e)=>setEmail(e.target.value)} className="border border-[#DADADA] text-gray-500 rounded w-full p-2 mt-1" type="text" name="email" value={email} />
          </div>
          {/* password */}
          <div className="w-full">
            <p className="text-gray-700 text-md">Password:</p>
            <input onChange={(e)=>setPassword(e.target.value)} className=" text-gray-500 border border-[#DADADA] rounded w-full p-2 mt-1" type="password" id="" value={password} name='password' />
          </div>
          {/* button */}
          <button className="bg-blue-500 text-white w-full py-2 rounded-md text-base cursor-pointer">Login</button>
          {/* Switch Dotoctor <=> Login */}
      {
        state === "Admin" ? <p className="text-gray-700 text-md">Doctor Login? <span className="text-primary cursor-pointer underline" onClick={()=>setState("Doctor")}>Click Here</span></p>
        : <p className="text-gray-700 text-md">Admin Login? <span className="text-primary cursor-pointer underline" onClick={()=>setState("Admin")}>Click Here</span></p>
      }
        </div>
      </form>
    </div>
  );
};

export default Login;
