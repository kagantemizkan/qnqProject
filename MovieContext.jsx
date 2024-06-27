import React, { createContext, useContext } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

const API_KEY = 'cb3622f2285ee0cf4be0cac5d819f96c';
const BASE_URL = 'https://api.themoviedb.org/3';

const queryClient = new QueryClient();

const fetchMovies = async () => {
  const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
    },
  });
  console.log(data.results);
  return data.results;
};

const searchMovies = async (query) => {
  const { data } = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
    },
  });
  console.log(data.results);
  return data.results;
};

const fetchGenres = async () => {
  const { data } = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });
  console.log(data.genres);
  return data.genres;
};

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieContext.Provider value={{ fetchMovies, searchMovies, fetchGenres }}>
        {children}
      </MovieContext.Provider>
    </QueryClientProvider>
  );
};

export const useMovies = () => {
  const { fetchMovies } = useContext(MovieContext);

  return useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    staleTime: 600000,
  });
};

export const useMovieContext = () => useContext(MovieContext);
