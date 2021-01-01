import React, { useState, useRef } from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import { Link, useHistory} from 'react-router-dom';
import { auth, firestore } from '../firebase';

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

   const FNameRef = useRef();
   const LNameRef = useRef();
   const NRICRef = useRef();
   const AddressRef = useRef();
   const DOBRef = useRef();
   const EmailRef = useRef();
   const TelephoneRef = useRef();
   const PasswordRef = useRef();
   const ConfirmPasswordRef = useRef();

   //handle submit
   const handleSubmit = async (e) => {
      e.preventDefault();
      
      if(Password !== ConfirmPassword)
      {
         return setError("Passwords do not match")
      }
      try{
         setError("");
         setLoading(true);
         await auth.createUserWithEmailAndPassword(Email, Password)
         
         firestore.collection('Users').add({
            FirstName: FirstName,
            LastName: LastName,
            NRIC: NRIC,
            Address: Address,
            DOB: DOB,
            Email: Email.toLowerCase(),
            Telephone: Telephone
         })
         .then(() => {
            alert("Account Registered Successfully!");
         })
      } catch(error){
         setError(error.message);
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
      };

   return (
      <div style={{backgroundImage: `url("https://i.ibb.co/yRDqQHh/pexels-karolina-grabowska-4021769.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'}}>
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "500px"}}>
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
                        pattern = "^[a-z A-Z]+$"
                        title = "Please enter character in the range a-z OR A-Z"
                        ref={LNameRef}
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text" required/>
                     </Form.Group>
                     <Form.Group id = "NRIC">
                        <Form.Label>NRIC</Form.Label>
                        <Form.Control
                        ref={NRICRef}
                        value={NRIC}
                        onChange={(e) => setNRIC(e.target.value)} 
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
                        type="invalid" required/>
                     </Form.Group>
                     <hr  style={{
                                borderColor : '#000000',
                                marginTop : '50px'
                            }}/>
                     <Form.Group id = "Password">
                        <Form.Label>Passsword</Form.Label>
                        <Form.Control 
                        ref={PasswordRef}
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" required/>
                     </Form.Group>
                     <Form.Group id = "ConfirmPassword">
                        <Form.Label>Confirm Passsword</Form.Label>
                        <Form.Control 
                        ref={ConfirmPasswordRef}
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        type="password" required/>
                     </Form.Group>
                     <Button className="w-100" type="submit">Sign Up</Button>
                 </Form>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login"><u>Login!</u></Link>
            </div>
             </Card.Body>
            </Card>
            </div>
            </Container>
        </div>
   )
}

export default RegisterUI
