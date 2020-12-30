import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { AuthProvider } from './util/Auth';
import PrivateRoute from "./util/AuthRoute";

// User ------------------------------------------------------
import LoginUI from './User/LoginUI';
import ResetPasswordUI from './User/ResetPasswordUI';
import MyProfilePageUI from "./User/myProfilePageUI";

// System Admin ----------------------------------------------
import SAMainView from "./SystemAdmin/SAMainView";

// Patient ---------------------------------------------------
import PMainView from './Patient/PMainView';
import RegisterUI  from './Patient/RegisterUI';
import HomepageUI from './Patient/HomepageUI';
import userAppointmentUI from './Patient/userAppointmentUI';
import ViewMedicalProfilePatientUI from './Patient/ViewMedicalProfilePatientUI';
import ViewHealthArticleUI from './Patient/ViewHealthArticleUI';
import searchDoctorUI from './Patient/searchDoctorUI';

// Medical Staff ---------------------------------------------

// Medical Doctor --------------------------------------------
import MDMainView from './MedicalDoctor/MDMainView';

// Medical Admin ---------------------------------------------
import MAMainView from './MedicalAdmin/MAMainView';
import MALoginUI from './MedicalAdmin/MALoginUI';

function App() {
  return (
      <div>
      <Router>
      <AuthProvider>
        <Switch>
          // Patient Login Page
          <Route path="/login" component={LoginUI}/>
          // MA Login Page
          <Route path="/MAlogin" component={MALoginUI}/>

          // Patient Create New Account Page
          <Route path="/register" component={RegisterUI}/>

          // User Reset Password Page
          <Route path="/resetPassword" component={ResetPasswordUI}/>

          // System admin Main Page ----------------------------------------
          <Route path="/SysAdminMainPage" component={SAMainView}/>

          // Patient Main Page ---------------------------------------------
          <Route path="/PatientMainPage" component={PMainView}/>

          // Medical Doctor Main Page --------------------------------------
          <Route path="/MedicalDoctorMainPage" component={MDMainView}/>

          // Medical Admin Main Page ---------------------------------------
          <Route path="/MedicalAdminMainPage" component={MAMainView}/>

          // Patient Homepage
          <PrivateRoute exact path="/" component={HomepageUI}/>

          // User view / edit profile page
          <PrivateRoute path="/myProfile" component={MyProfilePageUI}/>

          // Patient's appointment
          <PrivateRoute path="/userAppointment" component={userAppointmentUI}/>

          // Patient's medical profile not editable
          <PrivateRoute path="/medicalProfilePatientView" component={ViewMedicalProfilePatientUI}/>

          // Patient's health material not editable
          <Route path="/ViewHealthArticle" component={ViewHealthArticleUI}/>

          // Patient search doctor
          <Route path="/searchDoctor" component={searchDoctorUI}/>
          
        </Switch>
      </AuthProvider>
      </Router>
      </div>
  );
}

export default App;
