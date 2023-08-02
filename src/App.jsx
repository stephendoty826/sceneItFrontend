
import './App.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie'

function App() {

  const firstName = useParams().firstName

  if(!Cookies.get('firstName') && firstName !== 'home'){
    Cookies.set("firstName", firstName, {expires: 14})
    console.log('firstName set in cookie')
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 header text-center mb-3">
            <h2 style={{color: "black"}}>Search for movies you want to watch.</h2>
            <h4>Save them to your list</h4>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-11 search">
            <form id="search-form">
              <div className="input-group input-group-lg">
                <input className="form-control search-bar" id="search-bar" placeholder="Search for a movie..."/>
                <button className="btn btn-primary input-group-btn" type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
