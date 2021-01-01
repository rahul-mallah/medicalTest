import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

import PHomePageUI from "../Patient/PHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ChangePasswordUI from "../Patient/changePwUI";

const PRoute = () =>
{
    const {path} = useRouteMatch();

    return(
        <Switch>
            // Patient Homepage
            <PrivateRoute exact path= {`${path}`} component={PHomePageUI} />

            // My Profile
            <PrivateRoute exact path={`${path}/myProfile`} component={MyProfilePageUI}/>

            // Change Password
            <PrivateRoute exact path={`${path}/myProfile/changePW`} component={ChangePasswordUI}/>

            // Medical Profile

            // Appointment

            // Make New Appointment

            // Reschedule Appointment

            // Cancel Appointment

            // View Health Article

            // Doctor Profile

            // Individual Doctor Profile

        </Switch>
    )}

export default PRoute;