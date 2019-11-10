(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "immutable"], factory);
	else if(typeof exports === 'object')
		exports["ReactDataGrid"] = factory(require("react"), require("react-dom"), require("immutable"));
	else
		root["ReactDataGrid"] = factory(root["React"], root["ReactDOM"], root["immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_33__) {
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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(345);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (false) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(81)();
	}


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2017 Jed Watson.
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
				} else if (Array.isArray(arg) && arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
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
			classNames.default = classNames;
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


/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.last = exports.isImmutableMap = exports.getMixedTypeValueRetriever = exports.isImmutableCollection = exports.isEmptyObject = exports.isFunction = exports.isEmptyArray = exports.isColumnsImmutable = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _immutable = __webpack_require__(33);

	var isColumnsImmutable = exports.isColumnsImmutable = function isColumnsImmutable(columns) {
	  return typeof Immutable !== 'undefined' && columns instanceof Immutable.List;
	};

	var isEmptyArray = exports.isEmptyArray = function isEmptyArray(obj) {
	  return Array.isArray(obj) && obj.length === 0;
	};

	var isFunction = exports.isFunction = function isFunction(functionToCheck) {
	  var getType = {};
	  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	};

	var isEmptyObject = exports.isEmptyObject = function isEmptyObject(obj) {
	  return Object.keys(obj).length === 0 && obj.constructor === Object;
	};

	var isImmutableCollection = exports.isImmutableCollection = function isImmutableCollection(objToVerify) {
	  return _immutable.Iterable.isIterable(objToVerify);
	};

	var getMixedTypeValueRetriever = exports.getMixedTypeValueRetriever = function getMixedTypeValueRetriever(isImmutable) {
	  var retObj = {};
	  var retriever = function retriever(item, key) {
	    return item[key];
	  };
	  var immutableRetriever = function immutableRetriever(immutable, key) {
	    return immutable.get(key);
	  };

	  retObj.getValue = isImmutable ? immutableRetriever : retriever;

	  return retObj;
	};

	var isImmutableMap = exports.isImmutableMap = _immutable.Map.isMap;

	var last = exports.last = function last(arrayOrList) {
	  if (arrayOrList == null) {
	    throw new Error('arrayOrCollection is null');
	  }

	  if (_immutable.List.isList(arrayOrList)) {
	    return arrayOrList.last();
	  }

	  if (Array.isArray(arrayOrList)) {
	    return arrayOrList[arrayOrList.length - 1];
	  }

	  throw new Error('Cant get last of: ' + (typeof arrayOrList === 'undefined' ? 'undefined' : _typeof(arrayOrList)));
	};

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
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


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

	'use strict';

	module.exports = {
	  getColumn: function getColumn(columns, idx) {
	    if (Array.isArray(columns)) {
	      return columns[idx];
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.get(idx);
	    }
	  },
	  spliceColumn: function spliceColumn(metrics, idx, column) {
	    if (Array.isArray(metrics.columns)) {
	      metrics.columns.splice(idx, 1, column);
	    } else if (typeof Immutable !== 'undefined') {
	      metrics.columns = metrics.columns.splice(idx, 1, column);
	    }
	    return metrics;
	  },
	  getSize: function getSize(columns) {
	    if (Array.isArray(columns)) {
	      return columns.length;
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.size;
	    }
	  },


	  // Logic extented to allow for functions to be passed down in column.editable
	  // this allows us to deicde whether we can be edting from a cell level
	  canEdit: function canEdit(col, rowData, enableCellSelect) {
	    if (!col) return false;
	    if (col.editable != null && typeof col.editable === 'function') {
	      return enableCellSelect === true && col.editable(rowData);
	    }
	    return enableCellSelect === true && (!!col.editor || !!col.editable);
	  },
	  getValue: function getValue(column, property) {
	    var value = void 0;
	    if (column.toJSON && column.get) {
	      value = column.get(property);
	    } else {
	      value = column[property];
	    }
	    return value;
	  },
	  isFrozen: function isFrozen(column) {
	    return column.locked === true || column.frozen === true;
	  }
	};

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DragItemTypes = exports.CellExpand = exports.UpdateActions = exports.EventTypes = exports.CellNavigationMode = undefined;

	var _CellNavigationMode = __webpack_require__(104);

	var CellNavigationMode = _interopRequireWildcard(_CellNavigationMode);

	var _EventTypes = __webpack_require__(105);

	var EventTypes = _interopRequireWildcard(_EventTypes);

	var _keymirror = __webpack_require__(116);

	var _keymirror2 = _interopRequireDefault(_keymirror);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var UpdateActions = (0, _keymirror2['default'])({
	  CELL_UPDATE: null,
	  COLUMN_FILL: null,
	  COPY_PASTE: null,
	  CELL_DRAG: null
	});

	var DragItemTypes = {
	  Column: 'column'
	};

	var CellExpand = {
	  DOWN_TRIANGLE: String.fromCharCode(9660),
	  RIGHT_TRIANGLE: String.fromCharCode(9654)
	};

	exports.CellNavigationMode = CellNavigationMode;
	exports.EventTypes = EventTypes;
	exports.UpdateActions = UpdateActions;
	exports.CellExpand = CellExpand;
	exports.DragItemTypes = DragItemTypes;

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ExcelColumnShape = {
	  name: _propTypes2['default'].node.isRequired,
	  key: _propTypes2['default'].string.isRequired,
	  width: _propTypes2['default'].number.isRequired,
	  filterable: _propTypes2['default'].bool
	};

	module.exports = ExcelColumnShape;

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_33__;

/***/ }),

/***/ 35:
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	module.exports = {
	  rowKey: _propTypes2['default'].string.isRequired,
	  onCellClick: _propTypes2['default'].func.isRequired,
	  onCellMouseDown: _propTypes2['default'].func.isRequired,
	  onCellMouseEnter: _propTypes2['default'].func.isRequired,
	  onCellContextMenu: _propTypes2['default'].func.isRequired,
	  onCellDoubleClick: _propTypes2['default'].func.isRequired,
	  onDragEnter: _propTypes2['default'].func.isRequired,
	  onRowExpandToggle: _propTypes2['default'].func.isRequired,
	  onDeleteSubRow: _propTypes2['default'].func,
	  onAddSubRow: _propTypes2['default'].func,
	  onColumnEvent: _propTypes2['default'].func.isRequired,
	  onCellExpand: _propTypes2['default'].func.isRequired,
	  getCellActions: _propTypes2['default'].func
	};

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ExcelColumn = __webpack_require__(23);

	var _ExcelColumn2 = _interopRequireDefault(_ExcelColumn);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(16);

	var EditorBase = function (_React$Component) {
	  _inherits(EditorBase, _React$Component);

	  function EditorBase() {
	    _classCallCheck(this, EditorBase);

	    return _possibleConstructorReturn(this, (EditorBase.__proto__ || Object.getPrototypeOf(EditorBase)).apply(this, arguments));
	  }

	  _createClass(EditorBase, [{
	    key: 'getStyle',
	    value: function getStyle() {
	      return {
	        width: '100%'
	      };
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      var updated = {};
	      updated[this.props.column.key] = this.getInputNode().value;
	      return updated;
	    }
	  }, {
	    key: 'getInputNode',
	    value: function getInputNode() {
	      var domNode = ReactDOM.findDOMNode(this);
	      if (domNode.tagName === 'INPUT') {
	        return domNode;
	      }

	      return domNode.querySelector('input:not([type=hidden])');
	    }
	  }, {
	    key: 'inheritContainerStyles',
	    value: function inheritContainerStyles() {
	      return true;
	    }
	  }]);

	  return EditorBase;
	}(React.Component);

	EditorBase.propTypes = {
	  onKeyDown: _propTypes2['default'].func.isRequired,
	  value: _propTypes2['default'].any.isRequired,
	  onBlur: _propTypes2['default'].func.isRequired,
	  column: _propTypes2['default'].shape(_ExcelColumn2['default']).isRequired,
	  commit: _propTypes2['default'].func.isRequired
	};

	module.exports = EditorBase;

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  CheckboxEditor: __webpack_require__(68),
	  EditorBase: __webpack_require__(52),
	  SimpleTextEditor: __webpack_require__(69)
	};

/***/ }),

/***/ 54:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = shouldRowUpdate;
	function shouldRowUpdate(nextProps, currentProps) {
	  return currentProps.columns !== nextProps.columns || nextProps.row !== currentProps.row || currentProps.colOverscanStartIdx !== nextProps.colOverscanStartIdx || currentProps.colOverscanEndIdx !== nextProps.colOverscanEndIdx || currentProps.colVisibleStartIdx !== nextProps.colVisibleStartIdx || currentProps.colVisibleEndIdx !== nextProps.colVisibleEndIdx || currentProps.isSelected !== nextProps.isSelected || currentProps.isScrolling !== nextProps.isScrolling || nextProps.height !== currentProps.height || currentProps.isOver !== nextProps.isOver || currentProps.expandedRows !== nextProps.expandedRows || currentProps.canDrop !== nextProps.canDrop || currentProps.forceUpdate === true || currentProps.extraClasses !== nextProps.extraClasses;
	}

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

	"use strict";

	function createObjectWithProperties(originalObj, properties) {
	  return properties.reduce(function (result, property) {
	    if (property in originalObj) {
	      result[property] = originalObj[property];
	    }
	    return result;
	  }, {});
	}

	module.exports = createObjectWithProperties;

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(359);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./react-data-grid-header.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./react-data-grid-header.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(113);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./react-data-grid-row.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./react-data-grid-row.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);

	__webpack_require__(85);

	var CheckboxEditor = function (_React$Component) {
	  _inherits(CheckboxEditor, _React$Component);

	  function CheckboxEditor() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, CheckboxEditor);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CheckboxEditor.__proto__ || Object.getPrototypeOf(CheckboxEditor)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (e) {
	      _this.props.column.onCellChange(_this.props.rowIdx, _this.props.column.key, _this.props.dependentValues, e);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(CheckboxEditor, [{
	    key: 'render',
	    value: function render() {
	      var checked = this.props.value != null ? this.props.value : false;
	      var checkboxName = 'checkbox' + this.props.rowIdx;
	      return React.createElement(
	        'div',
	        { className: 'react-grid-checkbox-container checkbox-align', onClick: this.handleChange },
	        React.createElement('input', { className: 'react-grid-checkbox', type: 'checkbox', name: checkboxName, checked: checked }),
	        React.createElement('label', { htmlFor: checkboxName, className: 'react-grid-checkbox-label' })
	      );
	    }
	  }]);

	  return CheckboxEditor;
	}(React.Component);

	CheckboxEditor.propTypes = {
	  value: _propTypes2['default'].bool,
	  rowIdx: _propTypes2['default'].number,
	  column: _propTypes2['default'].shape({
	    key: _propTypes2['default'].string,
	    onCellChange: _propTypes2['default'].func
	  }),
	  dependentValues: _propTypes2['default'].object
	};


	module.exports = CheckboxEditor;

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var EditorBase = __webpack_require__(52);

	var SimpleTextEditor = function (_EditorBase) {
	  _inherits(SimpleTextEditor, _EditorBase);

	  function SimpleTextEditor() {
	    _classCallCheck(this, SimpleTextEditor);

	    return _possibleConstructorReturn(this, (SimpleTextEditor.__proto__ || Object.getPrototypeOf(SimpleTextEditor)).apply(this, arguments));
	  }

	  _createClass(SimpleTextEditor, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return React.createElement('input', { ref: function ref(node) {
	          return _this2.input = node;
	        }, type: 'text', onBlur: this.props.onBlur, className: 'form-control', defaultValue: this.props.value });
	    }
	  }]);

	  return SimpleTextEditor;
	}(EditorBase);

	module.exports = SimpleTextEditor;

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var setMaskStyle = function setMaskStyle(_ref) {
	  var left = _ref.left,
	      top = _ref.top,
	      width = _ref.width,
	      height = _ref.height,
	      zIndex = _ref.zIndex,
	      position = _ref.position;

	  return {
	    height: height,
	    width: width,
	    zIndex: zIndex,
	    position: position || 'absolute',
	    pointerEvents: 'none',
	    transform: 'translate(' + left + 'px, ' + top + 'px)'
	  };
	};

	var CellMask = function CellMask(_ref2) {
	  var width = _ref2.width,
	      height = _ref2.height,
	      top = _ref2.top,
	      left = _ref2.left,
	      zIndex = _ref2.zIndex,
	      children = _ref2.children,
	      position = _ref2.position,
	      rest = _objectWithoutProperties(_ref2, ['width', 'height', 'top', 'left', 'zIndex', 'children', 'position']);

	  return _react2['default'].createElement(
	    'div',
	    _extends({
	      style: setMaskStyle({ left: left, top: top, width: width, height: height, zIndex: zIndex, position: position }),
	      'data-test': 'cell-mask'
	    }, rest),
	    children
	  );
	};

	CellMask.propTypes = {
	  width: _propTypes2['default'].number.isRequired,
	  height: _propTypes2['default'].number.isRequired,
	  top: _propTypes2['default'].number.isRequired,
	  left: _propTypes2['default'].number.isRequired,
	  zIndex: _propTypes2['default'].number.isRequired,
	  children: _propTypes2['default'].node
	};

	exports['default'] = CellMask;

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getNextSelectedCellPosition = exports.isSelectedCellEditable = exports.getSelectedCellValue = exports.getSelectedColumn = exports.getSelectedRangeDimensions = exports.getSelectedDimensions = exports.getSelectedRow = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.canExitGrid = canExitGrid;
	exports.selectedRangeIsSingleCell = selectedRangeIsSingleCell;

	var _constants = __webpack_require__(22);

	var _utils = __webpack_require__(10);

	var _RowUtils = __webpack_require__(109);

	var rowUtils = _interopRequireWildcard(_RowUtils);

	var _ColumnUtils = __webpack_require__(14);

	var columnUtils = _interopRequireWildcard(_ColumnUtils);

	var _zIndexes = __webpack_require__(106);

	var _zIndexes2 = _interopRequireDefault(_zIndexes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var getRowTop = function getRowTop(rowIdx, rowHeight) {
	  return rowIdx * rowHeight;
	};

	var getSelectedRow = exports.getSelectedRow = function getSelectedRow(_ref) {
	  var selectedPosition = _ref.selectedPosition,
	      rowGetter = _ref.rowGetter;
	  var rowIdx = selectedPosition.rowIdx;

	  return rowGetter(rowIdx);
	};

	var getSelectedDimensions = exports.getSelectedDimensions = function getSelectedDimensions(_ref2) {
	  var selectedPosition = _ref2.selectedPosition,
	      columns = _ref2.columns,
	      rowHeight = _ref2.rowHeight;
	  var idx = selectedPosition.idx,
	      rowIdx = selectedPosition.rowIdx;

	  if (idx >= 0) {
	    var column = columnUtils.getColumn(columns, idx);
	    var width = column.width,
	        left = column.left;

	    var top = getRowTop(rowIdx, rowHeight);
	    var zIndex = columnUtils.isFrozen(columns) ? _zIndexes2['default'].FROZEN_CELL_MASK : _zIndexes2['default'].CELL_MASK;
	    return { width: width, left: left, top: top, height: rowHeight, zIndex: zIndex };
	  }
	  return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: 1 };
	};

	var getColumnRangeProperties = function getColumnRangeProperties(from, to, columns) {
	  var totalWidth = 0;
	  var anyColFrozen = false;
	  for (var i = from; i <= to; i++) {
	    var column = columnUtils.getColumn(columns, i);
	    totalWidth += column.width;
	    anyColFrozen = anyColFrozen || columnUtils.isFrozen(column);
	  }
	  return { totalWidth: totalWidth, anyColFrozen: anyColFrozen, left: columnUtils.getColumn(columns, from).left };
	};

	var getSelectedRangeDimensions = exports.getSelectedRangeDimensions = function getSelectedRangeDimensions(_ref3) {
	  var selectedRange = _ref3.selectedRange,
	      columns = _ref3.columns,
	      rowHeight = _ref3.rowHeight;
	  var topLeft = selectedRange.topLeft,
	      bottomRight = selectedRange.bottomRight;


	  if (topLeft.idx < 0) {
	    return { width: 0, left: 0, top: 0, height: rowHeight, zIndex: _zIndexes2['default'].CELL_MASK };
	  }

	  var _getColumnRangeProper = getColumnRangeProperties(topLeft.idx, bottomRight.idx, columns),
	      totalWidth = _getColumnRangeProper.totalWidth,
	      anyColFrozen = _getColumnRangeProper.anyColFrozen,
	      left = _getColumnRangeProper.left;

	  var top = getRowTop(topLeft.rowIdx, rowHeight);
	  var height = (bottomRight.rowIdx - topLeft.rowIdx + 1) * rowHeight;
	  var zIndex = anyColFrozen ? _zIndexes2['default'].FROZEN_CELL_MASK : _zIndexes2['default'].CELL_MASK;

	  return { width: totalWidth, left: left, top: top, height: height, zIndex: zIndex };
	};

	var getSelectedColumn = exports.getSelectedColumn = function getSelectedColumn(_ref4) {
	  var selectedPosition = _ref4.selectedPosition,
	      columns = _ref4.columns;
	  var idx = selectedPosition.idx;

	  return columnUtils.getColumn(columns, idx);
	};

	var getSelectedCellValue = exports.getSelectedCellValue = function getSelectedCellValue(_ref5) {
	  var selectedPosition = _ref5.selectedPosition,
	      columns = _ref5.columns,
	      rowGetter = _ref5.rowGetter;

	  var column = getSelectedColumn({ selectedPosition: selectedPosition, columns: columns });
	  var row = getSelectedRow({ selectedPosition: selectedPosition, rowGetter: rowGetter });

	  return row && column ? rowUtils.get(row, column.key) : null;
	};

	var isSelectedCellEditable = exports.isSelectedCellEditable = function isSelectedCellEditable(_ref6) {
	  var enableCellSelect = _ref6.enableCellSelect,
	      selectedPosition = _ref6.selectedPosition,
	      columns = _ref6.columns,
	      rowGetter = _ref6.rowGetter,
	      onCheckCellIsEditable = _ref6.onCheckCellIsEditable;

	  var column = getSelectedColumn({ selectedPosition: selectedPosition, columns: columns });
	  var row = getSelectedRow({ selectedPosition: selectedPosition, rowGetter: rowGetter });
	  var isCellEditable = (0, _utils.isFunction)(onCheckCellIsEditable) ? onCheckCellIsEditable(_extends({ row: row, column: column }, selectedPosition)) : true;
	  return columnUtils.canEdit(column, row, enableCellSelect) && isCellEditable;
	};

	var getNextSelectedCellPosition = exports.getNextSelectedCellPosition = function getNextSelectedCellPosition(_ref7, nextPosition) {
	  var cellNavigationMode = _ref7.cellNavigationMode,
	      columns = _ref7.columns,
	      rowsCount = _ref7.rowsCount;

	  if (cellNavigationMode !== _constants.CellNavigationMode.NONE) {
	    var idx = nextPosition.idx,
	        rowIdx = nextPosition.rowIdx;

	    var isAfterLastColumn = idx === columns.length;
	    var isBeforeFirstColumn = idx === -1;

	    if (isAfterLastColumn) {
	      if (cellNavigationMode === _constants.CellNavigationMode.CHANGE_ROW) {
	        var isLastRow = rowIdx === rowsCount - 1;
	        if (!isLastRow) {
	          return {
	            idx: 0,
	            rowIdx: rowIdx + 1,
	            changeRowOrColumn: true
	          };
	        }
	      } else if (cellNavigationMode === _constants.CellNavigationMode.LOOP_OVER_ROW) {
	        return {
	          rowIdx: rowIdx,
	          idx: 0,
	          changeRowOrColumn: true
	        };
	      }
	    } else if (isBeforeFirstColumn) {
	      if (cellNavigationMode === _constants.CellNavigationMode.CHANGE_ROW) {
	        var isFirstRow = rowIdx === 0;
	        if (!isFirstRow) {
	          return {
	            rowIdx: rowIdx - 1,
	            idx: columns.length - 1,
	            changeRowOrColumn: true
	          };
	        }
	      } else if (cellNavigationMode === _constants.CellNavigationMode.LOOP_OVER_ROW) {
	        return {
	          rowIdx: rowIdx,
	          idx: columns.length - 1,
	          changeRowOrColumn: true
	        };
	      }
	    }
	  }

	  return _extends({}, nextPosition, { changeRowOrColumn: false });
	};

	function canExitGrid(e, _ref8) {
	  var cellNavigationMode = _ref8.cellNavigationMode,
	      columns = _ref8.columns,
	      rowsCount = _ref8.rowsCount,
	      _ref8$selectedPositio = _ref8.selectedPosition,
	      rowIdx = _ref8$selectedPositio.rowIdx,
	      idx = _ref8$selectedPositio.idx;

	  // When the cellNavigationMode is 'none' or 'changeRow', you can exit the grid if you're at the first or last cell of the grid
	  // When the cellNavigationMode is 'loopOverRow', there is no logical exit point so you can't exit the grid
	  if (cellNavigationMode === _constants.CellNavigationMode.NONE || cellNavigationMode === _constants.CellNavigationMode.CHANGE_ROW) {
	    var atLastCellInRow = idx === columns.length - 1;
	    var atFirstCellInRow = idx === 0;
	    var atLastRow = rowIdx === rowsCount - 1;
	    var atFirstRow = rowIdx === 0;
	    var shift = e.shiftKey === true;

	    return shift ? atFirstCellInRow && atFirstRow : atLastCellInRow && atLastRow;
	  }

	  return false;
	}

	function selectedRangeIsSingleCell(selectedRange) {
	  return selectedRange.topLeft.idx === selectedRange.bottomRight.idx && selectedRange.topLeft.rowIdx === selectedRange.bottomRight.rowIdx;
	}

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = __webpack_require__(82);

	function emptyFunction() {}

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),

/***/ 82:
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(112);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./react-data-grid-checkbox.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./react-data-grid-checkbox.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(357);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./react-data-grid-core.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./react-data-grid-core.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 104:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NONE = exports.NONE = 'none';
	var CHANGE_ROW = exports.CHANGE_ROW = 'changeRow';
	var LOOP_OVER_ROW = exports.LOOP_OVER_ROW = 'loopOverRow';

/***/ }),

/***/ 105:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SELECT_CELL = exports.SELECT_CELL = 'SELECT_CELL';
	var SELECT_START = exports.SELECT_START = 'SELECT_START';
	var SELECT_UPDATE = exports.SELECT_UPDATE = 'SELECT_UPDATE';
	var SELECT_END = exports.SELECT_END = 'SELECT_END';
	var DRAG_ENTER = exports.DRAG_ENTER = 'DRAG_ENTER';
	var SCROLL_TO_COLUMN = exports.SCROLL_TO_COLUMN = 'SCROLL_TO_COLUMN';

/***/ }),

/***/ 106:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  CELL_MASK: 5,
	  EDITOR_CONTAINER: 10,
	  FROZEN_CELL_MASK: 15,
	  FROZEN_EDITOR_CONTAINER: 20
	};

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ExcelColumn = __webpack_require__(23);

	var _ExcelColumn2 = _interopRequireDefault(_ExcelColumn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = { ExcelColumn: _ExcelColumn2['default'] };

/***/ }),

/***/ 109:
/***/ (function(module, exports) {

	'use strict';

	var RowUtils = {
	  get: function get(row, property) {
	    if (typeof row.get === 'function') {
	      return row.get(property);
	    }

	    return row[property];
	  },
	  isRowSelected: function isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx) {
	    if (indexes && Object.prototype.toString.call(indexes) === '[object Array]') {
	      return indexes.indexOf(rowIdx) > -1;
	    } else if (keys && keys.rowKey && keys.values && Object.prototype.toString.call(keys.values) === '[object Array]') {
	      return keys.values.indexOf(rowData[keys.rowKey]) > -1;
	    } else if (isSelectedKey && rowData && typeof isSelectedKey === 'string') {
	      return rowData[isSelectedKey];
	    }
	    return false;
	  }
	};

	module.exports = RowUtils;

/***/ }),

/***/ 110:
/***/ (function(module, exports) {

	'use strict';

	var size = void 0;

	function getScrollbarSize() {
	  if (size === undefined) {
	    var outer = document.createElement('div');
	    outer.style.width = '50px';
	    outer.style.height = '50px';
	    outer.style.position = 'absolute';
	    outer.style.top = '-200px';
	    outer.style.left = '-200px';

	    var inner = document.createElement('div');
	    inner.style.height = '100px';
	    inner.style.width = '100%';

	    outer.appendChild(inner);
	    document.body.appendChild(outer);

	    var outerWidth = outer.clientWidth;
	    outer.style.overflowY = 'scroll';
	    var innerWidth = inner.clientWidth;

	    document.body.removeChild(outer);

	    size = outerWidth - innerWidth;
	  }

	  return size;
	}

	module.exports = getScrollbarSize;

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, ".react-grid-Cell{background-color:#fff;padding-left:8px;padding-right:8px;border-right:1px solid #eee;border-bottom:1px solid #ddd}.rdg-selected{border:2px solid #66afe9}.rdg-selected-range{border:1px solid #66afe9;background-color:#66afe930}.moving-element{will-change:transform}.react-grid-Cell--frozen,.react-grid-Cell--frozen:focus{z-index:12}.rdg-last--frozen{border-right:1px solid #ddd;box-shadow:2px 0 5px -2px hsla(0,0%,53%,.3)!important}.react-contextmenu--visible{z-index:1000}.react-grid-Cell:not(.editing) .react-grid-Cell__value{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.react-grid-Cell:not(.editing):not(.rdg-child-cell) .react-grid-Cell__value{position:relative;top:50%;transform:translateY(-50%)}.rdg-child-cell .react-grid-Cell__value{line-height:35px}.react-grid-Cell.readonly{background-color:#000}.react-grid-Cell:hover{background:#eee}.react-grid-cell .form-control-feedback{color:#a94442;position:absolute;top:0;right:10px;z-index:1000000;display:block;width:34px;height:34px}.react-grid-Row.row-selected .react-grid-Cell{background-color:#dbecfa}.react-grid-Cell.editing{padding:0;overflow:visible!important}.react-grid-Cell--frozen.editing{z-index:100}.react-grid-Cell.editing .has-error input{border:2px solid red!important;border-radius:2px!important}.react-grid-Cell__value ul{margin-top:0;margin-bottom:0;display:inline-block}.react-grid-Cell__value .btn-sm{padding:0}.cell-tooltip{position:relative;display:inline-block}.cell-tooltip:hover{z-index:101}.cell-tooltip .cell-tooltip-text{visibility:hidden;width:150px;background-color:#000;color:#fff;text-align:center;border-radius:6px;padding:5px 0;position:absolute;z-index:1;bottom:-150%;left:50%;margin-left:-60px;opacity:1s}.cell-tooltip:hover .cell-tooltip-text{visibility:visible;opacity:.8}.cell-tooltip .cell-tooltip-text:after{content:\" \";position:absolute;bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:transparent transparent #000}.react-grid-Canvas.opaque .react-grid-Cell.cell-tooltip:hover .cell-tooltip-text{visibility:hidden}.rdg-cell-expand{top:0;right:20px;position:absolute;cursor:pointer}.rdg-child-row-action-cross-last:before,.rdg-child-row-action-cross:before,rdg-child-row-action-cross-last:after,rdg-child-row-action-cross:after{content:\"\";position:absolute;background:grey;height:50%}.rdg-child-row-action-cross:before{left:21px;width:1px;height:35px}.rdg-child-row-action-cross-last:before{left:21px;width:1px}.rdg-child-row-action-cross-last:after,.rdg-child-row-action-cross:after{top:50%;left:20px;height:1px;width:15px;content:\"\";position:absolute;background:grey}.rdg-child-row-action-cross:hover{background:red}.rdg-child-row-btn{position:absolute;cursor:pointer;border:1px solid grey;border-radius:14px;z-index:3;background:#fff}.rdg-child-row-btn div{font-size:12px;text-align:center;line-height:19px;color:grey;height:20px;width:20px;position:absolute;top:60%;left:53%;margin-top:-10px;margin-left:-10px}.rdg-empty-child-row:hover .glyphicon-plus-sign,.rdg-empty-child-row:hover a{color:green}.rdg-child-row-btn .glyphicon-remove-sign:hover{color:red}.last-column .cell-tooltip-text{right:100%;left:0!important}.rdg-cell-action{float:right;height:100%}.rdg-cell-action-last{margin-right:-8px}.rdg-cell-action-button{width:35px;height:100%;text-align:center;position:relative;display:table;color:#4a9de2}.rdg-cell-action-button>span{display:table-cell;vertical-align:middle}.rdg-cell-action-button-toggled,.rdg-cell-action-button:hover{color:#447bbb}.rdg-cell-action-menu{position:absolute;top:100%;z-index:1000;float:left;min-width:160px;padding:5px 0;text-align:left;list-style:none;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px solid #ccc;box-shadow:0 0 3px 0 #ccc}.rdg-cell-action-menu>span{display:block;padding:3px 10px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:nowrap}.rdg-cell-action-menu>span:hover{color:#262626;text-decoration:none;background-color:#f5f5f5}", ""]);

	// exports


/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, ".radio-custom,.react-grid-checkbox{opacity:0;position:absolute}.radio-custom,.radio-custom-label,.react-grid-checkbox,.react-grid-checkbox-label{display:inline-block;vertical-align:middle;cursor:pointer}.radio-custom-label,.react-grid-checkbox-label{position:relative}.radio-custom+.radio-custom-label:before,.react-grid-checkbox+.react-grid-checkbox-label:before{content:\"\";background:#fff;border:2px solid #ddd;display:inline-block;vertical-align:middle;width:20px;height:20px;text-align:center}.react-grid-checkbox:checked+.react-grid-checkbox-label:before{background:#005295;box-shadow:inset 0 0 0 4px #fff}.radio-custom:focus+.radio-custom-label,.react-grid-checkbox:focus+.react-grid-checkbox-label{outline:1px solid #ddd}.react-grid-HeaderCell input[type=checkbox]{z-index:99999}.react-grid-HeaderCell>.react-grid-checkbox-container{padding:0 10px;height:100%}.react-grid-HeaderCell>.react-grid-checkbox-container>.react-grid-checkbox-label{margin:0;position:relative;top:50%;transform:translateY(-50%)}.radio-custom+.radio-custom-label:before{border-radius:50%}.radio-custom:checked+.radio-custom-label:before{background:#ccc;box-shadow:inset 0 0 0 4px #fff}.checkbox-align{text-align:center}", ""]);

	// exports


/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, ".react-grid-Row.row-context-menu .react-grid-Cell,.react-grid-Row:hover .react-grid-Cell{background-color:#f9f9f9}.react-grid-Row:hover .rdg-row-index{display:none}.react-grid-Row:hover .rdg-actions-checkbox{display:block}.react-grid-Row:hover .rdg-drag-row-handle{cursor:move;cursor:grab;cursor:-moz-grab;cursor:-webkit-grab;width:12px;height:30px;margin-left:0;background-image:url(\"data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjlweCIgaGVpZ2h0PSIyOXB4IiB2aWV3Qm94PSIwIDAgOSAyOSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkgKDMxNjY3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kcmFnIGljb248L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iQWN0dWFsaXNhdGlvbi12MiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkRlc2t0b3AiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNS4wMDAwMDAsIC0yNjIuMDAwMDAwKSIgZmlsbD0iI0Q4RDhEOCI+CiAgICAgICAgICAgIDxnIGlkPSJJbnRlcmFjdGlvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjAwMDAwMCwgMjU4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlJvdy1Db250cm9scyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9ImRyYWctaWNvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSIyIiBjeT0iMiIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSI3IiBjeT0iMiIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSIyIiBjeT0iNyIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSI3IiBjeT0iNyIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSIyIiBjeT0iMTIiIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTMwIiBjeD0iNyIgY3k9IjEyIiByPSIyIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0zMCIgY3g9IjIiIGN5PSIxNyIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSI3IiBjeT0iMTciIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTMwIiBjeD0iMiIgY3k9IjIyIiByPSIyIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0zMCIgY3g9IjciIGN5PSIyMiIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSIyIiBjeT0iMjciIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTMwIiBjeD0iNyIgY3k9IjI3IiByPSIyIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==\");background-repeat:no-repeat}.react-grid-Row.row-selected,.react-grid-Row .row-selected{background-color:#dbecfa}.react-grid-row-group .row-expand-icon:hover{color:#777}.react-grid-row-index{padding:0 18px}.rdg-row-index{display:block;text-align:center}.rdg-row-actions-cell{padding:0}.rdg-actions-checkbox{display:none;text-align:center}.rdg-actions-checkbox.selected{display:block}.rdg-dragging{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.rdg-dragged-row{border-bottom:1px solid #000}.rdg-scrolling{pointer-events:none}", ""]);

	// exports


