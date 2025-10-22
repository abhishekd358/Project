import { assets, doctors, specialityData } from "../assets/assets_frontend/assets";
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

  // save fetch doctor to state
  const [doctorList, setDoctorList] = useState([])
  console.log("doctor list",doctorList)
  // fetching doctor list from backend
  const fetchDoctorList = async () => {
    try {

      const {data} = await axios.get(`${backendUrl}/api/doctor/list` )
      // console.log("===============",data)
      if (data.success) {
        // console.log("++++++++++ iside", data.docList)
        setDoctorList(data.docList)
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
  

  const value = {
    doctors,
    specialityData,
    assets,
    currencySymbol,
   
    fetchDoctorList,doctorList  // fetch docotr and save in state varible list
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
