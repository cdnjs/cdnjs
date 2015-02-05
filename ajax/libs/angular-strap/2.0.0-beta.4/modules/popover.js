/**
 * angular-strap
 * @version v2.0.0-beta.4 - 2014-01-20
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.popover', ['mgcrea.ngStrap.tooltip']).run([
  '$templateCache',
  function ($templateCache) {
    var template = '' + '<div class="popover" tabindex="-1" ng-show="content" ng-class="{\'in\': $visible}">' + '<div class="arrow"></div>' + '<h3 class="popover-title" ng-bind="title" ng-show="title"></h3>' + '<div class="popover-content" ng-bind="content"></div>' + '</div>';
    $templateCache.put('$popover', template);
  }
]).provider('$popover', function () {
  var defaults = this.defaults = {
      animation: 'animation-fade',
      placement: 'right',
      template: '$popover',
      trigger: 'click',
      keyboard: true,
      html: false,
      title: '',
      content: '',
      delay: 0,
      container: false
    };
  this.$get = [
    '$tooltip',
    function ($tooltip) {
      function PopoverFactory(element, config) {
        var options = angular.extend({}, defaults, config);
        return $tooltip(element, options);
      }
      return PopoverFactory;
    }
  ];
}).directive('bsPopover', [
  '$window',
  '$location',
  '$sce',
  '$popover',
  function ($window, $location, $sce, $popover) {
    var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
    return {
      restrict: 'EAC',
      scope: true,
      link: function postLink(scope, element, attr) {
        var options = { scope: scope };
        angular.forEach([
          'placement',
          'container',
          'delay',
          'trigger',
          'keyboard',
          'html',
          'animation',
          'template'
        ], function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        angular.forEach([
          'title',
          'content'
        ], function (key) {
          attr[key] && attr.$observe(key, function (newValue, oldValue) {
            scope[key] = newValue;
            angular.isDefined(oldValue) && requestAnimationFrame(function () {
              popover && popover.$applyPlacement();
            });
          });
        });
        attr.bsPopover && scope.$watch(attr.bsPopover, function (newValue, oldValue) {
          if (angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.content = newValue;
          }
          angular.isDefined(oldValue) && requestAnimationFrame(function () {
            popover && popover.$applyPlacement();
          });
        }, true);
        var popover = $popover(element, options);
        scope.$on('$destroy', function () {
          popover.destroy();
          options = null;
          popover = null;
        });
      }
    };
  }
]);