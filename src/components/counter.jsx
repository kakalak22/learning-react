import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
class Counter extends Component {
  render() {
    const { onIncrement, onDecrement, onDelete, counter } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-1">
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </div>
          <button onClick={() => onIncrement(counter)} className="btn btn-secondary btn-sm m-2">
            +
          </button>
          <button
            onClick={() => onDecrement(counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={counter.value <= 0 ? true : false}>
            -
          </button>
          <button className="btn btn-danger btn-sm m-2" onClick={() => onDelete(counter.id)}>
            X
          </button>
          <br />
        </div>
      </React.Fragment>
    );
  }

  getBadgeClasses = () => {
    let classes = 'badge m-2 badge-';
    classes += this.props.counter.value === 0 ? 'warning' : 'primary';
    return classes;
  };

  formatCount = () => {
    return this.props.counter.value === 0 ? 'Zero' : this.props.counter.value;
  };
}

Counter.propTypes = {
  value: PropTypes.number,
  onDelete: PropTypes.func,
  id: PropTypes.number,
  counter: PropTypes.object,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func
};

export default Counter;
