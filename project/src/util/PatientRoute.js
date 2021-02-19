import React,{useState} from 'react'
import { Route, Redirect } from "react-router-dom"
import {useAuth} from "../util/Auth"

// this route is for patient that has been already been authenticated
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

        {role === "System Admin" && (
       <Route
       {...rest}
       render={props => {
           return (<Redirect to="/sysadm"/>)
       }}
       ></Route>
       )}

        {role === "Medical Admin" && (
       <Route
       {...rest}
       render={props => {
           return (<Redirect to="/MedAdm" />)
       }}
       ></Route>
       )}

       
        </div>
    )
}

export default PatientRoute
