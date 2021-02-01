import React,{useState} from 'react';
import {Link, withRouter, useLocation, useHistory} from 'react-router-dom';
import { useAuth } from '../util/Auth';
import MC from "./MC"
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { auth, firestore } from '../firebase';
import {useRouteMatch} from 'react-router-dom';

function ViewMPUI() {
    const {state} = useLocation();
    const {appointment} = state;
    //usestates
    const[medDocs, setMedDocs] = useState([]);
    const[Reason, setReason] = useState("");
    const[LabResult, setLabResult] = useState("");
    const[Prescription, setPrescription] = useState("");
    const[ConsultFee, setConsultFee] = useState(0);
    const[PrescriptionFee, setPrescriptionFee] = useState(0);
    const[WardFee, setWardFee] = useState(0);
    const[TestFee, setTestFee] = useState(0);
    const[MiscFee, setMiscFee] = useState(0);
    const [error, setError] = useState("");  
    const[editDisabled, setEditDisabled] = useState(false);
    const[fieldsDisabled, setFieldsDisabled] = useState(true);

    const {path} = useRouteMatch();

    React.useEffect(()=>{
        const fetchData = async () =>{
            firestore.collection("Medical Documents")
            .where("appointmentID","==",appointment.id)
            .get()
            .then(function(data){
               console.log(data)
               setMedDocs(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            }); 
        };
        fetchData();
    },[])

    const document = {...medDocs[0]};
    
    function onEdit(){
        setEditDisabled(true);
        setFieldsDisabled(false);
        setReason(document.Reason);
        setLabResult(document.LabResults);
        setPrescription(document.MedicalPrescription);
        setConsultFee(document.consultFee);
        setPrescriptionFee(document.prescriptionFee);
        setWardFee(document.wardFee);
        setTestFee(document.testFee);
        setMiscFee(document.miscFee);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setError("");
            setFieldsDisabled(true);
            //update data in firestore collection
         firestore.collection("Medical Documents").doc(document.id)
         .update({
                appointmentID: appointment.id,
                Patient: appointment.Patient,
                PatientEmail: appointment.PatientEmail,
                DocEmail: appointment.DocEmail,
                Reason: Reason,
                DateOfVisit: appointment.Date,
                LabResults: LabResult,
                MedicalPrescription: Prescription,
                Bill: ConsultFee.toString()+"-"+PrescriptionFee.toString()+"-"+WardFee.toString()+"-"+TestFee.toString()+"-"+MiscFee.toString(),
                consultFee: parseFloat(ConsultFee),
                prescriptionFee: parseFloat(PrescriptionFee),
                wardFee: parseFloat(WardFee),
                testFee: parseFloat(TestFee),
                miscFee: parseFloat(MiscFee)
         })
         .then(() => {
            alert("Updated Successfully!");
         })
        }
        catch(error){
            setError(error.message);
        }
        setFieldsDisabled(true);
        setEditDisabled(false);
    }


    return (
        <div>
            <Container className="d-flex align-items-center justify-content-center">
          <div className="w-100" style={{Width: "60%"}}>
            <Card>
            <h2 className= "text-center mb-4 mt-3">Create Medical Profile</h2>
             <Card.Body>
             {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
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
                        disabled = {fieldsDisabled}
                        rows = {3}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "Prescription">
                    <Form.Label>Medical Prescriptions</Form.Label>
                    <Form.Control
                        as="textarea"
                        defaultValue = {document.MedicalPrescription}
                        disabled = {fieldsDisabled}
                        rows = {3}
                        onChange={(e) => setPrescription(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "LabResult">
                    <Form.Label>Lab Results</Form.Label>
                    <Form.Control
                        as="textarea"
                        defaultValue = {document.LabResults}
                        disabled = {fieldsDisabled}
                        rows = {3}
                        onChange={(e) => setLabResult(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <hr/>
                    <Card.Title className="text-center">Enter Data for Receipt</Card.Title>
                    <Form.Group id = "ConsultFee">
                    <Form.Label>Consultation Fee</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={document.consultFee}
                        disabled = {fieldsDisabled}
                        min='0'
                        onChange={(e) => setConsultFee(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "PrescriptFee">
                    <Form.Label>Prescription Fee</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={document.prescriptionFee}
                        disabled = {fieldsDisabled}
                        min='0'
                        onChange={(e) => setPrescriptionFee(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "WardFee">
                    <Form.Label>Ward Fee</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={document.wardFee}
                        disabled = {fieldsDisabled}
                        min='0'
                        onChange={(e) => setWardFee(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "TestFee">
                    <Form.Label>Medical Test Fee</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={document.testFee}
                        disabled = {fieldsDisabled}
                        min='0'
                        onChange={(e) => setTestFee(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "Miscellaneous">
                    <Form.Label>Miscellaneous Fee</Form.Label>
                    <Form.Control
                        type="number"
                        defaultValue={document.miscFee}
                        disabled = {fieldsDisabled}
                        min='0'
                        onChange={(e) => setMiscFee(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Link to={{
                        pathname: '/MedDoc/ViewMC', 
                        state:{appointment: appointment}
            }}><Button className="w-100 my-2">View MC</Button></Link>
                    <Button onClick={(e)=> onEdit()}className="w-100 my-2" disabled={editDisabled}>Edit</Button>
                    <Button type="submit"className="w-100 my-2" disabled={fieldsDisabled}>Update</Button>
                    <Button href = {`${path}`} disabled = {fieldsDisabled} className="w-100 my-2">Cancel</Button>
                </Form>
                
             </Card.Body>
             </Card>
             </div>
             </Container>
        </div>
    )
}

export default ViewMPUI
