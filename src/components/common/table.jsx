import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import PropTypes from 'prop-types';
import PageSize from './pageSize';

const Table = ({ onSort, columns, sortColumn, data, onLike, onDelete, onPageSizeChange }) => {
  return (
    <table className="table">
      <PageSize onPageSizeChange={onPageSizeChange} />
      <TableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} onLike={onLike} onDelete={onDelete} />
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.array,
  sortColumn: PropTypes.object,
  data: PropTypes.array,
  onSort: PropTypes.func,
  onLike: PropTypes.func,
  onDelete: PropTypes.func,
  onPageSizeChange: PropTypes.func
};

export default Table;
