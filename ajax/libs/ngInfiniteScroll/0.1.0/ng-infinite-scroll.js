/* ngInfiniteScroll - v0.1.0 - 2013-02-21 */
var mod;

mod = angular.module('infinite-scroll', []);

mod.factory('docWindow', [
  '$window', function($window) {
    return angular.element($window);
  }
]);

mod.directive('infiniteScroll', [
  '$rootScope', 'docWindow', '$document', function($rootScope, docWindow, $document) {
    return {
      link: function(scope, elem, attrs) {
        var $window, checkWhenEnabled, handler, scrollDistance, scrollEnabled;
        $window = docWindow;
        scrollDistance = 0;
        if (attrs.infiniteScrollDistance != null) {
          scope.$watch(attrs.infiniteScrollDistance, function(value) {
            return scrollDistance = parseInt(value, 10);
          });
        }
        scrollEnabled = true;
        checkWhenEnabled = false;
        if (attrs.infiniteScrollDisabled != null) {
          scope.$watch(attrs.infiniteScrollDisabled, function(value) {
            scrollEnabled = !value;
            if (scrollEnabled && checkWhenEnabled) {
              checkWhenEnabled = false;
              return handler();
            }
          });
        }
        handler = function() {
          var documentBottom, remaining, shouldScroll, windowBottom;
          windowBottom = $window.height() + $window.scrollTop();
          documentBottom = $document.height();
          remaining = documentBottom - windowBottom;
          shouldScroll = remaining <= $window.height() * scrollDistance;
          if (shouldScroll && scrollEnabled) {
            if ($rootScope.$$phase) {
              return scope.$eval(attrs.infiniteScroll);
            } else {
              return scope.$apply(attrs.infiniteScroll);
            }
          } else if (shouldScroll) {
            return checkWhenEnabled = true;
          }
        };
        $window.on('scroll', handler);
        scope.$on('$destroy', function() {
          return $window.off('scroll', handler);
        });
        if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
          return handler();
        }
      }
    };
  }
]);
