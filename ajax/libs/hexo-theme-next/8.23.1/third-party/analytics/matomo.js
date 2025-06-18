/* global CONFIG */

if (CONFIG.matomo.enable) {
  window._paq = window._paq || [];
  const _paq = window._paq;

  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  const u = CONFIG.matomo.server_url;
  _paq.push(['setTrackerUrl', u + 'matomo.php']);
  _paq.push(['setSiteId', CONFIG.matomo.site_id]);
  const d = document;
  const g = d.createElement('script');
  const s = d.getElementsByTagName('script')[0];
  g.async = true;
  g.src = u + 'matomo.js';
  s.parentNode.insertBefore(g, s);
}
