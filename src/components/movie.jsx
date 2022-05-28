import React from 'react';
import { useParams } from 'react-router';
import MovieForm from './movieForm';

const Movie = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <MovieForm id={params.id} />
    </div>
  );
};

export default Movie;
