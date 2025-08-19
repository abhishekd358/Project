"use client";  // 👈 Important

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login"; // or use next/navigation router
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-pink-200 shadow-md relative">
      <div className="font-bold text-xl text-pink-700">My App</div>

      {user ? (
        <div
          className="relative"
          onMouseEnter={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
        >
          <FaUserCircle size={36} className="text-gray-700 cursor-pointer" />

          {dropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-4 z-20">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <hr className="my-2" />
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-500 hover:bg-red-100 px-3 py-2 rounded-md font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4">
          <button className="text-gray-800 font-medium">Login</button>
          <button className="text-gray-800 font-medium">Register</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
