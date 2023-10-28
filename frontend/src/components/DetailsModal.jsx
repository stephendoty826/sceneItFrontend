import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

export const DetailsModal = ({ show, onHide, movie }) => {
  const [movieDetails, setMovieDetails] = useState(movie);

  useEffect(() => {
    if (show === true) { // todo add condition so details aren't fetched when on watchlist as watchlist component already has details
      fetchMovieDetails(movieDetails.imdbID);
      console.log("movie details fetched");
    }
  }, [show, movie]);

  console.log("movie", movie)
  console.log("movieDetails", movieDetails)

  //todo how to get modal to update with proper movie data. When searching another movie, it displays the first movie searched. 

  function fetchMovieDetails(imdbID) {
    fetch(`http://www.omdbapi.com/?apikey=c308ac58&i=${imdbID}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        movie = data
      });
  }

  return (
    <Modal
      show={show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {movie.Title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex ">
        <Card.Img
          className="m-3"
          variant="top"
          style={{ width: "100%", maxWidth: "500px" }}
          src={movie.Poster}
        />
        <Card.Body>
          <h3>Plot</h3>
          <p className="card-text pb-3">{movie.Plot}</p>
          <h5 className="card-text pb-3">
            <b>Director:</b> {movie.Director}
          </h5>
          <h5 className="card-text pb-3">
            <b>Actors:</b> {movie.Actors}
          </h5>
          <h5 className="card-text pb-3">
            <b>Rated:</b> {movie.Rated}
          </h5>
          <h5 className="card-text pb-3">
            <b>Release Date:</b> {movie.Released}
          </h5>
          <h5 className="card-text pb-3">
            <b>Box Office:</b> {movie.BoxOffice}
          </h5>
          <h5 className="card-text">
            <b>IMDB Rating:</b> {movie.imdbRating}
          </h5>
        </Card.Body>
        {/* <img style="max-height: 500px;" src="${currentMovie.Poster}" class="card-img-top m-3" alt="movie poster for {movieDetails.Title}"> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
