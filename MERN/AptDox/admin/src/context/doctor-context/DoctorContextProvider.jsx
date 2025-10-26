import { useState } from "react";
import DoctorContext from "./DoctorContext";


const DoctorContextProvider = (props) => {


  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') ? localStorage.getItem('doctorToken') : '')


    let value = {
        name: "AptDox", //just for testing
        doctorToken,setDoctorToken,backendUrl
    }
  return (
    <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
  )
}

export default DoctorContextProvider;
