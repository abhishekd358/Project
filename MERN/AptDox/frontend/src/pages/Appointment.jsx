import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { RelatedDoctor } from "../components/RelatedDoctor";

const Appointment = () => {




  
  const { docId } = useParams();
  const { doctors, assets,currencySymbol } = useContext(AppContext);
  // saving doctor info in variable state
  const [docInfo, setDocInfo] = useState(null);
  // Booking state
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED','THU', 'FRI', 'SAT']

  // function to find doctor inforamtion from array
  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

// function to get availabel slots
const getAvailbleSlots = async () => {
  setDocSlots([]) 

  // getting current date 
  let today = new Date();
  

  for (let i = 0; i < 7; i++) {
    // getting date with index
    let currentDate = new Date(today); // ✅ Today ki copy banao
    
    // setting end time of the date with index
    let endTime = new Date()
    endTime.setDate(today.getDate()+i)
    // set docotr last end time for appointment
    endTime.setHours(21,0,0,0)

    // setting hours
    if (today.getDate()=== currentDate.getDate()) {// if today date and user choose date same 
      // Agar current time 10 AM se zyada hai, next hours se start kro 
      currentDate.setHours(currentDate.getHours()> 10? currentDate.getHours()+ 1: 10)
        // Agar 30 minutes se zyada hue hain: next 30-minute slot se start karo

        // Example: Agar abhi 11:20 AM hai, toh 11:30 AM se slots start honge
        currentDate.setMinutes(currentDate.getMinutes() >30 ? 30 : 0)
    }else{
      // not in current date 
      currentDate.setHours(10);
      currentDate.setMinutes(0)
    }
    // Ek din ke saare slots store karne ke liye empty array
    let timeSlots = []
    while(currentDate< endTime){
      let formattedTime = currentDate.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})

      
      // add slot to array
      timeSlots.push({
        datetime : new Date(currentDate),
        time: formattedTime
      })
      // increment the time by 30 min
      currentDate.setMinutes(currentDate.getMinutes()+30)
    }
    setDocSlots(prev => ([...prev, timeSlots]))
  }
}

// slot booking use effect run when the DocInfo change
useEffect(() => {
  getAvailbleSlots()
}, [docInfo])





  return (
    docInfo && (
      <div className="px-24 mb-30">
        {/* ----------doctor details---------- */}
        <div className="flex flex-col sm:flex-col sm:items-center md:flex-row gap-4">
          <div>
            <img className="bg-gradient-to-b from-violet-700 to-blue-600 w-full sm:max-w-75 rounded-lg" src={docInfo.image} alt="" />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg:white mx-2 sm:mx-0 mt-[20px] sm:mt-0">
            {/* --------------right docotrs details */}
            <p className="flex item-center gap-2 text-2xl font-medium text-gray-900 sm:mt-10">{docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" /></p>

            {/* doctor speciality and experence */}
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className="py-1 px-2 bg-neutral-100-700 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            {/* doctor about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900">About <img src={assets.info_icon} alt="" /></p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            {/* Payement details */}
            <p className="text-gray-500 font-medium mt-4">Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span></p>
          </div>
        </div>
        {/* ---------------Appointment slots */}
          <div className="ml-0 sm:ml-0 md:ml-20 lg:ml-75 sm:pl-4 mt-4 font-medium text-gray-700">
            <p>Booking slots</p>
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {
                docSlots.length && docSlots.map((item, index)=>(
                  <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-400 ${slotIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-400'}`} key={index}> 
                    <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))
              }
            </div>

            {/* time selection */}
            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
              {docSlots.length && docSlots[slotIndex].map((item, index)=>(
                <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-400 ${item.time === slotTime ? 'bg-blue-600 text-white' : 'text-gray-400 border border-gray-300'}`}>
                  {item.time.toLowerCase()}
                </p>
              ))}

            </div>
            {/* Button for Book an appointment */}
            <button className="bg-blue-600 text-white text-sm font-light px-14 py-3 rounded-full my-6
            cursor-pointer transition-bg duration-300 hover:bg-blue-400">Book an appointment</button>
          </div>
          {/* import the Related Doctor component */}
          <RelatedDoctor docId={docId} speciality={docInfo.speciality}>

          </RelatedDoctor>
      </div>
    )
  );
};

export default Appointment;


// here is the logic of implemetation 

// START
//   ↓
// GET CURRENT DATE & TIME
//   ↓
// FOR EACH DAY (7 days total):
//   ↓
// CALCULATE DAY'S DATE
//   ↓
// SET END TIME (9 PM)
//   ↓
// CHECK IF TODAY OR FUTURE DAY?
//   ↓
// IF TODAY: 
//    → START FROM CURRENT TIME + 30 mins
// IF FUTURE DAY: 
//    → START FROM 10:00 AM
//   ↓
// GENERATE 30-MINUTE SLOTS UNTIL 9 PM
//   ↓
// STORE SLOTS FOR THIS DAY
//   ↓
// NEXT DAY? (Repeat 7 times)
//   ↓
// DISPLAY SLOTS TO USER
//   ↓
// USER SELECTS SLOT
//   ↓
// BOOK APPOINTMENT
//   ↓
// END
