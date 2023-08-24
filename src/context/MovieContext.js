import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext();

const API_KEY = process.env.REACT_APP_TMDB_KEY;
//! bu adres tüm filmlerin url si
const FULL_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({ children }) => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    getirMovies(FULL_API);
  }, []);

  const getirMovies = (url) => {
    axios.get(url).then((res) => setMovie(res.data.results));
  };

  return <MovieContext.Provider value={{movie,getirMovies}}>{children}</MovieContext.Provider>;
};

export default MovieContextProvider;
