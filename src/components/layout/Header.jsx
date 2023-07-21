import React from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Header = () => {

  const handleLogout = async () => {
    let response = await fetch('/logout')
    response = await response.json()
    console.log(response)
  }

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-12 header text-center mb-3">
          <Link to="/" style={{textDecoration: "none"}}><h2 className="display-2">Scene It</h2></Link>
          <Link to="/login" className="pe-4">Login</Link>
          <Link to="/register" className="pe-4">Register</Link>
          {/* <Button onClick={logout} >Logout</Button> */}
          <a href="#" onClick={handleLogout}>Logout</a>

        </div>
      </div>
    </div>
      
    </>
    
  )
}

export default Header