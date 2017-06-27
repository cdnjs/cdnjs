/* ng-infinite-scroll - v1.1.0 - 2014-04-03 */
var mod;

mod = angular.module('infinite-scroll', []);

mod.value('THROTTLE_MILLISECONDS', null);

mod.directive('infiniteScroll', [
  '$rootScope', '$window', '$timeout', 'THROTTLE_MILLISECONDS', function($rootScope, $window, $timeout, THROTTLE_MILLISECONDS) {
    return {
      scope: {
        infiniteScroll: '&',
        infiniteScrollContainer: '=',
        infiniteScrollDistance: '=',
        infiniteScrollDisabled: '='
      },
      link: function(scope, elem, attrs) {
        var changeContainer, checkWhenEnabled, container, handleInfiniteScrollContainer, handleInfiniteScrollDisabled, handleInfiniteScrollDistance, handler, immediateCheck, scrollDistance, scrollEnabled, throttle;
        $window = angular.element($window);
        scrollDistance = null;
        scrollEnabled = null;
        checkWhenEnabled = null;
        container = null;
        immediateCheck = true;
        handler = function() {
          var containerBottom, elementBottom, remaining, shouldScroll;
          if (container === $window) {
            containerBottom = container.height() + container.scrollTop();
            elementBottom = elem.offset().top + elem.height();
          } else {
            containerBottom = container.height();
            elementBottom = elem.offset().top - container.offset().top + elem.height();
          }
          remaining = elementBottom - containerBottom;
          shouldScroll = remaining <= container.height() * scrollDistance + 1;
          if (shouldScroll && scrollEnabled) {
            return scope.infiniteScroll();
          } else if (shouldScroll) {
            return checkWhenEnabled = true;
          }
        };
        throttle = function(func, wait) {
          var later, previous, timeout;
          timeout = null;
          previous = 0;
          later = function() {
            var context;
            previous = new Date().getTime();
            $timeout.cancel(timeout);
            timeout = null;
            func.call();
            return context = null;
          };
          return function() {
            var now, remaining;
            now = new Date().getTime();
            remaining = wait - (now - previous);
            if (remaining <= 0) {
              clearTimeout(timeout);
              $timeout.cancel(timeout);
              timeout = null;
              previous = now;
              return func.call();
            } else {
              if (!timeout) {
                return timeout = $timeout(later, remaining);
              }
            }
          };
        };
        if (THROTTLE_MILLISECONDS != null) {
          handler = throttle(handler, THROTTLE_MILLISECONDS);
        }
        scope.$on('$destroy', function() {
          return container.off('scroll', handler);
        });
        handleInfiniteScrollDistance = function(v) {
          return scrollDistance = parseInt(v, 10) || 0;
        };
        scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
        handleInfiniteScrollDistance(scope.infiniteScrollDistance);
        handleInfiniteScrollDisabled = function(v) {
          scrollEnabled = !v;
          if (scrollEnabled && checkWhenEnabled) {
            checkWhenEnabled = false;
            return handler();
          }
        };
        scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
        handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);
        changeContainer = function(newContainer) {
          if (container != null) {
            container.off('scroll', handler);
          }
          container = newContainer;
          if (newContainer != null) {
            return container.on('scroll', handler);
          }
        };
        changeContainer($window);
        handleInfiniteScrollContainer = function(newContainer) {
          if ((!(newContainer != null)) || newContainer.length === 0) {
            return;
          }
          newContainer = angular.element(newContainer);
          if (newContainer != null) {
            return changeContainer(newContainer);
          } else {
            throw new Exception("invalid infinite-scroll-container attribute.");
          }
        };
        scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
        handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);
        if (attrs.infiniteScrollParent != null) {
          changeContainer(angular.element(elem.parent()));
        }
        if (attrs.infiniteScrollImmediateCheck != null) {
          immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
        }
        return $timeout((function() {
          if (immediateCheck) {
            return handler();
          }
        }), 0);
      }
    };
  }
]);
