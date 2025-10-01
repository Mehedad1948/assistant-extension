import { createContext, useReducer, useContext } from "react";

import { actions } from "./constants/actions";

const initialState = {
  user: {
    details: null,
    token: null,
  },
};

const AppContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

// App Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => useContext(AppContext);
