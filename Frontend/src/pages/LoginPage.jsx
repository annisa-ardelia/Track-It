import React from "react";

import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1>Movie Details Screen</h1>
      <p>Movie ID: {movieId}</p>
    </div>
  );
};

export default MovieDetail;
