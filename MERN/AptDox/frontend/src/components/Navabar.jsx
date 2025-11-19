import { NavLink, useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets.js";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
const Navabar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  //  importign token from the context
  const { token, setToken, userData } = useContext(AppContext);

  // logout method
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex justify-between md:justify-around items-center p-5">
      <NavLink to="/" className="flex-shrink-0">
        <img
          src={assets.logo}
          alt="aptdox logo"
          className="w-32 md:w-40 cursor-pointer transition-all duration-300"
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
            to="/doctors"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Doctors
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
        {/* DOCTOR ADMIN LOGIN------------------------------------------ */}
        <li className="relative group">
          <span className="nav-link cursor-pointer">LOGIN</span>

          {/* Dropdown */}
          <div
            className="absolute left-0 mt-1 w-40 bg-white shadow-lg rounded-md py-2 z-50
                  hidden group-hover:block"
          >
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-200 nav-link"
            >
              User Login
            </Link>

            <Link
              target="_blank"
              to="https://aptdox-panel.vercel.app/"
              className="block px-4 py-2 hover:bg-gray-200 nav-link"
            >
              Doctor Login
            </Link>

            <Link
              target="_blank"
              to="https://aptdox-panel.vercel.app/"
              className="block px-4 py-2 hover:bg-gray-200 nav-link"
            >
              Admin Login
            </Link>
          </div>
        </li>
      </ul>

      <div className="flex items-center gap-3">
        {token ? (
          <div className="relative group">
            <img
              src={userData.image}
              alt=""
              className="w-10 h-10 object-cover cursor-pointer rounded-full border-2 border-blue-500"
            />

            {/* menu-profile-hover-card */}
            <div className="absolute top-full right-0 mt-2 w-48 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border border-blue-100">
              <div className="min-w-48 bg-blue-50 shadow-lg p-4 rounded flex flex-col gap-4 font-medium text-gray-600">
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
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-blue-700 font-bold hover:text-red-500 cursor-pointer"
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

        {/* mobile menu drawer sccren*/}

        {/*MOBILE MENU BUTTON */}
        <img
          onClick={() => setShowMenu(true)}
          src={assets.menu_icon}
          alt="Menu"
          className="w-6 cursor-pointer md:hidden transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* ========== OVERLAY (Background Dim) ========== */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ${
          showMenu
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setShowMenu(false)}
      />

      {/* ========== DRAWER ITSELF ========== */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-500 ease-in-out ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } md:hidden shadow-2xl`}
      >
        {/* ========== DRAWER HEADER ========== */}
        <div className="flex justify-between items-center px-6 py-6 border-b border-gray-200">
          <img src={assets.logo} alt="Logo" className="w-32" />
          <button
            onClick={() => setShowMenu(false)}
            className="p-2 bg-gray-200 hover:bg-blue-100 rounded-full transition-colors duration-200 cursor-pointer"
          >
            <img src={assets.cross_icon} alt="Close" className="w-5 " />
          </button>
        </div>

        {/* ========== MENU LINKS ========== */}
        <ul className="flex flex-col p-6 space-y-4">
          <li>
            <NavLink
              to="/"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctors"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              Contact
            </NavLink>
          </li>

          {/* =========additional login */}
          <li>
            <NavLink
              to="/login"
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              User Login
            </NavLink>
          </li>

          <li>
            <Link
              target="_blank"
              to="https://aptdox-panel.vercel.app/"
              onClick={() => setShowMenu(false)}
              className="block py-3 px-4 rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
  
            >
              Doctor Login
            </Link>
          </li>

          <li>
            <Link
              target="_blank"
              to="https://aptdox-panel.vercel.app/"
              onClick={() => setShowMenu(false)}
              className="block py-3 px-4 rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
  
            >
              Admin Login
            </Link>
          </li>
          
          


        </ul>
      </div>
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
