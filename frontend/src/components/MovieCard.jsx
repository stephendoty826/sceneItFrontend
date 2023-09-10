import React from 'react'

const MovieCard = () => {
  return (
    <div class="col-lg-4 col-md-6 pt-4 d-flex justify-content-center">
      <div class="card" style={{width: "18rem"}}>
        <img src="https://m.media-amazon.com/images/M/MV5BZGFjOTRiYjgtYjEzMS00ZjQ2LTkzY2YtOGQ0NDI2NTVjOGFmXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_.jpg" class="card-img-top" alt="..."/>
        <div class="card-body d-flex flex-column justify-content-end">
          <h5 class="card-title">Movie Title</h5>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary" id="saveToWatchlist">Add To Watchlist</button>
            <button class="btn btn-secondary" onclick="showMovieDetails('${currentMovie.imdbID}')">Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard