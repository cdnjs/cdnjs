/*!
 * angular-datatables - v0.6.2
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = 'datatables.fixedheader';
}
(function(window, document, $, angular) {

    'use strict';

    // See https://datatables.net/extensions/fixedheader/
    angular.module('datatables.fixedheader', ['datatables'])
        .config(dtFixedHeaderConfig)
        .run(initFixedHeaderPlugin);

    /* @ngInject */
    function dtFixedHeaderConfig($provide) {
        $provide.decorator('DTOptionsBuilder', dtOptionsBuilderDecorator);

        function dtOptionsBuilderDecorator($delegate) {
            var newOptions = $delegate.newOptions;
            var fromSource = $delegate.fromSource;
            var fromFnPromise = $delegate.fromFnPromise;

            $delegate.newOptions = function() {
                return _decorateOptions(newOptions);
            };
            $delegate.fromSource = function(ajax) {
                return _decorateOptions(fromSource, ajax);
            };
            $delegate.fromFnPromise = function(fnPromise) {
                return _decorateOptions(fromFnPromise, fnPromise);
            };

            return $delegate;

            function _decorateOptions(fn, params) {
                var options = fn(params);
                options.withFixedHeader = withFixedHeader;
                return options;

                /**
                 * Add fixed header support
                 * @param fixedHeaderOptions the plugin options
                 * @returns {DTOptions} the options
                 */
                function withFixedHeader(fixedHeaderOptions) {
                    options.hasFixedHeader = true;
                    if (fixedHeaderOptions) {
                        options.fixedHeaderOptions = fixedHeaderOptions;
                    }
                    return options;
                }
            }
        }
        dtOptionsBuilderDecorator.$inject = ['$delegate'];
    }
    dtFixedHeaderConfig.$inject = ['$provide'];

    /* @ngInject */
    function initFixedHeaderPlugin(DTRendererService) {
        var fixedHeaderPlugin = {
            postRender: postRender
        };
        DTRendererService.registerPlugin(fixedHeaderPlugin);

        function postRender(options, result) {
            if (options && options.hasFixedHeader) {
                new $.fn.dataTable.FixedHeader(result.DataTable, options.fixedHeaderOptions);
            }
        }
    }
    initFixedHeaderPlugin.$inject = ['DTRendererService'];


})(window, document, jQuery, angular);
