"use client";
import React, {useState, useEffect} from "react";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // convert back from string → object
    }
  }, []);

  const userLogout = ()=>{
    localStorage.removeItem('user')
    setUser(null)
    localStorage.removeItem('authToken')
    
  }



  return (
     <nav className="w-full bg-pink-50/80 shadow-md border-b-2 border-pink-400 px-6 py-4 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        
        {/* Left placeholder (keeps spacing for right side) */}
        <div className="flex items-center"></div>

        {/* Center Logo - absolutely centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl font-bold text-pink-600 tracking-wide cursor-pointer">
            MyAuth
          </h1>
        </div>

        {/* Right Links */}
        {user ? (
          <div className="flex items-center gap-3 justify-center">
            <div className="text-right">
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <FaRegUserCircle size={32} className="text-gray-700" />
            
            {/* button */}
            <button className="bg-pink-500 hover:bg-pink-600 transition text-white px-3 py-2 rounded-lg font-bold text-md cursor-pointer" onClick={userLogout}>Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <button className="text-gray-700 hover:text-pink-600 transition font-medium">
              Register
            </button>
            <button className="text-gray-700 hover:text-pink-600 transition font-medium">
              Login
            </button>
            <FaRegUserCircle
              size={28}
              className="text-gray-700 hover:text-pink-600 cursor-pointer transition"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
