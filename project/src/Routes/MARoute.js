import React from 'react'
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import PrivateRoute from "../util/AuthRoute";

const MARoute = () =>
{
    const {path} = useRouteMatch();

    return(
        <Switch>
            // Medical Admin Homepage

            // View My Profile

            // Change Password

            // View Patient Profile

            // Create Patient Medical Record

            // Transfer Medical Record

            // Generate Relevent Document for Patients

            // Assign Doctor to Patient

            // View Doctor Schedule

            // Edit Doctor Schedule

            // Create New Schedule

            // Send Reminder to Patient

            // View Health Article

            // Create New Health Post

        </Switch>
    )}

export default MARoute;