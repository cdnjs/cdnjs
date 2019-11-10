/**
 * saw.js v0.0.15
 */
var saw =
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

	var Saw = __webpack_require__(1);
	
	module.exports = function (string) {
		return new Saw(string);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Matches = __webpack_require__(2);
	
	/**
	 * Escapes a string to be used within a RegExp
	 * 
	 * @param  {String} string
	 * @return {String}
	 */
	function escapeRegExp (string) {
	  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}
	
	function toArray (object) {
		return Array.prototype.slice.call(object);
	}
	
	function Saw (object) {
		if (Array.isArray(object)) {
			this._context = object.slice(0);
		} else if (object instanceof Matches) {
			this._context = object.clone();
		} else {
			this._context = object;
		}
	}
	
	function argumentsToArray (args) {
		var result;
		
		if (args.length > 1) {
			result = toArray(args);
		} else if (Array.isArray(args[0])) {
			result = args[0];
		} else {
			result = [args[0]];
		}
	
		return result;
	}
	
	Saw.prototype = {
		match: function (match) {
			var matchArray = argumentsToArray(arguments),
				saw = new Saw(this._context),
				context = this._contextToString(this._context);
	
			matchArray.some(function (match) {
				var matches = context.match(match);
	
				if (!matches) {
					saw._context = '';
				} else {
					saw._context = new Matches(matches, match);
					return true;
				}
			});		
	
			return saw;
		},
	
		item: function (index) {
			var saw = new Saw(this._context);
	
			if (saw._context instanceof Matches) {
				saw._context = saw._context.item(index);
			} else if (Array.isArray(saw._context)) {
				saw._context = saw._context[index] || '';
			}
	
			return saw;
		},
	
		itemFromRight: function (index) {
			var saw = new Saw(this._context);
	
			if (saw._context instanceof Matches || Array.isArray(saw._context)) {
				var length = saw._context.length;
	
				index = length - 1 - index;
				if (index >= 0) {
					saw = saw.item(index);
				}
			}
	
			return saw;
		},
	
		first: function (index) {
			var saw = new Saw(this._context);
	
			return saw.item(0);
		},
	
		last: function () {
			var saw = new Saw(this._context);
		
			return saw.itemFromRight(0);
		},
	
		replace: function (match, replacement) {
			var saw = new Saw(this._context);
	
			if (Array.isArray(saw._context)) {
				saw._context = saw._context.map(function (string) {
					return string.replace(match, replacement);
				});
			} else {
				saw._context = this._contextToString(this._context).replace(match, replacement);
			}
	
			return saw;
		},
	
		join: function (separator) {
			var saw = new Saw(this._context);
	
			if (Array.isArray(saw._context)) {
				saw._context = saw._context.join(separator || '');
			}
	
			return saw;
		},
	
		each: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			array.forEach(function (item, index) {
				if (item) {
					func.bind(thisArg)(item, index, array);
				}
			});
	
			return saw;
		},
	
		map: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = array.map(function (item, index) {
				return func.bind(thisArg)(item, index, array);
			});
	
			return saw;
		},
	
		reduce: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = String(array.reduce(function (previousValue, currentValue, index, array) {
				return func.bind(thisArg)(previousValue, currentValue, index, array);
			}));
	
			return saw;
		},
	
		reverse: function () {
			var saw = new Saw(this._context);
			
			if (typeof saw._context === 'string') {
				saw._context = saw._context.split('').reverse().join('');
			} else if (Array.isArray(saw._context)) {
				saw._context = saw._context.reverse();
			} else if (saw._context instanceof Matches) {
				var array = saw.toArray();
				if (array.length === 1) {
					saw._context = (array[0] || '').split('').reverse().join('');
				} else {
					saw._context = saw.toArray().reverse();	
				}
			}
	
			return saw;
		},
	
		lowerCase: function (func) {
			return this.mapStringMethodAgainstContext('toLowerCase', func);
		},
	
		upperCase: function (func) {
			return this.mapStringMethodAgainstContext('toUpperCase', func);
		},
	
		mapStringMethodAgainstContext: function (methodName, func) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = array.map(function (item, index) {
				return item ? String(item)[methodName]() : item;
			});
	
			return saw;
		},
	
		filter: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = array.filter(function (item, index) {
				return func.bind(thisArg)(item, index, array);
			});
	
			return saw;
		},
	
		remove: function () {
			var saw = new Saw(this._context);
	
			var context = saw.toArray(),
				matches = toArray(arguments);
			
			context = context.map(function (context) {
				matches.forEach(function (match) {
					match = typeof match === 'string' ? new RegExp(escapeRegExp(match), 'g') : match;
					context = context.replace(match, '');
				});
	
				return context;
			});
			
			saw._context = context;
			
			return saw;
		},
	
		trim: function () {
			var saw = new Saw(this._context);
	
			var context = Array.isArray(saw._context) ? saw._context : saw.toArray(saw._context);
	
			saw._context = context.map(function (item) {
				return item ? item.trim() : item;
			});
	
			return saw;
		},
	
		split: function (separator) {
			var saw = new Saw(this._context);
	
			saw._context = saw._contextToString(saw._context).split(separator);
	
			return saw;
		},
	
		slice: function (begin, end) {
			var saw = new Saw(this._context);
	
			if (saw._context instanceof Matches || Array.isArray(saw._context)) {
				saw._context = saw._context.slice(begin, end);
			}
	
			return saw;
		},
	
		toString: function () {
			return this._contextToString(this._context);
		},
	
		toArray: function () {
			if (Array.isArray(this._context)) {
				return toArray(this._context);
			} else if (this._context instanceof Matches) {
				return this._context.toArray();
			} else {
				return this.toBoolean() ? [this._context] : [];
			}
		},
	
		toNumber: function () {
			var result = this.toFloat();
			
			return isNaN(result) ? 0 : result;
		},
	
		toFloat: function () {
			var string = this.toString(),
				result = parseFloat(string, 10);
	
			if (isNaN(result) || string.length != String(result).length) {
				return NaN;
			} else {
				return result;
			}
		},
	
		toInt: function () {
			var string = this.toString(),
				result = parseInt(string, 10);
	
			if (isNaN(result) || string.length != String(result).length) {
				return NaN;
			} else {
				return result;
			}
		},
	
		toBoolean: function () {
			return !!this.toString();
		},
	
		toObject: function () {
			var props = argumentsToArray(arguments),
				array = this.toArray(),
				object = {};
	
			props.forEach(function (value, index) {
				if (typeof value !== 'undefined' && typeof array[index] != 'undefined') {
					object[value] = array[index] ;
				}
			});
	
			return object;
		},
	
		_contextToString: function (context) {
			if (typeof context === 'string') {
				return context;
			} else if (context instanceof Matches) {
				return context.toString();
			} else if (Array.isArray(context)) {
				return context.join('');
			}
	
			return '';
		}
	};
	
	module.exports = Saw;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	function Matches (matches, match) {
		if (!matches) return null;
	
		this.match = match;
	
		if (match instanceof RegExp && !match.global && match.length > 1) {
			this.matches = matches.slice(1);
		} else {
			this.matches = matches;
		}
	
		this.length = this.matches.length;
	}
	Matches.prototype = {
		item: function (index) {
			var string;
	
			if (this.matches.length === 1) {
				string = this.matches[0];
			} else if (this.matches.length > 1) {
				string = this.matches[this.match.global ? index : index + 1];
			}
	
			return string || '';
		},
	
		slice: function (begin, end) {
			var results = [];
	
			if (this.matches.length === 1 || this.match.global) {
				results = this.matches.slice(begin, end);
			} else if (this.matches.length > 1) {
				results = this.matches.slice(begin + 1, end);
			}
	
			return results;
		},
	
		toArray: function (begin, end) {
			var results = [];
	
			if (this.matches.length === 1 || this.match.global) {
				results = this.matches.slice(0);
			} else if (this.matches.length > 1) {
				results = this.matches.slice(1);
			}
	
			return results;
		},
	
		toString: function () {
			var string = '';
	
			if (this.matches.length === 1) {
				string = this.matches[0];
			} else {
				this.matches.forEach(function (item) {
					if (item) {
						string += item;
					}
				});
			}
	
			return string;
		},
	
		clone: function () {
			var matches = new Matches(null)
			matches.match = this.match;
			matches.matches = Array.prototype.slice.call(this.matches);
			matches.length = this.length;
			return matches;
		}
	};
	
	module.exports = Matches;

/***/ }
/******/ ])
//# sourceMappingURL=saw.js.map