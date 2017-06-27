/**
 * angular-strap
 * @version v2.3.9 - 2016-06-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.popover', [ 'mgcrea.ngStrap.tooltip' ]).provider('$popover', function() {
  var defaults = this.defaults = {
    animation: 'am-fade',
    customClass: '',
    container: false,
    target: false,
    placement: 'right',
    templateUrl: 'popover/popover.tpl.html',
    contentTemplate: false,
    trigger: 'click',
    keyboard: true,
    html: false,
    title: '',
    content: '',
    delay: 0,
    autoClose: false
  };
  this.$get = [ '$tooltip', function($tooltip) {
    function PopoverFactory(element, config) {
      var options = angular.extend({}, defaults, config);
      var $popover = $tooltip(element, options);
      if (options.content) {
        $popover.$scope.content = options.content;
      }
      return $popover;
    }
    return PopoverFactory;
  } ];
}).directive('bsPopover', [ '$window', '$sce', '$popover', function($window, $sce, $popover) {
  var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
  return {
    restrict: 'EAC',
    scope: true,
    link: function postLink(scope, element, attr) {
      var popover;
      var options = {
        scope: scope
      };
      angular.forEach([ 'template', 'templateUrl', 'controller', 'controllerAs', 'contentTemplate', 'placement', 'container', 'delay', 'trigger', 'html', 'animation', 'customClass', 'autoClose', 'id', 'prefixClass', 'prefixEvent' ], function(key) {
        if (angular.isDefined(attr[key])) options[key] = attr[key];
      });
      var falseValueRegExp = /^(false|0|)$/i;
      angular.forEach([ 'html', 'container', 'autoClose' ], function(key) {
        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) options[key] = false;
      });
      angular.forEach([ 'onBeforeShow', 'onShow', 'onBeforeHide', 'onHide' ], function(key) {
        var bsKey = 'bs' + key.charAt(0).toUpperCase() + key.slice(1);
        if (angular.isDefined(attr[bsKey])) {
          options[key] = scope.$eval(attr[bsKey]);
        }
      });
      var dataTarget = element.attr('data-target');
      if (angular.isDefined(dataTarget)) {
        if (falseValueRegExp.test(dataTarget)) {
          options.target = false;
        } else {
          options.target = dataTarget;
        }
      }
      angular.forEach([ 'title', 'content' ], function(key) {
        if (attr[key]) {
          attr.$observe(key, function(newValue, oldValue) {
            scope[key] = $sce.trustAsHtml(newValue);
            if (angular.isDefined(oldValue)) {
              requestAnimationFrame(function() {
                if (popover) popover.$applyPlacement();
              });
            }
          });
        }
      });
      if (attr.bsPopover) {
        scope.$watch(attr.bsPopover, function(newValue, oldValue) {
          if (angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.content = newValue;
          }
          if (angular.isDefined(oldValue)) {
            requestAnimationFrame(function() {
              if (popover) popover.$applyPlacement();
            });
          }
        }, true);
      }
      if (attr.bsShow) {
        scope.$watch(attr.bsShow, function(newValue, oldValue) {
          if (!popover || !angular.isDefined(newValue)) return;
          if (angular.isString(newValue)) newValue = !!newValue.match(/true|,?(popover),?/i);
          if (newValue === true) {
            popover.show();
          } else {
            popover.hide();
          }
        });
      }
      if (attr.viewport) {
        scope.$watch(attr.viewport, function(newValue) {
          if (!popover || !angular.isDefined(newValue)) return;
          popover.setViewport(newValue);
        });
      }
      popover = $popover(element, options);
      scope.$on('$destroy', function() {
        if (popover) popover.destroy();
        options = null;
        popover = null;
      });
    }
  };
} ]);