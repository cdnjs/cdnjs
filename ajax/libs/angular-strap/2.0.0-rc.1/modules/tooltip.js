/**
 * angular-strap
 * @version v2.0.0-rc.1 - 2014-01-28
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.tooltip', ['mgcrea.ngStrap.helpers.dimensions']).provider('$tooltip', function () {
  var defaults = this.defaults = {
      animation: 'animation-fade',
      prefixClass: 'tooltip',
      container: false,
      placement: 'top',
      template: 'tooltip/tooltip.tpl.html',
      contentTemplate: false,
      trigger: 'hover focus',
      keyboard: false,
      html: false,
      show: false,
      title: '',
      type: '',
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
      var htmlReplaceRegExp = /ng-bind="/gi;
      var findElement = function (query, element) {
        return angular.element((element || document).querySelectorAll(query));
      };
      function TooltipFactory(element, config) {
        var $tooltip = {};
        var options = $tooltip.$options = angular.extend({}, defaults, config);
        $tooltip.$promise = $q.when($templateCache.get(options.template) || $http.get(options.template));
        var scope = $tooltip.$scope = options.scope && options.scope.$new() || $rootScope.$new();
        if (options.delay && angular.isString(options.delay)) {
          options.delay = parseFloat(options.delay);
        }
        if (options.title) {
          $tooltip.$scope.title = options.title;
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
        $tooltip.$isShown = false;
        var timeout, hoverState;
        if (options.contentTemplate) {
          $tooltip.$promise = $tooltip.$promise.then(function (template) {
            if (angular.isObject(template))
              template = template.data;
            var templateEl = angular.element(template);
            return $q.when($templateCache.get(options.contentTemplate) || $http.get(options.contentTemplate, { cache: $templateCache })).then(function (contentTemplate) {
              if (angular.isObject(contentTemplate))
                contentTemplate = contentTemplate.data;
              findElement('[ng-bind="content"]', templateEl[0]).removeAttr('ng-bind').html(contentTemplate);
              return templateEl[0].outerHTML;
            });
          });
        }
        var tipLinker, tipElement, tipTemplate;
        $tooltip.$promise.then(function (template) {
          if (angular.isObject(template))
            template = template.data;
          if (options.html)
            template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
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
              element.on('click', $tooltip.toggle);
            } else if (trigger !== 'manual') {
              element.on(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
              element.on(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
            }
          }
          if (options.show) {
            scope.$$postDigest(function () {
              options.trigger === 'focus' ? element[0].focus() : $tooltip.show();
            });
          }
        };
        $tooltip.destroy = function () {
          var triggers = options.trigger.split(' ');
          for (var i = triggers.length; i--;) {
            var trigger = triggers[i];
            if (trigger === 'click') {
              element.off('click', $tooltip.toggle);
            } else if (trigger !== 'manual') {
              element.off(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
              element.off(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
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
          $tooltip.$isShown = true;
          scope.$$phase || scope.$digest();
          requestAnimationFrame($tooltip.$applyPlacement);
          if (options.keyboard) {
            if (options.trigger !== 'focus') {
              $tooltip.focus();
              tipElement.on('keyup', $tooltip.$onKeyUp);
            } else {
              element.on('keyup', $tooltip.$onFocusKeyUp);
            }
          }
        };
        $tooltip.leave = function () {
          if (!$tooltip.$isShown)
            return;
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
        $tooltip.hide = function (blur) {
          $animate.leave(tipElement, function () {
          });
          scope.$$phase || scope.$digest();
          $tooltip.$isShown = false;
          if (options.keyboard) {
            tipElement.off('keyup', $tooltip.$onKeyUp);
          }
          if (blur && options.trigger === 'focus') {
            return element[0].blur();
          }
        };
        $tooltip.toggle = function () {
          $tooltip.$isShown ? $tooltip.leave() : $tooltip.enter();
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
        $tooltip.$onFocusKeyUp = function (evt) {
          evt.which === 27 && element[0].blur();
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
          'template',
          'contentTemplate',
          'placement',
          'container',
          'delay',
          'trigger',
          'keyboard',
          'html',
          'animation',
          'type'
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