/***/ }),

/***/ 116:
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */

	"use strict";

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;


/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(111);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./react-data-grid-cell.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./react-data-grid-cell.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);

	var joinClasses = __webpack_require__(6);
	var DEFINE_SORT = {
	  ASC: 'ASC',
	  DESC: 'DESC',
	  NONE: 'NONE'
	};

	var SortableHeaderCell = function (_React$Component) {
	  _inherits(SortableHeaderCell, _React$Component);

	  function SortableHeaderCell() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, SortableHeaderCell);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SortableHeaderCell.__proto__ || Object.getPrototypeOf(SortableHeaderCell)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
	      var direction = void 0;
	      var _this$props = _this.props,
	          sortDirection = _this$props.sortDirection,
	          sortDescendingFirst = _this$props.sortDescendingFirst;

	      switch (sortDirection) {
	        default:
	        case null:
	        case undefined:
	        case DEFINE_SORT.NONE:
	          direction = sortDescendingFirst ? DEFINE_SORT.DESC : DEFINE_SORT.ASC;
	          break;
	        case DEFINE_SORT.ASC:
	          direction = sortDescendingFirst ? DEFINE_SORT.NONE : DEFINE_SORT.DESC;
	          break;
	        case DEFINE_SORT.DESC:
	          direction = sortDescendingFirst ? DEFINE_SORT.ASC : DEFINE_SORT.NONE;
	          break;
	      }
	      _this.props.onSort(_this.props.columnKey, direction);
	    }, _this.getSortByText = function () {
	      var unicodeKeys = {
	        ASC: '9650',
	        DESC: '9660'
	      };
	      return _this.props.sortDirection === 'NONE' ? '' : String.fromCharCode(unicodeKeys[_this.props.sortDirection]);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(SortableHeaderCell, [{
	    key: 'render',
	    value: function render() {
	      var className = joinClasses({
	        'react-grid-HeaderCell-sortable': true,
	        'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
	        'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
	      });
	      var content = this.props.headerRenderer ? React.cloneElement(this.props.headerRenderer, this.props) : this.props.column.name;
	      return React.createElement(
	        'div',
	        { className: className,
	          onClick: this.onClick,
	          style: { cursor: 'pointer' } },
	        React.createElement(
	          'span',
	          { className: 'pull-right' },
	          this.getSortByText()
	        ),
	        content
	      );
	    }
	  }]);

	  return SortableHeaderCell;
	}(React.Component);

	SortableHeaderCell.propTypes = {
	  columnKey: _propTypes2['default'].string.isRequired,
	  column: _propTypes2['default'].shape({ name: _propTypes2['default'].node }),
	  onSort: _propTypes2['default'].func.isRequired,
	  sortDirection: _propTypes2['default'].oneOf(Object.keys(DEFINE_SORT)),
	  headerRenderer: _propTypes2['default'].node,
	  sortDescendingFirst: _propTypes2['default'].bool
	};


	module.exports = SortableHeaderCell;
	module.exports.DEFINE_SORT = DEFINE_SORT;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var CellActionShape = {
	  icon: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element]).isRequired,
	  callback: _propTypes2['default'].func,
	  actions: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
	    text: _propTypes2['default'].string,
	    callback: _propTypes2['default'].func
	  }))
	};

	exports['default'] = CellActionShape;

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function isKeyPrintable(keycode) {
	  var valid = keycode > 47 && keycode < 58 || // number keys
	  keycode === 32 || keycode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
	  keycode > 64 && keycode < 91 || // letter keys
	  keycode > 95 && keycode < 112 || // numpad keys
	  keycode > 185 && keycode < 193 || // ;=,-./` (in order)
	  keycode > 218 && keycode < 223; // [\]' (in order)

	  return valid;
	}

	function isCtrlKeyHeldDown(e) {
	  return (e.ctrlKey === true || e.metaKey === true) && e.key !== 'Control';
	}

	exports.isKeyPrintable = isKeyPrintable;
	exports.isCtrlKeyHeldDown = isCtrlKeyHeldDown;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _ExcelColumn = __webpack_require__(23);

	var _ExcelColumn2 = _interopRequireDefault(_ExcelColumn);

	var _utils = __webpack_require__(10);

	var _CellMetaDataShape = __webpack_require__(41);

	var _CellMetaDataShape2 = _interopRequireDefault(_CellMetaDataShape);

	var _CellAction = __webpack_require__(328);

	var _CellAction2 = _interopRequireDefault(_CellAction);

	var _CellExpander = __webpack_require__(329);

	var _CellExpander2 = _interopRequireDefault(_CellExpander);

	var _ChildRowDeleteButton = __webpack_require__(330);

	var _ChildRowDeleteButton2 = _interopRequireDefault(_ChildRowDeleteButton);

	var _ColumnUtils = __webpack_require__(14);

	var _ColumnUtils2 = _interopRequireDefault(_ColumnUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);

	var joinClasses = __webpack_require__(6);

	var SimpleCellFormatter = __webpack_require__(165);
	var createObjectWithProperties = __webpack_require__(55);

	__webpack_require__(126);

	// The list of the propTypes that we want to include in the Cell div
	var knownDivPropertyKeys = ['height', 'value'];

	var Cell = function (_React$PureComponent) {
	  _inherits(Cell, _React$PureComponent);

	  function Cell() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Cell);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cell.__proto__ || Object.getPrototypeOf(Cell)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      isCellValueChanging: false,
	      isLockChanging: false
	    }, _this.onCellClick = function () {
	      var _this$props = _this.props,
	          idx = _this$props.idx,
	          rowIdx = _this$props.rowIdx,
	          cellMetaData = _this$props.cellMetaData;

	      if ((0, _utils.isFunction)(cellMetaData.onCellClick)) {
	        cellMetaData.onCellClick({ idx: idx, rowIdx: rowIdx });
	      }
	    }, _this.onCellMouseDown = function () {
	      var _this$props2 = _this.props,
	          idx = _this$props2.idx,
	          rowIdx = _this$props2.rowIdx,
	          cellMetaData = _this$props2.cellMetaData;

	      if ((0, _utils.isFunction)(cellMetaData.onCellMouseDown)) {
	        cellMetaData.onCellMouseDown({ idx: idx, rowIdx: rowIdx });
	      }
	    }, _this.onCellMouseEnter = function () {
	      var _this$props3 = _this.props,
	          idx = _this$props3.idx,
	          rowIdx = _this$props3.rowIdx,
	          cellMetaData = _this$props3.cellMetaData;

	      if ((0, _utils.isFunction)(cellMetaData.onCellMouseEnter)) {
	        cellMetaData.onCellMouseEnter({ idx: idx, rowIdx: rowIdx });
	      }
	    }, _this.onCellContextMenu = function () {
	      var _this$props4 = _this.props,
	          idx = _this$props4.idx,
	          rowIdx = _this$props4.rowIdx,
	          cellMetaData = _this$props4.cellMetaData;

	      if ((0, _utils.isFunction)(cellMetaData.onCellContextMenu)) {
	        cellMetaData.onCellContextMenu({ idx: idx, rowIdx: rowIdx });
	      }
	    }, _this.onCellDoubleClick = function (e) {
	      e.stopPropagation();
	      var _this$props5 = _this.props,
	          idx = _this$props5.idx,
	          rowIdx = _this$props5.rowIdx,
	          cellMetaData = _this$props5.cellMetaData;

	      if ((0, _utils.isFunction)(cellMetaData.onCellDoubleClick)) {
	        cellMetaData.onCellDoubleClick({ idx: idx, rowIdx: rowIdx });
	      }
	    }, _this.onCellExpand = function (e) {
	      e.stopPropagation();
	      var meta = _this.props.cellMetaData;
	      if (meta != null && meta.onCellExpand != null) {
	        meta.onCellExpand({ rowIdx: _this.props.rowIdx, idx: _this.props.idx, rowData: _this.props.rowData, expandArgs: _this.props.expandableOptions });
	      }
	    }, _this.onCellKeyDown = function (e) {
	      if (_this.canExpand() && e.key === 'Enter') {
	        _this.onCellExpand(e);
	      }
	    }, _this.onDeleteSubRow = function () {
	      var meta = _this.props.cellMetaData;
	      if (meta != null && meta.onDeleteSubRow != null) {
	        meta.onDeleteSubRow({ rowIdx: _this.props.rowIdx, idx: _this.props.idx, rowData: _this.props.rowData, expandArgs: _this.props.expandableOptions });
	      }
	    }, _this.onDragOver = function (e) {
	      e.preventDefault();
	    }, _this.getStyle = function () {
	      var style = {
	        position: 'absolute',
	        width: _this.props.column.width,
	        height: _this.props.height,
	        left: _this.props.column.left,
	        contain: 'layout'
	      };
	      return style;
	    }, _this.getFormatter = function () {
	      return _this.props.column.formatter;
	    }, _this.getRowData = function () {
	      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;

	      return props.rowData.toJSON ? props.rowData.toJSON() : props.rowData;
	    }, _this.getFormatterDependencies = function () {
	      // convention based method to get corresponding Id or Name of any Name or Id property
	      if (typeof _this.props.column.getRowMetaData === 'function') {
	        if (false) {
	          console.warn('getRowMetaData for formatters is deprecated and will be removed in a future version of ReactDataGrid. Instead access row prop of formatter');
	        }
	        return _this.props.column.getRowMetaData(_this.getRowData(), _this.props.column);
	      }
	    }, _this.getCellClass = function () {
	      var _this$props6 = _this.props,
	          idx = _this$props6.idx,
	          lastFrozenColumnIndex = _this$props6.lastFrozenColumnIndex;

	      var className = joinClasses(_this.props.column.cellClass, 'react-grid-Cell', _this.props.className, _ColumnUtils2['default'].isFrozen(_this.props.column) ? 'react-grid-Cell--frozen' : null, lastFrozenColumnIndex === idx ? 'rdg-last--frozen' : null);
	      var extraClasses = joinClasses({
	        'row-selected': _this.props.isRowSelected,
	        editing: _this.isEditorEnabled(),
	        'cell-tooltip': _this.props.tooltip ? true : false,
	        'rdg-child-cell': _this.props.expandableOptions && _this.props.expandableOptions.subRowDetails && _this.props.expandableOptions.treeDepth > 0,
	        'last-column': _this.props.column.isLastColumn
	      });
	      return joinClasses(className, extraClasses);
	    }, _this.getUpdateCellClass = function () {
	      return _this.props.column.getUpdateCellClass ? _this.props.column.getUpdateCellClass(_this.props.selectedColumn, _this.props.column, _this.state.isCellValueChanging) : '';
	    }, _this.isEditorEnabled = function () {
	      return _this.props.isEditorEnabled === true;
	    }, _this.setScrollLeft = function (scrollLeft) {
	      var node = _this.node;
	      if (node) {
	        var transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	        node.style.webkitTransform = transform;
	        node.style.transform = transform;
	      }
	    }, _this.removeScroll = function () {
	      var node = _this.node;
	      if (node) {
	        node.style.webkitTransform = null;
	        node.style.transform = null;
	      }
	    }, _this.canExpand = function () {
	      return _this.props.expandableOptions && _this.props.expandableOptions.canExpand;
	    }, _this.createColumEventCallBack = function (onColumnEvent, info) {
	      return function (e) {
	        onColumnEvent(e, info);
	      };
	    }, _this.createCellEventCallBack = function (gridEvent, columnEvent) {
	      return function (e) {
	        gridEvent(e);
	        columnEvent(e);
	      };
	    }, _this.createEventDTO = function (gridEvents, columnEvents, onColumnEvent) {
	      var allEvents = Object.assign({}, gridEvents);

	      for (var eventKey in columnEvents) {
	        if (columnEvents.hasOwnProperty(eventKey)) {
	          var eventInfo = { idx: _this.props.idx, rowIdx: _this.props.rowIdx, rowId: _this.props.rowData[_this.props.cellMetaData.rowKey], name: eventKey };
	          var eventCallback = _this.createColumEventCallBack(onColumnEvent, eventInfo);

	          if (allEvents.hasOwnProperty(eventKey)) {
	            var currentEvent = allEvents[eventKey];
	            allEvents[eventKey] = _this.createCellEventCallBack(currentEvent, eventCallback);
	          } else {
	            allEvents[eventKey] = eventCallback;
	          }
	        }
	      }

	      return allEvents;
	    }, _this.getEvents = function () {
	      var columnEvents = _this.props.column ? Object.assign({}, _this.props.column.events) : undefined;
	      var onColumnEvent = _this.props.cellMetaData ? _this.props.cellMetaData.onColumnEvent : undefined;
	      var gridEvents = {
	        onClick: _this.onCellClick,
	        onMouseDown: _this.onCellMouseDown,
	        onMouseEnter: _this.onCellMouseEnter,
	        onDoubleClick: _this.onCellDoubleClick,
	        onContextMenu: _this.onCellContextMenu,
	        onDragOver: _this.onDragOver
	      };

	      if (!columnEvents || !onColumnEvent) {
	        return gridEvents;
	      }

	      return _this.createEventDTO(gridEvents, columnEvents, onColumnEvent);
	    }, _this.getKnownDivProps = function () {
	      return createObjectWithProperties(_this.props, knownDivPropertyKeys);
	    }, _this.setCellRef = function (node) {
	      _this.node = node;
	    }, _this.renderCellContent = function (props) {
	      var CellContent = void 0;
	      var Formatter = _this.getFormatter();
	      if (React.isValidElement(Formatter)) {
	        CellContent = React.cloneElement(Formatter, _extends({}, props, { dependentValues: _this.getFormatterDependencies(), row: _this.getRowData() }));
	      } else if ((0, _utils.isFunction)(Formatter)) {
	        CellContent = React.createElement(Formatter, { value: _this.props.value, dependentValues: _this.getFormatterDependencies(), isScrolling: _this.props.isScrolling, row: _this.getRowData() });
	      } else {
	        CellContent = React.createElement(SimpleCellFormatter, { value: _this.props.value });
	      }
	      var isExpandCell = _this.props.expandableOptions ? _this.props.expandableOptions.field === _this.props.column.key : false;
	      var treeDepth = _this.props.expandableOptions ? _this.props.expandableOptions.treeDepth : 0;
	      var marginLeft = _this.props.expandableOptions && isExpandCell ? _this.props.expandableOptions.treeDepth * 30 : 0;
	      var cellExpander = void 0;
	      var cellDeleter = void 0;
	      if (_this.canExpand()) {
	        cellExpander = React.createElement(_CellExpander2['default'], { expandableOptions: _this.props.expandableOptions, onCellExpand: _this.onCellExpand });
	      }

	      var isDeleteSubRowEnabled = _this.props.cellMetaData.onDeleteSubRow ? true : false;

	      if (treeDepth > 0 && isExpandCell) {
	        cellDeleter = React.createElement(_ChildRowDeleteButton2['default'], { treeDepth: treeDepth, cellHeight: _this.props.height, siblingIndex: _this.props.expandableOptions.subRowDetails.siblingIndex, numberSiblings: _this.props.expandableOptions.subRowDetails.numberSiblings, onDeleteSubRow: _this.onDeleteSubRow, isDeleteSubRowEnabled: isDeleteSubRowEnabled });
	      }
	      return React.createElement(
	        'div',
	        { className: 'react-grid-Cell__value' },
	        cellDeleter,
	        React.createElement(
	          'div',
	          { style: { marginLeft: marginLeft } },
	          React.createElement(
	            'span',
	            null,
	            CellContent
	          ),
	          ' ',
	          _this.props.cellControls,
	          ' ',
	          cellExpander
	        )
	      );
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Cell, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.setState({
	        isCellValueChanging: this.props.isCellValueChanging(this.props.value, nextProps.value),
	        isLockChanging: _ColumnUtils2['default'].isFrozen(this.props.column) !== _ColumnUtils2['default'].isFrozen(nextProps.column)
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.checkScroll();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (this.state.isLockChanging && !_ColumnUtils2['default'].isFrozen(this.props.column)) {
	        this.removeScroll();
	      }
	    }
	  }, {
	    key: 'checkScroll',
	    value: function checkScroll() {
	      var _props = this.props,
	          scrollLeft = _props.scrollLeft,
	          column = _props.column;

	      var node = this.node;
	      if (_ColumnUtils2['default'].isFrozen(column) && node && node.style.transform != null) {
	        this.setScrollLeft(scrollLeft);
	      }
	    }
	  }, {
	    key: 'getCellActions',
	    value: function getCellActions() {
	      var _props2 = this.props,
	          cellMetaData = _props2.cellMetaData,
	          column = _props2.column,
	          rowData = _props2.rowData;

	      if (cellMetaData && cellMetaData.getCellActions) {
	        var cellActionButtons = cellMetaData.getCellActions(column, rowData);
	        if (cellActionButtons && cellActionButtons.length) {
	          return cellActionButtons.map(function (action, index) {
	            return React.createElement(_CellAction2['default'], { key: index, action: action, isFirst: index === 0 });
	          });
	        }
	        return null;
	      }
	      return null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.props.column.hidden) {
	        return null;
	      }

	      var style = this.getStyle();

	      var className = this.getCellClass();

	      var cellActionButtons = this.getCellActions();
	      var _props3 = this.props,
	          value = _props3.value,
	          column = _props3.column,
	          rowIdx = _props3.rowIdx,
	          isExpanded = _props3.isExpanded,
	          isScrolling = _props3.isScrolling;

	      var cellContent = this.props.children || this.renderCellContent({
	        value: value,
	        column: column,
	        rowIdx: rowIdx,
	        isExpanded: isExpanded,
	        isScrolling: isScrolling
	      });

	      var events = this.getEvents();
	      var tooltip = this.props.tooltip ? React.createElement(
	        'span',
	        { className: 'cell-tooltip-text' },
	        this.props.tooltip
	      ) : null;

	      return React.createElement(
	        'div',
	        _extends({}, this.getKnownDivProps(), {
	          className: className,
	          style: style
	        }, events, {
	          ref: this.setCellRef
	        }),
	        cellActionButtons,
	        cellContent,
	        tooltip
	      );
	    }
	  }]);

	  return Cell;
	}(React.PureComponent);

	Cell.propTypes = {
	  rowIdx: _propTypes2['default'].number.isRequired,
	  idx: _propTypes2['default'].number.isRequired,
	  isSelected: _propTypes2['default'].bool,
	  wasPreviouslySelected: _propTypes2['default'].bool,
	  isEditorEnabled: _propTypes2['default'].bool,
	  selectedColumn: _propTypes2['default'].object,
	  height: _propTypes2['default'].number,
	  column: _propTypes2['default'].shape(_ExcelColumn2['default']).isRequired,
	  value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].object, _propTypes2['default'].bool]),
	  isExpanded: _propTypes2['default'].bool,
	  isRowSelected: _propTypes2['default'].bool,
	  cellMetaData: _propTypes2['default'].shape(_CellMetaDataShape2['default']).isRequired,
	  handleDragStart: _propTypes2['default'].func,
	  className: _propTypes2['default'].string,
	  cellControls: _propTypes2['default'].any,
	  rowData: _propTypes2['default'].object.isRequired,
	  forceUpdate: _propTypes2['default'].bool,
	  expandableOptions: _propTypes2['default'].object.isRequired,
	  tooltip: _propTypes2['default'].string,
	  isScrolling: _propTypes2['default'].bool,
	  isCellValueChanging: _propTypes2['default'].func,
	  children: _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(_propTypes2['default'].node), _propTypes2['default'].node]),
	  scrollLeft: _propTypes2['default'].number.isRequired
	};
	Cell.defaultProps = {
	  isExpanded: false,
	  value: '',
	  isCellValueChanging: function isCellValueChanging(value, nextValue) {
	    return value !== nextValue;
	  }
	};
	exports['default'] = Cell;

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _utils = __webpack_require__(10);

	var shallowCloneObject = __webpack_require__(167);
	var sameColumn = __webpack_require__(331);
	var ColumnUtils = __webpack_require__(14);
	var getScrollbarSize = __webpack_require__(110);


	function setColumnWidths(columns, totalWidth) {
	  return columns.map(function (column) {
	    var colInfo = Object.assign({}, column);
	    if (column.width) {
	      if (/^([0-9]+)%$/.exec(column.width.toString())) {
	        colInfo.width = Math.floor(column.width / 100 * totalWidth);
	      }
	    }
	    return colInfo;
	  });
	}

	function setDefferedColumnWidths(columns, unallocatedWidth, minColumnWidth) {
	  var defferedColumns = columns.filter(function (c) {
	    return !c.width;
	  });
	  return columns.map(function (column) {
	    if (!column.width && column.width !== 0) {
	      if (unallocatedWidth <= 0) {
	        column.width = minColumnWidth;
	      } else {
	        var columnWidth = Math.floor(unallocatedWidth / ColumnUtils.getSize(defferedColumns));
	        if (columnWidth < minColumnWidth) {
	          column.width = minColumnWidth;
	        } else {
	          column.width = columnWidth;
	        }
	      }
	    }
	    return column;
	  });
	}

	function setColumnOffsets(columns) {
	  var left = 0;
	  return columns.map(function (column) {
	    column.left = left;
	    left += column.width;
	    return column;
	  });
	}

	var getTotalColumnWidth = function getTotalColumnWidth(columns) {
	  return columns.reduce(function (acc, c) {
	    return acc + c.width;
	  }, 0);
	};

	function recalculate(metrics) {
	  // compute width for columns which specify width
	  var columns = setColumnWidths(metrics.columns, metrics.totalWidth);

	  var unallocatedWidth = columns.filter(function (c) {
	    return c.width;
	  }).reduce(function (w, column) {
	    return w - column.width;
	  }, metrics.totalWidth);
	  unallocatedWidth -= getScrollbarSize();
	  var width = columns.filter(function (c) {
	    return c.width;
	  }).reduce(function (w, column) {
	    return w + column.width;
	  }, 0);

	  // compute width for columns which doesn't specify width
	  columns = setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);

	  // compute left offset
	  columns = setColumnOffsets(columns);
	  var frozenColumns = columns.filter(function (c) {
	    return ColumnUtils.isFrozen(c);
	  });
	  var nonFrozenColumns = columns.filter(function (c) {
	    return !ColumnUtils.isFrozen(c);
	  });
	  columns = frozenColumns.concat(nonFrozenColumns).map(function (c, i) {
	    c.idx = i;
	    return c;
	  });
	  return {
	    columns: columns,
	    width: width,
	    totalWidth: metrics.totalWidth,
	    totalColumnWidth: getTotalColumnWidth(columns),
	    minColumnWidth: metrics.minColumnWidth
	  };
	}

	/**
	 * Update column metrics calculation by resizing a column.
	 *
	 * @param {ColumnMetricsType} metrics
	 * @param {Column} column
	 * @param {number} width
	 */
	function resizeColumn(metrics, index, width) {
	  var column = ColumnUtils.getColumn(metrics.columns, index);
	  var metricsClone = shallowCloneObject(metrics);
	  metricsClone.columns = metrics.columns.slice(0);

	  var updatedColumn = shallowCloneObject(column);
	  updatedColumn.width = Math.max(width, metricsClone.minColumnWidth);

	  metricsClone = ColumnUtils.spliceColumn(metricsClone, index, updatedColumn);

	  return recalculate(metricsClone);
	}

	function areColumnsImmutable(prevColumns, nextColumns) {
	  return (0, _utils.isColumnsImmutable)(prevColumns) && (0, _utils.isColumnsImmutable)(nextColumns);
	}

	function compareEachColumn(prevColumns, nextColumns, isSameColumn) {
	  var i = void 0;
	  var len = void 0;
	  var column = void 0;
	  var prevColumnsByKey = {};
	  var nextColumnsByKey = {};

	  if (ColumnUtils.getSize(prevColumns) !== ColumnUtils.getSize(nextColumns)) {
	    return false;
	  }

	  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
	    column = prevColumns[i];
	    prevColumnsByKey[column.key] = column;
	  }

	  for (i = 0, len = ColumnUtils.getSize(nextColumns); i < len; i++) {
	    column = nextColumns[i];
	    nextColumnsByKey[column.key] = column;
	    var prevColumn = prevColumnsByKey[column.key];
	    if (prevColumn === undefined || !isSameColumn(prevColumn, column)) {
	      return false;
	    }
	  }

	  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
	    column = prevColumns[i];
	    var nextColumn = nextColumnsByKey[column.key];
	    if (nextColumn === undefined) {
	      return false;
	    }
	  }
	  return true;
	}

	function sameColumns(prevColumns, nextColumns, isSameColumn) {
	  if (areColumnsImmutable(prevColumns, nextColumns)) {
	    return prevColumns === nextColumns;
	  }

	  return compareEachColumn(prevColumns, nextColumns, isSameColumn);
	}

	module.exports = { recalculate: recalculate, resizeColumn: resizeColumn, sameColumn: sameColumn, sameColumns: sameColumns };

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ExcelColumn = __webpack_require__(23);

	var _ExcelColumn2 = _interopRequireDefault(_ExcelColumn);

	var _ColumnUtils = __webpack_require__(14);

	var _ColumnUtils2 = _interopRequireDefault(_ColumnUtils);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(16);
	var joinClasses = __webpack_require__(6);

	var ResizeHandle = __webpack_require__(339);
	__webpack_require__(59);

	function simpleCellRenderer(objArgs) {
	  var headerText = objArgs.column.rowType === 'header' ? objArgs.column.name : '';
	  return React.createElement(
	    'div',
	    { className: 'widget-HeaderCell__value' },
	    headerText
	  );
	}

	var HeaderCell = function (_React$Component) {
	  _inherits(HeaderCell, _React$Component);

	  function HeaderCell() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, HeaderCell);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HeaderCell.__proto__ || Object.getPrototypeOf(HeaderCell)).call.apply(_ref, [this].concat(args))), _this), _this.state = { resizing: false }, _this.onDragStart = function (e) {
	      _this.setState({ resizing: true });
	      // need to set dummy data for FF
	      if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
	    }, _this.onDrag = function (e) {
	      var resize = _this.props.onResize || null; // for flows sake, doesnt recognise a null check direct
	      if (resize) {
	        var width = _this.getWidthFromMouseEvent(e);
	        if (width > 0) {
	          resize(_this.props.column, width);
	        }
	      }
	    }, _this.onDragEnd = function (e) {
	      var width = _this.getWidthFromMouseEvent(e);
	      _this.props.onResizeEnd(_this.props.column, width);
	      _this.setState({ resizing: false });
	    }, _this.getWidthFromMouseEvent = function (e) {
	      var right = e.pageX || e.touches && e.touches[0] && e.touches[0].pageX || e.changedTouches && e.changedTouches[e.changedTouches.length - 1].pageX;
	      var left = ReactDOM.findDOMNode(_this).getBoundingClientRect().left;
	      return right - left;
	    }, _this.getCell = function () {
	      var _this$props = _this.props,
	          height = _this$props.height,
	          column = _this$props.column,
	          renderer = _this$props.renderer;

	      if (React.isValidElement(renderer)) {
	        // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
	        if (typeof _this.props.renderer.type === 'string') {
	          return React.cloneElement(renderer, { height: height });
	        }
	        return React.cloneElement(renderer, { column: column, height: height });
	      }
	      return _this.props.renderer({ column: column });
	    }, _this.getStyle = function () {
	      return {
	        width: _this.props.column.width,
	        left: _this.props.column.left,
	        display: 'inline-block',
	        position: 'absolute',
	        height: _this.props.height,
	        margin: 0,
	        textOverflow: 'ellipsis',
	        whiteSpace: 'nowrap'
	      };
	    }, _this.setScrollLeft = function (scrollLeft) {
	      var node = ReactDOM.findDOMNode(_this);
	      node.style.webkitTransform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	      node.style.transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	    }, _this.removeScroll = function () {
	      var node = ReactDOM.findDOMNode(_this);
	      if (node) {
	        var transform = 'none';
	        node.style.webkitTransform = transform;
	        node.style.transform = transform;
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(HeaderCell, [{
	    key: 'render',
	    value: function render() {
	      var resizeHandle = void 0;
	      if (this.props.column.resizable) {
	        resizeHandle = React.createElement(ResizeHandle, {
	          onDrag: this.onDrag,
	          onDragStart: this.onDragStart,
	          onDragEnd: this.onDragEnd
	        });
	      }
	      var className = joinClasses({
	        'react-grid-HeaderCell': true,
	        'react-grid-HeaderCell--resizing': this.state.resizing,
	        'react-grid-HeaderCell--frozen': _ColumnUtils2['default'].isFrozen(this.props.column)
	      });
	      className = joinClasses(className, this.props.className, this.props.column.cellClass);
	      var cell = this.getCell();
	      return React.createElement(
	        'div',
	        { className: className, style: this.getStyle() },
	        cell,
	        resizeHandle
	      );
	    }
	  }]);

	  return HeaderCell;
	}(React.Component);

	HeaderCell.propTypes = {
	  renderer: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].element]).isRequired,
	  column: _propTypes2['default'].shape(_ExcelColumn2['default']).isRequired,
	  onResize: _propTypes2['default'].func.isRequired,
	  height: _propTypes2['default'].number.isRequired,
	  onResizeEnd: _propTypes2['default'].func.isRequired,
	  className: _propTypes2['default'].string
	};
	HeaderCell.defaultProps = {
	  renderer: simpleCellRenderer
	};


	module.exports = HeaderCell;

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

	"use strict";

	module.exports = {
	  Backspace: 8,
	  Tab: 9,
	  Enter: 13,
	  Shift: 16,
	  Ctrl: 17,
	  Alt: 18,
	  PauseBreak: 19,
	  CapsLock: 20,
	  Escape: 27,
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
	  0: 48,
	  1: 49,
	  2: 50,
	  3: 51,
	  4: 52,
	  5: 53,
	  6: 54,
	  7: 55,
	  8: 56,
	  9: 57,
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
	  LeftWindowKey: 91,
	  RightWindowKey: 92,
	  SelectKey: 93,
	  NumPad0: 96,
	  NumPad1: 97,
	  NumPad2: 98,
	  NumPad3: 99,
	  NumPad4: 100,
	  NumPad5: 101,
	  NumPad6: 102,
	  NumPad7: 103,
	  NumPad8: 104,
	  NumPad9: 105,
	  Multiply: 106,
	  Add: 107,
	  Subtract: 109,
	  DecimalPoint: 110,
	  Divide: 111,
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
	  F12: 123,
	  NumLock: 144,
	  ScrollLock: 145,
	  SemiColon: 186,
	  EqualSign: 187,
	  Comma: 188,
	  Dash: 189,
	  Period: 190,
	  ForwardSlash: 191,
	  GraveAccent: 192,
	  OpenBracket: 219,
	  BackSlash: 220,
	  CloseBracket: 221,
	  SingleQuote: 222
	};

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _RowComparer = __webpack_require__(54);

	var _RowComparer2 = _interopRequireDefault(_RowComparer);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(6);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Cell = __webpack_require__(159);

	var _Cell2 = _interopRequireDefault(_Cell);

	var _CellMetaDataShape = __webpack_require__(41);

	var _CellMetaDataShape2 = _interopRequireDefault(_CellMetaDataShape);

	var _createObjectWithProperties = __webpack_require__(55);

	var _createObjectWithProperties2 = _interopRequireDefault(_createObjectWithProperties);

	var _ColumnUtils = __webpack_require__(14);

	var _ColumnUtils2 = _interopRequireDefault(_ColumnUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(60);

	// The list of the propTypes that we want to include in the Row div
	var knownDivPropertyKeys = ['height'];

	var Row = function (_React$Component) {
	  _inherits(Row, _React$Component);

	  function Row() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Row);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Row.__proto__ || Object.getPrototypeOf(Row)).call.apply(_ref, [this].concat(args))), _this), _this.handleDragEnter = function (e) {
	      e.dataTransfer.dropEffect = 'move';
	      var _this$props = _this.props,
	          idx = _this$props.idx,
	          onDragEnter = _this$props.cellMetaData.onDragEnter;

	      onDragEnter({ overRowIdx: idx });
	    }, _this.handleDrop = function (e) {
	      e.preventDefault();
	    }, _this.getCell = function (column, i) {
	      var CellRenderer = _this.props.cellRenderer;
	      var _this$props2 = _this.props,
	          idx = _this$props2.idx,
	          cellMetaData = _this$props2.cellMetaData,
	          isScrolling = _this$props2.isScrolling,
	          row = _this$props2.row,
	          isSelected = _this$props2.isSelected,
	          scrollLeft = _this$props2.scrollLeft,
	          lastFrozenColumnIndex = _this$props2.lastFrozenColumnIndex;
	      var key = column.key,
	          formatter = column.formatter;

	      var baseCellProps = { key: key + '-' + idx, idx: column.idx, rowIdx: idx, height: _this.getRowHeight(), column: column, cellMetaData: cellMetaData };

	      var cellProps = {
	        ref: function ref(node) {
	          _this[key] = node;
	        },
	        value: _this.getCellValue(key || i),
	        rowData: row,
	        isRowSelected: isSelected,
	        expandableOptions: _this.getExpandableOptions(key),
	        formatter: formatter,
	        isScrolling: isScrolling,
	        scrollLeft: scrollLeft,
	        lastFrozenColumnIndex: lastFrozenColumnIndex
	      };

	      return _react2['default'].createElement(CellRenderer, _extends({}, baseCellProps, cellProps));
	    }, _this.getCells = function () {
	      var _this$props3 = _this.props,
	          colOverscanStartIdx = _this$props3.colOverscanStartIdx,
	          colOverscanEndIdx = _this$props3.colOverscanEndIdx,
	          columns = _this$props3.columns;

	      var frozenColumns = columns.filter(function (c) {
	        return _ColumnUtils2['default'].isFrozen(c);
	      });
	      var nonFrozenColumnsToRender = columns.slice(colOverscanStartIdx, colOverscanEndIdx + 1).filter(function (c) {
	        return !_ColumnUtils2['default'].isFrozen(c);
	      });
	      return frozenColumns.concat(nonFrozenColumnsToRender).map(function (column) {
	        return _this.getCell(column);
	      });
	    }, _this.getRowHeight = function () {
	      var rows = _this.props.expandedRows || null;
	      if (rows && _this.props.idx) {
	        var row = rows[_this.props.idx] || null;
	        if (row) {
	          return row.height;
	        }
	      }
	      return _this.props.height;
	    }, _this.getCellValue = function (key) {
	      var val = void 0;
	      if (key === 'select-row') {
	        return _this.props.isSelected;
	      } else if (typeof _this.props.row.get === 'function') {
	        val = _this.props.row.get(key);
	      } else {
	        val = _this.props.row[key];
	      }
	      return val;
	    }, _this.getExpandableOptions = function (columnKey) {
	      var subRowDetails = _this.props.subRowDetails;
	      if (subRowDetails) {
	        return { canExpand: subRowDetails && subRowDetails.field === columnKey && (subRowDetails.children && subRowDetails.children.length > 0 || subRowDetails.group === true), field: subRowDetails.field, expanded: subRowDetails && subRowDetails.expanded, children: subRowDetails && subRowDetails.children, treeDepth: subRowDetails ? subRowDetails.treeDepth : 0, subRowDetails: subRowDetails };
	      }
	      return {};
	    }, _this.setScrollLeft = function (scrollLeft) {
	      _this.props.columns.forEach(function (column) {
	        if (_ColumnUtils2['default'].isFrozen(column)) {
	          if (!_this[column.key]) return;
	          _this[column.key].setScrollLeft(scrollLeft);
	        }
	      });
	    }, _this.getKnownDivProps = function () {
	      return (0, _createObjectWithProperties2['default'])(_this.props, knownDivPropertyKeys);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Row, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return (0, _RowComparer2['default'])(nextProps, this.props);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var className = (0, _classnames2['default'])('react-grid-Row', 'react-grid-Row--' + (this.props.idx % 2 === 0 ? 'even' : 'odd'), {
	        'row-selected': this.props.isSelected
	      }, this.props.extraClasses, { 'rdg-scrolling': this.props.isScrolling });

	      var style = {
	        height: this.getRowHeight(this.props),
	        overflow: 'hidden',
	        contain: 'layout'
	      };

	      var cells = this.getCells();
	      return _react2['default'].createElement(
	        'div',
	        _extends({}, this.getKnownDivProps(), {
	          className: className,
	          style: style,
	          onDragEnter: this.handleDragEnter,
	          onDrop: this.handleDrop
	        }),
	        _react2['default'].isValidElement(this.props.row) ? this.props.row : cells
	      );
	    }
	  }]);

	  return Row;
	}(_react2['default'].Component);

	Row.displayName = 'Row';
	Row.propTypes = {
	  height: _propTypes2['default'].number.isRequired,
	  columns: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].array]).isRequired,
	  row: _propTypes2['default'].any.isRequired,
	  cellRenderer: _propTypes2['default'].func,
	  cellMetaData: _propTypes2['default'].shape(_CellMetaDataShape2['default']),
	  isSelected: _propTypes2['default'].bool,
	  idx: _propTypes2['default'].number.isRequired,
	  expandedRows: _propTypes2['default'].arrayOf(_propTypes2['default'].object),
	  extraClasses: _propTypes2['default'].string,
	  forceUpdate: _propTypes2['default'].bool,
	  subRowDetails: _propTypes2['default'].object,
	  isRowHovered: _propTypes2['default'].bool,
	  colVisibleStartIdx: _propTypes2['default'].number.isRequired,
	  colVisibleEndIdx: _propTypes2['default'].number.isRequired,
	  colOverscanStartIdx: _propTypes2['default'].number.isRequired,
	  colOverscanEndIdx: _propTypes2['default'].number.isRequired,
	  isScrolling: _propTypes2['default'].bool.isRequired,
	  scrollLeft: _propTypes2['default'].number,
	  lastFrozenColumnIndex: _propTypes2['default'].number
	};
	Row.defaultProps = {
	  cellRenderer: _Cell2['default'],
	  isSelected: false,
	  height: 35
	};


	module.exports = Row;

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var SelectAll = function SelectAll(props) {
	  return _react2['default'].createElement(
	    'div',
	    { className: 'react-grid-checkbox-container checkbox-align' },
	    _react2['default'].createElement('input', {
	      className: 'react-grid-checkbox',
	      type: 'checkbox',
	      name: 'select-all-checkbox',
	      id: 'select-all-checkbox',
	      ref: props.inputRef,
	      onChange: props.onChange
	    }),
	    _react2['default'].createElement('label', { htmlFor: 'select-all-checkbox', className: 'react-grid-checkbox-label' })
	  );
	};

	SelectAll.propTypes = {
	  onChange: _propTypes2['default'].func,
	  inputRef: _propTypes2['default'].func
	};

	exports['default'] = SelectAll;

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);

	var SimpleCellFormatter = function (_React$Component) {
	  _inherits(SimpleCellFormatter, _React$Component);

	  function SimpleCellFormatter() {
	    _classCallCheck(this, SimpleCellFormatter);

	    return _possibleConstructorReturn(this, (SimpleCellFormatter.__proto__ || Object.getPrototypeOf(SimpleCellFormatter)).apply(this, arguments));
	  }

	  _createClass(SimpleCellFormatter, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return nextProps.value !== this.props.value;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { title: this.props.value },
	        this.props.value
	      );
	    }
	  }]);

	  return SimpleCellFormatter;
	}(React.Component);

	SimpleCellFormatter.propTypes = {
	  value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].object, _propTypes2['default'].bool])
	};


	module.exports = SimpleCellFormatter;

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.InteractionMasks = exports.EventBus = undefined;

	var _EventBus = __webpack_require__(349);

	var _EventBus2 = _interopRequireDefault(_EventBus);

	var _InteractionMasks = __webpack_require__(350);

	var _InteractionMasks2 = _interopRequireDefault(_InteractionMasks);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports.EventBus = _EventBus2['default'];
	exports.InteractionMasks = _InteractionMasks2['default'];

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

	"use strict";

	function shallowCloneObject(obj) {
	  var result = {};
	  for (var k in obj) {
	    if (obj.hasOwnProperty(k)) {
	      result[k] = obj[k];
	    }
	  }
	  return result;
	}

	module.exports = shallowCloneObject;

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _ExcelColumn = __webpack_require__(23);

	var _ExcelColumn2 = _interopRequireDefault(_ExcelColumn);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FilterableHeaderCell = function (_React$Component) {
	  _inherits(FilterableHeaderCell, _React$Component);

	  function FilterableHeaderCell() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, FilterableHeaderCell);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilterableHeaderCell.__proto__ || Object.getPrototypeOf(FilterableHeaderCell)).call.apply(_ref, [this].concat(args))), _this), _this.state = { filterTerm: '' }, _this.handleChange = function (e) {
	      var val = e.target.value;
	      _this.setState({ filterTerm: val });
	      _this.props.onChange({ filterTerm: val, column: _this.props.column });
	    }, _this.renderInput = function () {
	      if (_this.props.column.filterable === false) {
	        return _react2['default'].createElement('span', null);
	      }

	      var inputKey = 'header-filter-' + _this.props.column.key;
	      return _react2['default'].createElement('input', { key: inputKey, type: 'text', className: 'form-control input-sm', placeholder: 'Search', value: _this.state.filterTerm, onChange: _this.handleChange });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(FilterableHeaderCell, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'div',
	          { className: 'form-group' },
	          this.renderInput()
	        )
	      );
	    }
	  }]);

	  return FilterableHeaderCell;
	}(_react2['default'].Component);

	FilterableHeaderCell.propTypes = {
	  onChange: _propTypes2['default'].func.isRequired,
	  column: _propTypes2['default'].shape(_ExcelColumn2['default'])
	};


	module.exports = FilterableHeaderCell;

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames = __webpack_require__(6);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _SimpleTextEditor = __webpack_require__(69);

	var _SimpleTextEditor2 = _interopRequireDefault(_SimpleTextEditor);

	var _utils = __webpack_require__(10);

	var _keyboardUtils = __webpack_require__(154);

	var _zIndexes = __webpack_require__(106);

	var _zIndexes2 = _interopRequireDefault(_zIndexes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(86);

	var isFrozen = function isFrozen(column) {
	  return column.frozen === true || column.locked === true;
	};

	var EditorContainer = function (_React$Component) {
	  _inherits(EditorContainer, _React$Component);

	  function EditorContainer() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, EditorContainer);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditorContainer.__proto__ || Object.getPrototypeOf(EditorContainer)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(EditorContainer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var inputNode = this.getInputNode();
	      if (inputNode !== undefined) {
	        this.setTextInputFocus();
	        if (!this.getEditor().disableContainerStyles) {
	          inputNode.className += ' editor-main';
	          inputNode.style.height = this.props.height - 1 + 'px';
	        }
	      }
	      window.addEventListener('scroll', this.setContainerPosition);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      if (prevProps.scrollLeft !== this.props.scrollLeft || prevProps.scrollTop !== this.props.scrollTop) {
	        this.commitCancel();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (!this.changeCommitted && !this.changeCanceled) {
	        this.commit({ key: 'Enter' });
	      }
	      window.removeEventListener('scroll', this.setContainerPosition);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          width = _props.width,
	          height = _props.height,
	          column = _props.column;

	      var zIndex = isFrozen(column) ? _zIndexes2['default'].FROZEN_EDITOR_CONTAINER : _zIndexes2['default'].EDITOR_CONTAINER;
	      var style = { position: 'fixed', height: height, width: width, zIndex: zIndex, transform: this.calculateTransform() };
	      return _react2['default'].createElement(
	        'div',
	        { ref: this.setContainerRef, style: style, className: this.getContainerClass(), onBlur: this.handleBlur, onKeyDown: this.onKeyDown, onContextMenu: this.handleRightClick },
	        this.createEditor(),
	        this.renderStatusIcon()
	      );
	    }
	  }]);

	  return EditorContainer;
	}(_react2['default'].Component);

	EditorContainer.displayName = 'EditorContainer';
	EditorContainer.propTypes = {
	  rowIdx: _propTypes2['default'].number,
	  rowData: _propTypes2['default'].object.isRequired,
	  value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number, _propTypes2['default'].object, _propTypes2['default'].bool]).isRequired,
	  column: _propTypes2['default'].object.isRequired,
	  height: _propTypes2['default'].number.isRequired,
	  onGridKeyDown: _propTypes2['default'].func,
	  onCommit: _propTypes2['default'].func,
	  onCommitCancel: _propTypes2['default'].func,
	  firstEditorKeyPress: _propTypes2['default'].string,
	  width: _propTypes2['default'].number,
	  top: _propTypes2['default'].number,
	  left: _propTypes2['default'].number,
	  scrollLeft: _propTypes2['default'].number,
	  scrollTop: _propTypes2['default'].number
	};

	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;

	  this.state = { isInvalid: false };
	  this.changeCommitted = false;
	  this.changeCanceled = false;

	  this.setContainerPosition = function () {
	    if (_this2.container) {
	      _this2.container.style.transform = _this2.calculateTransform();
	    }
	  };

	  this.calculateTransform = function () {
	    var _props2 = _this2.props,
	        column = _props2.column,
	        left = _props2.left,
	        scrollLeft = _props2.scrollLeft,
	        top = _props2.top,
	        scrollTop = _props2.scrollTop;

	    var editorLeft = isFrozen(column) ? left : left - scrollLeft;
	    var editorTop = top - scrollTop - window.pageYOffset;
	    return 'translate(' + editorLeft + 'px, ' + editorTop + 'px)';
	  };

	  this.isKeyExplicitlyHandled = function (key) {
	    return (0, _utils.isFunction)(_this2['onPress' + key]);
	  };

	  this.checkAndCall = function (methodName, args) {
	    if ((0, _utils.isFunction)(_this2[methodName])) {
	      _this2[methodName](args);
	    }
	  };

	  this.onKeyDown = function (e) {
	    if ((0, _keyboardUtils.isCtrlKeyHeldDown)(e)) {
	      _this2.checkAndCall('onPressKeyWithCtrl', e);
	    } else if (_this2.isKeyExplicitlyHandled(e.key)) {
	      // break up individual keyPress events to have their own specific callbacks
	      var callBack = 'onPress' + e.key;
	      _this2.checkAndCall(callBack, e);
	    } else if ((0, _keyboardUtils.isKeyPrintable)(e.keyCode)) {
	      e.stopPropagation();
	      _this2.checkAndCall('onPressChar', e);
	    }

	    // Track which keys are currently down for shift clicking etc
	    _this2._keysDown = _this2._keysDown || {};
	    _this2._keysDown[e.keyCode] = true;
	    if ((0, _utils.isFunction)(_this2.props.onGridKeyDown)) {
	      _this2.props.onGridKeyDown(e);
	    }
	  };

	  this.setEditorRef = function (editor) {
	    _this2.editor = editor;
	  };

	  this.setContainerRef = function (container) {
	    _this2.container = container;
	  };

	  this.createEditor = function () {
	    var editorProps = {
	      ref: _this2.setEditorRef,
	      column: _this2.props.column,
	      value: _this2.getInitialValue(),
	      onCommit: _this2.commit,
	      onCommitCancel: _this2.commitCancel,
	      rowMetaData: _this2.getRowMetaData(),
	      rowData: _this2.props.rowData,
	      height: _this2.props.height,
	      onBlur: _this2.commit,
	      onOverrideKeyDown: _this2.onKeyDown
	    };

	    var CustomEditor = _this2.props.column.editor;
	    // return custom column editor or SimpleEditor if none specified
	    if (_react2['default'].isValidElement(CustomEditor)) {
	      return _react2['default'].cloneElement(CustomEditor, editorProps);
	    }
	    if ((0, _utils.isFunction)(CustomEditor)) {
	      return _react2['default'].createElement(CustomEditor, _extends({ ref: _this2.setEditorRef }, editorProps));
	    }

	    return _react2['default'].createElement(_SimpleTextEditor2['default'], { ref: _this2.setEditorRef, column: _this2.props.column, value: _this2.getInitialValue(), onBlur: _this2.commit, rowMetaData: _this2.getRowMetaData(), onKeyDown: function onKeyDown() {}, commit: function commit() {} });
	  };

	  this.onPressEnter = function () {
	    _this2.commit({ key: 'Enter' });
	  };

	  this.onPressTab = function () {
	    _this2.commit({ key: 'Tab' });
	  };

	  this.onPressEscape = function (e) {
	    if (!_this2.editorIsSelectOpen()) {
	      _this2.commitCancel();
	    } else {
	      // prevent event from bubbling if editor has results to select
	      e.stopPropagation();
	    }
	  };

	  this.onPressArrowDown = function (e) {
	    if (_this2.editorHasResults()) {
	      // dont want to propogate as that then moves us round the grid
	      e.stopPropagation();
	    } else {
	      _this2.commit(e);
	    }
	  };

	  this.onPressArrowUp = function (e) {
	    if (_this2.editorHasResults()) {
	      // dont want to propogate as that then moves us round the grid
	      e.stopPropagation();
	    } else {
	      _this2.commit(e);
	    }
	  };

	  this.onPressArrowLeft = function (e) {
	    // prevent event propogation. this disables left cell navigation
	    if (!_this2.isCaretAtBeginningOfInput()) {
	      e.stopPropagation();
	    } else {
	      _this2.commit(e);
	    }
	  };

	  this.onPressArrowRight = function (e) {
	    // prevent event propogation. this disables right cell navigation
	    if (!_this2.isCaretAtEndOfInput()) {
	      e.stopPropagation();
	    } else {
	      _this2.commit(e);
	    }
	  };

	  this.editorHasResults = function () {
	    if ((0, _utils.isFunction)(_this2.getEditor().hasResults)) {
	      return _this2.getEditor().hasResults();
	    }

	    return false;
	  };

	  this.editorIsSelectOpen = function () {
	    if ((0, _utils.isFunction)(_this2.getEditor().isSelectOpen)) {
	      return _this2.getEditor().isSelectOpen();
	    }

	    return false;
	  };

	  this.getRowMetaData = function () {
	    // clone row data so editor cannot actually change this
	    // convention based method to get corresponding Id or Name of any Name or Id property
	    if (typeof _this2.props.column.getRowMetaData === 'function') {
	      return _this2.props.column.getRowMetaData(_this2.props.rowData, _this2.props.column);
	    }
	  };

	  this.getEditor = function () {
	    return _this2.editor;
	  };

	  this.getInputNode = function () {
	    return _this2.getEditor().getInputNode();
	  };

	  this.getInitialValue = function () {
	    var _props3 = _this2.props,
	        key = _props3.firstEditorKeyPress,
	        value = _props3.value;

	    if (key === 'Delete' || key === 'Backspace') {
	      return '';
	    } else if (key === 'Enter') {
	      return value;
	    }

	    return key || value;
	  };

	  this.getContainerClass = function () {
	    return (0, _classnames2['default'])({
	      'rdg-editor-container': true,
	      'has-error': _this2.state.isInvalid === true
	    });
	  };

	  this.commit = function (args) {
	    var onCommit = _this2.props.onCommit;

	    var opts = args || {};
	    var updated = _this2.getEditor().getValue();
	    if (_this2.isNewValueValid(updated)) {
	      _this2.changeCommitted = true;
	      var cellKey = _this2.props.column.key;
	      onCommit({ cellKey: cellKey, rowIdx: _this2.props.rowIdx, updated: updated, key: opts.key });
	    }
	  };

	  this.commitCancel = function () {
	    _this2.changeCanceled = true;
	    _this2.props.onCommitCancel();
	  };

	  this.isNewValueValid = function (value) {
	    if ((0, _utils.isFunction)(_this2.getEditor().validate)) {
	      var isValid = _this2.getEditor().validate(value);
	      _this2.setState({ isInvalid: !isValid });
	      return isValid;
	    }

	    return true;
	  };

	  this.setCaretAtEndOfInput = function () {
	    var input = _this2.getInputNode();
	    // taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	    var txtLength = input.value.length;
	    if (input.setSelectionRange) {
	      input.setSelectionRange(txtLength, txtLength);
	    } else if (input.createTextRange) {
	      var fieldRange = input.createTextRange();
	      fieldRange.moveStart('character', txtLength);
	      fieldRange.collapse();
	      fieldRange.select();
	    }
	  };

	  this.isCaretAtBeginningOfInput = function () {
	    var inputNode = _this2.getInputNode();
	    return inputNode.selectionStart === inputNode.selectionEnd && inputNode.selectionStart === 0;
	  };

	  this.isCaretAtEndOfInput = function () {
	    var inputNode = _this2.getInputNode();
	    return inputNode.selectionStart === inputNode.value.length;
	  };

	  this.isBodyClicked = function (e) {
	    var relatedTarget = _this2.getRelatedTarget(e);
	    return relatedTarget === null;
	  };

	  this.isViewportClicked = function (e) {
	    var relatedTarget = _this2.getRelatedTarget(e);
	    return relatedTarget.className.indexOf('react-grid-Viewport') > -1;
	  };

	  this.isClickInsideEditor = function (e) {
	    var relatedTarget = _this2.getRelatedTarget(e);
	    return e.currentTarget.contains(relatedTarget) || relatedTarget.className.indexOf('editing') > -1 || relatedTarget.className.indexOf('react-grid-Cell') > -1;
	  };

	  this.getRelatedTarget = function (e) {
	    return e.relatedTarget || e.explicitOriginalTarget || document.activeElement; // IE11
	  };

	  this.handleRightClick = function (e) {
	    e.stopPropagation();
	  };

	  this.handleBlur = function (e) {
	    e.stopPropagation();
	    if (_this2.isBodyClicked(e)) {
	      _this2.commit(e);
	    }

	    if (!_this2.isBodyClicked(e)) {
	      // prevent null reference
	      if (_this2.isViewportClicked(e) || !_this2.isClickInsideEditor(e)) {
	        _this2.commit(e);
	      }
	    }
	  };

	  this.setTextInputFocus = function () {
	    var keyCode = _this2.props.firstEditorKeyPress;
	    var inputNode = _this2.getInputNode();
	    inputNode.focus();
	    if (inputNode.tagName === 'INPUT') {
	      if (!(0, _keyboardUtils.isKeyPrintable)(keyCode)) {
	        inputNode.focus();
	        inputNode.select();
	      } else {
	        inputNode.select();
	      }
	    }
	  };

	  this.renderStatusIcon = function () {
	    if (_this2.state.isInvalid === true) {
	      return _react2['default'].createElement('span', { className: 'glyphicon glyphicon-remove form-control-feedback' });
	    }
	  };
	};

	module.exports = EditorContainer;

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(16);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _Row = __webpack_require__(163);

	var _Row2 = _interopRequireDefault(_Row);

	var _CellActionShape = __webpack_require__(153);

	var _CellActionShape2 = _interopRequireDefault(_CellActionShape);

	var _RowUtils = __webpack_require__(109);

	var rowUtils = _interopRequireWildcard(_RowUtils);

	var _RowGroup = __webpack_require__(340);

	var _RowGroup2 = _interopRequireDefault(_RowGroup);

	var _masks = __webpack_require__(166);

	var _canvasUtils = __webpack_require__(353);

	var _utils = __webpack_require__(10);

	var _constants = __webpack_require__(22);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(86);

	var Canvas = function (_React$PureComponent) {
	  _inherits(Canvas, _React$PureComponent);

	  function Canvas() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Canvas);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      scrollingTimeout: null
	    }, _this.rows = [], _this._currentRowsRange = { start: 0, end: 0 }, _this._scroll = { scrollTop: 0, scrollLeft: 0 }, _this.onRows = function () {
	      if (_this._currentRowsRange !== { start: 0, end: 0 }) {
	        _this.props.onRows(_this._currentRowsRange);
	        _this._currentRowsRange = { start: 0, end: 0 };
	      }
	    }, _this.scrollToRow = function (scrollToRowIndex) {
	      var _this$props = _this.props,
	          rowHeight = _this$props.rowHeight,
	          rowsCount = _this$props.rowsCount,
	          height = _this$props.height;

	      _this.canvas.scrollTop = Math.min(scrollToRowIndex * rowHeight, rowsCount * rowHeight - height);
	    }, _this.onFocusInteractionMask = function (focus) {
	      var _this$_scroll = _this._scroll,
	          scrollTop = _this$_scroll.scrollTop,
	          scrollLeft = _this$_scroll.scrollLeft;

	      focus();
	      if (_this.canvas) {
	        _this.canvas.scrollTop = scrollTop;
	        _this.canvas.scrollLeft = scrollLeft;
	      }
	    }, _this.onScroll = function (e) {
	      if (_this.canvas !== e.target) {
	        return;
	      }
	      var _e$target = e.target,
	          scrollLeft = _e$target.scrollLeft,
	          scrollTop = _e$target.scrollTop;

	      var scroll = { scrollTop: scrollTop, scrollLeft: scrollLeft };
	      _this._scroll = scroll;
	      _this.props.onScroll(scroll);
	    }, _this.getClientScrollTopOffset = function (node) {
	      var rowHeight = _this.props.rowHeight;

	      var scrollVariation = node.scrollTop % rowHeight;
	      return scrollVariation > 0 ? rowHeight - scrollVariation : 0;
	    }, _this.onHitBottomCanvas = function () {
	      var rowHeight = _this.props.rowHeight;

	      var node = _this.canvas;
	      node.scrollTop += rowHeight + _this.getClientScrollTopOffset(node);
	    }, _this.onHitTopCanvas = function () {
	      var rowHeight = _this.props.rowHeight;

	      var node = _this.canvas;
	      node.scrollTop -= rowHeight - _this.getClientScrollTopOffset(node);
	    }, _this.scrollToColumn = function (idx) {
	      var _this$canvas = _this.canvas,
	          scrollLeft = _this$canvas.scrollLeft,
	          clientWidth = _this$canvas.clientWidth;

	      var newScrollLeft = (0, _canvasUtils.getColumnScrollPosition)(_this.props.columns, idx, scrollLeft, clientWidth);

	      if (newScrollLeft != null) {
	        _this.canvas.scrollLeft = scrollLeft + newScrollLeft;
	      }
	    }, _this.onHitLeftCanvas = function (_ref2) {
	      var idx = _ref2.idx;

	      _this.scrollToColumn(idx);
	    }, _this.onHitRightCanvas = function (_ref3) {
	      var idx = _ref3.idx;

	      _this.scrollToColumn(idx);
	    }, _this.getRows = function (rowOverscanStartIdx, rowOverscanEndIdx) {
	      _this._currentRowsRange = { start: rowOverscanStartIdx, end: rowOverscanEndIdx };
	      if (Array.isArray(_this.props.rowGetter)) {
	        return _this.props.rowGetter.slice(rowOverscanStartIdx, rowOverscanEndIdx);
	      }
	      var rows = [];
	      var i = rowOverscanStartIdx;
	      while (i < rowOverscanEndIdx) {
	        var row = _this.props.rowGetter(i);
	        var subRowDetails = {};
	        if (_this.props.getSubRowDetails) {
	          subRowDetails = _this.props.getSubRowDetails(row);
	        }
	        rows.push({ row: row, subRowDetails: subRowDetails });
	        i++;
	      }
	      return rows;
	    }, _this.getScroll = function () {
	      var _this$canvas2 = _this.canvas,
	          scrollTop = _this$canvas2.scrollTop,
	          scrollLeft = _this$canvas2.scrollLeft;

	      return { scrollTop: scrollTop, scrollLeft: scrollLeft };
	    }, _this.isRowSelected = function (idx, row) {
	      // Use selectedRows if set
	      if (_this.props.selectedRows !== null) {
	        var selectedRows = _this.props.selectedRows.filter(function (r) {
	          var rowKeyValue = row.get ? row.get(_this.props.rowKey) : row[_this.props.rowKey];
	          return r[_this.props.rowKey] === rowKeyValue;
	        });
	        return selectedRows.length > 0 && selectedRows[0].isSelected;
	      }

	      // Else use new rowSelection props
	      if (_this.props.rowSelection) {
	        var _this$props$rowSelect = _this.props.rowSelection,
	            keys = _this$props$rowSelect.keys,
	            indexes = _this$props$rowSelect.indexes,
	            isSelectedKey = _this$props$rowSelect.isSelectedKey;

	        return rowUtils.isRowSelected(keys, indexes, isSelectedKey, row, idx);
	      }

	      return false;
	    }, _this.setScrollLeft = function (scrollLeft) {
	      _this.rows.forEach(function (r, idx) {
	        if (r) {
	          var row = _this.getRowByRef(idx);
	          if (row && row.setScrollLeft) {
	            row.setScrollLeft(scrollLeft);
	          }
	        }
	      });
	    }, _this.getRowByRef = function (i) {
	      // check if wrapped with React DND drop target
	      var wrappedRow = _this.rows[i] && _this.rows[i].getDecoratedComponentInstance ? _this.rows[i].getDecoratedComponentInstance(i) : null;
	      if (wrappedRow) {
	        return wrappedRow.row;
	      }
	      return _this.rows[i];
	    }, _this.getSelectedRowTop = function (rowIdx) {
	      var row = _this.getRowByRef(rowIdx);
	      if (row) {
	        var node = _reactDom2['default'].findDOMNode(row);
	        return node && node.offsetTop;
	      }
	      return _this.props.rowHeight * rowIdx;
	    }, _this.getSelectedRowHeight = function (rowIdx) {
	      var row = _this.getRowByRef(rowIdx);
	      if (row) {
	        var node = _reactDom2['default'].findDOMNode(row);
	        return node && node.clientHeight > 0 ? node.clientHeight : _this.props.rowHeight;
	      }
	      return _this.props.rowHeight;
	    }, _this.getSelectedRowColumns = function (rowIdx) {
	      var row = _this.getRowByRef(rowIdx);
	      return row ? row.props.columns : _this.props.columns;
	    }, _this.setCanvasRef = function (canvas) {
	      _this.canvas = canvas;
	    }, _this.setRowRef = function (idx) {
	      return function (row) {
	        _this.rows[idx] = row;
	      };
	    }, _this.renderRow = function (props) {
	      var row = props.row;
	      if (row.__metaData && row.__metaData.getRowRenderer) {
	        return row.__metaData.getRowRenderer(_this.props, props.idx);
	      }
	      if (row.__metaData && row.__metaData.isGroup) {
	        return _this.renderGroupRow(props);
	      }
	      if (_this.props.rowRenderer) {
	        return _this.renderCustomRowRenderer(props);
	      }

	      return _react2['default'].createElement(_Row2['default'], props);
	    }, _this.renderPlaceholder = function (key, height) {
	      // just renders empty cells
	      // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
	      return _react2['default'].createElement(
	        'div',
	        { key: key, style: { height: height } },
	        _this.props.columns.map(function (column, idx) {
	          return _react2['default'].createElement('div', { style: { width: column.width }, key: idx });
	        })
	      );
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Canvas, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.unsubscribeScrollToColumn = this.props.eventBus.subscribe(_constants.EventTypes.SCROLL_TO_COLUMN, this.scrollToColumn);
	      this.onRows();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._currentRowsRange = { start: 0, end: 0 };
	      this._scroll = { scrollTop: 0, scrollLeft: 0 };
	      this.rows = [];
	      this.unsubscribeScrollToColumn();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var scrollToRowIndex = this.props.scrollToRowIndex;

	      if (prevProps.scrollToRowIndex !== scrollToRowIndex && scrollToRowIndex !== 0) {
	        this.scrollToRow(scrollToRowIndex);
	      }
	      this.onRows();
	    }
	  }, {
	    key: 'renderCustomRowRenderer',
	    value: function renderCustomRowRenderer(props) {
	      var ref = props.ref,
	          otherProps = _objectWithoutProperties(props, ['ref']);

	      var CustomRowRenderer = this.props.rowRenderer;
	      var customRowRendererProps = _extends({}, otherProps, { renderBaseRow: function renderBaseRow(p) {
	          return _react2['default'].createElement(_Row2['default'], _extends({ ref: ref }, p));
	        } });
	      if (CustomRowRenderer.type === _Row2['default']) {
	        // In the case where Row is specified as the custom render, ensure the correct ref is passed
	        return _react2['default'].createElement(_Row2['default'], props);
	      }
	      if ((0, _utils.isFunction)(CustomRowRenderer)) {
	        return _react2['default'].createElement(CustomRowRenderer, customRowRendererProps);
	      }
	      if (_react2['default'].isValidElement(CustomRowRenderer)) {
	        return _react2['default'].cloneElement(CustomRowRenderer, customRowRendererProps);
	      }
	    }
	  }, {
	    key: 'renderGroupRow',
	    value: function renderGroupRow(props) {
	      var ref = props.ref,
	          rowGroupProps = _objectWithoutProperties(props, ['ref']);

	      return _react2['default'].createElement(_RowGroup2['default'], _extends({}, rowGroupProps, props.row.__metaData, {
	        rowRef: props.ref,
	        name: props.row.name,
	        eventBus: this.props.eventBus,
	        renderer: this.props.rowGroupRenderer,
	        renderBaseRow: function renderBaseRow(p) {
	          return _react2['default'].createElement(_Row2['default'], _extends({ ref: ref }, p));
	        }
	      }));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          rowOverscanStartIdx = _props.rowOverscanStartIdx,
	          rowOverscanEndIdx = _props.rowOverscanEndIdx,
	          cellMetaData = _props.cellMetaData,
	          columns = _props.columns,
	          colOverscanStartIdx = _props.colOverscanStartIdx,
	          colOverscanEndIdx = _props.colOverscanEndIdx,
	          colVisibleStartIdx = _props.colVisibleStartIdx,
	          colVisibleEndIdx = _props.colVisibleEndIdx,
	          lastFrozenColumnIndex = _props.lastFrozenColumnIndex,
	          expandedRows = _props.expandedRows,
	          rowHeight = _props.rowHeight,
	          rowsCount = _props.rowsCount,
	          totalColumnWidth = _props.totalColumnWidth,
	          totalWidth = _props.totalWidth,
	          height = _props.height,
	          rowGetter = _props.rowGetter,
	          RowsContainer = _props.RowsContainer,
	          contextMenu = _props.contextMenu;


	      var rows = this.getRows(rowOverscanStartIdx, rowOverscanEndIdx).map(function (r, idx) {
	        var rowIdx = rowOverscanStartIdx + idx;
	        var key = 'row-' + rowIdx;
	        return _this2.renderRow({
	          key: key,
	          ref: _this2.setRowRef(rowIdx),
	          idx: rowIdx,
	          rowVisibleStartIdx: _this2.props.rowVisibleStartIdx,
	          rowVisibleEndIdx: _this2.props.rowVisibleEndIdx,
	          row: r.row,
	          height: rowHeight,
	          onMouseOver: _this2.onMouseOver,
	          columns: columns,
	          isSelected: _this2.isRowSelected(rowIdx, r.row, rowOverscanStartIdx, rowOverscanEndIdx),
	          expandedRows: expandedRows,
	          cellMetaData: cellMetaData,
	          subRowDetails: r.subRowDetails,
	          colVisibleStartIdx: colVisibleStartIdx,
	          colVisibleEndIdx: colVisibleEndIdx,
	          colOverscanStartIdx: colOverscanStartIdx,
	          colOverscanEndIdx: colOverscanEndIdx,
	          lastFrozenColumnIndex: lastFrozenColumnIndex,
	          isScrolling: _this2.props.isScrolling,
	          scrollLeft: _this2._scroll.scrollLeft
	        });
	      });

	      if (rowOverscanStartIdx > 0) {
	        rows.unshift(this.renderPlaceholder('top', rowOverscanStartIdx * rowHeight));
	      }

	      if (rowsCount - rowOverscanEndIdx > 0) {
	        rows.push(this.renderPlaceholder('bottom', (rowsCount - rowOverscanEndIdx) * rowHeight));
	      }

	      var style = {
	        position: 'absolute',
	        top: 0,
	        left: 0,
	        overflowX: 'auto',
	        overflowY: 'scroll',
	        width: totalWidth,
	        height: height
	      };

	      return _react2['default'].createElement(
	        'div',
	        {
	          ref: this.setCanvasRef,
	          style: style,
	          onScroll: this.onScroll,
	          className: 'react-grid-Canvas' },
	        _react2['default'].createElement(_masks.InteractionMasks, {
	          rowGetter: rowGetter,
	          rowsCount: rowsCount,
	          width: this.props.totalWidth,
	          height: height,
	          rowHeight: rowHeight,
	          columns: columns,
	          rowOverscanStartIdx: this.props.rowOverscanStartIdx,
	          rowVisibleStartIdx: this.props.rowVisibleStartIdx,
	          rowVisibleEndIdx: this.props.rowVisibleEndIdx,
	          colVisibleStartIdx: colVisibleStartIdx,
	          colVisibleEndIdx: colVisibleEndIdx,
	          enableCellSelect: this.props.enableCellSelect,
	          enableCellAutoFocus: this.props.enableCellAutoFocus,
	          cellNavigationMode: this.props.cellNavigationMode,
	          eventBus: this.props.eventBus,
	          contextMenu: this.props.contextMenu,
	          onHitBottomBoundary: this.onHitBottomCanvas,
	          onHitTopBoundary: this.onHitTopCanvas,
	          onHitLeftBoundary: this.onHitLeftCanvas,
	          onHitRightBoundary: this.onHitRightCanvas,
	          onCommit: this.props.onCommit,
	          onCheckCellIsEditable: this.props.onCheckCellIsEditable,
	          onCellCopyPaste: this.props.onCellCopyPaste,
	          onGridRowsUpdated: this.props.onGridRowsUpdated,
	          onDragHandleDoubleClick: this.props.onDragHandleDoubleClick,
	          onBeforeFocus: this.onFocusInteractionMask,
	          onCellSelected: this.props.onCellSelected,
	          onCellDeSelected: this.props.onCellDeSelected,
	          onCellRangeSelectionStarted: this.props.onCellRangeSelectionStarted,
	          onCellRangeSelectionUpdated: this.props.onCellRangeSelectionUpdated,
	          onCellRangeSelectionCompleted: this.props.onCellRangeSelectionCompleted,
	          scrollLeft: this._scroll.scrollLeft,
	          scrollTop: this._scroll.scrollTop,
	          prevScrollLeft: this.props.prevScrollLeft,
	          prevScrollTop: this.props.prevScrollTop,
	          getSelectedRowHeight: this.getSelectedRowHeight,
	          getSelectedRowTop: this.getSelectedRowTop,
	          getSelectedRowColumns: this.getSelectedRowColumns
	        }),
	        _react2['default'].createElement(
	          RowsContainer,
	          { id: contextMenu ? contextMenu.props.id : 'rowsContainer' },
	          _react2['default'].createElement(
	            'div',
	            { style: { width: totalColumnWidth } },
	            rows
	          )
	        )
	      );
	    }
	  }]);

	  return Canvas;
	}(_react2['default'].PureComponent);

	Canvas.propTypes = {
	  rowRenderer: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].element]),
	  rowHeight: _propTypes2['default'].number.isRequired,
	  height: _propTypes2['default'].number.isRequired,
	  width: _propTypes2['default'].number,
	  totalWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
	  style: _propTypes2['default'].string,
	  className: _propTypes2['default'].string,
	  rowOverscanStartIdx: _propTypes2['default'].number.isRequired,
	  rowOverscanEndIdx: _propTypes2['default'].number.isRequired,
	  rowVisibleStartIdx: _propTypes2['default'].number.isRequired,
	  rowVisibleEndIdx: _propTypes2['default'].number.isRequired,
	  colVisibleStartIdx: _propTypes2['default'].number.isRequired,
	  colVisibleEndIdx: _propTypes2['default'].number.isRequired,
	  colOverscanStartIdx: _propTypes2['default'].number.isRequired,
	  colOverscanEndIdx: _propTypes2['default'].number.isRequired,
	  rowsCount: _propTypes2['default'].number.isRequired,
	  rowGetter: _propTypes2['default'].oneOfType([_propTypes2['default'].func.isRequired, _propTypes2['default'].array.isRequired]),
	  expandedRows: _propTypes2['default'].array,
	  onRows: _propTypes2['default'].func,
	  onScroll: _propTypes2['default'].func,
	  columns: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].array]).isRequired,
	  cellMetaData: _propTypes2['default'].shape(_CellActionShape2['default']).isRequired,
	  selectedRows: _propTypes2['default'].array,
	  rowKey: _propTypes2['default'].string,
	  rowScrollTimeout: _propTypes2['default'].number,
	  scrollToRowIndex: _propTypes2['default'].number,
	  contextMenu: _propTypes2['default'].element,
	  getSubRowDetails: _propTypes2['default'].func,
	  rowSelection: _propTypes2['default'].oneOfType([_propTypes2['default'].shape({
	    indexes: _propTypes2['default'].arrayOf(_propTypes2['default'].number).isRequired
	  }), _propTypes2['default'].shape({
	    isSelectedKey: _propTypes2['default'].string.isRequired
	  }), _propTypes2['default'].shape({
	    keys: _propTypes2['default'].shape({
	      values: _propTypes2['default'].array.isRequired,
	      rowKey: _propTypes2['default'].string.isRequired
	    }).isRequired
	  })]),
	  rowGroupRenderer: _propTypes2['default'].func,
	  isScrolling: _propTypes2['default'].bool,
	  length: _propTypes2['default'].number,
	  enableCellSelect: _propTypes2['default'].bool.isRequired,
	  enableCellAutoFocus: _propTypes2['default'].bool.isRequired,
	  cellNavigationMode: _propTypes2['default'].string.isRequired,
	  eventBus: _propTypes2['default'].object.isRequired,
	  onCheckCellIsEditable: _propTypes2['default'].func,
	  onCellCopyPaste: _propTypes2['default'].func,
	  onGridRowsUpdated: _propTypes2['default'].func.isRequired,
	  onDragHandleDoubleClick: _propTypes2['default'].func.isRequired,
	  onCellSelected: _propTypes2['default'].func,
	  onCellDeSelected: _propTypes2['default'].func,
	  onCellRangeSelectionStarted: _propTypes2['default'].func,
	  onCellRangeSelectionUpdated: _propTypes2['default'].func,
	  onCellRangeSelectionCompleted: _propTypes2['default'].func,
	  onCommit: _propTypes2['default'].func.isRequired
	};
	Canvas.defaultProps = {
	  onRows: function onRows() {},
	  selectedRows: [],
	  rowScrollTimeout: 0,
	  scrollToRowIndex: 0,
	  RowsContainer: function RowsContainer(_ref4) {
	    var children = _ref4.children;
	    return children;
	  },
	  rowGroupRenderer: _RowGroup.DefaultRowGroupRenderer
	};


	module.exports = Canvas;

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classnames = __webpack_require__(6);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _CellActionShape = __webpack_require__(153);

	var _CellActionShape2 = _interopRequireDefault(_CellActionShape);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CellAction = function (_React$Component) {
	  _inherits(CellAction, _React$Component);

	  function CellAction() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, CellAction);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CellAction.__proto__ || Object.getPrototypeOf(CellAction)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isMenuOpen: false }, _this.onToggleMenu = function () {
	      _this.setState(function (prevState) {
	        return { isMenuOpen: !prevState.isMenuOpen };
	      });
	    }, _this.onHideMenu = function () {
	      _this.setState({ isMenuOpen: false });
	    }, _this.onGetMenuOptions = function () {
	      return _this.props.action.actions.map(function (action, index) {
	        return _react2['default'].createElement(
	          'span',
	          { key: index, onClick: action.callback },
	          action.text
	        );
	      });
	    }, _this.isActionMenu = function () {
	      return !_this.props.action.callback && _this.props.action.actions && _this.props.action.actions.length;
	    }, _this.onActionButtonBlur = function () {
	      if (_this.isActionMenu()) {
	        _this.onHideMenu();
	      }
	    }, _this.onActionIconClick = function () {
	      if (!_this.isActionMenu()) {
	        _this.props.action.callback();
	      } else if (_this.props.action.actions && _this.props.action.actions.length) {
	        _this.onToggleMenu();
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(CellAction, [{
	    key: 'render',
	    value: function render() {
	      var isActionMenu = this.isActionMenu();

	      var cellActionClasses = (0, _classnames2['default'])('rdg-cell-action', {
	        'rdg-cell-action-last': this.props.isFirst
	      });

	      var actionButtonClasses = (0, _classnames2['default'])('rdg-cell-action-button', {
	        'rdg-cell-action-button-toggled': this.state.isMenuOpen
	      });

	      return _react2['default'].createElement(
	        'div',
	        { className: cellActionClasses, onMouseLeave: this.onActionButtonBlur },
	        _react2['default'].createElement(
	          'div',
	          { className: actionButtonClasses, onClick: this.onActionIconClick },
	          typeof this.props.action.icon === 'string' ? _react2['default'].createElement('span', { className: this.props.action.icon }) : this.props.action.icon
	        ),
	        isActionMenu && this.state.isMenuOpen && _react2['default'].createElement(
	          'div',
	          { className: 'rdg-cell-action-menu' },
	          this.onGetMenuOptions()
	        )
	      );
	    }
	  }]);

	  return CellAction;
	}(_react2['default'].Component);

	CellAction.propTypes = {
	  action: _propTypes2['default'].shape(_CellActionShape2['default']).isRequired,
	  isFirst: _propTypes2['default'].bool.isRequired
	};
	exports['default'] = CellAction;

/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _constants = __webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CellExpander = function (_React$Component) {
	  _inherits(CellExpander, _React$Component);

	  function CellExpander(props) {
	    _classCallCheck(this, CellExpander);

	    var _this = _possibleConstructorReturn(this, (CellExpander.__proto__ || Object.getPrototypeOf(CellExpander)).call(this, props));

	    _this.onCellExpand = function (e) {
	      _this.setState({ expanded: !_this.state.expanded });
	      _this.props.onCellExpand(e);
	    };

	    var expanded = props.expandableOptions && props.expandableOptions.expanded;
	    _this.state = { expanded: expanded };
	    return _this;
	  }

	  _createClass(CellExpander, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var expanded = nextProps.expandableOptions && nextProps.expandableOptions.expanded;
	      if (this.state.expanded !== expanded) {
	        this.setState({ expanded: expanded });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'span',
	        { className: 'rdg-cell-expand', onClick: this.onCellExpand },
	        this.state.expanded ? _constants.CellExpand.DOWN_TRIANGLE : _constants.CellExpand.RIGHT_TRIANGLE
	      );
	    }
	  }]);

	  return CellExpander;
	}(_react2['default'].Component);

	CellExpander.propTypes = {
	  expandableOptions: _propTypes2['default'].object.isRequired,
	  onCellExpand: _propTypes2['default'].func.isRequired
	};
	exports['default'] = CellExpander;

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(6);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ChildRowDeleteButton = function ChildRowDeleteButton(_ref) {
	  var treeDepth = _ref.treeDepth,
	      cellHeight = _ref.cellHeight,
	      siblingIndex = _ref.siblingIndex,
	      numberSiblings = _ref.numberSiblings,
	      onDeleteSubRow = _ref.onDeleteSubRow,
	      isDeleteSubRowEnabled = _ref.isDeleteSubRowEnabled,
	      _ref$allowAddChildRow = _ref.allowAddChildRow,
	      allowAddChildRow = _ref$allowAddChildRow === undefined ? true : _ref$allowAddChildRow;

	  var lastSibling = siblingIndex === numberSiblings - 1;
	  var className = (0, _classnames2['default'])({ 'rdg-child-row-action-cross': allowAddChildRow === true || !lastSibling }, { 'rdg-child-row-action-cross-last': allowAddChildRow === false && (lastSibling || numberSiblings === 1) });
	  var height = 12;
	  var width = 12;
	  var left = treeDepth * 15;
	  var top = (cellHeight - 12) / 2;
	  return _react2['default'].createElement(
	    'div',
	    null,
	    _react2['default'].createElement('div', { className: className }),
	    isDeleteSubRowEnabled && _react2['default'].createElement(
	      'div',
	      { style: { left: left, top: top, width: width, height: height }, className: 'rdg-child-row-btn', onClick: onDeleteSubRow },
	      _react2['default'].createElement('div', { className: 'glyphicon glyphicon-remove-sign' })
	    )
	  );
	};

	exports['default'] = ChildRowDeleteButton;

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var isValidElement = __webpack_require__(2).isValidElement;

	module.exports = function sameColumn(a, b) {
	  var k = void 0;

	  for (k in a) {
	    if (a.hasOwnProperty(k)) {
	      if (typeof a[k] === 'function' && typeof b[k] === 'function' || isValidElement(a[k]) && isValidElement(b[k])) {
	        continue;
	      }
	      if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
	        return false;
	      }
	    }
	  }

	  for (k in b) {
	    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
	      return false;
	    }
	  }

	  return true;
	};

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);

	var createObjectWithProperties = __webpack_require__(55);
	__webpack_require__(59);

	// The list of the propTypes that we want to include in the Draggable div
	var knownDivPropertyKeys = ['onDragStart', 'onDragEnd', 'onDrag', 'style'];

	var Draggable = function (_React$Component) {
	  _inherits(Draggable, _React$Component);

	  function Draggable() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Draggable);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      drag: null
	    }, _this.onMouseDown = function (e) {
	      var drag = _this.props.onDragStart(e);
	      if (e.preventDefault) {
	        e.preventDefault();
	      }

	      if (drag === null && e.button !== 0) {
	        return;
	      }

	      window.addEventListener('mouseup', _this.onMouseUp);
	      window.addEventListener('mousemove', _this.onMouseMove);
	      window.addEventListener('touchend', _this.onMouseUp);
	      window.addEventListener('touchmove', _this.onMouseMove);

	      _this.setState({ drag: drag });
	    }, _this.onMouseMove = function (e) {
	      if (_this.state.drag === null) {
	        return;
	      }

	      if (e.preventDefault) {
	        e.preventDefault();
	      }

	      _this.props.onDrag(e);
	    }, _this.onMouseUp = function (e) {
	      _this.cleanUp();
	      _this.props.onDragEnd(e, _this.state.drag);
	      _this.setState({ drag: null });
	    }, _this.cleanUp = function () {
	      window.removeEventListener('mouseup', _this.onMouseUp);
	      window.removeEventListener('mousemove', _this.onMouseMove);
	      window.removeEventListener('touchend', _this.onMouseUp);
	      window.removeEventListener('touchmove', _this.onMouseMove);
	    }, _this.getKnownDivProps = function () {
	      return createObjectWithProperties(_this.props, knownDivPropertyKeys);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Draggable, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.cleanUp();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement('div', _extends({}, this.getKnownDivProps(), {
	        onMouseDown: this.onMouseDown,
	        onTouchStart: this.onMouseDown,
	        className: 'react-grid-HeaderCell__draggable' }));
	    }
	  }]);

	  return Draggable;
	}(React.Component);

	Draggable.propTypes = {
	  onDragStart: _propTypes2['default'].func,
	  onDragEnd: _propTypes2['default'].func,
	  onDrag: _propTypes2['default'].func,
	  component: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].constructor]),
	  style: _propTypes2['default'].object
	};
	Draggable.defaultProps = {
	  onDragStart: function onDragStart() {
	    return true;
	  },
	  onDragEnd: function onDragEnd() {},
	  onDrag: function onDrag() {}
	};


	module.exports = Draggable;

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _ColumnUtils = __webpack_require__(14);

	var _ColumnUtils2 = _interopRequireDefault(_ColumnUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EmptyChildRow = function (_React$Component) {
	  _inherits(EmptyChildRow, _React$Component);

	  function EmptyChildRow() {
	    _classCallCheck(this, EmptyChildRow);

	    var _this = _possibleConstructorReturn(this, (EmptyChildRow.__proto__ || Object.getPrototypeOf(EmptyChildRow)).call(this));

	    _this.onAddSubRow = _this.onAddSubRow.bind(_this);
	    return _this;
	  }

	  _createClass(EmptyChildRow, [{
	    key: 'onAddSubRow',
	    value: function onAddSubRow() {
	      this.props.onAddSubRow(this.props.parentRowId);
	    }
	  }, {
	    key: 'getFrozenColumnsWidth',
	    value: function getFrozenColumnsWidth() {
	      var fixedWidth = 0;
	      var size = _ColumnUtils2['default'].getSize(this.props.columns);
	      for (var i = 0; i < size; i++) {
	        var column = _ColumnUtils2['default'].getColumn(this.props.columns, i);
	        if (column) {
	          if (_ColumnUtils2['default'].getValue(column, 'frozen')) {
	            fixedWidth += _ColumnUtils2['default'].getValue(column, 'width');
	          }
	        }
	      }
	      return fixedWidth;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props = this.props,
	          cellHeight = _props.cellHeight,
	          treeDepth = _props.treeDepth;

	      var height = 12;
	      var width = 12;
	      var left = treeDepth * 15;
	      var top = (cellHeight - 12) / 2;
	      var style = {
	        height: cellHeight,
	        borderBottom: '1px solid #dddddd'
	      };
	      var expandColumn = _ColumnUtils2['default'].getColumn(this.props.columns.filter(function (c) {
	        return c.key === _this2.props.expandColumnKey;
	      }), 0);

	      var cellLeft = expandColumn ? expandColumn.left : 0;
	      return _react2['default'].createElement(
	        'div',
	        { className: 'react-grid-Row rdg-add-child-row-container', style: style },
	        _react2['default'].createElement(
	          'div',
	          { className: 'react-grid-Cell', style: { position: 'absolute', height: cellHeight, width: '100%', left: cellLeft } },
	          _react2['default'].createElement(
	            'div',
	            { className: 'rdg-empty-child-row', style: { marginLeft: '30px', lineHeight: cellHeight + 'px' } },
	            _react2['default'].createElement('div', { className: '\'rdg-child-row-action-cross rdg-child-row-action-cross-last' }),
	            _react2['default'].createElement(
	              'div',
	              { style: { left: left, top: top, width: width, height: height }, className: 'rdg-child-row-btn', onClick: this.onAddSubRow },
	              _react2['default'].createElement('div', { className: 'glyphicon glyphicon-plus-sign' })
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return EmptyChildRow;
	}(_react2['default'].Component);

	EmptyChildRow.propTypes = {
	  treeDepth: _propTypes2['default'].number.isRequired,
	  cellHeight: _propTypes2['default'].number.isRequired,
	  onAddSubRow: _propTypes2['default'].func.isRequired,
	  parentRowId: _propTypes2['default'].number,
	  columns: _propTypes2['default'].array.isRequired,
	  expandColumnKey: _propTypes2['default'].string.isRequired
	};

	exports['default'] = EmptyChildRow;

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _CellMetaDataShape = __webpack_require__(41);

	var _CellMetaDataShape2 = _interopRequireDefault(_CellMetaDataShape);

	var _ColumnUtils = __webpack_require__(14);

	var _ColumnUtils2 = _interopRequireDefault(_ColumnUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);

	var Header = __webpack_require__(335);
	var Viewport = __webpack_require__(341);

	__webpack_require__(86);

	var Grid = function (_React$Component) {
	  _inherits(Grid, _React$Component);

	  function Grid() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Grid);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Grid.__proto__ || Object.getPrototypeOf(Grid)).call.apply(_ref, [this].concat(args))), _this), _this._scrollLeft = undefined, _this.getStyle = function () {
	      return {
	        overflow: 'hidden',
	        outline: 0,
	        position: 'relative',
	        minHeight: _this.props.minHeight
	      };
	    }, _this._onScroll = function () {
	      if (_this._scrollLeft !== undefined) {
	        _this.header.setScrollLeft(_this._scrollLeft);
	        if (_this.viewport) {
	          _this.viewport.setScrollLeft(_this._scrollLeft);
	        }
	      }
	    }, _this.onScroll = function (scrollState) {
	      _this.props.onScroll(scrollState);
	      var scrollLeft = scrollState.scrollLeft;

	      if (_this._scrollLeft !== scrollLeft || _this.areFrozenColumnsScrolledLeft(scrollLeft)) {
	        _this._scrollLeft = scrollLeft;
	        _this._onScroll();
	      }
	    }, _this.setHeaderRef = function (header) {
	      _this.header = header;
	    }, _this.setViewportRef = function (viewport) {
	      _this.viewport = viewport;
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Grid, [{
	    key: 'areFrozenColumnsScrolledLeft',
	    value: function areFrozenColumnsScrolledLeft(scrollLeft) {
	      return scrollLeft > 0 && this.props.columns.some(function (c) {
	        return _ColumnUtils2['default'].isFrozen(c);
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._scrollLeft = this.viewport ? this.viewport.getScroll().scrollLeft : 0;
	      this._onScroll();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this._onScroll();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._scrollLeft = undefined;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var headerRows = this.props.headerRows || [{ ref: function ref(node) {
	          return _this2.row = node;
	        } }];
	      var EmptyRowsView = this.props.emptyRowsView;

	      return React.createElement(
	        'div',
	        { style: this.getStyle(), className: 'react-grid-Grid' },
	        React.createElement(Header, {
	          ref: this.setHeaderRef,
	          columnMetrics: this.props.columnMetrics,
	          onColumnResize: this.props.onColumnResize,
	          height: this.props.rowHeight,
	          totalWidth: this.props.totalWidth,
	          headerRows: headerRows,
	          sortColumn: this.props.sortColumn,
	          sortDirection: this.props.sortDirection,
	          draggableHeaderCell: this.props.draggableHeaderCell,
	          onSort: this.props.onSort,
	          onHeaderDrop: this.props.onHeaderDrop
	          // onScroll={this.onHeaderScroll}
	          , getValidFilterValues: this.props.getValidFilterValues,
	          cellMetaData: this.props.cellMetaData
	        }),
	        this.props.rowsCount >= 1 || this.props.rowsCount === 0 && !this.props.emptyRowsView ? React.createElement(
	          'div',
	          {
	            ref: function ref(node) {
	              _this2.viewPortContainer = node;
	            },
	            onKeyDown: this.props.onViewportKeydown,
	            onKeyUp: this.props.onViewportKeyup
	          },
	          React.createElement(Viewport, _extends({}, this.props, {
	            ref: this.setViewportRef,
	            rowKey: this.props.rowKey,
	            width: this.props.columnMetrics.width,
	            rowHeight: this.props.rowHeight,
	            rowRenderer: this.props.rowRenderer,
	            rowGetter: this.props.rowGetter,
	            rowsCount: this.props.rowsCount,
	            selectedRows: this.props.selectedRows,
	            expandedRows: this.props.expandedRows,
	            columnMetrics: this.props.columnMetrics,
	            totalWidth: this.props.totalWidth,
	            onScroll: this.onScroll,
	            onRows: this.props.onRows,
	            cellMetaData: this.props.cellMetaData,
	            rowOffsetHeight: this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length,
	            minHeight: this.props.minHeight,
	            rowScrollTimeout: this.props.rowScrollTimeout,
	            scrollToRowIndex: this.props.scrollToRowIndex,
	            contextMenu: this.props.contextMenu,
	            rowSelection: this.props.rowSelection,
	            getSubRowDetails: this.props.getSubRowDetails,
	            rowGroupRenderer: this.props.rowGroupRenderer,
	            overScan: this.props.overScan,
	            enableCellSelect: this.props.enableCellSelect,
	            enableCellAutoFocus: this.props.enableCellAutoFocus,
	            cellNavigationMode: this.props.cellNavigationMode,
	            eventBus: this.props.eventBus,
	            onCheckCellIsEditable: this.props.onCheckCellIsEditable,
	            onCellCopyPaste: this.props.onCellCopyPaste,
	            onGridRowsUpdated: this.props.onGridRowsUpdated,
	            onDragHandleDoubleClick: this.props.onDragHandleDoubleClick,
	            onCellSelected: this.props.onCellSelected,
	            onCellDeSelected: this.props.onCellDeSelected,
	            onCellRangeSelectionStarted: this.props.onCellRangeSelectionStarted,
	            onCellRangeSelectionUpdated: this.props.onCellRangeSelectionUpdated,
	            onCellRangeSelectionCompleted: this.props.onCellRangeSelectionCompleted,
	            onCommit: this.props.onCommit,
	            RowsContainer: this.props.RowsContainer
	          }))
	        ) : React.createElement(
	          'div',
	          { ref: function ref(node) {
	              _this2.emptyView = node;
	            }, className: 'react-grid-Empty' },
	          React.createElement(EmptyRowsView, null)
	        )
	      );
	    }
	  }]);

	  return Grid;
	}(React.Component);

	Grid.displayName = 'Grid';
	Grid.propTypes = {
	  rowGetter: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].func]).isRequired,
	  columns: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].object]),
	  columnMetrics: _propTypes2['default'].object,
	  minHeight: _propTypes2['default'].number,
	  totalWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
	  headerRows: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].func]),
	  rowHeight: _propTypes2['default'].number,
	  rowRenderer: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].func]),
	  emptyRowsView: _propTypes2['default'].func,
	  expandedRows: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].func]),
	  selectedRows: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].func]),
	  rowSelection: _propTypes2['default'].oneOfType([_propTypes2['default'].shape({
	    indexes: _propTypes2['default'].arrayOf(_propTypes2['default'].number).isRequired
	  }), _propTypes2['default'].shape({
	    isSelectedKey: _propTypes2['default'].string.isRequired
	  }), _propTypes2['default'].shape({
	    keys: _propTypes2['default'].shape({
	      values: _propTypes2['default'].array.isRequired,
	      rowKey: _propTypes2['default'].string.isRequired
	    }).isRequired
	  })]),
	  rowsCount: _propTypes2['default'].number,
	  onRows: _propTypes2['default'].func,
	  sortColumn: _propTypes2['default'].string,
	  cellMetaData: _propTypes2['default'].shape(_CellMetaDataShape2['default']).isRequired,
	  sortDirection: _propTypes2['default'].oneOf(['ASC', 'DESC', 'NONE']),
	  rowOffsetHeight: _propTypes2['default'].number.isRequired,
	  onViewportKeydown: _propTypes2['default'].func.isRequired,
	  onViewportKeyup: _propTypes2['default'].func,
	  onColumnResize: _propTypes2['default'].func,
	  onSort: _propTypes2['default'].func,
	  onHeaderDrop: _propTypes2['default'].func,
	  rowKey: _propTypes2['default'].string.isRequired,
	  rowScrollTimeout: _propTypes2['default'].number,
	  scrollToRowIndex: _propTypes2['default'].number,
	  contextMenu: _propTypes2['default'].element,
	  getSubRowDetails: _propTypes2['default'].func,
	  draggableHeaderCell: _propTypes2['default'].func,
	  getValidFilterValues: _propTypes2['default'].func,
	  rowGroupRenderer: _propTypes2['default'].func,
	  overScan: _propTypes2['default'].object,
	  enableCellSelect: _propTypes2['default'].bool.isRequired,
	  enableCellAutoFocus: _propTypes2['default'].bool.isRequired,
	  cellNavigationMode: _propTypes2['default'].string.isRequired,
	  eventBus: _propTypes2['default'].object.isRequired,
	  onCheckCellIsEditable: _propTypes2['default'].func,
	  onCellCopyPaste: _propTypes2['default'].func,
	  onGridRowsUpdated: _propTypes2['default'].func.isRequired,
	  onDragHandleDoubleClick: _propTypes2['default'].func.isRequired,
	  onCellSelected: _propTypes2['default'].func,
	  onCellDeSelected: _propTypes2['default'].func,
	  onCellRangeSelectionStarted: _propTypes2['default'].func,
	  onCellRangeSelectionUpdated: _propTypes2['default'].func,
	  onCellRangeSelectionCompleted: _propTypes2['default'].func,
	  onCommit: _propTypes2['default'].func.isRequired,
	  onScroll: _propTypes2['default'].func,
	  scrollLeft: _propTypes2['default'].number,
	  RowsContainer: _propTypes2['default'].node
	};
	Grid.defaultProps = {
	  rowHeight: 35,
	  minHeight: 350
	};


	module.exports = Grid;

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(16);
	var joinClasses = __webpack_require__(6);
	var shallowCloneObject = __webpack_require__(167);
	var ColumnMetrics = __webpack_require__(160);
	var ColumnUtils = __webpack_require__(14);
	var HeaderRow = __webpack_require__(337);
	var getScrollbarSize = __webpack_require__(110);

	var createObjectWithProperties = __webpack_require__(55);
	var cellMetaDataShape = __webpack_require__(41);
	__webpack_require__(59);

	// The list of the propTypes that we want to include in the Header div
	var knownDivPropertyKeys = ['height', 'onScroll'];

	var Header = function (_React$Component) {
	  _inherits(Header, _React$Component);

	  function Header() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Header);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref, [this].concat(args))), _this), _this.state = { resizing: null }, _this.onColumnResize = function (column, width) {
	      var state = _this.state.resizing || _this.props;

	      var pos = _this.getColumnPosition(column);

	      if (pos != null) {
	        var resizing = {
	          columnMetrics: shallowCloneObject(state.columnMetrics)
	        };
	        resizing.columnMetrics = ColumnMetrics.resizeColumn(resizing.columnMetrics, pos, width);

	        // we don't want to influence scrollLeft while resizing
	        if (resizing.columnMetrics.totalWidth < state.columnMetrics.totalWidth) {
	          resizing.columnMetrics.totalWidth = state.columnMetrics.totalWidth;
	        }

	        resizing.column = ColumnUtils.getColumn(resizing.columnMetrics.columns, pos);
	        _this.setState({ resizing: resizing });
	      }
	    }, _this.onColumnResizeEnd = function (column, width) {
	      var pos = _this.getColumnPosition(column);
	      if (pos !== null && _this.props.onColumnResize) {
	        _this.props.onColumnResize(pos, width || column.width);
	      }
	    }, _this.getHeaderRows = function () {
	      var columnMetrics = _this.getColumnMetrics();
	      var resizeColumn = void 0;
	      if (_this.state.resizing) {
	        resizeColumn = _this.state.resizing.column;
	      }
	      var headerRows = [];
	      _this.props.headerRows.forEach(function (row, index) {
	        // To allow header filters to be visible
	        var rowHeight = 'auto';
	        if (row.rowType === 'filter') {
	          rowHeight = '500px';
	        }
	        var scrollbarSize = getScrollbarSize() > 0 ? getScrollbarSize() : 0;
	        var updatedWidth = isNaN(_this.props.totalWidth - scrollbarSize) ? _this.props.totalWidth : _this.props.totalWidth - scrollbarSize;
	        var headerRowStyle = {
	          position: 'absolute',
	          top: _this.getCombinedHeaderHeights(index),
	          left: 0,
	          width: updatedWidth,
	          overflowX: 'hidden',
	          minHeight: rowHeight
	        };

	        headerRows.push(React.createElement(HeaderRow, {
	          key: row.ref,
	          ref: function ref(node) {
	            return row.rowType === 'filter' ? _this.filterRow = node : _this.row = node;
	          },
	          rowType: row.rowType,
	          style: headerRowStyle,
	          onColumnResize: _this.onColumnResize,
	          onColumnResizeEnd: _this.onColumnResizeEnd,
	          width: columnMetrics.width,
	          height: row.height || _this.props.height,
	          columns: columnMetrics.columns,
	          resizing: resizeColumn,
	          draggableHeaderCell: _this.props.draggableHeaderCell,
	          filterable: row.filterable,
	          onFilterChange: row.onFilterChange,
	          onHeaderDrop: _this.props.onHeaderDrop,
	          sortColumn: _this.props.sortColumn,
	          sortDirection: _this.props.sortDirection,
	          onSort: _this.props.onSort,
	          onScroll: _this.props.onScroll,
	          getValidFilterValues: _this.props.getValidFilterValues
	        }));
	      });
	      return headerRows;
	    }, _this.getColumnMetrics = function () {
	      var columnMetrics = void 0;
	      if (_this.state.resizing) {
	        columnMetrics = _this.state.resizing.columnMetrics;
	      } else {
	        columnMetrics = _this.props.columnMetrics;
	      }
	      return columnMetrics;
	    }, _this.getColumnPosition = function (column) {
	      var columnMetrics = _this.getColumnMetrics();
	      var pos = -1;
	      columnMetrics.columns.forEach(function (c, idx) {
	        if (c.key === column.key) {
	          pos = idx;
	        }
	      });
	      return pos === -1 ? null : pos;
	    }, _this.getCombinedHeaderHeights = function (until) {
	      var stopAt = _this.props.headerRows.length;
	      if (typeof until !== 'undefined') {
	        stopAt = until;
	      }

	      var height = 0;
	      for (var index = 0; index < stopAt; index++) {
	        height += _this.props.headerRows[index].height || _this.props.height;
	      }
	      return height;
	    }, _this.getStyle = function () {
	      return {
	        position: 'relative',
	        height: _this.getCombinedHeaderHeights()
	      };
	    }, _this.setScrollLeft = function (scrollLeft) {
	      var node = ReactDOM.findDOMNode(_this.row);
	      node.scrollLeft = scrollLeft;
	      _this.row.setScrollLeft(scrollLeft);
	      if (_this.filterRow) {
	        var nodeFilters = ReactDOM.findDOMNode(_this.filterRow);
	        nodeFilters.scrollLeft = scrollLeft;
	        _this.filterRow.setScrollLeft(scrollLeft);
	      }
	    }, _this.getKnownDivProps = function () {
	      return createObjectWithProperties(_this.props, knownDivPropertyKeys);
	    }, _this.onHeaderClick = function () {
	      _this.props.cellMetaData.onCellClick({ rowIdx: -1, idx: -1 });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Header, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      this.setState({ resizing: null });
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      var update = !ColumnMetrics.sameColumns(this.props.columnMetrics.columns, nextProps.columnMetrics.columns, ColumnMetrics.sameColumn) || this.props.totalWidth !== nextProps.totalWidth || this.props.headerRows.length !== nextProps.headerRows.length || this.state.resizing !== nextState.resizing || this.props.sortColumn !== nextProps.sortColumn || this.props.sortDirection !== nextProps.sortDirection;
	      return update;
	    }

	    // Set the cell selection to -1 x -1 when clicking on the header

	  }, {
	    key: 'render',
	    value: function render() {
	      var className = joinClasses({
	        'react-grid-Header': true,
	        'react-grid-Header--resizing': !!this.state.resizing
	      });
	      var headerRows = this.getHeaderRows();

	      return React.createElement(
	        'div',
	        _extends({}, this.getKnownDivProps(), { style: this.getStyle(), className: className, onClick: this.onHeaderClick }),
	        headerRows
	      );
	    }
	  }]);

	  return Header;
	}(React.Component);

	Header.propTypes = {
	  columnMetrics: _propTypes2['default'].shape({ width: _propTypes2['default'].number.isRequired, columns: _propTypes2['default'].any }).isRequired,
	  totalWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
	  height: _propTypes2['default'].number.isRequired,
	  headerRows: _propTypes2['default'].array.isRequired,
	  sortColumn: _propTypes2['default'].string,
	  sortDirection: _propTypes2['default'].oneOf(['ASC', 'DESC', 'NONE']),
	  onSort: _propTypes2['default'].func,
	  onColumnResize: _propTypes2['default'].func,
	  onScroll: _propTypes2['default'].func,
	  onHeaderDrop: _propTypes2['default'].func,
	  draggableHeaderCell: _propTypes2['default'].func,
	  getValidFilterValues: _propTypes2['default'].func,
	  cellMetaData: _propTypes2['default'].shape(cellMetaDataShape)
	};


	module.exports = Header;

