/**!
 * AngularJS Ladda directive
 * @author Chungsub Kim <subicura@subicura.com>
 */

/* global Ladda */
(function () {
  'use strict';

  angular.module('angular-ladda', []).directive(
    'ladda',
    [
      '$compile',
      function ($compile) {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            element.addClass('ladda-button');
            if(angular.isUndefined(element.attr('data-style'))) {
              element.attr('data-style', 'zoom-in');
            }
            var ladda = Ladda.create( element[0] );
            $compile(angular.element(element.children()[0]).contents())(scope);

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
              }
            });
          }
        };
      }
    ]
  );
})();
