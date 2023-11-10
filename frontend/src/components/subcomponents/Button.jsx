import React, { useEffect, useState } from "react";
import { Button as ReactButton } from "react-bootstrap";

export const Button = ({ //todo currently this Button component is still fairly specific (imdbID, movie, onWatchlist are all specific to movie card functionality)
  disabled,
  imdbID,
  movie,
  onClick,
  onWatchlist,
  role,
  text,
  type,
  variant,
}) => {
  const [disabledFlag, setDisabledFlag] = useState(disabled);
  const [btnText, setBtnText] = useState(text);
  const [btnVariant, setBtnVariant] = useState(variant);

  useEffect(() => {
    if (role === "add" && onWatchlist) {
      updateToAdded();
    } else {
      setDisabledFlag(disabled);
      setBtnVariant(variant);
      setBtnText(text);
    }
  }, [movie]);

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
