/*!
 * jQuery & Zepto Lazy - AJAX Plugin - v1.2
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2016, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load data by ajax request and pass them to elements inner html, like:
    // <div data-loader="ajax" data-src"url.html" data-method="post" data-type="html"></div>
    $.lazy("ajax", function(element, response) {
        ajaxRequest(this, element, response, element.attr("data-method"));
    });

    // load data by ajax get request and pass them to elements inner html, like:
    // <div data-loader="get" data-src"url.html" data-type="html"></div>
    $.lazy("get", function(element, response) {
        ajaxRequest(this, element, response, "get");
    });

    // load data by ajax post request and pass them to elements inner html, like:
    // <div data-loader="post" data-src"url.html" data-type="html"></div>
    $.lazy("post", function(element, response) {
        ajaxRequest(this, element, response, "post");
    });

    /**
     * execute ajax request and handle response
     * @param {object} instance
     * @param {jQuery|object} element
     * @param {function} response
     * @param {string} [method]
     */
    function ajaxRequest(instance, element, response, method) {
        $.ajax({
            url: element.attr("data-src"),
            type: method || "get",
            dataType: element.attr("data-type") || "html",

            /**
             * success callback
             * @access private
             * @param {*} content
             * @return {void}
             */
            success: function(content) {
                // set responded data to element's inner html
                element.html(content);

                // use response function for Zepto
                response(true);

                // remove attributes
                if( instance.config("removeAttribute") )
                    element.removeAttr("data-src data-method data-type");
            },

            /**
             * error callback
             * @access private
             * @return {void}
             */
            error: function() {
                // pass error state to lazy
                // use response function for Zepto
                response(false);
            }
        });
    }
})(window.jQuery || window.Zepto);