import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Image extends Component {
  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
  };

  state = {
    loaded: false,
  };

  onImageLoad = () => {
    this.setState({ loaded: true });
  };

  componentDidMount() {
    this.preloadImage();
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = () => {};
    }
  }

  preloadImage() {
    const { src } = this.props;

    if (this.image) {
      this.image.onload = this.onImageLoad;
      this.image.src = src;
    }
  }

  render() {
    const { className, alt } = this.props;
    const classes = classNames(className, { loaded: this.state.loaded });

    return (
      <img
        className={classes}
        alt={alt}
        ref={node => {
          this.image = node;
        }}
      />
    );
  }
}

export default Image;
