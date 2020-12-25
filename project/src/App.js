import './App.css';
import LoginUI from './User/LoginUI';
import RegisterUI  from './Patient/RegisterUI';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ResetPasswordUI from './User/ResetPasswordUI';
import myProfileUI from "./User/myProfilePageUI";
import HomepageUI from './Patient/HomepageUI';
import { AuthProvider } from './util/Auth';
import PrivateRoute from "./util/AuthRoute";
import ViewAllAccountUI from "./SystemAdmin/ViewAllAccountUI";
import CreateAccountUI from "./SystemAdmin/CreateAccountUI";

function App() {
  return (
      <div>
      <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={HomepageUI}/>
          // User view / edit profile page
          <PrivateRoute path="/myProfile" component={myProfileUI}/>
          // Patient Create New Account Page
          <Route path="/register" component={RegisterUI}/>
          // User Reset Password PAge
          <Route path="/resetPassword" component={ResetPasswordUI}/>
          // User Login Page
          <Route path="/login" component={LoginUI}/>
          // Sys admin view all account page
          <PrivateRoute path="/viewAllAccount" component={ViewAllAccountUI}/>
          // Sys admin create account page
          <PrivateRoute path="/createAccount" component={CreateAccountUI}/>
        </Switch>
        </AuthProvider>
      </Router>
      </div>
  );
}

export default App;
