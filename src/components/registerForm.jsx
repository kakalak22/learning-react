import React from 'react';
import Joi from 'joi';
import Form from './common/form';
import auth from '../services/authService';
import * as userService from '../services/userService';
import { withRouter } from '../utils/withRouter';
import { toast, ToastContainer } from 'react-toastify';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  schema = Joi.object({
    username: Joi.string()
      .trim()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co', 'uk', 'vn', 'us'] } })
      .label('Username')
      .required(),
    password: Joi.string().trim().min(6).required().label('Password'),
    name: Joi.string().trim().min(1).required().label('Name')
  });

  componentDidMount = () => {
    setTimeout(() => {
      toast.info('Admin account: User: bao@gmail.com Password: 123456', { autoClose: false });
    }, 1000);
  };

  doSubmit = async () => {
    const { data: user } = this.state;
    try {
      const { headers } = await userService.register(user);
      const jwt = headers['x-auth-token'];
      auth.registerLogin(jwt);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderInput('name', 'Name', 'name')}
            {this.renderButton('Register')}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(RegisterForm);
