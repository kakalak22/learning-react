import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
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

import auth from './services/authService';
import './App.css';
import ProtectedRoute from './components/common/protectedRoute';
import { withRouter } from './utils/withRouter';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getUser();
    if (user) this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="container">
        <NavBar user={user} />
        <Routes>
          <Route path="/">
            <Route index element={<Movies user={user} />} />
            <Route path="movies">
              <Route index element={<Movies user={user} />} />
              <Route path=":id" element={<ProtectedRoute component={Movie} />} />
            </Route>
            <Route path="customer" element={<Customer />} />
            <Route path="rental" element={<Rental />} />
            <Route path="rental" element={<Rental />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="logout" element={<Logout />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="new-movie" element={<ProtectedRoute component={MovieForm} />} />
            <Route path="not-found" element={<NotFound />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default withRouter(App);
