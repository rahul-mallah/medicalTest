import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import NavBar from "../components/navbarUI"
import { useAuth } from '../util/Auth';

function MyProfilePageUI() {
   const [enableUpdate, setEnableUpdate] = useState(true); 
   const [enableEdit, setEnableEdit] = useState(false); 
   const [enableFields, setEnableFields] = useState(true);
   const { currentUser } = useAuth();

   function setEnabled(){
      setEnableUpdate(false);
      setEnableEdit(true);
      setEnableFields(false);
   }

   return (
      <div>
         <NavBar/>
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "500px"}}>
            <Card>
             <Card.Body>
                 <h2 className= "text-center mb-4">My Profile</h2>
                 <Form>
                     <Form.Group id = "FirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control disabled = {enableFields} type="text" required/>
                     </Form.Group>
                     <Form.Group id = "LastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control disabled = {enableFields} type="text" required/>
                     </Form.Group>
                     <Form.Group id = "NRIC">
                        <Form.Label>NRIC</Form.Label>
                        <Form.Control disabled = {enableFields} type="text" required/>
                     </Form.Group>
                     <Form.Group id = "address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control disabled = {enableFields} type="text" required/>
                     </Form.Group>
                     <Form.Group id = "DOB">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" required/>
                     </Form.Group>
                     <Form.Group id = "email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control value = {currentUser.email} disabled = {enableFields} type="email" required/>
                     </Form.Group>
                     <Form.Group id = "telephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control disabled = {enableFields} type="invalid" required/>
                     </Form.Group>
                     <Button onClick={setEnabled} disabled = {enableUpdate} className="w-100" type="submit">Update</Button>
                     <Button onClick={setEnabled} disabled = {enableEdit}className="w-100 my-2" type="submit">Edit</Button>
                 </Form>
             </Card.Body>
            </Card>
            </div>
            </Container>
      </div>
   )
}

export default MyProfilePageUI
