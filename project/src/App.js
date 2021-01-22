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

// Medical Doctor --------------------------------------------
import MedDoc from './MedicalDoctor/MedDoc'

// Medical Admin ---------------------------------------------
import MedAdm from './MedicalAdmin/MedAdm'

import NoMatch from './noMatch'

function App() {
  return (
      <div>
      <Router>
      <AuthProvider>
        <Switch>
          // User Login Page
          <Route exact path="/" component={LoginUI}/>

          // Patient Create New Account Page
          <Route path="/register" component={RegisterUI}/>

          // User Reset Password Page
          <Route path="/resetPassword" component={ResetPasswordUI}/>

          // System admin Main Page ----------------------------------------
          <PrivateRoute path="/SysAdm" component={SysAdm} />

          // Patient Main Page ---------------------------------------------
          <PrivateRoute path="/Patient" component={Patient}/>

          // Medical Doctor Main Page --------------------------------------
          <PrivateRoute path="/MedDoc" component={MedDoc}/>

          // Medical Admin Main Page ---------------------------------------
          <PrivateRoute path="/MedAdm" component={MedAdm}/>
          
          // Display error if path does not match
          <Route path="*">
            <NoMatch />
          </Route>
          
        </Switch>
        </AuthProvider>
      </Router>
      </div>
  );
}

export default App;
