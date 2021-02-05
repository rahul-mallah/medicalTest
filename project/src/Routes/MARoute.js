import React, {useState} from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";
import MedAdmRoute from "../util/MedAdmRoute"
import {firestore} from "../firebase";
import { useAuth } from "../util/Auth"

import NoMatch from '../noMatch'

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

            // View Patient Profile
            <MedAdmRoute exact path={`${path}/PatientProfile`} component={PatientProfileUI} role={user.Role}/>

            // Create Patient Medical Record
            <MedAdmRoute exact path={`${path}/CreateMP`} component={CreateMPUI} role={user.Role}/>

            // View Patient Medical Record
            <MedAdmRoute exact path={`${path}/ViewMP`} component={ViewMPUI} role={user.Role}/>

            // Transfer Medical Record
            <MedAdmRoute exact path={`${path}/TransferMP`} component={TransferMPUI} role={user.Role}/>

            // Generate Relevent Document for Patients
            <MedAdmRoute exact path={`${path}/GenerateDocument`} component={GenerateVisitDocumentUI} role={user.Role}/>

            // Assign Doctor to Patient
            <MedAdmRoute exact path={`${path}/Schedule`} component={AssignDoctorUI} role={user.Role}/>

            // View Doctor Schedule
            <MedAdmRoute exact path={`${path}/Schedule/DocSchedule`} component={ViewDoctorScheduleUI} role={user.Role}/>

            // Edit Doctor Schedule
            <MedAdmRoute exact path={`${path}/Schedule/Edit`} component={RequestEditApptUI} role={user.Role}/>

            // Create New Schedule
            <MedAdmRoute exact path={`${path}/Schedule/Create`} component={CreateNewApptUI} role={user.Role}/>

            // Send Reminder to Patient
            <MedAdmRoute exact path={`${path}/Schedule/SendReminder`} component={SendReminderUI} role={user.Role}/>

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