/***/ }),

/***/ 336:
/***/ (function(module, exports) {

	"use strict";

	var HeaderCellType = {
	  SORTABLE: 0,
	  FILTERABLE: 1,
	  NONE: 2,
	  CHECKBOX: 3
	};

	module.exports = HeaderCellType;

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var shallowEqual = __webpack_require__(431);
	var BaseHeaderCell = __webpack_require__(161);
	var getScrollbarSize = __webpack_require__(110);
	var columnUtils = __webpack_require__(14);
	var SortableHeaderCell = __webpack_require__(152);
	var FilterableHeaderCell = __webpack_require__(289);
	var HeaderCellType = __webpack_require__(336);
	var createObjectWithProperties = __webpack_require__(55);
	__webpack_require__(59);

	var HeaderRowStyle = {
	  overflow: _propTypes2['default'].string,
	  width: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
	  height: _propTypes2['default'].number,
	  position: _propTypes2['default'].string
	};

	// The list of the propTypes that we want to include in the HeaderRow div
	var knownDivPropertyKeys = ['width', 'height', 'style', 'onScroll'];

	var HeaderRow = function (_React$Component) {
	  _inherits(HeaderRow, _React$Component);

	  function HeaderRow() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, HeaderRow);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HeaderRow.__proto__ || Object.getPrototypeOf(HeaderRow)).call.apply(_ref, [this].concat(args))), _this), _this.cells = [], _this.getHeaderCellType = function (column) {
	      if (column.filterable) {
	        if (_this.props.filterable) return HeaderCellType.FILTERABLE;
	      }

	      if (column.sortable && column.rowType !== 'filter') return HeaderCellType.SORTABLE;

	      return HeaderCellType.NONE;
	    }, _this.getFilterableHeaderCell = function (column) {
	      var FilterRenderer = FilterableHeaderCell;
	      if (column.filterRenderer !== undefined) {
	        FilterRenderer = column.filterRenderer;
	      }
	      return React.createElement(FilterRenderer, _extends({}, _this.props, { onChange: _this.props.onFilterChange }));
	    }, _this.getSortableHeaderCell = function (column) {
	      var sortDirection = _this.props.sortColumn === column.key ? _this.props.sortDirection : SortableHeaderCell.DEFINE_SORT.NONE;
	      var sortDescendingFirst = column.sortDescendingFirst === undefined ? false : column.sortDescendingFirst;
	      return React.createElement(SortableHeaderCell, { columnKey: column.key, onSort: _this.props.onSort, sortDirection: sortDirection, sortDescendingFirst: sortDescendingFirst, headerRenderer: column.headerRenderer });
	    }, _this.getHeaderRenderer = function (column) {
	      if (column.headerRenderer && !column.sortable && !_this.props.filterable) {
	        return column.headerRenderer;
	      }
	      var headerCellType = _this.getHeaderCellType(column);
	      switch (headerCellType) {
	        case HeaderCellType.SORTABLE:
	          return _this.getSortableHeaderCell(column);
	        case HeaderCellType.FILTERABLE:
	          return _this.getFilterableHeaderCell(column);
	        default:
	          return undefined;
	      }
	    }, _this.getStyle = function () {
	      return {
	        overflow: 'hidden',
	        width: '100%',
	        height: _this.props.height,
	        position: 'absolute'
	      };
	    }, _this.getCells = function () {
	      var cells = [];
	      var frozenCells = [];
	      var _this$props = _this.props,
	          columns = _this$props.columns,
	          rowType = _this$props.rowType;

	      var _loop = function _loop(i, len) {
	        var column = _extends({ rowType: rowType }, columnUtils.getColumn(columns, i));
	        var _renderer = column.key === 'select-row' && rowType === 'filter' ? React.createElement('div', null) : _this.getHeaderRenderer(column);

	        var baseHeaderCellProps = {
	          column: column,
	          height: _this.props.height,
	          renderer: _renderer,
	          resizing: _this.props.resizing === column,
	          onResize: _this.props.onColumnResize,
	          onResizeEnd: _this.props.onColumnResizeEnd
	        };

	        var cell = void 0;
	        if (column.draggable) {
	          var DraggableHeaderCell = _this.props.draggableHeaderCell;
	          cell = React.createElement(
	            DraggableHeaderCell,
	            {
	              key: column.key,
	              ref: function ref(node) {
	                return _this.cells[i] = node;
	              },
	              column: column,
	              onHeaderDrop: _this.props.onHeaderDrop
	            },
	            React.createElement(BaseHeaderCell, baseHeaderCellProps)
	          );
	        } else {
	          cell = React.createElement(BaseHeaderCell, _extends({
	            key: column.key,
	            ref: function ref(node) {
	              return _this.cells[i] = node;
	            }
	          }, baseHeaderCellProps));
	        }

	        if (columnUtils.isFrozen(column)) {
	          frozenCells.push(cell);
	        } else {
	          cells.push(cell);
	        }
	      };

	      for (var i = 0, len = columnUtils.getSize(columns); i < len; i++) {
	        _loop(i, len);
	      }

	      return cells.concat(frozenCells);
	    }, _this.setScrollLeft = function (scrollLeft) {
	      _this.props.columns.forEach(function (column, i) {
	        if (columnUtils.isFrozen(column)) {
	          _this.cells[i].setScrollLeft(scrollLeft);
	        } else {
	          if (_this.cells[i] && _this.cells[i].removeScroll) {
	            _this.cells[i].removeScroll();
	          }
	        }
	      });
	    }, _this.getKnownDivProps = function () {
	      return createObjectWithProperties(_this.props, knownDivPropertyKeys);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(HeaderRow, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.columns !== this.props.columns || !shallowEqual(nextProps.style, this.props.style) || this.props.sortColumn !== nextProps.sortColumn || this.props.sortDirection !== nextProps.sortDirection;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var cellsStyle = {
	        width: this.props.width ? this.props.width + getScrollbarSize() : '100%',
	        height: this.props.height,
	        whiteSpace: 'nowrap',
	        overflowX: 'hidden',
	        overflowY: 'hidden'
	      };

	      var cells = this.getCells();
	      return React.createElement(
	        'div',
	        _extends({}, this.getKnownDivProps(), { className: 'react-grid-HeaderRow' }),
	        React.createElement(
	          'div',
	          { style: cellsStyle },
	          cells
	        )
	      );
	    }
	  }]);

	  return HeaderRow;
	}(React.Component);

	HeaderRow.displayName = 'HeaderRow';
	HeaderRow.propTypes = {
	  width: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
	  height: _propTypes2['default'].number.isRequired,
	  columns: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].object]).isRequired,
	  onColumnResize: _propTypes2['default'].func,
	  onSort: _propTypes2['default'].func.isRequired,
	  onColumnResizeEnd: _propTypes2['default'].func,
	  style: _propTypes2['default'].shape(HeaderRowStyle),
	  sortColumn: _propTypes2['default'].string,
	  sortDirection: _propTypes2['default'].oneOf(Object.keys(SortableHeaderCell.DEFINE_SORT)),
	  cellRenderer: _propTypes2['default'].func,
	  headerCellRenderer: _propTypes2['default'].func,
	  filterable: _propTypes2['default'].bool,
	  onFilterChange: _propTypes2['default'].func,
	  resizing: _propTypes2['default'].object,
	  onScroll: _propTypes2['default'].func,
	  rowType: _propTypes2['default'].string,
	  draggableHeaderCell: _propTypes2['default'].func,
	  onHeaderDrop: _propTypes2['default'].func
	};


	module.exports = HeaderRow;

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactIsDeprecated = __webpack_require__(422);

	var _Grid = __webpack_require__(334);

	var _Grid2 = _interopRequireDefault(_Grid);

	var _CheckboxEditor = __webpack_require__(68);

	var _CheckboxEditor2 = _interopRequireDefault(_CheckboxEditor);

	var _RowUtils = __webpack_require__(109);

	var _RowUtils2 = _interopRequireDefault(_RowUtils);

	var _ColumnUtils = __webpack_require__(14);

	var _ColumnUtils2 = _interopRequireDefault(_ColumnUtils);

	var _KeyCodes = __webpack_require__(162);

	var _KeyCodes2 = _interopRequireDefault(_KeyCodes);

	var _utils = __webpack_require__(10);

	var _SelectAll = __webpack_require__(164);

	var _SelectAll2 = _interopRequireDefault(_SelectAll);

	var _SortableHeaderCell = __webpack_require__(152);

	var _constants = __webpack_require__(22);

	var _masks = __webpack_require__(166);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ColumnMetrics = __webpack_require__(160);
	__webpack_require__(86);
	__webpack_require__(85);

	if (!Object.assign) {
	  Object.assign = __webpack_require__(35);
	}

	var deprecationWarning = function deprecationWarning(propName, alternative) {
	  return propName + ' has been deprecated and will be removed in a future version. Please use ' + alternative + ' instead';
	};

	var ReactDataGrid = function (_React$Component) {
	  _inherits(ReactDataGrid, _React$Component);

	  function ReactDataGrid(props, context) {
	    _classCallCheck(this, ReactDataGrid);

	    var _this = _possibleConstructorReturn(this, (ReactDataGrid.__proto__ || Object.getPrototypeOf(ReactDataGrid)).call(this, props, context));

	    _initialiseProps.call(_this);

	    var columnMetrics = _this.createColumnMetrics();
	    var initialState = { columnMetrics: columnMetrics, selectedRows: [], expandedRows: [], canFilter: false, columnFilters: {}, sortDirection: null, sortColumn: null, scrollOffset: 0, lastRowIdxUiSelected: -1 };
	    if (_this.props.sortColumn && _this.props.sortDirection) {
	      initialState.sortColumn = _this.props.sortColumn;
	      initialState.sortDirection = _this.props.sortDirection;
	    }

	    _this.state = initialState;
	    _this.eventBus = new _masks.EventBus();
	    return _this;
	  }

	  _createClass(ReactDataGrid, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._mounted = true;
	      window.addEventListener('resize', this.metricsUpdated);
	      if (this.props.cellRangeSelection) {
	        window.addEventListener('mouseup', this.onWindowMouseUp);
	      }
	      this.metricsUpdated();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._mounted = false;
	      window.removeEventListener('resize', this.metricsUpdated);
	      window.removeEventListener('mouseup', this.onWindowMouseUp);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.columns) {
	        if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality) || nextProps.minWidth !== this.props.minWidth) {
	          var columnMetrics = this.createColumnMetrics(nextProps);
	          this.setState({ columnMetrics: columnMetrics });
	        }
	      }
	    }

	    // return false if not a shift select so can be handled as normal row selection


	    // columnKey not used here as this function will select the whole row,
	    // but needed to match the function signature in the CheckboxEditor

	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var cellMetaData = {
	        rowKey: this.props.rowKey,
	        onCellClick: this.onCellClick,
	        onCellContextMenu: this.onCellContextMenu,
	        onCellDoubleClick: this.onCellDoubleClick,
	        onColumnEvent: this.onColumnEvent,
	        onCellExpand: this.onCellExpand,
	        onRowExpandToggle: this.onRowExpandToggle,
	        getCellActions: this.props.getCellActions,
	        onDeleteSubRow: this.props.onDeleteSubRow,
	        onAddSubRow: this.props.onAddSubRow,
	        onDragEnter: this.handleDragEnter
	      };
	      if (this.props.cellRangeSelection) {
	        cellMetaData.onCellMouseDown = this.onCellMouseDown;
	        cellMetaData.onCellMouseEnter = this.onCellMouseEnter;
	      }

	      var toolbar = this.renderToolbar();
	      var containerWidth = this.props.minWidth || this.gridWidth();
	      var gridWidth = containerWidth - this.state.scrollOffset;

	      // depending on the current lifecycle stage, gridWidth() may not initialize correctly
	      // this also handles cases where it always returns undefined -- such as when inside a div with display:none
	      // eg Bootstrap tabs and collapses
	      if (typeof containerWidth === 'undefined' || isNaN(containerWidth) || containerWidth === 0) {
	        containerWidth = '100%';
	      }
	      if (typeof gridWidth === 'undefined' || isNaN(gridWidth) || gridWidth === 0) {
	        gridWidth = '100%';
	      }
	      return _react2['default'].createElement(
	        'div',
	        { className: 'react-grid-Container', style: { width: containerWidth },
	          ref: this.setGridRef },
	        toolbar,
	        _react2['default'].createElement(
	          'div',
	          { className: 'react-grid-Main' },
	          _react2['default'].createElement(_Grid2['default'], _extends({
	            ref: function ref(node) {
	              return _this2.base = node;
	            }
	          }, this.props, {
	            rowKey: this.props.rowKey,
	            headerRows: this.getHeaderRows(),
	            columnMetrics: this.state.columnMetrics,
	            rowGetter: this.props.rowGetter,
	            rowsCount: this.props.rowsCount,
	            rowHeight: this.props.rowHeight,
	            cellMetaData: cellMetaData,
	            selectedRows: this.getSelectedRows(),
	            rowSelection: this.getRowSelectionProps(),
	            expandedRows: this.state.expandedRows,
	            rowOffsetHeight: this.getRowOffsetHeight(),
	            sortColumn: this.state.sortColumn,
	            sortDirection: this.state.sortDirection,
	            onSort: this.handleSort,
	            minHeight: this.props.minHeight,
	            totalWidth: gridWidth,
	            onViewportKeydown: this.onKeyDown,
	            onViewportKeyup: this.onKeyUp,
	            onColumnResize: this.onColumnResize,
	            rowScrollTimeout: this.props.rowScrollTimeout,
	            scrollToRowIndex: this.props.scrollToRowIndex,
	            contextMenu: this.props.contextMenu,
	            overScan: this.props.overScan,
	            enableCellSelect: this.props.enableCellSelect,
	            enableCellAutoFocus: this.props.enableCellAutoFocus,
	            cellNavigationMode: this.props.cellNavigationMode,
	            eventBus: this.eventBus,
	            onCheckCellIsEditable: this.props.onCheckCellIsEditable,
	            onCellCopyPaste: this.props.onCellCopyPaste,
	            onGridRowsUpdated: this.onGridRowsUpdated,
	            onDragHandleDoubleClick: this.onDragHandleDoubleClick,
	            onCellSelected: this.props.onCellSelected,
	            onCellDeSelected: this.props.onCellDeSelected,
	            onCellRangeSelectionStarted: this.props.cellRangeSelection && this.props.cellRangeSelection.onStart,
	            onCellRangeSelectionUpdated: this.props.cellRangeSelection && this.props.cellRangeSelection.onUpdate,
	            onCellRangeSelectionCompleted: this.props.cellRangeSelection && this.props.cellRangeSelection.onComplete,
	            onCommit: this.onCommit,
	            onScroll: this.onScroll
	          }))
	        )
	      );
	    }
	  }]);

	  return ReactDataGrid;
	}(_react2['default'].Component);

	ReactDataGrid.displayName = 'ReactDataGrid';
	ReactDataGrid.propTypes = {
	  rowHeight: _propTypes2['default'].number.isRequired,
	  headerRowHeight: _propTypes2['default'].number,
	  headerFiltersHeight: _propTypes2['default'].number,
	  minHeight: _propTypes2['default'].number.isRequired,
	  minWidth: _propTypes2['default'].number,
	  enableRowSelect: (0, _reactIsDeprecated.deprecate)(_propTypes2['default'].func, deprecationWarning('enableRowSelect', 'rowSelection')),
	  onRowUpdated: (0, _reactIsDeprecated.deprecate)(_propTypes2['default'].func, deprecationWarning('onRowUpdated', 'onGridRowsUpdated')),
	  rowGetter: _propTypes2['default'].func.isRequired,
	  rowsCount: _propTypes2['default'].number.isRequired,
	  toolbar: _propTypes2['default'].element,
	  enableCellSelect: _propTypes2['default'].bool,
	  columns: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].array]).isRequired,
	  onFilter: _propTypes2['default'].func,
	  onCellCopyPaste: (0, _reactIsDeprecated.deprecate)(_propTypes2['default'].func, deprecationWarning('onCellCopyPaste', 'onGridRowsUpdated')),
	  onCellsDragged: (0, _reactIsDeprecated.deprecate)(_propTypes2['default'].func, deprecationWarning('onCellsDragged', 'onGridRowsUpdated')),
	  getCellActions: _propTypes2['default'].func,
	  onAddFilter: _propTypes2['default'].func,
	  onGridSort: _propTypes2['default'].func,
	  sortColumn: _propTypes2['default'].string,
	  sortDirection: _propTypes2['default'].oneOf(Object.keys(_SortableHeaderCell.DEFINE_SORT)),
	  onDragHandleDoubleClick: (0, _reactIsDeprecated.deprecate)(_propTypes2['default'].func, deprecationWarning('onDragHandleDoubleClick', 'onGridRowsUpdated')),
	  onGridRowsUpdated: _propTypes2['default'].func,
	  onRowSelect: _propTypes2['default'].func,
	  rowKey: _propTypes2['default'].string,
	  rowScrollTimeout: (0, _reactIsDeprecated.deprecate)(_propTypes2['default'].number),
	  scrollToRowIndex: _propTypes2['default'].number,
	  onClearFilters: _propTypes2['default'].func,
	  contextMenu: _propTypes2['default'].element,
	  cellNavigationMode: _propTypes2['default'].oneOf(['none', 'loopOverRow', 'changeRow']),
	  onCellSelected: _propTypes2['default'].func,
	  onCellDeSelected: _propTypes2['default'].func,
	  cellRangeSelection: _propTypes2['default'].shape({
	    onStart: _propTypes2['default'].func,
	    onUpdate: _propTypes2['default'].func,
	    onComplete: _propTypes2['default'].func
	  }),
	  onCellExpand: _propTypes2['default'].func,
	  enableDragAndDrop: _propTypes2['default'].bool,
	  onRowExpandToggle: _propTypes2['default'].func,
	  draggableHeaderCell: _propTypes2['default'].func,
	  getValidFilterValues: _propTypes2['default'].func,
	  rowSelection: _propTypes2['default'].shape({
	    enableShiftSelect: _propTypes2['default'].bool,
	    onRowsSelected: _propTypes2['default'].func,
	    onRowsDeselected: _propTypes2['default'].func,
	    showCheckbox: _propTypes2['default'].bool,
	    selectBy: _propTypes2['default'].oneOfType([_propTypes2['default'].shape({
	      indexes: _propTypes2['default'].arrayOf(_propTypes2['default'].number).isRequired
	    }), _propTypes2['default'].shape({
	      isSelectedKey: _propTypes2['default'].string.isRequired
	    }), _propTypes2['default'].shape({
	      keys: _propTypes2['default'].shape({
	        values: _propTypes2['default'].array.isRequired,
	        rowKey: _propTypes2['default'].string.isRequired
	      }).isRequired
	    })]).isRequired
	  }),
	  onRowClick: _propTypes2['default'].func,
	  onRowDoubleClick: _propTypes2['default'].func,
	  onGridKeyUp: _propTypes2['default'].func,
	  onGridKeyDown: _propTypes2['default'].func,
	  rowGroupRenderer: _propTypes2['default'].func,
	  rowActionsCell: _propTypes2['default'].func,
	  onCheckCellIsEditable: _propTypes2['default'].func,
	  /* called before cell is set active, returns a boolean to determine whether cell is editable */
	  overScan: _propTypes2['default'].object,
	  onDeleteSubRow: _propTypes2['default'].func,
	  onAddSubRow: _propTypes2['default'].func,
	  enableCellAutoFocus: _propTypes2['default'].bool,
	  onBeforeEdit: _propTypes2['default'].func,
	  selectAllRenderer: _propTypes2['default'].object,
	  minColumnWidth: _propTypes2['default'].number,
	  columnEquality: _propTypes2['default'].func,
	  onColumnResize: _propTypes2['default'].func,
	  onScroll: _propTypes2['default'].func
	};
	ReactDataGrid.defaultProps = {
	  enableCellSelect: false,
	  rowHeight: 35,
	  headerFiltersHeight: 45,
	  enableRowSelect: false,
	  minHeight: 350,
	  rowKey: 'id',
	  rowScrollTimeout: 0,
	  scrollToRowIndex: 0,
	  cellNavigationMode: _constants.CellNavigationMode.NONE,
	  overScan: {
	    colsStart: 2,
	    colsEnd: 2,
	    rowsStart: 2,
	    rowsEnd: 2
	  },
	  enableCellAutoFocus: true,
	  onBeforeEdit: function onBeforeEdit() {},
	  minColumnWidth: 80,
	  columnEquality: ColumnMetrics.sameColumn
	};

	var _initialiseProps = function _initialiseProps() {
	  var _this3 = this;

	  this.selectCell = function (_ref, openEditor) {
	    var idx = _ref.idx,
	        rowIdx = _ref.rowIdx;

	    _this3.eventBus.dispatch(_constants.EventTypes.SELECT_CELL, { rowIdx: rowIdx, idx: idx }, openEditor);
	  };

	  this.selectStart = function (cellPosition) {
	    _this3.eventBus.dispatch(_constants.EventTypes.SELECT_START, cellPosition);
	  };

	  this.selectUpdate = function (cellPosition) {
	    _this3.eventBus.dispatch(_constants.EventTypes.SELECT_UPDATE, cellPosition);
	  };

	  this.selectEnd = function () {
	    _this3.eventBus.dispatch(_constants.EventTypes.SELECT_END);
	  };

	  this.handleDragEnter = function (_ref2) {
	    var overRowIdx = _ref2.overRowIdx;

	    _this3.eventBus.dispatch(_constants.EventTypes.DRAG_ENTER, { overRowIdx: overRowIdx });
	  };

	  this.gridWidth = function () {
	    return _this3.grid ? _this3.grid.parentElement.offsetWidth : 0;
	  };

	  this.getTotalWidth = function () {
	    var totalWidth = 0;
	    if (_this3._mounted) {
	      totalWidth = _this3.gridWidth();
	    } else {
	      totalWidth = _ColumnUtils2['default'].getSize(_this3.props.columns) * _this3.props.minColumnWidth;
	    }
	    return totalWidth;
	  };

	  this.getColumnMetricsType = function (metrics) {
	    var totalWidth = metrics.totalWidth || _this3.getTotalWidth();
	    var currentMetrics = {
	      columns: metrics.columns,
	      totalWidth: totalWidth,
	      minColumnWidth: metrics.minColumnWidth
	    };
	    var updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
	    return updatedMetrics;
	  };

	  this.getColumn = function (idx) {
	    var columns = _this3.state.columnMetrics.columns;

	    return _ColumnUtils2['default'].getColumn(columns, idx);
	  };

	  this.getSize = function () {
	    var columns = _this3.state.columnMetrics.columns;

	    return _ColumnUtils2['default'].getSize(columns);
	  };

	  this.metricsUpdated = function () {
	    var columnMetrics = _this3.createColumnMetrics();
	    _this3.setState({ columnMetrics: columnMetrics });
	  };

	  this.createColumnMetrics = function () {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.props;

	    var gridColumns = _this3.setupGridColumns(props);
	    return _this3.getColumnMetricsType({
	      columns: gridColumns,
	      minColumnWidth: _this3.props.minColumnWidth,
	      totalWidth: props.minWidth
	    });
	  };

	  this.onColumnResize = function (index, width) {
	    var columnMetrics = ColumnMetrics.resizeColumn(_this3.state.columnMetrics, index, width);
	    _this3.setState({ columnMetrics: columnMetrics });
	    if (_this3.props.onColumnResize) {
	      _this3.props.onColumnResize(index, width);
	    }
	  };

	  this.onKeyDown = function (e) {
	    // Track which keys are currently down for shift clicking etc
	    _this3._keysDown = _this3._keysDown || {};
	    _this3._keysDown[e.keyCode] = true;

	    var onGridKeyDown = _this3.props.onGridKeyDown;

	    if ((0, _utils.isFunction)(onGridKeyDown)) {
	      onGridKeyDown(e);
	    }
	  };

	  this.onKeyUp = function (e) {
	    // Track which keys are currently down for shift clicking etc
	    _this3._keysDown = _this3._keysDown || {};
	    delete _this3._keysDown[e.keyCode];

	    var onGridKeyUp = _this3.props.onGridKeyUp;

	    if ((0, _utils.isFunction)(onGridKeyUp)) {
	      onGridKeyUp(e);
	    }
	  };

	  this.isSingleKeyDown = function (keyCode) {
	    if (!_this3._keysDown) return false;
	    return keyCode in _this3._keysDown && Object.keys(_this3._keysDown).length === 1;
	  };

	  this.onColumnEvent = function (ev, columnEvent) {
	    var idx = columnEvent.idx,
	        name = columnEvent.name;


	    if (name && typeof idx !== 'undefined') {
	      var column = _this3.getColumn(idx);

	      if (column && column.events && (0, _utils.isFunction)(column.events[name])) {
	        var eventArgs = {
	          idx: idx,
	          rowIdx: columnEvent.rowIdx,
	          rowId: columnEvent.rowId,
	          column: column
	        };

	        column.events[name](ev, eventArgs);
	      }
	    }
	  };

	  this.onCellClick = function (_ref3) {
	    var rowIdx = _ref3.rowIdx,
	        idx = _ref3.idx;
	    var _props = _this3.props,
	        onRowClick = _props.onRowClick,
	        rowGetter = _props.rowGetter;

	    _this3.selectCell({ rowIdx: rowIdx, idx: idx });

	    if ((0, _utils.isFunction)(onRowClick)) {
	      onRowClick(rowIdx, rowGetter(rowIdx), _this3.getColumn(idx));
	    }
	  };

	  this.onCellMouseDown = function (cellPosition) {
	    _this3.selectStart(cellPosition);
	  };

	  this.onCellMouseEnter = function (cellPosition) {
	    _this3.selectUpdate(cellPosition);
	  };

	  this.onWindowMouseUp = function () {
	    _this3.selectEnd();
	  };

	  this.onCellContextMenu = function (_ref4) {
	    var rowIdx = _ref4.rowIdx,
	        idx = _ref4.idx;

	    _this3.selectCell({ rowIdx: rowIdx, idx: idx });
	  };

	  this.onCellDoubleClick = function (_ref5) {
	    var rowIdx = _ref5.rowIdx,
	        idx = _ref5.idx;
	    var _props2 = _this3.props,
	        onRowDoubleClick = _props2.onRowDoubleClick,
	        rowGetter = _props2.rowGetter;

	    if ((0, _utils.isFunction)(onRowDoubleClick)) {
	      onRowDoubleClick(rowIdx, rowGetter(rowIdx), _this3.getColumn(idx));
	    }
	    _this3.openCellEditor(rowIdx, idx);
	  };

	  this.onToggleFilter = function () {
	    // setState() does not immediately mutate this.state but creates a pending state transition.
	    // Therefore if you want to do something after the state change occurs, pass it in as a callback function.
	    _this3.setState({ canFilter: !_this3.state.canFilter }, function () {
	      if (_this3.state.canFilter === false && _this3.props.onClearFilters) {
	        _this3.props.onClearFilters();
	      }
	    });
	  };

	  this.onDragHandleDoubleClick = function (e) {
	    if (_this3.props.onDragHandleDoubleClick) {
	      _this3.props.onDragHandleDoubleClick(e);
	    }

	    if (_this3.props.onGridRowsUpdated) {
	      var cellKey = _this3.getColumn(e.idx).key;
	      _this3.onGridRowsUpdated(cellKey, e.rowIdx, _this3.props.rowsCount - 1, _defineProperty({}, cellKey, e.rowData[cellKey]), _constants.UpdateActions.COLUMN_FILL);
	    }
	  };

	  this.onCellExpand = function (args) {
	    if (_this3.props.onCellExpand) {
	      _this3.props.onCellExpand(args);
	    }
	  };

	  this.onRowExpandToggle = function (args) {
	    if (typeof _this3.props.onRowExpandToggle === 'function') {
	      _this3.props.onRowExpandToggle(args);
	    }
	  };

	  this.onGridRowsUpdated = function (cellKey, fromRow, toRow, updated, action, originRow) {
	    var _props3 = _this3.props,
	        rowGetter = _props3.rowGetter,
	        rowKey = _props3.rowKey,
	        onGridRowsUpdated = _props3.onGridRowsUpdated;
	    // Deprecated prop
	    // to be removed in next major release

	    if ((0, _utils.isFunction)(_this3.props.onRowUpdated)) {
	      _this3.props.onRowUpdated({ updated: updated, rowIdx: fromRow, cellKey: cellKey, value: updated[cellKey] });
	    }
	    if (!(0, _utils.isFunction)(onGridRowsUpdated)) {
	      return;
	    }

	    var rowIds = [];
	    for (var i = fromRow; i <= toRow; i++) {
	      rowIds.push(rowGetter(i)[rowKey]);
	    }

	    var fromRowData = rowGetter(action === _constants.UpdateActions.COPY_PASTE ? originRow : fromRow);
	    var fromRowId = fromRowData[rowKey];
	    var toRowId = rowGetter(toRow)[rowKey];
	    onGridRowsUpdated({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, fromRowId: fromRowId, toRowId: toRowId, rowIds: rowIds, updated: updated, action: action, fromRowData: fromRowData });
	  };

	  this.onCommit = function (commit) {
	    var targetRow = commit.rowIdx;
	    _this3.onGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, _constants.UpdateActions.CELL_UPDATE);
	  };

	  this.onScroll = function (scrollState) {
	    if ((0, _utils.isFunction)(_this3.props.onScroll)) {
	      _this3.props.onScroll(scrollState);
	    }
	  };

	  this.handleSort = function (columnKey, direction) {
	    _this3.setState({ sortDirection: direction, sortColumn: columnKey }, function () {
	      _this3.props.onGridSort(columnKey, direction);
	    });
	  };

	  this.getSelectedRow = function (rows, key) {
	    var selectedRow = rows.filter(function (r) {
	      if (r[_this3.props.rowKey] === key) {
	        return true;
	      }
	      return false;
	    });
	    if (selectedRow.length > 0) {
	      return selectedRow[0];
	    }
	  };

	  this.useNewRowSelection = function () {
	    return _this3.props.rowSelection && _this3.props.rowSelection.selectBy;
	  };

	  this.handleShiftSelect = function (rowIdx) {
	    if (_this3.state.lastRowIdxUiSelected > -1 && _this3.isSingleKeyDown(_KeyCodes2['default'].Shift)) {
	      var _props$rowSelection$s = _this3.props.rowSelection.selectBy,
	          keys = _props$rowSelection$s.keys,
	          indexes = _props$rowSelection$s.indexes,
	          isSelectedKey = _props$rowSelection$s.isSelectedKey;

	      var isPreviouslySelected = _RowUtils2['default'].isRowSelected(keys, indexes, isSelectedKey, _this3.props.rowGetter(rowIdx), rowIdx);

	      if (isPreviouslySelected) return false;

	      var handled = false;

	      if (rowIdx > _this3.state.lastRowIdxUiSelected) {
	        var rowsSelected = [];

	        for (var i = _this3.state.lastRowIdxUiSelected + 1; i <= rowIdx; i++) {
	          rowsSelected.push({ rowIdx: i, row: _this3.props.rowGetter(i) });
	        }

	        if (typeof _this3.props.rowSelection.onRowsSelected === 'function') {
	          _this3.props.rowSelection.onRowsSelected(rowsSelected);
	        }

	        handled = true;
	      } else if (rowIdx < _this3.state.lastRowIdxUiSelected) {
	        var _rowsSelected = [];

	        for (var _i = rowIdx; _i <= _this3.state.lastRowIdxUiSelected - 1; _i++) {
	          _rowsSelected.push({ rowIdx: _i, row: _this3.props.rowGetter(_i) });
	        }

	        if (typeof _this3.props.rowSelection.onRowsSelected === 'function') {
	          _this3.props.rowSelection.onRowsSelected(_rowsSelected);
	        }

	        handled = true;
	      }

	      if (handled) {
	        _this3.setState({ lastRowIdxUiSelected: rowIdx });
	      }

	      return handled;
	    }

	    return false;
	  };

	  this.handleNewRowSelect = function (rowIdx, rowData) {
	    if (_this3.selectAllCheckbox && _this3.selectAllCheckbox.checked === true) {
	      _this3.selectAllCheckbox.checked = false;
	    }

	    var _props$rowSelection$s2 = _this3.props.rowSelection.selectBy,
	        keys = _props$rowSelection$s2.keys,
	        indexes = _props$rowSelection$s2.indexes,
	        isSelectedKey = _props$rowSelection$s2.isSelectedKey;

	    var isPreviouslySelected = _RowUtils2['default'].isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx);

	    _this3.setState({ lastRowIdxUiSelected: isPreviouslySelected ? -1 : rowIdx, selected: { rowIdx: rowIdx, idx: 0 } });

	    if (isPreviouslySelected && typeof _this3.props.rowSelection.onRowsDeselected === 'function') {
	      _this3.props.rowSelection.onRowsDeselected([{ rowIdx: rowIdx, row: rowData }]);
	    } else if (!isPreviouslySelected && typeof _this3.props.rowSelection.onRowsSelected === 'function') {
	      _this3.props.rowSelection.onRowsSelected([{ rowIdx: rowIdx, row: rowData }]);
	    }
	  };

	  this.handleRowSelect = function (rowIdx, columnKey, rowData, e) {
	    e.stopPropagation();

	    if (_this3.useNewRowSelection()) {
	      if (_this3.props.rowSelection.enableShiftSelect === true) {
	        if (!_this3.handleShiftSelect(rowIdx)) {
	          _this3.handleNewRowSelect(rowIdx, rowData);
	        }
	      } else {
	        _this3.handleNewRowSelect(rowIdx, rowData);
	      }
	    } else {
	      // Fallback to old onRowSelect handler
	      var selectedRows = _this3.props.enableRowSelect === 'single' ? [] : _this3.state.selectedRows.slice(0);
	      var selectedRow = _this3.getSelectedRow(selectedRows, rowData[_this3.props.rowKey]);
	      if (selectedRow) {
	        selectedRow.isSelected = !selectedRow.isSelected;
	      } else {
	        rowData.isSelected = true;
	        selectedRows.push(rowData);
	      }
	      _this3.setState({ selectedRows: selectedRows, selected: { rowIdx: rowIdx, idx: 0 } });
	      if (_this3.props.onRowSelect) {
	        _this3.props.onRowSelect(selectedRows.filter(function (r) {
	          return r.isSelected === true;
	        }));
	      }
	    }
	  };

	  this.handleCheckboxChange = function (e) {
	    var allRowsSelected = void 0;
	    if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true) {
	      allRowsSelected = true;
	    } else {
	      allRowsSelected = false;
	    }
	    if (_this3.useNewRowSelection()) {
	      var _props$rowSelection$s3 = _this3.props.rowSelection.selectBy,
	          keys = _props$rowSelection$s3.keys,
	          indexes = _props$rowSelection$s3.indexes,
	          isSelectedKey = _props$rowSelection$s3.isSelectedKey;


	      if (allRowsSelected && typeof _this3.props.rowSelection.onRowsSelected === 'function') {
	        var selectedRows = [];
	        for (var i = 0; i < _this3.props.rowsCount; i++) {
	          var rowData = _this3.props.rowGetter(i);
	          if (!_RowUtils2['default'].isRowSelected(keys, indexes, isSelectedKey, rowData, i)) {
	            selectedRows.push({ rowIdx: i, row: rowData });
	          }
	        }

	        if (selectedRows.length > 0) {
	          _this3.props.rowSelection.onRowsSelected(selectedRows);
	        }
	      } else if (!allRowsSelected && typeof _this3.props.rowSelection.onRowsDeselected === 'function') {
	        var deselectedRows = [];
	        for (var _i2 = 0; _i2 < _this3.props.rowsCount; _i2++) {
	          var _rowData = _this3.props.rowGetter(_i2);
	          if (_RowUtils2['default'].isRowSelected(keys, indexes, isSelectedKey, _rowData, _i2)) {
	            deselectedRows.push({ rowIdx: _i2, row: _rowData });
	          }
	        }

	        if (deselectedRows.length > 0) {
	          _this3.props.rowSelection.onRowsDeselected(deselectedRows);
	        }
	      }
	    } else {
	      var _selectedRows = [];
	      for (var _i3 = 0; _i3 < _this3.props.rowsCount; _i3++) {
	        var row = Object.assign({}, _this3.props.rowGetter(_i3), { isSelected: allRowsSelected });
	        _selectedRows.push(row);
	      }
	      _this3.setState({ selectedRows: _selectedRows });
	      if (typeof _this3.props.onRowSelect === 'function') {
	        _this3.props.onRowSelect(_selectedRows.filter(function (r) {
	          return r.isSelected === true;
	        }));
	      }
	    }
	  };

	  this.getRowOffsetHeight = function () {
	    var offsetHeight = 0;
	    _this3.getHeaderRows().forEach(function (row) {
	      return offsetHeight += parseFloat(row.height, 10);
	    });
	    return offsetHeight;
	  };

	  this.getHeaderRows = function () {
	    var rows = [{ ref: function ref(node) {
	        return _this3.row = node;
	      }, height: _this3.props.headerRowHeight || _this3.props.rowHeight, rowType: 'header' }];
	    if (_this3.state.canFilter === true) {
	      rows.push({
	        ref: function ref(node) {
	          return _this3.filterRow = node;
	        },
	        filterable: true,
	        onFilterChange: _this3.props.onAddFilter,
	        height: _this3.props.headerFiltersHeight,
	        rowType: 'filter'
	      });
	    }
	    return rows;
	  };

	  this.getInitialSelectedRows = function () {
	    var selectedRows = [];
	    for (var i = 0; i < _this3.props.rowsCount; i++) {
	      selectedRows.push(false);
	    }
	    return selectedRows;
	  };

	  this.getRowSelectionProps = function () {
	    if (_this3.props.rowSelection) {
	      return _this3.props.rowSelection.selectBy;
	    }

	    return null;
	  };

	  this.getSelectedRows = function () {
	    if (_this3.props.rowSelection) {
	      return null;
	    }

	    return _this3.state.selectedRows.filter(function (r) {
	      return r.isSelected === true;
	    });
	  };

	  this.getDataGridDOMNode = function () {
	    return _this3.grid;
	  };

	  this.openCellEditor = function (rowIdx, idx) {
	    _this3.selectCell({ rowIdx: rowIdx, idx: idx }, true);
	  };

	  this.scrollToColumn = function (colIdx) {
	    _this3.eventBus.dispatch(_constants.EventTypes.SCROLL_TO_COLUMN, colIdx);
	  };

	  this.setupGridColumns = function () {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.props;
	    var columns = props.columns;

	    if (_this3._cachedColumns === columns) {
	      return _this3._cachedComputedColumns;
	    }

	    _this3._cachedColumns = columns;

	    var cols = columns.slice(0);
	    var unshiftedCols = {};
	    if (_this3.props.rowActionsCell || props.enableRowSelect && !_this3.props.rowSelection || props.rowSelection && props.rowSelection.showCheckbox !== false) {
	      var SelectAllComponent = _this3.props.selectAllRenderer || _SelectAll2['default'];
	      var SelectAllRenderer = _react2['default'].createElement(SelectAllComponent, { onChange: _this3.handleCheckboxChange, inputRef: function inputRef(grid) {
	          return _this3.selectAllCheckbox = grid;
	        } });
	      var headerRenderer = props.enableRowSelect === 'single' ? null : SelectAllRenderer;
	      var Formatter = _this3.props.rowActionsCell ? _this3.props.rowActionsCell : _CheckboxEditor2['default'];
	      var selectColumn = {
	        key: 'select-row',
	        name: '',
	        formatter: _react2['default'].createElement(Formatter, { rowSelection: _this3.props.rowSelection }),
	        onCellChange: _this3.handleRowSelect,
	        filterable: false,
	        headerRenderer: headerRenderer,
	        width: 60,
	        frozen: true,
	        getRowMetaData: function getRowMetaData(rowData) {
	          return rowData;
	        },
	        cellClass: _this3.props.rowActionsCell ? 'rdg-row-actions-cell' : ''
	      };
	      unshiftedCols = cols.unshift(selectColumn);
	      cols = unshiftedCols > 0 ? cols : unshiftedCols;
	    }
	    _this3._cachedComputedColumns = cols;

	    return _this3._cachedComputedColumns;
	  };

	  this.setGridRef = function (grid) {
	    _this3.grid = grid;
	  };

	  this.renderToolbar = function () {
	    var Toolbar = _this3.props.toolbar;
	    var toolBarProps = { columns: _this3.props.columns, onToggleFilter: _this3.onToggleFilter, numberOfRows: _this3.props.rowsCount };
	    if (_react2['default'].isValidElement(Toolbar)) {
	      return _react2['default'].cloneElement(Toolbar, toolBarProps);
	    } else if ((0, _utils.isFunction)(Toolbar)) {
	      return _react2['default'].createElement(Toolbar, toolBarProps);
	    }
	  };
	};

	module.exports = ReactDataGrid;

