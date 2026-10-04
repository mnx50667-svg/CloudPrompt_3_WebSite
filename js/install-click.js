// Sends a Google Analytics "install_click" event when a visitor clicks a link to the Chrome Web Store.
// Never blocks or delays navigation, sends no personal data, and does nothing if Google Analytics is not loaded.
(function () {
  'use strict';

  var STORE_HOST = 'chromewebstore.google.com';

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;

    var link = target.closest('a[href]');
    if (!link || link.hostname !== STORE_HOST) return;
    if (typeof window.gtag !== 'function') return;

    window.gtag('event', 'install_click', {
      link_url: link.href,
      page_location_path: window.location.pathname
    });
  }, { capture: true, passive: true });
})();
