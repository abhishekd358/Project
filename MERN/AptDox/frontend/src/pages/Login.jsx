import { useState } from "react";

const Login = () => {
  const [createAccount, setCreateAccount] = useState(true);

  return (
    <section className="max-w-sm mx-auto p-10 bg-white rounded-2xl shadow-xl shadow-indigo-100 border-1 border-gray-300 mt-10 mb-50">
      {/* state base we show login or create page */}
      {createAccount ? (
        <p className="text-2xl font-semibold text-gray-700">Create Account</p>
      ) : (
        <p className="text-2xl font-semibold text-gray-700">Login</p>
      )}
      {createAccount ? (
        <p className="text-gray-500 mt-2">Please sign up to book appointment</p>
      ) : (
        <p className="text-gray-500 mt-2">Please login to book appointment</p>
      )}

      <form action="" className="space-y-4">
        {/* full name */}
        {/* showing name based on login or create account page */}
        {createAccount && (
          <div className="text-gray-700 font-normal mt-4">
            <label htmlFor="fullname" className="block ">
              Full Name{" "}
            </label>
            <input
              className="py-2 w-full rounded border-1 border-gray-400 px-2 mt-2"
              type="text"
              name=""
              id="fullname"
              required
              placeholder="Enter your full name"
            />
          </div>
        )}

        {/* email  */}
        <div className="text-gray-700 font-normal mt-4">
          <label htmlFor="email" className="block ">
            Email{" "}
          </label>
          <input
            className="py-2 w-full rounded border-1 border-gray-400 px-2 mt-2"
            type="email"
            name=""
            id="email"
            required
            placeholder="example@gmail.com"
          />
        </div>
        {/* full name */}
        <div className="text-gray-700 font-normal mt-4">
          <label htmlFor="password" className="block ">
            Password{" "}
          </label>
          <input
            className="py-2 w-full rounded border-1 border-gray-400 px-2 mt-2"
            type="password"
            name=""
            id="password"
            required
            placeholder="Min. 6 characters"
          />
        </div>

        {/* btn */}
        <button className="bg-blue-500 w-full py-3 px-2 rounded text-gray-100 font-medium cursor-pointer">
          {createAccount ? "Create Account" : "Login"}
        </button>
      </form>
      {/* toggle between login and create account */}
      {createAccount ? (
        <p className="text-gray-500 mt-5">
          Already have an account?
          <button
            onClick={() => setCreateAccount(false)}
            className="underline text-blue-500 ml-1 cursor-pointer"
          >
            Login here
          </button>
        </p>
      ) : (
        <p className="text-gray-500 mt-5 text-center">
          Don't have an account?
          <button
            onClick={() => setCreateAccount(true)}
            className=" underline text-blue-500 ml-1 cursor-pointer "
          >
            Create account
          </button>
        </p>
      )}
    </section>
  );
};

export default Login;
