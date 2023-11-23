import "./App.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";
import axios from "axios";
import { displayRandomMovie } from "./util";

function App() {
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [dropdownSelection, setDropdownSelection] = useState("")
  const [searchField, setSearchField] = useState("");
  const [movieArray, setMovieArray] = useState([]);

  console.log("dropdownSelection", dropdownSelection)

  const apiKey = process.env.REACT_APP_API_KEY;

  const firstName = useParams().firstName;

  const firstNameInCookies = Cookies.get("firstName");

  // sets firstName in cookies when user logs in
  if (!firstNameInCookies && firstName !== "home") {
    Cookies.set("firstName", firstName, { expires: 14 });
  }

  useEffect(() => {
    // fetch watchlist imdbIDs so that array can be passed to isMovieOnWatchlist function
    if (firstNameInCookies) {
      fetch("/watchlist") //todo use thunk???
        .then((response) => {
          return response.json();
        })
        .then((imdbIDArray) => {
          setWatchlistIds(imdbIDArray);
        });
    }
    // display random movie
    displayRandomMovie(fetchMovieData);
  }, []);

  const fetchMovieData = (urlEncodedSearchField) => {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${urlEncodedSearchField}&page=1`
      )
      .then((response) => {
        if (response.data.Response === "True") {
          let responseMovieArray = response.data.Search.reduce((acc, movie) => {
            if (movie.Poster !== "N/A" && movie.Type !== "game") {
              // filters out those objects that don't have posters and are games
              return [...acc, movie];
            }
            return acc;
          }, []);
          let tempMovieArray = isMovieOnWatchlist(
            watchlistIds,
            responseMovieArray
          );
          setMovieArray(tempMovieArray);
        } else {
          console.log(response);
        }
      });
  };

  /**
   *  function to see determine which movies in responseMovieArray are on the watchlist. If movie is on watchlist, set isOnWatchlist boolean on movie object to true, otherwise set it to false.
   * @watchlistIds array imdbIDs on watchlist
   * @responseMovieArray array of movie objects resulting from search
   * */
  function isMovieOnWatchlist(watchlistIds, responseMovieArray) {
    let mappedMovieArray = responseMovieArray.map((movie) => {
      let onWatchlistFlag = watchlistIds.find(
        (imdbIDObj) => imdbIDObj.imdbID === movie.imdbID
      );
      if (onWatchlistFlag) {
        movie.onWatchlist = true;
        return movie;
      } else {
        movie.onWatchlist = false;
        return movie;
      }
    });
    return mappedMovieArray;
  }

  // function to be passed down to MovieCard component
  function addToWatchlist(imdbID) {
    // adds to local watchlist cache
    setWatchlistIds([...watchlistIds, { imdbID }]);

    // fetch to add to db
    fetch(`/watchlist/${imdbID}`, {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  }

  const addBtnDetails = {
    onClick: addToWatchlist,
    role: "add",
    type: "button",
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 header text-center mb-3">
            <h1 style={{ color: "black" }}>Search movies or series</h1>
            {firstNameInCookies ? (
              <h4>Save them to your watchlist</h4>
            ) : (
              <h4>Login to save them to your watchlist</h4>
            )}
          </div>
        </div>
        <SearchBar
          dropdownSelection={dropdownSelection}
          setDropdownSelection={setDropdownSelection}
          searchField={searchField}
          setSearchField={setSearchField}
          fetchMovieData={fetchMovieData}
        />
        <CardList btnDetails={addBtnDetails} movieArray={movieArray} />
      </div>
    </>
  );
}

export default App;
