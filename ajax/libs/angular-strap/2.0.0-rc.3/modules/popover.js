/**
 * angular-strap
 * @version v2.0.0-rc.3 - 2014-02-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.popover', ['mgcrea.ngStrap.tooltip']).provider('$popover', function () {
  var defaults = this.defaults = {
      animation: 'am-fade',
      placement: 'right',
      template: 'popover/popover.tpl.html',
      contentTemplate: false,
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
        var $popover = $tooltip(element, options);
        if (options.content) {
          $popover.$scope.content = options.content;
        }
        return $popover;
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
          'template',
          'contentTemplate',
          'placement',
          'container',
          'delay',
          'trigger',
          'keyboard',
          'html',
          'animation'
        ], function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        angular.forEach([
          'title',
          'content'
        ], function (key) {
          attr[key] && attr.$observe(key, function (newValue, oldValue) {
            scope[key] = $sce.getTrustedHtml(newValue);
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