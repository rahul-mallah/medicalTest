import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from '../util/Auth';
import { Link } from "react-router-dom"

export default function ResetPasswordUI() {
    const emailRef = useRef("");
    const { resetPassword } = useAuth("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setMessage("")
        setError("")
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage("Successful! Check your inbox for further Instructions")
      } catch {
        setError("Request Fail. Please enter a registered email.")
      }
  
      setLoading(false)
    }
  
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="w-100 text-center mt-2">Reset Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Enter Your Registered Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 text-center mt-2" type="submit">
                Reset Password Now
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Link to="/login">Back to Login Screen</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up Now!</Link>
        </div>
      </>
    )
  }