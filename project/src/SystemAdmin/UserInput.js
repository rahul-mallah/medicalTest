import React from 'react'
import {firestore} from '../firebase';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import {Link, BrowserRouter} from 'react-router-dom';

export const UserInput = ({users}) => {


    const onDelete = () => {
        const db = firestore
        db.collection('Users').doc(users.id).delete()
        //window.location.reload();
        alert("Account has been deleted successfully!")
    }

    return (<>
        {/* {<button onClick={onUpdateFirstName}>Update</button>} */}
        <div>
        <Link to = {{
            pathname: '/SysAdm/viewIndvAcc',
            state: {user: users.data}
        }}><Button type = "submit" className = "btn btn-success">Edit</Button></Link>
        <button onClick={onDelete} class = "btn btn-danger">Delete</button>
        {/* <a onClick={() => {window.location.href="/SysAdm/viewIndvAcc"}} className="btn btn-success">Edit</a> */}
        </div>
    </>
    )
}