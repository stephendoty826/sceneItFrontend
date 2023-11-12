import { AddButton, DeleteButton } from "./components/subcomponents/Button";

export const addOrDeleteButton = (
  btnDetails,
  movie,
  addBtnState,
  setAddBtnState,
  setShowModal
) => {
  return btnDetails.role === "add" ? (
    <AddButton
      addBtnState={addBtnState}
      setAddBtnState={setAddBtnState}
      imdbID={movie.imdbID}
      addToWatchlist={btnDetails.onClick}
      type={btnDetails.type}
    />
  ) : (
    <DeleteButton
      imdbID={movie.imdbID}
      handleDeleteClick={btnDetails.onClick}
      type={btnDetails.type}
      setShowModal={setShowModal}
    />
  );
};