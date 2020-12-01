import React, {useEffect, useContext} from "react";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import Home from "./components/Navbar";
import Read from "./pages/Reader/Reader";
import PrivateRoute from "./context/PrivateRoute";
import NoRouter from "./context/NoRouter";
import { API, setAuthToken } from './config/api';

import {UserContext} from './context/UserContext'
import Admin from "./pages/Admin/Admin";

//if token available
if(localStorage.token) setAuthToken(localStorage.token);

const App = () => {

  const [ state, dispatch ] = useContext(UserContext);

  useEffect(()=>{

    const loadUser = async () =>{
      try {
        const res = await API.get("/auth")

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.users,
        })
      } catch (error) {
        dispatch({
          type:"AUTH_ERROR",
        })
      }
    }

    loadUser();
  }, []);


  return (
      <BrowserRouter>
        <Switch>
          <NoRouter exact path="/" component={Landing} />
          <PrivateRoute exact path="/member/books/:category" component={Home} />
          <PrivateRoute exact path="/member/profile" component={Home} />
          <PrivateRoute exact path="/member/mylibrary" component={Home} />
          <PrivateRoute exact path="/member/post" component={Home} />
          <PrivateRoute exact path="/member/detail/:id" component={Home} />
          <PrivateRoute exact path="/member/read" component={Read} />
          <PrivateRoute exact path="/admin/table" component={Admin} />
        </Switch>
      </BrowserRouter>
  );
};


export default App;
