import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ items, onItemSelect, textProperty, valueProperty, selectedItem }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            selectedItem === item ? 'list-group-item pointer active' : 'list-group-item pointer'
          }
          onClick={() => onItemSelect(item)}>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  items: PropTypes.array,
  onItemSelect: PropTypes.func,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  selectedItem: PropTypes.object
};

//using defaultProps to reduce the props passing from parent to child to make the code cleaner and mor readable
ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;
