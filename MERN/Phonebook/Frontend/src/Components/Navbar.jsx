import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ isLogin, setIsLogin }) => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">📱 Phonebook</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about-project">About</Link>

          {isLogin == false && <Link to="/register">Register</Link>}
          {isLogin == false && <Link to="/login">Login</Link>}
          {isLogin == true && <Link to="/phonebook">Phonebook</Link>}
          {isLogin == true && (
            <Link
              to="/"
              onClick={() => {
                setIsLogin(false);
                localStorage.removeItem("isLogin");
              }}
            >
              Logout
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;