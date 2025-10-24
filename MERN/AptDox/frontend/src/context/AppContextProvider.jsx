import { assets, specialityData } from "../assets/assets_frontend/assets";
import { AppContext } from "./AppContext";
import {toast} from 'react-toastify'
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";
const AppContextProvider = (props) => {

  // currency value
  const currencySymbol = "₹"
  // backend url
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  // token set kar te hai
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

  // save fetch doctor to state
  const [doctors, setDoctors] = useState([])
  // console.log("doctor list",doctors)
  // fetching doctor list from backend
  const fetchDoctorList = async () => {
    try {

      const {data} = await axios.get(`${backendUrl}/api/doctor/list` )
      // console.log("===============",data)
      if (data.success) {
        // console.log("++++++++++ iside", data.docList)
        setDoctors(data.docList)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  // sideEffect
  useEffect(() => {
    fetchDoctorList()
  }, [])

  //================== user profile 
  const [userData, setUserData] = useState(false)
  const loadUserProfileData = async () => {
    try {

      const {data} = await axios.get(`${backendUrl}/api/user/get-user-profile`,{headers:{token}} )
      // console.log("===============",data)
      if (data.success) {
        setUserData(data.userData)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  

  useEffect(() => {
    // if our token present then only we load data
    if(token){
      loadUserProfileData()
    }else{
      setUserData(false)
    }
   
  }, [token])



  const value = {
    doctors,specialityData,assets,currencySymbol,
   
    fetchDoctorList,  // fetch docotr and save in state varible list

    token,setToken,backendUrl,

    userData, setUserData, loadUserProfileData// user data for profile
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
