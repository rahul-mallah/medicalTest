import React, { useState, useRef } from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import { useHistory} from 'react-router-dom';
import { auth, firestore, storageRef } from '../firebase';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import IdleTimerContainer from '../util/IdleTimerContainer'

function CreateAccountUI() {

   //useStates
   const [fileUrl, setFileUrl] = React.useState(null);
   const [FirstName, setFirstName] = useState(""); 
   const [LastName, setLastName] = useState(""); 
   const [NRIC, setNRIC] = useState(""); 
   const [Address, setAddress] = useState(""); 
   const [DOB, setDOB] = useState(""); 
   const [Email, setEmail] = useState(""); 
   const [Telephone, setTelephone] = useState(""); 
   const [Role, setRole] = useState("");
   const [Password, setPassword] = useState(""); 
   const [ConfirmPassword, setConfirmPassword] = useState(""); 
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const history = useHistory();

   const FNameRef = useRef();
   const LNameRef = useRef();
   const NRICRef = useRef();
   const AddressRef = useRef();
   const DOBRef = useRef();
   const EmailRef = useRef();
   const TelephoneRef = useRef();
   const PasswordRef = useRef();
   const ConfirmPasswordRef = useRef();

   const RoleRef = useRef();

   // Check Validity
   const isNumber = /\d/;
   const isSpecChar = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
   const isLower = /[a-z]/;
   const isUpper = /[A-Z]/;

   const [passwordFocused, setPasswordFocused] = useState(false);
   const [passwordValidity, setPasswordValidity] = useState ({
      minChar: null,
      lower: null,
      upper: null,
      number: null,
      specialChar: null
   });

   const onFileChange = async (e) => {
      const file = e.target.files[0];
      const sRef = storageRef
      const fileRef = sRef.child(file.name);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL());
    };
    

   const onChangePassword = password =>
   {
      setPassword(password);
      setPasswordValidity({
         minChar: password.length >=8 ? true : false,
         lower: isLower.test(password) ? true : false,
         upper: isUpper.test(password) ? true : false,
         number: isNumber.test(password) ? true : false,
         specialChar: isSpecChar.test(password) ? true : false
      })
   }

   //handle submit
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (Role === "" || Role === "Select A Role") {
         return setError("Not A Valid Role")
      }
      
      if(Password !== ConfirmPassword)
      {
         return setError("Passwords do not match")
      }

      if (passwordValidity.minChar == false || passwordValidity.lower == false || passwordValidity.upper == false || passwordValidity.number == false || passwordValidity.specialChar == false)
      {
         return setError("Password do not meet the requirement");
      }

      try{
         setError("");
         setLoading(true);
         await auth.createUserWithEmailAndPassword(Email, Password)

         
         
         await firestore.collection('Users').add({
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
               Role: Role
            })
            .then(() => {
               alert("Account Registered Successfully!");
            })
         }

         if (Role === "Medical Admin"){
            await firestore.collection('Medical Administrator').add({
               Image: fileUrl,
               Name: FirstName + " " + LastName,
               Email: Email.toLowerCase(),
               Role: Role
            })
            .then(() => {
               alert("Account Registered Successfully!");
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
      setAddress("");
      setDOB("");
      setEmail("");
      setTelephone("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      setLoading(false);
      setPasswordFocused(false);
      setRole("");
      };

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
                     type="file" required/>
                     </Form.Group>
                     <Form.Group id = "FirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                        ref={FNameRef}
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        pattern = "^[a-z A-Z]+$"
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
                     <Form.Group id = "Telephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control 
                        ref={TelephoneRef}
                        value={Telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        pattern = "[0-9]{8}"
                        title = "Please enter 8 digits"
                        type="invalid" required/>
                     </Form.Group>

                     <Form.Group id = "AccountType">
                        <Form.Label>Role</Form.Label>
                     </Form.Group>

                     <select placeholder = "Select A Role" onChange = {(e)=> setRole(e.target.value)}>
                        <option disabled = "disabled" selected = "selected">Select A Role</option>
                        <option>Medical Doctor</option>
                        <option>Medical Admin</option>
                     </select>

                     <hr  style={{
                                borderColor : '#000000',
                                marginTop : '50px'
                            }}/>
                     <Form.Group id = "Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        ref={PasswordRef}
                        value={Password}
                        onFocus = {() => setPasswordFocused(true)}
                        onChange={(e) => onChangePassword(e.target.value)} 
                        type="password" required/>
                     </Form.Group>
                     <Form.Group id = "ConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                        ref={ConfirmPasswordRef}
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        type="password" required/>
                     </Form.Group>

                     { passwordFocused && <PasswordStrengthIndicator validity={passwordValidity}/>}

                     <Button className="w-100" type="submit">Sign Up</Button>
                 </Form>
             </Card.Body>
            </Card>
            </div>
            </Container>
   )
}

export default CreateAccountUI
