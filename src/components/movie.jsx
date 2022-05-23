import React from 'react';
import { useParams, useNavigate } from 'react-router';

const Movie = () => {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  return (
    <div>
      <h1>Movie-{params.id}</h1>
      <button className="btn btn-primary" onClick={() => navigate('/movies')}>
        Save
      </button>
    </div>
  );
};

export default Movie;
