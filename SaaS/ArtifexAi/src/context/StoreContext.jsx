import MyContext from "./MyContex";
import React, { useState } from 'react'

const StoreContext = (props) => {
    // user login or not state
    const [isLogin, setisLogin] = useState(null)

    const value= {
        isLogin,
        setisLogin
    }


  return (
    <MyContext.Provider value={value}>
        {props.children}
    </MyContext.Provider>
  )
}

export default StoreContext