import { useState } from "react";
import DoctorContext from "./DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";


const DoctorContextProvider = (props) => {


  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') ? localStorage.getItem('doctorToken') : '')



  // get doctor specific appointmetn
  const [appointmentList, setAppointmentList] = useState([])

  const getDocAppointments = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/doctor/appointments`,{headers:{doctorToken}})
      // console.log("=========================",data);
      
      if(data.success){
        setAppointmentList(data.appointments.reverse())
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



    let value = {
        name: "AptDox", //just for testing
        doctorToken,setDoctorToken,backendUrl,

        //appointment List for page doctor-appointments
        getDocAppointments,appointmentList
    }
  return (
    <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
  )
}

export default DoctorContextProvider;
