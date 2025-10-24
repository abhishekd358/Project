import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointments = () => {
  const { backendUrl, token, fetchDoctorList} = useContext(AppContext);
  
  const navigate = useNavigate();

  // backend
  const [appointments, setAppointments] = useState([]);

  // date formating into '20_4_2024' to 20 April, 2024

  const months = ["",'jan', 'feb', 'mar', 'apr', 'may', 'jun','jul', 'aug', 'sep','oct', 'nov', 'dec'];

  const dateFormating = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return " "+dateArray[0]+ ' '+ months[Number(dateArray[1])]+' '+ dateArray[2]
  }




  // ============================== fetch user specific appointment data
  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/user-appointments`,
        { headers: { token } }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointments();
    } else {
      navigate("/login");
    }
  }, [token]);




// ===================================== cancel appointment 

  const cancelledAppointment = async (id) => {
    try {
      const {data} = await axios.post( `${backendUrl}/api/user/cancel-appointment`,{id}, {headers:{token}})
      console.log("=============",data);
      
      if(data.success){
        toast.success(data.message)
        console.log(data);
        await fetchAppointments()
        await fetchDoctorList()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  } 


  return (
    <div className="mx-10 md:mx-20 lg:mx-25 mt-5 mb-50">
      <p className="pb-3 mt-12 font-medium tex-gray-800 border-b">
        My Appointments
      </p>
      {/* -----doctor listing */}
      <div className="space-y-6 mt-6">
        {appointments.map((item, index) => (
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border border-blue-100 rounded-md bg-neutral-50 shadow-lg p-10 transition-all duration-500 hover:scale-105 hover:shadow-md hover:shadow-indigo-50 hover:bg-blue-50"
            key={index}
          >
            {/* image */}
            <div onClick={() => {
              navigate(`/appointment/${item.docId}`);
              scrollTo(0, 0);
            }} className="cursor-pointer">
              <img
                src={item.docData.image}
                alt=""
                className="w-32 bg-indigo-50"
              />
            </div>

            {/*appointment deatisl  */}
            <div className="flex-1 text-sm text-gray-800 cursor-pointer" onClick={() => {
              navigate(`/appointment/${item.docId}`);
              scrollTo(0, 0);
            }}>
              <p className="text-neutral-800 font-semibold ">
                {item.docData.name}
              </p>
              <p className="text-blue-500">{item.docData.speciality}</p>
              <p className="text-gray-800 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time: 
                </span>
                 {dateFormating(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* to component responsive */}
            <div></div>
            {/* btn */}
            <div className="flex flex-col gap-2 justify-end">
            {!item.cancelled && <button className="text-sm text-stone-500 text-center sm:minw-48 py-2 px-4 border rounded hover:text-white transition-all duration-500 hover:bg-blue-500 cursor-pointer">
                Pay Online
              </button>}  

              {/* we only display if not cancel appointment */}
              {!item.cancelled ? <button onClick={()=>cancelledAppointment(item._id)} className="text-sm text-stone-500 text-center sm:minw-48 py-2 px-4 border rounded hover:text-white transition-all duration-500 hover:bg-red-500 cursor-pointer">
                Cancel appointmenet
              </button> 
              : 
              <button disabled className="text-sm bg-red-400 text-center sm:minw-48 py-2 px-4 border rounded text-white transition-all duration-500">
                Appointment cancelled
              </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
