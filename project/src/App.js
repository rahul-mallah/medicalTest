import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { AuthProvider } from './util/Auth';
import PrivateRoute from "./util/AuthRoute";

// User ------------------------------------------------------
import LoginUI from './User/LoginUI';
import ResetPasswordUI from './User/ResetPasswordUI';

// System Admin ----------------------------------------------
import SysAdm from "./SystemAdmin/SysAdm";

// Patient ---------------------------------------------------
import Patient from './Patient/Patient';
import RegisterUI  from './Patient/RegisterUI';

// Medical Staff ---------------------------------------------

// Medical Doctor --------------------------------------------
import MDMainView from './MedicalDoctor/MDMainView'

// Medical Admin ---------------------------------------------
import MAMainView from './MedicalAdmin/MAMainView'


import userAppointmentUI from './Patient/userAppointmentUI';
import ViewHealthArticleUI from './User/ViewHealthArticleUI';
import ViewArticle from "./components/ViewArticle/ViewArticle";
import NewArticle from "./components/NewArticle/NewArticle";
import searchDoctorUI from './Patient/searchDoctorUI';


function App() {
  return (
      <div>
      <Router>
      <AuthProvider>
        <Switch>
          // User Login Page
          <Route exact path="/" component={LoginUI}/>
          <Route path="/login" component={LoginUI}/>

          // Patient Create New Account Page
          <Route path="/register" component={RegisterUI}/>

          // User Reset Password Page
          <Route path="/resetPassword" component={ResetPasswordUI}/>

          // System admin Main Page ----------------------------------------
          <PrivateRoute path="/SysAdm" component={SysAdm} />

          // Patient Main Page ---------------------------------------------
          <PrivateRoute path="/Patient" component={Patient}/>

          // Medical Doctor Main Page --------------------------------------
          <Route path="/MedicalDoctorMainPage" component={MDMainView}/>

          // Medical Admin Main Page ---------------------------------------
          <Route path="/MedicalAdminMainPage" component={MAMainView}/>







          // Patient's appointment
          <PrivateRoute path="/userAppointment" component={userAppointmentUI}/>


          // Patient's health material not editable
          <Route path="/ViewHealthArticle" component={ViewHealthArticleUI}/>
          <Route path="/article/:id" component={ViewArticle}/>
          <Route path="/new-article" component={NewArticle}/>

          // Patient search doctor
          <Route path="/searchDoctor" component={searchDoctorUI}/>
          
        </Switch>
        </AuthProvider>
      </Router>
      </div>
  );
}

export default App;
