/**
  * x is a value between 0 and 1, indicating where in the animation you are.
  */
var duScrollDefaultEasing = function (x) {
  if(x < 0.5) {
    return Math.pow(x*2, 2)/2;
  }
  return 1-Math.pow((1-x)*2, 2)/2;
};

angular.module('duScroll', ['duScroll.scroller', 'duScroll.scrollPosition', 'duScroll.scrollspy', 'duScroll.requestAnimation', 'duScroll.smoothScroll', 'duScroll.scrollContext']).value('duScrollDuration', 1000).value('duScrollEasing', duScrollDefaultEasing);


angular.module('duScroll.requestAnimation', []).
factory('requestAnimation', function($window, $timeout) {
  return $window.requestAnimationFrame  ||
    $window.webkitRequestAnimationFrame ||
    $window.mozRequestAnimationFrame    ||
    $window.oRequestAnimationFrame      ||
    $window.msRequestAnimationFrame     ||
    function fallback( callback ){
      $timeout(callback, 1000 / 60);
    };
});

angular.module('duScroll.scrollPosition', ['duScroll.requestAnimation']).
factory('scrollPosition',
  function($document, $window, $rootScope, $timeout, requestAnimation) {
    var getScrollY = function(context) {
      if(context) {
        return context.scrollTop;
      }
      return $window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    };

    var getScrollX = function(context) {
      if(context) {
        return context.scrollLeft;
      }
      return $window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
    };

    var observers = [];
    var lastScrollY;
    var currentScrollY;
    
    var executeCallbacks = function(){
      currentScrollY = lastScrollY;
      $rootScope.$emit('$duScrollChanged', currentScrollY);
      for(var i = 0; i < observers.length; i++){
        observers[i](currentScrollY);
      }
    };

    var onScroll = function(){
      lastScrollY = getScrollY();

      if(lastScrollY !== currentScrollY){
        requestAnimation(executeCallbacks);
      }
    };

    angular.element($document).on('scroll', onScroll).triggerHandler('scroll');

    var deprecationWarned = false;
    return {
      observe : function(cb){
        if(!deprecationWarned && console && console.warn) {
          console.warn('scrollPosition.observe is deprecated, use $rootScope.$on(\'$duScrollChanged\') instead');
          deprecationWarned = true;
        }
        observers.push(cb);
      }, 
      x: getScrollX, 
      y: getScrollY
    };
  }
);


angular.module('duScroll.scroller', ['duScroll.requestAnimation']).
factory('scroller',
  function($window, requestAnimation, scrollPosition, duScrollEasing) {

    function scrollTo(x, y, duration, context){
      if(!duration) {
        if(context){
          context.scrollLeft = x;
          context.scrollTop = y;
        } else {
          $window.scrollTo(x, y);
        }

        return;
      }
      var start = {
        y: scrollPosition.y(context),
        x: scrollPosition.x(context)
      };
      var delta = {
        y: Math.round(y - start.y),
        x: Math.round(x - start.x)
      };
      if(!delta.x && !delta.y) return;

      var frame = 0;
      var frames = Math.ceil(duration/60);
      var animate = function() {
        frame++;
        var percent = (frame === frames ? 1 : duScrollEasing(frame/frames));
        if(context){
          context.scrollLeft = start.x + Math.ceil(delta.x * percent);
          context.scrollTop = start.y + Math.ceil(delta.y * percent);
        } else {
          $window.scrollTo( start.x + Math.ceil(delta.x * percent), start.y + Math.ceil(delta.y * percent));
        }
        if(frame<frames) { requestAnimation(animate); }
      };
      animate();
    }
    
    function scrollDelta(x, y, duration, context){
      scrollTo(scrollPosition.x(context) + (x || 0), scrollPosition.y(context) + (y || 0), duration, context);
    }

    function scrollToElement(element, offset, duration, context){
      if(!angular.isElement(element)) { return; }
      //Remove jQuery wrapper (if any)
      element = element[0] || element;
      if(!element.getBoundingClientRect) return;

      if(!offset || isNaN(offset)) {
        offset = 0;
      } else {
        offset = -offset;
      }

      var pos = element.getBoundingClientRect();

      if(context) {
        var contextPos = context.getBoundingClientRect();
        offset -= contextPos.top;
      }

      scrollDelta(0, pos.top + offset, duration, context);
    }

    return {
      scrollTo:         scrollTo,
      scrollToElement:  scrollToElement,
      scrollDelta:      scrollDelta
    };
  }
);


