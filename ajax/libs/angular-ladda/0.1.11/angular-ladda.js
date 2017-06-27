/**!
 * AngularJS Ladda directive
 * @author Chungsub Kim <subicura@subicura.com>
 */

/* global Ladda */
(function () {
  'use strict';

  angular.module('angular-ladda', [])
    .provider('ladda', function () {
      var opts = {
        'style': 'zoom-in'
      };
      return {
        setOption: function (newOpts) {
          angular.extend(opts, newOpts);
        },
        $get: function () {
          return opts;
        }
      };
    })
    .directive('ladda', ['$compile', '$timeout', 'ladda', function ($compile, $timeout, laddaOption) {
        return {
          restrict: 'A',
          replace: false,
          terminal: true,
          priority: 1000,
          link: function (scope, element, attrs) {
            element.addClass('ladda-button');
            if(angular.isUndefined(element.attr('data-style'))) {
              element.attr('data-style', laddaOption.style || 'zoom-in');
            }
            var ladda = Ladda.create( element[0] );

            $timeout(function() {
              element.removeAttr('ladda');
              $compile(element)(scope);

              scope.$watch(attrs.ladda, function(loading) {
                if(loading || angular.isNumber(loading)) {
                  if(!ladda.isLoading()) {
                    ladda.start();
                  }
                  if(angular.isNumber(loading)) {
                    ladda.setProgress(loading);
                  }
                } else {
                  ladda.stop();
                  // When the button also have the ng-disabled directive it needs to be 
                  // re-evaluated since the disabled attribute is removed by the 'stop' method.
                  if (attrs.ngDisabled) {
                    element.attr('disabled', scope.$eval(attrs.ngDisabled));
                  }
                }
              });
            }, 0);
          }
        };
      }
    ]
  );
})();
