import React, { useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from '../util/Auth';
import {firestore } from '../firebase';
import moment from 'moment';
import {useRouteMatch, useLocation} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import IdleTimerContainer from '../util/IdleTimerContainer'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Select from 'react-select';


function ViewIndividualAccountUI() {

   const [FirstName, setFirstName] = useState(""); 
   const [LastName, setLastName] = useState(""); 
   const [NRIC, setNRIC] = useState(""); 
   const [Address, setAddress] = useState(""); 
   const [DOB, setDOB] = useState(""); 
   const [Email, setEmail] = useState(""); 
   const [Telephone, setTelephone] = useState(""); 
   const [error, setError] = useState("");
   const [doctor, setDoctor] = useState([]);
   const [medicalAdmin, setMedicalAdmin] = useState([]);
   const [medicalStaff, setMedicalStaff] = useState([]);
   const [loading, setLoading] = useState(false)

   const [enableFields, setEnableFields] = useState(true);
   const [editEnabled, setEditEnabled] = useState(false);
   const[updateEnabled, setUpdateEnabled] = useState(true);
   const { currentUser } = useAuth();
   const { updateEmail } = useAuth();
   const [Users, setUsers] = useState([]);
   const [specialist, setSpecialist] = useState(""); 
   const [information, setInformation] = useState(""); 
   const [education, setEducation] = useState(""); 
   const [department, setDepartment] = useState("");

   const {path} = useRouteMatch();

   const {state} = useLocation();
   const {user} = state;  
   let history = useHistory();
   


   React.useEffect(()=>{
      const fetchData = async () =>{
         firestore.collection("Medical Doctors").limit(1)
         .where("Email", "==", String(user.Email))
         .get()
         .then(function(data){
            console.log(data)
               setDoctor(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
         }); 

         firestore.collection("Medical Admin").limit(1)
         .where("Email", "==", String(user.Email))
         .get()
         .then(function(data){
            console.log(data)
            setMedicalAdmin(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
         }); 


         firestore.collection("Medical Staff").limit(1)
         .where("Email", "==", String(user.Email))
         .get()
         .then(function(data){
            console.log(data)
            setMedicalStaff(data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
         }); 

      };
      fetchData();
   }, [])

   const doc = {...doctor[0]}
   const ma = {...medicalAdmin[0]}
   const ms = {...medicalStaff[0]}


   function onEdit(){
      setEditEnabled(true);
      setUpdateEnabled(false);
      setEnableFields(false);
      setFirstName(user.FirstName);
      setLastName(user.LastName);
      setNRIC(user.NRIC);
      setDOB(user.DOB);
      setAddress(user.Address);
      setEmail(user.Email);
      setTelephone(user.Telephone);
      setInformation(doc.Information);
      setSpecialist(doc.Specialist);
      setEducation(doc.Education);
      setDepartment(doc.Department);
   }

   const submitUpdateAlert = () => {
      confirmAlert({
        title: 'Congratulations!',
        message: user.Role + ' account has been updated successfully.',
        buttons: [
          {
            label: 'OK',
          },
        ]
      });
    };

   //handle submit
   const handleSubmit = async (e) => {
      e.preventDefault();

      try{
         setError("");
         setLoading(true);

         if (user.Role === "Medical Doctor"){
            await firestore.collection('Medical Doctors').doc(doc.id).update({
               Name: FirstName + " " + LastName,
               Email: Email.toLowerCase(),
               Specialist: specialist,
               Education: education,
               Information: information,
               Department: department
            })
            await firestore.collection('Medical Staff').doc(ms.id).update({
               FirstName: FirstName,
               LastName: LastName,
               Email: Email.toLowerCase(),
            })
            .then(() => {
               submitUpdateAlert()
            })
         }
         if (user.Role === "Patient"){
            firestore.collection("Users").doc(user.id)
            .update({
               FirstName: FirstName,
               LastName: LastName,
               NRIC: NRIC,
               Address: Address,
               DOB: DOB,
               Telephone: Telephone
            })
            .then(() => {
               submitUpdateAlert()
            })
         }
      } catch(error){
         return setError(error.message); 
      }
      setEnableFields(true);
      setUpdateEnabled(true);
      setEditEnabled(false);
   }
   

   const departmentList = [
      { label: 'General Practitioner (Non-specialist) Level 1 Unit 01-1', value: 'General Practitioner (Non-specialist) Level 1 01-1'},
      { label: 'Anesthesiology Level 2 Unit 02-1', value: 'Anesthesiology Level 1 Unit 02-1'},
      { label: 'Cardiology Level 3 Unit 03-1', value: 'Cardiology Level 3 Unit 03-1' },
      { label: 'Dermatology Level 4 Unit 04-1', value: 'Dermatology Level 4 Unit 04-1'},
      { label: 'Endocrinology Level 5 Unit 05-1', value: 'Endocrinology Level 5 Unit 05-1'},
      { label: 'Gastroenterology Level 6 Unit 06-1', value: 'Gastroenterology Level 6 Unit 06-1'},
      { label: 'Haematology Level 7 Unit 07-1', value: 'Haematology Level 7 Unit 07-1' },
      { label: 'Immunology Level 8 Unit 08-1', value: 'Immunology Level 8 Unit 08-1'},
      { label: 'Infectious Diseases Level 9 Unit 09-1', value: 'Infectious Diseases Level 9 Unit 09-1'},
      { label: 'Neurology Level 10 Unit 10-1', value: 'Neurology Level 10 Unit 10-1'},
      { label: 'Oncology Level 11 Unit 11-1', value: 'Oncology Level 11 Unit 11-1'},
      { label: 'Orthopaedic Level 12 Unit 12-1', value: 'Orthopaedic Level 12 Unit 12-1'},
      { label: 'Psychiatry Level 13 Unit 13-1', value: 'Psychiatry Level 13 Unit 13-1'},
      { label: 'Rheumatology Level 14 Unit 14-1', value: 'Rheumatology Level 14 Unit 14-1'},
      { label: 'Urology Level 15 Unit 15-1', value: 'Urology Level 15 Unit 15-1'},
    ];

   return (
      <>
      <div>
      <IdleTimerContainer></IdleTimerContainer>
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{Width: "60%"}}>
            <Card>
             <Card.Body>
                 <h2 className= "text-center mb-4">{user.Role} Account</h2>
                 {error && <Alert variant="danger">{error}</Alert>}
                 <Form onSubmit={handleSubmit}>
                     <Form.Group id = "FirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                        defaultValue = {user.FirstName} 
                        disabled = {true} 
                        onChange={(e) => setFirstName(e.target.value)}
                        pattern = "^[a-z A-Z]+$"
                        title = "Please enter character in the range a-z OR A-Z"
                        type="text" required/>
                     </Form.Group>
                     <Form.Group id = "LastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                        defaultValue = {user.LastName} 
                        disabled = {true} 
                        onChange={(e) => setLastName(e.target.value)}
                        pattern = "^[a-z A-Z]+$"
                        title = "Please enter character in the range a-z OR A-Z"
                        type="text" required/>
                     </Form.Group>
                     {user.Role === "Patient"?
                     <div>
                        <Form.Group id = "NRIC">
                        <Form.Label>NRIC</Form.Label>
                        <Form.Control 
                        defaultValue = {user.NRIC} 
                        disabled = {true} 
                        onChange={(e) => setNRIC(e.target.value)}
                        pattern = "[s S | t T | f F | g G][0-9]{7}[a-z A-Z]"
                        title = "Please enter according to NRIC format"
                        type="text" required/>
                     </Form.Group>

                     <Form.Group id = "Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        defaultValue = {user.Address} 
                        disabled = {enableFields} 
                        onChange={(e) => setAddress(e.target.value)}
                        type="text" required/>
                     </Form.Group>

                     <Form.Group id = "DOB">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control 
                        defaultValue = {user.DOB} 
                        disabled = {true}
                        max={moment().format("YYYY-MM-DD")}
                        onChange={(e) => setDOB(e.target.value)}
                        type="date" required/>
                     </Form.Group>

                     <Form.Group id = "Telephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control 
                        defaultValue = {user.Telephone} 
                        disabled = {enableFields} 
                        onChange={(e) => setTelephone(e.target.value)}
                        pattern = "[0-9]{8}"
                        title = "Please enter 8 digits"
                        type="invalid" required/>
                     </Form.Group>
                     </div>
                     :null}
                     <Form.Group id = "Email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                        defaultValue = {user.Email} 
                        disabled = {true} 
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" required/>
                     </Form.Group>
                     
                     {user.Role === "Medical Doctor"?
                     (
                     <div>
                     <Form.Group id = "Specialist">
                     <Form.Label>Specialist</Form.Label>
                     <Form.Control 
                     defaultValue = {doc.Specialist}
                     onChange={(e) => setSpecialist(e.target.value)}
                     disabled = {enableFields}
                     type="text" required/>
                     </Form.Group>

                     <Form.Group id = "Education">
                     <Form.Label>Education</Form.Label>
                     <Form.Control 
                     as = "textarea"
                     rows = {3}
                     defaultValue = {doc.Education}
                     onChange={(e) => setEducation(e.target.value)}
                     disabled = {enableFields}
                     type="text" required/>

                     </Form.Group>
                     <Form.Group id = "Information">
                        <Form.Label>Information</Form.Label>
                        <Form.Control 
                        as = "textarea"
                        rows = {3}
                        defaultValue = {doc.Information}
                        onChange={(e) => setInformation(e.target.value)}
                        disabled = {enableFields}
                        type="text" required/>
                     </Form.Group>

                     <Select options={departmentList}
                     isDisabled = {enableFields}
                     defaultValue = {{label: doc.Department, value: doc.Department }}
                     onChange = {(e)=> setDepartment(e.value)}
                     />
                     </div>


                     ):null}
                     
                     <Button onClick={onEdit} disabled = {editEnabled} className="w-100 my-2">Edit</Button>
            
                     <Button disabled = {updateEnabled} className="w-100 my-2" type="submit">Update</Button>
                  
                     <Button href = {`${path}`} disabled = {updateEnabled} className="w-100 my-2">Cancel</Button>   
                 </Form>
             </Card.Body>
            </Card>
            </div>
            </Container>
            
      </div>
      </>
   )
}

export default ViewIndividualAccountUI
