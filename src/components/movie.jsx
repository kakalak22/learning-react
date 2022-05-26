import React from 'react';
import { useParams } from 'react-router';
import MovieForm from './movieForm';

const Movie = () => {
  const params = useParams();
  return (
    <div>
      <MovieForm id={params.id} />
    </div>
  );
};

export default Movie;
