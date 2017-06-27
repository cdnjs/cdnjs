/*!
 * angular-datatables - v0.5.4
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = 'datatables.fixedcolumns';
}
(function(window, document, $, angular) {

    'use strict';

    // See https://datatables.net/extensions/fixedcolumns/
    angular.module('datatables.fixedcolumns', ['datatables'])
        .config(dtFixedColumnsConfig);

    /* @ngInject */
    function dtFixedColumnsConfig($provide) {
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
                options.withFixedColumns = withFixedColumns;
                return options;

                /**
                 * Add fixed columns support
                 * @param fixedColumnsOptions the plugin options
                 * @returns {DTOptions} the options
                 */
                function withFixedColumns(fixedColumnsOptions) {
                    options.fixedColumns = true;
                    if (fixedColumnsOptions) {
                        options.fixedColumns = fixedColumnsOptions;
                    }
                    return options;
                }
            }
        }
        dtOptionsBuilderDecorator.$inject = ['$delegate'];
    }
    dtFixedColumnsConfig.$inject = ['$provide'];


})(window, document, jQuery, angular);
