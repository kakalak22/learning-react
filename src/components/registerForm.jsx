import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import * as userService from '../services/userService';
import { withRouter } from '../utils/withRouter';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .label('Username')
      .required(),
    password: Joi.string().min(6).required().label('Password'),
    name: Joi.string().min(6).required().label('Name')
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
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name', 'name')}

          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
