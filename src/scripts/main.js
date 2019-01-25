import '../styles/main.scss';
import likely from 'ilyabirman-likely';
import tracker from './utils/tracker';

document.addEventListener('DOMContentLoaded', () => {
  const $headerLink = document.querySelector('.header-link');

  likely.initiate();
  tracker.pageView();

  if ($headerLink) {
    $headerLink.addEventListener('click', event => {
      tracker.logoLinkClick(event);
    });
  }
});
