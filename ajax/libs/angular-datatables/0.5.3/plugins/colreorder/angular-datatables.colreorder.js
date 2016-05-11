/*!
 * angular-datatables - v0.5.3
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
   module.exports = 'datatables.colreorder';
}
(function (window, document, $, angular) {

'use strict';

// See https://datatables.net/extras/colreorder/
angular.module('datatables.colreorder', ['datatables'])
    .config(dtColReorderConfig);

/* @ngInject */
function dtColReorderConfig($provide, DT_DEFAULT_OPTIONS) {
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
            options.withColReorder = withColReorder;
            options.withColReorderOption = withColReorderOption;
            options.withColReorderOrder = withColReorderOrder;
            options.withColReorderCallback = withColReorderCallback;
            return options;

            /**
             * Add colReorder compatibility
             * @returns {DTOptions} the options
             */
            function withColReorder() {
                var colReorderPrefix = 'R';
                options.dom = options.dom ? options.dom : DT_DEFAULT_OPTIONS.dom;
                if (options.dom.indexOf(colReorderPrefix) === -1) {
                    options.dom = colReorderPrefix + options.dom;
                }
                options.hasColReorder = true;
                return options;
            }

            /**
             * Add option to "oColReorder" option
             * @param key the key of the option to add
             * @param value an object or a function of the function
             * @return {DTOptions} the options
             */
            function withColReorderOption(key, value) {
                if (angular.isString(key)) {
                    options.oColReorder = options.oColReorder && options.oColReorder !== null ? options.oColReorder : {};
                    options.oColReorder[key] = value;
                }
                return options;
            }

            /**
             * Set the default column order
             * @param aiOrder the column order
             * @returns {DTOptions} the options
             */
            function withColReorderOrder(aiOrder) {
                if (angular.isArray(aiOrder)) {
                    options.withColReorderOption('aiOrder', aiOrder);
                }
                return options;
            }

            /**
             * Set the reorder callback function
             * @param fnReorderCallback the callback
             * @returns {DTOptions} the options
             */
            function withColReorderCallback(fnReorderCallback) {
                if (angular.isFunction(fnReorderCallback)) {
                    options.withColReorderOption('fnReorderCallback', fnReorderCallback);
                } else {
                    throw new Error('The reorder callback must be a function');
                }
                return options;
            }
        }
    }
    dtOptionsBuilderDecorator.$inject = ['$delegate'];
}
dtColReorderConfig.$inject = ['$provide', 'DT_DEFAULT_OPTIONS'];


})(window, document, jQuery, angular);