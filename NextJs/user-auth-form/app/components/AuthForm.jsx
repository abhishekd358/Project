"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import axios from "axios";
const AuthForm = () => {
  const [register, isRegister] = useState(false);

  // ---------------- TOKEN ----------------
  const savedToken = localStorage.getItem("authToken") || null
  const [token, setToken] = useState(savedToken);

  // Keep localStorage updated when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      setIsLogin(true); // if token exists → logged in
    } else {
      localStorage.removeItem("authToken");
      setIsLogin(false);
    }
  }, [token]);

  // ---------------- LOGIN STATUS ----------------
  const [isLogin, setIsLogin] = useState(false);

  // On first client render, check login status
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin") === "true";
    setIsLogin(loginStatus);
  }, []);

  // Keep localStorage updated when isLogin changes
  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  // ---------------- MESSAGE & FORM ----------------
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // function to take the form data

  const onChangeHandler = (e) => {
    // e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // now make call to axios
    try {
      // make call to url
      if (register) {
        // means user trying to register
        const { data } = await axios.post("/api/auth?signup=true", formData, {
          headers: { "Content-Type": "application/json" },
        });

        setMessage(data.message);
        // make form field empty when submit once
        setFormData({ name: "", email: "", password: "" });
      } else {
        // means user trying to login
        const { data } = await axios.post("/api/auth?signin=true", formData, {
          headers: { "Content-Type": "application/json" },
        });
        setMessage(data.message);
        // save token
        setToken(data.token);
        // make stlogin true
        setIsLogin(true);
        // make form field empty when submit once
        setFormData({ name: "", email: "", password: "" });
        // Save user info also
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      setMessage(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="border border-gray-200 bg-pink-50/70 max-w-[40vw] mx-auto px-10 py-12 rounded-lg shadow-md my-20">
      <h1 className="text-center font-bold text-2xl pb-2 text-gray-800">
        Welcome to Auth!
      </h1>
      <hr className="pb-8" />
      {message && (
        <p className="text-center font-bold text-lg text-pink-50">{message}</p>
      )}

      <form action="" method="POST" onSubmit={onSubmitHandler}>
        {/* condtional redering of input based on user requirement of rester or login*/}
        {register && (
          <div className="flex items-center bg-pink-200/80 rounded-md px-3 my-3 focus-within:ring-2 focus-within:ring-pink-500">
            <div className="pr-3 border-r border-gray-300">
              <FiUser size={24} className="opacity-80 text-gray-700" />
            </div>
            <input
              onChange={onChangeHandler}
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              required
              className="pl-3 py-3 w-full bg-transparent placeholder-gray-400 text-gray-900 focus:outline-none"
            />
          </div>
        )}

        {/* Email */}
        <div className="flex items-center bg-pink-200/80 rounded-md px-3 my-3 focus-within:ring-2 focus-within:ring-pink-500">
          <div className="pr-3 border-r border-gray-300">
            <AiOutlineMail size={24} className="opacity-80 text-gray-700" />
          </div>
          <input
            onChange={onChangeHandler}
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            required
            className="pl-3 py-3 w-full bg-transparent placeholder-gray-400 text-gray-900 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-pink-200/80 rounded-md px-3 my-3 focus-within:ring-2 focus-within:ring-pink-500">
          <div className="pr-3 border-r border-gray-300">
            <RiLockPasswordLine
              size={24}
              className="opacity-80 text-gray-700"
            />
          </div>
          <input
            onChange={onChangeHandler}
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            required
            className="pl-3 py-3 w-full bg-transparent placeholder-gray-400 text-gray-900 focus:outline-none"
          />
        </div>

        {/* Button */}
        <button className="w-full bg-pink-500 hover:bg-pink-600 transition text-white px-8 py-3 rounded-lg font-bold text-lg mt-6">
          {/* turn below uncomment if you want to show loading text */}
          {/* {loading ? "Loading..." : register ? "Sign Up" : "Sign In"} */}
          {register ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <div className="mt-4 text-center">
        {register ? (
          <p className="text-gray-700">
            {" "}
            Already have account?{" "}
            <button
              onClick={() => isRegister(false)}
              className="text-pink-600 hover:underline font-medium cursor-pointer "
            >
              Login
            </button>{" "}
          </p>
        ) : (
          <p className="text-gray-700">
            {" "}
            Don't have account?{" "}
            <button
              onClick={() => isRegister(true)}
              className="text-pink-600 hover:underline font-medium cursor-pointer "
            >
              Register
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
