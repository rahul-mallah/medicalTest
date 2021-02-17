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
      setFirstName("");
      setLastName("");
      setNRIC("");
      setEmail("");
      setError("");
      setLoading(false);
      setRole("");
      setDisabled(false);
      };

      const departmentList = [
         { label: 'General Practitioner (Non-specialist)', value: 'General Practitioner (Non-specialist)'},
         { label: 'Anesthesiology', value: 'Anesthesiology' },
         { label: 'Cardiology', value: 'Cardiology' },
         { label: 'Dermatology', value: 'Dermatology'},
         { label: 'Endocrinology', value: 'Endocrinology'},
         { label: 'Gastroenterology', value: 'Gastroenterology'},
         { label: 'Haematology', value: 'Haematology' },
         { label: 'Immunology', value: 'Immunology'},
         { label: 'Infectious Diseases', value: 'Infectious Diseases'},
         { label: 'Neurology', value: 'Neurology'},
         { label: 'Oncology', value: 'Oncology'},
         { label: 'Orthopaedic', value: 'Orthopaedic'},
         { label: 'Psychiatry', value: 'Psychiatry'},
         { label: 'Rheumatology', value: 'Rheumatology'},
         { label: 'Urology', value: 'Urology'},
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
                 <Form.Group id = "Avatar">
                  <Form.Label>Upload Image</Form.Label>
                        <Form.Control 
                       onChange = {onFileChange}        
                     type="file"/>
                     </Form.Group>
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
               

                     <Form.Group id = "AccountType">
                        <Form.Label>Role</Form.Label>
                     </Form.Group>

                     <select placeholder = "Select A Role" onChange = {(e)=> setRole(e.target.value)}>
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
                     onChange={(e) => setEducation(e.target.value)}
                     type="text" required/>

                     </Form.Group>
                     <Form.Group id = "Information">
                        <Form.Label>Information</Form.Label>
                        <Form.Control 
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
