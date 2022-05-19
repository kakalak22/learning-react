import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import PropTypes from 'prop-types';

const Table = ({ onSort, columns, sortColumn, data, onLike, onDelete }) => {
  return (
    <table className="table">
      <TableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} onLike={onLike} onDelete={onDelete} />
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func,
  columns: PropTypes.array,
  sortColumn: PropTypes.object,
  data: PropTypes.array,
  onLike: PropTypes.func,
  onDelete: PropTypes.func
};

export default Table;
