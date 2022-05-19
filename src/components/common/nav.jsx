import React from 'react';
import { PropTypes } from 'prop-types';

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar <span className="badge badge-pill badge-info">{this.props.totalCounters()}</span>
      </a>
    </nav>
  );
};

NavBar.propTypes = {
  totalCounters: PropTypes.func
};

export default NavBar;
