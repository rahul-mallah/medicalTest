import React,{useState} from 'react';
import {Link, withRouter, useLocation, useHistory} from 'react-router-dom';
import { useAuth } from '../util/Auth';
import MC from "./MC"
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { auth, firestore } from '../firebase';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import IdleTimerContainer from '../util/IdleTimerContainer';

function CreateMPUI() {
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
    const [MCDisabled, setMCDisabled] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(false);

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

    const MDAlert = () => {
        confirmAlert({
          title: 'Congratulations!',
          message: 'Medical document has been created successfully.',
          buttons: [
            {
              label: 'OK',
            },
          ]
        });
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if(medDocs && medDocs.length)
        {
            return setError("This medical document has already been created");
        }

        try{
            await firestore.collection("Medical Documents").add({
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
                miscFee: parseFloat(MiscFee), 
                MedicalCertificate: ""
            })
            await firestore.collection("Appointment").doc(appointment.id).update({
                DocCreated : true
            })
            .then(() => {
                MDAlert()
            })
          } catch(error){
             return setError(error.message);
          }
            setReason("");
            setLabResult("");
            setPrescription("");
            setConsultFee(0);
            setPrescriptionFee(0);
            setWardFee(0);
            setTestFee(0);
            setMiscFee(0);
            setMCDisabled(false);
            setBtnDisabled(true);
    }
    return (
        <div>
            <IdleTimerContainer></IdleTimerContainer>
            <Container className="d-flex align-items-center justify-content-center">
          <div className="w-100" style={{Width: "60%"}}>
            <Card>
            <h2 className= "text-center mb-4 mt-3">Create Medical Document</h2>
             <Card.Body>
             {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id = "Name">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control 
                        defaultValue = {appointment.Patient} 
                        disabled = {true} 
                        type="text" required/>
                    </Form.Group>
                    <Form.Group id = "VisitDate">
                    <Form.Label>Date of Visit</Form.Label>
                    <Form.Control 
                        defaultValue = {appointment.Date} 
                        disabled = {true} 
                        type="date" required/>
                    </Form.Group>
                    <Form.Group id = "reason">
                    <Form.Label>Reason for Visit</Form.Label>
                    <Form.Control
                        as="textarea"
                        value = {Reason}
                        rows = {3}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "Prescription">
                    <Form.Label>Medical Prescriptions</Form.Label>
                    <Form.Control
                        as="textarea"
                        value = {Prescription}
                        rows = {3}
                        onChange={(e) => setPrescription(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "LabResult">
                    <Form.Label>Lab Results</Form.Label>
                    <Form.Control
                        as="textarea"
                        value = {LabResult}
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
                        value = {ConsultFee}
                        min='0'
                        onChange={(e) => setConsultFee(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "PrescriptFee">
                    <Form.Label>Prescription Fee</Form.Label>
                    <Form.Control
                        type="number"
                        value={PrescriptionFee}
                        min='0'
                        onChange={(e) => setPrescriptionFee(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "WardFee">
                    <Form.Label>Ward Fee</Form.Label>
                    <Form.Control
                        type="number"
                        value={WardFee}
                        min='0'
                        onChange={(e) => setWardFee(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "TestFee">
                    <Form.Label>Medical Test Fee</Form.Label>
                    <Form.Control
                        type="number"
                        value={TestFee}
                        min='0'
                        onChange={(e) => setTestFee(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Form.Group id = "Miscellaneous">
                    <Form.Label>Miscellaneous Fee</Form.Label>
                    <Form.Control
                        type="number"
                        value={MiscFee}
                        min='0'
                        onChange={(e) => setMiscFee(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <Button disabled = {medDocs.length > 0 || btnDisabled} className="w-100 my-2" type="submit">Create Medical Record</Button>
                    <Link to={{
                        pathname: '/MedDoc/CreateMC', 
                        state:{appointment: appointment}
            }}><Button disabled = {!medDocs.length > 0 && MCDisabled} className="w-100 my-2">Create Medical Certificate</Button></Link>
                </Form>
             </Card.Body>
             </Card>
             </div>
             </Container>
        </div>
    )
}

export default CreateMPUI
