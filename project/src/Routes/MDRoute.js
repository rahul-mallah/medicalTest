import React,{useState} from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import DoctorRoute from "../util/DoctorRoute";
import {firestore } from '../firebase';
import { useAuth } from "../util/Auth"

import NoMatch from '../noMatch'

import MDHomepageUI from "../MedicalDoctor/MDHomepageUI";
import MyProfilePageUI from "../User/myProfilePageUI";
import ChangePasswordUI from "../MedicalDoctor/changePwUI";
import ViewArticle from "../components/ViewArticle/ViewArticle";
import ViewHealthArticleUI from '../User/ViewHealthArticleUI';
import EditArticle from "../components/EditArticle/EditArticle";
import NewArticle from "../components/NewArticle/NewArticle";
import CreateMPUI from "../MedicalDoctor/CreateMPUI";
import ViewPatientProfileUI from "../MedicalDoctor/ViewPatientProfileUI";
import CreateMedicalRecord from "../MedicalDoctor/CreateMedicalRecord";
import EditMedicalRecord from "../MedicalDoctor/EditMedicalRecord";
import TransferMedicalRecord from "../MedicalDoctor/TransferMedicalRecord";
import ViewMPUI from "../MedicalDoctor/ViewMPUI";
import ViewAllocatedPatientUI from "../MedicalDoctor/ViewAllocatedPatientUI"
import DocRescheduleUI from "../MedicalDoctor/DocRescheduleUI";
import CreateMC from "../MedicalDoctor/CreateMC"
import ViewMedicalCertificate from "../MedicalDoctor/ViewMedicalCertificate"

const MDRoute = () =>
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
            {/* // Medical Doctor Homepage */}
            <DoctorRoute exact path= {`${path}`} component={MDHomepageUI} role={user.Role}/>

            {/* // View My Profile */}
            <DoctorRoute exact path={`${path}/myProfile`} component={MyProfilePageUI} role={user.Role}/>

            {/* // Change Password */}
            <DoctorRoute exact path={`${path}/myProfile/changePW`} component={ChangePasswordUI} role={user.Role}/>

            {/* // View Patient Profile */}
            <DoctorRoute exact path={`${path}/PatientProfile`} component={ViewPatientProfileUI} role={user.Role}/>

            {/* // craete medical record */}
            <DoctorRoute exact path={`${path}/CreateMedicalRecord`} component={CreateMedicalRecord} role={user.Role}/>

            {/* // edit medical record */}
            <DoctorRoute exact path={`${path}/EditMedicalRecord`} component={EditMedicalRecord} role={user.Role}/>

            {/* // transfer medical record */}
            <DoctorRoute exact path={`${path}/TransferMedicalRecord`} component={TransferMedicalRecord} role={user.Role}/>

            {/* // Create Patient Medical Document */}
            <DoctorRoute exact path={`${path}/CreateMP`} component={CreateMPUI} role={user.Role}/>

            {/* // Create Patient Medical Certificate */}
            <DoctorRoute exact path={`${path}/CreateMC`} component={CreateMC} role={user.Role}/>

            {/* // View Patient Medical Record */}
            <DoctorRoute exact path={`${path}/ViewMP`} component={ViewMPUI} role={user.Role}/>

            {/* // View Patient Medical Certicficate */}
            <DoctorRoute exact path={`${path}/ViewMC`} component={ViewMedicalCertificate} role={user.Role}/>

            {/* // View Own Schedule */}
            <DoctorRoute exact path={`${path}/Schedule`} component={ViewAllocatedPatientUI} role={user.Role}/>

            {/* // View Own Schedule */}
            <DoctorRoute exact path={`${path}/Reschedule`} component={DocRescheduleUI} role={user.Role}/>

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