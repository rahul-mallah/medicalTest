import React, { useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from '../util/Auth';
import {firestore } from '../firebase';
import moment from 'moment';
import {useRouteMatch, useLocation} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import IdleTimerContainer from '../util/IdleTimerContainer'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


function ViewIndividualAccountUI() {

   const [FirstName, setFirstName] = useState(""); 
   const [LastName, setLastName] = useState(""); 
   const [NRIC, setNRIC] = useState(""); 
   const [Address, setAddress] = useState(""); 
   const [DOB, setDOB] = useState(""); 
   const [Email, setEmail] = useState(""); 
   const [Telephone, setTelephone] = useState(""); 
   const [error, setError] = useState("");

   const [enableFields, setEnableFields] = useState(true);
   const [editEnabled, setEditEnabled] = useState(false);
   const[updateEnabled, setUpdateEnabled] = useState(true);
   const { currentUser } = useAuth();
   const { updateEmail } = useAuth();
   const [Users, setUsers] = useState([]);

   const {path} = useRouteMatch();

   const {state} = useLocation();
   const {user} = state;  
   let history = useHistory();

   function onEdit(){
      setEditEnabled(true);
      setUpdateEnabled(false);
      setEnableFields(false);
      setFirstName(user.FirstName);
      setLastName(user.LastName);
      setNRIC(user.NRIC);
      setDOB(user.DOB);
      setAddress(user.Address);
      setEmail(user.Email);
      setTelephone(user.Telephone);
   }

   const submitUpdateAlert = () => {
      confirmAlert({
        title: 'Congratulations!',
        message: user.Role + ' account has been updated successfully.',
        buttons: [
          {
            label: 'OK',
          },
        ]
      });
    };

   //handle submit
   const handleSubmit = async (e) => {
      e.preventDefault();
      
      try{
         setError("");
         setUpdateEnabled(true);
         //update data in firestore collection
         firestore.collection("Users").doc(user.id)
            .update({
               FirstName: FirstName,
               LastName: LastName,
               NRIC: NRIC,
               Address: Address,
               DOB: DOB,
               Telephone: Telephone
            })
            .then(() => {
               submitUpdateAlert()
            })
      }catch(error){
         setError(error.message);
      }
      setEnableFields(true);
      setUpdateEnabled(true);
      setEditEnabled(false);
   }
   

 

   return (
      <>
      
      <div>
      <IdleTimerContainer></IdleTimerContainer>
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{Width: "60%"}}>
            <Card>
             <Card.Body>
                 <h2 className= "text-center mb-4">{user.Role} Account</h2>
                 {error && <Alert variant="danger">{error}</Alert>}
                 <Form onSubmit={handleSubmit}>
                     <Form.Group id = "FirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                        defaultValue = {user.FirstName} 
                        disabled = {true} 
                        onChange={(e) => setFirstName(e.target.value)}
                        pattern = "^[a-z A-Z]+$"
                        title = "Please enter character in the range a-z OR A-Z"
                        type="text" required/>
                     </Form.Group>
                     <Form.Group id = "LastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                        defaultValue = {user.LastName} 
                        disabled = {true} 
                        onChange={(e) => setLastName(e.target.value)}
                        pattern = "^[a-z A-Z]+$"
                        title = "Please enter character in the range a-z OR A-Z"
                        type="text" required/>
                     </Form.Group>
                     <Form.Group id = "NRIC">
                        <Form.Label>NRIC</Form.Label>
                        <Form.Control 
                        defaultValue = {user.NRIC} 
                        disabled = {true} 
                        onChange={(e) => setNRIC(e.target.value)}
                        pattern = "[s S | t T | f F | g G][0-9]{7}[a-z A-Z]"
                        title = "Please enter according to NRIC format"
                        type="text" required/>
                     </Form.Group>
                     <Form.Group id = "Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        defaultValue = {user.Address} 
                        disabled = {enableFields} 
                        onChange={(e) => setAddress(e.target.value)}
                        type="text" required/>
                     </Form.Group>
                     <Form.Group id = "DOB">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control 
                        defaultValue = {user.DOB} 
                        disabled = {true}
                        max={moment().format("YYYY-MM-DD")}
                        onChange={(e) => setDOB(e.target.value)}
                        type="date" required/>
                     </Form.Group>
                     <Form.Group id = "Email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                        defaultValue = {user.Email} 
                        disabled = {true} 
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" required/>
                     </Form.Group>
                     <Form.Group id = "Telephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control 
                        defaultValue = {user.Telephone} 
                        disabled = {enableFields} 
                        onChange={(e) => setTelephone(e.target.value)}
                        pattern = "[0-9]{8}"
                        title = "Please enter 8 digits"
                        type="invalid" required/>
                     </Form.Group>
                     <Button onClick={onEdit} disabled = {editEnabled} className="w-100 my-2">Edit</Button>
            
                     <Button disabled = {updateEnabled} className="w-100 my-2" type="submit">Update</Button>
                  
                     <Button href = {`${path}`} disabled = {updateEnabled} className="w-100 my-2">Cancel</Button>   
                 </Form>
             </Card.Body>
            </Card>
            </div>
            </Container>
            
      </div>
      </>
   )
}

export default ViewIndividualAccountUI
