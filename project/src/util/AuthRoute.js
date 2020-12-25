import React, { useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from "./Auth";

const AuthRoute = ({component : Component, ...rest})=>{
    const {currentUser} = useContext(AuthContext);
    return (
        <Route
        {...rest}
        render={Props =>
            !!currentUser ? <Component {...Props}/> : <Redirect to={"/login"}/>
            }
        ></Route>
    );
};

export default AuthRoute