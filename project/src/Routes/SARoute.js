import React, {useState} from 'react';
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import {firestore} from "../firebase";
import { useAuth } from "../util/Auth"

import NoMatch from '../noMatch'

import SAHomePageUI from "../SystemAdmin/SAHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ViewAllAccountUI from "../SystemAdmin/ViewAllAccountUI";
import ViewHealthArticleUI from '../User/ViewHealthArticleUI';
import ChangePasswordUI from "../SystemAdmin/changePwUI";
import CreateAccountUI from "../SystemAdmin/CreateAccountUI";
import ViewIndividualAccountUI from "../SystemAdmin/ViewIndividualAccountUI";
import ViewAllStaffAccount from "../SystemAdmin/ViewAllStaffAccount";
import ViewArticle from "../components/ViewArticle/PatientViewArticle";

import SystemAdminRoute from "../util/SystemAdminRoute";


const SARoute = () =>
{
    const {path} = useRouteMatch();

    const { currentUser } = useAuth();
    const [Users, setUsers] = useState([]); 

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Users")
           .where("Email", "==", String(currentUser.email))
           .get()
           .then(function(data){
                console.log(data)
                setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            });
        };
        fetchData();
     }, [])

    const user = {...Users[0]};

    return(
        <Switch>
            // Sys Adm Homepage
            <SystemAdminRoute exact path= {`${path}`} component={SAHomePageUI} role={user.Role}/>

            // My Profils
            <SystemAdminRoute exact path={`${path}/myProfile`} component={MyProfilePageUI} role={user.Role}/>

            // Change Password
            <SystemAdminRoute exact path={`${path}/myProfile/changePW`} component={ChangePasswordUI} role={user.Role}/>

            // View All Account
            <SystemAdminRoute exact path= {`${path}/viewAllAccount`} component={ViewAllAccountUI} role={user.Role} />

            // Create New Account
            <SystemAdminRoute exact path={`${path}/viewAllAccount/createAccount`} component={CreateAccountUI} role={user.Role}/>

            // View Individual Account
            <SystemAdminRoute exact path={`${path}/viewIndvAcc`} component={ViewIndividualAccountUI} role={user.Role}/>

            // View Health Article
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI}/>

            // View Individual Article
            <Route path={`${path}/article/:id`} component={ViewArticle}/>

            //View All Staff
            <SystemAdminRoute path={`${path}/viewAllStaffAccount`} component={ViewAllStaffAccount} role={user.Role}/>


            // Display error if path does not match
            <Route path="*">
                <NoMatch />
            </Route>

        </Switch>
    )}

export default SARoute;

