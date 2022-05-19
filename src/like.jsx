import React from 'react';
import PropTypes from 'prop-types';

const Like = ({ status, item, onLike }) => {
  return (
    <i
      className={status ? 'pointer fa fa-heart-o' : 'pointer fa fa-heart'}
      aria-hidden="true"
      onClick={() => onLike(item)}></i>
  );
};

export default Like;

Like.propTypes = {
  status: PropTypes.bool,
  onLike: PropTypes.func,
  item: PropTypes.object
};
