/**
 * angular-strap
 * @version v2.3.10 - 2016-10-17
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.tooltip', [ 'mgcrea.ngStrap.core', 'mgcrea.ngStrap.helpers.dimensions' ]).provider('$tooltip', function() {
  var defaults = this.defaults = {
    animation: 'am-fade',
    customClass: '',
    prefixClass: 'tooltip',
    prefixEvent: 'tooltip',
    container: false,
    target: false,
    placement: 'top',
    templateUrl: 'tooltip/tooltip.tpl.html',
    template: '',
    titleTemplate: false,
    trigger: 'hover focus',
    keyboard: false,
    html: false,
    show: false,
    title: '',
    type: '',
    delay: 0,
    autoClose: false,
    bsEnabled: true,
    mouseDownPreventDefault: true,
    mouseDownStopPropagation: true,
    viewport: {
      selector: 'body',
      padding: 0
    }
  };
  this.$get = [ '$window', '$rootScope', '$bsCompiler', '$q', '$templateCache', '$http', '$animate', '$sce', 'dimensions', '$$rAF', '$timeout', function($window, $rootScope, $bsCompiler, $q, $templateCache, $http, $animate, $sce, dimensions, $$rAF, $timeout) {
    var isNative = /(ip[ao]d|iphone|android)/gi.test($window.navigator.userAgent);
    var isTouch = 'createTouch' in $window.document && isNative;
    var $body = angular.element($window.document);
    function TooltipFactory(element, config) {
      var $tooltip = {};
      var options = $tooltip.$options = angular.extend({}, defaults, config);
      var promise = $tooltip.$promise = $bsCompiler.compile(options);
      var scope = $tooltip.$scope = options.scope && options.scope.$new() || $rootScope.$new();
      var nodeName = element[0].nodeName.toLowerCase();
      if (options.delay && angular.isString(options.delay)) {
        var split = options.delay.split(',').map(parseFloat);
        options.delay = split.length > 1 ? {
          show: split[0],
          hide: split[1]
        } : split[0];
      }
      $tooltip.$id = options.id || element.attr('id') || '';
      if (options.title) {
        scope.title = $sce.trustAsHtml(options.title);
      }
      scope.$setEnabled = function(isEnabled) {
        scope.$$postDigest(function() {
          $tooltip.setEnabled(isEnabled);
        });
      };
      scope.$hide = function() {
        scope.$$postDigest(function() {
          $tooltip.hide();
        });
      };
      scope.$show = function() {
        scope.$$postDigest(function() {
          $tooltip.show();
        });
      };
      scope.$toggle = function() {
        scope.$$postDigest(function() {
          $tooltip.toggle();
        });
      };
      $tooltip.$isShown = scope.$isShown = false;
      var timeout;
      var hoverState;
      var compileData;
      var tipElement;
      var tipContainer;
      var tipScope;
      promise.then(function(data) {
        compileData = data;
        $tooltip.init();
      });
      $tooltip.init = function() {
        if (options.delay && angular.isNumber(options.delay)) {
          options.delay = {
            show: options.delay,
            hide: options.delay
          };
        }
        if (options.container === 'self') {
          tipContainer = element;
        } else if (angular.isElement(options.container)) {
          tipContainer = options.container;
        } else if (options.container) {
          tipContainer = findElement(options.container);
        }
        bindTriggerEvents();
        if (options.target) {
          options.target = angular.isElement(options.target) ? options.target : findElement(options.target);
        }
        if (options.show) {
          scope.$$postDigest(function() {
            if (options.trigger === 'focus') {
              element[0].focus();
            } else {
              $tooltip.show();
            }
          });
        }
      };
      $tooltip.destroy = function() {
        unbindTriggerEvents();
        destroyTipElement();
        scope.$destroy();
      };
      $tooltip.enter = function() {
        clearTimeout(timeout);
        hoverState = 'in';
        if (!options.delay || !options.delay.show) {
          return $tooltip.show();
        }
        timeout = setTimeout(function() {
          if (hoverState === 'in') $tooltip.show();
        }, options.delay.show);
      };
      $tooltip.show = function() {
        if (!options.bsEnabled || $tooltip.$isShown) return;
        scope.$emit(options.prefixEvent + '.show.before', $tooltip);
        if (angular.isDefined(options.onBeforeShow) && angular.isFunction(options.onBeforeShow)) {
          options.onBeforeShow($tooltip);
        }
        var parent;
        var after;
        if (options.container) {
          parent = tipContainer;
          if (tipContainer[0].lastChild) {
            after = angular.element(tipContainer[0].lastChild);
          } else {
            after = null;
          }
        } else {
          parent = null;
          after = element;
        }
        if (tipElement) destroyTipElement();
        tipScope = $tooltip.$scope.$new();
        tipElement = $tooltip.$element = compileData.link(tipScope, function(clonedElement, scope) {});
        tipElement.css({
          top: '-9999px',
          left: '-9999px',
          right: 'auto',
          display: 'block',
          visibility: 'hidden'
        });
        if (options.animation) tipElement.addClass(options.animation);
        if (options.type) tipElement.addClass(options.prefixClass + '-' + options.type);
        if (options.customClass) tipElement.addClass(options.customClass);
        if (after) {
          after.after(tipElement);
        } else {
          parent.prepend(tipElement);
        }
        $tooltip.$isShown = scope.$isShown = true;
        safeDigest(scope);
        $tooltip.$applyPlacement();
        if (angular.version.minor <= 2) {
          $animate.enter(tipElement, parent, after, enterAnimateCallback);
        } else {
          $animate.enter(tipElement, parent, after).then(enterAnimateCallback);
        }
        safeDigest(scope);
        $$rAF(function() {
          if (tipElement) tipElement.css({
            visibility: 'visible'
          });
          if (options.keyboard) {
            if (options.trigger !== 'focus') {
              $tooltip.focus();
            }
            bindKeyboardEvents();
          }
        });
        if (options.autoClose) {
          bindAutoCloseEvents();
        }
      };
      function enterAnimateCallback() {
        scope.$emit(options.prefixEvent + '.show', $tooltip);
        if (angular.isDefined(options.onShow) && angular.isFunction(options.onShow)) {
          options.onShow($tooltip);
        }
      }
      $tooltip.leave = function() {
        clearTimeout(timeout);
        hoverState = 'out';
        if (!options.delay || !options.delay.hide) {
          return $tooltip.hide();
        }
        timeout = setTimeout(function() {
          if (hoverState === 'out') {
            $tooltip.hide();
          }
        }, options.delay.hide);
      };
      var _blur;
      var _tipToHide;
      $tooltip.hide = function(blur) {
        if (!$tooltip.$isShown) return;
        scope.$emit(options.prefixEvent + '.hide.before', $tooltip);
        if (angular.isDefined(options.onBeforeHide) && angular.isFunction(options.onBeforeHide)) {
          options.onBeforeHide($tooltip);
        }
        _blur = blur;
        _tipToHide = tipElement;
        if (angular.version.minor <= 2) {
          $animate.leave(tipElement, leaveAnimateCallback);
        } else {
          $animate.leave(tipElement).then(leaveAnimateCallback);
        }
        $tooltip.$isShown = scope.$isShown = false;
        safeDigest(scope);
        if (options.keyboard && tipElement !== null) {
          unbindKeyboardEvents();
        }
        if (options.autoClose && tipElement !== null) {
          unbindAutoCloseEvents();
        }
      };
      function leaveAnimateCallback() {
        scope.$emit(options.prefixEvent + '.hide', $tooltip);
        if (angular.isDefined(options.onHide) && angular.isFunction(options.onHide)) {
          options.onHide($tooltip);
        }
        if (tipElement === _tipToHide) {
          if (_blur && options.trigger === 'focus') {
            return element[0].blur();
          }
          destroyTipElement();
        }
      }
      $tooltip.toggle = function(evt) {
        if (evt) {
          evt.preventDefault();
        }
        if ($tooltip.$isShown) {
          $tooltip.leave();
        } else {
          $tooltip.enter();
        }
      };
      $tooltip.focus = function() {
        tipElement[0].focus();
      };
      $tooltip.setEnabled = function(isEnabled) {
        options.bsEnabled = isEnabled;
      };
      $tooltip.setViewport = function(viewport) {
        options.viewport = viewport;
      };
      $tooltip.$applyPlacement = function() {
        if (!tipElement) return;
        var placement = options.placement;
        var autoToken = /\s?auto?\s?/i;
        var autoPlace = autoToken.test(placement);
        if (autoPlace) {
          placement = placement.replace(autoToken, '') || defaults.placement;
        }
        tipElement.addClass(options.placement);
        var elementPosition = getPosition();
        var tipWidth = tipElement.prop('offsetWidth');
        var tipHeight = tipElement.prop('offsetHeight');
        $tooltip.$viewport = options.viewport && findElement(options.viewport.selector || options.viewport);
        if (autoPlace) {
          var originalPlacement = placement;
          var viewportPosition = getPosition($tooltip.$viewport);
          if (/bottom/.test(originalPlacement) && elementPosition.bottom + tipHeight > viewportPosition.bottom) {
            placement = originalPlacement.replace('bottom', 'top');
          } else if (/top/.test(originalPlacement) && elementPosition.top - tipHeight < viewportPosition.top) {
            placement = originalPlacement.replace('top', 'bottom');
          }
          if (/left/.test(originalPlacement) && elementPosition.left - tipWidth < viewportPosition.left) {
            placement = placement.replace('left', 'right');
          } else if (/right/.test(originalPlacement) && elementPosition.right + tipWidth > viewportPosition.width) {
            placement = placement.replace('right', 'left');
          }
          tipElement.removeClass(originalPlacement).addClass(placement);
        }
        var tipPosition = getCalculatedOffset(placement, elementPosition, tipWidth, tipHeight);
        applyPlacement(tipPosition, placement);
      };
      $tooltip.$onKeyUp = function(evt) {
        if (evt.which === 27 && $tooltip.$isShown) {
          $tooltip.hide();
          evt.stopPropagation();
        }
      };
      $tooltip.$onFocusKeyUp = function(evt) {
        if (evt.which === 27) {
          element[0].blur();
          evt.stopPropagation();
        }
      };
      $tooltip.$onFocusElementMouseDown = function(evt) {
        if (options.mouseDownPreventDefault) {
          evt.preventDefault();
        }
        if (options.mouseDownStopPropagation) {
          evt.stopPropagation();
        }
        if ($tooltip.$isShown) {
          element[0].blur();
        } else {
          element[0].focus();
        }
      };
      function bindTriggerEvents() {
        var triggers = options.trigger.split(' ');
        angular.forEach(triggers, function(trigger) {
          if (trigger === 'click' || trigger === 'contextmenu') {
            element.on(trigger, $tooltip.toggle);
          } else if (trigger !== 'manual') {
            element.on(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
            element.on(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
            if (nodeName === 'button' && trigger !== 'hover') {
              element.on(isTouch ? 'touchstart' : 'mousedown', $tooltip.$onFocusElementMouseDown);
            }
          }
        });
      }
      function unbindTriggerEvents() {
        var triggers = options.trigger.split(' ');
        for (var i = triggers.length; i--; ) {
          var trigger = triggers[i];
          if (trigger === 'click' || trigger === 'contextmenu') {
            element.off(trigger, $tooltip.toggle);
          } else if (trigger !== 'manual') {
            element.off(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
            element.off(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
            if (nodeName === 'button' && trigger !== 'hover') {
              element.off(isTouch ? 'touchstart' : 'mousedown', $tooltip.$onFocusElementMouseDown);
            }
          }
        }
      }
      function bindKeyboardEvents() {
        if (options.trigger !== 'focus') {
          tipElement.on('keyup', $tooltip.$onKeyUp);
        } else {
          element.on('keyup', $tooltip.$onFocusKeyUp);
        }
      }
      function unbindKeyboardEvents() {
        if (options.trigger !== 'focus') {
          tipElement.off('keyup', $tooltip.$onKeyUp);
        } else {
          element.off('keyup', $tooltip.$onFocusKeyUp);
        }
      }
      var _autoCloseEventsBinded = false;
      function bindAutoCloseEvents() {
        $timeout(function() {
          tipElement.on('click', stopEventPropagation);
          $body.on('click', $tooltip.hide);
          _autoCloseEventsBinded = true;
        }, 0, false);
      }
      function unbindAutoCloseEvents() {
        if (_autoCloseEventsBinded) {
          tipElement.off('click', stopEventPropagation);
          $body.off('click', $tooltip.hide);
          _autoCloseEventsBinded = false;
        }
      }
      function stopEventPropagation(event) {
        event.stopPropagation();
      }
      function getPosition($element) {
        $element = $element || (options.target || element);
        var el = $element[0];
        var isBody = el.tagName === 'BODY';
        var elRect = el.getBoundingClientRect();
        var rect = {};
        for (var p in elRect) {
          rect[p] = elRect[p];
        }
        if (rect.width === null) {
          rect = angular.extend({}, rect, {
            width: elRect.right - elRect.left,
            height: elRect.bottom - elRect.top
          });
        }
        var elOffset = isBody ? {
          top: 0,
          left: 0
        } : dimensions.offset(el);
        var scroll = {
          scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.prop('scrollTop') || 0
        };
        var outerDims = isBody ? {
          width: document.documentElement.clientWidth,
          height: $window.innerHeight
        } : null;
        return angular.extend({}, rect, scroll, outerDims, elOffset);
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
            break;

           default:
            break;
          }
        } else if (split[0] === 'left' || split[0] === 'right') {
          switch (split[1]) {
           case 'top':
            offset.top = position.top - actualHeight + position.height;
            break;

           case 'bottom':
            offset.top = position.top;
            break;

           default:
            break;
          }
        }
        return offset;
      }
      function applyPlacement(offset, placement) {
        var tip = tipElement[0];
        var width = tip.offsetWidth;
        var height = tip.offsetHeight;
        var marginTop = parseInt(dimensions.css(tip, 'margin-top'), 10);
        var marginLeft = parseInt(dimensions.css(tip, 'margin-left'), 10);
        if (isNaN(marginTop)) marginTop = 0;
        if (isNaN(marginLeft)) marginLeft = 0;
        offset.top = offset.top + marginTop;
        offset.left = offset.left + marginLeft;
        dimensions.setOffset(tip, angular.extend({
          using: function(props) {
            tipElement.css({
              top: Math.round(props.top) + 'px',
              left: Math.round(props.left) + 'px',
              right: ''
            });
          }
        }, offset), 0);
        var actualWidth = tip.offsetWidth;
        var actualHeight = tip.offsetHeight;
        if (placement === 'top' && actualHeight !== height) {
          offset.top = offset.top + height - actualHeight;
        }
        if (/top-left|top-right|bottom-left|bottom-right/.test(placement)) return;
        var delta = getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        if (delta.left) {
          offset.left += delta.left;
        } else {
          offset.top += delta.top;
        }
        dimensions.setOffset(tip, offset);
        if (/top|right|bottom|left/.test(placement)) {
          var isVertical = /top|bottom/.test(placement);
          var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
          var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';
          replaceArrow(arrowDelta, tip[arrowOffsetPosition], isVertical);
        }
      }
      function getViewportAdjustedDelta(placement, position, actualWidth, actualHeight) {
        var delta = {
          top: 0,
          left: 0
        };
        if (!$tooltip.$viewport) return delta;
        var viewportPadding = options.viewport && options.viewport.padding || 0;
        var viewportDimensions = getPosition($tooltip.$viewport);
        if (/right|left/.test(placement)) {
          var topEdgeOffset = position.top - viewportPadding - viewportDimensions.scroll;
          var bottomEdgeOffset = position.top + viewportPadding - viewportDimensions.scroll + actualHeight;
          if (topEdgeOffset < viewportDimensions.top) {
            delta.top = viewportDimensions.top - topEdgeOffset;
          } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
            delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
          }
        } else {
          var leftEdgeOffset = position.left - viewportPadding;
          var rightEdgeOffset = position.left + viewportPadding + actualWidth;
          if (leftEdgeOffset < viewportDimensions.left) {
            delta.left = viewportDimensions.left - leftEdgeOffset;
          } else if (rightEdgeOffset > viewportDimensions.right) {
            delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
          }
        }
        return delta;
      }
      function replaceArrow(delta, dimension, isHorizontal) {
        var $arrow = findElement('.tooltip-arrow, .arrow', tipElement[0]);
        $arrow.css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isHorizontal ? 'top' : 'left', '');
      }
      function destroyTipElement() {
        clearTimeout(timeout);
        if ($tooltip.$isShown && tipElement !== null) {
          if (options.autoClose) {
            unbindAutoCloseEvents();
          }
          if (options.keyboard) {
            unbindKeyboardEvents();
          }
        }
        if (tipScope) {
          tipScope.$destroy();
          tipScope = null;
        }
        if (tipElement) {
          tipElement.remove();
          tipElement = $tooltip.$element = null;
        }
      }
      return $tooltip;
    }
    function safeDigest(scope) {
      scope.$$phase || scope.$root && scope.$root.$$phase || scope.$digest();
    }
    function findElement(query, element) {
      return angular.element((element || document).querySelectorAll(query));
    }
    return TooltipFactory;
  } ];
}).directive('bsTooltip', [ '$window', '$location', '$sce', '$parse', '$tooltip', '$$rAF', function($window, $location, $sce, $parse, $tooltip, $$rAF) {
  return {
    restrict: 'EAC',
    scope: true,
    link: function postLink(scope, element, attr, transclusion) {
      var tooltip;
      var options = {
        scope: scope
      };
      angular.forEach([ 'template', 'templateUrl', 'controller', 'controllerAs', 'titleTemplate', 'placement', 'container', 'delay', 'trigger', 'html', 'animation', 'backdropAnimation', 'type', 'customClass', 'id' ], function(key) {
        if (angular.isDefined(attr[key])) options[key] = attr[key];
      });
      var falseValueRegExp = /^(false|0|)$/i;
      angular.forEach([ 'html', 'container' ], function(key) {
        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) {
          options[key] = false;
        }
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
      if (!scope.hasOwnProperty('title')) {
        scope.title = '';
      }
      attr.$observe('title', function(newValue) {
        if (angular.isDefined(newValue) || !scope.hasOwnProperty('title')) {
          var oldValue = scope.title;
          scope.title = $sce.trustAsHtml(newValue);
          if (angular.isDefined(oldValue)) {
            $$rAF(function() {
              if (tooltip) tooltip.$applyPlacement();
            });
          }
        }
      });
      attr.$observe('disabled', function(newValue) {
        if (newValue && tooltip.$isShown) {
          tooltip.hide();
        }
      });
      if (attr.bsTooltip) {
        scope.$watch(attr.bsTooltip, function(newValue, oldValue) {
          if (angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.title = newValue;
          }
          if (angular.isDefined(oldValue)) {
            $$rAF(function() {
              if (tooltip) tooltip.$applyPlacement();
            });
          }
        }, true);
      }
      if (attr.bsShow) {
        scope.$watch(attr.bsShow, function(newValue, oldValue) {
          if (!tooltip || !angular.isDefined(newValue)) return;
          if (angular.isString(newValue)) newValue = !!newValue.match(/true|,?(tooltip),?/i);
          if (newValue === true) {
            tooltip.show();
          } else {
            tooltip.hide();
          }
        });
      }
      if (attr.bsEnabled) {
        scope.$watch(attr.bsEnabled, function(newValue, oldValue) {
          if (!tooltip || !angular.isDefined(newValue)) return;
          if (angular.isString(newValue)) newValue = !!newValue.match(/true|1|,?(tooltip),?/i);
          if (newValue === false) {
            tooltip.setEnabled(false);
          } else {
            tooltip.setEnabled(true);
          }
        });
      }
      if (attr.viewport) {
        scope.$watch(attr.viewport, function(newValue) {
          if (!tooltip || !angular.isDefined(newValue)) return;
          tooltip.setViewport(newValue);
        });
      }
      tooltip = $tooltip(element, options);
      scope.$on('$destroy', function() {
        if (tooltip) tooltip.destroy();
        options = null;
        tooltip = null;
      });
    }
  };
} ]);