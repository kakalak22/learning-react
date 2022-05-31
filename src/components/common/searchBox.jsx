import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ onChange, value }) => {
  return (
    <input
      placeholder="Input movie name"
      className="form-control"
      style={{ marginBottom: '30px' }}
      type="text"
      onChange={onChange}
      value={value}
    />
  );
};

export default SearchBox;

SearchBox.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};
