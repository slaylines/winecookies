import React, { Component } from 'react';
import tracker from '../utils/tracker';

const SUBSCRIPTION_URL = 'http://tglink.me/winecookies';

// FYI: https://stackoverflow.com/a/10477334/1211780
class MapViewerSubscribe extends Component {
  onClick = () => {
    tracker.telegramSubscription();
  };

  render() {
    return (
      <a
        className="map-viewer-subscribe"
        href={SUBSCRIPTION_URL}
        rel="noopener noreferrer"
        target="_blank"
        onClick={this.onClick}
      >
        <div className="map-viewer-subscribe-letters">
          <svg viewBox="0 0 100 100">
            <defs>
              <path
                id="text-circle"
                d="M 50 50 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
              />
            </defs>
            <text>
              <textPath xlinkHref="#text-circle">Подписаться</textPath>
            </text>
          </svg>
        </div>
        <div className="map-viewer-subscribe-icon">
          <img src="/images/telegram.svg" />
        </div>
      </a>
    );
  }
}

export default MapViewerSubscribe;
