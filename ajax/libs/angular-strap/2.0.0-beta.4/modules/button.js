/**
 * angular-strap
 * @version v2.0.0-beta.4 - 2014-01-20
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
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