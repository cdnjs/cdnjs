/*!
 * jQuery & Zepto Lazy - NOOP Plugin - v1.2
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // will do nothing, used to disable elements or for development
    // use like:
    // <div data-loader="noop"></div>

    // does not do anything, just a 'no-operation' helper ;)
    $.lazy("noop", function() {});

    // does nothing, but response a successfull loading
    $.lazy("noop-success", function(element, response) {
        // use response function for Zepto
        response(true);
    });

    // does nothing, but response a failed loading
    $.lazy("noop-error", function(element, response) {
        // use response function for Zepto
        response(false);
    });
})(window.jQuery || window.Zepto);