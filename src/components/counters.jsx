import React, { Component } from 'react';
import Counter from './counter';
import PropTypes from 'prop-types';
class Counters extends Component {
  render() {
    const { onIncrement, onDecrement, onDelete, counters } = this.props;
    return (
      <div>
        <button className="btn btn-primary btn-sm m-2" onClick={this.props.onReset}>
          Reset
        </button>
        <br />
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }
}

Counters.propTypes = {
  counters: PropTypes.array,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onDelete: PropTypes.func,
  onReset: PropTypes.func
};

export default Counters;
