import { Component } from 'react';
import Joi from 'joi';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = { data: {}, errors: {} };
  validate = () => {
    const { error } = this.schema.validate(this.state.data);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const propertyToValidate = { [name]: value };

    const schemaOfProperty = Joi.object({ [name]: this.schema.extract(name) });

    const { error } = schemaOfProperty.validate(propertyToValidate);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  renderInput = (name, label, type = 'text') => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        type={type}
      />
    );
  };

  renderSelect = (id, label) => {
    const { errors, genres, selectedOpt } = this.state;
    return (
      <Select
        label={label}
        error={errors[id]}
        name={id}
        onChange={this.handleChange}
        options={genres}
        selectedOpt={selectedOpt}
      />
    );
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;
