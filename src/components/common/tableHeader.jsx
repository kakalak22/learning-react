import PropTypes from 'prop-types';
import React, { Component } from 'react';

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { order, path } = this.props.sortColumn;
    if (column.path === undefined) return null;
    if (column.path !== path) return <i className="fa fa-sort" aria-hidden="true"></i>;
    if (order === 'asc') return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="pointer"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}>
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  onSort: PropTypes.func,
  columns: PropTypes.array,
  sortColumn: PropTypes.object
};

export default TableHeader;
