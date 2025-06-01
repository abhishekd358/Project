import React from 'react'

const Register = () => {
  return (
    <>
    <div className='auth-main'> 
        <div className="auth-container">
    <h2>Create Your Account</h2>
    <form className="auth-form">
      <input type="text" placeholder="Full Name" required />
      <input type="email" placeholder="Email Address" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Register</button>
      <p>Already have an account? <a href="login.html">Login here</a></p>
    </form>
  </div>
  </div>   
</>
  )
}

export default Register