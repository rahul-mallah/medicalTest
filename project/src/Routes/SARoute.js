import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

import SAHomePageUI from "../SystemAdmin/SAHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ViewAllAccountUI from "../SystemAdmin/ViewAllAccountUI";
import ViewHealthArticleUI from '../User/ViewHealthArticleUI';
import ChangePasswordUI from "../SystemAdmin/changePwUI";
import CreateAccountUI from "../SystemAdmin/CreateAccountUI";
import ViewIndividualAccountUI from "../SystemAdmin/ViewIndividualAccountUI";

const SARoute = () =>
{
    const {path} = useRouteMatch();

    return(
        <Switch>
            // Sys Adm Homepage
            <PrivateRoute exact path= {`${path}`} component={SAHomePageUI} />

            // My Profile
            <PrivateRoute exact path={`${path}/myProfile`} component={MyProfilePageUI}/>

            // Change Password
            <PrivateRoute exact path={`${path}/myProfile/changePW`} component={ChangePasswordUI}/>

            // View All Account
            <PrivateRoute exact path= {`${path}/viewAllAccount`} component={ViewAllAccountUI} />

            // Create New Account
            <PrivateRoute exact path={`${path}/viewAllAccount/createAccount`} component={CreateAccountUI}/>

            // View Individual Account
            <PrivateRoute exact path={`${path}/viewIndvAcc`} component={ViewIndividualAccountUI}/>

            // View Health Article
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI}/>

        </Switch>
    )}

export default SARoute;