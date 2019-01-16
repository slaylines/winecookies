import 'leaflet/dist/leaflet.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import Markers from './Markers';

const defaultPosition = [55.751244, 37.618423];
const defaultZoom = 5;
const copyright = `
  &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy;
  <a href='http://cartodb.com/attributions'>CartoDB</a>
`;
const tiles =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marker: null,
      visible: false,
    };
  }

  componentDidMount() {
    this.setMapBounds();
  }

  setMapBounds() {
    const { markers } = this.props;

    const bounds = {
      minLon: markers[0].lon,
      maxLon: markers[0].lon,
      minLat: markers[0].lat,
      maxLat: markers[0].lat,
    };

    markers.forEach(marker => {
      const { lat, lon } = marker;

      bounds.minLat = Math.min(lat, bounds.minLat);
      bounds.maxLat = Math.max(lat, bounds.maxLat);
      bounds.minLon = Math.min(lon, bounds.minLon);
      bounds.maxLon = Math.max(lon, bounds.maxLon);
    });

    const latDelta = (bounds.maxLat - bounds.minLat) * 0.15;
    const lonDelta = (bounds.maxLon - bounds.minLon) * 0.15;

    this.bounds = [
      [bounds.minLat - latDelta, bounds.minLon - lonDelta],
      [bounds.maxLat + latDelta, bounds.maxLon + lonDelta],
    ];
    this.map.leafletElement.fitBounds(this.bounds);
  }

  shiftMap(left) {
    const size = this.map.leafletElement.getSize();
    const shift = size.x * 0.2 * (left ? -1 : 1);
    const point = size.divideBy(2).subtract([shift, 0]);
    const target = this.map.leafletElement.containerPointToLatLng(point);

    this.map.leafletElement.panTo(target);
  }

  onMarkerClick(marker) {
    const { visible } = this.state;
    if (!visible) {
      this.shiftMap(true);
    }

    this.setState({
      visible: true,
      marker,
    });
  }

  onClose() {
    this.shiftMap(false);
    this.setState({ visible: false });
  }

  render() {
    const { markers } = this.props;
    const { visible, marker } = this.state;

    return (
      <LeafletMap
        className="map"
        ref={node => {
          this.map = node;
        }}
        center={defaultPosition}
        zoom={defaultZoom}
        dragging={false}
        keyboard={false}
        scrollWheelZoom={false}
        touchZoom={false}
        zoomControl={false}
      >
        <TileLayer attribution={copyright} url={tiles} />
        <Markers
          points={markers}
          onClick={point => this.onMarkerClick(point)}
        />
        <div className={classNames(['infoCard', { visible }])}>
          <div className="close" onClick={() => this.onClose()} />
          {marker && (
            <div className="content">
              <div className="title">{marker.name}</div>
              <div className="description">
                <div
                  className="description-content"
                  dangerouslySetInnerHTML={{ __html: marker.description }}
                />
              </div>
              <div className="photos" />
            </div>
          )}
        </div>
      </LeafletMap>
    );
  }
}

Map.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};