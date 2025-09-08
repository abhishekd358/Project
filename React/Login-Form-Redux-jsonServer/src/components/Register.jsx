import React, { useEffect } from 'react'
import styles from './register.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { captureEmail, captureName, capturePassword, userRegisterFetch, clearFields } from '../store/User/userRegisterSlice'
const Register = () => {
    const {name, email, password, status} = useSelector((state)=>state.user)
    const dispatch = useDispatch()

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        // now we call the fecth function which declare in the userRegisterSlice
        dispatch(userRegisterFetch({name, email, password}))
    }

      // 👇 Run when status changes to success
  useEffect(() => {
    if (status === 'success') {
      dispatch(clearFields())
    }
  }, [status, dispatch])

    
  return (
    <div className={styles.container}>
      <form className={styles.registerForm} onSubmit={formSubmitHandler}>
        <h2>Create Account</h2>

        <div style={{textAlign:'center'}}>
        {status === 'success' && <p>User Register Successfully !</p>}
        {status === 'loading' && <p>Loading...........</p>}
        {status === 'failed'  && <p>Failed to Register</p>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" value={name} onChange={(e)=>dispatch(captureName(e.target.value))}  placeholder="Enter your name" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" value={email} onChange={(e)=>dispatch(captureEmail(e.target.value))} placeholder="Enter your email" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e)=>dispatch(capturePassword(e.target.value))}  placeholder="Enter your password" required />
        </div>

        <button type="submit" className={styles.btn}>Register</button>

        <p className={styles.note}>
          Already have an account? <a href="#">Login</a>
        </p>
      </form>
    </div>
  )
}

export default Register