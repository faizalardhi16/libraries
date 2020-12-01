import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";

const NoRouter = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.loading ? <h2>Loading ...</h2> : state.isLogin ? <Redirect to="/member/books/all" /> : <Component {...props} />
      }
    />
    
  
  );
};

export default NoRouter;
