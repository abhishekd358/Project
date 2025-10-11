import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, assets,currencySymbol } = useContext(AppContext);
  // saving doctor info in variable state
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  // function to find doctor inforamtion from array
  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

// function to get availabel slots
const getAvailbleSlots = async () => {
  setDocSlots([])
  
}



  return (
    docInfo && (
      <div className="px-24">
        {/* ----------doctor details---------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-gradient-to-b from-violet-700 to-blue-600 w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg:white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* --------------right docotrs details */}
            <p className="flex item-center gap-2 text-2xl font-medium text-gray-900">{docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" /></p>

            {/* doctor speciality and experence */}
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className="py-1 px-2 bg-neutral-100-700 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            {/* doctor about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900">About <img src={assets.info_icon} alt="" /></p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            {/* Payement details */}
            <p className="text-gray-500 font-medium mt-4">Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span></p>
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
