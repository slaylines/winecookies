import 'leaflet/dist/leaflet.css';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import Markers from './Markers';
import InfoCard from './InfoCard';
import { getMarkersBounds } from '../utils/map';
import tracker from '../utils/tracker';

const ANIMATION_DURATION = 1;

export default class Map extends Component {
  static propTypes = {
    tiles: PropTypes.shape({
      url: PropTypes.string.isRequired,
      attribution: PropTypes.string.isRequired,
    }).isRequired,
    markers: PropTypes.arrayOf(PropTypes.object),
    defaultCenter: PropTypes.arrayOf(PropTypes.number),
    defaultZoom: PropTypes.number,
    bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    sid: PropTypes.number,
  };

  static defaultProps = {
    markers: [],
  };

  state = {
    marker: null,
    visible: false,
  };

  componentDidMount() {
    this.animateToScene();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sid !== nextProps.sid) {
      this.animateToScene(nextProps);
    }
  }

  animateToScene(props = this.props) {
    const { markers, center, zoom, bounds } = props;

    if (center && zoom) {
      this.flyTo(center, zoom);
    } else if (bounds) {
      this.flyToBounds(bounds);
    } else if (markers.length === 1) {
      this.flyTo([markers[0].lat, markers[0].lon]);
    } else if (markers.length > 1) {
      this.flyToBounds(getMarkersBounds(markers));
    }
  }

  flyTo(center, zoom) {
    this.map.leafletElement.flyTo(center, zoom, {
      animate: true,
      duration: ANIMATION_DURATION,
    });
  }

  flyToBounds(bounds) {
    this.map.leafletElement.flyToBounds(bounds, {
      animate: true,
      duration: ANIMATION_DURATION,
    });
  }

  onMarkerClick = marker => {
    this.setState({
      visible: true,
      marker,
    });

    tracker.markerClick(marker.name);
  };

  onInfoCardClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const { tiles, defaultCenter, defaultZoom, markers } = this.props;
    const { visible, marker } = this.state;

    return (
      <LeafletMap
        className="map"
        ref={node => {
          this.map = node;
        }}
        center={defaultCenter}
        zoom={defaultZoom}
        dragging={false}
        keyboard={false}
        scrollWheelZoom={false}
        touchZoom={false}
        zoomControl={false}
        doubleClickZoom={false}
      >
        <TileLayer {...tiles} />
        <Markers
          points={markers}
          onClick={point => this.onMarkerClick(point)}
        />
        <InfoCard
          marker={marker}
          visible={visible}
          onClose={this.onInfoCardClose}
        />
      </LeafletMap>
    );
  }
}
