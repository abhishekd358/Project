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
    }
  }, [adminToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          {/* Card for number of docotrs */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:scale-110">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          {/* Card for number of Appointmets */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:scale-110">
            <img className="w-1" src={assets.appointment_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          {/* Card for number of Patients */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:scale-110">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>

          {/* appoinmetnt Showing Title */}
          <div className="bg-white">
            <div className="flex items-center gap-2.5 py-4 mt-10 rounded-t border">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">Latest Bookings</p>
            </div>
{/* -------- redering list of appointment----------------- */}
            {/* appointement List  */}
            <div className="pt-4 border border-t-0">
              {dashData?.latestAppointments?.map((item, index) => (
                <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
                  <img className="rounded-full w-10" src={item.docData.image} alt="" />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">{item.docData.name}</p>
                    <p className="text-gray-600">{dateFormating(item.slotDate)}</p>
                  </div>

                  {/* cancle btn */}
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointments(item._id)}
                      className="w-10 rounded-full cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                  )}
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
