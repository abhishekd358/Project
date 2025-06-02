import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
const Register = ({name, email, password, message, setEmail, setName, setMessage,setPassword}) => {
  


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/user/register', {
        name,
        email,
        password,
      });
      setMessage(response.data.message)

      // Clear the input fields
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  
    





  return (
    <>
    <div className='auth-main' style={{ padding: '26px',backgroundColor: '#f4f9ff'}}> 
        <div className="auth-container" >
    <h2>Create Your Account</h2>
    <form className="auth-form" method='POST' onSubmit={submitHandler}>
      {message !== '' ? <h4>{message}</h4> : ''}
      <input type="text" placeholder="Full Name" required name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="email" placeholder="Email Address" required name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" required name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button type="submit">Register</button>
      <p>Already have an account? <Link to='/login'>Login here</Link></p>
    </form>
  </div>
  </div>   
</>
  )
}

export default Register