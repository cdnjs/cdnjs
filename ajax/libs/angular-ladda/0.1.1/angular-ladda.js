/**!
 * AngularJS ladda directive
 * @author Chungsub Kim <subicura@subicura.com>
 * @version 0.0.1
 */

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
            element.html('<span class="ladda-label">' + element.html() + '</span>')
            $compile(element.contents())(scope);
            element.addClass('ladda-button');
            element.attr('data-style', 'zoom-in');

            var l = Ladda.create( element[0] );

            scope.$watch(attrs.ladda, function(loading) {
              if(loading) {
                l.start();
              } else {
                l.stop();
              }
            });
          }
        };
      }
    ]
  );
})();
