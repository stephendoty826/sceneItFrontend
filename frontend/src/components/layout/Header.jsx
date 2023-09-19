import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = () => {

  const [firstName, setFirstName] = useState(undefined)

  useEffect(()=>{
    setFirstName(Cookies.get("firstName"))
  }, [])

  const navigate = useNavigate()

  const handleLogout = async () => {
    Cookies.remove('firstName') // removes firstName from cookie on frontend
    setFirstName(undefined)
    let response = await fetch('/logout') // destroys session on backend
    response = await response.json() 
    console.log(response) // message indicating whether or not log out was successful
    navigate("/login")
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 header text-center mb-2">
            <Link to="/home" style={{textDecoration: "none"}}><h2 className="display-2">Scene It</h2></Link>
            {firstName 
            ?
            // displayed when user is logged in
            <div className="d-flex justify-content-center">
              <div>Welcome, {firstName}</div>
              <Link className="px-3" to="/watchlist">My Watchlist</Link>
              <a href="#" onClick={handleLogout}>Logout</a>
            </div>
            :
            // displayed when user is not logged in
            <>
              <Link to="/login" className="pe-4">Login</Link>
              <Link to="/register" className="pe-4">Register</Link>
            </>          
            }
            
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Header