angular.module('duScroll.spyAPI', ['duScroll.scrollPosition']).
factory('duSpyAPI', function($rootScope, scrollPosition) {
  var contexts = {};
  var isObserving = false;

  var createContext = function($scope) {
    var id = $scope.$id;
    contexts[id] = {
      spies: []
    };
    return id;
  };
  var defaultContextId = createContext($rootScope);

  var gotScroll = function($event, scrollY) {
    var i, id, context, currentlyActive, toBeActive, spies, spy, pos;

    for(id in contexts) {
      context = contexts[id];
      spies = context.spies;
      currentlyActive = context.currentlyActive;
      toBeActive = undefined;

      for(i = 0; i < spies.length; i++) {
        spy = spies[i];
        pos = spy.getTargetPosition();
        if (!pos) continue;

        if(pos.top + spy.offset < 20 && pos.top*-1 < pos.height) {
          if(!toBeActive || toBeActive.top < pos.top) {
            toBeActive = {
              top: pos.top,
              spy: spy
            };
          }
        }
      }
      if(toBeActive) {
        toBeActive = toBeActive.spy;
      }
      if(currentlyActive === toBeActive) continue;
      if(currentlyActive) {
        currentlyActive.$element.removeClass('active');
        $rootScope.$broadcast('duScrollspy:becameInactive', currentlyActive.$element);
      }
      if(toBeActive) {
        toBeActive.$element.addClass('active');
        $rootScope.$broadcast('duScrollspy:becameActive', toBeActive.$element);
      }
      context.currentlyActive = toBeActive;
    }
  };

  var getContextForScope = function(scope) {
    if(contexts[scope.$id]) {
      return contexts[scope.$id];
    }
    if(scope.$parent) {
      return getContextForScope(scope.$parent);
    }
    return contexts[defaultContextId];
  };

  var getContextForSpy = function(spy) {
    return getContextForScope(spy.$element.scope());
  };

  var addSpy = function(spy) {
    if(!isObserving) {
      $rootScope.$on('$duScrollChanged', gotScroll);
      isObserving = true;
    }
    getContextForSpy(spy).spies.push(spy);
  };

  var removeSpy = function(spy) {
    var context = getContextForSpy(spy);
    if(spy === context.currentlyActive) {
      context.currentlyActive = null;
    }
    var i = context.spies.indexOf(spy);
    if(i !== -1) {
      context.spies.splice(i, 1);
    }
  };

  return {
    addSpy: addSpy,
    removeSpy: removeSpy, 
    createContext: createContext
  };
});


angular.module('duScroll.scrollContextAPI', []).
factory('duScrollContextAPI', function() {
  var contexts = {};

  var setContext = function(scope, element) {
    var id = scope.$id;
    contexts[id] = element;
    return id;
  };

  var getContext = function(scope) {
    if(contexts[scope.$id]) {
      return contexts[scope.$id];
    }
    if(scope.$parent) {
      return getContext(scope.$parent);
    }
    return;
  };

  return {
    getContext: getContext, 
    setContext: setContext
  };
});


angular.module('duScroll.smoothScroll', ['duScroll.scroller', 'duScroll.scrollContextAPI']).
directive('duSmoothScroll', function(scroller, duScrollDuration, duScrollContextAPI){

  return {
    link : function($scope, $element, $attr){
      var element = angular.element($element[0]);
      element.on('click', function(e){
        if(!$attr.href || $attr.href.indexOf('#') === -1) return;
        var elem = document.getElementById($attr.href.replace(/.*(?=#[^\s]+$)/, '').substring(1));
        if(!elem || !elem.getBoundingClientRect) return;
        
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();

        var offset = ($attr.offset ? parseInt($attr.offset, 10) : 0);
        var duration = $attr.duration ? parseInt($attr.duration, 10) : duScrollDuration;
        var context = duScrollContextAPI.getContext($scope);

        scroller.scrollToElement(elem, offset, duration, context);
      });
    }
  };
});


angular.module('duScroll.spyContext', ['duScroll.spyAPI']).
directive('duSpyContext', function(duSpyAPI) {
  return {
    restrict: 'A',
    scope: true,
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink($scope, iElement, iAttrs, controller) {
          duSpyAPI.createContext($scope);
        }
      };
    }
  };
});


angular.module('duScroll.scrollContext', ['duScroll.scrollContextAPI']).
directive('duScrollContext', function(duScrollContextAPI){
  return {
    restrict: 'A',
    scope: true,
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink($scope, iElement, iAttrs, controller) {
          iAttrs.$observe('duScrollContext', function(element) {
            if(angular.isString(element)) {
              element = document.getElementById(element);
            }
            if(!angular.isElement(element)) {
              element = iElement[0];
            }
            duScrollContextAPI.setContext($scope, element);
          });
        }
      };
    }
  };
});


angular.module('duScroll.scrollspy', ['duScroll.spyAPI']).
directive('duScrollspy', function(duSpyAPI) {
  var Spy = function(targetElementOrId, $element, offset) {
    if(angular.isElement(targetElementOrId)) {
      this.target = targetElementOrId;
    } else if(angular.isString(targetElementOrId)) {
      this.targetId = targetElementOrId;
    }
    this.$element = $element;
    this.offset = offset;
  };

  Spy.prototype.getTargetElement = function() {
    if (!this.target && this.targetId) {
      this.target = document.getElementById(this.targetId);
    }
    return this.target;
  };

  Spy.prototype.getTargetPosition = function() {
    var target = this.getTargetElement();
    if(target) {
      return target.getBoundingClientRect();
    }
  };

  Spy.prototype.flushTargetCache = function() {
    if(this.targetId) {
      this.target = undefined;
    }
  };

  return {
    link: function ($scope, $element, $attr) {
      var href = $attr.ngHref || $attr.href;
      var targetId;

      if (href && href.indexOf('#') !== -1) {
        targetId = href.replace(/.*(?=#[^\s]+$)/, '').substring(1);
      } else if($attr.duScrollspy) {
        targetId = $attr.duScrollspy;
      }
      if(!targetId) return;

      var spy = new Spy(targetId, $element, -($attr.offset ? parseInt($attr.offset, 10) : 0));
      duSpyAPI.addSpy(spy);

      $scope.$on('$destroy', function() {
        duSpyAPI.removeSpy(spy);
      });
      $scope.$on('$locationChangeSuccess', spy.flushTargetCache.bind(spy));
    }
  };
});
