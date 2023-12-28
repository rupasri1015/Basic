// MovieSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const MoviesSearch = () => {
  const [data, setData] = useState("");
  const [results, setResults] = useState([]);
  const [movieSelected, setMovieSelected] = useState(null);

  //for fetching the movie by movie title
  const searchMovies = async () => {
    try {
      const response = await axios.get( `http://www.omdbapi.com/?apikey=f0ad987e&s=${data}` );
      setResults(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // for fetching the movie result parameters
  const MovieDetails = async (imdbID) => {
    console.log("Button clicked for movie ID:", imdbID);
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=f0ad987e&i=${imdbID}`);
      setMovieSelected(response.data);
    } 
    catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    //main container for movie search
    <div className='container'>
      {/* Search  container*/}
      <div className='searchContainer'>
        {/* input field for entering movie name */}
        <input
          type="text"
          placeholder="Enter movie title"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        {/* button for searching movies */}
        <button 
          onClick={searchMovies}
          className='search-button'
        >
          Search
        </button>
      </div>
      <div className='movieContainer'>
        {/* displaying movie data */}
        {results.map((movie) => {
                          
            return(
              <div key={movie.imdbID} >
                {/* displaying movie image and title */}
                <img src={movie.Poster} alt={movie.Title} />
                <h2>{movie.Title}</h2>
                {/* button for displaying movie result */}
                <button 
                  onClick={() => MovieDetails(movie.imdbID)}
                  className='movieResult'
                >
                  Movie Result
                </button>

                {movieSelected && movieSelected.imdbID === movie.imdbID && (
                  <div>                    
                    <p>Plot:{movieSelected.Plot}</p>
                  </div>
                )}
              </div>              
            )
        })}
      </div>      
    </div>
  );
};

export default MoviesSearch;

