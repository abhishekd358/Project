import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useEffect } from "react";
import StoreContext from "../context/StoreContext";
import MyContext from "../context/MyContex";

const Login = () => {
  const [state, setState] = useState("Login");

  const { setShowLogin } = useContext(MyContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-blak/30 flex justify-center items-center">
      <form
        action=""
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-neutral-700 text-center text-2xl font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {/* name */}

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.user_icon} alt="" />
            <input
              type="email"
              placeholder="Full Name"
              className="outline-none text-sm"
            />
          </div>
        )}

        {/* email */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="" />
          <input
            type="email"
            placeholder="Email id"
            className="outline-none text-sm"
          />
        </div>

        {/* paasword */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5 mb-3">
          <img src={assets.lock_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            className="outline-none text-sm"
          />
        </div>


        {/* fogot password */}
        {state === 'Login' && <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>}

        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "Create account"}
        </button>

        {state === "Login" ? (
          <p className="text-sm text-zinc-500 mt-5 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign up")}
              className="text-blue-600 cursor-pointer "
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-sm text-zinc-500 mt-5 text-center">
            Already have account?{" "}
            <span
              className="text-blue-600 cursor-pointer "
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowLogin(false)}
        />
      </form>
    </div>
  );
};

export default Login;
