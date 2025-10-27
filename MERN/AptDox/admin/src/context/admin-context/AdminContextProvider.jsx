import { useState } from "react";
import AdminContext from "./AdminContext";
import axios from 'axios'
import {toast} from 'react-toastify'

const AdminContextProvider = (props) => {
  // token state
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken')? localStorage.getItem('adminToken') :'')
  const backendUrl = import.meta.env.VITE_BACKEND_URL


  // storing fetch doctor data to state
    const [doctors, setDoctors] = useState([])
  // getting all Doctors data for admin access
  const fetchAllDoctors = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/admin/all-doctors`,{headers: {adminToken}})
      if (data.success){
        setDoctors(data.doctors)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.message) 
    }
  }


  // doctor availbilty change arrow function
  const changeAvailabilityHandler = async (docId) => {
    try {
      const {data} = await axios.patch(`${backendUrl}/api/admin/change-availability`,{docId}, {headers:{adminToken}} )
      // console.log(data)

      if (data.success) {
        toast.success(data.message)
        // then we have to update the docotor List as well, so call fetch function
        fetchAllDoctors()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.message) 
    }
  }



  // ===================== get all appointment 

  // storing state for appointment
  const [appointments, setAppointments] = useState([])

  const AllAppointments = async () => {
    try {
       const {data} = await axios.get(`${backendUrl}/api/admin/get-appointments`, {headers:{adminToken}} )
      // console.log(data);
      
      if(data.success){
        setAppointments(data.appointments)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.message) 
    }
  }


  // ==================================== cancel appoinmtnet
  
  
  const cancelAppointments = async (appointmentId) => {
    try {
       const {data} = await axios.put(`${backendUrl}/api/admin/cancel-appointments`,{appointmentId},{headers:{adminToken}} )
      // console.log(data);
      
      if(data.success){
        toast.success(data.message)
        await AllAppointments()
        await getDashData()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.message) 
      
    }
  }



  // =============================== admin Dashboard
  const [dashData, setDashData] = useState([])
  
  const getDashData = async () => {
    try {

      const {data} = await axios.get(`${backendUrl}/api/admin/dashboard`,{headers:{adminToken}} )
      if(data.success){
        setDashData(data.dashData)
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
       console.log(error.message) 
    }
  }




    let value = {
        // name: "AptDox", //just for testing
        setAdminToken,adminToken,
        backendUrl,
        fetchAllDoctors,doctors,setDoctors,
        changeAvailabilityHandler,

        appointments,setAppointments, AllAppointments,cancelAppointments,

        getDashData,dashData
    }
  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  )
}

export default AdminContextProvider;
