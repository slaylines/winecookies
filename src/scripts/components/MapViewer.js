import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapViewerControls from './MapViewerControls';
import tracker from '../utils/tracker';

const DEFAULT_CENTER = [55.751244, 37.618423]; // Moscow, Russia
const DEFAULT_ZOOM = 5;

class MapViewer extends Component {
  static propTypes = {
    map: PropTypes.func.isRequired,
    landing: PropTypes.func.isRequired,
    tiles: PropTypes.shape({
      url: PropTypes.string.isRequired,
      attribution: PropTypes.string.isRequired,
    }).isRequired,
    scenes: PropTypes.arrayOf(PropTypes.object),
    defaultCenter: PropTypes.arrayOf(PropTypes.number),
    defaultZoom: PropTypes.number,
    defaultSid: PropTypes.number,
  };

  static defaultProps = {
    scenes: [],
    defaultCenter: DEFAULT_CENTER,
    defaultZoom: DEFAULT_ZOOM,
    defaultSid: 0,
  };

  state = {
    isLandingClosed: false,
    sid: this.props.defaultSid,
  };

  landingScene() {
    const { defaultCenter, defaultZoom } = this.props;

    return { sid: -1, defaultCenter, defaultZoom };
  }

  onLandingClose = () => {
    this.setState({ isLandingClosed: true });
    tracker.landingClick();
  };

  onSceneChange = (sid, direction) => {
    this.setState({ sid });
    tracker.mapViewerNav(sid, direction);
  };

  render() {
    const { map: Map, landing: Landing, tiles, scenes } = this.props;
    const { isLandingClosed, sid } = this.state;

    const isLandingVisible = !!Landing && !isLandingClosed;
    const scene = isLandingVisible ? this.landingScene() : scenes[sid];

    return (
      <div className="map-viewer">
        <MapViewerControls
          sid={sid}
          min={0}
          max={scenes.length - 1}
          disabled={isLandingVisible}
          onChange={this.onSceneChange}
        >
          {isLandingVisible && <Landing onClose={this.onLandingClose} />}
          <Map tiles={tiles} sid={sid} {...scene} />
        </MapViewerControls>
      </div>
    );
  }
}

export default MapViewer;
