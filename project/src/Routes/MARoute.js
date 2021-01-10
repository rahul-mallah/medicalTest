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
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI}/>

            // View Individual Article
            <Route path={`${path}/article/:id`} component={ViewArticle}/>

            // Create New Health Post
            <Route path={`${path}/ViewHealthArticle/new-article`} component={NewArticle}/>

            // Edit Article
            <Route path={`${path}/edit-article`} component={EditArticle}/>

        </Switch>
    )}

export default MARoute;