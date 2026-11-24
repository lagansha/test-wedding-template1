/* Lagansha — tiny shared script. No tracking, no analytics, no cookies. */
(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('mobileNav');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕' : '☰';
    });
    mobile.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        mobile.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
    });
  }

  // Keep the copyright year current without any external request.
  var y = document.getElementById('year');
  if (y) { y.textContent = String(new Date().getFullYear()); }

  /* Google Maps is a third-party embed that can set its own cookies.
     We only create the iframe after an explicit click (consent + faster LCP). */
  window.loadMap = function () {
    var slot = document.getElementById('mapSlot');
    var consent = document.getElementById('mapConsent');
    if (!slot || slot.dataset.loaded === 'true') { return; }
    var url = slot.getAttribute('data-embed');
    if (!url) { return; }
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.title = 'Lagansha Matrimonial Services on Google Maps';
    iframe.width = '100%';
    iframe.height = '300';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.border = '0';
    slot.appendChild(iframe);
    slot.dataset.loaded = 'true';
    slot.classList.add('map-frame');
    if (consent) { consent.style.display = 'none'; }
  };
})();
