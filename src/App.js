import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import NavBar from './components/navBar';
import { Routes, Route } from 'react-router-dom';
import Customer from './components/customer';
import Rental from './components/rental';
import NotFound from './components/notfound';
import Movie from './components/movie';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';

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
            <Route path="rental" element={<Rental />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="new-movie" element={<MovieForm />} />
            <Route path="not-found" element={<NotFound />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