/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var Draggable = __webpack_require__(332);
	__webpack_require__(59);

	var style = {
	  position: 'absolute',
	  top: 0,
	  right: 0,
	  width: 6,
	  height: '100%'
	};

	var ResizeHandle = function (_React$Component) {
	  _inherits(ResizeHandle, _React$Component);

	  function ResizeHandle() {
	    _classCallCheck(this, ResizeHandle);

	    return _possibleConstructorReturn(this, (ResizeHandle.__proto__ || Object.getPrototypeOf(ResizeHandle)).apply(this, arguments));
	  }

	  _createClass(ResizeHandle, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(Draggable, _extends({}, this.props, {
	        className: 'react-grid-HeaderCell__resizeHandle',
	        style: style
	      }));
	    }
	  }]);

	  return ResizeHandle;
	}(React.Component);

	module.exports = ResizeHandle;

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _utils = __webpack_require__(10);

	var _CellMetaDataShape = __webpack_require__(41);

	var _CellMetaDataShape2 = _interopRequireDefault(_CellMetaDataShape);

	var _constants = __webpack_require__(22);

	__webpack_require__(60);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RowGroup = function (_Component) {
	  _inherits(RowGroup, _Component);

	  function RowGroup(props) {
	    _classCallCheck(this, RowGroup);

	    var _this = _possibleConstructorReturn(this, (RowGroup.__proto__ || Object.getPrototypeOf(RowGroup)).call(this, props));

	    _this.onRowExpandToggle = function (expand) {
	      var shouldExpand = expand == null ? !_this.props.isExpanded : expand;
	      var meta = _this.props.cellMetaData;
	      if (meta != null && meta.onRowExpandToggle && typeof meta.onRowExpandToggle === 'function') {
	        meta.onRowExpandToggle({ rowIdx: _this.props.idx, shouldExpand: shouldExpand, columnGroupName: _this.props.columnGroupName, name: _this.props.name });
	      }
	    };

	    _this.onClick = function () {
	      _this.props.eventBus.dispatch(_constants.EventTypes.SELECT_CELL, { rowIdx: _this.props.idx });
	    };

	    _this.onRowExpandClick = function () {
	      _this.onRowExpandToggle(!_this.props.isExpanded);
	    };

	    _this.onRowExpandToggle = _this.onRowExpandToggle.bind(_this);
	    _this.onRowExpandClick = _this.onRowExpandClick.bind(_this);
	    return _this;
	  }

	  _createClass(RowGroup, [{
	    key: 'render',
	    value: function render() {
	      var lastColumn = (0, _utils.last)(this.props.columns);

	      var style = { width: lastColumn.left + lastColumn.width };

	      return _react2['default'].createElement(
	        'div',
	        { style: style, className: 'react-grid-row-group', onClick: this.onClick },
	        _react2['default'].createElement(this.props.renderer, _extends({}, this.props, { onRowExpandClick: this.onRowExpandClick, onRowExpandToggle: this.onRowExpandToggle }))
	      );
	    }
	  }]);

	  return RowGroup;
	}(_react.Component);

	RowGroup.propTypes = {
	  height: _propTypes2['default'].number.isRequired,
	  columns: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].array]).isRequired,
	  row: _propTypes2['default'].any.isRequired,
	  cellRenderer: _propTypes2['default'].func,
	  cellMetaData: _propTypes2['default'].shape(_CellMetaDataShape2['default']),
	  isSelected: _propTypes2['default'].bool,
	  idx: _propTypes2['default'].number.isRequired,
	  expandedRows: _propTypes2['default'].arrayOf(_propTypes2['default'].object),
	  extraClasses: _propTypes2['default'].string,
	  forceUpdate: _propTypes2['default'].bool,
	  subRowDetails: _propTypes2['default'].object,
	  isRowHovered: _propTypes2['default'].bool,
	  colVisibleStartIdx: _propTypes2['default'].number.isRequired,
	  colVisibleEndIdx: _propTypes2['default'].number.isRequired,
	  colOverscanStartIdx: _propTypes2['default'].number.isRequired,
	  colOverscanEndIdx: _propTypes2['default'].number.isRequired,
	  isScrolling: _propTypes2['default'].bool.isRequired,
	  columnGroupName: _propTypes2['default'].string.isRequired,
	  isExpanded: _propTypes2['default'].bool.isRequired,
	  treeDepth: _propTypes2['default'].number.isRequired,
	  name: _propTypes2['default'].string.isRequired,
	  renderer: _propTypes2['default'].func,
	  eventBus: _propTypes2['default'].object.isRequired,
	  rowRef: _propTypes2['default'].func.isRequired
	};

	var Defaultbase = function Defaultbase(props) {
	  var treeDepth = props.treeDepth || 0;
	  var marginLeft = treeDepth * 20;

	  var style = {
	    height: '100px',
	    border: '1px solid #dddddd',
	    paddingTop: '15px',
	    paddingLeft: '5px'
	  };

	  var onKeyDown = function onKeyDown(e) {
	    if (e.key === 'ArrowLeft') {
	      props.onRowExpandToggle(false);
	    }
	    if (e.key === 'ArrowRight') {
	      props.onRowExpandToggle(true);
	    }
	    if (e.key === 'Enter') {
	      props.onRowExpandToggle(!props.isExpanded);
	    }
	  };
	  return _react2['default'].createElement(
	    'div',
	    { style: style, onKeyDown: onKeyDown, tabIndex: 0, ref: undefined.props.rowRef },
	    _react2['default'].createElement(
	      'span',
	      { className: 'row-expand-icon', style: { float: 'left', marginLeft: marginLeft, cursor: 'pointer' }, onClick: props.onRowExpandClick },
	      props.isExpanded ? String.fromCharCode('9660') : String.fromCharCode('9658')
	    ),
	    _react2['default'].createElement(
	      'strong',
	      null,
	      props.columnGroupName,
	      ': ',
	      props.name
	    )
	  );
	};

	Defaultbase.propTypes = {
	  onRowExpandClick: _propTypes2['default'].func.isRequired,
	  onRowExpandToggle: _propTypes2['default'].func.isRequired,
	  isExpanded: _propTypes2['default'].bool.isRequired,
	  treeDepth: _propTypes2['default'].number.isRequired,
	  name: _propTypes2['default'].string.isRequired,
	  columnGroupName: _propTypes2['default'].string.isRequired,
	  hideColumnName: _propTypes2['default'].bool
	};

	RowGroup.defaultProps = {
	  renderer: Defaultbase
	};

	exports['default'] = RowGroup;

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _CellMetaDataShape = __webpack_require__(41);

	var _CellMetaDataShape2 = _interopRequireDefault(_CellMetaDataShape);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _ColumnUtils = __webpack_require__(14);

	var _ColumnUtils2 = _interopRequireDefault(_ColumnUtils);

	var _viewportUtils = __webpack_require__(354);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var Canvas = __webpack_require__(327);

	var Viewport = function (_React$Component) {
	  _inherits(Viewport, _React$Component);

	  function Viewport() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Viewport);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Viewport.__proto__ || Object.getPrototypeOf(Viewport)).call.apply(_ref, [this].concat(args))), _this), _this.state = (0, _viewportUtils.getGridState)(_this.props), _this.onScroll = function (_ref2) {
	      var scrollTop = _ref2.scrollTop,
	          scrollLeft = _ref2.scrollLeft;
	      var _this$props = _this.props,
	          rowHeight = _this$props.rowHeight,
	          rowsCount = _this$props.rowsCount,
	          onScroll = _this$props.onScroll;

	      var nextScrollState = _this.updateScroll({
	        scrollTop: scrollTop,
	        scrollLeft: scrollLeft,
	        height: _this.state.height,
	        rowHeight: rowHeight,
	        rowsCount: rowsCount
	      });

	      if (onScroll) {
	        onScroll(nextScrollState);
	      }
	    }, _this.getScroll = function () {
	      return _this.canvas.getScroll();
	    }, _this.setScrollLeft = function (scrollLeft) {
	      _this.canvas.setScrollLeft(scrollLeft);
	    }, _this.getDOMNodeOffsetWidth = function () {
	      return _this.viewport ? _this.viewport.offsetWidth : 0;
	    }, _this.clearScrollTimer = function () {
	      if (_this.resetScrollStateTimeoutId) {
	        clearTimeout(_this.resetScrollStateTimeoutId);
	      }
	    }, _this.resetScrollStateAfterDelay = function () {
	      _this.clearScrollTimer();
	      _this.resetScrollStateTimeoutId = setTimeout(_this.resetScrollStateAfterDelayCallback, 500);
	    }, _this.resetScrollStateAfterDelayCallback = function () {
	      _this.resetScrollStateTimeoutId = null;
	      _this.setState({
	        isScrolling: false
	      });
	    }, _this.updateScroll = function (scrollParams) {
	      _this.resetScrollStateAfterDelay();
	      var nextScrollState = _this.getNextScrollState(scrollParams);
	      _this.setState(nextScrollState);
	      return nextScrollState;
	    }, _this.metricsUpdated = function () {
	      var height = _this.viewportHeight();
	      var width = _this.viewportWidth();
	      if (height) {
	        var _this$state = _this.state,
	            scrollTop = _this$state.scrollTop,
	            scrollLeft = _this$state.scrollLeft;
	        var _this$props2 = _this.props,
	            rowHeight = _this$props2.rowHeight,
	            rowsCount = _this$props2.rowsCount;

	        _this.updateScroll({
	          scrollTop: scrollTop,
	          scrollLeft: scrollLeft,
	          height: height,
	          rowHeight: rowHeight,
	          rowsCount: rowsCount,
	          width: width
	        });
	      }
	    }, _this.viewportHeight = function () {
	      return _this.viewport ? _this.viewport.offsetHeight : 0;
	    }, _this.viewportWidth = function () {
	      return _this.viewport ? _this.viewport.offsetWidth : 0;
	    }, _this.setViewportRef = function (viewport) {
	      _this.viewport = viewport;
	    }, _this.setCanvasRef = function (canvas) {
	      _this.canvas = canvas;
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Viewport, [{
	    key: 'getNextScrollState',
	    value: function getNextScrollState(_ref3) {
	      var scrollTop = _ref3.scrollTop,
	          scrollLeft = _ref3.scrollLeft,
	          height = _ref3.height,
	          rowHeight = _ref3.rowHeight,
	          rowsCount = _ref3.rowsCount;

	      var isScrolling = true;
	      var columns = this.props.columnMetrics.columns;

	      var scrollDirection = (0, _viewportUtils.getScrollDirection)(this.state, scrollTop, scrollLeft);

	      var _getVisibleBoundaries = (0, _viewportUtils.getVisibleBoundaries)(height, rowHeight, scrollTop, rowsCount),
	          rowVisibleStartIdx = _getVisibleBoundaries.rowVisibleStartIdx,
	          rowVisibleEndIdx = _getVisibleBoundaries.rowVisibleEndIdx;

	      var rowOverscanStartIdx = (0, _viewportUtils.getRowOverscanStartIdx)(scrollDirection, rowVisibleStartIdx);
	      var rowOverscanEndIdx = (0, _viewportUtils.getRowOverscanEndIdx)(scrollDirection, rowVisibleEndIdx, rowsCount);
	      var totalNumberColumns = _ColumnUtils2['default'].getSize(columns);
	      var lastFrozenColumnIndex = (0, _viewportUtils.findLastFrozenColumnIndex)(columns);
	      var nonFrozenColVisibleStartIdx = (0, _viewportUtils.getNonFrozenVisibleColStartIdx)(columns, scrollLeft);
	      var nonFrozenRenderedColumnCount = (0, _viewportUtils.getNonFrozenRenderedColumnCount)(this.props.columnMetrics, this.getDOMNodeOffsetWidth(), scrollLeft);
	      var colVisibleEndIdx = Math.min(nonFrozenColVisibleStartIdx + nonFrozenRenderedColumnCount, totalNumberColumns);
	      var colOverscanStartIdx = (0, _viewportUtils.getColOverscanStartIdx)(scrollDirection, nonFrozenColVisibleStartIdx, lastFrozenColumnIndex);
	      var colOverscanEndIdx = (0, _viewportUtils.getColOverscanEndIdx)(scrollDirection, colVisibleEndIdx, totalNumberColumns);
	      return {
	        height: height,
	        scrollTop: scrollTop,
	        scrollLeft: scrollLeft,
	        rowVisibleStartIdx: rowVisibleStartIdx,
	        rowVisibleEndIdx: rowVisibleEndIdx,
	        rowOverscanStartIdx: rowOverscanStartIdx,
	        rowOverscanEndIdx: rowOverscanEndIdx,
	        colVisibleStartIdx: nonFrozenColVisibleStartIdx,
	        colVisibleEndIdx: colVisibleEndIdx,
	        colOverscanStartIdx: colOverscanStartIdx,
	        colOverscanEndIdx: colOverscanEndIdx,
	        scrollDirection: scrollDirection,
	        lastFrozenColumnIndex: lastFrozenColumnIndex,
	        isScrolling: isScrolling,
	        prevScrollTop: this.state.scrollTop,
	        prevScrollLeft: this.state.scrollTop
	      };
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var rowHeight = nextProps.rowHeight,
	          rowsCount = nextProps.rowsCount;

	      if (this.props.rowHeight !== nextProps.rowHeight || this.props.minHeight !== nextProps.minHeight) {
	        var _getGridState = (0, _viewportUtils.getGridState)(nextProps),
	            scrollTop = _getGridState.scrollTop,
	            scrollLeft = _getGridState.scrollLeft,
	            height = _getGridState.height;

	        this.updateScroll({
	          scrollTop: scrollTop,
	          scrollLeft: scrollLeft,
	          height: height,
	          rowHeight: rowHeight,
	          rowsCount: rowsCount
	        });
	      } else if (_ColumnUtils2['default'].getSize(this.props.columnMetrics.columns) !== _ColumnUtils2['default'].getSize(nextProps.columnMetrics.columns)) {
	        this.setState((0, _viewportUtils.getGridState)(nextProps));
	      } else if (this.props.rowsCount !== nextProps.rowsCount) {
	        var _state = this.state,
	            _scrollTop = _state.scrollTop,
	            _scrollLeft = _state.scrollLeft,
	            _height = _state.height;

	        this.updateScroll({
	          scrollTop: _scrollTop,
	          scrollLeft: _scrollLeft,
	          height: _height,
	          rowHeight: rowHeight,
	          rowsCount: rowsCount
	        });
	        // Added to fix the hiding of the bottom scrollbar when showing the filters.
	      } else if (this.props.rowOffsetHeight !== nextProps.rowOffsetHeight) {
	        var _state2 = this.state,
	            _scrollTop2 = _state2.scrollTop,
	            _scrollLeft2 = _state2.scrollLeft;
	        // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)

	        var _height2 = this.state.height + this.props.rowOffsetHeight - nextProps.rowOffsetHeight;
	        this.updateScroll({
	          scrollTop: _scrollTop2,
	          scrollLeft: _scrollLeft2,
	          height: _height2,
	          rowHeight: rowHeight,
	          rowsCount: rowsCount
	        });
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      window.addEventListener('resize', this.metricsUpdated);
	      this.metricsUpdated();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this.metricsUpdated);
	      this.clearScrollTimer();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = {
	        padding: 0,
	        bottom: 0,
	        left: 0,
	        right: 0,
	        overflow: 'hidden',
	        position: 'absolute',
	        top: this.props.rowOffsetHeight
	      };
	      return React.createElement(
	        'div',
	        {
	          className: 'react-grid-Viewport',
	          style: style,
	          ref: this.setViewportRef },
	        React.createElement(Canvas, {
	          ref: this.setCanvasRef,
	          rowKey: this.props.rowKey,
	          totalWidth: this.props.totalWidth,
	          width: this.props.columnMetrics.width,
	          totalColumnWidth: this.props.columnMetrics.totalColumnWidth,
	          rowGetter: this.props.rowGetter,
	          rowsCount: this.props.rowsCount,
	          selectedRows: this.props.selectedRows,
	          expandedRows: this.props.expandedRows,
	          columns: this.props.columnMetrics.columns,
	          rowRenderer: this.props.rowRenderer,
	          rowOverscanStartIdx: this.state.rowOverscanStartIdx,
	          rowOverscanEndIdx: this.state.rowOverscanEndIdx,
	          rowVisibleStartIdx: this.state.rowVisibleStartIdx,
	          rowVisibleEndIdx: this.state.rowVisibleEndIdx,
	          colVisibleStartIdx: this.state.colVisibleStartIdx,
	          colVisibleEndIdx: this.state.colVisibleEndIdx,
	          colOverscanStartIdx: this.state.colOverscanStartIdx,
	          colOverscanEndIdx: this.state.colOverscanEndIdx,
	          lastFrozenColumnIndex: this.state.lastFrozenColumnIndex,
	          cellMetaData: this.props.cellMetaData,
	          height: this.state.height,
	          rowHeight: this.props.rowHeight,
	          onScroll: this.onScroll,
	          onRows: this.props.onRows,
	          rowScrollTimeout: this.props.rowScrollTimeout,
	          scrollToRowIndex: this.props.scrollToRowIndex,
	          contextMenu: this.props.contextMenu,
	          rowSelection: this.props.rowSelection,
	          getSubRowDetails: this.props.getSubRowDetails,
	          rowGroupRenderer: this.props.rowGroupRenderer,
	          isScrolling: this.state.isScrolling || false,
	          enableCellSelect: this.props.enableCellSelect,
	          enableCellAutoFocus: this.props.enableCellAutoFocus,
	          cellNavigationMode: this.props.cellNavigationMode,
	          eventBus: this.props.eventBus,
	          onCheckCellIsEditable: this.props.onCheckCellIsEditable,
	          onCellCopyPaste: this.props.onCellCopyPaste,
	          onGridRowsUpdated: this.props.onGridRowsUpdated,
	          onDragHandleDoubleClick: this.props.onDragHandleDoubleClick,
	          onCellSelected: this.props.onCellSelected,
	          onCellDeSelected: this.props.onCellDeSelected,
	          onCellRangeSelectionStarted: this.props.onCellRangeSelectionStarted,
	          onCellRangeSelectionUpdated: this.props.onCellRangeSelectionUpdated,
	          onCellRangeSelectionCompleted: this.props.onCellRangeSelectionCompleted,
	          onCommit: this.props.onCommit,
	          RowsContainer: this.props.RowsContainer,
	          prevScrollLeft: this.state.prevScrollLeft,
	          prevScrollTop: this.state.prevScrollTop
	        })
	      );
	    }
	  }]);

	  return Viewport;
	}(React.Component);

	Viewport.displayName = 'Viewport';
	Viewport.propTypes = {
	  rowOffsetHeight: _propTypes2['default'].number.isRequired,
	  totalWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]).isRequired,
	  columnMetrics: _propTypes2['default'].object.isRequired,
	  rowGetter: _propTypes2['default'].oneOfType([_propTypes2['default'].array, _propTypes2['default'].func]).isRequired,
	  selectedRows: _propTypes2['default'].array,
	  rowSelection: _propTypes2['default'].oneOfType([_propTypes2['default'].shape({
	    indexes: _propTypes2['default'].arrayOf(_propTypes2['default'].number).isRequired
	  }), _propTypes2['default'].shape({
	    isSelectedKey: _propTypes2['default'].string.isRequired
	  }), _propTypes2['default'].shape({
	    keys: _propTypes2['default'].shape({
	      values: _propTypes2['default'].array.isRequired,
	      rowKey: _propTypes2['default'].string.isRequired
	    }).isRequired
	  })]),
	  expandedRows: _propTypes2['default'].array,
	  rowRenderer: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].func]),
	  rowsCount: _propTypes2['default'].number.isRequired,
	  rowHeight: _propTypes2['default'].number.isRequired,
	  onRows: _propTypes2['default'].func,
	  onScroll: _propTypes2['default'].func,
	  minHeight: _propTypes2['default'].number,
	  cellMetaData: _propTypes2['default'].shape(_CellMetaDataShape2['default']),
	  rowKey: _propTypes2['default'].string.isRequired,
	  rowScrollTimeout: _propTypes2['default'].number,
	  scrollToRowIndex: _propTypes2['default'].number,
	  contextMenu: _propTypes2['default'].element,
	  getSubRowDetails: _propTypes2['default'].func,
	  rowGroupRenderer: _propTypes2['default'].func,
	  enableCellSelect: _propTypes2['default'].bool.isRequired,
	  enableCellAutoFocus: _propTypes2['default'].bool.isRequired,
	  cellNavigationMode: _propTypes2['default'].string.isRequired,
	  eventBus: _propTypes2['default'].object.isRequired,
	  onCheckCellIsEditable: _propTypes2['default'].func,
	  onCellCopyPaste: _propTypes2['default'].func,
	  onGridRowsUpdated: _propTypes2['default'].func.isRequired,
	  onDragHandleDoubleClick: _propTypes2['default'].func.isRequired,
	  onCellSelected: _propTypes2['default'].func,
	  onCellDeSelected: _propTypes2['default'].func,
	  onCellRangeSelectionStarted: _propTypes2['default'].func,
	  onCellRangeSelectionUpdated: _propTypes2['default'].func,
	  onCellRangeSelectionCompleted: _propTypes2['default'].func,
	  onCommit: _propTypes2['default'].func.isRequired,
	  RowsContainer: _propTypes2['default'].node
	};
	Viewport.defaultProps = {
	  rowHeight: 30
	};


	module.exports = Viewport;

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  SimpleCellFormatter: __webpack_require__(165),
	  SelectAll: __webpack_require__(164)
	};

