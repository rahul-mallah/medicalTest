import NavBar from '../components/navbarUI';
import React, { Component, useState } from 'react';
import {Nav, Container, Card, Button, Row} from "react-bootstrap";
import { useAuth } from '../util/Auth';
import {Link, withRouter} from "react-router-dom";
import { auth, firestore } from '../firebase';

function UserAppointmentUI() {
  const{currentUser} = useAuth();
  const [Email, setEmail] = useState(""); 
  const [Users, setUsers] = useState([]);
  const doctor = { Name : ""}

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
      <Container>
        <Card>
          <Card.Title>{Users.map(user => <h4>{user.FirstName } {user.LastName}</h4>)}</Card.Title>
          <Link to={{
                        pathname: 'bookAppointment/', 
                        state:{doctor: doctor}
            }}><Button className="w-50 " type="submit">Book A New Appointment</Button></Link>
          </Card>
          <Nav style= {{backgroundColor: "#E5E5E5", fontSize: "20px"}}fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link eventKey="link-1">Upcoming</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">Missed</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3">Open</Nav.Link>
            </Nav.Item>
            </Nav>
        </Container>
    </div>
  )
}

export default UserAppointmentUI

