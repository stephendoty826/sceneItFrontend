import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

export const DetailsModal = ({ setShowModal, movie, imdbID }) => {
  const [movieDetails, setMovieDetails] = useState(movie);

  useEffect(() => {
      // todo add condition so details aren't fetched when on watchlist as watchlist component already has details
      fetchMovieDetails(movieDetails.imdbID);
      console.log("movie details fetched");
  }, []);

  //todo CURRENTLY: if I search a movie and then search another movie, the modal will show the data for the first movie => can you use the imdbID as a trigger to run the fetch again??? maybe remove/modify if-statement in useEffect

  console.log("movie", movie)
  console.log("movieDetails", movieDetails)

  function fetchMovieDetails(imdbID) {
    fetch(`http://www.omdbapi.com/?apikey=c308ac58&i=${imdbID}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
      });
  }

  return (
    <Modal
      show={true}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {movieDetails.Title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex">
        <Card.Img
          className="me-3"
          style={{ width: "auto", maxWidth: "300px", height: "100%" }}
          src={movieDetails.Poster}
        />
        <Card.Body>
          <h3>Plot</h3>
          <p className="card-text pb-3">{movieDetails.Plot}</p>
          <h5 className="card-text pb-3">
            <b>Director:</b> {movieDetails.Director}
          </h5>
          <h5 className="card-text pb-3">
            <b>Actors:</b> {movieDetails.Actors}
          </h5>
          <h5 className="card-text pb-3">
            <b>Rated:</b> {movieDetails.Rated}
          </h5>
          <h5 className="card-text pb-3">
            <b>Release Date:</b> {movieDetails.Released}
          </h5>
          <h5 className="card-text pb-3">
            <b>Box Office:</b> {movieDetails.BoxOffice}
          </h5>
          <h5 className="card-text">
            <b>IMDB Rating:</b> {movieDetails.imdbRating}
          </h5>
        </Card.Body>
        {/* <Card.Img
          className="me-3"
          variant="top"
          style={{ width: "100%", maxWidth: "300px" }}
          src={movieDetails.Poster}
        />
        <Card.Body>
          <h3>Plot</h3>
          <p className="card-text pb-3">{movieDetails.Plot}</p>
          <h5 className="card-text pb-3">
            <b>Director:</b> {movieDetails.Director}
          </h5>
          <h5 className="card-text pb-3">
            <b>Actors:</b> {movieDetails.Actors}
          </h5>
          <h5 className="card-text pb-3">
            <b>Rated:</b> {movieDetails.Rated}
          </h5>
          <h5 className="card-text pb-3">
            <b>Release Date:</b> {movieDetails.Released}
          </h5>
          <h5 className="card-text pb-3">
            <b>Box Office:</b> {movieDetails.BoxOffice}
          </h5>
          <h5 className="card-text">
            <b>IMDB Rating:</b> {movieDetails.imdbRating}
          </h5>
        </Card.Body> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
