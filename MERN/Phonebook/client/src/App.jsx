import React from "react";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Phonebook from "./Components/Phonebook";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
      <Navbar />
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/phonebook" element={<Phonebook />} />
          
        </Routes>
  
      <Footer />
      </Router>
    </>
  );
};

export default App;
