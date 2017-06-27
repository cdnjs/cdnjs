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

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _debounce = __webpack_require__(2);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _reactThemeable = __webpack_require__(4);

	var _reactThemeable2 = _interopRequireDefault(_reactThemeable);

	var _sectionIterator = __webpack_require__(6);

	var _sectionIterator2 = _interopRequireDefault(_sectionIterator);

	var Autosuggest = (function (_Component) {
	  _inherits(Autosuggest, _Component);

	  _createClass(Autosuggest, null, [{
	    key: 'propTypes',
	    value: {
	      value: _react.PropTypes.string, // Controlled value of the selected suggestion
	      defaultValue: _react.PropTypes.string, // Initial value of the text
	      suggestions: _react.PropTypes.func.isRequired, // Function to get the suggestions
	      suggestionRenderer: _react.PropTypes.func, // Function that renders a given suggestion (must be implemented when suggestions are objects)
	      suggestionValue: _react.PropTypes.func, // Function that maps suggestion object to input value (must be implemented when suggestions are objects)
	      showWhen: _react.PropTypes.func, // Function that determines whether to show suggestions or not
	      onSuggestionSelected: _react.PropTypes.func, // This function is called when suggestion is selected via mouse click or Enter
	      onSuggestionFocused: _react.PropTypes.func, // This function is called when suggestion is focused via mouse hover or Up/Down keys
	      onSuggestionUnfocused: _react.PropTypes.func, // This function is called when suggestion is unfocused via mouse hover or Up/Down keys
	      inputAttributes: _react.PropTypes.object, // Attributes to pass to the input field (e.g. { id: 'my-input', className: 'sweet autosuggest' })
	      cache: _react.PropTypes.bool, // Set it to false to disable in-memory caching
	      id: _react.PropTypes.string, // Used in aria-* attributes. If multiple Autosuggest's are rendered on a page, they must have unique ids.
	      scrollBar: _react.PropTypes.bool, // Set it to true when the suggestions container can have a scroll bar
	      theme: _react.PropTypes.object // Custom theme. See: https://github.com/markdalgleish/react-themeable
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
	      cache: true,
	      id: '1',
	      scrollBar: false,
	      theme: {
	        root: 'react-autosuggest',
	        suggestions: 'react-autosuggest__suggestions',
	        suggestion: 'react-autosuggest__suggestion',
	        suggestionIsFocused: 'react-autosuggest__suggestion--focused',
	        section: 'react-autosuggest__suggestions-section',
	        sectionName: 'react-autosuggest__suggestions-section-name',
	        sectionSuggestions: 'react-autosuggest__suggestions-section-suggestions'
	      }
	    },
	    enumerable: true
	  }]);

	  function Autosuggest(props) {
	    _classCallCheck(this, Autosuggest);

	    _get(Object.getPrototypeOf(Autosuggest.prototype), 'constructor', this).call(this);

	    this.cache = {};
	    this.state = {
	      value: props.value || props.defaultValue || '',
	      suggestions: null,
	      focusedSectionIndex: null, // Used when multiple sections are displayed
	      focusedSuggestionIndex: null, // Index within a section
	      valueBeforeUpDown: null // When user interacts using the Up and Down keys,
	      // this field remembers input's value prior to
	      // interaction in order to revert back if ESC hit.
	      // See: http://www.w3.org/TR/wai-aria-practices/#autocomplete
	    };
	    this.isControlledComponent = typeof props.value !== 'undefined';
	    this.suggestionsFn = (0, _debounce2['default'])(props.suggestions, 100);
	    this.onChange = props.inputAttributes.onChange || function () {};
	    this.onFocus = props.inputAttributes.onFocus || function () {};
	    this.onBlur = props.inputAttributes.onBlur || function () {};
	    this.lastSuggestionsInputValue = null; // Helps to deal with delayed requests
	    this.justUnfocused = false; // Helps to avoid calling onSuggestionUnfocused
	    // twice when mouse is moving between suggestions
	    this.justClickedOnSuggestion = false; // Helps not to call inputAttributes.onBlur
	    // and showSuggestions() when suggestion is clicked.
	    // Also helps not to call handleValueChange() in
	    // componentWillReceiveProps() when suggestion is clicked.
	    this.justPressedUpDown = false; // Helps not to call handleValueChange() in
	    // componentWillReceiveProps() when Up or Down is pressed.
	    this.justPressedEsc = false; // Helps not to call handleValueChange() in
	    // componentWillReceiveProps() when ESC is pressed.
	    this.onInputChange = this.onInputChange.bind(this);
	    this.onInputKeyDown = this.onInputKeyDown.bind(this);
	    this.onInputFocus = this.onInputFocus.bind(this);
	    this.onInputBlur = this.onInputBlur.bind(this);
	  }

	  _createClass(Autosuggest, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.isControlledComponent) {
	        var inputValue = this.refs.input.value;

	        if (nextProps.value !== inputValue && !this.justClickedOnSuggestion && !this.justPressedUpDown && !this.justPressedEsc) {
	          this.handleValueChange(nextProps.value);
	        }
	      }
	    }
	  }, {
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
	      } else if (this.props.cache && this.cache[cacheKey]) {
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

	            if (_this.props.cache) {
	              _this.cache[cacheKey] = suggestions;
	            }

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
	    key: 'scrollToElement',
	    value: function scrollToElement(container, element, alignTo) {
	      if (alignTo === 'bottom') {
	        var scrollDelta = element.offsetTop + element.offsetHeight - container.scrollTop - container.offsetHeight;

	        if (scrollDelta > 0) {
	          container.scrollTop += scrollDelta;
	        }
	      } else {
	        var scrollDelta = container.scrollTop - element.offsetTop;

	        if (scrollDelta > 0) {
	          container.scrollTop -= scrollDelta;
	        }
	      }
	    }
	  }, {
	    key: 'scrollToSuggestion',
	    value: function scrollToSuggestion(direction, sectionIndex, suggestionIndex) {
	      var alignTo = direction === 'down' ? 'bottom' : 'top';

	      if (suggestionIndex === null) {
	        if (direction === 'down') {
	          alignTo = 'top';

	          var _sectionIterator$next = _sectionIterator2['default'].next([null, null]);

	          var _sectionIterator$next2 = _slicedToArray(_sectionIterator$next, 2);

	          sectionIndex = _sectionIterator$next2[0];
	          suggestionIndex = _sectionIterator$next2[1];
	        } else {
	          return;
	        }
	      } else {
	        if (_sectionIterator2['default'].isLast([sectionIndex, suggestionIndex]) && direction === 'up') {
	          alignTo = 'bottom';
	        }
	      }

	      var suggestions = this.refs.suggestions;
	      var suggestionRef = this.getSuggestionRef(sectionIndex, suggestionIndex);
	      var suggestion = this.refs[suggestionRef];

	      this.scrollToElement(suggestions, suggestion, alignTo);
	    }
	  }, {
	    key: 'focusOnSuggestionUsingKeyboard',
	    value: function focusOnSuggestionUsingKeyboard(direction, suggestionPosition) {
	      var _this2 = this;

	      var _suggestionPosition = _slicedToArray(suggestionPosition, 2);

	      var sectionIndex = _suggestionPosition[0];
	      var suggestionIndex = _suggestionPosition[1];

	      var newState = {
	        focusedSectionIndex: sectionIndex,
	        focusedSuggestionIndex: suggestionIndex,
	        value: suggestionIndex === null ? this.state.valueBeforeUpDown : this.getSuggestionValue(sectionIndex, suggestionIndex)
	      };

	      this.justPressedUpDown = true;

	      // When users starts to interact with Up/Down keys, remember input's value.
	      if (this.state.valueBeforeUpDown === null) {
	        newState.valueBeforeUpDown = this.state.value;
	      }

	      if (suggestionIndex === null) {
	        this.onSuggestionUnfocused();
	      } else {
	        this.onSuggestionFocused(sectionIndex, suggestionIndex);
	      }

	      if (this.props.scrollBar) {
	        this.scrollToSuggestion(direction, sectionIndex, suggestionIndex);
	      }

	      if (newState.value !== this.state.value) {
	        this.onChange(newState.value);
	      }

	      this.setState(newState);

	      setTimeout(function () {
	        return _this2.justPressedUpDown = false;
	      });
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
	      this.handleValueChange(newValue);
	      this.showSuggestions(newValue);
	    }
	  }, {
	    key: 'handleValueChange',
	    value: function handleValueChange(newValue) {
	      if (newValue !== this.state.value) {
	        this.onChange(newValue);
	        this.setState({
	          value: newValue
	        });
	      }
	    }
	  }, {
	    key: 'onInputKeyDown',
	    value: function onInputKeyDown(event) {
	      var _this3 = this;

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
	          this.justPressedEsc = true;

	          if (typeof newState.value === 'string' && newState.value !== this.state.value) {
	            this.onChange(newState.value);
	          }

	          this.setState(newState);

	          setTimeout(function () {
	            return _this3.justPressedEsc = false;
	          });
	          break;

	        case 38:
	          // Up
	          if (this.state.suggestions === null) {
	            this.showSuggestions(this.state.value);
	          } else {
	            this.focusOnSuggestionUsingKeyboard('up', _sectionIterator2['default'].prev([this.state.focusedSectionIndex, this.state.focusedSuggestionIndex]));
	          }

	          event.preventDefault(); // Prevent the cursor from jumping to input's start
	          break;

	        case 40:
	          // Down
	          if (this.state.suggestions === null) {
	            this.showSuggestions(this.state.value);
	          } else {
	            this.focusOnSuggestionUsingKeyboard('down', _sectionIterator2['default'].next([this.state.focusedSectionIndex, this.state.focusedSuggestionIndex]));
	          }

	          break;
	      }
	    }
	  }, {
	    key: 'onInputFocus',
	    value: function onInputFocus(event) {
	      if (!this.justClickedOnSuggestion) {
	        this.showSuggestions(this.state.value);
	      }

	      this.onFocus(event);
	    }
	  }, {
	    key: 'onInputBlur',
	    value: function onInputBlur(event) {
	      this.onSuggestionUnfocused();

	      if (!this.justClickedOnSuggestion) {
	        this.onBlur(event);
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
	      var _this4 = this;

	      var suggestionValue = this.getSuggestionValue(sectionIndex, suggestionIndex);

	      this.justClickedOnSuggestion = true;

	      this.onSuggestionSelected(event);

	      if (suggestionValue !== this.state.value) {
	        this.onChange(suggestionValue);
	      }

	      this.setState({
	        value: suggestionValue,
	        suggestions: null,
	        focusedSectionIndex: null,
	        focusedSuggestionIndex: null,
	        valueBeforeUpDown: null
	      }, function () {
	        // This code executes after the component is re-rendered
	        setTimeout(function () {
	          _this4.refs.input.focus();
	          _this4.justClickedOnSuggestion = false;
	        });
	      });
	    }
	  }, {
	    key: 'getSuggestionId',
	    value: function getSuggestionId(sectionIndex, suggestionIndex) {
	      if (suggestionIndex === null) {
	        return null;
	      }

	      return 'react-autosuggest-' + this.props.id + '-' + this.getSuggestionRef(sectionIndex, suggestionIndex);
	    }
	  }, {
	    key: 'getSuggestionRef',
	    value: function getSuggestionRef(sectionIndex, suggestionIndex) {
	      return 'suggestion-' + (sectionIndex === null ? '' : sectionIndex) + '-' + suggestionIndex;
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
	    value: function renderSuggestionsList(theme, suggestions, sectionIndex) {
	      var _this5 = this;

	      return suggestions.map(function (suggestion, suggestionIndex) {
	        var styles = theme(suggestionIndex, 'suggestion', sectionIndex === _this5.state.focusedSectionIndex && suggestionIndex === _this5.state.focusedSuggestionIndex && 'suggestionIsFocused');
	        var suggestionRef = _this5.getSuggestionRef(sectionIndex, suggestionIndex);

	        return _react2['default'].createElement(
	          'li',
	          _extends({ id: _this5.getSuggestionId(sectionIndex, suggestionIndex)
	          }, styles, {
	            role: 'option',
	            ref: suggestionRef,
	            key: suggestionRef,
	            onMouseEnter: function () {
	              return _this5.onSuggestionMouseEnter(sectionIndex, suggestionIndex);
	            },
	            onMouseLeave: function () {
	              return _this5.onSuggestionMouseLeave(sectionIndex, suggestionIndex);
	            },
	            onMouseDown: function (event) {
	              return _this5.onSuggestionMouseDown(sectionIndex, suggestionIndex, event);
	            } }),
	          _this5.renderSuggestionContent(suggestion)
	        );
	      });
	    }
	  }, {
	    key: 'renderSuggestions',
	    value: function renderSuggestions(theme) {
	      var _this6 = this;

	      if (this.state.suggestions === null) {
	        return null;
	      }

	      if (this.isMultipleSections(this.state.suggestions)) {
	        return _react2['default'].createElement(
	          'div',
	          _extends({ id: 'react-autosuggest-' + this.props.id
	          }, theme('suggestions', 'suggestions'), {
	            ref: 'suggestions',
	            role: 'listbox' }),
	          this.state.suggestions.map(function (section, sectionIndex) {
	            var sectionName = section.sectionName ? _react2['default'].createElement(
	              'div',
	              theme('sectionName-' + sectionIndex, 'sectionName'),
	              section.sectionName
	            ) : null;

	            return section.suggestions.length === 0 ? null : _react2['default'].createElement(
	              'div',
	              _extends({}, theme('section-' + sectionIndex, 'section'), {
	                key: 'section-' + sectionIndex }),
	              sectionName,
	              _react2['default'].createElement(
	                'ul',
	                theme('sectionSuggestions-' + sectionIndex, 'sectionSuggestions'),
	                _this6.renderSuggestionsList(theme, section.suggestions, sectionIndex)
	              )
	            );
	          })
	        );
	      }

	      return _react2['default'].createElement(
	        'ul',
	        _extends({ id: 'react-autosuggest-' + this.props.id
	        }, theme('suggestions', 'suggestions'), {
	          ref: 'suggestions',
	          role: 'listbox' }),
	        this.renderSuggestionsList(theme, this.state.suggestions, null)
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var id = _props.id;
	      var inputAttributes = _props.inputAttributes;
	      var _state = this.state;
	      var value = _state.value;
	      var suggestions = _state.suggestions;
	      var focusedSectionIndex = _state.focusedSectionIndex;
	      var focusedSuggestionIndex = _state.focusedSuggestionIndex;

	      var theme = (0, _reactThemeable2['default'])(this.props.theme);
	      var ariaActivedescendant = this.getSuggestionId(focusedSectionIndex, focusedSuggestionIndex);

	      return _react2['default'].createElement(
	        'div',
	        theme('root', 'root'),
	        _react2['default'].createElement('input', _extends({}, inputAttributes, {
	          type: inputAttributes.type || 'text',
	          value: value,
	          autoComplete: 'off',
	          role: 'combobox',
	          'aria-autocomplete': 'list',
	          'aria-owns': 'react-autosuggest-' + id,
	          'aria-expanded': suggestions !== null,
	          'aria-activedescendant': ariaActivedescendant,
	          ref: 'input',
	          onChange: this.onInputChange,
	          onKeyDown: this.onInputKeyDown,
	          onFocus: this.onInputFocus,
	          onBlur: this.onInputBlur })),
	        this.renderSuggestions(theme)
	      );
	    }
	  }]);

	  return Autosuggest;
	})(_react.Component);

	exports['default'] = Autosuggest;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

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
/***/ function(module, exports) {

	module.exports = Date.now || now

	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _objectAssign = __webpack_require__(5);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var truthy = function truthy(x) {
	  return x;
	};

	exports['default'] = function (theme) {
	  return function (key) {
	    for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      names[_key - 1] = arguments[_key];
	    }

	    var styles = names.map(function (name) {
	      return theme[name];
	    }).filter(truthy);

	    return typeof styles[0] === 'string' ? { key: key, className: styles.join(' ') } : { key: key, style: _objectAssign2['default'].apply(undefined, [{}].concat(_toConsumableArray(styles))) };
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function ownEnumerableKeys(obj) {
		var keys = Object.getOwnPropertyNames(obj);

		if (Object.getOwnPropertySymbols) {
			keys = keys.concat(Object.getOwnPropertySymbols(obj));
		}

		return keys.filter(function (key) {
			return propIsEnumerable.call(obj, key);
		});
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = ownEnumerableKeys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

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

	function isLast(position) {
	  return next(position)[1] === null;
	}

	exports['default'] = {
	  setData: setData,
	  next: next,
	  prev: prev,
	  isLast: isLast
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;