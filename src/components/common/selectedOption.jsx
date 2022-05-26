import React from 'react';

const SelectedOption = ({ selectedOpt }) => {
  return selectedOpt.map((opt) => (
    <option key={opt._id} value={opt._id}>
      {opt.name}
    </option>
  ));
};

export default SelectedOption;
