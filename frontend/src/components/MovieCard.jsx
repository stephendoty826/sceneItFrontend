import { useState } from "react";
import { Button } from "./subcomponents/Button.jsx";
import Card from "react-bootstrap/Card";
import { DetailsModal } from "./DetailsModal.jsx";

const MovieCard = ({ disabled, onClick, movie, role, text, type, variant }) => {
  const [showModal, setShowModal] = useState(false);

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
              <Button
                variant="secondary"
                onClick={() => setShowModal(true)}
                text="Details"
              />
              {showModal ? <DetailsModal
                setShowModal={setShowModal}
                movie={movie}
                imdbID={movie.imdbID}
              /> : ""}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MovieCard;
