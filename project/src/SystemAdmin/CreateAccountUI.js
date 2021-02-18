import React, { useState, useRef } from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import { useHistory} from 'react-router-dom';
import { auth, firestore, storageRef } from '../firebase';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import IdleTimerContainer from '../util/IdleTimerContainer'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Select from 'react-select';

function CreateAccountUI() {

   //useStates
   const [fileUrl, setFileUrl] = React.useState(null);
   const [FirstName, setFirstName] = useState(""); 
   const [LastName, setLastName] = useState(""); 
   const [NRIC, setNRIC] = useState(""); 
   const [Email, setEmail] = useState(""); 
   const [Role, setRole] = useState("");
   const [specialist, setSpecialist] = useState(""); 
   const [information, setInformation] = useState(""); 
   const [education, setEducation] = useState(""); 
   const [department, setDepartment] = useState("");
   const [disabled, setDisabled] = useState(true) 


   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const FNameRef = useRef();
   const LNameRef = useRef();
   const EmailRef = useRef();

 
   

   const onFileChange = async (e) => {
      const file = e.target.files[0];
      const sRef = storageRef
      const fileRef = sRef.child("MedicalStaff/" + file.name);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    };
    


   const submitCreateAlert = () => {
      confirmAlert({
        title: 'Congratulations!',
        message: 'Account has been created successfully.',
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

      if (Role === "" || Role === "Select A Role") {
         return setError("Not A Valid Role")
      }

      try{
         setError("");
         setLoading(true);
         
         await firestore.collection('Users').add({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email.toLowerCase(),
            Role: Role
         })

         await firestore.collection('Medical Staff').add({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email.toLowerCase(),
            Role: Role
         })

         if (Role === "Medical Doctor"){
            await firestore.collection('Medical Doctors').add({
               Image: fileUrl,
               Name: FirstName + " " + LastName,
               Email: Email.toLowerCase(),
               Role: Role,
               Specialist: specialist,
               Education: education,
               Information: information,
               Department: department
            })
            .then(() => {
               submitCreateAlert()
            })
         }

         if (Role === "Medical Admin"){
            await firestore.collection('Medical Administrator').add({
               Name: FirstName + " " + LastName,
               Email: Email.toLowerCase(),
               Role: Role
            })
            .then(() => {
               submitCreateAlert()
            })
         }

         // send email to user
         let details = {
            email: Email.toLowerCase(),
            user: FirstName + " " + LastName
         };
         let response = await fetch("http://localhost:5000/createAcc", {
            method: "POST",
            headers: {
               "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(details)
         });
         let result = await response.json();
         console.log(result.status);
      } catch(error){
         return setError(error.message);
         
      }
      setLoading(false);
      setDisabled(false);
      };

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
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "500px"}}>
          <IdleTimerContainer></IdleTimerContainer>
            <Card>
             <Card.Body>
                 <h2 className= "text-center mb-4">Create Medical Staff Account</h2>
                 {error && <Alert variant="danger">{error}</Alert>}
                 <Form onSubmit={handleSubmit}>
                 {Role==="Medical Doctor"?(
                 <Form.Group id = "Avatar">
                  <Form.Label>Upload Image</Form.Label>
                        <Form.Control 
                       onChange = {onFileChange}        
                     type="file"/>
                     </Form.Group>
                 ):null}
                     <Form.Group id = "FirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                        ref={FNameRef}
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        pattern = "^[a-z A-Z .]+$"
                        title = "Please enter character in the range a-z OR A-Z"
                        type="text" required/>
                     </Form.Group>
                     <Form.Group id = "LastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                        ref={LNameRef}
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                        pattern = "^[a-z A-Z]+$"
                        title = "Please enter character in the range a-z OR A-Z"
                        type="text" required/>
                     </Form.Group>
                     <Form.Group id = "Email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                        ref={EmailRef}
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" required/>
                     </Form.Group>
               

                     <Form.Group className = "mb-0" id = "AccountType" style = {{
                           marginTop: "1%",
                     }}>
                        <Form.Label>Role</Form.Label>
                     </Form.Group>

                     <select className = "my-3" placeholder = "Select A Role" onChange = {(e)=> setRole(e.target.value)}>
                        <option disabled = "disabled" selected = "selected">Select A Role</option>
                        <option>Medical Doctor</option>
                        <option>Medical Admin</option>
                     </select>
                     {Role==="Medical Doctor"?(
                        <div>
                     <Form.Group id = "Specialist">
                     <Form.Label>Specialist</Form.Label>
                     <Form.Control 
                     onChange={(e) => setSpecialist(e.target.value)}
                     type="text" required/>
                     </Form.Group>

                     <Form.Group id = "Education">
                     <Form.Label>Education</Form.Label>
                     <Form.Control 
                     as = "textarea"
                     rows = {3}
                     onChange={(e) => setEducation(e.target.value)}
                     type="text" required/>

                     </Form.Group>
                     <Form.Group id = "Information">
                        <Form.Label>Information</Form.Label>
                        <Form.Control 
                        as = "textarea"
                        rows = {3}
                        onChange={(e) => setInformation(e.target.value)}
                        type="text" required/>
                     </Form.Group>

                     <Select options={departmentList}
                     onChange = {(e)=> setDepartment(e.value)}
                        />
                     </div> 
                                                              
                     ):null}
                    
                     <hr  style={{
                                borderColor : '#000000',
                                marginTop : '50px'
                            }}/>
                     <Button className="w-100" type="submit">Create Account</Button>
                     <Button disabled = {disabled} className="w-100 my-2" type="submit" target="_blank" href="https://console.firebase.google.com/u/0/project/myappointment-bb30e/authentication/users">Set Up Authentication</Button>
                 </Form>
             </Card.Body>
            </Card>
            </div>
            </Container>
   )
}

export default CreateAccountUI
