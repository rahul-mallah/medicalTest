import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

import MDHomepageUI from "../MedicalDoctor/MDHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ChangePasswordUI from "../MedicalDoctor/changePwUI";

const MDRoute = () =>
{
    const {path} = useRouteMatch();

    return(
        <Switch>
            // Medical Doctor Homepage
            <PrivateRoute exact path= {`${path}`} component={MDHomepageUI} />

            // View My Profile
            <PrivateRoute exact path={`${path}/myProfile`} component={MyProfilePageUI}/>

            // Change Password
            <PrivateRoute exact path={`${path}/myProfile/changePW`} component={ChangePasswordUI}/>

            // View Patient Profile

            // Create Patient Medical Record

            // Update Patient Medical Record

            // Transfer Medical Record

            // View Own Schedule

            // Approve Appointment

            // View Doctor Schedule

            // Edit Doctor Schedule

            // Create New Schedule

            // View Health Article

            // Create New Health Post

        </Switch>
    )}

export default MDRoute;