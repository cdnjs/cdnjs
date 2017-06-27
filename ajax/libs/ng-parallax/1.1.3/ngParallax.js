'use strict';
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'ngParallax';
}
angular.module('ngParallax',[]);
angular.module('ngParallax').directive('ngParallax', [
  '$timeout',
  function ($window, $timeout) {
    return {
        restrict: 'AE',
        scope:{
          pattern: '=',
          speed: '='
        },
        link: function(scope, elem, attr) {

          window.mobileAndTabletcheck = function() {
            if( navigator.userAgent.match(/Android/i)
             || navigator.userAgent.match(/webOS/i)
             || navigator.userAgent.match(/iPhone/i)
             || navigator.userAgent.match(/iPad/i)
             || navigator.userAgent.match(/iPod/i)
             || navigator.userAgent.match(/BlackBerry/i)
             || navigator.userAgent.match(/Windows Phone/i)
             ){
              return true
             }
             else{
              return false;
            }
          }

          var bgObj = elem[0];
              bgObj.style.backgroundRepeat = "repeat";
              bgObj.style.backgroundAttachment = "fixed";
              bgObj.style.height = "100%";
              bgObj.style.margin = "0 auto"
              bgObj.style.position = "relative"
              bgObj.style.background = "url(" + scope.pattern + ")"
              bgObj.style.backgroundAttachment = 'fixed';
          var isMobile = window.mobileAndTabletcheck();


          function execute(){

              var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
              var speed = (scrollTop / scope.speed);
              if(isMobile){
                speed = speed * .10
              }
              if(speed == 0){
                bgObj.style.backgroundPosition = '0% '+ 0 + '%';
              }
              else{
                bgObj.style.backgroundPosition = '0% '+ speed + '%';
              }

          };

          // for mobile
          window.document.addEventListener("touchmove", function(){
              execute();
          })


          // for browsers
          window.document.addEventListener("scroll", function() {
              execute();
          });

          execute();

        },

    };
  }
]);
