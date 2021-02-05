import React,{useState} from 'react'
import { Card, Container, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import SearchBar from '../Patient/searchBar';
import {firestore } from '../firebase';
import { useAuth } from "../util/Auth"

function ViewPatientProfileUI() {
    const { currentUser } = useAuth();
    const [patients, setPatients] = useState([]); 
    const [PatientRecs, setPatientRecs] = useState([]);
    const [createSearchVal, setCreateSearchVal] = useState("");
    const [viewSearchVal, setViewSearchVal] = useState("");

    React.useEffect(()=>{
        const fetchData = async () =>{
           firestore.collection("Medical Documents")
           .where("DocEmail", "==", String(currentUser.email))
           .get()
           .then(function(data){
                console.log(data)
                setPatients(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            });
            firestore.collection("Medical Records")
            .where("AssignedDoc", "==", String(currentUser.email))
           .get()
           .then(function(data){
                console.log(data)
                setPatientRecs(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
            });
        };
        fetchData();
     }, [])

    const arr = []
    const obj = {}

    for(const string of patients){
        if(!obj[string.PatientEmail]){
            arr.push(string)
            obj[string.PatientEmail] = true
        }
    }

    let filteredArr = arr.filter(doc =>{
        return doc.Patient.toLowerCase().includes(createSearchVal)
    })

    let filteredRec = PatientRecs.filter(doc =>{
        return doc.Patient.toLowerCase().includes(viewSearchVal)
    })

    return (
        <div>``
            <Container>
                <Card>
                    <Card.Title as = "h3" className="text-center mt-3">Create Medical Records For Patient Seen</Card.Title>
                    <div style={{
                        marginTop:"2%",
                        marginLeft:"30%"
                    }}>
                    <SearchBar handleChange={(e) => setCreateSearchVal(e.target.value)} placeholder = "Enter Patient Name..."/>
                    </div>
                    <Card.Body>
                    <div style={{
                                maxHeight: "60vh",
                                overflowY: "scroll",
                            }}>
                        <table className="table table-bordered">
                        <thead>
                                <tr style={{
                                    backgroundColor:"violet",
                                    fontStyle : "italic"
                                }}>
                                <th scope="col" colSpan="3" width="78%">Patient Name</th>
                                <th scope="col" className="text-center">Create Medical Records</th>
                                </tr>
                        </thead>
                        <tbody>
                        {filteredArr.map(pat => 
                            <tr>
                                <td colSpan="3">{pat.Patient}</td>
                                <td className="text-center"> <Link to={{
                        pathname: '/MedDoc/CreateMedicalRecord', 
                        state:{md: pat}
            }}><Button>Create Record</Button></Link></td>
                            </tr>
                        )}
                        </tbody>
                        </table>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
            <Container className="mt-5">
                <Card>
                    <Card.Title as = "h3" className="text-center mt-3">View Created Medical Records For Patients</Card.Title>
                    <div style={{
                        marginTop:"2%",
                        marginLeft:"30%"
                    }}>
                    <SearchBar handleChange={(e) => setViewSearchVal(e.target.value)} placeholder = "Enter Patient Name..."/>
                    </div>
                    <Card.Body>
                    <div style={{
                                maxHeight: "60vh",
                                overflowY: "scroll",
                            }}>
                        <table className="table table-bordered">
                        <thead>
                                <tr style={{
                                    backgroundColor:"violet",
                                    fontStyle : "italic"
                                }}>
                                <th scope="col" colSpan="3" width="78%">Patient Name</th>
                                <th scope="col" className="text-center">View/Edit/Transfer Medical Records</th>
                                </tr>
                        </thead>
                        <tbody>
                        {filteredRec.map(pat => 
                            <tr>
                                <td colSpan="3">{pat.Patient}</td>
                                <td className="text-center"> <Link to={{
                        pathname: '/MedDoc/EditMedicalRecord', 
                        state:{md: pat}
            }}><Button>View/Edit Record</Button></Link>
                            <Link to={{
                        pathname: '/MedDoc/TransferMedicalRecord', 
                        state:{md: pat}
            }}><Button className = "mt-2">Transfer</Button></Link>
                            </td>
                            </tr>
                        )}
                        </tbody>
                        </table>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default ViewPatientProfileUI
