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
        <div className="button">
          <img src="/images/2019-01-30-uzupio/stamp.png" />
          Смотреть места
        </div>
        <img className="logo" src="/images/2019-01-30-uzupio/uzupio.png" />
      </div>
    );
  }
}

export default Landing;
