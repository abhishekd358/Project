import AppContext from "./AppContext";


const AppContextProvider = (props) => {
    let value = {
        name: "AptDox" //just for testing
    }
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}

export default AppContextProvider;