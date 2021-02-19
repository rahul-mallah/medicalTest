import React,{useState} from 'react';
import { Card, Container, Button, Form, Alert } from 'react-bootstrap';
import {Link, useLocation, useHistory, useRouteMatch} from "react-router-dom";
import SearchBar from '../Patient/searchBar';
import {firestore } from '../firebase';
import { useAuth } from "../util/Auth"

function TransferMedicalRecord() {
    // react hooks
    const {state} = useLocation()
    const {md} = state
    const history = useHistory();

    const [doctors, setDoctors] = useState([]);
    const [searchDoc, setSearchDoc] = useState("");

    // fetches data on render
    React.useEffect(()=>{
        const fetchData = async () =>{
            firestore.collection("Medical Doctors")
           .get()
           .then(function(data){
                console.log(data)
                setDoctors(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            });
        };
        fetchData();
     }, [])

     // transfers records to selected doctor
     async function transferRecords(email){
        await firestore.collection("Medical Records").doc(md.id).update({
           AssignedDoc : email
        })
        .then(() => {
            alert("Transferred Successfully!");
            history.push("/MedDoc/PatientProfile");
         })
     }

     // filters data based on search field text
     let filteredDoc = doctors.filter(doc =>{
         return doc.Name.toLowerCase().includes(searchDoc);
     })

    return (
        <div>
            <Container>
                <Card>
                    <Card.Title as="h3" className="text-center mt-3"style={{fontWeight:"bolder",
                    textDecoration: "underline"
                }}>Transfer Medical Record</Card.Title>
                    <Card.Text className="mt-4 ml-3"style={{fontWeight:"bolder"}}>Patient Name : {md.Patient}</Card.Text>
                    <Card.Text className="ml-3" style={{fontWeight:"bolder"}}>Medical Record ID : {md.id}</Card.Text>
                    <Card.Title as="h4" className="text-center mt-3">Doctor List</Card.Title>
                    <div style={{
                        marginTop:"1%",
                        marginLeft:"30%"
                    }}>
                    <SearchBar handleChange={(e) => setSearchDoc(e.target.value)} placeholder = "Enter Doctor Name..."/>
                    </div>
                    <div style={{
                                marginTop: "1%",
                                maxHeight: "80vh",
                                overflowY: "scroll",
                            }}>
                        <table className="table table-bordered">
                        <thead>
                                <tr style={{
                                    backgroundColor:"violet",
                                    fontStyle : "italic"
                                }}>
                                <th scope="col" colSpan="3" width="78%">Doctor</th>
                                <th scope="col" className="text-center">Transfer Medical Record</th>
                                </tr>
                        </thead>
                        <tbody>
                        {filteredDoc.map(doc => 
                            <tr>
                                <td colSpan="3">{doc.Name}</td>
                                <td className="text-center"> <Button onClick={(e)=>transferRecords(doc.Email)}>Transfer Record</Button></td>
                            </tr>
                        )}
                        </tbody>
                        </table>
                        </div>
                </Card>
            </Container>
            
        </div>
    )
}

export default TransferMedicalRecord
