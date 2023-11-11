import { useState } from "react";
import { Button } from "./subcomponents/Button.jsx";
import Card from "react-bootstrap/Card";
import { DetailsModal } from "./DetailsModal.jsx";
import { addOrDeleteButton } from "../util.js";

const MovieCard = ({ btnDetails, movie }) => {

  const [showModal, setShowModal] = useState(false);
  const [addBtnState, setAddBtnState] = useState({
    disabled: movie.onWatchlist,
    text: movie.onWatchlist ? "On Watchlist" : "Add To Watchlist",
    variant: movie.onWatchlist ? "success" : "primary",
  });

  return (
    <>
      <div className="col-lg-4 col-md-6 pt-4 d-flex justify-content-center">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={movie.Poster} />
          <Card.Body className="d-flex flex-column justify-content-center">
            <Card.Title>{movie.Title}</Card.Title>
            <div className="d-flex justify-content-between">
              {addOrDeleteButton(
                btnDetails,
                movie,
                addBtnState,
                setAddBtnState
              )}
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
                  addBtnState={addBtnState}
                  setAddBtnState={setAddBtnState}
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
