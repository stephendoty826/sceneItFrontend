import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Register = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)

  //todo write logic to ensure password and confirm password are the same and enable button when they are. Give Bootstrap warning when they are not the same.
  useEffect(() => {
    console.log('working')
  }, [password, confirmPassword])

  return (
    <div className="container">
      <div className="row">
        <p className="display-6 text-center">Register Here</p>
        <div className="col-12 d-flex justify-content-center">
          <Form action="/register" method="POST" className="col-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={buttonDisabled}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>

    
  )
}

export default Register