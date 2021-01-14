import React,{useState} from 'react'
import moment from 'moment';
import {Link, withRouter, useLocation} from 'react-router-dom';
import { useAuth } from '../util/Auth';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import { auth, firestore } from '../firebase';
import "./ScheduleAppointment.css";

function ScheduleAppointmentUI() {

    const {state} = useLocation();  //access doctor passed from link router
    const {doctor} = state;         // save doctor data from state
    const [appointments, setAppointments] = useState([]);  // save Appointment data from firestore in this array 
    const [selectedSlot, setSelectedSlot] = useState("");  // to save patient selected time slot
    const [date, setDate] = useState("");                  // to save patient selected date
    const [error, setError] = useState("");                // store error message
    const [Users, setUsers] = useState([]);
    const { currentUser } = useAuth();

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Appointment")
           .get()
           .then(function(data){
              console.log(data)
              setAppointments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
           }); 
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

     //handle submit
   const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if(date === "" || selectedSlot === "")
        {
            return setError("Date Or Timeslot Not Selected")
        }
        try{
            firestore.collection("Appointment").add({
                Date : date,
                Doctor : doctor.Name,
                Timeslot : selectedSlot,
                Patient : Users[0].FirstName + " " + Users[0].LastName,
                PatientEmail : currentUser.email
            })
            .then(() => {
                alert("Appointment Booked Successfully!");
             })
          } catch(error){
             return setError(error.message);
          }
        setSelectedSlot("");
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

    // to filter timeslots for the doctor selected in bookAppoinemntUI 
    
    const bookedTimeslots = [];
    for(var i = 0; i < times.length; i++)
    {
        for(var j = 0; j < appointments.length; j++)
        {
            //get booked timeslots for the doctor on that day
            if(times[i] === appointments[j].Timeslot)
            {
                if(date === appointments[j].Date)
                {
                    if(doctor.Name === appointments[j].Doctor)
                    {
                        bookedTimeslots.push(times[i]);
                    }
                } 
            }
        }
    }
    
    //remove booked timeslots from times array
    const filteredTimes = times.filter(function(x) { 
        return bookedTimeslots.indexOf(x) < 0;
      });

    return (
        <div>
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
          <Card>
             <Card.Body>
                 <Form onSubmit={handleSubmit}>
                 <Form.Group id = "date">
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
            {filteredTimes.map(time => (date === "") ? null : <div> 
                <input type="radio" value={time} name="time" 
                onChange={e => {setSelectedSlot(e.target.value)}} /><label>{time}</label>
                </div>)}
                </Form.Group>
                <Button className="w-100 my-2" type="submit">Confirm</Button>
                <Link to={{
                        pathname: '/Patient/bookAppointment', 
                        state:{doctor: doctor}
            }}><Button className="w-100 my-2" type="submit">Return</Button></Link>
                </Form>
                </Card.Body>
                </Card>
                </div>
                </Container>
        </div>
    )
}

export default ScheduleAppointmentUI
