// pages/MovieDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Movie Details for ID: {id}</h2>
      {/* Film detaylarını burada göster */}
    </div>
  );
}

export default MovieDetailsPage;
