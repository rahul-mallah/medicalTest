import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

import MAHomepageUI from "../MedicalAdmin/MAHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ChangePasswordUI from "../MedicalAdmin/changePwUI";

const MARoute = () =>
{
    const {path} = useRouteMatch();

    return(
        <Switch>
            // Medical Admin Homepage
            <PrivateRoute exact path= {`${path}`} component={MAHomepageUI} />

            // View My Profile
            <PrivateRoute exact path={`${path}/myProfile`} component={MyProfilePageUI}/>

            // Change Password
            <PrivateRoute exact path={`${path}/myProfile/changePW`} component={ChangePasswordUI}/>

            // View Patient Profile

            // Create Patient Medical Record

            // Transfer Medical Record

            // Generate Relevent Document for Patients

            // Assign Doctor to Patient

            // View Doctor Schedule

            // Edit Doctor Schedule

            // Create New Schedule

            // Send Reminder to Patient

            // View Health Article

            // Create New Health Post

        </Switch>
    )}

export default MARoute;