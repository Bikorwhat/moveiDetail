import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const API_KEY = "e3d834ad6fb1f2186a3cef508613ffe0";
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            api_key: API_KEY,
            query: query
          }
        });
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // Only search if query is not empty
    if (query.trim() !== "") {
      searchMovies();
    } else {
      // Clear results if query is empty
      setResults([]);
    }
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleChange}
        />
      </div>
      <div className="results">
        {results.map((movie) => (
          <div key={movie.id} className="movie">
            <div className="poster">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
              ) : (
                <div>No Poster Available</div>
              )}
            </div>
            <div className="details">
              <h2>{movie.title}</h2>
              <p>Release Year: {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}</p>
              <p>Ratings: {movie.vote_average}</p>
              <p>Overview: {movie.overview}</p>
              
              {/* Check if cast data is available */}
              {movie.credits && (
                <p>Cast: {movie.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
              )}

              {/* Check if collection data is available */}
              {movie.revenue && (
                <p>Collection: ${movie.revenue}</p>
                
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
