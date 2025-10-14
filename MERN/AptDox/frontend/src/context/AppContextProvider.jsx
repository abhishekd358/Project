import { assets, doctors, specialityData } from "../assets/assets_frontend/assets";
import { AppContext } from "./AppContext";

const AppContextProvider = (props) => {

  // currency value
  const currencySymbol = "₹"

  const value = {
    doctors,
    specialityData,
    assets,
    currencySymbol
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
