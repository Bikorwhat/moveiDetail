import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';

const TopRated = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/top_rated',
          {
            params: {
              api_key: 'e3d834ad6fb1f2186a3cef508613ffe0',
              page: currentPage,
            },
          }
        );

        const movieDetailsPromises = response.data.results.map(async (movie) => {
          const detailedResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}`,
            {
              params: {
                api_key: 'e3d834ad6fb1f2186a3cef508613ffe0',
                append_to_response: 'credits', // Include credits for cast and crew
              },
            }
          );
          return detailedResponse.data;
        });

        const moviesWithDetails = await Promise.all(movieDetailsPromises);
        setTopRatedMovies(moviesWithDetails);
        
        // Extract and set genres
        const allGenres = moviesWithDetails.reduce((genres, movie) => {
          movie.genres.forEach((genre) => {
            if (!genres.includes(genre.name)) {
              genres.push(genre.name);
            }
          });
          return genres;
        }, []);
        setGenres(allGenres);
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
      }
    };

    fetchTopRatedMovies();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = selectedGenre
    ? topRatedMovies.filter((movie) =>
        movie.genres.some((genre) => genre.name === selectedGenre)
      )
    : topRatedMovies;

  return (
    <div className="top-rated">
      <h1>Top Rated Movies</h1>
      <div className="genres-dropdown">
        <select onChange={(e) => handleGenreChange(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div className="movies-list">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="Topmovie">
            <img
              className="Toprated"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="Trenddetails">
              <h1>{movie.title}</h1>
              <p>Released Year: {movie.release_date}</p>
              <p>Collection: ${movie.revenue}</p>
              <p>Ratings: {movie.vote_average}</p>
              <p>Plot: {movie.overview}</p>
              <p>Genre: {movie.genres.map(genre => genre.name).join(', ')}</p>
              <p>Cast: {movie.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
              {/* You can add other movie details here */}
              <div className="Ticons">
                <FontAwesomeIcon icon={faClock} /> {/* Watch Later icon */}
                <FontAwesomeIcon icon={faStar} /> {/* Favorites icon */}
              </div>
              <br />
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title)}+trailer`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </a>
              <br />
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default TopRated;
