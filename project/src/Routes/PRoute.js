import React,{useState} from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";
import PatientRoute from "../util/PatientRoute";
import {firestore } from '../firebase';
import { useAuth } from "../util/Auth"
import { AuthProvider } from '../util/Auth';

import NoMatch from '../noMatch'

import PHomePageUI from "../Patient/PHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ChangePasswordUI from "../Patient/changePwUI";
import ViewMyMPUI from "../Patient/ViewMyMPUI"
import UserAppointmentUI from '../Patient/userAppointmentUI';
import BookAppointmentUI from '../Patient/BookAppointmentUI';
import ResAppointmentUI from '../Patient/ResAppointmentUI';
import CancelAppointmentUI from '../Patient/CancelAppointmentUI';
import ViewHealthArticleUI from '../User/ViewHealthArticleUI';
import PatientViewArticle from "../components/ViewArticle/PatientViewArticle";
import DoctorProfile from "../Patient/doctorProfile";
import SearchDoctor from "../Patient/searchDoctor";
import ScheduleAppointmentUI from "../Patient/ScheduleAppointmentUI"
import ViewIndividualMPUI from "../Patient/ViewIndividualMPUI";
import ViewMC from "../Patient/ViewMC";
import ViewReceipt from "../Patient/ViewReceipt";

const PRoute = () =>
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
            <PatientRoute exact path= {`${path}`} component={PHomePageUI} role={user.Role}/>

            {/* // My Profile */}
            <PatientRoute exact path={`${path}/myProfile`} component={MyProfilePageUI} role={user.Role}/>

            {/* // Change Password */}
            <PatientRoute exact path={`${path}/myProfile/changePW`} component={ChangePasswordUI} role={user.Role}/>

            {/* // Medical Profile */}
            <PatientRoute exact path={`${path}/MedicalProfile`} component={ViewMyMPUI} role={user.Role}/>

            {/* // Individual Medical Profile */}
            <PatientRoute exact path={`${path}/ViewMedicalProfile`} component={ViewIndividualMPUI} role={user.Role}/>

            {/* // View MC */}
            <PatientRoute exact path={`${path}/ViewMC`} component={ViewMC} role={user.Role}/>

            {/* // View Receipt */}
            <PatientRoute exact path={`${path}/ViewReceipt`} component={ViewReceipt} role={user.Role}/>

            {/* // Appointment */}
            <PatientRoute exact path={`${path}/Appointment`} component={UserAppointmentUI} role={user.Role}/>

            {/* // Book Apointment */}
            <PatientRoute exact path={`${path}/bookAppointment/`} component={BookAppointmentUI} role={user.Role}/>
            <PatientRoute exact path={`${path}/scheduleAppointment/`} component={ScheduleAppointmentUI} role={user.Role}/>

            {/* // Reschedule Appointment */}
            <PatientRoute exact path={`${path}/Appointment/Reschedule`} component={ResAppointmentUI} role={user.Role}/>

            {/* // Cancel Appointment */}
            <PatientRoute exact path={`${path}/Appointment/Cancel`} component={CancelAppointmentUI} role={user.Role}/>

            {/* // View Health Article */}
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI}/>

            {/* // View Individual Article */}
            <Route path={`${path}/article/:id`} component={PatientViewArticle}/>

            {/* // Doctor Profile */}
            <PatientRoute exact path={`${path}/searchDoctor`} component={SearchDoctor} role={user.Role}/>

            {/* // Individual Doctor Profile */}
            <PatientRoute exact path={`${path}/doctorProfile/:id`} component={DoctorProfile} role={user.Role}/>
            
            {/* // Display error if path does not match */}
            <Route path="*">
                <NoMatch />
            </Route>
        </Switch>
    )}

export default PRoute;