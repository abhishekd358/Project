import AppContext from "./AppContext";


const AppContextProvider = (props) => {

  const calculateAge = (dob)=>{

    const todayDate = new Date()
    const birthDate = new Date(dob)
  
    let age = todayDate.getFullYear() - birthDate.getFullYear()
    return age
  }

//-------------------------- appointment date formating in admin panel to show 

const dateFormating = (slotDate)=>{
    const dateArray = slotDate.split('_')
    const month = ["",'jan', 'feb', 'march', 'april', 'may', 'june', 'july','aug', 'sep', 'oct', 'nov', 'dec']
    
    return dateArray[0]+' '+ month[dateArray[1]] + ' '+ dateArray[2]
}


// currency

const currency = '₹'


  const value = {
    name: "AptDox", //just for testing
        
    calculateAge,
    dateFormating,
    currency
        
    }
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}



export default AppContextProvider;