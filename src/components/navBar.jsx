import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Vidly
      </a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customer">
              Customer
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/rental">
              Rental
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
