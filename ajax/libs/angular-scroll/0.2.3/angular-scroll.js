angular.module('duScroll', ['duScroll.scroller', 'duScroll.scrollPosition', 'duScroll.scrollspy', 'duScroll.requestAnimation', 'duScroll.smoothScroll']);


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
  function($document, $window, requestAnimation) {
    var observers = [];
    var lastScrollY = 0;
    var currentScrollY = 0;
    
    var executeCallbacks = function(){
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

    return {
      observe : function(cb){
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
      if(!element || !element.getBoundingClientRect) return;

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
directive('duSmoothScroll', function(scroller){

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
        var pos = elem.getBoundingClientRect();

        scroller.scrollDelta(0, pos.top + (isNaN(offset) ? 0 : offset), 1000);
      });
    }
  };
});


angular.module('duScroll.scrollspy', ['duScroll.scrollPosition']).
directive('duScrollspy', function(scrollPosition) {
  var spies = [];
  var currentlyActive;

  function gotScroll(scrollY) {
    var toBeActive;
    for(var spy, scroll, pos, i = 0; i < spies.length; i++) {
      spy = spies[i];
      pos = spy.target.getBoundingClientRect();
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
    if(currentlyActive) currentlyActive.$element.removeClass('active');
    if(toBeActive) toBeActive.$element.addClass('active');
    currentlyActive = toBeActive;
  }

  function addSpy(target, $element, offset) {
    if(!spies.length) {
      scrollPosition.observe(gotScroll);
    }
    spies.push({
      target:   target, 
      $element: $element, 
      element:  angular.element($element[0]),
      offset:   offset
    });
  }

  return {
    link: function ($scope, $element, $attr) {
      if(!$attr.href || $attr.href.indexOf('#') === -1) return;
      var target = document.getElementById($attr.href.replace(/.*(?=#[^\s]+$)/, '').substring(1));
      if(!target) return;
      addSpy(target, $element, -($attr.offset ? parseInt($attr.offset, 10) : 0));
    }
  };
});