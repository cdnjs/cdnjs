/**
  * x is a value between 0 and 1, indicating where in the animation you are.
  */
var duScrollDefaultEasing = function (x) {
  if (x < 0.5) {
    return Math.pow(x * 2, 2) / 2;
  }
  return 1 - Math.pow((1 - x) * 2, 2) / 2;
};
angular.module('duScroll', [
  'duScroll.scrollspy',
  'duScroll.requestAnimation',
  'duScroll.smoothScroll',
  'duScroll.scrollContainer',
  'duScroll.scrollHelpers'
]).value('duScrollDuration', 350).value('duScrollGreedy', false).value('duScrollEasing', duScrollDefaultEasing);
angular.module('duScroll.scrollHelpers', []).run([
  '$window',
  '$q',
  'cancelAnimation',
  'requestAnimation',
  'duScrollEasing',
  function ($window, $q, cancelAnimation, requestAnimation, duScrollEasing) {
    var proto = angular.element.prototype;
    this.$get = function () {
      return proto;
    };
    var isDocument = function (el) {
      return typeof HTMLDocument !== 'undefined' && el instanceof HTMLDocument || el.nodeType && el.nodeType === el.DOCUMENT_NODE;
    };
    var isElement = function (el) {
      return typeof HTMLElement !== 'undefined' && el instanceof HTMLElement || el.nodeType && el.nodeType === el.ELEMENT_NODE;
    };
    var unwrap = function (el) {
      return isElement(el) || isDocument(el) ? el : el[0];
    };
    proto.scrollTo = function (left, top, duration, easing) {
      var aliasFn;
      if (angular.isElement(left)) {
        aliasFn = this.scrollToElement;
      } else if (duration) {
        aliasFn = this.scrollToAnimated;
      }
      if (aliasFn) {
        return aliasFn.apply(this, arguments);
      }
      var el = unwrap(this);
      if (isDocument(el)) {
        return $window.scrollTo(left, top);
      }
      el.scrollLeft = left;
      el.scrollTop = top;
    };
    var scrollAnimation, deferred;
    proto.scrollToAnimated = function (left, top, duration, easing) {
      if (duration && !easing) {
        easing = duScrollEasing;
      }
      var startLeft = this.scrollLeft(), startTop = this.scrollTop(), deltaLeft = Math.round(left - startLeft), deltaTop = Math.round(top - startTop);
      var startTime = null;
      if (scrollAnimation) {
        cancelAnimation(scrollAnimation);
        deferred.reject();
      }
      var el = this;
      deferred = $q.defer();
      if (!deltaLeft && !deltaTop) {
        deferred.resolve();
        return deferred.promise;
      }
      var animationStep = function (timestamp) {
        if (startTime === null) {
          startTime = timestamp;
        }
        var progress = timestamp - startTime;
        var percent = progress >= duration ? 1 : easing(progress / duration);
        el.scrollTo(startLeft + Math.ceil(deltaLeft * percent), startTop + Math.ceil(deltaTop * percent));
        if (percent < 1) {
          scrollAnimation = requestAnimation(animationStep);
        } else {
          scrollAnimation = null;
          deferred.resolve();
        }
      };
      //Fix random mobile safari bug when scrolling to top by hitting status bar
      el.scrollTo(startLeft, startTop);
      scrollAnimation = requestAnimation(animationStep);
      return deferred.promise;
    };
    proto.scrollToElement = function (target, offset, duration, easing) {
      var el = unwrap(this);
      var top = this.scrollTop() + unwrap(target).getBoundingClientRect().top - offset;
      if (isElement(el)) {
        top -= el.getBoundingClientRect().top;
      }
      return this.scrollTo(0, top, duration, easing);
    };
    var overloaders = {
        scrollLeft: function (value, duration, easing) {
          if (angular.isNumber(value)) {
            return this.scrollTo(value, this.scrollTop(), duration, easing);
          }
          var el = unwrap(this);
          if (isDocument(el)) {
            return $window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
          }
          return el.scrollLeft;
        },
        scrollTop: function (value, duration, easing) {
          if (angular.isNumber(value)) {
            return this.scrollTo(this.scrollTop(), value, duration, easing);
          }
          var el = unwrap(this);
          if (isDocument(el)) {
            return $window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
          }
          return el.scrollTop;
        }
      };
    //Add duration and easing functionality to existing jQuery getter/setters 
    var overloadScrollPos = function (superFn, overloadFn) {
      return function (value, duration, easing) {
        if (duration) {
          return overloadFn.apply(this, arguments);
        }
        return superFn.apply(this, arguments);
      };
    };
    for (var methodName in overloaders) {
      proto[methodName] = proto[methodName] ? overloadScrollPos(proto[methodName], overloaders[methodName]) : overloaders[methodName];
    }
  }
]);
//Adapted from https://gist.github.com/paulirish/1579671
angular.module('duScroll.polyfill', []).factory('polyfill', [
  '$window',
  function ($window) {
    var vendors = [
        'webkit',
        'moz',
        'o',
        'ms'
      ];
    return function (fnName, fallback) {
      if ($window[fnName]) {
        return $window[fnName];
      }
      var suffix = fnName.substr(0, 1).toUpperCase() + fnName.substr(1);
      for (var key, i = 0; i < vendors.length; i++) {
        key = vendors[i] + suffix;
        if ($window[key]) {
          return $window[key];
        }
      }
      return fallback;
    };
  }
]);
angular.module('duScroll.requestAnimation', ['duScroll.polyfill']).factory('requestAnimation', [
  'polyfill',
  '$timeout',
  function (polyfill, $timeout) {
    var lastTime = 0;
    var fallback = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = $timeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    return polyfill('requestAnimationFrame', fallback);
  }
]).factory('cancelAnimation', [
  'polyfill',
  '$timeout',
  function (polyfill, $timeout) {
    var fallback = function (promise) {
      $timeout.cancel(promise);
    };
    return polyfill('cancelAnimationFrame', fallback);
  }
]);
angular.module('duScroll.spyAPI', ['duScroll.scrollContainerAPI']).factory('spyAPI', [
  '$rootScope',
  'scrollContainerAPI',
  'duScrollGreedy',
  function ($rootScope, scrollContainerAPI, duScrollGreedy) {
    var createScrollHandler = function (context) {
      return function () {
        var container = context.container, containerEl = container[0], containerOffset = 0;
        if (containerEl instanceof HTMLElement) {
          containerOffset = containerEl.getBoundingClientRect().top;
        }
        var i, currentlyActive, toBeActive, spies, spy, pos;
        spies = context.spies;
        currentlyActive = context.currentlyActive;
        toBeActive = undefined;
        for (i = 0; i < spies.length; i++) {
          spy = spies[i];
          pos = spy.getTargetPosition();
          if (!pos)
            continue;
          if (pos.top + spy.offset - containerOffset < 20 && pos.top * -1 + containerOffset < pos.height) {
            if (!toBeActive || toBeActive.top < pos.top) {
              toBeActive = {
                top: pos.top,
                spy: spy
              };
            }
          }
        }
        if (toBeActive) {
          toBeActive = toBeActive.spy;
        }
        if (currentlyActive === toBeActive || duScrollGreedy && !toBeActive)
          return;
        if (currentlyActive) {
          currentlyActive.$element.removeClass('active');
          $rootScope.$broadcast('duScrollspy:becameInactive', currentlyActive.$element);
        }
        if (toBeActive) {
          toBeActive.$element.addClass('active');
          $rootScope.$broadcast('duScrollspy:becameActive', toBeActive.$element);
        }
        context.currentlyActive = toBeActive;
      };
    };
    var contexts = {};
    var createContext = function ($scope) {
      var id = $scope.$id;
      var context = { spies: [] };
      context.handler = createScrollHandler(context);
      contexts[id] = context;
      $scope.$on('$destroy', function () {
        destroyContext($scope);
      });
      return id;
    };
    var destroyContext = function ($scope) {
      var id = $scope.$id;
      var context = contexts[id], container = context.container;
      if (container) {
        container.off('scroll', context.handler);
      }
      delete contexts[id];
    };
    var defaultContextId = createContext($rootScope);
    var getContextForScope = function (scope) {
      if (contexts[scope.$id]) {
        return contexts[scope.$id];
      }
      if (scope.$parent) {
        return getContextForScope(scope.$parent);
      }
      return contexts[defaultContextId];
    };
    var getContextForSpy = function (spy) {
      var context, contextId, scope = spy.$element.scope();
      if (scope) {
        return getContextForScope(scope);
      }
      //No scope, most likely destroyed
      for (contextId in contexts) {
        context = contexts[contextId];
        if (context.spies.indexOf(spy) !== -1) {
          return context;
        }
      }
    };
    var isElementInDocument = function (element) {
      while (element.parentNode) {
        element = element.parentNode;
        if (element === document) {
          return true;
        }
      }
      return false;
    };
    var addSpy = function (spy) {
      var context = getContextForSpy(spy);
      getContextForSpy(spy).spies.push(spy);
      if (!context.container || !isElementInDocument(context.container)) {
        if (context.container) {
          context.container.off('scroll', context.handler);
        }
        context.container = scrollContainerAPI.getContainer(spy.$element.scope());
        context.container.on('scroll', context.handler).triggerHandler('scroll');
      }
    };
    var removeSpy = function (spy) {
      var context = getContextForSpy(spy);
      if (spy === context.currentlyActive) {
        context.currentlyActive = null;
      }
      var i = context.spies.indexOf(spy);
      if (i !== -1) {
        context.spies.splice(i, 1);
      }
    };
    return {
      addSpy: addSpy,
      removeSpy: removeSpy,
      createContext: createContext,
      destroyContext: destroyContext,
      getContextForScope: getContextForScope
    };
  }
]);
angular.module('duScroll.scrollContainerAPI', []).factory('scrollContainerAPI', [
  '$document',
  function ($document) {
    var containers = {};
    var setContainer = function (scope, element) {
      var id = scope.$id;
      containers[id] = element;
      return id;
    };
    var getContainerId = function (scope) {
      if (containers[scope.$id]) {
        return scope.$id;
      }
      if (scope.$parent) {
        return getContainerId(scope.$parent);
      }
      return;
    };
    var getContainer = function (scope) {
      var id = getContainerId(scope);
      return id ? containers[id] : $document;
    };
    var removeContainer = function (scope) {
      var id = getContainerId(scope);
      if (id) {
        delete containers[id];
      }
    };
    return {
      getContainerId: getContainerId,
      getContainer: getContainer,
      setContainer: setContainer,
      removeContainer: removeContainer
    };
  }
]);
angular.module('duScroll.smoothScroll', [
  'duScroll.scrollHelpers',
  'duScroll.scrollContainerAPI'
]).directive('duSmoothScroll', [
  'duScrollDuration',
  'scrollContainerAPI',
  function (duScrollDuration, scrollContainerAPI) {
    return {
      link: function ($scope, $element, $attr) {
        $element.on('click', function (e) {
          if (!$attr.href || $attr.href.indexOf('#') === -1)
            return;
          var target = document.getElementById($attr.href.replace(/.*(?=#[^\s]+$)/, '').substring(1));
          if (!target || !target.getBoundingClientRect)
            return;
          if (e.stopPropagation)
            e.stopPropagation();
          if (e.preventDefault)
            e.preventDefault();
          var offset = $attr.offset ? parseInt($attr.offset, 10) : 0;
          var duration = $attr.duration ? parseInt($attr.duration, 10) : duScrollDuration;
          var container = scrollContainerAPI.getContainer($scope);
          container.scrollToElement(angular.element(target), isNaN(offset) ? 0 : offset, isNaN(duration) ? 0 : duration);
        });
      }
    };
  }
]);
angular.module('duScroll.spyContext', ['duScroll.spyAPI']).directive('duSpyContext', [
  'spyAPI',
  function (spyAPI) {
    return {
      restrict: 'A',
      scope: true,
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink($scope, iElement, iAttrs, controller) {
            spyAPI.createContext($scope);
          }
        };
      }
    };
  }
]);
angular.module('duScroll.scrollContainer', ['duScroll.scrollContainerAPI']).directive('duScrollContainer', [
  'scrollContainerAPI',
  function (scrollContainerAPI) {
    return {
      restrict: 'A',
      scope: true,
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink($scope, iElement, iAttrs, controller) {
            iAttrs.$observe('duScrollContainer', function (element) {
              if (angular.isString(element)) {
                element = document.getElementById(element);
              }
              element = angular.isElement(element) ? angular.element(element) : iElement;
              scrollContainerAPI.setContainer($scope, element);
              $scope.$on('$destroy', function () {
                scrollContainerAPI.removeContainer($scope);
              });
            });
          }
        };
      }
    };
  }
]);
angular.module('duScroll.scrollspy', ['duScroll.spyAPI']).directive('duScrollspy', [
  'spyAPI',
  '$timeout',
  '$rootScope',
  function (spyAPI, $timeout, $rootScope) {
    var Spy = function (targetElementOrId, $element, offset) {
      if (angular.isElement(targetElementOrId)) {
        this.target = targetElementOrId;
      } else if (angular.isString(targetElementOrId)) {
        this.targetId = targetElementOrId;
      }
      this.$element = $element;
      this.offset = offset;
    };
    Spy.prototype.getTargetElement = function () {
      if (!this.target && this.targetId) {
        this.target = document.getElementById(this.targetId);
      }
      return this.target;
    };
    Spy.prototype.getTargetPosition = function () {
      var target = this.getTargetElement();
      if (target) {
        return target.getBoundingClientRect();
      }
    };
    Spy.prototype.flushTargetCache = function () {
      if (this.targetId) {
        this.target = undefined;
      }
    };
    return {
      link: function ($scope, $element, $attr) {
        var href = $attr.ngHref || $attr.href;
        var targetId;
        if (href && href.indexOf('#') !== -1) {
          targetId = href.replace(/.*(?=#[^\s]+$)/, '').substring(1);
        } else if ($attr.duScrollspy) {
          targetId = $attr.duScrollspy;
        }
        if (!targetId)
          return;
        // Run this in the next execution loop so that the scroll context has a chance
        // to initialize
        $timeout(function () {
          var spy = new Spy(targetId, $element, -($attr.offset ? parseInt($attr.offset, 10) : 0));
          spyAPI.addSpy(spy);
          $scope.$on('$destroy', function () {
            spyAPI.removeSpy(spy);
          });
          $scope.$on('$locationChangeSuccess', spy.flushTargetCache.bind(spy));
          $rootScope.$on('$stateChangeSuccess', spy.flushTargetCache.bind(spy));
        }, 0);
      }
    };
  }
]);