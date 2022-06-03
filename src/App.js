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
import ProtectedRoute from './components/common/protectedRoute';
import ShowModal from './components/common/modal';
import { withRouter } from './utils/withRouter';

import auth from './services/authService';
import './App.css';

class App extends Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showModal: true });
    }, 180000);
    const user = auth.getUser();
    if (user) this.setState({ user });
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
    console.log(this.state.showModal);
  };

  handleAgree = () => {
    window.location = 'https://github.com/kakalak22/learning-react/';
  };

  handleDisagree = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { user } = this.state;
    const modal = {
      title: 'Thank You',
      content: `Thanks you for spending time to view my very first project using React. 
        I would be very grateful if you could give me some advice to improve my skills.
        My email: tr.gia.bao.94@gmail.com. Thanks again and have a nice day :D`
    };

    return (
      <React.Fragment>
        <ShowModal
          isShow={this.state.showModal}
          title={modal.title}
          content={modal.content}
          onAgree={this.handleAgree}
          onDisagree={this.handleDisagree}
        />
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
      </React.Fragment>
    );
  }
}

export default withRouter(App);
