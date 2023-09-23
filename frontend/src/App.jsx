
import './App.css';
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard'
import Button from "react-bootstrap/Button"
import axios from 'axios';

function App() {

  const [searchField, setSearchField] = useState("");
  const [movieArray, setMovieArray] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY

  const fetchMovieData = (urlEncodedSearchField) => {
    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${urlEncodedSearchField}&page=1`)
    .then(response => {
      console.log(response)
      if(response.data.Response === "True"){
        let responseMovieArray = response.data.Search.reduce((acc, movie) => {
          if(movie.Poster !== "N/A" && movie.Type !== "game"){ // filters out those objects that don't have posters and are games
            return [...acc, movie]
          }
          return acc
        }, [])
          setMovieArray(responseMovieArray)
      }
    })
  }

  const firstName = useParams().firstName;

  const firstNameInCookies = Cookies.get('firstName');

  // sets firstName in cookies when user logs in 
  if(!firstNameInCookies && firstName !== 'home'){
    Cookies.set("firstName", firstName, {expires: 14});
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 header text-center mb-3">
            <h1 style={{color: "black"}}>Search movies or series</h1>
            {firstNameInCookies ? <h4>Save them to your watchlist</h4> : <h4>Login to save them to your watchlist</h4>}
          </div>
        </div>
        <SearchBar searchField={searchField} setSearchField={setSearchField} fetchMovieData={fetchMovieData}/>
        <div className="row">
          {/* map through array and return MovieCard components */}
          {movieArray.map((movie, i) => {
            // pass down props to MovieCard and display movie data
            return <MovieCard key={i} movie={movie}/>
          })
          
          }
          
          {/* {movieArray.length > 0 //todo add button to load more movies from current searchField???
          ?
          <div className="container d-flex justify-content-center">
            <Button variant="dark"className="my-5 px-5 py-2">Load More Movies</Button>
          </div>
          :
          <h1>if false</h1>
          } */}
        </div>
      </div>
    </>
  );
}

export default App;
