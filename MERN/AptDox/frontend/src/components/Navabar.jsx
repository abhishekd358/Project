import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets.js";
import { useState } from "react";
const Navabar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex justify-around items-center p-10 max-md:gap-40">
      <NavLink to="/">
        <img
          src={assets.logo}
          alt="aptdox logo"
          className="md:w-44 cursor-pointer max-md:w-30"
        />
      </NavLink>

      {/* navigation NavLink */}
      <ul className="flex justify-center items-center gap-8 sm:gap-10 font-medium text-sm sm:text-base md:text-lg lg:text-[18px] max-md:hidden">
        <li>
          {" "}
          {/* New thing to Learn */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contact
          </NavLink>
        </li>

        <li>
          {" "}
          <NavLink
            to="/doctor"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Doctor
          </NavLink>
        </li>
      </ul>

      {token ? (
        <div className="relative group">
          <img
            src={assets.profile_pic}
            alt=""
            className="w-10 cursor-pointer rounded-full border-2 border-blue-500 relative z-20"
          />

          {/* menu-profile-hover-card */}
          <div className="absolute top-0 right-0 pt-12 text-base font-semibold text-gray-600 hidden group-hover:block z-10">
            <div className="min-w-48 bg-blue-50 shadow-lg p-4 rounded flex flex-col gap-4">
              <p
                onClick={() => navigate("/my-profile")}
                className="hover:text-black cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("/my-appointments")}
                className="hover:text-black cursor-pointer"
              >
                My Appointements
              </p>
              <p 
                onClick={() => setToken(false)}
                className="hover:text-black cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-700 px-4 py-2 border-none rounded-2xl cursor-pointer text-white font-semibold hidden md:block"
        >
          Create Account
        </button>
      )}
    </div>
  );
};

export default Navabar;

// the below is my custom card practise for study

{
  /* <div className="relative group flex items-center gap-4">

        <img src={assets.profile_pic} alt=""  className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover group-hover:scale-105"/>

        <div className="flex flex-col flex-1 items-center justify-center absolute align-items-center
         opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all top-10 bg-white shadow-lg rounded-2xl p-2 max-w-sm">
          <p className="text-gray-600 text-sm">Welcome! Rakesh </p>

          <div className="flex gap-3 mt-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg transition-all duration-300">Edit Profile</button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg transition-all duration-300">Logout</button>
          </div>
        </div>
      </div> */
}
