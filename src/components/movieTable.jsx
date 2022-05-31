import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Like from '../like';
import Table from './common/table';
import { Link } from 'react-router-dom';

class MovieTable extends Component {
  columns = [
    {
      label: 'Title',
      path: 'title',
      content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { label: 'Genre', path: 'genre.name' },
    { label: 'Stock', path: 'numberInStock' },
    { label: 'Rate', path: 'dailyRentalRate' },
    {
      key: '1',
      content: (item) => <Like status={item.like} item={item} onLike={this.props.onLike} />
    }
  ];

  deleteColumn = {
    key: '2',
    content: (item) => (
      <button className="btn btn-danger" onClick={() => this.props.onDelete(item)}>
        Remove
      </button>
    )
  };

  constructor(props) {
    super(props);
    const { user } = props;
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, onDelete, onLike, sortColumn, onSort, onPageSizeChange } = this.props;
    return (
      <Table
        onPageSizeChange={onPageSizeChange}
        onSort={onSort}
        columns={this.columns}
        sortColumn={sortColumn}
        data={movies}
        onLike={onLike}
        onDelete={onDelete}
      />
    );
  }
}

export default MovieTable;

MovieTable.propTypes = {
  movies: PropTypes.array,
  onDelete: PropTypes.func,
  onLike: PropTypes.func,
  onSort: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  sortColumn: PropTypes.object,
  user: PropTypes.object
};
