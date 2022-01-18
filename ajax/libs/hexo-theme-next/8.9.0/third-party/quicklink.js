/* global CONFIG, quicklink */

(function() {
  if (typeof CONFIG.quicklink.ignores === 'string') {
    const ignoresStr = `[${CONFIG.quicklink.ignores}]`;
    CONFIG.quicklink.ignores = JSON.parse(ignoresStr);
  }

  let resetFn = null;

  const onRefresh = () => {
    if (resetFn) resetFn();
    if (!CONFIG.quicklink.enable) return;

    let ignoresArr = CONFIG.quicklink.ignores || [];
    if (!Array.isArray(ignoresArr)) {
      ignoresArr = [ignoresArr];
    }

    resetFn = quicklink.listen({
      timeout : CONFIG.quicklink.timeout,
      priority: CONFIG.quicklink.priority,
      ignores : [
        uri => uri.includes('#'),
        uri => uri === CONFIG.quicklink.url,
        ...ignoresArr
      ]
    });
  };

  if (CONFIG.quicklink.delay) {
    window.addEventListener('load', onRefresh);
    document.addEventListener('pjax:success', onRefresh);
  } else {
    document.addEventListener('page:loaded', onRefresh);
  }
})();
