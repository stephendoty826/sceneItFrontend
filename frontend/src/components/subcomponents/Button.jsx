import React from "react";
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
  addBtnState,
  setAddBtnState,
  imdbID,
  addToWatchlist,
  type
}) => {

  function handleOnClick() {
    setAddBtnState({
      disabled: true,
      text: "On Watchlist",
      variant: "success"
    });
    addToWatchlist(imdbID);
  }

  return (
    <ReactButton
      disabled={addBtnState.disabled}
      onClick={handleOnClick}
      type={type}
      variant={addBtnState.variant}
    >
      {addBtnState.text}
    </ReactButton>
  );
};

export const DeleteButton = ({ handleDeleteClick, imdbID, type, setShowModal }) => {

  function handleClick() {
    handleDeleteClick(imdbID)
    setShowModal && setShowModal(false)
  }

  return (
    <ReactButton onClick={handleClick} type={type} variant="danger">
      Remove
    </ReactButton>
  );
};
