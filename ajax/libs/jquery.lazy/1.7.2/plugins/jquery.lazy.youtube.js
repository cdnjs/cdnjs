/*!
 * jQuery & Zepto Lazy - YouTube Plugin - v1.3
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load youtube video iframe, like:
    // <iframe data-loader="yt" data-src="1AYGnw6MwFM" width="560" height="315" frameborder="0" allowfullscreen></iframe>
    $.lazy(["yt", "youtube"], function(element, response) {
        if( element[0].tagName.toLowerCase() == "iframe" ) {
            // pass source to iframe
            element.attr("src", "https://www.youtube.com/embed/" + element.attr("data-src") + "?rel=0&amp;showinfo=0");

            // remove attribute
            if( this.config("removeAttribute") )
                element.removeAttr("data-src");
        }

        else {
            // pass error state
            // use response function for Zepto
            response(false);
        }
    });
})(window.jQuery || window.Zepto);