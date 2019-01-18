import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapViewer extends Component {
  static propTypes = {
    map: PropTypes.func.isRequired,
    landing: PropTypes.func.isRequired,
    tiles: PropTypes.shape({
      url: PropTypes.string.isRequired,
      attribution: PropTypes.string.isRequired,
    }).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    sid: PropTypes.number,
  };

  static defaultProps = {
    data: [],
    sid: 0,
  };

  state = {
    isLandingShown: false,
    sid: this.props.sid,
  };

  // TODO: How to pass initial map view for landing?
  render() {
    const { map: Map, landing: Landing, tiles, data } = this.props;
    const { isLandingShown, sid } = this.state;
    const isLandingVisible = !!Landing && !isLandingShown;
    const slide = data[sid];

    return (
      <div className="map-viewer">
        {isLandingVisible && <Landing />}
        <Map tiles={tiles} {...slide} />
      </div>
    );
  }
}

export default MapViewer;
