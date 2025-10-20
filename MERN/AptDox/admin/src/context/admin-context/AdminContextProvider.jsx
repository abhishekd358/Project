import { useState } from "react";
import AdminContext from "./AdminContext";


const AdminContextProvider = (props) => {
  // token state
  const [adminToken, setAdminToken] = useState('')
  const backendUrl = import.meta.env.VITE_BACKEND_URL

    let value = {
        name: "AptDox", //just for testing
        setAdminToken,
        adminToken,
        backendUrl
    }
  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  )
}

export default AdminContextProvider;
