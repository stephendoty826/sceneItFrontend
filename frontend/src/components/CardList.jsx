import React from "react";
import MovieCard from "./MovieCard";

const CardList = ({ btnDetails, movieArray, updateFlag }) => {
  return (
    <div className="row">
      {movieArray.map((movie, i) => {
        if (i > 2) {
          //todo remove to display all movies on page
          return;
        }
        return (
          <MovieCard
            disabled={movie.onWatchlist}
            onClick={btnDetails.onClick}
            key={i}
            movie={movie}
            role={btnDetails.role}
            text={btnDetails.text}
            type={btnDetails.type}
            updateFlag={updateFlag}
            variant={btnDetails.variant}
          />
        );
      })}

      {/* {movieArray.length > 0 //todo add button to load more movies from current searchField???
      ?
      <div className="container d-flex justify-content-center">
        <Button variant="dark"className="my-5 px-5 py-2">Load More Movies</Button>
      </div>
      :
      <h1>if false</h1>
      } */}
    </div>
  );
};

export default CardList;
