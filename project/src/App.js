import './App.css';
import LoginUI from './LoginUI';
import RegisterUI  from './RegisterUI';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ResetPasswordUI from './ResetPasswordUI';
import myProfile from "./myProfilePage";
import HomepageUI from './HomepageUI';
import { AuthContext, AuthProvider } from './util/Auth';
import AuthRoute from "./util/AuthRoute";
function App() {
  return (
      <div>
      <Router>
      <AuthProvider>
        <Switch>
          <AuthRoute exact path="/" component={HomepageUI}/>
          <AuthRoute path="/myProfile" component={myProfile}/>
          <Route path="/register" component={RegisterUI}/>
          <Route path="/resetPassword" component={ResetPasswordUI}/>
          <Route path="/login" component={LoginUI}/>
        </Switch>
        </AuthProvider>
      </Router>
      </div>
  );
}

export default App;
