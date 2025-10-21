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






    let value = {
        // name: "AptDox", //just for testing
        setAdminToken,adminToken,
        backendUrl,
        fetchAllDoctors,doctors,setDoctors,
        changeAvailabilityHandler
    }
  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  )
}

export default AdminContextProvider;