/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _GridPropHelpers = __webpack_require__(344);

	var _GridPropHelpers2 = _interopRequireDefault(_GridPropHelpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	module.exports = {
	  test: { GridPropHelpers: _GridPropHelpers2['default'] }
	};

/***/ }),

/***/ 344:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _rows = [];
	for (var i = 0; i < 1000; i++) {
	  _rows.push({
	    id: i,
	    title: 'Title ' + i,
	    count: i * 1000
	  });
	}
	exports['default'] = {
	  columns: [{
	    key: 'id',
	    name: 'ID',
	    width: 100
	  }, {
	    key: 'title',
	    name: 'Title',
	    width: 100
	  }, {
	    key: 'count',
	    name: 'Count',
	    width: 100
	  }],
	  rowGetter: function rowGetter(i) {
	    return _rows[i];
	  },
	  rowsCount: function rowsCount() {
	    return _rows.length;
	  },
	  cellMetaData: {
	    selected: { idx: 2, rowIdx: 3 },
	    dragged: null,
	    copied: null
	  }
	};

/***/ }),

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _ReactDataGrid = __webpack_require__(338);

	var _ReactDataGrid2 = _interopRequireDefault(_ReactDataGrid);

	var _RowComparer = __webpack_require__(54);

	var _RowComparer2 = _interopRequireDefault(_RowComparer);

	var _Cell = __webpack_require__(159);

	var _Cell2 = _interopRequireDefault(_Cell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	module.exports = _ReactDataGrid2['default'];
	module.exports.Row = __webpack_require__(163);
	module.exports.Cell = _Cell2['default'];
	module.exports.HeaderCell = __webpack_require__(161);
	module.exports.RowComparer = _RowComparer2['default'];
	module.exports.EmptyChildRow = __webpack_require__(333);
	module.exports.editors = __webpack_require__(53);
	module.exports.formatters = __webpack_require__(342);
	module.exports.shapes = __webpack_require__(107);
	module.exports._constants = __webpack_require__(22);
	module.exports._helpers = __webpack_require__(343);

/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _SelectedCellUtils = __webpack_require__(71);

	var _CellMask = __webpack_require__(70);

	var _CellMask2 = _interopRequireDefault(_CellMask);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function CopyMask(_ref) {
	  var copiedPosition = _ref.copiedPosition,
	      columns = _ref.columns,
	      rowHeight = _ref.rowHeight;

	  var dimensions = (0, _SelectedCellUtils.getSelectedDimensions)({ selectedPosition: copiedPosition, columns: columns, rowHeight: rowHeight });
	  return _react2['default'].createElement(_CellMask2['default'], _extends({}, dimensions, {
	    className: 'react-grid-cell-copied'
	  }));
	}

	CopyMask.propTypes = {
	  copiedPosition: _propTypes2['default'].object.isRequired,
	  columns: _propTypes2['default'].array.isRequired,
	  rowHeight: _propTypes2['default'].number.isRequired
	};

	exports['default'] = CopyMask;

/***/ }),

