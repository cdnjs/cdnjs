angular.module('duScroll', ['duScroll.scroller', 'duScroll.scrollPosition', 'duScroll.scrollspy', 'duScroll.requestAnimation', 'duScroll.smoothScroll']).value('duScrollDuration', 1000);


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
  function($document, $window, $rootScope, requestAnimation) {
    var observers = [];
    var lastScrollY = 0;
    var currentScrollY = 0;
    
    var executeCallbacks = function(){
      $rootScope.$emit('$duScrollChanged', currentScrollY);
      currentScrollY = lastScrollY;
      for(var i = 0; i < observers.length; i++){
        observers[i](currentScrollY);
      }
    };

    var getScrollY = function() {
      return $window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    };

    var getScrollX = function() {
      return $window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft;
    };

    angular.element($document).on('scroll', function(){
      lastScrollY = getScrollY();

      if(lastScrollY !== currentScrollY){
        requestAnimation(executeCallbacks);
      }
    });
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
  function($window, requestAnimation, scrollPosition) {

    function easeout(x) {
      return Math.pow(x, 0.7);
    }

    function scrollTo(x, y, duration){
      if(!duration) {
        $window.scrollTo(x, y);
        return;
      }
      var start = {
        y: scrollPosition.y(),
        x: scrollPosition.x()
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
        var percent = (frame === frames ? 1 : easeout(frame/frames));
        $window.scrollTo(
          start.x + Math.ceil(delta.x * percent),
          start.y + Math.ceil(delta.y * percent)
        );
        if(frame<frames) {
          requestAnimation(animate);
        }
      };
      animate();
    }
    
    function scrollDelta(x, y, duration){
      scrollTo(scrollPosition.x() + (x || 0), scrollPosition.y() + (y || 0), duration);
    }

    function scrollToElement(element, offset, duration){
      if(!angular.isElement(element)) { return; }
      //Remove jQuery wrapper (if any)
      element = element[0] || element;
      if(!element.getBoundingClientRect) return;

      var pos = element.getBoundingClientRect();

      scrollDelta(0, pos.top + (!offset || isNaN(offset) ? 0 : -offset), duration);
    }

    return {
      scrollTo:         scrollTo,
      scrollToElement:  scrollToElement,
      scrollDelta:      scrollDelta
    };
  }
);


angular.module('duScroll.smoothScroll', ['duScroll.scroller']).
directive('duSmoothScroll', function(scroller, duScrollDuration){

  return {
    link : function($scope, $element, $attr){
      var element = angular.element($element[0]);
      element.on('click', function(e){
        if(!$attr.href || $attr.href.indexOf('#') === -1) return;
        var elem = document.getElementById($attr.href.replace(/.*(?=#[^\s]+$)/, '').substring(1));
        if(!elem || !elem.getBoundingClientRect) return;
        
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();

        var offset = -($attr.offset ? parseInt($attr.offset, 10) : 0);
        var duration = $attr.duration ? parseInt($attr.duration, 10) : duScrollDuration;
        var pos = elem.getBoundingClientRect();

        scroller.scrollDelta(0, pos.top + (isNaN(offset) ? 0 : offset), duration);
      });
    }
  };
});


angular.module('duScroll.scrollspy', ['duScroll.scrollPosition']).
directive('duScrollspy', function($rootScope, scrollPosition) {
  var spies = [];
  var currentlyActive;
  var isObserving = false;

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

  function gotScroll($event, scrollY) {
    var toBeActive;
    for(var spy, scroll, pos, i = 0; i < spies.length; i++) {
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
    if(currentlyActive === toBeActive) return;
    if(currentlyActive) {
      currentlyActive.$element.removeClass('active');
      $rootScope.$broadcast('duScrollspy:becameInactive', currentlyActive.$element);
    }
    if(toBeActive) {
      toBeActive.$element.addClass('active');
      $rootScope.$broadcast('duScrollspy:becameActive', toBeActive.$element);
    }
    currentlyActive = toBeActive;
  }

  function addSpy(spy) {
    if(!isObserving) {
      $rootScope.$on('$duScrollChanged', gotScroll);
      isObserving = true;
    }
    spies.push(spy);
  }

  function removeSpy(spy) {
    if(spy === currentlyActive) {
      currentlyActive = null;
    }
    var i = spies.indexOf(spy);
    if(i !== -1) {
      spies.splice(i, 1);
    }
  }

  return {
    link: function ($scope, $element, $attr) {
      var href = $attr.ngHref || $attr.href;
      if (!href || href.indexOf('#') === -1) return;
      var targetId = href.replace(/.*(?=#[^\s]+$)/, '').substring(1);
      if(!targetId) return;

      var spy = new Spy(targetId, $element, -($attr.offset ? parseInt($attr.offset, 10) : 0));
      addSpy(spy);

      $scope.$on('$destroy', function() {
        removeSpy(spy);
      });
      $scope.$on('$locationChangeSuccess', spy.flushTargetCache.bind(spy));
    }
  };
});
