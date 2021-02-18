import React,{useState} from 'react';
import Select from "react-select";
import {Link, withRouter, useLocation, useHistory} from 'react-router-dom';
import { useAuth } from '../util/Auth';
import MC from "./MC"
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { auth, firestore } from '../firebase';
import {useRouteMatch} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import IdleTimerContainer from '../util/IdleTimerContainer';

function ViewMPUI() {
    const {state} = useLocation();
    const {appointment} = state;
    //usestates
    const[medDocs, setMedDocs] = useState([]);
    const[Reason, setReason] = useState("");
    const[LabResult, setLabResult] = useState("");
    const[ConsultFee, setConsultFee] = useState(0);
    const[PrescriptionFee, setPrescriptionFee] = useState(0);
    const [error, setError] = useState("");  
    const[editDisabled, setEditDisabled] = useState(false);
    const[fieldsDisabled, setFieldsDisabled] = useState(true);
    const [medicines, setMedicines] = useState([]);
    const [medTests, setMedTests] = useState([]);

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
        fetchData()
    },[])

    const document = {...medDocs[0]};
    const assignedMed = [];
    const assignedMedTests = []

    for(var i = 0; i < medDocs.length; i++)
    {
        for(var j = 0; j < medDocs[i].prescriptions.length; j++)
        {
            assignedMed.push({...medDocs[i].prescriptions[j]});
        }
        for(var j = 0; j < medDocs[i].LabTests.length; j++)
        {
            assignedMedTests.push({...medDocs[i].LabTests[j]});
        }
    }
  
    function onEdit(){
        setEditDisabled(true);
        setFieldsDisabled(false);
        setReason(document.Reason);
        setLabResult(document.LabResults);
        setConsultFee(document.consultFee);
        setPrescriptionFee(document.prescriptionFee);
        setMedicines(document.prescriptions.map(md => ({...md})));
        setMedTests(document.LabTests.map(md => ({...md})));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let pFees = 0, tFees = 0;
        for(var i = 0; i < medicines.length; i++)
        {
            pFees += medicines[i].price;
        }
        for(var i = 0; i < medTests.length; i++)
        {
            tFees += medTests[i].price;
        }
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
            prescriptions: medicines,
            LabTests : medTests,
            prescriptionFee: parseFloat(pFees),
            testFee: parseFloat(tFees),
         })
         .then(() => {
            alert("Congratulations! Medical profile has been updated successfully.")
            window.location.reload();
         })
        }
        catch(error){
            setError(error.message);
        }
        setFieldsDisabled(true);
        setEditDisabled(false);
    }

    const drugList = [
        { label: 'Amoxicillin (Antibiotics)', value: 'Amoxicillin (Antibiotics)', price: 10 },
        { label: 'Abaloparatide Injection (Tymlos)', value: 'Abaloparatide Injection (Tymlos)', price: 10 },
        { label: 'Ablavar (Gadofosveset Trisodium Injection)', value: 'Ablavar (Gadofosveset Trisodium Injection)', price: 10 },
        { label: 'Abemaciclib Tablets (Verzenio)', value: 'Abemaciclib Tablets (Verzenio)', price: 10 },
        { label: 'Abstral (Fentanyl Sublingual Tablets)', value: 'Abstral (Fentanyl Sublingual Tablets)', price: 10 },
        { label: 'Adapalene Cream (Differin Cream)', value: 'Adapalene Cream (Differin Cream)' , price: 10},
        { label: 'Altace Capsules (Ramipril Capsules)', value: 'Altace Capsules (Ramipril Capsules)' , price: 10},
        { label: 'Benzonatate (Cough Syrup)', value: 'Benzonatate (Cough Syrup)', price: 10 },
        { label: 'Bempedoic acid and Ezetimibe Tablets (Nexlizet)', value: 'Bempedoic acid and Ezetimibe Tablets (Nexlizet)', price: 10 },
        { label: 'Braftovi (Encorafenib Capsules)', value: 'Braftovi (Encorafenib Capsules)', price: 10 },
        { label: 'Budeprion XL (Bupropion Hydrochloride Extended-Release Tablets)', value: 'Budeprion XL (Bupropion Hydrochloride Extended-Release Tablets)', price: 10 },
        { label: 'Cabometyx (Cabozantinib Tablets', value: 'Cabometyx (Cabozantinib Tablets', price: 10 },
        { label: 'Calcipotriene Cream (Dovonex Cream)', value: 'Calcipotriene Cream (Dovonex Cream)' , price: 10},
        { label: 'CeeNU (Lomustine Capsules)', value: 'CeeNU (Lomustine Capsules)' , price: 10},
        { label: 'Chlorzoxazone Tablets (Chlorzoxazone)', value: 'Chlorzoxazone Tablets (Chlorzoxazone)', price: 10 },
        { label: 'Dalfampridine Extended-Release Tablets (Ampyra)', value: 'Dalfampridine Extended-Release Tablets (Ampyra)', price: 10 },
        { label: 'Dapsone (Aczone Gel)', value: 'Dapsone (Aczone Gel)', price: 10 },
        { label: 'Darolutamide Tablets (Nubeqa)', value: 'Darolutamide Tablets (Nubeqa)', price: 10 },
        { label: 'Dojolvi (Triheptanoin Oral Liquid)', value: 'Dojolvi (Triheptanoin Oral Liquid)' , price: 10},
        { label: 'Edurant (Rilpivirine Tablets)', value: 'Edurant (Rilpivirine Tablets)' , price: 10},
        { label: 'Elestrin (Estradiol Gel)', value: 'Elestrin (Estradiol Gel)', price: 10 },
      ];

      const medicalTests = [
        { label: 'Blood Test', value: 'Blood Test', price: 100 },
        { label: 'X Ray Scan', value: 'X Ray Scan', price: 120 },
        { label: 'MRI Scan', value: 'MRI Scan', price: 220 },
        { label: 'Brain Scan', value: 'Brain Scan', price: 120 },
        { label: 'CT Scan', value: 'CT Scan', price: 220 },
        { label: 'Kidney Function Test', value: 'Kidney Function Test', price: 150 },
        { label: 'Liver Function Test', value: 'Liver Function Test', price: 150 },
        { label: 'Malabsorption Test', value: 'Malabsorption Test' , price: 80},
        { label: 'Pregnancy Test', value: 'Pregnancy Test' , price: 50 },
        { label: 'Syphillis Test', value: 'Syphillis Test', price: 75 },
        { label: 'Toxicology Test', value: 'Toxicology Test', price: 100 },
        { label: 'Urinanalysis', value: 'Urinanalysis', price: 10 },
        { label: 'Mammograhy', value: 'Mammograhy', price: 250 },
        { label: 'Ultrasound', value: 'Ultrasound' , price: 150},
        { label: 'Endoscopy', value: 'Endoscopy' , price: 200},
        { label: 'Skin Test', value: 'Skin Test', price: 200 },
        { label: 'Semen Analysis', value: 'Semen Analysis', price: 100 },
      ];

    return (
        <div>
            <IdleTimerContainer></IdleTimerContainer>
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
                    <Form.Group>
                        <Form.Label>Medical Prescriptions</Form.Label>
                        <Select options={drugList}
                        isMulti
                        isDisabled={fieldsDisabled}
                        value={!fieldsDisabled ? medicines : assignedMed}
                        onChange = {opt => setMedicines(opt ? (opt.map(doc => ({...doc}))):[])}/>
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
                        {!fieldsDisabled ? (medicines.map(md => 
                            <tr>
                                <td colSpan="3">{md.value}</td>
                                <td className="text-center">{md.price}</td>
                            </tr>
                        )):(assignedMed.map(md => 
                            <tr>
                                <td colSpan="3">{md.value}</td>
                                <td className="text-center">{md.price}</td>
                            </tr>
                        ))}
                        </tbody>
                        </table>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Medical Tests</Form.Label>
                        <Select options={medicalTests}
                        isMulti
                        isDisabled={fieldsDisabled}
                        value={!fieldsDisabled ? medTests : assignedMedTests}
                        onChange = {opt => setMedTests(opt ? (opt.map(doc => ({...doc}))):[])}/>
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
                        {!fieldsDisabled ? (medTests.map(md => 
                            <tr>
                                <td colSpan="3">{md.value}</td>
                                <td className="text-center">{md.price}</td>
                            </tr>
                        )):(assignedMedTests.map(md => 
                            <tr>
                                <td colSpan="3">{md.value}</td>
                                <td className="text-center">{md.price}</td>
                            </tr>
                        ))}
                        </tbody>
                        </table>
                        </div>
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
