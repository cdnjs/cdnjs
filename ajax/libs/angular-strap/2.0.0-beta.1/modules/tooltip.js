/**
 * angular-strap
 * @version v2.0.0-beta.1 - 2014-01-07
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.tooltip', ['mgcrea.ngStrap.jqlite.dimensions']).run([
  '$templateCache',
  function ($templateCache) {
    var template = '' + '<div class="tooltip" ng-show="title">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner" ng-bind-html="title"></div>' + '</div>';
    $templateCache.put('$tooltip', template);
  }
]).provider('$tooltip', function () {
  var defaults = this.defaults = {
      animation: 'animation-fade',
      prefixClass: 'tooltip',
      container: false,
      placement: 'top',
      template: '$tooltip',
      trigger: 'hover focus',
      keyboard: false,
      type: '',
      title: '',
      delay: 0
    };
  this.$get = [
    '$window',
    '$rootScope',
    '$compile',
    '$q',
    '$templateCache',
    '$http',
    '$animate',
    '$timeout',
    'dimensions',
    function ($window, $rootScope, $compile, $q, $templateCache, $http, $animate, $timeout, dimensions) {
      var trim = String.prototype.trim;
      var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
      var findElement = function (query, element) {
        return angular.element((element || document).querySelectorAll(query));
      };
      function TooltipFactory(element, config) {
        var $tooltip = {};
        var options = angular.extend({}, defaults, config);
        $tooltip.$promise = $q.when($templateCache.get(options.template) || $http.get(options.template));
        var scope = options.scope.$new() || $rootScope.$new();
        if (options.delay && angular.isString(options.delay)) {
          options.delay = parseFloat(options.delay);
        }
        scope.$hide = function () {
          scope.$$postDigest(function () {
            $tooltip.hide();
          });
        };
        scope.$show = function () {
          scope.$$postDigest(function () {
            $tooltip.show();
          });
        };
        scope.$toggle = function () {
          scope.$$postDigest(function () {
            $tooltip.toggle();
          });
        };
        var timeout, hoverState, isShown;
        var tipLinker, tipElement, tipTemplate;
        $tooltip.$promise.then(function (template) {
          if (angular.isObject(template))
            template = template.data;
          template = trim.apply(template);
          tipTemplate = template;
          tipLinker = $compile(template);
          $tooltip.init();
        });
        $tooltip.init = function () {
          if (options.delay && angular.isNumber(options.delay)) {
            options.delay = {
              show: options.delay,
              hide: options.delay
            };
          }
          var triggers = options.trigger.split(' ');
          for (var i = triggers.length; i--;) {
            var trigger = triggers[i];
            if (trigger === 'click') {
              element.on('click', this.toggle);
            } else if (trigger !== 'manual') {
              element.on(trigger === 'hover' ? 'mouseenter' : 'focus', this.enter);
              element.on(trigger === 'hover' ? 'mouseleave' : 'blur', this.leave);
            }
          }
        };
        $tooltip.destroy = function () {
          var triggers = options.trigger.split(' ');
          for (var i = triggers.length; i--;) {
            var trigger = triggers[i];
            if (trigger === 'click') {
              element.off('click', this.toggle);
            } else if (trigger !== 'manual') {
              element.off(trigger === 'hover' ? 'mouseenter' : 'focus', this.enter);
              element.off(trigger === 'hover' ? 'mouseleave' : 'blur', this.leave);
            }
          }
          if (tipElement) {
            tipElement.remove();
            tipElement = null;
          }
          scope.$destroy();
        };
        $tooltip.enter = function () {
          clearTimeout(timeout);
          hoverState = 'in';
          if (!options.delay || !options.delay.show) {
            return $tooltip.show();
          }
          timeout = setTimeout(function () {
            if (hoverState === 'in')
              $tooltip.show();
          }, options.delay.show);
        };
        $tooltip.show = function () {
          var parent = options.container ? findElement(options.container) : null;
          var after = options.container ? null : element;
          tipElement = $tooltip.$element = tipLinker(scope, function (clonedElement, scope) {
          });
          tipElement.css({
            top: '0px',
            left: '0px',
            display: 'block'
          }).addClass(options.placement);
          if (options.animation)
            tipElement.addClass(options.animation);
          if (options.type)
            tipElement.addClass(options.prefixClass + '-' + options.type);
          $animate.enter(tipElement, parent, after, function () {
          });
          isShown = true;
          scope.$digest();
          requestAnimationFrame($tooltip.$applyPlacement);
          if (options.keyboard) {
            $tooltip.focus();
            tipElement.on('keyup', $tooltip.$onKeyUp);
          }
        };
        $tooltip.leave = function () {
          clearTimeout(timeout);
          hoverState = 'out';
          if (!options.delay || !options.delay.hide) {
            return $tooltip.hide();
          }
          timeout = setTimeout(function () {
            if (hoverState === 'out') {
              $tooltip.hide();
            }
          }, options.delay.hide);
        };
        $tooltip.hide = function () {
          $animate.leave(tipElement, function () {
          });
          scope.$digest();
          isShown = false;
          if (options.keyboard) {
            tipElement.off('keyup', $tooltip.$onKeyUp);
          }
        };
        $tooltip.toggle = function () {
          isShown ? $tooltip.leave() : $tooltip.enter();
        };
        $tooltip.focus = function () {
          tipElement[0].focus();
        };
        $tooltip.$applyPlacement = function () {
          if (!tipElement)
            return;
          var elementPosition = getPosition();
          var tipWidth = tipElement.prop('offsetWidth'), tipHeight = tipElement.prop('offsetHeight');
          var tipPosition = getCalculatedOffset(options.placement, elementPosition, tipWidth, tipHeight);
          tipPosition.top += 'px';
          tipPosition.left += 'px';
          tipElement.css(tipPosition);
        };
        $tooltip.$onKeyUp = function (evt) {
          evt.which === 27 && $tooltip.hide();
        };
        function getPosition() {
          if (options.container === 'body') {
            return dimensions.offset(element[0]);
          } else {
            return dimensions.position(element[0]);
          }
        }
        function getCalculatedOffset(placement, position, actualWidth, actualHeight) {
          var offset;
          var split = placement.split('-');
          switch (split[0]) {
          case 'right':
            offset = {
              top: position.top + position.height / 2 - actualHeight / 2,
              left: position.left + position.width
            };
            break;
          case 'bottom':
            offset = {
              top: position.top + position.height,
              left: position.left + position.width / 2 - actualWidth / 2
            };
            break;
          case 'left':
            offset = {
              top: position.top + position.height / 2 - actualHeight / 2,
              left: position.left - actualWidth
            };
            break;
          default:
            offset = {
              top: position.top - actualHeight,
              left: position.left + position.width / 2 - actualWidth / 2
            };
            break;
          }
          if (!split[1]) {
            return offset;
          }
          if (split[0] === 'top' || split[0] === 'bottom') {
            switch (split[1]) {
            case 'left':
              offset.left = position.left;
              break;
            case 'right':
              offset.left = position.left + position.width - actualWidth;
            }
          } else if (split[0] === 'left' || split[0] === 'right') {
            switch (split[1]) {
            case 'top':
              offset.top = position.top - actualHeight;
              break;
            case 'bottom':
              offset.top = position.top + position.height;
            }
          }
          return offset;
        }
        return $tooltip;
      }
      return TooltipFactory;
    }
  ];
}).directive('bsTooltip', [
  '$window',
  '$location',
  '$sce',
  '$tooltip',
  function ($window, $location, $sce, $tooltip) {
    var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
    return {
      restrict: 'EAC',
      scope: true,
      link: function postLink(scope, element, attr, transclusion) {
        var options = { scope: scope };
        angular.forEach([
          'placement',
          'container',
          'delay',
          'trigger',
          'animation',
          'type',
          'template'
        ], function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        angular.forEach(['title'], function (key) {
          attr[key] && attr.$observe(key, function (newValue, oldValue) {
            scope[key] = newValue;
            angular.isDefined(oldValue) && requestAnimationFrame(function () {
              tooltip && tooltip.$applyPlacement();
            });
          });
        });
        attr.bsTooltip && scope.$watch(attr.bsTooltip, function (newValue, oldValue) {
          if (angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.content = newValue;
          }
          angular.isDefined(oldValue) && requestAnimationFrame(function () {
            tooltip && tooltip.$applyPlacement();
          });
        }, true);
        var tooltip = $tooltip(element, options);
        scope.$on('$destroy', function () {
          tooltip.destroy();
          options = null;
          tooltip = null;
        });
      }
    };
  }
]);