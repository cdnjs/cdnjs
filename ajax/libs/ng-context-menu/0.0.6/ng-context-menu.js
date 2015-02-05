/**
 * ng-context-menu - An AngularJS directive to display a context menu when a right-click event is triggered
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
angular
  .module('ng-context-menu', [])
  .directive('contextMenu', ['$window', '$parse', function($window, $parse) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        var opened = false,
            openTarget,
            win = angular.element($window),
            menuElement = angular.element(document.getElementById(attrs.target)),
            open = function open(event, element) {
              element.addClass('open');
              element.css('top', event.pageY + 'px');
              element.css('left', event.pageX + 'px');
              opened = true;
            },
            close = function close(element) {
              opened = false;
              element.removeClass('open');
            },
            fn = $parse(attrs.contextMenu);

        menuElement.css('position', 'absolute');

        element.bind('contextmenu', function(event) {
          openTarget = event.target;
          event.preventDefault();
          event.stopPropagation();
          $scope.$apply(function() {
            fn($scope, { $event: event });
            open(event, menuElement);
          });
        });

        win.bind('keyup', function(event) {
          if (opened && event.keyCode === 27) {
            $scope.$apply(function() {
              close(menuElement);
            });
          }
        });

        win.bind('click', function(event) {
          if (opened && (event.button !== 2 || event.target !== openTarget)) {
            $scope.$apply(function() {
              close(menuElement);
            });
          }
        });
      }
    };
  }]);