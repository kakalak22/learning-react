import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listgroup';
import MovieTable from './movieTable';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    sortColumn: { path: undefined, order: 'asc' },
    selectedGenre: undefined,
    currentPage: 1,
    pageSize: 4
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handelGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { currentPage, pageSize, movies: allMovies, selectedGenre, sortColumn } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, sortColumn } = this.state;
    const { totalCount, movies } = this.getPagedData();
    if (count === 0) return <h1>There is no movie in database</h1>;
    return (
      <React.Fragment>
        <div className="container">
          <h1>Showing {totalCount} movies in the database</h1>
          <br />
          <div className="row">
            <div className="col-lg-2">
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handelGenreSelect}
              />
            </div>
            <div className="col-lg-6">
              <MovieTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
              <Pagination
                itemCounts={totalCount}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
