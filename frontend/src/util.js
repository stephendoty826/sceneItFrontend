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

export const displayRandomMovie = (fetchMovieData) => {
  let randomMovieArr = [
    "game of thrones",
    "toy story",
    "lego",
    "hotel transylvania",
    "jurassic park",
    "jurassic world",
    "an american tail",
    "despicable me",
    "the little rascals",
    "home alone",
    "the land before time",
    "star wars",
    "avatar",
    "guardians",
    "super mario",
    "hunger games",
    "john wick",
    "ant man",
    "avengers",
    "lord of the rings",
    "hobbit",
    "top gun",
    "the godfather",
    "spider man",
    "batman",
    "indiana jones",
    "captain marvel",
    "captain america",
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let searchField = randomMovieArr[getRandomInt(randomMovieArr.length)];

  let urlEncodedSearchField = encodeURIComponent(searchField);

  fetchMovieData(urlEncodedSearchField);
};