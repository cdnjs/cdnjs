/*! Lazy Load XT v0.8.6 2013-12-18
 * http://ressio.github.io/lazy-load-xt
 * (C) 2013 RESS.io
 * Licensed under MIT */
/*jslint browser:true, plusplus:true, vars:true */
/*jshint browser:true, jquery:true */
/*jshint -W060:false */ /* we use document.write */

(function ($, window, document) {
    var dataLazyTag = $.lazyLoadXT.dataLazyTag || 'data-lazy-tag';

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
        var srcAttr = $.lazyLoadXT.srcAttr;

        $('br[' + dataLazyTag + '],span[' + dataLazyTag + ']').each(function () {
            var attrs = this.attributes,
                el = document.createElement($(this).attr(dataLazyTag)),
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

            while (this.hasChildNodes()) {
                var child = this.removeChild(this.firstChild);
                el.appendChild(child);
            }

            this.parentNode.replaceChild(el, this);
        });

        $(window).lazyLoadXT();
    });

})(window.jQuery || window.Zepto, window, document);
