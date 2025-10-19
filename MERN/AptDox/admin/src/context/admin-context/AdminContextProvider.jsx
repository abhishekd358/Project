import AdminContext from "./AdminContext";

const AdminContextProvider = (props) => {
    let value = {
        name: "AptDox" //just for testing
    }
  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  )
}

export default AdminContextProvider;
