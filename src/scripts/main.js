import '../styles/main.scss';
import likely from 'ilyabirman-likely';
import tracker from './utils/tracker';

document.addEventListener('DOMContentLoaded', () => {
  const $headerLink = document.querySelector('.header-link');
  const $socialLinks = document.querySelectorAll('.likely > div');

  likely.initiate();
  tracker.pageView();

  if ($headerLink) {
    $headerLink.addEventListener('click', () => {
      tracker.logoLinkClick();
    });
  }

  if ($socialLinks) {
    $socialLinks.forEach($link => {
      $link.addEventListener('click', () => {
        const name = $link
          .getAttribute('class')
          .replace(/likely__widget_?/g, '')
          .trim()
          .toLowerCase();

        tracker.socialMediaSharing(name);
      });
    });
  }
});