/***/ 347:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function DragHandle(_ref) {
	  var onDragStart = _ref.onDragStart,
	      onDragEnd = _ref.onDragEnd,
	      onDoubleClick = _ref.onDoubleClick;

	  return _react2['default'].createElement('div', {
	    className: 'drag-handle',
	    draggable: 'true',
	    onDragStart: onDragStart,
	    onDragEnd: onDragEnd,
	    onDoubleClick: onDoubleClick
	  });
	}

	DragHandle.propTypes = {
	  onDragStart: _propTypes2['default'].func.isRequired,
	  onDragEnd: _propTypes2['default'].func.isRequired,
	  onDoubleClick: _propTypes2['default'].func.isRequired
	};

	exports['default'] = DragHandle;

/***/ }),

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _SelectedCellUtils = __webpack_require__(71);

	var _CellMask = __webpack_require__(70);

	var _CellMask2 = _interopRequireDefault(_CellMask);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function DragMask(_ref) {
	  var draggedPosition = _ref.draggedPosition,
	      columns = _ref.columns,
	      rowHeight = _ref.rowHeight;
	  var overRowIdx = draggedPosition.overRowIdx,
	      idx = draggedPosition.idx,
	      rowIdx = draggedPosition.rowIdx;

	  if (overRowIdx != null && rowIdx !== overRowIdx) {
	    var isDraggedOverDown = rowIdx < overRowIdx;
	    var startRowIdx = isDraggedOverDown ? rowIdx + 1 : overRowIdx;
	    var endRowIdx = isDraggedOverDown ? overRowIdx : rowIdx - 1;
	    var className = isDraggedOverDown ? 'react-grid-cell-dragged-over-down' : 'react-grid-cell-dragged-over-up';

	    var dimensions = (0, _SelectedCellUtils.getSelectedDimensions)({ selectedPosition: { idx: idx, rowIdx: startRowIdx }, columns: columns, rowHeight: rowHeight });
	    for (var currentRowIdx = startRowIdx + 1; currentRowIdx <= endRowIdx; currentRowIdx++) {
	      var _getSelectedDimension = (0, _SelectedCellUtils.getSelectedDimensions)({ selectedPosition: { idx: idx, rowIdx: currentRowIdx }, columns: columns, rowHeight: rowHeight }),
	          height = _getSelectedDimension.height;

	      dimensions.height += height;
	    }

	    return _react2['default'].createElement(_CellMask2['default'], _extends({}, dimensions, {
	      className: className
	    }));
	  }
	  return null;
	}

	DragMask.propTypes = {
	  draggedPosition: _propTypes2['default'].object.isRequired,
	  columns: _propTypes2['default'].array.isRequired,
	  rowHeight: _propTypes2['default'].number.isRequired
	};

	exports['default'] = DragMask;

