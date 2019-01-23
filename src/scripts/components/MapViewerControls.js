import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';

class MapViewerControls extends Component {
  static propTypes = {
    sid: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    sid: 0,
    min: 0,
    max: 0,
    disabled: false,
    onChange: () => {},
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
    const { sid, min, max, disabled, children } = this.props;
    const showPrev = !disabled && sid > min;
    const showNext = !disabled && sid < max;

    return (
      <Swipeable
        className="map-viewer-controls"
        onSwipedRight={!disabled ? this.onPrev : undefined}
        onSwipedLeft={!disabled ? this.onNext : undefined}
        trackMouse
      >
        {showPrev && (
          <div className="map-viewer-controls-prev" onClick={this.onPrev}>
            <span className="icon-left-open-big" />
          </div>
        )}

        {showNext && (
          <div className="map-viewer-controls-next" onClick={this.onNext}>
            <span className="icon-right-open-big" />
          </div>
        )}

        {children}
      </Swipeable>
    );
  }
}

export default MapViewerControls;
