import React,{useState} from 'react'
import {Card, Container} from "react-bootstrap";
import {useLocation} from "react-router-dom"
import {firestore } from '../firebase';
import IdleTimerContainer from '../util/IdleTimerContainer';

function ViewReceipt() {
    //react hooks
    const {state} = useLocation();
    const {document} = state;
    const [doc, setDoc] = useState([]);

    //fetches data on render
    React.useEffect(()=>{
        const fetchData = async () =>{
            firestore.collection("Medical Doctors").limit(1)
            .where("Email","==",document.DocEmail)
            .get()
            .then(function(data){
               console.log(data)
               setDoc(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            }); 
        };
        fetchData();
    },[])

    const doctor = {...doc[0]};
    // perform receipt calculation
    const gst = (document.consultFee+document.prescriptionFee+document.testFee)*0.07
    const grandTotal = (document.consultFee+document.prescriptionFee+document.testFee)+gst

    return (
        <div>
            <IdleTimerContainer></IdleTimerContainer>
            <Container className="my-5" style={{maxWidth:"800px"}}>
                <Card>
                    <Card.Header as="h3" className="text-right" style ={{
                        fontFamily : 'helvetica',
                        color: "violet",
                    }}>Receipt</Card.Header>
                    <Card.Body>
                        <Card.Title as="h4" className="text-center" style={{
                            fontFamily:"helvetica",
                            fontStyle: "italic",
                        }}>MyAppointment System</Card.Title>
                        <Card.Title as="h5">Patient Name : {document.Patient}</Card.Title>
                        <Card.Text>Date of Visit : {document.DateOfVisit}</Card.Text>
                        <Card.Text>Appointment ID : {document.appointmentID}</Card.Text>
                        <hr style={{
                            color: 'black',
                            backgroundColor: 'green',
                            height: 1,
                            align: "right",
                        }}/>
                        <table className="table table-bordered">
                            <thead>
                                <tr style={{
                                    backgroundColor:"lime",
                                    fontStyle : "italic"
                                }}>
                                <th scope="col" colSpan="3" width="78%">Description</th>
                                <th scope="col" className="text-center">Amount ($ SGD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {document.consultFee!==0 ? (
                                <tr>
                                <td colSpan="3">Consulation Fees</td>
                                <td className="text-center">{document.consultFee}</td>
                                </tr>): null}
                                {document.prescriptionFee!==0 ? (
                                <tr>
                                <td colSpan="3">Prescriptions Fees<br/><ul>{document.prescriptions.map(md=>
                                    <li className="ml-4">{md.label} - ${md.price}</li>)}</ul></td>
                                <td className="text-center">{document.prescriptionFee}</td>
                                </tr>): null}
                                {document.testFee!==0 ? (
                                <tr>
                                <td colSpan="3">Test Fees<br/><ul>{document.LabTests.map(md=>
                                    <li className="ml-4">{md.label} - ${md.price}</li>)}</ul></td>
                                <td className="text-center">{document.testFee}</td>
                                </tr>): null}
                                <tr>
                                <td colSpan="3"style={{fontWeight:"bolder"}}>GST 7 %</td>
                                <td style={{fontWeight:"bolder"}}className="text-center">{gst.toFixed(2)}</td>
                                </tr>
                                <tr>
                                <td colSpan="3"style={{fontWeight:"bolder",
                                fontSize: "1.3rem",
                            }}>Grand Total</td>
                                <td style={{fontWeight:"bolder",fontSize:"1.3rem"}}className="text-center">{grandTotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                            </table>
                            <hr className="my-1" style={{
                            color: 'black',
                            backgroundColor: 'green',
                            height: 1,
                            align: "right",
                        }}/>
                    </Card.Body>
                    <Card.Footer className="text-right" style={{
                        color:"violet"
                    }}>Auto Generated Receipt</Card.Footer>
                </Card>
            </Container>
        </div>
    )
}

export default ViewReceipt
