(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("react-dom"), require("react"), require("react-onclickoutside"), require("tether"));
	else if(typeof define === 'function' && define.amd)
		define(["moment", "react-dom", "react", "react-onclickoutside", "tether"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("moment"), require("react-dom"), require("react"), require("react-onclickoutside"), require("tether"));
	else
		root["DatePicker"] = factory(root["moment"], root["ReactDOM"], root["React"], root["OnClickOutside"], root["Tether"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_28__, __WEBPACK_EXTERNAL_MODULE_29__, __WEBPACK_EXTERNAL_MODULE_34__, __WEBPACK_EXTERNAL_MODULE_63__) {
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _isEqual = __webpack_require__(1);

	var _isEqual2 = _interopRequireDefault(_isEqual);

	var _moment = __webpack_require__(26);

	var _moment2 = _interopRequireDefault(_moment);

	var _date_input = __webpack_require__(27);

	var _date_input2 = _interopRequireDefault(_date_input);

	var _calendar = __webpack_require__(31);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _popover = __webpack_require__(62);

	var _popover2 = _interopRequireDefault(_popover);

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(28);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DatePicker = _react2.default.createClass({
	  displayName: "DatePicker",

	  propTypes: {
	    selected: _react2.default.PropTypes.object,
	    weekdays: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),
	    locale: _react2.default.PropTypes.string,
	    dateFormatCalendar: _react2.default.PropTypes.string,
	    disabled: _react2.default.PropTypes.bool,
	    id: _react2.default.PropTypes.string,
	    popoverAttachment: _react2.default.PropTypes.string,
	    popoverTargetAttachment: _react2.default.PropTypes.string,
	    popoverTargetOffset: _react2.default.PropTypes.string,
	    weekStart: _react2.default.PropTypes.string,
	    showYearDropdown: _react2.default.PropTypes.bool,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    onBlur: _react2.default.PropTypes.func,
	    onFocus: _react2.default.PropTypes.func,
	    tabIndex: _react2.default.PropTypes.number,
	    filterDate: _react2.default.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
	      locale: "en",
	      dateFormatCalendar: "MMMM YYYY",
	      moment: _moment2.default,
	      onChange: function onChange() {},

	      disabled: false,
	      onFocus: function onFocus() {},
	      onBlur: function onBlur() {}
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      focus: false
	    };
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !((0, _isEqual2.default)(nextProps, this.props) && (0, _isEqual2.default)(nextState, this.state));
	  },
	  handleFocus: function handleFocus() {
	    var _this = this;

	    this.props.onFocus();
	    setTimeout(function () {
	      _this.setState({ focus: true });
	    }, 200);
	  },
	  handleBlur: function handleBlur() {
	    var _this2 = this;

	    setTimeout(function () {
	      if (!_this2.state.datePickerHasFocus) {
	        _this2.props.onBlur();
	        _this2.hideCalendar();
	      }
	    }, 200);
	  },
	  hideCalendar: function hideCalendar() {
	    var _this3 = this;

	    setTimeout(function () {
	      _this3.setState({
	        focus: false
	      });
	    }, 0);
	  },
	  doesDatePickerContainElement: function doesDatePickerContainElement(element) {
	    var datePicker = _reactDom2.default.findDOMNode(this.refs.calendar);
	    if (!datePicker) {
	      return false;
	    }
	    return datePicker.contains(element);
	  },
	  handleSelect: function handleSelect(date) {
	    var _this4 = this;

	    this.setSelected(date);

	    setTimeout(function () {
	      _this4.hideCalendar();
	    }, 200);
	  },
	  setSelected: function setSelected(date) {
	    if (this.props.selected !== date) {
	      this.props.onChange(date);
	    }
	  },
	  onInputClick: function onInputClick(event) {
	    var _this5 = this;

	    var previousFocusState = this.state.focus;

	    this.setState({
	      focus: event.target === _reactDom2.default.findDOMNode(this.refs.input) ? !this.state.focus : true,
	      datePickerHasFocus: this.doesDatePickerContainElement(event.target)
	    }, function () {
	      _this5.forceUpdate();
	      if (previousFocusState && !_this5.state.datePickerHasFocus) {
	        _this5.hideCalendar();
	      }
	    });
	  },
	  onClearClick: function onClearClick(event) {
	    event.preventDefault();
	    this.props.onChange(null);
	  },
	  calendar: function calendar() {
	    if (this.state.focus) {
	      return _react2.default.createElement(
	        _popover2.default,
	        {
	          attachment: this.props.popoverAttachment,
	          targetAttachment: this.props.popoverTargetAttachment,
	          targetOffset: this.props.popoverTargetOffset,
	          constraints: this.props.tetherConstraints },
	        _react2.default.createElement(_calendar2.default, {
	          ref: "calendar",
	          weekdays: this.props.weekdays,
	          locale: this.props.locale,
	          moment: this.props.moment,
	          dateFormat: this.props.dateFormatCalendar,
	          selected: this.props.selected,
	          onSelect: this.handleSelect,
	          hideCalendar: this.hideCalendar,
	          minDate: this.props.minDate,
	          maxDate: this.props.maxDate,
	          startDate: this.props.startDate,
	          endDate: this.props.endDate,
	          excludeDates: this.props.excludeDates,
	          filterDate: this.props.filterDate,
	          handleClick: this.onInputClick,
	          includeDates: this.props.includeDates,
	          weekStart: this.props.weekStart,
	          showYearDropdown: this.props.showYearDropdown })
	      );
	    }
	  },
	  renderClearButton: function renderClearButton() {
	    if (this.props.isClearable && this.props.selected != null) {
	      return _react2.default.createElement("a", { className: "close-icon", href: "#", onClick: this.onClearClick });
	    } else {
	      return null;
	    }
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker__input-container" },
	      _react2.default.createElement(_date_input2.default, {
	        ref: "input",
	        id: this.props.id,
	        name: this.props.name,
	        date: this.props.selected,
	        dateFormat: this.props.dateFormat,
	        focus: this.state.focus,
	        onFocus: this.handleFocus,
	        onBlur: this.handleBlur,
	        handleClick: this.onInputClick,
	        hideCalendar: this.hideCalendar,
	        setSelected: this.setSelected,
	        placeholderText: this.props.placeholderText,
	        disabled: this.props.disabled,
	        className: this.props.className,
	        title: this.props.title,
	        readOnly: this.props.readOnly,
	        required: this.props.required,
	        tabIndex: this.props.tabIndex }),
	      this.renderClearButton(),
	      this.props.disabled ? null : this.calendar()
	    );
	  }
	});

	module.exports = DatePicker;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(2),
	    bindCallback = __webpack_require__(24);

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent. If `customizer` is provided it's invoked to compare values.
	 * If `customizer` returns `undefined` comparisons are handled by the method
	 * instead. The `customizer` is bound to `thisArg` and invoked with up to
	 * three arguments: (value, other [, index|key]).
	 *
	 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	 * numbers, `Object` objects, regexes, and strings. Objects are compared by
	 * their own, not inherited, enumerable properties. Functions and DOM nodes
	 * are **not** supported. Provide a customizer function to extend support
	 * for comparing other values.
	 *
	 * @static
	 * @memberOf _
	 * @alias eq
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize value comparisons.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * object == other;
	 * // => false
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * // using a customizer callback
	 * var array = ['hello', 'goodbye'];
	 * var other = ['hi', 'goodbye'];
	 *
	 * _.isEqual(array, other, function(value, other) {
	 *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
	 *     return true;
	 *   }
	 * });
	 * // => true
	 */
	function isEqual(value, other, customizer, thisArg) {
	  customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
	  var result = customizer ? customizer(value, other) : undefined;
	  return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
	}

	module.exports = isEqual;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(3),
	    isObject = __webpack_require__(12),
	    isObjectLike = __webpack_require__(13);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var equalArrays = __webpack_require__(4),
	    equalByTag = __webpack_require__(6),
	    equalObjects = __webpack_require__(7),
	    isArray = __webpack_require__(20),
	    isTypedArray = __webpack_require__(23);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(5);

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalArrays;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object)
	        ? other != +other
	        : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(8);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(9),
	    isArrayLike = __webpack_require__(14),
	    isObject = __webpack_require__(12),
	    shimKeys = __webpack_require__(18);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(10);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(11),
	    isObjectLike = __webpack_require__(13);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(15),
	    isLength = __webpack_require__(17);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(16);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(19),
	    isArray = __webpack_require__(20),
	    isIndex = __webpack_require__(21),
	    isLength = __webpack_require__(17),
	    keysIn = __webpack_require__(22);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(14),
	    isObjectLike = __webpack_require__(13);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(9),
	    isLength = __webpack_require__(17),
	    isObjectLike = __webpack_require__(13);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(19),
	    isArray = __webpack_require__(20),
	    isIndex = __webpack_require__(21),
	    isLength = __webpack_require__(17),
	    isObject = __webpack_require__(12);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(17),
	    isObjectLike = __webpack_require__(13);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(25);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _moment = __webpack_require__(26);

	var _moment2 = _interopRequireDefault(_moment);

	var _reactDom = __webpack_require__(28);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(30);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DateInput = _react2.default.createClass({
	  displayName: "DateInput",
	  getDefaultProps: function getDefaultProps() {
	    return {
	      dateFormat: "YYYY-MM-DD"
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this.setState({
	      maybeDate: this.safeDateFormat(this.props.date)
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    this.toggleFocus(this.props.focus);
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this.toggleFocus(newProps.focus);

	    // If we're receiving a different date then apply it.
	    // If we're receiving a null date continue displaying the
	    // value currently in the textbox.
	    if (newProps.date != this.props.date) {
	      this.setState({
	        maybeDate: this.safeDateFormat(newProps.date)
	      });
	    }
	  },
	  toggleFocus: function toggleFocus(focus) {
	    if (focus) {
	      this.refs.input.focus();
	    } else {
	      this.refs.input.blur();
	    }
	  },
	  handleChange: function handleChange(event) {
	    var value = event.target.value;
	    var date = (0, _moment2.default)(value, this.props.dateFormat, true);
	    if (date.isValid()) {
	      this.props.setSelected(date);
	    } else if (value === "") {
	      this.props.setSelected(null);
	    }
	    this.setState({
	      maybeDate: value
	    });
	  },
	  safeDateFormat: function safeDateFormat(date) {
	    return !!date ? date.format(this.props.dateFormat) : null;
	  },
	  handleKeyDown: function handleKeyDown(event) {
	    if (event.key === "Enter" || event.key === "Escape") {
	      event.preventDefault();
	      this.props.hideCalendar();
	    }
	  },
	  handleClick: function handleClick(event) {
	    if (!this.props.disabled) {
	      this.props.handleClick(event);
	    }
	  },
	  getClassNames: function getClassNames() {
	    return (0, _classnames2.default)("datepicker__input", "ignore-react-onclickoutside", this.props.className);
	  },
	  render: function render() {
	    return _react2.default.createElement("input", {
	      ref: "input",
	      type: "text",
	      id: this.props.id,
	      name: this.props.name,
	      value: this.state.maybeDate,
	      onClick: this.handleClick,
	      onKeyDown: this.handleKeyDown,
	      onFocus: this.props.onFocus,
	      onBlur: this.props.onBlur,
	      onChange: this.handleChange,
	      className: this.getClassNames(),
	      disabled: this.props.disabled,
	      placeholder: this.props.placeholderText,
	      readOnly: this.props.readOnly,
	      required: this.props.required,
	      tabIndex: this.props.tabIndex });
	  }
	});

	module.exports = DateInput;

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_28__;

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_29__;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _year_dropdown = __webpack_require__(32);

	var _year_dropdown2 = _interopRequireDefault(_year_dropdown);

	var _month = __webpack_require__(35);

	var _month2 = _interopRequireDefault(_month);

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getDateInView(_ref) {
	  var moment = _ref.moment;
	  var selected = _ref.selected;
	  var minDate = _ref.minDate;
	  var maxDate = _ref.maxDate;

	  var current = moment();
	  if (selected) {
	    return selected;
	  } else if (minDate && minDate.isAfter(current)) {
	    return minDate;
	  } else if (maxDate && maxDate.isBefore(current)) {
	    return maxDate;
	  } else {
	    return current;
	  }
	}

	var Calendar = _react2.default.createClass({
	  displayName: "Calendar",

	  mixins: [__webpack_require__(34)],

	  propTypes: {
	    weekdays: _react2.default.PropTypes.array.isRequired,
	    locale: _react2.default.PropTypes.string.isRequired,
	    moment: _react2.default.PropTypes.func.isRequired,
	    dateFormat: _react2.default.PropTypes.string.isRequired,
	    onSelect: _react2.default.PropTypes.func.isRequired,
	    handleClick: _react2.default.PropTypes.func.isRequired,
	    minDate: _react2.default.PropTypes.object,
	    maxDate: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    weekStart: _react2.default.PropTypes.string.isRequired,
	    showYearDropdown: _react2.default.PropTypes.bool
	  },

	  handleClickOutside: function handleClickOutside(event) {
	    this.props.handleClick(event);
	  },
	  getInitialState: function getInitialState() {
	    return {
	      date: getDateInView(this.props)
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      weekStart: "1"
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this.initializeMomentLocale();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.selected === null) {
	      return;
	    }

	    // When the selected date changed
	    if (nextProps.selected !== this.props.selected) {
	      this.setState({
	        date: nextProps.selected
	      });
	    }
	  },
	  initializeMomentLocale: function initializeMomentLocale() {
	    var weekdays = this.props.weekdays.slice(0);
	    weekdays = weekdays.concat(weekdays.splice(0, this.props.weekStart));

	    this.props.moment.locale(this.props.locale, {
	      week: {
	        dow: this.props.weekStart
	      },
	      weekdaysMin: weekdays
	    });
	  },
	  increaseMonth: function increaseMonth() {
	    this.setState({
	      date: this.state.date.clone().add(1, "month")
	    });
	  },
	  decreaseMonth: function decreaseMonth() {
	    this.setState({
	      date: this.state.date.clone().subtract(1, "month")
	    });
	  },
	  handleDayClick: function handleDayClick(day) {
	    this.props.onSelect(day);
	  },
	  changeYear: function changeYear(year) {
	    this.setState({
	      date: this.state.date.clone().set("year", year)
	    });
	  },
	  header: function header() {
	    return this.props.moment.weekdaysMin().map(function (day, key) {
	      return _react2.default.createElement(
	        "div",
	        { className: "datepicker__day", key: key },
	        day
	      );
	    });
	  },
	  renderCurrentMonth: function renderCurrentMonth() {
	    var classes = ["datepicker__current-month"];
	    if (this.props.showYearDropdown) {
	      classes.push("datepicker__current-month--hasYearDropdown");
	    }
	    return _react2.default.createElement(
	      "div",
	      { className: classes.join(" ") },
	      this.state.date.format(this.props.dateFormat)
	    );
	  },
	  renderYearDropdown: function renderYearDropdown() {
	    if (!this.props.showYearDropdown) {
	      return;
	    }
	    return _react2.default.createElement(_year_dropdown2.default, {
	      onChange: this.changeYear,
	      year: this.state.date.year() });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker", onClick: this.props.handleClick },
	      _react2.default.createElement("div", { className: "datepicker__triangle" }),
	      _react2.default.createElement(
	        "div",
	        { className: "datepicker__header" },
	        _react2.default.createElement("a", { className: "datepicker__navigation datepicker__navigation--previous",
	          onClick: this.decreaseMonth }),
	        this.renderCurrentMonth(),
	        this.renderYearDropdown(),
	        _react2.default.createElement("a", { className: "datepicker__navigation datepicker__navigation--next",
	          onClick: this.increaseMonth }),
	        _react2.default.createElement(
	          "div",
	          null,
	          this.header()
	        )
	      ),
	      _react2.default.createElement(_month2.default, {
	        day: this.state.date,
	        onDayClick: this.handleDayClick,
	        minDate: this.props.minDate,
	        maxDate: this.props.maxDate,
	        excludeDates: this.props.excludeDates,
	        includeDates: this.props.includeDates,
	        filterDate: this.props.filterDate,
	        selected: this.props.selected,
	        startDate: this.props.startDate,
	        endDate: this.props.endDate })
	    );
	  }
	});

	module.exports = Calendar;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _year_dropdown_options = __webpack_require__(33);

	var _year_dropdown_options2 = _interopRequireDefault(_year_dropdown_options);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var YearDropdown = _react2.default.createClass({
	  displayName: "YearDropdown",

	  propTypes: {
	    year: _react2.default.PropTypes.number.isRequired,
	    onChange: _react2.default.PropTypes.func.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      dropdownVisible: false
	    };
	  },
	  renderReadView: function renderReadView() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker__year-read-view", onClick: this.toggleDropdown },
	      _react2.default.createElement(
	        "span",
	        { className: "datepicker__year-read-view--selected-year" },
	        this.props.year
	      ),
	      _react2.default.createElement("span", { className: "datepicker__year-read-view--down-arrow" })
	    );
	  },
	  renderDropdown: function renderDropdown() {
	    return _react2.default.createElement(_year_dropdown_options2.default, {
	      ref: "options",
	      year: this.props.year,
	      onChange: this.onChange,
	      onCancel: this.toggleDropdown });
	  },
	  onChange: function onChange(year) {
	    this.toggleDropdown();
	    if (year === this.props.year) return;
	    this.props.onChange(year);
	  },
	  toggleDropdown: function toggleDropdown() {
	    this.setState({
	      dropdownVisible: !this.state.dropdownVisible
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      null,
	      this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView()
	    );
	  }
	});

	module.exports = YearDropdown;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateYears(year) {
	  var list = [];
	  for (var i = 0; i < 5; i++) {
	    list.push(year - i);
	  }
	  return list;
	}

	var YearDropdownOptions = _react2.default.createClass({
	  displayName: "YearDropdownOptions",

	  mixins: [__webpack_require__(34)],

	  propTypes: {
	    year: _react2.default.PropTypes.number.isRequired,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    onCancel: _react2.default.PropTypes.func.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      yearsList: generateYears(this.props.year)
	    };
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker__year-dropdown" },
	      this.renderOptions()
	    );
	  },
	  renderOptions: function renderOptions() {
	    var _this = this;

	    var selectedYear = this.props.year;
	    var options = this.state.yearsList.map(function (year) {
	      return _react2.default.createElement(
	        "div",
	        { className: "datepicker__year-option",
	          key: year,
	          onClick: _this.onChange.bind(_this, year) },
	        selectedYear === year ? _react2.default.createElement(
	          "span",
	          { className: "datepicker__year-option--selected" },
	          "✓"
	        ) : "",
	        year
	      );
	    });

	    options.unshift(_react2.default.createElement(
	      "div",
	      { className: "datepicker__year-option",
	        ref: "upcoming",
	        key: "upcoming",
	        onClick: this.incrementYears },
	      _react2.default.createElement("a", { className: "datepicker__navigation datepicker__navigation--years datepicker__navigation--years-upcoming" })
	    ));
	    options.push(_react2.default.createElement(
	      "div",
	      { className: "datepicker__year-option",
	        ref: "previous",
	        key: "previous",
	        onClick: this.decrementYears },
	      _react2.default.createElement("a", { className: "datepicker__navigation datepicker__navigation--years datepicker__navigation--years-previous" })
	    ));
	    return options;
	  },
	  onChange: function onChange(year) {
	    this.props.onChange(year);
	  },
	  handleClickOutside: function handleClickOutside() {
	    this.props.onCancel();
	  },
	  shiftYears: function shiftYears(amount) {
	    var years = this.state.yearsList.map(function (year) {
	      return year + amount;
	    });

	    this.setState({
	      yearsList: years
	    });
	  },
	  incrementYears: function incrementYears() {
	    return this.shiftYears(1);
	  },
	  decrementYears: function decrementYears() {
	    return this.shiftYears(-1);
	  }
	});

	module.exports = YearDropdownOptions;

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_34__;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _week = __webpack_require__(36);

	var _week2 = _interopRequireDefault(_week);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Month = _react2.default.createClass({
	  displayName: "Month",

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    onDayClick: _react2.default.PropTypes.func,
	    minDate: _react2.default.PropTypes.object,
	    maxDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    selected: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object,
	    endDate: _react2.default.PropTypes.object
	  },

	  handleDayClick: function handleDayClick(day) {
	    if (this.props.onDayClick) {
	      this.props.onDayClick(day);
	    }
	  },
	  isWeekInMonth: function isWeekInMonth(startOfWeek) {
	    var day = this.props.day;
	    var endOfWeek = startOfWeek.clone().add(6, "days");
	    return startOfWeek.isSame(day, "month") || endOfWeek.isSame(day, "month");
	  },
	  renderWeeks: function renderWeeks() {
	    var _this = this;

	    var startOfMonth = this.props.day.clone().startOf("month").startOf("week");
	    return [0, 1, 2, 3, 4, 5].map(function (offset) {
	      return startOfMonth.clone().add(offset, "weeks");
	    }).filter(function (startOfWeek) {
	      return _this.isWeekInMonth(startOfWeek);
	    }).map(function (startOfWeek, offset) {
	      return _react2.default.createElement(_week2.default, {
	        key: offset,
	        day: startOfWeek,
	        month: _this.props.day.month(),
	        onDayClick: _this.handleDayClick,
	        minDate: _this.props.minDate,
	        maxDate: _this.props.maxDate,
	        excludeDates: _this.props.excludeDates,
	        includeDates: _this.props.includeDates,
	        filterDate: _this.props.filterDate,
	        selected: _this.props.selected,
	        startDate: _this.props.startDate,
	        endDate: _this.props.endDate });
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker__month" },
	      this.renderWeeks()
	    );
	  }
	});

	module.exports = Month;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _day = __webpack_require__(37);

	var _day2 = _interopRequireDefault(_day);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Week = _react2.default.createClass({
	  displayName: "Week",

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    month: _react2.default.PropTypes.number,
	    onDayClick: _react2.default.PropTypes.func,
	    minDate: _react2.default.PropTypes.object,
	    maxDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    selected: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object,
	    endDate: _react2.default.PropTypes.object
	  },

	  handleDayClick: function handleDayClick(day) {
	    if (this.props.onDayClick) {
	      this.props.onDayClick(day);
	    }
	  },
	  renderDays: function renderDays() {
	    var _this = this;

	    var startOfWeek = this.props.day.clone().startOf("week");
	    return [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
	      var day = startOfWeek.clone().add(offset, "days");
	      return _react2.default.createElement(_day2.default, {
	        key: offset,
	        day: day,
	        month: _this.props.month,
	        onClick: _this.handleDayClick.bind(_this, day),
	        minDate: _this.props.minDate,
	        maxDate: _this.props.maxDate,
	        excludeDates: _this.props.excludeDates,
	        includeDates: _this.props.includeDates,
	        filterDate: _this.props.filterDate,
	        selected: _this.props.selected,
	        startDate: _this.props.startDate,
	        endDate: _this.props.endDate });
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: "datepicker__week" },
	      this.renderDays()
	    );
	  }
	});

	module.exports = Week;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _moment = __webpack_require__(26);

	var _moment2 = _interopRequireDefault(_moment);

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(30);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _some = __webpack_require__(38);

	var _some2 = _interopRequireDefault(_some);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Day = _react2.default.createClass({
	  displayName: "Day",

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    month: _react2.default.PropTypes.number,
	    onClick: _react2.default.PropTypes.func,
	    minDate: _react2.default.PropTypes.object,
	    maxDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    includeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    selected: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object,
	    endDate: _react2.default.PropTypes.object
	  },

	  handleClick: function handleClick(event) {
	    if (!this.isDisabled() && this.props.onClick) {
	      this.props.onClick(event);
	    }
	  },
	  isSameDay: function isSameDay(other) {
	    return other && this.props.day.isSame(other, "day");
	  },
	  isDisabled: function isDisabled() {
	    var _this = this;

	    var _props = this.props;
	    var day = _props.day;
	    var minDate = _props.minDate;
	    var maxDate = _props.maxDate;
	    var excludeDates = _props.excludeDates;
	    var includeDates = _props.includeDates;
	    var filterDate = _props.filterDate;

	    return minDate && day.isBefore(minDate, "day") || maxDate && day.isAfter(maxDate, "day") || (0, _some2.default)(excludeDates, function (excludeDate) {
	      return _this.isSameDay(excludeDate);
	    }) || includeDates && !(0, _some2.default)(includeDates, function (includeDate) {
	      return _this.isSameDay(includeDate);
	    }) || filterDate && !filterDate(day.clone());
	  },
	  isInRange: function isInRange() {
	    var _props2 = this.props;
	    var day = _props2.day;
	    var startDate = _props2.startDate;
	    var endDate = _props2.endDate;

	    if (!startDate || !endDate) return false;

	    var before = startDate.clone().startOf("day").subtract(1, "seconds");
	    var after = endDate.clone().startOf("day").add(1, "seconds");
	    return day.clone().startOf("day").isBetween(before, after);
	  },
	  isWeekend: function isWeekend() {
	    var weekday = this.props.day.weekday();
	    return weekday === 5 || weekday === 6;
	  },
	  isOutsideMonth: function isOutsideMonth() {
	    return this.props.month !== undefined && this.props.month !== this.props.day.month();
	  },
	  getClassNames: function getClassNames() {
	    return (0, _classnames2.default)("datepicker__day", {
	      "datepicker__day--disabled": this.isDisabled(),
	      "datepicker__day--selected": this.isSameDay(this.props.selected),
	      "datepicker__day--in-range": this.isInRange(),
	      "datepicker__day--today": this.isSameDay((0, _moment2.default)()),
	      "datepicker__day--weekend": this.isWeekend(),
	      "datepicker__day--outside-month": this.isOutsideMonth()
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      { className: this.getClassNames(), onClick: this.handleClick },
	      this.props.day.date()
	    );
	  }
	});

	module.exports = Day;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(5),
	    baseCallback = __webpack_require__(39),
	    baseSome = __webpack_require__(55),
	    isArray = __webpack_require__(20),
	    isIterateeCall = __webpack_require__(61);

	/**
	 * Checks if `predicate` returns truthy for **any** element of `collection`.
	 * The function returns as soon as it finds a passing value and does not iterate
	 * over the entire collection. The predicate is bound to `thisArg` and invoked
	 * with three arguments: (value, index|key, collection).
	 *
	 * If a property name is provided for `predicate` the created `_.property`
	 * style callback returns the property value of the given element.
	 *
	 * If a value is also provided for `thisArg` the created `_.matchesProperty`
	 * style callback returns `true` for elements that have a matching property
	 * value, else `false`.
	 *
	 * If an object is provided for `predicate` the created `_.matches` style
	 * callback returns `true` for elements that have the properties of the given
	 * object, else `false`.
	 *
	 * @static
	 * @memberOf _
	 * @alias any
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked
	 *  per iteration.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 * @example
	 *
	 * _.some([null, 0, 'yes', false], Boolean);
	 * // => true
	 *
	 * var users = [
	 *   { 'user': 'barney', 'active': true },
	 *   { 'user': 'fred',   'active': false }
	 * ];
	 *
	 * // using the `_.matches` callback shorthand
	 * _.some(users, { 'user': 'barney', 'active': false });
	 * // => false
	 *
	 * // using the `_.matchesProperty` callback shorthand
	 * _.some(users, 'active', false);
	 * // => true
	 *
	 * // using the `_.property` callback shorthand
	 * _.some(users, 'active');
	 * // => true
	 */
	function some(collection, predicate, thisArg) {
	  var func = isArray(collection) ? arraySome : baseSome;
	  if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
	    predicate = undefined;
	  }
	  if (typeof predicate != 'function' || thisArg !== undefined) {
	    predicate = baseCallback(predicate, thisArg, 3);
	  }
	  return func(collection, predicate);
	}

	module.exports = some;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(40),
	    baseMatchesProperty = __webpack_require__(46),
	    bindCallback = __webpack_require__(24),
	    identity = __webpack_require__(25),
	    property = __webpack_require__(53);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined
	      ? func
	      : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined
	    ? property(func)
	    : baseMatchesProperty(func, thisArg);
	}

	module.exports = baseCallback;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(41),
	    getMatchData = __webpack_require__(43),
	    toObject = __webpack_require__(42);

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || (key in toObject(object)));
	    };
	  }
	  return function(object) {
	    return baseIsMatch(object, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(2),
	    toObject = __webpack_require__(42);

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} matchData The propery names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = toObject(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(44),
	    pairs = __webpack_require__(45);

	/**
	 * Gets the propery names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = pairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(8),
	    toObject = __webpack_require__(42);

	/**
	 * Creates a two dimensional array of the key-value pairs for `object`,
	 * e.g. `[[key1, value1], [key2, value2]]`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * _.pairs({ 'barney': 36, 'fred': 40 });
	 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	 */
	function pairs(object) {
	  object = toObject(object);

	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    var key = props[index];
	    result[index] = [key, object[key]];
	  }
	  return result;
	}

	module.exports = pairs;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(47),
	    baseIsEqual = __webpack_require__(2),
	    baseSlice = __webpack_require__(48),
	    isArray = __webpack_require__(20),
	    isKey = __webpack_require__(49),
	    isStrictComparable = __webpack_require__(44),
	    last = __webpack_require__(50),
	    toObject = __webpack_require__(42),
	    toPath = __webpack_require__(51);

	/**
	 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(srcValue),
	      pathKey = (path + '');

	  path = toPath(path);
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === srcValue
	      ? (srcValue !== undefined || (key in object))
	      : baseIsEqual(srcValue, object[key], undefined, true);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(42);

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  start = start == null ? 0 : (+start || 0);
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = (end === undefined || end > length) ? length : (+end || 0);
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(20),
	    toObject = __webpack_require__(42);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || (object != null && value in toObject(object));
	}

	module.exports = isKey;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(52),
	    isArray = __webpack_require__(20);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to property path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = toPath;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(16),
	    basePropertyDeep = __webpack_require__(54),
	    isKey = __webpack_require__(49);

	/**
	 * Creates a function that returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(47),
	    toPath = __webpack_require__(51);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = (path + '');
	  path = toPath(path);
	  return function(object) {
	    return baseGet(object, path, pathKey);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(56);

	/**
	 * The base implementation of `_.some` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function baseSome(collection, predicate) {
	  var result;

	  baseEach(collection, function(value, index, collection) {
	    result = predicate(value, index, collection);
	    return !result;
	  });
	  return !!result;
	}

	module.exports = baseSome;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(57),
	    createBaseEach = __webpack_require__(60);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(58),
	    keys = __webpack_require__(8);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(59);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(42);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(15),
	    isLength = __webpack_require__(17),
	    toObject = __webpack_require__(42);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(14),
	    isIndex = __webpack_require__(21),
	    isObject = __webpack_require__(12);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(29);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(28);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Popover = _react2.default.createClass({
	  displayName: "Popover",

	  propTypes: {
	    attachment: _react2.default.PropTypes.string,
	    targetAttachment: _react2.default.PropTypes.string,
	    targetOffset: _react2.default.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      attachment: "top left",
	      constraints: [{
	        to: "window",
	        attachment: "together"
	      }],
	      targetAttachment: "bottom left",
	      targetOffset: "10px 0"
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    var popoverContainer = document.createElement("span");
	    popoverContainer.className = "datepicker__container";

	    this._popoverElement = popoverContainer;

	    document.querySelector("body").appendChild(this._popoverElement);
	  },
	  componentDidMount: function componentDidMount() {
	    this._renderPopover();
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this._renderPopover();
	  },
	  _popoverComponent: function _popoverComponent() {
	    var className = this.props.className;
	    return _react2.default.createElement(
	      "div",
	      { className: className },
	      this.props.children
	    );
	  },
	  _tetherOptions: function _tetherOptions() {
	    return {
	      element: this._popoverElement,
	      target: this.refs.span.parentElement.querySelector("input"),
	      attachment: this.props.attachment,
	      targetAttachment: this.props.targetAttachment,
	      targetOffset: this.props.targetOffset,
	      optimizations: {
	        moveElement: false // Always moves to <body> anyway!
	      },
	      constraints: this.props.constraints
	    };
	  },
	  _renderPopover: function _renderPopover() {
	    _reactDom2.default.render(this._popoverComponent(), this._popoverElement);

	    if (this._tether != null) {
	      this._tether.setOptions(this._tetherOptions());
	    } else if (window && document) {
	      var Tether = __webpack_require__(63);
	      this._tether = new Tether(this._tetherOptions());
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._tether.destroy();
	    _reactDom2.default.unmountComponentAtNode(this._popoverElement);
	    if (this._popoverElement.parentNode) {
	      this._popoverElement.parentNode.removeChild(this._popoverElement);
	    }
	  },
	  render: function render() {
	    return _react2.default.createElement("span", { ref: "span" });
	  }
	});

	module.exports = Popover;

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_63__;

/***/ }
/******/ ])
});
;