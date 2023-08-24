import React, { useContext } from 'react'
import { AuthContex } from '../context/AuthContext';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MovieCard = ({title, poster_path,overview, vote_average,id}) => {

  const{currentUser}=useContext(AuthContex)
  return (
    <div
      className="movie"
      id="container"
     
    >
      <img
        loading="lazy"
        src={IMG_API+poster_path}
        alt="movie-card"
      />
      <div className="flex align-baseline justify-between p-1 text-white">
      
        <h5>{title}</h5>

        {currentUser && (
          <span >
            {vote_average}
          </span>
        )}
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
}

export default MovieCard