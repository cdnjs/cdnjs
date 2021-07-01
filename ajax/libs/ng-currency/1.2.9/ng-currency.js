/**
 * ng-currency JavaScript Library v1.2.9
 *
 * @license MIT (https://github.com/salte-io/ng-currency/blob/master/LICENSE)
 *
 * Made with ♥ by Cecilia Woodward <ceci@salte.io>, Luis Aguirre <luis@alaguirre.com>
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define("ng-currency", ["angular"], factory);
	else if(typeof exports === 'object')
		exports["ng-currency"] = factory(require("angular"));
	else
		root["ng-currency"] = factory(root["angular"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_angular__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ng-currency-settings.provider.js":
/*!******************************************!*\
  !*** ./ng-currency-settings.provider.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ngCurrencySettings; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ngCurrencySettings = /*#__PURE__*/function () {
  function ngCurrencySettings() {
    _classCallCheck(this, ngCurrencySettings);

    this._defaults = {
      fraction: 2,
      hardCap: false,
      min: undefined,
      max: undefined,
      currencySymbol: undefined
    };
  }
  /**
   * The default property values for 'ng-currency'
   */


  _createClass(ngCurrencySettings, [{
    key: "defaults",
    get: function get() {
      return this._defaults;
    },
    set: function set(defaults) {
      this._defaults = defaults;
    }
  }, {
    key: "$get",
    value: function $get() {
      var provider = this;
      return {
        /**
         * The default property values for 'ng-currency'
         */
        get defaults() {
          return provider.defaults;
        }

      };
    }
  }]);

  return ngCurrencySettings;
}();



/***/ }),

