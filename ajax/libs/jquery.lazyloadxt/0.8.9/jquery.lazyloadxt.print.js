/*! Lazy Load XT v0.8.9 2014-01-06
 * http://ressio.github.io/lazy-load-xt
 * (C) 2014 RESS.io
 * Licensed under MIT */

(function ($, window) {
    $.lazyLoadXT.forceEvent += ' beforeprint';

    if (window.matchMedia) {
        window
            .matchMedia('print')
            .addListener(function (mql) {
                if (mql.matches) {
                    $(window).trigger('beforeprint');
                }
            });
    }

})(window.jQuery || window.Zepto, window);
