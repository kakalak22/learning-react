import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import NavBar from './components/navBar';
import { Routes, Route } from 'react-router-dom';
import Customer from './components/customer';
import Rental from './components/rental';
import NotFound from './components/notfound';
import Movie from './components/movie';

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/">
            <Route index element={<Movies />} />
            <Route path="movies">
              <Route index element={<Movies />} />
              <Route path=":id" element={<Movie />} />
            </Route>
            <Route path="customer" element={<Customer />} />
            <Route path="rental" element={<Rental />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
