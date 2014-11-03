/**
 * angular-strap
 * @version v2.0.0-rc.3 - 2014-02-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.navbar', []).provider('$navbar', function () {
  var defaults = this.defaults = {
      activeClass: 'active',
      routeAttr: 'data-match-route'
    };
  this.$get = function () {
    return { defaults: defaults };
  };
}).directive('bsNavbar', [
  '$window',
  '$location',
  '$navbar',
  function ($window, $location, $navbar) {
    var defaults = $navbar.defaults;
    return {
      restrict: 'A',
      link: function postLink(scope, element, attr, controller) {
        var options = defaults;
        angular.forEach(Object.keys(defaults), function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        scope.$watch(function () {
          return $location.path();
        }, function (newValue, oldValue) {
          var liElements = element[0].querySelectorAll('li[' + options.routeAttr + ']');
          angular.forEach(liElements, function (li) {
            var liElement = angular.element(li);
            var pattern = liElement.attr(options.routeAttr);
            var regexp = new RegExp('^' + pattern.replace('/', '\\/') + '$', ['i']);
            if (regexp.test(newValue)) {
              liElement.addClass(options.activeClass);
            } else {
              liElement.removeClass(options.activeClass);
            }
          });
        });
      }
    };
  }
]);