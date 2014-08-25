/*! Lazy Load XT v0.8.6 2013-12-18
 * http://ressio.github.io/lazy-load-xt
 * (C) 2013 RESS.io
 * Licensed under MIT */
/*jslint browser:true */
/*jshint browser:true, jquery:true */

(function ($) {
var options = $.lazyLoadXT,
        widgetAttr = options.widgetAttr || 'data-lazy-widget',
        reComment = /<!--([\s\S]*)-->/;

    options.selector += ',[' + widgetAttr + ']';

    $(document).on('lazyshow', '[' + widgetAttr + ']', function () {
        var $div = $('#' + $(this).attr(widgetAttr)),
            match;
        if ($div.length) {
            match = reComment.exec($div.html());
            if (match) {
                $div.replaceWith($.trim(match[1]));
            }
        }
    });

})(window.jQuery || window.Zepto);
