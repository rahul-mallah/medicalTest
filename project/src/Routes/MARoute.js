import React, {useState} from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import MedAdmRoute from "../util/MedAdmRoute"
import {firestore} from "../firebase";
import { useAuth } from "../util/Auth"

import NoMatch from '../noMatch'

import MAHomepageUI from "../MedicalAdmin/MAHomepageUI";
import ResAppointmentUI from "../MedicalAdmin/ResAppointmentUI";
import CancelAppointmentUI from "../MedicalAdmin/CancelAppointmentUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ChangePasswordUI from "../MedicalAdmin/changePwUI";
import ViewHealthArticleUI from '../User/ViewHealthArticleUI';
import ViewArticle from "../components/ViewArticle/ViewArticleMedAdm";
import EditArticle from "../components/EditArticle/EditArticle";
import NewArticle from "../components/NewArticle/NewArticleMedAdm";
import ViewDoctorScheduleUI from "../MedicalAdmin/ViewDoctorScheduleUI";
import CreateFollowUpUI from "../MedicalAdmin/CreateFollowUpUI"

const MARoute = () =>
{
    const {path} = useRouteMatch();

    const { currentUser } = useAuth();
    const [Users, setUsers] = useState([]); 

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Users")
           .where("Email", "==", currentUser.email)
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
            // Medical Admin Homepage
            <MedAdmRoute exact path= {`${path}`} component={MAHomepageUI} role={user.Role}/>

            // View My Profile
            <MedAdmRoute exact path={`${path}/myProfile`} component={MyProfilePageUI} role={user.Role}/>

            // Change Password
            <MedAdmRoute exact path={`${path}/myProfile/changePW`} component={ChangePasswordUI} role={user.Role}/>

            {/* // Reschedule Appointment */}
            <MedAdmRoute exact path={`${path}/Reschedule`} component={ResAppointmentUI} role={user.Role}/>

            {/* // Cancel Appointment */}
            <MedAdmRoute exact path={`${path}/Cancel`} component={CancelAppointmentUI} role={user.Role}/>

            // View Doctor schedule
            <MedAdmRoute exact path={`${path}/Schedule`} component={ViewDoctorScheduleUI} role={user.Role}/>

            // Create Follow Up Appointment
            <MedAdmRoute exact path={`${path}/Create`} component={CreateFollowUpUI} role={user.Role}/>

            // View Health Article
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI}/>

            // View Individual Article
            <Route  path={`${path}/article/:id`} component={ViewArticle}/>

            // Create New Health Post
            <MedAdmRoute path={`${path}/ViewHealthArticle/new-article`} component={NewArticle} role={user.Role}/>

            // Edit Article
            <MedAdmRoute path={`${path}/edit-article`} component={EditArticle} role={user.Role}/>

            // Display error if path does not match
            <Route path="*">
                <NoMatch />
            </Route>

        </Switch>
    )}

export default MARoute;