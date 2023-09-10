
import './App.css';
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard'
import axios from 'axios';

function App() {

  const [searchField, setSearchField] = useState("");
  const [movieArray, setMovieArray] = useState([]);

  const apiKey = "c308ac58";

  const fetchMovieData = (urlEncodedSearchField) => {
    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${urlEncodedSearchField}&page=1`)
    .then(response => {
      console.log(response.data.Search);
      setMovieArray(response.data.Search)
    })
  }

  const firstName = useParams().firstName;

  const firstNameInCookies = Cookies.get('firstName');

  console.log("firstNameInCookies", firstNameInCookies);

  // sets firstName in cookies when user logs in 
  if(!firstNameInCookies && firstName !== 'home'){
    Cookies.set("firstName", firstName, {expires: 14});
    console.log('firstName set in cookie');
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 header text-center mb-3">
            <h2 style={{color: "black"}}>Search for movies you want to watch.</h2>
            {firstNameInCookies ? <h4>Save them to your watchlist</h4> : <h4>Login to save them to your watchlist</h4>}
          </div>
        </div>
        <SearchBar searchField={searchField} setSearchField={setSearchField} fetchMovieData={fetchMovieData}/>
        <div class="row">
          {/* map through array and return MovieCard components */}
          {movieArray.map(movie => {
            // pass down props to MovieCard and display movie data
            return <MovieCard />
          })}
        </div>
      </div>
    </>
  );
}

export default App;
