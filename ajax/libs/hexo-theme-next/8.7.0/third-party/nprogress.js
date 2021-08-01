/* global CONFIG, NProgress */

NProgress.configure({
  showSpinner: CONFIG.nprogress.spinner
});
NProgress.start();
document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    NProgress.inc(0.8);
  }
  if (document.readyState === 'complete') {
    NProgress.done();
  }
});
document.addEventListener('pjax:send', () => {
  NProgress.start();
});
document.addEventListener('pjax:success', () => {
  NProgress.done();
});
