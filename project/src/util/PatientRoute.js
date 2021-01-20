import React,{useState} from 'react'
import { Route, Redirect } from "react-router-dom"

function PatientRoute({ component: Component, role, ...rest }) {
    return (
        <div>
        {role === "Patient" && (
        <Route
        {...rest}
        render={props => {
            return (<Component {...props} />)
        }}
        ></Route>
        )}

        {/* //route back to patient homepage */}
        {role === "Medical Doctor" && (
        <Route
        {...rest}
        render={props => {
            return (<Redirect to="/MedDoc" />)
        }}
        ></Route>
        )}
        </div>
    )
}

export default PatientRoute
