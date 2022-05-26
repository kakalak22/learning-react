import React from 'react';
import PropTypes from 'prop-types';
import SelectedOption from './selectedOption';
import Option from './option';

const Select = ({ selectedOpt, label, error, options, onChange, name }) => {
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <div className="input-group mb-3">
        <select onChange={onChange} name={name} className="custom-select">
          {selectedOpt && <SelectedOption selectedOpt={selectedOpt} />}
          <Option selectedOpt={selectedOpt} options={options} />
        </select>
        <div className="input-group-append">
          <label className="input-group-text" htmlFor={name}>
            Options
          </label>
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Select;

Select.propTypes = {
  selectedOpt: PropTypes.array,
  options: PropTypes.array,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string
};
