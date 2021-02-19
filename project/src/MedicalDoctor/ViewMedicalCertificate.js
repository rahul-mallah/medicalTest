import React,{useState} from 'react'
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import {useLocation} from "react-router-dom"
import { auth, firestore } from '../firebase';
import moment from 'moment';

function ViewMedicalCertificate() {
    // react hooks
    const {state} = useLocation();
    const {appointment} = state;
    const [medDocs, setMedDocs] = useState([]);
    const [doc, setDoc] = useState([]);

    // fetches data on render
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
            .where("Email","==",appointment.DocEmail)
            .get()
            .then(function(data){
               console.log(data)
               setDoc(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            }); 
        };
        fetchData();
    },[])
    
    const document = {...medDocs[0]};
    const doctor = {...doc[0]};

    return (
        <div className="text-center">
            {document.MedicalCertificate === "" ? <h1>NO MEDICAL CERTIFICATE</h1> : 
            <Container className="mb-5">
                <Card style={{backgroundColor:"#f9ffe8"}}>
                    <Card.Title  style = {{fontSize: '3rem',
                    fontFamily: 'times new roman',
                    fontWeight: 'bold',
                    marginTop: '5%',
                }}>Medical Certificate</Card.Title>
                <Card.Text className="mt-4" style={{fontSize: '1.5rem',
                fontFamily: 'times new roman',
                fontStyle: 'italic',
            }}>This is to certify that patient</Card.Text>
                <Card.Title className="mt-2" style={{fontSize: "2rem",
                fontFamily:'times new roman',
                fontWeight: 'bold',
            }}>{document.Patient}</Card.Title>
            <Card.Text className="mt-2" style={{fontSize: '1.5rem',
                fontFamily: 'times new roman',
                fontStyle: 'italic',
            }}>is unfit for duty for a period of {document.MedicalCertificate} days</Card.Text>
            <Card.Title  style = {{fontSize: '2rem',
                    fontFamily: 'times new roman',
                    fontWeight: 'lighter',
                    marginTop: '10px',
                }}>Medical Transcription</Card.Title>
            <Card.Text className="mt-2" style={{fontSize: '1.5rem',
                fontFamily: 'times new roman',
                fontStyle: 'italic',
            }}>This medical certificate has been issued on {document.MCStartDate} and is valid till {document.MCEndDate}</Card.Text>
            <Card.Img src={doctor.Signature}
            style={{maxWidth:"5%",
                    maxHeight: "5%",
                    marginLeft: "77%",
        }}
            ></Card.Img>
            <hr
                 style={{
                    color: 'black',
                    backgroundColor: 'black',
                    height: 3,
                    maxWidth: '20%',
                    align: "right",
                    marginLeft:"70%"
                }}/>
                <Card.Text className = "text-right"
                style ={{
                    fontFamily: 'sans-serif',
                    marginRight: '14%',
                    fontSize: '0.9rem'
                }}
                >{doctor.Name}</Card.Text>
                </Card>
                
            </Container>
            }
        </div>
    )
}

export default ViewMedicalCertificate
