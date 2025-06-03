import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
const Login = ({email, password, setEmail, setPassword, setIsLogin, setToken}) => {
    const navigate = useNavigate()
  // //  navigation to phonebook
  // const redirectPhonebook = ()=>
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password,
      });
      setToken(response.data.your_token)
      if(response.data.success == true){
        
        setIsLogin(true)
        navigate('/phonebook')
      }

      // toast
      toast(response.data.message, {
position: "top-center",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
});

      // Clear the input fields
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
    <div className='auth-main'  style={{ padding: '58px',backgroundColor: '#f4f9ff'}}> 
    <div className="auth-container">
    <h2>Login to Your Account</h2>
    <form className="auth-form" method='POST' onSubmit={submitHandler}>
      <input type="email" placeholder="Email Address" required value={email} name='email' onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" required value={password} name='password' onChange={(e)=>setPassword(e.target.value)}/>
      <button type="submit">Login</button>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </form>
  </div>
  </div>
  </>
  )
}

export default Login