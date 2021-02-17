import React,{useState} from 'react'
import moment from 'moment';
import {Link, withRouter, useLocation, useHistory} from 'react-router-dom';
import { useAuth } from '../util/Auth';
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { auth, firestore } from '../firebase';
import "./ScheduleAppointment.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function CancelAppointmentUI() {
   const {state} = useLocation();              // access appointment passed from link router
   const {Appointment} = state;                // save appointment data from state
   const [error, setError] = useState("");     // store error message
   const { currentUser } = useAuth();
   const history = useHistory();

   const cancelAppointmentAlert = () => {
      confirmAlert({
        title: 'Congratulations!',
        message: 'Your appointment has been cancelled successfully.',
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
      setError("");

      try{
         await firestore.collection("Appointment").doc(Appointment.id).delete()
         .then(() => {
            cancelAppointmentAlert()
         })

         // Send email to user
         let details = {
            date: Appointment.Date,
            doctor: Appointment.Doctor,
            timeslot: Appointment.Timeslot,
            user: Appointment.Patient,
            email: Appointment.PatientEmail
         };
         let response = await fetch("http://localhost:5000/cancel", {
            method: "POST",
            headers: {
               "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(details)
         });
         let result = await response.json();
         console.log(result.status);

         history.push("/Patient/Appointment");
      }
      catch(error){
         return setError(error.message);
      }
 }

   return (
      <div>
         <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
          <Card>
             <Card.Body>
                <Card.Title className= "text-center">Cancel Appointment</Card.Title>
                <label class="note">The following appointment will be cancelled:</label>
                {error && <Alert variant="danger">{error}</Alert>}
                 <Form onSubmit={handleSubmit} className="my-4">
                 <Form.Group id = "date">
                        <Form.Label className="my-2">Appointment Date</Form.Label>
                        <Form.Control 
                        disabled = {true}
                        defaultValue={Appointment.Date}
                        type="date" required/>
                  </Form.Group>
                  <Form.Group id = "text">
                     <Form.Label>Appointment Time Slot</Form.Label>
                     <Form.Control 
                        disabled = {true}
                        defaultValue={Appointment.Timeslot}
                        type="text" required/>
                </Form.Group>
                <Form.Group id = "text">
                     <Form.Label>Doctor Name</Form.Label>
                     <Form.Control className = "mb-4"
                        disabled = {true}
                        defaultValue={Appointment.Doctor}
                        type="text" required/>
                </Form.Group>
                <Button className="w-100 my-2" type="submit">Cancel Appointment</Button>
                <Link to={'/Patient/Appointment'}>
                    <Button className="w-100 my-2">Return</Button></Link>
                </Form>
                </Card.Body>
                </Card>
                </div>
                </Container>
      </div>
   )
}

export default CancelAppointmentUI
