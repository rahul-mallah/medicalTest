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