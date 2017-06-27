/*!
 * angular-datatables - v0.5.5
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = 'datatables.columnfilter';
}
(function(window, document, $, angular) {

    'use strict';

    // See http://jquery-datatables-column-filter.googlecode.com/svn/trunk/index.html
    angular.module('datatables.columnfilter', ['datatables'])
        .config(dtColumnFilterConfig)
        .run(initColumnFilterPlugin);

    /* @ngInject */
    function dtColumnFilterConfig($provide) {
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
                options.withColumnFilter = withColumnFilter;
                return options;

                /**
                 * Add column filter support
                 * @param columnFilterOptions the plugins options
                 * @returns {DTOptions} the options
                 */
                function withColumnFilter(columnFilterOptions) {
                    options.hasColumnFilter = true;
                    if (columnFilterOptions) {
                        options.columnFilterOptions = columnFilterOptions;
                    }
                    return options;
                }
            }
        }
        dtOptionsBuilderDecorator.$inject = ['$delegate'];
    }
    dtColumnFilterConfig.$inject = ['$provide'];

    /* @ngInject */
    function initColumnFilterPlugin(DTRendererService) {
        var columnFilterPlugin = {
            postRender: postRender
        };
        DTRendererService.registerPlugin(columnFilterPlugin);

        function postRender(options, result) {
            if (options && options.hasColumnFilter) {
                result.dataTable.columnFilter(options.columnFilterOptions);
            }
        }
    }
    initColumnFilterPlugin.$inject = ['DTRendererService'];


})(window, document, jQuery, angular);
