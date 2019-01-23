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
    const { tiles, defaultCenter, defaultZoom, markers } = this.props;
    const { visible, marker } = this.state;

    const photosCount = marker ? marker.photos.length : 1;
    const photosWidth = photosCount <= 3 ? 100 / photosCount : 30;

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
