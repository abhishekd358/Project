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
    <div className='min-h-screen bg-white border-r'>
      {
        adminToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-blue-500': ''}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='block max-sm:hidden'>Dashboard</p>
          </NavLink>
          
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-blue-500': ''}`} to={'/all-appointments'}>
            <img src={assets.appointment_icon} alt="" />
            <p className='block max-sm:hidden'>Appointment</p>
          </NavLink>

          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-blue-500': ''}`} to={'/add-doctor'}>
            <img src={assets.add_icon} alt="" />
            <p className='block max-sm:hidden'>AddDoctor</p>
          </NavLink>

          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-blue-500': ''}`} to={'/doctor-list'}>
            <img src={assets.people_icon} alt="" />
            <p className='block max-sm:hidden'>DoctorList</p>
          </NavLink>

       



        </ul>
      }

      {/* ==============Doctor sidebar================  */}

      {
        doctorToken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-blue-500': ''}`} to={'/doctor-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='block max-sm:hidden'>Dashboard</p>
          </NavLink>
          
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-blue-500': ''}`} to={'/doctor-appointments'}>
            <img src={assets.appointment_icon} alt="" />
            <p className='block max-sm:hidden'>Appointments</p>
          </NavLink>

          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ?'bg-[#F2F3FF] border-r-4 border-blue-500': ''}`} to={'/doctor-profile'}>
            <img src={assets.people_icon} alt="" />
            <p className='block max-sm:hidden'>Profile</p>
          </NavLink>

        </ul>
      }

    </div>
  )
}

export default Sidebar