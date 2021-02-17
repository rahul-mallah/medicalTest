import React, {useState} from 'react'
import {firestore} from '../firebase';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import {Link, BrowserRouter} from 'react-router-dom';
import * as admin from "firebase-admin";

export const UserInput = (props) => {
    
    const [doctor, setDoctor] = useState([])
    const [user, setUser] = useState([])

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Medical Doctors").limit(1)
           .where("Email", "==", String(props.users.Email))
           .get()
           .then(function(data){
              console.log(data)
                 setDoctor(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
           }); 

           firestore.collection("Users").limit(1)
           .where("Email", "==", String(props.users.Email))
           .get()
           .then(function(data){
              console.log(data)
                 setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
           }); 
        };
        fetchData();
     }, [])

     const doc = {...doctor[0]}
     const u = {...user[0]}

     const onDelete = async (id1, id2) => {
        await firestore.collection("Medical Staff").doc(props.users.id).delete()
        await firestore.collection("Medical Doctors").doc(id1).delete()
        await firestore.collection("Users").doc(id2).delete()
         .then(() => {
            alert("User has been deleted Successfully!");
            window.location.reload();
         })
    }


    return (<>
        {/* {<button onClick={onUpdateFirstName}>Update</button>} */}
        <div>
        <Link to = {{
            pathname: '/SysAdm/viewIndvAcc',
            state: {user: props.users}
        }}>
        
        

        <Button className = "btn btn-success">Edit</Button></Link>
        <button onClick={(e) => onDelete(doc.id, u.id)} class = "btn btn-danger">Delete</button>
        </div>
    </>
    )
}