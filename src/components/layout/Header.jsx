import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-12 header text-center mb-3">
          <Link to="/" style={{textDecoration: "none"}}><h2 className="display-2">Scene It</h2></Link>
          <Link to="/login" className="pe-4">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
      
    </>
    
  )
}

export default Header