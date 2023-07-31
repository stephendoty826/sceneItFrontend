import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()

  const handleLogout = async () => {
    let response = await fetch('/logout')

    response = await response.json()
    console.log(response)
    navigate("/login")
  }

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-12 header text-center mb-3">
          <Link to="/" style={{textDecoration: "none"}}><h2 className="display-2">Scene It</h2></Link>
          <Link to="/login" className="pe-4">Login</Link>
          <Link to="/register" className="pe-4">Register</Link>
          <a href="#" onClick={handleLogout}>Logout</a>
        </div>
      </div>
    </div>
      
    </>
    
  )
}

export default Header