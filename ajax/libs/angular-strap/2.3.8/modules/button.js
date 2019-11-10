/**
 * angular-strap
 * @version v2.3.8 - 2016-03-31
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.button', []).provider('$button', function() {
  var defaults = this.defaults = {
    activeClass: 'active',
    toggleEvent: 'click'
  };
  this.$get = function() {
    return {
      defaults: defaults
    };
  };
}).directive('bsCheckboxGroup', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    compile: function postLink(element, attr) {
      element.attr('data-toggle', 'buttons');
      element.removeAttr('ng-model');
      var children = element[0].querySelectorAll('input[type="checkbox"]');
      angular.forEach(children, function(child) {
        var childEl = angular.element(child);
        childEl.attr('bs-checkbox', '');
        childEl.attr('ng-model', attr.ngModel + '.' + childEl.attr('value'));
      });
    }
  };
}).directive('bsCheckbox', [ '$button', '$$rAF', function($button, $$rAF) {
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
        controller.$parsers.push(function(viewValue) {
          return viewValue ? trueValue : falseValue;
        });
        controller.$formatters.push(function(modelValue) {
          return angular.equals(modelValue, trueValue);
        });
        scope.$watch(attr.ngModel, function(newValue, oldValue) {
          controller.$render();
        });
      }
      controller.$render = function() {
        var isActive = angular.equals(controller.$modelValue, trueValue);
        $$rAF(function() {
          if (isInput) element[0].checked = isActive;
          activeElement.toggleClass(options.activeClass, isActive);
        });
      };
      element.bind(options.toggleEvent, function() {
        scope.$apply(function() {
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
} ]).directive('bsRadioGroup', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    compile: function postLink(element, attr) {
      element.attr('data-toggle', 'buttons');
      element.removeAttr('ng-model');
      var children = element[0].querySelectorAll('input[type="radio"]');
      angular.forEach(children, function(child) {
        angular.element(child).attr('bs-radio', '');
        angular.element(child).attr('ng-model', attr.ngModel);
      });
    }
  };
}).directive('bsRadio', [ '$button', '$$rAF', function($button, $$rAF) {
  var defaults = $button.defaults;
  var constantValueRegExp = /^(true|false|\d+)$/;
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function postLink(scope, element, attr, controller) {
      var options = defaults;
      var isInput = element[0].nodeName === 'INPUT';
      var activeElement = isInput ? element.parent() : element;
      var value;
      attr.$observe('value', function(v) {
        if (typeof v !== 'boolean' && constantValueRegExp.test(v)) {
          value = scope.$eval(v);
        } else {
          value = v;
        }
        controller.$render();
      });
      controller.$render = function() {
        var isActive = angular.equals(controller.$modelValue, value);
        $$rAF(function() {
          if (isInput) element[0].checked = isActive;
          activeElement.toggleClass(options.activeClass, isActive);
        });
      };
      element.bind(options.toggleEvent, function() {
        scope.$apply(function() {
          controller.$setViewValue(value);
          controller.$render();
        });
      });
    }
  };
} ]);