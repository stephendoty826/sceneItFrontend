import { useState, useEffect } from "react";
import { Button } from "./subcomponents/Button.jsx";
import Card from "react-bootstrap/Card";

const MovieCard = ({
  disabled,
  onClick,
  movie,
  role,
  text,
  type,
  updateFlag,
  variant,
}) => {

  // useEffect(() => {
  //   if (movie.onWatchlist) {
  //     console.log("movie", movie);
  //     updateToAdded();
  //   } else {
  //     setDisabledFlag(disabled);
  //     setButtonVariant(variant);
  //     setButtonText(text);
  //   }
  // }, [updateFlag]);

  // function updateToAdded() {
  //   setDisabledFlag(true);
  //   setButtonVariant("success");
  //   setButtonText("On Watchlist");
  // }

  // function handleClick(imdbID) {
  //   switch (btnDetails.role) {
  //     case "add":
  //       btnDetails.onClick(imdbID); // runs handleAddToWatchlistClick method
  //       updateToAdded();
  //       break;
  //     case "delete":
  //       btnDetails.onClick(imdbID); // runs handleDeleteClick method
  //       break;
  //     default:
  //       console.log("Card button clicked");
  //   }
  // }

  return (
    <>
      <div className="col-lg-4 col-md-6 pt-4 d-flex justify-content-center">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={movie.Poster} />
          <Card.Body className="d-flex flex-column justify-content-center">
            <Card.Title>{movie.Title}</Card.Title>
            <div className="d-flex justify-content-between">
              {/* Primary Button */}
              <Button
                disabled={disabled}
                imdbID={movie.imdbID}
                onClick={onClick}
                onWatchlist={movie.onWatchlist}
                role={role}
                text={text}
                type={type}
                updateFlag={updateFlag}
                variant={variant}
              />
              {/* <Button variant="secondary">Details</Button> */}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MovieCard;
