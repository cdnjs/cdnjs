/*!
 * angular-datatables - v0.4.3
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
(function (window, document, $, angular) {

'use strict';

// See https://datatables.net/extensions/fixedcolumns/
angular.module('datatables.fixedcolumns', ['datatables'])
    .config(dtFixedColumnsConfig)
    .run(initFixedColumnsPlugin);

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
                options.hasFixedColumns = true;
                if (fixedColumnsOptions) {
                    options.fixedColumnsOptions = fixedColumnsOptions;
                }
                return options;
            }
        }
    }
    dtOptionsBuilderDecorator.$inject = ['$delegate'];
}
dtFixedColumnsConfig.$inject = ['$provide'];

/* @ngInject */
function initFixedColumnsPlugin(DTRendererService) {
    var fixedColumnsPlugin = {
        postRender: postRender
    };
    DTRendererService.registerPlugin(fixedColumnsPlugin);

    function postRender(options, result) {
        if (options && options.hasFixedColumns) {
            new $.fn.dataTable.FixedColumns(result.DataTable, options.fixedColumnsOptions);
        }
    }
}
initFixedColumnsPlugin.$inject = ['DTRendererService'];


})(window, document, jQuery, angular);