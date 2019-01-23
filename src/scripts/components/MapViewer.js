import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';
import MapViewerControls from './MapViewerControls';

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
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    sid: PropTypes.number,
  };

  static defaultProps = {
    scenes: [],
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    sid: 0,
  };

  state = {
    isLandingClosed: false,
    sid: this.props.sid,
  };

  onLandingClose = () => {
    this.setState({ isLandingClosed: true });
  };

  onSceneChange = sid => {
    this.setState({ sid });
  };

  render() {
    const {
      map: Map,
      landing: Landing,
      tiles,
      scenes,
      center,
      zoom,
    } = this.props;

    const { isLandingClosed, sid } = this.state;
    const isLandingVisible = !!Landing && !isLandingClosed;
    const scene = isLandingVisible ? { sid: -1, center, zoom } : scenes[sid];

    return (
      <div className="map-viewer">
        {isLandingVisible ? (
          <Landing onClose={this.onLandingClose} />
        ) : (
          <MapViewerControls
            sid={sid}
            min={0}
            max={scenes.length - 1}
            onChange={this.onSceneChange}
          />
        )}

        <Map tiles={tiles} sid={sid} {...scene} />
      </div>
    );
  }
}

export default MapViewer;
