/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TokenizerInput = __webpack_require__(11);
	
	var _TokenizerInput2 = _interopRequireDefault(_TokenizerInput);
	
	var _TypeaheadInput = __webpack_require__(12);
	
	var _TypeaheadInput2 = _interopRequireDefault(_TypeaheadInput);
	
	var _TypeaheadMenu = __webpack_require__(13);
	
	var _TypeaheadMenu2 = _interopRequireDefault(_TypeaheadMenu);
	
	var _lodash = __webpack_require__(9);
	
	var _keyCode = __webpack_require__(2);
	
	var _reactOnclickoutside = __webpack_require__(7);
	
	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var PropTypes = _react2['default'].PropTypes;
	
	__webpack_require__(8);
	
	/**
	 * Typeahead
	 */
	var Typeahead = _react2['default'].createClass({
	  displayName: 'Typeahead',
	
	  mixins: [_reactOnclickoutside2['default']],
	
	  propTypes: {
	    defaultSelected: PropTypes.array,
	    /**
	     * Message to display in the menu if there are no valid results.
	     */
	    emptyLabel: PropTypes.string,
	    /**
	     * Specify which option key to use for display. By default, the selector
	     * will use the `label` key.
	     */
	    labelKey: PropTypes.string,
	    maxHeight: PropTypes.number,
	    /**
	     * Whether or not multiple selections are allowed.
	     */
	    multiple: PropTypes.bool,
	    /**
	     * Full set of options, including pre-selected options.
	     */
	    options: PropTypes.array.isRequired,
	    placeholder: PropTypes.string,
	    selected: PropTypes.array
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      defaultSelected: [],
	      labelKey: 'label',
	      multiple: false,
	      selected: []
	    };
	  },
	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var defaultSelected = _props.defaultSelected;
	    var selected = _props.selected;
	
	    return {
	      activeIndex: 0,
	      selected: !(0, _lodash.isEmpty)(defaultSelected) ? defaultSelected : selected,
	      showMenu: false,
	      text: ''
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (!(0, _lodash.isEqual)(this.props.selected, nextProps.selected)) {
	      // If new selections are passed in via props, treat the component as a
	      // controlled input.
	      this.setState({ selected: nextProps.selected });
	    }
	
	    if (this.props.multiple !== nextProps.multiple) {
	      this.setState({ text: '' });
	    }
	  },
	  render: function render() {
	    var _props2 = this.props;
	    var labelKey = _props2.labelKey;
	    var multiple = _props2.multiple;
	    var options = _props2.options;
	    var _state = this.state;
	    var activeIndex = _state.activeIndex;
	    var selected = _state.selected;
	    var text = _state.text;
	
	    // Filter out options that don't match the input string or, if multiple
	    // selections are allowed, that have already been selected.
	
	    var filteredOptions = options.filter(function (option) {
	      return !(option[labelKey].toLowerCase().indexOf(text.toLowerCase()) === -1 || multiple && (0, _lodash.find)(selected, option));
	    });
	
	    var menu = undefined;
	    if (this.state.showMenu) {
	      menu = _react2['default'].createElement(_TypeaheadMenu2['default'], {
	        activeIndex: activeIndex,
	        emptyLabel: this.props.emptyLabel,
	        labelKey: labelKey,
	        maxHeight: this.props.maxHeight,
	        onClick: this._handleAddOption,
	        options: filteredOptions
	      });
	    }
	
	    var InputComponent = _TokenizerInput2['default'];
	
	    if (!multiple) {
	      InputComponent = _TypeaheadInput2['default'];
	      selected = (0, _lodash.head)(selected);
	      text = selected && selected[labelKey] || text;
	    }
	
	    return _react2['default'].createElement('div', {
	      className: 'bootstrap-typeahead open',
	      style: { position: 'relative' } }, _react2['default'].createElement(InputComponent, {
	      filteredOptions: filteredOptions,
	      labelKey: labelKey,
	      onAdd: this._handleAddOption,
	      onChange: this._handleTextChange,
	      onFocus: this._handleFocus,
	      onKeyDown: this._handleKeydown.bind(null, filteredOptions),
	      onRemove: this._handleRemoveOption,
	      placeholder: this.props.placeholder,
	      ref: 'input',
	      selected: selected,
	      text: text
	    }), menu);
	  },
	  _handleFocus: function _handleFocus() {
	    this.setState({ showMenu: true });
	  },
	  _handleTextChange: function _handleTextChange(e) {
	    this.setState({
	      activeIndex: 0,
	      showMenu: true,
	      text: e.target.value
	    });
	  },
	  _handleKeydown: function _handleKeydown(options, e) {
	    var activeIndex = this.state.activeIndex;
	
	    switch (e.keyCode) {
	      case _keyCode.BACKSPACE:
	        // Don't let the browser go back.
	        e.stopPropagation();
	        break;
	      case _keyCode.UP:
	        // Prevent page from scrolling.
	        e.preventDefault();
	
	        activeIndex--;
	        if (activeIndex < 0) {
	          activeIndex = options.length - 1;
	        }
	        this.setState({ activeIndex: activeIndex });
	        break;
	      case _keyCode.DOWN:
	      case _keyCode.TAB:
	        // Prevent page from scrolling.
	        e.preventDefault();
	
	        activeIndex++;
	        if (activeIndex === options.length) {
	          activeIndex = 0;
	        }
	        this.setState({ activeIndex: activeIndex });
	        break;
	      case _keyCode.ESC:
	        // Prevent things like unintentionally closing dialogs.
	        e.stopPropagation();
	        this._hideDropdown();
	        break;
	      case _keyCode.RETURN:
	        var selected = options[activeIndex];
	        selected && this._handleAddOption(selected);
	        break;
	    }
	  },
	  _handleAddOption: function _handleAddOption(selectedOption) {
	    var _props3 = this.props;
	    var multiple = _props3.multiple;
	    var labelKey = _props3.labelKey;
	    var onChange = _props3.onChange;
	
	    var selected = undefined;
	    var text = undefined;
	
	    if (multiple) {
	      // If multiple selections are allowed, add the new selection to the
	      // existing selections.
	      selected = this.state.selected.concat(selectedOption);
	      text = '';
	    } else {
	      // If only a single selection is allowed, replace the existing selection
	      // with the new one.
	      selected = [selectedOption];
	      text = selectedOption[labelKey];
	    }
	
	    this.setState({
	      activeIndex: 0,
	      selected: selected,
	      showMenu: false,
	      text: text
	    });
	
	    onChange && onChange(selected);
	  },
	  _handleRemoveOption: function _handleRemoveOption(removedOption) {
	    var selected = this.state.selected.slice();
	    selected = selected.filter(function (option) {
	      return !(0, _lodash.isEqual)(option, removedOption);
	    });
	
	    this.setState({
	      activeIndex: 0,
	      selected: selected,
	      showMenu: false
	    });
	
	    this.props.onChange && this.props.onChange(selected);
	  },
	
	  /**
	   * From `onClickOutside` mixin.
	   */
	  handleClickOutside: function handleClickOutside(e) {
	    this._hideDropdown();
	  },
	  _hideDropdown: function _hideDropdown() {
	    this.setState({
	      activeIndex: 0,
	      showMenu: false
	    });
	  }
	});
	
	exports['default'] = Typeahead;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * KeyCode
	 *
	 * Map of common (non-printable) keycodes for the `keydown` and `keyup` events.
	 * Note that `keypress` handles things differently and may not return the same
	 * values.
	 */
	module.exports = {
	  BACKSPACE: 8,
	  TAB: 9,
	  RETURN: 13,
	  ESC: 27,
	  SPACE: 32,
	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = onClickOutside;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./Typeahead.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./Typeahead.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = lodash;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(6);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _keyCode = __webpack_require__(2);
	
	var _keyCode2 = _interopRequireDefault(_keyCode);
	
	var _reactOnclickoutside = __webpack_require__(7);
	
	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	__webpack_require__(17);
	
	/**
	 * Token
	 *
	 * Individual token component, generally displayed within the TokenizerInput
	 * component, but can also be rendered on its own.
	 */
	var Token = _react2['default'].createClass({
	  displayName: 'Token',
	
	  mixins: [_reactOnclickoutside2['default']],
	
	  propTypes: {
	    /**
	     * Handler for removing/deleting the token. If not defined, the token will
	     * be rendered in a read-only state.
	     */
	    onRemove: _react2['default'].PropTypes.func
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      selected: false
	    };
	  },
	  render: function render() {
	    return this.props.onRemove ? this._renderRemoveableToken() : this._renderToken();
	  },
	  _renderRemoveableToken: function _renderRemoveableToken() {
	    return _react2['default'].createElement('button', {
	      className: (0, _classnames2['default'])('token', 'token-removeable', {
	        'token-selected': this.state.selected
	      }, this.props.className),
	      onBlur: this._handleBlur,
	      onClick: this._handleSelect,
	      onFocus: this._handleSelect,
	      onKeyDown: this._handleKeyDown,
	      tabIndex: 0 }, this.props.children, _react2['default'].createElement('span', { className: 'token-close-button', onClick: this._handleRemove }, '×'));
	  },
	  _renderToken: function _renderToken() {
	    var classnames = (0, _classnames2['default'])('token', this.props.className);
	
	    if (this.props.href) {
	      return _react2['default'].createElement('a', { className: classnames, href: this.props.href }, this.props.children);
	    }
	
	    return _react2['default'].createElement('div', { className: classnames }, this.props.children);
	  },
	  _handleBlur: function _handleBlur(e) {
	    (0, _reactDom.findDOMNode)(this).blur();
	    this.setState({ selected: false });
	  },
	  _handleKeyDown: function _handleKeyDown(e) {
	    switch (e.keyCode) {
	      case _keyCode2['default'].BACKSPACE:
	        if (this.state.selected) {
	          // Prevent backspace keypress from triggering the browser "back"
	          // action.
	          e.preventDefault();
	          this._handleRemove();
	        }
	        break;
	    }
	  },
	
	  /**
	   * From `onClickOutside` mixin.
	   */
	  handleClickOutside: function handleClickOutside(e) {
	    this._handleBlur();
	  },
	  _handleRemove: function _handleRemove(e) {
	    this.props.onRemove && this.props.onRemove();
	  },
	  _handleSelect: function _handleSelect(e) {
	    e.stopPropagation();
	    this.setState({ selected: true });
	  }
	});
	
	exports['default'] = Token;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactInputAutosize = __webpack_require__(19);
	
	var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Token = __webpack_require__(10);
	
	var _Token2 = _interopRequireDefault(_Token);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _reactDom = __webpack_require__(6);
	
	var _keyCode = __webpack_require__(2);
	
	var _keyCode2 = _interopRequireDefault(_keyCode);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var PropTypes = _react2['default'].PropTypes;
	
	__webpack_require__(18);
	
	/**
	 * TokenizerInput
	 *
	 * Accepts multiple selections from a Typeahead component and renders them as
	 * tokens within an input.
	 */
	var TokenizerInput = _react2['default'].createClass({
	  displayName: 'TokenizerInput',
	
	  propTypes: {
	    labelKey: PropTypes.string,
	    /**
	     * Input element placeholder text.
	     */
	    placeholder: PropTypes.string,
	    selected: PropTypes.array
	  },
	
	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var placeholder = _props.placeholder;
	    var selected = _props.selected;
	    var text = _props.text;
	
	    return _react2['default'].createElement('div', {
	      className: (0, _classnames2['default'])('bootstrap-tokenizer', 'form-control', 'clearfix', className),
	      onClick: this._handleInputFocus,
	      onFocus: this._handleInputFocus,
	      tabIndex: 0 }, selected.map(this._renderToken), _react2['default'].createElement(_reactInputAutosize2['default'], _extends({}, this.props, {
	      className: 'bootstrap-tokenizer-input',
	      inputStyle: {
	        backgroundColor: 'inherit',
	        border: 0,
	        outline: 'none',
	        padding: 0
	      },
	      onKeyDown: this._handleKeydown,
	      placeholder: selected.length ? null : placeholder,
	      ref: 'input',
	      type: 'text',
	      value: text
	    })));
	  },
	  _renderToken: function _renderToken(option, idx) {
	    var _props2 = this.props;
	    var onRemove = _props2.onRemove;
	    var labelKey = _props2.labelKey;
	
	    return _react2['default'].createElement(_Token2['default'], {
	      key: idx,
	      onRemove: onRemove.bind(null, option) }, option[labelKey]);
	  },
	
	  _handleKeydown: function _handleKeydown(e) {
	    switch (e.keyCode) {
	      case _keyCode2['default'].LEFT:
	      case _keyCode2['default'].RIGHT:
	        // TODO: Tab forward and backward through tokens when user clicks left
	        // or right arrow keys.
	        break;
	      case _keyCode2['default'].BACKSPACE:
	        var inputNode = (0, _reactDom.findDOMNode)(this.refs.input);
	        if (inputNode && inputNode.contains(document.activeElement) && !this.props.text) {
	          // If the input is selected and there is no text, select the last
	          // token when the user hits backspace.
	          var sibling = inputNode.previousSibling;
	          sibling && sibling.focus();
	        }
	        break;
	    }
	
	    this.props.onKeyDown && this.props.onKeyDown(e);
	  },
	
	  _handleInputFocus: function _handleInputFocus(e) {
	    // If the user clicks anywhere inside the tokenizer besides a token,
	    // focus the input.
	    this.refs.input.focus();
	  }
	});
	
	exports['default'] = TokenizerInput;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _lodash = __webpack_require__(9);
	
	var _keyCode = __webpack_require__(2);
	
	var _keyCode2 = _interopRequireDefault(_keyCode);
	
	var _reactOnclickoutside = __webpack_require__(7);
	
	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var PropTypes = _react2['default'].PropTypes;
	
	__webpack_require__(8);
	
	/**
	 * TypeaheadInput
	 *
	 * Handles a single selection from the Typeahead component.
	 */
	var TypeaheadInput = _react2['default'].createClass({
	  displayName: 'TypeaheadInput',
	
	  mixins: [_reactOnclickoutside2['default']],
	
	  propTypes: {
	    filteredOptions: PropTypes.array,
	    labelKey: PropTypes.string,
	    onChange: PropTypes.func,
	    selected: PropTypes.object,
	    text: PropTypes.string
	  },
	
	  render: function render() {
	    return _react2['default'].createElement('div', {
	      className: (0, _classnames2['default'])('bootstrap-typeahead-input', this.props.className),
	      onClick: this._handleInputFocus,
	      onFocus: this._handleInputFocus,
	      tabIndex: 0 }, _react2['default'].createElement('input', _extends({}, this.props, {
	      className: (0, _classnames2['default'])('bootstrap-typeahead-input-main', 'form-control', {
	        'has-selection': !this.props.selected
	      }),
	      onKeyDown: this._handleKeydown,
	      ref: 'input',
	      style: {
	        backgroundColor: 'transparent',
	        display: 'block',
	        position: 'relative',
	        zIndex: 1
	      },
	      type: 'text',
	      value: this._getInputValue()
	    })), _react2['default'].createElement('input', {
	      className: 'bootstrap-typeahead-input-hint form-control',
	      style: {
	        borderColor: 'transparent',
	        bottom: 0,
	        display: 'block',
	        position: 'absolute',
	        top: 0,
	        width: '100%',
	        zIndex: 0
	      },
	      value: this._getHintText()
	    }));
	  },
	  _getInputValue: function _getInputValue() {
	    var _props = this.props;
	    var labelKey = _props.labelKey;
	    var selected = _props.selected;
	    var text = _props.text;
	
	    return selected ? selected[labelKey] : text;
	  },
	  _getHintText: function _getHintText() {
	    var _props2 = this.props;
	    var filteredOptions = _props2.filteredOptions;
	    var labelKey = _props2.labelKey;
	    var text = _props2.text;
	
	    var firstOption = (0, _lodash.head)(filteredOptions);
	
	    // Only show the hint if...
	    if (
	    // ...the input is focused.
	    this.refs.input === document.activeElement &&
	    // ...the input contains text.
	    text &&
	    // ...the input text corresponds to the beginning of the first option.
	    firstOption && firstOption[labelKey].indexOf(text) === 0) {
	      return firstOption[labelKey];
	    }
	  },
	
	  /**
	   * If the containing parent div is focused or clicked, focus the input.
	   */
	  _handleInputFocus: function _handleInputFocus(e) {
	    this.refs.input.focus();
	  },
	
	  _handleKeydown: function _handleKeydown(e) {
	    var _props3 = this.props;
	    var filteredOptions = _props3.filteredOptions;
	    var onAdd = _props3.onAdd;
	    var onRemove = _props3.onRemove;
	    var selected = _props3.selected;
	
	    switch (e.keyCode) {
	      case _keyCode2['default'].ESC:
	        this.refs.input.blur();
	        break;
	      case _keyCode2['default'].RIGHT:
	        // Autocomplete the selection if there's a hint and no selection yet.
	        if (this._getHintText() && !selected) {
	          onAdd && onAdd((0, _lodash.head)(filteredOptions));
	        }
	        break;
	      case _keyCode2['default'].BACKSPACE:
	        // Remove the selection if we start deleting it.
	        selected && onRemove && onRemove(selected);
	        break;
	    }
	
	    this.props.onKeyDown && this.props.onKeyDown(e);
	  },
	
	  handleClickOutside: function handleClickOutside(e) {
	    // Force blur so that input is no longer the active element. For some
	    // reason, it's taking 2 clicks to fully blur the input otherwise.
	    this.refs.input.blur();
	  }
	});
	
	exports['default'] = TypeaheadInput;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(6);
	
	var _classnames = __webpack_require__(3);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var PropTypes = _react2['default'].PropTypes;
	
	var Menu = _react2['default'].createClass({
	  displayName: 'Menu',
	
	  render: function render() {
	    return _react2['default'].createElement('ul', _extends({}, this.props, {
	      className: (0, _classnames2['default'])('dropdown-menu', this.props.className) }), this.props.children);
	  }
	});
	
	var MenuItem = _react2['default'].createClass({
	  displayName: 'MenuItem',
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.active) {
	      (0, _reactDom.findDOMNode)(this).firstChild.focus();
	    }
	  },
	  render: function render() {
	    return _react2['default'].createElement('li', {
	      className: (0, _classnames2['default'])({
	        'active': this.props.active,
	        'disabled': this.props.disabled
	      }) }, _react2['default'].createElement('a', { href: '#', onClick: this._handleClick }, this.props.children));
	  },
	  _handleClick: function _handleClick(e) {
	    e.preventDefault();
	    this.props.onClick && this.props.onClick();
	  }
	});
	
	var TypeaheadMenu = _react2['default'].createClass({
	  displayName: 'TypeaheadMenu',
	
	  propTypes: {
	    activeIndex: PropTypes.number,
	    emptyLabel: PropTypes.string,
	    labelKey: PropTypes.string.isRequired,
	    maxHeight: PropTypes.number,
	    options: PropTypes.array
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      emptyLabel: 'No matches found.',
	      maxHeight: 300
	    };
	  },
	  render: function render() {
	    var _props = this.props;
	    var maxHeight = _props.maxHeight;
	    var options = _props.options;
	
	    var items = options.length ? options.map(this._renderDropdownItem) : _react2['default'].createElement(MenuItem, { disabled: true }, this.props.emptyLabel);
	
	    return _react2['default'].createElement(Menu, {
	      style: {
	        maxHeight: maxHeight + 'px',
	        right: 0
	      } }, items);
	  },
	  _renderDropdownItem: function _renderDropdownItem(option, idx) {
	    var _props2 = this.props;
	    var activeIndex = _props2.activeIndex;
	    var onClick = _props2.onClick;
	
	    return _react2['default'].createElement(MenuItem, {
	      active: idx === activeIndex,
	      key: idx,
	      onClick: onClick.bind(null, option) }, option[this.props.labelKey]);
	  }
	});
	
	exports['default'] = TypeaheadMenu;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "/* Token */\n.token {\n  background-color: #e7f4ff;\n  border: 0;\n  border-radius: 2px;\n  color: #1f8dd6;\n  display: inline-block;\n  line-height: 1em;\n  padding: 4px 7px;\n  position: relative;\n}\n.token:focus,\n.token-removeable {\n  padding-right: 21px;\n}\n.token-selected {\n  background-color: #1f8dd6;\n  color: #fff;\n  outline: none;\n  text-decoration: none;\n}\n\n.bootstrap-tokenizer .token {\n  margin: 0 3px 3px 0;\n}\n\n.token-close-button {\n  bottom: 0;\n  padding: 3px 7px;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".bootstrap-tokenizer {\n  cursor: text;\n  height: auto;\n  padding: 5px 12px 2px 12px;\n}\n\n.bootstrap-tokenizer-input {\n  margin: 1px 0 4px;\n}\n", ""]);
	
	// exports


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, ".bootstrap-typeahead .dropdown-menu {\n  overflow: scroll;\n}\n.bootstrap-typeahead .dropdown-menu > li a:focus {\n  outline: none;\n}\n\n.bootstrap-typeahead-input-hint {\n  color: #aaa;\n}\n", ""]);
	
	// exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./Token.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./Token.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./Tokenizer.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./Tokenizer.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = AutosizeInput;

/***/ }
/******/ ]);
//# sourceMappingURL=react-bootstrap-typeahead.js.map