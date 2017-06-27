/*!
 * angular-datatables - v0.5.3
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
   module.exports = 'datatables.light-columnfilter';
}
(function (window, document, $, angular) {

'use strict';

// See https://github.com/thansen-solire/datatables-light-columnfilter
angular.module('datatables.light-columnfilter', ['datatables'])
    .config(dtLightColumnFilterConfig)
    .run(initLightColumnFilterPlugin);

/* @ngInject */
function dtLightColumnFilterConfig($provide) {
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
            options.withLightColumnFilter = withLightColumnFilter;
            return options;

            /**
             * Add column filter support
             * @param lightColumnFilterOptions the plugins options
             * @returns {DTOptions} the options
             */
            function withLightColumnFilter(lightColumnFilterOptions) {
                options.hasLightColumnFilter = true;
                if (lightColumnFilterOptions) {
                    options.lightColumnFilterOptions = lightColumnFilterOptions;
                }
                return options;
            }
        }
    }
    dtOptionsBuilderDecorator.$inject = ['$delegate'];
}
dtLightColumnFilterConfig.$inject = ['$provide'];

/* @ngInject */
function initLightColumnFilterPlugin(DTRendererService) {
    var lightColumnFilterPlugin = {
        postRender: postRender
    };
    DTRendererService.registerPlugin(lightColumnFilterPlugin);

    function postRender(options, result) {
        if (options && options.hasLightColumnFilter) {
            new $.fn.dataTable.ColumnFilter(result.DataTable, options.lightColumnFilterOptions);
        }
    }
}
initLightColumnFilterPlugin.$inject = ['DTRendererService'];


})(window, document, jQuery, angular);