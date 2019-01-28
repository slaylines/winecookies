import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-leaflet';
import { DivIcon } from 'leaflet';

export default class Markers extends Component {
  getIcon({ icon }) {
    return new DivIcon({
      className: 'marker-icon',
      html: `<img src='${icon}'>`,
    });
  }

  onClick = (event, point) => {
    event.originalEvent.preventDefault();

    this.props.onClick(point);
  };

  render() {
    const { points } = this.props;

    return (
      <div>
        {points.map(point => (
          <Marker
            key={`${point.lat}_${point.lon}`}
            position={[point.lat, point.lon]}
            icon={this.getIcon(point)}
            onClick={event => this.onClick(event, point)}
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
