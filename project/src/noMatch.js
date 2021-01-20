import {useLocation} from "react-router-dom";

function NoMatch() {
    let location = useLocation();
  
    return (
      <div>
        <h1> Not Found </h1>
        <br />
        <h3>
          The requested URL <code>{location.pathname}</code> was not found.
        </h3>
      </div>
    );
}

export default NoMatch;