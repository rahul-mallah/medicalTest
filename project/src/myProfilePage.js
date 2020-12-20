import React from 'react'
import {Form, Button, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom';

function RegisterUI() {
    return (
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "500px"}}>
            <Card>
             <Card.Body>
                 <h2 className= "text-center mb-4">My Profile</h2>
                 <Form>
                     <Form.Group id = "FirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" required/>
                     </Form.Group>
                     <Form.Group id = "LastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" required/>
                     </Form.Group>
                     <Form.Group id = "NRIC">
                        <Form.Label>NRIC</Form.Label>
                        <Form.Control type="text" required/>
                     </Form.Group>
                     <Form.Group id = "address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" required/>
                     </Form.Group>
                     <Form.Group id = "DOB">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" required/>
                     </Form.Group>
                     <Form.Group id = "email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" required/>
                     </Form.Group>
                     <Form.Group id = "telephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="invalid" required/>
                     </Form.Group>
                     <Button className="w-100" type="submit">Update</Button>
                 </Form>
             </Card.Body>
            </Card>
            </div>
            </Container>
    )
}

export default RegisterUI

