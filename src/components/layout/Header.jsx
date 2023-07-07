import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <>
      <Link to="/" style={{textDecoration: "none"}}><h2 class="display-2">Scene It</h2></Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
    
  )
}

export default Header