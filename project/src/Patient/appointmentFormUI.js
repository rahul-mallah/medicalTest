import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from '../util/Auth';
import { auth, firestore } from '../firebase';
import moment from 'moment';
import {useRouteMatch} from 'react-router-dom';

function AppointmentFormUI() {

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

   React.useEffect(()=>{
      const fetchData = async () =>{
         firestore.collection("Users")
         .where("Email", "==", String(currentUser.email))
         .get()
         .then(function(data){
            console.log(data)
               setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
         }); 
      };
      fetchData();
   }, [])

   function onEdit(){
      setEditEnabled(true);
      setUpdateEnabled(false);
      setEnableFields(false);
      setFirstName(Users[0].FirstName);
      setLastName(Users[0].LastName);
      setNRIC(Users[0].NRIC);
      setDOB(Users[0].DOB);
      setAddress(Users[0].Address);
      setEmail(Users[0].Email);
      setTelephone(Users[0].Telephone);
   }

   //handle submit
   const handleSubmit = async (e) => {
      e.preventDefault();
      
      try{
         setError("");
         setUpdateEnabled(true);
         if(currentUser.email !== Email)
         {
            await updateEmail(Email);
         }
         //update data in firestore collection
         firestore.collection("Users").doc(Users[0].id)
            .update({
               FirstName: FirstName,
               LastName: LastName,
               NRIC: NRIC,
               Address: Address,
               DOB: DOB,
               Email: Email.toLowerCase(),
               Telephone: Telephone
            })
            .then(() => {
               alert("Updated Successfully!");
            })
      }catch(error){
         setError(error.message);
      }
      setEnableFields(true);
      setUpdateEnabled(true);
      setEditEnabled(false);
   }

   return (
      <div>
            {Users.map(user => 
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{Width: "60%"}}>
            <Card>
             <Card.Body>
                 <h2 className= "text-center mb-4">My Profile</h2>
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
                        disabled = {enableFields} 
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
            )}
      </div>
   )
}

export default AppointmentFormUI
