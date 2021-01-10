import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

import MDHomepageUI from "../MedicalDoctor/MDHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ChangePasswordUI from "../MedicalDoctor/changePwUI";
import ViewArticle from "../components/ViewArticle/ViewArticle";
import ViewHealthArticleUI from '../User/ViewHealthArticleUI';
import EditArticle from "../components/EditArticle/EditArticle";
import NewArticle from "../components/NewArticle/NewArticle";
import CreateMPUI from "../MedicalStaff/CreateMPUI";
import PatientProfileUI from  "../MedicalStaff/PatientProfileUI";
import ViewMPUI from "../MedicalStaff/ViewMPUI";
import TransferMPUI from "../MedicalStaff/TransferMPUI";
import ViewDoctorScheduleUI from "../MedicalStaff/ViewDoctorScheduleUI";
import RequestEditApptUI from "../MedicalStaff/RequestEditApptUI";
import CreateNewApptUI from "../MedicalStaff/CreateNewAppt";
import ViewAllocatedPatientUI from "../MedicalDoctor/ViewAllocatedPatientUI"
import UpdateMPUI from "../MedicalDoctor/UpdateMPUI"
import RequestApprovalUI from "../MedicalDoctor/RequestApprovalUI"

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
            <PrivateRoute exact path={`${path}/PatientProfile`} component={PatientProfileUI}/>

            // Create Patient Medical Record
            <PrivateRoute exact path={`${path}/CreateMP`} component={CreateMPUI}/>

            // View Patient Medical Record
            <PrivateRoute exact path={`${path}/ViewMP`} component={ViewMPUI}/>

            // Update Patient Medical Record
            <PrivateRoute exact path={`${path}/UpdateMP`} component={UpdateMPUI}/>

            // Transfer Medical Record
            <PrivateRoute exact path={`${path}/TransferMP`} component={TransferMPUI}/>

            // View Own Schedule
            <PrivateRoute exact path={`${path}/Schedule`} component={ViewAllocatedPatientUI}/>

            // Approve Appointment
            <PrivateRoute exact path={`${path}/Schedule/Approve`} component={RequestApprovalUI}/>

            // View Doctor Schedule
            <PrivateRoute exact path={`${path}/Schedule/DocSchedule`} component={ViewDoctorScheduleUI}/>

            // Edit Doctor Schedule
            <PrivateRoute exact path={`${path}/Schedule/Edit`} component={RequestEditApptUI}/>

            // Create New Schedule
            <PrivateRoute exact path={`${path}/Schedule/Create`} component={CreateNewApptUI}/>

            // View Health Article
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI}/>

            // View Individual Article
            <Route path={`${path}/article/:id`} component={ViewArticle}/>

            // Create New Health Post
            <Route path={`${path}/ViewHealthArticle/new-article`} component={NewArticle}/>

            // Edit Article
            <Route path={`${path}/edit-article`} component={EditArticle}/>

        </Switch>
    )}

export default MDRoute;