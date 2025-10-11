import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const Doctor = () => {
  const { doctors, specialityData } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeSpeciality, setActiveSpeciality] = useState("All");

  // function for filter doctor on render
  const filteredDoctors =
    activeSpeciality === "All"
      ? doctors
      : doctors.filter((doc) => doc.speciality === activeSpeciality);

  return (
    <div className="px-25 pt-10 pb-30">
      <p className="text-gray-600 ">Browse through the doctors speciality.</p>

      <div className="flex flex-cols sm:flex-row items-start gap-5 mt-5">
        {/* left div */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {/* show all btn */}
          <p
            className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              activeSpeciality === "All"
                ? "bg-blue-100 border-blue-300 font-semibold"
                : "bg-white border-gray-300"
            }`}
            onClick={() => setActiveSpeciality("All")}
          >
            All
          </p>

          {/* filter card */}
          {specialityData.map((item, index) => (
            <p
              key={index}
              className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border rounded cursor-pointer transition-all ${
                activeSpeciality === item.speciality
                  ? "bg-blue-100 border-blue-300 font-semibold"
                  : "bg-white border-gray-300"
              }`}
              onClick={() => setActiveSpeciality(item.speciality)}
            >
              {item.speciality}
            </p>
          ))}
        </div>

        {/* right div */}
        {/* Cards Container */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-6 md:gap-8 lg:gap-10 pt-1 justify-items-center px-5">
          {/* Cards */}
          {filteredDoctors.slice(0, 10).map((doctorCard) => (
            <div
              className="bg-[#eaefff] rounded-xl border border-blue-100 hover:shadow-lg transition duration-300 hover:scale-105 w-full flex flex-col cursor-pointer"
              key={doctorCard._id}
              onClick={() => navigate(`/appointment/${doctorCard._id}`)}
            >
              {/* Image Container */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={doctorCard.image}
                  alt={`Dr. ${doctorCard.name}`}
                  className="w-full object-cover rounded-lg"
                />
              </div>

              {/* Card Content */}
              <div className="bg-white rounded-b-xl px-4 py-4 flex flex-col">
                <p className="text-green-500 text-sm font-medium mb-1">
                  Available
                </p>
                <h2 className="font-semibold text-sm md:text-md text-gray-800 truncate">
                  {doctorCard.name}
                </h2>
                <p className="font-normal text-sm text-gray-600 truncate">
                  {doctorCard.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
