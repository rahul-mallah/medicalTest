import React from 'react'
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

import ViewAllAccountUI from "../SystemAdmin/ViewAllAccountUI";
import CreateAccountUI from "../SystemAdmin/CreateAccountUI";

const SARoute = () =>
{
    <Switch>
        // Sys admin view all account page
        <Route path="/viewAllAccount" component={ViewAllAccountUI}/>

        // Sys admin create account page
        <PrivateRoute path="/createAccount" component={CreateAccountUI}/>

    </Switch>
}

export default SARoute;