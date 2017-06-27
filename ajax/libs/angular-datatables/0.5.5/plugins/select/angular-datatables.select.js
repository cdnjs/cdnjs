/*!
 * angular-datatables - v0.5.5
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = 'datatables.select';
}
(function(window, document, $, angular) {

    'use strict';

    // See https://datatables.net/extensions/select/
    angular.module('datatables.select', ['datatables'])
        .config(dtSelectConfig);

    /* @ngInject */
    function dtSelectConfig($provide) {
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
                options.withSelect = withSelect;
                return options;

                /**
                 * Add select compatibility
                 * @param selectOptions the options of the select extension (see https://datatables.net/reference/option/#select)
                 * @returns {DTOptions} the options
                 */
                function withSelect(selectOptions) {
                    if (angular.isUndefined(selectOptions)) {
                        throw new Error('You must define the options for the select extension. See https://datatables.net/reference/option/#select');
                    }
                    options.select = selectOptions;
                    return options;
                }
            }
        }
        dtOptionsBuilderDecorator.$inject = ['$delegate'];
    }
    dtSelectConfig.$inject = ['$provide'];


})(window, document, jQuery, angular);
