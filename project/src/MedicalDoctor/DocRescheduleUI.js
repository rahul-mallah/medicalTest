import React,{useState} from 'react';
import moment from 'moment';
import { Card, Container, Button, Form, Alert } from 'react-bootstrap';
import {Link, useLocation, useHistory, useRouteMatch} from "react-router-dom";
import {firestore } from '../firebase';
import { useAuth } from "../util/Auth"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import IdleTimerContainer from '../util/IdleTimerContainer';

function DocRescheduleUI() {
    const {state} = useLocation()
    const {appointment} = state
    const history = useHistory();
    const {currentUser} = useAuth();

    const [appointments, setAppointments] = useState([]);  // save Appointment data from firestore in this array 
    const [selectedSlot, setSelectedSlot] = useState("");  // to save patient selected time slot
    const [date, setDate] = useState("");                  // to save patient selected date
    const [error, setError] = useState("");                // store error message
    const [doctor, setDoctor] = useState([]);

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Appointment")
           .get()
           .then(function(data){
              console.log(data)
              setAppointments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
           }); 
           firestore.collection("Medical Doctors").limit(1)
           .where("Email","==",String(currentUser.email))
           .get()
           .then(function(data){
              console.log(data)
              setDoctor(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
           }); 
        };
        fetchData();
     }, [])

     const resAppointmentAlert = () => {
        confirmAlert({
          title: 'Congratulations!',
          message: 'Appointment has been rescheduled successfully.',
          buttons: [
            {
              label: 'OK',
            },
          ]
        });
      };

     const doct = {...doctor[0]}

     const handleSubmit = async(e) => {
        e.preventDefault();
      setError("");
      if(date === "" || selectedSlot === "")
      {
          return setError("Date Or Timeslot Not Selected");
      }

      try{
         await firestore.collection("Appointment").doc(appointment.id).update({
            Date : date,
            Timeslot: selectedSlot,
        })
        .then(() => {
            resAppointmentAlert()
        })

        // Send email to user
        let details = {
            date: date,
            doctor: appointment.Doctor,
            timeslot: selectedSlot,
            user: appointment.Patient,
            email: appointment.PatientEmail,
            department: doct.Department
        };
        let response = await fetch("http://localhost:5000/docReschedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(details)
        });
        let result = await response.json();
        console.log(result.status);

        history.push("/MedDoc/Schedule");
      }
      catch(error){
         return setError(error.message);
      }

      setSelectedSlot("");
      setDate("");
     }

     // declare and initialize timeslot array for everyday
    const times = ["08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "07:00 PM - 08:00 PM"
  ];

    const bookedTimeslots = [];
    
    for(var j = 0; j < appointments.length; j++)
    {
        //get booked timeslots for the doctor on that day
        if(date === appointments[j].Date)
        {
            if(currentUser.email === appointments[j].DocEmail)
            {
                bookedTimeslots.push(appointments[j].Timeslot);
            }
        } 
    }

    //remove booked timeslots from times array
    const filteredTimes = times.filter(function(x) { 
        return bookedTimeslots.indexOf(x) < 0;
      });

    return (
        <div>
            <IdleTimerContainer></IdleTimerContainer>
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
          <Card>
             <Card.Body>
                 <Form onSubmit={handleSubmit}>
                 <Form.Group id = "date">
                        <label class="note">Note: You will not be able to reschedule an appointment from the same day</label>
                        <Form.Label>Select A Date</Form.Label>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Control 
                        disabled = {false}
                        min={moment().add(1, 'days').format("YYYY-MM-DD")}
                        onChange={(e) => setDate(e.target.value)}
                        type="date" required/>
                     </Form.Group>
                     <Form.Group id = "timeslots">
                     <Form.Label>Available Time Slots</Form.Label>
                     <label class="note">Time slots will display after selecting a date</label>
            {filteredTimes.map(time => (date === "") ? null : <div> 
                <input type="radio" value={time} name="time" 
                onChange={e => {setSelectedSlot(e.target.value)}} /><label>{time}</label>
                </div>)}
                </Form.Group>
                <Button className="w-100 my-2" type="submit">Book</Button>
                <Link to={'/MedDoc/Schedule'}>
                    <Button className="w-100 my-2" type="submit">Return</Button></Link>
                </Form>
                </Card.Body>
                </Card>
                </div>
                </Container>
        </div>
    )
}

export default DocRescheduleUI
