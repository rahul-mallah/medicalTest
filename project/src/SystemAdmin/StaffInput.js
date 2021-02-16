import React from 'react'
import {firestore} from '../firebase';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import {Link, BrowserRouter} from 'react-router-dom';
import * as admin from "firebase-admin";

export const StaffInput = (props) => {

    const onDelete = async () => {
        await firestore.collection("Medical Staff").doc(props.medicalStaff.id).delete()
        await firestore.collection("Medical Doctors").doc(props.id).delete()
         .then(() => {
            alert("User has been deleted Successfully!");
            window.location.reload();
         })
    }


    return (<>
        <div>
        {/* <Link to = {{
            pathname: '/SysAdm/viewIndvAcc',
            state: {user: props.medicalStaff}
        }}>
        
        
        <Button className = "btn btn-success">Edit</Button></Link> */}
        <button onClick={(e) => onDelete()} class = "btn btn-danger">Delete</button>
        {/* <a onClick={() => {window.location.href="/SysAdm/viewIndvAcc"}} className="btn btn-success">Edit</a> */}
        </div>
    </>
    )
}