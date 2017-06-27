/*! pym-loader - v1.0.0 - 2016-08-30 */
/*
* pym-loader.js is a wrapper library that deals with particular CMS scenarios to successfully load Pym.js into a given page
* To find out more about Pym.js check out the docs at http://blog.apps.npr.org/pym.js/ or the readme at README.md for usage.
*/

/** @module pym-loader */
(function(requirejs, jQuery) {
    /**
    * Initialize pym instances if Pym.js itself is available
    *
    * @method initializePym
    * @instance
    *
    * @param {String} pym Pym.js loaded library.
    */
    var initializePym = function(pym) {
        if(pym) {
            pym.autoInit();
            return true;
        }
        return false;
    };

    /**
     * Load pym with Requirejs if it is available on the page
     * Used in CorePublisher CMS member sites with persistent players
     * Create a different context to allow multiversion
     * via: http://requirejs.org/docs/api.html#multiversion
     *
     * @method tryLoadingWithRequirejs
     * @instance
     *
     * @param {String} pymUrl Url where Pym.js can be found
     */
    var tryLoadingWithRequirejs = function(pymUrl) {
        if (typeof requirejs !== 'undefined') {
            // Requirejs config wants bare name, not the extension
            pymUrl = pymUrl.split(".js")[0];
            var context = 'context_' + pymUrl.split('/').slice(-1)[0];
            // Requirejs detected, create a local require.js namespace
            var require_pym = requirejs.config({
                context: context,
                paths: {
                    'pym': pymUrl,
                 },
                shim: {
                    'pym': { exports: 'pym' }
                }
            });

            // Load pym into local namespace
            require_pym(['require', 'pym'], function(require, pym) {
                initializePym(pym);
            });
            return true;
        }
        return false;
    };

    /**
     * Load pym through jQuery async getScript module
     * Since this loader can be embedded multiple times in the same post
     * the function manages a global flag called pymloading to avoid
     * possible race conditions
     *
     * @method tryLoadingWithJQuery
     * @instance
     *
     * @param {String} pymUrl Url where Pym.js can be found
     */
    var tryLoadingWithJQuery = function(pymUrl) {
        if (typeof jQuery !== 'undefined' && typeof jQuery.getScript === 'function') {
            jQuery.getScript(pymUrl).done(function() {
                initializePym(window.pym);
            });
            return true;
        }
        return false;
    };

    /**
     * As another loading fallback approach
     * try to append the script tag to the head of the document
     * via http://stackoverflow.com/questions/6642081/jquery-getscript-methods-internal-process
     * via http://unixpapa.com/js/dyna.html
     *
     * @method loadPymViaEmbedding
     * @instance
     *
     * @param {String} pymUrl Url where Pym.js can be found
     */
    var loadPymViaEmbedding = function(pymUrl) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = pymUrl;
        script.onload = function() {
            // Remove the script tag once pym it has been loaded
            if (head && script.parentNode) {
                head.removeChild(script);
            }
            initializePym(window.pym);
        };
        head.appendChild(script);
    };

    var pymUrl = "//pym.nprapps.org/pym.v1.min.js";
    /* Check for local testing, if the replacement has not been done yet on the build process */
    if (pymUrl.lastIndexOf('@@', 0) === 0) { pymUrl = '//pym.nprapps.org/pym.v1.min.js'; }
    tryLoadingWithRequirejs(pymUrl) || tryLoadingWithJQuery(pymUrl) || loadPymViaEmbedding(pymUrl);

    /**
     * Callback to initialize Pym.js on document load events
     *
     * @method pageLoaded
     * @instance
     */
    var pageLoaded = function() {
        document.removeEventListener("DOMContentLoaded", pageLoaded);
        window.removeEventListener("load", pageLoaded);
        return initializePym(window.pym);
    };

    // Listen to page load events to account for pjax load and sync issues
    window.document.addEventListener("DOMContentLoaded", pageLoaded);
    // Fallback for wider browser support
    window.addEventListener("load", pageLoaded);

})(window.requirejs, window.jQuery);
