import { useState } from "react";
import { Button } from "./subcomponents/Button.jsx";
import Card from "react-bootstrap/Card";
import { DetailsModal } from "./DetailsModal.jsx";
import { addOrDeleteButton } from "../util.js";

const MovieCard = ({ btnDetails, movie }) => {
  const [showModal, setShowModal] = useState(false);

  //todo NOTE: Currently when adding a movie from the details modal, the button updates on the modal but not on the card.

  return (
    <>
      <div className="col-lg-4 col-md-6 pt-4 d-flex justify-content-center">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={movie.Poster} />
          <Card.Body className="d-flex flex-column justify-content-center">
            <Card.Title>{movie.Title}</Card.Title>
            <div className="d-flex justify-content-between">
              {addOrDeleteButton(btnDetails, movie)}
              <Button
                onClick={() => setShowModal(true)}
                text="Details"
                variant="secondary"
              >
                Details
              </Button>
              {showModal ? (
                <DetailsModal
                  btnDetails={btnDetails}
                  movie={movie}
                  setShowModal={setShowModal}
                />
              ) : (
                ""
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MovieCard;
