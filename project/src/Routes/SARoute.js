import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

import NoMatch from '../noMatch'

import SAHomePageUI from "../SystemAdmin/SAHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ViewAllAccountUI from "../SystemAdmin/ViewAllAccountUI";
import ViewHealthArticleUI from '../User/ViewHealthArticleUI';
import ChangePasswordUI from "../SystemAdmin/changePwUI";
import CreateAccountUI from "../SystemAdmin/CreateAccountUI";
import ViewIndividualAccountUI from "../SystemAdmin/ViewIndividualAccountUI";
import ViewArticle from "../components/ViewArticle/ViewArticle";
import EditArticle from "../components/EditArticle/EditArticle";


import NewArticle from "../components/NewArticle/NewArticle";

const SARoute = () =>
{
    const {path} = useRouteMatch();

    return(
        <Switch>
            // Sys Adm Homepage
            <PrivateRoute exact path= {`${path}`} component={SAHomePageUI} />

            // My Profils
            <PrivateRoute exact path={`${path}/myProfile`} component={MyProfilePageUI}/>

            // Change Password
            <PrivateRoute exact path={`${path}/myProfile/changePW`} component={ChangePasswordUI}/>

            // View All Account
            <PrivateRoute exact path= {`${path}/viewAllAccount`} component={ViewAllAccountUI} />

            // View Individual User Account
            <PrivateRoute path={`${path}/viewIndividualAccount`} component={EditArticle}/>

            // Create New Account
            <PrivateRoute exact path={`${path}/viewAllAccount/createAccount`} component={CreateAccountUI}/>

            // View Individual Account
            <PrivateRoute exact path={`${path}/viewIndvAcc`} component={ViewIndividualAccountUI}/>

            // View Health Article
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI}/>

            // View Individual Article
            <Route path={`${path}/article/:id`} component={ViewArticle}/>

            // Create New Article
            <Route path={`${path}/ViewHealthArticle/new-article`} component={NewArticle}/>

            // Edit Article
            <Route path={`${path}/edit-article`} component={EditArticle}/>

            // Display error if path does not match
            <Route path="*">
                <NoMatch />
            </Route>

        </Switch>
    )}

export default SARoute;