/***/ "./ng-currency.directive.js":
/*!**********************************!*\
  !*** ./ng-currency.directive.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ngCurrency; }
/* harmony export */ });
function ngCurrency($filter, $locale, $timeout, ngCurrencySettings) {
  return {
    require: 'ngModel',
    link: function link(scope, element, attrs, controller) {
      var _ngCurrencySettings$d = ngCurrencySettings.defaults,
          hardCap = _ngCurrencySettings$d.hardCap,
          min = _ngCurrencySettings$d.min,
          max = _ngCurrencySettings$d.max,
          currencySymbol = _ngCurrencySettings$d.currencySymbol,
          fraction = _ngCurrencySettings$d.fraction;
      var ngRequired = attrs.required;
      var active = true;
      attrs.$observe('ngCurrency', function (value) {
        active = value !== 'false';

        if (active) {
          reformat();
        } else {
          controller.$viewValue = controller.$$rawModelValue;
          controller.$render();
        }
      });
      attrs.$observe('hardCap', function (value) {
        hardCap = value === 'true';
        revalidate();
      });
      attrs.$observe('min', function (value) {
        min = value ? Number(value) : undefined;
        revalidate();
      });
      attrs.$observe('max', function (value) {
        max = value ? Number(value) : undefined;
        revalidate();
      });
      attrs.$observe('currencySymbol', function (value) {
        currencySymbol = value;
        reformat();
      });
      attrs.$observe('required', function (value) {
        ngRequired = value;
        revalidate();
      });
      attrs.$observe('fraction', function (value) {
        fraction = value || 2;
        reformat();
        revalidate();
      }); // HACK(nick-woodward): Seriously angular?

      $timeout(function () {
        scope.$emit('currencyRedraw');
      });
      controller.$parsers.push(function (value) {
        if (active && [undefined, null, ''].indexOf(value) === -1) {
          value = clearValue(value);
          value = keepInRange(Number(value));
          return value;
        }

        return value;
      });
      controller.$formatters.push(function (value) {
        if (active && [undefined, null, ''].indexOf(value) === -1) {
          return $filter('currency')(value, getCurrencySymbol(), fraction);
        }

        return value;
      });

      controller.$validators.min = function (value) {
        if (!ngRequired && ([undefined, null, ''].indexOf(value) !== -1 || isNaN(value))) {
          return true;
        }

        return !active || [undefined, null].indexOf(min) !== -1 || isNaN(min) || value >= min;
      };

      controller.$validators.max = function (value) {
        if (!ngRequired && ([undefined, null, ''].indexOf(value) !== -1 || isNaN(value))) {
          return true;
        }

        return !active || [undefined, null].indexOf(max) !== -1 || isNaN(max) || value <= max;
      };

      controller.$validators.fraction = function (value) {
        return !active || !value || !isNaN(value);
      };

      function reformat() {
        if (active) {
          var value;
          var updateOn, debounce;

          if (controller.$options) {
            // HACK(nick-woodward): this is to maintain backwards compatability with Angular 1.5.9 and lower.
            // TODO(nick-woodward): This should be removed when ngCurrency does a 2.0.0 release
            // Reference: https://github.com/angular/angular.js/commit/296cfce40c25e9438bfa46a0eb27240707a10ffa
            if (controller.$options.getOption) {
              updateOn = controller.$options.getOption('updateOn');
              debounce = controller.$options.getOption('debounce');
            } else {
              updateOn = controller.$options.updateOn;
              debounce = controller.$options.debounce;
            }
          }

          if (updateOn === 'blur' || debounce) {
            value = controller.$viewValue;

            for (var i = controller.$parsers.length - 1; i >= 0; i--) {
              value = controller.$parsers[i](value);
            }
          } else {
            value = controller.$$rawModelValue;
          }

          for (var _i = controller.$formatters.length - 1; _i >= 0; _i--) {
            value = controller.$formatters[_i](value);
          }

          controller.$viewValue = value;
          controller.$render();
        }
      }

      function revalidate() {
        controller.$validate();

        if (active) {
          var value = keepInRange(controller.$$rawModelValue);

          if (value !== controller.$$rawModelValue) {
            controller.$setViewValue(value.toFixed(fraction));
            controller.$commitViewValue();
            reformat();
          }
        }
      }

      function keepInRange(value) {
        if (hardCap) {
          if (max !== undefined && value > max) {
            value = max;
          } else if (min !== undefined && value < min) {
            value = min;
          }
        }

        return value;
      }

      scope.$on('currencyRedraw', function () {
        revalidate();
        reformat();
      });
      element.bind('focus', function () {
        if (active) {
          var value = clearValue(controller.$viewValue, false);

          if (controller.$viewValue !== value) {
            controller.$viewValue = value;
            controller.$render();
            element.triggerHandler('focus');
          }
        }
      });
      element.bind('blur', reformat); // TODO: Rewrite this parsing logic to more readable.

      function decimalRex(dChar) {
        return RegExp('\\d|\\-|\\' + dChar, 'g');
      }

      function clearRex(dChar) {
        return RegExp('\\-{0,1}((\\' + dChar + ')|([0-9]{1,}\\' + dChar + '?))&?[0-9]{0,' + fraction + '}', 'g');
      }

      function clearValue(value) {
        var replaceSeparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        value = String(value);
        var decimalSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
        var cleared = null; // Replace negative pattern to minus sign (-)

        var neg_dummy = $filter('currency')('-1', getCurrencySymbol(), fraction);
        var neg_regexp = RegExp('[0-9.' + decimalSeparator + $locale.NUMBER_FORMATS.GROUP_SEP + ']+');
        var neg_dummy_txt = neg_dummy.replace(neg_regexp.exec(neg_dummy), '');
        var value_dummy_txt = value.replace(neg_regexp.exec(value), ''); // If is negative

        if (neg_dummy_txt === value_dummy_txt) {
          value = '-' + neg_regexp.exec(value);
        }

        if (RegExp('^-[\\s]*$', 'g').test(value)) {
          value = '-0';
        }

        if (decimalRex(decimalSeparator).test(value)) {
          cleared = value.match(decimalRex(decimalSeparator)).join('').match(clearRex(decimalSeparator)) || [''];
          cleared = cleared[0];
          cleared = replaceSeparator ? cleared.replace(decimalSeparator, '.') : cleared;
        }

        return cleared || null;
      }

      function getCurrencySymbol() {
        return currencySymbol === undefined ? $locale.NUMBER_FORMATS.CURRENCY_SYM : currencySymbol;
      }
    }
  };
}
ngCurrency.$inject = ['$filter', '$locale', '$timeout', 'ngCurrencySettings'];

/***/ }),

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE_angular__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*******************************!*\
  !*** ./ng-currency.module.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ng_currency_settings_provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ng-currency-settings.provider.js */ "./ng-currency-settings.provider.js");
/* harmony import */ var _ng_currency_directive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ng-currency.directive.js */ "./ng-currency.directive.js");



var module = angular__WEBPACK_IMPORTED_MODULE_0___default().module('ng-currency', []);
module.provider('ngCurrencySettings', _ng_currency_settings_provider_js__WEBPACK_IMPORTED_MODULE_1__.default);
module.directive('ngCurrency', _ng_currency_directive_js__WEBPACK_IMPORTED_MODULE_2__.default);
/* harmony default export */ __webpack_exports__["default"] = (module.name);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=ng-currency.js.map