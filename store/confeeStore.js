import { createContext, useReducer } from "react";

export const ACTION_TYPE = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORE: "SET_COFFEE_STORE",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_LAT_LONG: {
      return { ...state, latLog: action.payload.latLog };
    }
    case ACTION_TYPE.SET_COFFEE_STORE: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      throw new Error("unhanled action Type");
  }
};

export const Storecontext = createContext();

const Storeprovider = ({ children }) => {
  const initailStat = {
    latLog: "",
    coffeeStores: [],
  };
  const [state, dispatch] = useReducer(storeReducer, initailStat);
  return (
    <Storecontext.Provider value={{ state, dispatch }}>
      {children}
    </Storecontext.Provider>
  );
};

export default Storeprovider;
