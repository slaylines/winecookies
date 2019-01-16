import 'leaflet/dist/leaflet.css';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

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

    const latDelta = (bounds.maxLat - bounds.minLat) * 0.1;
    const lonDelta = (bounds.maxLon - bounds.minLon) * 0.1;

    this.bounds = [
      [bounds.minLat - latDelta, bounds.minLon - lonDelta],
      [bounds.maxLat + latDelta, bounds.maxLon + lonDelta],
    ];
    this.map.leafletElement.fitBounds(this.bounds);
  }

  onMarkerClick(marker) {
    this.setState({
      visible: true,
      marker,
    });
  }

  onClose() {
    this.setState({ visible: false });
  }

  initPhotoSwipe(index) {
    const { marker } = this.state;
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const gallery = new PhotoSwipe(
      pswpElement,
      PhotoSwipeUI_Default,
      marker.photos,
      { index }
    );

    gallery.init();
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
        doubleClickZoom={false}
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
              <div className="photos">
                {marker.photos.map((photo, index) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    style={{ width: `${100 / marker.photos.length}%` }}
                    onClick={() => this.initPhotoSwipe(index)}
                  />
                ))}
              </div>
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
