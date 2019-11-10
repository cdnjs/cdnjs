(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Autosuggest"] = factory(require("React"));
	else
		root["Autosuggest"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _debounce = __webpack_require__(2);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _sectionIterator = __webpack_require__(5);

	var _sectionIterator2 = _interopRequireDefault(_sectionIterator);

	var Autosuggest = (function (_Component) {
	  function Autosuggest(props) {
	    _classCallCheck(this, Autosuggest);

	    _get(Object.getPrototypeOf(Autosuggest.prototype), 'constructor', this).call(this);

	    this.cache = {};
	    this.state = {
	      value: props.inputAttributes.value || '',
	      suggestions: null,
	      focusedSectionIndex: null, // Used when multiple sections are displayed
	      focusedSuggestionIndex: null, // Index within a section
	      valueBeforeUpDown: null // When user interacts using the Up and Down keys,
	      // this field remembers input's value prior to
	      // interaction in order to revert back if ESC hit.
	      // See: http://www.w3.org/TR/wai-aria-practices/#autocomplete
	    };
	    this.suggestionsFn = (0, _debounce2['default'])(props.suggestions, 100);
	    this.onChange = props.inputAttributes.onChange || function () {};
	    this.onBlur = props.inputAttributes.onBlur || function () {};
	    this.lastSuggestionsInputValue = null; // Helps to deal with delayed requests
	    this.justUnfocused = false; // Helps to avoid calling onSuggestionUnfocused
	    // twice when mouse is moving between suggestions
	    this.justClickedOnSuggestion = false; // Helps not to call inputAttributes.onBlur
	    // when suggestion is clicked
	  }

	  _inherits(Autosuggest, _Component);

	  _createClass(Autosuggest, [{
	    key: 'resetSectionIterator',
	    value: function resetSectionIterator(suggestions) {
	      if (this.isMultipleSections(suggestions)) {
	        _sectionIterator2['default'].setData(suggestions.map(function (suggestion) {
	          return suggestion.suggestions.length;
	        }));
	      } else {
	        _sectionIterator2['default'].setData(suggestions === null ? [] : suggestions.length);
	      }
	    }
	  }, {
	    key: 'isMultipleSections',
	    value: function isMultipleSections(suggestions) {
	      return suggestions !== null && suggestions.length > 0 && typeof suggestions[0].suggestions !== 'undefined';
	    }
	  }, {
	    key: 'setSuggestionsState',
	    value: function setSuggestionsState(suggestions) {
	      this.resetSectionIterator(suggestions);
	      this.setState({
	        suggestions: suggestions,
	        focusedSectionIndex: null,
	        focusedSuggestionIndex: null,
	        valueBeforeUpDown: null
	      });
	    }
	  }, {
	    key: 'suggestionsExist',
	    value: function suggestionsExist(suggestions) {
	      if (this.isMultipleSections(suggestions)) {
	        return suggestions.some(function (section) {
	          return section.suggestions.length > 0;
	        });
	      }

	      return suggestions !== null && suggestions.length > 0;
	    }
	  }, {
	    key: 'showSuggestions',
	    value: function showSuggestions(input) {
	      var _this = this;

	      var cacheKey = input.toLowerCase();

	      this.lastSuggestionsInputValue = input;

	      if (!this.props.showWhen(input)) {
	        this.setSuggestionsState(null);
	      } else if (this.cache[cacheKey]) {
	        this.setSuggestionsState(this.cache[cacheKey]);
	      } else {
	        this.suggestionsFn(input, function (error, suggestions) {
	          // If input value changed, suggestions are not relevant anymore.
	          if (_this.lastSuggestionsInputValue !== input) {
	            return;
	          }

	          if (error) {
	            throw error;
	          } else {
	            if (!_this.suggestionsExist(suggestions)) {
	              suggestions = null;
	            }

	            _this.cache[cacheKey] = suggestions;
	            _this.setSuggestionsState(suggestions);
	          }
	        });
	      }
	    }
	  }, {
	    key: 'suggestionIsFocused',
	    value: function suggestionIsFocused() {
	      return this.state.focusedSuggestionIndex !== null;
	    }
	  }, {
	    key: 'getSuggestion',
	    value: function getSuggestion(sectionIndex, suggestionIndex) {
	      if (this.isMultipleSections(this.state.suggestions)) {
	        return this.state.suggestions[sectionIndex].suggestions[suggestionIndex];
	      }

	      return this.state.suggestions[suggestionIndex];
	    }
	  }, {
	    key: 'getFocusedSuggestion',
	    value: function getFocusedSuggestion() {
	      if (this.suggestionIsFocused()) {
	        return this.getSuggestion(this.state.focusedSectionIndex, this.state.focusedSuggestionIndex);
	      }

	      return null;
	    }
	  }, {
	    key: 'getSuggestionValue',
	    value: function getSuggestionValue(sectionIndex, suggestionIndex) {
	      var suggestion = this.getSuggestion(sectionIndex, suggestionIndex);

	      if (typeof suggestion === 'object') {
	        if (this.props.suggestionValue) {
	          return this.props.suggestionValue(suggestion);
	        }

	        throw new Error('When <suggestion> is an object, you must implement the suggestionValue() function to specify how to set input\'s value when suggestion selected.');
	      } else {
	        return suggestion.toString();
	      }
	    }
	  }, {
	    key: 'onSuggestionUnfocused',
	    value: function onSuggestionUnfocused() {
	      var focusedSuggestion = this.getFocusedSuggestion();

	      if (focusedSuggestion !== null && !this.justUnfocused) {
	        this.props.onSuggestionUnfocused(focusedSuggestion);
	        this.justUnfocused = true;
	      }
	    }
	  }, {
	    key: 'onSuggestionFocused',
	    value: function onSuggestionFocused(sectionIndex, suggestionIndex) {
	      this.onSuggestionUnfocused();

	      var suggestion = this.getSuggestion(sectionIndex, suggestionIndex);

	      this.props.onSuggestionFocused(suggestion);
	      this.justUnfocused = false;
	    }
	  }, {
	    key: 'focusOnSuggestionUsingKeyboard',
	    value: function focusOnSuggestionUsingKeyboard(suggestionPosition) {
	      var _suggestionPosition = _slicedToArray(suggestionPosition, 2);

	      var sectionIndex = _suggestionPosition[0];
	      var suggestionIndex = _suggestionPosition[1];

	      var newState = {
	        focusedSectionIndex: sectionIndex,
	        focusedSuggestionIndex: suggestionIndex,
	        value: suggestionIndex === null ? this.state.valueBeforeUpDown : this.getSuggestionValue(sectionIndex, suggestionIndex)
	      };

	      // When users starts to interact with Up/Down keys, remember input's value.
	      if (this.state.valueBeforeUpDown === null) {
	        newState.valueBeforeUpDown = this.state.value;
	      }

	      if (suggestionIndex === null) {
	        this.onSuggestionUnfocused();
	      } else {
	        this.onSuggestionFocused(sectionIndex, suggestionIndex);
	      }

	      this.onChange(newState.value);
	      this.setState(newState);
	    }
	  }, {
	    key: 'onSuggestionSelected',
	    value: function onSuggestionSelected(event) {
	      var focusedSuggestion = this.getFocusedSuggestion();

	      this.props.onSuggestionUnfocused(focusedSuggestion);
	      this.props.onSuggestionSelected(focusedSuggestion, event);
	    }
	  }, {
	    key: 'onInputChange',
	    value: function onInputChange(event) {
	      var newValue = event.target.value;

	      this.onSuggestionUnfocused();
	      this.onChange(newValue);

	      this.setState({
	        value: newValue,
	        valueBeforeUpDown: null
	      });

	      this.showSuggestions(newValue);
	    }
	  }, {
	    key: 'onInputKeyDown',
	    value: function onInputKeyDown(event) {
	      var newState = undefined;

	      switch (event.keyCode) {
	        case 13:
	          // Enter
	          if (this.state.valueBeforeUpDown !== null && this.suggestionIsFocused()) {
	            this.onSuggestionSelected(event);
	          }

	          this.setSuggestionsState(null);
	          break;

	        case 27:
	          // ESC
	          newState = {
	            suggestions: null,
	            focusedSectionIndex: null,
	            focusedSuggestionIndex: null,
	            valueBeforeUpDown: null
	          };

	          if (this.state.valueBeforeUpDown !== null) {
	            newState.value = this.state.valueBeforeUpDown;
	          } else if (this.state.suggestions === null) {
	            newState.value = '';
	          }

	          this.onSuggestionUnfocused();

	          if (typeof newState.value === 'string' && newState.value !== this.state.value) {
	            this.onChange(newState.value);
	          }

	          this.setState(newState);
	          break;

	        case 38:
	          // Up
	          if (this.state.suggestions === null) {
	            this.showSuggestions(this.state.value);
	          } else {
	            this.focusOnSuggestionUsingKeyboard(_sectionIterator2['default'].prev([this.state.focusedSectionIndex, this.state.focusedSuggestionIndex]));
	          }

	          event.preventDefault(); // Prevent the cursor from jumping to input's start
	          break;

	        case 40:
	          // Down
	          if (this.state.suggestions === null) {
	            this.showSuggestions(this.state.value);
	          } else {
	            this.focusOnSuggestionUsingKeyboard(_sectionIterator2['default'].next([this.state.focusedSectionIndex, this.state.focusedSuggestionIndex]));
	          }

	          break;
	      }
	    }
	  }, {
	    key: 'onInputBlur',
	    value: function onInputBlur() {
	      this.onSuggestionUnfocused();

	      if (!this.justClickedOnSuggestion) {
	        this.onBlur();
	      }

	      this.setSuggestionsState(null);
	    }
	  }, {
	    key: 'isSuggestionFocused',
	    value: function isSuggestionFocused(sectionIndex, suggestionIndex) {
	      return sectionIndex === this.state.focusedSectionIndex && suggestionIndex === this.state.focusedSuggestionIndex;
	    }
	  }, {
	    key: 'onSuggestionMouseEnter',
	    value: function onSuggestionMouseEnter(sectionIndex, suggestionIndex) {
	      if (!this.isSuggestionFocused(sectionIndex, suggestionIndex)) {
	        this.onSuggestionFocused(sectionIndex, suggestionIndex);
	      }

	      this.setState({
	        focusedSectionIndex: sectionIndex,
	        focusedSuggestionIndex: suggestionIndex
	      });
	    }
	  }, {
	    key: 'onSuggestionMouseLeave',
	    value: function onSuggestionMouseLeave(sectionIndex, suggestionIndex) {
	      if (this.isSuggestionFocused(sectionIndex, suggestionIndex)) {
	        this.onSuggestionUnfocused();
	      }

	      this.setState({
	        focusedSectionIndex: null,
	        focusedSuggestionIndex: null
	      });
	    }
	  }, {
	    key: 'onSuggestionMouseDown',
	    value: function onSuggestionMouseDown(sectionIndex, suggestionIndex, event) {
	      var _this2 = this;

	      var suggestionValue = this.getSuggestionValue(sectionIndex, suggestionIndex);

	      this.justClickedOnSuggestion = true;

	      this.onSuggestionSelected(event);
	      this.onChange(suggestionValue);
	      this.setState({
	        value: suggestionValue,
	        suggestions: null,
	        focusedSectionIndex: null,
	        focusedSuggestionIndex: null,
	        valueBeforeUpDown: null
	      }, function () {
	        // This code executes after the component is re-rendered
	        setTimeout(function () {
	          (0, _react.findDOMNode)(_this2.refs.input).focus();
	          _this2.justClickedOnSuggestion = false;
	        });
	      });
	    }
	  }, {
	    key: 'getSuggestionId',
	    value: function getSuggestionId(sectionIndex, suggestionIndex) {
	      if (suggestionIndex === null) {
	        return null;
	      }

	      return 'react-autosuggest-' + this.props.id + '-suggestion-' + (sectionIndex === null ? '' : sectionIndex) + '-' + suggestionIndex;
	    }
	  }, {
	    key: 'renderSuggestionContent',
	    value: function renderSuggestionContent(suggestion) {
	      if (this.props.suggestionRenderer) {
	        return this.props.suggestionRenderer(suggestion, this.state.valueBeforeUpDown || this.state.value);
	      }

	      if (typeof suggestion === 'object') {
	        throw new Error('When <suggestion> is an object, you must implement the suggestionRenderer() function to specify how to render it.');
	      } else {
	        return suggestion.toString();
	      }
	    }
	  }, {
	    key: 'renderSuggestionsList',
	    value: function renderSuggestionsList(suggestions, sectionIndex) {
	      var _this3 = this;

	      return suggestions.map(function (suggestion, suggestionIndex) {
	        var classes = (0, _classnames2['default'])({
	          'react-autosuggest__suggestion': true,
	          'react-autosuggest__suggestion--focused': sectionIndex === _this3.state.focusedSectionIndex && suggestionIndex === _this3.state.focusedSuggestionIndex
	        });
	        var suggestionKey = 'suggestion-' + (sectionIndex === null ? '' : sectionIndex) + '-' + suggestionIndex;

	        return _react2['default'].createElement(
	          'li',
	          { id: _this3.getSuggestionId(sectionIndex, suggestionIndex),
	            className: classes,
	            role: 'option',
	            key: suggestionKey,
	            onMouseEnter: function () {
	              return _this3.onSuggestionMouseEnter(sectionIndex, suggestionIndex);
	            },
	            onMouseLeave: function () {
	              return _this3.onSuggestionMouseLeave(sectionIndex, suggestionIndex);
	            },
	            onMouseDown: function (event) {
	              return _this3.onSuggestionMouseDown(sectionIndex, suggestionIndex, event);
	            } },
	          _this3.renderSuggestionContent(suggestion)
	        );
	      });
	    }
	  }, {
	    key: 'renderSuggestions',
	    value: function renderSuggestions() {
	      var _this4 = this;

	      if (this.state.value === '' || this.state.suggestions === null) {
	        return null;
	      }

	      if (this.isMultipleSections(this.state.suggestions)) {
	        return _react2['default'].createElement(
	          'div',
	          { id: 'react-autosuggest-' + this.props.id,
	            className: 'react-autosuggest__suggestions',
	            role: 'listbox' },
	          this.state.suggestions.map(function (section, sectionIndex) {
	            var sectionName = section.sectionName ? _react2['default'].createElement(
	              'div',
	              { className: 'react-autosuggest__suggestions-section-name' },
	              section.sectionName
	            ) : null;

	            return section.suggestions.length === 0 ? null : _react2['default'].createElement(
	              'div',
	              { className: 'react-autosuggest__suggestions-section',
	                key: 'section-' + sectionIndex },
	              sectionName,
	              _react2['default'].createElement(
	                'ul',
	                { className: 'react-autosuggest__suggestions-section-suggestions' },
	                _this4.renderSuggestionsList(section.suggestions, sectionIndex)
	              )
	            );
	          })
	        );
	      }

	      return _react2['default'].createElement(
	        'ul',
	        { id: 'react-autosuggest-' + this.props.id,
	          className: 'react-autosuggest__suggestions',
	          role: 'listbox' },
	        this.renderSuggestionsList(this.state.suggestions, null)
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var ariaActivedescendant = this.getSuggestionId(this.state.focusedSectionIndex, this.state.focusedSuggestionIndex);

	      return _react2['default'].createElement(
	        'div',
	        { className: 'react-autosuggest' },
	        _react2['default'].createElement('input', _extends({}, this.props.inputAttributes, {
	          type: 'text',
	          value: this.state.value,
	          autoComplete: 'off',
	          role: 'combobox',
	          'aria-autocomplete': 'list',
	          'aria-owns': 'react-autosuggest-' + this.props.id,
	          'aria-expanded': this.state.suggestions !== null,
	          'aria-activedescendant': ariaActivedescendant,
	          ref: 'input',
	          onChange: this.onInputChange.bind(this),
	          onKeyDown: this.onInputKeyDown.bind(this),
	          onBlur: this.onInputBlur.bind(this) })),
	        this.renderSuggestions()
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    // eslint-disable-line no-shadow
	    value: {
	      suggestions: _react.PropTypes.func.isRequired, // Function to get the suggestions
	      suggestionRenderer: _react.PropTypes.func, // Function that renders a given suggestion (must be implemented when suggestions are objects)
	      suggestionValue: _react.PropTypes.func, // Function that maps suggestion object to input value (must be implemented when suggestions are objects)
	      showWhen: _react.PropTypes.func, // Function that determines whether to show suggestions or not
	      onSuggestionSelected: _react.PropTypes.func, // This function is called when suggestion is selected via mouse click or Enter
	      onSuggestionFocused: _react.PropTypes.func, // This function is called when suggestion is focused via mouse hover or Up/Down keys
	      onSuggestionUnfocused: _react.PropTypes.func, // This function is called when suggestion is unfocused via mouse hover or Up/Down keys
	      inputAttributes: _react.PropTypes.object, // Attributes to pass to the input field (e.g. { id: 'my-input', className: 'sweet autosuggest' })
	      id: _react.PropTypes.string // Used in aria-* attributes. If multiple Autosuggest's are rendered on a page, they must have unique ids.
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      showWhen: function showWhen(input) {
	        return input.trim().length > 0;
	      },
	      onSuggestionSelected: function onSuggestionSelected() {},
	      onSuggestionFocused: function onSuggestionFocused() {},
	      onSuggestionUnfocused: function onSuggestionUnfocused() {},
	      inputAttributes: {},
	      id: '1'
	    },
	    enumerable: true
	  }]);

	  return Autosuggest;
	})(_react.Component);

	exports['default'] = Autosuggest;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var now = __webpack_require__(3);

	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * @source underscore.js
	 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
	 * @param {Function} function to wrap
	 * @param {Number} timeout in ms (`100`)
	 * @param {Boolean} whether to execute at the beginning (`false`)
	 * @api public
	 */

	module.exports = function debounce(func, wait, immediate){
	  var timeout, args, context, timestamp, result;
	  if (null == wait) wait = 100;

	  function later() {
	    var last = now() - timestamp;

	    if (last < wait && last > 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    }
	  };

	  return function debounced() {
	    context = this;
	    args = arguments;
	    timestamp = now();
	    var callNow = immediate && !timeout;
	    if (!timeout) timeout = setTimeout(later, wait);
	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }

	    return result;
	  };
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Date.now || now

	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	function classNames () {
		'use strict';

		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if ('string' === argType || 'number' === argType) {
				classes += ' ' + arg;

			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);

			} else if ('object' === argType) {
				for (var key in arg) {
					if (arg.hasOwnProperty(key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	// safely export classNames for node / browserify
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}

	/* global define */
	// safely export classNames for RequireJS
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

	var data = undefined,
	    multipleSections = undefined;

	function setData(newData) {
	  data = newData;
	  multipleSections = typeof data === 'object';
	}

	function nextNonEmptySectionIndex(sectionIndex) {
	  if (sectionIndex === null) {
	    sectionIndex = 0;
	  } else {
	    sectionIndex++;
	  }

	  while (sectionIndex < data.length && data[sectionIndex] === 0) {
	    sectionIndex++;
	  }

	  return sectionIndex === data.length ? null : sectionIndex;
	}

	function prevNonEmptySectionIndex(sectionIndex) {
	  if (sectionIndex === null) {
	    sectionIndex = data.length - 1;
	  } else {
	    sectionIndex--;
	  }

	  while (sectionIndex >= 0 && data[sectionIndex] === 0) {
	    sectionIndex--;
	  }

	  return sectionIndex === -1 ? null : sectionIndex;
	}

	function next(position) {
	  var _position = _slicedToArray(position, 2);

	  var sectionIndex = _position[0];
	  var itemIndex = _position[1];

	  if (multipleSections) {
	    if (itemIndex === null || itemIndex === data[sectionIndex] - 1) {
	      sectionIndex = nextNonEmptySectionIndex(sectionIndex);

	      if (sectionIndex === null) {
	        return [null, null];
	      }

	      return [sectionIndex, 0];
	    }

	    return [sectionIndex, itemIndex + 1];
	  }

	  if (data === 0 || itemIndex === data - 1) {
	    return [null, null];
	  }

	  if (itemIndex === null) {
	    return [null, 0];
	  }

	  return [null, itemIndex + 1];
	}

	function prev(position) {
	  var _position2 = _slicedToArray(position, 2);

	  var sectionIndex = _position2[0];
	  var itemIndex = _position2[1];

	  if (multipleSections) {
	    if (itemIndex === null || itemIndex === 0) {
	      sectionIndex = prevNonEmptySectionIndex(sectionIndex);

	      if (sectionIndex === null) {
	        return [null, null];
	      }

	      return [sectionIndex, data[sectionIndex] - 1];
	    }

	    return [sectionIndex, itemIndex - 1];
	  }

	  if (data === 0 || itemIndex === 0) {
	    return [null, null];
	  }

	  if (itemIndex === null) {
	    return [null, data - 1];
	  }

	  return [null, itemIndex - 1];
	}

	exports['default'] = {
	  setData: setData,
	  next: next,
	  prev: prev
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;