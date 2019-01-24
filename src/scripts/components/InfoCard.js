import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Portal } from 'react-portal';
import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeTheme from 'photoswipe/dist/photoswipe-ui-default';

class InfoCard extends Component {
  static propTypes = {
    marker: PropTypes.object,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    onClose: () => {},
  };

  initGallery(index) {
    const { marker } = this.props;
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const gallery = new PhotoSwipe(
      pswpElement,
      PhotoSwipeTheme,
      marker.photos,
      { index }
    );

    gallery.init();
  }

  clearInfoCardScroll = () => {
    this.description.scrollTo(0, 0);
    this.photos.scrollTo(0, 0);
  };

  onClose = () => {
    this.clearInfoCardScroll();
    this.props.onClose();
  };

  render() {
    const { marker, visible } = this.props;
    const classes = classNames(['info-card-container', { visible }]);
    const photosCount = marker ? marker.photos.length : 1;
    const photosWidth = photosCount <= 3 ? 100 / photosCount : 30;
    const portalNode = document.querySelector('.map-viewer-controls');

    return (
      <Portal node={portalNode}>
        <div className={classes}>
          <div className="info-card-overlay" onClick={this.onClose} />

          <div className="info-card">
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
                      onClick={() => this.initGallery(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="close" onClick={this.onClose}>
              <span className="icon-cancel" />
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}

export default InfoCard;
