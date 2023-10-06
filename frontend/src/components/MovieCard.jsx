import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MovieCard = ({ btnDetails, movie }) => {
  const [disabledFlag, setDisabledFlag] = useState(btnDetails.disabled);
  const [buttonText, setButtonText] = useState(btnDetails.text);
  const [variant, setVariant] = useState(btnDetails.variant);

  useEffect(() => {
    if (movie.onWatchlist) {
      updateToAdded();
    } else {
      setDisabledFlag(btnDetails.disabled);
      setVariant(btnDetails.variant);
      setButtonText(btnDetails.text);
    }
  }, [movie]);

  function updateToAdded() {
    setDisabledFlag(true);
    setVariant("success");
    setButtonText("On Watchlist");
  }

  function handleClick(imdbID) {
    switch (btnDetails.type) {
      case "add":
        btnDetails.onClick(imdbID); // runs handleAddToWatchlistClick method
        updateToAdded();
        break;
      case "delete":
        btnDetails.onClick(imdbID); // runs handleDeleteClick method
        break;
      default:
        console.log("Card button clicked");
    }
  }

  return (
    <>
      <div className="col-lg-4 col-md-6 pt-4 d-flex justify-content-center">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={movie.Poster} />
          <Card.Body className="d-flex flex-column justify-content-center">
            <Card.Title>{movie.Title}</Card.Title>
            <div className="d-flex justify-content-between">
              <Button
                variant={variant}
                onClick={() => handleClick(movie.imdbID)}
                disabled={disabledFlag}
              >
                {buttonText}
              </Button>
              <Button variant="secondary">Details</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MovieCard;
