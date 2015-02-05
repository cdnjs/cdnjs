/**
 * ng-context-menu - An AngularJS directive to display a context menu when a right-click event is triggered
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
angular
  .module('ng-context-menu', [])
  .directive('contextMenu', ['$window', function($window) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        var opened = false,
            menuElement = angular.element(document.getElementById(attrs.target)),
            open = function open(event, element) {
              opened = true;
              element.css('top', event.layerY + 'px');
              element.css('left', event.layerX + 'px');
              element.addClass('open');
            },
            close = function close(element) {
              opened = false;
              element.removeClass('open');
            };

        menuElement.css('position', 'absolute');

        element.bind('contextmenu', function(event) {
          $scope.$apply(function() {
            event.preventDefault();
            open(event, menuElement);
          });
        });

        angular.element($window).bind('click', function(event) {
          if (opened) {
            $scope.$apply(function() {
              event.preventDefault();
              close(menuElement);
            });
          }
        });
      }
    };
  }]);