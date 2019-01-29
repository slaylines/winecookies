import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-leaflet';
import { DivIcon } from 'leaflet';

export default class Markers extends Component {
  getIcon({ icon }) {
    return new DivIcon({
      className: 'marker-icon-container',
      html: `
        <div class="marker-icon">
          <img src="${icon}">
        </div>
      `,
    });
  }

  render() {
    const { points, onClick } = this.props;

    return (
      <div>
        {points.map(point => (
          <Marker
            key={`${point.lat}_${point.lon}`}
            position={[point.lat, point.lon]}
            icon={this.getIcon(point)}
            onClick={() => onClick(point)}
          />
        ))}
      </div>
    );
  }
}

Markers.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClick: PropTypes.func.isRequired,
};
