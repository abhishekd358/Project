import { createContext } from "react";
import { assets, doctors, specialityData } from "../assets/assets_frontend/assets";

export const AppContext = createContext();

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
