import React, { useEffect, useState } from "react";
import { Button as ReactButton } from "react-bootstrap";

export const Button = (props) => {
  return (
    <ReactButton
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
      variant={props.variant}
    >
      {props.children}
    </ReactButton>
  );
};

export const AddButton = ({
  disabled,
  imdbID,
  addToWatchlist,
  onWatchlist,
  text,
  type,
  variant,
}) => {

  console.log(imdbID);
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
  }, [imdbID]);

  function handleOnClick() {
    updateToAdded();
    addToWatchlist(imdbID);
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

export const DeleteButton = ({ handleDeleteClick, imdbID, type }) => {
  return (
    <ReactButton
      onClick={() => handleDeleteClick(imdbID)}
      type={type}
      variant="danger"
    >
      Remove
    </ReactButton>
  );
};
