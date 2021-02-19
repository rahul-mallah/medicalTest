import React,{useState} from 'react';
import moment from 'moment';
import {Link, useLocation, useHistory} from 'react-router-dom';
import { useAuth } from '../util/Auth';
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { firestore } from '../firebase';
import "../Patient/ScheduleAppointment.css";
import IdleTimerContainer from '../util/IdleTimerContainer';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

function CreateFollowUPUI() {
    //react hooks
    const {state} = useLocation();  //access doctor passed from link router
    const {appointment} = state;         // save appointment data from state
    const [appointments, setAppointments] = useState([]);  // save Appointment data from firestore in this array 
    const [selectedSlot, setSelectedSlot] = useState("");  // to save patient selected time slot
    const [date, setDate] = useState("");                  // to save patient selected date
    const [error, setError] = useState("");                // store error message
    const [Users, setUsers] = useState([]);                // store patient data
    const [doctor, setDoctor] = useState([]);               // store doctor data
    const { currentUser } = useAuth();
    const history = useHistory();
    let URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

    // fetches data on render
    React.useEffect(()=>{
        //fetch all data from firebase
        const fetchData = async () =>{
           firestore.collection("Appointment")
           .get()
           .then(function(data){
              console.log(data)
              setAppointments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
           }); 

           firestore.collection("Users")
           .where("Email", "==", String(appointment.PatientEmail)).limit(1)
           .get()
           .then(function(data){
                console.log(data)
                setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            });

            firestore.collection("Medical Doctors").limit(1)
            .where("Email", "==", String(appointment.DocEmail))
            .get()
            .then(function(data){
                console.log(data)
                setDoctor(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            });
        };
        fetchData();
     }, [])

      //handle submit function add booked appointment data to firebase
   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if(date === "" || selectedSlot === "")
    {
        return setError("Date Or Timeslot Not Selected");
    }

    try{
        await firestore.collection("Appointment").add({
          Date : date,
          Timeslot: selectedSlot,
          Doctor: doct.Name,
          Patient: Users[0].FirstName + " " + Users[0].LastName,
          PatientEmail: patient.Email,
          DocEmail: doct.Email,
          DocCreated: true
      })
      .then(() => {
          confirmReScheduleAlert()
      })

      // Send email to user
      let details = {
          date: date,
          doctor: doct.Name,
          timeslot: selectedSlot,
          user: Users[0].FirstName + " " + Users[0].LastName,
          email: currentUser.email,
          department: doct.Department
      };
      let response = await fetch(URI+"/book", {
          method: "POST",
          headers: {
              "Content-Type": "application/json;charset=utf-8"
          },
          body: JSON.stringify(details)
      });
      let result = await response.json();
      console.log(result.status);

      history.push("/MedAdm/Schedule");
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

  // to filter timeslots for the doctor selected in bookAppoinemntUI 
  const doct = {...doctor[0]};
  const bookedTimeslots = [];
  const patient = {...Users[0]};
  
  for(var j = 0; j < appointments.length; j++)
  {
      //get booked timeslots for the doctor on that day
      if(date === appointments[j].Date)
      {
          if(doct.Email === appointments[j].DocEmail)
          {
              bookedTimeslots.push(appointments[j].Timeslot);
          }
      } 
  }

  //remove booked timeslots from times array
  const filteredTimes = times.filter(function(x) { 
    return bookedTimeslots.indexOf(x) < 0;
  });


     const confirmReScheduleAlert = () => {
        confirmAlert({
          title: 'Congratulations!',
          message: 'The appointment has been scheduled successfully.',
          buttons: [
            {
              label: 'OK',
            },
          ]
        });
      };

    return (
        <div>
            <IdleTimerContainer></IdleTimerContainer>
            <div className="text-center">
                <h2>Create Follow Up Appointment</h2>
                <br/>
                <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Title><br/>Doctor</Card.Title>
                    <Card.Img variant="top" src={doct.Image} />
                    <Card.Body>
                        <Card.Title>{doct.Name}</Card.Title>
                        <Card.Text>
                            {doct.Department}
                        </Card.Text>
                    </Card.Body>
                </Card> 
                </div>
                </Container>
            </div>

            <br/>
            <div className="text-center">
                <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Title><br/>Patient</Card.Title>
                    <Card.Body>
                        <Card.Title>{patient.FirstName + " " + patient.LastName}</Card.Title>
                        <Card.Text>
                            <b>Email: </b>
                            {patient.Email}
                            <br/>
                            <b>Date of Birth: </b>
                            {patient.DOB}
                            <br/>
                            <b>Telephone: </b>
                            {patient.Telephone}
                        </Card.Text>
                    </Card.Body>
                </Card> 
                </div>
                </Container>
            </div>

            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh"}}>
          <div className="w-100 mt-3" style={{maxWidth: "400px"}}>
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
                     <label class="note">Time slots will display after selecting a date</label>
            {filteredTimes.map(time => (date === "") ? null : <div> 
                <input type="radio" value={time} name="time" 
                onChange={e => {setSelectedSlot(e.target.value)}} /><label>{time}</label>
                </div>)}
                </Form.Group>
                <Button className="w-100 my-2" type="submit">Book</Button>
                <Link to={'/MedAdm/Schedule'}>
                    <Button className="w-100 my-2">Return</Button></Link>
                </Form>
                </Card.Body>
                </Card>
                </div>
            </Container>
        </div>
    )
}

export default CreateFollowUPUI
