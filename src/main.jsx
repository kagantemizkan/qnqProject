// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SearchPage from './pages/SearchPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MovieProvider } from '../MovieContext.jsx';
import { AnimatePresence } from 'framer-motion';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "movie/:id",
    element: <MovieDetailsPage />,
  },
  {
    path: "search",
    element: <SearchPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <MovieProvider>
      <AnimatePresence mode="wait">
        <ThemeProvider theme={darkTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AnimatePresence>
    </MovieProvider>
);
