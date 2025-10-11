import React from 'react'
import { useParams } from 'react-router-dom'

const Appointment = () => {
  const x = useParams()
  console.log(x);
  
  return (
    <div>Appointment</div>
  )
}

export default Appointment