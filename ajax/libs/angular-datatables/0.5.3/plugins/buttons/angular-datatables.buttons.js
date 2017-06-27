/*!
 * angular-datatables - v0.5.3
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
   module.exports = 'datatables.buttons';
}
(function (window, document, $, angular) {

'use strict';

// See https://datatables.net/extensions/buttons/
angular.module('datatables.buttons', ['datatables'])
    .config(dtButtonsConfig)
    .run(initButtonsPlugin);

/* @ngInject */
function dtButtonsConfig($provide, DT_DEFAULT_OPTIONS) {
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
            options.withButtons = withButtons;
            return options;

            /**
             * Add buttons compatibility
             * @param buttonsOptions the options of the buttons extension (see https://datatables.net/reference/option/buttons#Examples)
             * @returns {DTOptions} the options
             */
            function withButtons(buttonsOptions) {
                var buttonsPrefix = 'B';
                options.dom = options.dom ? options.dom : DT_DEFAULT_OPTIONS.dom;
                if (options.dom.indexOf(buttonsPrefix) === -1) {
                    options.dom = buttonsPrefix + options.dom;
                }
                if (angular.isUndefined(buttonsOptions)) {
                    throw new Error('You must define the options for the button extension. See https://datatables.net/reference/option/buttons#Examples for some example');
                }
                options.buttons = buttonsOptions;
                return options;
            }
        }
    }
    dtOptionsBuilderDecorator.$inject = ['$delegate'];
}
dtButtonsConfig.$inject = ['$provide', 'DT_DEFAULT_OPTIONS'];

/* @ngInject */
function initButtonsPlugin(DTRendererService) {
    var buttonsPlugin = {
        preRender: preRender,
        postRender: postRender
    };
    DTRendererService.registerPlugin(buttonsPlugin);

    function preRender(options) {
        if (angular.isArray(options.buttons)) {
            // The extension buttons seems to clear the content of the options.buttons for some reasons...
            // So, we save it in a tmp variable so that we can restore it afterwards
            // See https://github.com/l-lin/angular-datatables/issues/502
            options.buttonsTmp = options.buttons.slice();
        }
    }

    function postRender(options) {
        if (angular.isDefined(options.buttonsTmp)) {
            // Restore the buttons options
            options.buttons = options.buttonsTmp;
            delete options.buttonsTmp;
        }
    }
}
initButtonsPlugin.$inject = ['DTRendererService'];


})(window, document, jQuery, angular);