/* global CONFIG, WPac */

(function() {
  const widgets = [{
    widget: 'Rating',
    id    : CONFIG.rating.id,
    el    : 'wpac-rating',
    color : CONFIG.rating.color
  }];

  document.addEventListener('page:loaded', () => {
    if (!CONFIG.page.isPost) return;

    const newWidgets = widgets.map(widget => ({...widget}));

    if (window.WPac) {
      WPac.init(newWidgets);
    } else {
      window.wpac_init = newWidgets;
    }
  });
})();
