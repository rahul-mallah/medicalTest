import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

import PHomePageUI from "../Patient/PHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ChangePasswordUI from "../Patient/changePwUI";
import ViewMyMPUI from "../Patient/ViewMyMPUI"
import userAppointmentUI from '../Patient/userAppointmentUI';
import ViewHealthArticleUI from '../User/ViewHealthArticleUI';

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
            <PrivateRoute exact path={`${path}/MedicalProfile`} component={ViewMyMPUI}/>

            // Appointment
            <PrivateRoute exact path={`${path}/Appointment`} component={userAppointmentUI}/>

            // Make New Appointment

            // Reschedule Appointment

            // Cancel Appointment

            // View Health Article
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI}/>

            // Doctor Profile

            // Individual Doctor Profile

        </Switch>
    )}

export default PRoute;