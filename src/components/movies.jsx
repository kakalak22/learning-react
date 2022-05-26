import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';
import { paginate } from '../utils/paginate';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from './common/pagination';
import ListGroup from './common/listgroup';
import MovieTable from './movieTable';

class Movies extends Component {
  state = {
    input: '',
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

  handlePageSize = (numberOfItems) => {
    const pageSize = Number.parseInt(numberOfItems);
    this.setState({ pageSize });
  };

  filterItems = (arr, query) => {
    return arr.filter((el) => {
      return el.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      input
    } = this.state;
    const filtered = !input
      ? selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies
      : this.filterItems(allMovies, input);
    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, movies };
  };

  handleInputChange = ({ target: input }) => {
    this.setState({ input: input.value, selectedGenre: undefined });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, sortColumn } = this.state;
    const { totalCount, movies } = this.getPagedData();
    if (count === 0) return <h1>There is no movie in database</h1>;
    return (
      <React.Fragment>
        <div className="container">
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
              <button className="btn btn-primary" style={{ marginBottom: '30px' }}>
                <Link to="/new-movie" style={{ color: 'white' }}>
                  New Movie
                </Link>
              </button>
              <br />
              <input
                style={{ marginBottom: '30px' }}
                type="text"
                onChange={this.handleInputChange}
                placeholder="Search here"
                className="form-control"
              />
              <h5 style={{ marginBottom: '30px' }}>Showing {totalCount} movies in the database</h5>
              <MovieTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                onPageSizeChange={this.handlePageSize}
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
        <Outlet />
      </React.Fragment>
    );
  }
}

export default Movies;