/***/ }),

/***/ 349:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventBus = function () {
	  function EventBus() {
	    _classCallCheck(this, EventBus);

	    this.subscribers = {};
	  }

	  _createClass(EventBus, [{
	    key: "subscribe",
	    value: function subscribe(type, handler) {
	      if (!this.subscribers[type]) {
	        this.subscribers[type] = [];
	      }

	      var handlers = this.subscribers[type];
	      handlers.push(handler);

	      return function () {
	        var index = handlers.indexOf(handler);
	        if (index > 0) {
	          handlers.splice(index, 1);
	        }
	      };
	    }
	  }, {
	    key: "dispatch",
	    value: function dispatch(type) {
	      for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        data[_key - 1] = arguments[_key];
	      }

	      var handlers = this.subscribers[type];
	      if (Array.isArray(handlers)) {
	        handlers.forEach(function (handler) {
	          return handler.apply(undefined, data);
	        });
	      }
	    }
	  }]);

	  return EventBus;
	}();

	exports["default"] = EventBus;

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _SelectionMask = __webpack_require__(351);

	var _SelectionMask2 = _interopRequireDefault(_SelectionMask);

	var _SelectionRangeMask = __webpack_require__(352);

	var _SelectionRangeMask2 = _interopRequireDefault(_SelectionRangeMask);

	var _CopyMask = __webpack_require__(346);

	var _CopyMask2 = _interopRequireDefault(_CopyMask);

	var _DragMask = __webpack_require__(348);

	var _DragMask2 = _interopRequireDefault(_DragMask);

	var _DragHandle = __webpack_require__(347);

	var _DragHandle2 = _interopRequireDefault(_DragHandle);

	var _EditorContainer = __webpack_require__(290);

	var _EditorContainer2 = _interopRequireDefault(_EditorContainer);

	var _constants = __webpack_require__(22);

	var _keyboardUtils = __webpack_require__(154);

	var _SelectedCellUtils = __webpack_require__(71);

	var _utils = __webpack_require__(10);

	var _ColumnUtils = __webpack_require__(14);

	var columnUtils = _interopRequireWildcard(_ColumnUtils);

	var _KeyCodes = __webpack_require__(162);

	var keyCodes = _interopRequireWildcard(_KeyCodes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(433);

	var SCROLL_CELL_BUFFER = 2;

	var InteractionMasks = function (_React$Component) {
	  _inherits(InteractionMasks, _React$Component);

	  function InteractionMasks() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, InteractionMasks);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InteractionMasks.__proto__ || Object.getPrototypeOf(InteractionMasks)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(InteractionMasks, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      var _state = this.state,
	          selectedPosition = _state.selectedPosition,
	          isEditorEnabled = _state.isEditorEnabled;
	      var prevSelectedPosition = prevState.selectedPosition,
	          prevIsEditorEnabled = prevState.isEditorEnabled;

	      var isSelectedPositionChanged = selectedPosition !== prevSelectedPosition && (selectedPosition.rowIdx !== prevSelectedPosition.rowIdx || selectedPosition.idx !== prevSelectedPosition.idx);
	      var isEditorClosed = isEditorEnabled !== prevIsEditorEnabled && !isEditorEnabled;

	      if (isSelectedPositionChanged) {
	        // Call event handlers if selected cell has changed
	        var _props = this.props,
	            onCellSelected = _props.onCellSelected,
	            onCellDeSelected = _props.onCellDeSelected;

	        if ((0, _utils.isFunction)(onCellDeSelected) && this.isCellWithinBounds(prevSelectedPosition)) {
	          onCellDeSelected(_extends({}, prevSelectedPosition));
	        }

	        if ((0, _utils.isFunction)(onCellSelected) && this.isCellWithinBounds(selectedPosition)) {
	          onCellSelected(_extends({}, selectedPosition));
	        }
	      }

	      if (isSelectedPositionChanged && this.isCellWithinBounds(selectedPosition) || isEditorClosed) {
	        this.focus();
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _props2 = this.props,
	          eventBus = _props2.eventBus,
	          enableCellAutoFocus = _props2.enableCellAutoFocus;

	      this.unsubscribeSelectCell = eventBus.subscribe(_constants.EventTypes.SELECT_CELL, this.selectCell);
	      this.unsubscribeSelectStart = eventBus.subscribe(_constants.EventTypes.SELECT_START, this.onSelectCellRangeStarted);
	      this.unsubscribeSelectUpdate = eventBus.subscribe(_constants.EventTypes.SELECT_UPDATE, this.onSelectCellRangeUpdated);
	      this.unsubscribeSelectEnd = eventBus.subscribe(_constants.EventTypes.SELECT_END, this.onSelectCellRangeEnded);
	      this.unsubscribeDragEnter = eventBus.subscribe(_constants.EventTypes.DRAG_ENTER, this.handleDragEnter);

	      if (enableCellAutoFocus && this.isFocusedOnBody()) {
	        this.selectFirstCell();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unsubscribeSelectCell();
	      this.unsubscribeSelectStart();
	      this.unsubscribeSelectUpdate();
	      this.unsubscribeSelectEnd();
	      this.unsubscribeDragEnter();
	    }
	  }, {
	    key: 'isKeyboardNavigationEvent',
	    value: function isKeyboardNavigationEvent(e) {
	      return this.getKeyNavActionFromEvent(e) != null;
	    }
	  }, {
	    key: 'isGroupedRowSelected',
	    value: function isGroupedRowSelected() {
	      var rowGetter = this.props.rowGetter;
	      var selectedPosition = this.state.selectedPosition;

	      var rowData = (0, _SelectedCellUtils.getSelectedRow)({ selectedPosition: selectedPosition, rowGetter: rowGetter });
	      return rowData && rowData.__metaData ? rowData.__metaData.isGroup : false;
	    }
	  }, {
	    key: 'getKeyNavActionFromEvent',
	    value: function getKeyNavActionFromEvent(e) {
	      var _props3 = this.props,
	          rowVisibleEndIdx = _props3.rowVisibleEndIdx,
	          rowVisibleStartIdx = _props3.rowVisibleStartIdx,
	          colVisibleEndIdx = _props3.colVisibleEndIdx,
	          colVisibleStartIdx = _props3.colVisibleStartIdx,
	          onHitBottomBoundary = _props3.onHitBottomBoundary,
	          onHitRightBoundary = _props3.onHitRightBoundary,
	          onHitLeftBoundary = _props3.onHitLeftBoundary,
	          onHitTopBoundary = _props3.onHitTopBoundary;

	      var isCellAtBottomBoundary = function isCellAtBottomBoundary(cell) {
	        return cell.rowIdx >= rowVisibleEndIdx - SCROLL_CELL_BUFFER;
	      };
	      var isCellAtTopBoundary = function isCellAtTopBoundary(cell) {
	        return cell.rowIdx !== 0 && cell.rowIdx <= rowVisibleStartIdx - 1;
	      };
	      var isCellAtRightBoundary = function isCellAtRightBoundary(cell) {
	        return cell.idx !== 0 && cell.idx >= colVisibleEndIdx - 1;
	      };
	      var isCellAtLeftBoundary = function isCellAtLeftBoundary(cell) {
	        return cell.idx !== 0 && cell.idx <= colVisibleStartIdx + 1;
	      };

	      var keyNavActions = {
	        ArrowDown: {
	          getNext: function getNext(current) {
	            return _extends({}, current, { rowIdx: current.rowIdx + 1 });
	          },
	          isCellAtBoundary: isCellAtBottomBoundary,
	          onHitBoundary: onHitBottomBoundary
	        },
	        ArrowUp: {
	          getNext: function getNext(current) {
	            return _extends({}, current, { rowIdx: current.rowIdx - 1 });
	          },
	          isCellAtBoundary: isCellAtTopBoundary,
	          onHitBoundary: onHitTopBoundary
	        },
	        ArrowRight: {
	          getNext: function getNext(current) {
	            return _extends({}, current, { idx: current.idx + 1 });
	          },
	          isCellAtBoundary: isCellAtRightBoundary,
	          onHitBoundary: function onHitBoundary(next) {
	            onHitRightBoundary(next);
	            // Selected cell can hit the bottom boundary when the cellNavigationMode is 'changeRow'
	            if (isCellAtBottomBoundary(next)) {
	              onHitBottomBoundary(next);
	            }
	          }
	        },
	        ArrowLeft: {
	          getNext: function getNext(current) {
	            return _extends({}, current, { idx: current.idx - 1 });
	          },
	          isCellAtBoundary: isCellAtLeftBoundary,
	          onHitBoundary: function onHitBoundary(next) {
	            onHitLeftBoundary(next);
	            // Selected cell can hit the top boundary when the cellNavigationMode is 'changeRow'
	            if (isCellAtTopBoundary(next)) {
	              onHitTopBoundary(next);
	            }
	          }
	        }
	      };
	      if (e.keyCode === keyCodes.Tab) {
	        return e.shiftKey === true ? keyNavActions.ArrowLeft : keyNavActions.ArrowRight;
	      }
	      return keyNavActions[e.key];
	    }
	  }, {
	    key: 'changeCellFromEvent',
	    value: function changeCellFromEvent(e) {
	      e.preventDefault();
	      var isTab = e.keyCode === keyCodes.Tab;
	      var isShift = e.shiftKey;

	      if (isTab) {
	        var cellNavigationMode = this.props.cellNavigationMode === _constants.CellNavigationMode.NONE ? _constants.CellNavigationMode.CHANGE_ROW : this.props.cellNavigationMode;
	        this.changeCellFromKeyAction(e, cellNavigationMode);
	      } else if (isShift) {
	        this.changeSelectedRangeFromArrowKeyAction(e);
	      } else {
	        this.changeCellFromKeyAction(e, this.props.cellNavigationMode);
	      }
	    }
	  }, {
	    key: 'changeCellFromKeyAction',
	    value: function changeCellFromKeyAction(e, cellNavigationMode) {
	      var currentPosition = this.state.selectedPosition;
	      var keyNavAction = this.getKeyNavActionFromEvent(e);
	      var next = this.getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode);
	      this.checkIsAtGridBoundary(keyNavAction, next);

	      var changeRowOrColumn = next.changeRowOrColumn,
	          nextPos = _objectWithoutProperties(next, ['changeRowOrColumn']);

	      this.selectCell(nextPos);
	    }
	  }, {
	    key: 'changeSelectedRangeFromArrowKeyAction',
	    value: function changeSelectedRangeFromArrowKeyAction(e) {
	      var _this2 = this;

	      var cellNavigationMode = this.props.cellNavigationMode;

	      var currentPosition = this.state.selectedRange.cursorCell || this.state.selectedPosition;
	      var keyNavAction = this.getKeyNavActionFromEvent(e);
	      var next = this.getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode);
	      this.checkIsAtGridBoundary(keyNavAction, next);

	      var changeRowOrColumn = next.changeRowOrColumn,
	          nextPos = _objectWithoutProperties(next, ['changeRowOrColumn']);

	      this.onSelectCellRangeUpdated(nextPos, true, function () {
	        _this2.onSelectCellRangeEnded();
	      });
	    }
	  }, {
	    key: 'getNextSelectedCellPositionForKeyNavAction',
	    value: function getNextSelectedCellPositionForKeyNavAction(keyNavAction, currentPosition, cellNavigationMode) {
	      var getNext = keyNavAction.getNext;

	      var nextPosition = getNext(currentPosition);
	      var _props4 = this.props,
	          columns = _props4.columns,
	          rowsCount = _props4.rowsCount;

	      return (0, _SelectedCellUtils.getNextSelectedCellPosition)({
	        columns: columns,
	        rowsCount: rowsCount,
	        cellNavigationMode: cellNavigationMode
	      }, nextPosition);
	    }
	  }, {
	    key: 'checkIsAtGridBoundary',
	    value: function checkIsAtGridBoundary(keyNavAction, next) {
	      var isCellAtBoundary = keyNavAction.isCellAtBoundary,
	          onHitBoundary = keyNavAction.onHitBoundary;

	      var changeRowOrColumn = next.changeRowOrColumn,
	          nextPos = _objectWithoutProperties(next, ['changeRowOrColumn']);

	      if (isCellAtBoundary(nextPos) || changeRowOrColumn) {
	        onHitBoundary(nextPos);
	      }
	    }
	  }, {
	    key: 'createSingleCellSelectedRange',
	    value: function createSingleCellSelectedRange(cellPosition, isDragging) {
	      return {
	        topLeft: cellPosition,
	        bottomRight: cellPosition,
	        startCell: cellPosition,
	        cursorCell: cellPosition,
	        isDragging: isDragging
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var _props5 = this.props,
	          rowGetter = _props5.rowGetter,
	          contextMenu = _props5.contextMenu,
	          rowHeight = _props5.rowHeight,
	          getSelectedRowColumns = _props5.getSelectedRowColumns;
	      var _state2 = this.state,
	          isEditorEnabled = _state2.isEditorEnabled,
	          firstEditorKeyPress = _state2.firstEditorKeyPress,
	          selectedPosition = _state2.selectedPosition,
	          draggedPosition = _state2.draggedPosition,
	          copiedPosition = _state2.copiedPosition;

	      var rowData = (0, _SelectedCellUtils.getSelectedRow)({ selectedPosition: selectedPosition, rowGetter: rowGetter });
	      var columns = getSelectedRowColumns(selectedPosition.rowIdx);
	      return _react2['default'].createElement(
	        'div',
	        {
	          ref: function ref(node) {
	            _this3.node = node;
	          },
	          tabIndex: '0',
	          onKeyDown: this.onKeyDown,
	          onFocus: this.onFocus
	        },
	        copiedPosition && _react2['default'].createElement(_CopyMask2['default'], {
	          copiedPosition: copiedPosition,
	          rowHeight: rowHeight,
	          columns: getSelectedRowColumns(copiedPosition.rowIdx)
	        }),
	        draggedPosition && _react2['default'].createElement(_DragMask2['default'], {
	          draggedPosition: draggedPosition,
	          rowHeight: rowHeight,
	          columns: getSelectedRowColumns(draggedPosition.rowIdx)
	        }),
	        (0, _SelectedCellUtils.selectedRangeIsSingleCell)(this.state.selectedRange) ? this.getSingleCellSelectView() : this.getCellRangeSelectView(),
	        isEditorEnabled && _react2['default'].createElement(_EditorContainer2['default'], _extends({
	          firstEditorKeyPress: firstEditorKeyPress,
	          onCommit: this.onCommit,
	          onCommitCancel: this.onCommitCancel,
	          rowIdx: selectedPosition.rowIdx,
	          value: (0, _SelectedCellUtils.getSelectedCellValue)({ selectedPosition: selectedPosition, columns: columns, rowGetter: rowGetter }),
	          rowData: rowData,
	          column: (0, _SelectedCellUtils.getSelectedColumn)({ selectedPosition: selectedPosition, columns: columns }),
	          scrollLeft: this.props.scrollLeft,
	          scrollTop: this.props.scrollTop
	        }, (0, _SelectedCellUtils.getSelectedDimensions)({ selectedPosition: selectedPosition, rowHeight: rowHeight, columns: columns }))),
	        (0, _react.isValidElement)(contextMenu) && (0, _react.cloneElement)(contextMenu, _extends({}, selectedPosition))
	      );
	    }
	  }]);

	  return InteractionMasks;
	}(_react2['default'].Component);

	InteractionMasks.propTypes = {
	  colVisibleStartIdx: _propTypes2['default'].number.isRequired,
	  colVisibleEndIdx: _propTypes2['default'].number.isRequired,
	  rowVisibleStartIdx: _propTypes2['default'].number.isRequired,
	  rowVisibleEndIdx: _propTypes2['default'].number.isRequired,
	  rowOverscanStartIdx: _propTypes2['default'].number.isRequired,
	  columns: _propTypes2['default'].array,
	  width: _propTypes2['default'].number,
	  rowHeight: _propTypes2['default'].number.isRequired,
	  rowGetter: _propTypes2['default'].func.isRequired,
	  rowsCount: _propTypes2['default'].number.isRequired,
	  enableCellSelect: _propTypes2['default'].bool.isRequired,
	  enableCellAutoFocus: _propTypes2['default'].bool.isRequired,
	  cellNavigationMode: _propTypes2['default'].oneOf([_constants.CellNavigationMode.NONE, _constants.CellNavigationMode.LOOP_OVER_ROW, _constants.CellNavigationMode.CHANGE_ROW]).isRequired,
	  eventBus: _propTypes2['default'].object.isRequired,
	  contextMenu: _propTypes2['default'].element,
	  onCheckCellIsEditable: _propTypes2['default'].func,
	  onCellCopyPaste: _propTypes2['default'].func,
	  onGridRowsUpdated: _propTypes2['default'].func.isRequired,
	  onHitBottomBoundary: _propTypes2['default'].func.isRequired,
	  onHitTopBoundary: _propTypes2['default'].func.isRequired,
	  onHitRightBoundary: _propTypes2['default'].func.isRequired,
	  onHitLeftBoundary: _propTypes2['default'].func.isRequired,
	  onCommit: _propTypes2['default'].func.isRequired,
	  onCommitCancel: _propTypes2['default'].func,
	  onCellSelected: _propTypes2['default'].func,
	  onCellDeSelected: _propTypes2['default'].func,
	  onCellRangeSelectionStarted: _propTypes2['default'].func,
	  onCellRangeSelectionUpdated: _propTypes2['default'].func,
	  onCellRangeSelectionCompleted: _propTypes2['default'].func,
	  onCellsDragged: _propTypes2['default'].func,
	  onDragHandleDoubleClick: _propTypes2['default'].func.isRequired,
	  onBeforeFocus: _propTypes2['default'].func.isRequired,
	  scrollLeft: _propTypes2['default'].number.isRequired,
	  prevScrollLeft: _propTypes2['default'].number.isRequired,
	  scrollTop: _propTypes2['default'].number.isRequired,
	  prevScrollTop: _propTypes2['default'].number.isRequired,
	  rows: _propTypes2['default'].array.isRequired,
	  getSelectedRowHeight: _propTypes2['default'].func.isRequired,
	  getSelectedRowTop: _propTypes2['default'].func.isRequired,
	  getSelectedRowColumns: _propTypes2['default'].func.isRequired
	};

	var _initialiseProps = function _initialiseProps() {
	  var _this4 = this;

	  this.state = {
	    selectedPosition: {
	      idx: -1,
	      rowIdx: -1
	    },
	    selectedRange: {
	      topLeft: {
	        idx: -1, rowIdx: -1
	      },
	      bottomRight: {
	        idx: -1, rowIdx: -1
	      }
	    },
	    copiedPosition: null,
	    draggedPosition: null,
	    frozenPosition: null,
	    isEditorEnabled: false,
	    firstEditorKeyPress: null
	  };

	  this.onKeyDown = function (e) {
	    if ((0, _keyboardUtils.isCtrlKeyHeldDown)(e)) {
	      _this4.onPressKeyWithCtrl(e);
	    } else if (e.keyCode === keyCodes.Escape) {
	      _this4.onPressEscape(e);
	    } else if (e.keyCode === keyCodes.Tab) {
	      _this4.onPressTab(e);
	    } else if (_this4.isKeyboardNavigationEvent(e)) {
	      _this4.changeCellFromEvent(e);
	    } else if ((0, _keyboardUtils.isKeyPrintable)(e.keyCode) || [keyCodes.Backspace, keyCodes.Delete, keyCodes.Enter].indexOf(e.keyCode) !== -1) {
	      _this4.openEditor(e);
	    }
	  };

	  this.isSelectedCellEditable = function () {
	    var _props6 = _this4.props,
	        enableCellSelect = _props6.enableCellSelect,
	        columns = _props6.columns,
	        rowGetter = _props6.rowGetter,
	        onCheckCellIsEditable = _props6.onCheckCellIsEditable;
	    var selectedPosition = _this4.state.selectedPosition;

	    return (0, _SelectedCellUtils.isSelectedCellEditable)({ enableCellSelect: enableCellSelect, columns: columns, rowGetter: rowGetter, selectedPosition: selectedPosition, onCheckCellIsEditable: onCheckCellIsEditable });
	  };

	  this.openEditor = function () {
	    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        key = _ref2.key;

	    if (_this4.isSelectedCellEditable() && !_this4.state.isEditorEnabled) {
	      _this4.setState({
	        isEditorEnabled: true,
	        firstEditorKeyPress: key
	      });
	    }
	  };

	  this.closeEditor = function () {
	    _this4.setState({
	      isEditorEnabled: false,
	      firstEditorKeyPress: null
	    });
	  };

	  this.onPressKeyWithCtrl = function (_ref3) {
	    var keyCode = _ref3.keyCode;

	    if (_this4.copyPasteEnabled()) {
	      if (keyCode === keyCodes.c) {
	        var _props7 = _this4.props,
	            columns = _props7.columns,
	            rowGetter = _props7.rowGetter;
	        var selectedPosition = _this4.state.selectedPosition;

	        var value = (0, _SelectedCellUtils.getSelectedCellValue)({ selectedPosition: selectedPosition, columns: columns, rowGetter: rowGetter });
	        _this4.handleCopy({ value: value });
	      } else if (keyCode === keyCodes.v) {
	        _this4.handlePaste();
	      }
	    }
	  };

	  this.onFocus = function (e) {
	    var shift = e.shiftKey === true;
	    var _state$selectedPositi = _this4.state.selectedPosition,
	        idx = _state$selectedPositi.idx,
	        rowIdx = _state$selectedPositi.rowIdx;

	    if (idx === -1 && rowIdx === -1) {
	      if (shift) {
	        // FIXME: How to check if shift was pressed?
	        _this4.selectLastCell();
	      } else {
	        _this4.selectFirstCell();
	      }
	    }
	  };

	  this.onPressTab = function (e) {
	    var _props8 = _this4.props,
	        cellNavigationMode = _props8.cellNavigationMode,
	        columns = _props8.columns,
	        rowsCount = _props8.rowsCount;
	    var _state3 = _this4.state,
	        selectedPosition = _state3.selectedPosition,
	        isEditorEnabled = _state3.isEditorEnabled;
	    // When there are no rows in the grid, pressing tab needs to allow the browser to handle it

	    if (rowsCount === 0) {
	      return;
	    }

	    // If we are in a position to leave the grid, stop editing but stay in that cell
	    if ((0, _SelectedCellUtils.canExitGrid)(e, { cellNavigationMode: cellNavigationMode, columns: columns, rowsCount: rowsCount, selectedPosition: selectedPosition })) {
	      if (isEditorEnabled) {
	        _this4.closeEditor();
	        return;
	      }

	      // Reset the selected position before exiting
	      _this4.setState({ selectedPosition: { idx: -1, rowIdx: -1 } });
	      return;
	    }

	    _this4.changeCellFromEvent(e);
	  };

	  this.onPressEscape = function () {
	    if (_this4.copyPasteEnabled()) {
	      _this4.handleCancelCopy();
	      _this4.closeEditor();
	    }
	  };

	  this.copyPasteEnabled = function () {
	    return _this4.props.onCellCopyPaste !== null && _this4.isSelectedCellEditable();
	  };

	  this.handleCopy = function (_ref4) {
	    var value = _ref4.value;
	    var _state$selectedPositi2 = _this4.state.selectedPosition,
	        rowIdx = _state$selectedPositi2.rowIdx,
	        idx = _state$selectedPositi2.idx;

	    _this4.setState({
	      copiedPosition: { rowIdx: rowIdx, idx: idx, value: value }
	    });
	  };

	  this.handleCancelCopy = function () {
	    _this4.setState({ copiedPosition: null });
	  };

	  this.handlePaste = function () {
	    var _props9 = _this4.props,
	        columns = _props9.columns,
	        onCellCopyPaste = _props9.onCellCopyPaste,
	        onGridRowsUpdated = _props9.onGridRowsUpdated;
	    var _state4 = _this4.state,
	        selectedPosition = _state4.selectedPosition,
	        copiedPosition = _state4.copiedPosition;
	    var toRow = selectedPosition.rowIdx;


	    if (copiedPosition == null) {
	      return;
	    }

	    var _getSelectedColumn = (0, _SelectedCellUtils.getSelectedColumn)({ selectedPosition: selectedPosition, columns: columns }),
	        cellKey = _getSelectedColumn.key;

	    var fromRow = copiedPosition.rowIdx,
	        textToCopy = copiedPosition.value;


	    if ((0, _utils.isFunction)(onCellCopyPaste)) {
	      onCellCopyPaste({
	        cellKey: cellKey,
	        rowIdx: rowIdx,
	        fromRow: fromRow,
	        toRow: toRow,
	        value: textToCopy
	      });
	    }

	    onGridRowsUpdated(cellKey, toRow, toRow, _defineProperty({}, cellKey, textToCopy), _constants.UpdateActions.COPY_PASTE, fromRow);
	  };

	  this.isCellWithinBounds = function (_ref5) {
	    var idx = _ref5.idx,
	        rowIdx = _ref5.rowIdx;
	    var _props10 = _this4.props,
	        columns = _props10.columns,
	        rowsCount = _props10.rowsCount;

	    return rowIdx >= 0 && rowIdx < rowsCount && idx >= 0 && idx < columnUtils.getSize(columns);
	  };

	  this.isGridSelected = function () {
	    return _this4.isCellWithinBounds(_this4.state.selectedPosition);
	  };

	  this.isFocused = function () {
	    return document.activeElement === _this4.node;
	  };

	  this.isFocusedOnBody = function () {
	    return document.activeElement === document.body;
	  };

	  this.focus = function () {
	    if (_this4.node && !_this4.isFocused()) {
	      _this4.props.onBeforeFocus(function () {
	        return _this4.node.focus();
	      });
	    }
	  };

	  this.selectFirstCell = function () {
	    _this4.selectCell({ rowIdx: 0, idx: 0 });
	  };

	  this.selectLastCell = function () {
	    var _props11 = _this4.props,
	        rowsCount = _props11.rowsCount,
	        columns = _props11.columns;

	    _this4.selectCell({ rowIdx: rowsCount - 1, idx: columnUtils.getSize(columns) - 1 });
	  };

	  this.selectCell = function (cell, openEditor) {
	    var callback = openEditor ? _this4.openEditor : function () {
	      return null;
	    };
	    _this4.setState(function (prevState) {
	      var next = _extends({}, prevState.selectedPosition, cell);
	      if (_this4.isCellWithinBounds(next)) {
	        return {
	          selectedPosition: next,
	          prevSelectedPosition: cell,
	          selectedRange: {
	            topLeft: next,
	            bottomRight: next,
	            startCell: next,
	            cursorCell: next,
	            isDragging: false
	          }
	        };
	      }
	      return prevState;
	    }, callback);
	  };

	  this.onSelectCellRangeStarted = function (selectedPosition) {
	    _this4.setState({
	      selectedRange: _this4.createSingleCellSelectedRange(selectedPosition, true),
	      selectedPosition: selectedPosition
	    }, function () {
	      if ((0, _utils.isFunction)(_this4.props.onCellRangeSelectionStarted)) {
	        _this4.props.onCellRangeSelectionStarted(_this4.state.selectedRange);
	      }
	    });
	  };

	  this.onSelectCellRangeUpdated = function (cellPosition, isFromKeyboard, callback) {
	    if (!_this4.state.selectedRange.isDragging && !isFromKeyboard) {
	      return;
	    }

	    if (!_this4.isCellWithinBounds(cellPosition)) {
	      return;
	    }

	    var startCell = _this4.state.selectedRange.startCell || _this4.state.selectedPosition;
	    var colIdxs = [startCell.idx, cellPosition.idx].sort(function (a, b) {
	      return a - b;
	    });
	    var rowIdxs = [startCell.rowIdx, cellPosition.rowIdx].sort(function (a, b) {
	      return a - b;
	    });
	    var topLeft = { idx: colIdxs[0], rowIdx: rowIdxs[0] };
	    var bottomRight = { idx: colIdxs[1], rowIdx: rowIdxs[1] };

	    var selectedRange = _extends({ startCell: _this4.state.selectedPosition }, _this4.state.selectedRange, {
	      // assign the new state - the bounds of the range, and the new cursor cell
	      topLeft: topLeft,
	      bottomRight: bottomRight,
	      cursorCell: cellPosition
	    });

	    _this4.setState({
	      selectedRange: selectedRange
	    }, function () {
	      if ((0, _utils.isFunction)(_this4.props.onCellRangeSelectionUpdated)) {
	        _this4.props.onCellRangeSelectionUpdated(_this4.state.selectedRange);
	      }
	      if ((0, _utils.isFunction)(callback)) {
	        callback();
	      }
	    });
	  };

	  this.onSelectCellRangeEnded = function () {
	    var selectedRange = _extends({}, _this4.state.selectedRange, { isDragging: false });
	    _this4.setState({ selectedRange: selectedRange }, function () {
	      if ((0, _utils.isFunction)(_this4.props.onCellRangeSelectionCompleted)) {
	        _this4.props.onCellRangeSelectionCompleted(_this4.state.selectedRange);
	      }

	      // Focus the InteractionMasks, so it can receive keyboard events
	      _this4.focus();
	    });
	  };

	  this.dragEnabled = function () {
	    var _props12 = _this4.props,
	        onGridRowsUpdated = _props12.onGridRowsUpdated,
	        onCellsDragged = _props12.onCellsDragged;

	    return _this4.isSelectedCellEditable() && ((0, _utils.isFunction)(onGridRowsUpdated) || (0, _utils.isFunction)(onCellsDragged));
	  };

	  this.handleDragStart = function (e) {
	    var _state$selectedPositi3 = _this4.state.selectedPosition,
	        idx = _state$selectedPositi3.idx,
	        rowIdx = _state$selectedPositi3.rowIdx;
	    // To prevent dragging down/up when reordering rows. (TODO: is this required)

	    var isViewportDragging = e && e.target && e.target.className;
	    if (idx > -1 && isViewportDragging) {
	      e.dataTransfer.effectAllowed = 'copy';
	      e.dataTransfer.setData('text/plain', JSON.stringify({ idx: idx, rowIdx: rowIdx }));
	      _this4.setState({
	        draggedPosition: { idx: idx, rowIdx: rowIdx }
	      });
	    }
	  };

	  this.handleDragEnter = function (_ref6) {
	    var overRowIdx = _ref6.overRowIdx;

	    if (_this4.state.draggedPosition != null) {
	      _this4.setState(function (_ref7) {
	        var draggedPosition = _ref7.draggedPosition;
	        return {
	          draggedPosition: _extends({}, draggedPosition, { overRowIdx: overRowIdx })
	        };
	      });
	    }
	  };

	  this.handleDragEnd = function () {
	    var draggedPosition = _this4.state.draggedPosition;

	    if (draggedPosition != null) {
	      var _rowIdx = draggedPosition.rowIdx,
	          overRowIdx = draggedPosition.overRowIdx;

	      if (overRowIdx != null) {
	        var _props13 = _this4.props,
	            columns = _props13.columns,
	            onCellsDragged = _props13.onCellsDragged,
	            onGridRowsUpdated = _props13.onGridRowsUpdated,
	            rowGetter = _props13.rowGetter;

	        var column = (0, _SelectedCellUtils.getSelectedColumn)({ selectedPosition: draggedPosition, columns: columns });
	        var value = (0, _SelectedCellUtils.getSelectedCellValue)({ selectedPosition: draggedPosition, columns: columns, rowGetter: rowGetter });
	        var cellKey = column.key;
	        var fromRow = _rowIdx < overRowIdx ? _rowIdx : overRowIdx;
	        var toRow = _rowIdx > overRowIdx ? _rowIdx : overRowIdx;

	        if ((0, _utils.isFunction)(onCellsDragged)) {
	          onCellsDragged({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, value: value });
	        }
	        if ((0, _utils.isFunction)(onGridRowsUpdated)) {
	          onGridRowsUpdated(cellKey, fromRow, toRow, _defineProperty({}, cellKey, value), _constants.UpdateActions.CELL_DRAG);
	        }
	      }
	      _this4.setState({
	        draggedPosition: null
	      });
	    }
	  };

	  this.onDragHandleDoubleClick = function () {
	    var _props14 = _this4.props,
	        onDragHandleDoubleClick = _props14.onDragHandleDoubleClick,
	        rowGetter = _props14.rowGetter;
	    var selectedPosition = _this4.state.selectedPosition;
	    var idx = selectedPosition.idx,
	        rowIdx = selectedPosition.rowIdx;

	    var rowData = (0, _SelectedCellUtils.getSelectedRow)({ selectedPosition: selectedPosition, rowGetter: rowGetter });
	    onDragHandleDoubleClick({ idx: idx, rowIdx: rowIdx, rowData: rowData });
	  };

	  this.onCommit = function () {
	    var _props15;

	    (_props15 = _this4.props).onCommit.apply(_props15, arguments);
	    _this4.closeEditor();
	  };

	  this.onCommitCancel = function () {
	    _this4.closeEditor();
	  };

	  this.getSingleCellSelectView = function () {
	    var _props16 = _this4.props,
	        columns = _props16.columns,
	        getSelectedRowHeight = _props16.getSelectedRowHeight,
	        getSelectedRowTop = _props16.getSelectedRowTop,
	        scrollLeft = _props16.scrollLeft,
	        scrollTop = _props16.scrollTop,
	        prevScrollLeft = _props16.prevScrollLeft,
	        prevScrollTop = _props16.prevScrollTop;
	    var selectedPosition = _this4.state.selectedPosition;

	    return !_this4.state.isEditorEnabled && _this4.isGridSelected() && _react2['default'].createElement(
	      _SelectionMask2['default'],
	      {
	        selectedPosition: selectedPosition,
	        columns: columns,
	        isGroupedRow: _this4.isGroupedRowSelected(),
	        scrollTop: scrollTop,
	        scrollLeft: scrollLeft,
	        getSelectedRowHeight: getSelectedRowHeight,
	        getSelectedRowTop: getSelectedRowTop,
	        prevScrollLeft: prevScrollLeft,
	        prevScrollTop: prevScrollTop,
	        prevSelectedPosition: _this4.state.prevSelectedPosition
	      },
	      _this4.dragEnabled() && _react2['default'].createElement(_DragHandle2['default'], {
	        onDragStart: _this4.handleDragStart,
	        onDragEnd: _this4.handleDragEnd,
	        onDoubleClick: _this4.onDragHandleDoubleClick
	      })
	    );
	  };

	  this.getCellRangeSelectView = function () {
	    var _props17 = _this4.props,
	        columns = _props17.columns,
	        rowHeight = _props17.rowHeight,
	        getSelectedRowHeight = _props17.getSelectedRowHeight,
	        getSelectedRowTop = _props17.getSelectedRowTop,
	        scrollLeft = _props17.scrollLeft,
	        scrollTop = _props17.scrollTop,
	        prevScrollLeft = _props17.prevScrollLeft,
	        prevScrollTop = _props17.prevScrollTop;

	    return [_react2['default'].createElement(_SelectionRangeMask2['default'], {
	      key: 'range-mask',
	      selectedRange: _this4.state.selectedRange,
	      columns: columns,
	      rowHeight: rowHeight
	    }), _react2['default'].createElement(_SelectionMask2['default'], {
	      key: 'selection-mask',
	      selectedPosition: _this4.state.selectedRange.startCell,
	      columns: columns,
	      rowHeight: rowHeight,
	      scrollLeft: scrollLeft,
	      scrollTop: scrollTop,
	      getSelectedRowHeight: getSelectedRowHeight,
	      getSelectedRowTop: getSelectedRowTop,
	      prevScrollLeft: prevScrollLeft,
	      prevScrollTop: prevScrollTop,
	      prevSelectedPosition: _this4.state.prevSelectedPosition
	    })];
	  };
	};

	exports['default'] = InteractionMasks;

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCellMaskDimensions = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _CellMask = __webpack_require__(70);

	var _CellMask2 = _interopRequireDefault(_CellMask);

	var _ColumnUtils = __webpack_require__(14);

	var columnUtils = _interopRequireWildcard(_ColumnUtils);

	var _zIndexes = __webpack_require__(106);

	var _zIndexes2 = _interopRequireDefault(_zIndexes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var isFrozenColumn = function isFrozenColumn(columns, _ref) {
	  var idx = _ref.idx;
	  return columnUtils.isFrozen(columnUtils.getColumn(columns, idx));
	};

	var isScrollingHorizontallyWithoutCellChange = function isScrollingHorizontallyWithoutCellChange(_ref2) {
	  var scrollTop = _ref2.scrollTop,
	      prevScrollTop = _ref2.prevScrollTop,
	      scrollLeft = _ref2.scrollLeft,
	      prevScrollLeft = _ref2.prevScrollLeft,
	      selectedPosition = _ref2.selectedPosition,
	      prevSelectedPosition = _ref2.prevSelectedPosition;

	  return scrollLeft !== prevScrollLeft && scrollTop === prevScrollTop && selectedPosition.idx === prevSelectedPosition.idx;
	};

	var getLeftPosition = function getLeftPosition(isFrozen, cellLeft, props) {
	  if (isFrozen && !isScrollingHorizontallyWithoutCellChange(props)) {
	    return props.scrollLeft + cellLeft;
	  }
	  return cellLeft;
	};

	var getCellMaskDimensions = exports.getCellMaskDimensions = function getCellMaskDimensions(props) {
	  var selectedPosition = props.selectedPosition,
	      columns = props.columns,
	      getSelectedRowHeight = props.getSelectedRowHeight,
	      getSelectedRowTop = props.getSelectedRowTop;

	  var column = columnUtils.getColumn(columns, selectedPosition.idx);
	  var height = getSelectedRowHeight(selectedPosition.rowIdx);
	  var top = getSelectedRowTop(selectedPosition.rowIdx);
	  var frozen = isFrozenColumn(columns, selectedPosition);
	  var zIndex = frozen ? _zIndexes2['default'].FROZEN_CELL_MASK : _zIndexes2['default'].CELL_MASK;
	  var left = getLeftPosition(frozen, column.left, props);
	  return { height: height, top: top, width: column.width, left: left, zIndex: zIndex };
	};

	function SelectionMask(_ref3) {
	  var children = _ref3.children,
	      rest = _objectWithoutProperties(_ref3, ['children']);

	  var dimensions = getCellMaskDimensions(rest);
	  var frozen = isFrozenColumn(rest.columns, rest.selectedPosition);
	  var position = frozen && isScrollingHorizontallyWithoutCellChange(rest) ? 'fixed' : 'absolute';
	  return _react2['default'].createElement(
	    _CellMask2['default'],
	    _extends({}, dimensions, {
	      className: 'rdg-selected',
	      position: position
	    }),
	    children
	  );
	}

	SelectionMask.propTypes = {
	  selectedPosition: _propTypes2['default'].object.isRequired,
	  columns: _propTypes2['default'].array.isRequired,
	  rowHeight: _propTypes2['default'].number.isRequired
	};

	exports['default'] = SelectionMask;

/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _SelectedCellUtils = __webpack_require__(71);

	var _CellMask = __webpack_require__(70);

	var _CellMask2 = _interopRequireDefault(_CellMask);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function SelectionRangeMask(_ref) {
	  var selectedRange = _ref.selectedRange,
	      columns = _ref.columns,
	      rowHeight = _ref.rowHeight,
	      children = _ref.children;

	  var dimensions = (0, _SelectedCellUtils.getSelectedRangeDimensions)({ selectedRange: selectedRange, columns: columns, rowHeight: rowHeight });
	  return _react2['default'].createElement(
	    _CellMask2['default'],
	    _extends({}, dimensions, {
	      className: 'rdg-selected-range'
	    }),
	    children
	  );
	}

	SelectionRangeMask.propTypes = {
	  selectedRange: _propTypes2['default'].shape({
	    topLeft: _propTypes2['default'].shape({ idx: _propTypes2['default'].number.isRequired, rowIdx: _propTypes2['default'].number.isRequired }).isRequired,
	    bottomRight: _propTypes2['default'].shape({ idx: _propTypes2['default'].number.isRequired, rowIdx: _propTypes2['default'].number.isRequired }).isRequired,
	    startCell: _propTypes2['default'].shape({ idx: _propTypes2['default'].number.isRequired, rowIdx: _propTypes2['default'].number.isRequired }).isRequired,
	    cursorCell: _propTypes2['default'].shape({ idx: _propTypes2['default'].number.isRequired, rowIdx: _propTypes2['default'].number.isRequired }).isRequired
	  }).isRequired,
	  columns: _propTypes2['default'].array.isRequired,
	  rowHeight: _propTypes2['default'].number.isRequired
	};

	exports['default'] = SelectionRangeMask;

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getColumnScrollPosition = undefined;

	var _ColumnUtils = __webpack_require__(14);

	function getColumnScrollPosition(columns, idx, currentScrollLeft, currentClientWidth) {
	  var left = 0;
	  var frozen = 0;

	  for (var i = 0; i < idx; i++) {
	    var column = (0, _ColumnUtils.getColumn)(columns, i);
	    if (column) {
	      if (column.width) {
	        left += column.width;
	      }
	      if ((0, _ColumnUtils.isFrozen)(column)) {
	        frozen += column.width;
	      }
	    }
	  }

	  var selectedColumn = (0, _ColumnUtils.getColumn)(columns, idx);
	  if (selectedColumn) {
	    var scrollLeft = left - frozen - currentScrollLeft;
	    var scrollRight = left + selectedColumn.width - currentScrollLeft;

	    if (scrollLeft < 0) {
	      return scrollLeft;
	    } else if (scrollRight > currentClientWidth) {
	      var scrollAmount = scrollRight - currentClientWidth;
	      return scrollAmount;
	    }
	  }
	}

	exports.getColumnScrollPosition = getColumnScrollPosition;

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getColOverscanEndIdx = exports.getColOverscanStartIdx = exports.getRowOverscanEndIdx = exports.getRowOverscanStartIdx = exports.getScrollDirection = exports.getVisibleBoundaries = exports.getNonFrozenRenderedColumnCount = exports.getNonFrozenVisibleColStartIdx = exports.findLastFrozenColumnIndex = exports.getGridState = exports.SCROLL_DIRECTION = exports.OVERSCAN_ROWS = undefined;

	var _ColumnUtils = __webpack_require__(14);

	var _ColumnUtils2 = _interopRequireDefault(_ColumnUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var OVERSCAN_ROWS = exports.OVERSCAN_ROWS = 2;

	var SCROLL_DIRECTION = exports.SCROLL_DIRECTION = {
	  UP: 'upwards',
	  DOWN: 'downwards',
	  LEFT: 'left',
	  RIGHT: 'right',
	  NONE: 'none'
	};

	var min = Math.min;
	var max = Math.max;
	var ceil = Math.ceil;

	var getGridState = exports.getGridState = function getGridState(props) {
	  var totalNumberColumns = _ColumnUtils2['default'].getSize(props.columnMetrics.columns);
	  var canvasHeight = props.minHeight - props.rowOffsetHeight;
	  var renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
	  var rowOverscanEndIdx = min(props.rowsCount, renderedRowsCount * 2);
	  return {
	    rowOverscanStartIdx: 0,
	    rowOverscanEndIdx: rowOverscanEndIdx,
	    rowVisibleStartIdx: 0,
	    rowVisibleEndIdx: renderedRowsCount,
	    height: canvasHeight,
	    scrollTop: 0,
	    scrollLeft: 0,
	    colVisibleStartIdx: 0,
	    colVisibleEndIdx: totalNumberColumns,
	    colOverscanStartIdx: 0,
	    colOverscanEndIdx: totalNumberColumns,
	    isScrolling: false,
	    lastFrozenColumnIndex: 0
	  };
	};

	// No IE support for Array.findIndex
	var findLastFrozenColumnIndex = exports.findLastFrozenColumnIndex = function findLastFrozenColumnIndex(columns) {
	  var index = -1;
	  columns.forEach(function (c, i) {
	    if (_ColumnUtils2['default'].isFrozen(c)) {
	      index = i;
	    }
	  });
	  return index;
	};

	var getTotalFrozenColumnWidth = function getTotalFrozenColumnWidth(columns) {
	  var lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
	  if (lastFrozenColumnIndex > -1) {
	    var lastFrozenColumn = _ColumnUtils2['default'].getColumn(columns, lastFrozenColumnIndex);
	    return lastFrozenColumn.left + lastFrozenColumn.width;
	  }
	  return 0;
	};

	var getColumnCountForWidth = function getColumnCountForWidth(columns, initialWidth, colVisibleStartIdx) {
	  var initialValue = { width: initialWidth, count: 0 };
	  return columns.slice(colVisibleStartIdx).reduce(function (_ref, column) {
	    var width = _ref.width,
	        count = _ref.count;

	    var remainingWidth = width - column.width;
	    var columnCount = remainingWidth >= 0 ? count + 1 : count;
	    return { width: remainingWidth, count: columnCount };
	  }, initialValue);
	};

	var getNonFrozenVisibleColStartIdx = exports.getNonFrozenVisibleColStartIdx = function getNonFrozenVisibleColStartIdx(columns, scrollLeft) {
	  var remainingScroll = scrollLeft;
	  var lastFrozenColumnIndex = findLastFrozenColumnIndex(columns);
	  var nonFrozenColumns = columns.slice(lastFrozenColumnIndex + 1);
	  var columnIndex = lastFrozenColumnIndex;
	  while (remainingScroll >= 0 && columnIndex < _ColumnUtils2['default'].getSize(nonFrozenColumns)) {
	    columnIndex++;
	    var column = _ColumnUtils2['default'].getColumn(columns, columnIndex);
	    remainingScroll -= column ? column.width : 0;
	  }
	  return Math.max(columnIndex, 0);
	};

	var getNonFrozenRenderedColumnCount = exports.getNonFrozenRenderedColumnCount = function getNonFrozenRenderedColumnCount(columnMetrics, viewportDomWidth, scrollLeft) {
	  var columns = columnMetrics.columns;

	  if (_ColumnUtils2['default'].getSize(columns) === 0) {
	    return 0;
	  }
	  var colVisibleStartIdx = getNonFrozenVisibleColStartIdx(columnMetrics.columns, scrollLeft);
	  var totalFrozenColumnWidth = getTotalFrozenColumnWidth(columnMetrics.columns);
	  var viewportWidth = viewportDomWidth > 0 ? viewportDomWidth : columnMetrics.totalColumnWidth;
	  var firstColumn = _ColumnUtils2['default'].getColumn(columnMetrics.columns, colVisibleStartIdx);
	  // calculate the portion width of first column hidden behind frozen columns
	  var scrolledFrozenWidth = totalFrozenColumnWidth + scrollLeft;
	  var firstColumnHiddenWidth = scrolledFrozenWidth > firstColumn.left ? scrolledFrozenWidth - firstColumn.left : 0;
	  var initialWidth = viewportWidth - totalFrozenColumnWidth + firstColumnHiddenWidth;

	  var _getColumnCountForWid = getColumnCountForWidth(columnMetrics.columns, initialWidth, colVisibleStartIdx),
	      count = _getColumnCountForWid.count;

	  return count;
	};

	var getVisibleBoundaries = exports.getVisibleBoundaries = function getVisibleBoundaries(gridHeight, rowHeight, scrollTop, rowsCount) {
	  var renderedRowsCount = ceil(gridHeight / rowHeight);
	  var rowVisibleStartIdx = max(0, Math.round(scrollTop / rowHeight));
	  var rowVisibleEndIdx = min(rowVisibleStartIdx + renderedRowsCount, rowsCount);
	  return { rowVisibleStartIdx: rowVisibleStartIdx, rowVisibleEndIdx: rowVisibleEndIdx };
	};

	var getScrollDirection = exports.getScrollDirection = function getScrollDirection(lastScroll, scrollTop, scrollLeft) {
	  if (scrollTop !== lastScroll.scrollTop && lastScroll.scrollTop !== undefined) {
	    return scrollTop - lastScroll.scrollTop >= 0 ? SCROLL_DIRECTION.DOWN : SCROLL_DIRECTION.UP;
	  }
	  if (scrollLeft !== lastScroll.scrollLeft && lastScroll.scrollLeft !== undefined) {
	    return scrollLeft - lastScroll.scrollLeft >= 0 ? SCROLL_DIRECTION.RIGHT : SCROLL_DIRECTION.LEFT;
	  }
	  return SCROLL_DIRECTION.NONE;
	};

	var getRowOverscanStartIdx = exports.getRowOverscanStartIdx = function getRowOverscanStartIdx(scrollDirection, rowVisibleStartIdx) {
	  return scrollDirection === SCROLL_DIRECTION.UP ? max(0, rowVisibleStartIdx - OVERSCAN_ROWS) : max(0, rowVisibleStartIdx);
	};

	var getRowOverscanEndIdx = exports.getRowOverscanEndIdx = function getRowOverscanEndIdx(scrollDirection, rowVisibleEndIdx, rowsCount) {
	  var overscanBoundaryIdx = rowVisibleEndIdx + OVERSCAN_ROWS;
	  return scrollDirection === SCROLL_DIRECTION.DOWN ? min(overscanBoundaryIdx, rowsCount) : rowVisibleEndIdx;
	};

	var getColOverscanStartIdx = exports.getColOverscanStartIdx = function getColOverscanStartIdx(scrollDirection, colVisibleStartIdx, lastFrozenColumnIdx) {
	  var leftMostBoundIdx = lastFrozenColumnIdx > -1 ? lastFrozenColumnIdx + 1 : 0;
	  return scrollDirection === SCROLL_DIRECTION.LEFT || scrollDirection === SCROLL_DIRECTION.RIGHT ? leftMostBoundIdx : colVisibleStartIdx;
	};

	var getColOverscanEndIdx = exports.getColOverscanEndIdx = function getColOverscanEndIdx(scrollDirection, colVisibleEndIdx, totalNumberColumns) {
	  if (scrollDirection === SCROLL_DIRECTION.DOWN || scrollDirection === SCROLL_DIRECTION.UP) {
	    return colVisibleEndIdx;
	  }
	  return totalNumberColumns;
	};

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, ".rdg-selected{border:2px solid #66afe9}.rdg-selected .drag-handle{pointer-events:auto;position:absolute;bottom:-5px;right:-4px;background:#66afe9;width:8px;height:8px;border:1px solid #fff;border-right:0;border-bottom:0;z-index:8;cursor:crosshair;cursor:-moz-grab;cursor:-webkit-grab;cursor:grab}.rdg-selected:hover .drag-handle{bottom:-8px;right:-7px;background:#fff;width:16px;height:16px;border:1px solid #66afe9}.rdg-selected:hover .drag-handle .glyphicon-arrow-down{display:\"block\"}.react-grid-cell-dragged-over-down,.react-grid-cell-dragged-over-up{border:1px dashed #000;background:rgba(0,0,255,.2)!important}.react-grid-cell-dragged-over-up{border-bottom-width:0}.react-grid-cell-dragged-over-down{border-top-width:0}.react-grid-cell-copied{background:rgba(0,0,255,.2)!important}.rdg-editor-container input.editor-main,select.editor-main{display:block;width:100%;height:34px;padding:6px 12px;font-size:14px;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}input.editor-main:focus,select.editor-main:focus{border-color:#66afe9;border:2px solid #66afe9;background:#eee;border-radius:4px}.rdg-editor-container input.editor-main::-moz-placeholder,select.editor-main::-moz-placeholder{color:#999;opacity:1}.rdg-editor-container input.editor-main:-ms-input-placeholder,select.editor-main:-ms-input-placeholder{color:#999}.rdg-editor-container input.editor-main::-webkit-input-placeholder,select.editor-main::-webkit-input-placeholder{color:#999}.rdg-editor-container input.editor-main[disabled],.rdg-editor-container input.editor-main[readonly],fieldset[disabled] .rdg-editor-container input.editor-main,fieldset[disabled] select.editor-main,select.editor-main[disabled],select.editor-main[readonly]{cursor:not-allowed;background-color:#eee;opacity:1}textarea.rdg-editor-container input.editor-main,textareaselect.editor-main{height:auto}", ""]);

	// exports


