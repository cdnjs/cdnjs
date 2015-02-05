/**
 * ng-context-menu - v0.1.3 - An AngularJS directive to display a context menu when a right-click event is triggered
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
angular
  .module('ng-context-menu', [])
  .factory('ContextMenuService', function() {
    return {
      menuElement: null
    };
  })
  .directive('contextMenu', ['$document', 'ContextMenuService', function($document, ContextMenuService) {
    return {
      restrict: 'A',
      scope: {
        'callback': '&contextMenu',
        'disabled': '&contextMenuDisabled'
      },
      link: function($scope, element, attrs) {
        var opened = false,
            openTarget;

        function open(event, element) {
          element.addClass('open');
          element.css('top', Math.max(event.pageY, 0) + 'px');
          element.css('left', Math.max(event.pageX, 0) + 'px');
          opened = true;
        }

        function close(element) {
          element.removeClass('open');
          opened = false;
        }

        element.bind('contextmenu', function(event) {
          if (!$scope.disabled()) {
            if (ContextMenuService.menuElement !== null) {
              close(ContextMenuService.menuElement);
            }
            ContextMenuService.menuElement = angular.element(document.getElementById(attrs.target));

            openTarget = event.target;
            event.preventDefault();
            event.stopPropagation();
            $scope.$apply(function() {
              $scope.callback({ $event: event });
              open(event, ContextMenuService.menuElement);
            });
          }
        });

        $document.bind('keyup', function(event) {
          if (!$scope.disabled() && opened && event.keyCode === 27) {
            $scope.$apply(function() {
              close(ContextMenuService.menuElement);
            });
          }
        });

        function handleClickEvent(event) {
          if (!$scope.disabled() && opened && (event.button !== 2 || event.target !== openTarget)) {
            $scope.$apply(function() {
              close(ContextMenuService.menuElement);
            });
          }
        }

        // Firefox treats a right-click as a click and a contextmenu event while other browsers
        // just treat it as a contextmenu event
        $document.bind('click', handleClickEvent);
        $document.bind('contextmenu', handleClickEvent);
      }
    };
  }]);
