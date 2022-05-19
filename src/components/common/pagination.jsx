import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ itemCounts, pageSize, onPageChange, currentPage }) => {
  const pagesCount = Math.ceil(itemCounts / pageSize);
  const pages = _.range(1, pagesCount + 1);
  if (pagesCount === 1) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item inactive'}>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCounts: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
