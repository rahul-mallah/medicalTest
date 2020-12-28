import './App.css';
import LoginUI from './User/LoginUI';
import RegisterUI  from './Patient/RegisterUI';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ResetPasswordUI from './User/ResetPasswordUI';
import MyProfile from "./User/MyProfilePageUI";
import HomepageUI from './Patient/HomepageUI';
import { AuthProvider } from './util/Auth';
import PrivateRoute from "./util/AuthRoute";
import ViewAllAccountUI from "./SystemAdmin/ViewAllAccountUI";
import CreateAccountUI from "./SystemAdmin/CreateAccountUI";
import userAppointmentUI from './Patient/userAppointmentUI';
import medicalProfilePatientViewUI from './Patient/medicalProfilePatientViewUI';
import healthMaterialViewOnlyUI from './Patient/healthMaterialViewOnlyUI';
import searchDoctorUI from './Patient/searchDoctorUI';

function App() {
  return (
      <div>
      <Router>
      <AuthProvider>
        <Switch>
          // Patient Create New Account Page
          <Route path="/register" component={RegisterUI}/>
          // User Reset Password Page
          <Route path="/resetPassword" component={ResetPasswordUI}/>
          // User Login Page
          <Route path="/login" component={LoginUI}/>
          // Sys admin view all account page
          <Route path="/viewAllAccount" component={ViewAllAccountUI}/>
          <PrivateRoute exact path="/" component={HomepageUI}/>
          // User view / edit profile page
          <PrivateRoute path="/myProfile" component={MyProfile}/>
          // Sys admin create account page
          <PrivateRoute path="/createAccount" component={CreateAccountUI}/>
          // Patient's appointment
          <PrivateRoute path="/userAppointment" component={userAppointmentUI}/>
          // Patient's medical profile not editable
          <PrivateRoute path="/medicalProfilePatientView" component={medicalProfilePatientViewUI}/>
          // Patient's health material not editable
          <Route path="/healthMaterialViewOnly" component={healthMaterialViewOnlyUI}/>
          // Patient search doctor
          <Route path="/searchDoctor" component={searchDoctorUI}/>
        </Switch>
        </AuthProvider>
      </Router>
      </div>
  );
}

export default App;
