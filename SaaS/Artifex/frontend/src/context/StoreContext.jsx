import MyContext from "./MyContex";
import React, { useState } from 'react'

const StoreContext = (props) => {
    // user login or not state
    // const [isLogin, setisLogin] = useState(null)
    const [user, setUser] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const value= {
        showLogin,
        setShowLogin,
        user,
        setUser,
        // isLogin
    }


  return (
    <MyContext.Provider value={value}>
        {props.children}
    </MyContext.Provider>
  )
}

export default StoreContext