import React,{useState} from 'react'
import { Route, Redirect } from "react-router-dom"

// this route is for medical admin that has already been authenticated
function MedAdmRoute({ component: Component, role, ...rest }) {
    return (
        <div>
        {role === "Medical Admin" && (
        <Route
        {...rest}
        render={props => {
            return (<Component {...props} />)
        }}
        ></Route>
        )}

        {/* //route back to respctive homepage */}
        {role === "Medical Doctor" && (
        <Route
        {...rest}
        render={props => {
            return (<Redirect to="/MedDoc" />)
        }}
        ></Route>
        )}

       {role === "Patient" && (
       <Route
       {...rest}
       render={props => {
           return (<Redirect to="/Patient" />)
       }}
       ></Route>
       )}

        {role === "System Admin" && (
        <Route
        {...rest}
        render={props => {
            return (<Redirect to="/sysadm" />)
        }}
        ></Route>
        )}

        </div>
    )
}

export default MedAdmRoute