/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, ".react-grid-Container{clear:both;margin-top:0;padding:0}.react-grid-Main{background-color:#fff;color:inherit;padding:0;outline:1px solid #e7eaec;clear:both}.react-grid-Grid{border:1px solid #ddd;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.react-grid-Canvas,.react-grid-Grid{background-color:#fff}", ""]);

	// exports


/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, ".react-grid-Header{box-shadow:0 0 4px 0 #ddd;background:#f9f9f9}.react-grid-Header--resizing{cursor:ew-resize}.react-grid-HeaderCell,.react-grid-HeaderRow{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.react-grid-HeaderCell{background:#f9f9f9;padding:8px;font-weight:700;border-right:1px solid #ddd;border-bottom:1px solid #ddd}.react-grid-HeaderCell__value{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;position:relative;top:50%;transform:translateY(-50%)}.react-grid-HeaderCell__resizeHandle:hover{cursor:ew-resize;background:#ddd}.react-grid-HeaderCell--frozen:last-of-type{box-shadow:2px 0 5px -2px hsla(0,0%,53%,.3)}.react-grid-HeaderCell--resizing .react-grid-HeaderCell__resizeHandle{background:#ddd}.react-grid-HeaderCell__draggable{cursor:col-resize}.rdg-can-drop>.react-grid-HeaderCell{background:#ececec}.react-grid-HeaderCell .Select{max-height:30px;font-size:12px;font-weight:400}.react-grid-HeaderCell .Select-control{max-height:30px;border:1px solid #ccc;color:#555;border-radius:3px}.react-grid-HeaderCell .is-focused:not(.is-open)>.Select-control{border-color:#66afe9;outline:0;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.react-grid-HeaderCell .Select-control .Select-placeholder{line-height:20px;color:#999;padding:4px}.react-grid-HeaderCell .Select-control .Select-input{max-height:28px;padding:4px;margin-left:0}.react-grid-HeaderCell .Select-control .Select-input input{padding:0;height:100%}.react-grid-HeaderCell .Select-control .Select-arrow-zone .Select-arrow{border-color:gray transparent transparent;border-width:4px 4px 2.5px}.react-grid-HeaderCell .Select-control .Select-value{padding:4px;line-height:20px!important}.react-grid-HeaderCell .Select--multi .Select-control .Select-value{padding:0;line-height:16px!important;max-height:20px}.react-grid-HeaderCell .Select--multi .Select-control .Select-value .Select-value-icon,.react-grid-HeaderCell .Select--multi .Select-control .Select-value .Select-value-label{max-height:20px}.react-grid-HeaderCell .Select-control .Select-value .Select-value-label{color:#555!important}.react-grid-HeaderCell .Select-menu-outer{z-index:2}.react-grid-HeaderCell .Select-menu-outer .Select-option{padding:4px;line-height:20px}.react-grid-HeaderCell .Select-menu-outer .Select-menu .Select-option.is-focused,.react-grid-HeaderCell .Select-menu-outer .Select-menu .Select-option.is-selected{color:#555}", ""]);

	// exports


/***/ }),

/***/ 422:
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.deprecate = deprecate;
	exports.addIsDeprecated = addIsDeprecated;

	/**
	 * Wraps a singular React.PropTypes.[type] with
	 * a console.warn call that is only called if the
	 * prop is not undefined/null and is only called
	 * once.
	 * @param  {Object} propType React.PropType type
	 * @param  {String} message  Deprecation message
	 * @return {Function}        ReactPropTypes checkType
	 */
	function deprecate(propType, message) {
	  var warned = false;
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var props = args[0];
	    var propName = args[1];

	    var prop = props[propName];
	    if (prop !== undefined && prop !== null && !warned) {
	      warned = true;
	      console.warn(message);
	    }
	    return propType.call.apply(propType, [this].concat(args));
	  };
	}

	/**
	 * Returns a copy of `PropTypes` with an `isDeprecated`
	 * method available on all top-level propType options.
	 * @param {React.PropTypes}  PropTypes
	 * @return {React.PropTypes} newPropTypes
	 */
	function addIsDeprecated(PropTypes) {
	  var newPropTypes = _extends({}, PropTypes);
	  for (var type in newPropTypes) {
	    if (newPropTypes.hasOwnProperty(type)) {
	      var propType = newPropTypes[type];
	      propType = propType.bind(newPropTypes);
	      propType.isDeprecated = deprecate.bind(newPropTypes, propType);
	      newPropTypes[type] = propType;
	    }
	  }
	  return newPropTypes;
	}


/***/ }),

/***/ 431:
/***/ (function(module, exports) {

	//

	module.exports = function shallowEqual(objA, objB, compare, compareContext) {
	  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

	  if (ret !== void 0) {
	    return !!ret;
	  }

	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

	  // Test for A's keys different from B.
	  for (var idx = 0; idx < keysA.length; idx++) {
	    var key = keysA[idx];

	    if (!bHasOwnProperty(key)) {
	      return false;
	    }

	    var valueA = objA[key];
	    var valueB = objB[key];

	    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

	    if (ret === false || (ret === void 0 && valueA !== valueB)) {
	      return false;
	    }
	  }

	  return true;
	};


/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(356);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./interaction-masks.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./interaction-masks.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ })

/******/ })
});
;