(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("angular"), require("jquery-ui/datepicker"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "angular", "jquery-ui/datepicker"], factory);
	else if(typeof exports === 'object')
		exports["angularUiDate"] = factory(require("jquery"), require("angular"), require("jquery-ui/datepicker"));
	else
		root["angularUiDate"] = factory(root["jQuery"], root["angular"], root["jquery-ui/datepicker"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _angular = __webpack_require__(2);

	var _angular2 = _interopRequireDefault(_angular);

	var _datepicker = __webpack_require__(3);

	var _datepicker2 = _interopRequireDefault(_datepicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// sets up jQuery with the datepicker plugin

	exports.default = _angular2.default.module('ui.date', []).constant('uiDateConfig', {}).constant('uiDateFormatConfig', '').factory('uiDateConverter', ['uiDateFormatConfig', function (uiDateFormatConfig) {
	  return {
	    stringToDate: stringToDate,
	    dateToString: dateToString
	  };

	  function dateToString(uiDateFormat, value) {
	    var dateFormat = uiDateFormat || uiDateFormatConfig;
	    if (value) {
	      if (dateFormat) {
	        try {
	          return _jquery2.default.datepicker.formatDate(dateFormat, value);
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

	    if (_angular2.default.isDate(valueToParse) && !isNaN(valueToParse)) {
	      return valueToParse;
	    }

	    if (_angular2.default.isString(valueToParse)) {
	      if (dateFormat) {
	        return _jquery2.default.datepicker.parseDate(dateFormat, valueToParse);
	      }

	      var isoDate = new Date(valueToParse);
	      return isNaN(isoDate.getTime()) ? null : isoDate;
	    }

	    if (_angular2.default.isNumber(valueToParse)) {
	      // presumably timestamp to date object
	      return new Date(valueToParse);
	    }

	    return null;
	  }
	}]).directive('uiDate', ['uiDateConfig', 'uiDateConverter', function uiDateDirective(uiDateConfig, uiDateConverter) {

	  return {
	    require: '?ngModel',
	    link: function link(scope, element, attrs, controller) {

	      var $element = (0, _jquery2.default)(element);

	      var getOptions = function getOptions() {
	        return _angular2.default.extend({}, uiDateConfig, scope.$eval(attrs.uiDate));
	      };
	      var initDateWidget = function initDateWidget() {
	        var showing = false;
	        var opts = getOptions();

	        function setVal(forcedUpdate) {
	          var keys = ['Hours', 'Minutes', 'Seconds', 'Milliseconds'];
	          var isDate = _angular2.default.isDate(controller.$modelValue);
	          var preserve = {};

	          if (!forcedUpdate && isDate && controller.$modelValue.toDateString() === $element.datepicker('getDate').toDateString()) {
	            return;
	          }

	          if (isDate) {
	            _angular2.default.forEach(keys, function (key) {
	              preserve[key] = controller.$modelValue['get' + key]();
	            });
	          }

	          var newViewValue = $element.datepicker('getDate');

	          if (isDate) {
	            _angular2.default.forEach(keys, function (key) {
	              newViewValue['set' + key](preserve[key]);
	            });
	          }

	          controller.$setViewValue(newViewValue);
	        }

	        // If we have a controller (i.e. ngModelController) then wire it up
	        if (controller) {
	          // Set the view value in a $apply block when users selects
	          // (calling directive user's function too if provided)
	          var _onSelect = opts.onSelect || _angular2.default.noop;
	          opts.onSelect = function (value, picker) {
	            scope.$apply(function () {
	              showing = true;
	              setVal();
	              $element.blur();
	              _onSelect(value, picker, $element);
	            });
	          };

	          var _beforeShow = opts.beforeShow || _angular2.default.noop;
	          opts.beforeShow = function (input, picker) {
	            showing = true;
	            _beforeShow(input, picker, $element);
	          };

	          var _onClose = opts.onClose || _angular2.default.noop;
	          opts.onClose = function (value, picker) {
	            showing = false;
	            $element.focus();
	            _onClose(value, picker, $element);
	          };

	          element.on('focus', function (focusEvent) {
	            if (attrs.readonly) {
	              focusEvent.stopImmediatePropagation();
	            }
	          });

	          $element.off('blur.datepicker').on('blur.datepicker', function () {
	            if (!showing) {
	              scope.$apply(function () {
	                $element.datepicker('setDate', $element.datepicker('getDate'));
	                setVal();
	              });
	            }
	          });

	          controller.$validators.uiDateValidator = function uiDateValidator(modelValue, viewValue) {
	            return viewValue === null || viewValue === '' || _angular2.default.isDate(uiDateConverter.stringToDate(attrs.uiDateFormat, viewValue));
	          };

	          controller.$parsers.push(function uiDateParser(valueToParse) {
	            return uiDateConverter.stringToDate(attrs.uiDateFormat, valueToParse);
	          });

	          // Update the date picker when the model changes
	          controller.$render = function () {
	            // Force a render to override whatever is in the input text box
	            if (_angular2.default.isDate(controller.$modelValue) === false && _angular2.default.isString(controller.$modelValue)) {
	              controller.$modelValue = uiDateConverter.stringToDate(attrs.uiDateFormat, controller.$modelValue);
	            }
	            $element.datepicker('setDate', controller.$modelValue);
	          };
	        }
	        // Check if the $element already has a datepicker.
	        //

	        if ($element.data('datepicker')) {
	          // Updates the datepicker options
	          $element.datepicker('option', opts);
	          $element.datepicker('refresh');
	        } else {
	          // Creates the new datepicker widget
	          $element.datepicker(opts);

	          // Cleanup on destroy, prevent memory leaking
	          $element.on('$destroy', function () {
	            $element.datepicker('hide');
	            $element.datepicker('destroy');
	          });
	        }

	        if (controller) {
	          controller.$render();
	          // Update the model with the value from the datepicker after parsed
	          setVal(true);
	        }
	      };

	      // Watch for changes to the directives options
	      scope.$watch(getOptions, initDateWidget, true);
	    }
	  };
	}]).directive('uiDateFormat', ['uiDateConverter', function (uiDateConverter) {
	  return {
	    require: 'ngModel',
	    link: function link(scope, element, attrs, modelCtrl) {
	      var dateFormat = attrs.uiDateFormat;

	      // Use the datepicker with the attribute value as the dateFormat string to convert to and from a string
	      modelCtrl.$formatters.unshift(function (value) {
	        return uiDateConverter.stringToDate(dateFormat, value);
	      });

	      modelCtrl.$parsers.push(function (value) {
	        return uiDateConverter.dateToString(dateFormat, value);
	      });
	    }
	  };
	}]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=date.js.map