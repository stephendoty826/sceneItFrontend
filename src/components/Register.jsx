import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    if(password !== null && confirmPassword !== null){
      console.log('working')
      if(password === confirmPassword){
        setButtonDisabled(false)
        setShowAlert(false)
      }
      else{
        setButtonDisabled(true)
        setShowAlert(true)
      }
    }
  }, [password, confirmPassword])

  return (
    <div className="container">
      <div className="row">
        <p className="display-6 text-center">Register Here</p>
        <div className="col-12 d-flex justify-content-center">
          <Form action="/register" method="POST" className="col-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} required onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={buttonDisabled}>
              Submit
            </Button>
            {showAlert && <Alert className="mt-3" variant="danger">Passwords do not match</Alert>} 
          </Form>
        </div>
      </div>
    </div>

    
  )
}

export default Register