import React from 'react'
import {Form, Card, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom';
function ResetPasswordUI() {
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
                 <h2 className= "text-center mb-4"> Reset Password</h2>
                 <Form>
                     <Form.Group id = "email">
                        <Form.Label>Enter Your Email Address</Form.Label>
                        <Form.Control type="email" required/>
                     </Form.Group>
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

export default ResetPasswordUI
