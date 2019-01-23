import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';

class MapViewerControls extends Component {
  static propTypes = {
    sid: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    sid: 0,
    min: 0,
    max: 0,
    onPrev: () => {},
    onNext: () => {},
  };

  onPrev = () => {
    const { sid, min, onChange } = this.props;
    const newSid = Math.max(sid - 1, min);

    if (newSid !== sid) onChange(newSid);
  };

  onNext = () => {
    const { sid, max, onChange } = this.props;
    const newSid = Math.min(sid + 1, max);

    if (newSid !== sid) onChange(newSid);
  };

  render() {
    const { sid, min, max } = this.props;
    const showPrev = sid > min;
    const showNext = sid < max;

    return (
      <Swipeable
        className="map-viewer-controls"
        onSwipedRight={this.onPrev}
        onSwipedLeft={this.onNext}
      >
        {showPrev && (
          <div className="map-viewer-controls-prev" onClick={this.onPrev}>
            &lsaquo;
          </div>
        )}

        {showNext && (
          <div className="map-viewer-controls-next" onClick={this.onNext}>
            &rsaquo;
          </div>
        )}
      </Swipeable>
    );
  }
}

export default MapViewerControls;
