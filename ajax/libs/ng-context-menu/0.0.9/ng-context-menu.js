/**
 * ng-context-menu - v0.0.9 - An AngularJS directive to display a context menu when a right-click event is triggered
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
          disabled = $scope.$eval(attrs.contextMenuDisabled),
          win = angular.element($window),
          menuElement = null,
          fn = $parse(attrs.contextMenu);

        function open(event, element) {
          element.addClass('open');
          element.css('top', Math.max(event.pageY, 0) + 'px');
          element.css('left', Math.max(event.pageX, 0) + 'px');
          opened = true;
        }

        function close(element) {
          opened = false;
          element.removeClass('open');
        }

        element.bind('contextmenu', function(event) {
          if (!disabled) {
            // Make sure the DOM is set before we try to find the menu
            if (menuElement === null) {
              menuElement = angular.element(document.getElementById(attrs.target));
            }

            openTarget = event.target;
            event.preventDefault();
            event.stopPropagation();
            $scope.$apply(function() {
              fn($scope, { $event: event });
              open(event, menuElement);
            });
          }
        });

        win.bind('keyup', function(event) {
          if (!disabled && opened && event.keyCode === 27) {
            $scope.$apply(function() {
              close(menuElement);
            });
          }
        });

        function handleWindowClickEvent(event) {
          if (!disabled && opened && (event.button !== 2 || event.target !== openTarget)) {
            $scope.$apply(function() {
              close(menuElement);
            });
          }
        }

        // Firefox treats a right-click as a click and a contextmenu event while other browsers
        // just treat it as a contextmenu event
        win.bind('click', handleWindowClickEvent);
        win.bind('contextmenu', handleWindowClickEvent);
      }
    };
  }]);