import MyContext from "./MyContex";
import React, { useState } from 'react'

const StoreContext = (props) => {
    // user login or not state
    // const [isLogin, setisLogin] = useState(null)
    const [user, setUser] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    // token store and get in localstorage.
    const [token, setToken] = useState(localStorage.getItem('token'))

    // credit state
    const [credit, setCredit] = useState(false)
    

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const value= {
        showLogin,setShowLogin,
        user,setUser,
        // isLogin
        backendUrl,
        token,setToken,
        credit,setCredit,
    }


  return (
    <MyContext.Provider value={value}>
        {props.children}
    </MyContext.Provider>
  )
}

export default StoreContext