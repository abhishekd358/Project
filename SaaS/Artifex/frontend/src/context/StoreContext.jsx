import axios from "axios";
import MyContext from "./MyContex";
import React, { useEffect, useState} from 'react'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const StoreContext = (props) => {
    // user login or not state
    // const [isLogin, setisLogin] = useState(null)
    const [user, setUser] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    // token store and get in localstorage.
    const [token, setToken] = useState(localStorage.getItem('token'))

    // credit state
    const [credit, setCredit] = useState(0)
    // backend url
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // Navigate
    const navigate = useNavigate()
    




    // fetching the user credit that have to user from backend
    const loadCreditsData = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/user/credits`, {headers: {token}}) 
    if (response.data.success) {
      console.log(response);
      setCredit(response.data.credits);
      setUser(response.data.user); 
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
}


  const generateImage = async (prompt) => { 
    try {
      const {data} = await axios.post(`${backendUrl}/api/image/generate-image`, {prompt}, {headers: {token}})
     
      if (data.success) {
          loadCreditsData()
          return data.resultImage
      }else{
        toast.error(data.message)
        loadCreditsData()
        if(data.creditBalance === 0){
           return { error: 'no-credit' }; 
        }
      }

    } catch (error) {
      toast.error(error.message)
      
    }
    
  }


    useEffect(() => {
  if (token) {
    loadCreditsData();
  }
}, [token]);  // Watch 'token' — whenever 'token' changes, this runs!

    
    // logout feature 
    const logout = () =>{
      localStorage.removeItem('token')
      setToken('')
      setUser(null)
      navigate('/')
      
    }




    const value= {
        showLogin,setShowLogin,
        user,setUser,
        // isLogin
        backendUrl,
        token,setToken,
        credit,setCredit,
        loadCreditsData,
        logout,
        generateImage
    }


  return (
    <MyContext.Provider value={value}>
        {props.children}
    </MyContext.Provider>
  )
}

export default StoreContext