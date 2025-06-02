import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = ({email, password, setEmail, setPassword, setMessage, message, setIsLogin, setToken}) => {
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
      setMessage(response.data.message)
      if(response.data.success == true){
        
        setIsLogin(true)
        navigate('/phonebook')
      }
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
      {message && <h4>{message}</h4>}
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