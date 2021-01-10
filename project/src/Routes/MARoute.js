import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

import MAHomepageUI from "../MedicalAdmin/MAHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ChangePasswordUI from "../MedicalAdmin/changePwUI";
import ViewHealthArticleUI from '../User/ViewHealthArticleUI';
import ViewArticle from "../components/ViewArticle/ViewArticle";
import EditArticle from "../components/EditArticle/EditArticle";
import NewArticle from "../components/NewArticle/NewArticle";
import CreateMPUI from "../MedicalStaff/CreateMPUI";
import PatientProfileUI from  "../MedicalStaff/PatientProfileUI";
import ViewMPUI from "../MedicalStaff/ViewMPUI";
import TransferMPUI from "../MedicalStaff/TransferMPUI";
import ViewDoctorScheduleUI from "../MedicalStaff/ViewDoctorScheduleUI";
import RequestEditApptUI from "../MedicalStaff/RequestEditApptUI";
import CreateNewApptUI from "../MedicalStaff/CreateNewAppt";
import GenerateVisitDocumentUI from "../MedicalAdmin/GenerateVisitDocumentUI";
import AssignDoctorUI from "../MedicalAdmin/AssignDoctorUI";
import SendReminderUI from "../MedicalAdmin/SendReminderUI";


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
            <PrivateRoute exact path={`${path}/PatientProfile`} component={PatientProfileUI}/>

            // Create Patient Medical Record
            <PrivateRoute exact path={`${path}/CreateMP`} component={CreateMPUI}/>

            // View Patient Medical Record
            <PrivateRoute exact path={`${path}/ViewMP`} component={ViewMPUI}/>

            // Transfer Medical Record
            <PrivateRoute exact path={`${path}/TransferMP`} component={TransferMPUI}/>

            // Generate Relevent Document for Patients
            <PrivateRoute exact path={`${path}/GenerateDocument`} component={GenerateVisitDocumentUI}/>

            // Assign Doctor to Patient
            <PrivateRoute exact path={`${path}/Schedule`} component={AssignDoctorUI}/>

            // View Doctor Schedule
            <PrivateRoute exact path={`${path}/Schedule/DocSchedule`} component={ViewDoctorScheduleUI}/>

            // Edit Doctor Schedule
            <PrivateRoute exact path={`${path}/Schedule/Edit`} component={RequestEditApptUI}/>

            // Create New Schedule
            <PrivateRoute exact path={`${path}/Schedule/Create`} component={CreateNewApptUI}/>

            // Send Reminder to Patient
            <PrivateRoute exact path={`${path}/Schedule/SendReminder`} component={SendReminderUI}/>

            // View Health Article
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI}/>

            // View Individual Article
            <Route  path={`${path}/article/:id`} component={ViewArticle}/>

            // Create New Health Post
            <Route path={`${path}/ViewHealthArticle/new-article`} component={NewArticle}/>

            // Edit Article
            <Route path={`${path}/edit-article`} component={EditArticle}/>

        </Switch>
    )}

export default MARoute;