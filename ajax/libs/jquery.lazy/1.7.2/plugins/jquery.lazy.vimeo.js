/*!
 * jQuery & Zepto Lazy - Vimeo Plugin - v1.0
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load vimeo video iframe, like:
    // <iframe data-loader="vimeo" data-src="176894130" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    $.lazy("vimeo", function(element, response) {
        if( element[0].tagName.toLowerCase() == "iframe" ) {
            // pass source to iframe
            element.attr("src", "https://player.vimeo.com/video/" + element.attr("data-src"));

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