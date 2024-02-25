import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [mostViewedMovies, setMostViewedMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/upcoming',
          {
            params: {
              api_key: 'e3d834ad6fb1f2186a3cef508613ffe0',
            },
          }
        );
        setUpcomingMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/top_rated',
          {
            params: {
              api_key: 'e3d834ad6fb1f2186a3cef508613ffe0',
            },
          }
        );
        setTopRatedMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
      }
    };

    const fetchMostViewedMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular',
          {
            params: {
              api_key: 'e3d834ad6fb1f2186a3cef508613ffe0',
            },
          }
        );
        setMostViewedMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching most viewed movies:', error);
      }
    };

    fetchUpcomingMovies();
    fetchTopRatedMovies();
    fetchMostViewedMovies();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  return (
    <div>
      <h1>Upcoming Movies</h1>
      <Slider {...sliderSettings}>
        {upcomingMovies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </Slider>

      <h1>Top Rated Movies</h1>
      <Slider {...sliderSettings}>
        {topRatedMovies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </Slider>

      <h1>Most Viewed Movies</h1>
      <Slider {...sliderSettings}>
        {mostViewedMovies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
