/* global CONFIG, dataLayer, gtag */

if (!CONFIG.google_analytics.only_pageview) {
  if (CONFIG.hostname === location.hostname) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      dataLayer.push(arguments);
    };
    gtag('js', new Date());
    gtag('config', CONFIG.google_analytics.tracking_id);

    document.addEventListener('pjax:success', () => {
      gtag('event', 'page_view', {
        page_location: location.href,
        page_path    : location.pathname,
        page_title   : document.title
      });
    });
  }
} else {
  const sendPageView = () => {
    if (CONFIG.hostname !== location.hostname) return;
    const uid = localStorage.getItem('uid') || (Math.random() + '.' + Math.random());
    localStorage.setItem('uid', uid);
    navigator.sendBeacon('https://www.google-analytics.com/collect', new URLSearchParams({
      v  : 1,
      tid: CONFIG.google_analytics.tracking_id,
      cid: uid,
      t  : 'pageview',
      dp : encodeURIComponent(location.pathname)
    }));
  };
  document.addEventListener('pjax:complete', sendPageView);
  sendPageView();
}
