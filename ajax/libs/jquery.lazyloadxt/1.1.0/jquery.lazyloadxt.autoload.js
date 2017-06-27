/*! Lazy Load XT v1.1.0 2016-01-12
 * http://ressio.github.io/lazy-load-xt
 * (C) 2016 RESS.io
 * Licensed under MIT */

(function ($) {
    var options = $.lazyLoadXT;

    options.forceEvent += ' lazyautoload';
    options.autoLoadTime = options.autoLoadTime || 50;

    $(document).ready(function () {
        setTimeout(function () {
            $(window).trigger('lazyautoload');
        }, options.autoLoadTime);
    });

})(window.jQuery || window.Zepto || window.$);
