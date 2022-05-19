import React from 'react';
import PropTypes from 'prop-types';

const PageSize = ({ onPageSizeChange }) => {
  return (
    <thead>
      <tr>
        <td colSpan={4}>
          Showing{'   '}
          <select
            className="form-select form-select-sm ms-1 me-1 pointer"
            onChange={(e) => onPageSizeChange(e.target.value)}>
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={10}>10</option>
          </select>
          {'   '}of Items
        </td>
      </tr>
    </thead>
  );
};

PageSize.propTypes = {
  onPageSizeChange: PropTypes.func
};

export default PageSize;
