import React, { useEffect, useState } from "react";
import { Button as ReactButton } from "react-bootstrap";

export const Button = ({ disabled, onClick, text, type, variant }) => {
  return (
    <ReactButton
      disabled={disabled}
      onClick={onClick}
      type={type}
      variant={variant}
    >
      {text}
    </ReactButton>
  );
};

export const AddButton = ({
  disabled,
  movie,
  addToWatchlist,
  onWatchlist,
  text,
  type,
  variant,
}) => {
  const [disabledFlag, setDisabledFlag] = useState(disabled);
  const [btnText, setBtnText] = useState(text);
  const [btnVariant, setBtnVariant] = useState(variant);

  useEffect(() => {
    if (onWatchlist) {
      updateToAdded();
    } else {
      setDisabledFlag(disabled);
      setBtnVariant(variant);
      setBtnText(text);
    }
  }, [movie]);

  function handleOnClick() {
    updateToAdded();
    addToWatchlist(movie.imdbID);
  }

  function updateToAdded() {
    setDisabledFlag(true);
    setBtnText("On Watchlist");
    setBtnVariant("success");
  }

  return (
    <ReactButton
      disabled={disabledFlag}
      onClick={handleOnClick}
      type={type}
      variant={btnVariant}
    >
      {btnText}
    </ReactButton>
  );
};

export const DeleteButton = ({ disabled, movie, handleDeleteClick, text, type }) => {
  const [disabledFlag, setDisabledFlag] = useState(disabled);
  const [btnText, setBtnText] = useState(text);

  useEffect(() => {
    setDisabledFlag(disabled);
    setBtnText(text);
  }, [movie]);

  return (
    <ReactButton
      disabled={disabledFlag}
      onClick={() => handleDeleteClick(movie.imdbID)}
      type={type}
      variant="danger"
    >
      {btnText}
    </ReactButton>
  );
};
