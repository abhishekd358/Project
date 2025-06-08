import React from "react";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 px-4 sm:px-10 md:px-14 lg:px-28 ">
      <Router>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          {/* Result */}
          <Route path="/result" element={<Result />} />
          {/* BuyCredit */}
          <Route path="/buy" element={<BuyCredit />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
