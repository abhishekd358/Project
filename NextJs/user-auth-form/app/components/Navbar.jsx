"use client";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full bg-pink-50/80 shadow-md border-b-2 border-pink-400 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left (empty placeholder to balance center logo) */}
        <div className="flex-1"></div>

        {/* Center Logo */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl font-bold text-pink-600 tracking-wide cursor-pointer">
            MyAuth
          </h1>
        </div>

        {/* Right Links */}
        <div className="flex-1 flex justify-end items-center gap-6">
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
      </div>
    </nav>
  );
};

export default Navbar;
