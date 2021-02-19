import React,{useState} from 'react';
import { Card, Container, Button, Form, Alert } from 'react-bootstrap';
import { useLocation, useHistory, useRouteMatch} from "react-router-dom";
import {firestore } from '../firebase';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import IdleTimerContainer from '../util/IdleTimerContainer';

function EditMedicalRecord() {
    //react hooks
    const {state} = useLocation()
    const {md} = state
    const history = useHistory();
    const {path} = useRouteMatch();

    //useStates
    const [allergies, setAllergies] = useState("");
    const [demographics, setDemographics] = useState("");
    const [diagnoses, setDiagnoses] = useState("");
    const [labResults, setLabResults] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");
    const [vitals, setVitals] = useState("");
    const [error, setError] = useState(""); 
    const [medRec, setMedRec] = useState([]);
    const [fieldsDisabled, setFieldsDisabled] = useState(true);
    const[editDisabled, setEditDisabled] = useState(false);

    function onEdit(){
        setEditDisabled(true);
        setFieldsDisabled(false);
        setAllergies(md.Allergies);
        setDemographics(md.Demographics);
        setDiagnoses(md.Diagnoses);
        setLabResults(md.LabResults);
        setMedicalHistory(md.MedicalHistory);
        setVitals(md.Vitals);
    }

    // alert box
    const medicalRecordUpdatedAlert = () => {
        confirmAlert({
          title: 'Congratulations!',
          message: 'Patient medical record has been updated successfully.',
          buttons: [
            {
              label: 'OK',
            },
          ]
        });
      };

      // handle submit function updates medical records data in the firebase
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setError("");
            setFieldsDisabled(true);
            await firestore.collection("Medical Records").doc(md.id).update({
                Allergies : allergies,
                Demographics : demographics,
                Diagnoses : diagnoses,
                LabResults : labResults,
                MedicalHistory : medicalHistory,
                Vitals : vitals,
            })
            .then(() => {
                medicalRecordUpdatedAlert()
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
            <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100" style={{Width: "60%"}}>
                    <Card>
                        <h2 className= "text-center mb-4 mt-3">View/Edit Medical Record</h2>
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
                                    defaultValue={md.Allergies}
                                    disabled = {fieldsDisabled}
                                    rows = {3}
                                    onChange={(e) => setAllergies(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Form.Group id = "demographics">
                                <Form.Label>Demographics</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={md.Demographics}
                                    disabled = {fieldsDisabled}
                                    rows = {3}
                                    onChange={(e) => setDemographics(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Form.Group id = "diagnoses">
                                <Form.Label>Diagnoses</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={md.Diagnoses}
                                    disabled = {fieldsDisabled}
                                    rows = {3}
                                    onChange={(e) => setDiagnoses(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Form.Group id = "labResults">
                                <Form.Label>Lab Results</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={md.LabResults}
                                    disabled = {fieldsDisabled}
                                    rows = {3}
                                    onChange={(e) => setLabResults(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Form.Group id = "medicalHistory">
                                <Form.Label>Medical History</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={md.MedicalHistory}
                                    disabled = {fieldsDisabled}
                                    rows = {3}
                                    onChange={(e) => setMedicalHistory(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Form.Group id = "vitals">
                                <Form.Label>Vitals</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={md.Vitals}
                                    disabled = {fieldsDisabled}
                                    rows = {3}
                                    onChange={(e) => setVitals(e.target.value)}
                                    required
                                />
                                </Form.Group>
                                <Button onClick={(e)=> onEdit()}className="w-100 my-2" disabled={editDisabled}>Edit</Button>
                                <Button type="submit" className="w-100 my-2" disabled={fieldsDisabled}>Update Medical Record</Button>
                                <Button href = {`${path}`} disabled = {fieldsDisabled} className="w-100 my-2">Cancel</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    )
}

export default EditMedicalRecord
