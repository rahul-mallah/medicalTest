import React,{useState} from 'react';
import {Link, withRouter, useLocation, useHistory} from 'react-router-dom';
import { useAuth } from '../util/Auth';
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { auth, firestore } from '../firebase';

function ViewIndividualMPUI() {
    const {state} = useLocation();
    const {document} = state;

    return (
        <div>
            <Container className="d-flex align-items-center justify-content-center">
          <div className="w-100" style={{Width: "60%"}}>
            <Card>
            <h2 className= "text-center mb-4 mt-3">Medical Profile</h2>
             <Card.Body>
                <Form>
                    <Form.Group id = "Name">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control 
                        defaultValue = {document.Patient} 
                        disabled = {true} 
                        type="text" required/>
                    </Form.Group>
                    <Form.Group id = "VisitDate">
                    <Form.Label>Date of Visit</Form.Label>
                    <Form.Control 
                        defaultValue = {document.DateOfVisit} 
                        disabled = {true} 
                        type="date" required/>
                    </Form.Group>
                    <Form.Group id = "reason">
                    <Form.Label>Reason for Visit</Form.Label>
                    <Form.Control
                        as="textarea"
                        defaultValue = {document.Reason}
                        disabled = {true}
                        rows = {3}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "Prescription">
                    <Form.Label>Medical Prescriptions</Form.Label>
                    <Form.Control
                        as="textarea"
                        defaultValue = {document.MedicalPrescription}
                        disabled = {true}
                        rows = {3}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "LabResult">
                    <Form.Label>Lab Results</Form.Label>
                    <Form.Control
                        as="textarea"
                        defaultValue = {document.LabResults}
                        disabled = {true}
                        rows = {3}
                        required
                    />
                    </Form.Group>
                    <Link to={{
                        pathname: '/Patient/ViewMC', 
                        state:{document: document}
            }}><Button className="w-100 my-2">View MC</Button></Link>
                    <Link to={{
                        pathname: '/Patient/ViewReceipt', 
                        state:{document: document}
            }}><Button className="w-100 my-2">View Receipt</Button></Link>
                </Form>
                
             </Card.Body>
             </Card>
             </div>
             </Container>
        </div>
    )
}

export default ViewIndividualMPUI
