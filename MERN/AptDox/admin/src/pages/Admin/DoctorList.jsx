import React from 'react'
import { useContext } from 'react'
import AdminContext from '../../context/admin-context/AdminContext'
import { useEffect } from 'react'

const DoctorList = () => {
    const {fetchAllDoctors, adminToken, doctors,changeAvailabilityHandler} = useContext(AdminContext)


    // sideEffect
    useEffect(() => {
      // if available token then we only fetch doctors 
      if(adminToken){
        fetchAllDoctors()
      }
    }, [adminToken]) // first check admintoken available or not
    
  

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
  <h1 className="text-2xl font-semibold mb-6 text-gray-800">All Doctors</h1>

  {/* all doctors grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
    {doctors.map((doctor, index) => (
      <div
        key={index}
        className="border border-indigo-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden bg-white cursor-pointer group"
      >
        <img
          className="w-full h-40 object-cover bg-indigo-50 group-hover:bg-blue-400 transition-all duration-500"
          src={doctor.image}
          alt={doctor.name}
        />

        <div className="p-4">
          <p className="text-gray-900 text-lg font-medium truncate">
            {doctor.name}
          </p>
          <p className="text-sm text-gray-600">{doctor.speciality}</p>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"

              checked={doctor.available}
              readOnly
              className="accent-blue-600 w-4 h-4"
              onChange={()=>changeAvailabilityHandler(doctor._id)}
            />
            <p>{doctor.available ? "Available" : "Unavailable"}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default DoctorList