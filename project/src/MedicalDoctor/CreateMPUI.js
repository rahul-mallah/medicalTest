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
            firestore.collection("Medical Doctors")
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
        { label: 'Medicine1', value: 'Medicine1', price: 10 },
        { label: 'Medicine2', value: 'Medicine2', price: 10 },
        { label: 'Medicine3', value: 'Medicine3', price: 10 },
        { label: 'Medicine4', value: 'Medicine4', price: 10 },
        { label: 'Medicine5', value: 'Medicine5' , price: 10},
        { label: 'Medicine6', value: 'Medicine6' , price: 10},
        { label: 'Medicine7', value: 'Medicine7', price: 10 },
        { label: 'Medicine8', value: 'Medicine8', price: 10 },
        { label: 'Medicine9', value: 'Medicine9', price: 10 },
        { label: 'Medicine10', value: 'Medicine10', price: 10 },
        { label: 'Medicine11', value: 'Medicine11' , price: 10},
        { label: 'Medicine12', value: 'Medicine12' , price: 10},
        { label: 'Medicine13', value: 'Medicine13', price: 10 },
        { label: 'Medicine14', value: 'Medicine14', price: 10 },
        { label: 'Medicine15', value: 'Medicine15', price: 10 },
        { label: 'Medicine16', value: 'Medicine16', price: 10 },
        { label: 'Medicine17', value: 'Medicine17' , price: 10},
        { label: 'Medicine18', value: 'Medicine18' , price: 10},
        { label: 'Medicine19', value: 'Medicine19', price: 10 },
        { label: 'Medicine20', value: 'Medicine20', price: 10 },
        { label: 'Medicine21', value: 'Medicine21', price: 10 },
        { label: 'Medicine22', value: 'Medicine22', price: 10 },
        { label: 'Medicine23', value: 'Medicine23' , price: 10},
        { label: 'Medicine24', value: 'Medicine24' , price: 10},
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
