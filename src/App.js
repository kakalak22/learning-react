import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import auth from './services/authService';
import Movies from './components/movies';
import NavBar from './components/navBar';
import Customer from './components/customer';
import Rental from './components/rental';
import NotFound from './components/notfound';
import Movie from './components/movie';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';
import Logout from './components/logout';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getUser();
    if (user) this.setState({ user });
  }

  render() {
    return (
      <div className="container">
        <NavBar user={this.state.user} />
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
            <Route path="logout" element={<Logout />} />
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
