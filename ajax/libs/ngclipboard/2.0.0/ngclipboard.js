/*! ngclipboard - v2.0.0 - 2018-03-03
* https://github.com/sachinchoolur/ngclipboard
* Copyright (c) 2018 Sachin; Licensed MIT */
(function() {
    'use strict';
    var MODULE_NAME = 'ngclipboard';
    var angular, ClipboardJS;

    // Check for CommonJS support
    if (typeof module === 'object' && module.exports) {
      angular = require('angular');
      ClipboardJS = require('clipboard');
      module.exports = MODULE_NAME;
    } else {
      angular = window.angular;
      ClipboardJS = window.ClipboardJS;
    }

    angular.module(MODULE_NAME, []).directive('ngclipboard', function() {
        return {
            restrict: 'A',
            scope: {
                ngclipboardSuccess: '&',
                ngclipboardError: '&'
            },
            link: function(scope, element) {
                //constructor for clipboardjs changed to ClipboardJS
                var clipboard = new ClipboardJS(element[0]);

                clipboard.on('success', function(e) {
                  scope.$apply(function () {
                    scope.ngclipboardSuccess({
                      e: e
                    });
                  });
                });

                clipboard.on('error', function(e) {
                  scope.$apply(function () {
                    scope.ngclipboardError({
                      e: e
                    });
                  });
                });

                element.on('$destroy', function() {
                    clipboard.destroy();
                });

            }
        };
    });
})();
