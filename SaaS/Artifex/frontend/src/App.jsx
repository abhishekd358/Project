import React, { useContext } from "react";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar"
import Login from "./components/Login";
import MyContext from "./context/MyContex";
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
    const {showLogin} = useContext(MyContext)
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 px-4 sm:px-10 md:px-14 lg:px-28 ">
      <Router>
        <ToastContainer position="bottom-right"/>
         <Navbar/>

         {showLogin && <Login/>}
         
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          {/* Result */}
          <Route path="/result" element={<Result />} />
          {/* BuyCredit */}
          <Route path="/buy" element={<BuyCredit />} />
          {/* for all route that not exists */}
          <Route path="*" element={<Home />} />
        </Routes>
         <Footer/>
      </Router>
    </div>
  );
};

export default App;
