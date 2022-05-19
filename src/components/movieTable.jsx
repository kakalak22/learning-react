import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Like from '../like';
import Table from './common/table';

class MovieTable extends Component {
  state = {
    columns: [
      { label: 'Title', path: 'title' },
      { label: 'Genre', path: 'genre.name' },
      { label: 'Stock', path: 'numberInStock' },
      { label: 'Rate', path: 'dailyRentalRate' },
      {
        key: '1',
        content: (item) => <Like status={item.like} item={item} onLike={this.props.onLike} />
      },
      {
        key: '2',
        content: (item) => (
          <button className="btn btn-danger" onClick={() => this.props.onDelete(item)}>
            Remove
          </button>
        )
      }
    ]
  };
  render() {
    const { columns } = this.state;
    const { movies, onDelete, onLike, sortColumn, onSort, onPageSizeChange } = this.props;
    return (
      <Table
        onPageSizeChange={onPageSizeChange}
        onSort={onSort}
        columns={columns}
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
  sortColumn: PropTypes.object
};
