import React,{useState} from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useAuth } from '../util/Auth';
import {firestore } from '../firebase';
import "../Patient/UserAppointmentUI.css";
import moment from 'moment';
import Calendar from 'react-awesome-calendar';
import IdleTimerContainer from '../util/IdleTimerContainer';



const Moment = require('moment')

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}:00`;
}

function ViewAllocatedPatientUI() {
   const [toggleState, setToggleState] = useState(1);
   const [appointments, setAppointments] = useState([]);
   const [doctor, setDoctor] = useState([]);
   const {currentUser} = useAuth();

   const toggleTab = (index) => {
      setToggleState(index);
    };

    React.useEffect(()=>{
      const fetchData = async () =>{
         firestore.collection("Appointment")
         .where("DocEmail", "==", String(currentUser.email))
         .get()
         .then(function(data){
              console.log(data)
              setAppointments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
          })
          firestore.collection("Medical Doctors")
         .where("Email", "==", String(currentUser.email))
         .get()
         .then(function(data){
              console.log(data)
              setDoctor(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
          })
      };
      fetchData();
   }, [])

   //filter upcoming
   const filterUpcoming = appointments.filter(app =>{
    return new Date(app.Date+" "+ convertTime12to24(app.Timeslot.substr(11,app.Timeslot.length))) >= new Date();
 })

  //filter past
  const filterPast = appointments.filter(app =>{
    return new Date(app.Date+" "+ convertTime12to24(app.Timeslot.substr(11,app.Timeslot.length))) < new Date();
 })

  //sort according to date and timeslot for past in desc order
  const sortedPast = filterPast.sort((a,b) => 
  new Date(b.Date + " "+ convertTime12to24(b.Timeslot.substr(0,8)))-
  new Date(a.Date + " "+ convertTime12to24(a.Timeslot.substr(0,8)))
)

   // sort according to date and timeslot ascending order
   const sorted = filterUpcoming.sort((a,b) => 
      new Date(a.Date + " "+ convertTime12to24(a.Timeslot.substr(0,8)))-
      new Date(b.Date + " "+ convertTime12to24(b.Timeslot.substr(0,8)))
   )

   const events = [];
   const doc = {...doctor[0]};

   // create event array and populate all future appointments
   for(var i = 0; i < sorted.length; i++)
   {
     // convert to match UTC format
     var fromDate = new Date(sorted[i].Date+" "+convertTime12to24(sorted[i].Timeslot.substr(0,8)));
     fromDate.setHours(fromDate.getHours()+8);
     var toDate = new Date(sorted[i].Date+" "+convertTime12to24(sorted[i].Timeslot.substr(11,sorted[i].Timeslot.length)));
     toDate.setHours(toDate.getHours()+8);

     // create event object
      const obj = {
        id : sorted[i].id,
        color : '	#FFA500',
        from : fromDate,
        to : toDate,
        title : sorted[i].Patient+ " ( "+sorted[i].Timeslot+" )"
      }

      //push to array
      events.push(obj);
   }

   return (
      <div>
        <IdleTimerContainer></IdleTimerContainer>
        <Container>
          <Card>
            <div className="text-center">
          <Card.Title className="text-center">Your Schedule</Card.Title>
          <Card.Img variant="left" src={doc.Image} width="220px"/>
            <Card.Title>{doc.Name}</Card.Title>
            </div>
          </Card>
          </Container>
          <Container>
        <Card className="my-5">
        <Calendar
                events={events}
            />
            </Card>
            </Container>
            <Container className = "my-5 w-100">
        <Card>
          <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Upcoming
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Past
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <h2>Upcoming Patient To See</h2>
          <hr />
          {sorted.map(app =>
          <Card className = "my-5">
            <Card.Header as="h5">Date : {moment(app.Date).format('MMMM Do YYYY')}</Card.Header>
              <Card.Body>
                <Card.Title>Patient : {app.Patient}</Card.Title>
                <Card.Text>Booked Time : {app.Timeslot}</Card.Text>
                <Link to={{
                        pathname: '/MedDoc/Reschedule', 
                        state:{appointment: app}
            }}><Button className = "mt-2"variant="primary">Reschedule</Button></Link>
                <div className="col text-right">
                  {!app.DocCreated ? <Link to={{
                        pathname: '/MedDoc/CreateMP', 
                        state:{appointment: app}
            }}><Button>Create Medical Document</Button></Link> : null}
            {app.DocCreated ? <Link to={{
                        pathname: '/MedDoc/ViewMP', 
                        state:{appointment: app}
            }}><Button>View/Edit Medical Document</Button></Link> : null}
                </div>
            </Card.Body>
          </Card>
          )}
        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <h2>Past Patient Seen</h2>
          <hr />
          {filterPast.map(app =>
          <Card className = "my-5">
            <Card.Header as="h5">Date : {moment(app.Date).format('MMMM Do YYYY')}</Card.Header>
              <Card.Body>
                <Card.Title>Patient : {app.Patient}</Card.Title>
                <Card.Text>Booked Time : {app.Timeslot}</Card.Text>
                <div className="col text-right">
                  {!app.DocCreated ? <Link to={{
                        pathname: '/MedDoc/CreateMP', 
                        state:{appointment: app}
            }}><Button>Create Medical Document</Button></Link> : null}
            {app.DocCreated ? <Link to={{
                        pathname: '/MedDoc/ViewMP', 
                        state:{appointment: app}
            }}><Button>View/Edit Medical Document</Button></Link> : null}
                </div>
            </Card.Body>
          </Card>
          )}
        </div>
      </div>
      </Card>
      </Container>
      </div>
   )
}

export default ViewAllocatedPatientUI


