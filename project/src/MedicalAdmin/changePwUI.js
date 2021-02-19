import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from '../util/Auth';
import { Link } from "react-router-dom";
import IdleTimerContainer from '../util/IdleTimerContainer';

export default function ChangePasswordUI() {
    //react hooks
    const emailRef = useRef("");
    const { resetPassword } = useAuth("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
  
    // handle submit function calls reset password function of firebase
    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setMessage("")
        setError("")
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage("Successful! Check your inbox for further Instructions on how to create a new password")
      } catch {
        setError("Request Fail. Please enter a registered email.")
      }
  
      setLoading(false)
    }
  
    return (
      <>
      <IdleTimerContainer></IdleTimerContainer>
      <div style={{backgroundImage: `url("https://i.ibb.co/yRDqQHh/pexels-karolina-grabowska-4021769.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'}}>
      <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}>
          <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4" style={{
                     fontSize: '2em'}}>Change your Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Enter Your Registered Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 text-center mt-2" type="submit">
                Change Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
            <Link onClick={() => {window.location.href="/MedAdm"}}>Back to Homepage</Link>
            </div>
          </Card.Body>
        </Card>
        </div>
        </Container>
        </div>
      </>
    )
  }