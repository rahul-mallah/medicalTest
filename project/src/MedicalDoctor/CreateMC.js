import React,{useState, useRef} from 'react'
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import moment from 'moment';
import "./CreateMC.css";
import {Link, withRouter, useLocation, useHistory} from 'react-router-dom';
import { useAuth } from '../util/Auth';
import MC from "./MC";
import { auth, firestore, storageRef } from '../firebase';
import IdleTimerContainer from '../util/IdleTimerContainer';

function CreateMC() {
    const{state} = useLocation();
    const{appointment} = state;
    const[noOfDays, setNoOfDays] = useState(1);
    const[doc, setDoc] = useState([]);
    const[document,setDocument] = useState([]);
    const[imageURL, setImageURL] = useState(null);
    const history = useHistory();
    const sigCanvas = useRef({});
    
    React.useEffect(()=>{
        const fetchData = async () =>{
            firestore.collection("Medical Doctors").limit(1)
            .where("Email","==",appointment.DocEmail)
            .get()
            .then(function(data){
               console.log(data)
               setDoc(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            })
            firestore.collection("Medical Documents")
            .where("appointmentID","==",appointment.id)
            .get()
            .then(function(data){
               console.log(data)
               setDocument(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            })
        };
        fetchData()
    },[])

    

    const doctor = {...doc[0]};
    const clear = () => sigCanvas.current.clear();
    let img = doctor.Signature

    const save = () => {
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
        img = imageURL
    }
    
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (noOfDays-1));

    const saveToDataBase = async () => {
        await firestore.collection("Medical Doctors").doc(doctor.id).update({
            Signature: imageURL
        })
        .then(() =>{
            alert('Signature has been updated successfully')
        })
        window.location.reload();
        
    }

    const saveMC = async () => {
        await firestore.collection("Medical Documents").doc(document[0].id).update({
            MedicalCertificate : noOfDays,
            MCStartDate : moment(startDate).format("DD/MM/YYYY"),
            MCEndDate : moment(endDate).format("DD/MM/YYYY")
        })
        .then(() =>{
            alert("Medical Certificate Created Successfully");
        })
        history.push({
            pathname: "/MedDoc/Schedule",
            state: {doctor: doctor}
        })
    }

    return (
        <div>
            <IdleTimerContainer></IdleTimerContainer>
            <Container className="d-flex align-items-center justify-content-center">
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">Generate MC</Card.Title>
                        <Form>
                            <Form.Group id = "days">
                            <Form.Label>Enter Number of Days</Form.Label>
                            <Form.Control
                                defaultValue = "1"
                                type="number"
                                min='1'
                                onChange={(e) => setNoOfDays(e.target.value)}
                                required
                            />
                            </Form.Group>
                            <Popup modal
                                trigger={<Button className="mt-3 mb-3">Click To Update Your Digital Signature</Button>}
                                closeOnDocumentClick={false}>
                                    {close => (
                                        <>
                                        <SignaturePad
                                            ref={sigCanvas}
                                            canvasProps={{
                                            className: "signatureCanvas"
                                            }}
                                        />
                                    {/* Button to trigger save canvas image */}
                                        <Button onClick={save}>Save</Button>
                                        <Button onClick={clear}>Clear</Button>
                                        <Button onClick={close}>Close</Button>
                                        </>
                                 )}
                                </Popup>
                                <Form.Group>
                                <Card.Img src={imageURL} height="200px"></Card.Img>
                                </Form.Group>
                                <Form.Group>
                                <Button onClick={(e)=> {saveToDataBase()}}>Save Your Signature</Button>
                                </Form.Group>
                                <Form.Group>
                                <Button onClick={(e)=> {saveMC()}} className="mt-3">Generate MC</Button>
                                </Form.Group>
                        </Form>

                    </Card.Body>
                </Card>
             </div>
             <MC imageURL={doctor.Signature} name={appointment.Patient} days={noOfDays}
                startDate={startDate} endDate={endDate} doctor={doctor}
                 />
             </Container>
        </div>
    )
}

export default CreateMC
