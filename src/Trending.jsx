import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar } from '@fortawesome/free-solid-svg-icons';

const TrendingVideo = ({ video }) => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [trailerLink, setTrailerLink] = useState('');

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${video.id}`,
          {
            params: {
              api_key: 'e3d834ad6fb1f2186a3cef508613ffe0',
              append_to_response: 'credits',
            },
          }
        );
        setVideoDetails(response.data);
        fetchTrailerLink(response.data.imdb_id); // Fetch trailer link based on IMDb ID
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    const fetchTrailerLink = async (imdbId) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/find/${imdbId}`,
          {
            params: {
              api_key: 'e3d834ad6fb1f2186a3cef508613ffe0',
              external_source: 'imdb_id',
            },
          }
        );
        if (response.data && response.data.movie_results && response.data.movie_results.length > 0) {
          const trailerKey = response.data.movie_results[0].key;
          setTrailerLink(`https://www.youtube.com/watch?v=${trailerKey}`);
        }
      } catch (error) {
        console.error('Error fetching trailer link:', error);
      }
    };

    fetchVideoDetails();
  }, [video.id]);

  return (
    <div className="TrendingVideo">
      <img
        className="Trending"
        src={`https://image.tmdb.org/t/p/w500/${video.poster_path}`}
        alt={video.title}
      />
      {videoDetails && (
        <div className="Trenddetails">
          <h2>{video.title}</h2>
          <p>Released Year: {videoDetails.release_date}</p>
          <p>Collection: ${videoDetails.revenue}</p>
          <p>Ratings: {videoDetails.vote_average}</p>
          <p>Plot: {videoDetails.overview}</p>
          <p>Genre: {videoDetails.genres.map(genre => genre.name).join(', ')}</p>
          <p>
            Cast: {videoDetails.credits?.cast?.slice(0, 10).map((cast) => cast.name).join(", ")}
            {videoDetails.credits?.cast?.length > 10 ? ".." : ""}
          </p>
          <div className="Ticons">
            <FontAwesomeIcon icon={faClock} /> {/* Watch Later icon */}
            <FontAwesomeIcon icon={faStar} /> {/* Favorites icon */}
            <br />
            {trailerLink && <a href={trailerLink}>Watch Trailer</a>}
          </div>
          <br />
        </div>
      )}
    </div>
  );
};

const TrendingVideos = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/all/day',
          {
            params: {
              api_key: 'e3d834ad6fb1f2186a3cef508613ffe0',
              page: page,
            },
          }
        );
        setTrendingVideos(response.data.results);
      } catch (error) {
        console.error('Error fetching trending videos:', error);
      }
    };

    fetchTrendingVideos();
  }, [page]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list',
          {
            params: {
              api_key: 'e3d834ad6fb1f2186a3cef508613ffe0',
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const filteredVideos = selectedGenre === '' ? trendingVideos : trendingVideos.filter(video =>
    video.genre_ids.includes(parseInt(selectedGenre))
  );

  return (
    <div className="trending-videos">
      <h1>Trending Videos</h1>
      <div className="genres-dropdown">
        <select onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div className="videos-list">
        {filteredVideos.map((video) => (
          <TrendingVideo key={video.id} video={video} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default TrendingVideos;
