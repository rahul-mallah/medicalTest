import React from 'react'
import {Form, Button, Card, Container, Alert, Row, Col} from 'react-bootstrap'
import {Link,} from "react-router-dom";
import TextTruncate from 'react-text-truncate';

// individual doctor cards to be called in search doctor page
const DoctorCard = (props) => {
    return(
            <Card className="" style={{ width: '18rem' }}>
               <Link to={{
                   pathname: 'doctorProfile/' + props.data.id, 
                   state:{doctor: props.data}
            }}>
               <Card.Img variant="top" src={props.data.Image} height="220px" />
               </Link>
         <Card.Body>
         <Link to={{
                   pathname: 'doctorProfile/' + props.data.id, 
                   state:{doctor: props.data}
            }}>
               <Card.Title>{props.data.Name}</Card.Title>
            </Link>
            <Card.Subtitle className="mb-2 text-muted">Department: {props.data.Department}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Specialty: {props.data.Specialist}</Card.Subtitle>
            {/* <TextTruncate 
               line={3}
               element="span"
               truncateText="…"
               text={props.data.Information}
            /> */}
               <Link to={{pathname: 'doctorProfile/'+props.data.id, state:{doctor: props.data}}}><Button variant="primary">View Profile</Button></Link>
         </Card.Body>
      </Card>
    )
}

export default DoctorCard