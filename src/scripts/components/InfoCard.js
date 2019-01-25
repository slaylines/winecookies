import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Portal } from 'react-portal';
import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeTheme from 'photoswipe/dist/photoswipe-ui-default';
import tracker from '../utils/tracker';

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

  initGallery() {
    const { marker } = this.props;
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeTheme, marker.photos);

    gallery.init();
    tracker.infoCardGalleryView(marker.name);
  }

  clearInfoCardScroll = () => {
    this.content.scrollTo(0, 0);
  };

  onClose = () => {
    this.clearInfoCardScroll();
    this.props.onClose();
  };

  render() {
    const { marker, visible } = this.props;
    const classes = classNames(['info-card-container', { visible }]);
    const portalNode = document.querySelector('.map-viewer-controls');

    return (
      <Portal node={portalNode}>
        <div className={classes}>
          <div className="info-card-overlay" onClick={this.onClose} />

          <div className="info-card">
            {marker && (
              <div
                className="content"
                ref={node => {
                  this.content = node;
                }}
              >
                <div className="title">{marker.name}</div>
                <div className="photos" onClick={() => this.initGallery()}>
                  <div className="photos-container">
                    {marker.photos.slice(0, 3).map(photo => (
                      <img key={photo.src} src={photo.src} />
                    ))}
                  </div>
                  <div className="photos-button">Смотреть фото</div>
                </div>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: marker.description }}
                />
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
