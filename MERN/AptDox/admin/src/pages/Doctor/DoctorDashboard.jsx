import React, { useContext, useEffect } from "react";
import DoctorContext from "../../context/doctor-context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import AppContext from "../../context/app_context/AppContext";

const DoctorDashboard = () => {
  const {
    dashData,
    docDashboard,
    doctorToken,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { dateFormating, currency } = useContext(AppContext);
  console.log("+++++++++",dashData);
  
useEffect(() => {
  if (doctorToken) {
    const fetchDashboard = async () => {
      await docDashboard(); 
    };
    fetchDashboard(); 
  }
}, [doctorToken]);

  return (
    dashData && (
      <div className="m-5">
  <div className="flex flex-col gap-6">
    {/* ======== Cards Section ======== */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Card for number of patients */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm">
        <img className="w-14" src={assets.patients_icon} alt="patients" />
        <div>
          <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
          <p className="text-gray-400 text-sm">Patients</p>
        </div>
      </div>

      {/* Card for number of appointments */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm">
        <img className="w-14" src={assets.appointment_icon} alt="appointments" />
        <div>
          <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
          <p className="text-gray-400 text-sm">Appointments</p>
        </div>
      </div>

      {/* Card for total earnings */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border-2 border-gray-100 cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm">
        <img className="w-14" src={assets.earning_icon} alt="earnings" />
        <div>
          <p className="text-xl font-semibold text-gray-600">
            {currency} {dashData.earning}
          </p>
          <p className="text-gray-400 text-sm">Earnings</p>
        </div>
      </div>
    </div>

    {/* ======== Latest Bookings Section ======== */}
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
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
            <div className="flex items-center gap-3">
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={item.userData.image}
                alt={item.userData.name}
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.userData.name}</p>
                <p className="text-gray-600">{dateFormating(item.slotDate)}</p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2 mt-2 sm:mt-0">
              {item.cancelled ? (
                <p className="text-red-400 text-sm font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-sm font-medium">Completed</p>
              ) : (
                <div className="flex gap-2">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 sm:w-9 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="cancel"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-8 sm:w-9 cursor-pointer"
                    src={assets.tick_icon}
                    alt="complete"
                  />
                </div>
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

export default DoctorDashboard;
