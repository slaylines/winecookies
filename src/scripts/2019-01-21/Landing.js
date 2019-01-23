import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Landing extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const { onClose } = this.props;

    return (
      <div className="landing" onClick={onClose}>
        Landing
      </div>
    );
  }
}

export default Landing;
