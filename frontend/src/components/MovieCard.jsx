import { useState } from "react";
import { Button, AddButton, DeleteButton } from "./subcomponents/Button.jsx";
import Card from "react-bootstrap/Card";
import { DetailsModal } from "./DetailsModal.jsx";

const MovieCard = ({
  btnDisabled,
  btnOnClick,
  movie,
  btnRole,
  btnText,
  btnType,
  btnVariant,
}) => {
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
              {btnRole === "add" ? (
                <AddButton
                  disabled={btnDisabled}
                  movie={movie}
                  addToWatchlist={btnOnClick}
                  onWatchlist={movie.onWatchlist}
                  text={btnText}
                  type={btnType}
                  variant={btnVariant}
                />
              ) : (
                <DeleteButton
                  disabled={btnDisabled}
                  movie={movie}
                  onClick={btnOnClick}
                  text={btnText}
                  type={btnType}
                />
              )}
              <Button
                onClick={() => setShowModal(true)}
                text="Details"
                variant="secondary"
              />
              {showModal ? (
                <DetailsModal
                  btnRole={btnRole}
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
