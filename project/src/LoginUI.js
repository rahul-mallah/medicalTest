import React from 'react'
import {Form, Button, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom';
function LoginUI() {
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
                 <h1 className= "text-center mb-4">MyAppointment</h1>
                 <h2 className= "text-center mb-4"> Login</h2>
                 <Form>
                     <Form.Group id = "email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required/>
                     </Form.Group>
                     <Form.Group id = "password">
                        <Form.Label>Passsword</Form.Label>
                        <Form.Control type="password" required/>
                     </Form.Group>
                     <Button className="w-100" type="submit">Login</Button>
                 </Form>
                 <div className="w-100 text-center mt-2">
                Forgot Password?
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
