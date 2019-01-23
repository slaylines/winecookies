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
        <div className="header">
          <div className="title">Республика Ужупис</div>
          <div className="subtitle">Вильнюс, Литва</div>
        </div>
        <img className="logo" src="/images/2019-01-21-uzupio/uzupio.png" />
        <div className="button">Смотреть места</div>
      </div>
    );
  }
}

export default Landing;
