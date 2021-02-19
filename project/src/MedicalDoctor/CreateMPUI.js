import React,{useState} from 'react';
import Select from "react-select";
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
    const[doctor, setDoctor] = useState([]);
    const[medDocs, setMedDocs] = useState([]);
    const[Reason, setReason] = useState("");
    const[LabResult, setLabResult] = useState("");
    const[ConsultFee, setConsultFee] = useState(0);
    const[PrescriptionFee, setPrescriptionFee] = useState(0);
    const [error, setError] = useState("");                
    const [MCDisabled, setMCDisabled] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [medTests, setMedTests] = useState([]);

    React.useEffect(()=>{
        const fetchData = async () =>{
            firestore.collection("Medical Documents")
            .where("appointmentID","==",appointment.id)
            .get()
            .then(function(data){
               console.log(data)
               setMedDocs(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            }); 
            firestore.collection("Medical Doctors").limit(1)
            .where("Email","==",String(appointment.DocEmail))
            .get()
            .then(function(data){
               console.log(data)
               setDoctor(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            }); 
        };
        fetchData();
    },[])

    const doc = {...doctor[0]};

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

        let cFee = 0;
        if(doc.Department.includes("General Practitioner"))
            cFee = 50;
        else
            cFee = 100;

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
            await firestore.collection("Medical Documents").add({
                appointmentID: appointment.id,
                Patient: appointment.Patient,
                PatientEmail: appointment.PatientEmail,
                DocEmail: appointment.DocEmail,
                Reason: Reason,
                DateOfVisit: appointment.Date,
                LabResults: LabResult,
                prescriptions: medicines,
                LabTests : medTests,
                consultFee: parseFloat(cFee),
                prescriptionFee: parseFloat(pFees),
                testFee: parseFloat(tFees),
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
            setMedicines([]);
            setMedTests([]);
            setConsultFee(0);
            setPrescriptionFee(0);
            setMCDisabled(false);
            setBtnDisabled(true);
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
                    <Form.Group>
                        <Form.Label>Medical Prescriptions</Form.Label>
                        <Select options={drugList}
                        isMulti
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
                        {medicines.map(md => 
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
                        <Select options={medicalTests}
                        isMulti
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
                        {medTests.map(md => 
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
                        value = {LabResult}
                        rows = {3}
                        onChange={(e) => setLabResult(e.target.value)}
                        required
                    />
                    </Form.Group>
                    <hr/>
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
