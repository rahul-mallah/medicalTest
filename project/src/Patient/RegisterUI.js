import React, { useState, useRef } from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import { Link, useHistory} from 'react-router-dom';
import { auth, firestore } from '../firebase';
import moment from 'moment';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import {useAuth} from '../util/Auth'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import IdleTimerContainer from '../util/IdleTimerContainer'

function RegisterUI() {

   //useStates
   const [FirstName, setFirstName] = useState(""); 
   const [LastName, setLastName] = useState(""); 
   const [NRIC, setNRIC] = useState(""); 
   const [Address, setAddress] = useState(""); 
   const [DOB, setDOB] = useState(""); 
   const [Email, setEmail] = useState(""); 
   const [Telephone, setTelephone] = useState(""); 
   const [Password, setPassword] = useState(""); 
   const [ConfirmPassword, setConfirmPassword] = useState(""); 
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const history = useHistory();
   let URI = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URI : process.env.REACT_APP_PROD_URI;

   const FNameRef = useRef();
   const LNameRef = useRef();
   const NRICRef = useRef();
   const AddressRef = useRef();
   const DOBRef = useRef();
   const EmailRef = useRef();
   const TelephoneRef = useRef();
   const PasswordRef = useRef();
   const ConfirmPasswordRef = useRef();

   const {signup} = useAuth()
   const {currentUser} = useAuth()

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

   const submitCreateAlert = () => {
      confirmAlert({
        title: 'Congratulations!',
        message: 'Your account has been created successfully.',
        buttons: [
          {
            label: 'OK',
          },
        ]
      });
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
         await signup(Email, Password) 

         firestore.collection('Users').add({
            FirstName: FirstName,
            LastName: LastName,
            NRIC: NRIC,
            Address: Address,
            DOB: DOB,
            Email: Email.toLowerCase(),
            Telephone: Telephone,
            Role: "Patient",
         })
         .then(() => {
            submitCreateAlert()
         })

         // send email to user
         let details = {
            email: Email.toLowerCase(),
            user: FirstName + " " + LastName
         };
         let response = await fetch(URI+"/createAcc", {
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
      };

   return (
      <div style={{backgroundImage: `url("https://i.ibb.co/yRDqQHh/pexels-karolina-grabowska-4021769.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'}}>
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "500px"}}>
          <IdleTimerContainer></IdleTimerContainer>
            <Card>
             <Card.Body>
                 <h2 className= "text-center mb-4">Create your Account</h2>
                 {error && <Alert variant="danger">{error}</Alert>}
                 <Form onSubmit={handleSubmit}>
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
                     <Form.Group id = "NRIC">
                        <Form.Label>NRIC</Form.Label>
                        <Form.Control
                        ref={NRICRef}
                        value={NRIC}
                        onChange={(e) => setNRIC(e.target.value)} 
                        pattern = "[s S| t T | f F | g G][0-9]{7}[a-z A-Z]"
                        title = "Please enter according to NRIC format"
                        type="text" required/>
                     </Form.Group>
                     <Form.Group id = "Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        ref={AddressRef}
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)} 
                        type="text" required/>
                     </Form.Group>
                     <Form.Group id = "DOB">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control 
                        ref={DOBRef}
                        value={DOB}
                        max={moment().format("YYYY-MM-DD")}
                        onChange={(e) => setDOB(e.target.value)} 
                        type="date" required/>
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
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/"><u>Login!</u></Link>
            </div>
             </Card.Body>
            </Card>
            </div>
            </Container>
        </div>
   )
}

export default RegisterUI
