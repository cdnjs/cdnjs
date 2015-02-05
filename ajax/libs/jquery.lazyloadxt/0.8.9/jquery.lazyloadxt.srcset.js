/*! Lazy Load XT v0.8.9 2014-01-06
 * http://ressio.github.io/lazy-load-xt
 * (C) 2014 RESS.io
 * Licensed under MIT */

(function ($, window, document, undefined) {
    var options = $.lazyLoadXT,
        srcsetSupport = (function () {
            return 'srcset' in (new Image());
        })(),
        reUrl = /^\s*(\S*)/,
        reWidth = /\S\s+(\d+)w/,
        reHeight = /\S\s+(\d+)h/,
        reDpr = /\S\s+([\d\.]+)x/,
        infty = [0, Infinity],
        one = [0, 1],
        srcsetOptions = {
            srcsetAttr: 'data-srcset',
            srcsetExtended: true,
            srcsetBaseAttr: 'data-srcset-base',
            srcsetExtAttr: 'data-srcset-ext'
        },
        viewport = {
            w: 0,
            h: 0,
            x: 0
        },
        property,
        limit;

    for (property in srcsetOptions) {
        if (options[property] === undefined) {
            options[property] = srcsetOptions[property];
        }
    }

    function mathFilter(array, action) {
        return Math[action].apply(null, $.map(array, function (item) {
            return item[property];
        }));
    }

    function compareMax(item) {
        return item[property] >= viewport[property] || item[property] === limit;
    }

    function compareMin(item) {
        return item[property] === limit;
    }

    $(document).on('lazyshow', 'img', function (e, $el) {
        var srcset = $el.attr(options.srcsetAttr);

        if (srcset) {
            if (!options.srcsetExtended && srcsetSupport) {
                $el.attr('srcset', srcset);
            } else {
                var list = srcset.split(',').map(function (item) {
                    return {
                        url: reUrl.exec(item)[1],
                        w: parseFloat((reWidth.exec(item) || infty)[1]),
                        h: parseFloat((reHeight.exec(item) || infty)[1]),
                        x: parseFloat((reDpr.exec(item) || one)[1])
                    };
                });

                if (list.length) {
                    var documentElement = document.documentElement,
                        whx,
                        src;

                    viewport = {
                        w: window.innerWidth || documentElement.clientWidth,
                        h: window.innerHeight || documentElement.clientHeight,
                        x: window.devicePixelRatio || 1
                    };

                    for (whx in viewport) {
                        property = whx;
                        limit = mathFilter(list, 'max');
                        list = $.grep(list, compareMax);
                    }

                    for (whx in viewport) {
                        property = whx;
                        limit = mathFilter(list, 'min');
                        list = $.grep(list, compareMin);
                    }

                    src = list[0].url;

                    if (options.srcsetExtended) {
                        src = ($el.attr(options.srcsetBaseAttr) || '') + src + ($el.attr(options.srcsetExtAttr) || '');
                    }

                    $el.attr('src', src);
                }
            }
        }
    });

})(window.jQuery || window.Zepto, window, document);
