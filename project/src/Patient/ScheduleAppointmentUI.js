import React,{useState} from 'react'
import moment from 'moment';
import {Link, withRouter, useLocation, useHistory} from 'react-router-dom';
import { useAuth } from '../util/Auth';
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { auth, firestore } from '../firebase';
import "./ScheduleAppointment.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

function ScheduleAppointmentUI() {

    const {state} = useLocation();  //access doctor passed from link router
    const {doctor} = state;         // save doctor data from state
    const [appointments, setAppointments] = useState([]);  // save Appointment data from firestore in this array 
    const [selectedSlot, setSelectedSlot] = useState("");  // to save patient selected time slot
    const [date, setDate] = useState("");                  // to save patient selected date
    const [error, setError] = useState("");                // store error message
    const [Users, setUsers] = useState([]);                // store patient data
    const [docGPs, setDocGPs] = useState([]);              // store general practitioners
    const [docGP, setDocGP] = useState({...doctor});
    const { currentUser } = useAuth();
    const history = useHistory();

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Appointment")
           .get()
           .then(function(data){
              console.log(data)
              setAppointments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
           }); 

           firestore.collection("Users").limit(1)
           .where("Email", "==", String(currentUser.email))
           .get()
           .then(function(data){
                console.log(data)
                setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            });

            firestore.collection("Medical Doctors")
            .where("Department", ">=", "General Practitioner (Non-specialist)")
            .where("Department", "<=", "General Practitioner (Non-specialist)\uF7FF")
            .get()
            .then(function(data){
                console.log(data)
                setDocGPs(data.docs.map(doc => ({ ...doc.data(), id: doc.id}))); 
            });
        };
        fetchData();
     }, [])

     const confirmScheduleAlert = () => {
        confirmAlert({
          title: 'Congratulations!',
          message: 'Your appointment has been booked successfully.',
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
        if(date === "" || selectedSlot === "")
        {
            return setError("Date Or Timeslot Not Selected");
        }
        if(docGP.Name === "")
        {
            return setError("No Doctor was selected!");
        }

        try{
            await firestore.collection("Appointment").add({
                Date : date,
                Doctor : docGP.Name,
                Timeslot : selectedSlot,
                Patient : Users[0].FirstName + " " + Users[0].LastName,
                PatientEmail : currentUser.email,
                DocEmail : docGP.Email,
                DocCreated : false
            })
            .then(() => {
                confirmScheduleAlert()
            })
            
            // Send email to user
            let details = {
                date: date,
                doctor: docGP.Name,
                timeslot: selectedSlot,
                user: Users[0].FirstName + " " + Users[0].LastName,
                email: currentUser.email,
                department: docGP.Department
            };
            let response = await fetch("http://localhost:5000/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(details)
            });
            let result = await response.json();
            console.log(result.status);

            history.push("/Patient/Appointment");

          } catch(error){
             return setError(error.message);
          }
        setSelectedSlot("");
        setDate("");
   }

   //select a random doctor on click
   const selectDoc = (e) => {
       if(doctor.Name === "")
            setDocGP({...docGPs[Math.floor(Math.random()*docGPs.length)]});
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
    
    for(var j = 0; j < appointments.length; j++)
    {
        //get booked timeslots for the doctor on that day
        if(date === appointments[j].Date)
        {
            if(docGP.Name === appointments[j].Doctor)
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
            {doctor.Name === "" ?(
            <div className="text-center">
                <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100" style={{maxWidth: "400px"}}>
                    <Card>
                        <Card.Body>
                        <Card.Title>You did not select a doctor therefore a gerneral practitioner will be assigned to you. Click below to view your assigned doctor.</Card.Title>
                        <Button onClick = {selectDoc} className="w-100 my-2">View my doctor</Button>
                        </Card.Body>
                    </Card>
                </div>
                </Container>
                {docGP.Name !== "" ?(
                <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100" style={{maxWidth: "400px"}}>
                    <Card>
                    <Card.Img variant="top" src={docGP.Image} />
                    <Card.Body>
                        <Card.Title>{docGP.Name}</Card.Title>
                        <Card.Text>
                            {docGP.Department}
                        </Card.Text>
                        <Link to={{pathname: '/Patient/doctorProfile/'+docGP.id, state:{doctor: docGP}}}><Button variant="primary">View Profile</Button></Link>
                    </Card.Body>
                    </Card>
                </div>
                </Container>
                ): ""}
            </div>
            ): (
            <div className="text-center">
                <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100" style={{maxWidth: "400px"}}>
                <Card >
                    <Card.Title>Doctor Selected</Card.Title>
                    <Card.Img variant="top" src={docGP.Image} />
                    <Card.Body>
                        <Card.Title>{docGP.Name}</Card.Title>
                        <Card.Text>
                            {docGP.Department}
                        </Card.Text>
                        <Link to={{pathname: '/Patient/doctorProfile/'+docGP.id, state:{doctor: docGP}}}><Button variant="primary">View Profile</Button></Link>
                    </Card.Body>
                </Card> 
                </div>
                </Container>
            </div>
            )}
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh"}}>
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
