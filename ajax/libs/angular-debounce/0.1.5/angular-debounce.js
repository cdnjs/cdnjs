'use strict';

angular.module('debounce', [])
  .service('debounce', ['$timeout', function ($timeout) {
    return function (func, wait, immediate) {
      var timeout, args, context, result;
      function debounce() {
        /* jshint validthis:true */
        context = this;
        args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        if (timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
        }
        return result;
      }
      debounce.cancel = function () {
        $timeout.cancel(timeout);
        timeout = null;
      };
      return debounce;
    };
  }])
  .directive('debounce', ['debounce', '$parse', function (debounce, $parse) {
    return {
      require: 'ngModel',
      priority: 999,
      link: function ($scope, $element, $attrs, ngModelController) {
        var debounceDuration = $parse($attrs.debounce)($scope);
        var immediate = !!$parse($attrs.immediate)($scope);
        var debouncedValue, pass;
        var prevRender = ngModelController.$render.bind(ngModelController);
        var commitSoon = debounce(function (viewValue) {
          pass = true;
          ngModelController.$setViewValue(viewValue);
          pass = false;
        }, parseInt(debounceDuration, 10), immediate);
        ngModelController.$render = function () {
          prevRender();
          commitSoon.cancel();
          //we must be first parser for this to work properly,
          //so we have priority 999 so that we unshift into parsers last
          debouncedValue = this.$viewValue;
        };
        ngModelController.$parsers.unshift(function (value) {
          if (pass) {
            debouncedValue = value;
            return value;
          } else {
            commitSoon(ngModelController.$viewValue);
            return debouncedValue;
          }
        });
      }
    };
  }]);
