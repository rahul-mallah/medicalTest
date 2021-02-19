import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { Button, Card,  Container } from "react-bootstrap";
import { useAuth } from '../util/Auth';
import { firestore } from '../firebase';
import IdleTimerContainer from '../util/IdleTimerContainer';

function ViewMyMPUI() {
   //react hooks
   const {currentUser} = useAuth();
   const [medDocs, setMedDocs] = useState([]);

   //fetches data on render
   React.useEffect(()=>{
      const fetchData = async () =>{
         firestore.collection("Medical Documents")
         .where("PatientEmail", "==", String(currentUser.email))
         .get()
         .then(function(data){
              console.log(data)
              setMedDocs(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
          })
      };
      fetchData();
   }, [])


    return (
       <div>
         <IdleTimerContainer></IdleTimerContainer>
         <Container>
            <Card>
               <Card.Title className="text-center" style={{
                  fontSize : "2rem",
                  marginTop: "2%"
               }}>View Your Medical Documents</Card.Title>
               <Card.Title style={{
                  marginTop: "4%",
                  marginLeft: '2%',
                  fontSize: '1.5rem',
               }}>List of Documents</Card.Title>
               <hr style={{
                    color: 'black',
                    backgroundColor: 'black',
                    height: 3,
                    maxWidth: '20%',
                    align: "right",
                    marginLeft: "1.5%",
                }}/>
                {medDocs.map(doc =>
                <Card style={{
                   maxWidth: "40rem",
                   marginLeft: "1.5%",
                   marginTop: "1%"
                }}>
                   <Card.Header as="h5">Date of Visit : {doc.DateOfVisit}</Card.Header>
                   <Card.Body>
                     {doc.MedicalCertificate === "" ?
                   <Card.Title>MC issued : No</Card.Title>: <Card.Title>MC issued : Yes</Card.Title>}
                   <Link to={{
                        pathname: '/Patient/ViewMedicalProfile', 
                        state:{document: doc}
            }}><Button style={{
                      marginTop: "3%",
                   }}>View Medical Document</Button></Link>
                   </Card.Body>
                </Card>
                )}
            </Card>
         </Container>
      </div>
    )
}

export default ViewMyMPUI