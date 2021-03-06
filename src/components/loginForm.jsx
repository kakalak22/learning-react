import React from 'react';
import Joi from 'joi';
import Form from './common/form';
import auth from '../services/authService';
import { withRouter } from '../utils/withRouter';
import { Navigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  schema = Joi.object({
    username: Joi.string().trim().required().label('Username'),
    password: Joi.string().trim().required().label('Password')
  });

  componentDidMount = () => {
    setTimeout(() => {
      toast.info('Admin account: User: bao@gmail.com Password: 123456', { autoClose: false });
    }, 1000);
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { location } = this.props;
      await auth.login(data.username, data.password);
      window.location = location.state ? location.state : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {};
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getUser()) return <Navigate to="/" />;

    return (
      <React.Fragment>
        <ToastContainer />
        <div>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton('Login')}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(LoginForm);
