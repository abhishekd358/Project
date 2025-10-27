import React, { useContext } from 'react'
import AdminContext from '../context/admin-context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import DoctorContext from '../context/doctor-context/DoctorContext'

const Sidebar = () => {
  const {adminToken} = useContext(AdminContext)

  // if doctor context then we render differenct sidebar
  const{doctorToken} = useContext(DoctorContext)


  return (
    <div className="min-h-screen bg-white border-r w-20 sm:w-56 md:w-72 transition-all duration-300">
      {/* ==============Admin sidebar================ */}
      {adminToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-blue-500'
                  : 'hover:bg-gray-50'
              }`
            }
            to={'/admin-dashboard'}
          >
            <img className="w-5 sm:w-6" src={assets.home_icon} alt="" />
            <p className="hidden sm:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-blue-500'
                  : 'hover:bg-gray-50'
              }`
            }
            to={'/all-appointments'}
          >
            <img className="w-5 sm:w-6" src={assets.appointment_icon} alt="" />
            <p className="hidden sm:block">Appointment</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-blue-500'
                  : 'hover:bg-gray-50'
              }`
            }
            to={'/add-doctor'}
          >
            <img className="w-5 sm:w-6" src={assets.add_icon} alt="" />
            <p className="hidden sm:block">AddDoctor</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-blue-500'
                  : 'hover:bg-gray-50'
              }`
            }
            to={'/doctor-list'}
          >
            <img className="w-5 sm:w-6" src={assets.people_icon} alt="" />
            <p className="hidden sm:block">DoctorList</p>
          </NavLink>
        </ul>
      )}

      {/* ==============Doctor sidebar================  */}
      {doctorToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-blue-500'
                  : 'hover:bg-gray-50'
              }`
            }
            to={'/doctor-dashboard'}
          >
            <img className="w-5 sm:w-6" src={assets.home_icon} alt="" />
            <p className="hidden sm:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-blue-500'
                  : 'hover:bg-gray-50'
              }`
            }
            to={'/doctor-appointments'}
          >
            <img className="w-5 sm:w-6" src={assets.appointment_icon} alt="" />
            <p className="hidden sm:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-blue-500'
                  : 'hover:bg-gray-50'
              }`
            }
            to={'/doctor-profile'}
          >
            <img className="w-5 sm:w-6" src={assets.people_icon} alt="" />
            <p className="hidden sm:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )

}

export default Sidebar