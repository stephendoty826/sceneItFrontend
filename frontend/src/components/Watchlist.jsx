import React, { useState, useEffect } from 'react'
import CardList from './CardList';
import axios from 'axios';

const Watchlist = () => {

  const [movieArray, setMovieArray] = useState([])

  useEffect(() => {
    fetch("/watchlist")
    .then(response => {
      console.log(response);
      return response.json()
    })
    .then(imdbIDArray => {
      // fetchWatchlistData function call and pass in response
      fetchWatchlistData(imdbIDArray)
      console.log(imdbIDArray)
    })
  }, [])

  async function fetchWatchlistData(imdbIDArray){ // form for imdbIDArray is [{imdbID: "tt32345"}, {imdbID: "tt35545"}]
    // map through imdbIDArray and collect all the promises for each fetch
    let promisesArray = imdbIDArray.map(async imdbIDObj => {
      let imdbID = imdbIDObj.imdbID
      let response = await axios.get(`http://www.omdbapi.com/?apikey=c308ac58&i=${imdbID}&plot=full`)
      return response.data
    })

    // pass promisesArray to Promise.all() and get data back from API
    let tempMovieArray = await Promise.all(promisesArray)

    // set movieArray to tempMovieArray
    setMovieArray(tempMovieArray)
  }
  
  console.log(movieArray)

  return (

    // map through movieArray and pass values to each MovieCard component
    <div className="container">
      <CardList movieArray={movieArray}/>
    </div>
  )
}

export default Watchlist