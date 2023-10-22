import React, { useEffect, useState } from "react";
import { Button as ReactButton } from "react-bootstrap";

export const Button = ({
  disabled,
  imdbID,
  onClick,
  onWatchlist,
  role,
  text,
  type,
  updateFlag,
  variant,
}) => {
  const [disabledFlag, setDisabledFlag] = useState(disabled);
  const [btnText, setBtnText] = useState(text);
  const [btnVariant, setBtnVariant] = useState(variant);

  useEffect(() => {
    if (role === "add" && onWatchlist) {
      updateToAdded();
    }
  }, [updateFlag]);

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

  //todo button is "remembering state" so searching another movie shows "On Watchlist" in the same spots
  //??? can I break the button into different ones? AddButton is the only one with unique logic in it. The others just do an onClick and have text and color. 

  function handleOnClick() {
    if (role === "add") {
      updateToAdded();
    }
    if (onClick) {
      onClick(imdbID);
    }
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
