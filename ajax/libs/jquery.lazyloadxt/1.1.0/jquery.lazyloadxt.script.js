/*! Lazy Load XT v1.1.0 2016-01-12
 * http://ressio.github.io/lazy-load-xt
 * (C) 2016 RESS.io
 * Licensed under MIT */

(function ($, window, document) {
    var options = $.lazyLoadXT,
        dataLazyTag = options.dataLazyTag || 'data-lazy-tag';

    window.L = function (tag) {
        document.write('<br ' + dataLazyTag + '="' + (tag || 'img') + '" ');
    };

    window.Lb = function (tag) {
        document.write('<span ' + dataLazyTag + '="' + (tag || 'video') + '" ');
    };

    window.Le = function () {
        document.write('</span>');
    };

    $(document).ready(function () {
        var srcAttr = options.srcAttr;
        if ($.isFunction(srcAttr)) {
            srcAttr = 'data-src';
        }

        $('br[' + dataLazyTag + '],span[' + dataLazyTag + ']').each(function (index, origElem) {
            var attrs = origElem.attributes,
                el = document.createElement($(origElem).attr(dataLazyTag)),
                i;

            for (i = 0; i < attrs.length; i++) {
                var attr = attrs[i];
                if (attr.specified) {
                    var attrName = attr.nodeName,
                        attrValue = attr.nodeValue;
                    if (attrName.charAt(0) !== '<') {
                        if (attrName === 'src') {
                            el.setAttribute(srcAttr, attrValue);
                        } else {
                            el.setAttribute(attrName, attrValue);
                        }
                    }
                }
            }

            while (origElem.hasChildNodes()) {
                var child = origElem.removeChild(origElem.firstChild);
                el.appendChild(child);
            }

            origElem.parentNode.replaceChild(el, origElem);
        });

        $(window).lazyLoadXT();
    });

})(window.jQuery || window.Zepto || window.$, window, document);
