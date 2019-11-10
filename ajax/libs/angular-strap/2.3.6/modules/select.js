/**
 * angular-strap
 * @version v2.3.6 - 2015-11-14
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.select', [ 'mgcrea.ngStrap.tooltip', 'mgcrea.ngStrap.helpers.parseOptions' ]).provider('$select', function() {
  var defaults = this.defaults = {
    animation: 'am-fade',
    prefixClass: 'select',
    prefixEvent: '$select',
    placement: 'bottom-left',
    templateUrl: 'select/select.tpl.html',
    trigger: 'focus',
    container: false,
    keyboard: true,
    html: false,
    delay: 0,
    multiple: false,
    allNoneButtons: false,
    sort: true,
    caretHtml: '&nbsp;<span class="caret"></span>',
    placeholder: 'Choose among the following...',
    allText: 'All',
    noneText: 'None',
    maxLength: 3,
    maxLengthHtml: 'selected',
    iconCheckmark: 'glyphicon glyphicon-ok'
  };
  this.$get = [ '$window', '$document', '$rootScope', '$tooltip', '$timeout', function($window, $document, $rootScope, $tooltip, $timeout) {
    var bodyEl = angular.element($window.document.body);
    var isNative = /(ip(a|o)d|iphone|android)/gi.test($window.navigator.userAgent);
    var isTouch = 'createTouch' in $window.document && isNative;
    function SelectFactory(element, controller, config) {
      var $select = {};
      var options = angular.extend({}, defaults, config);
      $select = $tooltip(element, options);
      var scope = $select.$scope;
      scope.$matches = [];
      if (options.multiple) {
        scope.$activeIndex = [];
      } else {
        scope.$activeIndex = -1;
      }
      scope.$isMultiple = options.multiple;
      scope.$showAllNoneButtons = options.allNoneButtons && options.multiple;
      scope.$iconCheckmark = options.iconCheckmark;
      scope.$allText = options.allText;
      scope.$noneText = options.noneText;
      scope.$activate = function(index) {
        scope.$$postDigest(function() {
          $select.activate(index);
        });
      };
      scope.$select = function(index, evt) {
        scope.$$postDigest(function() {
          $select.select(index);
        });
      };
      scope.$isVisible = function() {
        return $select.$isVisible();
      };
      scope.$isActive = function(index) {
        return $select.$isActive(index);
      };
      scope.$selectAll = function() {
        for (var i = 0; i < scope.$matches.length; i++) {
          if (!scope.$isActive(i)) {
            scope.$select(i);
          }
        }
      };
      scope.$selectNone = function() {
        for (var i = 0; i < scope.$matches.length; i++) {
          if (scope.$isActive(i)) {
            scope.$select(i);
          }
        }
      };
      $select.update = function(matches) {
        scope.$matches = matches;
        $select.$updateActiveIndex();
      };
      $select.activate = function(index) {
        if (options.multiple) {
          $select.$isActive(index) ? scope.$activeIndex.splice(scope.$activeIndex.indexOf(index), 1) : scope.$activeIndex.push(index);
          if (options.sort) scope.$activeIndex.sort(function(a, b) {
            return a - b;
          });
        } else {
          scope.$activeIndex = index;
        }
        return scope.$activeIndex;
      };
      $select.select = function(index) {
        var value = scope.$matches[index].value;
        scope.$apply(function() {
          $select.activate(index);
          if (options.multiple) {
            controller.$setViewValue(scope.$activeIndex.map(function(index) {
              if (angular.isUndefined(scope.$matches[index])) {
                return null;
              }
              return scope.$matches[index].value;
            }));
          } else {
            controller.$setViewValue(value);
            $select.hide();
          }
        });
        scope.$emit(options.prefixEvent + '.select', value, index, $select);
      };
      $select.$updateActiveIndex = function() {
        if (options.multiple) {
          if (angular.isArray(controller.$modelValue)) {
            scope.$activeIndex = controller.$modelValue.map(function(value) {
              return $select.$getIndex(value);
            });
          } else {
            scope.$activeIndex = [];
          }
        } else {
          if (angular.isDefined(controller.$modelValue) && scope.$matches.length) {
            scope.$activeIndex = $select.$getIndex(controller.$modelValue);
          } else {
            scope.$activeIndex = -1;
          }
        }
      };
      $select.$isVisible = function() {
        if (!options.minLength || !controller) {
          return scope.$matches.length;
        }
        return scope.$matches.length && controller.$viewValue.length >= options.minLength;
      };
      $select.$isActive = function(index) {
        if (options.multiple) {
          return scope.$activeIndex.indexOf(index) !== -1;
        } else {
          return scope.$activeIndex === index;
        }
      };
      $select.$getIndex = function(value) {
        var l = scope.$matches.length, i = l;
        if (!l) return;
        for (i = l; i--; ) {
          if (scope.$matches[i].value === value) break;
        }
        if (i < 0) return;
        return i;
      };
      $select.$onMouseDown = function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (isTouch) {
          var targetEl = angular.element(evt.target);
          targetEl.triggerHandler('click');
        }
      };
      $select.$onKeyDown = function(evt) {
        if (!/(9|13|38|40)/.test(evt.keyCode)) return;
        if (evt.keyCode !== 9) {
          evt.preventDefault();
          evt.stopPropagation();
        }
        if (options.multiple && evt.keyCode === 9) {
          return $select.hide();
        }
        if (!options.multiple && (evt.keyCode === 13 || evt.keyCode === 9)) {
          return $select.select(scope.$activeIndex);
        }
        if (!options.multiple) {
          if (evt.keyCode === 38 && scope.$activeIndex > 0) scope.$activeIndex--; else if (evt.keyCode === 38 && scope.$activeIndex < 0) scope.$activeIndex = scope.$matches.length - 1; else if (evt.keyCode === 40 && scope.$activeIndex < scope.$matches.length - 1) scope.$activeIndex++; else if (angular.isUndefined(scope.$activeIndex)) scope.$activeIndex = 0;
          scope.$digest();
        }
      };
      $select.$isIE = function() {
        var ua = $window.navigator.userAgent;
        return ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0;
      };
      $select.$selectScrollFix = function(e) {
        if ($document[0].activeElement.tagName === 'UL') {
          e.preventDefault();
          e.stopImmediatePropagation();
          e.target.focus();
        }
      };
      var _show = $select.show;
      $select.show = function() {
        _show();
        if (options.multiple) {
          $select.$element.addClass('select-multiple');
        }
        $timeout(function() {
          $select.$element.on(isTouch ? 'touchstart' : 'mousedown', $select.$onMouseDown);
          if (options.keyboard) {
            element.on('keydown', $select.$onKeyDown);
          }
        }, 0, false);
      };
      var _hide = $select.hide;
      $select.hide = function() {
        if (!options.multiple && angular.isUndefined(controller.$modelValue)) {
          scope.$activeIndex = -1;
        }
        $select.$element.off(isTouch ? 'touchstart' : 'mousedown', $select.$onMouseDown);
        if (options.keyboard) {
          element.off('keydown', $select.$onKeyDown);
        }
        _hide(true);
      };
      return $select;
    }
    SelectFactory.defaults = defaults;
    return SelectFactory;
  } ];
}).directive('bsSelect', [ '$window', '$parse', '$q', '$select', '$parseOptions', function($window, $parse, $q, $select, $parseOptions) {
  var defaults = $select.defaults;
  return {
    restrict: 'EAC',
    require: 'ngModel',
    link: function postLink(scope, element, attr, controller) {
      var options = {
        scope: scope,
        placeholder: defaults.placeholder
      };
      angular.forEach([ 'template', 'templateUrl', 'controller', 'controllerAs', 'placement', 'container', 'delay', 'trigger', 'keyboard', 'html', 'animation', 'placeholder', 'allNoneButtons', 'maxLength', 'maxLengthHtml', 'allText', 'noneText', 'iconCheckmark', 'autoClose', 'id', 'sort', 'caretHtml', 'prefixClass', 'prefixEvent' ], function(key) {
        if (angular.isDefined(attr[key])) options[key] = attr[key];
      });
      var falseValueRegExp = /^(false|0|)$/i;
      angular.forEach([ 'html', 'container', 'allNoneButtons', 'sort' ], function(key) {
        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) options[key] = false;
      });
      var dataMultiple = element.attr('data-multiple');
      if (angular.isDefined(dataMultiple)) {
        if (falseValueRegExp.test(dataMultiple)) options.multiple = false; else options.multiple = dataMultiple;
      }
      if (element[0].nodeName.toLowerCase() === 'select') {
        var inputEl = element;
        inputEl.css('display', 'none');
        element = angular.element('<button type="button" class="btn btn-default"></button>');
        inputEl.after(element);
      }
      var parsedOptions = $parseOptions(attr.bsOptions);
      var select = $select(element, controller, options);
      if (select.$isIE()) {
        element[0].addEventListener('blur', select.$selectScrollFix);
      }
      var watchedOptions = parsedOptions.$match[7].replace(/\|.+/, '').trim();
      scope.$watch(watchedOptions, function(newValue, oldValue) {
        parsedOptions.valuesFn(scope, controller).then(function(values) {
          select.update(values);
          controller.$render();
        });
      }, true);
      scope.$watch(attr.ngModel, function(newValue, oldValue) {
        select.$updateActiveIndex();
        controller.$render();
      }, true);
      controller.$render = function() {
        var selected, index;
        if (options.multiple && angular.isArray(controller.$modelValue)) {
          selected = controller.$modelValue.map(function(value) {
            index = select.$getIndex(value);
            return angular.isDefined(index) ? select.$scope.$matches[index].label : false;
          }).filter(angular.isDefined);
          if (selected.length > (options.maxLength || defaults.maxLength)) {
            selected = selected.length + ' ' + (options.maxLengthHtml || defaults.maxLengthHtml);
          } else {
            selected = selected.join(', ');
          }
        } else {
          index = select.$getIndex(controller.$modelValue);
          selected = angular.isDefined(index) ? select.$scope.$matches[index].label : false;
        }
        element.html((selected ? selected : options.placeholder) + (options.caretHtml ? options.caretHtml : defaults.caretHtml));
      };
      if (options.multiple) {
        controller.$isEmpty = function(value) {
          return !value || value.length === 0;
        };
      }
      scope.$on('$destroy', function() {
        if (select) select.destroy();
        options = null;
        select = null;
      });
    }
  };
} ]);