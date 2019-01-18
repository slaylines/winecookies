import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapViewer extends Component {
  static propTypes = {
    MapComponent: PropTypes.func.isRequired,
    LandingComponent: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    sid: PropTypes.number,
  };

  static defaultProps = {
    data: [],
    sid: 0,
  };

  render() {
    return <div>Hello</div>;
  }
}

export default MapViewer;
