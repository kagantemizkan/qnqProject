import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { Grid } from '@mui/material';
import { useMovies } from '../../MovieContext';

const HomePage = () => {

  const { data: movies, isLoading, error } = useMovies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='bg-blue-gray-300'>
      <Header />
      <p className='ml-4 text-white text-3xl font-bold font-sans mb-3'>Top 20 Movies:</p>
      <Grid container>
        {movies.map((movie, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <MovieCard
              movieId={movie.id}
              title={movie.title}
              description={movie.overview}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
            />
          </Grid>
        ))}
      </Grid>
      <Footer />
    </div>
  );
}

export default HomePage;
