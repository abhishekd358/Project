import DoctorContext from "./DoctorContext";


const DoctorContextProvider = (props) => {
    let value = {
        name: "AptDox" //just for testing
    }
  return (
    <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
  )
}

export default DoctorContextProvider;
