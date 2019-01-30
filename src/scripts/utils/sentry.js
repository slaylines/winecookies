import * as sentry from '@sentry/browser';

sentry.init(window.SENTRY_CONFIG);

export default sentry;
