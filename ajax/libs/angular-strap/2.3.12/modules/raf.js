/**
 * angular-strap
 * @version v2.3.12 - 2017-01-26
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

if (angular.version.minor < 3 && angular.version.dot < 14) {
  angular.module('ng').factory('$$rAF', [ '$window', '$timeout', function($window, $timeout) {
    var requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;
    var cancelAnimationFrame = $window.cancelAnimationFrame || $window.webkitCancelAnimationFrame || $window.mozCancelAnimationFrame || $window.webkitCancelRequestAnimationFrame;
    var rafSupported = !!requestAnimationFrame;
    var raf = rafSupported ? function(fn) {
      var id = requestAnimationFrame(fn);
      return function() {
        cancelAnimationFrame(id);
      };
    } : function(fn) {
      var timer = $timeout(fn, 16.66, false);
      return function() {
        $timeout.cancel(timer);
      };
    };
    raf.supported = rafSupported;
    return raf;
  } ]);
}