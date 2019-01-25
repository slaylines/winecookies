const AMPLITUDE_CHECK_FREQUENCY = 40; // ms
const AMPLITUDE_CHECK_RETRIES_COUNT = 25;

class Tracker {
  constructor({ enabled, debug } = {}) {
    this.page = document.documentElement.getAttribute('page');
    this.enabled = !!enabled;
    this.debug = !!debug;
    this.loaded = false;
    this.blocked = false;
    this.queue = [];

    if (this.enabled) {
      this.waitAmplitude();
    }
  }

  /**
   * Core API.
   */

  get api() {
    return window.amplitude.getInstance();
  }

  waitAmplitude() {
    let retriesCount = 0;

    const wait = () => {
      setTimeout(() => {
        if (retriesCount > AMPLITUDE_CHECK_RETRIES_COUNT) return;

        if (typeof window.amplitude === 'undefined') {
          retriesCount += 1;
          wait();
        } else {
          this.initialize();
        }
      }, AMPLITUDE_CHECK_FREQUENCY);
    };

    wait();
  }

  initialize() {
    this.loaded = true;
    this.blocked = !window.amplitude.options;

    setTimeout(() => this.processQueue(), 0);
  }

  processQueue() {
    this.queue.forEach(({ name, data, callback }) => {
      this.track(name, data, callback);
    });
  }

  track(name, data, callback) {
    const xdata = this.extendData(data);

    if (this.debug) {
      const status = this.loaded ? 'Queued' : 'Sent';
      const timestamp = new Date().toLocaleTimeString();

      // eslint-disable-next-line
      console.log(`[Amplitude:${status}][${timestamp}]`, name, xdata);
    }

    if (!this.enabled || this.blocked) return;

    if (this.loaded) {
      this.api.logEvent(name, xdata, callback);
    } else {
      this.queue.push({ name, data, callback });
    }
  }

  extendData(data = {}) {
    return Object.assign(data, {
      page: this.page,
    });
  }

  /**
   * Helpers.
   */

  pageView() {
    this.track('Page View', { url: window.location.pathname });
  }

  socialMediaSharing(name) {
    this.track('Social Media Sharing', { name });
  }

  telegramSubscription() {
    this.track('Telegram Subscription');
  }

  logoLinkClick() {
    this.track('Logo Link: Click');
  }

  landingClick() {
    this.track('Landing: Click');
  }

  mapViewerNav(sid, direction) {
    this.track('Map Viewer: Nav', { sid, direction });
  }

  markerClick(name) {
    this.track('Marker: Click', { name });
  }

  infoCardGalleryView(name) {
    this.track('Info Card: Gallery View', { name });
  }

  infoCardFullScroll(name) {
    this.track('Info Card: Full Scroll', { name });
  }
}

export default new Tracker(window.TRACKER_CONFIG);
