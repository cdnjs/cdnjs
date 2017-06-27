'use strict';
angular.module('ngParallax', []).directive('ngParallax', [
  '$timeout',
  function ($window, $timeout) {
    return {
        restrict: 'AE',
        scope:{
          pattern: '=',
          speed: '=',
          offset: '=',
          reverse: '='
        },
        link: function(scope, elem, attr) {

            var bgObj = elem[0];
                bgObj.style.backgroundRepeat = "repeat";
                bgObj.style.backgroundAttachment = "fixed";
                bgObj.style.height = "100%";
                bgObj.style.margin = "0 auto"
                bgObj.style.position = "relative"
                bgObj.style.background = "url(" + scope.pattern + ")"

            var reverse = Boolean(scope.reverse) || false;


            function execute(){
              var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
              if(!reverse){
                var yPos = (scrollTop / (scope.speed + 1));
              }
              else{
                var yPos = (scrollTop * ((scope.speed) + 1));
              }

              var coords = '50% '+ (yPos) + 'px';
                  bgObj.style.backgroundPosition = coords;
            };

            window.document.addEventListener("scroll", function() {
              execute();
            });
            execute();

        },

    };
  }
]);
