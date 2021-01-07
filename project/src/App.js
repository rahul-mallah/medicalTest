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
import MALoginUI from './MedicalAdmin/MALoginUI'

function App() {
  return (
      <div>
      <Router>
      <AuthProvider>
        <Switch>
          // User Login Page
          <Route exact path="/" component={Patient}/>
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
          <Route path="/MALogin" component={MALoginUI}/>
          
        </Switch>
        </AuthProvider>
      </Router>
      </div>
  );
}

export default App;
