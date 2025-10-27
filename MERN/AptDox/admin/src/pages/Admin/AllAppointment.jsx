import React from 'react'
import { useContext } from 'react'
import AdminContext from '../../context/admin-context/AdminContext'
import { useEffect } from 'react'
import AppContext from '../../context/app_context/AppContext'
import {assets} from '../../assets/assets_admin/assets.js'
const AllAppointment = () => {

  const {appointments, AllAppointments,adminToken,cancelAppointments} = useContext(AdminContext)

  const {calculateAge, dateFormating,currency} = useContext(AppContext)

  useEffect(()=>{
    if(adminToken){
      AllAppointments()
    }
  },[adminToken])



  return (
    <div className="w-full max-w-6xl m-5">
  <p className="mb-3 text-lg font-medium">All Appointments</p>

  <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
    {/* ======= Table Header (Desktop only) ======= */}
    <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 text-gray-700 font-medium">
      <p>#</p>
      <p>Patient</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Doctor</p>
      <p>Fees</p>
      <p>Actions</p>
    </div>

    {/* ======= Appointment Rows ======= */}
    {appointments.map((item, index) => (
      <div
        key={index}
        className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-start sm:items-center gap-3 sm:gap-0 text-gray-600 py-3 px-6 border-b hover:bg-gray-50 transition-all duration-200"
      >
        {/* Index */}
        <p className="hidden sm:block">{index + 1}</p>

        {/* Patient */}
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full object-cover bg-gray-200"
            src={item.userData.image}
            alt={item.userData.name}
          />
          <p className="text-sm font-medium">{item.userData.name}</p>
        </div>

        {/* Age */}
        <p className="hidden sm:block">{calculateAge(item.userData.dob)}</p>

        {/* Date & Time */}
        <p className="text-sm">
          {dateFormating(item.slotDate)}, {item.slotTime}
        </p>

        {/* Doctor */}
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full object-cover bg-gray-200"
            src={item.docData.image}
            alt={item.docData.name}
          />
          <p className="text-sm font-medium">{item.docData.name}</p>
        </div>

        {/* Fees */}
        <p className="text-sm">
          {currency}
          {item.amount}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {item.cancelled ? (
            <p className="text-red-400 text-xs font-medium">Cancelled</p>
          ) : (
            <img
              onClick={() => cancelAppointments(item._id)}
              className="w-9 sm:w-10 cursor-pointer rounded-full"
              src={assets.cancel_icon}
              alt="Cancel"
            />
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default AllAppointment