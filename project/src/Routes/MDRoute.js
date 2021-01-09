import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

const MDRoute = () =>
{
    const {path} = useRouteMatch();

    return(
        <Switch>
            // Medical Admin Homepage

            // View My Profile

            // Change Password

            // View Patient Profile

            // Create Patient Medical Record

            // Update Patient Medical Record

            // Transfer Medical Record

            // View Own Schedule

            // Approve Appointment

            // View Doctor Schedule

            // Edit Doctor Schedule

            // Create New Schedule

            // View Health Article

            // Create New Health Post

        </Switch>
    )}

export default MDRoute;