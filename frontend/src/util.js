import { AddButton, DeleteButton } from "./components/subcomponents/Button";

export const addOrDeleteButton = (btnDetails, movie) => {
  return btnDetails.role === "add" ? (
    <AddButton
      disabled={movie.onWatchlist}
      imdbID={movie.imdbID}
      addToWatchlist={btnDetails.onClick}
      onWatchlist={movie.onWatchlist}
      text={btnDetails.text}
      type={btnDetails.type}
      variant={btnDetails.variant}
    />
  ) : (
    <DeleteButton
      imdbID={movie.imdbID}
      handleDeleteClick={btnDetails.onClick}
      type={btnDetails.type}
    />
  );
};