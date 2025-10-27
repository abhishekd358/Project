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

  //  doctor appointment complete=================
    const completeAppointment = async (appointmentId) => {
      try {
        const {data} = await axios.put(`${backendUrl}/api/doctor/complete-appointments`,{appointmentId},{headers:{doctorToken}})
        // console.log("=========================",data);
        
        if(data.success){
          toast.success(data.message)
          await docDashboard()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
     
  //  doctor appointment cancel=================
  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.put(`${backendUrl}/api/doctor/cancel-appointments`,{appointmentId},{headers:{doctorToken}})
      // console.log("=========================",data);
      
      if(data.success){
        toast.success(data.message)
        await docDashboard()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  
  
  // ==================== docotr dashvoard
  
  const [dashData, setDashData] = useState(false)
  const docDashboard = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/doctor/dashboard`,{headers:{doctorToken}})
      // console.log("=========================",data);
      
      if(data.success){
      setDashData(data.dashData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }





// ============================= doctor profile

  
  const [profileData, setProfileData] = useState(false)
  // console.log("----------- ", profileData);
  
  const getDocProfile = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/doctor/profile`,{headers:{doctorToken}})
      // console.log("=========================",data);
      
      if(data.success){
      setProfileData(data.profileData)
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
        getDocAppointments,appointmentList,

        completeAppointment, cancelAppointment,

        // dashboard
        docDashboard,dashData, setDashData,
        // profile
        getDocProfile,profileData,setProfileData
    }
  return (
    <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
  )
}

export default DoctorContextProvider;
