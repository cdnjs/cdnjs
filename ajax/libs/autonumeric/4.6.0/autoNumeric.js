(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AutoNumeric"] = factory();
	else
		root["AutoNumeric"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AutoNumeric.js":
/*!****************************!*\
  !*** ./src/AutoNumeric.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutoNumeric; });
/* harmony import */ var _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoNumericHelper */ "./src/AutoNumericHelper.js");
/* harmony import */ var _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoNumericEnum */ "./src/AutoNumericEnum.js");
/* harmony import */ var _maths_Evaluator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./maths/Evaluator */ "./src/maths/Evaluator.js");
/* harmony import */ var _maths_Parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maths/Parser */ "./src/maths/Parser.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *               AutoNumeric.js
 *
 * @version      4.6.0
 * @date         2020-04-26 UTC 10:45
 *
 * @authors      Bob Knothe, Alexandre Bonneau
 * @contributors Sokolov Yura and others, cf. AUTHORS
 * @copyright    2009 Robert J. Knothe
 * @since        2009-08-09
 *
 * @summary      autoNumeric is a standalone Javascript library
 *               that provides live *as-you-type* formatting for
 *               international numbers and currencies.
 *
 * @link         http://autonumeric.org
 *
 *               Note : Some functions are borrowed from big.js
 * @see          https://github.com/MikeMcl/big.js/
 *
 * Please report any bugs to https://github.com/autoNumeric/autoNumeric
 *
 * @license      Released under the MIT License
 * @link         http://www.opensource.org/licenses/mit-license.php
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
//TODO Prevent having to enter relative path in the js files (ie. using `./AutoNumericHelper` instead of just `AutoNumericHelper`) (cf. http://moduscreate.com/es6-es2015-import-no-relative-path-webpack/)




/**
 * Class declaration for the AutoNumeric object.
 *
 * An AutoNumeric element is an object wrapper that keeps a reference to the DOM element it manages (usually an <input> one), and provides autoNumeric-specific variables and functions.
 */

var AutoNumeric = /*#__PURE__*/function () {
  /**
   * Initialize the AutoNumeric object onto the given DOM element, and attach the settings and related event listeners to it.
   * The options passed as a parameter is an object that contains the settings (ie. {digitGroupSeparator: ".", decimalCharacter: ",", currencySymbol: '€ '})
   *
   * @example
   * anElement = new AutoNumeric(domElement); // With the default options
   * anElement = new AutoNumeric(domElement, { options }); // With one option object
   * anElement = new AutoNumeric(domElement, 'euroPos'); // With a named pre-defined string
   * anElement = new AutoNumeric(domElement, [{ options1 }, 'euroPos', { options2 }]); // With multiple option objects (the latest option overwriting the previous ones)
   * anElement = new AutoNumeric(domElement, null, { options }); // With one option object, and a failed initial value
   * anElement = new AutoNumeric(domElement).french(); // With one pre-defined language object
   * anElement = new AutoNumeric(domElement).french({ options });// With one pre-defined language object and additional options that will override the defaults
   *
   * // ...or init and set the value in one call :
   * anElement = new AutoNumeric(domElement, 12345.789); // With the default options, and an initial value
   * anElement = new AutoNumeric(domElement, 12345.789, { options });
   * anElement = new AutoNumeric(domElement, '12345.789', { options });
   * anElement = new AutoNumeric(domElement, 12345.789, 'euroPos');
   * anElement = new AutoNumeric(domElement, 12345.789, [{ options1 }, 'euroPos', { options2 }]);
   * anElement = new AutoNumeric(domElement, 12345.789).french({ options });
   * anElement = new AutoNumeric(domElement, 12345.789, { options }).french({ options }); // Not really helpful, but possible
   *
   * // The AutoNumeric constructor class can also accept a string as a css selector. Under the hood this use `QuerySelector` and limit itself to only the first element it finds.
   * anElement = new AutoNumeric('.myCssClass > input');
   * anElement = new AutoNumeric('.myCssClass > input', { options });
   * anElement = new AutoNumeric('.myCssClass > input', 'euroPos');
   * anElement = new AutoNumeric('.myCssClass > input', [{ options1 }, 'euroPos', { options2 }]);
   * anElement = new AutoNumeric('.myCssClass > input', 12345.789);
   * anElement = new AutoNumeric('.myCssClass > input', 12345.789, { options });
   * anElement = new AutoNumeric('.myCssClass > input', 12345.789, 'euroPos');
   * anElement = new AutoNumeric('.myCssClass > input', 12345.789, [{ options1 }, 'euroPos', { options2 }]);
   * anElement = new AutoNumeric('.myCssClass > input', null, { options }); // With a failed initial value
   * anElement = new AutoNumeric('.myCssClass > input', 12345.789).french({ options });
   *
   * @param {object|Array|number|string} arg1
   * @param {object|Array|number|string|null} arg2
   * @param {object|Array|number|string|null} arg3
   * @throws
   */
  function AutoNumeric() {
    var _this = this;

    var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var arg2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var arg3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, AutoNumeric);

    // --------------------------------------------------------
    // -------------- Initialization
    // Initialize the arguments
    var _AutoNumeric$_setArgu = AutoNumeric._setArgumentsValues(arg1, arg2, arg3),
        domElement = _AutoNumeric$_setArgu.domElement,
        initialValue = _AutoNumeric$_setArgu.initialValue,
        userOptions = _AutoNumeric$_setArgu.userOptions; // Initialize the element


    this.domElement = domElement; // Generate the settings

    this.defaultRawValue = ''; // The default raw value to set when initializing an AutoNumeric object

    this._setSettings(userOptions, false); //TODO If `styleRules` is not null, add by default a class 'autoNumeric' that adds transition to color, background-color, border-color properties
    // Check if the DOM element is supported


    this._checkElement(); // Store the additional attributes inside the AutoNumeric object
    // Note: This variable is needed and not a duplicate of `initialValueOnFirstKeydown` nor `valueOnFocus` since it serves a different purpose and has a different lifecycle


    this.savedCancellableValue = null; // Initialize the undo/redo variables

    this.historyTable = []; // Keep track of *all* valid states of the element value

    this.historyTableIndex = -1; // Pointer to the current undo/redo state. This will be set to '0' during initialization since it first adds itself.

    this.onGoingRedo = false; // Variable that keeps track if a 'redo' is ongoing (in order to prevent an 'undo' to be launch when releasing the shift key before the ctrl key after a 'redo' shortcut)
    // Initialize the parent form element, if any

    this.parentForm = this._getParentForm(); // Set the initial value if it exists and if the `formatOnPageLoad` option will allow it

    if (!this.runOnce && this.settings.formatOnPageLoad) {
      // Format the element value if needed
      this._formatDefaultValueOnPageLoad(initialValue);
    } else {
      // Otherwise set the `rawValue` and the element value, but do not format the latter yet
      var valueToSet;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(initialValue)) {
        switch (this.settings.emptyInputBehavior) {
          case AutoNumeric.options.emptyInputBehavior.min:
            valueToSet = this.settings.minimumValue;
            break;

          case AutoNumeric.options.emptyInputBehavior.max:
            valueToSet = this.settings.maximumValue;
            break;

          case AutoNumeric.options.emptyInputBehavior.zero:
            valueToSet = '0';
            break;
          // In order to stay consistent when `formatOnPageLoad` is set to `true`, it's still impossible to set the `null` value as the initial value

          case AutoNumeric.options.emptyInputBehavior.focus:
          case AutoNumeric.options.emptyInputBehavior.press:
          case AutoNumeric.options.emptyInputBehavior.always:
          case AutoNumeric.options.emptyInputBehavior["null"]:
            valueToSet = '';
            break;
          // When `emptyInputBehavior` is a number or a string representing a number

          default:
            valueToSet = this.settings.emptyInputBehavior;
        }
      } else {
        valueToSet = initialValue;
      }

      this._setElementAndRawValue(valueToSet);
    }

    this.runOnce = true; // Add the events listeners only on input or editable elements

    this.hasEventListeners = false;

    if (this.isInputElement || this.isContentEditable) {
      if (!this.settings.noEventListeners) {
        //XXX Here we make sure the global list is created after creating the event listeners, to only create the event listeners on `document` once
        this._createEventListeners();
      }

      this._setWritePermissions(true);
    } // Save the initial values (html attribute + element.value) for the pristine test


    this._saveInitialValues(initialValue); // Setup the data for the persistent storage solution (ie. sessionStorage or cookies)


    this.sessionStorageAvailable = this.constructor._storageTest();
    this.storageNamePrefix = 'AUTO_'; // The prefix for the raw value storage name variable can be modified here

    this._setPersistentStorageName(); // --------------------------------------------------------
    // -------------- Tracking


    this.validState = true; // Keep track if the element is in the valid state

    this.isFocused = false; // Keep track if the element is currently focused

    this.isWheelEvent = false; // Keep track if a mouse wheel event is currently ongoing

    this.isDropEvent = false; // Keep track if a drop event is currently ongoing

    this.isEditing = false; // Keep track if the user is currently editing the element

    this.rawValueOnFocus = void 0; // Keep track of the rawValue (needed to define if a change event must be sent on blur or enter key)
    // Watch any external changes to the element value/textContent/nodeValue and `set()` the new value so that it gets formatted/saved in the history

    this.internalModification = false; // This is temporarily set to `true` only when the AutoNumeric object does update the element value

    this.attributeToWatch = this._getAttributeToWatch();
    this.getterSetter = Object.getOwnPropertyDescriptor(this.domElement.__proto__, this.attributeToWatch);

    this._addWatcher();

    if (this.settings.createLocalList) {
      // Keep track of every AutoNumeric elements that this object initialized
      this._createLocalList();
    } // Keep track of all AutoNumeric elements in the current web page


    this.constructor._addToGlobalList(this); // --------------------------------------------------------
    // -------------- Methods
    // Create the global functions


    this.global = {
      /**
       * Set the same given element value for each elements in the local AutoNumeric element list, and format those elements immediately
       *
       * @param {number|string} newValue The value must be a number or a numeric string
       * @param {object} options A settings object that will override the current settings. Note: the update is done only if the `newValue` is defined.
       */
      set: function set(newValue) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _this.autoNumericLocalList.forEach(function (aNObject) {
          aNObject.set(newValue, options);
        });
      },

      /**
       * Set the value given value directly as the DOM element value, without formatting it beforehand.
       * This sets the same unformatted value for each elements in the local AutoNumeric element list.
       *
       * @param {number|string} value
       * @param {object} options
       */
      setUnformatted: function setUnformatted(value) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _this.autoNumericLocalList.forEach(function (aNObject) {
          aNObject.setUnformatted(value, options);
        });
      },

      /**
       * This is an alias of the `getNumericString()` function, and should not be used anymore.
       *
       * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
       * @returns {Array<string>}
       * @deprecated
       */
      get: function get() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var result = [];

        _this.autoNumericLocalList.forEach(function (aNObject) {
          result.push(aNObject.get());
        });

        _this._executeCallback(result, callback);

        return result;
      },

      /**
       * Return an array of the unformatted values (as a string) of each AutoNumeric element of the local AutoNumeric element list
       *
       * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
       * @returns {Array<string>}
       */
      getNumericString: function getNumericString() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var result = [];

        _this.autoNumericLocalList.forEach(function (aNObject) {
          result.push(aNObject.getNumericString());
        });

        _this._executeCallback(result, callback);

        return result;
      },

      /**
       * Return an array of the current formatted values (as a string) of each AutoNumeric element of the local AutoNumeric element list
       *
       * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
       * @returns {Array<string>}
       */
      getFormatted: function getFormatted() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var result = [];

        _this.autoNumericLocalList.forEach(function (aNObject) {
          result.push(aNObject.getFormatted());
        });

        _this._executeCallback(result, callback);

        return result;
      },

      /**
       * Return an array of the element unformatted values (as a real Javascript number), for each element of the local AutoNumeric element list
       *
       * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
       * @returns {Array<number>}
       */
      getNumber: function getNumber() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var result = [];

        _this.autoNumericLocalList.forEach(function (aNObject) {
          result.push(aNObject.getNumber());
        });

        _this._executeCallback(result, callback);

        return result;
      },

      /**
       * Returns the unformatted values (following the `outputFormat` setting) of each element of the local AutoNumeric element list into an array
       *
       * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
       * @returns {Array<string>}
       */
      getLocalized: function getLocalized() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var result = [];

        _this.autoNumericLocalList.forEach(function (aNObject) {
          result.push(aNObject.getLocalized());
        });

        _this._executeCallback(result, callback);

        return result;
      },

      /**
       * Force each element of the local AutoNumeric element list to reformat its value
       */
      reformat: function reformat() {
        _this.autoNumericLocalList.forEach(function (aNObject) {
          aNObject.reformat();
        });
      },

      /**
       * Remove the formatting and keep only the raw unformatted value (as a numericString) in each elements of the local AutoNumeric element list
       */
      unformat: function unformat() {
        _this.autoNumericLocalList.forEach(function (aNObject) {
          aNObject.unformat();
        });
      },

      /**
       * Remove the formatting and keep only the localized unformatted value in the element, with the option to override the default outputFormat if needed
       *
       * @param {null|string} forcedOutputFormat If set to something different than `null`, then this is used as an overriding outputFormat option
       */
      unformatLocalized: function unformatLocalized() {
        var forcedOutputFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _this.autoNumericLocalList.forEach(function (aNObject) {
          aNObject.unformatLocalized(forcedOutputFormat);
        });
      },

      /**
       * Updates the AutoNumeric settings, and immediately format the elements accordingly, for each elements of the local AutoNumeric element list
       *
       * @param {object} newOptions This can be either one or more option objects
       */
      update: function update() {
        for (var _len = arguments.length, newOptions = new Array(_len), _key = 0; _key < _len; _key++) {
          newOptions[_key] = arguments[_key];
        }

        _this.autoNumericLocalList.forEach(function (aNObject) {
          aNObject.update.apply(aNObject, newOptions);
        });
      },

      /**
       * Return `true` if *all* the autoNumeric-managed elements are pristine, if their raw value hasn't changed.
       * By default, this returns `true` if the raw unformatted value is still the same even if the formatted one has changed (due to a configuration update for instance).
       *
       * @param {boolean} checkOnlyRawValue If set to `true`, the pristine value is done on the raw unformatted value, not the formatted one. If set to `false`, this also checks that the formatted value hasn't changed.
       * @returns {boolean}
       */
      isPristine: function isPristine() {
        var checkOnlyRawValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var isPristine = true;

        _this.autoNumericLocalList.forEach(function (aNObject) {
          if (isPristine && !aNObject.isPristine(checkOnlyRawValue)) {
            isPristine = false;
          }
        });

        return isPristine;
      },

      /**
       * Execute the `clear()` method on each AutoNumeric object in the local AutoNumeric element list
       *
       * @param {boolean} forceClearAll
       */
      clear: function clear() {
        var forceClearAll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _this.autoNumericLocalList.forEach(function (aNObject) {
          aNObject.clear(forceClearAll);
        });
      },

      /**
       * Execute the `remove()` method on each AutoNumeric object in the local AutoNumeric element list
       */
      remove: function remove() {
        _this.autoNumericLocalList.forEach(function (aNObject) {
          aNObject.remove();
        });
      },

      /**
       * Execute the `wipe()` method on each AutoNumeric object in the local AutoNumeric element list
       */
      wipe: function wipe() {
        _this.autoNumericLocalList.forEach(function (aNObject) {
          aNObject.wipe();
        });
      },

      /**
       * Execute the `nuke()` method on each AutoNumeric object in the local AutoNumeric element list
       */
      nuke: function nuke() {
        _this.autoNumericLocalList.forEach(function (aNObject) {
          aNObject.nuke();
        });
      },

      /**
       * Return `true` if the given AutoNumeric object (or DOM element) is in the local AutoNumeric element list
       *
       * @param {HTMLElement|HTMLInputElement|AutoNumeric} domElementOrAutoNumericObject
       * @returns {*}
       */
      has: function has(domElementOrAutoNumericObject) {
        var result;

        if (domElementOrAutoNumericObject instanceof AutoNumeric) {
          result = _this.autoNumericLocalList.has(domElementOrAutoNumericObject.node());
        } else {
          result = _this.autoNumericLocalList.has(domElementOrAutoNumericObject);
        }

        return result;
      },

      /**
       * Add an existing AutoNumeric object (or DOM element) to the local AutoNumeric element list, using the DOM element as the key.
       * This manages the case where `addObject` is used on an AutoNumeric object that already has multiple elements in its local list.
       *
       * @param {HTMLElement|HTMLInputElement|AutoNumeric} domElementOrAutoNumericObject
       */
      addObject: function addObject(domElementOrAutoNumericObject) {
        // Start with the same data, whatever the user passed as arguments
        var domElement;
        var otherAutoNumericObject;

        if (domElementOrAutoNumericObject instanceof AutoNumeric) {
          domElement = domElementOrAutoNumericObject.node();
          otherAutoNumericObject = domElementOrAutoNumericObject;
        } else {
          domElement = domElementOrAutoNumericObject;
          otherAutoNumericObject = AutoNumeric.getAutoNumericElement(domElement);
        } // Check if the current autoNumeric object has a local list


        if (!_this._hasLocalList()) {
          _this._createLocalList();
        } // Check if the other autoNumeric object has a local list...


        var otherANLocalList = otherAutoNumericObject._getLocalList();

        if (otherANLocalList.size === 0) {
          // Special case if the other AutoNumeric object has an empty local list, then populate itself to it
          otherAutoNumericObject._createLocalList();

          otherANLocalList = otherAutoNumericObject._getLocalList(); // Update the other local list
        }

        var mergedLocalLists;

        if (otherANLocalList instanceof Map) {
          // ...If it does, merge the local lists together
          mergedLocalLists = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].mergeMaps(_this._getLocalList(), otherANLocalList);
        } else {
          // ...If not, just set the current local list onto the other AutoNumeric object
          // We need to specify the AutoNumeric object, otherwise the `_addToLocalList` function would not correctly add the AutoNumeric object since we would not have a reference to it, but a reference to the current AutoNumeric object on which is called this method.
          _this._addToLocalList(domElement, otherAutoNumericObject);

          mergedLocalLists = _this._getLocalList();
        } // Update the resulting list, on all the objects of that local list (so that we can indifferently use `init()` on any object belonging to that list)


        mergedLocalLists.forEach(function (aNObject) {
          aNObject._setLocalList(mergedLocalLists);
        });
      },

      /**
       * Remove the given AutoNumeric object (or DOM element) from the local AutoNumeric element list, using the DOM element as the key.
       * If this function attempts to remove the current AutoNumeric object from the local list, a warning is shown, but the deletion is still done.
       *
       * Special cases :
       * - If the current object removes itself, then it's removed from the shared local list, then a new empty local list is used/created
       * - If another object remove this object, then a local list with only this object is used/created
       *
       * @param {HTMLElement|HTMLInputElement|AutoNumeric} domElementOrAutoNumericObject
       * @param {boolean} keepCurrentANObject If set to `false`, then the function will also remove the current AutoNumeric object if asked, otherwise it will ignore it and print a warning message
       */
      removeObject: function removeObject(domElementOrAutoNumericObject) {
        var keepCurrentANObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        // Start with the same data, whatever the user passed as arguments
        var domElement;
        var otherAutoNumericObject;

        if (domElementOrAutoNumericObject instanceof AutoNumeric) {
          domElement = domElementOrAutoNumericObject.node();
          otherAutoNumericObject = domElementOrAutoNumericObject;
        } else {
          domElement = domElementOrAutoNumericObject;
          otherAutoNumericObject = AutoNumeric.getAutoNumericElement(domElement);
        } // Remove the other object from the local list


        var initialCompleteLocalList = _this.autoNumericLocalList;

        _this.autoNumericLocalList["delete"](domElement); // Update the local list for all objects in it


        initialCompleteLocalList.forEach(function (aNObject) {
          aNObject._setLocalList(_this.autoNumericLocalList);
        });

        if (!keepCurrentANObject && domElement === _this.node()) {
          // This object is removed by itself
          // Empty the object local list
          otherAutoNumericObject._setLocalList(new Map());
        } else {
          // This object is removed by another object
          // Set the local list for the removed object, with only this object in it
          otherAutoNumericObject._createLocalList();
        }
      },

      /**
       * Remove all elements from the shared list, effectively emptying it.
       * This is the equivalent of calling `detach()` on each of its elements.
       *
       * @param {boolean} keepEachANObjectInItsOwnList If set to `true`, then instead of completely emptying the local list of each AutoNumeric objects, each one of those keeps itself in its own local list
       */
      empty: function empty() {
        var keepEachANObjectInItsOwnList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var initialCompleteLocalList = _this.autoNumericLocalList; // Update the local list for all objects in it

        initialCompleteLocalList.forEach(function (aNObject) {
          if (keepEachANObjectInItsOwnList) {
            aNObject._createLocalList();
          } else {
            aNObject._setLocalList(new Map());
          }
        });
      },

      /**
       * Return an array containing all the AutoNumeric DOM elements that have been initialized by each other
       *
       * @returns {Array<HTMLElement>}
       */
      elements: function elements() {
        var result = [];

        _this.autoNumericLocalList.forEach(function (aNObject) {
          result.push(aNObject.node());
        });

        return result;
      },

      /**
       * Return the `Map` object directly
       * @returns {Map}
       */
      getList: function getList() {
        return _this.autoNumericLocalList;
      },

      /**
       * Return the number of element in the local AutoNumeric element list
       * @returns {number}
       */
      size: function size() {
        return _this.autoNumericLocalList.size;
      }
    }; // Create the functions that will allow to change each setting one by one

    /**
     * For each options, we define if we need to reformat the element content (does changing the options should change the way its value is displayed?).
     * If yes, then we use the `update()` for force a reformat, otherwise, we just update the `settings` object.
     */

    this.options = {
      /**
       * Reset any options set previously, by overwriting them with the default settings
       *
       * @returns {AutoNumeric}
       */
      reset: function reset() {
        //TODO Add a `settings` parameter so that the user can reset to a specific set of settings. This is different than update since it drops any non-default settings before using those new settings.
        _this.settings = {
          rawValue: _this.defaultRawValue
        }; // Here we pass the default rawValue in order to prevent showing a warning that we try to set an `undefined` value

        _this.update(AutoNumeric.defaultSettings);

        return _this;
      },
      allowDecimalPadding: function allowDecimalPadding(_allowDecimalPadding) {
        _this.update({
          allowDecimalPadding: _allowDecimalPadding
        });

        return _this;
      },
      alwaysAllowDecimalCharacter: function alwaysAllowDecimalCharacter(_alwaysAllowDecimalCharacter) {
        //FIXME Test this
        _this.update({
          alwaysAllowDecimalCharacter: _alwaysAllowDecimalCharacter
        });

        return _this;
      },
      caretPositionOnFocus: function caretPositionOnFocus(_caretPositionOnFocus) {
        //FIXME test this
        _this.settings.caretPositionOnFocus = _caretPositionOnFocus;
        return _this;
      },
      createLocalList: function createLocalList(_createLocalList2) {
        _this.settings.createLocalList = _createLocalList2; // Delete the local list when this is set to `false`, create it if this is set to `true` and there is not pre-existing list

        if (_this.settings.createLocalList) {
          if (!_this._hasLocalList()) {
            _this._createLocalList();
          }
        } else {
          _this._deleteLocalList();
        }

        return _this;
      },
      currencySymbol: function currencySymbol(_currencySymbol) {
        _this.update({
          currencySymbol: _currencySymbol
        });

        return _this;
      },
      currencySymbolPlacement: function currencySymbolPlacement(_currencySymbolPlacement) {
        _this.update({
          currencySymbolPlacement: _currencySymbolPlacement
        });

        return _this;
      },
      decimalCharacter: function decimalCharacter(_decimalCharacter) {
        _this.update({
          decimalCharacter: _decimalCharacter
        });

        return _this;
      },
      decimalCharacterAlternative: function decimalCharacterAlternative(_decimalCharacterAlternative) {
        _this.settings.decimalCharacterAlternative = _decimalCharacterAlternative;
        return _this;
      },

      /**
       * Update the decimal places globally, which means this override any previously set number of decimal shown on focus, on blur, or in the raw value.
       *
       * @param {int} decimalPlaces
       * @returns {AutoNumeric}
       */
      decimalPlaces: function decimalPlaces(_decimalPlaces) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning('Using `options.decimalPlaces()` instead of calling the specific `options.decimalPlacesRawValue()`, `options.decimalPlacesShownOnFocus()` and `options.decimalPlacesShownOnBlur()` methods will reset those options.\nPlease call the specific methods if you do not want to reset those.', _this.settings.showWarnings);

        _this.update({
          decimalPlaces: _decimalPlaces
        });

        return _this;
      },
      decimalPlacesRawValue: function decimalPlacesRawValue(_decimalPlacesRawValue) {
        //FIXME test this
        _this.update({
          decimalPlacesRawValue: _decimalPlacesRawValue
        });

        return _this;
      },
      decimalPlacesShownOnBlur: function decimalPlacesShownOnBlur(_decimalPlacesShownOnBlur) {
        _this.update({
          decimalPlacesShownOnBlur: _decimalPlacesShownOnBlur
        });

        return _this;
      },
      decimalPlacesShownOnFocus: function decimalPlacesShownOnFocus(_decimalPlacesShownOnFocus) {
        _this.update({
          decimalPlacesShownOnFocus: _decimalPlacesShownOnFocus
        });

        return _this;
      },
      defaultValueOverride: function defaultValueOverride(_defaultValueOverride) {
        _this.update({
          defaultValueOverride: _defaultValueOverride
        });

        return _this;
      },
      digitalGroupSpacing: function digitalGroupSpacing(_digitalGroupSpacing) {
        _this.update({
          digitalGroupSpacing: _digitalGroupSpacing
        });

        return _this;
      },
      digitGroupSeparator: function digitGroupSeparator(_digitGroupSeparator) {
        _this.update({
          digitGroupSeparator: _digitGroupSeparator
        });

        return _this;
      },
      divisorWhenUnfocused: function divisorWhenUnfocused(_divisorWhenUnfocused) {
        _this.update({
          divisorWhenUnfocused: _divisorWhenUnfocused
        });

        return _this;
      },
      emptyInputBehavior: function emptyInputBehavior(_emptyInputBehavior) {
        if (_this.rawValue === null && _emptyInputBehavior !== AutoNumeric.options.emptyInputBehavior["null"]) {
          // Special case : if the current `rawValue` is `null` and the `emptyInputBehavior` is changed to something else than `'null'`, then it makes that `rawValue` invalid.
          // Here we can either prevent the option update and throw an error, or still accept the option update and update the value from `null` to `''`.
          // We cannot keep `rawValue` to `null` since if `emptyInputBehavior` is not set to `null`, lots of function assume `rawValue` is a string.
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("You are trying to modify the `emptyInputBehavior` option to something different than `'null'` (".concat(_emptyInputBehavior, "), but the element raw value is currently set to `null`. This would result in an invalid `rawValue`. In order to fix that, the element value has been changed to the empty string `''`."), _this.settings.showWarnings);
          _this.rawValue = '';
        }

        _this.update({
          emptyInputBehavior: _emptyInputBehavior
        });

        return _this;
      },
      eventBubbles: function eventBubbles(_eventBubbles) {
        _this.settings.eventBubbles = _eventBubbles;
        return _this;
      },
      eventIsCancelable: function eventIsCancelable(_eventIsCancelable) {
        _this.settings.eventIsCancelable = _eventIsCancelable;
        return _this;
      },
      failOnUnknownOption: function failOnUnknownOption(_failOnUnknownOption) {
        _this.settings.failOnUnknownOption = _failOnUnknownOption; //TODO test this with unit tests

        return _this;
      },
      formatOnPageLoad: function formatOnPageLoad(_formatOnPageLoad) {
        _this.settings.formatOnPageLoad = _formatOnPageLoad; //TODO test this with unit tests

        return _this;
      },
      formulaMode: function formulaMode(_formulaMode) {
        _this.settings.formulaMode = _formulaMode; //TODO test this with unit tests

        return _this;
      },
      historySize: function historySize(_historySize) {
        _this.settings.historySize = _historySize;
        return _this;
      },
      invalidClass: function invalidClass(_invalidClass) {
        _this.settings.invalidClass = _invalidClass; //TODO test this with unit tests

        return _this;
      },
      isCancellable: function isCancellable(_isCancellable) {
        _this.settings.isCancellable = _isCancellable; //TODO test this with unit tests

        return _this;
      },
      leadingZero: function leadingZero(_leadingZero) {
        _this.update({
          leadingZero: _leadingZero
        });

        return _this;
      },
      maximumValue: function maximumValue(_maximumValue) {
        _this.update({
          maximumValue: _maximumValue
        });

        return _this;
      },
      minimumValue: function minimumValue(_minimumValue) {
        _this.update({
          minimumValue: _minimumValue
        });

        return _this;
      },
      modifyValueOnWheel: function modifyValueOnWheel(_modifyValueOnWheel) {
        _this.settings.modifyValueOnWheel = _modifyValueOnWheel; //TODO test this with unit tests

        return _this;
      },
      negativeBracketsTypeOnBlur: function negativeBracketsTypeOnBlur(_negativeBracketsTypeOnBlur) {
        _this.update({
          negativeBracketsTypeOnBlur: _negativeBracketsTypeOnBlur
        });

        return _this;
      },
      negativePositiveSignPlacement: function negativePositiveSignPlacement(_negativePositiveSignPlacement) {
        _this.update({
          negativePositiveSignPlacement: _negativePositiveSignPlacement
        });

        return _this;
      },
      negativeSignCharacter: function negativeSignCharacter(_negativeSignCharacter) {
        _this.update({
          negativeSignCharacter: _negativeSignCharacter
        });

        return _this;
      },
      noEventListeners: function noEventListeners(_noEventListeners) {
        //TODO test this with unit tests
        if (_noEventListeners === AutoNumeric.options.noEventListeners.noEvents && _this.settings.noEventListeners === AutoNumeric.options.noEventListeners.addEvents) {
          // Remove the events once
          _this._removeEventListeners();
        }

        _this.update({
          noEventListeners: _noEventListeners
        });

        return _this;
      },
      onInvalidPaste: function onInvalidPaste(_onInvalidPaste) {
        _this.settings.onInvalidPaste = _onInvalidPaste; //TODO test this with unit tests

        return _this;
      },
      outputFormat: function outputFormat(_outputFormat) {
        _this.settings.outputFormat = _outputFormat;
        return _this;
      },
      overrideMinMaxLimits: function overrideMinMaxLimits(_overrideMinMaxLimits) {
        _this.update({
          overrideMinMaxLimits: _overrideMinMaxLimits
        });

        return _this;
      },
      positiveSignCharacter: function positiveSignCharacter(_positiveSignCharacter) {
        _this.update({
          positiveSignCharacter: _positiveSignCharacter
        });

        return _this;
      },
      rawValueDivisor: function rawValueDivisor(_rawValueDivisor) {
        _this.update({
          rawValueDivisor: _rawValueDivisor
        });

        return _this;
      },
      readOnly: function readOnly(_readOnly) {
        // When changing the readOnly attribute, the raw and formatted values do not change, so no need to call the costly 'update()` method
        _this.settings.readOnly = _readOnly;

        _this._setWritePermissions();

        return _this;
      },
      roundingMethod: function roundingMethod(_roundingMethod) {
        _this.update({
          roundingMethod: _roundingMethod
        });

        return _this;
      },
      saveValueToSessionStorage: function saveValueToSessionStorage(_saveValueToSessionStorage) {
        _this.update({
          saveValueToSessionStorage: _saveValueToSessionStorage
        });

        return _this;
      },
      symbolWhenUnfocused: function symbolWhenUnfocused(_symbolWhenUnfocused) {
        _this.update({
          symbolWhenUnfocused: _symbolWhenUnfocused
        });

        return _this;
      },
      selectNumberOnly: function selectNumberOnly(_selectNumberOnly) {
        _this.settings.selectNumberOnly = _selectNumberOnly; //TODO test this with unit tests

        return _this;
      },
      selectOnFocus: function selectOnFocus(_selectOnFocus) {
        _this.settings.selectOnFocus = _selectOnFocus; //TODO test this with unit tests

        return _this;
      },
      serializeSpaces: function serializeSpaces(_serializeSpaces) {
        _this.settings.serializeSpaces = _serializeSpaces; //TODO test this with unit tests

        return _this;
      },
      showOnlyNumbersOnFocus: function showOnlyNumbersOnFocus(_showOnlyNumbersOnFocus) {
        _this.update({
          showOnlyNumbersOnFocus: _showOnlyNumbersOnFocus
        });

        return _this;
      },
      showPositiveSign: function showPositiveSign(_showPositiveSign) {
        _this.update({
          showPositiveSign: _showPositiveSign
        });

        return _this;
      },
      showWarnings: function showWarnings(_showWarnings) {
        _this.settings.showWarnings = _showWarnings; //TODO test this with unit tests

        return _this;
      },
      styleRules: function styleRules(_styleRules) {
        _this.update({
          styleRules: _styleRules
        });

        return _this;
      },
      suffixText: function suffixText(_suffixText) {
        _this.update({
          suffixText: _suffixText
        });

        return _this;
      },
      unformatOnHover: function unformatOnHover(_unformatOnHover) {
        _this.settings.unformatOnHover = _unformatOnHover; //TODO test this with unit tests

        return _this;
      },
      unformatOnSubmit: function unformatOnSubmit(_unformatOnSubmit2) {
        _this.settings.unformatOnSubmit = _unformatOnSubmit2; //TODO test this with unit tests

        return _this;
      },
      valuesToStrings: function valuesToStrings(_valuesToStrings) {
        _this.update({
          valuesToStrings: _valuesToStrings
        });

        return _this;
      },
      watchExternalChanges: function watchExternalChanges(_watchExternalChanges) {
        //TODO test this with unit tests
        _this.update({
          watchExternalChanges: _watchExternalChanges
        });

        return _this;
      },
      wheelOn: function wheelOn(_wheelOn) {
        _this.settings.wheelOn = _wheelOn; //TODO test this with unit tests

        return _this;
      },
      wheelStep: function wheelStep(_wheelStep) {
        _this.settings.wheelStep = _wheelStep; //TODO test this with unit tests

        return _this;
      }
    }; // Once the autoNumeric element has been initialized, broadcast that message with additional info.
    // Note: When using `AutoNumeric.multiple()`, one event is sent *per* element initialized

    this._triggerEvent(AutoNumeric.events.initialized, this.domElement, {
      newValue: _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement),
      newRawValue: this.rawValue,
      error: null,
      aNElement: this
    });
  }
  /**
   * Return the autoNumeric version number (for debugging purpose)
   *
   * @returns {string}
   */


  _createClass(AutoNumeric, [{
    key: "_saveInitialValues",

    /**
     * Save the initial element values for later use in the pristine test.
     * Those values are :
     * - the html attribute (ie. <input value='42'>), and
     * - the script `value` (ie. `let domElement.value`)
     *
     * @param {null|number|string} initialValue
     * @private
     */
    value: function _saveInitialValues(initialValue) {
      // Keep the very first initial values (in the html attribute and set by the script). This is needed to check if the element is pristine.
      // Save the html attribute 'value'
      this.initialValueHtmlAttribute = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].scientificToDecimal(this.domElement.getAttribute('value'));

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(this.initialValueHtmlAttribute)) {
        // Set the default empty value attribute instead of `null`, since if the initial value is null, the empty string is used
        this.initialValueHtmlAttribute = '';
      } // Save the 'script' value


      this.initialValue = initialValue;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(this.initialValue)) {
        // Same as above
        this.initialValue = '';
      }
    }
    /**
     * Generate all the event listeners for the given DOM element
     * @private
     */

  }, {
    key: "_createEventListeners",
    value: function _createEventListeners() {
      var _this2 = this;

      this.formulaMode = false; // Create references to the event handler functions, so we can then cleanly removes those listeners if needed
      // That would not be possible if we used closures directly in the event handler declarations

      this._onFocusInFunc = function (e) {
        _this2._onFocusIn(e);
      };

      this._onFocusInAndMouseEnterFunc = function (e) {
        _this2._onFocusInAndMouseEnter(e);
      };

      this._onFocusFunc = function () {
        _this2._onFocus();
      };

      this._onKeydownFunc = function (e) {
        _this2._onKeydown(e);
      };

      this._onKeypressFunc = function (e) {
        _this2._onKeypress(e);
      };

      this._onKeyupFunc = function (e) {
        _this2._onKeyup(e);
      };

      this._onFocusOutAndMouseLeaveFunc = function (e) {
        _this2._onFocusOutAndMouseLeave(e);
      };

      this._onPasteFunc = function (e) {
        _this2._onPaste(e);
      };

      this._onWheelFunc = function (e) {
        _this2._onWheel(e);
      };

      this._onDropFunc = function (e) {
        _this2._onDrop(e);
      };

      this._onKeydownGlobalFunc = function (e) {
        _this2._onKeydownGlobal(e);
      };

      this._onKeyupGlobalFunc = function (e) {
        _this2._onKeyupGlobal(e);
      }; // Add the event listeners


      this.domElement.addEventListener('focusin', this._onFocusInFunc, false);
      this.domElement.addEventListener('focus', this._onFocusInAndMouseEnterFunc, false);
      this.domElement.addEventListener('focus', this._onFocusFunc, false);
      this.domElement.addEventListener('mouseenter', this._onFocusInAndMouseEnterFunc, false);
      this.domElement.addEventListener('keydown', this._onKeydownFunc, false);
      this.domElement.addEventListener('keypress', this._onKeypressFunc, false);
      this.domElement.addEventListener('keyup', this._onKeyupFunc, false);
      this.domElement.addEventListener('blur', this._onFocusOutAndMouseLeaveFunc, false);
      this.domElement.addEventListener('mouseleave', this._onFocusOutAndMouseLeaveFunc, false);
      this.domElement.addEventListener('paste', this._onPasteFunc, false);
      this.domElement.addEventListener('wheel', this._onWheelFunc, false);
      this.domElement.addEventListener('drop', this._onDropFunc, false);

      this._setupFormListener(); // Keep track if the event listeners have been initialized on this object


      this.hasEventListeners = true; // Create one global event listener for the keyup event on the document object, which will be shared by all the autoNumeric elements

      if (!AutoNumeric._doesGlobalListExists()) {
        document.addEventListener('keydown', this._onKeydownGlobalFunc, false);
        document.addEventListener('keyup', this._onKeyupGlobalFunc, false);
      }
    }
    /**
     * Remove all the autoNumeric-related event listeners for the given DOM element
     * @private
     */

  }, {
    key: "_removeEventListeners",
    value: function _removeEventListeners() {
      this.domElement.removeEventListener('focusin', this._onFocusInFunc, false);
      this.domElement.removeEventListener('focus', this._onFocusInAndMouseEnterFunc, false);
      this.domElement.removeEventListener('focus', this._onFocusFunc, false);
      this.domElement.removeEventListener('mouseenter', this._onFocusInAndMouseEnterFunc, false);
      this.domElement.removeEventListener('blur', this._onFocusOutAndMouseLeaveFunc, false);
      this.domElement.removeEventListener('mouseleave', this._onFocusOutAndMouseLeaveFunc, false);
      this.domElement.removeEventListener('keydown', this._onKeydownFunc, false);
      this.domElement.removeEventListener('keypress', this._onKeypressFunc, false);
      this.domElement.removeEventListener('keyup', this._onKeyupFunc, false);
      this.domElement.removeEventListener('paste', this._onPasteFunc, false);
      this.domElement.removeEventListener('wheel', this._onWheelFunc, false);
      this.domElement.removeEventListener('drop', this._onDropFunc, false);

      this._removeFormListener(); // Keep track if the event listeners have been initialized on this object


      this.hasEventListeners = false;
      document.removeEventListener('keydown', this._onKeydownGlobalFunc, false);
      document.removeEventListener('keyup', this._onKeyupGlobalFunc, false);
    }
    /**
     * Toggle the event listeners according to the `noEventListeners` option, if those were not activated/deactivated before
     * @private
     */

  }, {
    key: "_updateEventListeners",
    value: function _updateEventListeners() {
      if (!this.settings.noEventListeners && !this.hasEventListeners) {
        // Special case where an update is done on an element that did not activate its event listeners in the first place
        // ie. when an element is first created with `contenteditable="false"`, then an update is done with `anElement.french()`
        this._createEventListeners();
      }

      if (this.settings.noEventListeners && this.hasEventListeners) {
        this._removeEventListeners();
      }
    }
    /**
     * Mark the parent <form> so that other AutoNumeric object will not add more listeners.
     * Add a counter so that when removing the AutoNumeric object, we only remove the submit listener if that count is equal to 0.
     * Also keep a reference to the 'submit' event handler function to be able to remove that handler later if the `_removeFormListener()` function is called from another AutoNumeric object.
     *
     * @private
     */

  }, {
    key: "_setupFormListener",
    value: function _setupFormListener() {
      var _this3 = this;

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(this.parentForm)) {
        // Setup the handler function
        this._onFormSubmitFunc = function () {
          _this3._onFormSubmit();
        };

        this._onFormResetFunc = function () {
          _this3._onFormReset();
        }; // Check if the parent form already has the AutoNumeric mark


        if (this._hasParentFormCounter()) {
          this._incrementParentFormCounter();
        } else {
          // If not, add the counter
          this._initializeFormCounterToOne(); // And add the submit and reset event listeners


          this.parentForm.addEventListener('submit', this._onFormSubmitFunc, false);
          this.parentForm.addEventListener('reset', this._onFormResetFunc, false); // Also keep a reference to the handler function so that we can remove it later

          this._storeFormHandlerFunction();
        }
      }
    }
    /**
     * Remove the form 'submit' event listener, as well as the `dataset` info (`anCount` and `anFormHandler`) from the parent form, only when there are only one AutoNumeric child element left in that <form>.
     * Otherwise decrement the `anCount`.
     *
     * @private
     */

  }, {
    key: "_removeFormListener",
    value: function _removeFormListener() {
      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(this.parentForm)) {
        // Check the parent form counter value
        var anCount = this._getParentFormCounter();

        if (anCount === 1) {
          // If it's 1, remove the listeners
          this.parentForm.removeEventListener('submit', this._getFormHandlerFunction().submitFn, false);
          this.parentForm.removeEventListener('reset', this._getFormHandlerFunction().resetFn, false); // Also remove the dataset info

          this._removeFormDataSetInfo();
        } else if (anCount > 1) {
          // Otherwise if it's >1 decrement the counter
          this._decrementParentFormCounter();
        } else {
          // If it's <1, throw an error
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The AutoNumeric object count on the form is incoherent.");
        }
      }
    }
    /**
     * Return `true` if the parent form has the form counter attribute
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_hasParentFormCounter",
    value: function _hasParentFormCounter() {
      return 'anCount' in this.parentForm.dataset;
    }
    /**
     * Return the count of AutoNumeric form children
     *
     * @returns {number}
     * @private
     */

  }, {
    key: "_getParentFormCounter",
    value: function _getParentFormCounter() {
      return Number(this.parentForm.dataset.anCount);
    }
    /**
     * Set the count of AutoNumeric form children to 1 for the given form element, or if none are passed, the current `this.parentForm` one.
     *
     * @param {HTMLFormElement|null} formElement
     * @private
     */

  }, {
    key: "_initializeFormCounterToOne",
    value: function _initializeFormCounterToOne() {
      var formElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this._getFormElement(formElement).dataset.anCount = 1;
    }
    /**
     * Increment the AutoNumeric form children count for the given form element, or if none are passed, the current `this.parentForm` one.
     *
     * @param {HTMLFormElement|null} formElement
     * @private
     */

  }, {
    key: "_incrementParentFormCounter",
    value: function _incrementParentFormCounter() {
      var formElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this._getFormElement(formElement).dataset.anCount++;
    }
    /**
     * Decrement the AutoNumeric form children count for the current `this.parentForm` form element.
     *
     * @private
     */

  }, {
    key: "_decrementParentFormCounter",
    value: function _decrementParentFormCounter() {
      this.parentForm.dataset.anCount--;
    }
    /**
     * Return `true` if the global form handler list exists on the `window` object.
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_hasFormHandlerFunction",

    /**
     * Return `true` if the given form element, or if none are passed, the current `this.parentForm` one has a form handler name.
     *
     * @param {HTMLFormElement|null} formElement
     * @returns {boolean}
     * @private
     */
    value: function _hasFormHandlerFunction() {
      var formElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return 'anFormHandler' in this._getFormElement(formElement).dataset;
    }
    /**
     * Return the given form element, or defaults to `this.parentForm` if no argument is passed.
     *
     * @param {HTMLFormElement|null} formElement
     * @returns {*}
     * @private
     */

  }, {
    key: "_getFormElement",
    value: function _getFormElement() {
      var formElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var formElementToUse;

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(formElement)) {
        formElementToUse = formElement;
      } else {
        formElementToUse = this.parentForm;
      }

      return formElementToUse;
    }
    /**
     * Generate a form handler unique name and store it in the global form handler list.
     * This also save that name in the dataset of the given form element.
     *
     * @param {HTMLFormElement|null} formElement
     * @private
     */

  }, {
    key: "_storeFormHandlerFunction",
    value: function _storeFormHandlerFunction() {
      var formElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      // Create the weakMap if it does not exist
      if (!this.constructor._doesFormHandlerListExists()) {
        this.constructor._createFormHandlerList();
      } // Generate a unique name and save it in the form dataset


      var formHandlerName = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].randomString();
      this._getFormElement(formElement).dataset.anFormHandler = formHandlerName; // Add the form handler name and handle function reference to the WeakMap

      window.aNFormHandlerMap.set(formHandlerName, {
        submitFn: this._onFormSubmitFunc,
        resetFn: this._onFormResetFunc
      });
    }
    /**
     * Return the form handler key name from the parent form element, for the global form handler list.
     *
     * @returns {string|*}
     * @private
     */

  }, {
    key: "_getFormHandlerKey",
    value: function _getFormHandlerKey() {
      if (!this._hasFormHandlerFunction()) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("Unable to retrieve the form handler name");
      }

      var formHandlerName = this.parentForm.dataset.anFormHandler;

      if (formHandlerName === '') {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The form handler name is invalid");
      }

      return formHandlerName;
    }
    /**
     * Return the 'submit' event handler function used for the parent form.
     *
     * @returns {function}
     * @private
     */

  }, {
    key: "_getFormHandlerFunction",
    value: function _getFormHandlerFunction() {
      var formHandlerName = this._getFormHandlerKey();

      return window.aNFormHandlerMap.get(formHandlerName);
    }
    /**
     * Remove the dataset attributes `data-an-count` and `data-an-form-handler` from the parent form element.
     *
     * @private
     */

  }, {
    key: "_removeFormDataSetInfo",
    value: function _removeFormDataSetInfo() {
      // Just in case, set the counter to 0
      this._decrementParentFormCounter(); // Remove the form handler function from the FormHandlerFunction Map


      window.aNFormHandlerMap["delete"](this._getFormHandlerKey()); // Lastly, remove the dataset attributes

      this.parentForm.removeAttribute('data-an-count');
      this.parentForm.removeAttribute('data-an-form-handler');
    }
    /**
     * Set the DOM element write permissions according to the current settings, by setting the `readonly` or `contenteditable` attributes depending of its tag type.
     * If the `useHtmlAttribute` parameter is set to `true`, then the `readonly` html attribute is used and has precedence over the `readOnly` option to set the element as read-only.
     *
     * @param {boolean} useHtmlAttribute If set to `true`, then the write permissions are set by taking into account the html 'readonly' attribute, even if the `readOnly` option is set to false
     * @private
     */

  }, {
    key: "_setWritePermissions",
    value: function _setWritePermissions() {
      var useHtmlAttribute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (useHtmlAttribute && this.domElement.readOnly || this.settings.readOnly) {
        this._setReadOnly();
      } else {
        this._setReadWrite();
      }
    }
    /**
     * Set the element to be read-only.
     * If the DOM element tag is not an `input`, then it `contenteditable` attribute is set to `false`.
     *
     * @private
     */

  }, {
    key: "_setReadOnly",
    value: function _setReadOnly() {
      if (this.isInputElement) {
        this.domElement.readOnly = true;
      } else {
        this.domElement.setAttribute('contenteditable', false);
      }
    }
    /**
     * Set the element to be read-write.
     *
     * @private
     */

  }, {
    key: "_setReadWrite",
    value: function _setReadWrite() {
      if (this.isInputElement) {
        this.domElement.readOnly = false;
      } else {
        this.domElement.setAttribute('contenteditable', true);
      }
    }
    /**
     * Add a watcher so that any external change to the AutoNumeric-managed element would be detected.
     * As soon as such change is detected, AutoNumeric then tries to `set()` the value so that it gets formatted and stored in the history.
     * //XXX For now, this only works when watching the `value` attribute, not the `textContent` one
     * @private
     */

  }, {
    key: "_addWatcher",
    value: function _addWatcher() {
      var _this4 = this;

      // `getterSetter` can be undefined when a non-input element is used
      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(this.getterSetter)) {
        var _this$getterSetter = this.getterSetter,
            setter = _this$getterSetter.set,
            getter = _this$getterSetter.get;
        Object.defineProperty(this.domElement, this.attributeToWatch, {
          configurable: true,
          // This is needed in some rare cases
          get: function get() {
            return getter.call(_this4.domElement);
          },
          set: function set(val) {
            setter.call(_this4.domElement, val); // Only `set()` the value if the modification comes from an external source

            if (_this4.settings.watchExternalChanges && !_this4.internalModification) {
              _this4.set(val);
            }
          }
        });
      } //FIXME The code above fails for the `textContent` attribute since `this.getterSetter` is undefined when using `getOwnPropertyDescriptor()`

      /* //XXX The code below *almost* work for the textContent, but breaks some unit tests
      this.valueWatched = this.domElement[this.attributeToWatch];
      Object.defineProperty(this.domElement, this.attributeToWatch, {
          configurable: true, // This is needed in some rare cases
          get         : () => this.valueWatched,
          set         : val => {
              this.valueWatched = val;
              // Only `set()` the value if the modification comes from an external source
              if (this.settings.watchExternalChanges && !this.internalModification) {
                  this.set(val);
              }
          },
      });
      */

    }
    /**
     * Remove the watcher on the AutoNumeric-managed element
     * Note: This needs to be called when the AutoNumeric element is 'removed', otherwise the getter/setter stays on the DOM element and that can lead to problem if the user initialize another AutoNumeric object on it.
     * @private
     */

  }, {
    key: "_removeWatcher",
    value: function _removeWatcher() {
      var _this5 = this;

      // `getterSetter` can be undefined when a non-input element is used
      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(this.getterSetter)) {
        var _this$getterSetter2 = this.getterSetter,
            setter = _this$getterSetter2.set,
            getter = _this$getterSetter2.get;
        Object.defineProperty(this.domElement, this.attributeToWatch, {
          configurable: true,
          // This is needed in some rare cases
          get: function get() {
            return getter.call(_this5.domElement);
          },
          set: function set(val) {
            setter.call(_this5.domElement, val);
          }
        });
      } //FIXME The code above fails for the `textContent` attribute since `this.getterSetter` is undefined when using `getOwnPropertyDescriptor()`

      /* //XXX The code below *almost* work for the textContent, but breaks some unit tests
      this.valueWatched = this.domElement[this.attributeToWatch];
      Object.defineProperty(this.domElement, this.attributeToWatch, {
          configurable: true, // This is needed in some rare cases
          get         : () => this.valueWatched,
          set         : val => {
              this.valueWatched = val;
          },
      });
      */

    }
    /**
     * Return the name of the object attribute that store the current formatted data in the DOM element.
     *
     * @returns {string}
     * @private
     */

  }, {
    key: "_getAttributeToWatch",
    value: function _getAttributeToWatch() {
      var attributeToWatch;

      if (this.isInputElement) {
        attributeToWatch = 'value';
      } else {
        var nodeType = this.domElement.nodeType;

        if (nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_NODE || nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          attributeToWatch = 'textContent';
        } else if (nodeType === Node.TEXT_NODE) {
          attributeToWatch = 'nodeValue';
        }
      }

      return attributeToWatch;
    }
    /**
     * Save the current raw value into the history table, along with the selection information.
     *
     * If the user has done some undos and tries to enter:
     * - a new and different number than the 'next' state, this drops the rest of the history table
     * - the very same number that result in the same rawValue than the 'next' state, we only move the history table pointer to the next state
     *
     * @private
     */

  }, {
    key: "_historyTableAdd",
    value: function _historyTableAdd() {
      //TODO Add a `this.settings.saveSelectionsIntoHistory` option to prevent saving the selections (in order to gain performance)
      var isEmptyHistoryTable = this.historyTable.length === 0; // Only add a new value if it's different than the previous one (to prevent infinitely adding values on mouseover for instance)

      if (isEmptyHistoryTable || this.rawValue !== this._historyTableCurrentValueUsed()) {
        // Trim the history table if the user changed the value of an intermediary state
        var addNewHistoryState = true;

        if (!isEmptyHistoryTable) {
          // If some undo has been done and the user type the exact same data than the next entry after the current history pointer, do no drop the rest of the 'redo' list, and just advance the historyTableIndex
          var nextHistoryStateIndex = this.historyTableIndex + 1;

          if (nextHistoryStateIndex < this.historyTable.length && this.rawValue === this.historyTable[nextHistoryStateIndex].value) {
            // If the character input result in the same state than the next one, do not remove the next history states nor add a new one
            addNewHistoryState = false;
          } else {
            // First remove anything that is after the current index
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].arrayTrim(this.historyTable, this.historyTableIndex + 1);
          }
        } // Update the history pointer


        this.historyTableIndex++; // Add the new history state, if needed

        if (addNewHistoryState) {
          // Save the selection info
          var selection = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementSelection(this.domElement);
          this.selectionStart = selection.start;
          this.selectionEnd = selection.end; // Then add the new raw value

          this.historyTable.push({
            // Save the rawValue and selection start/end
            value: this.rawValue,
            // The selection for this element is temporary, and will be updated when the next history state will be recorded.
            // That way, we are always sure we save the last caret or selection positions just before the value is changed. Otherwise we would only save those positions when the value is first changed, and would not take into account that the user could move the caret around afterward.
            // For instance, this is needed if the user change the element value, and immediately undo it ; if he then does a redo, he'll see the value and the right selection
            // To sum up; The selection position are not always +1 character, since it could also be '2' if a group separator is added when entering one character. That's why the current history state caret/selection position is updated on each `keyup` event.
            start: this.selectionStart + 1,
            // Here we add one since the user added one character too
            end: this.selectionEnd + 1
          }); // Update the selection in the previous entry, in order to keep track of the updated caret/selection positions

          if (this.historyTable.length > 1) {
            this.historyTable[this.historyTableIndex - 1].start = this.selectionStart;
            this.historyTable[this.historyTableIndex - 1].end = this.selectionEnd;
          }
        } // Limit the history table size according to the `historySize` option


        if (this.historyTable.length > this.settings.historySize) {
          this._historyTableForget();
        }
      }
    }
    /**
     * Debug function for the history table
     * @private
     */

    /*
    _debugHistoryTable() {
        let i = 0;
        let mark;
        this.historyTable.forEach(history => {
            if (this.historyTableIndex === i) {
                mark = '> ';
            } else {
                mark = '';
            }
            console.log(`${mark}${i++}: ${history.value} ${history.start}|${history.end} [onGoingRedo: ${this.onGoingRedo}]`); //DEBUG
        });
    }
    */

    /**
     * 'Undo' or 'Redo' the last/next user entry in the history table.
     * This does not modify the history table, only the pointer to the current state.
     *
     * @param {boolean} undo If set to `true`, then this function does an 'Undo', otherwise it does a 'Redo'
     * @private
     */

  }, {
    key: "_historyTableUndoOrRedo",
    value: function _historyTableUndoOrRedo() {
      var undo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var check;

      if (undo) {
        // Only 'undo' if there are some info to undo
        check = this.historyTableIndex > 0;

        if (check) {
          this.historyTableIndex--;
        }
      } else {
        // Only 'redo' if there are some info to redo at the end of the history table
        check = this.historyTableIndex + 1 < this.historyTable.length;

        if (check) {
          this.historyTableIndex++;
        }
      }

      if (check) {
        // Set the value back
        var undoInfo = this.historyTable[this.historyTableIndex];
        this.set(undoInfo.value, null, false); // next or previous raw value
        // Set the selection back

        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(this.domElement, undoInfo.start, undoInfo.end);
      }
    }
    /**
     * 'Undo' the last user entry by going back one entry in the history table.
     * This keeps the following entries in order to allow for a 'redo'.
     * This does not modify the history table, only the pointer to the current state.
     * @private
     */

  }, {
    key: "_historyTableUndo",
    value: function _historyTableUndo() {
      this._historyTableUndoOrRedo(true);
    }
    /**
     * 'Redo' the next user entry in the history table.
     * This does not modify the history table, only the pointer to the current state.
     * @private
     */

  }, {
    key: "_historyTableRedo",
    value: function _historyTableRedo() {
      this._historyTableUndoOrRedo(false);
    }
    /**
     * Reset the history table to its initial state, and select the value.
     * @private
     */

    /*
    resetHistoryTable() { //FIXME Test this
        this.set(this.rawValue, null, false);
        this.select();
        const selection = AutoNumericHelper.getElementSelection(this.domElement);
        this.historyTableIndex = 0;
        this.historyTable = [{
            // Save the rawValue and selection start/end
            value: this.rawValue,
            start: selection.start,
            end  : selection.end,
        }];
    }
    */

    /**
     * Make the history table forget its first N elements, shifting its indexes in the process.
     * `N` being given as the `numberOfEntriesToForget` parameter.
     *
     * @param {Number} numberOfEntriesToForget
     * @returns {object|Array<object>} The discarded objects, in an Array.
     * @private
     */

  }, {
    key: "_historyTableForget",
    value: function _historyTableForget() {
      var numberOfEntriesToForget = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var shiftedAway = [];

      for (var i = 0; i < numberOfEntriesToForget; i++) {
        shiftedAway.push(this.historyTable.shift()); // Update the history table index accordingly

        this.historyTableIndex--;

        if (this.historyTableIndex < 0) {
          // In case this function is called more times than there is states in the history table
          this.historyTableIndex = 0;
        }
      }

      if (shiftedAway.length === 1) {
        return shiftedAway[0];
      }

      return shiftedAway;
    }
    /**
     * Return the currently used value from the history table.
     *
     * @returns {string|number}
     * @private
     */

  }, {
    key: "_historyTableCurrentValueUsed",
    value: function _historyTableCurrentValueUsed() {
      var indexToUse = this.historyTableIndex;

      if (indexToUse < 0) {
        indexToUse = 0;
      }

      var result;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(this.historyTable[indexToUse])) {
        result = '';
      } else {
        result = this.historyTable[indexToUse].value;
      }

      return result;
    }
    /**
     * Parse the `styleRules` option and run the test for each given rules, either pre-defined ones like `positive`, `negative` and `ranges`, or user defined callbacks within the `userDefined` attribute.
     * @private
     */

  }, {
    key: "_parseStyleRules",
    value: function _parseStyleRules() {
      var _this6 = this;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(this.settings.styleRules) || this.rawValue === '') {
        return;
      } // 'positive' attribute


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(this.settings.styleRules.positive)) {
        if (this.rawValue >= 0) {
          this._addCSSClass(this.settings.styleRules.positive);
        } else {
          this._removeCSSClass(this.settings.styleRules.positive);
        }
      } // 'negative' attribute


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(this.settings.styleRules.negative)) {
        if (this.rawValue < 0) {
          this._addCSSClass(this.settings.styleRules.negative);
        } else {
          this._removeCSSClass(this.settings.styleRules.negative);
        }
      } // 'ranges' attribute


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(this.settings.styleRules.ranges) && this.settings.styleRules.ranges.length !== 0) {
        this.settings.styleRules.ranges.forEach(function (range) {
          if (_this6.rawValue >= range.min && _this6.rawValue < range.max) {
            _this6._addCSSClass(range["class"]);
          } else {
            _this6._removeCSSClass(range["class"]);
          }
        });
      } // 'userDefined' attribute
      //TODO Also pass the old raw value as a parameter, and not only the new raw value


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(this.settings.styleRules.userDefined) && this.settings.styleRules.userDefined.length !== 0) {
        this.settings.styleRules.userDefined.forEach(function (userObject) {
          if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(userObject.callback)) {
            // Test for the type of the `classes` attribute, which changes the function behavior
            if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(userObject.classes)) {
              // If 'classes' is a string, set it if `true`, remove it if `false`
              if (userObject.callback(_this6.rawValue)) {
                _this6._addCSSClass(userObject.classes);
              } else {
                _this6._removeCSSClass(userObject.classes);
              }
            } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(userObject.classes)) {
              if (userObject.classes.length === 2) {
                // If 'classes' is an array with only 2 elements, set the first class if `true`, the second if `false`
                if (userObject.callback(_this6.rawValue)) {
                  _this6._addCSSClass(userObject.classes[0]);

                  _this6._removeCSSClass(userObject.classes[1]);
                } else {
                  _this6._removeCSSClass(userObject.classes[0]);

                  _this6._addCSSClass(userObject.classes[1]);
                }
              } else if (userObject.classes.length > 2) {
                // The callback returns an array of indexes to use on the `classes` array
                var callbackResult = userObject.callback(_this6.rawValue);

                if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(callbackResult)) {
                  // If multiple indexes are returned
                  userObject.classes.forEach(function (userClass, index) {
                    if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(index, callbackResult)) {
                      _this6._addCSSClass(userClass);
                    } else {
                      _this6._removeCSSClass(userClass);
                    }
                  });
                } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInt(callbackResult)) {
                  // If only one index is returned
                  userObject.classes.forEach(function (userClass, index) {
                    if (index === callbackResult) {
                      _this6._addCSSClass(userClass);
                    } else {
                      _this6._removeCSSClass(userClass);
                    }
                  });
                } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(callbackResult)) {
                  // Remove all the classes
                  userObject.classes.forEach(function (userClass) {
                    _this6._removeCSSClass(userClass);
                  });
                } else {
                  _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The callback result is not an array nor a valid array index, ".concat(_typeof(callbackResult), " given."));
                }
              } else {
                _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError('The classes attribute is not valid for the `styleRules` option.');
              }
            } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(userObject.classes)) {
              // If 'classes' is `undefined` or `null`, then the callback is called with the AutoNumeric object passed as a parameter
              userObject.callback(_this6);
            } else {
              _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError('The callback/classes structure is not valid for the `styleRules` option.');
            }
          } else {
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("The given `styleRules` callback is not a function, ".concat(typeof callback === "undefined" ? "undefined" : _typeof(callback), " given."), _this6.settings.showWarnings);
          }
        });
      }
    }
    /**
     * Add the given CSS class to the DOM element.
     *
     * @param {string} cssClassName
     * @private
     */

  }, {
    key: "_addCSSClass",
    value: function _addCSSClass(cssClassName) {
      this.domElement.classList.add(cssClassName);
    }
    /**
     * Remove the given CSS class from the DOM element.
     *
     * @param {string} cssClassName
     * @private
     */

  }, {
    key: "_removeCSSClass",
    value: function _removeCSSClass(cssClassName) {
      this.domElement.classList.remove(cssClassName);
    } // This are the public function available on each autoNumeric-managed element

    /**
     * Method that updates the AutoNumeric settings, and immediately format the element accordingly.
     * The options passed as parameter(s) is either one or many objects that each contains some settings, ie. :
     * {
     *     digitGroupSeparator: ".",
     *     decimalCharacter: ",",
     *     currencySymbol: '€ ',
     * }
     * If multiple options are passed, the latter overwrite the previous ones.
     *
     * Note: If the new settings are not validated, or the call to `set()` fails, then the previous valid settings are reverted back to.
     *
     * @example anElement.update({ options }) // Updates the settings
     * @example anElement.update({ options1 }, { options2 }) // Updates the settings with multiple option objects
     * @example anElement.update([{ options1 }, { options2 }]) // Updates the settings with multiple option objects in a single array
     *
     * @param {object|string|array} newOptions
     * @returns {AutoNumeric}
     */

  }, {
    key: "update",
    value: function update() {
      var _this7 = this;

      for (var _len2 = arguments.length, newOptions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        newOptions[_key2] = arguments[_key2];
      }

      if (Array.isArray(newOptions) && Array.isArray(newOptions[0])) {
        // Allows to pass a single array of options
        newOptions = newOptions[0];
      } // Keep a copy of the original settings before changing them, in case they do not validate correctly, so we can switch back to them


      var originalSettings = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].cloneObject(this.settings); //TODO Check that the `styleRules` option is correctly cloned (due to depth cloning limitation)
      // Store the current unformatted input value

      var numericString = this.rawValue; // Generate a single option object with the settings from the latter overwriting those from the former

      var optionsToUse = {};

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(newOptions) || newOptions.length === 0) {
        optionsToUse = null;
      } else if (newOptions.length >= 1) {
        newOptions.forEach(function (optionObject) {
          if (_this7.constructor._isPreDefinedOptionValid(optionObject)) {
            // The option object is a predefined option name (ie. 'euro')
            optionObject = _this7.constructor._getOptionObject(optionObject);
          }

          _extends(optionsToUse, optionObject);
        });
      } // Update the settings


      try {
        this._setSettings(optionsToUse, true);

        this._setWritePermissions(); // Update the read/write permissions


        this._updateEventListeners(); // Reformat the input value with the new settings
        // Note: we always `set`, even when `numericString` is the empty string '', since `emptyInputBehavior` (set to `always` or `zero`) can change how the empty input is formatted


        this.set(numericString);
      } catch (error) {
        // If the settings validation fails, then we switch back to the previous valid settings
        this._setSettings(originalSettings, true); // `_setSettings()` is used here instead of directly doing `this.settings = originalSettings;` since lots of side variables are calculated from the settings, and we need to get those back to their previous state. Note: `_setSettings()` is called in the 'update' mode in order to correctly set back the `originalDecimalPlacesRawValue` value.


        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("Unable to update the settings, those are invalid: [".concat(error, "]"));
        return this;
      }

      return this;
    }
    /**
     * Return the options object containing all the current autoNumeric settings in effect.
     * You can then directly access each option by using its name : `anElement.getSettings().optionNameAutoCompleted`.
     *
     * @example
     * anElement.getSettings()
     * anElement.getSettings().decimalCharacter // Return the decimalCharacter setting as a string - any valid option name can be used
     *
     * @returns {object}
     */

  }, {
    key: "getSettings",
    value: function getSettings() {
      return this.settings;
    }
    /**
     * Set the given element value, and format it immediately.
     * Additionally, this `set()` method can accept options that will be merged into the current AutoNumeric element, taking precedence over any previous settings.
     *
     * @example anElement.set('12345.67') // Formats the value
     * @example anElement.set(12345.67) // Formats the value
     * @example anElement.set(12345.67, { decimalCharacter : ',' }) // Update the settings and formats the value in one go
     * @example anElement.northAmerican().set('$12,345.67') // Set an already formatted value (this does not _exactly_ respect the currency symbol/negative placements, but only remove all non-numbers characters, according to the ones given in the settings)
     * @example anElement.set(null) // Set the rawValue and element value to `null`
     *
     * @param {number|string|null} newValue The value must be a Number, a numeric string or `null` (if `emptyInputBehavior` is set to `'null'`)
     * @param {object} options A settings object that will override the current settings. Note: the update is done only if the `newValue` is defined.
     * @param {boolean} saveChangeToHistory If set to `true`, then the change is recorded in the history table
     * @returns {AutoNumeric}
     * @throws
     */

  }, {
    key: "set",
    value: function set(newValue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var saveChangeToHistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      //TODO Add the `saveSettings` options. If `true`, then when `options` is passed, then it overwrite the current `this.settings`. If `false` the `options` are only used once and `this.settings` is not modified
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(newValue)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("You are trying to set an 'undefined' value ; an error could have occurred.", this.settings.showWarnings);
        return this;
      } // The options update is done only if the `newValue` is not `undefined`


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options)) {
        this._setSettings(options, true); // We do not call `update` here since this would call `set` too

      }

      if (newValue === null && this.settings.emptyInputBehavior !== AutoNumeric.options.emptyInputBehavior["null"]) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("You are trying to set the `null` value while the `emptyInputBehavior` option is set to ".concat(this.settings.emptyInputBehavior, ". If you want to be able to set the `null` value, you need to change the 'emptyInputBehavior' option to `'null'`."), this.settings.showWarnings);
        return this;
      }

      var value;

      if (newValue === null) {
        //TODO Merge this into a global `if (newValue === null) {` test, with the test above
        // Here this.settings.emptyInputBehavior === AutoNumeric.options.emptyInputBehavior.null
        this._setElementAndRawValue(null, null, saveChangeToHistory);

        this._saveValueToPersistentStorage();

        return this;
      }

      value = this.constructor._toNumericValue(newValue, this.settings);

      if (isNaN(Number(value))) {
        //TODO Do not modify the element value if the newValue results in `NaN`. Make sure the settings, if modified, are revert back too.
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("The value you are trying to set results in `NaN`. The element value is set to the empty string instead.", this.settings.showWarnings);
        this.setValue('', saveChangeToHistory);
        return this;
      }

      if (value === '') {
        switch (this.settings.emptyInputBehavior) {
          case AutoNumeric.options.emptyInputBehavior.zero:
            value = 0;
            break;

          case AutoNumeric.options.emptyInputBehavior.min:
            value = this.settings.minimumValue;
            break;

          case AutoNumeric.options.emptyInputBehavior.max:
            value = this.settings.maximumValue;
            break;

          default:
            if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(this.settings.emptyInputBehavior)) {
              value = Number(this.settings.emptyInputBehavior);
            }

        }
      }

      if (value !== '') {
        var _this$constructor$_ch = this.constructor._checkIfInRangeWithOverrideOption(value, this.settings),
            _this$constructor$_ch2 = _slicedToArray(_this$constructor$_ch, 2),
            minTest = _this$constructor$_ch2[0],
            maxTest = _this$constructor$_ch2[1]; // Modify the formatted value if the rawValue is found in the `valuesToStrings` option


        if (minTest && maxTest && this.settings.valuesToStrings && this._checkValuesToStrings(value)) {
          // Set the raw value normally, and the formatted value with the corresponding string
          this._setElementAndRawValue(this.settings.valuesToStrings[value], value, saveChangeToHistory);

          this._saveValueToPersistentStorage();

          return this;
        } // This test is needed by the `showPositiveSign` option


        var isZero = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isZeroOrHasNoValue(value);

        if (isZero) {
          value = '0';
        }

        if (minTest && maxTest) {
          var forcedRawValue = this.constructor._roundRawValue(value, this.settings);

          forcedRawValue = this._trimLeadingAndTrailingZeros(forcedRawValue.replace(this.settings.decimalCharacter, '.')); // Move the `setRawValue` call after the `setElementValue` one

          value = this._getRawValueToFormat(value); // Multiply the raw value to obtain the formatted value
          // Round the given value according to the object state (focused/unfocused)

          if (this.isFocused) {
            value = this.constructor._roundFormattedValueShownOnFocus(value, this.settings);
          } else {
            if (this.settings.divisorWhenUnfocused) {
              value = value / this.settings.divisorWhenUnfocused;
              value = value.toString();
            }

            value = this.constructor._roundFormattedValueShownOnBlur(value, this.settings);
          }

          value = this.constructor._modifyNegativeSignAndDecimalCharacterForFormattedValue(value, this.settings);
          value = this.constructor._addGroupSeparators(value, this.settings, this.isFocused, this.rawValue, forcedRawValue);

          if (!this.isFocused && this.settings.symbolWhenUnfocused) {
            value = "".concat(value).concat(this.settings.symbolWhenUnfocused);
          }

          if (this.settings.decimalPlacesShownOnFocus || this.settings.divisorWhenUnfocused) {
            this._saveValueToPersistentStorage();
          }

          this._setElementAndRawValue(value, forcedRawValue, saveChangeToHistory); // Special case when the user is allowed to enter invalid numbers outside of the min/max range


          this._setValidOrInvalidState(forcedRawValue);

          return this;
        } else {
          this._triggerRangeEvents(minTest, maxTest);

          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The value [".concat(value, "] being set falls outside of the minimumValue [").concat(this.settings.minimumValue, "] and maximumValue [").concat(this.settings.maximumValue, "] range set for this element"));

          this._removeValueFromPersistentStorage();

          this.setValue('', saveChangeToHistory); //TODO Shouldn't we just drop that faulty newValue and keep the previous one? This is behind a `throwError()` call anyway..

          return this;
        }
      } else {
        // Here, `value` equal the empty string `''`
        var result;

        if (this.settings.emptyInputBehavior === AutoNumeric.options.emptyInputBehavior.always) {
          // Keep the currency symbol as per emptyInputBehavior
          result = this.settings.currencySymbol;
        } else {
          result = '';
        }

        this._setElementAndRawValue(result, '', saveChangeToHistory);

        return this;
      }
    }
    /**
     * Set the given value directly as the DOM element value, without formatting it beforehand.
     * You can also set the value and update the setting in one go (the value will again not be formatted immediately).
     *
     * @param {number|string} value
     * @param {object} options
     * @returns {AutoNumeric}
     * @throws
     */

  }, {
    key: "setUnformatted",
    value: function setUnformatted(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      //TODO Should we use `AutoNumeric.unformat()` here and set the unformatted result in case `value` is formatted?
      if (value === null || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(value)) {
        return this;
      } // The options update is done only if the `value` is not null


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options)) {
        this._setSettings(options, true); // We do not call `update` here since this would call `set` too

      }

      var strippedValue = this.constructor._removeBrackets(value, this.settings);

      var normalizedValue = this.constructor._stripAllNonNumberCharacters(strippedValue, this.settings, true, this.isFocused);

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(normalizedValue)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The value is not a valid one, it's not a numeric string nor a recognized currency.");
      }

      if (this.constructor._isWithinRangeWithOverrideOption(normalizedValue, this.settings)) {
        // If the `normalizedValue` is in the range
        this.setValue(value);
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The value is out of the range limits [".concat(this.settings.minimumValue, ", ").concat(this.settings.maximumValue, "]."));
      }

      return this;
    }
    /**
     * Set the given value directly as the DOM element value, without formatting it beforehand, and without checking its validity.
     * This also updates the `rawValue` with the given `newValue`, without checking it too ; if it's not formatted like a number recognized by Javascript, this *will* likely make other AutoNumeric methods fail.
     *
     * @param {string|number|null} newValue The new value to set on the element
     * @param {boolean} saveChangeToHistory If set to `true`, then the change is recorded in the history array, otherwise it is not
     * @returns {AutoNumeric}
     */

  }, {
    key: "setValue",
    value: function setValue(newValue) {
      var saveChangeToHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this._setElementAndRawValue(newValue, saveChangeToHistory);

      return this;
    }
    /**
     * Save the raw value inside the AutoNumeric object.
     *
     * @param {number|string|null} rawValue The numeric value as understood by Javascript like a `Number`
     * @param {boolean} saveChangeToHistory If set to `true`, then the change is recorded in the history array, otherwise it is not
     * @private
     */

  }, {
    key: "_setRawValue",
    value: function _setRawValue(rawValue) {
      var saveChangeToHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // Only set the raw value if the given value is different than the current one
      if (this.rawValue !== rawValue) {
        //TODO Manage the case where one value is a string while the other is a number?
        var oldRawValue = this.rawValue; // Update the raw value

        this.rawValue = rawValue; // By default, if the `rawValue` is changed programmatically

        if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(this.settings.rawValueDivisor) && this.settings.rawValueDivisor !== 0 && // Only divide if the `rawValueDivisor` option is set
        rawValue !== '' && rawValue !== null && // Do not modify the `rawValue` if it's an empty string or null
        this._isUserManuallyEditingTheValue()) {
          // If the user is manually changing the element value
          this.rawValue /= this.settings.rawValueDivisor;
        } // Broadcast the `rawValueModified` event since the `rawValue` has been modified


        this._triggerEvent(AutoNumeric.events.rawValueModified, this.domElement, {
          oldRawValue: oldRawValue,
          newRawValue: this.rawValue,
          isPristine: this.isPristine(true),
          error: null,
          aNElement: this
        }); // Change the element style or use the relevant callbacks


        this._parseStyleRules();

        if (saveChangeToHistory) {
          // Save in the history the last known raw value and formatted result selection
          this._historyTableAdd();
        }
      }
    }
    /**
     * Set the given value on the DOM element, without affecting the `rawValue`.
     * This send an 'autoNumeric:formatted' event if the new value is different than the old one.
     *
     * @param {number|string} newElementValue
     * @param {boolean} sendFormattedEvent If set to `true`, then the `AutoNumeric.events.formatted` event is sent if the value has changed
     * @returns {AutoNumeric}
     * @private
     */

  }, {
    key: "_setElementValue",
    value: function _setElementValue(newElementValue) {
      var sendFormattedEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      //TODO Use an internal attribute to track the current value of the element `formattedValue` (like its counterpart `rawValue`). This would allow us to avoid calling `getElementValue` many times
      var oldElementValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement); // Only update the value if it's different from the current one

      if (newElementValue !== oldElementValue) {
        this.internalModification = true;
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementValue(this.domElement, newElementValue);
        this.internalModification = false;

        if (sendFormattedEvent) {
          this._triggerEvent(AutoNumeric.events.formatted, this.domElement, {
            oldValue: oldElementValue,
            newValue: newElementValue,
            oldRawValue: this.rawValue,
            newRawValue: this.rawValue,
            isPristine: this.isPristine(false),
            error: null,
            aNElement: this
          });
        }
      }

      return this;
    }
    /**
     * Set the given value on the DOM element, and the raw value on `this.rawValue`, if both are given.
     * If only one value is given, then both the DOM element value and the raw value are set with that value.
     * The third argument `saveChangeToHistory` defines if the change should be recorded in the history array.
     * Note: if the second argument `rawValue` is a boolean, we consider that is really is the `saveChangeToHistory` argument.
     *
     * @param {number|string|null} newElementValue
     * @param {number|string|null|boolean} rawValue
     * @param {boolean} saveChangeToHistory
     * @returns {AutoNumeric}
     * @private
     */

  }, {
    key: "_setElementAndRawValue",
    value: function _setElementAndRawValue(newElementValue) {
      var rawValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var saveChangeToHistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(rawValue)) {
        rawValue = newElementValue;
      } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(rawValue)) {
        saveChangeToHistory = rawValue;
        rawValue = newElementValue;
      } //XXX The order here is important ; the value should first be set on the element, then and only then we should update the raw value
      // In the `set()` function, we make sure to call `_setRawValue` *after* `setElementValue` so that if `_setRawValue` calls a callback that modify the `rawValue`, then the new value is set correctly (after `setElementValue` briefly set its value first)


      this._setElementValue(newElementValue);

      this._setRawValue(rawValue, saveChangeToHistory);

      return this;
    }
    /**
     * Return the multiplied raw value with the `rawValueDivisor`.
     * This is used to display different values between the raw and formatted values.
     *
     * @param {number|string|null} rawValue The numeric value as understood by Javascript like a `Number`
     * @returns {number|string|null}
     * @private
     */

  }, {
    key: "_getRawValueToFormat",
    value: function _getRawValueToFormat(rawValue) {
      var rawValueForTheElementValue;

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(this.settings.rawValueDivisor) && this.settings.rawValueDivisor !== 0 && // Only multiply if the `rawValueDivisor` option is set
      rawValue !== '' && rawValue !== null) {
        // Do not modify the `rawValue` if it's an empty string or null
        // !this._isUserManuallyEditingTheValue()) { // If the user is NOT manually changing the element value, but that is done programmatically
        rawValueForTheElementValue = rawValue * this.settings.rawValueDivisor;
      } else {
        rawValueForTheElementValue = rawValue;
      }

      return rawValueForTheElementValue;
    }
    /**
     * Check if the given value has a corresponding key in the `valuesToStrings` option object.
     *
     * @param {number|string} value
     * @returns {boolean} Returns `true` if such a key is found.
     * @private
     */

  }, {
    key: "_checkValuesToStrings",
    value: function _checkValuesToStrings(value) {
      return this.constructor._checkValuesToStringsArray(value, this.valuesToStringsKeys);
    }
    /**
     * Check if the given value has a corresponding key in the `stringsArray` array.
     *
     * @param {number|string} key
     * @param {array} stringsArray Array where the `key` is checked against its keys
     * @returns {boolean} Returns `true` if such a key is found.
     * @private
     */

  }, {
    key: "_isUserManuallyEditingTheValue",

    /**
     * Return `true` if the user is currently modifying the element value manually.
     *
     * @returns {boolean}
     * @private
     */
    value: function _isUserManuallyEditingTheValue() {
      // return (this.isFocused && this.isEditing) || this.isWheelEvent || this.isDropEvent;
      return this.isFocused && this.isEditing || this.isDropEvent;
    }
    /**
     * Execute the given callback function using the given result as its first parameter, and the AutoNumeric object as its second.
     *
     * @param {number|string|Array|null} result
     * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
     * @private
     */

  }, {
    key: "_executeCallback",
    value: function _executeCallback(result, callback) {
      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(callback) && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
        callback(result, this);
      }
    }
    /**
     * Trigger the given event on the given element with the given detail.
     * This takes into account the `eventBubbles` and `eventIsCancelable` options.
     *
     * @param {string} eventName
     * @param {HTMLElement|HTMLDocument|EventTarget} element
     * @param {object} detail
     * @private
     */

  }, {
    key: "_triggerEvent",
    value: function _triggerEvent(eventName) {
      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].triggerEvent(eventName, element, detail, this.settings.eventBubbles, this.settings.eventIsCancelable);
    }
    /**
     * Alias of the `getNumericString()` function.
     * Developers should use one of the more explicit function names to get what they want :
     * - a numeric string : `getNumericString()`
     * - a formatted string : `getFormatted()`
     * - a number : `getNumber()`, or
     * - a localized numeric string : `getLocalized()`
     *
     * @usage anElement.get();
     *
     * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
     *
     * @deprecated
     * @returns {string|null}
     */

  }, {
    key: "get",
    value: function get() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return this.getNumericString(callback);
    }
    /**
     * Return the unformatted value as a string.
     * This can also return `null` if `rawValue` is null.
     *
     * @usage anElement.getNumericString();
     *
     * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
     *
     * @returns {string|null}
     */

  }, {
    key: "getNumericString",
    value: function getNumericString() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var result;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(this.rawValue)) {
        result = null;
      } else {
        // Always return a numeric string
        // The following statement gets rid of the trailing zeros in the decimal places since the current method does not pad decimals
        result = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].trimPaddedZerosFromDecimalPlaces(this.rawValue);
      }

      this._executeCallback(result, callback);

      return result;
    }
    /**
     * Return the current formatted value of the AutoNumeric element as a string
     *
     * @usage anElement.getFormatted()
     *
     * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
     *
     * @returns {string}
     */

  }, {
    key: "getFormatted",
    value: function getFormatted() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!('value' in this.domElement || 'textContent' in this.domElement)) {
        // Make sure `.value` or `.textContent' exists before trying to access those properties
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError('Unable to get the formatted string from the element.');
      }

      var result = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement);

      this._executeCallback(result, callback);

      return result;
    }
    /**
     * Return the element unformatted value as a real Javascript number.
     * Warning: This can lead to precision problems with big numbers that should be stored as strings.
     *
     * @usage anElement.getNumber()
     *
     * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
     *
     * @returns {number|null}
     */

  }, {
    key: "getNumber",
    value: function getNumber() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var result;

      if (this.rawValue === null) {
        result = null;
      } else {
        result = this.constructor._toLocale(this.getNumericString(), 'number', this.settings);
      }

      this._executeCallback(result, callback);

      return result;
    }
    /**
     * Returns the unformatted value, but following the `outputFormat` setting, which means the output can either be :
     * - a string (that could or could not represent a number (ie. "12345,67-")), or
     * - a plain number (if the setting 'number' is used).
     *
     * By default the returned values are an ISO numeric string "1234.56" or "-1234.56" where the decimal character is a period.
     * Check the "outputFormat" option definition for more details.
     *
     * @usage anElement.getLocalized();
     *
     * @param {null|string|function} forcedOutputFormat If set to something different than `null`, then this is used as an overriding outputFormat option
     * @param {function|null} callback If a callback is passed, then the result is passed to it as its first argument, and the AutoNumeric object has its second
     *
     * @returns {*}
     */

  }, {
    key: "getLocalized",
    value: function getLocalized() {
      var forcedOutputFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      // First, check if only a callback has been passed, and if so, sanitize the parameters
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(forcedOutputFormat) && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(callback)) {
        callback = forcedOutputFormat;
        forcedOutputFormat = null;
      } // Then get the localized value


      var value;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isEmptyString(this.rawValue)) {
        value = '';
      } else {
        // Here I use `this.rawValue` instead of `this.getNumericString()` since the current input value could be unformatted with a localization (ie. '1234567,89-').
        // I also convert the rawValue to a number, then back to a string in order to drop the decimal part if the rawValue is an integer.
        value = '' + Number(this.rawValue);
      }

      if (value !== '' && Number(value) === 0 && this.settings.leadingZero !== AutoNumeric.options.leadingZero.keep) {
        value = '0';
      }

      var outputFormatToUse;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(forcedOutputFormat)) {
        outputFormatToUse = this.settings.outputFormat;
      } else {
        outputFormatToUse = forcedOutputFormat;
      }

      var result = this.constructor._toLocale(value, outputFormatToUse, this.settings);

      this._executeCallback(result, callback);

      return result;
    }
    /**
     * Force the element to reformat its value again (just in case the formatting has been lost).
     * This can be used right after a form submission for instance (after a previous call to `unformat`).
     *
     * @example anElement.reformat()
     *
     * @returns {AutoNumeric}
     */

  }, {
    key: "reformat",
    value: function reformat() {
      // `this.rawValue` is used instead of `this.domElement.value` because when the content is `unformatLocalized`, it can become a string that cannot be converted to a number easily
      this.set(this.rawValue);
      return this;
    }
    /**
     * Remove the formatting and keep only the raw unformatted value in the element (as a numericString)
     * Note: this is loosely based on the previous 'unSet()' function
     *
     * By default, values are returned as ISO numeric strings (ie. "1234.56" or "-1234.56"), where the decimal character is a period.
     * @example anElement.unformat()
     *
     * @returns {AutoNumeric}
     */

  }, {
    key: "unformat",
    value: function unformat() {
      this._setElementValue(this.getNumericString());

      return this;
    }
    /**
     * Remove the formatting and keep only the localized unformatted value in the element, with the option to override the default outputFormat if needed
     *
     * Locale formats are supported "1234.56-" or "1234,56" or "-1234,56 or "1234,56-", or even plain numbers.
     * Take a look at the `outputFormat` option definition in the default settings for more details.
     *
     * @param {null|string} forcedOutputFormat If set to something different than `null`, then this is used as an overriding outputFormat option
     * @returns {AutoNumeric}
     */

  }, {
    key: "unformatLocalized",
    value: function unformatLocalized() {
      var forcedOutputFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._setElementValue(this.getLocalized(forcedOutputFormat));

      return this;
    }
    /**
     * Return `true` if the current value is the same as when the element got initialized.
     * Note: By default, this returns `true` if the raw unformatted value is still the same even if the formatted one has changed (due to a configuration update for instance).
     * In order to test if the formatted value is the same (which means neither the raw value nor the settings have been changed), then you must pass `false` as its argument.
     *
     * @param {boolean} checkOnlyRawValue If set to `true`, the pristine value is done on the raw unformatted value, not the formatted one.  If set to `false`, this also checks that the formatted value hasn't changed.
     * @returns {boolean}
     */

  }, {
    key: "isPristine",
    value: function isPristine() {
      var checkOnlyRawValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var result;

      if (checkOnlyRawValue) {
        result = this.initialValue === this.getNumericString();
      } else {
        result = this.initialValueHtmlAttribute === this.getFormatted();
      }

      return result;
    }
    /**
     * Select the formatted element content, based on the `selectNumberOnly` option
     *
     * @returns {AutoNumeric}
     */

  }, {
    key: "select",
    value: function select() {
      if (this.settings.selectNumberOnly) {
        this.selectNumber();
      } else {
        this._defaultSelectAll();
      }

      return this;
    }
    /**
     * Select the whole element content (including the currency symbol).
     * @private
     */

  }, {
    key: "_defaultSelectAll",
    value: function _defaultSelectAll() {
      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(this.domElement, 0, _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement).length);
    }
    /**
     * Select only the numbers in the formatted element content, leaving out the currency symbol, whatever the value of the `selectNumberOnly` option
     *
     * @returns {AutoNumeric}
     */

  }, {
    key: "selectNumber",
    value: function selectNumber() {
      //TODO Make sure the selection is ok when showPositiveSign is set to `true` (select the negative sign, but not the positive one)
      var unformattedValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement);
      var valueLen = unformattedValue.length;
      var currencySymbolSize = this.settings.currencySymbol.length;
      var currencySymbolPlacement = this.settings.currencySymbolPlacement;
      var negLen = !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(unformattedValue, this.settings.negativeSignCharacter) ? 0 : 1;
      var suffixTextLen = this.settings.suffixText.length;
      var start;

      if (currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) {
        start = 0;
      } else if (this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.left && negLen === 1 && currencySymbolSize > 0) {
        start = currencySymbolSize + 1;
      } else {
        start = currencySymbolSize;
      }

      var end;

      if (currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix) {
        end = valueLen - suffixTextLen;
      } else {
        switch (this.settings.negativePositiveSignPlacement) {
          case AutoNumeric.options.negativePositiveSignPlacement.left:
            end = valueLen - (suffixTextLen + currencySymbolSize);
            break;

          case AutoNumeric.options.negativePositiveSignPlacement.right:
            if (currencySymbolSize > 0) {
              end = valueLen - (currencySymbolSize + negLen + suffixTextLen);
            } else {
              end = valueLen - (currencySymbolSize + suffixTextLen);
            }

            break;

          default:
            end = valueLen - (currencySymbolSize + suffixTextLen);
        }
      }

      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(this.domElement, start, end);
      return this;
    }
    /**
     * Select only the integer part in the formatted element content, whatever the value of `selectNumberOnly`
     *
     * @returns {AutoNumeric}
     */

  }, {
    key: "selectInteger",
    value: function selectInteger() {
      var start = 0;
      var isPositive = this.rawValue >= 0; // Negative or positive sign, if any

      if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix || this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix && (this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.prefix || this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.none)) {
        if (this.settings.showPositiveSign && isPositive || // This only exclude the positive sign from being selected
        !isPositive && this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix && this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.left) {
          // And this exclude the negative sign from being selected in this special case : '-€ 1.234,57suffixText'
          start = start + 1;
        }
      } // Currency symbol


      if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix) {
        start = start + this.settings.currencySymbol.length;
      } // Calculate the selection end position


      var elementValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement);
      var end = elementValue.indexOf(this.settings.decimalCharacter);

      if (end === -1) {
        // No decimal character found
        if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) {
          end = elementValue.length - this.settings.currencySymbol.length;
        } else {
          end = elementValue.length;
        } // Trailing negative sign


        if (!isPositive && (this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.suffix || this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix)) {
          end = end - 1;
        } // Avoid selecting the suffix test


        end = end - this.settings.suffixText.length;
      }

      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(this.domElement, start, end);
      return this;
    }
    /**
     * Select only the decimal part in the formatted element content, whatever the value of `selectNumberOnly`
     * Multiple cases are possible :
     * +1.234,57suffixText
     *
     * € +1.234,57suffixText
     * +€ 1.234,57suffixText
     * € 1.234,57+suffixText
     *
     * 1.234,57+ €suffixText
     * 1.234,57 €+suffixText
     * +1.234,57 €suffixText
     *
     * @returns {AutoNumeric}
     */

  }, {
    key: "selectDecimal",
    value: function selectDecimal() {
      var start = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement).indexOf(this.settings.decimalCharacter);
      var end;

      if (start === -1) {
        // The decimal character has not been found, we deselect all
        start = 0;
        end = 0;
      } else {
        // A decimal character has been found
        start = start + 1; // We add 1 to exclude the decimal character from the selection

        var decimalCount;

        if (this.isFocused) {
          decimalCount = this.settings.decimalPlacesShownOnFocus;
        } else {
          decimalCount = this.settings.decimalPlacesShownOnBlur;
        }

        end = start + Number(decimalCount);
      }

      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(this.domElement, start, end);
      return this;
    }
    /**
     * Return the DOM element reference of the autoNumeric-managed element
     *
     * @returns {HTMLElement|HTMLInputElement}
     */

  }, {
    key: "node",
    value: function node() {
      return this.domElement;
    }
    /**
     * Return the DOM element reference of the parent node of the autoNumeric-managed element
     *
     * @returns {HTMLElement|HTMLInputElement|Node}
     */

  }, {
    key: "parent",
    value: function parent() {
      return this.domElement.parentNode;
    }
    /**
     * Detach the current AutoNumeric element from the shared local 'init' list.
     * This means any changes made on that local shared list will not be transmitted to that element anymore.
     * Note : The user can provide another AutoNumeric element, and detach this one instead of the current one.
     *
     * @param {AutoNumeric} otherAnElement
     * @returns {AutoNumeric}
     */

  }, {
    key: "detach",
    value: function detach() {
      var otherAnElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      //FIXME test this
      var domElementToDetach;

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(otherAnElement)) {
        domElementToDetach = otherAnElement.node();
      } else {
        domElementToDetach = this.domElement;
      }

      this._removeFromLocalList(domElementToDetach); //FIXME What happens if the selected dom element does not exist in the list?


      return this;
    }
    /**
     * Attach the given AutoNumeric element to the shared local 'init' list.
     * When doing that, by default the DOM content is left untouched.
     * The user can force a reformat with the new shared list options by passing a second argument to `true`.
     *
     * @param {AutoNumeric} otherAnElement
     * @param {boolean} reFormat
     * @returns {AutoNumeric}
     */

  }, {
    key: "attach",
    value: function attach(otherAnElement) {
      var reFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      //FIXME test this
      this._addToLocalList(otherAnElement.node()); //FIXME Should we make sure the element is not already in the list?


      if (reFormat) {
        otherAnElement.update(this.settings);
      }

      return this;
    }
    /**
     * Format and return the given value, or set the formatted value into the given DOM element if one is passed as an argument.
     * By default, this use the current element settings.
     * The user can override any option of its choosing by passing an option object.
     *
     * @param {number|HTMLElement|HTMLInputElement} valueOrElement
     * @param {null|object} optionOverride
     * @returns {string|null}
     */

  }, {
    key: "formatOther",
    value: function formatOther(valueOrElement) {
      var optionOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      //FIXME test this
      return this._formatOrUnformatOther(true, valueOrElement, optionOverride);
    }
    /**
     * Unformat and return the raw numeric string corresponding to the given value, or directly set the unformatted value into the given DOM element if one is passed as an argument.
     * By default, this use the current element settings.
     * The user can override any option of its choosing by passing an option object.
      * @param {string|HTMLElement|HTMLInputElement} stringOrElement
     * @param {null|object} optionOverride
     * @returns {string|null}
     */

  }, {
    key: "unformatOther",
    value: function unformatOther(stringOrElement) {
      var optionOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      //FIXME test this
      return this._formatOrUnformatOther(false, stringOrElement, optionOverride);
    }
    /**
     * Method that either format or unformat the value of another element.
     *
     * - Format and return the given value, or set the formatted value into the given DOM element if one is passed as an argument.
     * - Unformat and return the raw numeric string corresponding to the given value, or directly set the unformatted value into the given DOM element if one is passed as an argument.
     *
     * By default, this use the current element settings.
     * The user can override any option of its choosing by passing an option object.
     *
     * @param {boolean} isFormatting If set to `true`, then the method formats, otherwise if set to `false`, it unformats
     * @param {number|string|HTMLElement|HTMLInputElement} valueOrStringOrElement
     * @param {null|object} optionOverride
     * @returns {string|null}
     * @private
     */

  }, {
    key: "_formatOrUnformatOther",
    value: function _formatOrUnformatOther(isFormatting, valueOrStringOrElement) {
      var optionOverride = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      //FIXME test this
      // If the user wants to override the current element settings temporarily
      var settingsToUse;

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(optionOverride)) {
        settingsToUse = this._cloneAndMergeSettings(optionOverride);
      } else {
        settingsToUse = this.settings;
      } // Then the unformatting is done...


      var result;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isElement(valueOrStringOrElement)) {
        // ...either directly on the DOM element value
        var elementValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(valueOrStringOrElement);

        if (isFormatting) {
          result = AutoNumeric.format(elementValue, settingsToUse);
        } else {
          result = AutoNumeric.unformat(elementValue, settingsToUse);
        }

        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementValue(valueOrStringOrElement, result); //TODO Use `unformatAndSet` and `formatAndSet`instead

        return null;
      } // ...or on the given value


      if (isFormatting) {
        result = AutoNumeric.format(valueOrStringOrElement, settingsToUse);
      } else {
        result = AutoNumeric.unformat(valueOrStringOrElement, settingsToUse);
      }

      return result;
    }
    /**
     * Use the current AutoNumeric element settings to initialize the DOM element(s) given as a parameter.
     * Doing so will *link* the AutoNumeric elements together since they will share the same local AutoNumeric element list.
     * (cf. prototype pattern : https://en.wikipedia.org/wiki/Prototype_pattern)
     *
     * You can `init` either a single DOM element (in that case an AutoNumeric object will be returned), or an array of DOM elements or a string that will be used as a CSS selector. In the latter cases, an array of AutoNumeric objects will then be returned (or an empty array if nothing gets selected by the CSS selector).
     *
     * Use case : Once you have an AutoNumeric element already setup correctly with the right options, you can use it as many times you want to initialize as many other DOM elements as needed.
     * Note : this works only on elements that can be managed by autoNumeric.
     *
     * @param {HTMLElement|HTMLInputElement|Array<HTMLElement|HTMLInputElement>|string} domElementOrArrayOrString
     * @param {boolean} attached If set to `false`, then the newly generated AutoNumeric element will not share the same local element list
     * @returns {AutoNumeric|[AutoNumeric]}
     */

  }, {
    key: "init",
    value: function init(domElementOrArrayOrString) {
      var _this8 = this;

      var attached = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var returnASingleAutoNumericObject = false; // By default, this function returns an array of AutoNumeric objects

      var domElementsArray = [];

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(domElementOrArrayOrString)) {
        domElementsArray = _toConsumableArray(document.querySelectorAll(domElementOrArrayOrString)); // Convert a NodeList to an Array
      } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isElement(domElementOrArrayOrString)) {
        domElementsArray.push(domElementOrArrayOrString);
        returnASingleAutoNumericObject = true; // Special case when only one DOM element is passed as a parameter
      } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(domElementOrArrayOrString)) {
        domElementsArray = domElementOrArrayOrString;
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given parameters to the 'init' function are invalid.");
      }

      if (domElementsArray.length === 0) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("No valid DOM elements were given hence no AutoNumeric object were instantiated.", true);
        return [];
      }

      var currentLocalList = this._getLocalList();

      var autoNumericObjectsArray = []; // Instantiate (and link depending on `attached`) each AutoNumeric objects

      domElementsArray.forEach(function (domElement) {
        // Initialize the new AutoNumeric element
        var originalCreateLocalListSetting = _this8.settings.createLocalList;

        if (attached) {
          // Temporary variable to know if we should create the local list during the initialization (since we'll remove it afterwards)
          _this8.settings.createLocalList = false;
        }

        var newAutoNumericElement = new AutoNumeric(domElement, _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(domElement), _this8.settings); // Set the common shared local list if needed
        // If the user wants to create a detached new AutoNumeric element, then skip the following step that bind the two elements together by default

        if (attached) {
          // 1) Set the local list reference to point to the initializer's one
          newAutoNumericElement._setLocalList(currentLocalList); // 2) Add the new element to that existing list


          _this8._addToLocalList(domElement, newAutoNumericElement); // Here we use the *new* AutoNumeric object reference to add to the local list, since we'll need the reference to `this` in the methods to points to that new AutoNumeric object.


          _this8.settings.createLocalList = originalCreateLocalListSetting;
        }

        autoNumericObjectsArray.push(newAutoNumericElement);
      });

      if (returnASingleAutoNumericObject) {
        // If a single DOM element was used as the parameter, then we return an AutoNumeric object directly
        return autoNumericObjectsArray[0];
      } // ...otherwise we return an Array of AutoNumeric objects


      return autoNumericObjectsArray;
    }
    /**
     * Reset the element value either to the empty string '', or the currency sign, depending on the `emptyInputBehavior` option value.
     * If you set the `forceClearAll` argument to `true`, then the `emptyInputBehavior` option is overridden and the whole input is clear, including any currency sign.
     *
     * @param {boolean} forceClearAll
     * @returns {AutoNumeric}
     */

  }, {
    key: "clear",
    value: function clear() {
      var forceClearAll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (forceClearAll) {
        var temporaryForcedOptions = {
          emptyInputBehavior: AutoNumeric.options.emptyInputBehavior.focus
        };
        this.set('', temporaryForcedOptions);
      } else {
        this.set('');
      }

      return this;
    }
    /**
     * Remove the autoNumeric data and event listeners from the element, but keep the element content intact.
     * This also clears the value from sessionStorage (or cookie, depending on browser supports).
     * Note: this does not remove the formatting.
     *
     * @example anElement.remove()
     */

  }, {
    key: "remove",
    value: function remove() {
      this._removeValueFromPersistentStorage();

      this._removeEventListeners();

      this._removeWatcher(); // Also remove the element from the local AutoNumeric list


      this._removeFromLocalList(this.domElement); // Also remove the element from the global AutoNumeric list


      this.constructor._removeFromGlobalList(this);
    }
    /**
     * Remove the autoNumeric data and event listeners from the element, and reset its value to the empty string ''.
     * This also clears the value from sessionStorage (or cookie, depending on browser supports).
     *
     * @example anElement.wipe()
     */

  }, {
    key: "wipe",
    value: function wipe() {
      this._setElementValue('', false); // Do not send the 'AutoNumeric.events.formatted' event when wiping an AutoNumeric object


      this.remove();
    }
    /**
     * Remove the autoNumeric data and event listeners from the element, and delete the DOM element altogether
     */

  }, {
    key: "nuke",
    value: function nuke() {
      this.remove(); // Remove the element from the DOM

      this.domElement.parentNode.removeChild(this.domElement);
    } // Special functions that really work on the parent <form> element, instead of the <input> element itself

    /**
     * Return a reference to the parent <form> element if it exists, otherwise return `null`.
     * If the parent form element as already been found, this directly return a reference to it.
     * However, you can force AutoNumeric to search again for its reference by passing `true` as a parameter to this method.
     * This method updates the `this.parentForm` attribute.
     *
     * In either case, whenever a new parent form is set for the current AutoNumeric element, we make sure to update the anCount and anFormHandler attributes on both the old form and the new one (for instance in case the user moved the input elements with `appendChild()` since AutoNumeric cannot not detect that).
     *
     * @param {boolean} forceSearch If set to `true`, the parent form is searched again, even if `this.parentForm` is already set.
     *
     * @returns {HTMLFormElement|null}
     */

  }, {
    key: "form",
    value: function form() {
      var forceSearch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (forceSearch || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(this.parentForm)) {
        var newParentForm = this._getParentForm();

        if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(newParentForm) && newParentForm !== this.parentForm) {
          // If the current parent form exists and is different from the previous parent form
          // Search for all the AutoNumeric elements in the old parent form
          var oldANChildren = this._getFormAutoNumericChildren(this.parentForm); // Update the anCount with the correct number of AutoNumeric elements


          this.parentForm.dataset.anCount = oldANChildren.length; // Check if the new parent form already has a anFormHandler name

          if (this._hasFormHandlerFunction(newParentForm)) {
            this._incrementParentFormCounter(newParentForm); // Increment its counter

          } else {
            // Create one and set the anCount to 1
            this._storeFormHandlerFunction(newParentForm);

            this._initializeFormCounterToOne(newParentForm);
          }
        }

        this.parentForm = newParentForm;
      }

      return this.parentForm;
    }
    /**
     * Return an array of the AutoNumeric-managed elements for the given form element is passed, otherwise for the current `this.parentForm` element.
     *
     * @param {HTMLFormElement|null} formElement
     *
     * @returns {Array.<HTMLInputElement>}
     * @private
     */

  }, {
    key: "_getFormAutoNumericChildren",
    value: function _getFormAutoNumericChildren(formElement) {
      var _this9 = this;

      // Search for all the child AutoNumeric elements in that parent form
      //TODO This only search for <input> elements, not contenteditable non-input tag ones, for now. Add a parameter to allow this function to search on every tags.
      var inputList = _toConsumableArray(formElement.querySelectorAll('input'));

      return inputList.filter(function (input) {
        return _this9.constructor.isManagedByAutoNumeric(input);
      });
    }
    /**
     * Return a reference to the parent <form> element if it exists, otherwise return `null`.
     *
     * @returns {HTMLFormElement|null}
     * @private
     */

  }, {
    key: "_getParentForm",
    value: function _getParentForm() {
      if (this.domElement.tagName.toLowerCase() === 'body') {
        return null;
      }

      var node = this.domElement;
      var tagName;

      do {
        node = node.parentNode;

        if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(node)) {
          // Special case when using templates with frameworks like Vue.js, where the input element can be 'detached' when initializing the DOM structure
          return null;
        }

        if (node.tagName) {
          tagName = node.tagName.toLowerCase();
        } else {
          tagName = '';
        }

        if (tagName === 'body') {
          // Get out of the loop if we get up to the `<body>` element
          break;
        }
      } while (tagName !== 'form');

      if (tagName === 'form') {
        return node;
      } else {
        return null;
      }
    }
    /**
     * Return a string in standard URL-encoded notation with the form input values being unformatted.
     * This string can be used as a query for instance.
     *
     * @returns {string}
     */

  }, {
    key: "formNumericString",
    value: function formNumericString() {
      return this.constructor._serializeNumericString(this.form(), this.settings.serializeSpaces);
    }
    /**
     * Return a string in standard URL-encoded notation with the form input values being formatted.
     *
     * @returns {string}
     */

  }, {
    key: "formFormatted",
    value: function formFormatted() {
      return this.constructor._serializeFormatted(this.form(), this.settings.serializeSpaces);
    }
    /**
     * Return a string in standard URL-encoded notation with the form input values, with localized values.
     * The default output format can be overridden by passing the option as a parameter.
     *
     * @param {null|string} forcedOutputFormat If set to something different than `null`, then this is used as an overriding outputFormat option
     * @returns {string}
     */

  }, {
    key: "formLocalized",
    value: function formLocalized() {
      var forcedOutputFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var outputFormatToUse;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(forcedOutputFormat)) {
        outputFormatToUse = this.settings.outputFormat;
      } else {
        outputFormatToUse = forcedOutputFormat;
      }

      return this.constructor._serializeLocalized(this.form(), this.settings.serializeSpaces, outputFormatToUse);
    }
    /**
     * Return an array containing an object for each form <input> element.
     * Those objects are of the following structure `{ name: foo, value: '42' }`, where the `name` is the DOM element name, and the `value` is an unformatted numeric string.
     *
     * @returns {Array}
     */

  }, {
    key: "formArrayNumericString",
    value: function formArrayNumericString() {
      return this.constructor._serializeNumericStringArray(this.form(), this.settings.serializeSpaces);
    }
    /**
     * Return an array containing an object for each form <input> element.
     * Those objects are of the following structure `{ name: foo, value: '42' }`, where the `name` is the DOM element name, and the `value` is the formatted string.
     *
     * @returns {Array}
     */

  }, {
    key: "formArrayFormatted",
    value: function formArrayFormatted() {
      return this.constructor._serializeFormattedArray(this.form(), this.settings.serializeSpaces);
    }
    /**
     * Return an array containing an object for each form <input> element.
     * Those objects are of the following structure `{ name: foo, value: '42' }`, where the `name` is the DOM element name, and the `value` is the localized numeric string.
     *
     * @param {null|string} forcedOutputFormat If set to something different than `null`, then this is used as an overriding outputFormat option
     * @returns {Array}
     */

  }, {
    key: "formArrayLocalized",
    value: function formArrayLocalized() {
      var forcedOutputFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var outputFormatToUse;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(forcedOutputFormat)) {
        outputFormatToUse = this.settings.outputFormat;
      } else {
        outputFormatToUse = forcedOutputFormat;
      }

      return this.constructor._serializeLocalizedArray(this.form(), this.settings.serializeSpaces, outputFormatToUse);
    }
    /**
     * Return a JSON string containing an object representing the form input values.
     * This is based on the result of the `formArrayNumericString()` function.
     *
     * @returns {string}
     */

  }, {
    key: "formJsonNumericString",
    value: function formJsonNumericString() {
      return JSON.stringify(this.formArrayNumericString());
    }
    /**
     * Return a JSON string containing an object representing the form input values.
     * This is based on the result of the `formArrayFormatted()` function.
     *
     * @returns {string}
     */

  }, {
    key: "formJsonFormatted",
    value: function formJsonFormatted() {
      return JSON.stringify(this.formArrayFormatted());
    }
    /**
     * Return a JSON string containing an object representing the form input values.
     * This is based on the result of the `formArrayLocalized()` function.
     *
     * @param {null|string} forcedOutputFormat If set to something different than `null`, then this is used as an overriding outputFormat option
     * @returns {string}
     */

  }, {
    key: "formJsonLocalized",
    value: function formJsonLocalized() {
      var forcedOutputFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return JSON.stringify(this.formArrayLocalized(forcedOutputFormat));
    }
    /**
     * Unformat all the autoNumeric-managed elements that are a child of the parent <form> element of this DOM element, to numeric strings
     *
     * @returns {AutoNumeric}
     */

  }, {
    key: "formUnformat",
    value: function formUnformat() {
      //FIXME test this
      var inputs = this.constructor._getChildANInputElement(this.form());

      inputs.forEach(function (input) {
        AutoNumeric.getAutoNumericElement(input).unformat();
      });
      return this;
    }
    /**
     * Unformat all the autoNumeric-managed elements that are a child of the parent <form> element of this DOM element, to localized strings
     *
     * @returns {AutoNumeric}
     */

  }, {
    key: "formUnformatLocalized",
    value: function formUnformatLocalized() {
      //FIXME test this
      var inputs = this.constructor._getChildANInputElement(this.form());

      inputs.forEach(function (input) {
        AutoNumeric.getAutoNumericElement(input).unformatLocalized();
      });
      return this;
    }
    /**
     * Reformat all the autoNumeric-managed elements that are a child of the parent <form> element of this DOM element
     *
     * @returns {AutoNumeric}
     */

  }, {
    key: "formReformat",
    value: function formReformat() {
      //FIXME test this
      var inputs = this.constructor._getChildANInputElement(this.form());

      inputs.forEach(function (input) {
        AutoNumeric.getAutoNumericElement(input).reformat();
      });
      return this;
    }
    /**
     * Convert the input values to numeric strings, submit the form, then reformat those back.
     * The function can either take a callback, or not. If it doesn't, the default `form.submit()` function will be called.
     * Otherwise, it runs `callback(value)` with `value` being equal to the result of `formNumericString()`.
     *
     * @param {function|null} callback
     * @returns {AutoNumeric}
     */

  }, {
    key: "formSubmitNumericString",
    value: function formSubmitNumericString() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      //FIXME test this
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(callback)) {
        this.formUnformat();
        this.form().submit();
        this.formReformat();
      } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
        callback(this.formNumericString());
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given callback is not a function.");
      }

      return this;
    }
    /**
     * Submit the form with the current formatted values.
     * The function can either take a callback, or not. If it doesn't, the default `form.submit()` function will be called.
     * Otherwise, it runs `callback(value)` with `value` being equal to the result of `formFormatted()`.
     *
     * @param {function|null} callback
     * @returns {AutoNumeric}
     */

  }, {
    key: "formSubmitFormatted",
    value: function formSubmitFormatted() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      //FIXME test this
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(callback)) {
        this.form().submit();
      } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
        callback(this.formFormatted());
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given callback is not a function.");
      }

      return this;
    }
    /**
     * Convert the input values to localized strings, submit the form, then reformat those back.
     * The function can either take a callback, or not. If it doesn't, the default `form.submit()` function will be called.
     * Otherwise, it runs `callback(value)` with `value` being equal to the result of `formLocalized()`.
     *
     * @param {null|string} forcedOutputFormat If set to something different than `null`, then this is used as an overriding outputFormat option
     * @param {function|null} callback
     * @returns {AutoNumeric}
     */

  }, {
    key: "formSubmitLocalized",
    value: function formSubmitLocalized() {
      var forcedOutputFormat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      //FIXME test this
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(callback)) {
        this.formUnformatLocalized();
        this.form().submit();
        this.formReformat();
      } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
        callback(this.formLocalized(forcedOutputFormat));
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given callback is not a function.");
      }

      return this;
    }
    /**
     * Generate an array of numeric strings from the `<input>` elements, and pass it to the given callback.
     * Under the hood, the array is generated via a call to `formArrayNumericString()`.
     *
     * @param {function} callback
     * @returns {AutoNumeric}
     */

  }, {
    key: "formSubmitArrayNumericString",
    value: function formSubmitArrayNumericString(callback) {
      //FIXME test this
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
        callback(this.formArrayNumericString());
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given callback is not a function.");
      }

      return this;
    }
    /**
     * Generate an array of the current formatted values from the `<input>` elements, and pass it to the given callback.
     * Under the hood, the array is generated via a call to `formArrayFormatted()`.
     *
     * @param {function} callback
     * @returns {AutoNumeric}
     */

  }, {
    key: "formSubmitArrayFormatted",
    value: function formSubmitArrayFormatted(callback) {
      //FIXME test this
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
        callback(this.formArrayFormatted());
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given callback is not a function.");
      }

      return this;
    }
    /**
     * Generate an array of localized strings from the `<input>` elements, and pass it to the given callback.
     * Under the hood, the array is generated via a call to `formArrayLocalized()`.
     *
     * @param {function} callback
     * @param {null|string} forcedOutputFormat If set to something different than `null`, then this is used as an overriding outputFormat option
     * @returns {AutoNumeric}
     */

  }, {
    key: "formSubmitArrayLocalized",
    value: function formSubmitArrayLocalized(callback) {
      var forcedOutputFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      //FIXME test this
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
        callback(this.formArrayLocalized(forcedOutputFormat));
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given callback is not a function.");
      }

      return this;
    }
    /**
     * Generate a JSON string with the numeric strings values from the `<input>` elements, and pass it to the given callback.
     * Under the hood, the array is generated via a call to `formJsonNumericString()`.
     *
     * @param {function} callback
     * @returns {AutoNumeric}
     */

  }, {
    key: "formSubmitJsonNumericString",
    value: function formSubmitJsonNumericString(callback) {
      //FIXME test this
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
        callback(this.formJsonNumericString());
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given callback is not a function.");
      }

      return this;
    }
    /**
     * Generate a JSON string with the current formatted values from the `<input>` elements, and pass it to the given callback.
     * Under the hood, the array is generated via a call to `formJsonFormatted()`.
     *
     * @param {function} callback
     * @returns {AutoNumeric}
     */

  }, {
    key: "formSubmitJsonFormatted",
    value: function formSubmitJsonFormatted(callback) {
      //FIXME test this
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
        callback(this.formJsonFormatted());
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given callback is not a function.");
      }

      return this;
    }
    /**
     * Generate a JSON string with the localized strings values from the `<input>` elements, and pass it to the given callback.
     * Under the hood, the array is generated via a call to `formJsonLocalized()`.
     *
     * @param {function} callback
     * @param {null|string} forcedOutputFormat If set to something different than `null`, then this is used as an overriding outputFormat option
     * @returns {AutoNumeric}
     */

  }, {
    key: "formSubmitJsonLocalized",
    value: function formSubmitJsonLocalized(callback) {
      var forcedOutputFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      //FIXME test this
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(callback)) {
        callback(this.formJsonLocalized(forcedOutputFormat));
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given callback is not a function.");
      }

      return this;
    }
    /**
     * Unformat the given AutoNumeric element, and update the `hoveredWithAlt` variable.
     *
     * @param {AutoNumeric} anElement
     * @private
     */

  }, {
    key: "_createLocalList",

    /**
     * Create a `Map` that will stores all the autoNumeric elements that are initialized from this current element.
     * @private
     */
    value: function _createLocalList() {
      this.autoNumericLocalList = new Map();

      this._addToLocalList(this.domElement);
    }
    /**
     * In some rare cases, you could want to delete the local list generated during the element initialization (in order to use another one instead for instance).
     * @private
     */

  }, {
    key: "_deleteLocalList",
    value: function _deleteLocalList() {
      delete this.autoNumericLocalList;
    }
    /**
     * Set the local list with the given Map object.
     *
     * @param {Map} localList
     * @private
     */

  }, {
    key: "_setLocalList",
    value: function _setLocalList(localList) {
      this.autoNumericLocalList = localList;
    }
    /**
     * Return the local list Map object.
     *
     * @returns {*|Map}
     * @private
     */

  }, {
    key: "_getLocalList",
    value: function _getLocalList() {
      return this.autoNumericLocalList;
    }
    /**
     * Return `true` if the AutoNumeric object has a local list defined already and has at least one element in it (itself usually).
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_hasLocalList",
    value: function _hasLocalList() {
      return this.autoNumericLocalList instanceof Map && this.autoNumericLocalList.size !== 0;
    }
    /**
     * Add the given object to the local autoNumeric element list.
     * Note: in order to keep a coherent list, we only add DOM elements in it, not the autoNumeric object.
     *
     * @param {HTMLElement|HTMLInputElement} domElement
     * @param {AutoNumeric} autoNumericObject A reference to the AutoNumeric object that manage the given DOM element
     * @throws
     * @private
     */

  }, {
    key: "_addToLocalList",
    value: function _addToLocalList(domElement) {
      var autoNumericObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(autoNumericObject)) {
        autoNumericObject = this;
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(this.autoNumericLocalList)) {
        this.autoNumericLocalList.set(domElement, autoNumericObject); // Use the DOM element as key, and the AutoNumeric object as the value
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The local list provided does not exists when trying to add an element. [".concat(this.autoNumericLocalList, "] given."));
      }
    }
    /**
     * Remove the given object from the local autoNumeric element list.
     *
     * @param {HTMLElement|HTMLInputElement} domElement
     * @private
     */

  }, {
    key: "_removeFromLocalList",
    value: function _removeFromLocalList(domElement) {
      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(this.autoNumericLocalList)) {
        this.autoNumericLocalList["delete"](domElement);
      } else if (this.settings.createLocalList) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The local list provided does not exists when trying to remove an element. [".concat(this.autoNumericLocalList, "] given."));
      }
    }
    /**
     * Merge the `newSettings` given as parameters into the current element settings.
     *
     * WARNING: Using `Object.assign()` here means the merge is not recursive and only one depth is merged.
     * cf. http://stackoverflow.com/a/39188108/2834898
     * cf. tests on http://codepen.io/AnotherLinuxUser/pen/KaJORq?editors=0011
     *
     * @param {object} newSettings
     * @private
     */

  }, {
    key: "_mergeSettings",
    value: function _mergeSettings() {
      for (var _len3 = arguments.length, newSettings = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        newSettings[_key3] = arguments[_key3];
      }

      _extends.apply(void 0, [this.settings].concat(newSettings));
    }
    /**
     * Return a new object with the current element settings merged with the new settings.
     *
     * @param {object} newSettings
     * @returns {object}
     * @private
     */

  }, {
    key: "_cloneAndMergeSettings",
    value: function _cloneAndMergeSettings() {
      var result = {};

      for (var _len4 = arguments.length, newSettings = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        newSettings[_key4] = arguments[_key4];
      }

      _extends.apply(void 0, [result, this.settings].concat(newSettings));

      return result;
    }
    /**
     * Validate the given option object.
     * If the options are valid, this function returns nothing, otherwise if the options are invalid, this function throws an error.
     *
     * This tests if the options are not conflicting and are well formatted.
     * This function is lenient since it only tests the settings properties ; it ignores any other properties the options object could have.
     *
     * @param {*} userOptions
     * @param {Boolean} shouldExtendDefaultOptions If `true`, then this function will extends the `userOptions` passed by the user, with the default options.
     * @param {object|null} originalOptions The user can pass the original options (and not the one that are generated from the default settings and the various usability corrections), in order to add compatibility and conflicts checks.
     * @throws Error This throws if the `userOptions` are not valid
     */

  }, {
    key: "_updatePredefinedOptions",
    // Pre-defined options can be called to update the current default options with their specificities
    //XXX A better way would be to not initialize first, but that's not possible since `new` is called first and we do not pass the language options (ie. `French`) to the constructor

    /**
     * Update the AutoNumeric object with the predefined options, and possibly some option overrides.
     *
     * @param {object} predefinedOption
     * @param {object} optionOverride
     * @private
     * @returns {AutoNumeric}
     */
    value: function _updatePredefinedOptions(predefinedOption) {
      var optionOverride = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(optionOverride)) {
        this._mergeSettings(predefinedOption, optionOverride);

        this.update(this.settings);
      } else {
        this.update(predefinedOption);
      }

      return this;
    }
    /**
     * Update the settings to use the French pre-defined language options.
     * Those pre-defined options can be overridden by passing an option object as a parameter.
     *
     * @param {object} optionOverride
     * @returns {AutoNumeric}
     */

  }, {
    key: "french",
    value: function french() {
      var optionOverride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._updatePredefinedOptions(AutoNumeric.getPredefinedOptions().French, optionOverride);

      return this;
    }
    /**
     * Update the settings to use the North American pre-defined language options.
     * Those pre-defined options can be overridden by passing an option object as a parameter.
     *
     * @param {object} optionOverride
     * @returns {AutoNumeric}
     */

  }, {
    key: "northAmerican",
    value: function northAmerican() {
      var optionOverride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._updatePredefinedOptions(AutoNumeric.getPredefinedOptions().NorthAmerican, optionOverride);

      return this;
    }
    /**
     * Update the settings to use the British pre-defined language options.
     * Those pre-defined options can be overridden by passing an option object as a parameter.
     *
     * @param {object} optionOverride
     * @returns {AutoNumeric}
     */

  }, {
    key: "british",
    value: function british() {
      var optionOverride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._updatePredefinedOptions(AutoNumeric.getPredefinedOptions().British, optionOverride);

      return this;
    }
    /**
     * Update the settings to use the Swiss pre-defined language options.
     * Those pre-defined options can be overridden by passing an option object as a parameter.
     *
     * @param {object} optionOverride
     * @returns {AutoNumeric}
     */

  }, {
    key: "swiss",
    value: function swiss() {
      var optionOverride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._updatePredefinedOptions(AutoNumeric.getPredefinedOptions().Swiss, optionOverride);

      return this;
    }
    /**
     * Update the settings to use the Japanese pre-defined language options.
     * Those pre-defined options can be overridden by passing an option object as a parameter.
     *
     * @param {object} optionOverride
     * @returns {AutoNumeric}
     */

  }, {
    key: "japanese",
    value: function japanese() {
      var optionOverride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._updatePredefinedOptions(AutoNumeric.getPredefinedOptions().Japanese, optionOverride);

      return this;
    }
    /**
     * Update the settings to use the Spanish pre-defined language options.
     * Those pre-defined options can be overridden by passing an option object as a parameter.
     *
     * @param {object} optionOverride
     * @returns {AutoNumeric}
     */

  }, {
    key: "spanish",
    value: function spanish() {
      var optionOverride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._updatePredefinedOptions(AutoNumeric.getPredefinedOptions().Spanish, optionOverride);

      return this;
    }
    /**
     * Update the settings to use the Chinese pre-defined language options.
     * Those pre-defined options can be overridden by passing an option object as a parameter.
     *
     * @param {object} optionOverride
     * @returns {AutoNumeric}
     */

  }, {
    key: "chinese",
    value: function chinese() {
      var optionOverride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._updatePredefinedOptions(AutoNumeric.getPredefinedOptions().Chinese, optionOverride);

      return this;
    }
    /**
     * Update the settings to use the Brazilian pre-defined language options.
     * Those pre-defined options can be overridden by passing an option object as a parameter.
     *
     * @param {object} optionOverride
     * @returns {AutoNumeric}
     */

  }, {
    key: "brazilian",
    value: function brazilian() {
      var optionOverride = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._updatePredefinedOptions(AutoNumeric.getPredefinedOptions().Brazilian, optionOverride);

      return this;
    } // Internal private functions

    /**
     * Run any callbacks found in the settings object in order to set the settings value back.
     * Any parameter can have a callback defined.
     * The callback takes the current AutoNumeric element as the first argument, and the key name as the second.
     * @example callback(this, 'currencySymbol')
     */

  }, {
    key: "_runCallbacksFoundInTheSettingsObject",
    value: function _runCallbacksFoundInTheSettingsObject() {
      //FIXME test this
      // Loops through the this.settings object (option array) to find the following
      for (var key in this.settings) {
        if (Object.prototype.hasOwnProperty.call(this.settings, key)) {
          var value = this.settings[key];

          if (typeof value === 'function') {
            this.settings[key] = value(this, key);
          } else {
            // Calls the attached function from the html5 data. For instance: <tag data-currency-symbol="functionName"></tag>
            var htmlAttribute = this.domElement.getAttribute(key); //TODO Use `dataset` instead of `getAttribute` when we won't need to support obsolete browsers

            htmlAttribute = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].camelize(htmlAttribute);

            if (typeof this.settings[htmlAttribute] === 'function') {
              this.settings[key] = htmlAttribute(this, key);
            }
          }
        }
      }
    }
    /**
     * Keep track if the settings configuration leads to a trailing negative sign (only when the raw value is negative), so we do not have to test the settings values every time we need to know that.
     * `isTrailingNegative` is set to `true` if the settings result in a trailing negative character, `false` otherwise.
     * Note: This returns `true` even if the raw value is positive.
     * @private
     */

  }, {
    key: "_setTrailingNegativeSignInfo",
    value: function _setTrailingNegativeSignInfo() {
      this.isTrailingNegative = this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix && this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.suffix || this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix && (this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.left || this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.right);
    }
    /**
     * Strip all the unwanted non-number characters.
     * However it does not reorder the localized negative sign.
     *
     * @param {string} s
     * @param {object} settings
     * @param {boolean} stripZeros If set to `false`, then the leading zero(s) are not stripped, otherwise if set to `true`, the `leadingZero` option is followed
     * @param {boolean} isFocused If the element is focused, then this is `true`
     * @returns {string}
     * @private
     */

  }, {
    key: "_modifyNegativeSignAndDecimalCharacterForRawValue",

    /**
     * Modify the negative sign and the decimal character of the given string value to an hyphen (-) and a dot (.) in order to make that value 'typecastable' to a real number.
     *
     * @param {string} s The formatted value
     * @returns {string} The value with the 'normal' minus sign and decimal character
     */
    value: function _modifyNegativeSignAndDecimalCharacterForRawValue(s) {
      if (this.settings.decimalCharacter !== '.') {
        s = s.replace(this.settings.decimalCharacter, '.');
      }

      if (this.settings.negativeSignCharacter !== '-' && this.settings.isNegativeSignAllowed) {
        s = s.replace(this.settings.negativeSignCharacter, '-');
      }

      if (!s.match(/\d/)) {
        // The default value returned by `get` is not formatted with decimals
        s += '0';
      }

      return s;
    }
    /**
     * Modify the negative sign and the decimal character to use those defined in the settings.
     *
     * @param {string} s
     * @param {object} settings
     * @returns {string}
     */

  }, {
    key: "_initialCaretPosition",

    /**
     * Calculate where to put the caret position on focus if the element content is not selected.
     * This calculation is affected by the `caretPositionOnFocus` option which can be either `null`, `'start'`, `'end'`, `'decimalLeft'` or 'decimalRight'`, and will decide where to put the caret (on the left or right of the value or the decimal character, respectively) :
     * - `null` : the caret position is not forced
     * - `'start'` : the caret is positioned on the left hand side of the value
     * - `'end'` : the caret is positioned on the right hand side of the value
     * - `'decimalLeft'` : the caret is positioned on the left side of the decimal character
     * - `'decimalRight'` : the caret is positioned on the right side of the decimal character
     *
     * @param {string} value The formatted string stripped of the currency symbol and negative/positive sign
     * @returns {number}
     * @throws
     * @private
     */
    value: function _initialCaretPosition(value) {
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(this.settings.caretPositionOnFocus) && this.settings.selectOnFocus === AutoNumeric.options.selectOnFocus.doNotSelect) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError('`_initialCaretPosition()` should never be called when the `caretPositionOnFocus` option is `null`.');
      }

      var isValueNegative = this.rawValue < 0;
      var isZeroOrHasNoValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isZeroOrHasNoValue(value);
      var totalLength = value.length;
      var valueSize = 0;
      var integerSize = 0;
      var hasDecimalChar = false;
      var offsetDecimalChar = 0;

      if (this.settings.caretPositionOnFocus !== AutoNumeric.options.caretPositionOnFocus.start) {
        value = value.replace(this.settings.negativeSignCharacter, '');
        value = value.replace(this.settings.positiveSignCharacter, '');
        value = value.replace(this.settings.currencySymbol, '');
        valueSize = value.length;
        hasDecimalChar = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(value, this.settings.decimalCharacter);

        if (this.settings.caretPositionOnFocus === AutoNumeric.options.caretPositionOnFocus.decimalLeft || this.settings.caretPositionOnFocus === AutoNumeric.options.caretPositionOnFocus.decimalRight) {
          if (hasDecimalChar) {
            integerSize = value.indexOf(this.settings.decimalCharacter);
            offsetDecimalChar = this.settings.decimalCharacter.length;
          } else {
            integerSize = valueSize;
            offsetDecimalChar = 0;
          }
        }
      }

      var signToUse = '';

      if (isValueNegative) {
        signToUse = this.settings.negativeSignCharacter;
      } else if (this.settings.showPositiveSign && !isZeroOrHasNoValue) {
        signToUse = this.settings.positiveSignCharacter;
      }

      var positiveNegativeSignSize = signToUse.length;
      var currencySymbolSize = this.settings.currencySymbol.length; // Calculate the caret position based on `currencySymbolPlacement`, `negativePositiveSignPlacement` and `caretPositionOnFocus`

      var caretPosition;

      if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix) {
        if (this.settings.caretPositionOnFocus === AutoNumeric.options.caretPositionOnFocus.start) {
          if (this.settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.none && (isValueNegative || !isValueNegative && this.settings.showPositiveSign && !isZeroOrHasNoValue)) {
            switch (this.settings.negativePositiveSignPlacement) {
              case AutoNumeric.options.negativePositiveSignPlacement.prefix: // +€|12.34

              case AutoNumeric.options.negativePositiveSignPlacement.left: // +€|12.34

              case AutoNumeric.options.negativePositiveSignPlacement.right:
                // €+|12.34
                caretPosition = positiveNegativeSignSize + currencySymbolSize;
                break;

              case AutoNumeric.options.negativePositiveSignPlacement.suffix:
                // €|12.34+
                caretPosition = currencySymbolSize;
                break;
            }
          } else {
            // €|12.34
            caretPosition = currencySymbolSize;
          }
        } else if (this.settings.caretPositionOnFocus === AutoNumeric.options.caretPositionOnFocus.end) {
          if (this.settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.none && (isValueNegative || !isValueNegative && this.settings.showPositiveSign && !isZeroOrHasNoValue)) {
            switch (this.settings.negativePositiveSignPlacement) {
              case AutoNumeric.options.negativePositiveSignPlacement.prefix: // +€12.34|

              case AutoNumeric.options.negativePositiveSignPlacement.left: // +€12.34|

              case AutoNumeric.options.negativePositiveSignPlacement.right:
                // €+12.34|
                caretPosition = totalLength;
                break;

              case AutoNumeric.options.negativePositiveSignPlacement.suffix:
                // €12.34|+
                caretPosition = currencySymbolSize + valueSize;
                break;
            }
          } else {
            // €12.34|
            caretPosition = totalLength;
          }
        } else if (this.settings.caretPositionOnFocus === AutoNumeric.options.caretPositionOnFocus.decimalLeft) {
          if (this.settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.none && (isValueNegative || !isValueNegative && this.settings.showPositiveSign && !isZeroOrHasNoValue)) {
            switch (this.settings.negativePositiveSignPlacement) {
              case AutoNumeric.options.negativePositiveSignPlacement.prefix: // +€12|.34

              case AutoNumeric.options.negativePositiveSignPlacement.left: // +€12|.34

              case AutoNumeric.options.negativePositiveSignPlacement.right:
                // €+12|.34
                caretPosition = positiveNegativeSignSize + currencySymbolSize + integerSize;
                break;

              case AutoNumeric.options.negativePositiveSignPlacement.suffix:
                // €12|.34+
                caretPosition = currencySymbolSize + integerSize;
                break;
            }
          } else {
            // €12|.34
            caretPosition = currencySymbolSize + integerSize;
          }
        } else if (this.settings.caretPositionOnFocus === AutoNumeric.options.caretPositionOnFocus.decimalRight) {
          if (this.settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.none && (isValueNegative || !isValueNegative && this.settings.showPositiveSign && !isZeroOrHasNoValue)) {
            switch (this.settings.negativePositiveSignPlacement) {
              case AutoNumeric.options.negativePositiveSignPlacement.prefix: // +€12.|34

              case AutoNumeric.options.negativePositiveSignPlacement.left: // +€12.|34

              case AutoNumeric.options.negativePositiveSignPlacement.right:
                // €+12.|34
                caretPosition = positiveNegativeSignSize + currencySymbolSize + integerSize + offsetDecimalChar;
                break;

              case AutoNumeric.options.negativePositiveSignPlacement.suffix:
                // €12.|34+
                caretPosition = currencySymbolSize + integerSize + offsetDecimalChar;
                break;
            }
          } else {
            // €12.|34
            caretPosition = currencySymbolSize + integerSize + offsetDecimalChar;
          }
        }
      } else if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) {
        if (this.settings.caretPositionOnFocus === AutoNumeric.options.caretPositionOnFocus.start) {
          if (this.settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.none && (isValueNegative || !isValueNegative && this.settings.showPositiveSign && !isZeroOrHasNoValue)) {
            switch (this.settings.negativePositiveSignPlacement) {
              case AutoNumeric.options.negativePositiveSignPlacement.suffix: // |12.34€+

              case AutoNumeric.options.negativePositiveSignPlacement.right: // |12.34€+

              case AutoNumeric.options.negativePositiveSignPlacement.left:
                // |12.34+€
                caretPosition = 0;
                break;

              case AutoNumeric.options.negativePositiveSignPlacement.prefix:
                // +|12.34€
                caretPosition = positiveNegativeSignSize;
                break;
            }
          } else {
            // |12.34€
            caretPosition = 0;
          }
        } else if (this.settings.caretPositionOnFocus === AutoNumeric.options.caretPositionOnFocus.end) {
          if (this.settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.none && (isValueNegative || !isValueNegative && this.settings.showPositiveSign && !isZeroOrHasNoValue)) {
            switch (this.settings.negativePositiveSignPlacement) {
              case AutoNumeric.options.negativePositiveSignPlacement.suffix: // 12.34|€+

              case AutoNumeric.options.negativePositiveSignPlacement.right: // 12.34|€+

              case AutoNumeric.options.negativePositiveSignPlacement.left:
                // 12.34|+€
                caretPosition = valueSize;
                break;

              case AutoNumeric.options.negativePositiveSignPlacement.prefix:
                // +12.34|€
                caretPosition = positiveNegativeSignSize + valueSize;
                break;
            }
          } else {
            // 12.34|€
            caretPosition = valueSize;
          }
        } else if (this.settings.caretPositionOnFocus === AutoNumeric.options.caretPositionOnFocus.decimalLeft) {
          if (this.settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.none && (isValueNegative || !isValueNegative && this.settings.showPositiveSign && !isZeroOrHasNoValue)) {
            switch (this.settings.negativePositiveSignPlacement) {
              case AutoNumeric.options.negativePositiveSignPlacement.suffix: // 12|.34€+

              case AutoNumeric.options.negativePositiveSignPlacement.right: // 12|.34€+

              case AutoNumeric.options.negativePositiveSignPlacement.left:
                // 12|.34+€
                caretPosition = integerSize;
                break;

              case AutoNumeric.options.negativePositiveSignPlacement.prefix:
                // +12|.34€
                caretPosition = positiveNegativeSignSize + integerSize;
                break;
            }
          } else {
            // 12|.34€
            caretPosition = integerSize;
          }
        } else if (this.settings.caretPositionOnFocus === AutoNumeric.options.caretPositionOnFocus.decimalRight) {
          if (this.settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.none && (isValueNegative || !isValueNegative && this.settings.showPositiveSign && !isZeroOrHasNoValue)) {
            switch (this.settings.negativePositiveSignPlacement) {
              case AutoNumeric.options.negativePositiveSignPlacement.suffix: // 12.|34€+

              case AutoNumeric.options.negativePositiveSignPlacement.right: // 12.|34€+

              case AutoNumeric.options.negativePositiveSignPlacement.left:
                // 12.|34+€
                caretPosition = integerSize + offsetDecimalChar;
                break;

              case AutoNumeric.options.negativePositiveSignPlacement.prefix:
                // +12.|34€
                caretPosition = positiveNegativeSignSize + integerSize + offsetDecimalChar;
                break;
            }
          } else {
            // 12.|34€
            caretPosition = integerSize + offsetDecimalChar;
          }
        }
      }

      return caretPosition;
    }
    /**
     * Truncate the trailing zeroes to the given number of decimal places
     *
     * @param {string} roundedInputValue
     * @param {int} decimalPlacesNeeded The number of decimal places to keep
     * @returns {string}
     */

  }, {
    key: "_triggerRangeEvents",

    /**
     * Helper function that triggers the range events if they are needed
     *
     * @param {boolean} minTest
     * @param {boolean} maxTest
     * @private
     */
    value: function _triggerRangeEvents(minTest, maxTest) {
      if (!minTest) {
        this._triggerEvent(AutoNumeric.events.minRangeExceeded, this.domElement);
      }

      if (!maxTest) {
        this._triggerEvent(AutoNumeric.events.maxRangeExceeded, this.domElement);
      }
    }
    /**
     * Set the invalid state on the AutoNumeric element.
     * If the element is not an input, and therefore a contenteditable-enabled element, its validity state cannot be changed.
     * In that case, the invalid css class defined with the `settings.invalidClass` option is added to the element.
     * The 'autoNumeric:invalidValue' event is always sent when this function is called.
     *
     * @private
     */

  }, {
    key: "_setInvalidState",
    value: function _setInvalidState() {
      if (this.isInputElement) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setInvalidState(this.domElement);
      } else {
        this._addCSSClass(this.settings.invalidClass);
      }

      this._triggerEvent(AutoNumeric.events.invalidValue, this.domElement);

      this.validState = false;
    }
    /**
     * Set the valid state on the AutoNumeric element.
     * If the element is not an input, and therefore a contenteditable-enabled element, its validity state cannot be changed.
     * In that case, the invalid css class defined with the `settings.invalidClass` option is removed.
     * The 'autoNumeric:correctedValue' event is sent if the element state is invalid when this is called.
     *
     * @private
     */

  }, {
    key: "_setValidState",
    value: function _setValidState() {
      if (this.isInputElement) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setValidState(this.domElement);
      } else {
        this._removeCSSClass(this.settings.invalidClass);
      }

      if (!this.validState) {
        this._triggerEvent(AutoNumeric.events.correctedValue, this.domElement);
      }

      this.validState = true;
    }
    /**
     * Sets the valid or invalid state on the DOM element, if the value is within the range set by the minimum and maximum value
     *
     * @param {string} value
     * @private
     */

  }, {
    key: "_setValidOrInvalidState",
    value: function _setValidOrInvalidState(value) {
      if (this.settings.overrideMinMaxLimits === AutoNumeric.options.overrideMinMaxLimits.invalid) {
        var minRangeOk = this.constructor._isMinimumRangeRespected(value, this.settings);

        var maxRangeOk = this.constructor._isMaximumRangeRespected(value, this.settings);

        if (minRangeOk && maxRangeOk) {
          this._setValidState();
        } else {
          this._setInvalidState();
        }

        this._triggerRangeEvents(minRangeOk, maxRangeOk);
      }
    }
    /**
     * Original settings saved for use when the `decimalPlacesShownOnFocus` and `showOnlyNumbersOnFocus` options are used.
     * Those original settings are used exclusively in the `focusin` and `focusout` event handlers.
     */

  }, {
    key: "_keepAnOriginalSettingsCopy",
    value: function _keepAnOriginalSettingsCopy() {
      this.originalDigitGroupSeparator = this.settings.digitGroupSeparator;
      this.originalCurrencySymbol = this.settings.currencySymbol;
      this.originalSuffixText = this.settings.suffixText;
    }
    /**
     * Original settings saved for use when `decimalPlacesShownOnFocus` & `showOnlyNumbersOnFocus` options are being used.
     * This is taken from Quirksmode.
     *
     * @param {string} name
     * @returns {*}
     */

  }, {
    key: "_trimLeadingAndTrailingZeros",

    /**
     * Removes any zeros in excess in the front and back of the given `value`, according to the `settings`.
     * This also manages the cases where the decimal point is on the far left or far right of the `value`.
     *
     * @param {string} value
     * @returns {string|null}
     */
    value: function _trimLeadingAndTrailingZeros(value) {
      // Return the empty string is the value is already empty. This prevent converting that value to '0'.
      if (value === '' || value === null) {
        return value;
      }

      if (this.settings.leadingZero !== AutoNumeric.options.leadingZero.keep) {
        if (Number(value) === 0) {
          // Return '0' if the value is zero
          return '0';
        } // Trim the leading zeros, while leaving one zero to the left of the decimal point if needed


        value = value.replace(/^(-)?0+(?=\d)/g, '$1');
      } //TODO remove this from that function and use `trimPaddedZerosFromDecimalPlaces()` instead
      // Trim the trailing zeros after the last decimal place not being a zero (ie. 1.2300 -> 1.23)


      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(value, '.')) {
        value = value.replace(/(\.[0-9]*?)0+$/, '$1');
      } // Remove any trailing decimal point


      value = value.replace(/\.$/, '');
      return value;
    }
    /**
     * Generate the name for the persistent stored data variable
     * @private
     */

  }, {
    key: "_setPersistentStorageName",
    value: function _setPersistentStorageName() {
      if (this.settings.saveValueToSessionStorage) {
        if (this.domElement.name !== '' && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(this.domElement.name)) {
          this.rawValueStorageName = "".concat(this.storageNamePrefix).concat(decodeURIComponent(this.domElement.name));
        } else {
          this.rawValueStorageName = "".concat(this.storageNamePrefix).concat(this.domElement.id);
        }
      }
    }
    /**
     * Save the raw Value into sessionStorage or a cookie depending on what the browser is supporting.
     * @private
     */

  }, {
    key: "_saveValueToPersistentStorage",
    value: function _saveValueToPersistentStorage() {
      if (this.settings.saveValueToSessionStorage) {
        if (this.sessionStorageAvailable) {
          sessionStorage.setItem(this.rawValueStorageName, this.rawValue);
        } else {
          // Use cookies for obsolete browsers that do not support sessionStorage (ie. IE 6 & 7)
          document.cookie = "".concat(this.rawValueStorageName, "=").concat(this.rawValue, "; expires= ; path=/");
        }
      }
    }
    /**
     * Retrieve the raw value from sessionStorage or the cookie depending on what the browser is supporting.
     *
     * @returns {*}
     * @private
     */

  }, {
    key: "_getValueFromPersistentStorage",
    value: function _getValueFromPersistentStorage() {
      if (this.settings.saveValueToSessionStorage) {
        var result;

        if (this.sessionStorageAvailable) {
          result = sessionStorage.getItem(this.rawValueStorageName);
        } else {
          result = this.constructor._readCookie(this.rawValueStorageName);
        }

        return result;
      }

      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning('`_getValueFromPersistentStorage()` is called but `settings.saveValueToSessionStorage` is false. There must be an error that needs fixing.', this.settings.showWarnings);
      return null;
    }
    /**
     * Remove the raw value data from sessionStorage or the cookie depending on what the browser is supporting.
     * @private
     */

  }, {
    key: "_removeValueFromPersistentStorage",
    value: function _removeValueFromPersistentStorage() {
      if (this.settings.saveValueToSessionStorage) {
        if (this.sessionStorageAvailable) {
          sessionStorage.removeItem(this.rawValueStorageName);
        } else {
          var date = new Date();
          date.setTime(date.getTime() - 86400000); // -86400000 === -1 * 24 * 60 * 60 * 1000

          var expires = "; expires=".concat(date.toUTCString());
          document.cookie = "".concat(this.rawValueStorageName, "='' ;").concat(expires, "; path=/");
        }
      }
    }
    /**
     * Get the default value from the html `value` attribute.
     * Return the empty string if such attribute is not found.
     *
     * @param {HTMLElement} domElement
     *
     * @returns {string}
     * @private
     */

  }, {
    key: "_getDefaultValue",
    value: function _getDefaultValue(domElement) {
      // Get the default html value
      // Note: we do not use the simpler `return domElement.defaultValue;` code since the given domElement can sometime be a `contenteditable` element which does not support the `defaultValue` attribute.
      var value = domElement.getAttribute('value');

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(value)) {
        return '';
      }

      return value;
    }
    /**
     * Handler for 'focusin' and 'mouseenter' events
     * On focusin, multiple things happens :
     * - If `Alt` is pressed, unformat
     * - Remove the separators if `showOnlyNumbersOnFocus` is set
     * - Depending on `emptyInputBehavior`, reformat the empty formatted value
     * - Display the correct number of decimal places (on focus/blur)
     * - Place the caret correctly if the element is empty
     *
     * Note: On focusin, the `rawValue` is never changed. Only the formatted value can be modified.
     *
     * @param {KeyboardEvent|MouseEvent} e
     * @private
     */

  }, {
    key: "_onFocusInAndMouseEnter",
    value: function _onFocusInAndMouseEnter(e) {
      //TODO Create separate handlers for the focus and mouseenter events
      this.isEditing = false; // Just in case no `keyUp` event have been sent (ie. if the user lost the focus from the current window while typing)

      if (!this.formulaMode && this.settings.unformatOnHover && e.type === 'mouseenter' && e.altKey) {
        this.constructor._unformatAltHovered(this);

        return;
      }

      if (e.type === 'focus') {
        //TODO Move that back to the 'focus' event handler when the separation between the 'focus' and 'mouseenter' handler will be done
        // Keep track if the element is currently focused
        this.isFocused = true;
        this.rawValueOnFocus = this.rawValue; // Keep track of the initial rawValue. This is needed to define if a change event must be dispatched later
      }

      if (e.type === 'focus' && this.settings.unformatOnHover && this.hoveredWithAlt) {
        this.constructor._reformatAltHovered(this);
      }

      if (e.type === 'focus' || e.type === 'mouseenter' && !this.isFocused) {
        var elementValueToSet = null; // Store the value we want to set on the element, and only call `_setElementValue()` once

        if (this.settings.emptyInputBehavior === AutoNumeric.options.emptyInputBehavior.focus && this.rawValue < 0 && this.settings.negativeBracketsTypeOnBlur !== null && this.settings.isNegativeSignAllowed) {
          //FIXME this is called a second time in _addGroupSeparators too. Prevent this, if possible.
          // Only remove the brackets if the value is negative
          elementValueToSet = this.constructor._removeBrackets(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement), this.settings); //FIXME The element value is set here, why continue and set it again later in that same parent logic block?
        } // Use the `rawValue`, multiplied by `rawValueDivisor` if defined


        var rawValueToFormat = this._getRawValueToFormat(this.rawValue); // Modify the element value according to the number of decimal places to show on focus or the `showOnlyNumbersOnFocus` option


        if (rawValueToFormat !== '') {
          // Round the given value according to the object state (focus/unfocused)
          var roundedValue = this.constructor._roundFormattedValueShownOnFocusOrBlur(rawValueToFormat, this.settings, this.isFocused);

          if (this.settings.showOnlyNumbersOnFocus === AutoNumeric.options.showOnlyNumbersOnFocus.onlyNumbers) {
            //TODO Use a `this.settingsOverride` object instead of modifying the `this.settings` object
            this.settings.digitGroupSeparator = '';
            this.settings.currencySymbol = '';
            this.settings.suffixText = '';
            elementValueToSet = roundedValue.replace('.', this.settings.decimalCharacter);
          } else {
            var formattedValue;

            if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(roundedValue)) {
              formattedValue = '';
            } else {
              formattedValue = this.constructor._addGroupSeparators(roundedValue.replace('.', this.settings.decimalCharacter), this.settings, this.isFocused, rawValueToFormat);
            }

            elementValueToSet = formattedValue;
          }
        } // In order to send a 'native' change event when blurring the input, we need to first store the initial input value on focus.


        if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(elementValueToSet)) {
          this.valueOnFocus = '';
        } else {
          this.valueOnFocus = elementValueToSet;
        }

        this.lastVal = this.valueOnFocus;

        var isEmptyValue = this.constructor._isElementValueEmptyOrOnlyTheNegativeSign(this.valueOnFocus, this.settings);

        var orderedValue = this.constructor._orderValueCurrencySymbolAndSuffixText(this.valueOnFocus, this.settings, true); // This displays the currency sign on hover even if the rawValue is empty


        var orderedValueTest = isEmptyValue && orderedValue !== '' && this.settings.emptyInputBehavior === AutoNumeric.options.emptyInputBehavior.focus;

        if (orderedValueTest) {
          elementValueToSet = orderedValue;
        }

        if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(elementValueToSet)) {
          this._setElementValue(elementValueToSet);
        }

        if (orderedValueTest && orderedValue === this.settings.currencySymbol && this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) {
          // If there is a currency symbol and its on the right hand side, then we place the caret accordingly on the far left side
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(e.target, 0);
        }
      }
    }
    /**
     * Handler for the 'focus' event.
     * We update the info of the focused state in the `this.isFocused` variable when the element gets focused.
     * @private
     */

  }, {
    key: "_onFocus",
    value: function _onFocus() {
      if (this.settings.isCancellable) {
        // Save the current unformatted value for later use by the 'cancellable' feature
        this._saveCancellableValue();
      }
    }
    /**
     * Handler for the 'focusin' event.
     * This is called before the 'focus' event, and is necessary to change the selection on focus under Firefox for instance.
     *
     * @param {Event} e
     * @private
     */

  }, {
    key: "_onFocusIn",
    value: function _onFocusIn(e) {
      if (this.settings.selectOnFocus) {
        // The whole input content is selected on focus (following the `selectOnFocus` and `selectNumberOnly` options)
        //XXX Firefox <47 does not respect this selection...Oh well.
        this.select();
      } else {
        // Or we decide where to put the caret using the `caretPositionOnFocus` option
        if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(this.settings.caretPositionOnFocus)) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(e.target, this._initialCaretPosition(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement)));
        }
      }
    }
    /**
     * Enter the special 'formula mode' where users can enter a math expression that will be evaluated on blur and `enter`
     * @private
     */

  }, {
    key: "_enterFormulaMode",
    value: function _enterFormulaMode() {
      if (this.settings.formulaMode) {
        this.formulaMode = true; // 'Deactivate' the normal event listeners behavior
        // Clear the input and add a '=' sign to it

        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementValue(this.domElement, '='); // Put the caret after the `=` character

        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(this.domElement, 1);
      }
    }
    /**
     * Exit the formula mode
     * Tries to parse and evaluate the math expression, then `set()` the result if it's correct, otherwise reformat with the previous `rawValue`
     * @private
     */

  }, {
    key: "_exitFormulaMode",
    value: function _exitFormulaMode() {
      // Parse the formula
      var formula = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement);
      formula = formula.replace(/^\s*=/, ''); // Remove all the leading whitespaces and the equal sign from the formula

      var result;

      try {
        var ast = new _maths_Parser__WEBPACK_IMPORTED_MODULE_3__["default"](formula, this.settings.decimalCharacter);
        result = new _maths_Evaluator__WEBPACK_IMPORTED_MODULE_2__["default"]().evaluate(ast);
      } catch (e) {
        // Error when parsing the math expression
        this._triggerEvent(AutoNumeric.events.invalidFormula, this.domElement, {
          formula: formula,
          aNElement: this
        });

        this.reformat();
        this.formulaMode = false;
        return;
      } // The math expression is correctly parsed


      this._triggerEvent(AutoNumeric.events.validFormula, this.domElement, {
        formula: formula,
        result: result,
        aNElement: this
      });

      this.set(result); // Note: we can have a valid formula, but an invalid value (ie. out of the min/max range)

      this.formulaMode = false;
    }
    /**
     * Returns `true` if the non printable key is accepted in formula mode
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_acceptNonPrintableKeysInFormulaMode",
    value: function _acceptNonPrintableKeysInFormulaMode() {
      return this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Backspace || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Delete || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.LeftArrow || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.RightArrow || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Home || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.End;
    }
    /**
     * Handler for 'keydown' events.
     * The user just started pushing any key, hence one event is sent.
     *
     * Note :
     * By default a 'normal' input output those events in the right order when inputting a character key (ie. 'a') :
     * - keydown
     * - keypress
     * - input
     * - keyup
     *
     * ...when inputting a modifier key (ie. 'ctrl') :
     * - keydown
     * - keyup
     *
     * If 'delete' or 'backspace' are entered 'normally', the following events are sent :
     * - keydown
     * - input
     * - keyup
     *
     * If 'delete' or 'backspace' are entered continuously (with the key still pressed), the following events are sent :
     * - keydown
     * - input
     * [- keydown
     * - input] x times
     * - keyup
     *
     * If 'enter' is entered and the value has not changed, the following events are sent :
     * - keydown
     * - keypress
     * - keyup
     *
     * If 'enter' is entered and the value has been changed, the following events are sent :
     * - keydown
     * - keypress
     * - change
     * - keyup
     *
     * When a paste is done, the following events are sent :
     * - input (if paste is done with the mouse)
     *
     * - keydown (if paste is done with ctrl+v)
     * - keydown
     * - input
     * - keyup
     * - keyup
     *
     * @param {KeyboardEvent} e
     */

  }, {
    key: "_onKeydown",
    value: function _onKeydown(e) {
      this.formatted = false; // Keep track if the element has been formatted already. If that's the case, prevent further format calculations.

      this.isEditing = true; // Keep track if the user is currently editing the element manually

      if (!this.formulaMode && !this.isFocused && this.settings.unformatOnHover && e.altKey && this.domElement === _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getHoveredElement()) {
        // Here I prevent calling _unformatAltHovered if the element is already focused, since the global 'keydown' listener will pick it up as well
        this.constructor._unformatAltHovered(this);

        return;
      }

      this._updateEventKeyInfo(e);

      this.keydownEventCounter += 1; // Every time the keydown event is caught, increment the counter to keep track if the key is continuously pressed

      if (this.keydownEventCounter === 1) {
        this.initialValueOnFirstKeydown = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(e.target); // This is needed in `onKeyup()` to check if the value as changed during the key press

        this.initialRawValueOnFirstKeydown = this.rawValue;
      }

      if (this.formulaMode) {
        if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Esc) {
          // Cancel the formula
          this.formulaMode = false;
          this.reformat();
          return;
        }

        if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Enter) {
          // Calculate the formula
          this._exitFormulaMode();

          return;
        } // Accept the backspace, delete, arrow, home and end keys


        if (this._acceptNonPrintableKeysInFormulaMode()) {
          return;
        } //TODO Manage the undo/redo events *while* editing a math expression
        //TODO Manage the cut/paste events *while* editing a math expression

      } else if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Equal) {
        this._enterFormulaMode();

        return;
      }

      if (this.domElement.readOnly || this.settings.readOnly || this.domElement.disabled) {
        this.processed = true;
        return;
      }

      if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Esc) {
        //XXX The default 'Escape' key behavior differs between Firefox and Chrome, Firefox already having a built-in 'cancellable-like' feature. This is why we call `e.preventDefault()` here instead of just when `isCancellable` is set to `true`. This allow us to keep the same behavior across browsers.
        e.preventDefault();

        if (this.settings.isCancellable) {
          // If the user wants to cancel his modifications:
          // We set back the saved value
          if (this.rawValue !== this.savedCancellableValue) {
            // Do not set the value again if it has not changed
            this.set(this.savedCancellableValue); // And we need to send an 'input' event when setting back the initial value in order to make other scripts aware of the value change...

            this._triggerEvent(AutoNumeric.events["native"].input, e.target);
          }
        } // ..and lastly we update the caret selection, even if the option `isCancellable` is false


        this.select(); //TODO Add an option to select either the integer or decimal part with `Esc`
      } // The "enter" key throws a `change` event if the raw value has changed since the `focus` event


      var targetValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(e.target);

      if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Enter && this.rawValue !== this.rawValueOnFocus) {
        this._triggerEvent(AutoNumeric.events["native"].change, e.target);

        this.valueOnFocus = targetValue;
        this.rawValueOnFocus = this.rawValue;

        if (this.settings.isCancellable) {
          // If the user activated the 'cancellable' feature, we save the validated value when 'Enter' is hit
          this._saveCancellableValue();
        }
      }

      this._updateInternalProperties(e);

      if (this._processNonPrintableKeysAndShortcuts(e)) {
        this.processed = true;
        return;
      } // Check if the key is a delete/backspace key


      if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Backspace || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Delete) {
        var isDeletionAllowed = this._processCharacterDeletion(); // Because backspace and delete only triggers keydown and keyup events, not keypress


        this.processed = true;

        if (!isDeletionAllowed) {
          // Prevent the deletion if `overrideMinMaxLimits` option is `doNotOverride` and the result goes out of the allowed range
          e.preventDefault();
          return;
        }

        this._formatValue(e); // If and only if the resulting value has changed after that backspace/delete, then we have to send an 'input' event like browsers normally do.


        targetValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(e.target); // Update the value since it could have been changed during the deletion

        if (targetValue !== this.lastVal && this.throwInput) {
          // Throw an input event when a character deletion is detected
          this._triggerEvent(AutoNumeric.events["native"].input, e.target);

          e.preventDefault(); // ...and immediately prevent the browser to delete a second character
        }

        this.lastVal = targetValue;
        this.throwInput = true;
      }
    }
    /**
     * Handler for 'keypress' events.
     * The user is still pressing the key, which will output a character (ie. '2') continuously until he releases the key.
     * Note: 'keypress' events are not sent for delete keys like Backspace/Delete.
     *
     * @param {KeyboardEvent} e
     */

  }, {
    key: "_onKeypress",
    value: function _onKeypress(e) {
      if (this.formulaMode) {
        // Accept the backspace, delete, arrow, home and end keys
        if (this._acceptNonPrintableKeysInFormulaMode()) {
          return;
        } //TODO Prevent keys to be entered on the left-hand side of the '=' sign?...Or just let the user see what they are wrongly doing?


        if (this.settings.formulaChars.test(this.eventKey)) {
          // Accept the custom decimal character too
          return; // Accept the key in the formula (and do not accept the '=' character here again)
        } else {
          e.preventDefault(); // Reject the key
        }

        return;
      }

      if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Insert) {
        return;
      }

      var processed = this.processed;

      this._updateInternalProperties(e);

      if (this._processNonPrintableKeysAndShortcuts(e)) {
        return;
      }

      if (processed) {
        e.preventDefault();
        return;
      }

      var isCharacterInsertionAllowed = this._processCharacterInsertion();

      if (isCharacterInsertionAllowed) {
        this._formatValue(e);

        var targetValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(e.target);

        if (targetValue !== this.lastVal && this.throwInput) {
          // Throws input event on adding a character
          this._triggerEvent(AutoNumeric.events["native"].input, e.target);

          e.preventDefault(); // ...and immediately prevent the browser to add a second character
        } else {
          if ((this.eventKey === this.settings.decimalCharacter || this.eventKey === this.settings.decimalCharacterAlternative) && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementSelection(e.target).start === _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementSelection(e.target).end && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementSelection(e.target).start === targetValue.indexOf(this.settings.decimalCharacter)) {
            var position = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementSelection(e.target).start + 1;
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(e.target, position);
          }

          e.preventDefault();
        }

        this.lastVal = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(e.target);
        this.throwInput = true;

        this._setValidOrInvalidState(this.rawValue); // Updates the valid state as soon as the number is entered (in the case where the user keeps pressing the number key)


        return;
      }

      e.preventDefault();
    }
    /**
     * Handler for 'keyup' events.
     * The user just released any key, hence one event is sent.
     *
     * @param {KeyboardEvent} e
     */

  }, {
    key: "_onKeyup",
    value: function _onKeyup(e) {
      this.isEditing = false;
      this.keydownEventCounter = 0; // Reset the keydown events counter

      if (this.formulaMode) {
        return;
      }

      if (this.settings.isCancellable && this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Esc) {
        // If the user wants to cancel its modifications, we drop the 'keyup' event for the Esc key
        e.preventDefault();
        return;
      } // Manage the undo/redo events


      if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Z || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.z) {
        if (e.ctrlKey && e.shiftKey) {
          // Redo
          e.preventDefault();

          this._historyTableRedo();

          this.onGoingRedo = true;
          return;
        } else if (e.ctrlKey && !e.shiftKey) {
          if (this.onGoingRedo) {
            // Prevent an 'undo' to be launch when releasing the shift key before the ctrl key after a 'redo' shortcut
            this.onGoingRedo = false;
          } else {
            e.preventDefault(); // Undo

            this._historyTableUndo();

            return;
          }
        }
      }

      if (this.onGoingRedo && (e.ctrlKey || e.shiftKey)) {
        // Special case where if the user has entered `Control+Shift+z`, then release `z`, keeping `Control` or `Shift` pressed, then `this.onGoingRedo` is never changed back to `false` when the user release `Control` or `Shift`
        this.onGoingRedo = false;
      } // Manage the Cut event


      if ((e.ctrlKey || e.metaKey) && this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.x) {
        // Save the caret position at the start of the selection
        var caretPosition = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementSelection(this.domElement).start; // Convert the remaining 'formatted' numbers in a Js number

        var cutNumber = this.constructor._toNumericValue(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(e.target), this.settings); // Try to set that value with `set()`


        this.set(cutNumber); // Set back the initial caret position

        this._setCaretPosition(caretPosition);
      } // Manage the reformat when hovered with the Alt key pressed


      if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Alt && this.settings.unformatOnHover && this.hoveredWithAlt) {
        this.constructor._reformatAltHovered(this);

        return;
      } // Manage the Backspace and Delete keys when used in combination with the control key (fix #656)


      if ((e.ctrlKey || e.metaKey) && (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Backspace || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Delete)) {
        var _targetValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(e.target);

        this._setRawValue(this._formatOrUnformatOther(false, _targetValue));

        return;
      }

      this._updateInternalProperties(e);

      var skip = this._processNonPrintableKeysAndShortcuts(e);

      delete this.valuePartsBeforePaste;
      var targetValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(e.target);

      if (skip || targetValue === '' && this.initialValueOnFirstKeydown === '') {
        // If the user enters skippable keys, or keeps deleting/backspacing into the empty input, no 'formatted' event are sent (cf. issue #621)
        return;
      } // Added to properly place the caret when only the currency sign is present


      if (targetValue === this.settings.currencySymbol) {
        if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(e.target, 0);
        } else {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(e.target, this.settings.currencySymbol.length);
        }
      } else if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Tab) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(e.target, 0, targetValue.length);
      }

      if (targetValue === this.settings.suffixText || this.rawValue === '' && this.settings.currencySymbol !== '' && this.settings.suffixText !== '') {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(e.target, 0);
      } // Saves the extended decimal to preserve the data when navigating away from the page


      if (this.settings.decimalPlacesShownOnFocus !== null) {
        this._saveValueToPersistentStorage();
      }

      if (!this.formatted) {
        //TODO Is this line needed? Considering that onKeydown and onKeypress both finish by setting it to false...
        this._formatValue(e);
      }

      this._setValidOrInvalidState(this.rawValue); // Force the `rawValue` update on Android Chrome


      this._saveRawValueForAndroid(); // If the input value has changed during the key press event chain, an event is sent to alert that a formatting has been done (cf. Issue #187)


      if (targetValue !== this.initialValueOnFirstKeydown) {
        // Checking the value that were saved after the very first keydown event ensure that the 'formatted' event will be sent even if the user continuously press the Delete/Backspace key
        this._triggerEvent(AutoNumeric.events.formatted, e.target, {
          oldValue: this.initialValueOnFirstKeydown,
          newValue: targetValue,
          oldRawValue: this.initialRawValueOnFirstKeydown,
          newRawValue: this.rawValue,
          isPristine: this.isPristine(false),
          error: null,
          aNElement: this
        });
      } // Update the selection of the current element of the history table


      if (this.historyTable.length > 1) {
        var selection = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementSelection(this.domElement);
        this.selectionStart = selection.start;
        this.selectionEnd = selection.end;
        this.historyTable[this.historyTableIndex].start = this.selectionStart;
        this.historyTable[this.historyTableIndex].end = this.selectionEnd;
      }
    }
    /**
     * On Android Chrome, the `rawValue` is not updated when the user changes the input value.
     * This function updates the `rawValue` accordingly.
     * @private
     */

  }, {
    key: "_saveRawValueForAndroid",
    value: function _saveRawValueForAndroid() {
      if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.AndroidDefault) {
        var normalizedValue = this.constructor._stripAllNonNumberCharactersExceptCustomDecimalChar(this.getFormatted(), this.settings, true, this.isFocused);

        normalizedValue = this.constructor._convertToNumericString(normalizedValue, this.settings);

        this._setRawValue(normalizedValue);
      }
    }
    /**
     * Handler for 'focusout' events
     * On focusout, multiple things happens :
     * - The element value is formatted back if the `Alt` key was pressed,
     * - The element value is formatted back if `showOnlyNumbersOnFocus` was set to only show numbers,
     * - The element value is multiplied by `rawValueDivisor` on `blur`
     *
     * Note: On focusout, the `rawValue` is never changed. Only the formatted value can be modified.
     *
     * @param {Event} e
     */

  }, {
    key: "_onFocusOutAndMouseLeave",
    value: function _onFocusOutAndMouseLeave(e) {
      //TODO Create separate handlers for blur and mouseleave
      this.isEditing = false; // Just in case no `keyUp` event have been sent (if the user lost the focus on the window while typing)

      if (e.type === 'mouseleave' && this.formulaMode) {
        return;
      } //FIXME Do not call `set()` if the current raw value is the same as the one we are trying to set (currently, on focus out, `set()` is always called, even if the value has not changed


      if (this.settings.unformatOnHover && e.type === 'mouseleave' && this.hoveredWithAlt) {
        this.constructor._reformatAltHovered(this);

        return;
      }

      if (e.type === 'mouseleave' && !this.isFocused || e.type === 'blur') {
        if (e.type === 'blur' && this.formulaMode) {
          this._exitFormulaMode();
        }

        this._saveValueToPersistentStorage();

        if (this.settings.showOnlyNumbersOnFocus === AutoNumeric.options.showOnlyNumbersOnFocus.onlyNumbers) {
          this.settings.digitGroupSeparator = this.originalDigitGroupSeparator;
          this.settings.currencySymbol = this.originalCurrencySymbol;
          this.settings.suffixText = this.originalSuffixText;
        } // Use the rawValue, multiplied by `rawValueDivisor` if defined


        var rawValueToFormat = this._getRawValueToFormat(this.rawValue);

        var isRawValueNull = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(rawValueToFormat);

        var _this$constructor$_ch3 = this.constructor._checkIfInRangeWithOverrideOption(rawValueToFormat, this.settings),
            _this$constructor$_ch4 = _slicedToArray(_this$constructor$_ch3, 2),
            minTest = _this$constructor$_ch4[0],
            maxTest = _this$constructor$_ch4[1]; // Directly set the formatted value if the `rawValue` is found in `valuesToStrings`


        var elementValueIsAlreadySet = false;

        if (rawValueToFormat !== '' && !isRawValueNull) {
          this._triggerRangeEvents(minTest, maxTest);

          if (this.settings.valuesToStrings && this._checkValuesToStrings(rawValueToFormat)) {
            // Set the formatted value with the corresponding string
            this._setElementValue(this.settings.valuesToStrings[rawValueToFormat]);

            elementValueIsAlreadySet = true;
          }
        } // Only generate the formatted value if no `valuesToStrings` have been found


        if (!elementValueIsAlreadySet) {
          var value;

          if (isRawValueNull || rawValueToFormat === '') {
            value = rawValueToFormat;
          } else {
            value = String(rawValueToFormat);
          }

          if (rawValueToFormat !== '' && !isRawValueNull) {
            if (minTest && maxTest && !this.constructor._isElementValueEmptyOrOnlyTheNegativeSign(rawValueToFormat, this.settings)) {
              value = this._modifyNegativeSignAndDecimalCharacterForRawValue(value);

              if (this.settings.divisorWhenUnfocused && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(value)) {
                value = value / this.settings.divisorWhenUnfocused;
                value = value.toString();
              }

              value = this.constructor._roundFormattedValueShownOnBlur(value, this.settings);
              value = this.constructor._modifyNegativeSignAndDecimalCharacterForFormattedValue(value, this.settings);
            } else {
              this._triggerRangeEvents(minTest, maxTest);
            }
          } else if (rawValueToFormat === '') {
            switch (this.settings.emptyInputBehavior) {
              case AutoNumeric.options.emptyInputBehavior.zero:
                this._setRawValue('0');

                value = this.constructor._roundValue('0', this.settings, 0);
                break;

              case AutoNumeric.options.emptyInputBehavior.min:
                this._setRawValue(this.settings.minimumValue);

                value = this.constructor._roundFormattedValueShownOnFocusOrBlur(this.settings.minimumValue, this.settings, this.isFocused);
                break;

              case AutoNumeric.options.emptyInputBehavior.max:
                this._setRawValue(this.settings.maximumValue);

                value = this.constructor._roundFormattedValueShownOnFocusOrBlur(this.settings.maximumValue, this.settings, this.isFocused);
                break;

              default:
                if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(this.settings.emptyInputBehavior)) {
                  this._setRawValue(this.settings.emptyInputBehavior);

                  value = this.constructor._roundFormattedValueShownOnFocusOrBlur(this.settings.emptyInputBehavior, this.settings, this.isFocused);
                }

            }
          }

          var groupedValue = this.constructor._orderValueCurrencySymbolAndSuffixText(value, this.settings, false);

          if (!(this.constructor._isElementValueEmptyOrOnlyTheNegativeSign(value, this.settings) || isRawValueNull && this.settings.emptyInputBehavior === AutoNumeric.options.emptyInputBehavior["null"])) {
            groupedValue = this.constructor._addGroupSeparators(value, this.settings, false, rawValueToFormat);
          } // Testing for `allowDecimalPadding.never` or `allowDecimalPadding.floats` is needed to make sure we do not keep a trailing decimalCharacter (like '500.') in the element, since the raw value would still be a correctly formatted integer ('500')


          if (groupedValue !== rawValueToFormat || rawValueToFormat === '' || // This make sure we get rid on any currency symbol or suffix that might have been added on focus
          this.settings.allowDecimalPadding === AutoNumeric.options.allowDecimalPadding.never || this.settings.allowDecimalPadding === AutoNumeric.options.allowDecimalPadding.floats) {
            if (this.settings.symbolWhenUnfocused && rawValueToFormat !== '' && rawValueToFormat !== null) {
              groupedValue = "".concat(groupedValue).concat(this.settings.symbolWhenUnfocused);
            }

            this._setElementValue(groupedValue);
          }
        }

        this._setValidOrInvalidState(this.rawValue);

        if (e.type === 'blur') {
          //TODO Create separate handlers for blur and mouseleave, really.
          this._onBlur(e);
        }
      }
    }
    /**
     * Handler for 'paste' event
     *
     * @param {Event|ClipboardEvent} e
     */

  }, {
    key: "_onPaste",
    value: function _onPaste(e) {
      //FIXME When pasting '000' on a thousand group selection, the whole selection gets deleted, and only one '0' is pasted (cf. issue #302)
      // The event is prevented by default, since otherwise the user would be able to paste invalid characters into the input
      e.preventDefault();

      if (this.settings.readOnly || this.domElement.readOnly || this.domElement.disabled) {
        // Do not allow pasting in a readonly element (fix issue #505)
        return;
      }

      var rawPastedText;

      if (window.clipboardData && window.clipboardData.getData) {
        // Special case for the obsolete and non-standard IE browsers 10 and 11
        rawPastedText = window.clipboardData.getData('Text');
      } else if (e.clipboardData && e.clipboardData.getData) {
        // Normal case with modern browsers
        rawPastedText = e.clipboardData.getData('text/plain');
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError('Unable to retrieve the pasted value. Please use a modern browser (ie. Firefox or Chromium).');
      } // Fix for firefox paste handling on `contenteditable` elements where `e.target` is the the text node, not the element


      var eventTarget;

      if (!e.target.tagName) {
        eventTarget = e.explicitOriginalTarget;
      } else {
        eventTarget = e.target;
      } // 0. Special case if the user has selected all the input text before pasting


      var initialFormattedValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(eventTarget);
      var selectionStart = eventTarget.selectionStart || 0;
      var selectionEnd = eventTarget.selectionEnd || 0;
      var selectionSize = selectionEnd - selectionStart;

      if (selectionSize === initialFormattedValue.length) {
        // If all the element text is selected
        //TODO Refactor this with the tests below
        // Since the whole element content will be replaced, no need to complicate things and directly test for the validity of the pasted content, then set the `rawValue` and caret position (fix issue #482)
        // 1. Strip all thousand separators, brackets and currency sign, and convert the decimal character to a dot
        var _untranslatedPastedText = this._preparePastedText(rawPastedText);

        var pastedRawValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].arabicToLatinNumbers(_untranslatedPastedText, false, false, false); // Allow pasting arabic numbers
        // 2. Check that the paste is a valid number once it has been normalized to a raw value

        if (pastedRawValue === '.' || pastedRawValue === '' || pastedRawValue !== '.' && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(pastedRawValue)) {
          this.formatted = true; // This prevent the `keyup` event on the `v` key during a paste to try to format an empty value.
          // If the user tries to paste a single decimal character (that has been translated to '.' already) or the empty value, ignore the paste

          if (this.settings.onInvalidPaste === AutoNumeric.options.onInvalidPaste.error) {
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The pasted value '".concat(rawPastedText, "' is not a valid paste content."));
          }

          return;
        } // 3. Then try to set it as the new value. The `set()` method will run the additional tests (ie. limits) as needed.


        this.set(pastedRawValue);
        this.formatted = true; // 4. On a 'normal' non-autoNumeric input, an `input` event is sent when a paste is done. We mimic that.

        this._triggerEvent(AutoNumeric.events["native"].input, eventTarget); // 5. Return since the job is done


        return;
      } // 1. Check if the paste has a negative sign (only if it's the first character), and store that information for later use


      var isPasteNegative = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegativeStrict(rawPastedText, this.settings.negativeSignCharacter);

      if (isPasteNegative) {
        // 1a. Remove the negative sign from the pasted text
        rawPastedText = rawPastedText.slice(1, rawPastedText.length);
      } // 2. Strip all thousand separators, brackets and currency sign, and convert the decimal character to a dot


      var untranslatedPastedText = this._preparePastedText(rawPastedText);

      var pastedText;

      if (untranslatedPastedText === '.') {
        // Special case : If the user tries to paste a single decimal character (that has been translated to '.' already)
        pastedText = '.';
      } else {
        // Normal case
        // Allow pasting arabic numbers
        pastedText = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].arabicToLatinNumbers(untranslatedPastedText, false, false, false);
      } // 3. Test if the paste is valid (only has numbers and eventually a decimal character). If it's not valid, stop here.


      if (pastedText !== '.' && (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(pastedText) || pastedText === '')) {
        this.formatted = true; // This prevent the `keyup` event on the `v` key during a paste to try to format an empty value (fix issue #484)

        if (this.settings.onInvalidPaste === AutoNumeric.options.onInvalidPaste.error) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The pasted value '".concat(rawPastedText, "' is not a valid paste content."));
        }

        return;
      } // 4. Calculate the paste result


      var caretPositionOnInitialTextAfterPasting;
      var isInitialValueNegative = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegativeStrict(this.getNumericString(), this.settings.negativeSignCharacter);
      var isPasteNegativeAndInitialValueIsPositive;
      var result; // If the pasted content is negative, then the result will be negative too

      if (isPasteNegative && !isInitialValueNegative) {
        isInitialValueNegative = true;
        isPasteNegativeAndInitialValueIsPositive = true;
      } else {
        isPasteNegativeAndInitialValueIsPositive = false;
      } // 1. Generate the unformatted result


      var leftFormattedPart = initialFormattedValue.slice(0, selectionStart);
      var rightFormattedPart = initialFormattedValue.slice(selectionEnd, initialFormattedValue.length);

      if (selectionStart !== selectionEnd) {
        // a. If there is a selection, remove the selected part, and return the left and right part
        result = this._preparePastedText(leftFormattedPart + rightFormattedPart);
      } else {
        // b. Else if this is only one caret (and therefore no selection), then return the left and right part
        result = this._preparePastedText(initialFormattedValue);
      } // Add back the negative sign if needed


      if (isInitialValueNegative) {
        result = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setRawNegativeSign(result);
      } // Build the unformatted result string


      caretPositionOnInitialTextAfterPasting = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].convertCharacterCountToIndexPosition(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].countNumberCharactersOnTheCaretLeftSide(initialFormattedValue, selectionStart, this.settings.decimalCharacter));

      if (isPasteNegativeAndInitialValueIsPositive) {
        // If the initial paste is negative and the initial value is not, then I must offset the caret position by one place to the right to take the additional hyphen into account
        caretPositionOnInitialTextAfterPasting++; //TODO Quid if the negative sign is not on the left (negativePositiveSignPlacement and currencySymbolPlacement)?
        //TODO Quid if the positive sign is shown?
      }

      var leftPart = result.slice(0, caretPositionOnInitialTextAfterPasting);
      var rightPart = result.slice(caretPositionOnInitialTextAfterPasting, result.length);
      var leftPartContainedADot = false;

      if (pastedText === '.') {
        if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(leftPart, '.')) {
          // If I remove a dot here, then I need to update the caret position (decrement it by 1) when positioning it
          // To do so, we keep that info in order to modify the caret position later
          leftPartContainedADot = true;
          leftPart = leftPart.replace('.', '');
        }

        rightPart = rightPart.replace('.', '');
      } // Manage the case where a negative number is pasted onto another negative number that is entirely selected (cf. issue #593)


      var negativePasteOnNegativeNumber = false;

      if (leftPart === '' && rightPart === '-') {
        leftPart = '-';
        rightPart = ''; // When pasting a negative number on a negative number, we need to offset the caret position one place to the right to take into account the negative sign

        negativePasteOnNegativeNumber = true;
      } // -- Here, we are good to go to continue on the same basis for each value of the `onInvalidPaste` option


      switch (this.settings.onInvalidPaste) {
        /* 4a. Truncate paste behavior:
         * Insert as many numbers as possible on the right hand side of the caret from the pasted text content, until the input reach its range limit.
         * If there is more characters in the clipboard once a limit is reached, drop the extraneous characters.
         * Otherwise paste all the numbers from the clipboard.
         * While doing so, we check if the result is within the minimum and maximum values allowed, and stop as soon as we encounter one of those.
         *
         * 4b. Replace paste behavior:
         * Idem than the 'truncate' paste behavior, except that when a range limit is hit, we try to replace the subsequent initial numbers with the pasted ones, until we hit the range limit a second (and last) time, or we run out of numbers to paste
         */

        /* eslint no-case-declarations: 0 */
        case AutoNumeric.options.onInvalidPaste.truncate:
        case AutoNumeric.options.onInvalidPaste.replace:
          // c. Add numbers one by one at the caret position, while testing if the result is valid and within the range of the minimum and maximum value
          //    Continue until you either run out of numbers to paste, or that you get out of the range limits
          var minParse = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].parseStr(this.settings.minimumValue);
          var maxParse = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].parseStr(this.settings.maximumValue);
          var lastGoodKnownResult = result; // This is set as the default, in case we do not add even one number

          var pastedTextIndex = 0;
          var modifiedLeftPart = leftPart;

          while (pastedTextIndex < pastedText.length) {
            // Modify the result with another pasted character
            modifiedLeftPart += pastedText[pastedTextIndex];
            result = modifiedLeftPart + rightPart; // Check the range limits

            if (!this.constructor._checkIfInRange(result, minParse, maxParse)) {
              // The result is out of the range limits, stop the loop here
              break;
            } // Save the last good known result


            lastGoodKnownResult = result; // Update the local variables for the next loop

            pastedTextIndex++;
          } // Update the last caret position where to insert a new number


          caretPositionOnInitialTextAfterPasting += pastedTextIndex;
          if (negativePasteOnNegativeNumber) caretPositionOnInitialTextAfterPasting++; //XXX Here we have the result for the `truncate` option

          if (this.settings.onInvalidPaste === AutoNumeric.options.onInvalidPaste.truncate) {
            //TODO If the user as defined a truncate callback and there are still some numbers (that will be dropped), then call this callback with the initial paste as well as the remaining numbers
            result = lastGoodKnownResult;

            if (leftPartContainedADot) {
              // If a dot has been removed for the part on the left of the caret, we decrement the caret index position
              caretPositionOnInitialTextAfterPasting--;
            }

            break;
          } //XXX ...else we need to continue modifying the result for the 'replace' option
          // d. Until there are numbers to paste, replace the initial numbers one by one, and still do the range test.
          //    Stop when you have no more numbers to paste, or if you are out of the range limits.
          //    If you do get to the range limits, use the previous known good value within those limits.
          //    Note: The numbers are replaced one by one, in the integer then decimal part, while ignoring the decimal character
          //TODO What should happen if the user try to paste a decimal number? Should we override the current initial decimal character in favor of this new one? If we do, then we have to recalculate the vMin/vMax from the start in order to take into account this new decimal character position..


          var lastGoodKnownResultIndex = caretPositionOnInitialTextAfterPasting;
          var lastGoodKnownResultSize = lastGoodKnownResult.length;

          while (pastedTextIndex < pastedText.length && lastGoodKnownResultIndex < lastGoodKnownResultSize) {
            if (lastGoodKnownResult[lastGoodKnownResultIndex] === '.') {
              // We skip the decimal character 'replacement'. That way, we do not change the decimal character position regarding the remaining numbers.
              lastGoodKnownResultIndex++;
              continue;
            } // This replace one character at a time


            result = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].replaceCharAt(lastGoodKnownResult, lastGoodKnownResultIndex, pastedText[pastedTextIndex]); // Check the range limits

            if (!this.constructor._checkIfInRange(result, minParse, maxParse)) {
              // The result is out of the range limits, stop the loop here
              break;
            } // Save the last good known result


            lastGoodKnownResult = result; // Update the local variables for the next loop

            pastedTextIndex++;
            lastGoodKnownResultIndex++;
          } // Update the last caret position where to insert a new number


          caretPositionOnInitialTextAfterPasting = lastGoodKnownResultIndex;

          if (leftPartContainedADot) {
            // If a dot has been removed for the part on the left of the caret, we decrement the caret index position
            caretPositionOnInitialTextAfterPasting--;
          }

          result = lastGoodKnownResult;
          break;

        /* 4c. Normal paste behavior:
         * Insert the pasted number inside the current unformatted text, at the correct caret position or selection
         */

        case AutoNumeric.options.onInvalidPaste.error:
        case AutoNumeric.options.onInvalidPaste.ignore:
        case AutoNumeric.options.onInvalidPaste.clamp:
        default:
          // Generate the unformatted result
          result = "".concat(leftPart).concat(pastedText).concat(rightPart); // 2. Calculate the caret position in the unformatted value, for later use

          if (selectionStart === selectionEnd) {
            // There is no selection, then the caret position is set after the pasted text
            var indexWherePastedTextHasBeenInserted = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].convertCharacterCountToIndexPosition(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].countNumberCharactersOnTheCaretLeftSide(initialFormattedValue, selectionStart, this.settings.decimalCharacter));
            caretPositionOnInitialTextAfterPasting = indexWherePastedTextHasBeenInserted + pastedText.length; // I must not count the characters that have been removed from the pasted text (ie. '.')
          } else if (rightPart === '') {
            // If the user selected from the caret position to the end of the input (on the far right)
            caretPositionOnInitialTextAfterPasting = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].convertCharacterCountToIndexPosition(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].countNumberCharactersOnTheCaretLeftSide(initialFormattedValue, selectionStart, this.settings.decimalCharacter)) + pastedText.length;
            if (negativePasteOnNegativeNumber) caretPositionOnInitialTextAfterPasting++;
          } else {
            // Usual case
            var indexSelectionEndInRawValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].convertCharacterCountToIndexPosition(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].countNumberCharactersOnTheCaretLeftSide(initialFormattedValue, selectionEnd, this.settings.decimalCharacter)); // Here I must not count the characters that have been removed from the pasted text (ie. '.'), or the thousand separators in the initial selected text

            var selectedText = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(eventTarget).slice(selectionStart, selectionEnd);
            caretPositionOnInitialTextAfterPasting = indexSelectionEndInRawValue - selectionSize + _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].countCharInText(this.settings.digitGroupSeparator, selectedText) + pastedText.length;
          } // Modify the caret position for special cases, only if the whole input has not been selected


          if (isPasteNegativeAndInitialValueIsPositive) {
            // If the pasted value has a negative sign ('-'), but the initial value does not, offset the index by one
            caretPositionOnInitialTextAfterPasting++;
          }

          if (leftPartContainedADot) {
            // If a dot has been removed for the part on the left of the caret, we decrement the caret index position
            caretPositionOnInitialTextAfterPasting--;
          }

      } // 5. Check if the result is a valid number, if not, drop the paste and do nothing.


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(result) || result === '') {
        if (this.settings.onInvalidPaste === AutoNumeric.options.onInvalidPaste.error) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The pasted value '".concat(rawPastedText, "' would result into an invalid content '").concat(result, "'.")); //TODO Should we send a warning instead of throwing an error?
          //TODO This is not DRY ; refactor with above
        }

        return;
      } // 6. If it's a valid number, check if it falls inside the minimum and maximum value. If this fails, modify the value following this procedure :

      /*
       * If 'error' (this is the default) :
       *      - Normal paste behavior.
       *      - Try to set the new value, if it fails, then throw an error in the console.
       *      - Do not change the input value, do not change the current selection.
       * If 'ignore' :
       *      - Normal paste behavior.
       *      - Try to set the new value, if it fails, do nothing more.
       *      - Do not change the input value, do not change the current selection.
       * If 'clamp' :
       *      - Normal paste behavior.
       *      - Try to set the new value, if it fails, set the value to the minimum or maximum limit, whichever is closest to the
       *        paste result.
       *      - Change the caret position to be positioned on the left hand side of the decimal character.
       * If 'truncate' :
       *      - Truncate paste behavior.
       *      - Try to set the new value, until it fails (if the result is out of the min and max value limits).
       *      - Drop the remaining non-pasted numbers, and keep the last known non-failing result.
       *      - Change the caret position to be positioned after the last pasted character.
       * If 'replace' :
       *      - Replace paste behavior.
       *      - Try to set the new value, until it fails (if the result is out of the min and max value limits).
       *      - Then try to replace as many numbers as possible with the pasted ones. Once it fails, keep the last known non-failing result.
       *      - Change the caret position to be positioned after the last pasted character.
       */


      var valueHasBeenSet = false;
      var valueHasBeenClamped = false;

      try {
        this.set(result);
        valueHasBeenSet = true;
      } catch (error) {
        var clampedValue;

        switch (this.settings.onInvalidPaste) {
          case AutoNumeric.options.onInvalidPaste.clamp:
            clampedValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].clampToRangeLimits(result, this.settings);

            try {
              this.set(clampedValue);
            } catch (error) {
              _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("Fatal error: Unable to set the clamped value '".concat(clampedValue, "'."));
            }

            valueHasBeenClamped = true;
            valueHasBeenSet = true;
            result = clampedValue; // This is used only for setting the caret position later

            break;

          case AutoNumeric.options.onInvalidPaste.error:
          case AutoNumeric.options.onInvalidPaste.truncate:
          case AutoNumeric.options.onInvalidPaste.replace:
            // Throw an error message
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The pasted value '".concat(rawPastedText, "' results in a value '").concat(result, "' that is outside of the minimum [").concat(this.settings.minimumValue, "] and maximum [").concat(this.settings.maximumValue, "] value range."));
          // falls through

          case AutoNumeric.options.onInvalidPaste.ignore: // Do nothing
          // falls through

          default:
            return;
          // ...and nothing else should be changed
        }
      } // 7. Then lastly, set the caret position at the right logical place


      var targetValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(eventTarget);
      var caretPositionInFormattedNumber;

      if (valueHasBeenSet) {
        switch (this.settings.onInvalidPaste) {
          case AutoNumeric.options.onInvalidPaste.clamp:
            if (valueHasBeenClamped) {
              if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) {
                _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(eventTarget, targetValue.length - this.settings.currencySymbol.length); // This puts the caret on the right of the last decimal place
              } else {
                _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(eventTarget, targetValue.length); // ..and this on the far right
              }

              break;
            }

          // else if the value has not been clamped, the default behavior is used...
          // falls through

          case AutoNumeric.options.onInvalidPaste.error:
          case AutoNumeric.options.onInvalidPaste.ignore:
          case AutoNumeric.options.onInvalidPaste.truncate:
          case AutoNumeric.options.onInvalidPaste.replace:
          default:
            // Whenever one or multiple characters are pasted, this means we have to manage the potential thousand separators that could be added by the formatting
            caretPositionInFormattedNumber = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].findCaretPositionInFormattedNumber(result, caretPositionOnInitialTextAfterPasting, targetValue, this.settings.decimalCharacter);
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(eventTarget, caretPositionInFormattedNumber);
        }
      } // 8. We make sure we send an input event only if the result is different than the initial value before the paste


      if (valueHasBeenSet && initialFormattedValue !== targetValue) {
        // On a 'normal' non-autoNumeric input, an `input` event is sent when a paste is done. We mimic that.
        this._triggerEvent(AutoNumeric.events["native"].input, eventTarget);
      }
    }
    /**
     * When focusing out of the input, we check if the value has changed, and if it has, then we send a `change` event (since the native one would have been prevented by `e.preventDefault()` called in the other event listeners).
     * We also update the info of the focused state in the `this.isFocused` variable.
     *
     * @param {Event} e
     */

  }, {
    key: "_onBlur",
    value: function _onBlur(e) {
      // Keep track if the element is currently focused
      this.isFocused = false; // Keep track if the user is currently editing the element

      this.isEditing = false; // Send a `change` event if the raw value has been changed since the last focus or 'enter' validation

      if (this.rawValue !== this.rawValueOnFocus) {
        this._triggerEvent(AutoNumeric.events["native"].change, e.target);
      }

      this.rawValueOnFocus = void 0; // Reset the tracker
    }
    /**
     * Handler for 'wheel' event
     *
     * @param {WheelEvent} e
     */

  }, {
    key: "_onWheel",
    value: function _onWheel(e) {
      if (this.formulaMode) {
        return;
      }

      if (this.settings.readOnly || this.domElement.readOnly || this.domElement.disabled) {
        // Do not allow scrolling in a readonly element (fix issue #541)
        return;
      }

      if (this.settings.modifyValueOnWheel) {
        if (this.settings.wheelOn === AutoNumeric.options.wheelOn.focus) {
          if (this.isFocused) {
            if (!e.shiftKey) {
              this.wheelAction(e);
            }
          } else if (e.shiftKey) {
            this.wheelAction(e);
          }
        } else if (this.settings.wheelOn === AutoNumeric.options.wheelOn.hover) {
          if (!e.shiftKey) {
            this.wheelAction(e);
          } else {
            // Note: When not `defaultPrevented`, Shift + mouse wheel is reserved by the browsers for horizontal scrolling.
            // Hence, using the Shift key with the `wheelOn` 'hover' option will only scroll the page if we prevent the default behavior
            e.preventDefault(); // Do not scroll horizontally
            // Scroll vertically

            window.scrollBy(0, _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegativeStrict(String(e.deltaY)) ? -50 : 50); // `e.deltaY` is usually too small compared to how the page is scrolled. That's why we use a fixed offset.
          }
        } else {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError('Unknown `wheelOn` option.');
        }
      }
    }
    /**
     * Increment or decrement the element value according to the `wheelStep` option chosen
     *
     * @param {WheelEvent} e The `wheel` event
     */

  }, {
    key: "wheelAction",
    value: function wheelAction(e) {
      this.isWheelEvent = true; // Keep the info that we are currently managing a mouse wheel event
      // 0) First, save the caret position so we can set it back once the value has been changed

      var selectionStart = e.target.selectionStart || 0;
      var selectionEnd = e.target.selectionEnd || 0; // 1) Get the unformatted value

      var currentUnformattedValue = this.rawValue;
      var result;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(currentUnformattedValue)) {
        // If by default the input is empty, start at '0'
        if (this.settings.minimumValue > 0 || this.settings.maximumValue < 0) {
          // or if '0' is not between min and max value, 'minimumValue' if the user does a wheelup, 'maximumValue' if the user does a wheeldown
          if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isWheelUpEvent(e)) {
            result = this.settings.minimumValue;
          } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isWheelDownEvent(e)) {
            result = this.settings.maximumValue;
          } else {
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The event is not a 'wheel' event.");
          }
        } else {
          result = 0;
        }
      } else {
        result = currentUnformattedValue;
      }

      result = +result; // Typecast to a number needed for the following addition/subtraction
      // 2) Increment/Decrement the value
      // But first, choose the increment/decrement method ; fixed or progressive

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(this.settings.wheelStep)) {
        var step = +this.settings.wheelStep; // Typecast to a number needed for the following addition/subtraction
        // Fixed method
        // This is the simplest method, where a fixed offset in added/subtracted from the current value

        if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isWheelUpEvent(e)) {
          // Increment
          result += step;
        } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isWheelDownEvent(e)) {
          // Decrement
          result -= step;
        }
      } else {
        // Progressive method
        // For this method, we calculate an offset that is in relation to the size of the current number (using only the integer part size).
        // The bigger the number, the bigger the offset (usually the number count in the integer part minus 3, except for small numbers where a different behavior is better for the user experience).
        //TODO Known limitation : The progressive method does not play well with numbers between 0 and 1 where to modify the decimal places the rawValue first has to go from '1' to '0'
        if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isWheelUpEvent(e)) {
          // Increment
          result = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].addAndRoundToNearestAuto(result, this.settings.decimalPlacesRawValue);
        } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isWheelDownEvent(e)) {
          // Decrement
          result = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].subtractAndRoundToNearestAuto(result, this.settings.decimalPlacesRawValue);
        }
      } // 3) Set the new value so it gets formatted
      // First clamp the result if needed


      result = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].clampToRangeLimits(result, this.settings);

      if (result !== +currentUnformattedValue) {
        // Only 'set' the value if it has changed. For instance 'set' should not happen if the user hits a limit and continue to try to go past it since we clamp the value.
        this.set(result); // Since we changed the input value, we send a native `input` event

        this._triggerEvent(AutoNumeric.events["native"].input, e.target);
      } //XXX Do not prevent if the value is not modified? From a UX point of view, preventing the wheel event when the user use it on top of an autoNumeric element should always be done, even if the value does not change. Perhaps that could affect other scripts relying on this event to be sent though.


      e.preventDefault(); // We prevent the page to scroll while we increment/decrement the value
      // 4) Finally, we set back the caret position/selection
      // There is no need to take into account the fact that the number count could be different at the end of the wheel event ; it would be too complex and most of the time unreliable

      this._setSelection(selectionStart, selectionEnd);

      this.isWheelEvent = false; // Set back the mouse wheel indicator to its default
    }
    /**
     * Handler for 'drop' event
     *
     * @param {DragEvent} e
     */

  }, {
    key: "_onDrop",
    value: function _onDrop(e) {
      if (this.formulaMode) {
        // Dropping while in formula mode shouldn't be possible. This is done 'just in case'
        return;
      } // Note: by default browsers already prevent the drop on readOnly and disabled elements


      this.isDropEvent = true;
      e.preventDefault();
      var format;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isIE11()) {
        format = 'text';
      } else {
        format = 'text/plain';
      }

      var droppedText = e.dataTransfer.getData(format);
      var cleanedValue = this.unformatOther(droppedText);
      this.set(cleanedValue);
      this.isDropEvent = false;
    }
    /**
     * Handler for 'submit' events happening on the parent <form> element.
     * If `unformatOnSubmit` is set to `true`, the element value is first unformatted before the form is submitted.
     *
     * @returns {boolean}
     */

  }, {
    key: "_onFormSubmit",
    value: function _onFormSubmit() {
      var _this10 = this;

      // Search for all the AutoNumeric children of the form element and call the `_unformatOnSubmit()` function
      var inputElements = this._getFormAutoNumericChildren(this.parentForm);

      var aNElements = inputElements.map(function (aNElement) {
        return _this10.constructor.getAutoNumericElement(aNElement);
      });
      aNElements.forEach(function (aNElement) {
        return aNElement._unformatOnSubmit();
      });
      return true;
    }
    /**
     * Handler for 'reset' events caught on the parent <form> element.
     * When such event is detected, then every child AutoNumeric elements must format their default value that the browser is forcing upon them.
     *
     * @private
     */

  }, {
    key: "_onFormReset",
    value: function _onFormReset() {
      var _this11 = this;

      var inputElements = this._getFormAutoNumericChildren(this.parentForm);

      var aNElements = inputElements.map(function (aNElement) {
        return _this11.constructor.getAutoNumericElement(aNElement);
      }); // Tell all the AutoNumeric children to format their default value

      aNElements.forEach(function (aNElement) {
        var val = _this11._getDefaultValue(aNElement.node()); // aNElement.set(val); //XXX If I use that line, the format is first correctly done, but the form reset is still not finished and will overwrite the formatting. This is why we need to use the following setTimeout line.


        setTimeout(function () {
          return aNElement.set(val);
        }, 0); //XXX This is an ugly hack, but it seems to be the accepted answer to this problem (https://stackoverflow.com/a/8152960/2834898). This is sad. Do note that I use '0ms' here since using `setTimeout` will push that code on the event stack, and as soon as the reset will be finished, this will be run (see https://stackoverflow.com/a/23987283/2834898).
      });
    }
    /**
     * Unformat the element value according to the `unformatOnSubmit` option
     *
     * @private
     */

  }, {
    key: "_unformatOnSubmit",
    value: function _unformatOnSubmit() {
      if (this.settings.unformatOnSubmit) {
        this._setElementValue(this.rawValue);
      }
    }
    /**
     * Listen for the `alt` key keydown event globally, and if the event is caught, unformat the AutoNumeric element that is hovered by the mouse.
     *
     * @param {KeyboardEvent} e
     * @private
     */

  }, {
    key: "_onKeydownGlobal",
    value: function _onKeydownGlobal(e) {
      //TODO Find a way to keep the caret position between the alt keyup/keydown states
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].character(e) === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Alt) {
        var hoveredElement = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getHoveredElement();

        if (AutoNumeric.isManagedByAutoNumeric(hoveredElement)) {
          var anElement = AutoNumeric.getAutoNumericElement(hoveredElement);

          if (!anElement.formulaMode && anElement.settings.unformatOnHover) {
            this.constructor._unformatAltHovered(anElement);
          }
        }
      }
    }
    /**
     * Listen for the `alt` key keyup event globally, and if the event is caught, reformat the AutoNumeric element that is hovered by the mouse.
     *
     * @param {KeyboardEvent} e
     * @private
     */

  }, {
    key: "_onKeyupGlobal",
    value: function _onKeyupGlobal(e) {
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].character(e) === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Alt) {
        var hoveredElement = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getHoveredElement();

        if (AutoNumeric.isManagedByAutoNumeric(hoveredElement)) {
          var anElement = AutoNumeric.getAutoNumericElement(hoveredElement);

          if (anElement.formulaMode || !anElement.settings.unformatOnHover) {
            return;
          }

          this.constructor._reformatAltHovered(anElement);
        }
      }
    }
    /**
     * Return `true` if the DOM element is supported by autoNumeric.
     * A supported element is an element whitelisted in the `allowedTagList`.
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isElementTagSupported",
    value: function _isElementTagSupported() {
      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isElement(this.domElement)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The DOM element is not valid, ".concat(this.domElement, " given."));
      }

      return _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(this.domElement.tagName.toLowerCase(), this.allowedTagList);
    }
    /**
     * Return `true` in the DOM element is an <input>.
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isInputElement",
    value: function _isInputElement() {
      return this.domElement.tagName.toLowerCase() === 'input';
    }
    /**
     * Return `true` if the input type is supported by AutoNumeric
     *
     * @returns {boolean}
     * @throws
     */

  }, {
    key: "_isInputTypeSupported",
    value: function _isInputTypeSupported() {
      return this.domElement.type === 'text' || this.domElement.type === 'hidden' || this.domElement.type === 'tel' || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(this.domElement.type);
    }
    /**
     * Check if the DOM element is supported by autoNumeric.
     * A supported element is either an <input> element with the correct 'type' attribute, or a tag whitelisted in the `allowedTagList` array.
     * If the check fails, this method throws.
     * This function also sets the info `this.isInputElement` which keep tracks if the DOM element is an <input> or not, and the `this.isContentEditable` if the element has the `contenteditable` attribute set to `true` initially.
     *
     * @throws
     * @private
     */

  }, {
    key: "_checkElement",
    value: function _checkElement() {
      var currentElementTag = this.domElement.tagName.toLowerCase();

      if (!this._isElementTagSupported()) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The <".concat(currentElementTag, "> tag is not supported by autoNumeric"));
      }

      if (this._isInputElement()) {
        if (!this._isInputTypeSupported()) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The input type \"".concat(this.domElement.type, "\" is not supported by autoNumeric"));
        }

        this.isInputElement = true;
      } else {
        this.isInputElement = false;
        this.isContentEditable = this.domElement.hasAttribute('contenteditable') && this.domElement.getAttribute('contenteditable') === 'true';
      }
    }
    /**
     * Formats the default value on page load.
     * This is called only if the `formatOnPageLoad` option is set to `true`.
     *
     * @param {number|string|null} forcedInitialValue The value that should be used for initialization, in place on the eventual html one
     */

  }, {
    key: "_formatDefaultValueOnPageLoad",
    value: function _formatDefaultValueOnPageLoad() {
      var forcedInitialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var setValue = true;
      var currentValue;

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(forcedInitialValue)) {
        currentValue = forcedInitialValue;
      } else {
        // Make sure the initial value does not have any superfluous whitespaces around it (Fix issue #479)
        currentValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement).trim(); // Correct the DOM attribute in case some whitespaces were present

        this.domElement.setAttribute('value', currentValue);
      }

      if (this.isInputElement || this.isContentEditable) {
        /*
         * If the input value has been set by the dev, but not directly as an attribute in the html, then it takes
         * precedence and should get formatted during the initialization (if this input value is a valid number and that the
         * developer wants it formatted on init (cf. the `settings.formatOnPageLoad` option)).
         * Note; this is true whatever the developer has set for `data-default-value-override` in the html (asp.net users).
         *
         * In other words : if `defaultValueOverride` is not null, it means the developer is trying to prevent postback problems.
         * But if `input.value` is set to a number, and the html `value` attribute is not set, then it means the dev has
         * changed the input value, and then it means we should not overwrite his own decision to do so.
         * Hence, if `defaultValueOverride` is not null, but `input.value` is a number and `this.domElement.hasAttribute('value')`
         * is false, we should ignore `defaultValueOverride` altogether.
         */
        var unLocalizedCurrentValue = this.constructor._toNumericValue(currentValue, this.settings); // This allows to use a localized value on startup


        if (!this.domElement.hasAttribute('value') || this.domElement.getAttribute('value') === '') {
          // Check if the `value` is valid or not
          if (!isNaN(Number(unLocalizedCurrentValue)) && Infinity !== unLocalizedCurrentValue) {
            this.set(unLocalizedCurrentValue);
            setValue = false;
          } else {
            // If not, inform the developer that nothing usable has been provided
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The value [".concat(currentValue, "] used in the input is not a valid value autoNumeric can work with."));
          }
        } else {
          /* Checks for :
           * - page reload from back button, and
           * - ASP.net form post back
           *      The following HTML data attribute is REQUIRED (data-an-default="same value as the value attribute")
           *      example: <asp:TextBox runat="server" id="someID" text="1234.56" data-an-default="1234.56">
           */
          if (this.settings.defaultValueOverride !== null && this.settings.defaultValueOverride.toString() !== currentValue || this.settings.defaultValueOverride === null && currentValue !== '' && currentValue !== this.domElement.getAttribute('value') || currentValue !== '' && this.domElement.getAttribute('type') === 'hidden' && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(unLocalizedCurrentValue)) {
            if (this.settings.saveValueToSessionStorage && (this.settings.decimalPlacesShownOnFocus !== null || this.settings.divisorWhenUnfocused)) {
              this._setRawValue(this._getValueFromPersistentStorage());
            } // If the decimalPlacesShownOnFocus value should NOT be saved in sessionStorage


            if (!this.settings.saveValueToSessionStorage) {
              var toStrip = this.constructor._removeBrackets(currentValue, this.settings);

              if ((this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.suffix || this.settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.prefix && this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) && this.settings.negativeSignCharacter !== '' && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(currentValue, this.settings.negativeSignCharacter)) {
                this._setRawValue("-".concat(this.constructor._stripAllNonNumberCharacters(toStrip, this.settings, true, this.isFocused)));
              } else {
                this._setRawValue(this.constructor._stripAllNonNumberCharacters(toStrip, this.settings, true, this.isFocused));
              }
            }

            setValue = false;
          }
        }

        if (currentValue === '') {
          switch (this.settings.emptyInputBehavior) {
            case AutoNumeric.options.emptyInputBehavior.focus:
            case AutoNumeric.options.emptyInputBehavior["null"]:
            case AutoNumeric.options.emptyInputBehavior.press:
              break;

            case AutoNumeric.options.emptyInputBehavior.always:
              this._setElementValue(this.settings.currencySymbol);

              break;

            case AutoNumeric.options.emptyInputBehavior.min:
              this.set(this.settings.minimumValue);
              break;

            case AutoNumeric.options.emptyInputBehavior.max:
              this.set(this.settings.maximumValue);
              break;

            case AutoNumeric.options.emptyInputBehavior.zero:
              this.set('0');
              break;
            // When `emptyInputBehavior` is a number or a string representing a number

            default:
              this.set(this.settings.emptyInputBehavior);
          }
        } else if (setValue && currentValue === this.domElement.getAttribute('value')) {
          this.set(currentValue);
        }
      } else if (this.settings.defaultValueOverride === null || this.settings.defaultValueOverride === currentValue) {
        this.set(currentValue);
      }
    }
    /**
     * Enhance the user experience by modifying the default `negativePositiveSignPlacement` option depending on `currencySymbol` and `currencySymbolPlacement`.
     *
     * If the user has not set the placement of the negative sign (`negativePositiveSignPlacement`), but has set a currency symbol (`currencySymbol`),
     * then we modify the default value of `negativePositiveSignPlacement` in order to keep the resulting output logical by default :
     * - "$-1,234.56" instead of "-$1,234.56" ({currencySymbol: "$", negativePositiveSignPlacement: "r"})
     * - "-1,234.56$" instead of "1,234.56-$" ({currencySymbol: "$", currencySymbolPlacement: "s", negativePositiveSignPlacement: "p"})
     *
     * @param {object} settings
     */

  }, {
    key: "_calculateVMinAndVMaxIntegerSizes",

    /**
     * Analyze and save the minimumValue and maximumValue integer size for later uses
     * @private
     */
    value: function _calculateVMinAndVMaxIntegerSizes() {
      var _this$settings$maximu = this.settings.maximumValue.toString().split('.'),
          _this$settings$maximu2 = _slicedToArray(_this$settings$maximu, 1),
          maximumValueIntegerPart = _this$settings$maximu2[0];

      var _ref = !this.settings.minimumValue && this.settings.minimumValue !== 0 ? [] : this.settings.minimumValue.toString().split('.'),
          _ref2 = _slicedToArray(_ref, 1),
          minimumValueIntegerPart = _ref2[0];

      maximumValueIntegerPart = maximumValueIntegerPart.replace(this.settings.negativeSignCharacter, '');
      minimumValueIntegerPart = minimumValueIntegerPart.replace(this.settings.negativeSignCharacter, '');
      this.settings.mIntPos = Math.max(maximumValueIntegerPart.length, 1);
      this.settings.mIntNeg = Math.max(minimumValueIntegerPart.length, 1);
    }
    /**
     * Calculate once what are the `valuesToStrings` option keys.
     * @private
     */

  }, {
    key: "_calculateValuesToStringsKeys",
    value: function _calculateValuesToStringsKeys() {
      if (this.settings.valuesToStrings) {
        this.valuesToStringsKeys = Object.keys(this.settings.valuesToStrings);
      } else {
        this.valuesToStringsKeys = [];
      }
    }
    /**
     * Caches regular expressions for _stripAllNonNumberCharactersExceptCustomDecimalChar
     *
     * @param {object} settings
     * @param {object} regex
     */

  }, {
    key: "_transformOptionsValuesToDefaultTypes",

    /**
     * Modify the user settings to make them 'exploitable' later.
     */
    value: function _transformOptionsValuesToDefaultTypes() {
      for (var key in this.settings) {
        if (Object.prototype.hasOwnProperty.call(this.settings, key)) {
          var value = this.settings[key]; // Convert the strings 'true' and 'false' to booleans

          if (value === 'true' || value === 'false') {
            this.settings[key] = value === 'true';
          } // Convert numbers in options to strings
          //TODO Only transform the values of type 'Number' to 'String' if it's a currency number (so that we can have big numbers). Do not convert other numbers (ie. `historySize`)


          if (typeof value === 'number') {
            this.settings[key] = value.toString();
          }
        }
      }
    }
    /**
     * Convert the old settings options name to new ones.
     *
     * @param {object} options
     */

  }, {
    key: "_setSettings",

    /**
     * Analyse the settings/options passed by the user, validate and clean them, then set them into `this.settings`.
     * Note: This sets the settings to `null` if somehow the settings objet is undefined or empty
     *       If only `decimalPlaces` is defined in the option, overwrite the other decimalPlaces* options, otherwise, use those options
     *
     * @param {object} options
     * @param {boolean} update - If set to `true`, then the settings already exists and this function only updates them instead of recreating them from scratch
     * @throws
     */
    value: function _setSettings(options) {
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // If the user used old options, we convert them to new ones
      if (update || !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options)) {
        this.constructor._convertOldOptionsToNewOnes(options);
      }

      if (update) {
        // The settings are updated
        // Update the original data, if it has changed
        var decimalPlacesRawValueInOptions = ('decimalPlacesRawValue' in options);

        if (decimalPlacesRawValueInOptions) {
          this.settings.originalDecimalPlacesRawValue = options.decimalPlacesRawValue;
        }

        var decimalPlacesInOptions = ('decimalPlaces' in options);

        if (decimalPlacesInOptions) {
          this.settings.originalDecimalPlaces = options.decimalPlaces;
        } // Then update all the `decimalPlaces*` options


        this.constructor._calculateDecimalPlacesOnUpdate(options, this.settings); // Finally generate the updated settings object to use


        this._mergeSettings(options); //TODO Check that the `styleRules` option is correctly cloned (due to depth cloning limitation)

      } else {
        // The settings are generated for the first time
        this.settings = {}; // If we couldn't grab any settings, create them from the default ones and combine them with the options passed as a parameter as well as with the HTML5 `data-*` info (via `this.domElement.dataset`), if any.

        this._mergeSettings(this.constructor.getDefaultConfig(), this.domElement.dataset, options, {
          rawValue: this.defaultRawValue
        });

        this.caretFix = false;
        this.throwInput = true; // Throw input event

        this.allowedTagList = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].allowedTagList;
        this.runOnce = false;
        this.hoveredWithAlt = false; // Keep tracks if the current AutoNumeric element is hovered by the mouse cursor while `Alt` is pressed
      } // Modify the user settings to make them 'exploitable'


      this._transformOptionsValuesToDefaultTypes(); // Immediately run the callbacks that could update the settings object


      this._runCallbacksFoundInTheSettingsObject(); // Improve the `negativePositiveSignPlacement` option if needed


      this.constructor._correctNegativePositiveSignPlacementOption(this.settings); // Set the `caretPositionOnFocus` and `selectOnFocus` options so that they do not conflict, if one of those have been set manually by the user.
      // If order to check that, we take a look at the original options the user passed as an argument, not `this.settings` that have been merged with the default settings. //TODO Check the validity of that comment


      this.constructor._correctCaretPositionOnFocusAndSelectOnFocusOptions(this.settings); // Define if the negative or positive signs are allowed


      this.constructor._setNegativePositiveSignPermissions(this.settings); // Calculate the number of decimal places (during the element initialization)


      if (!update) {
        // Make sure the `originalDecimalPlaces` info is set
        if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options) || !options.decimalPlaces) {
          this.settings.originalDecimalPlaces = null;
        } else {
          this.settings.originalDecimalPlaces = options.decimalPlaces;
        } // Save the `originalDecimalPlacesRawValue` info


        this.settings.originalDecimalPlacesRawValue = this.settings.decimalPlacesRawValue; // Then update all the `decimalPlaces*` options

        this.constructor._calculateDecimalPlacesOnInit(this.settings);
      } // Additional changes to the settings object


      this._calculateVMinAndVMaxIntegerSizes();

      this._setTrailingNegativeSignInfo();

      this.regex = {}; // Create the object that will store the regular expressions

      this.constructor._cachesUsualRegularExpressions(this.settings, this.regex);

      this.constructor._setBrackets(this.settings);

      this._calculateValuesToStringsKeys(); // Validate the settings. Both tests throws if necessary.


      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isEmptyObj(this.settings)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError('Unable to set the settings, those are invalid ; an empty object was given.');
      }

      this.constructor.validate(this.settings, false, options); // Original settings saved for use when decimalPlacesShownOnFocus, divisorWhenUnfocused & showOnlyNumbersOnFocus options are being used

      this._keepAnOriginalSettingsCopy();
    }
    /**
     * Define if the negative or positive signs are allowed, and update the given settings object directly.
     *
     * @param {object} settings
     * @private
     */

  }, {
    key: "_preparePastedText",

    /**
     * Return the pasted text that will be used, by stripping most non-numeric characters
     *
     * @param {string} text
     * @returns {string}
     */
    value: function _preparePastedText(text) {
      return this.constructor._stripAllNonNumberCharacters(text, this.settings, true, this.isFocused);
    }
    /**
     * Return TRUE if the given value (a number as a string) is within the range set in the settings `minimumValue` and `maximumValue`, FALSE otherwise.
     *
     * @param {string} value
     * @param {object} parsedMinValue Parsed via the `parseStr()` function
     * @param {object} parsedMaxValue Parsed via the `parseStr()` function
     * @returns {boolean}
     */

  }, {
    key: "_updateInternalProperties",

    /**
     * Update the selection values as well as resets the internal state of the current AutoNumeric object.
     * This keeps tracks of the current selection and resets the 'processed' state.
     *
     * Note : This state can change between the keydown, keypress and keyup events, that's why
     *        this function is called on each event handler.
     *
     * @private
     */
    value: function _updateInternalProperties() {
      this.selection = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementSelection(this.domElement);
      this.processed = false;
    }
    /**
     * Update the `event.key` attribute that triggered the given event.
     *
     * `event.key` describes:
     * - the key name (if a non-printable character),
     * - or directly the character that result from the key press used to trigger the event.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
     * The key list is described here:
     * @link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
     *
     * @param {Event|KeyboardEvent} e
     * @private
     */

  }, {
    key: "_updateEventKeyInfo",
    value: function _updateEventKeyInfo(e) {
      this.eventKey = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].character(e);
    }
    /**
     * Save the unformatted element value.
     * This is used in the 'cancellable' feature where the element value is saved on focus and input validation, to be used if the user wants to cancel his modifications by hitting the 'Escape' key.
     *
     * @private
     */

  }, {
    key: "_saveCancellableValue",
    value: function _saveCancellableValue() {
      this.savedCancellableValue = this.rawValue;
    }
    /**
     * Set the text selection inside the input with the given start and end position.
     *
     * @param {int} start
     * @param {int} end
     * @private
     */

  }, {
    key: "_setSelection",
    value: function _setSelection(start, end) {
      //TODO use this function to replace the direct calls to `setElementSelection()`, wherever possible
      start = Math.max(start, 0);
      end = Math.min(end, _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement).length);
      this.selection = {
        start: start,
        end: end,
        length: end - start
      };
      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementSelection(this.domElement, start, end);
    }
    /**
     * Set the caret position inside the input at the given position.
     *
     * @param {int} position
     * @private
     */

  }, {
    key: "_setCaretPosition",
    value: function _setCaretPosition(position) {
      this._setSelection(position, position);
    }
    /**
     * Return an array containing the string parts located on the left and right side of the caret or selection.
     * Those parts are left 'untouched', ie. formatted by autoNumeric.
     *
     * @returns {[string, string]} The parts on the left and right of the caret or selection
     * @private
     */

  }, {
    key: "_getLeftAndRightPartAroundTheSelection",
    value: function _getLeftAndRightPartAroundTheSelection() {
      var value = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement);
      var left = value.substring(0, this.selection.start);
      var right = value.substring(this.selection.end, value.length);
      return [left, right];
    }
    /**
     * Return an array containing the string parts located on the left and right side of the caret or selection.
     * Those parts are unformatted (stripped) of any non-numbers characters, and any trailing negative character is put back on the left hand side of the number.
     *
     * @returns {[string, string]} The parts on the left and right of the caret or selection, unformatted.
     * @private
     */

  }, {
    key: "_getUnformattedLeftAndRightPartAroundTheSelection",
    value: function _getUnformattedLeftAndRightPartAroundTheSelection() {
      var _this$_getLeftAndRigh = this._getLeftAndRightPartAroundTheSelection(),
          _this$_getLeftAndRigh2 = _slicedToArray(_this$_getLeftAndRigh, 2),
          left = _this$_getLeftAndRigh2[0],
          right = _this$_getLeftAndRigh2[1];

      if (left === '' && right === '') {
        return ['', ''];
      } // If changing the sign and `left` is equal to the number zero, prevent stripping the leading zero(s)


      var stripZeros = true;

      if ((this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Hyphen || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Minus) && Number(left) === 0) {
        stripZeros = false;
      } //TODO DRY that with `_normalizeParts()` -->


      if (this.isTrailingNegative && (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(right, this.settings.negativeSignCharacter) && // The caret is placed on the left of the negative sign
      !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(left, this.settings.negativeSignCharacter) || right === '' && // ..or the caret is placed on the far right of the input (Fix issue #481)
      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(left, this.settings.negativeSignCharacter, true))) {
        left = left.replace(this.settings.negativeSignCharacter, '');
        right = right.replace(this.settings.negativeSignCharacter, ''); // This is done here because `_getUnformattedLeftAndRightPartAroundTheSelection()` is called multiple times during the same key event, and at one point the left/right value has been normalized already..

        left = left.replace('-', '');
        right = right.replace('-', ''); // Then finally set back the normalized minus character at the right place

        left = "-".concat(left);
      }

      left = AutoNumeric._stripAllNonNumberCharactersExceptCustomDecimalChar(left, this.settings, stripZeros, this.isFocused);
      right = AutoNumeric._stripAllNonNumberCharactersExceptCustomDecimalChar(right, this.settings, false, this.isFocused);
      return [left, right];
    }
    /**
     * Strip parts from excess characters and leading zeros.
     *
     * @param {string} left
     * @param {string} right
     * @returns {[*,*,*]}
     * @private
     */

  }, {
    key: "_normalizeParts",
    value: function _normalizeParts(left, right) {
      //TODO Refactor with `_getUnformattedLeftAndRightPartAroundTheSelection` which share a lot of similar code
      // If changing the sign and left is equal to the number zero - prevents stripping the leading zeros
      var stripZeros = true;

      if ((this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Hyphen || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Minus) && Number(left) === 0) {
        stripZeros = false;
      }

      if (this.isTrailingNegative && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(right, this.settings.negativeSignCharacter) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(left, this.settings.negativeSignCharacter)) {
        // Only set the negative sign if the value is negative
        left = "-".concat(left);
        right = right.replace(this.settings.negativeSignCharacter, '');
      }

      left = AutoNumeric._stripAllNonNumberCharactersExceptCustomDecimalChar(left, this.settings, stripZeros, this.isFocused);
      right = AutoNumeric._stripAllNonNumberCharactersExceptCustomDecimalChar(right, this.settings, false, this.isFocused); // Prevents multiple leading zeros from being entered

      if (this.settings.leadingZero === AutoNumeric.options.leadingZero.deny && (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.num0 || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.numpad0) && Number(left) === 0 && // If `right` is not empty and the first character is not `decimalCharacter`
      !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(left, this.settings.decimalCharacter) && right !== '') {
        left = left.substring(0, left.length - 1);
      } // Insert zero there is a leading dot


      var newValue = left + right;

      if (this.settings.decimalCharacter) {
        var m = newValue.match(new RegExp("^".concat(this.regex.aNegRegAutoStrip, "\\").concat(this.settings.decimalCharacter)));

        if (m) {
          left = left.replace(m[1], m[1] + '0');
          newValue = left + right;
        }
      }

      return [left, right, newValue];
    }
    /**
     * Set the formatted element value as well as the `rawValue`.
     * This returns `true` if the element and raw value have been modified, `false` otherwise.
     * This method also adjust the caret position according to the `leadingZero` option and the normalized value. //TODO What about the cursor *selection*?
     *
     * @param {string} left
     * @param {string} right
     * @param {boolean} isPaste
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_setValueParts",
    value: function _setValueParts(left, right) {
      var isPaste = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var _this$_normalizeParts = this._normalizeParts(left, right),
          _this$_normalizeParts2 = _slicedToArray(_this$_normalizeParts, 3),
          normalizedLeft = _this$_normalizeParts2[0],
          normalizedRight = _this$_normalizeParts2[1],
          normalizedNewValue = _this$_normalizeParts2[2];

      var _AutoNumeric$_checkIf = AutoNumeric._checkIfInRangeWithOverrideOption(normalizedNewValue, this.settings),
          _AutoNumeric$_checkIf2 = _slicedToArray(_AutoNumeric$_checkIf, 2),
          minTest = _AutoNumeric$_checkIf2[0],
          maxTest = _AutoNumeric$_checkIf2[1];

      if (minTest && maxTest) {
        // First, set the raw value
        var roundedRawValue = AutoNumeric._truncateDecimalPlaces(normalizedNewValue, this.settings, isPaste, this.settings.decimalPlacesRawValue);

        var testValue = roundedRawValue.replace(this.settings.decimalCharacter, '.');

        if (testValue === '' || testValue === this.settings.negativeSignCharacter) {
          var valueToSetOnEmpty;

          switch (this.settings.emptyInputBehavior) {
            case AutoNumeric.options.emptyInputBehavior.focus:
            case AutoNumeric.options.emptyInputBehavior.press:
            case AutoNumeric.options.emptyInputBehavior.always:
              valueToSetOnEmpty = '';
              break;

            case AutoNumeric.options.emptyInputBehavior.min:
              valueToSetOnEmpty = this.settings.minimumValue;
              break;

            case AutoNumeric.options.emptyInputBehavior.max:
              valueToSetOnEmpty = this.settings.maximumValue;
              break;

            case AutoNumeric.options.emptyInputBehavior.zero:
              valueToSetOnEmpty = '0';
              break;

            case AutoNumeric.options.emptyInputBehavior["null"]:
              valueToSetOnEmpty = null;
              break;
            // When `emptyInputBehavior` is a number or a string representing a number

            default:
              valueToSetOnEmpty = this.settings.emptyInputBehavior;
          }

          this._setRawValue(valueToSetOnEmpty);
        } else {
          this._setRawValue(this._trimLeadingAndTrailingZeros(testValue));
        } // Then set the formatted value


        var roundedValueToShow = AutoNumeric._truncateDecimalPlaces(normalizedNewValue, this.settings, isPaste, this.settings.decimalPlacesShownOnFocus);

        var position = normalizedLeft.length;

        if (position > roundedValueToShow.length) {
          position = roundedValueToShow.length;
        } // Make sure when the user enter a '0' on the far left with a leading zero option set to 'deny', that the caret does not moves since the input is dropped (fix issue #283)


        if (position === 1 && normalizedLeft === '0' && this.settings.leadingZero === AutoNumeric.options.leadingZero.deny) {
          // If the user enter `0`, then the caret is put on the right side of it (Fix issue #299)
          if (normalizedRight === '' || normalizedLeft === '0' && normalizedRight !== '') {
            position = 1;
          } else {
            position = 0;
          }
        }

        this._setElementValue(roundedValueToShow, false);

        this._setCaretPosition(position);

        return true;
      }

      this._triggerRangeEvents(minTest, maxTest);

      return false;
    }
    /**
     * Helper function for `_expandSelectionOnSign()`.
     *
     * @returns {Array} Array containing [signPosition, currencySymbolPosition] of a formatted value
     * @private
     */

  }, {
    key: "_getSignPosition",
    value: function _getSignPosition() {
      var result;

      if (this.settings.currencySymbol) {
        var currencySymbolLen = this.settings.currencySymbol.length;
        var value = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement);

        if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix) {
          var hasNeg = this.settings.negativeSignCharacter && value && value.charAt(0) === this.settings.negativeSignCharacter;

          if (hasNeg) {
            result = [1, currencySymbolLen + 1];
          } else {
            result = [0, currencySymbolLen];
          }
        } else {
          var valueLen = value.length;
          result = [valueLen - currencySymbolLen, valueLen];
        }
      } else {
        result = [1000, -1];
      }

      return result;
    }
    /**
     * Expands selection to cover whole sign
     * Prevents partial deletion/copying/overwriting of a sign
     * @private
     */

  }, {
    key: "_expandSelectionOnSign",
    value: function _expandSelectionOnSign() {
      var _this$_getSignPositio = this._getSignPosition(),
          _this$_getSignPositio2 = _slicedToArray(_this$_getSignPositio, 2),
          signPosition = _this$_getSignPositio2[0],
          currencySymbolPosition = _this$_getSignPositio2[1];

      var selection = this.selection; // If selection catches something except sign and catches only space from sign

      if (selection.start < currencySymbolPosition && selection.end > signPosition) {
        // Then select without empty space
        if ((selection.start < signPosition || selection.end > currencySymbolPosition) && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement).substring(Math.max(selection.start, signPosition), Math.min(selection.end, currencySymbolPosition)).match(/^\s*$/)) {
          if (selection.start < signPosition) {
            this._setSelection(selection.start, signPosition);
          } else {
            this._setSelection(currencySymbolPosition, selection.end);
          }
        } else {
          // Else select with whole sign
          this._setSelection(Math.min(selection.start, signPosition), Math.max(selection.end, currencySymbolPosition));
        }
      }
    }
    /**
     * Try to strip pasted value to digits
     */

  }, {
    key: "_checkPaste",
    value: function _checkPaste() {
      // Do not process anything if the value has already been formatted
      if (this.formatted) {
        return;
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(this.valuePartsBeforePaste)) {
        var oldParts = this.valuePartsBeforePaste;

        var _this$_getLeftAndRigh3 = this._getLeftAndRightPartAroundTheSelection(),
            _this$_getLeftAndRigh4 = _slicedToArray(_this$_getLeftAndRigh3, 2),
            left = _this$_getLeftAndRigh4[0],
            right = _this$_getLeftAndRigh4[1]; // Try to strip the pasted value first


        delete this.valuePartsBeforePaste;

        var modifiedLeftPart = left.substr(0, oldParts[0].length) + AutoNumeric._stripAllNonNumberCharactersExceptCustomDecimalChar(left.substr(oldParts[0].length), this.settings, true, this.isFocused);

        if (!this._setValueParts(modifiedLeftPart, right, true)) {
          this._setElementValue(oldParts.join(''), false);

          this._setCaretPosition(oldParts[0].length);
        }
      }
    }
    /**
     * Return `true` if the given key should be ignored or not.
     *
     * @param {string} eventKeyName
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_processNonPrintableKeysAndShortcuts",

    /**
     * Process copying, cutting and pasting, as well as undo/redoing and cursor moving.
     * Return `true` if further processing should not be performed.
     *
     * @param {KeyboardEvent} e
     * @returns {boolean}
     * @private
     */
    value: function _processNonPrintableKeysAndShortcuts(e) {
      // Catch the ctrl up on ctrl-v
      if ((e.ctrlKey || e.metaKey) && e.type === 'keyup' && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(this.valuePartsBeforePaste) || e.shiftKey && this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Insert) {
        //TODO Move this test inside the `onKeyup` handler
        this._checkPaste();

        return false;
      } // Skip all function keys (F1-F12), Windows keys, tab and other special keys


      if (this.constructor._shouldSkipEventKey(this.eventKey)) {
        return true;
      } // If a "Select all" keyboard shortcut is detected (ctrl + a)


      if ((e.ctrlKey || e.metaKey) && this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.a) {
        if (this.settings.selectNumberOnly) {
          // `preventDefault()` is used here to prevent the browser to first select all the input text (including the currency sign), otherwise we would see that whole selection first in a flash, then the selection with only the number part without the currency sign.
          e.preventDefault(); //TODO replace `selectNumber` by `select`?

          this.selectNumber();
        }

        return true;
      } // If a "Copy", "Paste" or "Cut" keyboard shortcut is detected (respectively 'ctrl + c', 'ctrl + v' or 'ctrl + x')


      if ((e.ctrlKey || e.metaKey) && (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.c || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.v || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.x)) {
        if (e.type === 'keydown') {
          this._expandSelectionOnSign();
        } // Try to prevent wrong paste


        if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.v || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Insert) {
          if (e.type === 'keydown' || e.type === 'keypress') {
            if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(this.valuePartsBeforePaste)) {
              this.valuePartsBeforePaste = this._getLeftAndRightPartAroundTheSelection();
            }
          } else {
            this._checkPaste();
          }
        }

        return e.type === 'keydown' || e.type === 'keypress' || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.c;
      } // If the ctrl/meta key is used (during the undo shortcut for instance)


      if (e.ctrlKey || e.metaKey) {
        return !(this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Z || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.z);
      } // Jump over the thousand separator
      //TODO Move this test inside the `onKeydown` handler


      if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.LeftArrow || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.RightArrow) {
        if (e.type === 'keydown' && !e.shiftKey) {
          var value = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement);

          if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.LeftArrow && (value.charAt(this.selection.start - 2) === this.settings.digitGroupSeparator || value.charAt(this.selection.start - 2) === this.settings.decimalCharacter)) {
            this._setCaretPosition(this.selection.start - 1);
          } else if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.RightArrow && (value.charAt(this.selection.start + 1) === this.settings.digitGroupSeparator || value.charAt(this.selection.start + 1) === this.settings.decimalCharacter)) {
            this._setCaretPosition(this.selection.start + 1);
          }
        }

        return true;
      }

      return _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(this.eventKey, _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName._directionKeys);
    }
    /**
     * Process deletion of characters when the minus sign is to the right of the numeric characters.
     *
     * @param {string[]} leftAndRight The parts on the left and on the right of the caret or selection as an array with [left, right]
     * @returns {string[]} Processed left and right as an array with [left, right]
     * @private
     */

  }, {
    key: "_processCharacterDeletionIfTrailingNegativeSign",
    value: function _processCharacterDeletionIfTrailingNegativeSign(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          left = _ref4[0],
          right = _ref4[1];

      var value = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement);
      var isValNegative = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(value, this.settings.negativeSignCharacter);

      if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix && this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.suffix) {
        if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Backspace) {
          this.caretFix = this.selection.start >= value.indexOf(this.settings.suffixText) && this.settings.suffixText !== '';

          if (value.charAt(this.selection.start - 1) === '-') {
            left = left.substring(1);
          } else if (this.selection.start <= value.length - this.settings.suffixText.length) {
            left = left.substring(0, left.length - 1);
          }
        } else {
          this.caretFix = this.selection.start >= value.indexOf(this.settings.suffixText) && this.settings.suffixText !== '';

          if (this.selection.start >= value.indexOf(this.settings.currencySymbol) + this.settings.currencySymbol.length) {
            right = right.substring(1, right.length);
          }

          if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(left, this.settings.negativeSignCharacter) && value.charAt(this.selection.start) === '-') {
            left = left.substring(1);
          }
        }
      }

      if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) {
        switch (this.settings.negativePositiveSignPlacement) {
          case AutoNumeric.options.negativePositiveSignPlacement.left:
            this.caretFix = this.selection.start >= value.indexOf(this.settings.negativeSignCharacter) + this.settings.negativeSignCharacter.length;

            if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Backspace) {
              if (this.selection.start === value.indexOf(this.settings.negativeSignCharacter) + this.settings.negativeSignCharacter.length && isValNegative) {
                left = left.substring(1);
              } else if (left !== '-' && (this.selection.start <= value.indexOf(this.settings.negativeSignCharacter) || !isValNegative)) {
                left = left.substring(0, left.length - 1);
              }
            } else {
              if (left[0] === '-') {
                right = right.substring(1);
              }

              if (this.selection.start === value.indexOf(this.settings.negativeSignCharacter) && isValNegative) {
                left = left.substring(1);
              }
            }

            break;

          case AutoNumeric.options.negativePositiveSignPlacement.right:
            this.caretFix = this.selection.start >= value.indexOf(this.settings.negativeSignCharacter) + this.settings.negativeSignCharacter.length;

            if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Backspace) {
              if (this.selection.start === value.indexOf(this.settings.negativeSignCharacter) + this.settings.negativeSignCharacter.length) {
                left = left.substring(1);
              } else if (left !== '-' && this.selection.start <= value.indexOf(this.settings.negativeSignCharacter) - this.settings.currencySymbol.length) {
                left = left.substring(0, left.length - 1);
              } else if (left !== '' && !isValNegative) {
                left = left.substring(0, left.length - 1);
              }
            } else {
              this.caretFix = this.selection.start >= value.indexOf(this.settings.currencySymbol) && this.settings.currencySymbol !== '';

              if (this.selection.start === value.indexOf(this.settings.negativeSignCharacter)) {
                left = left.substring(1);
              }

              right = right.substring(1);
            }

            break;
        }
      }

      return [left, right];
    }
    /**
     * Process the deletion of characters.
     * Returns `true` if the deletion is allowed (within the min and max range, according to the `overrideMinMaxLimits` option, `false` otherwise.
     *
     * @returns {boolean}
     */

  }, {
    key: "_processCharacterDeletion",
    value: function _processCharacterDeletion() {
      var left;
      var right;

      if (!this.selection.length) {
        var _this$_getUnformatted = this._getUnformattedLeftAndRightPartAroundTheSelection();

        var _this$_getUnformatted2 = _slicedToArray(_this$_getUnformatted, 2);

        left = _this$_getUnformatted2[0];
        right = _this$_getUnformatted2[1];

        if (left === '' && right === '') {
          this.throwInput = false;
        }

        if (this.isTrailingNegative && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement), this.settings.negativeSignCharacter)) {
          var _this$_processCharact = this._processCharacterDeletionIfTrailingNegativeSign([left, right]);

          var _this$_processCharact2 = _slicedToArray(_this$_processCharact, 2);

          left = _this$_processCharact2[0];
          right = _this$_processCharact2[1];
        } else {
          if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Backspace) {
            left = left.substring(0, left.length - 1);
          } else {
            right = right.substring(1, right.length);
          }
        }
      } else {
        this._expandSelectionOnSign();

        var _this$_getUnformatted3 = this._getUnformattedLeftAndRightPartAroundTheSelection();

        var _this$_getUnformatted4 = _slicedToArray(_this$_getUnformatted3, 2);

        left = _this$_getUnformatted4[0];
        right = _this$_getUnformatted4[1];
      }

      if (!this.constructor._isWithinRangeWithOverrideOption("".concat(left).concat(right), this.settings)) {
        // If the result with the deletion would be out of the range, we prevent it
        return false;
      }

      this._setValueParts(left, right);

      return true;
    }
    /**
     * Return `true` if a decimal character is allowed to be typed.
     * If the number of decimal places shown on focus is zero, then the decimal character is not allowed.
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isDecimalCharacterInsertionAllowed",
    value: function _isDecimalCharacterInsertionAllowed() {
      return String(this.settings.decimalPlacesShownOnFocus) !== String(AutoNumeric.options.decimalPlacesShownOnFocus.none) && String(this.settings.decimalPlaces) !== String(AutoNumeric.options.decimalPlaces.none);
    }
    /**
     * Return `true` if the key is allowed.
     * This function decides if the key pressed should be dropped or accepted, and modify the value 'on-the-fly' accordingly.
     * //TODO This should use another function in order to separate the test and the modification
     *
     * @returns {boolean}
     */

  }, {
    key: "_processCharacterInsertion",
    value: function _processCharacterInsertion() {
      var _this$_getUnformatted5 = this._getUnformattedLeftAndRightPartAroundTheSelection(),
          _this$_getUnformatted6 = _slicedToArray(_this$_getUnformatted5, 2),
          left = _this$_getUnformatted6[0],
          right = _this$_getUnformatted6[1];

      if (this.eventKey !== _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.AndroidDefault) {
        this.throwInput = true;
      } // Start rules when the decimal character key is pressed always use numeric pad dot to insert decimal separator
      // Do not allow decimal character if no decimal part allowed


      if (this.eventKey === this.settings.decimalCharacter || this.settings.decimalCharacterAlternative && this.eventKey === this.settings.decimalCharacterAlternative) {
        if (!this._isDecimalCharacterInsertionAllowed() || !this.settings.decimalCharacter) {
          return false;
        }

        if (this.settings.alwaysAllowDecimalCharacter) {
          // Remove any previous decimal character
          left = left.replace(this.settings.decimalCharacter, '');
          right = right.replace(this.settings.decimalCharacter, '');
        } else {
          // Do not allow a decimal character if another decimal character is already present
          if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(left, this.settings.decimalCharacter)) {
            return true;
          } // Prevent adding a decimal character at the far right of the number


          if (right.indexOf(this.settings.decimalCharacter) > 0) {
            return true;
          } // Remove the decimal character is found on the far left of the right part


          if (right.indexOf(this.settings.decimalCharacter) === 0) {
            right = right.substr(1);
          }
        } // If the user is trying to add a decimal character on the far left of the number, we allow it


        if (this.settings.negativeSignCharacter && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(right, this.settings.negativeSignCharacter)) {
          // We need however to move the negative sign from the right to the left part
          left = "".concat(this.settings.negativeSignCharacter).concat(left);
          right = right.replace(this.settings.negativeSignCharacter, '');
        }

        this._setValueParts(left + this.settings.decimalCharacter, right);

        return true;
      } // Prevent entering the minus sign if it's not allowed (Note: `this.settings.isNegativeSignAllowed` is only set to `true` if the minimumValue is lower than zero, allowing negative numbers to be entered)


      if ((this.eventKey === '-' || this.eventKey === '+') && this.settings.isNegativeSignAllowed) {
        // Here, the left and right parts have been normalized already, hence the minus sign usage
        if (left === '' && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(right, '-')) {
          // The value is originally negative (with a trailing negative sign)
          right = right.replace('-', '');
        } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegativeStrict(left, '-')) {
          // The value is originally negative (with a leading negative sign)
          // Remove the negative sign, effectively converting the value to a positive one
          left = left.replace('-', ''); //TODO replace with '+' if `showPositiveSign` too?
        } else {
          // The value is originally positive, so we toggle the state to a negative one (unformatted, which means even with a trailing negative sign, we add the minus sign on the far left)
          left = "".concat(this.settings.negativeSignCharacter).concat(left);
        }

        this._setValueParts(left, right);

        return true;
      }

      var eventNumber = Number(this.eventKey);

      if (eventNumber >= 0 && eventNumber <= 9) {
        // If the user tries to insert a digit
        if (this.settings.isNegativeSignAllowed && left === '' && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(right, '-')) {
          // ...and that digit is before the minus sign
          left = '-';
          right = right.substring(1, right.length);
        }

        if (this.settings.maximumValue <= 0 && this.settings.minimumValue < this.settings.maximumValue && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement), this.settings.negativeSignCharacter) && this.eventKey !== '0') {
          left = "-".concat(left);
        }

        this._setValueParts("".concat(left).concat(this.eventKey), right);

        return true;
      } // Prevent any other characters


      this.throwInput = false;
      return false;
    }
    /**
     * Formatting of just processed value while keeping the cursor position
     *
     * @param {Event} e
     * @private
     */

  }, {
    key: "_formatValue",
    value: function _formatValue(e) {
      //TODO Break apart and simplify this really long function
      var elementValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(this.domElement);

      var _this$_getUnformatted7 = this._getUnformattedLeftAndRightPartAroundTheSelection(),
          _this$_getUnformatted8 = _slicedToArray(_this$_getUnformatted7, 1),
          left = _this$_getUnformatted8[0]; // No grouping separator and no currency sign


      if ((this.settings.digitGroupSeparator === '' || this.settings.digitGroupSeparator !== '' && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(elementValue, this.settings.digitGroupSeparator)) && (this.settings.currencySymbol === '' || this.settings.currencySymbol !== '' && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(elementValue, this.settings.currencySymbol))) {
        var _elementValue$split = elementValue.split(this.settings.decimalCharacter),
            _elementValue$split2 = _slicedToArray(_elementValue$split, 1),
            subParts = _elementValue$split2[0];

        var negativeSign = '';

        if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(subParts, this.settings.negativeSignCharacter)) {
          negativeSign = this.settings.negativeSignCharacter;
          subParts = subParts.replace(this.settings.negativeSignCharacter, '');
          left = left.replace('-', ''); // Here we modify the unformatted value (with the 'normal' minus sign)
        } // Strip leading zero on positive value if needed


        if (negativeSign === '' && subParts.length > this.settings.mIntPos && left.charAt(0) === '0') {
          left = left.slice(1);
        } // Strip leading zero on negative value if needed


        if (negativeSign === this.settings.negativeSignCharacter && subParts.length > this.settings.mIntNeg && left.charAt(0) === '0') {
          left = left.slice(1);
        }

        if (!this.isTrailingNegative) {
          // Only add the minus sign if it's needed on that side of the numbers
          left = "".concat(negativeSign).concat(left);
        }
      }

      var value = this.constructor._addGroupSeparators(elementValue, this.settings, this.isFocused, this.rawValue);

      var position = value.length;

      if (value) {
        // Prepare regexp which searches for cursor position from unformatted left part
        var leftAr = left.split(''); // Fixes caret position with trailing minus sign

        if ((this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.suffix || this.settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.prefix && this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) && leftAr[0] === this.settings.negativeSignCharacter && !this.settings.isNegativeSignAllowed) {
          leftAr.shift(); // Remove the negative sign character

          if ((this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Backspace || this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Delete) && this.caretFix) {
            if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix && this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.left || this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix && this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.suffix) {
              leftAr.push(this.settings.negativeSignCharacter);
              this.caretFix = e.type === 'keydown';
            }

            if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix && this.settings.negativePositiveSignPlacement === AutoNumeric.options.negativePositiveSignPlacement.right) {
              var signParts = this.settings.currencySymbol.split('');
              var escapeChr = ['\\', '^', '$', '.', '|', '?', '*', '+', '(', ')', '['];
              var escapedParts = [];
              signParts.forEach(function (i, miniParts) {
                miniParts = signParts[i];

                if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(miniParts, escapeChr)) {
                  escapedParts.push('\\' + miniParts);
                } else {
                  escapedParts.push(miniParts);
                }
              });

              if (this.eventKey === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Backspace && this.settings.negativeSignCharacter === '-') {
                escapedParts.push('-');
              } // Pushing the escaped sign


              leftAr.push(escapedParts.join(''));
              this.caretFix = e.type === 'keydown';
            }
          }
        }

        for (var i = 0; i < leftAr.length; i++) {
          if (!leftAr[i].match('\\d')) {
            leftAr[i] = '\\' + leftAr[i];
          }
        }

        var leftReg;

        if (this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) {
          leftReg = new RegExp("^.*?".concat(leftAr.join('.*?')));
        } else {
          // prefix is assumed
          leftReg = new RegExp("^.*?".concat(this.settings.currencySymbol).concat(leftAr.join('.*?'))); // Fixes issue #647 when using a currency that has some characters in it that matches the value we just entered (ie. numbers in the currency)
        } // Search cursor position in formatted value


        var newLeft = value.match(leftReg);

        if (newLeft) {
          position = newLeft[0].length; // If the positive sign is shown, calculate the caret position accordingly

          if (this.settings.showPositiveSign) {
            if (position === 0 && newLeft.input.charAt(0) === this.settings.positiveSignCharacter) {
              position = newLeft.input.indexOf(this.settings.currencySymbol) === 1 ? this.settings.currencySymbol.length + 1 : 1;
            }

            if (position === 0 && newLeft.input.charAt(this.settings.currencySymbol.length) === this.settings.positiveSignCharacter) {
              position = this.settings.currencySymbol.length + 1;
            }
          } // If we are just before the sign which is in prefix position


          if ((position === 0 && value.charAt(0) !== this.settings.negativeSignCharacter || position === 1 && value.charAt(0) === this.settings.negativeSignCharacter) && this.settings.currencySymbol && this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix) {
            // Place caret after prefix sign
            //TODO Should the test be 'isNegative' instead of 'isNegativeStrict' in order to search for '-' everywhere in the string?
            position = this.settings.currencySymbol.length + (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegativeStrict(value, this.settings.negativeSignCharacter) ? 1 : 0);
          }
        } else {
          if (this.settings.currencySymbol && this.settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) {
            // If we could not find a place for cursor and have a sign as a suffix
            // Place caret before suffix currency sign
            position -= this.settings.currencySymbol.length;
          }

          if (this.settings.suffixText) {
            // If we could not find a place for cursor and have a suffix
            // Place caret before suffix
            position -= this.settings.suffixText.length;
          }
        }
      } // Only update the value if it has changed. This prevents modifying the selection, if any.


      if (value !== elementValue) {
        this._setElementValue(value, false);

        this._setCaretPosition(position);
      }

      this.formatted = true; //TODO Rename `this.formatted` to `this._formatExecuted`, since it's possible this function does not need to format anything (in the case where the keycode is dropped for instance)
    }
    /**
     * Serialize the form child <input> element values to a string, or an Array.
     * The output format is defined with the `formatType` argument.
     * This is loosely based upon http://stackoverflow.com/a/40705993/2834898.
     *
     * @param {HTMLFormElement} form
     * @param {boolean} intoAnArray If `true`, instead of generating a string, it generates an Array.
     * @param {string} formatType If `'unformatted'`, then the AutoNumeric elements values are unformatted, if `'localized'`, then the AutoNumeric elements values are localized, and if `'formatted'`, then the AutoNumeric elements values are kept formatted. In either way, this function does not modify the value of each DOM element, but only affect the value that is returned by that serialize function.
     * @param {string} serializedSpaceCharacter Can either be the '+' character, or the '%20' string.
     * @param {string|null} forcedOutputFormat If set, then this is the format that is used for the localization, instead of the default `outputFormat` option.
     * @returns {string|Array}
     * @private
     */

  }], [{
    key: "version",
    value: function version() {
      return '4.6.0';
    }
    /**
     * Take the parameters given to the AutoNumeric object, and output the three variables that are needed to finish initializing it :
     * - domElement : The target DOM element
     * - initialValue : The initial value, or `null` if none is given
     * - userOptions : The option object
     *
     * @param {object|Array|number|string} arg1
     * @param {object|Array|number|string|null} arg2
     * @param {object|Array|number|string|null} arg3
     * @returns {{domElement: *, initialValue: *, userOptions: *}}
     * @throws
     * @private
     */

  }, {
    key: "_setArgumentsValues",
    value: function _setArgumentsValues(arg1, arg2, arg3) {
      // Basic check on the argument count
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(arg1)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError('At least one valid parameter is needed in order to initialize an AutoNumeric object');
      } // Prepare the arguments in order to create the AutoNumeric object with the right values
      // Test the argument types


      var isArg1Element = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isElement(arg1);
      var isArg1String = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(arg1);
      var isArg2Object = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(arg2);
      var isArg2Array = Array.isArray(arg2) && arg2.length > 0;
      var isArg2Number = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumberOrArabic(arg2) || arg2 === '';

      var isArg2PreDefinedOptionName = this._isPreDefinedOptionValid(arg2);

      var isArg2Null = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(arg2);
      var isArg2EmptyString = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isEmptyString(arg2);
      var isArg3Object = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(arg3);
      var isArg3Array = Array.isArray(arg3) && arg3.length > 0;
      var isArg3Null = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(arg3);

      var isArg3PreDefinedOptionName = this._isPreDefinedOptionValid(arg3); // Given the parameters passed, sort the data and return a stable state before the initialization


      var domElement;
      var userOptions;
      var initialValue; //TODO Simplify those tests -->

      if (isArg1Element && isArg2Null && isArg3Null) {
        // new AutoNumeric(domElement); // With the default options
        domElement = arg1;
        initialValue = null;
        userOptions = null;
      } else if (isArg1Element && isArg2Number && isArg3Null) {
        // new AutoNumeric(domElement, 12345.789); // With the default options, and an initial value
        // new AutoNumeric(domElement, '12345.789');
        domElement = arg1;
        initialValue = arg2;
        userOptions = null;
      } else if (isArg1Element && isArg2Object && isArg3Null) {
        // new AutoNumeric(domElement, { options }); // With one option object
        domElement = arg1;
        initialValue = null;
        userOptions = arg2;
      } else if (isArg1Element && isArg2PreDefinedOptionName && isArg3Null) {
        // new AutoNumeric(domElement, 'euroPos'); // With one pre-defined option name
        domElement = arg1;
        initialValue = null;
        userOptions = this._getOptionObject(arg2);
      } else if (isArg1Element && isArg2Array && isArg3Null) {
        // new AutoNumeric(domElement, [{ options1 }, { options2 }]); // With multiple option objects (the latest option overwriting the previous ones)
        domElement = arg1;
        initialValue = null;
        userOptions = this.mergeOptions(arg2);
      } else if (isArg1Element && (isArg2Null || isArg2EmptyString) && isArg3Object) {
        // new AutoNumeric(domElement, null, { options }); // With one option object
        domElement = arg1;
        initialValue = null;
        userOptions = arg3;
      } else if (isArg1Element && (isArg2Null || isArg2EmptyString) && isArg3Array) {
        // new AutoNumeric(domElement, null, [{ options1 }, { options2 }]); // With multiple option objects
        domElement = arg1;
        initialValue = null;
        userOptions = this.mergeOptions(arg3);
      } else if (isArg1String && isArg2Null && isArg3Null) {
        // new AutoNumeric('.myCssClass > input');
        domElement = document.querySelector(arg1);
        initialValue = null;
        userOptions = null;
      } else if (isArg1String && isArg2Object && isArg3Null) {
        // new AutoNumeric('.myCssClass > input', { options });
        domElement = document.querySelector(arg1);
        initialValue = null;
        userOptions = arg2;
      } else if (isArg1String && isArg2PreDefinedOptionName && isArg3Null) {
        // new AutoNumeric('.myCssClass > input', 'euroPos');
        domElement = document.querySelector(arg1);
        initialValue = null;
        userOptions = this._getOptionObject(arg2);
      } else if (isArg1String && isArg2Array && isArg3Null) {
        // new AutoNumeric('.myCssClass > input', [{ options1 }, { options2 }]); // With multiple option objects
        domElement = document.querySelector(arg1);
        initialValue = null;
        userOptions = this.mergeOptions(arg2);
      } else if (isArg1String && (isArg2Null || isArg2EmptyString) && isArg3Object) {
        // new AutoNumeric('.myCssClass > input', null, { options });
        domElement = document.querySelector(arg1);
        initialValue = null;
        userOptions = arg3;
      } else if (isArg1String && (isArg2Null || isArg2EmptyString) && isArg3Array) {
        // new AutoNumeric('.myCssClass > input', null, [{ options1 }, { options2 }]); // With multiple option objects
        domElement = document.querySelector(arg1);
        initialValue = null;
        userOptions = this.mergeOptions(arg3);
      } else if (isArg1String && isArg2Number && isArg3Null) {
        // new AutoNumeric('.myCssClass > input', 12345.789);
        // new AutoNumeric('.myCssClass > input', '12345.789');
        // new AutoNumeric('.myCssClass > input', '');
        domElement = document.querySelector(arg1);
        initialValue = arg2;
        userOptions = null;
      } else if (isArg1String && isArg2Number && isArg3Object) {
        // new AutoNumeric('.myCssClass > input', 12345.789, { options });
        // new AutoNumeric('.myCssClass > input', '12345.789', { options });
        // new AutoNumeric('.myCssClass > input', '', { options });
        domElement = document.querySelector(arg1);
        initialValue = arg2;
        userOptions = arg3;
      } else if (isArg1String && isArg2Number && isArg3PreDefinedOptionName) {
        // new AutoNumeric('.myCssClass > input', 12345.789, 'euroPos');
        // new AutoNumeric('.myCssClass > input', '12345.789', 'euroPos');
        // new AutoNumeric('.myCssClass > input', '', 'euroPos');
        domElement = document.querySelector(arg1);
        initialValue = arg2;
        userOptions = this._getOptionObject(arg3);
      } else if (isArg1String && isArg2Number && isArg3Array) {
        // new AutoNumeric('.myCssClass > input', 12345.789, [{ options1 }, 'euroPos', { options2 }]);
        // new AutoNumeric('.myCssClass > input', '12345.789', [{ options1 }, 'euroPos', { options2 }]);
        // new AutoNumeric('.myCssClass > input', '', [{ options1 }, 'euroPos', { options2 }]);
        domElement = document.querySelector(arg1);
        initialValue = arg2;
        userOptions = this.mergeOptions(arg3);
      } else if (isArg1Element && isArg2Number && isArg3Object) {
        // new AutoNumeric(domElement, 12345.789, { options });
        // new AutoNumeric(domElement, '12345.789', { options });
        // new AutoNumeric(domElement, '', { options });
        domElement = arg1;
        initialValue = arg2;
        userOptions = arg3;
      } else if (isArg1Element && isArg2Number && isArg3PreDefinedOptionName) {
        // new AutoNumeric(domElement, 12345.789, 'euroPos');
        // new AutoNumeric(domElement, '12345.789', 'euroPos');
        // new AutoNumeric(domElement, '', 'euroPos');
        domElement = arg1;
        initialValue = arg2;
        userOptions = this._getOptionObject(arg3);
      } else if (isArg1Element && isArg2Number && isArg3Array) {
        // new AutoNumeric(domElement, 12345.789, [{ options1 }, { options2 }]);
        // new AutoNumeric(domElement, '12345.789', [{ options1 }, { options2 }]);
        // new AutoNumeric(domElement, '', [{ options1 }, { options2 }]);
        domElement = arg1;
        initialValue = arg2;
        userOptions = this.mergeOptions(arg3);
      } else {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The parameters given to the AutoNumeric object are not valid, '".concat(arg1, "', '").concat(arg2, "' and '").concat(arg3, "' given."));
      }

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(domElement)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The selector '".concat(arg1, "' did not select any valid DOM element. Please check on which element you called AutoNumeric."));
      }

      return {
        domElement: domElement,
        initialValue: initialValue,
        userOptions: userOptions
      };
    }
    /**
     * Merge the option objects found in the given array `optionsArray`.
     * If a `string` is found, then we try to get the related pre-defined option using that string as its name.
     * When merging the options, the latest option overwrite any previously set. This allows to fine tune a pre-defined option for instance.
     *
     * @param {Array<object|string>} optionsArray
     * @returns {{}}
     */

  }, {
    key: "mergeOptions",
    value: function mergeOptions(optionsArray) {
      var _this12 = this;

      // This allows the user to use multiple options (strings or objects) in an array, and overwrite the previous one with the next option element ; this is useful to tune the wanted format
      var mergedOptions = {};
      optionsArray.forEach(function (optionObjectOrPredefinedOptionString) {
        _extends(mergedOptions, _this12._getOptionObject(optionObjectOrPredefinedOptionString));
      });
      return mergedOptions;
    }
    /**
     * Return `true` if the given pre-defined option name is an attribute of the `AutoNumeric.predefinedOptions` object
     *
     * @param {string} preDefinedOptionName
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isPreDefinedOptionValid",
    value: function _isPreDefinedOptionValid(preDefinedOptionName) {
      return Object.prototype.hasOwnProperty.call(AutoNumeric.predefinedOptions, preDefinedOptionName);
    }
    /**
     * Return an option object based on the given parameter.
     * If `optionObjectOrPredefinedName` is as string, then we retrieve the pre-defined option object, if it's an object, we use it as is.
     *
     * @param {object|string} optionObjectOrPredefinedName
     * @returns {object}
     */

  }, {
    key: "_getOptionObject",
    value: function _getOptionObject(optionObjectOrPredefinedName) {
      var options;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(optionObjectOrPredefinedName)) {
        options = AutoNumeric.getPredefinedOptions()[optionObjectOrPredefinedName];

        if (options === void 0 || options === null) {
          // If the given pre-defined name does not exist, warn that something is wrong, and continue the execution of the initialization
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("The given pre-defined option [".concat(optionObjectOrPredefinedName, "] is not recognized by autoNumeric. Please check that pre-defined option name."), true);
        }
      } else {
        // A `settings` object
        options = optionObjectOrPredefinedName;
      }

      return options;
    }
  }, {
    key: "_doesFormHandlerListExists",
    value: function _doesFormHandlerListExists() {
      var type = _typeof(window.aNFormHandlerMap);

      return type !== 'undefined' && type === 'object';
    }
    /**
     * Create the global form handler list on the `window` object.
     *
     * @private
     */

  }, {
    key: "_createFormHandlerList",
    value: function _createFormHandlerList() {
      window.aNFormHandlerMap = new Map(); // I would have used a `WeakMap` here, but that does not allow using non-object for keys
    }
  }, {
    key: "_checkValuesToStringsArray",
    value: function _checkValuesToStringsArray(key, stringsArray) {
      return _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(String(key), stringsArray);
    }
    /**
     * Static helper for checking if the given `key` is found in the settings' `valuesToStrings` option object.
     *
     * @param {number|string} key
     * @param {object} settings
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_checkValuesToStringsSettings",
    value: function _checkValuesToStringsSettings(key, settings) {
      return this._checkValuesToStringsArray(key, Object.keys(settings.valuesToStrings));
    }
    /**
     * Static helper for checking if the given `value` is found in the settings' `valuesToStrings` option object.
     *
     * @param {number|string} value
     * @param {object} settings
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_checkStringsToValuesSettings",
    value: function _checkStringsToValuesSettings(value, settings) {
      return this._checkValuesToStringsArray(value, Object.values(settings.valuesToStrings));
    }
  }, {
    key: "_unformatAltHovered",
    value: function _unformatAltHovered(anElement) {
      anElement.hoveredWithAlt = true;
      anElement.unformat();
    }
    /**
     * Reformat the given AutoNumeric element, and update the `hoveredWithAlt` variable.
     *
     * @param {AutoNumeric} anElement
     * @private
     */

  }, {
    key: "_reformatAltHovered",
    value: function _reformatAltHovered(anElement) {
      anElement.hoveredWithAlt = false;
      anElement.reformat();
    }
    /**
     * Return an array of autoNumeric elements, child of the <form> element passed as a parameter.
     *
     * @param {HTMLElement} formNode
     * @returns {Array}
     * @private
     */

  }, {
    key: "_getChildANInputElement",
    value: function _getChildANInputElement(formNode) {
      var _this13 = this;

      //FIXME test this
      var inputList = formNode.getElementsByTagName('input'); // Loop this list and keep only the inputs that are managed by AutoNumeric

      var autoNumericInputs = [];
      var inputElements = Array.prototype.slice.call(inputList, 0);
      inputElements.forEach(function (input) {
        if (_this13.test(input)) {
          autoNumericInputs.push(input);
        }
      });
      return autoNumericInputs;
    } // Static methods

    /**
     * Test if the given DOM element, or the element selected by the given selector string is already managed by AutoNumeric (if it has been initialized on the current page).
     *
     * @param {HTMLElement|string} domElementOrSelector Accepts either directly a DOM element to test, or a string selector (that will return one and only one element, if any)
     * @returns {boolean}
     */

  }, {
    key: "test",
    value: function test(domElementOrSelector) {
      return this._isInGlobalList(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].domElement(domElementOrSelector));
    }
    /**
     * Create a WeakMap with the given name.
     *
     * @param {string} weakMapName
     * @private
     */

  }, {
    key: "_createWeakMap",
    value: function _createWeakMap(weakMapName) {
      window[weakMapName] = new WeakMap();
    }
    /**
     * Create a list of all the AutoNumeric elements that are initialized on the current page.
     * This is needed in order to determine if a given dom element is already managed by autoNumeric.
     * This uses a WeakMap in order to limit potential garbage collection problems.
     * (cf. my tests on http://codepen.io/AnotherLinuxUser/pen/pRQGaM?editors=1011)
     * @private
     */

  }, {
    key: "_createGlobalList",
    value: function _createGlobalList() {
      // The check that this global list does not exists already is done in the add and remove functions already
      this.autoNumericGlobalListName = 'autoNumericGlobalList'; //XXX This looks weird to set a variable on `this.` in a static method, but that really declare that variable like a static property
      // Note: I should not get any memory leaks for referencing the DOM element in the `value`, this DOM element also being the `key`, according to the spec : http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects

      this._createWeakMap(this.autoNumericGlobalListName);
    }
    /**
     * Return `true` if the global AutoNumeric element list exists.
     *
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_doesGlobalListExists",
    value: function _doesGlobalListExists() {
      var type = _typeof(window[this.autoNumericGlobalListName]);

      return type !== 'undefined' && type === 'object';
    }
    /**
     * Add the given object to the global AutoNumeric element list.
     *
     * @param {AutoNumeric} autoNumericObject
     * @private
     */

  }, {
    key: "_addToGlobalList",
    value: function _addToGlobalList(autoNumericObject) {
      if (!this._doesGlobalListExists()) {
        this._createGlobalList();
      }

      var domElement = autoNumericObject.node(); // This checks if the object is not already in the global list before adding it.
      // This could happen if an AutoNumeric element is initialized, then the DOM element is removed directly via `removeChild` (hence the reference does not get removed from the global list), then it get recreated and initialized again

      if (this._isInGlobalList(domElement)) {
        if (this._getFromGlobalList(domElement) === this) {
          // Do not add this AutoNumeric object again since it's already in that global list
          return;
        } else {
          // Print a warning to warn that the domElement already has a reference in the global map (but we cannot for sure starts deleting those old references since they could still be used by another AutoNumeric object)
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("A reference to the DOM element you just initialized already exists in the global AutoNumeric element list. Please make sure to not initialize the same DOM element multiple times.", autoNumericObject.getSettings().showWarnings);
        }
      }

      window[this.autoNumericGlobalListName].set(domElement, autoNumericObject);
    }
    /**
     * Remove the given object from the global AutoNumeric element list.
     *
     * @param {AutoNumeric} autoNumericObject
     * @private
     */

  }, {
    key: "_removeFromGlobalList",
    value: function _removeFromGlobalList(autoNumericObject) {
      //FIXME test this
      if (this._doesGlobalListExists()) {
        window[this.autoNumericGlobalListName]["delete"](autoNumericObject.node());
      }
    }
    /**
     * Return the value associated to the key `domElement` passed as a parameter.
     * The value is the AutoNumeric object that manages the DOM element `domElement`.
     *
     * @param {HTMLElement|HTMLInputElement} domElement
     * @returns {null|AutoNumeric}
     * @private
     */

  }, {
    key: "_getFromGlobalList",
    value: function _getFromGlobalList(domElement) {
      //FIXME test this
      if (this._doesGlobalListExists()) {
        return window[this.autoNumericGlobalListName].get(domElement);
      }

      return null;
    }
    /**
     * Check if the given DOM element is in the global AutoNumeric element list.
     *
     * @param {HTMLElement|HTMLInputElement} domElement
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isInGlobalList",
    value: function _isInGlobalList(domElement) {
      //FIXME test this
      if (!this._doesGlobalListExists()) {
        return false;
      }

      return window[this.autoNumericGlobalListName].has(domElement);
    }
  }, {
    key: "validate",
    value: function validate(userOptions) {
      var shouldExtendDefaultOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var originalOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(userOptions) || !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(userOptions)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The userOptions are invalid ; it should be a valid object, [".concat(userOptions, "] given."));
      }

      var isOriginalOptionAnObject = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(originalOptions);

      if (!isOriginalOptionAnObject && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(originalOptions)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The 'originalOptions' parameter is invalid ; it should either be a valid option object or `null`, [".concat(userOptions, "] given."));
      } // If the user used old options, we convert them to new ones


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(userOptions)) {
        this._convertOldOptionsToNewOnes(userOptions);
      } // The user can choose if the `userOptions` has already been extended with the default options, or not


      var options;

      if (shouldExtendDefaultOptions) {
        options = _extends({}, this.getDefaultConfig(), userOptions);
      } else {
        options = userOptions;
      } // First things first, we test that the `showWarnings` option is valid


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.showWarnings) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.showWarnings)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The debug option 'showWarnings' is invalid ; it should be either 'true' or 'false', [".concat(options.showWarnings, "] given."));
      } // Define the regular expressions needed for the following tests


      var testPositiveInteger = /^[0-9]+$/;
      var testNumericalCharacters = /[0-9]+/; // const testFloatAndPossibleNegativeSign = /^-?[0-9]+(\.?[0-9]+)$/;

      var testFloatOrIntegerAndPossibleNegativeSign = /^-?[0-9]+(\.?[0-9]+)?$/;
      var testPositiveFloatOrInteger = /^[0-9]+(\.?[0-9]+)?$/; // Then tests the options individually

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.allowDecimalPadding) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.allowDecimalPadding) && options.allowDecimalPadding !== AutoNumeric.options.allowDecimalPadding.floats) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The decimal padding option 'allowDecimalPadding' is invalid ; it should either be `false`, `true` or `'floats'`, [".concat(options.allowDecimalPadding, "] given."));
      }

      if ((options.allowDecimalPadding === AutoNumeric.options.allowDecimalPadding.never || options.allowDecimalPadding === 'false') && (options.decimalPlaces !== AutoNumeric.options.decimalPlaces.none || options.decimalPlacesShownOnBlur !== AutoNumeric.options.decimalPlacesShownOnBlur.none || options.decimalPlacesShownOnFocus !== AutoNumeric.options.decimalPlacesShownOnFocus.none)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("Setting 'allowDecimalPadding' to [".concat(options.allowDecimalPadding, "] will override the current 'decimalPlaces*' settings [").concat(options.decimalPlaces, ", ").concat(options.decimalPlacesShownOnBlur, " and ").concat(options.decimalPlacesShownOnFocus, "]."), options.showWarnings);
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.alwaysAllowDecimalCharacter) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.alwaysAllowDecimalCharacter)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The option 'alwaysAllowDecimalCharacter' is invalid ; it should either be `true` or `false`, [".concat(options.alwaysAllowDecimalCharacter, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.caretPositionOnFocus) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.caretPositionOnFocus, [AutoNumeric.options.caretPositionOnFocus.start, AutoNumeric.options.caretPositionOnFocus.end, AutoNumeric.options.caretPositionOnFocus.decimalLeft, AutoNumeric.options.caretPositionOnFocus.decimalRight])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The display on empty string option 'caretPositionOnFocus' is invalid ; it should either be `null`, 'focus', 'press', 'always' or 'zero', [".concat(options.caretPositionOnFocus, "] given."));
      } // Special case here for `caretPositionOnFocus` and `selectOnFocus` where we need to check the original non-tempered version of the options in order to check for conflicts, since using the default settings remove those and would prevent us warning the user that his option object is not correct.


      var optionsToUse;

      if (isOriginalOptionAnObject) {
        optionsToUse = originalOptions;
      } else {
        optionsToUse = this._correctCaretPositionOnFocusAndSelectOnFocusOptions(userOptions);
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(optionsToUse) && optionsToUse.caretPositionOnFocus !== AutoNumeric.options.caretPositionOnFocus.doNoForceCaretPosition && optionsToUse.selectOnFocus === AutoNumeric.options.selectOnFocus.select) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("The 'selectOnFocus' option is set to 'select', which is in conflict with the 'caretPositionOnFocus' which is set to '".concat(optionsToUse.caretPositionOnFocus, "'. As a result, if this has been called when instantiating an AutoNumeric object, the 'selectOnFocus' option is forced to 'doNotSelect'."), options.showWarnings);
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.digitGroupSeparator, [AutoNumeric.options.digitGroupSeparator.comma, AutoNumeric.options.digitGroupSeparator.dot, AutoNumeric.options.digitGroupSeparator.normalSpace, AutoNumeric.options.digitGroupSeparator.thinSpace, AutoNumeric.options.digitGroupSeparator.narrowNoBreakSpace, AutoNumeric.options.digitGroupSeparator.noBreakSpace, AutoNumeric.options.digitGroupSeparator.noSeparator, AutoNumeric.options.digitGroupSeparator.apostrophe, AutoNumeric.options.digitGroupSeparator.arabicThousandsSeparator, AutoNumeric.options.digitGroupSeparator.dotAbove, AutoNumeric.options.digitGroupSeparator.privateUseTwo])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The thousand separator character option 'digitGroupSeparator' is invalid ; it should be ',', '.', '\u066C', '\u02D9', \"'\", '\x92', ' ', '\u2009', '\u202F', '\xA0' or empty (''), [".concat(options.digitGroupSeparator, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.showOnlyNumbersOnFocus) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.showOnlyNumbersOnFocus)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The 'showOnlyNumbersOnFocus' option is invalid ; it should be either 'true' or 'false', [".concat(options.showOnlyNumbersOnFocus, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.digitalGroupSpacing, [AutoNumeric.options.digitalGroupSpacing.two, AutoNumeric.options.digitalGroupSpacing.twoScaled, AutoNumeric.options.digitalGroupSpacing.three, AutoNumeric.options.digitalGroupSpacing.four]) && !(options.digitalGroupSpacing >= 2 && options.digitalGroupSpacing <= 4)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The grouping separator option for thousands 'digitalGroupSpacing' is invalid ; it should be '2', '2s', '3', or '4', [".concat(options.digitalGroupSpacing, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.decimalCharacter, [AutoNumeric.options.decimalCharacter.comma, AutoNumeric.options.decimalCharacter.dot, AutoNumeric.options.decimalCharacter.middleDot, AutoNumeric.options.decimalCharacter.arabicDecimalSeparator, AutoNumeric.options.decimalCharacter.decimalSeparatorKeySymbol])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The decimal separator character option 'decimalCharacter' is invalid ; it should be '.', ',', '\xB7', '\u2396' or '\u066B', [".concat(options.decimalCharacter, "] given."));
      } // Checks if the decimal and thousand characters are the same


      if (options.decimalCharacter === options.digitGroupSeparator) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("autoNumeric will not function properly when the decimal character 'decimalCharacter' [".concat(options.decimalCharacter, "] and the thousand separator 'digitGroupSeparator' [").concat(options.digitGroupSeparator, "] are the same character."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.decimalCharacterAlternative) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.decimalCharacterAlternative)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The alternate decimal separator character option 'decimalCharacterAlternative' is invalid ; it should be a string, [".concat(options.decimalCharacterAlternative, "] given."));
      }

      if (options.currencySymbol !== '' && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.currencySymbol)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The currency symbol option 'currencySymbol' is invalid ; it should be a string, [".concat(options.currencySymbol, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.currencySymbolPlacement, [AutoNumeric.options.currencySymbolPlacement.prefix, AutoNumeric.options.currencySymbolPlacement.suffix])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The placement of the currency sign option 'currencySymbolPlacement' is invalid ; it should either be 'p' (prefix) or 's' (suffix), [".concat(options.currencySymbolPlacement, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.negativePositiveSignPlacement, [AutoNumeric.options.negativePositiveSignPlacement.prefix, AutoNumeric.options.negativePositiveSignPlacement.suffix, AutoNumeric.options.negativePositiveSignPlacement.left, AutoNumeric.options.negativePositiveSignPlacement.right, AutoNumeric.options.negativePositiveSignPlacement.none])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The placement of the negative sign option 'negativePositiveSignPlacement' is invalid ; it should either be 'p' (prefix), 's' (suffix), 'l' (left), 'r' (right) or 'null', [".concat(options.negativePositiveSignPlacement, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.showPositiveSign) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.showPositiveSign)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The show positive sign option 'showPositiveSign' is invalid ; it should be either 'true' or 'false', [".concat(options.showPositiveSign, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.suffixText) || options.suffixText !== '' && (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(options.suffixText, options.negativeSignCharacter) || testNumericalCharacters.test(options.suffixText))) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The additional suffix option 'suffixText' is invalid ; it should not contains the negative sign '".concat(options.negativeSignCharacter, "' nor any numerical characters, [").concat(options.suffixText, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.negativeSignCharacter) || options.negativeSignCharacter.length !== 1 || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(options.negativeSignCharacter) || testNumericalCharacters.test(options.negativeSignCharacter)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The negative sign character option 'negativeSignCharacter' is invalid ; it should be a single character, and cannot be any numerical characters, [".concat(options.negativeSignCharacter, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.positiveSignCharacter) || options.positiveSignCharacter.length !== 1 || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(options.positiveSignCharacter) || testNumericalCharacters.test(options.positiveSignCharacter)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The positive sign character option 'positiveSignCharacter' is invalid ; it should be a single character, and cannot be any numerical characters, [".concat(options.positiveSignCharacter, "] given.\nIf you want to hide the positive sign character, you need to set the `showPositiveSign` option to `true`."));
      }

      if (options.negativeSignCharacter === options.positiveSignCharacter) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The positive 'positiveSignCharacter' and negative 'negativeSignCharacter' sign characters cannot be identical ; [".concat(options.negativeSignCharacter, "] given."));
      }

      var _ref5 = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.negativeBracketsTypeOnBlur) ? ['', ''] : options.negativeBracketsTypeOnBlur.split(','),
          _ref6 = _slicedToArray(_ref5, 2),
          leftBracket = _ref6[0],
          rightBracket = _ref6[1];

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(options.digitGroupSeparator, options.negativeSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(options.decimalCharacter, options.negativeSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(options.decimalCharacterAlternative, options.negativeSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(leftBracket, options.negativeSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(rightBracket, options.negativeSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(options.suffixText, options.negativeSignCharacter)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The negative sign character option 'negativeSignCharacter' is invalid ; it should not be equal or a part of the digit separator, the decimal character, the decimal character alternative, the negative brackets or the suffix text, [".concat(options.negativeSignCharacter, "] given."));
      }

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(options.digitGroupSeparator, options.positiveSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(options.decimalCharacter, options.positiveSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(options.decimalCharacterAlternative, options.positiveSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(leftBracket, options.positiveSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(rightBracket, options.positiveSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(options.suffixText, options.positiveSignCharacter)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The positive sign character option 'positiveSignCharacter' is invalid ; it should not be equal or a part of the digit separator, the decimal character, the decimal character alternative, the negative brackets or the suffix text, [".concat(options.positiveSignCharacter, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.overrideMinMaxLimits) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.overrideMinMaxLimits, [AutoNumeric.options.overrideMinMaxLimits.ceiling, AutoNumeric.options.overrideMinMaxLimits.floor, AutoNumeric.options.overrideMinMaxLimits.ignore, AutoNumeric.options.overrideMinMaxLimits.invalid])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The override min & max limits option 'overrideMinMaxLimits' is invalid ; it should either be 'ceiling', 'floor', 'ignore' or 'invalid', [".concat(options.overrideMinMaxLimits, "] given."));
      }

      if (options.overrideMinMaxLimits !== AutoNumeric.options.overrideMinMaxLimits.invalid && options.overrideMinMaxLimits !== AutoNumeric.options.overrideMinMaxLimits.ignore && (options.minimumValue > 0 || options.maximumValue < 0)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("You've set a `minimumValue` or a `maximumValue` excluding the value `0`. AutoNumeric will force the users to always have a valid value in the input, hence preventing them to clear the field. If you want to allow for temporary invalid values (ie. out-of-range), you should use the 'invalid' option for the 'overrideMinMaxLimits' setting.");
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.maximumValue) || !testFloatOrIntegerAndPossibleNegativeSign.test(options.maximumValue)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The maximum possible value option 'maximumValue' is invalid ; it should be a string that represents a positive or negative number, [".concat(options.maximumValue, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.minimumValue) || !testFloatOrIntegerAndPossibleNegativeSign.test(options.minimumValue)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The minimum possible value option 'minimumValue' is invalid ; it should be a string that represents a positive or negative number, [".concat(options.minimumValue, "] given."));
      }

      if (parseFloat(options.minimumValue) > parseFloat(options.maximumValue)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The minimum possible value option is greater than the maximum possible value option ; 'minimumValue' [".concat(options.minimumValue, "] should be smaller than 'maximumValue' [").concat(options.maximumValue, "]."));
      }

      if (!(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInt(options.decimalPlaces) && options.decimalPlaces >= 0 || // If integer option
      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.decimalPlaces) && testPositiveInteger.test(options.decimalPlaces)) // If string option
      ) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The number of decimal places option 'decimalPlaces' is invalid ; it should be a positive integer, [".concat(options.decimalPlaces, "] given."));
        }

      if (!(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.decimalPlacesRawValue) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInt(options.decimalPlacesRawValue) && options.decimalPlacesRawValue >= 0 || // If integer option
      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.decimalPlacesRawValue) && testPositiveInteger.test(options.decimalPlacesRawValue)) // If string option
      ) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The number of decimal places for the raw value option 'decimalPlacesRawValue' is invalid ; it should be a positive integer or `null`, [".concat(options.decimalPlacesRawValue, "] given."));
        } // Checks if the number of decimal places for the raw value is lower than the `decimalPlaces`, `decimalPlacesShownOnFocus` and/or `decimalPlacesShownOnBlur` options


      this._validateDecimalPlacesRawValue(options);

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.decimalPlacesShownOnFocus) && !testPositiveInteger.test(String(options.decimalPlacesShownOnFocus))) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The number of expanded decimal places option 'decimalPlacesShownOnFocus' is invalid ; it should be a positive integer or `null`, [".concat(options.decimalPlacesShownOnFocus, "] given."));
      } // Checks if the extended decimal places "decimalPlacesShownOnFocus" is greater than the decimal places number `decimalPlaces`


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.decimalPlacesShownOnFocus) && Number(options.decimalPlaces) > Number(options.decimalPlacesShownOnFocus)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("The extended decimal places 'decimalPlacesShownOnFocus' [".concat(options.decimalPlacesShownOnFocus, "] should be greater than the 'decimalPlaces' [").concat(options.decimalPlaces, "] value. Currently, this will limit the ability of your user to manually change some of the decimal places. Do you really want to do that?"), options.showWarnings);
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.divisorWhenUnfocused) && !testPositiveFloatOrInteger.test(options.divisorWhenUnfocused) || options.divisorWhenUnfocused === 0 || options.divisorWhenUnfocused === '0' || options.divisorWhenUnfocused === 1 || options.divisorWhenUnfocused === '1') {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The divisor option 'divisorWhenUnfocused' is invalid ; it should be a positive number higher than one, preferably an integer, [".concat(options.divisorWhenUnfocused, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.decimalPlacesShownOnBlur) && !testPositiveInteger.test(options.decimalPlacesShownOnBlur)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The number of decimals shown when unfocused option 'decimalPlacesShownOnBlur' is invalid ; it should be a positive integer or `null`, [".concat(options.decimalPlacesShownOnBlur, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.symbolWhenUnfocused) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.symbolWhenUnfocused)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The symbol to show when unfocused option 'symbolWhenUnfocused' is invalid ; it should be a string, [".concat(options.symbolWhenUnfocused, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.saveValueToSessionStorage) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.saveValueToSessionStorage)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The save to session storage option 'saveValueToSessionStorage' is invalid ; it should be either 'true' or 'false', [".concat(options.saveValueToSessionStorage, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.onInvalidPaste, [AutoNumeric.options.onInvalidPaste.error, AutoNumeric.options.onInvalidPaste.ignore, AutoNumeric.options.onInvalidPaste.clamp, AutoNumeric.options.onInvalidPaste.truncate, AutoNumeric.options.onInvalidPaste.replace])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The paste behavior option 'onInvalidPaste' is invalid ; it should either be 'error', 'ignore', 'clamp', 'truncate' or 'replace' (cf. documentation), [".concat(options.onInvalidPaste, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.roundingMethod, [AutoNumeric.options.roundingMethod.halfUpSymmetric, AutoNumeric.options.roundingMethod.halfUpAsymmetric, AutoNumeric.options.roundingMethod.halfDownSymmetric, AutoNumeric.options.roundingMethod.halfDownAsymmetric, AutoNumeric.options.roundingMethod.halfEvenBankersRounding, AutoNumeric.options.roundingMethod.upRoundAwayFromZero, AutoNumeric.options.roundingMethod.downRoundTowardZero, AutoNumeric.options.roundingMethod.toCeilingTowardPositiveInfinity, AutoNumeric.options.roundingMethod.toFloorTowardNegativeInfinity, AutoNumeric.options.roundingMethod.toNearest05, AutoNumeric.options.roundingMethod.toNearest05Alt, AutoNumeric.options.roundingMethod.upToNext05, AutoNumeric.options.roundingMethod.downToNext05])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The rounding method option 'roundingMethod' is invalid ; it should either be 'S', 'A', 's', 'a', 'B', 'U', 'D', 'C', 'F', 'N05', 'CHF', 'U05' or 'D05' (cf. documentation), [".concat(options.roundingMethod, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.negativeBracketsTypeOnBlur) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.negativeBracketsTypeOnBlur, [AutoNumeric.options.negativeBracketsTypeOnBlur.parentheses, AutoNumeric.options.negativeBracketsTypeOnBlur.brackets, AutoNumeric.options.negativeBracketsTypeOnBlur.chevrons, AutoNumeric.options.negativeBracketsTypeOnBlur.curlyBraces, AutoNumeric.options.negativeBracketsTypeOnBlur.angleBrackets, AutoNumeric.options.negativeBracketsTypeOnBlur.japaneseQuotationMarks, AutoNumeric.options.negativeBracketsTypeOnBlur.halfBrackets, AutoNumeric.options.negativeBracketsTypeOnBlur.whiteSquareBrackets, AutoNumeric.options.negativeBracketsTypeOnBlur.quotationMarks, AutoNumeric.options.negativeBracketsTypeOnBlur.guillemets])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The brackets for negative values option 'negativeBracketsTypeOnBlur' is invalid ; it should either be '(,)', '[,]', '<,>', '{,}', '\u3008,\u3009', '\uFF62,\uFF63', '\u2E24,\u2E25', '\u27E6,\u27E7', '\u2039,\u203A' or '\xAB,\xBB', [".concat(options.negativeBracketsTypeOnBlur, "] given."));
      }

      if (!(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.emptyInputBehavior) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(options.emptyInputBehavior)) || !(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.emptyInputBehavior, [AutoNumeric.options.emptyInputBehavior.focus, AutoNumeric.options.emptyInputBehavior.press, AutoNumeric.options.emptyInputBehavior.always, AutoNumeric.options.emptyInputBehavior.min, AutoNumeric.options.emptyInputBehavior.max, AutoNumeric.options.emptyInputBehavior.zero, AutoNumeric.options.emptyInputBehavior["null"]]) || testFloatOrIntegerAndPossibleNegativeSign.test(options.emptyInputBehavior))) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The display on empty string option 'emptyInputBehavior' is invalid ; it should either be 'focus', 'press', 'always', 'min', 'max', 'zero', 'null', a number, or a string that represents a number, [".concat(options.emptyInputBehavior, "] given."));
      }

      if (options.emptyInputBehavior === AutoNumeric.options.emptyInputBehavior.zero && (options.minimumValue > 0 || options.maximumValue < 0)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The 'emptyInputBehavior' option is set to 'zero', but this value is outside of the range defined by 'minimumValue' and 'maximumValue' [".concat(options.minimumValue, ", ").concat(options.maximumValue, "]."));
      }

      if (testFloatOrIntegerAndPossibleNegativeSign.test(String(options.emptyInputBehavior))) {
        if (!this._isWithinRangeWithOverrideOption(options.emptyInputBehavior, options)) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The 'emptyInputBehavior' option is set to a number or a string that represents a number, but its value [".concat(options.emptyInputBehavior, "] is outside of the range defined by the 'minimumValue' and 'maximumValue' options [").concat(options.minimumValue, ", ").concat(options.maximumValue, "]."));
        }
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.eventBubbles) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.eventBubbles)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The event bubbles option 'eventBubbles' is invalid ; it should be either 'true' or 'false', [".concat(options.eventBubbles, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.eventIsCancelable) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.eventIsCancelable)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The event is cancelable option 'eventIsCancelable' is invalid ; it should be either 'true' or 'false', [".concat(options.eventIsCancelable, "] given."));
      }

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.invalidClass) || !/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/.test(options.invalidClass)) {
        //TODO Make sure this covers all the CSS class names
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The name of the 'invalidClass' option is not a valid CSS class name ; it should not be empty, and should follow the '^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$' regex, [".concat(options.invalidClass, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.leadingZero, [AutoNumeric.options.leadingZero.allow, AutoNumeric.options.leadingZero.deny, AutoNumeric.options.leadingZero.keep])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The leading zero behavior option 'leadingZero' is invalid ; it should either be 'allow', 'deny' or 'keep', [".concat(options.leadingZero, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.formatOnPageLoad) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.formatOnPageLoad)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The format on initialization option 'formatOnPageLoad' is invalid ; it should be either 'true' or 'false', [".concat(options.formatOnPageLoad, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.formulaMode) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.formulaMode)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The formula mode option 'formulaMode' is invalid ; it should be either 'true' or 'false', [".concat(options.formulaMode, "] given."));
      }

      if (!testPositiveInteger.test(options.historySize) || options.historySize === 0) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The history size option 'historySize' is invalid ; it should be a positive integer, [".concat(options.historySize, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.selectNumberOnly) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.selectNumberOnly)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The select number only option 'selectNumberOnly' is invalid ; it should be either 'true' or 'false', [".concat(options.selectNumberOnly, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.selectOnFocus) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.selectOnFocus)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The select on focus option 'selectOnFocus' is invalid ; it should be either 'true' or 'false', [".concat(options.selectOnFocus, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.defaultValueOverride) && options.defaultValueOverride !== '' && !testFloatOrIntegerAndPossibleNegativeSign.test(options.defaultValueOverride)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The unformatted default value option 'defaultValueOverride' is invalid ; it should be a string that represents a positive or negative number, [".concat(options.defaultValueOverride, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.unformatOnSubmit) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.unformatOnSubmit)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The remove formatting on submit option 'unformatOnSubmit' is invalid ; it should be either 'true' or 'false', [".concat(options.unformatOnSubmit, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.valuesToStrings) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(options.valuesToStrings)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The option 'valuesToStrings' is invalid ; it should be an object, ideally with 'key -> value' entries, [".concat(options.valuesToStrings, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.outputFormat) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.outputFormat, [AutoNumeric.options.outputFormat.string, AutoNumeric.options.outputFormat.number, AutoNumeric.options.outputFormat.dot, AutoNumeric.options.outputFormat.negativeDot, AutoNumeric.options.outputFormat.comma, AutoNumeric.options.outputFormat.negativeComma, AutoNumeric.options.outputFormat.dotNegative, AutoNumeric.options.outputFormat.commaNegative])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The custom locale format option 'outputFormat' is invalid ; it should either be null, 'string', 'number', '.', '-.', ',', '-,', '.-' or ',-', [".concat(options.outputFormat, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.isCancellable) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.isCancellable)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The cancellable behavior option 'isCancellable' is invalid ; it should be either 'true' or 'false', [".concat(options.isCancellable, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.modifyValueOnWheel) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.modifyValueOnWheel)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The increment/decrement on mouse wheel option 'modifyValueOnWheel' is invalid ; it should be either 'true' or 'false', [".concat(options.modifyValueOnWheel, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.watchExternalChanges) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.watchExternalChanges)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The option 'watchExternalChanges' is invalid ; it should be either 'true' or 'false', [".concat(options.watchExternalChanges, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.wheelOn, [AutoNumeric.options.wheelOn.focus, AutoNumeric.options.wheelOn.hover])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The wheel behavior option 'wheelOn' is invalid ; it should either be 'focus' or 'hover', [".concat(options.wheelOn, "] given."));
      }

      if (!(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(options.wheelStep) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(options.wheelStep)) || options.wheelStep !== 'progressive' && !testPositiveFloatOrInteger.test(options.wheelStep) || Number(options.wheelStep) === 0) {
        // A step equal to '0' is rejected
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The wheel step value option 'wheelStep' is invalid ; it should either be the string 'progressive', or a number or a string that represents a positive number (excluding zero), [".concat(options.wheelStep, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(options.serializeSpaces, [AutoNumeric.options.serializeSpaces.plus, AutoNumeric.options.serializeSpaces.percent])) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The space replacement character option 'serializeSpaces' is invalid ; it should either be '+' or '%20', [".concat(options.serializeSpaces, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.noEventListeners) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.noEventListeners)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The option 'noEventListeners' that prevent the creation of event listeners is invalid ; it should be either 'true' or 'false', [".concat(options.noEventListeners, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.styleRules) && !(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(options.styleRules) && (Object.prototype.hasOwnProperty.call(options.styleRules, 'positive') || Object.prototype.hasOwnProperty.call(options.styleRules, 'negative') || Object.prototype.hasOwnProperty.call(options.styleRules, 'ranges') || Object.prototype.hasOwnProperty.call(options.styleRules, 'userDefined')))) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The option 'styleRules' is invalid ; it should be a correctly structured object, with one or more 'positive', 'negative', 'ranges' or 'userDefined' attributes, [".concat(options.styleRules, "] given."));
      } // Deeper tests of the `styleRules` object : Check that the callback, if defined, is a function


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.styleRules) && Object.prototype.hasOwnProperty.call(options.styleRules, 'userDefined') && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.styleRules.userDefined)) {
        options.styleRules.userDefined.forEach(function (rule) {
          if (Object.prototype.hasOwnProperty.call(rule, 'callback') && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(rule.callback)) {
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The callback defined in the `userDefined` attribute is not a function, ".concat(_typeof(rule.callback), " given."));
          }
        });
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.rawValueDivisor) && !testPositiveFloatOrInteger.test(options.rawValueDivisor) || options.rawValueDivisor === 0 || options.rawValueDivisor === '0' || options.rawValueDivisor === 1 || options.rawValueDivisor === '1') {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The raw value divisor option 'rawValueDivisor' is invalid ; it should be a positive number higher than one, preferably an integer, [".concat(options.rawValueDivisor, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.readOnly) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.readOnly)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The option 'readOnly' is invalid ; it should be either 'true' or 'false', [".concat(options.readOnly, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.unformatOnHover) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.unformatOnHover)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The option 'unformatOnHover' is invalid ; it should be either 'true' or 'false', [".concat(options.unformatOnHover, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.failOnUnknownOption) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.failOnUnknownOption)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The debug option 'failOnUnknownOption' is invalid ; it should be either 'true' or 'false', [".concat(options.failOnUnknownOption, "] given."));
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isTrueOrFalseString(options.createLocalList) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.createLocalList)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The debug option 'createLocalList' is invalid ; it should be either 'true' or 'false', [".concat(options.createLocalList, "] given."));
      }
    }
    /**
     * Check the `decimalPlaces*` options and output the relevant warnings if some of those will get overwritten during the initialization or settings update.
     *
     * @param {object} options
     * @private
     */

  }, {
    key: "_validateDecimalPlacesRawValue",
    value: function _validateDecimalPlacesRawValue(options) {
      // Checks if the number of decimal places for the raw value is lower than the `decimalPlaces`, `decimalPlacesShownOnFocus` and/or `decimalPlacesShownOnBlur` options
      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options.decimalPlacesRawValue)) {
        if (options.decimalPlacesRawValue < options.decimalPlaces) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("The number of decimal places to store in the raw value [".concat(options.decimalPlacesRawValue, "] is lower than the ones to display [").concat(options.decimalPlaces, "]. This will likely confuse your users.\nTo solve that, you'd need to either set `decimalPlacesRawValue` to `null`, or set a number of decimal places for the raw value equal of bigger than `decimalPlaces`."), options.showWarnings);
        }

        if (options.decimalPlacesRawValue < options.decimalPlacesShownOnFocus) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("The number of decimal places to store in the raw value [".concat(options.decimalPlacesRawValue, "] is lower than the ones shown on focus [").concat(options.decimalPlacesShownOnFocus, "]. This will likely confuse your users.\nTo solve that, you'd need to either set `decimalPlacesRawValue` to `null`, or set a number of decimal places for the raw value equal of bigger than `decimalPlacesShownOnFocus`."), options.showWarnings);
        }

        if (options.decimalPlacesRawValue < options.decimalPlacesShownOnBlur) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("The number of decimal places to store in the raw value [".concat(options.decimalPlacesRawValue, "] is lower than the ones shown when unfocused [").concat(options.decimalPlacesShownOnBlur, "]. This will likely confuse your users.\nTo solve that, you'd need to either set `decimalPlacesRawValue` to `null`, or set a number of decimal places for the raw value equal of bigger than `decimalPlacesShownOnBlur`."), options.showWarnings);
        }
      }
    }
    /**
     * Return `true` if the settings/options are valid, `false` otherwise.
     *
     * @param {object} options
     * @returns {boolean}
     */

  }, {
    key: "areSettingsValid",
    value: function areSettingsValid(options) {
      var isValid = true;

      try {
        this.validate(options, true);
      } catch (error) {
        isValid = false;
      }

      return isValid;
    }
    /**
     * Return the default autoNumeric settings.
     *
     * @returns {object}
     */

  }, {
    key: "getDefaultConfig",
    value: function getDefaultConfig() {
      return AutoNumeric.defaultSettings;
    }
    /**
     * Return all the predefined language options in one object.
     * You can also access a specific language object directly by using `AutoNumeric.getPredefinedOptions().French` for instance.
     *
     * @returns {object}
     */

  }, {
    key: "getPredefinedOptions",
    value: function getPredefinedOptions() {
      return AutoNumeric.predefinedOptions;
    }
    /**
     * Analyse the given array `options` and return a single 'merged' option objet.
     * `options` can be `null`, or an array of an option objects, or an array containing another array of option objects / strings (pre-defined option names)
     *
     * @param {null|Array<object|string|Array<string|object>>} options
     * @returns {null|object}
     * @private
     */

  }, {
    key: "_generateOptionsObjectFromOptionsArray",
    value: function _generateOptionsObjectFromOptionsArray(options) {
      var _this14 = this;

      var optionsResult;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(options) || options.length === 0) {
        optionsResult = null;
      } else {
        optionsResult = {};

        if (options.length === 1 && Array.isArray(options[0])) {
          options[0].forEach(function (optionObject) {
            // Using `_getOptionObject()` allows using pre-defined names in the `options` array
            _extends(optionsResult, _this14._getOptionObject(optionObject));
          });
        } else if (options.length >= 1) {
          options.forEach(function (optionObject) {
            _extends(optionsResult, _this14._getOptionObject(optionObject));
          });
        }
      }

      return optionsResult;
    }
    /**
     * Format the given number (or numeric string) with the given options. This returns the formatted value as a string.
     * This can also format the given DOM element value with the given options and returns the formatted value as a string.
     * Note : This function does *not* update that element value with the newly formatted value.
     * This basically allows to get the formatted value without first having to initialize an AutoNumeric object.
     *
     * @param {number|string|HTMLElement|HTMLInputElement} numericStringOrDomElement A number, or a string that represent a javascript number, or a DOM element
     * @param {object|null} options Multiple objects can be passed, the latter overwriting the settings from the former ones
     * @returns {string|null}
     */

  }, {
    key: "format",
    value: function format(numericStringOrDomElement) {
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(numericStringOrDomElement) || numericStringOrDomElement === null) {
        return null;
      } // Retrieve the value to format


      var value;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isElement(numericStringOrDomElement)) {
        value = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(numericStringOrDomElement);
      } else {
        value = numericStringOrDomElement;
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(value) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(value)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The value \"".concat(value, "\" being \"set\" is not numeric and therefore cannot be used appropriately."));
      } // Manage options


      for (var _len5 = arguments.length, options = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        options[_key5 - 1] = arguments[_key5];
      }

      var optionsToUse = this._generateOptionsObjectFromOptionsArray(options); // Initiate a very basic settings object


      var settings = _extends({}, this.getDefaultConfig(), optionsToUse);

      settings.isNegativeSignAllowed = value < 0;
      settings.isPositiveSignAllowed = value >= 0;

      this._setBrackets(settings);

      var regex = {};

      this._cachesUsualRegularExpressions(settings, regex); // This is needed by `_stripAllNonNumberCharactersExceptCustomDecimalChar` that uses those regex
      // Check the validity of the `value` parameter
      // Convert the value to a numeric string, stripping unnecessary characters in the process


      var valueString = this._toNumericValue(value, settings);

      if (isNaN(Number(valueString))) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The value [".concat(valueString, "] that you are trying to format is not a recognized number."));
      } // Check if the given valueString is valid


      if (!this._isWithinRangeWithOverrideOption(valueString, settings)) {
        // Throw a custom event
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].triggerEvent(AutoNumeric.events.formatted, document, {
          oldValue: null,
          newValue: null,
          oldRawValue: null,
          newRawValue: null,
          isPristine: null,
          error: 'Range test failed',
          aNElement: null
        }, true, true);
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The value [".concat(valueString, "] being set falls outside of the minimumValue [").concat(settings.minimumValue, "] and maximumValue [").concat(settings.maximumValue, "] range set for this element"));
      } // Directly format any `valuesToStrings` values, if found


      if (settings.valuesToStrings && this._checkValuesToStringsSettings(value, settings)) {
        return settings.valuesToStrings[value];
      } // Generate the `negativePositiveSignPlacement` option as needed


      this._correctNegativePositiveSignPlacementOption(settings); // Calculate the needed decimal places


      this._calculateDecimalPlacesOnInit(settings); // Multiply the raw value with `rawValueDivisor` if defined


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(settings.rawValueDivisor) && settings.rawValueDivisor !== 0 && // Only divide if the `rawValueDivisor` option is set
      valueString !== '' && valueString !== null) {
        // Do not modify the `valueString` if it's an empty string or null
        valueString *= settings.rawValueDivisor;
      } // Everything is ok, proceed to rounding, formatting and grouping


      valueString = this._roundFormattedValueShownOnFocus(valueString, settings);
      valueString = this._modifyNegativeSignAndDecimalCharacterForFormattedValue(valueString, settings);
      valueString = this._addGroupSeparators(valueString, settings, false, valueString);
      return valueString;
    }
    /**
     * Format the given DOM element value, and set the resulting value back as the element value.
     *
     * @param {HTMLElement|HTMLInputElement} domElement
     * @param {object} options
     * @returns {string|null}
     */

  }, {
    key: "formatAndSet",
    value: function formatAndSet(domElement) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      //FIXME test this
      var formattedValue = this.format(domElement, options);
      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementValue(domElement, formattedValue);
      return formattedValue;
    }
    /**
     * Unformat the given formatted string with the given options. This returns a numeric string.
     * It can also unformat the given DOM element value with the given options and returns the unformatted numeric string.
     * Note: This does *not* update that element value.
     * This basically allows to get the unformatted value without first having to initialize an AutoNumeric object.
     *
     * @param {string|number|HTMLElement|HTMLInputElement} numericStringOrDomElement A number, or a string that represent a javascript number, or a DOM element
     * @param {object|null} options Multiple objects can be passed, the latter overwriting the settings from the former ones
     * @returns {string|number|NaN}
     */

  }, {
    key: "unformat",
    value: function unformat(numericStringOrDomElement) {
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumberStrict(numericStringOrDomElement)) {
        // Giving an unformatted value should return the same unformatted value, whatever the options passed as a parameter
        return numericStringOrDomElement;
      } // Retrieve the value to unformat


      var value;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isElement(numericStringOrDomElement)) {
        value = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(numericStringOrDomElement);
      } else {
        value = numericStringOrDomElement;
      }

      if (value === '') {
        // This allows to be coherent when serializing forms with empty inputs. Fix issue #512.
        return '';
      }

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(value) || value === null) {
        return null;
      }

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(value)) {
        // Check the validity of the `value` parameter
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("A number or a string representing a number is needed to be able to unformat it, [".concat(value, "] given."));
      } // Manage options


      for (var _len6 = arguments.length, options = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        options[_key6 - 1] = arguments[_key6];
      }

      var optionsToUse = this._generateOptionsObjectFromOptionsArray(options); // Generate the settings


      var settings = _extends({}, this.getDefaultConfig(), optionsToUse);

      settings.isNegativeSignAllowed = false;
      settings.isPositiveSignAllowed = true;
      value = value.toString(); // Directly unformat any `valuesToStrings` values, if found

      if (settings.valuesToStrings && this._checkStringsToValuesSettings(value, settings)) {
        return _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].objectKeyLookup(settings.valuesToStrings, value);
      } // This checks if a negative sign is anywhere in the `value`, not just on the very first character (ie. '12345.67-')


      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(value, settings.negativeSignCharacter)) {
        settings.isNegativeSignAllowed = true;
        settings.isPositiveSignAllowed = false;
      } else if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(settings.negativeBracketsTypeOnBlur)) {
        var _settings$negativeBra = settings.negativeBracketsTypeOnBlur.split(',');

        var _settings$negativeBra2 = _slicedToArray(_settings$negativeBra, 2);

        settings.firstBracket = _settings$negativeBra2[0];
        settings.lastBracket = _settings$negativeBra2[1];

        if (value.charAt(0) === settings.firstBracket && value.charAt(value.length - 1) === settings.lastBracket) {
          settings.isNegativeSignAllowed = true;
          settings.isPositiveSignAllowed = false;
          value = this._removeBrackets(value, settings, false);
        }
      }

      value = this._convertToNumericString(value, settings);
      var unwantedCharacters = new RegExp("[^+-0123456789.]", 'gi');

      if (unwantedCharacters.test(value)) {
        return NaN;
      } // Generate the `negativePositiveSignPlacement` option as needed


      this._correctNegativePositiveSignPlacementOption(settings); // Calculate the needed decimal places


      if (settings.decimalPlacesRawValue) {
        // `originalDecimalPlacesRawValue` needs to be defined
        settings.originalDecimalPlacesRawValue = settings.decimalPlacesRawValue;
      } else {
        settings.originalDecimalPlacesRawValue = settings.decimalPlaces;
      }

      this._calculateDecimalPlacesOnInit(settings); // Divide the raw value with `rawValueDivisor` if defined


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(settings.rawValueDivisor) && settings.rawValueDivisor !== 0 && // Only divide if the `rawValueDivisor` option is set
      value !== '' && value !== null) {
        // Do not modify the `value` if it's an empty string or null
        value /= settings.rawValueDivisor;
      }

      value = this._roundRawValue(value, settings);
      value = value.replace(settings.decimalCharacter, '.'); // Here we need to convert back the decimal character to a period since `_roundValue` adds it in some cases

      value = this._toLocale(value, settings.outputFormat, settings);
      return value;
    }
    /**
     * Unformat the given DOM element value, and set the resulting value back as the element value.
     *
     * @param {HTMLElement|HTMLInputElement} domElement
     * @param {object} options
     * @returns {*}
     */

  }, {
    key: "unformatAndSet",
    value: function unformatAndSet(domElement) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      //FIXME test this
      var unformattedValue = this.unformat(domElement, options);
      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementValue(domElement, unformattedValue);
      return unformattedValue;
    }
    /**
     * Unformat and localize the given formatted string with the given options. This returns a numeric string.
     * It can also unformat and localize the given DOM element value with the given options and returns the unformatted numeric string.
     * Note: This does *not* update that element value.
     * This basically allows to get the localized value without first having to initialize an AutoNumeric object.
     *
     * @param {string|number|HTMLElement|HTMLInputElement} numericStringOrDomElement
     * @param {object} settings
     * @returns {*}
     */

  }, {
    key: "localize",
    value: function localize(numericStringOrDomElement) {
      var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var value;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isElement(numericStringOrDomElement)) {
        value = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getElementValue(numericStringOrDomElement);
      } else {
        value = numericStringOrDomElement;
      }

      if (value === '') {
        // This allows to be coherent when serializing forms with empty inputs. Fix issue #512.
        return '';
      }

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(settings)) {
        settings = AutoNumeric.defaultSettings;
      }

      value = this.unformat(value, settings); //XXX The following code is pretty close to the one you can find in `getLocalized()`, but different enough so we won't refactor it.

      if (Number(value) === 0 && settings.leadingZero !== AutoNumeric.options.leadingZero.keep) {
        value = '0';
      }

      var outputFormatToUse;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(settings)) {
        outputFormatToUse = settings.outputFormat;
      } else {
        outputFormatToUse = AutoNumeric.defaultSettings.outputFormat;
      }

      return this._toLocale(value, outputFormatToUse, settings);
    }
  }, {
    key: "localizeAndSet",
    value: function localizeAndSet(domElement) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      //FIXME test this
      var localizedValue = this.localize(domElement, options);
      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].setElementValue(domElement, localizedValue);
      return localizedValue;
    }
    /**
     * Return `true` if the given DOM element has an AutoNumeric object that manages it.
     * This function also accepts a selector string.
     *
     * @param {HTMLElement|string} domElementOrSelector Accepts either directly a DOM element to test, or a string selector (that will return one and only one element, if any)
     * @returns {boolean}
     */

  }, {
    key: "isManagedByAutoNumeric",
    value: function isManagedByAutoNumeric(domElementOrSelector) {
      //FIXME test this
      return this._isInGlobalList(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].domElement(domElementOrSelector));
    }
    /**
     * Return the AutoNumeric object that manages the given DOM element.
     * This function also accepts a selector string.
     *
     * @param {HTMLElement|string} domElementOrSelector Accepts either directly a DOM element to test, or a string selector (that will return one and only one element, if any)
     * @returns {null|AutoNumeric}
     */

  }, {
    key: "getAutoNumericElement",
    value: function getAutoNumericElement(domElementOrSelector) {
      var domElement = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].domElement(domElementOrSelector);

      if (!this.isManagedByAutoNumeric(domElement)) {
        return null;
      }

      return this._getFromGlobalList(domElement);
    }
    /**
     * Set the given element value, and format it immediately.
     * Return `null` if no AutoNumeric object is found, else, return the AutoNumeric object.
     *
     * @param {HTMLElement|string} domElementOrSelector Either a DOM element reference, or a selector string can be used
     * @param {number|string|null} newValue The value must be a Number, a numeric string or `null` (if `emptyInputBehavior` is set to `'null'`)
     * @param {object} options A settings object that will override the current settings. Note: the update is done only if the `newValue` is defined.
     * @param {boolean} saveChangeToHistory If set to `true`, then the change is recorded in the history table
     * @returns {AutoNumeric|null}
     */

  }, {
    key: "set",
    value: function set(domElementOrSelector, newValue) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var saveChangeToHistory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var domElement = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].domElement(domElementOrSelector);

      if (!this.isManagedByAutoNumeric(domElement)) {
        var showWarnings;

        if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options) && Object.prototype.hasOwnProperty.call(options, 'showWarnings')) {
          showWarnings = options.showWarnings;
        } else {
          showWarnings = true;
        }

        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("Impossible to find an AutoNumeric object for the given DOM element or selector.", showWarnings);
        return null;
      }

      return this.getAutoNumericElement(domElement).set(newValue, options, saveChangeToHistory);
    }
    /**
     * Return the unformatted value as a string from the given DOM element or query selector.
     * This can also return `null` if `rawValue` is null.
     *
     * @param {HTMLElement|string} domElementOrSelector
     * @param {function|null} callback
     * @returns {string|null}
     */

  }, {
    key: "getNumericString",
    value: function getNumericString(domElementOrSelector) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this._get(domElementOrSelector, 'getNumericString', callback);
    }
    /**
     * Return the current formatted value of the AutoNumeric element as a string, from the given DOM element or query selector.
     *
     * @param {HTMLElement|string} domElementOrSelector
     * @param {function|null} callback
     * @returns {string}
     */

  }, {
    key: "getFormatted",
    value: function getFormatted(domElementOrSelector) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this._get(domElementOrSelector, 'getFormatted', callback);
    }
    /**
     * Return the element unformatted value as a real Javascript number, from the given DOM element or query selector.
     * Warning: This can lead to precision problems with big numbers that should be stored as strings.
     *
     * @param {HTMLElement|string} domElementOrSelector
     * @param {function|null} callback
     * @returns {number|null}
     */

  }, {
    key: "getNumber",
    value: function getNumber(domElementOrSelector) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this._get(domElementOrSelector, 'getNumber', callback);
    }
    /**
     * DRY the code between the static `get*` functions
     *
     * @param {HTMLElement|string} domElementOrSelector
     * @param {string} getFunction The name of the non-static `get*` function as a string
     * @param {function|null} callback
     * @returns {*}
     * @private
     */

  }, {
    key: "_get",
    value: function _get(domElementOrSelector, getFunction) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var domElement = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].domElement(domElementOrSelector);

      if (!this.isManagedByAutoNumeric(domElement)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("Impossible to find an AutoNumeric object for the given DOM element or selector.");
      }

      return this.getAutoNumericElement(domElement)[getFunction](callback);
    }
    /**
     * Returns the unformatted value following the `outputFormat` setting, from the given DOM element or query selector.
     * See the non-static `getLocalized()` method documentation for more details.
     *
     * @param {HTMLElement|string} domElementOrSelector
     * @param {null|string|function} forcedOutputFormat
     * @param {function|null} callback
     * @returns {*}
     */

  }, {
    key: "getLocalized",
    value: function getLocalized(domElementOrSelector) {
      var forcedOutputFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var domElement = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].domElement(domElementOrSelector);

      if (!this.isManagedByAutoNumeric(domElement)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("Impossible to find an AutoNumeric object for the given DOM element or selector.");
      }

      return this.getAutoNumericElement(domElement).getLocalized(forcedOutputFormat, callback);
    }
  }, {
    key: "_stripAllNonNumberCharacters",
    value: function _stripAllNonNumberCharacters(s, settings, stripZeros, isFocused) {
      return this._stripAllNonNumberCharactersExceptCustomDecimalChar(s, settings, stripZeros, isFocused).replace(settings.decimalCharacter, '.');
    }
    /**
     * Strip all unwanted non-number characters except the custom decimal character.
     *
     * It converts the custom negative sign and removes the positive sign (custom or not).
     * This keeps :
     * - the numbers,
     * - the normal negative sign '-' if any,
     * - and the *custom* decimal character.
     *
     * @param {string} s
     * @param {object} settings
     * @param {boolean} stripZeros If set to `false`, then the leading zero(s) are not stripped, otherwise if set to `true`, the `leadingZero` option is followed
     * @param {boolean} isFocused If the element is focused, then this is `true`
     * @returns {string|*}
     */

  }, {
    key: "_stripAllNonNumberCharactersExceptCustomDecimalChar",
    value: function _stripAllNonNumberCharactersExceptCustomDecimalChar(s, settings, stripZeros, isFocused) {
      //XXX Note; this function is static since we need to pass a `settings` object when calling the static `AutoNumeric.format()` method
      //TODO This function is called 10 times (sic!) on each key input, couldn't we lower that number? cf. issue #325
      s = this._normalizeCurrencySuffixAndNegativeSignCharacters(s, settings); // Then remove all the characters that are not numbers, the normal negative sign '-', or the custom decimal character (note: this also remove any custom positive sign)

      s = s.replace(settings.allowedAutoStrip, ''); // Get only number string

      var m = s.match(settings.numRegAutoStrip);
      s = m ? [m[1], m[2], m[3]].join('') : '';

      if (settings.leadingZero === AutoNumeric.options.leadingZero.allow || settings.leadingZero === AutoNumeric.options.leadingZero.keep) {
        var negativeSign = '';

        var _s$split = s.split(settings.decimalCharacter),
            _s$split2 = _slicedToArray(_s$split, 2),
            integerPart = _s$split2[0],
            decimalPart = _s$split2[1];

        var modifiedIntegerPart = integerPart;

        if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(modifiedIntegerPart, settings.negativeSignCharacter)) {
          negativeSign = settings.negativeSignCharacter;
          modifiedIntegerPart = modifiedIntegerPart.replace(settings.negativeSignCharacter, '');
        } // Strip leading zero on positive value if needed


        if (negativeSign === '' && modifiedIntegerPart.length > settings.mIntPos && modifiedIntegerPart.charAt(0) === '0') {
          modifiedIntegerPart = modifiedIntegerPart.slice(1);
        } // Strip leading zero on negative value if needed


        if (negativeSign !== '' && modifiedIntegerPart.length > settings.mIntNeg && modifiedIntegerPart.charAt(0) === '0') {
          modifiedIntegerPart = modifiedIntegerPart.slice(1);
        }

        s = "".concat(negativeSign).concat(modifiedIntegerPart).concat(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(decimalPart) ? '' : settings.decimalCharacter + decimalPart);
      }

      if (stripZeros && settings.leadingZero === AutoNumeric.options.leadingZero.deny || !isFocused && settings.leadingZero === AutoNumeric.options.leadingZero.allow) {
        s = s.replace(settings.stripReg, '$1$2');
      }

      return s;
    }
    /**
     * Sets or removes brackets on negative values, depending on the focus state, which is passed as `isFocused`.
     * The focus state is 'stored' in that object property.
     *
     * @param {string} value
     * @param {object} settings
     * @param {boolean} isFocused
     * @returns {*}
     */

  }, {
    key: "_toggleNegativeBracket",
    value: function _toggleNegativeBracket(value, settings, isFocused) {
      //XXX Note; this function is static since we need to pass a `settings` object when calling the static `AutoNumeric.format()` method
      var result;

      if (isFocused) {
        result = this._removeBrackets(value, settings);
      } else {
        result = this._addBrackets(value, settings);
      }

      return result;
    }
    /**
     * Add the bracket types specified in the `settings` object, to the given string `value`.
     *
     * @param {string} value
     * @param {object} settings
     * @returns {string}
     * @private
     */

  }, {
    key: "_addBrackets",
    value: function _addBrackets(value, settings) {
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(settings.negativeBracketsTypeOnBlur)) {
        return value;
      }

      return "".concat(settings.firstBracket).concat(value.replace(settings.negativeSignCharacter, '')).concat(settings.lastBracket);
    }
    /**
     * Remove the bracket types specified in the `settings` object, from the given string `value`.
     *
     * @param {string} value
     * @param {object} settings
     * @param {boolean} rearrangeSignsAndValueOrder If set to `true`, then only the brackets are remove and a negative sign is added, without reordering the negative sign, currency symbol and value according to the settings.
     * @returns {string}
     * @private
     */

  }, {
    key: "_removeBrackets",
    value: function _removeBrackets(value, settings) {
      var rearrangeSignsAndValueOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var result;

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(settings.negativeBracketsTypeOnBlur) && value.charAt(0) === settings.firstBracket) {
        // Remove the brackets if they are present
        result = value.replace(settings.firstBracket, '');
        result = result.replace(settings.lastBracket, ''); // Add back the negative sign at the right place

        if (rearrangeSignsAndValueOrder) {
          // First we need to remove the currency symbol from the value, since we want to be able to add back the negative sign at the right place (including between the value and the currency sign)
          result = result.replace(settings.currencySymbol, '');
          result = this._mergeCurrencySignNegativePositiveSignAndValue(result, settings, true, false); //TODO This assume the value is negative and non-empty. Is this always the case?
        } else {
          // Here we only want to add the negative sign since we removed the brackets, without reordering
          result = "".concat(settings.negativeSignCharacter).concat(result);
        }
      } else {
        result = value;
      }

      return result;
    }
    /**
     * Analyze the `negativeBracketsTypeOnBlur` options and keep track of the first and last bracket characters to use.
     *
     * @param {object} settings
     * @private
     */

  }, {
    key: "_setBrackets",
    value: function _setBrackets(settings) {
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(settings.negativeBracketsTypeOnBlur)) {
        settings.firstBracket = '';
        settings.lastBracket = '';
      } else {
        // Use temporary variables to fix the MS Edge destructuring issue (see pull request #564)
        var _settings$negativeBra3 = settings.negativeBracketsTypeOnBlur.split(','),
            _settings$negativeBra4 = _slicedToArray(_settings$negativeBra3, 2),
            firstBracket = _settings$negativeBra4[0],
            lastBracket = _settings$negativeBra4[1];

        settings.firstBracket = firstBracket;
        settings.lastBracket = lastBracket;
      }
    }
    /**
     * Return a number as a numeric string that can be typecast to a Number that Javascript will understand.
     *
     * This function returns the given string by stripping:
     * - the currency sign (currencySymbol),
     * - the grouping separators (digitalGroupSpacing),
     * - the suffix text (suffixText),
     * - the positive sign (positiveSignCharacter),
     * - the brackets if any,
     * - by replacing the negative sign character with an hyphen,
     * - and by replacing the decimal character (decimalCharacter) by a dot.
     *
     * Lastly, it also put the negative sign back to its normal position if needed.
     * Bonus; it converts any arabic numbers found to the latin ones.
     *
     * @param {string} s
     * @param {object} settings
     * @returns {string|void|*}
     */

  }, {
    key: "_convertToNumericString",
    value: function _convertToNumericString(s, settings) {
      // Remove the custom brackets
      s = this._removeBrackets(s, settings, false);
      s = this._normalizeCurrencySuffixAndNegativeSignCharacters(s, settings); // Remove the grouping separators (thousands separators usually)

      s = s.replace(new RegExp("[".concat(settings.digitGroupSeparator, "]"), 'g'), ''); // Replace the decimal character by a dot

      if (settings.decimalCharacter !== '.') {
        s = s.replace(settings.decimalCharacter, '.');
      } // Move the trailing negative sign, if any, to the usual leftmost position


      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(s) && s.lastIndexOf('-') === s.length - 1) {
        s = s.replace('-', '');
        s = "-".concat(s);
      } // Replace the custom positive sign


      if (settings.showPositiveSign) {
        s = s.replace(settings.positiveSignCharacter, '');
      } // Convert arabic numbers to latin ones, if any


      var convertToNumber = settings.leadingZero !== AutoNumeric.options.leadingZero.keep;
      var temp = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].arabicToLatinNumbers(s, convertToNumber, false, false);

      if (!isNaN(temp)) {
        s = temp.toString();
      }

      return s;
    }
    /**
     * Removes the currency symbol and the suffix text from the given string, and replace the custom negative sign with an hyphen.
     *
     * @param {string} s
     * @param {object} settings
     * @returns {string | *}
     * @private
     */

  }, {
    key: "_normalizeCurrencySuffixAndNegativeSignCharacters",
    value: function _normalizeCurrencySuffixAndNegativeSignCharacters(s, settings) {
      s = String(s); // Typecast to to a string, in case that the given value is a number
      // Remove the currency symbol

      if (settings.currencySymbol !== AutoNumeric.options.currencySymbol.none) {
        s = s.replace(settings.currencySymbol, '');
      } // Remove the suffixText


      if (settings.suffixText !== AutoNumeric.options.suffixText.none) {
        s = s.replace(settings.suffixText, '');
      } // Replace the custom negative sign with an hyphen


      if (settings.negativeSignCharacter !== AutoNumeric.options.negativeSignCharacter.hyphen) {
        s = s.replace(settings.negativeSignCharacter, '-');
      }

      return s;
    }
    /**
     * Converts the ISO numeric string to the locale decimal and minus sign placement.
     * See the "outputFormat" option definition for more details.
     * Note: If the `outputFormat` is set to a number, the custom `negativeSignCharacter` is ignored.
     *
     * @param {string|null} value The unformatted value
     * @param {string|null} locale
     * @param {object} settings
     * @returns {*}
     */

  }, {
    key: "_toLocale",
    value: function _toLocale(value, locale, settings) {
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(locale) || locale === AutoNumeric.options.outputFormat.string) {
        return value;
      }

      var result;

      switch (locale) {
        case AutoNumeric.options.outputFormat.number:
          result = Number(value);
          break;

        case AutoNumeric.options.outputFormat.dotNegative:
          result = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(value) ? value.replace('-', '') + '-' : value;
          break;

        case AutoNumeric.options.outputFormat.comma:
        case AutoNumeric.options.outputFormat.negativeComma:
          result = value.replace('.', ',');
          break;

        case AutoNumeric.options.outputFormat.commaNegative:
          result = value.replace('.', ',');
          result = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(result) ? result.replace('-', '') + '-' : result;
          break;
        // The default case

        case AutoNumeric.options.outputFormat.dot:
        case AutoNumeric.options.outputFormat.negativeDot:
          result = value;
          break;

        default:
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given outputFormat [".concat(locale, "] option is not recognized."));
      }

      if (locale !== AutoNumeric.options.outputFormat.number && settings.negativeSignCharacter !== '-') {
        // Modify the default minus sign with the custom one, if any
        result = result.replace('-', settings.negativeSignCharacter);
      }

      return result;
    }
  }, {
    key: "_modifyNegativeSignAndDecimalCharacterForFormattedValue",
    value: function _modifyNegativeSignAndDecimalCharacterForFormattedValue(s, settings) {
      //XXX Note; this function is static since we need to pass a `settings` object when calling the static `AutoNumeric.format()` method
      if (settings.negativeSignCharacter !== '-') {
        s = s.replace('-', settings.negativeSignCharacter);
      }

      if (settings.decimalCharacter !== '.') {
        s = s.replace('.', settings.decimalCharacter);
      }

      return s;
    }
    /**
     * Return `true` if the given value is empty or is equal to the negative sign character defined in the given settings.
     *
     * @param {string} value
     * @param {object} settings
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isElementValueEmptyOrOnlyTheNegativeSign",
    value: function _isElementValueEmptyOrOnlyTheNegativeSign(value, settings) {
      return value === '' || value === settings.negativeSignCharacter;
    }
    /**
     * Return the value with the currency symbol and the suffix text ordered according to the given settings.
     *
     * @param {string} value
     * @param {object} settings
     * @param {boolean} signOnEmpty
     * @returns {*}
     * @private
     */

  }, {
    key: "_orderValueCurrencySymbolAndSuffixText",
    value: function _orderValueCurrencySymbolAndSuffixText(value, settings, signOnEmpty) {
      var result;

      if (settings.emptyInputBehavior === AutoNumeric.options.emptyInputBehavior.always || signOnEmpty) {
        switch (settings.negativePositiveSignPlacement) {
          case AutoNumeric.options.negativePositiveSignPlacement.left:
          case AutoNumeric.options.negativePositiveSignPlacement.prefix:
          case AutoNumeric.options.negativePositiveSignPlacement.none:
            result = value + settings.currencySymbol + settings.suffixText;
            break;

          default:
            result = settings.currencySymbol + value + settings.suffixText;
        }
      } else {
        result = value;
      }

      return result;
    }
    /**
     * Modify the input value by adding the group separators, as defined in the settings, and the negative brackets if needed.
     *
     * @param {string} inputValue The formatted value (ie. with the `decimalCharacter` defined in the settings, not the raw value)
     * @param {object} settings
     * @param {boolean} isFocused
     * @param {number|string|null} currentRawValue The object current raw value (`this.rawValue`)
     * @param {number|string|null} forcedRawValue If this is set, then this rawValue is used instead of the one passed through the `settings` object. This is useful is some very specific cases where we need to set the raw value *after* settings the formatted value, using the `_addGroupSeparators()` method.
     * @returns {*}
     */

  }, {
    key: "_addGroupSeparators",
    value: function _addGroupSeparators(inputValue, settings, isFocused, currentRawValue) {
      var forcedRawValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      //TODO Test if `inputValue` === '', and return '' directly if that's the case,
      //XXX Note; this function is static since we need to pass a `settings` object when calling the static `AutoNumeric.format()` method
      var isValueNegative;

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(forcedRawValue)) {
        // Prefer directly testing if the raw value is negative in order for the test to be more performant than manipulating the formatted value
        isValueNegative = forcedRawValue < 0;
      } else {
        isValueNegative = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegative(inputValue, settings.negativeSignCharacter) || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegativeWithBrackets(inputValue, settings.firstBracket, settings.lastBracket); // Test if the value is negative before removing the negative sign
      }

      inputValue = this._stripAllNonNumberCharactersExceptCustomDecimalChar(inputValue, settings, false, isFocused);

      if (this._isElementValueEmptyOrOnlyTheNegativeSign(inputValue, settings)) {
        return this._orderValueCurrencySymbolAndSuffixText(inputValue, settings, true);
      }

      var isZeroOrHasNoValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isZeroOrHasNoValue(inputValue); // Temporarily remove the negative sign if present

      if (isValueNegative) {
        inputValue = inputValue.replace('-', ''); // At this point the `inputValue` has been normalized with a 'normal' negative sign `'-'` //TODO Check that comment validity, since `_stripAllNonNumberCharactersExceptCustomDecimalChar` *does not* convert the negative sign
      }

      settings.digitalGroupSpacing = settings.digitalGroupSpacing.toString();
      var digitalGroup;

      switch (settings.digitalGroupSpacing) {
        case AutoNumeric.options.digitalGroupSpacing.two:
          digitalGroup = /(\d)((\d)(\d{2}?)+)$/;
          break;

        case AutoNumeric.options.digitalGroupSpacing.twoScaled:
          digitalGroup = /(\d)((?:\d{2}){0,2}\d{3}(?:(?:\d{2}){2}\d{3})*?)$/;
          break;

        case AutoNumeric.options.digitalGroupSpacing.four:
          digitalGroup = /(\d)((\d{4}?)+)$/;
          break;

        case AutoNumeric.options.digitalGroupSpacing.three:
        default:
          digitalGroup = /(\d)((\d{3}?)+)$/;
      } // Splits the string at the decimal string


      var _inputValue$split = inputValue.split(settings.decimalCharacter),
          _inputValue$split2 = _slicedToArray(_inputValue$split, 2),
          integerPart = _inputValue$split2[0],
          decimalPart = _inputValue$split2[1];

      if (settings.decimalCharacterAlternative && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(decimalPart)) {
        var _inputValue$split3 = inputValue.split(settings.decimalCharacterAlternative);

        var _inputValue$split4 = _slicedToArray(_inputValue$split3, 2);

        integerPart = _inputValue$split4[0];
        decimalPart = _inputValue$split4[1];
      }

      if (settings.digitGroupSeparator !== '') {
        // Re-inserts the thousand separator via a regular expression
        while (digitalGroup.test(integerPart)) {
          integerPart = integerPart.replace(digitalGroup, "$1".concat(settings.digitGroupSeparator, "$2"));
        }
      } // Find out how many decimal places should be kept, depending on the object state (isFocused)


      var decimalPlacesToRoundTo;

      if (isFocused) {
        decimalPlacesToRoundTo = settings.decimalPlacesShownOnFocus;
      } else {
        decimalPlacesToRoundTo = settings.decimalPlacesShownOnBlur;
      }

      if (decimalPlacesToRoundTo !== 0 && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(decimalPart)) {
        if (decimalPart.length > decimalPlacesToRoundTo) {
          // Trim the excessive number of decimal places
          decimalPart = decimalPart.substring(0, decimalPlacesToRoundTo);
        } // Joins the whole number with the decimal value


        inputValue = "".concat(integerPart).concat(settings.decimalCharacter).concat(decimalPart);
      } else {
        // Otherwise if it's an integer
        inputValue = integerPart;
      } // Add back the negative/positive sign and the currency symbol, at the right positions


      inputValue = AutoNumeric._mergeCurrencySignNegativePositiveSignAndValue(inputValue, settings, isValueNegative, isZeroOrHasNoValue); //TODO this function is called again in `_toggleNegativeBracket` if the brackets are removed; let's DRY this

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(forcedRawValue)) {
        // If the raw value is not forced, use the default one from the settings object
        forcedRawValue = currentRawValue;
      } // Toggle the negative sign and brackets


      if (settings.negativeBracketsTypeOnBlur !== null && (forcedRawValue < 0 || _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegativeStrict(inputValue, settings.negativeSignCharacter))) {
        inputValue = this._toggleNegativeBracket(inputValue, settings, isFocused);
      }

      var result;

      if (settings.suffixText) {
        result = "".concat(inputValue).concat(settings.suffixText);
      } else {
        result = inputValue;
      }

      return result;
    }
    /**
     * Return a semi-formatted string where the input value, the negative or positive sign, and the currency symbol are stitched together at the right positions, using the options set in the `settings` object.
     * Note : the `inputValue` is usually not a numeric string since the grouping symbols are already added to it at this point.
     *
     * @param {string} inputValue
     * @param {object} settings
     * @param {boolean} isValueNegative
     * @param {boolean} isZeroOrHasNoValue
     * @returns {*}
     * @throws
     * @private
     */

  }, {
    key: "_mergeCurrencySignNegativePositiveSignAndValue",
    value: function _mergeCurrencySignNegativePositiveSignAndValue(inputValue, settings, isValueNegative, isZeroOrHasNoValue) {
      var signToUse = '';

      if (isValueNegative) {
        signToUse = settings.negativeSignCharacter;
      } else if (settings.showPositiveSign && !isZeroOrHasNoValue) {
        signToUse = settings.positiveSignCharacter;
      }

      var result;

      if (settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.prefix) {
        if (settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.none && (isValueNegative || !isValueNegative && settings.showPositiveSign && !isZeroOrHasNoValue)) {
          switch (settings.negativePositiveSignPlacement) {
            case AutoNumeric.options.negativePositiveSignPlacement.prefix:
            case AutoNumeric.options.negativePositiveSignPlacement.left:
              result = "".concat(signToUse).concat(settings.currencySymbol).concat(inputValue);
              break;

            case AutoNumeric.options.negativePositiveSignPlacement.right:
              result = "".concat(settings.currencySymbol).concat(signToUse).concat(inputValue);
              break;

            case AutoNumeric.options.negativePositiveSignPlacement.suffix:
              result = "".concat(settings.currencySymbol).concat(inputValue).concat(signToUse);
              break;
          }
        } else {
          result = settings.currencySymbol + inputValue;
        }
      } else if (settings.currencySymbolPlacement === AutoNumeric.options.currencySymbolPlacement.suffix) {
        if (settings.negativePositiveSignPlacement !== AutoNumeric.options.negativePositiveSignPlacement.none && (isValueNegative || !isValueNegative && settings.showPositiveSign && !isZeroOrHasNoValue)) {
          switch (settings.negativePositiveSignPlacement) {
            case AutoNumeric.options.negativePositiveSignPlacement.suffix:
            case AutoNumeric.options.negativePositiveSignPlacement.right:
              result = "".concat(inputValue).concat(settings.currencySymbol).concat(signToUse);
              break;

            case AutoNumeric.options.negativePositiveSignPlacement.left:
              result = "".concat(inputValue).concat(signToUse).concat(settings.currencySymbol);
              break;

            case AutoNumeric.options.negativePositiveSignPlacement.prefix:
              result = "".concat(signToUse).concat(inputValue).concat(settings.currencySymbol);
              break;
          }
        } else {
          result = inputValue + settings.currencySymbol;
        }
      }

      return result;
    }
  }, {
    key: "_truncateZeros",
    value: function _truncateZeros(roundedInputValue, decimalPlacesNeeded) {
      var regex;

      switch (decimalPlacesNeeded) {
        case 0:
          // Prevents padding - removes trailing zeros until the first significant digit is encountered
          regex = /(\.(?:\d*[1-9])?)0*$/;
          break;

        case 1:
          // Allows padding when decimalPlacesNeeded equals one - leaves one zero trailing the decimal character
          regex = /(\.\d(?:\d*[1-9])?)0*$/;
          break;

        default:
          // Removes superfluous zeros after the decimalPlacesNeeded length
          regex = new RegExp("(\\.\\d{".concat(decimalPlacesNeeded, "}(?:\\d*[1-9])?)0*"));
      } // If there are no decimal places, we don't need a decimal point at the end


      roundedInputValue = roundedInputValue.replace(regex, '$1');

      if (decimalPlacesNeeded === 0) {
        roundedInputValue = roundedInputValue.replace(/\.$/, '');
      }

      return roundedInputValue;
    }
    /**
     * Round the given `value` with the number of decimal places to keep for the raw value.
     *
     * @param {string|null} value An unformatted numeric value
     * @param {object} settings
     * @returns {*}
     * @private
     */

  }, {
    key: "_roundRawValue",
    value: function _roundRawValue(value, settings) {
      return this._roundValue(value, settings, settings.decimalPlacesRawValue);
    }
    /**
     * Round the given `value` with the number of decimal places to show for the element if focused.
     *
     * @param {string|null} value An unformatted numeric value
     * @param {object} settings
     * @returns {*}
     * @private
     */

  }, {
    key: "_roundFormattedValueShownOnFocus",
    value: function _roundFormattedValueShownOnFocus(value, settings) {
      return this._roundValue(value, settings, Number(settings.decimalPlacesShownOnFocus));
    }
    /**
     * Round the given `value` with the number of decimal places to show for the element if unfocused.
     *
     * @param {string|null} value An unformatted numeric value
     * @param {object} settings
     * @returns {*}
     * @private
     */

  }, {
    key: "_roundFormattedValueShownOnBlur",
    value: function _roundFormattedValueShownOnBlur(value, settings) {
      return this._roundValue(value, settings, Number(settings.decimalPlacesShownOnBlur));
    }
    /**
     * Round the given `value` with the number of decimal places to show for the element based on the value of isFocused.
     *
     * @param {string|null} value An unformatted numeric value
     * @param {object} settings
     * @param {boolean} isFocused
     * @returns {*}
     * @private
     */

  }, {
    key: "_roundFormattedValueShownOnFocusOrBlur",
    value: function _roundFormattedValueShownOnFocusOrBlur(value, settings, isFocused) {
      if (isFocused) {
        return this._roundFormattedValueShownOnFocus(value, settings);
      } else {
        return this._roundFormattedValueShownOnBlur(value, settings);
      }
    }
    /**
     * Round the input value using the rounding method defined in the settings.
     * This function accepts multiple rounding methods. See the documentation for more details about those.
     *
     * Note : This is handled as text since JavaScript math functions can return inaccurate values.
     *
     * @param {string|null} inputValue An unformatted numeric value
     * @param {object} settings
     * @param {int} decimalPlacesToRoundTo
     * @returns {*}
     */

  }, {
    key: "_roundValue",
    value: function _roundValue(inputValue, settings, decimalPlacesToRoundTo) {
      //XXX Note; this function is static since we need to pass a `settings` object when calling the static `AutoNumeric.format()` method
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(inputValue)) {
        // Prevent rounding a `null` value
        return inputValue;
      } //TODO Divide this function to make it easier to understand


      inputValue = inputValue === '' ? '0' : inputValue.toString();

      if (settings.roundingMethod === AutoNumeric.options.roundingMethod.toNearest05 || settings.roundingMethod === AutoNumeric.options.roundingMethod.toNearest05Alt || settings.roundingMethod === AutoNumeric.options.roundingMethod.upToNext05 || settings.roundingMethod === AutoNumeric.options.roundingMethod.downToNext05) {
        return this._roundCloseTo05(inputValue, settings);
      }

      var _AutoNumeric$_prepare = AutoNumeric._prepareValueForRounding(inputValue, settings),
          _AutoNumeric$_prepare2 = _slicedToArray(_AutoNumeric$_prepare, 2),
          negativeSign = _AutoNumeric$_prepare2[0],
          preparedValue = _AutoNumeric$_prepare2[1];

      inputValue = preparedValue;
      var decimalCharacterPosition = inputValue.lastIndexOf('.');
      var inputValueHasNoDot = decimalCharacterPosition === -1; // No dot character is found in the `inputValue`

      var _inputValue$split5 = inputValue.split('.'),
          _inputValue$split6 = _slicedToArray(_inputValue$split5, 2),
          integerPart = _inputValue$split6[0],
          decimalPart = _inputValue$split6[1]; // Here the decimal character is always a period '.'


      var hasDecimals = decimalPart > 0; // If no decimals are detected

      if (!hasDecimals && (settings.allowDecimalPadding === AutoNumeric.options.allowDecimalPadding.never || settings.allowDecimalPadding === AutoNumeric.options.allowDecimalPadding.floats)) {
        // If the value decimalPart is only one or more zeroes, then it needs to be removed from the resulting string (cf. issue #652)
        return Number(inputValue) === 0 ? integerPart : "".concat(negativeSign).concat(integerPart);
      } // Else there are some decimal places that may need to be rounded
      // Sets the truncate zero method


      var temporaryDecimalPlacesOverride;

      if (settings.allowDecimalPadding === AutoNumeric.options.allowDecimalPadding.always || settings.allowDecimalPadding === AutoNumeric.options.allowDecimalPadding.floats) {
        temporaryDecimalPlacesOverride = decimalPlacesToRoundTo;
      } else {
        temporaryDecimalPlacesOverride = 0;
      } // Define the decimal position to use (use the very last position if there are no dot in the initial inputValue)


      var decimalPositionToUse = inputValueHasNoDot ? inputValue.length - 1 : decimalCharacterPosition; // Checks decimal places to determine if rounding is required

      var checkDecimalPlaces = inputValue.length - 1 - decimalPositionToUse;
      var inputValueRounded = ''; // Check if no rounding is required

      if (checkDecimalPlaces <= decimalPlacesToRoundTo) {
        // Check if we need to pad with zeros
        inputValueRounded = inputValue;

        if (checkDecimalPlaces < temporaryDecimalPlacesOverride) {
          if (inputValueHasNoDot) {
            inputValueRounded = "".concat(inputValueRounded).concat(settings.decimalCharacter);
          }

          var zeros = '000000'; //TODO Change that string with a longer one to prevent having to loop numerous times in the next `while` statement?

          while (checkDecimalPlaces < temporaryDecimalPlacesOverride) {
            zeros = zeros.substring(0, temporaryDecimalPlacesOverride - checkDecimalPlaces);
            inputValueRounded += zeros;
            checkDecimalPlaces += zeros.length;
          }
        } else if (checkDecimalPlaces > temporaryDecimalPlacesOverride) {
          inputValueRounded = this._truncateZeros(inputValueRounded, temporaryDecimalPlacesOverride);
        } else if (checkDecimalPlaces === 0 && temporaryDecimalPlacesOverride === 0) {
          // Remove any trailing dot, if any
          inputValueRounded = inputValueRounded.replace(/\.$/, '');
        }

        return Number(inputValueRounded) === 0 ? inputValueRounded : "".concat(negativeSign).concat(inputValueRounded);
      } // Rounded length of the string after rounding


      var roundedStrLength;

      if (inputValueHasNoDot) {
        roundedStrLength = decimalPlacesToRoundTo - 1;
      } else {
        roundedStrLength = Number(decimalPlacesToRoundTo) + Number(decimalCharacterPosition);
      }

      var lastDigit = Number(inputValue.charAt(roundedStrLength + 1));
      var inputValueArray = inputValue.substring(0, roundedStrLength + 1).split('');
      var odd;

      if (inputValue.charAt(roundedStrLength) === '.') {
        odd = inputValue.charAt(roundedStrLength - 1) % 2;
      } else {
        odd = inputValue.charAt(roundedStrLength) % 2;
      }

      if (this._shouldRoundUp(lastDigit, settings, negativeSign, odd)) {
        // Round up the last digit if required, and continue until no more 9's are found
        for (var i = inputValueArray.length - 1; i >= 0; i -= 1) {
          if (inputValueArray[i] !== '.') {
            inputValueArray[i] = +inputValueArray[i] + 1;

            if (inputValueArray[i] < 10) {
              break;
            }

            if (i > 0) {
              inputValueArray[i] = '0';
            }
          }
        }
      } // Reconstruct the string, converting any 10's to 0's


      inputValueArray = inputValueArray.slice(0, roundedStrLength + 1); // Return the rounded value

      inputValueRounded = this._truncateZeros(inputValueArray.join(''), temporaryDecimalPlacesOverride);
      return Number(inputValueRounded) === 0 ? inputValueRounded : "".concat(negativeSign).concat(inputValueRounded);
    }
    /**
     * Round the `value` when the rounding method deals with '.05'
     *
     * @param {string} value
     * @param {object} settings
     * @returns {string}
     * @private
     */

  }, {
    key: "_roundCloseTo05",
    value: function _roundCloseTo05(value, settings) {
      switch (settings.roundingMethod) {
        case AutoNumeric.options.roundingMethod.toNearest05:
        case AutoNumeric.options.roundingMethod.toNearest05Alt:
          value = (Math.round(value * 20) / 20).toString();
          break;

        case AutoNumeric.options.roundingMethod.upToNext05:
          value = (Math.ceil(value * 20) / 20).toString();
          break;

        default:
          value = (Math.floor(value * 20) / 20).toString();
      }

      var result;

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].contains(value, '.')) {
        result = value + '.00';
      } else if (value.length - value.indexOf('.') < 3) {
        result = value + '0';
      } else {
        result = value;
      }

      return result;
    }
    /**
     * Modify the given `value` in order to make it usable for the rest of the rounding function.
     * This convert the `value` to a positive one, trim any leading zeros and make sure it does not starts with a leading dot.
     *
     * @param {string} value The unformatted value
     * @param {object} settings
     * @returns {[string, string]}
     * @private
     */

  }, {
    key: "_prepareValueForRounding",
    value: function _prepareValueForRounding(value, settings) {
      // Checks if `inputValue` is a negative value
      var negativeSign = '';

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNegativeStrict(value, '-')) {
        // The value being unformatted, we check for the minus sign
        negativeSign = '-'; // Removes the negative sign that will be added back later if required

        value = value.replace('-', '');
      } // Append a zero if the first character is not a digit (then it is likely a dot)


      if (!value.match(/^\d/)) {
        value = "0".concat(value);
      } // Determines if the value is equal to zero. If it is, remove the negative sign


      if (Number(value) === 0) {
        negativeSign = '';
      } // Trims leading zero's as needed


      if (Number(value) > 0 && settings.leadingZero !== AutoNumeric.options.leadingZero.keep || value.length > 0 && settings.leadingZero === AutoNumeric.options.leadingZero.allow) {
        value = value.replace(/^0*(\d)/, '$1');
      }

      return [negativeSign, value];
    }
    /**
     * Return `true` if a round up should be done given the last digit, the settings and other information about the value.
     *
     * @param {number} lastDigit
     * @param {object} settings
     * @param {string} negativeSign This variable comes from `_prepareValueForRounding()`, which return `'-'` if the initial value was negative
     * @param {number} odd
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_shouldRoundUp",
    value: function _shouldRoundUp(lastDigit, settings, negativeSign, odd) {
      return lastDigit > 4 && settings.roundingMethod === AutoNumeric.options.roundingMethod.halfUpSymmetric || // Round half up symmetric
      lastDigit > 4 && settings.roundingMethod === AutoNumeric.options.roundingMethod.halfUpAsymmetric && negativeSign === '' || // Round half up asymmetric positive values
      lastDigit > 5 && settings.roundingMethod === AutoNumeric.options.roundingMethod.halfUpAsymmetric && negativeSign === '-' || // Round half up asymmetric negative values
      lastDigit > 5 && settings.roundingMethod === AutoNumeric.options.roundingMethod.halfDownSymmetric || // Round half down symmetric
      lastDigit > 5 && settings.roundingMethod === AutoNumeric.options.roundingMethod.halfDownAsymmetric && negativeSign === '' || // Round half down asymmetric positive values
      lastDigit > 4 && settings.roundingMethod === AutoNumeric.options.roundingMethod.halfDownAsymmetric && negativeSign === '-' || // Round half down asymmetric negative values
      lastDigit > 5 && settings.roundingMethod === AutoNumeric.options.roundingMethod.halfEvenBankersRounding || lastDigit === 5 && settings.roundingMethod === AutoNumeric.options.roundingMethod.halfEvenBankersRounding && odd === 1 || lastDigit > 0 && settings.roundingMethod === AutoNumeric.options.roundingMethod.toCeilingTowardPositiveInfinity && negativeSign === '' || lastDigit > 0 && settings.roundingMethod === AutoNumeric.options.roundingMethod.toFloorTowardNegativeInfinity && negativeSign === '-' || lastDigit > 0 && settings.roundingMethod === AutoNumeric.options.roundingMethod.upRoundAwayFromZero; // Round up away from zero
    }
    /**
     * Truncates the decimal part of a number to the given number of decimal places `decimalPlacesToRoundTo`.
     *
     * @param {string} value
     * @param {object} settings
     * @param {boolean} isPaste
     * @param {int} decimalPlacesToRoundTo
     * @returns {*}
     */

  }, {
    key: "_truncateDecimalPlaces",
    value: function _truncateDecimalPlaces(value, settings, isPaste, decimalPlacesToRoundTo) {
      if (isPaste) {
        value = this._roundFormattedValueShownOnFocus(value, settings);
      }

      var _value$split = value.split(settings.decimalCharacter),
          _value$split2 = _slicedToArray(_value$split, 2),
          integerPart = _value$split2[0],
          decimalPart = _value$split2[1]; // Truncate the decimal part to the satisfying length since we would round it anyway


      if (decimalPart && decimalPart.length > decimalPlacesToRoundTo) {
        if (decimalPlacesToRoundTo > 0) {
          var modifiedDecimalPart = decimalPart.substring(0, decimalPlacesToRoundTo);
          value = "".concat(integerPart).concat(settings.decimalCharacter).concat(modifiedDecimalPart);
        } else {
          value = integerPart;
        }
      }

      return value;
    }
    /**
     * Check if the given value is within the `minimumValue` and `maximumValue` range, while using the override options set with `overrideMinMaxLimits`.
     * The minimum and maximum limit test results are returned in a array like `[isMinimumLimitRespected, isMaximumLimitRespected]`.
     *
     * @param {string} value
     * @param {object} settings
     * @returns {[boolean, boolean]}
     */

  }, {
    key: "_checkIfInRangeWithOverrideOption",
    value: function _checkIfInRangeWithOverrideOption(value, settings) {
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(value) && settings.emptyInputBehavior === AutoNumeric.options.emptyInputBehavior["null"] || // When the `null` value is accepted as the `rawValue`, the limits are ignored
      settings.overrideMinMaxLimits === AutoNumeric.options.overrideMinMaxLimits.ignore || settings.overrideMinMaxLimits === AutoNumeric.options.overrideMinMaxLimits.invalid) {
        return [true, true];
      }

      value = value.toString();
      value = value.replace(',', '.');
      var minParse = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].parseStr(settings.minimumValue);
      var maxParse = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].parseStr(settings.maximumValue);
      var valParse = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].parseStr(value);
      var result;

      switch (settings.overrideMinMaxLimits) {
        case AutoNumeric.options.overrideMinMaxLimits.floor:
          result = [_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].testMinMax(minParse, valParse) > -1, true];
          break;

        case AutoNumeric.options.overrideMinMaxLimits.ceiling:
          result = [true, _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].testMinMax(maxParse, valParse) < 1];
          break;

        default:
          result = [_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].testMinMax(minParse, valParse) > -1, _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].testMinMax(maxParse, valParse) < 1];
      }

      return result;
    }
    /**
     * Returns `true` if the given value is within the `minimumValue` and `maximumValue` limits, while using the override options set with `overrideMinMaxLimits`, `false` otherwise
     *
     * @param {string} value
     * @param {object} settings
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isWithinRangeWithOverrideOption",
    value: function _isWithinRangeWithOverrideOption(value, settings) {
      var _this$_checkIfInRange = this._checkIfInRangeWithOverrideOption(value, settings),
          _this$_checkIfInRange2 = _slicedToArray(_this$_checkIfInRange, 2),
          minTest = _this$_checkIfInRange2[0],
          maxTest = _this$_checkIfInRange2[1];

      return minTest && maxTest;
    }
    /**
     * Helper function that prepares the value string for the min/max test
     *
     * @param {string} value
     * @returns {{}}
     * @private
     */

  }, {
    key: "_cleanValueForRangeParse",
    value: function _cleanValueForRangeParse(value) {
      value = value.toString().replace(',', '.');
      return _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].parseStr(value);
    }
    /**
     * Returns `true` is the value is superior or equal to the `minimumValue` limit, discarding any override options
     *
     * @param {string} value
     * @param {object} settings
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isMinimumRangeRespected",
    value: function _isMinimumRangeRespected(value, settings) {
      return _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].testMinMax(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].parseStr(settings.minimumValue), this._cleanValueForRangeParse(value)) > -1;
    }
    /**
     * Returns `true` is the value is inferior or equal to the `maximumValue` limit, discarding any override options
     *
     * @param {string} value
     * @param {object} settings
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_isMaximumRangeRespected",
    value: function _isMaximumRangeRespected(value, settings) {
      return _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].testMinMax(_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].parseStr(settings.maximumValue), this._cleanValueForRangeParse(value)) < 1;
    }
  }, {
    key: "_readCookie",
    value: function _readCookie(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      var c = '';

      for (var i = 0; i < ca.length; i += 1) {
        c = ca[i];

        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }

      return null;
    }
    /**
     * Test if sessionStorage is supported.
     * This is taken from Modernizr.
     *
     * @returns {boolean}
     */

  }, {
    key: "_storageTest",
    value: function _storageTest() {
      var mod = 'modernizr';

      try {
        sessionStorage.setItem(mod, mod);
        sessionStorage.removeItem(mod);
        return true;
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "_correctNegativePositiveSignPlacementOption",
    value: function _correctNegativePositiveSignPlacementOption(settings) {
      //XXX Note; this function is static since we need to pass a `settings` object when calling the static `AutoNumeric.format()` method
      // If negativePositiveSignPlacement is already set, we do not overwrite it
      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(settings.negativePositiveSignPlacement)) {
        return;
      }

      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(settings) && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(settings.negativePositiveSignPlacement) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(settings.currencySymbol)) {
        switch (settings.currencySymbolPlacement) {
          case AutoNumeric.options.currencySymbolPlacement.suffix:
            settings.negativePositiveSignPlacement = AutoNumeric.options.negativePositiveSignPlacement.prefix; // Default -1,234.56 €

            break;

          case AutoNumeric.options.currencySymbolPlacement.prefix:
            settings.negativePositiveSignPlacement = AutoNumeric.options.negativePositiveSignPlacement.left; // Default -$1,234.56

            break;

          default: //

        }
      } else {
        // Sets the default value if `negativePositiveSignPlacement` is `null`
        settings.negativePositiveSignPlacement = AutoNumeric.options.negativePositiveSignPlacement.left;
      }
    }
    /**
     * Correct the `caretPositionOnFocus` and `selectOnFocus` options, since setting both leads to a conflict.
     * This method directly modifies the `options` object passed as a parameter, then returns it.
     * It returns `null` if the given option is `null`.
     *
     * @param {object} options The options passed as an argument by the user
     * @returns {object|null}
     * @private
     */

  }, {
    key: "_correctCaretPositionOnFocusAndSelectOnFocusOptions",
    value: function _correctCaretPositionOnFocusAndSelectOnFocusOptions(options) {
      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options)) {
        return null;
      } // If the user has set the `caretPositionOnFocus` option, do not set `selectOnFocus` to `true` by default


      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(options.caretPositionOnFocus) && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(options.selectOnFocus)) {
        options.selectOnFocus = AutoNumeric.options.selectOnFocus.doNotSelect;
      } // If the user has set the `selectOnFocus` option to `true`, set `caretPositionOnFocus` to `doNoForceCaretPosition`


      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(options.caretPositionOnFocus) && !_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefinedOrNullOrEmpty(options.selectOnFocus) && options.selectOnFocus === AutoNumeric.options.selectOnFocus.select) {
        options.caretPositionOnFocus = AutoNumeric.options.caretPositionOnFocus.doNoForceCaretPosition;
      }

      return options;
    }
    /**
     * Calculate the number de decimal places to be used by the AutoNumeric object, for each of its state, and for its formatted and raw value.
     * By default, the `rawValue` precision is the same as the formatted value one.
     *
     * This method is called during the AutoNumeric object initialization. This assumes some internal variable state.
     *
     * This methods set the following options accordingly to their own value and the mandatory `decimalPlaces` option:
     * - decimalPlacesRawValue     (nullable)
     * - decimalPlacesShownOnBlur  (nullable)
     * - decimalPlacesShownOnFocus (nullable)
     *
     * Note: the `decimalPlaces` option is only used here and only serve to define those three previous options value.
     * AutoNumeric will then *only* use `decimalPlacesRawValue`, `decimalPlacesShownOnBlur` and `decimalPlacesShownOnFocus` from there.
     *
     * This methods directly modifies the `settings` object passed as a parameter.
     *
     * @param {object} settings This is an object with the new settings to use.
     * @private
     */

  }, {
    key: "_calculateDecimalPlacesOnInit",
    value: function _calculateDecimalPlacesOnInit(settings) {
      // Check the `decimalPlaces*` options and output any warnings as needed, before modifying those options
      this._validateDecimalPlacesRawValue(settings); // Initialization phase
      //XXX This assumes at this stage, `settings.decimalPlaces` as been set from the default options
      // Overwrite the `decimalPlaces*` values if the `decimalPlaces*` options are not set in the `settings`
      // Sets `decimalPlacesShownOnBlur` (previously known as `scaleDecimalPlaces`)


      if (settings.decimalPlacesShownOnFocus === AutoNumeric.options.decimalPlacesShownOnFocus.useDefault) {
        settings.decimalPlacesShownOnFocus = settings.decimalPlaces;
      }

      if (settings.decimalPlacesShownOnBlur === AutoNumeric.options.decimalPlacesShownOnBlur.useDefault) {
        settings.decimalPlacesShownOnBlur = settings.decimalPlaces;
      }

      if (settings.decimalPlacesRawValue === AutoNumeric.options.decimalPlacesRawValue.useDefault) {
        settings.decimalPlacesRawValue = settings.decimalPlaces;
      } // Add the additional decimal places to the raw value


      var additionalDecimalPlacesRawValue = 0;

      if (settings.rawValueDivisor && settings.rawValueDivisor !== AutoNumeric.options.rawValueDivisor.none) {
        additionalDecimalPlacesRawValue = String(settings.rawValueDivisor).length - 1; // ie. Dividing by '100' adds 2 decimal places to the needed precision

        if (additionalDecimalPlacesRawValue < 0) {
          additionalDecimalPlacesRawValue = 0;
        }
      }

      settings.decimalPlacesRawValue = Math.max(Math.max(settings.decimalPlacesShownOnBlur, settings.decimalPlacesShownOnFocus) + additionalDecimalPlacesRawValue, Number(settings.originalDecimalPlacesRawValue) + additionalDecimalPlacesRawValue);
    }
    /**
     * Recalculate the number de decimal places to be used by the AutoNumeric object, for each of its state, and for its formatted and raw value.
     * By default, the `rawValue` precision is the same as the formatted value one.
     *
     * This method is close to the one called during initialization, `_calculateDecimalPlacesOnInit()`, but with slight difference so that the `decimalPlaces*` options are correctly updated as needed.
     *
     * This methods set the following options accordingly to their own value and the mandatory `decimalPlaces` option:
     * - decimalPlacesRawValue     (nullable)
     * - decimalPlacesShownOnBlur  (nullable)
     * - decimalPlacesShownOnFocus (nullable)
     *
     * Note: the `decimalPlaces` option is only used here and only serve to define those three previous options value.
     * AutoNumeric will then *only* use `decimalPlacesRawValue`, `decimalPlacesShownOnBlur` and `decimalPlacesShownOnFocus` from there.
     *
     * This methods directly modifies the `settings` object passed as a parameter.
     *
     * @param {object} settings This is an object with the new settings to use.
     * @param {object} currentSettings This is the current settings (`this.settings`) used by the element.
     * @private
     */

  }, {
    key: "_calculateDecimalPlacesOnUpdate",
    value: function _calculateDecimalPlacesOnUpdate(settings) {
      var currentSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      // Check the `decimalPlaces*` options and output any warnings as needed, before modifying those options
      this._validateDecimalPlacesRawValue(settings); // Update phase


      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(currentSettings)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("When updating the settings, the previous ones should be passed as an argument.");
      }

      var decimalPlacesInOptions = ('decimalPlaces' in settings);

      if (!(decimalPlacesInOptions || 'decimalPlacesRawValue' in settings || 'decimalPlacesShownOnFocus' in settings || 'decimalPlacesShownOnBlur' in settings || 'rawValueDivisor' in settings)) {
        // Do Nothing if no decimal places-related options are modified
        return;
      } // Overwrite the `decimalPlaces*` values if the `decimalPlaces*` options are not set in the `settings`


      if (decimalPlacesInOptions) {
        if (!('decimalPlacesShownOnFocus' in settings) || settings.decimalPlacesShownOnFocus === AutoNumeric.options.decimalPlacesShownOnFocus.useDefault) {
          settings.decimalPlacesShownOnFocus = settings.decimalPlaces;
        }

        if (!('decimalPlacesShownOnBlur' in settings) || settings.decimalPlacesShownOnBlur === AutoNumeric.options.decimalPlacesShownOnBlur.useDefault) {
          settings.decimalPlacesShownOnBlur = settings.decimalPlaces;
        }

        if (!('decimalPlacesRawValue' in settings) || settings.decimalPlacesRawValue === AutoNumeric.options.decimalPlacesRawValue.useDefault) {
          settings.decimalPlacesRawValue = settings.decimalPlaces;
        }
      } else {
        if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(settings.decimalPlacesShownOnFocus)) {
          settings.decimalPlacesShownOnFocus = currentSettings.decimalPlacesShownOnFocus;
        }

        if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(settings.decimalPlacesShownOnBlur)) {
          settings.decimalPlacesShownOnBlur = currentSettings.decimalPlacesShownOnBlur;
        }
      } // Add the additional decimal places to the raw value


      var additionalDecimalPlacesRawValue = 0;

      if (settings.rawValueDivisor && settings.rawValueDivisor !== AutoNumeric.options.rawValueDivisor.none) {
        additionalDecimalPlacesRawValue = String(settings.rawValueDivisor).length - 1; // ie. Dividing by '100' adds 2 decimal places to the needed precision

        if (additionalDecimalPlacesRawValue < 0) {
          additionalDecimalPlacesRawValue = 0;
        }
      }

      if (!settings.decimalPlaces && !settings.decimalPlacesRawValue) {
        settings.decimalPlacesRawValue = Math.max(Math.max(settings.decimalPlacesShownOnBlur, settings.decimalPlacesShownOnFocus) + additionalDecimalPlacesRawValue, Number(currentSettings.originalDecimalPlacesRawValue) + additionalDecimalPlacesRawValue);
      } else {
        settings.decimalPlacesRawValue = Math.max(Math.max(settings.decimalPlacesShownOnBlur, settings.decimalPlacesShownOnFocus) + additionalDecimalPlacesRawValue, Number(settings.decimalPlacesRawValue) + additionalDecimalPlacesRawValue);
      }
    }
  }, {
    key: "_cachesUsualRegularExpressions",
    value: function _cachesUsualRegularExpressions(settings, regex) {
      // Test if there is a negative character in the string
      var negativeSignReg;

      if (settings.negativeSignCharacter !== AutoNumeric.options.negativeSignCharacter.hyphen) {
        negativeSignReg = "([-\\".concat(settings.negativeSignCharacter, "]?)");
      } else {
        negativeSignReg = '(-?)';
      }

      regex.aNegRegAutoStrip = negativeSignReg;
      settings.allowedAutoStrip = new RegExp("[^-0123456789\\".concat(settings.decimalCharacter, "]"), 'g');
      settings.numRegAutoStrip = new RegExp("".concat(negativeSignReg, "(?:\\").concat(settings.decimalCharacter, "?([0-9]+\\").concat(settings.decimalCharacter, "[0-9]+)|([0-9]*(?:\\").concat(settings.decimalCharacter, "[0-9]*)?))")); // Using this regex version `^${regex.aNegRegAutoStrip}0*(\\d|$)` entirely clear the input on blur

      settings.stripReg = new RegExp("^".concat(regex.aNegRegAutoStrip, "0*([0-9])")); // All the characters that are accepted during the formula mode

      settings.formulaChars = new RegExp("[0-9".concat(settings.decimalCharacter, "+\\-*/() ]"));
    }
  }, {
    key: "_convertOldOptionsToNewOnes",
    value: function _convertOldOptionsToNewOnes(options) {
      //TODO Delete this function once the old options are not used anymore
      var oldOptionsConverter = {
        // Old option names, with their corresponding new names
        aSep: 'digitGroupSeparator',
        nSep: 'showOnlyNumbersOnFocus',
        dGroup: 'digitalGroupSpacing',
        aDec: 'decimalCharacter',
        altDec: 'decimalCharacterAlternative',
        aSign: 'currencySymbol',
        pSign: 'currencySymbolPlacement',
        pNeg: 'negativePositiveSignPlacement',
        aSuffix: 'suffixText',
        oLimits: 'overrideMinMaxLimits',
        vMax: 'maximumValue',
        vMin: 'minimumValue',
        mDec: 'decimalPlacesOverride',
        eDec: 'decimalPlacesShownOnFocus',
        scaleDecimal: 'decimalPlacesShownOnBlur',
        aStor: 'saveValueToSessionStorage',
        mRound: 'roundingMethod',
        aPad: 'allowDecimalPadding',
        nBracket: 'negativeBracketsTypeOnBlur',
        wEmpty: 'emptyInputBehavior',
        lZero: 'leadingZero',
        aForm: 'formatOnPageLoad',
        sNumber: 'selectNumberOnly',
        anDefault: 'defaultValueOverride',
        unSetOnSubmit: 'unformatOnSubmit',
        outputType: 'outputFormat',
        debug: 'showWarnings',
        // Current options :
        allowDecimalPadding: true,
        alwaysAllowDecimalCharacter: true,
        caretPositionOnFocus: true,
        createLocalList: true,
        currencySymbol: true,
        currencySymbolPlacement: true,
        decimalCharacter: true,
        decimalCharacterAlternative: true,
        decimalPlaces: true,
        decimalPlacesRawValue: true,
        decimalPlacesShownOnBlur: true,
        decimalPlacesShownOnFocus: true,
        defaultValueOverride: true,
        digitalGroupSpacing: true,
        digitGroupSeparator: true,
        divisorWhenUnfocused: true,
        emptyInputBehavior: true,
        eventBubbles: true,
        eventIsCancelable: true,
        failOnUnknownOption: true,
        formatOnPageLoad: true,
        formulaMode: true,
        historySize: true,
        isCancellable: true,
        leadingZero: true,
        maximumValue: true,
        minimumValue: true,
        modifyValueOnWheel: true,
        negativeBracketsTypeOnBlur: true,
        negativePositiveSignPlacement: true,
        negativeSignCharacter: true,
        noEventListeners: true,
        onInvalidPaste: true,
        outputFormat: true,
        overrideMinMaxLimits: true,
        positiveSignCharacter: true,
        rawValueDivisor: true,
        readOnly: true,
        roundingMethod: true,
        saveValueToSessionStorage: true,
        selectNumberOnly: true,
        selectOnFocus: true,
        serializeSpaces: true,
        showOnlyNumbersOnFocus: true,
        showPositiveSign: true,
        showWarnings: true,
        styleRules: true,
        suffixText: true,
        symbolWhenUnfocused: true,
        unformatOnHover: true,
        unformatOnSubmit: true,
        valuesToStrings: true,
        watchExternalChanges: true,
        wheelOn: true,
        wheelStep: true,
        // Additional information that are added to the `settings` object :
        //TODO Find a way to exclude those internal data from the settings object (ideally by using another object, or better yet, class attributes) -->
        allowedAutoStrip: true,
        formulaChars: true,
        isNegativeSignAllowed: true,
        isPositiveSignAllowed: true,
        mIntNeg: true,
        mIntPos: true,
        numRegAutoStrip: true,
        originalDecimalPlaces: true,
        originalDecimalPlacesRawValue: true,
        stripReg: true
      };

      for (var option in options) {
        if (Object.prototype.hasOwnProperty.call(options, option)) {
          if (oldOptionsConverter[option] === true) {
            // If the option is a 'new' option, we continue looping
            continue;
          }

          if (Object.prototype.hasOwnProperty.call(oldOptionsConverter, option)) {
            // Else we have an 'old' option name
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("You are using the deprecated option name '".concat(option, "'. Please use '").concat(oldOptionsConverter[option], "' instead from now on. The old option name will be dropped very soon\u2122."), true); // Then we modify the initial option object to use the new options instead of the old ones

            options[oldOptionsConverter[option]] = options[option];
            delete options[option];
          } else if (options.failOnUnknownOption) {
            // ...or the option name is unknown. This means there is a problem with the options object, therefore we throw an error.
            _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("Option name '".concat(option, "' is unknown. Please fix the options passed to autoNumeric"));
          }
        }
      }

      if ('mDec' in options) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning('The old `mDec` option has been deprecated in favor of more accurate options ; `decimalPlaces`, `decimalPlacesRawValue`, `decimalPlacesShownOnFocus` and `decimalPlacesShownOnBlur`.', true);
      }
    }
  }, {
    key: "_setNegativePositiveSignPermissions",
    value: function _setNegativePositiveSignPermissions(settings) {
      settings.isNegativeSignAllowed = settings.minimumValue < 0;
      settings.isPositiveSignAllowed = settings.maximumValue >= 0;
    }
    /**
     * Convert the `value` parameter that can either be :
     * - a real number,
     * - a number represented in the scientific notation (ie. -123.4567e-6)
     * - a string representing a real number, or
     * - a string representing a localized number (with specific group separators and decimal character),
     * ...to a string representing a real 'javascript' number (ie. '1234' or '1234.567').
     *
     * This function returns `NaN` if such conversion fails.
     *
     * @param {int|float|string} value
     * @param {object} settings
     * @returns {string|NaN}
     */

  }, {
    key: "_toNumericValue",
    value: function _toNumericValue(value, settings) {
      //XXX Note; this function is static since we need to pass a `settings` object when calling the static `AutoNumeric.format()` method
      var result;

      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(Number(value))) {
        // if (settings.decimalCharacter === '.' && AutoNumericHelper.isNumber(Number(value))) {
        // The value has either already been stripped, or a 'real' javascript number is passed as a parameter
        result = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].scientificToDecimal(value);
      } else {
        // Else if it's a string that `Number()` cannot typecast, then we try to convert the localized numeric string to a numeric one
        // Convert the value to a numeric string, stripping unnecessary characters in the process
        result = this._convertToNumericString(value.toString(), settings); // If the result is still not a numeric string, then we throw a warning

        if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(Number(result))) {
          _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("The given value \"".concat(value, "\" cannot be converted to a numeric one and therefore cannot be used appropriately."), settings.showWarnings);
          result = NaN;
        }
      }

      return result;
    }
  }, {
    key: "_checkIfInRange",
    value: function _checkIfInRange(value, parsedMinValue, parsedMaxValue) {
      var parsedValue = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].parseStr(value);
      return _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].testMinMax(parsedMinValue, parsedValue) > -1 && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].testMinMax(parsedMaxValue, parsedValue) < 1;
    }
  }, {
    key: "_shouldSkipEventKey",
    value: function _shouldSkipEventKey(eventKeyName) {
      var isFnKeys = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(eventKeyName, _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName._allFnKeys);
      var isOSKeys = eventKeyName === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.OSLeft || eventKeyName === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.OSRight;
      var isContextMenu = eventKeyName === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.ContextMenu;
      var isSomeNonPrintableKeys = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isInArray(eventKeyName, _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName._someNonPrintableKeys);
      var isOtherNonPrintableKeys = eventKeyName === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.NumLock || eventKeyName === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.ScrollLock || eventKeyName === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Insert || eventKeyName === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Command;
      var isUnrecognizableKeys = eventKeyName === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_1__["default"].keyName.Unidentified;
      return isFnKeys || isOSKeys || isContextMenu || isSomeNonPrintableKeys || isUnrecognizableKeys || isOtherNonPrintableKeys;
    }
  }, {
    key: "_serialize",
    value: function _serialize(form) {
      var _this15 = this;

      var intoAnArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var formatType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'unformatted';
      var serializedSpaceCharacter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '+';
      var forcedOutputFormat = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var result = [];

      if (_typeof(form) === 'object' && form.nodeName.toLowerCase() === 'form') {
        Array.prototype.slice.call(form.elements).forEach(function (element) {
          if (element.name && !element.disabled && ['file', 'reset', 'submit', 'button'].indexOf(element.type) === -1) {
            if (element.type === 'select-multiple') {
              Array.prototype.slice.call(element.options).forEach(function (option) {
                if (option.selected) {
                  //TODO Should we unformat/format/localize the selection option (which be default should be read-only)?
                  if (intoAnArray) {
                    result.push({
                      name: element.name,
                      value: option.value
                    });
                  } else {
                    // into a string
                    result.push("".concat(encodeURIComponent(element.name), "=").concat(encodeURIComponent(option.value)));
                  }
                }
              });
            } else if (['checkbox', 'radio'].indexOf(element.type) === -1 || element.checked) {
              var valueResult;

              if (_this15.isManagedByAutoNumeric(element)) {
                var anObject;

                switch (formatType) {
                  case 'unformatted':
                    anObject = _this15.getAutoNumericElement(element);

                    if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(anObject)) {
                      valueResult = _this15.unformat(element, anObject.getSettings());
                    }

                    break;

                  case 'localized':
                    anObject = _this15.getAutoNumericElement(element);

                    if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(anObject)) {
                      // Here I need to clone the setting object, otherwise I would modify it when changing the `outputFormat` option value
                      var currentSettings = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].cloneObject(anObject.getSettings());

                      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(forcedOutputFormat)) {
                        currentSettings.outputFormat = forcedOutputFormat;
                      }

                      valueResult = _this15.localize(element, currentSettings);
                    }

                    break;

                  case 'formatted':
                  default:
                    valueResult = element.value;
                }
              } else {
                valueResult = element.value;
              }

              if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(valueResult)) {
                _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError('This error should never be hit. If it has, something really wrong happened!');
              }

              if (intoAnArray) {
                result.push({
                  name: element.name,
                  value: valueResult
                });
              } else {
                // into a string
                result.push("".concat(encodeURIComponent(element.name), "=").concat(encodeURIComponent(valueResult)));
              }
            }
          }
        });
      }

      var finalResult;

      if (intoAnArray) {
        // Result as an Array
        // Note: `serializedSpaceCharacter` does not affect the array result since we do not change the space character for this one
        finalResult = result;
      } else {
        // Result as a string
        finalResult = result.join('&');

        if ('+' === serializedSpaceCharacter) {
          finalResult = finalResult.replace(/%20/g, '+');
        }
      }

      return finalResult;
    }
    /**
     * Serialize the form values to a string, outputting numeric strings for each AutoNumeric-managed element values.
     *
     * @param {HTMLFormElement} form
     * @param {string} serializedSpaceCharacter
     * @returns {string}
     */

  }, {
    key: "_serializeNumericString",
    value: function _serializeNumericString(form) {
      var serializedSpaceCharacter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+';
      return this._serialize(form, false, 'unformatted', serializedSpaceCharacter);
    }
    /**
     * Serialize the form values to a string, outputting the formatted value as strings for each AutoNumeric-managed elements.
     *
     * @param {HTMLFormElement} form
     * @param {string} serializedSpaceCharacter
     * @returns {string}
     */

  }, {
    key: "_serializeFormatted",
    value: function _serializeFormatted(form) {
      var serializedSpaceCharacter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+';
      return this._serialize(form, false, 'formatted', serializedSpaceCharacter);
    }
    /**
     * Serialize the form values to a string, outputting localized strings for each AutoNumeric-managed element values.
     *
     * @param {HTMLFormElement} form
     * @param {string} serializedSpaceCharacter
     * @param {string|null} forcedOutputFormat If set, then this is the format that is used for the localization, instead of the default `outputFormat` option.
     * @returns {string}
     */

  }, {
    key: "_serializeLocalized",
    value: function _serializeLocalized(form) {
      var serializedSpaceCharacter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+';
      var forcedOutputFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this._serialize(form, false, 'localized', serializedSpaceCharacter, forcedOutputFormat);
    }
    /**
     * Generate an Array with the form values, outputting numeric strings for each AutoNumeric-managed element values.
     *
     * @param {HTMLFormElement} form
     * @param {string} serializedSpaceCharacter
     * @returns {Array}
     */

  }, {
    key: "_serializeNumericStringArray",
    value: function _serializeNumericStringArray(form) {
      var serializedSpaceCharacter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+';
      return this._serialize(form, true, 'unformatted', serializedSpaceCharacter);
    }
    /**
     * Generate an Array with the form values, outputting the formatted value as strings for each AutoNumeric-managed elements.
     *
     * @param {HTMLFormElement} form
     * @param {string} serializedSpaceCharacter
     * @returns {Array}
     */

  }, {
    key: "_serializeFormattedArray",
    value: function _serializeFormattedArray(form) {
      var serializedSpaceCharacter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+';
      return this._serialize(form, true, 'formatted', serializedSpaceCharacter);
    }
    /**
     * Generate an Array with the form values, outputting localized strings for each AutoNumeric-managed element values.
     *
     * @param {HTMLFormElement} form
     * @param {string} serializedSpaceCharacter
     * @param {string|null} forcedOutputFormat If set, then this is the format that is used for the localization, instead of the default `outputFormat` option.
     * @returns {Array}
     */

  }, {
    key: "_serializeLocalizedArray",
    value: function _serializeLocalizedArray(form) {
      var serializedSpaceCharacter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+';
      var forcedOutputFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this._serialize(form, true, 'localized', serializedSpaceCharacter, forcedOutputFormat);
    }
  }]);

  return AutoNumeric;
}();
/**
 * Initialize multiple DOM elements in one call (and possibly pass multiple values that will be mapped to each DOM element).
 *
 * @example
 * // Init multiple DOM elements in one call (and possibly pass multiple values that will be mapped to each DOM element)
 * [anElement1, anElement2, anElement3] = AutoNumeric.multiple([domElement1, domElement2, domElement3], { options });
 * [anElement1, anElement2, anElement3] = AutoNumeric.multiple([domElement1, domElement2, domElement3], [{ options }, 'euroPos']);
 * [anElement1, anElement2, anElement3] = AutoNumeric.multiple([domElement1, domElement2, domElement3], 12345.789, { options });
 * [anElement1, anElement2, anElement3] = AutoNumeric.multiple([domElement1, domElement2, domElement3], 12345.789, [{ options }, 'euroPos']);
 * [anElement1, anElement2, anElement3] = AutoNumeric.multiple.french([domElement1, domElement2, domElement3], [12345.789, 234.78, null], { options });
 * [anElement1, anElement2, anElement3] = AutoNumeric.multiple.french([domElement1, domElement2, domElement3], [12345.789, 234.78, null], [{ options }, 'euroPos']);
 *
 * // Special case, if a <form> element is passed (or any other 'parent' (or 'root') DOM element), then autoNumeric will initialize each child `<input>` elements recursively, ignoring those referenced in the `exclude` attribute
 * [anElement1, anElement2] = AutoNumeric.multiple({ rootElement: formElement }, { options });
 * [anElement1, anElement2] = AutoNumeric.multiple({ rootElement: formElement, exclude : [hiddenElement, tokenElement] }, { options });
 * [anElement1, anElement2] = AutoNumeric.multiple({ rootElement: formElement, exclude : [hiddenElement, tokenElement] }, [12345.789, null], { options });
 *
 * // If you want to select multiple elements via a css selector, then you must use the `multiple` function. Under the hood `QuerySelectorAll` is used.
 * [anElement1, anElement2] = AutoNumeric.multiple('.myCssClass > input', { options }); // This always return an Array, even if there is only one element selected
 * [anElement1, anElement2] = AutoNumeric.multiple('.myCssClass > input', [null, 12345.789], { options }); // Idem above, but with passing the initial values too
 *
 * @param {string|Array|{ rootElement: HTMLElement }|{ rootElement: HTMLElement, exclude: Array<HTMLInputElement>}} arg1
 * @param {number|Array|object|null} initialValue
 * @param {object|Array|null} options
 * @returns {Array}
 */




AutoNumeric.multiple = function (arg1) {
  var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var result = []; // Analyze the arguments and transform them to make them exploitable

  if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(initialValue)) {
    // If the user gave an option object as the second argument, instead of the initial values
    options = initialValue;
    initialValue = null;
  }

  if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isString(arg1)) {
    arg1 = _toConsumableArray(document.querySelectorAll(arg1)); // Convert a NodeList to an Array (cf. http://stackoverflow.com/a/37297292/2834898)
  } else if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(arg1)) {
    if (!Object.prototype.hasOwnProperty.call(arg1, 'rootElement')) {
      _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The object passed to the 'multiple' function is invalid ; no 'rootElement' attribute found.");
    } // Retrieve the DOM element list from the given <form> element


    var elements = _toConsumableArray(arg1.rootElement.querySelectorAll('input'));

    if (Object.prototype.hasOwnProperty.call(arg1, 'exclude')) {
      if (!Array.isArray(arg1.exclude)) {
        _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The 'exclude' array passed to the 'multiple' function is invalid.");
      } // Filter out the excluded elements


      arg1 = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].filterOut(elements, arg1.exclude);
    } else {
      arg1 = elements;
    }
  } else if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(arg1)) {
    _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].throwError("The given parameters to the 'multiple' function are invalid.");
  }

  if (arg1.length === 0) {
    var showWarnings = true;

    if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNull(options) && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isBoolean(options.showWarnings)) {
      showWarnings = options.showWarnings;
    }

    _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].warning("No valid DOM elements were given hence no AutoNumeric objects were instantiated.", showWarnings);
    return [];
  } // At this point, we know `arg1` is an array of DOM elements
  // This function can be initialized with two types of array, one for the initial values, and/or one for the options.
  // So we need to find out if an array is detected if the user passed an array of initial values, or an array of options
  // Therefore, we analyze the content of the arrays for the second and third arguments
  // ...for the second parameter :


  var isInitialValueArray = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(initialValue);
  var isInitialValueArrayAndNotEmpty = isInitialValueArray && initialValue.length >= 1;
  var secondArgumentIsInitialValueArray = false;
  var secondArgumentIsOptionArray = false; // Any of the arrays can be either an array of initial values, or an array of option object/pre-defined option names

  if (isInitialValueArrayAndNotEmpty) {
    var typeOfFirstArrayElement = _typeof(Number(initialValue[0])); // First we test the second argument


    secondArgumentIsInitialValueArray = typeOfFirstArrayElement === 'number' && !isNaN(Number(initialValue[0]));

    if (!secondArgumentIsInitialValueArray) {
      // If the second argument is an array, but not an array of values, check if it's instead an array of options/pre-defined option names
      if (typeOfFirstArrayElement === 'string' || isNaN(typeOfFirstArrayElement) || typeOfFirstArrayElement === 'object') {
        secondArgumentIsOptionArray = true;
      }
    }
  } // ...for the third parameter :


  var isOptionsArrayAndNotEmpty = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(options) && options.length >= 1;
  var thirdArgumentIsOptionArray = false;

  if (isOptionsArrayAndNotEmpty) {
    var _typeOfFirstArrayElement = _typeof(options[0]);

    if (_typeOfFirstArrayElement === 'string' || _typeOfFirstArrayElement === 'object') {
      // If the third argument is an array of options/pre-defined option names
      thirdArgumentIsOptionArray = true;
    }
  } // Depending of our findings, we generate the options variable to use `optionsToUse`, either directly, or merged


  var optionsToUse;

  if (secondArgumentIsOptionArray) {
    optionsToUse = AutoNumeric.mergeOptions(initialValue);
  } else if (thirdArgumentIsOptionArray) {
    optionsToUse = AutoNumeric.mergeOptions(options);
  } else {
    optionsToUse = options;
  } // Initialize the initial values


  var isInitialValueNumber = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isNumber(initialValue);
  var initialValueArraySize;

  if (secondArgumentIsInitialValueArray) {
    initialValueArraySize = initialValue.length;
  } // Instantiate each AutoNumeric objects


  arg1.forEach(function (domElement, index) {
    if (isInitialValueNumber) {
      // We set the same value for each elements
      result.push(new AutoNumeric(domElement, initialValue, optionsToUse));
    } else if (secondArgumentIsInitialValueArray && index <= initialValueArraySize) {
      result.push(new AutoNumeric(domElement, initialValue[index], optionsToUse));
    } else {
      result.push(new AutoNumeric(domElement, null, optionsToUse));
    }
  });
  return result;
};
/**
 * Polyfill for obsolete browsers like IE
 */


(function () {
  // Polyfill for `Array.from()` (Fix issue #495)
  if (!Array.from) {
    Array.from = function (object) {
      return [].slice.call(object);
    };
  } // Polyfill for `CustomEvent` (cf. https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)


  if (typeof window === 'undefined' || typeof window.CustomEvent === 'function') {
    return false;
  }

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: void 0
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

/***/ }),

/***/ "./src/AutoNumericDefaultSettings.js":
/*!*******************************************!*\
  !*** ./src/AutoNumericDefaultSettings.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoNumeric */ "./src/AutoNumeric.js");
/* harmony import */ var _AutoNumericOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoNumericOptions */ "./src/AutoNumericOptions.js");
/**
 * Default settings for autoNumeric.js
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */


/* eslint no-unused-vars: 0 */

/**
 * The defaults options.
 * These can be overridden by the following methods:
 * - HTML5 data attributes (ie. `<input type="text" data-currency-symbol=" €">`)
 * - Options passed to the `update` method (ie. `anElement.update({ currencySymbol: ' €' });`), or simply during the initialization (ie. `new AutoNumeric(domElement, { options });`)
 */

_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].defaultSettings = {
  allowDecimalPadding: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.allowDecimalPadding.always,
  alwaysAllowDecimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.alwaysAllowDecimalCharacter.doNotAllow,
  caretPositionOnFocus: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.caretPositionOnFocus.doNoForceCaretPosition,
  createLocalList: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.createLocalList.createList,
  currencySymbol: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.none,
  currencySymbolPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbolPlacement.prefix,
  decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.dot,
  decimalCharacterAlternative: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacterAlternative.none,
  decimalPlaces: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalPlaces.two,
  decimalPlacesRawValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalPlacesRawValue.useDefault,
  decimalPlacesShownOnBlur: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalPlacesShownOnBlur.useDefault,
  decimalPlacesShownOnFocus: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalPlacesShownOnFocus.useDefault,
  defaultValueOverride: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.defaultValueOverride.doNotOverride,
  digitalGroupSpacing: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitalGroupSpacing.three,
  digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.comma,
  divisorWhenUnfocused: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.divisorWhenUnfocused.none,
  emptyInputBehavior: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.emptyInputBehavior.focus,
  eventBubbles: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.eventBubbles.bubbles,
  eventIsCancelable: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.eventIsCancelable.isCancelable,
  failOnUnknownOption: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.failOnUnknownOption.ignore,
  formatOnPageLoad: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.formatOnPageLoad.format,
  formulaMode: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.formulaMode.disabled,
  historySize: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.historySize.medium,
  invalidClass: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.invalidClass,
  isCancellable: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.isCancellable.cancellable,
  leadingZero: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.leadingZero.deny,
  maximumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.maximumValue.tenTrillions,
  minimumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.minimumValue.tenTrillions,
  modifyValueOnWheel: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.modifyValueOnWheel.modifyValue,
  negativeBracketsTypeOnBlur: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativeBracketsTypeOnBlur.none,
  negativePositiveSignPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.none,
  negativeSignCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativeSignCharacter.hyphen,
  noEventListeners: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.noEventListeners.addEvents,
  //TODO Shouldn't we use `truncate` as the default value?
  onInvalidPaste: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.onInvalidPaste.error,
  outputFormat: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.outputFormat.none,
  overrideMinMaxLimits: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.overrideMinMaxLimits.doNotOverride,
  positiveSignCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.positiveSignCharacter.plus,
  rawValueDivisor: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.rawValueDivisor.none,
  readOnly: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.readOnly.readWrite,
  roundingMethod: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.roundingMethod.halfUpSymmetric,
  saveValueToSessionStorage: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.saveValueToSessionStorage.doNotSave,
  selectNumberOnly: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.selectNumberOnly.selectNumbersOnly,
  selectOnFocus: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.selectOnFocus.select,
  serializeSpaces: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.serializeSpaces.plus,
  showOnlyNumbersOnFocus: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.showOnlyNumbersOnFocus.showAll,
  showPositiveSign: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.showPositiveSign.hide,
  showWarnings: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.showWarnings.show,
  styleRules: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.styleRules.none,
  suffixText: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.suffixText.none,
  symbolWhenUnfocused: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.symbolWhenUnfocused.none,
  unformatOnHover: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.unformatOnHover.unformat,
  unformatOnSubmit: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.unformatOnSubmit.keepCurrentValue,
  valuesToStrings: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.valuesToStrings.none,
  watchExternalChanges: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.watchExternalChanges.doNotWatch,
  wheelOn: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.wheelOn.focus,
  wheelStep: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.wheelStep.progressive
};
Object.freeze(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].defaultSettings);
Object.defineProperty(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"], 'defaultSettings', {
  configurable: false,
  writable: false
});

/***/ }),

/***/ "./src/AutoNumericEnum.js":
/*!********************************!*\
  !*** ./src/AutoNumericEnum.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Enumerations for autoNumeric.js
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Object that store the helper enumerations
 * @type {{ allowedTagList: [string], keyCode: {}, fromCharCodeKeyCode: [string], keyName: {} }}
 */
var AutoNumericEnum = {};
/**
 * List of allowed tag on which autoNumeric can be used.
 */

AutoNumericEnum.allowedTagList = ['b', 'caption', 'cite', 'code', 'const', 'dd', 'del', 'div', 'dfn', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'input', 'ins', 'kdb', 'label', 'li', 'option', 'output', 'p', 'q', 's', 'sample', 'span', 'strong', 'td', 'th', 'u'];
Object.freeze(AutoNumericEnum.allowedTagList);
Object.defineProperty(AutoNumericEnum, 'allowedTagList', {
  configurable: false,
  writable: false
});
/**
 * Wrapper variable that hold named keyboard keys with their respective keyCode as seen in DOM events.
 * cf. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 *
 * This deprecated information is used for obsolete browsers.
 * @deprecated
 */

AutoNumericEnum.keyCode = {
  Backspace: 8,
  Tab: 9,
  // No 10, 11
  // 12 === NumpadEqual on Windows
  // 12 === NumLock on Mac
  Enter: 13,
  // 14 reserved, but not used
  // 15 does not exists
  Shift: 16,
  Ctrl: 17,
  Alt: 18,
  Pause: 19,
  CapsLock: 20,
  // 21, 22, 23, 24, 25 : Asiatic key codes
  // 26 does not exists
  Esc: 27,
  // 28, 29, 30, 31 : Convert, NonConvert, Accept and ModeChange keys
  Space: 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  LeftArrow: 37,
  UpArrow: 38,
  RightArrow: 39,
  DownArrow: 40,
  Insert: 45,
  Delete: 46,
  num0: 48,
  num1: 49,
  num2: 50,
  num3: 51,
  num4: 52,
  num5: 53,
  num6: 54,
  num7: 55,
  num8: 56,
  num9: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  OSLeft: 91,
  OSRight: 92,
  ContextMenu: 93,
  numpad0: 96,
  numpad1: 97,
  numpad2: 98,
  numpad3: 99,
  numpad4: 100,
  numpad5: 101,
  numpad6: 102,
  numpad7: 103,
  numpad8: 104,
  numpad9: 105,
  MultiplyNumpad: 106,
  PlusNumpad: 107,
  MinusNumpad: 109,
  DotNumpad: 110,
  SlashNumpad: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NumLock: 144,
  ScrollLock: 145,
  HyphenFirefox: 173,
  // On the latest Linux and Windows OS, cf. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode and https://bugzilla.mozilla.org/show_bug.cgi?id=787504 and https://stackoverflow.com/a/35473259/2834898
  MyComputer: 182,
  MyCalculator: 183,
  Semicolon: 186,
  Equal: 187,
  Comma: 188,
  Hyphen: 189,
  Dot: 190,
  Slash: 191,
  Backquote: 192,
  LeftBracket: 219,
  Backslash: 220,
  RightBracket: 221,
  Quote: 222,
  Command: 224,
  AltGraph: 225,
  AndroidDefault: 229 // Android Chrome returns the same keycode number 229 for all keys pressed

};
Object.freeze(AutoNumericEnum.keyCode);
Object.defineProperty(AutoNumericEnum, 'keyCode', {
  configurable: false,
  writable: false
});
/**
 * This object is the reverse of `keyCode`, and is used to translate the key code to named keys when no valid characters can be obtained by `String.fromCharCode`.
 * This object keys correspond to the `event.keyCode` number, and returns the corresponding key name (à la event.key)
 */

AutoNumericEnum.fromCharCodeKeyCode = {
  0: 'LaunchCalculator',
  8: 'Backspace',
  9: 'Tab',
  13: 'Enter',
  16: 'Shift',
  17: 'Ctrl',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  45: 'Insert',
  46: 'Delete',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  // 65: 'a',
  // 66: 'b',
  // 67: 'c',
  // 68: 'd',
  // 69: 'e',
  // 70: 'f',
  // 71: 'g',
  // 72: 'h',
  // 73: 'i',
  // 74: 'j',
  // 75: 'k',
  // 76: 'l',
  // 77: 'm',
  // 78: 'n',
  // 79: 'o',
  // 80: 'p',
  // 81: 'q',
  // 82: 'r',
  // 83: 's',
  // 84: 't',
  // 85: 'u',
  // 86: 'v',
  // 87: 'w',
  // 88: 'x',
  // 89: 'y',
  // 90: 'z',
  91: 'OS',
  // Note: Firefox and Chrome reports 'OS' instead of 'OSLeft'
  92: 'OSRight',
  93: 'ContextMenu',
  96: '0',
  97: '1',
  98: '2',
  99: '3',
  100: '4',
  101: '5',
  102: '6',
  103: '7',
  104: '8',
  105: '9',
  106: '*',
  107: '+',
  109: '-',
  // The 'NumpadSubtract' code
  110: '.',
  111: '/',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
  144: 'NumLock',
  145: 'ScrollLock',
  173: '-',
  // The 'Minus' sign on Firefox. This is only needed when using the Selenium bot though.
  182: 'MyComputer',
  183: 'MyCalculator',
  186: ';',
  187: '=',
  188: ',',
  189: '-',
  // The 'Minus' sign on all other browsers
  190: '.',
  191: '/',
  192: '`',
  219: '[',
  220: '\\',
  221: ']',
  222: '\'',
  224: 'Meta',
  225: 'AltGraph'
};
Object.freeze(AutoNumericEnum.fromCharCodeKeyCode);
Object.defineProperty(AutoNumericEnum, 'fromCharCodeKeyCode', {
  configurable: false,
  writable: false
});
/**
 * Wrapper variable that hold named keyboard keys with their respective key name (as set in KeyboardEvent.key).
 * Those names are listed here :
 * @link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 */

AutoNumericEnum.keyName = {
  // Special values
  Unidentified: 'Unidentified',
  AndroidDefault: 'AndroidDefault',
  // Modifier keys
  Alt: 'Alt',
  AltGr: 'AltGraph',
  CapsLock: 'CapsLock',
  // Under Chrome, e.key is empty for CapsLock
  Ctrl: 'Control',
  Fn: 'Fn',
  FnLock: 'FnLock',
  Hyper: 'Hyper',
  // 'OS' under Firefox
  Meta: 'Meta',
  OSLeft: 'OS',
  OSRight: 'OS',
  Command: 'OS',
  NumLock: 'NumLock',
  ScrollLock: 'ScrollLock',
  Shift: 'Shift',
  Super: 'Super',
  // 'OS' under Firefox
  Symbol: 'Symbol',
  SymbolLock: 'SymbolLock',
  // Whitespace keys
  Enter: 'Enter',
  Tab: 'Tab',
  Space: ' ',
  // 'Spacebar' for Firefox <37, and IE9
  // Navigation keys
  LeftArrow: 'ArrowLeft',
  // 'Left' for Firefox <=36, and IE9
  UpArrow: 'ArrowUp',
  // 'Up' for Firefox <=36, and IE9
  RightArrow: 'ArrowRight',
  // 'Right' for Firefox <=36, and IE9
  DownArrow: 'ArrowDown',
  // 'Down' for Firefox <=36, and IE9
  End: 'End',
  Home: 'Home',
  PageUp: 'PageUp',
  PageDown: 'PageDown',
  // Editing keys
  Backspace: 'Backspace',
  Clear: 'Clear',
  Copy: 'Copy',
  CrSel: 'CrSel',
  // 'Crsel' for Firefox <=36, and IE9
  Cut: 'Cut',
  Delete: 'Delete',
  // 'Del' for Firefox <=36, and IE9
  EraseEof: 'EraseEof',
  ExSel: 'ExSel',
  // 'Exsel' for Firefox <=36, and IE9
  Insert: 'Insert',
  Paste: 'Paste',
  Redo: 'Redo',
  Undo: 'Undo',
  // UI keys
  Accept: 'Accept',
  Again: 'Again',
  Attn: 'Attn',
  // 'Unidentified' for Firefox, Chrome, and IE9 ('KanaMode' when using the Japanese keyboard layout)
  Cancel: 'Cancel',
  ContextMenu: 'ContextMenu',
  // 'Apps' for Firefox <=36, and IE9
  Esc: 'Escape',
  // 'Esc' for Firefox <=36, and IE9
  Execute: 'Execute',
  Find: 'Find',
  Finish: 'Finish',
  // 'Unidentified' for Firefox, Chrome, and IE9 ('Katakana' when using the Japanese keyboard layout)
  Help: 'Help',
  Pause: 'Pause',
  Play: 'Play',
  Props: 'Props',
  Select: 'Select',
  ZoomIn: 'ZoomIn',
  ZoomOut: 'ZoomOut',
  // Device keys
  BrightnessDown: 'BrightnessDown',
  BrightnessUp: 'BrightnessUp',
  Eject: 'Eject',
  LogOff: 'LogOff',
  Power: 'Power',
  PowerOff: 'PowerOff',
  PrintScreen: 'PrintScreen',
  Hibernate: 'Hibernate',
  // 'Unidentified' for Firefox <=37
  Standby: 'Standby',
  // 'Unidentified' for Firefox <=36, and IE9
  WakeUp: 'WakeUp',
  // IME and composition keys
  Compose: 'Compose',
  Dead: 'Dead',
  // Function keys
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  F4: 'F4',
  F5: 'F5',
  F6: 'F6',
  F7: 'F7',
  F8: 'F8',
  F9: 'F9',
  F10: 'F10',
  F11: 'F11',
  F12: 'F12',
  // Document keys
  Print: 'Print',
  // 'Normal' keys
  num0: '0',
  num1: '1',
  num2: '2',
  num3: '3',
  num4: '4',
  num5: '5',
  num6: '6',
  num7: '7',
  num8: '8',
  num9: '9',
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
  f: 'f',
  g: 'g',
  h: 'h',
  i: 'i',
  j: 'j',
  k: 'k',
  l: 'l',
  m: 'm',
  n: 'n',
  o: 'o',
  p: 'p',
  q: 'q',
  r: 'r',
  s: 's',
  t: 't',
  u: 'u',
  v: 'v',
  w: 'w',
  x: 'x',
  y: 'y',
  z: 'z',
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  H: 'H',
  I: 'I',
  J: 'J',
  K: 'K',
  L: 'L',
  M: 'M',
  N: 'N',
  O: 'O',
  P: 'P',
  Q: 'Q',
  R: 'R',
  S: 'S',
  T: 'T',
  U: 'U',
  V: 'V',
  W: 'W',
  X: 'X',
  Y: 'Y',
  Z: 'Z',
  Semicolon: ';',
  Equal: '=',
  Comma: ',',
  Hyphen: '-',
  Minus: '-',
  Plus: '+',
  Dot: '.',
  Slash: '/',
  Backquote: '`',
  LeftParenthesis: '(',
  RightParenthesis: ')',
  LeftBracket: '[',
  RightBracket: ']',
  Backslash: '\\',
  Quote: '\'',
  // Numeric keypad keys
  numpad0: '0',
  numpad1: '1',
  numpad2: '2',
  numpad3: '3',
  numpad4: '4',
  numpad5: '5',
  numpad6: '6',
  numpad7: '7',
  numpad8: '8',
  numpad9: '9',
  NumpadDot: '.',
  NumpadDotAlt: ',',
  // Modern browsers automatically adapt the character sent by this key to the decimal character of the current language
  NumpadMultiply: '*',
  NumpadPlus: '+',
  NumpadMinus: '-',
  NumpadSubtract: '-',
  NumpadSlash: '/',
  NumpadDotObsoleteBrowsers: 'Decimal',
  NumpadMultiplyObsoleteBrowsers: 'Multiply',
  NumpadPlusObsoleteBrowsers: 'Add',
  NumpadMinusObsoleteBrowsers: 'Subtract',
  NumpadSlashObsoleteBrowsers: 'Divide',
  // Special arrays for quicker tests
  _allFnKeys: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  _someNonPrintableKeys: ['Tab', 'Enter', 'Shift', 'ShiftLeft', 'ShiftRight', 'Control', 'ControlLeft', 'ControlRight', 'Alt', 'AltLeft', 'AltRight', 'Pause', 'CapsLock', 'Escape'],
  _directionKeys: ['PageUp', 'PageDown', 'End', 'Home', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp']
};
Object.freeze(AutoNumericEnum.keyName._allFnKeys);
Object.freeze(AutoNumericEnum.keyName._someNonPrintableKeys);
Object.freeze(AutoNumericEnum.keyName._directionKeys);
Object.freeze(AutoNumericEnum.keyName);
Object.defineProperty(AutoNumericEnum, 'keyName', {
  configurable: false,
  writable: false
});
Object.freeze(AutoNumericEnum);
/* harmony default export */ __webpack_exports__["default"] = (AutoNumericEnum);

/***/ }),

/***/ "./src/AutoNumericEvents.js":
/*!**********************************!*\
  !*** ./src/AutoNumericEvents.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoNumeric */ "./src/AutoNumeric.js");
/**
 * Options for autoNumeric.js
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Event list managed by AutoNumeric
 *
 * @type {{correctedValue: string, initialized: string, invalidFormula: string, invalidValue: string, formatted: string, rawValueModified: string, minRangeExceeded: string, maxRangeExceeded: string, native: {input: string, change: string}, validFormula: string}}
 */

_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].events = {
  correctedValue: 'autoNumeric:correctedValue',
  initialized: 'autoNumeric:initialized',
  invalidFormula: 'autoNumeric:invalidFormula',
  invalidValue: 'autoNumeric:invalidValue',
  formatted: 'autoNumeric:formatted',
  rawValueModified: 'autoNumeric:rawValueModified',
  minRangeExceeded: 'autoNumeric:minExceeded',
  maxRangeExceeded: 'autoNumeric:maxExceeded',
  "native": {
    input: 'input',
    change: 'change'
  },
  validFormula: 'autoNumeric:validFormula'
};
Object.freeze(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].events["native"]);
Object.freeze(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].events);
Object.defineProperty(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"], 'events', {
  configurable: false,
  writable: false
});

/***/ }),

/***/ "./src/AutoNumericHelper.js":
/*!**********************************!*\
  !*** ./src/AutoNumericHelper.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutoNumericHelper; });
/* harmony import */ var _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoNumericEnum */ "./src/AutoNumericEnum.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Helper functions for autoNumeric.js
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Static class that holds all the helper functions autoNumeric uses.
 * Note : none of the functions in there are aware of any autoNumeric internals (which means there are no references to autoNumeric-specific info like options names or data structures).
 */

var AutoNumericHelper = /*#__PURE__*/function () {
  function AutoNumericHelper() {
    _classCallCheck(this, AutoNumericHelper);
  }

  _createClass(AutoNumericHelper, null, [{
    key: "isNull",

    /**
     * Return `true` if the `value` is null
     *
     * @static
     * @param {*} value The value to test
     * @returns {boolean} Return `true` if the `value` is null, FALSE otherwise
     */
    value: function isNull(value) {
      return value === null;
    }
    /**
     * Return `true` if the `value` is undefined
     *
     * @static
     * @param {*} value The value to test
     * @returns {boolean} Return `true` if the `value` is undefined, FALSE otherwise
     */

  }, {
    key: "isUndefined",
    value: function isUndefined(value) {
      return value === void 0;
    }
    /**
     * Return `true` if the `value` is undefined, null or empty
     *
     * @param {*} value
     * @returns {boolean}
     */

  }, {
    key: "isUndefinedOrNullOrEmpty",
    value: function isUndefinedOrNullOrEmpty(value) {
      return value === null || value === void 0 || '' === value;
    }
    /**
     * Return `true` if the given parameter is a String
     *
     * @param {*} str
     * @returns {boolean}
     */

  }, {
    key: "isString",
    value: function isString(str) {
      return typeof str === 'string' || str instanceof String;
    }
    /**
     * Return `true` if the `value` is an empty string ''
     *
     * @static
     * @param {*} value The value to test
     * @returns {boolean} Return `true` if the `value` is an empty string '', FALSE otherwise
     */

  }, {
    key: "isEmptyString",
    value: function isEmptyString(value) {
      return value === '';
    }
    /**
     * Return `true` if the parameter is a boolean
     *
     * @static
     * @param {*} value
     * @returns {boolean}
     */

  }, {
    key: "isBoolean",
    value: function isBoolean(value) {
      return typeof value === 'boolean';
    }
    /**
     * Return `true` if the parameter is a string 'true' or 'false'
     *
     * This function accepts any cases for those strings.
     * @param {string} value
     * @returns {boolean}
     */

  }, {
    key: "isTrueOrFalseString",
    value: function isTrueOrFalseString(value) {
      var lowercaseValue = String(value).toLowerCase();
      return lowercaseValue === 'true' || lowercaseValue === 'false';
    }
    /**
     * Return `true` if the parameter is an object
     *
     * @param {*} reference
     * @returns {boolean}
     */

  }, {
    key: "isObject",
    value: function isObject(reference) {
      return _typeof(reference) === 'object' && reference !== null && !Array.isArray(reference);
    }
    /**
     * Return `true` if the given object is empty
     * cf. http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object and http://jsperf.com/empty-object-test
     *
     * @param {object} obj
     * @returns {boolean}
     */

  }, {
    key: "isEmptyObj",
    value: function isEmptyObj(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          return false;
        }
      }

      return true;
    }
    /**
     * Return `true` if the parameter is a real number (and not a numeric string).
     *
     * @param {*} n
     * @returns {boolean}
     */

  }, {
    key: "isNumberStrict",
    value: function isNumberStrict(n) {
      return typeof n === 'number';
    }
    /**
     * Return `true` if the parameter is a number (or a number written as a string).
     *
     * @param {*} n
     * @returns {boolean}
     */

  }, {
    key: "isNumber",
    value: function isNumber(n) {
      return !this.isArray(n) && !isNaN(parseFloat(n)) && isFinite(n);
    }
    /**
     * Return `true` if the given character is a number (0 to 9)
     *
     * @param {char} char
     * @returns {boolean}
     */

  }, {
    key: "isDigit",
    value: function isDigit(_char) {
      return /\d/.test(_char);
    }
    /**
     * Return `true` if the parameter is a number (or a number written as a string).
     * This version also accepts Arabic and Persian numbers.
     *
     * @param {*} n
     * @returns {boolean}
     */

  }, {
    key: "isNumberOrArabic",
    value: function isNumberOrArabic(n) {
      var latinConvertedNumber = this.arabicToLatinNumbers(n, false, true, true);
      return this.isNumber(latinConvertedNumber);
    }
    /**
     * Return `true` if the parameter is an integer (and not a float).
     *
     * @param {*} n
     * @returns {boolean}
     */

  }, {
    key: "isInt",
    value: function isInt(n) {
      return typeof n === 'number' && parseFloat(n) === parseInt(n, 10) && !isNaN(n);
    }
    /**
     * Return `true` if the parameter is a function.
     *
     * @param {function} func
     * @returns {boolean}
     */

  }, {
    key: "isFunction",
    value: function isFunction(func) {
      return typeof func === 'function';
    }
    /**
     * Return `true` if the current browser is the obsolete Internet Explorer 11 (IE11) one
     * cf. https://stackoverflow.com/a/21825207/2834898
     *
     * @returns {boolean}
     */

  }, {
    key: "isIE11",
    value: function isIE11() {
      // noinspection JSUnresolvedVariable
      return typeof window !== 'undefined' && !!window.MSInputMethodContext && !!document.documentMode;
    }
    /**
     * Return `true` is the string `str` contains the string `needle`
     * Note: this function does not coerce the parameters types
     *
     * @param {string} str
     * @param {string} needle
     * @returns {boolean}
     */

  }, {
    key: "contains",
    value: function contains(str, needle) {
      //TODO Use `Array.prototype.includes()` when available (cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
      if (!this.isString(str) || !this.isString(needle) || str === '' || needle === '') {
        return false;
      }

      return str.indexOf(needle) !== -1;
    }
    /**
     * Return `true` if the `needle` is in the array
     *
     * @param {*} needle
     * @param {Array} array
     * @returns {boolean}
     */

  }, {
    key: "isInArray",
    value: function isInArray(needle, array) {
      if (!this.isArray(array) || array === [] || this.isUndefined(needle)) {
        return false;
      }

      return array.indexOf(needle) !== -1;
    }
    /**
     * Return `true` if the parameter is an Array
     * //TODO Replace this by the default `Array.isArray()` function?
     *
     * @param {*} arr
     * @throws Error
     * @returns {*|boolean}
     */

  }, {
    key: "isArray",
    value: function isArray(arr) {
      if (Object.prototype.toString.call([]) === '[object Array]') {
        // Make sure an array has a class attribute of [object Array]
        // Test passed, now check if is an Array
        return Array.isArray(arr) || _typeof(arr) === 'object' && Object.prototype.toString.call(arr) === '[object Array]';
      } else {
        throw new Error('toString message changed for Object Array'); // Verify that the string returned by `toString` does not change in the future (cf. http://stackoverflow.com/a/8365215)
      }
    }
    /**
     * Return `true` if the parameter is a DOM element
     * cf. http://stackoverflow.com/a/4754104/2834898
     *
     * @param {*} obj
     * @returns {boolean}
     */

  }, {
    key: "isElement",
    value: function isElement(obj) {
      // return !!(obj && obj.nodeName);
      // return obj && 'nodeType' in obj;
      // return obj instanceof Element || obj instanceof HTMLInputElement || obj instanceof HTMLElement;
      if (typeof Element === 'undefined') {
        // This test is needed in environnements where the Element object does not exist (ie. in web workers)
        return false;
      }

      return obj instanceof Element;
    }
    /**
     * Return `true` in the given DOM element is an <input>.
     *
     * @param {HTMLElement|HTMLInputElement} domElement
     * @returns {boolean}
     * @private
     */

  }, {
    key: "isInputElement",
    value: function isInputElement(domElement) {
      return this.isElement(domElement) && domElement.tagName.toLowerCase() === 'input';
    }
    /**
     * Return `true` if the parameter is a string that represents a float number, and that number has a decimal part
     *
     * @param {string} str
     * @returns {boolean}
     */
    // static hasDecimals(str) {
    //     const [, decimalPart] = str.split('.');
    //     return !isUndefined(decimalPart);
    // }

    /**
     * Return the number of decimal places if the parameter is a string that represents a float number, and that number has a decimal part.
     *
     * @param {string} str
     * @returns {int}
     */

  }, {
    key: "decimalPlaces",
    value: function decimalPlaces(str) {
      var _str$split = str.split('.'),
          _str$split2 = _slicedToArray(_str$split, 2),
          decimalPart = _str$split2[1];

      if (!this.isUndefined(decimalPart)) {
        return decimalPart.length;
      }

      return 0;
    }
    /**
     * Return the index of the first non-zero decimal place in the given value.
     * The index starts after the decimal point, if any, and begins at '1'.
     * If no decimal places are found in the value, this function returns `0`.
     *
     * @example
     * indexFirstNonZeroDecimalPlace('0.00') -> 0
     * indexFirstNonZeroDecimalPlace('1.00') -> 0
     * indexFirstNonZeroDecimalPlace('0.12') -> 1
     * indexFirstNonZeroDecimalPlace('0.1234') -> 1
     * indexFirstNonZeroDecimalPlace('0.01234') -> 2
     * indexFirstNonZeroDecimalPlace('0.001234') -> 3
     * indexFirstNonZeroDecimalPlace('0.0001234') -> 4
     *
     * @param {number} value
     * @returns {Number|number}
     */

  }, {
    key: "indexFirstNonZeroDecimalPlace",
    value: function indexFirstNonZeroDecimalPlace(value) {
      var _String$split = String(Math.abs(value)).split('.'),
          _String$split2 = _slicedToArray(_String$split, 2),
          decimalPart = _String$split2[1];

      if (this.isUndefined(decimalPart)) {
        return 0;
      }

      var result = decimalPart.lastIndexOf('0');

      if (result === -1) {
        result = 0;
      } else {
        result += 2;
      }

      return result;
    }
    /**
     * Return the code for the key used to generate the given event.
     *
     * @param {Event} event
     * @returns {string|Number}
     */

  }, {
    key: "keyCodeNumber",
    value: function keyCodeNumber(event) {
      // `event.keyCode` and `event.which` are deprecated, `KeyboardEvent.key` (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) must be used now
      // Also, do note that Firefox generate a 'keypress' event (e.keyCode === 0) for the keys that do not print a character (ie. 'Insert', 'Delete', 'Fn' keys, 'PageUp', 'PageDown' etc.). 'Shift' on the other hand does not generate a keypress event.
      return typeof event.which === 'undefined' ? event.keyCode : event.which;
    }
    /**
     * Return the character from the event key code.
     * If the KeyboardEvent does not represent a printable character, then the key name is used (ie. 'Meta', 'Shift', 'F1', etc.)
     * @example character(50) => '2'
     *
     * @param {KeyboardEvent} event
     * @returns {string}
     */

  }, {
    key: "character",
    value: function character(event) {
      var result;

      if (event.key === 'Unidentified' || event.key === void 0 || this.isSeleniumBot()) {
        //XXX The selenium geckodriver does not understand `event.key`, hence when using it, we need to rely on the old deprecated `keyCode` attribute, cf. upstream issue https://github.com/mozilla/geckodriver/issues/440
        // Use the old deprecated keyCode property, if the new `key` one is not supported
        var keyCode = this.keyCodeNumber(event);

        if (keyCode === _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyCode.AndroidDefault) {
          return _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.AndroidDefault;
        }

        var potentialResult = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].fromCharCodeKeyCode[keyCode];

        if (!AutoNumericHelper.isUndefinedOrNullOrEmpty(potentialResult)) {
          // Since `String.fromCharCode` do not return named keys for some keys ('Escape' and 'Enter' for instance), we convert the characters to the key names
          result = potentialResult;
        } else {
          result = String.fromCharCode(keyCode);
        }
      } else {
        var browser;

        switch (event.key) {
          // Manages all the special cases for obsolete browsers that return the non-standard names
          case 'Add':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.NumpadPlus;
            break;

          case 'Apps':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.ContextMenu;
            break;

          case 'Crsel':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.CrSel;
            break;

          case 'Decimal':
            if (event["char"]) {
              // this fixes #602
              result = event["char"];
            } else {
              result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.NumpadDot;
            }

            break;

          case 'Del':
            browser = this.browser();

            if (browser.name === 'firefox' && browser.version <= 36 || browser.name === 'ie' && browser.version <= 9) {
              // Special workaround for the obsolete browser IE11 which output a 'Delete' key when using the numpad 'dot' one! This fixes issue #401
              // This workaround break the usage of the 'Delete' key for Firefox <=36, and IE9, since those browser send 'Del' instead of 'Delete', therefore we only use it for those obsolete browsers
              result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.Dot;
            } else {
              result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.Delete;
            }

            break;

          case 'Divide':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.NumpadSlash;
            break;

          case 'Down':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.DownArrow;
            break;

          case 'Esc':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.Esc;
            break;

          case 'Exsel':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.ExSel;
            break;

          case 'Left':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.LeftArrow;
            break;

          case 'Meta':
          case 'Super':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.OSLeft;
            break;

          case 'Multiply':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.NumpadMultiply;
            break;

          case 'Right':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.RightArrow;
            break;

          case 'Spacebar':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.Space;
            break;

          case 'Subtract':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.NumpadMinus;
            break;

          case 'Up':
            result = _AutoNumericEnum__WEBPACK_IMPORTED_MODULE_0__["default"].keyName.UpArrow;
            break;

          default:
            // The normal case
            result = event.key;
        }
      }

      return result;
    }
    /**
     * Return an object containing the name and version of the current browser.
     * @example `browserVersion()` => { name: 'Firefox', version: '42' }
     * Based on http://stackoverflow.com/a/38080051/2834898
     *
     * @returns {{ name: string, version: string }}
     */

  }, {
    key: "browser",
    value: function browser() {
      var ua = navigator.userAgent;
      var tem;
      var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {
          name: 'ie',
          version: tem[1] || ''
        };
      }

      if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);

        if (tem !== null) {
          return {
            name: tem[1].replace('OPR', 'opera'),
            version: tem[2]
          };
        }
      }

      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

      if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
        M.splice(1, 1, tem[1]);
      }

      return {
        name: M[0].toLowerCase(),
        version: M[1]
      };
    }
    /**
     * Check if the browser is controlled by Selenium.
     * Note: This only works within the geckodriver.
     * cf. http://stackoverflow.com/questions/33225947/can-a-website-detect-when-you-are-using-selenium-with-chromedriver
     *
     * @returns {boolean}
     */

  }, {
    key: "isSeleniumBot",
    value: function isSeleniumBot() {
      // noinspection JSUnresolvedVariable
      return window.navigator.webdriver === true;
    }
    /**
     * Return `true` if the given number is negative, or if the given string contains a negative sign :
     * - everywhere in the string (by default), or
     * - on the first character only if the `checkEverywhere` parameter is set to `false`.
     *
     * Note: `-0` is not a negative number since it's equal to `0`.
     *
     * @param {number|string} numberOrNumericString A Number, or a number represented by a string
     * @param {string} negativeSignCharacter The single character that represent the negative sign
     * @param {boolean} checkEverywhere If TRUE, then the negative sign is search everywhere in the numeric string (this is needed for instance if the string is '1234.56-')
     * @returns {boolean}
     */

  }, {
    key: "isNegative",
    value: function isNegative(numberOrNumericString) {
      var negativeSignCharacter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
      var checkEverywhere = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (numberOrNumericString === negativeSignCharacter) {
        return true;
      }

      if (numberOrNumericString === '') {
        return false;
      }

      if (AutoNumericHelper.isNumber(numberOrNumericString)) {
        return numberOrNumericString < 0;
      }

      if (checkEverywhere) {
        return this.contains(numberOrNumericString, negativeSignCharacter);
      }

      return this.isNegativeStrict(numberOrNumericString, negativeSignCharacter);
    }
    /**
     * Return `true` if the given string contains a negative sign on the first character (on the far left).
     *
     * @example isNegativeStrict('1234.56')     => false
     * @example isNegativeStrict('1234.56-')    => false
     * @example isNegativeStrict('-1234.56')    => true
     * @example isNegativeStrict('-1,234.56 €') => true
     *
     * @param {string} numericString
     * @param {string} negativeSignCharacter The single character that represent the negative sign
     * @returns {boolean}
     */

  }, {
    key: "isNegativeStrict",
    value: function isNegativeStrict(numericString) {
      var negativeSignCharacter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
      return numericString.charAt(0) === negativeSignCharacter;
    }
    /**
     * Return `true` if the very first character is the opening bracket, and if the rest of the `valueString` also has the closing bracket.
     *
     * @param {string} valueString
     * @param {string} leftBracket
     * @param {string} rightBracket
     * @returns {boolean}
     */

  }, {
    key: "isNegativeWithBrackets",
    value: function isNegativeWithBrackets(valueString, leftBracket, rightBracket) {
      return valueString.charAt(0) === leftBracket && this.contains(valueString, rightBracket);
    }
    /**
     * Return `true` if the formatted or unformatted numeric string represent the value 0 (ie. '0,00 €'), or is empty (' €').
     * This works since we test if there are any numbers from 1 to 9 in the string. If there is none, then the number is zero (or the string is empty).
     *
     * @param {string} numericString
     * @returns {boolean}
     */

  }, {
    key: "isZeroOrHasNoValue",
    value: function isZeroOrHasNoValue(numericString) {
      return !/[1-9]/g.test(numericString);
    }
    /**
     * Return the negative version of the value (represented as a string) given as a parameter.
     * The numeric string is a valid Javascript number when typecast to a `Number`.
     *
     * @param {string} value
     * @returns {*}
     */

  }, {
    key: "setRawNegativeSign",
    value: function setRawNegativeSign(value) {
      if (!this.isNegativeStrict(value, '-')) {
        return "-".concat(value);
      }

      return value;
    }
    /**
     * Replace the character at the position `index` in the string `string` by the character(s) `newCharacter`.
     *
     * @param {string} string
     * @param {int} index
     * @param {string} newCharacter
     * @returns {string}
     */

  }, {
    key: "replaceCharAt",
    value: function replaceCharAt(string, index, newCharacter) {
      return "".concat(string.substr(0, index)).concat(newCharacter).concat(string.substr(index + newCharacter.length));
    }
    /**
     * Return the value clamped to the nearest minimum/maximum value, as defined in the settings.
     *
     * @param {string|number} value
     * @param {object} settings
     * @returns {number}
     */

  }, {
    key: "clampToRangeLimits",
    value: function clampToRangeLimits(value, settings) {
      //XXX This function always assume `settings.minimumValue` is lower than `settings.maximumValue`
      return Math.max(settings.minimumValue, Math.min(settings.maximumValue, value));
    }
    /**
     * Return the number of number or dot characters on the left side of the caret, in a formatted number.
     *
     * @param {string} formattedNumberString
     * @param {int} caretPosition This must be a positive integer
     * @param {string} decimalCharacter
     * @returns {number}
     */

  }, {
    key: "countNumberCharactersOnTheCaretLeftSide",
    value: function countNumberCharactersOnTheCaretLeftSide(formattedNumberString, caretPosition, decimalCharacter) {
      // Here we count the dot and report it as a number character too, since it will 'stay' in the Javascript number when unformatted
      var numberDotOrNegativeSign = new RegExp("[0-9".concat(decimalCharacter, "-]")); // No need to escape the decimal character here, since it's in `[]`

      var numberDotAndNegativeSignCount = 0;

      for (var i = 0; i < caretPosition; i++) {
        // Test if the character is a number, a dot or an hyphen. If it is, count it, otherwise ignore it
        if (numberDotOrNegativeSign.test(formattedNumberString[i])) {
          numberDotAndNegativeSignCount++;
        }
      }

      return numberDotAndNegativeSignCount;
    }
    /**
     * Walk the `formattedNumberString` from left to right, one char by one, counting the `formattedNumberStringIndex`.
     * If the char is in the `rawNumberString` (starting at index 0), then `rawNumberStringIndex++`, and continue until
     * there is no more characters in `rawNumberString`) or that `rawNumberStringIndex === caretPositionInRawValue`.
     * When you stop, the `formattedNumberStringIndex` is the position where the caret should be set.
     *
     * @example
     * 1234567|89.01   : position 7 (rawNumberString)
     * 123.456.7|89,01 : position 9 (formattedNumberString)
     *
     * @param {string} rawNumberString
     * @param {int} caretPositionInRawValue
     * @param {string} formattedNumberString
     * @param {string} decimalCharacter
     * @returns {*}
     */

  }, {
    key: "findCaretPositionInFormattedNumber",
    value: function findCaretPositionInFormattedNumber(rawNumberString, caretPositionInRawValue, formattedNumberString, decimalCharacter) {
      var formattedNumberStringSize = formattedNumberString.length;
      var rawNumberStringSize = rawNumberString.length;
      var formattedNumberStringIndex;
      var rawNumberStringIndex = 0;

      for (formattedNumberStringIndex = 0; formattedNumberStringIndex < formattedNumberStringSize && rawNumberStringIndex < rawNumberStringSize && rawNumberStringIndex < caretPositionInRawValue; formattedNumberStringIndex++) {
        if (rawNumberString[rawNumberStringIndex] === formattedNumberString[formattedNumberStringIndex] || rawNumberString[rawNumberStringIndex] === '.' && formattedNumberString[formattedNumberStringIndex] === decimalCharacter) {
          rawNumberStringIndex++;
        }
      }

      return formattedNumberStringIndex;
    }
    /**
     * Count the number of occurrence of the given character, in the given text.
     *
     * @param {string} character
     * @param {string} text
     * @returns {number}
     */

  }, {
    key: "countCharInText",
    value: function countCharInText(character, text) {
      var charCounter = 0;

      for (var i = 0; i < text.length; i++) {
        if (text[i] === character) {
          charCounter++;
        }
      }

      return charCounter;
    }
    /**
     * Return the index that can be used to set the caret position.
     * This takes into account that the position is starting at '0', not 1.
     *
     * @param {int} characterCount
     * @returns {number}
     */

  }, {
    key: "convertCharacterCountToIndexPosition",
    value: function convertCharacterCountToIndexPosition(characterCount) {
      return Math.max(characterCount, characterCount - 1);
    }
    /**
     * Cross browser routine for getting selected range/cursor position.
     * Note: this also works with edge cases like contenteditable-enabled elements, and hidden inputs.
     *
     * @param {HTMLInputElement|EventTarget} element
     * @returns {{}}
     */

  }, {
    key: "getElementSelection",
    value: function getElementSelection(element) {
      var position = {};
      var isSelectionStartUndefined;

      try {
        isSelectionStartUndefined = this.isUndefined(element.selectionStart);
      } catch (error) {
        isSelectionStartUndefined = false;
      }

      try {
        if (isSelectionStartUndefined) {
          var selection = window.getSelection();
          var selectionInfo = selection.getRangeAt(0);
          position.start = selectionInfo.startOffset;
          position.end = selectionInfo.endOffset;
          position.length = position.end - position.start;
        } else {
          position.start = element.selectionStart;
          position.end = element.selectionEnd;
          position.length = position.end - position.start;
        }
      } catch (error) {
        // Manages the cases where :
        // - the 'contenteditable' elements that have no selections
        // - the <input> element is of type 'hidden'
        position.start = 0;
        position.end = 0;
        position.length = 0;
      }

      return position;
    }
    /**
     * Cross browser routine for setting selected range/cursor position
     *
     * @param {HTMLInputElement|EventTarget} element
     * @param {int} start
     * @param {int|null} end
     */

  }, {
    key: "setElementSelection",
    value: function setElementSelection(element, start) {
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (this.isUndefinedOrNullOrEmpty(end)) {
        end = start;
      }

      if (this.isInputElement(element)) {
        element.setSelectionRange(start, end);
      } else if (!AutoNumericHelper.isNull(element.firstChild)) {
        var range = document.createRange();
        range.setStart(element.firstChild, start);
        range.setEnd(element.firstChild, end);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    /**
     * Function that throw error messages
     *
     * @param {string} message
     * @throws
     */

  }, {
    key: "throwError",
    value: function throwError(message) {
      throw new Error(message);
    }
    /**
     * Function that display a warning messages, according to the debug level.
     *
     * @param {string} message
     * @param {boolean} showWarning If FALSE, then the warning message is not displayed
     */

  }, {
    key: "warning",
    value: function warning(message) {
      var showWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (showWarning) {
        /* eslint no-console: 0 */
        console.warn("Warning: ".concat(message));
      }
    }
    /**
     * Return `true` if the given event is a wheelup event
     *
     * @param {WheelEvent} wheelEvent
     * @returns {boolean}
     */

  }, {
    key: "isWheelUpEvent",
    value: function isWheelUpEvent(wheelEvent) {
      if (!wheelEvent.deltaY) {
        this.throwError("The event passed as a parameter is not a valid wheel event, '".concat(wheelEvent.type, "' given."));
      }

      return wheelEvent.deltaY < 0;
    }
    /**
     * Return `true` if the given event is a wheeldown event
     *
     * @param {WheelEvent} wheelEvent
     * @returns {boolean}
     */

  }, {
    key: "isWheelDownEvent",
    value: function isWheelDownEvent(wheelEvent) {
      if (!wheelEvent.deltaY) {
        this.throwError("The event passed as a parameter is not a valid wheel event, '".concat(wheelEvent.type, "' given."));
      }

      return wheelEvent.deltaY > 0;
    }
    /**
     * Return the given raw value truncated at the given number of decimal places `decimalPlaces`.
     * This function does not round the value.
     *
     * @example
     * forceDecimalPlaces(123.45678, 0) -> '123.45678'
     * forceDecimalPlaces(123.45678, 1) -> '123.4'
     * forceDecimalPlaces(123.45678, 2) -> '123.45'
     * forceDecimalPlaces(123.45678, 3) -> '123.456'
     *
     * @param {number} value
     * @param {int} decimalPlaces
     * @returns {number|string}
     */

  }, {
    key: "forceDecimalPlaces",
    value: function forceDecimalPlaces(value, decimalPlaces) {
      // We could make sure `decimalPlaces` is an integer and positive, but we'll leave that to the dev calling this function.
      var _String$split3 = String(value).split('.'),
          _String$split4 = _slicedToArray(_String$split3, 2),
          integerPart = _String$split4[0],
          decimalPart = _String$split4[1];

      if (!decimalPart) {
        return value;
      }

      return "".concat(integerPart, ".").concat(decimalPart.substr(0, decimalPlaces));
    }
    /**
     * Return the 'nearest rounded' value, according to the given step size.
     * @example roundToNearest(264789, 10000)) => 260000
     *
     * @param {number} value
     * @param {number} stepPlace
     * @returns {*}
     */

  }, {
    key: "roundToNearest",
    value: function roundToNearest(value) {
      var stepPlace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

      if (0 === value) {
        return 0;
      }

      if (stepPlace === 0) {
        this.throwError('The `stepPlace` used to round is equal to `0`. This value must not be equal to zero.');
      }

      return Math.round(value / stepPlace) * stepPlace;
    }
    /**
     * Return the 'nearest rounded' value by automatically adding or subtracting the calculated offset to the initial value.
     * This is done without having to pass a step to this function, and based on the size of the given `value`.
     *
     * @example                    Calculated offset
     *           1 ->           1 (1)
     *          14 ->          10 (10)
     *         143 ->         140 (10)
     *       1.278 ->       1.300 (100)
     *      28.456 ->      28.500 (100)
     *     276.345 ->     276.000 (1.000)
     *   4.534.061 ->   4.530.000 (10.000)
     *  66.723.844 ->  66.700.000 (100.000)
     * 257.833.411 -> 258.000.000 (1.000.000)
     *
     *                           Initial   Added   Offset
     * 2 decimalPlacesRawValue : 1.12   -> 2.00   (1)
     * 3 decimalPlacesRawValue : 1.123  -> 2.000  (1)
     *
     * Special case when the `value` to round is between -1 and 1, excluded :
     * @example
     *     Number of             Initial   Result  Calculated
     *     decimal places        value     (add)   offset
     * 2 decimalPlacesRawValue : 0.12   -> 0.13    (0.01) : Math.pow(10, -2)
     * 2 decimalPlacesRawValue : 0.01   -> 0.02    (0.01)
     * 2 decimalPlacesRawValue : 0.00   -> 0.01    (0.01)
     *
     * 3 decimalPlacesRawValue : 0.123  -> 0.133   (0.01)  : Math.pow(10, -2)
     * 3 decimalPlacesRawValue : 0.012  -> 0.013   (0.001) : Math.pow(10, -3)
     * 3 decimalPlacesRawValue : 0.001  -> 0.001   (0.001)
     * 3 decimalPlacesRawValue : 0.000  -> 0.001   (0.001)
     *
     * 4 decimalPlacesRawValue : 0.4123 -> 0.4200  (0.01)   : Math.pow(10, -2)
     * 4 decimalPlacesRawValue : 0.0412 -> 0.0420  (0.001)  : Math.pow(10, -3)
     * 4 decimalPlacesRawValue : 0.0041 -> 0.0042  (0.0001) : Math.pow(10, -4)
     * 4 decimalPlacesRawValue : 0.0004 -> 0.0005  (0.0001)
     * 4 decimalPlacesRawValue : 0.0000 -> 0.0001  (0.0001)
     *
     * @param {number} value
     * @param {boolean} isAddition
     * @param {int} decimalPlacesRawValue The precision needed by the `rawValue`
     * @returns {*}
     */

  }, {
    key: "modifyAndRoundToNearestAuto",
    value: function modifyAndRoundToNearestAuto(value, isAddition, decimalPlacesRawValue) {
      value = Number(this.forceDecimalPlaces(value, decimalPlacesRawValue)); // Make sure that '0.13000000001' is converted to the number of rawValue decimal places '0.13'

      var absValue = Math.abs(value);

      if (absValue >= 0 && absValue < 1) {
        var rawValueMinimumOffset = Math.pow(10, -decimalPlacesRawValue);

        if (value === 0) {
          // 4 decimalPlacesRawValue : 0.0000 -> 0.0001 (0.0001)
          return isAddition ? rawValueMinimumOffset : -rawValueMinimumOffset;
        }

        var offset;
        var minimumOffsetFirstDecimalPlaceIndex = decimalPlacesRawValue; // Find where is the first non-zero decimal places

        var indexFirstNonZeroDecimalPlace = this.indexFirstNonZeroDecimalPlace(value);

        if (indexFirstNonZeroDecimalPlace >= minimumOffsetFirstDecimalPlaceIndex - 1) {
          /* 4 decimalPlacesRawValue : 0.0041 -> 0.0042 (0.0001) : Math.pow(10, -4)
           * 4 decimalPlacesRawValue : 0.0004 -> 0.0005 (0.0001)
           */
          offset = rawValueMinimumOffset;
        } else {
          offset = Math.pow(10, -(indexFirstNonZeroDecimalPlace + 1));
        }

        var result;

        if (isAddition) {
          result = value + offset;
        } else {
          result = value - offset;
        }

        return this.roundToNearest(result, offset);
      } else {
        // For values >= 1
        value = parseInt(value, 10);
        var lengthValue = Math.abs(value).toString().length; // `Math.abs()` is needed here to omit the negative sign '-' in case of a negative value

        var pow;

        switch (lengthValue) {
          // Special cases for small numbers
          case 1:
            pow = 0;
            break;

          case 2:
          case 3:
            pow = 1;
            break;

          case 4:
          case 5:
            pow = 2;
            break;
          // Default behavior

          default:
            pow = lengthValue - 3;
        }

        var _offset = Math.pow(10, pow);

        var _result;

        if (isAddition) {
          _result = value + _offset;
        } else {
          _result = value - _offset;
        }

        if (_result <= 10 && _result >= -10) {
          return _result;
        }

        return this.roundToNearest(_result, _offset);
      }
    }
    /**
     * Return the 'nearest rounded' value automatically by adding the calculated offset to the initial value.
     * This will limit the result to the given number of decimal places `decimalPlacesLimit`.
     *
     * @param {number} value
     * @param {int} decimalPlacesLimit
     * @returns {*}
     */

  }, {
    key: "addAndRoundToNearestAuto",
    value: function addAndRoundToNearestAuto(value, decimalPlacesLimit) {
      return this.modifyAndRoundToNearestAuto(value, true, decimalPlacesLimit);
    }
    /**
     * Return the 'nearest rounded' value automatically by subtracting the calculated offset to the initial value.
     * This will limit the result to the given number of decimal places `decimalPlacesLimit`.
     *
     * @param {number} value
     * @param {int} decimalPlacesLimit
     * @returns {*}
     */

  }, {
    key: "subtractAndRoundToNearestAuto",
    value: function subtractAndRoundToNearestAuto(value, decimalPlacesLimit) {
      return this.modifyAndRoundToNearestAuto(value, false, decimalPlacesLimit);
    }
    /**
     * Take an arabic number as a string and return a javascript number.
     * By default, this function does not try to convert the arabic decimal and thousand separator characters.
     * This returns `NaN` is the conversion is not possible.
     * Based on http://stackoverflow.com/a/17025392/2834898
     *
     * @param {string} arabicNumbers
     * @param {boolean} returnANumber If `true`, return a Number, otherwise return a String
     * @param {boolean} parseDecimalCharacter
     * @param {boolean} parseThousandSeparator
     * @returns {string|number|NaN}
     */

  }, {
    key: "arabicToLatinNumbers",
    value: function arabicToLatinNumbers(arabicNumbers) {
      var returnANumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var parseDecimalCharacter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var parseThousandSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (this.isNull(arabicNumbers)) {
        return arabicNumbers;
      }

      var result = arabicNumbers.toString();

      if (result === '') {
        return arabicNumbers;
      }

      if (result.match(/[٠١٢٣٤٥٦٧٨٩۴۵۶]/g) === null) {
        // If no Arabic/Persian numbers are found, return the numeric string or number directly
        if (returnANumber) {
          result = Number(result);
        }

        return result;
      }

      if (parseDecimalCharacter) {
        result = result.replace(/٫/, '.'); // Decimal character
      }

      if (parseThousandSeparator) {
        result = result.replace(/٬/g, ''); // Thousand separator
      } // Replace the numbers only


      result = result.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
        return d.charCodeAt(0) - 1632;
      }) // Arabic numbers
      .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
        return d.charCodeAt(0) - 1776;
      }); // Persian numbers
      // `NaN` has precedence over the string `'NaN'`

      var resultAsNumber = Number(result);

      if (isNaN(resultAsNumber)) {
        return resultAsNumber;
      }

      if (returnANumber) {
        result = resultAsNumber;
      }

      return result;
    }
    /**
     * Create a custom event and immediately sent it from the given element.
     * By default, if no element is given, the event is thrown from `document`.
     *
     * @param {string} eventName
     * @param {HTMLElement|HTMLDocument|EventTarget} element
     * @param {object} detail
     * @param {boolean} bubbles Set to `true` if the event must bubble up
     * @param {boolean} cancelable Set to `true` if the event must be cancelable
     */

  }, {
    key: "triggerEvent",
    value: function triggerEvent(eventName) {
      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var bubbles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var cancelable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var event;

      if (window.CustomEvent) {
        event = new CustomEvent(eventName, {
          detail: detail,
          bubbles: bubbles,
          cancelable: cancelable
        }); // This is not supported by default by IE ; We use the polyfill for IE9 and later.
      } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, bubbles, cancelable, {
          detail: detail
        });
      }

      element.dispatchEvent(event);
    }
    /**
     * Function to parse minimumValue, maximumValue & the input value to prepare for testing to determine if the value falls within the min / max range.
     * Return an object example: minimumValue: "999999999999999.99" returns the following "{s: -1, e: 12, c: Array[15]}".
     *
     * This function is adapted from Big.js https://github.com/MikeMcl/big.js/. Many thanks to Mike.
     *
     * @param {number|string} n A numeric value.
     * @returns {{}}
     */

  }, {
    key: "parseStr",
    value: function parseStr(n) {
      var x = {}; // A Big number instance.

      var e;
      var i;
      var nL;
      var j; // Minus zero?

      if (n === 0 && 1 / n < 0) {
        n = '-0';
      } // Determine sign. 1 positive, -1 negative


      n = n.toString();

      if (this.isNegativeStrict(n, '-')) {
        n = n.slice(1);
        x.s = -1;
      } else {
        x.s = 1;
      } // Decimal point?


      e = n.indexOf('.');

      if (e > -1) {
        n = n.replace('.', '');
      } // Length of string if no decimal character


      if (e < 0) {
        // Integer
        e = n.length;
      } // Determine leading zeros


      i = n.search(/[1-9]/i) === -1 ? n.length : n.search(/[1-9]/i);
      nL = n.length;

      if (i === nL) {
        // Zero
        x.e = 0;
        x.c = [0];
      } else {
        // Determine trailing zeros
        for (j = nL - 1; n.charAt(j) === '0'; j -= 1) {
          nL -= 1;
        }

        nL -= 1; // Decimal location

        x.e = e - i - 1;
        x.c = []; // Convert string to array of digits without leading/trailing zeros

        for (e = 0; i <= nL; i += 1) {
          x.c[e] = +n.charAt(i);
          e += 1;
        }
      }

      return x;
    }
    /**
     * Function to test if the input value falls with the Min / Max settings.
     * This uses the parsed strings for the above parseStr function.
     *
     * This function is adapted from Big.js https://github.com/MikeMcl/big.js/. Many thanks to Mike.
     *
     * @param {object} y Big number instance
     * @param {object} x Big number instance
     * @returns {*}
     */

  }, {
    key: "testMinMax",
    value: function testMinMax(y, x) {
      var xc = x.c;
      var yc = y.c;
      var i = x.s;
      var j = y.s;
      var k = x.e;
      var l = y.e; // Either zero?

      if (!xc[0] || !yc[0]) {
        var _result2;

        if (!xc[0]) {
          _result2 = !yc[0] ? 0 : -j;
        } else {
          _result2 = i;
        }

        return _result2;
      } // Signs differ?


      if (i !== j) {
        return i;
      }

      var xNeg = i < 0; // Compare exponents

      if (k !== l) {
        return k > l ^ xNeg ? 1 : -1;
      }

      i = -1;
      k = xc.length;
      l = yc.length;
      j = k < l ? k : l; // Compare digit by digit

      for (i += 1; i < j; i += 1) {
        if (xc[i] !== yc[i]) {
          return xc[i] > yc[i] ^ xNeg ? 1 : -1;
        }
      } // Compare lengths


      var result;

      if (k === l) {
        result = 0;
      } else {
        result = k > l ^ xNeg ? 1 : -1;
      }

      return result;
    }
    /**
     * Generate a random string.
     * cf. http://stackoverflow.com/a/8084248/2834898
     *
     * @param {Number} strLength Length of the generated string (in character count)
     * @returns {string}
     */

  }, {
    key: "randomString",
    value: function randomString() {
      var strLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
      return Math.random().toString(36).substr(2, strLength);
    }
    /**
     * Return the DOM element when passed either a DOM element or a selector string.
     *
     * @param {HTMLElement|string} domElementOrSelector
     * @returns {HTMLElement}
     */

  }, {
    key: "domElement",
    value: function domElement(domElementOrSelector) {
      var domElement;

      if (AutoNumericHelper.isString(domElementOrSelector)) {
        domElement = document.querySelector(domElementOrSelector);
      } else {
        domElement = domElementOrSelector;
      }

      return domElement;
    }
    /**
     * Retrieve the current element value.
     *
     * @param {HTMLElement|HTMLInputElement|EventTarget} element
     * @returns {number|string|null}
     */

  }, {
    key: "getElementValue",
    value: function getElementValue(element) {
      if (element.tagName.toLowerCase() === 'input') {
        return element.value;
      }

      return this.text(element);
    }
    /**
     * Modify the element value directly.
     *
     * @param {HTMLElement|HTMLInputElement} element
     * @param {number|string|null} value
     */

  }, {
    key: "setElementValue",
    value: function setElementValue(element) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (element.tagName.toLowerCase() === 'input') {
        element.value = value;
      } else {
        element.textContent = value;
      }
    }
    /**
     * Set the invalid state for the given element.
     * A custom message can be passed as the second argument.
     * Note: This does not work with contenteditable elements
     *
     * @param {HTMLElement|HTMLInputElement} element
     * @param {string|null} message
     * @throws Error
     */

  }, {
    key: "setInvalidState",
    value: function setInvalidState(element) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Invalid';
      if (message === '' || this.isNull(message)) this.throwError('Cannot set the invalid state with an empty message.');
      element.setCustomValidity(message);
    }
    /**
     * Set the valid state for the given element.
     * Note: This does not work with contenteditable elements
     *
     * @param {HTMLElement|HTMLInputElement} element
     */

  }, {
    key: "setValidState",
    value: function setValidState(element) {
      element.setCustomValidity('');
    }
    /**
     * This clone the given object, and return it.
     * WARNING: This does not do a deep cloning.
     * cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Examples
     * //TODO Add a `deep` option to clone object with more than one depth
     *
     * @param {object} obj
     * @returns {object}
     */

  }, {
    key: "cloneObject",
    value: function cloneObject(obj) {
      return _extends({}, obj);
    }
    /**
     * Return a 'camelized' version of the given string.
     * By default, this assume that :
     * - the separators are hyphens '-',
     * - the 'data-' string should be removed, and
     * - that the very first word should not be capitalized.
     *
     * @example camelize('data-currency-symbol') => 'currencySymbol'
     *
     * @param {string} str Text to camelize
     * @param {string} separator Character that separate each word
     * @param {boolean} removeData If set to `true`, remove the `data-` part that you can find on some html attributes
     * @param {boolean} skipFirstWord If set to `true`, do not capitalize the very first word
     * @returns {string|null}
     */

  }, {
    key: "camelize",
    value: function camelize(str) {
      var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
      var removeData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var skipFirstWord = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (this.isNull(str)) {
        return null;
      }

      if (removeData) {
        str = str.replace(/^data-/, '');
      } // Cut the string into words


      var words = str.split(separator); // Capitalize each word

      var result = words.map(function (word) {
        return "".concat(word.charAt(0).toUpperCase()).concat(word.slice(1));
      }); // Then concatenate them back

      result = result.join('');

      if (skipFirstWord) {
        // Skip the very first letter
        result = "".concat(result.charAt(0).toLowerCase()).concat(result.slice(1));
      }

      return result;
    }
    /**
     * Return the text component of the given DOM element.
     *
     * @param {Element} domElement
     * @returns {string}
     */

  }, {
    key: "text",
    value: function text(domElement) {
      var nodeType = domElement.nodeType;
      var result; // cf. https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType

      if (nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_NODE || nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        result = domElement.textContent;
      } else if (nodeType === Node.TEXT_NODE) {
        result = domElement.nodeValue;
      } else {
        result = '';
      }

      return result;
    }
    /**
     * Set the text content of the given DOM element.
     * @param {Element} domElement
     * @param {string} text
     */

  }, {
    key: "setText",
    value: function setText(domElement, text) {
      var nodeType = domElement.nodeType;

      if (nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_NODE || nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        domElement.textContent = text;
      } //TODO Display a warning if that function does not do anything?

    }
    /**
     * Filter out the given `arr` array with the elements found in `excludedElements`.
     * This returns a new array and does not modify the source.
     * cf. verification here : http://codepen.io/AnotherLinuxUser/pen/XpvrMg?editors=0012
     *
     * @param {Array} arr
     * @param {Array} excludedElements
     * @returns {*|Array.<T>}
     */

  }, {
    key: "filterOut",
    value: function filterOut(arr, excludedElements) {
      var _this = this;

      return arr.filter(function (element) {
        return !_this.isInArray(element, excludedElements);
      });
    }
    /**
     * Remove the trailing zeros in the decimal part of a number.
     *
     * @param {string} numericString
     * @returns {*}
     */

  }, {
    key: "trimPaddedZerosFromDecimalPlaces",
    value: function trimPaddedZerosFromDecimalPlaces(numericString) {
      numericString = String(numericString);

      if (numericString === '') {
        return '';
      }

      var _numericString$split = numericString.split('.'),
          _numericString$split2 = _slicedToArray(_numericString$split, 2),
          integerPart = _numericString$split2[0],
          decimalPart = _numericString$split2[1];

      if (this.isUndefinedOrNullOrEmpty(decimalPart)) {
        return integerPart;
      }

      var trimmedDecimalPart = decimalPart.replace(/0+$/g, '');
      var result;

      if (trimmedDecimalPart === '') {
        result = integerPart;
      } else {
        result = "".concat(integerPart, ".").concat(trimmedDecimalPart);
      }

      return result;
    }
    /**
     * Return the top-most hovered item by the mouse cursor.
     *
     * @returns {*}
     */

  }, {
    key: "getHoveredElement",
    value: function getHoveredElement() {
      var hoveredElements = _toConsumableArray(document.querySelectorAll(':hover'));

      return hoveredElements[hoveredElements.length - 1];
    }
    /**
     * Return the given array trimmed to the given length.
     * @example arrayTrim([1, 2, 3, 4], 2) -> [1, 2]
     *
     * @param {Array} array
     * @param {Number} length
     * @returns {*}
     */

  }, {
    key: "arrayTrim",
    value: function arrayTrim(array, length) {
      var arrLength = array.length;

      if (arrLength === 0 || length > arrLength) {
        // Also manage the case where `length` is higher than the current length
        return array;
      }

      if (length < 0) {
        return [];
      }

      array.length = parseInt(length, 10);
      return array;
    }
    /**
     * Merge all the given arrays by keeping only unique elements, and return an array with de-duplicated values.
     * cf. http://stackoverflow.com/a/27664971/2834898
     *
     * @param {...array} arrays
     * @returns {[*]}
     */

  }, {
    key: "arrayUnique",
    value: function arrayUnique() {
      var _ref;

      //FIXME à tester
      return _toConsumableArray(new Set((_ref = []).concat.apply(_ref, arguments)));
    }
    /**
     * Merge all the given Maps by keeping only unique elements, and return a new Map with de-duplicated keys.
     *
     * @param {...Map} mapObjects
     * @returns {Map}
     */

  }, {
    key: "mergeMaps",
    value: function mergeMaps() {
      for (var _len = arguments.length, mapObjects = new Array(_len), _key = 0; _key < _len; _key++) {
        mapObjects[_key] = arguments[_key];
      }

      return new Map(mapObjects.reduce(function (as, b) {
        return as.concat(_toConsumableArray(b));
      }, []));
    }
    /**
     * Search the given `value` in the object `obj`, and return the very first key it finds
     *
     * @param {object} obj
     * @param {string|number} value
     * @returns {*|null}
     */

  }, {
    key: "objectKeyLookup",
    value: function objectKeyLookup(obj, value) {
      var result = Object.entries(obj).find(function (array) {
        return array[1] === value;
      });
      var key = null;

      if (result !== void 0) {
        key = result[0];
      }

      return key;
    }
    /**
     * Insert the single character `char` in the string `str` at the given position `index`
     *
     * @param {string} str
     * @param {string} char
     * @param {int} index
     * @returns {string}
     */

  }, {
    key: "insertAt",
    value: function insertAt(str, _char2, index) {
      str = String(str);

      if (index > str.length) {
        throw new Error("The given index is out of the string range.");
      }

      if (_char2.length !== 1) {
        throw new Error('The given string `char` should be only one character long.');
      }

      if (str === '' && index === 0) {
        return _char2;
      }

      return "".concat(str.slice(0, index)).concat(_char2).concat(str.slice(index));
    }
    /**
     * Convert the given scientific notation to the 'expanded' decimal notation
     *
     * @example scientificToDecimal('-123.4567e-6') returns '-0.0001234567'
     *
     * @param {number|string} val
     * @returns {number|string}
     */

  }, {
    key: "scientificToDecimal",
    value: function scientificToDecimal(val) {
      // Check that the val is a Number
      var numericValue = Number(val);

      if (isNaN(numericValue)) {
        return NaN;
      } // Check if the number is in a scientific notation


      val = String(val);
      var isScientific = this.contains(val, 'e') || this.contains(val, 'E');

      if (!isScientific) {
        return val;
      } // Convert the scientific notation to a numeric string


      var _val$split = val.split(/e/i),
          _val$split2 = _slicedToArray(_val$split, 2),
          value = _val$split2[0],
          exponent = _val$split2[1];

      var isNegative = value < 0;

      if (isNegative) {
        value = value.replace('-', '');
      }

      var isNegativeExponent = +exponent < 0;

      if (isNegativeExponent) {
        exponent = exponent.replace('-', ''); // Remove the negative sign
      }

      var _value$split = value.split(/\./),
          _value$split2 = _slicedToArray(_value$split, 2),
          _int = _value$split2[0],
          _float = _value$split2[1];

      var result;

      if (isNegativeExponent) {
        if (_int.length > exponent) {
          // Place the decimal point at the int length count minus exponent
          result = this.insertAt(_int, '.', _int.length - exponent);
        } else {
          // If that decimal point is greater than the int length, pad with zeros (ie. Number('-123.4567e-6') --> -0.0001234567)
          result = "0.".concat('0'.repeat(exponent - _int.length)).concat(_int);
        }

        result = "".concat(result).concat(_float ? _float : '');
      } else {
        // Positive exponent
        if (_float) {
          value = "".concat(_int).concat(_float); // Remove the '.', if any

          if (exponent < _float.length) {
            result = this.insertAt(value, '.', +exponent + _int.length);
          } else {
            result = "".concat(value).concat('0'.repeat(exponent - _float.length));
          }
        } else {
          value = value.replace('.', ''); // Single case where val is '1.e4'

          result = "".concat(value).concat('0'.repeat(Number(exponent)));
        }
      }

      if (isNegative) {
        // Put back the negative sign, if any
        result = "-".concat(result);
      }

      return result;
    }
  }]);

  return AutoNumericHelper;
}();



/***/ }),

/***/ "./src/AutoNumericOptions.js":
/*!***********************************!*\
  !*** ./src/AutoNumericOptions.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoNumeric */ "./src/AutoNumeric.js");
/* harmony import */ var _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoNumericHelper */ "./src/AutoNumericHelper.js");
/**
 * Options for autoNumeric.js
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */


/**
 * Options values enumeration
 */

_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options = {
  /* Defines if the decimal places should be padded with zeroes
   * `true`     : always pad decimals with zeros (ie. '12.3400')
   * `false`    : never pad with zeros (ie. '12.34')
   * `'floats'` : pad with zeroes only when there are decimals (ie. '12' and '12.3400')
   * Note: setting allowDecimalPadding to 'false' will override the 'decimalPlaces' setting.
   */
  allowDecimalPadding: {
    always: true,
    never: false,
    floats: 'floats'
  },

  /* Defines if the decimal character or decimal character alternative should be accepted when there is already a decimal character shown in the element.
   * If set to `true`, any decimal character input will be accepted and will subsequently modify the decimal character position, as well as the `rawValue`.
   * If set to `false`, the decimal character and its alternative key will be dropped as before. This is the default setting.
   */
  alwaysAllowDecimalCharacter: {
    alwaysAllow: true,
    doNotAllow: false
  },

  /* Defines where should be positioned the caret on focus
   * null : Do not enforce any caret positioning on focus (this is needed when using `selectOnFocus`)
   * `'start'` : put the caret of the far left side of the value (excluding the positive/negative sign and currency symbol, if any)
   * `'end'` : put the caret of the far right side of the value (excluding the positive/negative sign and currency symbol, if any)
   * `'decimalLeft'` : put the caret of the left of the decimal character if any
   * `'decimalRight'` : put the caret of the right of the decimal character if any
   */
  caretPositionOnFocus: {
    start: 'start',
    end: 'end',
    decimalLeft: 'decimalLeft',
    decimalRight: 'decimalRight',
    doNoForceCaretPosition: null
  },

  /* Defines if a local list of AutoNumeric objects should be kept when initializing this object.
   * This list is used by the `global.*` functions.
   */
  createLocalList: {
    createList: true,
    doNotCreateList: false
  },

  /* Defines the currency symbol string.
   * It can be a string of more than one character (allowing for instance to use a space on either side of it, example: '$ ' or ' $')
   * cf. https://en.wikipedia.org/wiki/Currency_symbol
   */
  currencySymbol: {
    none: '',
    currencySign: '¤',
    austral: '₳',
    // ARA
    australCentavo: '¢',
    baht: '฿',
    // THB
    cedi: '₵',
    // GHS
    cent: '¢',
    colon: '₡',
    // CRC
    cruzeiro: '₢',
    // BRB - Not used anymore since 1993
    dollar: '$',
    dong: '₫',
    // VND
    drachma: '₯',
    // GRD (or 'Δρχ.' or 'Δρ.')
    dram: '​֏',
    // AMD
    european: '₠',
    // XEU (old currency before the Euro)
    euro: '€',
    // EUR
    florin: 'ƒ',
    franc: '₣',
    // FRF
    guarani: '₲',
    // PYG
    hryvnia: '₴',
    // грн
    kip: '₭',
    // LAK
    att: 'ອັດ',
    // cents of the Kip
    lepton: 'Λ.',
    // cents of the Drachma
    lira: '₺',
    // TRY
    liraOld: '₤',
    lari: '₾',
    // GEL
    mark: 'ℳ',
    mill: '₥',
    naira: '₦',
    // NGN
    peseta: '₧',
    peso: '₱',
    // PHP
    pfennig: '₰',
    // cents of the Mark
    pound: '£',
    real: 'R$',
    // Brazilian real
    riel: '៛',
    // KHR
    ruble: '₽',
    // RUB
    rupee: '₹',
    // INR
    rupeeOld: '₨',
    shekel: '₪',
    shekelAlt: 'ש״ח‎‎',
    taka: '৳',
    // BDT
    tenge: '₸',
    // KZT
    togrog: '₮',
    // MNT
    won: '₩',
    yen: '¥'
  },

  /* Defines where the currency symbol should be placed (before of after the numbers)
   * for prefix currencySymbolPlacement: "p" (default)
   * for suffix currencySymbolPlacement: "s"
   */
  currencySymbolPlacement: {
    prefix: 'p',
    suffix: 's'
  },

  /* Defines what decimal separator character is used
   */
  decimalCharacter: {
    comma: ',',
    dot: '.',
    middleDot: '·',
    arabicDecimalSeparator: '٫',
    decimalSeparatorKeySymbol: '⎖'
  },

  /* Allow to declare an alternative decimal separator which is automatically replaced by `decimalCharacter` when typed.
   * This is used by countries that use a comma ',' as the decimal character and have keyboards with a numeric pads that have
   * a period 'full stop' as the decimal character (France or Spain for instance).
   */
  decimalCharacterAlternative: {
    none: null,
    comma: ',',
    dot: '.'
  },

  /* Defines the default number of decimal places to show on the formatted value, and keep for the precision.
   * Incidentally, since we need to be able to show that many decimal places, this also defines the raw value precision by default.
   */
  decimalPlaces: {
    none: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6
  },

  /* Defines how many decimal places should be kept for the raw value (ie. This is the precision for float values).
   *
   * If this option is set to `null` (which is the default), then the value of `decimalPlaces` is used for `decimalPlacesRawValue` as well.
   * Note: Setting this to a lower number of decimal places than the one to be shown will lead to confusion for the users.
   */
  decimalPlacesRawValue: {
    useDefault: null,
    none: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6
  },

  /* Defines how many decimal places should be visible when the element is unfocused.
   * If this is set to `null`, then this option is ignored, and the `decimalPlaces` option value will be used instead.
   * This means this is optional ; if omitted the decimal places will be the same when the input has the focus.
   *
   * This option can be used in conjonction with the two other `scale*` options, which allows to display a different formatted value when the element is unfocused, while another formatted value is shown when focused.
   * For those `scale*` options to have any effect, `divisorWhenUnfocused` must not be `null`.
   */
  decimalPlacesShownOnBlur: {
    useDefault: null,
    none: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6
  },

  /* Defines how many decimal places should be visible when the element has the focus.
   * If this is set to `null`, then this option is ignored, and the `decimalPlaces` option value will be used instead.
   *
   * Example:
   * For instance if `decimalPlacesShownOnFocus` is set to `5` and the default number of decimal places is `2`, then on focus `1,000.12345` will be shown, while without focus `1,000.12` will be set back.
   * Note 1: the results depends on the rounding method used.
   * Note 2: the `getNumericString()` method returns the extended decimal places
   */
  decimalPlacesShownOnFocus: {
    useDefault: null,
    none: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6
  },

  /* Helper option for ASP.NET postback
   * This should be set as the value of the unformatted default value
   * examples:
   * no default value="" {defaultValueOverride: ""}
   * value=1234.56 {defaultValueOverride: '1234.56'}
   */
  defaultValueOverride: {
    doNotOverride: null
  },

  /* Defines how many numbers should be grouped together (usually for the thousand separator)
   * - "2",  results in 99,99,99,999 India's lakhs
   * - "2s", results in 99,999,99,99,999 India's lakhs scaled
   * - "3",  results in 999,999,999 (default)
   * - "4",  results in 9999,9999,9999 used in some Asian countries
   * Note: This option does not accept other grouping choice.
   */
  digitalGroupSpacing: {
    two: '2',
    twoScaled: '2s',
    three: '3',
    four: '4'
  },

  /* Defines the thousand grouping separator character
   * Example : If `'.'` is set, then you'll get `'1.234.567'`
   */
  digitGroupSeparator: {
    comma: ',',
    dot: '.',
    normalSpace: ' ',
    thinSpace: "\u2009",
    narrowNoBreakSpace: "\u202F",
    noBreakSpace: "\xA0",
    noSeparator: '',
    apostrophe: "'",
    arabicThousandsSeparator: '٬',
    dotAbove: '˙',
    privateUseTwo: '’' // \u0092

  },

  /* The `divisorWhenUnfocused` divide the element value on focus.
   * On blur, the element value is multiplied back.
   *
   * Example : Display percentages using { divisorWhenUnfocused: 100 } (or directly in the Html with `<input data-divisor-when-unfocused="100">`)
   * The divisor value does not need to be an integer, but please understand that Javascript has limited accuracy in math ; use with caution.
   * Note: The `getNumericString` method returns the full value, including the 'hidden' decimals.
   */
  divisorWhenUnfocused: {
    none: null,
    percentage: 100,
    permille: 1000,
    basisPoint: 10000
  },

  /* Defines what should be displayed in the element if the raw value is an empty string ('').
   * - 'focus'  : The currency sign is displayed when the input receives focus (default)
   * - 'press'  : The currency sign is displayed whenever a key is being pressed
   * - 'always' : The currency sign is always displayed
   * - 'zero'   : A zero is displayed ('rounded' with or without a currency sign) if the input has no value on focus out
   * - 'min'    : The minimum value is displayed if the input has no value on focus out
   * - 'max'    : The maximum value is displayed if the input has no value on focus out
   * - 'null'   : When the element is empty, the `rawValue` and the element value/text is set to `null`. This also allows to set the value to `null` using `anElement.set(null)`.
   */
  emptyInputBehavior: {
    focus: 'focus',
    press: 'press',
    always: 'always',
    zero: 'zero',
    min: 'min',
    max: 'max',
    "null": 'null'
  },

  /* Defines if the custom and native events triggered by AutoNumeric should bubble up or not.
   */
  eventBubbles: {
    bubbles: true,
    doesNotBubble: false
  },

  /* Defines if the custom and native events triggered by AutoNumeric should be cancelable.
   */
  eventIsCancelable: {
    isCancelable: true,
    isNotCancelable: false
  },

  /* This option is the 'strict mode' (aka 'debug' mode), which allows autoNumeric to strictly analyse the options passed, and fails if an unknown options is used in the settings object.
   * You should set that to `true` if you want to make sure you are only using 'pure' autoNumeric settings objects in your code.
   * If you see uncaught errors in the console and your code starts to fail, this means somehow those options gets polluted by another program (which usually happens when using frameworks).
   */
  failOnUnknownOption: {
    fail: true,
    ignore: false
  },

  /* Determine if the default value will be formatted on initialization.
   */
  formatOnPageLoad: {
    format: true,
    // automatically formats the default value on initialization
    doNotFormat: false // will not format the default value on initialization

  },

  /* Defines if the 'formula mode' can be activated by the user.
   * If set to `true`, then the user can enter the formula mode by entering the '=' character.
   * He will then be allowed to enter any simple math formula using numeric characters as well as the following operators +, -, *, /, ( and ).
   * The formula mode is closed when the user either validate their math expression using the `Enter` key, or when the element is blurred.
   * If the formula is invalid, the previous valid `rawValue` is set back, and the `autoNumeric:invalidFormula` event is sent.
   * When a valid formula is accepted, then its result is `set()`, and the `autoNumeric:validFormula` event is sent.
   *
   * By default, this mode is disabled.
   */
  formulaMode: {
    enabled: true,
    disabled: false
  },

  /* Set the undo/redo history table size.
   * Each record keeps the raw value as well and the last known caret/selection positions.
   */
  historySize: {
    verySmall: 5,
    small: 10,
    medium: 20,
    large: 50,
    veryLarge: 100,
    insane: Number.MAX_SAFE_INTEGER
  },

  /* Defines the name of the CSS class to use on contenteditable-enabled elements when the input is invalid
   * This is not used when the HTML element used is an input.
   */
  invalidClass: 'an-invalid',

  /* Allow the user to 'cancel' and undo the changes he made to the given autonumeric-managed element, by pressing the 'Escape' key.
   * Whenever the user 'validate' the input (either by hitting 'Enter', or blurring the element), the new value is saved for subsequent 'cancellation'.
   *
   * The process :
   *   - save the input value on focus
   *   - if the user change the input value, and hit `Escape`, then the initial value saved on focus is set back
   *   - on the other hand if the user either have used `Enter` to validate (`Enter` throws a change event) his entries, or if the input value has been changed by another script in the mean time, then we save the new input value
   *   - on a successful 'cancel', select the whole value (while respecting the `selectNumberOnly` option)
   *   - bonus; if the value has not changed, hitting 'Esc' just select all the input value (while respecting the `selectNumberOnly` option)
   */
  isCancellable: {
    cancellable: true,
    notCancellable: false
  },

  /* Controls the leading zero behavior
   * - 'allow' : allows leading zeros to be entered. Zeros will be truncated when entering additional digits. On focusout zeros will be deleted
   * - 'deny'  : allows only one leading zero on values that are between 1 and -1
   * - 'keep'  : allows leading zeros to be entered. on focusout zeros will be retained
   */
  leadingZero: {
    allow: 'allow',
    deny: 'deny',
    keep: 'keep'
  },

  /* Defines the maximum possible value a user can enter.
   * Notes:
   * - this value must be a string and use the period for the decimal point
   * - this value needs to be larger than `minimumValue`
   */
  maximumValue: {
    tenTrillions: '10000000000000',
    // 10000 billions
    oneBillion: '1000000000',
    zero: '0'
  },

  /* Defines the minimum possible value a user can enter.
   * Notes:
   * - this value must be a string and use the period for the decimal point
   * - this value needs to be smaller than `maximumValue`
   * - if this is superior to 0, then you'll effectively prevent your user to entirely delete the content of your element
   */
  minimumValue: {
    tenTrillions: '-10000000000000',
    // 10000 billions
    oneBillion: '-1000000000',
    zero: '0'
  },

  /* Allows the user to increment or decrement the element value with the mouse wheel.
   * The wheel behavior can be modified by the `wheelStep` option.
   * This `wheelStep` option can be used in two ways, either by setting:
   * - a 'fixed' step value (`wheelStep : 1000`), or
   * - the 'progressive' string (`wheelStep : 'progressive'`), which will then activate a special mode where the step is automatically calculated based on the element value size.
   *
   * Note :
   * You can activate/deactivate the wheel event for each `wheelOn` option value by using the 'Shift' modifier key while using the mouse wheel.
   */
  modifyValueOnWheel: {
    modifyValue: true,
    doNothing: false
  },

  /* Adds brackets on negative values (ie. transforms '-$ 999.99' to '($999.99)')
   * Those brackets are visible only when the field does NOT have the focus.
   * The left and right symbols should be enclosed in quotes and separated by a comma.
   */
  negativeBracketsTypeOnBlur: {
    parentheses: '(,)',
    brackets: '[,]',
    chevrons: '<,>',
    curlyBraces: '{,}',
    angleBrackets: '〈,〉',
    japaneseQuotationMarks: '｢,｣',
    halfBrackets: '⸤,⸥',
    whiteSquareBrackets: '⟦,⟧',
    quotationMarks: '‹,›',
    guillemets: '«,»',
    none: null // This is the default value, which deactivate this feature

  },

  /* Placement of the negative/positive sign relative to the `currencySymbol` option.
   *
   * Example:
   * // Default values
   * -1,234.56  => default no options required
   * $-1,234.56 => {currencySymbol: "$", negativePositiveSignPlacement: "r"} // Default if negativePositiveSignPlacement is 'null' and currencySymbol is not empty
   *
   * // Sign on the left hand side of the whole number
   * -$1,234.56 => {currencySymbol: "$"} or {currencySymbol: "$", negativePositiveSignPlacement: "l"}
   * -1,234.56$ => {currencySymbol: "$", currencySymbolPlacement: "s", negativePositiveSignPlacement: "p"} // Default if negativePositiveSignPlacement is 'null' and currencySymbol is not empty
   *
   * // Sign on the right hand side of the whole number
   * 1,234.56-  => {negativePositiveSignPlacement: "s"}
   * $1,234.56- => {currencySymbol: "$", negativePositiveSignPlacement: "s"}
   * 1,234.56-$ => {currencySymbol: "$", currencySymbolPlacement: "s"}
   * 1,234.56$- => {currencySymbol: "$", currencySymbolPlacement: "s", negativePositiveSignPlacement: "r"}
   */
  negativePositiveSignPlacement: {
    prefix: 'p',
    suffix: 's',
    left: 'l',
    right: 'r',
    none: null
  },

  /* Defines the negative sign symbol.
   * It can be a string of only one character.
   */
  negativeSignCharacter: {
    hyphen: '-',
    minus: '−',
    heavyMinus: '➖',
    fullWidthHyphen: '－',
    circledMinus: '⊖',
    squaredMinus: '⊟',
    triangleMinus: '⨺',
    plusMinus: '±',
    minusPlus: '∓',
    dotMinus: '∸',
    minusTilde: '≂',
    not: '¬'
  },

  /* Defines if the element should have event listeners activated on it.
   * By default, those event listeners are only added to <input> elements and html element with the `contenteditable` attribute set to `true`, but not on the other html tags.
   * This allows to initialize elements without any event listeners.
   * Warning: Since AutoNumeric will not check the input content after its initialization, using some autoNumeric methods afterwards *will* probably leads to formatting problems.
   */
  noEventListeners: {
    noEvents: true,
    addEvents: false
  },

  /* Manage how autoNumeric react when the user tries to paste an invalid number.
   * - 'error'    : (This is the default behavior) The input value is not changed and an error is output in the console.
   * - 'ignore'   : idem than 'error', but fail silently without outputting any error/warning in the console.
   * - 'clamp'    : if the pasted value is either too small or too big regarding the minimumValue and maximumValue range, then the result is clamped to those limits.
   * - 'truncate' : autoNumeric will insert as many pasted numbers it can at the initial caret/selection, until everything is pasted, or the range limit is hit.
   *                The non-pasted numbers are dropped and therefore not used at all.
   * - 'replace'  : autoNumeric will first insert as many pasted numbers it can at the initial caret/selection, then if the range limit is hit, it will try
   *                to replace one by one the remaining initial numbers (on the right side of the caret) with the rest of the pasted numbers.
   *
   * Note 1 : A paste content starting with a negative sign '-' will be accepted anywhere in the input, and will set the resulting value as a negative number
   * Note 2 : A paste content starting with a number will be accepted, even if the rest is gibberish (ie. '123foobar456').
   *          Only the first number will be used (here '123').
   * Note 3 : The paste event works with the `decimalPlacesShownOnFocus` option too.
   */
  onInvalidPaste: {
    error: 'error',
    ignore: 'ignore',
    clamp: 'clamp',
    truncate: 'truncate',
    replace: 'replace'
  },

  /* Defines how the value should be formatted when wanting a 'localized' version of it.
   * - null or 'string' => 'nnnn.nn' or '-nnnn.nn' as text type. This is the default behavior.
   * - 'number'         => nnnn.nn or -nnnn.nn as a Number (Warning: this works only for integers inferior to Number.MAX_SAFE_INTEGER)
   * - ',' or '-,'      => 'nnnn,nn' or '-nnnn,nn'
   * - '.-'             => 'nnnn.nn' or 'nnnn.nn-'
   * - ',-'             => 'nnnn,nn' or 'nnnn,nn-'
   *
   * Note: The hyphen '-' is translated to the custom negative sign defined in `negativeSignCharacter`
   */
  outputFormat: {
    string: 'string',
    number: 'number',
    dot: '.',
    negativeDot: '-.',
    comma: ',',
    negativeComma: '-,',
    dotNegative: '.-',
    commaNegative: ',-',
    none: null
  },

  /* Defines if AutoNumeric should let the user override the minimum and/or maximum limits when he types numbers in the element.
   * - 'ceiling' strictly adheres to `maximumValue` and ignores the `minimumValue` settings
   *             It allows the user to enter anything between -∞ `and maximumValue`.
   *             If `maximumValue` is less than 0, then it will allow emptying the field and typing a value between `maximumValue` and 0 (and hence setting the invalid state)
   * - 'floor'   strictly adheres to `minimumValue` and ignores the `maximumValue` settings
   *             It allows the user to enter anything between `minimumValue` and +∞.
   *             If `minimumValue` is higher than 0, then it will allow emptying the field and typing a value between 0 and `minimumValue` (and hence setting the invalid state)
   * - 'ignore'  ignores both the `minimumValue` and `maximumValue` settings
   *             When using this option, the field will always be valid range-wise
   * - 'never'   strictly adheres to the `maximumValue` and `minimumValue` settings
   *             Use this if you want to _always_ have a valid input in the field (This is how AutoNumeric has always behaved before `4.6.0`).
   *             Note: If `0` is out of the min/max range, this will prevent the user clearing the input field.
   * - 'doNotOverride' This is the default behavior.
   *                   The user can temporarily type out-of-bound values. In doing so, the invalid state is set on the field.
   *                   When the value is correctly set within the limit boundaries, the invalid state is removed.
   * //FIXME Finish this -> Or, when the user set a minimumValue > 0 or a maximumValue < 0, display a warning in the console to tell the dev to set the 'temporary' option for 'overrideMinMaxLimits'
   *  The other option would be to :
   * - 'ceiling' Strictly adheres to `maximumValue` and ignores the `minimumValue` settings
   *             It allows the user to enter anything between -∞ `and maximumValue`
   *             If `maximumValue` is less than 0, then it will prevent the user emptying the field or typing value above `maximumValue`, making sure the value entered is always valid
   * - 'floor'   Strictly adheres to `minimumValue` and ignores the `maximumValue` settings
   *             It allows the user to enter anything between `minimumValue` and +∞
   *             If `minimumValue` is higher than 0, then it will prevent the user emptying the field or typing value below `minimumValue`, making sure the value entered is always valid
   * - 'ignore'  Ignores both the `minimumValue` and `maximumValue` settings
   *             When using this option, the field will always be valid range-wise
   * - 'invalid' The user can temporarily type out-of-bound values. In doing so, the invalid state is set on the field.
   *             When the value is correctly set within the limit boundaries, the invalid state is removed
   * - 'doNotOverride' Strictly adheres to the `maximumValue` and `minimumValue` settings
   *                   This is the default behavior
   *                   If `0` is out of the min/max range, this will prevent the user clearing the input field, making sure the value entered is always valid
   */
  overrideMinMaxLimits: {
    ceiling: 'ceiling',
    floor: 'floor',
    ignore: 'ignore',
    invalid: 'invalid',
    doNotOverride: null
  },

  /* Defines the positive sign symbol.
   * It can be a string of only one character.
   * This is shown only if `showPositiveSign` is set to `true`.
   */
  positiveSignCharacter: {
    plus: '+',
    fullWidthPlus: '＋',
    heavyPlus: '➕',
    doublePlus: '⧺',
    triplePlus: '⧻',
    circledPlus: '⊕',
    squaredPlus: '⊞',
    trianglePlus: '⨹',
    plusMinus: '±',
    minusPlus: '∓',
    dotPlus: '∔',
    altHebrewPlus: '﬩',
    normalSpace: ' ',
    thinSpace: "\u2009",
    narrowNoBreakSpace: "\u202F",
    noBreakSpace: "\xA0"
  },

  /* The `rawValueDivisor` divides the formatted value shown in the AutoNumeric element and store the result in `rawValue`.
   * @example { rawValueDivisor: '100' } or <input data-raw-value-divisor="100">
   * Given the `0.01234` raw value, the formatted value will be displayed as `'1.234'`.
   * This is useful when displaying percentage for instance, and avoid the need to divide/multiply by 100 between the number shown and the raw value.
   */
  rawValueDivisor: {
    none: null,
    percentage: 100,
    permille: 1000,
    basisPoint: 10000
  },

  /* Defines if the element (`<input>` or another allowed html tag) should be set as read-only on initialization.
   * When set to `true`, then:
   * - the `readonly` html property is added to the <input> element on initialization, or
   * - the `contenteditable` attribute is set to `false` on non-input elements.
   */
  readOnly: {
    readOnly: true,
    readWrite: false
  },

  /* Defines the rounding method to use.
   * roundingMethod: "S", Round-Half-Up Symmetric (default)
   * roundingMethod: "A", Round-Half-Up Asymmetric
   * roundingMethod: "s", Round-Half-Down Symmetric (lower case s)
   * roundingMethod: "a", Round-Half-Down Asymmetric (lower case a)
   * roundingMethod: "B", Round-Half-Even "Bankers Rounding"
   * roundingMethod: "U", Round Up "Round-Away-From-Zero"
   * roundingMethod: "D", Round Down "Round-Toward-Zero" - same as truncate
   * roundingMethod: "C", Round to Ceiling "Toward Positive Infinity"
   * roundingMethod: "F", Round to Floor "Toward Negative Infinity"
   * roundingMethod: "N05" Rounds to the nearest .05 => same as "CHF" used in 1.9X and still valid
   * roundingMethod: "U05" Rounds up to next .05
   * roundingMethod: "D05" Rounds down to next .05
   */
  roundingMethod: {
    halfUpSymmetric: 'S',
    halfUpAsymmetric: 'A',
    halfDownSymmetric: 's',
    halfDownAsymmetric: 'a',
    halfEvenBankersRounding: 'B',
    upRoundAwayFromZero: 'U',
    downRoundTowardZero: 'D',
    toCeilingTowardPositiveInfinity: 'C',
    toFloorTowardNegativeInfinity: 'F',
    toNearest05: 'N05',
    toNearest05Alt: 'CHF',
    upToNext05: 'U05',
    downToNext05: 'D05'
  },

  /* Set to `true` to allow the `decimalPlacesShownOnFocus` value to be saved with sessionStorage
   * If IE 6 or 7 is detected, the value will be saved as a session cookie.
   */
  saveValueToSessionStorage: {
    save: true,
    doNotSave: false
  },

  /* Determine if the select all keyboard command will select the complete input text, or only the input numeric value
   * Note : If the currency symbol is between the numeric value and the negative sign, only the numeric value will be selected
   */
  selectNumberOnly: {
    selectNumbersOnly: true,
    selectAll: false
  },

  /* Defines if the element value should be selected on focus.
   * Note: The selection is done using the `selectNumberOnly` option.
   */
  selectOnFocus: {
    select: true,
    doNotSelect: false
  },

  /* Defines how the serialize functions should treat the spaces.
   * Those spaces ' ' can either be converted to the plus sign '+', which is the default, or to '%20'.
   * Both values being valid per the spec (http://www.w3.org/Addressing/URL/uri-spec.html).
   * Also see the summed up answer on http://stackoverflow.com/a/33939287.
   *
   * tl;dr : Spaces should be converted to '%20' before the '?' sign, then converted to '+' after.
   * In our case since we serialize the query, we use '+' as the default (but allow the user to get back the old *wrong* behavior).
   */
  serializeSpaces: {
    plus: '+',
    percent: '%20'
  },

  /* Defines if the element value should be converted to the raw value on focus (and back to the formatted on blur).
   * If set to `true`, then autoNumeric remove the thousand separator, currency symbol and suffix on focus.
   * Example:
   * If the input value is '$ 1,999.88 suffix', on focus it becomes '1999.88' and back to '$ 1,999.88 suffix' on blur.
   */
  showOnlyNumbersOnFocus: {
    onlyNumbers: true,
    showAll: false
  },

  /* Allow the positive sign symbol `+` to be displayed for positive numbers.
   * By default, this positive sign is not shown.
   * The sign placement is controlled by the 'negativePositiveSignPlacement' option, mimicking the negative sign placement rules.
   */
  showPositiveSign: {
    show: true,
    hide: false
  },

  /* Defines if warnings should be shown in the console.
   * Those warnings can be ignored, but are usually printed when something could be improved by the user (ie. option conflicts).
   */
  showWarnings: {
    show: true,
    // All warning are shown
    hide: false // No warnings are shown, only the thrown errors

  },

  /* Defines the rules that calculate the CSS class(es) to apply on the element, based on the raw unformatted value.
   * This can also be used to call callbacks whenever the `rawValue` is updated.
   * Important: all callbacks must return `null` if no ranges/userDefined classes are selected
   * @example
   * {
   *     positive   : 'autoNumeric-positive', // Or `null` to not use it
   *     negative   : 'autoNumeric-negative',
   *     ranges     : [
   *         { min: 0, max: 25, class: 'autoNumeric-red' },
   *         { min: 25, max: 50, class: 'autoNumeric-orange' },
   *         { min: 50, max: 75, class: 'autoNumeric-yellow' },
   *         { min: 75, max: Number.MAX_SAFE_INTEGER, class: 'autoNumeric-green' },
   *     ],
   *     userDefined: [
   *         // If 'classes' is a string, set it if `true`, remove it if `false`
   *         { callback: rawValue => { return true; }, classes: 'thisIsTrue' },
   *         // If 'classes' is an array with only 2 elements, set the first class if `true`, the second if `false`
   *         { callback: rawValue => rawValue % 2 === 0, classes: ['autoNumeric-even', 'autoNumeric-odd'] },
   *         // Return only one index to use on the `classes` array (here, 'class3')
   *         { callback: rawValue => { return 2; }, classes: ['class1', 'class2', 'class3'] },
   *         // Return an array of indexes to use on the `classes` array (here, 'class1' and 'class3')
   *         { callback: rawValue => { return [0, 2]; }, classes: ['class1', 'class2', 'class3'] },
   *         // If 'classes' is `undefined` or `null`, then the callback is called with the AutoNumeric object passed as a parameter
   *         { callback: anElement => { return anElement.getFormatted(); } },
   *     ],
   * }
   */
  styleRules: {
    none: null,
    positiveNegative: {
      positive: 'autoNumeric-positive',
      negative: 'autoNumeric-negative'
    },
    range0To100With4Steps: {
      ranges: [{
        min: 0,
        max: 25,
        "class": 'autoNumeric-red'
      }, {
        min: 25,
        max: 50,
        "class": 'autoNumeric-orange'
      }, {
        min: 50,
        max: 75,
        "class": 'autoNumeric-yellow'
      }, {
        min: 75,
        max: 100,
        "class": 'autoNumeric-green'
      }]
    },
    evenOdd: {
      userDefined: [{
        callback: function callback(rawValue) {
          return rawValue % 2 === 0;
        },
        classes: ['autoNumeric-even', 'autoNumeric-odd']
      }]
    },
    rangeSmallAndZero: {
      userDefined: [{
        callback: function callback(rawValue) {
          if (rawValue >= -1 && rawValue < 0) {
            return 0;
          }

          if (Number(rawValue) === 0) {
            return 1;
          }

          if (rawValue > 0 && rawValue <= 1) {
            return 2;
          }

          return null; // In case the rawValue is outside those ranges
        },
        classes: ['autoNumeric-small-negative', 'autoNumeric-zero', 'autoNumeric-small-positive']
      }]
    }
  },

  /* Add a text on the right hand side of the element value.
   * This suffix text can have any characters in its string, except numeric characters and the negative/positive sign.
   * Example: ' dollars'
   */
  suffixText: {
    none: '',
    percentage: '%',
    permille: '‰',
    basisPoint: '‱'
  },

  /* The three options (divisorWhenUnfocused, decimalPlacesShownOnBlur & symbolWhenUnfocused) handle scaling of the input when the input does not have focus
   * Please note that the non-scaled value is held in data and it is advised that you use the `saveValueToSessionStorage` option to ensure retaining the value
   * ["divisor", "decimal places", "symbol"]
   * Example: with the following options set {divisorWhenUnfocused: '1000', decimalPlacesShownOnBlur: '1', symbolWhenUnfocused: ' K'}
   * Example: focusin value "1,111.11" focusout value "1.1 K"
   */

  /* The `symbolWhenUnfocused` option is a symbol placed as a suffix when not in focus.
   * This is optional too.
   */
  symbolWhenUnfocused: {
    none: null,
    percentage: '%',
    permille: '‰',
    basisPoint: '‱'
  },

  /* Defines if the element value should be unformatted when the user hover his mouse over it while holding the `Alt` key.
   * Unformatting there means that this removes any non-number characters and displays the *raw* value, as understood by Javascript (ie. `12.34` is a valid number, while `12,34` is not).
   *
   * We reformat back before anything else if :
   * - the user focus on the element by tabbing or clicking into it,
   * - the user releases the `Alt` key, and
   * - if we detect a mouseleave event.
   *
   * We unformat again if :
   * - while the mouse is over the element, the user hit `Alt` again
   */
  unformatOnHover: {
    unformat: true,
    doNotUnformat: false //TODO Rename to `keepFormat`

  },

  /* Removes the formatting and use the raw value in each autoNumeric elements of the parent form element, on the form `submit` event.
   * The output format is a numeric string (nnnn.nn or -nnnn.nn).
   */
  unformatOnSubmit: {
    unformat: true,
    keepCurrentValue: false
  },

  /* Provides a way for automatically replacing the formatted value with a pre-defined string, when the raw value is equal to a specific value
   * Here you can specify as many 'conversion' as needed.
   */
  valuesToStrings: {
    none: null,
    zeroDash: {
      0: '-'
    },
    oneAroundZero: {
      '-1': 'Min',
      1: 'Max'
    }
  },

  /* Defines if the AutoNumeric element should watch external changes made without using `.set()`, but by using the basic `aNElement.node().value = 42` notation.
   * If set to `watch`, then AutoNumeric will format the new value using `.set()` internally.
   * Otherwise it will neither format it, nor save it in the history.
   */
  watchExternalChanges: {
    watch: true,
    doNotWatch: false
  },

  /* Defines when the wheel event will increment or decrement the element value.
   * When set to `'focus'`, the AutoNumeric-managed element needs to be focused for the wheel event to change the value.
   * When set to `'hover'`, using the wheel event while the mouse is hovering the element is sufficient (no focus needed).
   *
   * Note :
   * When `wheelOn` is set to `'focus'`, you can use the 'Shift' modifier key while using the mouse wheel in order to temporarily activate the increment/decrement feature even if the element is not focused.
   * When `wheelOn` is set to `'hover'`, you can use the 'Shift' modifier key while using the mouse wheel in order to temporarily disable the increment/decrement feature even if the element is not hovered.
   */
  wheelOn: {
    focus: 'focus',
    hover: 'hover'
  },

  /* That option is linked to the `modifyValueOnWheel` one and will only be used if the latter is set to `true`.
   * This option will modify the wheel behavior and can be used in two ways, either by setting :
   * - a 'fixed' step value (a positive float or integer number `1000`), or
   * - the `'progressive'` string.
   *
   * The 'fixed' mode always increment/decrement the element value by that amount, while respecting the `minimumValue` and `maximumValue` settings.
   * The 'progressive' mode will increment/decrement the element value based on its current value. The bigger the number, the bigger the step, and vice versa.
   */
  wheelStep: {
    progressive: 'progressive'
  }
};
/**
 * Simple function that will semi-deep freeze the `AutoNumeric.options` object.
 * By 'semi' it means the nested objects in the `styleRules` option are not frozen.
 * The ones in the `valuesToStrings` are though, since they are much more simple.
 *
 * @param {object} options
 * @returns {ReadonlyArray<any>}
 */

function freezeOptions(options) {
  // Freeze each property objects
  Object.getOwnPropertyNames(options).forEach(function (optionName) {
    if (optionName === 'valuesToStrings') {
      var vsProps = Object.getOwnPropertyNames(options.valuesToStrings);
      vsProps.forEach(function (valuesToStringObjectName) {
        if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].isIE11() && options.valuesToStrings[valuesToStringObjectName] !== null) {
          Object.freeze(options.valuesToStrings[valuesToStringObjectName]);
        }
      });
    } else if (optionName !== 'styleRules') {
      if (!_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].isIE11() && options[optionName] !== null) {
        Object.freeze(options[optionName]);
      }
    }
  }); // Then freeze the options object globally

  return Object.freeze(options);
}

freezeOptions(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options);
Object.defineProperty(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"], 'options', {
  configurable: false,
  writable: false
});

/***/ }),

/***/ "./src/AutoNumericPredefinedOptions.js":
/*!*********************************************!*\
  !*** ./src/AutoNumericPredefinedOptions.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoNumeric */ "./src/AutoNumeric.js");
/* harmony import */ var _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoNumericHelper */ "./src/AutoNumericHelper.js");
/**
 * Pre-defined options for autoNumeric.js
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */


var euro = {
  // Français
  digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.dot,
  // or '\u202f'
  decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.comma,
  decimalCharacterAlternative: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacterAlternative.dot,
  currencySymbol: "\u202F\u20AC",
  currencySymbolPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbolPlacement.suffix,
  negativePositiveSignPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.prefix
};
var dollar = {
  digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.comma,
  decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.dot,
  currencySymbol: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.dollar,
  currencySymbolPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbolPlacement.prefix,
  negativePositiveSignPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.right
};
var japanese = {
  // 日本語
  digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.comma,
  decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.dot,
  currencySymbol: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.yen,
  currencySymbolPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbolPlacement.prefix,
  negativePositiveSignPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.right
}; // Here we need to clone the initial objects in order to be able to edit the clones without affecting the originals

var euroF = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(euro);
euroF.formulaMode = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.formulaMode.enabled;
var euroPos = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(euro);
euroPos.minimumValue = 0;
var euroNeg = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(euro);
euroNeg.maximumValue = 0;
euroNeg.negativePositiveSignPlacement = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.prefix;
var euroSpace = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(euro);
euroSpace.digitGroupSeparator = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.normalSpace;
var euroSpacePos = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(euroSpace);
euroSpacePos.minimumValue = 0;
var euroSpaceNeg = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(euroSpace);
euroSpaceNeg.maximumValue = 0;
euroSpaceNeg.negativePositiveSignPlacement = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.prefix;
var percentageEU2dec = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(euro);
percentageEU2dec.currencySymbol = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.none;
percentageEU2dec.suffixText = "\u202F".concat(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.suffixText.percentage);
percentageEU2dec.wheelStep = 0.0001; // This targets the `rawValue`, not the formatted one

percentageEU2dec.rawValueDivisor = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.rawValueDivisor.percentage;
var percentageEU2decPos = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(percentageEU2dec);
percentageEU2decPos.minimumValue = 0;
var percentageEU2decNeg = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(percentageEU2dec);
percentageEU2decNeg.maximumValue = 0;
percentageEU2decNeg.negativePositiveSignPlacement = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.prefix;
var percentageEU3dec = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(percentageEU2dec);
percentageEU3dec.decimalPlaces = 3;
var percentageEU3decPos = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(percentageEU2decPos);
percentageEU3decPos.decimalPlaces = 3;
var percentageEU3decNeg = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(percentageEU2decNeg);
percentageEU3decNeg.decimalPlaces = 3;
var dollarF = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(dollar);
dollarF.formulaMode = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.formulaMode.enabled;
var dollarPos = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(dollar);
dollarPos.minimumValue = 0;
var dollarNeg = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(dollar);
dollarNeg.maximumValue = 0;
dollarNeg.negativePositiveSignPlacement = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.prefix;
var dollarNegBrackets = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(dollarNeg);
dollarNegBrackets.negativeBracketsTypeOnBlur = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativeBracketsTypeOnBlur.parentheses;
var percentageUS2dec = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(dollar);
percentageUS2dec.currencySymbol = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.none;
percentageUS2dec.suffixText = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.suffixText.percentage;
percentageUS2dec.wheelStep = 0.0001;
percentageUS2dec.rawValueDivisor = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.rawValueDivisor.percentage;
var percentageUS2decPos = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(percentageUS2dec);
percentageUS2decPos.minimumValue = 0;
var percentageUS2decNeg = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(percentageUS2dec);
percentageUS2decNeg.maximumValue = 0;
percentageUS2decNeg.negativePositiveSignPlacement = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.prefix;
var percentageUS3dec = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(percentageUS2dec);
percentageUS3dec.decimalPlaces = 3;
var percentageUS3decPos = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(percentageUS2decPos);
percentageUS3decPos.decimalPlaces = 3;
var percentageUS3decNeg = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(percentageUS2decNeg);
percentageUS3decNeg.decimalPlaces = 3;
var turkish = _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_1__["default"].cloneObject(euro);
turkish.currencySymbol = _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.lira;
/**
 * Predefined options for the most common languages
 */

_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].predefinedOptions = {
  euro: euro,
  euroPos: euroPos,
  euroNeg: euroNeg,
  euroSpace: euroSpace,
  euroSpacePos: euroSpacePos,
  euroSpaceNeg: euroSpaceNeg,
  percentageEU2dec: percentageEU2dec,
  percentageEU2decPos: percentageEU2decPos,
  percentageEU2decNeg: percentageEU2decNeg,
  percentageEU3dec: percentageEU3dec,
  percentageEU3decPos: percentageEU3decPos,
  percentageEU3decNeg: percentageEU3decNeg,
  dollar: dollar,
  dollarPos: dollarPos,
  dollarNeg: dollarNeg,
  dollarNegBrackets: dollarNegBrackets,
  percentageUS2dec: percentageUS2dec,
  percentageUS2decPos: percentageUS2decPos,
  percentageUS2decNeg: percentageUS2decNeg,
  percentageUS3dec: percentageUS3dec,
  percentageUS3decPos: percentageUS3decPos,
  percentageUS3decNeg: percentageUS3decNeg,
  French: euro,
  // Français
  Spanish: euro,
  // Español
  NorthAmerican: dollar,
  British: {
    digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.comma,
    decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.dot,
    currencySymbol: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.pound,
    currencySymbolPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbolPlacement.prefix,
    negativePositiveSignPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.right
  },
  Swiss: {
    // Suisse
    digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.apostrophe,
    decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.dot,
    currencySymbol: "\u202FCHF",
    currencySymbolPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbolPlacement.suffix,
    negativePositiveSignPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.prefix
  },
  Japanese: japanese,
  // 日本語
  Chinese: japanese,
  // 中国語 (Chinese)
  Brazilian: {
    digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.dot,
    decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.comma,
    currencySymbol: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.real,
    currencySymbolPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbolPlacement.prefix,
    negativePositiveSignPlacement: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.negativePositiveSignPlacement.right
  },
  Turkish: turkish,
  dotDecimalCharCommaSeparator: {
    digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.comma,
    decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.dot
  },
  commaDecimalCharDotSeparator: {
    digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.dot,
    decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.comma,
    decimalCharacterAlternative: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacterAlternative.dot
  },
  integer: {
    decimalPlaces: 0
  },
  integerPos: {
    minimumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.minimumValue.zero,
    decimalPlaces: 0
  },
  integerNeg: {
    maximumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.maximumValue.zero,
    decimalPlaces: 0
  },
  "float": {
    allowDecimalPadding: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.allowDecimalPadding.never
  },
  floatPos: {
    allowDecimalPadding: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.allowDecimalPadding.never,
    minimumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.minimumValue.zero,
    maximumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.maximumValue.tenTrillions
  },
  floatNeg: {
    allowDecimalPadding: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.allowDecimalPadding.never,
    minimumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.minimumValue.tenTrillions,
    maximumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.maximumValue.zero
  },
  numeric: {
    digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.noSeparator,
    decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.dot,
    currencySymbol: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.none
  },
  numericPos: {
    digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.noSeparator,
    decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.dot,
    currencySymbol: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.none,
    minimumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.minimumValue.zero,
    maximumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.maximumValue.tenTrillions
  },
  numericNeg: {
    digitGroupSeparator: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.digitGroupSeparator.noSeparator,
    decimalCharacter: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.decimalCharacter.dot,
    currencySymbol: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.currencySymbol.none,
    minimumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.minimumValue.tenTrillions,
    maximumValue: _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].options.maximumValue.zero
  }
};
Object.getOwnPropertyNames(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].predefinedOptions).forEach(function (optionName) {
  Object.freeze(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].predefinedOptions[optionName]);
});
Object.freeze(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"].predefinedOptions);
Object.defineProperty(_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"], 'predefinedOptions', {
  configurable: false,
  writable: false
});

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AutoNumeric__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoNumeric */ "./src/AutoNumeric.js");
/* harmony import */ var _AutoNumericEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoNumericEvents */ "./src/AutoNumericEvents.js");
/* harmony import */ var _AutoNumericOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AutoNumericOptions */ "./src/AutoNumericOptions.js");
/* harmony import */ var _AutoNumericDefaultSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AutoNumericDefaultSettings */ "./src/AutoNumericDefaultSettings.js");
/* harmony import */ var _AutoNumericPredefinedOptions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AutoNumericPredefinedOptions */ "./src/AutoNumericPredefinedOptions.js");
/**
 * Babel + Webpack workaround for autoNumeric
 *
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */





/* eslint no-unused-vars: 0 */

/**
 * This file serve as the main entry point to the library.
 *
 * This is needed since if the Webpack entrypoint is set to `./src/AutoNumeric.js`, then the AutoNumericEvents, AutoNumericOptions, AutoNumericDefaultSettings and AutoNumericPredefinedOptions files are not included in the bundle and therefore cannot be used.
 *
 * @type {AutoNumeric}
 */

/* harmony default export */ __webpack_exports__["default"] = (_AutoNumeric__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/maths/ASTNode.js":
/*!******************************!*\
  !*** ./src/maths/ASTNode.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ASTNode; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Math expression tokenizer/parser/evaluator functions for autoNumeric.js
 *
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * The Abstract Syntax Tree node
 *
 * Each node carries the node information such as type (operator type), value (if it's a leaf), and the left and right branches
 */
var ASTNode = /*#__PURE__*/function () {
  function ASTNode() {
    _classCallCheck(this, ASTNode);
  }

  _createClass(ASTNode, null, [{
    key: "createNode",

    /*
    constructor() {
        // this.type = void(0);
        // this.value = 0;
        // this.left = null;
        // this.right = null;
    }
    */
    value: function createNode(type, left, right) {
      var node = new ASTNode();
      node.type = type;
      node.left = left;
      node.right = right;
      return node;
    }
  }, {
    key: "createUnaryNode",
    value: function createUnaryNode(left) {
      var node = new ASTNode();
      node.type = 'unaryMinus';
      node.left = left;
      node.right = null;
      return node;
    }
  }, {
    key: "createLeaf",
    value: function createLeaf(value) {
      var node = new ASTNode();
      node.type = 'number';
      node.value = value;
      return node;
    }
  }]);

  return ASTNode;
}();



/***/ }),

/***/ "./src/maths/Evaluator.js":
/*!********************************!*\
  !*** ./src/maths/Evaluator.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Evaluator; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Math expression tokenizer/parser/evaluator functions for autoNumeric.js
 *
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Recursively evaluate the abstract syntax tree (AST) and return the result for the given sub-tree
 */
var Evaluator = /*#__PURE__*/function () {
  function Evaluator(ast) {
    _classCallCheck(this, Evaluator);

    if (ast === null) {
      throw new Error("Invalid AST");
    } // return this.evaluate(ast);

  }

  _createClass(Evaluator, [{
    key: "evaluate",
    value: function evaluate(subtree) {
      if (subtree === void 0 || subtree === null) {
        throw new Error("Invalid AST sub-tree");
      }

      if (subtree.type === 'number') {
        return subtree.value;
      } else if (subtree.type === 'unaryMinus') {
        return -this.evaluate(subtree.left);
      } else {
        var left = this.evaluate(subtree.left);
        var right = this.evaluate(subtree.right);

        switch (subtree.type) {
          case 'op_+':
            return Number(left) + Number(right);

          case 'op_-':
            return left - right;

          case 'op_*':
            return left * right;

          case 'op_/':
            return left / right;

          default:
            throw new Error("Invalid operator '".concat(subtree.type, "'"));
        }
      }
    }
  }]);

  return Evaluator;
}();



/***/ }),

/***/ "./src/maths/Lexer.js":
/*!****************************!*\
  !*** ./src/maths/Lexer.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Lexer; });
/* harmony import */ var _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AutoNumericHelper */ "./src/AutoNumericHelper.js");
/* harmony import */ var _Token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Token */ "./src/maths/Token.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Math expression tokenizer/parser/evaluator functions for autoNumeric.js
 *
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */



var Lexer = /*#__PURE__*/function () {
  function Lexer(text) {
    _classCallCheck(this, Lexer);

    this.text = text;
    this.textLength = text.length;
    this.index = 0;
    this.token = new _Token__WEBPACK_IMPORTED_MODULE_1__["default"]('Error', 0, 0);
  }
  /**
   * Ignore white spaces and increment the index count until a non-space character is found
   * @private
   */


  _createClass(Lexer, [{
    key: "_skipSpaces",
    value: function _skipSpaces() {
      while (this.text[this.index] === ' ' && this.index <= this.textLength) {
        this.index++;
      }
    }
    /**
     * Return the current index
     *
     * @returns {number}
     */

  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index;
    }
    /**
     * Return the next token object
     *
     * @param {string} decimalCharacter The decimal character to use in the float numbers
     * @returns {Token}
     */

  }, {
    key: "getNextToken",
    value: function getNextToken() {
      var decimalCharacter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.';

      this._skipSpaces(); // Test for the end of text


      if (this.textLength === this.index) {
        this.token.type = 'EOT'; // End of text

        return this.token;
      } // If the current character is a digit read a number


      if (_AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isDigit(this.text[this.index])) {
        this.token.type = 'num';
        this.token.value = this._getNumber(decimalCharacter);
        return this.token;
      } // Check if the current character is an operator or parentheses


      this.token.type = 'Error';

      switch (this.text[this.index]) {
        case '+':
          this.token.type = '+';
          break;

        case '-':
          this.token.type = '-';
          break;

        case '*':
          this.token.type = '*';
          break;

        case '/':
          this.token.type = '/';
          break;

        case '(':
          this.token.type = '(';
          break;

        case ')':
          this.token.type = ')';
          break;
      }

      if (this.token.type !== 'Error') {
        this.token.symbol = this.text[this.index];
        this.index++;
      } else {
        throw new Error("Unexpected token '".concat(this.token.symbol, "' at position '").concat(this.token.index, "' in the token function"));
      }

      return this.token;
    }
    /**
     * Return the integer or float number starting from the `this.index` string index
     *
     * @param {string} decimalCharacter The decimal character to use in the float numbers
     *
     * @returns {string}
     * @private
     */

  }, {
    key: "_getNumber",
    value: function _getNumber(decimalCharacter) {
      this._skipSpaces();

      var startIndex = this.index;

      while (this.index <= this.textLength && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isDigit(this.text[this.index])) {
        // Integer part
        this.index++;
      }

      if (this.text[this.index] === decimalCharacter) {
        this.index++;
      }

      while (this.index <= this.textLength && _AutoNumericHelper__WEBPACK_IMPORTED_MODULE_0__["default"].isDigit(this.text[this.index])) {
        // Decimal part, if any
        this.index++;
      }

      if (this.index === startIndex) {
        throw new Error("No number has been found while it was expected");
      } // Convert the localized float number to a Javascript number


      return this.text.substring(startIndex, this.index).replace(decimalCharacter, '.');
    }
  }]);

  return Lexer;
}();



/***/ }),

/***/ "./src/maths/Parser.js":
/*!*****************************!*\
  !*** ./src/maths/Parser.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Parser; });
/* harmony import */ var _ASTNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ASTNode */ "./src/maths/ASTNode.js");
/* harmony import */ var _Lexer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Lexer */ "./src/maths/Lexer.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Math expression tokenizer/parser/evaluator functions for autoNumeric.js
 *
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */


/**
 * Math expression parser using the shunting-yard algorithm
 *
 * This implements the following BNF grammar:
 * EXP       -> TERM MORE_EXP
 * MORE_EXP  -> + TERM MORE_EXP |
 *              - TERM MORE_EXP |
 *              epsilon
 * TERM      -> FACTOR MORE_TERM
 * MORE_TERM -> * FACTOR MORE_TERM |
 *              / FACTOR MORE_TERM |
 *              epsilon
 * FACTOR    -> number |
 *             ( EXP ) |
 *             - FACTOR
 */

var Parser = /*#__PURE__*/function () {
  /**
   * Parse the given string, and generate an abstract syntax tree (AST) from the math expression
   *
   * @param {string} text
   * @param {string} customDecimalCharacter The custom decimal character to use in floats
   * @returns {ASTNode}
   */
  function Parser(text) {
    var customDecimalCharacter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

    _classCallCheck(this, Parser);

    this.text = text;
    this.decimalCharacter = customDecimalCharacter;
    this.lexer = new _Lexer__WEBPACK_IMPORTED_MODULE_1__["default"](text);
    this.token = this.lexer.getNextToken(this.decimalCharacter);
    return this._exp();
  }

  _createClass(Parser, [{
    key: "_exp",
    value: function _exp() {
      var termNode = this._term();

      var exprNode = this._moreExp(); //TODO Do not create an 'empty' node where this is added to 0


      return _ASTNode__WEBPACK_IMPORTED_MODULE_0__["default"].createNode('op_+', termNode, exprNode);
    }
  }, {
    key: "_moreExp",
    value: function _moreExp() {
      var termNode;
      var exprNode;

      switch (this.token.type) {
        case '+':
          this.token = this.lexer.getNextToken(this.decimalCharacter);
          termNode = this._term();
          exprNode = this._moreExp();
          return _ASTNode__WEBPACK_IMPORTED_MODULE_0__["default"].createNode('op_+', exprNode, termNode);

        case '-':
          this.token = this.lexer.getNextToken(this.decimalCharacter);
          termNode = this._term();
          exprNode = this._moreExp();
          return _ASTNode__WEBPACK_IMPORTED_MODULE_0__["default"].createNode('op_-', exprNode, termNode);
      }

      return _ASTNode__WEBPACK_IMPORTED_MODULE_0__["default"].createLeaf(0);
    }
  }, {
    key: "_term",
    value: function _term() {
      var factorNode = this._factor();

      var termsNode = this._moreTerms(); //TODO Do not create an 'empty' node where this is multiplied by 1


      return _ASTNode__WEBPACK_IMPORTED_MODULE_0__["default"].createNode('op_*', factorNode, termsNode);
    }
  }, {
    key: "_moreTerms",
    value: function _moreTerms() {
      var factorNode;
      var termsNode;

      switch (this.token.type) {
        case '*':
          this.token = this.lexer.getNextToken(this.decimalCharacter);
          factorNode = this._factor();
          termsNode = this._moreTerms();
          return _ASTNode__WEBPACK_IMPORTED_MODULE_0__["default"].createNode('op_*', termsNode, factorNode);

        case '/':
          this.token = this.lexer.getNextToken(this.decimalCharacter);
          factorNode = this._factor();
          termsNode = this._moreTerms();
          return _ASTNode__WEBPACK_IMPORTED_MODULE_0__["default"].createNode('op_/', termsNode, factorNode);
      }

      return _ASTNode__WEBPACK_IMPORTED_MODULE_0__["default"].createLeaf(1);
    }
  }, {
    key: "_factor",
    value: function _factor() {
      var expression;
      var factor;
      var value;

      switch (this.token.type) {
        case 'num':
          value = this.token.value;
          this.token = this.lexer.getNextToken(this.decimalCharacter);
          return _ASTNode__WEBPACK_IMPORTED_MODULE_0__["default"].createLeaf(value);

        case '-':
          this.token = this.lexer.getNextToken(this.decimalCharacter);
          factor = this._factor();
          return _ASTNode__WEBPACK_IMPORTED_MODULE_0__["default"].createUnaryNode(factor);

        case '(':
          this.token = this.lexer.getNextToken(this.decimalCharacter);
          expression = this._exp();

          this._match(')');

          return expression;

        default:
          {
            throw new Error("Unexpected token '".concat(this.token.symbol, "' with type '").concat(this.token.type, "' at position '").concat(this.token.index, "' in the factor function"));
          }
      }
    }
  }, {
    key: "_match",
    value: function _match(expected) {
      var index = this.lexer.getIndex() - 1;

      if (this.text[index] === expected) {
        this.token = this.lexer.getNextToken(this.decimalCharacter);
      } else {
        throw new Error("Unexpected token '".concat(this.token.symbol, "' at position '").concat(index, "' in the match function"));
      }
    }
  }]);

  return Parser;
}();



/***/ }),

/***/ "./src/maths/Token.js":
/*!****************************!*\
  !*** ./src/maths/Token.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Token; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Math expression tokenizer/parser/evaluator functions for autoNumeric.js
 *
 * @author Alexandre Bonneau <alexandre.bonneau@linuxfr.eu>
 * @copyright © 2019 Alexandre Bonneau
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sub license, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Data structure used by the Lexer and Parser classes
 */
var Token = function Token(type, value, symbol) {
  _classCallCheck(this, Token);

  this.type = type;
  this.value = value;
  this.symbol = symbol;
};



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=autoNumeric.js.map