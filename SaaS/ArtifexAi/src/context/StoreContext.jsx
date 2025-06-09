import MyContext from "./MyContex";
import React, { useState } from 'react'

const StoreContext = (props) => {
    // user login or not state
    const [isLogin, setisLogin] = useState(null)
    const [user, setUser] = useState(true)

    const value= {
        isLogin,
        setisLogin,
        user,
        setUser
    }


  return (
    <MyContext.Provider value={value}>
        {props.children}
    </MyContext.Provider>
  )
}

export default StoreContext