import { Container } from 'react-bootstrap';
import './App.css';
import LoginUI from './LoginUI';
import RegisterUI  from './RegisterUI';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ResetPasswordUI from './ResetPasswordUI';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginUI}/>
          <Route path="/register" component={RegisterUI}/>
          <Route path="/resetPassword" component={ResetPasswordUI}/>
        </Switch>
      </Router>
        
    </div>
  );
}

export default App;
