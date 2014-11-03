/**
 * angular-strap
 * @version v2.0.0-beta.2 - 2014-01-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (window, document, $, undefined) {
  'use strict';
  angular.module('mgcrea.ngStrap', [
    'mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.aside',
    'mgcrea.ngStrap.alert',
    'mgcrea.ngStrap.button',
    'mgcrea.ngStrap.navbar',
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.popover',
    'mgcrea.ngStrap.dropdown',
    'mgcrea.ngStrap.typeahead',
    'mgcrea.ngStrap.scrollspy',
    'mgcrea.ngStrap.affix',
    'mgcrea.ngStrap.tab'
  ]);
  angular.module('mgcrea.ngStrap.affix', ['mgcrea.ngStrap.jqlite.dimensions']).provider('$affix', function () {
    var defaults = this.defaults = { offsetTop: 'auto' };
    this.$get = [
      '$window',
      'dimensions',
      function ($window, dimensions) {
        var windowEl = angular.element($window);
        var bodyEl = angular.element($window.document.body);
        function AffixFactory(element, config) {
          var $affix = {};
          var options = angular.extend({}, defaults, config);
          var reset = 'affix affix-top affix-bottom', initialAffixTop = 0, initialOffsetTop = 0, affixed = null, unpin = null;
          var parent = element.parent();
          if (options.offsetParent) {
            if (options.offsetParent.match(/^\d+$/)) {
              for (var i = 0; i < options.offsetParent * 1 - 1; i++) {
                parent = parent.parent();
              }
            } else {
              parent = angular.element(options.offsetParent);
            }
          }
          var offsetTop = 0;
          if (options.offsetTop) {
            if (options.offsetTop === 'auto') {
              options.offsetTop = '+0';
            }
            if (options.offsetTop.match(/^[-+]\d+$/)) {
              initialAffixTop -= options.offsetTop * 1;
              if (options.offsetParent) {
                offsetTop = dimensions.offset(parent[0]).top + options.offsetTop * 1;
              } else {
                offsetTop = dimensions.offset(element[0]).top - dimensions.css(element[0], 'marginTop', true) + options.offsetTop * 1;
              }
            } else {
              offsetTop = options.offsetTop * 1;
            }
          }
          var offsetBottom = 0;
          if (options.offsetBottom) {
            if (options.offsetParent && options.offsetBottom.match(/^[-+]\d+$/)) {
              offsetBottom = $window.document.body.scrollHeight - (dimensions.offset(parent[0]).top + dimensions.height(parent[0])) + options.offsetBottom * 1 + 1;
            } else {
              offsetBottom = options.offsetBottom * 1;
            }
          }
          $affix.init = function () {
            initialOffsetTop = dimensions.offset(element[0]).top + initialAffixTop;
            windowEl.on('scroll', this.checkPosition);
            windowEl.on('click', this.checkPositionWithEventLoop);
            this.checkPosition();
            this.checkPositionWithEventLoop();
          };
          $affix.destroy = function () {
            windowEl.off('scroll', this.checkPosition);
            windowEl.off('click', this.checkPositionWithEventLoop);
          };
          $affix.checkPositionWithEventLoop = function () {
            setTimeout(this.checkPosition, 1);
          };
          $affix.checkPosition = function () {
            var scrollTop = $window.pageYOffset;
            var position = dimensions.offset(element[0]);
            var elementHeight = dimensions.height(element[0]);
            var affix = getRequiredAffixClass(unpin, position, elementHeight);
            if (affixed === affix)
              return;
            affixed = affix;
            element.removeClass(reset).addClass('affix' + (affix !== 'middle' ? '-' + affix : ''));
            if (affix === 'top') {
              unpin = null;
              element.css('position', options.offsetParent ? '' : 'relative');
              element.css('top', '');
            } else if (affix === 'bottom') {
              if (options.offsetUnpin) {
                unpin = -(options.offsetUnpin * 1);
              } else {
                unpin = position.top - scrollTop;
              }
              element.css('position', options.offsetParent ? '' : 'relative');
              element.css('top', options.offsetParent ? '' : bodyEl[0].offsetHeight - offsetBottom - elementHeight - initialOffsetTop + 'px');
            } else {
              unpin = null;
              element.css('position', 'fixed');
              element.css('top', initialAffixTop + 'px');
            }
          };
          function getRequiredAffixClass(unpin, position, elementHeight) {
            var scrollTop = $window.pageYOffset;
            var scrollHeight = $window.document.body.scrollHeight;
            if (scrollTop <= offsetTop) {
              return 'top';
            } else if (unpin !== null && scrollTop + unpin <= position.top) {
              return 'middle';
            } else if (offsetBottom !== null && position.top + elementHeight + initialAffixTop >= scrollHeight - offsetBottom) {
              return 'bottom';
            } else {
              return 'middle';
            }
          }
          $affix.init();
          return $affix;
        }
        return AffixFactory;
      }
    ];
  }).directive('bsAffix', [
    '$affix',
    'dimensions',
    function ($affix, dimensions) {
      return {
        restrict: 'EAC',
        link: function postLink(scope, element, attr) {
          var options = {
              scope: scope,
              offsetTop: 'auto'
            };
          angular.forEach([
            'offsetTop',
            'offsetBottom',
            'offsetParent',
            'offsetUnpin'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          var affix = $affix(element, options);
          scope.$on('$destroy', function () {
            options = null;
            affix = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.alert', []).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<div class="alert" tabindex="-1" ng-class="[type ? \'alert-\' + type : null]">' + '<button type="button" class="close" ng-click="$hide()">&times;</button>' + '<strong ng-bind="title"></strong>&nbsp;<span ng-bind-html="content"></span>' + '</div>';
      $templateCache.put('$alert', template);
    }
  ]).provider('$alert', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        prefixClass: 'alert',
        placement: null,
        template: '$alert',
        container: false,
        element: null,
        backdrop: false,
        keyboard: true,
        show: true,
        duration: false
      };
    this.$get = [
      '$modal',
      '$timeout',
      function ($modal, $timeout) {
        function AlertFactory(config) {
          var $alert = {};
          var options = angular.extend({}, defaults, config);
          $alert = $modal(options);
          if (!options.scope) {
            angular.forEach(['type'], function (key) {
              if (options[key])
                $alert.scope[key] = options[key];
            });
          }
          var show = $alert.show;
          if (options.duration) {
            $alert.show = function () {
              show();
              $timeout(function () {
                $alert.hide();
              }, options.duration * 1000);
            };
          }
          return $alert;
        }
        return AlertFactory;
      }
    ];
  }).directive('bsAlert', [
    '$window',
    '$location',
    '$sce',
    '$alert',
    function ($window, $location, $sce, $alert) {
      var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
      return {
        restrict: 'EAC',
        scope: true,
        link: function postLink(scope, element, attr, transclusion) {
          var options = {
              scope: scope,
              element: element,
              show: false
            };
          angular.forEach([
            'template',
            'placement',
            'keyboard',
            'html',
            'container',
            'animation',
            'duration'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          angular.forEach([
            'title',
            'content',
            'type'
          ], function (key) {
            attr[key] && attr.$observe(key, function (newValue, oldValue) {
              scope[key] = newValue;
            });
          });
          attr.bsAlert && scope.$watch(attr.bsAlert, function (newValue, oldValue) {
            if (angular.isObject(newValue)) {
              angular.extend(scope, newValue);
            } else {
              scope.content = newValue;
            }
          }, true);
          var alert = $alert(options);
          element.on(attr.trigger || 'click', alert.toggle);
          scope.$on('$destroy', function () {
            alert.destroy();
            options = null;
            alert = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.aside', ['mgcrea.ngStrap.modal']).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<div class="aside" tabindex="-1" role="dialog">' + '<div class="aside-dialog">' + '<div class="aside-content">' + '<div class="aside-header" ng-show="title">' + '<button type="button" class="close" ng-click="$hide()">&times;</button>' + '<h4 class="aside-title" ng-bind="title"></h4>' + '</div>' + '<div class="aside-body" ng-show="content" ng-bind="content"></div>' + '<div class="aside-footer">' + '<button type="button" class="btn btn-default" ng-click="$hide()">Close</button>' + '</div>' + '</div>' + '</div>' + '</div>';
      $templateCache.put('$aside', template);
    }
  ]).provider('$aside', function () {
    var defaults = this.defaults = {
        animation: 'animation-fadeAndSlideRight',
        prefixClass: 'aside',
        placement: 'right',
        template: '$aside',
        container: false,
        element: null,
        backdrop: true,
        keyboard: true,
        html: false,
        show: true
      };
    this.$get = [
      '$modal',
      function ($modal) {
        function AsideFactory(config) {
          var $aside = {};
          var options = angular.extend({}, defaults, config);
          $aside = $modal(options);
          return $aside;
        }
        return AsideFactory;
      }
    ];
  }).directive('bsAside', [
    '$window',
    '$location',
    '$sce',
    '$aside',
    function ($window, $location, $sce, $aside) {
      var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
      return {
        restrict: 'EAC',
        scope: true,
        link: function postLink(scope, element, attr, transclusion) {
          var options = {
              scope: scope,
              element: element,
              show: false
            };
          angular.forEach([
            'template',
            'placement',
            'backdrop',
            'keyboard',
            'html',
            'container',
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
              scope[key] = newValue;
            });
          });
          attr.bsAside && scope.$watch(attr.bsAside, function (newValue, oldValue) {
            if (angular.isObject(newValue)) {
              angular.extend(scope, newValue);
            } else {
              scope.content = newValue;
            }
          }, true);
          var aside = $aside(options);
          element.on(attr.trigger || 'click', aside.toggle);
          scope.$on('$destroy', function () {
            aside.destroy();
            options = null;
            aside = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.button', []).provider('$button', function () {
    var defaults = this.defaults = {
        activeClass: 'active',
        toggleEvent: 'click'
      };
    this.$get = function () {
      return { defaults: defaults };
    };
  }).directive('bsCheckboxGroup', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      compile: function postLink(element, attr) {
        element.attr('data-toggle', 'buttons');
        element.removeAttr('ng-model');
        var children = element[0].querySelectorAll('input[type="checkbox"]');
        angular.forEach(children, function (child) {
          var childEl = angular.element(child);
          childEl.attr('bs-checkbox', '');
          childEl.attr('ng-model', attr.ngModel + '.' + childEl.attr('value'));
        });
      }
    };
  }).directive('bsCheckbox', [
    '$button',
    function ($button) {
      var defaults = $button.defaults;
      var constantValueRegExp = /^(true|false|\d+)$/;
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, element, attr, controller) {
          var options = defaults;
          var isInput = element[0].nodeName === 'INPUT';
          var activeElement = isInput ? element.parent() : element;
          var trueValue = angular.isDefined(attr.trueValue) ? attr.trueValue : true;
          if (constantValueRegExp.test(attr.trueValue)) {
            trueValue = scope.$eval(attr.trueValue);
          }
          var falseValue = angular.isDefined(attr.falseValue) ? attr.falseValue : false;
          if (constantValueRegExp.test(attr.falseValue)) {
            falseValue = scope.$eval(attr.falseValue);
          }
          var hasExoticValues = typeof trueValue !== 'boolean' || typeof falseValue !== 'boolean';
          if (hasExoticValues) {
            controller.$parsers.push(function (viewValue) {
              return viewValue ? trueValue : falseValue;
            });
            scope.$watch(attr.ngModel, function (newValue, oldValue) {
              controller.$render();
            });
          }
          controller.$render = function () {
            var isActive = angular.equals(controller.$modelValue, trueValue);
            if (isInput) {
              element[0].checked = isActive;
            }
            activeElement.toggleClass(options.activeClass, isActive);
          };
          element.bind(options.toggleEvent, function () {
            scope.$apply(function () {
              if (!isInput) {
                controller.$setViewValue(!activeElement.hasClass('active'));
              }
              if (!hasExoticValues) {
                controller.$render();
              }
            });
          });
        }
      };
    }
  ]).directive('bsRadioGroup', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      compile: function postLink(element, attr) {
        element.attr('data-toggle', 'buttons');
        element.removeAttr('ng-model');
        var children = element[0].querySelectorAll('input[type="radio"]');
        angular.forEach(children, function (child) {
          angular.element(child).attr('bs-radio', '');
          angular.element(child).attr('ng-model', attr.ngModel);
        });
      }
    };
  }).directive('bsRadio', [
    '$button',
    function ($button) {
      var defaults = $button.defaults;
      var constantValueRegExp = /^(true|false|\d+)$/;
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, element, attr, controller) {
          var options = defaults;
          var isInput = element[0].nodeName === 'INPUT';
          var activeElement = isInput ? element.parent() : element;
          var value = constantValueRegExp.test(attr.value) ? scope.$eval(attr.value) : attr.value;
          controller.$render = function () {
            var isActive = angular.equals(controller.$modelValue, value);
            if (isInput) {
              element[0].checked = isActive;
            }
            activeElement.toggleClass(options.activeClass, isActive);
          };
          element.bind(options.toggleEvent, function () {
            scope.$apply(function () {
              controller.$setViewValue(value);
              controller.$render();
            });
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.dropdown', ['mgcrea.ngStrap.tooltip']).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<ul tabindex="-1" class="dropdown-menu" role="menu">' + '<li role="presentation" ng-class="{divider: item.divider}" ng-repeat="item in content" >' + '<a role="menuitem" tabindex="-1" href="{{item.href}}" ng-if="!item.divider" ng-click="$eval(item.click);$hide()" ng-bind="item.text"></a>' + '</li>' + '</ul>';
      $templateCache.put('$dropdown', template);
    }
  ]).provider('$dropdown', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        prefixClass: 'dropdown',
        placement: 'bottom-left',
        template: '$dropdown',
        trigger: 'click',
        container: false,
        keyboard: true,
        html: false,
        delay: 0
      };
    this.$get = [
      '$window',
      '$tooltip',
      function ($window, $tooltip) {
        var bodyEl = angular.element($window.document.body);
        var matchesSelector = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector;
        function DropdownFactory(element, config) {
          var $dropdown = {};
          var options = angular.extend({}, defaults, config);
          $dropdown = $tooltip(element, options);
          $dropdown.$onKeyDown = function (evt) {
            if (!/(38|40)/.test(evt.keyCode))
              return;
            evt.preventDefault();
            evt.stopPropagation();
            var items = angular.element($dropdown.$element[0].querySelectorAll('li:not(.divider) a'));
            if (!items.length)
              return;
            var index;
            angular.forEach(items, function (el, i) {
              if (matchesSelector && matchesSelector.call(el, ':focus'))
                index = i;
            });
            if (evt.keyCode === 38 && index > 0)
              index--;
            else if (evt.keyCode === 40 && index < items.length - 1)
              index++;
            else if (angular.isUndefined(index))
              index = 0;
            items.eq(index)[0].focus();
          };
          var show = $dropdown.show;
          $dropdown.show = function () {
            show();
            setTimeout(function () {
              options.keyboard && $dropdown.$element.on('keydown', $dropdown.$onKeyDown);
              bodyEl.on('click', onBodyClick);
            });
          };
          var hide = $dropdown.hide;
          $dropdown.hide = function () {
            options.keyboard && $dropdown.$element.off('keydown', $dropdown.$onKeyDown);
            bodyEl.off('click', onBodyClick);
            hide();
          };
          function onBodyClick(evt) {
            if (evt.target === element[0])
              return;
            return evt.target !== element[0] && $dropdown.hide();
          }
          return $dropdown;
        }
        return DropdownFactory;
      }
    ];
  }).directive('bsDropdown', [
    '$window',
    '$location',
    '$sce',
    '$dropdown',
    function ($window, $location, $sce, $dropdown) {
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
            'keyboard',
            'html',
            'animation',
            'template'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          attr.bsDropdown && scope.$watch(attr.bsDropdown, function (newValue, oldValue) {
            scope.content = newValue;
          }, true);
          var dropdown = $dropdown(element, options);
          scope.$on('$destroy', function () {
            dropdown.destroy();
            options = null;
            dropdown = null;
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.jqlite.debounce', []).constant('debounce', function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function () {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function () {
        var last = new Date() - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate)
            result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow)
        result = func.apply(context, args);
      return result;
    };
  }).constant('throttle', function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function () {
      previous = options.leading === false ? 0 : new Date();
      timeout = null;
      result = func.apply(context, args);
    };
    return function () {
      var now = new Date();
      if (!previous && options.leading === false)
        previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  });
  angular.module('mgcrea.ngStrap.jqlite.dimensions', []).factory('dimensions', [
    '$document',
    '$window',
    function ($document, $window) {
      var jqLite = angular.element;
      var fn = {};
      var nodeName = fn.nodeName = function (element, name) {
          return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
        };
      fn.css = function (element, prop, extra) {
        var value;
        if (element.currentStyle) {
          value = element.currentStyle[prop];
        } else if (window.getComputedStyle) {
          value = window.getComputedStyle(element)[prop];
        } else {
          value = element.style[prop];
        }
        return extra === true ? parseFloat(value) || 0 : value;
      };
      fn.offset = function (element) {
        var boxRect = element.getBoundingClientRect();
        var docElement = element.ownerDocument;
        return {
          width: element.offsetWidth,
          height: element.offsetHeight,
          top: boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) - (docElement.documentElement.clientTop || 0),
          left: boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) - (docElement.documentElement.clientLeft || 0)
        };
      };
      fn.position = function (element) {
        var offsetParentRect = {
            top: 0,
            left: 0
          }, offsetParentElement, offset;
        if (fn.css(element, 'position') === 'fixed') {
          offset = element.getBoundingClientRect();
        } else {
          offsetParentElement = offsetParent(element);
          offset = fn.offset(element);
          offset = fn.offset(element);
          if (!nodeName(offsetParentElement, 'html')) {
            offsetParentRect = fn.offset(offsetParentElement);
          }
          offsetParentRect.top += fn.css(offsetParentElement, 'borderTopWidth', true);
          offsetParentRect.left += fn.css(offsetParentElement, 'borderLeftWidth', true);
        }
        return {
          width: element.offsetWidth,
          height: element.offsetHeight,
          top: offset.top - offsetParentRect.top - fn.css(element, 'marginTop', true),
          left: offset.left - offsetParentRect.left - fn.css(element, 'marginLeft', true)
        };
      };
      var offsetParent = function offsetParentElement(element) {
        var docElement = element.ownerDocument;
        var offsetParent = element.offsetParent || docElement;
        while (offsetParent && !nodeName(offsetParent, 'html') && fn.css(offsetParent, 'position') === 'static') {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElement.documentElement;
      };
      fn.height = function (element, outer) {
        var value = element.offsetHeight;
        if (outer) {
          value += fn.css(element, 'marginTop', true) + fn.css(element, 'marginBottom', true);
        } else {
          value -= fn.css(element, 'paddingTop', true) + fn.css(element, 'paddingBottom', true) + fn.css(element, 'borderTopWidth', true) + fn.css(element, 'borderBottomWidth', true);
        }
        return value;
      };
      fn.width = function (element, outer) {
        var value = element.offsetWidth;
        if (outer) {
          value += fn.css(element, 'marginLeft', true) + fn.css(element, 'marginRight', true);
        } else {
          value -= fn.css(element, 'paddingLeft', true) + fn.css(element, 'paddingRight', true) + fn.css(element, 'borderLeftWidth', true) + fn.css(element, 'borderRightWidth', true);
        }
        return value;
      };
      return fn;
    }
  ]);
  angular.module('mgcrea.ngStrap.modal', ['mgcrea.ngStrap.jqlite.dimensions']).run([
    '$templateCache',
    '$modal',
    function ($templateCache, $modal) {
      var template = '' + '<div class="modal" tabindex="-1" role="dialog">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header" ng-show="title">' + '<button type="button" class="close" ng-click="$hide()">&times;</button>' + '<h4 class="modal-title" ng-bind="title"></h4>' + '</div>' + '<div class="modal-body" ng-show="content" ng-bind="content"></div>' + '<div class="modal-footer">' + '<button type="button" class="btn btn-default" ng-click="$hide()">Close</button>' + '</div>' + '</div>' + '</div>' + '</div>';
      $templateCache.put('$modal', template);
    }
  ]).provider('$modal', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        prefixClass: 'modal',
        placement: 'top',
        template: '$modal',
        container: false,
        element: null,
        backdrop: true,
        keyboard: true,
        html: false,
        show: true
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
        var forEach = angular.forEach;
        var jqLite = angular.element;
        var trim = String.prototype.trim;
        var bodyElement = jqLite($window.document.body);
        var htmlReplaceRegExp = /ng-bind="/gi;
        var findElement = function (query, element) {
          return jqLite((element || document).querySelectorAll(query));
        };
        function ModalFactory(config) {
          var $modal = {};
          var options = angular.extend({}, defaults, config);
          $modal.$promise = $q.when($templateCache.get(options.template) || $http.get(options.template));
          var scope = $modal.$scope = options.scope && options.scope.$new() || $rootScope.$new();
          if (!options.element && !options.container) {
            options.container = 'body';
          }
          if (!options.scope) {
            forEach([
              'title',
              'content'
            ], function (key) {
              if (options[key])
                scope[key] = options[key];
            });
          }
          scope.$hide = function () {
            scope.$$postDigest(function () {
              $modal.hide();
            });
          };
          scope.$show = function () {
            scope.$$postDigest(function () {
              $modal.show();
            });
          };
          scope.$toggle = function () {
            scope.$$postDigest(function () {
              $modal.toggle();
            });
          };
          var modalLinker, modalElement;
          var backdropElement = jqLite('<div class="' + options.prefixClass + '-backdrop"/>');
          $modal.$promise.then(function (template) {
            if (angular.isObject(template))
              template = template.data;
            if (options.html)
              template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
            template = trim.apply(template);
            modalLinker = $compile(template);
            $modal.init();
          });
          $modal.init = function () {
            if (options.show) {
              scope.$$postDigest(function () {
                $modal.show();
              });
            }
          };
          $modal.destroy = function () {
            if (modalElement) {
              modalElement.remove();
              modalElement = null;
            }
            if (backdropElement) {
              backdropElement.remove();
              backdropElement = null;
            }
            scope.$destroy();
          };
          $modal.show = function () {
            var parent = options.container ? findElement(options.container) : null;
            var after = options.container ? null : options.element;
            modalElement = $modal.$element = modalLinker(scope, function (clonedElement, scope) {
            });
            modalElement.css({ display: 'block' }).addClass(options.placement);
            if (options.animation) {
              if (options.backdrop) {
                backdropElement.addClass('animation-fade');
              }
              modalElement.addClass(options.animation);
            }
            if (options.backdrop) {
              $animate.enter(backdropElement, bodyElement, null, function () {
              });
            }
            $animate.enter(modalElement, parent, after, function () {
            });
            scope.$isShown = true;
            scope.$digest();
            $modal.focus();
            bodyElement.addClass(options.prefixClass + '-open');
            if (options.backdrop) {
              modalElement.on('click', hideOnBackdropClick);
            }
            if (options.keyboard) {
              modalElement.on('keyup', $modal.$onKeyUp);
            }
          };
          $modal.hide = function () {
            $animate.leave(modalElement, function () {
              bodyElement.removeClass('modal-open');
            });
            if (options.backdrop) {
              $animate.leave(backdropElement, function () {
              });
            }
            scope.$digest();
            scope.$isShown = false;
            if (options.backdrop) {
              modalElement.off('click', hideOnBackdropClick);
            }
            if (options.keyboard) {
              modalElement.off('keyup', $modal.$onKeyUp);
            }
          };
          $modal.toggle = function () {
            scope.$isShown ? $modal.hide() : $modal.show();
          };
          $modal.focus = function () {
            modalElement[0].focus();
          };
          $modal.$onKeyUp = function (evt) {
            evt.which === 27 && $modal.hide();
          };
          function hideOnBackdropClick(evt) {
            if (evt.target !== evt.currentTarget)
              return;
            options.backdrop === 'static' ? $modal.focus() : $modal.hide();
          }
          return $modal;
        }
        return ModalFactory;
      }
    ];
  }).directive('bsModal', [
    '$window',
    '$location',
    '$sce',
    '$modal',
    function ($window, $location, $sce, $modal) {
      return {
        restrict: 'EAC',
        scope: true,
        link: function postLink(scope, element, attr, transclusion) {
          var options = {
              scope: scope,
              element: element,
              show: false
            };
          angular.forEach([
            'template',
            'placement',
            'backdrop',
            'keyboard',
            'html',
            'container',
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
              scope[key] = newValue;
            });
          });
          attr.bsModal && scope.$watch(attr.bsModal, function (newValue, oldValue) {
            if (angular.isObject(newValue)) {
              angular.extend(scope, newValue);
            } else {
              scope.content = newValue;
            }
          }, true);
          var modal = $modal(options);
          element.on(attr.trigger || 'click', modal.toggle);
          scope.$on('$destroy', function () {
            modal.destroy();
            options = null;
            modal = null;
          });
        }
      };
    }
  ]);
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
  angular.module('mgcrea.ngStrap.scrollspy', [
    'mgcrea.ngStrap.jqlite.debounce',
    'mgcrea.ngStrap.jqlite.dimensions'
  ]).provider('$scrollspy', function () {
    var spies = this.$$spies = {};
    var defaults = this.defaults = {
        debounce: 150,
        throttle: 100,
        offset: 100
      };
    this.$get = [
      '$window',
      '$document',
      '$rootScope',
      'dimensions',
      'debounce',
      'throttle',
      function ($window, $document, $rootScope, dimensions, debounce, throttle) {
        var windowEl = angular.element($window);
        var docEl = angular.element($document.prop('documentElement'));
        var bodyEl = angular.element($window.document.body);
        function nodeName(element, name) {
          return element[0].nodeName && element[0].nodeName.toLowerCase() === name.toLowerCase();
        }
        function ScrollSpyFactory(config) {
          var options = angular.extend({}, defaults, config);
          if (!options.element)
            options.element = bodyEl;
          var isWindowSpy = nodeName(options.element, 'body');
          var scrollEl = isWindowSpy ? windowEl : options.element;
          var scrollId = isWindowSpy ? 'window' : options.id;
          if (spies[scrollId]) {
            spies[scrollId].$$count++;
            return spies[scrollId];
          }
          var $scrollspy = {};
          var trackedElements = $scrollspy.$trackedElements = [];
          var sortedElements = [];
          var activeTarget;
          var debouncedCheckPosition;
          var throttledCheckPosition;
          var debouncedCheckOffsets;
          var viewportHeight;
          var scrollTop;
          $scrollspy.init = function () {
            this.$$count = 1;
            debouncedCheckPosition = debounce(this.checkPosition, options.debounce);
            throttledCheckPosition = throttle(this.checkPosition, options.throttle);
            scrollEl.on('click', this.checkPositionWithEventLoop);
            windowEl.on('resize', debouncedCheckPosition);
            scrollEl.on('scroll', throttledCheckPosition);
            debouncedCheckOffsets = debounce(this.checkOffsets, options.debounce);
            $rootScope.$on('$viewContentLoaded', debouncedCheckOffsets);
            $rootScope.$on('$includeContentLoaded', debouncedCheckOffsets);
            debouncedCheckOffsets();
            if (scrollId) {
              spies[scrollId] = $scrollspy;
            }
          };
          $scrollspy.destroy = function () {
            this.$$count--;
            if (this.$$count > 0) {
              return;
            }
            scrollEl.off('click', this.checkPositionWithEventLoop);
            windowEl.off('resize', debouncedCheckPosition);
            scrollEl.off('scroll', debouncedCheckPosition);
            $rootScope.$off('$viewContentLoaded', debouncedCheckOffsets);
            $rootScope.$off('$includeContentLoaded', debouncedCheckOffsets);
          };
          $scrollspy.checkPosition = function () {
            if (!sortedElements.length)
              return;
            scrollTop = (isWindowSpy ? $window.pageYOffset : scrollEl.prop('scrollTop')) || 0;
            viewportHeight = Math.max($window.innerHeight, docEl.prop('clientHeight'));
            if (scrollTop < sortedElements[0].offsetTop && activeTarget !== sortedElements[0].target) {
              return $scrollspy.$activateElement(sortedElements[0]);
            }
            for (var i = sortedElements.length; i--;) {
              if (angular.isUndefined(sortedElements[i].offsetTop) || sortedElements[i].offsetTop === null)
                continue;
              if (activeTarget === sortedElements[i].target)
                continue;
              if (scrollTop < sortedElements[i].offsetTop)
                continue;
              if (sortedElements[i + 1] && scrollTop > sortedElements[i + 1].offsetTop)
                continue;
              return $scrollspy.$activateElement(sortedElements[i]);
            }
          };
          $scrollspy.checkPositionWithEventLoop = function () {
            setTimeout(this.checkPosition, 1);
          };
          $scrollspy.$activateElement = function (element) {
            if (activeTarget) {
              var activeElement = $scrollspy.$getTrackedElement(activeTarget);
              if (activeElement) {
                activeElement.source.removeClass('active');
                if (nodeName(activeElement.source, 'li') && nodeName(activeElement.source.parent().parent(), 'li')) {
                  activeElement.source.parent().parent().removeClass('active');
                }
              }
            }
            activeTarget = element.target;
            element.source.addClass('active');
            if (nodeName(element.source, 'li') && nodeName(element.source.parent().parent(), 'li')) {
              element.source.parent().parent().addClass('active');
            }
          };
          $scrollspy.$getTrackedElement = function (target) {
            return trackedElements.filter(function (obj) {
              return obj.target === target;
            })[0];
          };
          $scrollspy.checkOffsets = function () {
            angular.forEach(trackedElements, function (trackedElement) {
              var targetElement = document.querySelector(trackedElement.target);
              trackedElement.offsetTop = targetElement ? dimensions.offset(targetElement).top : null;
              if (options.offset && trackedElement.offsetTop !== null)
                trackedElement.offsetTop -= options.offset * 1;
            });
            sortedElements = trackedElements.filter(function (el) {
              return el.offsetTop !== null;
            }).sort(function (a, b) {
              return a.offsetTop - b.offsetTop;
            });
            debouncedCheckPosition();
          };
          $scrollspy.trackElement = function (target, source) {
            trackedElements.push({
              target: target,
              source: source
            });
          };
          $scrollspy.untrackElement = function (target, source) {
            var toDelete;
            for (var i = trackedElements.length; i--;) {
              if (trackedElements[i].target === target && trackedElements[i].source === source) {
                toDelete = i;
                break;
              }
            }
            trackedElements = trackedElements.splice(toDelete, 1);
          };
          $scrollspy.activate = function (i) {
            trackedElements[i].addClass('active');
          };
          $scrollspy.init();
          return $scrollspy;
        }
        return ScrollSpyFactory;
      }
    ];
  }).directive('bsScrollspy', [
    '$rootScope',
    'debounce',
    'dimensions',
    '$scrollspy',
    function ($rootScope, debounce, dimensions, $scrollspy) {
      return {
        restrict: 'EAC',
        link: function postLink(scope, element, attr) {
          var options = { scope: scope };
          angular.forEach([
            'offset',
            'target'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          var scrollspy = $scrollspy(options);
          scrollspy.trackElement(options.target, element);
          scope.$on('$destroy', function () {
            scrollspy.untrackElement(options.target, element);
            scrollspy.destroy();
            options = null;
            scrollspy = null;
          });
        }
      };
    }
  ]).directive('bsScrollspyList', [
    '$rootScope',
    'debounce',
    'dimensions',
    '$scrollspy',
    function ($rootScope, debounce, dimensions, $scrollspy) {
      return {
        restrict: 'A',
        compile: function postLink(element, attr) {
          var children = element[0].querySelectorAll('li > a[href]');
          angular.forEach(children, function (child) {
            var childEl = angular.element(child);
            childEl.parent().attr('bs-scrollspy', '').attr('data-target', childEl.attr('href'));
          });
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.tab', []).run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('$pane', '{{pane.content}}');
      var template = '<ul class="nav nav-tabs">' + '<li ng-repeat="pane in panes" ng-class="{active:$index==active}">' + '<a data-toggle="tab" ng-click="setActive($index, $event)" data-index="{{$index}}">{{pane.title}}</a>' + '</li>' + '</ul>' + '<div class="tab-content">' + '<div ng-repeat="pane in panes" class="tab-pane" ng-class="[$index==active?\'active\':\'\']" ng-include="pane.template || \'$pane\'"></div>' + '</div>';
      $templateCache.put('$tabs', template);
    }
  ]).provider('$tab', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        template: '$tabs'
      };
    this.$get = function () {
      return { defaults: defaults };
    };
  }).directive('bsTabs', [
    '$window',
    '$animate',
    '$tab',
    function ($window, $animate, $tab) {
      var defaults = $tab.defaults;
      return {
        restrict: 'EAC',
        scope: true,
        require: '?ngModel',
        templateUrl: function (element, attr) {
          return attr.template || defaults.template;
        },
        link: function postLink(scope, element, attr, controller) {
          var options = defaults;
          angular.forEach(['animation'], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          attr.bsTabs && scope.$watch(attr.bsTabs, function (newValue, oldValue) {
            scope.panes = newValue;
          }, true);
          element.addClass('tabs');
          if (options.animation) {
            element.addClass(options.animation);
          }
          scope.active = scope.activePane = 0;
          scope.setActive = function (index, ev) {
            scope.active = index;
            if (controller) {
              controller.$setViewValue(index);
            }
          };
          if (controller) {
            controller.$render = function () {
              scope.active = controller.$modelValue * 1;
            };
          }
        }
      };
    }
  ]);
  angular.module('mgcrea.ngStrap.tooltip', ['mgcrea.ngStrap.jqlite.dimensions']).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<div class="tooltip" ng-show="title">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner" ng-bind="title"></div>' + '</div>';
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
        html: false,
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
          var options = angular.extend({}, defaults, config);
          $tooltip.$promise = $q.when($templateCache.get(options.template) || $http.get(options.template));
          var scope = $tooltip.$scope = options.scope.$new() || $rootScope.$new();
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
          $tooltip.$isShown = false;
          var timeout, hoverState;
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
            $tooltip.$isShown = true;
            scope.$digest();
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
            $tooltip.$isShown = false;
            if (options.keyboard) {
              tipElement.off('keyup', $tooltip.$onKeyUp);
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
            'placement',
            'container',
            'delay',
            'trigger',
            'keyboard',
            'html',
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
  angular.module('mgcrea.ngStrap.typeahead', ['mgcrea.ngStrap.tooltip']).run([
    '$templateCache',
    function ($templateCache) {
      var template = '' + '<ul tabindex="-1" class="typeahead dropdown-menu" ng-show="$isVisible()" role="select">' + '<li role="presentation" ng-repeat="match in $matches" ng-class="{active: $index == $activeIndex}">' + '<a role="menuitem" tabindex="-1" ng-click="$select($index, $event)" ng-bind="match.label"></a>' + '</li>' + '</ul>';
      $templateCache.put('$typeahead', template);
    }
  ]).provider('$typeahead', function () {
    var defaults = this.defaults = {
        animation: 'animation-fade',
        prefixClass: 'typeahead',
        placement: 'bottom-left',
        template: '$typeahead',
        trigger: 'focus',
        container: false,
        keyboard: true,
        html: false,
        delay: 0,
        minLength: 0,
        limit: 6
      };
    this.$get = [
      '$window',
      '$rootScope',
      '$tooltip',
      function ($window, $rootScope, $tooltip) {
        var bodyEl = angular.element($window.document.body);
        function TypeaheadFactory(element, config) {
          var $typeahead = {};
          var options = angular.extend({}, defaults, config);
          var controller = options.controller;
          $typeahead = $tooltip(element, options);
          var parentScope = config.scope;
          var scope = $typeahead.$scope;
          scope.$matches = [];
          scope.$activeIndex = 0;
          scope.$activate = function (index) {
            scope.$$postDigest(function () {
              $typeahead.activate(index);
            });
          };
          scope.$select = function (index, evt) {
            scope.$$postDigest(function () {
              $typeahead.select(index);
            });
          };
          scope.$isVisible = function () {
            return $typeahead.$isVisible();
          };
          $typeahead.update = function (matches) {
            scope.$matches = matches;
            if (scope.$activeIndex >= matches.length) {
              scope.$activeIndex = 0;
            }
          };
          $typeahead.activate = function (index) {
            scope.$activeIndex = index;
          };
          $typeahead.select = function (index) {
            var value = scope.$matches[index].value;
            if (controller) {
              controller.$setViewValue(value);
              controller.$render();
              if (parentScope)
                parentScope.$digest();
            }
            element[0].blur();
            scope.$emit('$typeahead.select', value, index);
            scope.$activeIndex = 0;
          };
          $typeahead.$isVisible = function () {
            if (!options.minLength || !controller) {
              return scope.$matches.length;
            }
            return scope.$matches.length && controller.$viewValue.length >= options.minLength;
          };
          $typeahead.$onMouseDown = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
          };
          $typeahead.$onKeyDown = function (evt) {
            if (!/(38|40|13)/.test(evt.keyCode))
              return;
            evt.preventDefault();
            evt.stopPropagation();
            if (evt.keyCode === 13) {
              return $typeahead.select(scope.$activeIndex);
            }
            if (evt.keyCode === 38 && scope.$activeIndex > 0)
              scope.$activeIndex--;
            else if (evt.keyCode === 40 && scope.$activeIndex < scope.$matches.length - 1)
              scope.$activeIndex++;
            else if (angular.isUndefined(scope.$activeIndex))
              scope.$activeIndex = 0;
            scope.$digest();
          };
          var show = $typeahead.show;
          $typeahead.show = function () {
            show();
            setTimeout(function () {
              $typeahead.$element.on('mousedown', $typeahead.$onMouseDown);
              if (options.keyboard) {
                element.on('keydown', $typeahead.$onKeyDown);
              }
            });
          };
          var hide = $typeahead.hide;
          $typeahead.hide = function () {
            $typeahead.$element.off('mousedown', $typeahead.$onMouseDown);
            if (options.keyboard) {
              element.off('keydown', $typeahead.$onKeyDown);
            }
            hide();
          };
          return $typeahead;
        }
        TypeaheadFactory.defaults = defaults;
        return TypeaheadFactory;
      }
    ];
  }).directive('bsTypeahead', [
    '$window',
    '$parse',
    '$q',
    '$typeahead',
    function ($window, $parse, $q, $typeahead) {
      var defaults = $typeahead.defaults;
      var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/;
      return {
        restrict: 'EAC',
        require: 'ngModel',
        link: function postLink(scope, element, attr, controller) {
          var options = {
              scope: scope,
              controller: controller
            };
          angular.forEach([
            'placement',
            'container',
            'delay',
            'trigger',
            'keyboard',
            'html',
            'animation',
            'template',
            'limit',
            'minLength'
          ], function (key) {
            if (angular.isDefined(attr[key]))
              options[key] = attr[key];
          });
          var limit = options.limit || defaults.limit;
          var ngOptions = attr.ngOptions + ' | filter:$viewValue |\xa0limitTo:' + limit;
          var match = ngOptions.match(NG_OPTIONS_REGEXP);
          var displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]);
          var typeahead = $typeahead(element, options);
          scope.$watch(attr.ngModel, function (newValue, oldValue) {
            $q.when(valuesFn(scope, controller)).then(function (values) {
              if (values.length > limit)
                values = values.slice(0, limit);
              var matches = parseValues(values);
              typeahead.update(matches);
            });
          });
          function parseValues(values) {
            return values.map(function (match) {
              var locals = {}, label, value;
              locals[valueName] = match;
              label = displayFn(locals);
              value = valueFn(locals);
              if (angular.isObject(value))
                value = label;
              return {
                label: label,
                value: value
              };
            });
          }
          scope.$on('$destroy', function () {
            typeahead.destroy();
            options = null;
            typeahead = null;
          });
        }
      };
    }
  ]);
}(window, document, window.jQuery));