import 'leaflet/dist/leaflet.css';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeTheme from 'photoswipe/dist/photoswipe-ui-default';

import Markers from './Markers';
import { getMarkersBounds } from '../utils/map';

export default class Map extends Component {
  static propTypes = {
    tiles: PropTypes.shape({
      url: PropTypes.string.isRequired,
      attribution: PropTypes.string.isRequired,
    }).isRequired,
    markers: PropTypes.arrayOf(PropTypes.object),
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
    this.setMapBounds();
  }

  componentWillReceiveProps({ markers, sid }) {
    if (this.props.sid !== sid) {
      this.setMapBounds(markers);
    }
  }

  setMapBounds(markers = this.props.markers) {
    if (!markers.length) return;

    const bounds = getMarkersBounds(markers);
    this.map.leafletElement.flyToBounds(bounds, { animate: true, duration: 1 });
  }

  clearInfoCardScroll = () => {
    this.description.scrollTo(0, 0);
    this.photos.scrollTo(0, 0);
  };

  onMarkerClick = marker => {
    this.setState({
      visible: true,
      marker,
    });
  };

  onClose = () => {
    this.setState({ visible: false });
    this.clearInfoCardScroll();
  };

  onMapClick = () => {
    const { visible } = this.state;

    if (!visible) {
      return;
    }

    this.onClose();
  };

  initPhotoSwipe(index) {
    const { marker } = this.state;
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const gallery = new PhotoSwipe(
      pswpElement,
      PhotoSwipeTheme,
      marker.photos,
      { index }
    );

    gallery.init();
  }

  render() {
    const { tiles, center, zoom, markers } = this.props;
    const { visible, marker } = this.state;

    const photosCount = marker ? marker.photos.length : 1;
    const photosWidth = photosCount <= 3 ? 100 / photosCount : 30;

    return (
      <LeafletMap
        className="map"
        ref={node => {
          this.map = node;
        }}
        center={center}
        zoom={zoom}
        dragging={false}
        keyboard={false}
        scrollWheelZoom={false}
        touchZoom={false}
        zoomControl={false}
        doubleClickZoom={false}
      >
        <TileLayer {...tiles} />
        <div className="overlay" onClick={this.onMapClick} />
        <Markers
          points={markers}
          onClick={point => this.onMarkerClick(point)}
        />
        <div className={classNames(['infoCard', { visible }])}>
          <div className="close" onClick={this.onClose} />
          {marker && (
            <div className="content">
              <div className="title">{marker.name}</div>
              <div className="description">
                <div
                  className="description-content"
                  dangerouslySetInnerHTML={{ __html: marker.description }}
                  ref={node => {
                    this.description = node;
                  }}
                />
              </div>
              <div
                className="photos"
                ref={node => {
                  this.photos = node;
                }}
              >
                {marker.photos.map((photo, index) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    style={{ width: `${photosWidth}%` }}
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
