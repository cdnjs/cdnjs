angular.module('duScroll', ['duScroll.scroller', 'duScroll.scrollPosition', 'duScroll.requestAnimation', 'duScroll.smoothScroll']);


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
  function($window, requestAnimation) {
    var observers = [];
    var lastScrollY = 0;
    var currentScrollY = 0;
    
    var executeCallbacks = function(scrollY){
      currentScrollY = lastScrollY;
      for(var i = 0; i < observers.length; i++){
        observers[i](currentScrollY);
      }
    };

    angular.element($window).on('scroll', function(){
      lastScrollY = this.scrollY;

      if(lastScrollY !== currentScrollY){
        requestAnimation(executeCallbacks);
      }
    });

    return {
      observe : function(cb){
        observers.push(cb);
      }
    };
});

angular.module('duScroll.scroller', ['duScroll.requestAnimation']).
factory('scroller',
  function($window, requestAnimation) {

    function easeout(x) {
      return Math.pow(x, 0.7);
    }

    function scrollTo(x, y, duration){
      if(!duration) {
        $window.scrollTo(x, y);
        return;
      }
      var start = {
        y: $window.scrollY,
        x: $window.scrollX
      };
      var delta = {
        y: y - start.y,
        x: x - start.x
      };
      var frame = 0;
      var frames = duration/60;
      var animate = function() {
        frame++;
        var percent = easeout(frame/frames);
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
      scrollTo($window.scrollX + (x || 0), $window.scrollY + (y || 0), duration);
    }

    return {
      scrollTo:    scrollTo,
      scrollDelta: scrollDelta
    };
  }
);

angular.module('duScroll.smoothScroll', ['duScroll.scroller']).
directive('smoothScroll', function(scroller){

  return {
    link : function($scope, $element, $attr){
      var element = angular.element($element[0]);
      element.on('click', function(e){
        if(!$attr.href || $attr.href.indexOf('#') !== 0) return;
        var elem = document.getElementById($attr.href.substring(1));
        if(!elem) return;
        
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();


        var pos = elem.getBoundingClientRect();

        var delta = pos.top;
        scroller.scrollDelta(0, pos.top, 1000);
      });
    }
  };
});