import React from "react";
import { useContext } from "react";
import AdminContext from "../../context/admin-context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets.js";
import AppContext from "../../context/app_context/AppContext.jsx";

const Dashboard = () => {
  const { getDashData, dashData, cancelAppointments, adminToken } = useContext(AdminContext);

  const {dateFormating} = useContext(AppContext)

  useEffect(() => {
    if (adminToken) {
      getDashData();
      const interval = setInterval(()=>{
            getDashData();
      }, 5000);
      return () => clearInterval(interval)
    }
  }, [adminToken]);

  return (
    dashData && (
      <div className="m-5">
  <div className="flex flex-col gap-6">
    {/* ======== Cards Section ======== */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Card for number of doctors */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm">
        <img className="w-14" src={assets.doctor_icon} alt="doctor" />
        <div>
          <p className="text-xl font-semibold text-gray-600">
            {dashData.doctors}
          </p>
          <p className="text-gray-400 text-sm">Doctors</p>
        </div>
      </div>

      {/* Card for number of appointments */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm">
        <img className="w-14" src={assets.appointment_icon} alt="appointments" />
        <div>
          <p className="text-xl font-semibold text-gray-600">
            {dashData.appointments}
          </p>
          <p className="text-gray-400 text-sm">Appointments</p>
        </div>
      </div>

      {/* Card for number of patients */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm">
        <img className="w-14" src={assets.patients_icon} alt="patients" />
        <div>
          <p className="text-xl font-semibold text-gray-600">
            {dashData.patients}
          </p>
          <p className="text-gray-400 text-sm">Patients</p>
        </div>
      </div>
    </div>

    {/* ======== Latest Bookings Section ======== */}
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 py-4 px-4 border-b">
        <img className="w-6" src={assets.list_icon} alt="list icon" />
        <p className="font-semibold text-gray-700">Latest Bookings</p>
      </div>

      {/* Appointment List */}
      <div className="divide-y">
        {dashData?.latestAppointments?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center px-4 py-3 gap-3 hover:bg-gray-50 transition-colors duration-200"
          >
            {/* Doctor Image + Name */}
            <div className="flex items-center gap-3">
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={item.docData.image}
                alt={item.docData.name}
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.docData.name}</p>
                <p className="text-gray-600">{dateFormating(item.slotDate)}</p>
              </div>
            </div>

            {/* Cancel Button / Status */}
            <div className="ml-auto flex items-center gap-2 mt-2 sm:mt-0">
              {item.cancelled ? (
                <p className="text-red-400 text-sm font-medium">Cancelled</p>
              ) : (
                <img
                  onClick={() => cancelAppointments(item._id)}
                  className="w-8 sm:w-9 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="cancel"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

    )
  );
};

export default Dashboard;
