/**
 * @file jQuery UI Datepicker plugin wrapper
 * @param [ui-date] {object} Options to pass to $.fn.datepicker() merged onto uiDateConfig
 */

/*global angular, jQuery, module, exports*/

// commonjs package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'ui.date';
}

(function(angular) {
  'use strict';
  angular
    .module('ui.date', [])
    .constant('uiDateConfig', {})
    .constant('uiDateFormatConfig', '')

    .factory('uiDateConverter', ['uiDateFormatConfig', function(uiDateFormatConfig) {
      return {
        stringToDate: stringToDate,
        dateToString: dateToString
      };

      function dateToString(dateFormat, value) {
        dateFormat = dateFormat || uiDateFormatConfig;
        if (value) {
          if (dateFormat) {
            try {
              return jQuery.datepicker.formatDate(dateFormat, value);
            } catch (formatException) {
              return undefined;
            }
          }

          if (value.toISOString) {
            return value.toISOString();
          }
        }
        return null;
      }

      function stringToDate(dateFormat, valueToParse) {
        dateFormat = dateFormat || uiDateFormatConfig;

        if (angular.isDate(valueToParse) && !isNaN(valueToParse)) {
          return valueToParse;
        }

        if (angular.isString(valueToParse)) {
          if (dateFormat) {
            return jQuery.datepicker.parseDate(dateFormat, valueToParse);
          }

          var isoDate = new Date(valueToParse);
          return isNaN(isoDate.getTime()) ? null : isoDate;
        }

        if (angular.isNumber(valueToParse)) {
          // presumably timestamp to date object
          return new Date(valueToParse);
        }

        return null;
      }
    }])

    .directive('uiDate', ['uiDateConfig', 'uiDateConverter', function(uiDateConfig, uiDateConverter) {

      return {
        require: '?ngModel',
        link: function(scope, element, attrs, controller) {
          var getOptions = function() {
            return angular.extend({}, uiDateConfig, scope.$eval(attrs.uiDate));
          };
          var initDateWidget = function() {
            var showing = false;
            var opts = getOptions();

            function setVal() {
              var keys = ['Hours', 'Minutes', 'Seconds', 'Milliseconds'];
              var isDate = angular.isDate(controller.$modelValue);
              var preserve = {};

              if (isDate && controller.$modelValue.toDateString() === element.datepicker('getDate').toDateString()) {
                return;
              }

              if (isDate) {
                angular.forEach(keys, function(key) {
                  preserve[key] = controller.$modelValue['get' + key]();
                });
              }
              controller.$setViewValue(element.datepicker('getDate'));

              if (isDate) {
                angular.forEach(keys, function(key) {
                  controller.$viewValue['set' + key](preserve[key]);
                });
              }
            }

            // If we have a controller (i.e. ngModelController) then wire it up
            if (controller) {

              // Set the view value in a $apply block when users selects
              // (calling directive user's function too if provided)
              var _onSelect = opts.onSelect || angular.noop;
              opts.onSelect = function(value, picker) {
                scope.$apply(function() {
                  showing = true;
                  setVal();
                  _onSelect(value, picker);
                  element.blur();
                });
              };

              var _beforeShow = opts.beforeShow || angular.noop;
              opts.beforeShow = function(input, picker) {
                showing = true;
                _beforeShow(input, picker);
              };

              var _onClose = opts.onClose || angular.noop;
              opts.onClose = function(value, picker) {
                showing = false;
                _onClose(value, picker);
              };

              element.off('blur.datepicker').on('blur.datepicker', function() {
                if (!showing) {
                  scope.$apply(function() {
                    element.datepicker('setDate', element.datepicker('getDate'));
                    setVal();
                  });
                }
              });

              controller.$validators.uiDateValidator = function uiDateValidator(modelValue, viewValue) {
                return angular.isDate(uiDateConverter.stringToDate(attrs.uiDateFormat, viewValue));
              };

              controller.$parsers.push(function uiDateParser(valueToParse) {
                return uiDateConverter.stringToDate(attrs.uiDateFormat, valueToParse);
              });

              // Update the date picker when the model changes
              controller.$render = function() {
                element.datepicker('setDate', controller.$modelValue);
              };
            }
            // Check if the element already has a datepicker.
            if (element.data('datepicker')) {
              // Updates the datepicker options
              element.datepicker('option', opts);
              element.datepicker('refresh');
            } else {
              // Creates the new datepicker widget
              element.datepicker(opts);

              //Cleanup on destroy, prevent memory leaking
              element.on('$destroy', function() {
                element.datepicker('hide');
                element.datepicker('destroy');
              });
            }

            if (controller) {
              // Force a render to override whatever is in the input text box
              controller.$render();
            }
          };

          // Watch for changes to the directives options
          scope.$watch(getOptions, initDateWidget, true);
        }
      };
    }])

    .directive('uiDateFormat', ['uiDateConverter', function(uiDateConverter) {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
          var dateFormat = attrs.uiDateFormat;

          // Use the datepicker with the attribute value as the dateFormat string to convert to and from a string
          modelCtrl.$formatters.unshift(function(value) {
            return uiDateConverter.stringToDate(dateFormat, value);
          });

          modelCtrl.$parsers.push(function(value) {
            return uiDateConverter.dateToString(dateFormat, value);
          });
        }
      };
    }]);

})(angular);
