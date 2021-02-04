import React, { Component, useState } from 'react';
import {Container, Card, Button, Row} from "react-bootstrap";
import { useAuth } from '../util/Auth';
import {Link} from "react-router-dom";
import { firestore } from '../firebase';
import './UserAppointmentUI.css';
import moment from 'moment';
import IdleTimerContainer from '../util/IdleTimerContainer';


function UserAppointmentUI() {

  const{currentUser} = useAuth();
  const [Email, setEmail] = useState(""); 
  const [Users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const doctor = { Name : ""};
  const [toggleState, setToggleState] = useState(1);
  const [date, setDate] = useState(new Date());

  const toggleTab = (index) => {
    setToggleState(index);
  };

  React.useEffect(()=>{
    const fetchData = async () =>{
       firestore.collection("Users")
       .where("Email", "==", String(currentUser.email))
       .get()
       .then(function(data){
          console.log(data)
             setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
       }); 

       firestore.collection("Appointment")
       .get()
       .then(function(data){
          console.log(data)
          setAppointments(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
       }); 

       firestore.collection("Medical Doctors")
       .get()
       .then(function(data){
          console.log(data)
          setDoctors(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
       }); 
    };
    fetchData();
 }, [])

 const filteredAppointments = appointments.filter(app =>{
    if(app.PatientEmail === currentUser.email)
        return app;
 })

 const filterUpcoming = filteredAppointments.filter(app =>{
    let today = moment(date).format('MMMM Do YYYY');
    let appDate = moment(app.Date).format('MMMM Do YYYY');
    return appDate >= today;
 })

 const filterPast = filteredAppointments.filter(app =>{
  let today = moment(date).format('MMMM Do YYYY');
  let appDate = moment(app.Date).format('MMMM Do YYYY');
  return appDate < today;
})

  return (
    <div>
      <IdleTimerContainer></IdleTimerContainer>
      <Container className= "w-100">
        <Card>
          <Card.Title className = "my-3 px-5">{Users.map(user => <h4>{user.FirstName } {user.LastName}</h4>)}
          <div className = "col text-right">
          <Link to={{
                        pathname: 'bookAppointment/', 
                        state:{doctor: doctor}
            }}><Button type="submit">Book New Appointment</Button></Link>
              </div>
              </Card.Title>
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
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Your Upcoming Appointments</h2>
          <hr />
          {filterUpcoming.map(app => 
          <Card className = "my-5">
            <Card.Header as="h5">Date : {moment(app.Date).format('MMMM Do YYYY')}</Card.Header>
              <Card.Body>
                <Card.Title>Doctor : {app.Doctor}</Card.Title>
                <Card.Text>Booked Time : {app.Timeslot}</Card.Text>
                <Link to={{
                        pathname: 'Appointment/Reschedule', 
                        state:{Appointment: app}
            }}><Button variant="primary">Reschedule Appointment</Button></Link>
                <Link to={{
                        pathname: 'Appointment/Cancel', 
                        state:{Appointment: app}
            }}><Button className = "mx-4" variant="primary">Cancel Appointment</Button></Link>
            </Card.Body>
          </Card>
          )}
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Your Past Appointments</h2>
          <hr />
          {filterPast.map(app =>
          <Card className = "my-5">
            <Card.Header as="h5">Date : {moment(app.Date).format('MMMM Do YYYY')}</Card.Header>
              <Card.Body>
                <Card.Title>Doctor : {app.Doctor}</Card.Title>
                <Card.Text>Booked Time : {app.Timeslot}</Card.Text>
                <Link to={{
                        pathname: 'bookAppointment/', 
                        state:{doctor: doctor}
            }}><Button variant="primary">Book Again</Button></Link>
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

export default UserAppointmentUI

