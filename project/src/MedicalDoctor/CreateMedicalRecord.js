import React,{useState} from 'react';
import { Card, Container, Button, Form, Alert } from 'react-bootstrap';
import {useLocation, useHistory} from "react-router-dom";
import {firestore } from '../firebase';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import IdleTimerContainer from '../util/IdleTimerContainer';

function CreateMedicalRecord() {
    const {state} = useLocation()
    const {md} = state
    const history = useHistory();

    //useStates
    const [allergies, setAllergies] = useState("");
    const [demographics, setDemographics] = useState("");
    const [diagnoses, setDiagnoses] = useState("");
    const [labResults, setLabResults] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");
    const [vitals, setVitals] = useState("");
    const [error, setError] = useState(""); 
    const [medRec, setMedRec] = useState([]);

    React.useEffect(()=>{
        const fetchData = async () =>{
            firestore.collection("Medical Records")
            .where("PatientEmail","==",String(md.PatientEmail))
            .get()
            .then(function(data){
               console.log(data)
               setMedRec(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            }); 
        };
        fetchData();
    },[])
    
    const cancelAppointmentAlert = () => {
        confirmAlert({
          title: 'Congratulations!',
          message: 'Your appointment has been cancelled successfully.',
          buttons: [
            {
              label: 'OK',
            },
          ]
        });
      };

    const rec = {...medRec[0]};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            await firestore.collection("Medical Records").add({
                Allergies : allergies,
                Demographics : demographics,
                Diagnoses : diagnoses,
                LabResults : labResults,
                MedicalHistory : medicalHistory,
                Vitals : vitals,
                Patient : md.Patient,
                PatientEmail : md.PatientEmail,
                AssignedDoc : md.DocEmail
            })
            .then(() => {
                cancelAppointmentAlert()
                history.push("/MedDoc/PatientProfile");
            })
        }
        catch(error){
            return setError(error.message);
        }
    }

    return (
        <div>
            <IdleTimerContainer></IdleTimerContainer>
            {!rec.PatientEmail ? (
            <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100" style={{Width: "60%"}}>
                    <Card>
                        <h2 className= "text-center mb-4 mt-3">Create Medical Record</h2>
                        <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id = "Name">
                                <Form.Label>Patient Name</Form.Label>
                                <Form.Control 
                                    defaultValue = {md.Patient} 
                                    disabled = {true} 
                                    type="text" required/>
                                </Form.Group>
                                <Form.Group id = "allergies">
                                <Form.Label>Allergies</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows = {3}
                                    onChange={(e) => setAllergies(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Form.Group id = "demographics">
                                <Form.Label>Demographics</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows = {3}
                                    onChange={(e) => setDemographics(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Form.Group id = "diagnoses">
                                <Form.Label>Diagnoses</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows = {3}
                                    onChange={(e) => setDiagnoses(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Form.Group id = "labResults">
                                <Form.Label>Lab Results</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows = {3}
                                    onChange={(e) => setLabResults(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Form.Group id = "medicalHistory">
                                <Form.Label>Medical History</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows = {3}
                                    onChange={(e) => setMedicalHistory(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Form.Group id = "vitals">
                                <Form.Label>Vitals</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows = {3}
                                    onChange={(e) => setVitals(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Button type="submit" className="w-100 my-2">Create Medical Record</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            ):(<h1>Medical Record has already been created</h1>)}
        </div>
    )
}

export default CreateMedicalRecord
