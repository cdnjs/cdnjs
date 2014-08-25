/*! Lazy Load XT v1.0.0 2014-01-16
 * http://ressio.github.io/lazy-load-xt
 * (C) 2014 RESS.io
 * Licensed under MIT */

(function ($, window, document) {
    var options = $.lazyLoadXT,
        matchMedia = window.matchMedia;

    options.selector += ',picture';

    $(document)
        // remove default behaviour for inner <img> tag
        .on('lazyinit', 'img', function (e, $el) {
            if ($el.parent('picture').length) {
                $el.lazyLoadXT.srcAttr = '';
            }
        })
        // prepare <picture> polyfill
        .on('lazyinit', 'picture', function (e, $el) {
            if (!$el[0].firstChild) {
                return;
            }

            var $img = $el.children('img');
            if (!$img.length) {
                $img = $('<img>').appendTo($el);
            }

            $img
                .attr('width', $el.attr('width'))
                .attr('height', $el.attr('height'));
        })
        // show picture
        .on('lazyshow', 'picture', function (e, $el) {
            if (!$el[0].firstChild) {
                return;
            }

            var srcAttr = $el.lazyLoadXT.srcAttr,
                isFuncSrcAttr = $.isFunction(srcAttr),
                $img = $el.children('img'),
                src = isFuncSrcAttr ? srcAttr($img) : $img.attr(srcAttr);

            if (src) {
                $img.attr('src', src);
            }

            if (matchMedia) {
                $el
                    .children('br')
                    .each(function () {
                        var $child = $(this),
                            src = isFuncSrcAttr ? srcAttr($child) : $child.attr(srcAttr),
                            media = $child.attr('media');

                        if (src && (!media || matchMedia(media).matches)) {
                            $img.attr('src', src);
                        }
                    });
            }
        });

})(window.jQuery || window.Zepto, window, document);
