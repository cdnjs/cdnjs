/**
 * angular-strap
 * @version v2.3.7 - 2016-01-16
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.helpers.debounce', []).factory('debounce', [ '$timeout', function($timeout) {
  return function(func, wait, immediate) {
    var timeout = null;
    return function() {
      var context = this;
      var args = arguments;
      var callNow = immediate && !timeout;
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
    if (!options) options = {};
    return function() {
      var context = this;
      var args = arguments;
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