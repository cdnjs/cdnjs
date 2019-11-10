/*!
 * jQuery & Zepto Lazy - AJAX Plugin - v1.4
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load data by ajax request and pass them to elements inner html, like:
    // <div data-loader="ajax" data-src="url.html" data-method="post" data-type="html"></div>
    $.lazy('ajax', function(element, response) {
        ajaxRequest(this, element, response, element.attr('data-method'));
    });

    // load data by ajax get request and pass them to elements inner html, like:
    // <div data-loader="get" data-src="url.html" data-type="html"></div>
    $.lazy('get', function(element, response) {
        ajaxRequest(this, element, response, 'GET');
    });

    // load data by ajax post request and pass them to elements inner html, like:
    // <div data-loader="post" data-src="url.html" data-type="html"></div>
    $.lazy('post', function(element, response) {
        ajaxRequest(this, element, response, 'POST');
    });

    // load data by ajax put request and pass them to elements inner html, like:
    // <div data-loader="put" data-src="url.html" data-type="html"></div>
    $.lazy('put', function(element, response) {
        ajaxRequest(this, element, response, 'PUT');
    });

    /**
     * execute ajax request and handle response
     * @param {object} instance
     * @param {jQuery|object} element
     * @param {function} response
     * @param {string} [method]
     */
    function ajaxRequest(instance, element, response, method) {
        method = method ? method.toUpperCase() : 'GET';

        var data;
        if ((method === 'POST' || method === 'PUT') && instance.config('ajaxCreateData')) {
            data = instance.config('ajaxCreateData').apply(instance, [element]);
        }

        $.ajax({
            url: element.attr('data-src'),
            type: method === 'POST' || method === 'PUT' ? method : 'GET',
            data: data,
            dataType: element.attr('data-type') || 'html',

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
                if (instance.config('removeAttribute')) {
                    element.removeAttr('data-src data-method data-type');
                }
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