/**
 * angular-strap
 * @version v2.2.4 - 2015-05-28
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.helpers.debounce', []).factory('debounce', [ '$timeout', function($timeout) {
  return function(func, wait, immediate) {
    var timeout = null;
    return function() {
      var context = this, args = arguments, callNow = immediate && !timeout;
      if (timeout) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(function later() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      }, wait, false);
      if (callNow) {
        func.apply(context, args);
      }
      return timeout;
    };
  };
} ]).factory('throttle', [ '$timeout', function($timeout) {
  return function(func, wait, options) {
    var timeout = null;
    options || (options = {});
    return function() {
      var context = this, args = arguments;
      if (!timeout) {
        if (options.leading !== false) {
          func.apply(context, args);
        }
        timeout = $timeout(function later() {
          timeout = null;
          if (options.trailing !== false) {
            func.apply(context, args);
          }
        }, wait, false);
      }
    };
  };
} ]);