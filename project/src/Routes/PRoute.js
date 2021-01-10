import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

import PHomePageUI from "../Patient/PHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ChangePasswordUI from "../Patient/changePwUI";
import ViewMyMPUI from "../Patient/ViewMyMPUI"
import userAppointmentUI from '../Patient/userAppointmentUI';
import BookAppointmentUI from '../Patient/BookAppointmentUI';
import ResAppointmentUI from '../Patient/ResAppointmentUI';
import CancelAppointmentUI from '../Patient/CancelAppointmentUI';
import ViewHealthArticleUI from '../User/ViewHealthArticleUI';
import PatientViewArticle from "../components/ViewArticle/PatientViewArticle";
import DoctorProfile from "../Patient/doctorProfile";
import SearchDoctor from "../Patient/searchDoctor";

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
            <PrivateRoute exact path={`${path}/Appointment/Book`} component={BookAppointmentUI}/>

            // Reschedule Appointment
            <PrivateRoute exact path={`${path}/Appointment/Reschedule`} component={ResAppointmentUI}/>

            // Cancel Appointment
            <PrivateRoute exact path={`${path}/Appointment/Cancel`} component={CancelAppointmentUI}/>

            // View Health Article
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI}/>

            // View Individual Article
            <Route path={`${path}/article/:id`} component={PatientViewArticle}/>

            // Doctor Profile
            <Route exact path={`${path}/searchDoctor`} component={SearchDoctor}/>

            // Individual Doctor Profile
            <Route exact path={`${path}/doctorProfile/:id`} component={DoctorProfile}/>

        </Switch>
    )}

export default PRoute;