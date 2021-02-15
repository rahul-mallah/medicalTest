import React,{useState} from 'react';
import Select from "react-select";
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
            <h2 className= "text-center mb-4 mt-3">Medical Document</h2>
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
                    <Form.Group>
                        <Form.Label>Medical Prescriptions</Form.Label>
                        <Select 
                        value = {document.prescriptions}
                        isDisabled = {true}
                        isMulti/>
                        <div style={{
                                marginTop: "1%",
                                maxHeight: "50vh",
                                overflowY: "scroll",
                            }}>
                            <table className="table table-bordered">
                        <thead>
                                <tr style={{
                                    backgroundColor:"#808080",
                                    color: "white",
                                    fontStyle : "italic",
                                    fontSize: "1.1rem"
                                }}>
                                <th scope="col" colSpan="3" width="78%">Prescription(s)</th>
                                <th scope="col" className="text-center">Price ($)</th>
                                </tr>
                        </thead>
                        <tbody>
                        {document.prescriptions.map(md => 
                            <tr>
                                <td colSpan="3">{md.value}</td>
                                <td className="text-center">{md.price}</td>
                            </tr>
                        )}
                        </tbody>
                        </table>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Medical Tests</Form.Label>
                        <Select 
                        value = {document.LabTests}
                        isDisabled = {true}
                        isMulti/>
                        <div style={{
                                marginTop: "1%",
                                maxHeight: "50vh",
                                overflowY: "scroll",
                            }}>
                            <table className="table table-bordered">
                        <thead>
                                <tr style={{
                                    backgroundColor:"#808080",
                                    color: "white",
                                    fontStyle : "italic",
                                    fontSize: "1.1rem"
                                }}>
                                <th scope="col" colSpan="3" width="78%">Medical Test(s)</th>
                                <th scope="col" className="text-center">Price ($)</th>
                                </tr>
                        </thead>
                        <tbody>
                        {document.LabTests.map(md => 
                            <tr>
                                <td colSpan="3">{md.value}</td>
                                <td className="text-center">{md.price}</td>
                            </tr>
                        )}
                        </tbody>
                        </table>
                        </div>
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
