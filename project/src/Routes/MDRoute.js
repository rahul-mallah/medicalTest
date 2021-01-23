import React,{useState} from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";
import DoctorRoute from "../util/DoctorRoute";
import {firestore } from '../firebase';
import { useAuth } from "../util/Auth"
import { AuthProvider } from '../util/Auth';

import NoMatch from '../noMatch'

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
            
            {/* // Medical Doctor Homepage */}
            <DoctorRoute exact path= {`${path}`} component={MDHomepageUI} role={user.Role}/>

            {/* // View My Profile */}
            <DoctorRoute exact path={`${path}/myProfile`} component={MyProfilePageUI} role={user.Role}/>

            {/* // Change Password */}
            <DoctorRoute exact path={`${path}/myProfile/changePW`} component={ChangePasswordUI} role={user.Role}/>

            {/* // View Patient Profile */}
            <DoctorRoute exact path={`${path}/PatientProfile`} component={PatientProfileUI} role={user.Role}/>

            {/* // Create Patient Medical Record */}
            <DoctorRoute exact path={`${path}/CreateMP`} component={CreateMPUI} role={user.Role}/>

            {/* // View Patient Medical Record */}
            <DoctorRoute exact path={`${path}/ViewMP`} component={ViewMPUI} role={user.Role}/>

            {/* // Update Patient Medical Record */}
            <DoctorRoute exact path={`${path}/UpdateMP`} component={UpdateMPUI} role={user.Role}/>

            {/* // Transfer Medical Record */}
            <DoctorRoute exact path={`${path}/TransferMP`} component={TransferMPUI} role={user.Role}/>

            {/* // View Own Schedule */}
            <DoctorRoute exact path={`${path}/Schedule`} component={ViewAllocatedPatientUI} role={user.Role}/>

            {/* // Approve Appointment */}
            <DoctorRoute exact path={`${path}/Schedule/Approve`} component={RequestApprovalUI} role={user.Role}/>

            {/* // View Doctor Schedule */}
            <DoctorRoute exact path={`${path}/Schedule/DocSchedule`} component={ViewDoctorScheduleUI} role={user.Role}/>

            {/* // Edit Doctor Schedule */}
            <DoctorRoute exact path={`${path}/Schedule/Edit`} component={RequestEditApptUI} role={user.Role}/>

            {/* // Create New Schedule */}
            <DoctorRoute exact path={`${path}/Schedule/Create`} component={CreateNewApptUI} role={user.Role}/>

            {/* // View Health Article */}
            <Route exact path={`${path}/ViewHealthArticle`} component={ViewHealthArticleUI} />

            {/* // View Individual Article */}
            <Route path={`${path}/article/:id`} component={ViewArticle}/>

            {/* // Create New Health Post */}
            <Route path={`${path}/ViewHealthArticle/new-article`} component={NewArticle}/>

            {/* // Edit Article */}
            <Route path={`${path}/edit-article`} component={EditArticle}/>
            

            {/* // Display error if path does not match */}
            <Route path="*">
                <NoMatch />
            </Route>
            
        </Switch>
    )}

export default MDRoute;