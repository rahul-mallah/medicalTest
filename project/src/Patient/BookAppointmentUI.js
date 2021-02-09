import React,{useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from '../util/Auth';
import {firestore } from '../firebase';
import moment from 'moment';
import './UserAppointmentUI.css';
import IdleTimerContainer from '../util/IdleTimerContainer';

function BookAppointmentUI() {

    const {state} = useLocation();
    const {doctor} = state;
    const {currentUser} = useAuth();
    const [Users, setUsers] = useState([]);
    const [error, setError] = useState("");

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

    return (
        <div>
           <IdleTimerContainer></IdleTimerContainer>
              {Users.map(user => 
              <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh"}}>
            <div className="w-100" style={{Width: "60%"}}>
              <Card>
               <Card.Body>
                   <h2 className= "text-center mb-4">Book a new appointment</h2>
                   <label class="note">Note: You may choose a doctor of your choice or click next without selecting a doctor</label>
                   {error && <Alert variant="danger">{error}</Alert>}
                   <Form>
                       <Form.Group id = "FirstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control 
                          defaultValue = {user.FirstName} 
                          disabled = {true} 
                          pattern = "^[a-z A-Z]+$"
                          title = "Please enter character in the range a-z OR A-Z"
                          type="text" required/>
                       </Form.Group>
                       <Form.Group id = "LastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control 
                          defaultValue = {user.LastName} 
                          disabled = {true} 
                          pattern = "^[a-z A-Z]+$"
                          title = "Please enter character in the range a-z OR A-Z"
                          type="text" required/>
                       </Form.Group>
                       <Form.Group id = "NRIC">
                          <Form.Label>NRIC</Form.Label>
                          <Form.Control 
                          defaultValue = {user.NRIC} 
                          disabled = {true} 
                          pattern = "[s S | t T | f F | g G][0-9]{7}[a-z A-Z]"
                          title = "Please enter according to NRIC format"
                          type="text" required/>
                       </Form.Group>
                       <Form.Group id = "Address">
                          <Form.Label>Address</Form.Label>
                          <Form.Control 
                          defaultValue = {user.Address} 
                          disabled = {true} 
                          type="text" required/>
                       </Form.Group>
                       <Form.Group id = "DOB">
                          <Form.Label>Date Of Birth</Form.Label>
                          <Form.Control 
                          defaultValue = {user.DOB} 
                          disabled = {true}
                          max={moment().format("YYYY-MM-DD")}
                          type="date" required/>
                       </Form.Group>
                       <Form.Group id = "Email">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control 
                          defaultValue = {user.Email} 
                          disabled = {true} 
                          type="email" required/>
                       </Form.Group>
                       <Form.Group id = "Telephone">
                          <Form.Label>Telephone</Form.Label>
                          <Form.Control 
                          defaultValue = {user.Telephone} 
                          disabled = {true} 
                          pattern = "[0-9]{8}"
                          title = "Please enter 8 digits"
                          type="invalid" required/>
                       </Form.Group>
                       <Form.Group id = "Doctor">
                          <Form.Label><Link to= {"/Patient/searchDoctor"}>Select A Doctor Here</Link></Form.Label>
                          <Form.Control 
                          defaultValue = {doctor.Name} 
                          disabled = {true} 
                          type="text" required/>
                       </Form.Group>
                       <Link to={{
                        pathname: '/Patient/scheduleAppointment/', 
                        state:{doctor: doctor}
            }}><Button className="w-100 my-2" type="submit">Next</Button></Link>
                   </Form>
               </Card.Body>
              </Card>
              </div>
              </Container>
              )}
        </div>
     )
}

export default BookAppointmentUI
