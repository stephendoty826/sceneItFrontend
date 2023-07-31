import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()

  const handleLogout = async () => {
    let response = await fetch('/logout')
    //todo - Have logout function destroy cookie on frontend as well. Cookie will be made on Header to hold first name of user. 
    response = await response.json()
    console.log(response)
    navigate("/login")
  }
  //todo - Have Watchlist link only display when you are logged in.
  //todo - Have either Login or Logout displayed depending on whether or not you're logged in. 

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