/*!
 * jQuery & Zepto Lazy - YouTube Plugin - v1.5
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load youtube video iframe, like:
    // <iframe data-loader="yt" data-src="1AYGnw6MwFM" data-nocookie="1" width="560" height="315" frameborder="0" allowfullscreen></iframe>
    $.lazy(['yt', 'youtube'], function(element, response) {
        if (element[0].tagName.toLowerCase() === 'iframe') {
            // pass source to iframe
            var noCookie = /1|true/.test(element.attr('data-nocookie'));
            element.attr('src', 'https://www.youtube' + (noCookie ? '-nocookie' : '') + '.com/embed/' + element.attr('data-src') + '?rel=0&amp;showinfo=0');

            // remove attribute
            if (this.config('removeAttribute')) {
                element.removeAttr('data-src');
            }
        }

        else {
            // pass error state
            response(false);
        }
    });
})(window.jQuery || window.Zepto);