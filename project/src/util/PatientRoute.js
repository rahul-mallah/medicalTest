import React,{useState} from 'react'
import { Route, Redirect } from "react-router-dom"
import {useAuth} from "../util/Auth"

function PatientRoute({ component: Component, role, ...rest }) {

    const {currentUser} = useAuth()

    function deleteUser(){
        currentUser.delete().then(function() {
            alert("Exit successfully")
          }).catch(function(error) {
            alert(error)
          });  
    }

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

        {! role&& (
        <Route
        {...rest}
        render={props => {
            return (
            <div>
            <h1>Your account has been deleted / disabled</h1>
            <button onClick = {(e)=> deleteUser()}>Click here to exit</button>
            </div>
            
            )

        }}
        ></Route>
        )}

       
        </div>
    )
}

export default PatientRoute
