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
  variant,
}) => {

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
                movie={movie}
                onClick={onClick}
                onWatchlist={movie.onWatchlist}
                role={role}
                text={text}
                type={type}
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
