import React, { Children, useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Phonebook from "./Components/Phonebook";
import NotFound from "./Components/NotFound";
import AboutProject from "./Components/AboutProject";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";
const App = () => {
  // ----------------------- states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

 

  // now if user referesh the page when login , we not going to logout him , weven afeter he referesh we check the login stauts
    //Initialize from localStorage directly
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("isLogin") === "true";
  });

  // Keep localStorage updated when isLogin changes
  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  return (
    <>
      <Router>
        <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <Register
                name={name}
                email={email}
                password={password}
                message={message}
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
                setMessage={setMessage}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                setMessage={setMessage}
                message={message}
                setIsLogin={setIsLogin}
                isLogin={isLogin}
              />
            }
          />



            <Route path="/about-project" element={<AboutProject/>}/>


          {/* Phonebook */}
          <Route
            path="/phonebook"
            element={
              <ProtectedRoute isLogin={isLogin}>
                {/* if login is true then only we render children(whstever inside the ProtectedRoute Component) */}
                <Phonebook message={message} /> {/* this is my children*/}
              </ProtectedRoute>
            }
          />



          {/* Handle non existing route */}
          <Route path="*" element={<NotFound />} />

        </Routes>

        <Footer />
      </Router>
    </>
  );
};

export default App;
