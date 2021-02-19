import React, {useState} from 'react'
import {Form, Button, Card, Container, Alert} from 'react-bootstrap'
import { auth, firestore } from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../util/Auth';
function LoginUI() {
    //useStates react hooks
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const {currentUser} = useAuth();

    //handle submit function logs user in by calling the firebase login function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(Email, Password);
            history.push("/Patient");
        }catch(error) {
            setError(error.message);
        }
        setEmail("");
        setPassword("");
        setLoading(false);
    };



    return (
        <div style={{backgroundImage: `url("https://i.ibb.co/yRDqQHh/pexels-karolina-grabowska-4021769.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'}}>
            <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
             <Card.Body>
                 <h1 className= "text-center mb-4" style={{
                     fontSize: '2em'
                 }}>MyAppointment</h1>
                 <h2 className= "text-center mb-4"> Login</h2>
                 {error && <Alert variant="danger">{error}</Alert>}
                 <Form onSubmit={handleSubmit}>
                     <Form.Group id = "email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" required/>
                     </Form.Group>
                     <Form.Group id = "password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" required/>
                     </Form.Group>
                     <Button className="w-100" type="submit">Login</Button>
                 </Form>
                 <div className="w-100 text-center mt-2">
                <Link to="/resetPassword">Forgot Password?</Link>
            </div>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/register"><u>Join Now!</u></Link>
            </div>
             </Card.Body>
            </Card>
            </div>
            </Container>

        </div>
    )
}

export default LoginUI
