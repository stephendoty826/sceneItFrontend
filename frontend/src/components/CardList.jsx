import React from "react";
import MovieCard from "./MovieCard";

const CardList = ({ btnDetails, movieArray }) => {
  return (
    <div className="row">
      {movieArray.map((movie, i) => {
        return (
          <MovieCard
            btnDisabled={movie.onWatchlist}
            btnOnClick={btnDetails.onClick}
            key={i}
            movie={movie}
            btnRole={btnDetails.role}
            btnText={btnDetails.text}
            btnType={btnDetails.type}
            btnVariant={btnDetails.variant}
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
