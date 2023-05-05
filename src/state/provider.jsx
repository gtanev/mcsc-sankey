import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./store";

const GlobalContext = createContext(null);

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (state) => state);
  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalContext);

export { StateProvider, useGlobalState };
