import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { Grid, Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MovieCardSkeleton from '../components/MovieCardSkeleton';

const API_KEY = 'cb3622f2285ee0cf4be0cac5d819f96c';
const BASE_URL = 'https://api.themoviedb.org/3';

const searchMovies = async (query, page) => {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });
  return data;
};

const SearchPage = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['searchMovies', query, page],
    queryFn: () => searchMovies(query, page),
    keepPreviousData: true,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    navigate(`/search/${query}?page=${value}`);
    window.scrollTo({ top: 0, behavior: 'instan' }); // Scroll to the top of the page
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <p className='ml-4 text-white text-3xl font-bold font-sans mb-3'>Search results for "{query}":</p>
        <Grid container>
          {
            Array.from(new Array(20)).map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <MovieCardSkeleton />
              </Grid>
            ))
          }
        </Grid>
        <Footer />
      </>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='bg-blue-gray-300'>
      <Header />
      <p className='ml-4 text-white text-3xl font-bold font-sans mb-3'>Search results for "{query}":</p>
      <Grid container>
        {data.results.map((movie, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <MovieCard
              originalLanguage={movie.original_language}
              genreIds={movie.genre_ids}
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
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Pagination
          count={data.total_pages}
          page={page}
          onChange={handlePageChange} // Use the handlePageChange function
        />
      </Grid>
      <Footer />
    </div>
  );
};

export default SearchPage;