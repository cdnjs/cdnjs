/*! Lazy Load XT v0.8.9 2014-01-06
 * http://ressio.github.io/lazy-load-xt
 * (C) 2014 RESS.io
 * Licensed under MIT */

(function ($) {
    var options = $.lazyLoadXT;

    options.forceEvent += ' lazyloadall';
    options.autoLoad = options.autoLoad || 50;

    $(document).ready(function () {
        setTimeout(function () {
            $(window).trigger('lazyloadall');
        }, options.autoLoad);
    });

})(window.jQuery || window.Zepto);
