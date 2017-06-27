/**
 * angular-strap
 * @version v2.3.10 - 2016-10-17
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.typeahead', [ 'mgcrea.ngStrap.tooltip', 'mgcrea.ngStrap.helpers.parseOptions' ]).provider('$typeahead', function() {
  var defaults = this.defaults = {
    animation: 'am-fade',
    prefixClass: 'typeahead',
    prefixEvent: '$typeahead',
    placement: 'bottom-left',
    templateUrl: 'typeahead/typeahead.tpl.html',
    trigger: 'focus',
    container: false,
    keyboard: true,
    html: false,
    delay: 0,
    minLength: 1,
    filter: 'bsAsyncFilter',
    limit: 6,
    autoSelect: false,
    comparator: '',
    trimValue: true
  };
  this.$get = [ '$window', '$rootScope', '$tooltip', '$$rAF', '$timeout', function($window, $rootScope, $tooltip, $$rAF, $timeout) {
    function TypeaheadFactory(element, controller, config) {
      var $typeahead = {};
      var options = angular.extend({}, defaults, config);
      $typeahead = $tooltip(element, options);
      var parentScope = config.scope;
      var scope = $typeahead.$scope;
      scope.$resetMatches = function() {
        scope.$matches = [];
        scope.$activeIndex = options.autoSelect ? 0 : -1;
      };
      scope.$resetMatches();
      scope.$activate = function(index) {
        scope.$$postDigest(function() {
          $typeahead.activate(index);
        });
      };
      scope.$select = function(index, evt) {
        scope.$$postDigest(function() {
          $typeahead.select(index);
        });
      };
      scope.$isVisible = function() {
        return $typeahead.$isVisible();
      };
      $typeahead.update = function(matches) {
        scope.$matches = matches;
        if (scope.$activeIndex >= matches.length) {
          scope.$activeIndex = options.autoSelect ? 0 : -1;
        }
        safeDigest(scope);
        $$rAF($typeahead.$applyPlacement);
      };
      $typeahead.activate = function(index) {
        scope.$activeIndex = index;
      };
      $typeahead.select = function(index) {
        if (index === -1) return;
        var value = scope.$matches[index].value;
        controller.$setViewValue(value);
        controller.$render();
        scope.$resetMatches();
        if (parentScope) parentScope.$digest();
        scope.$emit(options.prefixEvent + '.select', value, index, $typeahead);
        if (angular.isDefined(options.onSelect) && angular.isFunction(options.onSelect)) {
          options.onSelect(value, index, $typeahead);
        }
      };
      $typeahead.$isVisible = function() {
        if (!options.minLength || !controller) {
          return !!scope.$matches.length;
        }
        return scope.$matches.length && angular.isString(controller.$viewValue) && controller.$viewValue.length >= options.minLength;
      };
      $typeahead.$getIndex = function(value) {
        var index;
        for (index = scope.$matches.length; index--; ) {
          if (angular.equals(scope.$matches[index].value, value)) break;
        }
        return index;
      };
      $typeahead.$onMouseDown = function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
      };
      $typeahead.$onKeyDown = function(evt) {
        if (!/(38|40|13)/.test(evt.keyCode)) return;
        if ($typeahead.$isVisible() && !(evt.keyCode === 13 && scope.$activeIndex === -1)) {
          evt.preventDefault();
          evt.stopPropagation();
        }
        if (evt.keyCode === 13 && scope.$matches.length) {
          $typeahead.select(scope.$activeIndex);
        } else if (evt.keyCode === 38 && scope.$activeIndex > 0) {
          scope.$activeIndex--;
        } else if (evt.keyCode === 40 && scope.$activeIndex < scope.$matches.length - 1) {
          scope.$activeIndex++;
        } else if (angular.isUndefined(scope.$activeIndex)) {
          scope.$activeIndex = 0;
        }
        scope.$digest();
      };
      var show = $typeahead.show;
      $typeahead.show = function() {
        show();
        $timeout(function() {
          if ($typeahead.$element) {
            $typeahead.$element.on('mousedown', $typeahead.$onMouseDown);
            if (options.keyboard) {
              if (element) element.on('keydown', $typeahead.$onKeyDown);
            }
          }
        }, 0, false);
      };
      var hide = $typeahead.hide;
      $typeahead.hide = function() {
        if ($typeahead.$element) $typeahead.$element.off('mousedown', $typeahead.$onMouseDown);
        if (options.keyboard) {
          if (element) element.off('keydown', $typeahead.$onKeyDown);
        }
        if (!options.autoSelect) {
          $typeahead.activate(-1);
        }
        hide();
      };
      return $typeahead;
    }
    function safeDigest(scope) {
      scope.$$phase || scope.$root && scope.$root.$$phase || scope.$digest();
    }
    TypeaheadFactory.defaults = defaults;
    return TypeaheadFactory;
  } ];
}).filter('bsAsyncFilter', [ '$filter', function($filter) {
  return function(array, expression, comparator) {
    if (array && angular.isFunction(array.then)) {
      return array.then(function(results) {
        return $filter('filter')(results, expression, comparator);
      });
    }
    return $filter('filter')(array, expression, comparator);
  };
} ]).directive('bsTypeahead', [ '$window', '$parse', '$q', '$typeahead', '$parseOptions', function($window, $parse, $q, $typeahead, $parseOptions) {
  var defaults = $typeahead.defaults;
  return {
    restrict: 'EAC',
    require: 'ngModel',
    link: function postLink(scope, element, attr, controller) {
      element.off('change');
      var options = {
        scope: scope
      };
      angular.forEach([ 'template', 'templateUrl', 'controller', 'controllerAs', 'placement', 'container', 'delay', 'trigger', 'keyboard', 'html', 'animation', 'filter', 'limit', 'minLength', 'watchOptions', 'selectMode', 'autoSelect', 'comparator', 'id', 'prefixEvent', 'prefixClass' ], function(key) {
        if (angular.isDefined(attr[key])) options[key] = attr[key];
      });
      var falseValueRegExp = /^(false|0|)$/i;
      angular.forEach([ 'html', 'container', 'trimValue', 'filter' ], function(key) {
        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) options[key] = false;
      });
      angular.forEach([ 'onBeforeShow', 'onShow', 'onBeforeHide', 'onHide', 'onSelect' ], function(key) {
        var bsKey = 'bs' + key.charAt(0).toUpperCase() + key.slice(1);
        if (angular.isDefined(attr[bsKey])) {
          options[key] = scope.$eval(attr[bsKey]);
        }
      });
      if (!element.attr('autocomplete')) element.attr('autocomplete', 'off');
      var filter = angular.isDefined(options.filter) ? options.filter : defaults.filter;
      var limit = options.limit || defaults.limit;
      var comparator = options.comparator || defaults.comparator;
      var bsOptions = attr.bsOptions;
      if (filter) {
        bsOptions += ' | ' + filter + ':$viewValue';
        if (comparator) bsOptions += ':' + comparator;
      }
      if (limit) bsOptions += ' | limitTo:' + limit;
      var parsedOptions = $parseOptions(bsOptions);
      var typeahead = $typeahead(element, controller, options);
      if (options.watchOptions) {
        var watchedOptions = parsedOptions.$match[7].replace(/\|.+/, '').replace(/\(.*\)/g, '').trim();
        scope.$watchCollection(watchedOptions, function(newValue, oldValue) {
          parsedOptions.valuesFn(scope, controller).then(function(values) {
            typeahead.update(values);
            controller.$render();
          });
        });
      }
      scope.$watch(attr.ngModel, function(newValue, oldValue) {
        scope.$modelValue = newValue;
        parsedOptions.valuesFn(scope, controller).then(function(values) {
          if (options.selectMode && !values.length && newValue.length > 0) {
            controller.$setViewValue(controller.$viewValue.substring(0, controller.$viewValue.length - 1));
            return;
          }
          if (values.length > limit) values = values.slice(0, limit);
          typeahead.update(values);
          controller.$render();
        });
      });
      controller.$formatters.push(function(modelValue) {
        var displayValue = parsedOptions.displayValue(modelValue);
        if (displayValue) {
          return displayValue;
        }
        if (angular.isDefined(modelValue) && typeof modelValue !== 'object') {
          return modelValue;
        }
        return '';
      });
      controller.$render = function() {
        if (controller.$isEmpty(controller.$viewValue)) {
          return element.val('');
        }
        var index = typeahead.$getIndex(controller.$modelValue);
        var selected = index !== -1 ? typeahead.$scope.$matches[index].label : controller.$viewValue;
        selected = angular.isObject(selected) ? parsedOptions.displayValue(selected) : selected;
        var value = selected ? selected.toString().replace(/<(?:.|\n)*?>/gm, '') : '';
        var ss = element[0].selectionStart;
        var sd = element[0].selectionEnd;
        element.val(options.trimValue === false ? value : value.trim());
        element[0].setSelectionRange(ss, sd);
      };
      scope.$on('$destroy', function() {
        if (typeahead) typeahead.destroy();
        options = null;
        typeahead = null;
      });
    }
  };
} ]);