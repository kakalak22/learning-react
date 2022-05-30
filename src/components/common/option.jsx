import React from 'react';

const Option = ({ options, selectedOpt }) => {
  return options.map((option) =>
    selectedOpt.length === 0 ? (
      <option key={option._id} value={option._id}>
        {option.name}
      </option>
    ) : selectedOpt[0]._id === option._id ? (
      <option selected key={option._id} value={option._id}>
        {option.name}
      </option>
    ) : (
      <option key={option._id} value={option._id}>
        {option.name}
      </option>
    )
  );
};

export default Option;
