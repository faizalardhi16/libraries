import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user:null,
  loading:true
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return{
        ...state,
        isLogin:true,
        user: action.payload,
        loading:false
      };
    case "AUTH_ERROR":
      case "LOGIN_FAILED":
      return{
        ...state,
        isLogin:false,
        user:null,
        loading:false
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        isLogin: true,
        loading:false
      };
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        loading:false
        };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        user:null,
        loading:false
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
