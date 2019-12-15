/*!
 * jQuery & Zepto Lazy - iFrame Plugin - v1.5
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2012 - 2018, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL-2.0 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 */
;(function($) {
    // load iframe content, like:
    // <iframe data-src="iframe.html"></iframe>
    //
    // enable content error check with:
    // <iframe data-src="iframe.html" data-error-detect="true"></iframe>
    $.lazy(['frame', 'iframe'], 'iframe', function(element, response) {
        var instance = this;

        if (element[0].tagName.toLowerCase() === 'iframe') {
            var srcAttr = 'data-src',
                errorDetectAttr = 'data-error-detect',
                errorDetect = element.attr(errorDetectAttr);

            // default way, just replace the 'src' attribute
            if (errorDetect !== 'true' && errorDetect !== '1') {
                // set iframe source
                element.attr('src', element.attr(srcAttr));

                // remove attributes
                if (instance.config('removeAttribute')) {
                    element.removeAttr(srcAttr + ' ' + errorDetectAttr);
                }
            }

            // extended way, even check if the document is available
            else {
                $.ajax({
                    url: element.attr(srcAttr),
                    dataType: 'html',
                    crossDomain: true,
                    xhrFields: {withCredentials: true},

                    /**
                     * success callback
                     * @access private
                     * @param {*} content
                     * @return {void}
                     */
                    success: function(content) {
                        // set responded data to element's inner html
                        element.html(content)

                        // change iframe src
                        .attr('src', element.attr(srcAttr));

                        // remove attributes
                        if (instance.config('removeAttribute')) {
                            element.removeAttr(srcAttr + ' ' + errorDetectAttr);
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
        }

        else {
            // pass error state to lazy
            // use response function for Zepto
            response(false);
        }
    });
})(window.jQuery || window.Zepto);