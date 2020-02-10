(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cellx"] = factory();
	else
		root["cellx"] = factory();
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = __webpack_require__(1);
var symbol_polyfill_1 = __webpack_require__(2);
var Cell_1 = __webpack_require__(3);
var ObservableList_1 = __webpack_require__(9);
var ObservableMap_1 = __webpack_require__(10);
var EventEmitter_1 = __webpack_require__(7);
exports.EventEmitter = EventEmitter_1.EventEmitter;
var ObservableMap_2 = __webpack_require__(10);
exports.ObservableMap = ObservableMap_2.ObservableMap;
var ObservableList_2 = __webpack_require__(9);
exports.ObservableList = ObservableList_2.ObservableList;
var Cell_2 = __webpack_require__(3);
exports.Cell = Cell_2.Cell;
var WaitError_1 = __webpack_require__(8);
exports.WaitError = WaitError_1.WaitError;
var hasOwn = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;
var global = Function('return this;')();
function map(entries) {
    return new ObservableMap_1.ObservableMap(entries);
}
exports.map = map;
function list(items, options) {
    return new ObservableList_1.ObservableList(items, options);
}
exports.list = list;
exports.KEY_CELL_MAP = symbol_polyfill_1.Symbol('cellx[cellMap]');
function cellx(value, options) {
    if (!options) {
        options = {};
    }
    var initialValue = value;
    var cx = function (value) {
        var context = this;
        if (!context || context == global) {
            context = cx;
        }
        if (!hasOwn.call(context, exports.KEY_CELL_MAP)) {
            context[exports.KEY_CELL_MAP] = new map_set_polyfill_1.Map();
        }
        var cell = context[exports.KEY_CELL_MAP].get(cx);
        if (!cell) {
            if (value === 'dispose' && arguments.length >= 2) {
                return;
            }
            cell = new Cell_1.Cell(initialValue, {
                __proto__: options,
                context: context
            });
            context[exports.KEY_CELL_MAP].set(cx, cell);
        }
        switch (arguments.length) {
            case 0: {
                return cell.get();
            }
            case 1: {
                cell.set(value);
                return value;
            }
        }
        var method = value;
        switch (method) {
            case 'cell': {
                return cell;
            }
            case 'bind': {
                cx = cx.bind(context);
                cx.constructor = cellx;
                return cx;
            }
        }
        var result = Cell_1.Cell.prototype[method].apply(cell, slice.call(arguments, 1));
        return result === cell ? cx : result;
    };
    cx.constructor = cellx;
    if (options.onChange || options.onError) {
        cx.call(options.context || global);
    }
    return cx;
}
exports.cellx = cellx;
function defineObservableProperty(obj, name, value) {
    var cellName = name + 'Cell';
    Object.defineProperty(obj, cellName, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value instanceof Cell_1.Cell ? value : new Cell_1.Cell(value, { context: obj })
    });
    Object.defineProperty(obj, name, {
        configurable: true,
        enumerable: true,
        get: function () {
            return this[cellName].get();
        },
        set: function (value) {
            this[cellName].set(value);
        }
    });
    return obj;
}
exports.defineObservableProperty = defineObservableProperty;
function defineObservableProperties(obj, props) {
    Object.keys(props).forEach(function (name) {
        defineObservableProperty(obj, name, props[name]);
    });
    return obj;
}
exports.defineObservableProperties = defineObservableProperties;
function define(obj, name, value) {
    if (typeof name == 'string') {
        defineObservableProperty(obj, name, value);
    }
    else {
        defineObservableProperties(obj, name);
    }
    return obj;
}
exports.define = define;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = Function('return this;')();
var Symbol =  true ? __webpack_require__(2).Symbol : undefined;

var hasOwn = Object.prototype.hasOwnProperty;

var KEY_MAP_ID = Symbol('map-id');
var mapIdCounter = 0;

var Map = global.Map;

if (!Map || Map.toString().indexOf('[native code]') == -1 || !new Map([[1, 1]]).size) {
	var entryStub = {
		value: undefined
	};

	Map = function Map(entries) {
		this._entries = Object.create(null);
		this._objectStamps = {};

		this._first = null;
		this._last = null;

		this.size = 0;

		if (entries) {
			for (var i = 0, l = entries.length; i < l; i++) {
				this.set(entries[i][0], entries[i][1]);
			}
		}
	};

	Map.prototype = {
		constructor: Map,

		has: function has(key) {
			return !!this._entries[this._getValueStamp(key)];
		},

		get: function get(key) {
			return (this._entries[this._getValueStamp(key)] || entryStub).value;
		},

		set: function set(key, value) {
			var entries = this._entries;
			var keyStamp = this._getValueStamp(key);

			if (entries[keyStamp]) {
				entries[keyStamp].value = value;
			} else {
				var entry = entries[keyStamp] = {
					key: key,
					keyStamp: keyStamp,
					value: value,
					prev: this._last,
					next: null
				};

				if (this.size++) {
					this._last.next = entry;
				} else {
					this._first = entry;
				}

				this._last = entry;
			}

			return this;
		},

		delete: function delete_(key) {
			var keyStamp = this._getValueStamp(key);
			var entry = this._entries[keyStamp];

			if (!entry) {
				return false;
			}

			if (--this.size) {
				var prev = entry.prev;
				var next = entry.next;

				if (prev) {
					prev.next = next;
				} else {
					this._first = next;
				}

				if (next) {
					next.prev = prev;
				} else {
					this._last = prev;
				}
			} else {
				this._first = null;
				this._last = null;
			}

			delete this._entries[keyStamp];
			delete this._objectStamps[keyStamp];

			return true;
		},

		clear: function clear() {
			var entries = this._entries;

			for (var stamp in entries) {
				delete entries[stamp];
			}

			this._objectStamps = {};

			this._first = null;
			this._last = null;

			this.size = 0;
		},

		forEach: function forEach(callback, context) {
			var entry = this._first;

			while (entry) {
				callback.call(context, entry.value, entry.key, this);

				do {
					entry = entry.next;
				} while (entry && !this._entries[entry.keyStamp]);
			}
		},

		toString: function toString() {
			return '[object Map]';
		},

		_getValueStamp: function _getValueStamp(value) {
			switch (typeof value) {
				case 'undefined': {
					return 'undefined';
				}
				case 'object': {
					if (value === null) {
						return 'null';
					}

					break;
				}
				case 'boolean': {
					return '?' + value;
				}
				case 'number': {
					return '+' + value;
				}
				case 'string': {
					return ',' + value;
				}
			}

			return this._getObjectStamp(value);
		},

		_getObjectStamp: function _getObjectStamp(obj) {
			if (!hasOwn.call(obj, KEY_MAP_ID)) {
				if (!Object.isExtensible(obj)) {
					var stamps = this._objectStamps;
					var stamp;

					for (stamp in stamps) {
						if (hasOwn.call(stamps, stamp) && stamps[stamp] == obj) {
							return stamp;
						}
					}

					stamp = String(++mapIdCounter);
					stamps[stamp] = obj;

					return stamp;
				}

				Object.defineProperty(obj, KEY_MAP_ID, {
					value: String(++mapIdCounter)
				});
			}

			return obj[KEY_MAP_ID];
		}
	};

	[
		['keys', function keys(entry) {
			return entry.key;
		}],
		['values', function values(entry) {
			return entry.value;
		}],
		['entries', function entries(entry) {
			return [entry.key, entry.value];
		}]
	].forEach(function(settings) {
		var getStepValue = settings[1];

		Map.prototype[settings[0]] = function() {
			var entries = this._entries;
			var entry;
			var done = false;
			var map = this;

			return {
				next: function() {
					if (!done) {
						if (entry) {
							do {
								entry = entry.next;
							} while (entry && !entries[entry.keyStamp]);
						} else {
							entry = map._first;
						}

						if (entry) {
							return {
								value: getStepValue(entry),
								done: false
							};
						}

						done = true;
					}

					return {
						value: undefined,
						done: true
					};
				}
			};
		};
	});
}

if (!Map.prototype[Symbol.iterator]) {
	Map.prototype[Symbol.iterator] = Map.prototype.entries;
}

var Set = global.Set;

if (!Set || Set.toString().indexOf('[native code]') == -1 || !new Set([1]).size) {
	Set = function Set(values) {
		this._values = new Map(values ? values.map(function(value) {
			return [value, value];
		}) : []);

		this.size = 0;
	};

	Set.prototype = {
		constructor: Set,

		has: function has(value) {
			return this._values.has(value);
		},

		add: function add(value) {
			this._values.set(value, value);
			this.size = this._values.size;
			return this;
		},

		delete: function _delete(value) {
			if (this._values.delete(value)) {
				this.size--;
				return true;
			}

			return false;
		},

		clear: function clear() {
			this._values.clear();
			this.size = 0;
		},

		forEach: function forEach(callback, context) {
			this._values.forEach(function(value) {
				callback.call(context, value, value, this);
			}, this);
		},

		keys: Map.prototype.keys,
		values: Map.prototype.values,
		entries: Map.prototype.entries
	};
}

if (!Set.prototype[Symbol.iterator]) {
	Set.prototype[Symbol.iterator] = Set.prototype.values;
}

if (true) {
	exports.Map = Map;
	exports.Set = Set;
} else {}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var global = Function('return this;')();
var Symbol = global.Symbol;

var idCounter = 0;

if (!Symbol) {
	Symbol = function Symbol(key) {
		return '__' + key + '_' + Math.floor(Math.random() * 1e9) + '_' + (++idCounter) + '__';
	};

	Symbol.iterator = Symbol('Symbol.iterator');
}

( true ? exports : undefined).Symbol = Symbol;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __webpack_require__(4);
var logger_1 = __webpack_require__(5);
var map_set_polyfill_1 = __webpack_require__(1);
var next_tick_1 = __webpack_require__(6);
var symbol_polyfill_1 = __webpack_require__(2);
var EventEmitter_1 = __webpack_require__(7);
var WaitError_1 = __webpack_require__(8);
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 0x1fffffffffffff;
var KEY_WRAPPERS = symbol_polyfill_1.Symbol('cellx[wrappers]');
var releasePlan = new map_set_polyfill_1.Map();
var releasePlanIndex = MAX_SAFE_INTEGER;
var releasePlanToIndex = -1;
var releasePlanned = false;
var currentlyRelease = 0;
var currentCell = null;
var $error = { error: null };
var pushingIndexCounter = 0;
var errorIndexCounter = 0;
var releaseVersion = 1;
var afterRelease;
var STATE_INITED = 1;
var STATE_ACTIVE = 1 << 1;
var STATE_HAS_FOLLOWERS = 1 << 2;
var STATE_CURRENTLY_PULLING = 1 << 3;
var STATE_PENDING = 1 << 4;
var STATE_FULFILLED = 1 << 5;
var STATE_REJECTED = 1 << 6;
var STATE_CAN_CANCEL_CHANGE = 1 << 7;
function release(force) {
    if (!releasePlanned && !force) {
        return;
    }
    releasePlanned = false;
    currentlyRelease++;
    var queue = releasePlan.get(releasePlanIndex);
    for (;;) {
        var cell = queue && queue.shift();
        if (!cell) {
            if (releasePlanIndex == releasePlanToIndex) {
                break;
            }
            queue = releasePlan.get(++releasePlanIndex);
            continue;
        }
        var prevReleasePlanIndex = void 0;
        var level = cell._level;
        var changeEvent = cell._changeEvent;
        if (changeEvent) {
            prevReleasePlanIndex = releasePlanIndex;
        }
        else {
            if (level > releasePlanIndex || cell._levelInRelease == -1) {
                if (!queue.length) {
                    if (releasePlanIndex == releasePlanToIndex) {
                        break;
                    }
                    queue = releasePlan.get(++releasePlanIndex);
                }
                continue;
            }
            prevReleasePlanIndex = releasePlanIndex;
            cell.pull();
            if (releasePlanIndex < prevReleasePlanIndex) {
                queue.unshift(cell);
                queue = releasePlan.get(releasePlanIndex);
                continue;
            }
            level = cell._level;
            if (level > releasePlanIndex) {
                if (!queue.length) {
                    queue = releasePlan.get(++releasePlanIndex);
                }
                continue;
            }
            changeEvent = cell._changeEvent;
        }
        cell._levelInRelease = -1;
        if (changeEvent) {
            cell._fixedValue = cell._value;
            cell._changeEvent = null;
            var pushingIndex = cell._pushingIndex;
            var reactions = cell._reactions;
            for (var i = 0, l = reactions.length; i < l; i++) {
                var reaction = reactions[i];
                if (reaction._level <= level) {
                    reaction._level = level + 1;
                }
                if (pushingIndex > reaction._pushingIndex) {
                    reaction._pushingIndex = pushingIndex;
                    reaction._prevChangeEvent = reaction._changeEvent;
                    reaction._changeEvent = null;
                    reaction._addToRelease();
                }
            }
            cell.handleEvent(changeEvent);
            if (releasePlanIndex == MAX_SAFE_INTEGER) {
                break;
            }
            if (releasePlanIndex != prevReleasePlanIndex) {
                queue = releasePlan.get(releasePlanIndex);
                continue;
            }
        }
        if (!queue.length) {
            if (releasePlanIndex == releasePlanToIndex) {
                break;
            }
            queue = releasePlan.get(++releasePlanIndex);
        }
    }
    if (!--currentlyRelease) {
        releasePlanIndex = MAX_SAFE_INTEGER;
        releasePlanToIndex = -1;
        releaseVersion++;
        if (afterRelease) {
            var after = afterRelease;
            afterRelease = null;
            for (var i = 0, l = after.length; i < l; i++) {
                var callback = after[i];
                if (typeof callback == 'function') {
                    callback();
                }
                else {
                    callback[0]._push(callback[1], true, false);
                }
            }
        }
    }
}
function defaultPut(cell, value) {
    cell.push(value);
}
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(value, options) {
        var _this = _super.call(this) || this;
        _this._error = null;
        _this._pushingIndex = 0;
        _this._errorIndex = 0;
        _this._version = 0;
        _this._dependencies = undefined;
        _this._reactions = [];
        _this._level = 0;
        _this._levelInRelease = -1;
        _this._selfPendingStatusCell = null;
        _this._pendingStatusCell = null;
        _this._selfErrorCell = null;
        _this._errorCell = null;
        _this._state = STATE_CAN_CANCEL_CHANGE;
        _this._prevChangeEvent = null;
        _this._changeEvent = null;
        _this._lastErrorEvent = null;
        _this.debugKey = options && options.debugKey;
        _this.context = (options && options.context) || _this;
        _this._pull = typeof value == 'function' ? value : null;
        _this._get = (options && options.get) || null;
        _this._validate = (options && options.validate) || null;
        _this._merge = (options && options.merge) || null;
        _this._put = (options && options.put) || defaultPut;
        _this._onFulfilled = _this._onRejected = null;
        _this._reap = (options && options.reap) || null;
        _this.meta = (options && options.meta) || null;
        if (_this._pull) {
            _this._fixedValue = _this._value = undefined;
        }
        else {
            if (_this._validate) {
                _this._validate(value, undefined);
            }
            if (_this._merge) {
                value = _this._merge(value, undefined);
            }
            _this._fixedValue = _this._value = value;
            if (value instanceof EventEmitter_1.EventEmitter) {
                value.on('change', _this._onValueChange, _this);
            }
        }
        if (options) {
            if (options.onChange) {
                _this.on('change', options.onChange);
            }
            if (options.onError) {
                _this.on('error', options.onError);
            }
        }
        return _this;
    }
    Object.defineProperty(Cell, "currentlyPulling", {
        get: function () {
            return !!currentCell;
        },
        enumerable: true,
        configurable: true
    });
    Cell.autorun = function (callback, context) {
        var disposer;
        new Cell(function () {
            var _this = this;
            if (!disposer) {
                disposer = function () {
                    _this.dispose();
                };
            }
            callback.call(context, disposer);
        }, {
            onChange: function () { }
        });
        return disposer;
    };
    Cell.forceRelease = function () {
        if (releasePlanned || currentlyRelease) {
            release(true);
        }
    };
    Cell.afterRelease = function (callback) {
        (afterRelease || (afterRelease = [])).push(callback);
    };
    Cell.prototype.on = function (type, listener, context) {
        if (releasePlanned || currentlyRelease) {
            release(true);
        }
        this._activate();
        if (typeof type == 'object') {
            _super.prototype.on.call(this, type, listener !== undefined ? listener : this.context);
        }
        else {
            _super.prototype.on.call(this, type, listener, context !== undefined ? context : this.context);
        }
        this._state |= STATE_HAS_FOLLOWERS;
        return this;
    };
    Cell.prototype.off = function (type, listener, context) {
        if (releasePlanned || currentlyRelease) {
            release(true);
        }
        if (type) {
            if (typeof type == 'object') {
                _super.prototype.off.call(this, type, listener !== undefined ? listener : this.context);
            }
            else {
                _super.prototype.off.call(this, type, listener, context !== undefined ? context : this.context);
            }
        }
        else {
            _super.prototype.off.call(this);
        }
        if (!this._reactions.length &&
            !this._events.has('change') &&
            !this._events.has('error') &&
            this._state & STATE_HAS_FOLLOWERS) {
            this._state ^= STATE_HAS_FOLLOWERS;
            this._deactivate();
            if (this._reap) {
                this._reap.call(this.context);
            }
        }
        return this;
    };
    Cell.prototype.addChangeListener = function (listener, context) {
        return this.on('change', listener, context !== undefined ? context : this.context);
    };
    Cell.prototype.removeChangeListener = function (listener, context) {
        return this.off('change', listener, context !== undefined ? context : this.context);
    };
    Cell.prototype.addErrorListener = function (listener, context) {
        return this.on('error', listener, context !== undefined ? context : this.context);
    };
    Cell.prototype.removeErrorListener = function (listener, context) {
        return this.off('error', listener, context !== undefined ? context : this.context);
    };
    Cell.prototype.subscribe = function (listener, context) {
        var wrappers = listener[KEY_WRAPPERS] || (listener[KEY_WRAPPERS] = new map_set_polyfill_1.Map());
        if (wrappers.has(this)) {
            return this;
        }
        function wrapper(evt) {
            return listener.call(this, evt.data.error || null, evt);
        }
        wrappers.set(this, wrapper);
        if (context === undefined) {
            context = this.context;
        }
        return this.on('change', wrapper, context).on('error', wrapper, context);
    };
    Cell.prototype.unsubscribe = function (listener, context) {
        var wrappers = listener[KEY_WRAPPERS];
        var wrapper = wrappers && wrappers.get(this);
        if (!wrapper) {
            return this;
        }
        wrappers.delete(this);
        if (context === undefined) {
            context = this.context;
        }
        return this.off('change', wrapper, context).off('error', wrapper, context);
    };
    Cell.prototype._addReaction = function (reaction) {
        this._activate();
        this._reactions.push(reaction);
        this._state |= STATE_HAS_FOLLOWERS;
    };
    Cell.prototype._deleteReaction = function (reaction) {
        this._reactions.splice(this._reactions.indexOf(reaction), 1);
        if (!this._reactions.length && !this._events.has('change') && !this._events.has('error')) {
            this._state ^= STATE_HAS_FOLLOWERS;
            this._deactivate();
            if (this._reap) {
                this._reap.call(this.context);
            }
        }
    };
    Cell.prototype._activate = function () {
        if (!this._pull || this._state & STATE_ACTIVE) {
            return;
        }
        var deps = this._dependencies;
        if (deps === null) {
            return;
        }
        if (this._version < releaseVersion) {
            var value = this._pull$();
            if (deps || this._dependencies || !(this._state & STATE_INITED)) {
                if (value === $error) {
                    this._fail($error.error, false, false);
                }
                else {
                    this._push(value, false, false);
                }
            }
            deps = this._dependencies;
        }
        if (deps) {
            var i = deps.length;
            do {
                deps[--i]._addReaction(this);
            } while (i);
            this._state |= STATE_ACTIVE;
        }
    };
    Cell.prototype._deactivate = function () {
        if (!(this._state & STATE_ACTIVE)) {
            return;
        }
        var deps = this._dependencies;
        var i = deps.length;
        do {
            deps[--i]._deleteReaction(this);
        } while (i);
        if (this._levelInRelease != -1) {
            this._levelInRelease = -1;
            this._changeEvent = null;
        }
        this._state ^= STATE_ACTIVE;
    };
    Cell.prototype._onValueChange = function (evt) {
        this._pushingIndex = ++pushingIndexCounter;
        if (this._state & STATE_HAS_FOLLOWERS) {
            var changeEvent = ((evt.data || (evt.data = {})).prevEvent = this._changeEvent);
            this._changeEvent = evt;
            if (changeEvent) {
                if (this._value === this._fixedValue) {
                    this._state &= ~STATE_CAN_CANCEL_CHANGE;
                }
            }
            else {
                this._state &= ~STATE_CAN_CANCEL_CHANGE;
                this._addToRelease();
            }
        }
        else {
            this._version = ++releaseVersion + +(currentlyRelease != 0);
        }
    };
    Cell.prototype.get = function () {
        if (this._pull) {
            if (this._state & STATE_ACTIVE) {
                if (releasePlanned || (currentlyRelease && !currentCell)) {
                    release(true);
                }
            }
            else if (this._version <
                releaseVersion + +releasePlanned + +(currentlyRelease != 0)) {
                var prevDeps = this._dependencies;
                if (prevDeps !== null) {
                    var value = this._pull$();
                    var deps = this._dependencies;
                    if (prevDeps || deps || !(this._state & STATE_INITED)) {
                        if (deps && this._state & STATE_HAS_FOLLOWERS) {
                            var i = deps.length;
                            do {
                                deps[--i]._addReaction(this);
                            } while (i);
                            this._state |= STATE_ACTIVE;
                        }
                        if (value === $error) {
                            this._fail($error.error, false, false);
                        }
                        else {
                            this._push(value, false, false);
                        }
                    }
                }
            }
        }
        if (currentCell) {
            var currentCellDeps = currentCell._dependencies;
            var level = this._level;
            if (currentCellDeps) {
                if (currentCellDeps.indexOf(this) == -1) {
                    currentCellDeps.push(this);
                    if (currentCell._level <= level) {
                        currentCell._level = level + 1;
                    }
                }
            }
            else {
                currentCell._dependencies = [this];
                currentCell._level = level + 1;
            }
        }
        if (currentCell && this._error && this._error instanceof WaitError_1.WaitError) {
            throw this._error;
        }
        return this._get ? this._get(this._value) : this._value;
    };
    Cell.prototype.pull = function () {
        if (!this._pull) {
            return false;
        }
        if (releasePlanned) {
            release();
        }
        var prevDeps;
        var prevLevel;
        var value;
        if (this._state & STATE_HAS_FOLLOWERS) {
            prevDeps = this._dependencies;
            prevLevel = this._level;
            value = this._pull$();
            var deps = this._dependencies;
            var newDepCount = 0;
            if (deps) {
                var i = deps.length;
                do {
                    var dep = deps[--i];
                    if (!prevDeps || prevDeps.indexOf(dep) == -1) {
                        dep._addReaction(this);
                        newDepCount++;
                    }
                } while (i);
            }
            if (prevDeps && (deps ? deps.length - newDepCount : 0) < prevDeps.length) {
                for (var i = prevDeps.length; i;) {
                    var prevDep = prevDeps[--i];
                    if (!deps || deps.indexOf(prevDep) == -1) {
                        prevDep._deleteReaction(this);
                    }
                }
            }
            if (deps) {
                this._state |= STATE_ACTIVE;
            }
            else {
                this._state &= ~STATE_ACTIVE;
            }
            if (currentlyRelease && this._level > prevLevel) {
                this._addToRelease();
                return false;
            }
        }
        else {
            value = this._pull$();
        }
        if (value === $error) {
            this._fail($error.error, false, true);
            return true;
        }
        return this._push(value, false, true);
    };
    Cell.prototype._pull$ = function () {
        if (this._state & STATE_CURRENTLY_PULLING) {
            throw new TypeError('Circular pulling detected');
        }
        var pull = this._pull;
        if (pull.length) {
            if (this._selfPendingStatusCell) {
                this._selfPendingStatusCell.set(true);
            }
            this._state |= STATE_PENDING;
            this._state &= ~(STATE_FULFILLED | STATE_REJECTED);
        }
        var prevCell = currentCell;
        currentCell = this;
        this._dependencies = null;
        this._level = 0;
        this._state |= STATE_CURRENTLY_PULLING;
        try {
            return pull.length
                ? pull.call(this.context, this, this._value)
                : pull.call(this.context);
        }
        catch (err) {
            $error.error = err;
            return $error;
        }
        finally {
            currentCell = prevCell;
            this._version = releaseVersion + +(currentlyRelease != 0);
            var pendingStatusCell = this._pendingStatusCell;
            if (pendingStatusCell && pendingStatusCell._state & STATE_ACTIVE) {
                pendingStatusCell.pull();
            }
            var errorCell = this._errorCell;
            if (errorCell && errorCell._state & STATE_ACTIVE) {
                errorCell.pull();
            }
            this._state ^= STATE_CURRENTLY_PULLING;
        }
    };
    Cell.prototype.getError = function () {
        var errorCell = this._errorCell;
        if (!errorCell) {
            var debugKey = this.debugKey;
            this._selfErrorCell = new Cell(this._error, debugKey ? { debugKey: debugKey + '._selfErrorCell' } : undefined);
            errorCell = this._errorCell = new Cell(function () {
                this.get();
                var err = this._selfErrorCell.get();
                var errorIndex;
                if (err) {
                    errorIndex = this._errorIndex;
                    if (errorIndex == errorIndexCounter) {
                        return err;
                    }
                }
                var deps = this._dependencies;
                if (deps) {
                    var i = deps.length;
                    do {
                        var dep = deps[--i];
                        var depError = dep.getError();
                        if (depError) {
                            var depErrorIndex = dep._errorIndex;
                            if (depErrorIndex == errorIndexCounter) {
                                return depError;
                            }
                            if (!err || errorIndex < depErrorIndex) {
                                err = depError;
                                errorIndex = depErrorIndex;
                            }
                        }
                    } while (i);
                }
                return err;
            }, debugKey
                ? { debugKey: debugKey + '._errorCell', context: this }
                : { context: this });
        }
        return errorCell.get();
    };
    Cell.prototype.isPending = function () {
        var pendingStatusCell = this._pendingStatusCell;
        if (!pendingStatusCell) {
            var debugKey = this.debugKey;
            this._selfPendingStatusCell = new Cell(!!(this._state & STATE_PENDING), debugKey ? { debugKey: debugKey + '._selfPendingStatusCell' } : undefined);
            pendingStatusCell = this._pendingStatusCell = new Cell(function () {
                if (this._selfPendingStatusCell.get()) {
                    return true;
                }
                try {
                    this.get();
                }
                catch (_a) { }
                var deps = this._dependencies;
                if (deps) {
                    var i = deps.length;
                    do {
                        if (deps[--i].isPending()) {
                            return true;
                        }
                    } while (i);
                }
                return false;
            }, debugKey
                ? { debugKey: debugKey + '._pendingStatusCell', context: this }
                : { context: this });
        }
        return pendingStatusCell.get();
    };
    Cell.prototype.set = function (value) {
        if (this._validate) {
            this._validate(value, this._value);
        }
        if (this._merge) {
            value = this._merge(value, this._value);
        }
        if (this._selfPendingStatusCell) {
            this._selfPendingStatusCell.set(true);
        }
        this._state |= STATE_PENDING;
        this._state &= ~(STATE_FULFILLED | STATE_REJECTED);
        if (this._put.length >= 3) {
            this._put.call(this.context, this, value, this._value);
        }
        else {
            this._put.call(this.context, this, value);
        }
        return this;
    };
    Cell.prototype.push = function (value) {
        this._push(value, true, false);
        return this;
    };
    Cell.prototype._push = function (value, public$, pulling) {
        if (public$ || (!currentlyRelease && pulling)) {
            this._pushingIndex = ++pushingIndexCounter;
        }
        this._state |= STATE_INITED;
        if (this._error) {
            this._setError(null, false);
        }
        var prevValue = this._value;
        if (is_1.is(value, prevValue)) {
            if (public$ || (currentlyRelease && pulling)) {
                this._fulfill(value);
            }
            return false;
        }
        this._value = value;
        if (prevValue instanceof EventEmitter_1.EventEmitter) {
            prevValue.off('change', this._onValueChange, this);
        }
        if (value instanceof EventEmitter_1.EventEmitter) {
            value.on('change', this._onValueChange, this);
        }
        if (this._state & STATE_HAS_FOLLOWERS) {
            var changeEvent = this._changeEvent || this._prevChangeEvent;
            if (changeEvent) {
                if (is_1.is(value, this._fixedValue) && this._state & STATE_CAN_CANCEL_CHANGE) {
                    this._levelInRelease = -1;
                    this._changeEvent = null;
                }
                else {
                    this._changeEvent = {
                        target: this,
                        type: 'change',
                        data: {
                            prevEvent: changeEvent,
                            prevValue: prevValue,
                            value: value
                        }
                    };
                }
                this._prevChangeEvent = null;
            }
            else {
                this._state |= STATE_CAN_CANCEL_CHANGE;
                this._changeEvent = {
                    target: this,
                    type: 'change',
                    data: {
                        prevEvent: null,
                        prevValue: prevValue,
                        value: value
                    }
                };
                this._addToRelease();
            }
        }
        else {
            if (public$ || (!currentlyRelease && pulling)) {
                releaseVersion++;
            }
            this._fixedValue = value;
            this._version = releaseVersion + +(currentlyRelease != 0);
        }
        if (public$ || (currentlyRelease && pulling)) {
            this._fulfill(value);
        }
        return true;
    };
    Cell.prototype._fulfill = function (value) {
        this._resolvePending();
        if (!(this._state & STATE_FULFILLED)) {
            this._state |= STATE_FULFILLED;
            if (this._onFulfilled) {
                this._onFulfilled(value);
            }
        }
    };
    Cell.prototype.fail = function (err) {
        this._fail(err, true, false);
        return this;
    };
    Cell.prototype._fail = function (err, public$, pulling) {
        if (!(err instanceof WaitError_1.WaitError)) {
            if (this.debugKey) {
                logger_1.error('[' + this.debugKey + ']', err);
            }
            else {
                logger_1.error(err);
            }
            if (!(err instanceof Error)) {
                err = new Error(String(err));
            }
        }
        this._setError(err, public$ || (currentlyRelease != 0 && pulling));
    };
    Cell.prototype._setError = function (err, reject) {
        this._error = err;
        if (this._selfErrorCell) {
            this._selfErrorCell.set(err);
        }
        if (err) {
            this._errorIndex = ++errorIndexCounter;
            this._handleErrorEvent({
                target: this,
                type: 'error',
                data: {
                    error: err
                }
            }, reject ? err : null);
        }
    };
    Cell.prototype._handleErrorEvent = function (evt, err) {
        if (this._lastErrorEvent === evt) {
            return;
        }
        this._lastErrorEvent = evt;
        this.handleEvent(evt);
        if (err) {
            this._reject(err);
        }
        var reactions = this._reactions;
        for (var i = reactions.length; i;) {
            reactions[--i]._handleErrorEvent(evt, err);
        }
    };
    Cell.prototype._reject = function (err) {
        this._resolvePending();
        if (!(err instanceof WaitError_1.WaitError) && !(this._state & STATE_REJECTED)) {
            this._state |= STATE_REJECTED;
            if (this._onRejected) {
                this._onRejected(err);
            }
        }
    };
    Cell.prototype.wait = function () {
        throw new WaitError_1.WaitError();
    };
    Cell.prototype._addToRelease = function () {
        var level = this._level;
        if (level <= this._levelInRelease) {
            return;
        }
        var queue;
        (releasePlan.get(level) || (releasePlan.set(level, (queue = [])), queue)).push(this);
        if (releasePlanIndex > level) {
            releasePlanIndex = level;
        }
        if (releasePlanToIndex < level) {
            releasePlanToIndex = level;
        }
        this._levelInRelease = level;
        if (!releasePlanned && !currentlyRelease) {
            releasePlanned = true;
            next_tick_1.nextTick(release);
        }
    };
    Cell.prototype._resolvePending = function () {
        if (this._state & STATE_PENDING) {
            if (this._selfPendingStatusCell) {
                this._selfPendingStatusCell.set(false);
            }
            this._state ^= STATE_PENDING;
        }
    };
    Cell.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        var listener = function () { };
        this.on('change', listener);
        if (!this._pull || this._state & STATE_FULFILLED) {
            this.off('change', listener);
            return Promise.resolve(this._get ? this._get(this._value) : this._value).then(onFulfilled);
        }
        if (this._state & STATE_REJECTED) {
            this.off('change', listener);
            return Promise.reject(this._error).catch(onRejected);
        }
        var cell = this;
        var promise = new Promise(function (resolve, reject) {
            cell._onFulfilled = function (value) {
                cell._onFulfilled = cell._onRejected = null;
                _this.off('change', listener);
                resolve(cell._get ? cell._get(value) : value);
            };
            cell._onRejected = function (err) {
                cell._onFulfilled = cell._onRejected = null;
                _this.off('change', listener);
                reject(err);
            };
        }).then(onFulfilled, onRejected);
        return promise;
    };
    Cell.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
    };
    Cell.prototype.reap = function () {
        this.off();
        var reactions = this._reactions;
        for (var i = reactions.length; i;) {
            reactions[--i].reap();
        }
        return this;
    };
    Cell.prototype.dispose = function () {
        return this.reap();
    };
    return Cell;
}(EventEmitter_1.EventEmitter));
exports.Cell = Cell;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var is = Object.is || (function (a, b) {
    return a === b ? a !== 0 || 1 / a == 1 / b : a != a && b != b;
});
exports.is = is;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var global = Function('return this;')();
function noop() { }
var defaultHandler = function (type) {
    var msg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        msg[_i - 1] = arguments[_i];
    }
    var console = global.console;
    (console && console[type] || noop).call(console || null, (type == 'error' ? msg.map(function (m) { return m === Object(m) && m.stack || m; }) : msg).join(' '));
};
var Logger = /** @class */ (function () {
    function Logger(handler) {
        this.handler = handler || defaultHandler;
    }
    Logger.prototype.log = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.handler.apply(this, ['log'].concat(msg));
    };
    Logger.prototype.warn = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.handler.apply(this, ['warn'].concat(msg));
    };
    Logger.prototype.error = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.handler.apply(this, ['error'].concat(msg));
    };
    return Logger;
}());
exports.Logger = Logger;
exports.logger = new Logger();
exports.log = exports.logger.log.bind(exports.logger);
exports.warn = exports.logger.warn.bind(exports.logger);
exports.error = exports.logger.error.bind(exports.logger);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(5);
var global = Function('return this;')();
var nextTick;
exports.nextTick = nextTick;
if (global.process && global.process.toString() == '[object process]' && global.process.nextTick) {
    exports.nextTick = nextTick = global.process.nextTick;
}
else if (global.setImmediate) {
    exports.nextTick = nextTick = function nextTick(callback) {
        setImmediate(callback);
    };
}
else if (global.Promise && Promise.toString().indexOf('[native code]') != -1) {
    var prm_1 = Promise.resolve();
    exports.nextTick = nextTick = function nextTick(callback) {
        prm_1.then(function () {
            callback();
        });
    };
}
else {
    var queue_1;
    global.addEventListener('message', function () {
        if (queue_1) {
            var track = queue_1;
            queue_1 = null;
            for (var i = 0, l = track.length; i < l; i++) {
                try {
                    track[i]();
                }
                catch (err) {
                    logger_1.error(err);
                }
            }
        }
    });
    exports.nextTick = nextTick = function nextTick(callback) {
        if (queue_1) {
            queue_1.push(callback);
        }
        else {
            queue_1 = [callback];
            postMessage('__tic__', '*');
        }
    };
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(5);
var map_set_polyfill_1 = __webpack_require__(1);
var currentlySubscribing = false;
var transactionLevel = 0;
var transactionEvents = new map_set_polyfill_1.Map();
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._events = new map_set_polyfill_1.Map();
    }
    Object.defineProperty(EventEmitter, "currentlySubscribing", {
        get: function () {
            return currentlySubscribing;
        },
        set: function (value) {
            currentlySubscribing = value;
        },
        enumerable: true,
        configurable: true
    });
    EventEmitter.transact = function (callback) {
        transactionLevel++;
        try {
            callback();
        }
        catch (err) {
            logger_1.error(err);
        }
        if (--transactionLevel) {
            return;
        }
        var events = transactionEvents;
        transactionEvents = new map_set_polyfill_1.Map();
        events.forEach(function (events, target) {
            for (var type in events) {
                target.handleEvent(events[type]);
            }
        });
    };
    EventEmitter.prototype.getEvents = function (type) {
        var events;
        if (type) {
            events = this._events.get(type);
            if (!events) {
                return [];
            }
            return Array.isArray(events) ? events : [events];
        }
        events = Object.create(null);
        this._events.forEach(function (typeEvents, type) {
            events[type] = Array.isArray(typeEvents) ? typeEvents : [typeEvents];
        });
        return events;
    };
    EventEmitter.prototype.on = function (type, listener, context) {
        if (typeof type == 'object') {
            context = listener !== undefined ? listener : this;
            var listeners = type;
            for (type in listeners) {
                this._on(type, listeners[type], context);
            }
        }
        else {
            this._on(type, listener, context !== undefined ? context : this);
        }
        return this;
    };
    EventEmitter.prototype.off = function (type, listener, context) {
        if (type) {
            if (typeof type == 'object') {
                context = listener !== undefined ? listener : this;
                var listeners = type;
                for (type in listeners) {
                    this._off(type, listeners[type], context);
                }
            }
            else {
                this._off(type, listener, context !== undefined ? context : this);
            }
        }
        else {
            this._events.clear();
        }
        return this;
    };
    EventEmitter.prototype._on = function (type, listener, context) {
        var index = type.indexOf(':');
        if (index != -1) {
            var propName = type.slice(index + 1);
            currentlySubscribing = true;
            (this[propName + 'Cell'] || (this[propName], this[propName + 'Cell'])).on(type.slice(0, index), listener, context);
            currentlySubscribing = false;
        }
        else {
            var events = this._events.get(type);
            var evt = { listener: listener, context: context };
            if (!events) {
                this._events.set(type, evt);
            }
            else if (Array.isArray(events)) {
                events.push(evt);
            }
            else {
                this._events.set(type, [events, evt]);
            }
        }
    };
    EventEmitter.prototype._off = function (type, listener, context) {
        var index = type.indexOf(':');
        if (index != -1) {
            var propName = type.slice(index + 1);
            (this[propName + 'Cell'] || (this[propName], this[propName + 'Cell'])).off(type.slice(0, index), listener, context);
        }
        else {
            var events = this._events.get(type);
            if (!events) {
                return;
            }
            var evt = void 0;
            if (!Array.isArray(events)) {
                evt = events;
            }
            else if (events.length == 1) {
                evt = events[0];
            }
            else {
                for (var i = events.length; i;) {
                    evt = events[--i];
                    if (evt.listener == listener && evt.context === context) {
                        events.splice(i, 1);
                        break;
                    }
                }
                return;
            }
            if (evt.listener == listener && evt.context === context) {
                this._events.delete(type);
            }
        }
    };
    EventEmitter.prototype.once = function (type, listener, context) {
        if (context === undefined) {
            context = this;
        }
        function wrapper(evt) {
            this._off(type, wrapper, context);
            return listener.call(this, evt);
        }
        this._on(type, wrapper, context);
        return wrapper;
    };
    EventEmitter.prototype.emit = function (evt, data) {
        if (typeof evt == 'string') {
            evt = {
                target: this,
                type: evt
            };
        }
        else if (!evt.target) {
            evt.target = this;
        }
        else if (evt.target != this) {
            throw new TypeError('Event cannot be emitted on this object');
        }
        if (data) {
            evt.data = data;
        }
        if (transactionLevel) {
            var events = transactionEvents.get(this);
            if (!events) {
                events = Object.create(null);
                transactionEvents.set(this, events);
            }
            (evt.data || (evt.data = {})).prev = events[evt.type] || null;
            events[evt.type] = evt;
        }
        else {
            this.handleEvent(evt);
        }
        return evt;
    };
    EventEmitter.prototype.handleEvent = function (evt) {
        var events = this._events.get(evt.type);
        if (!events) {
            return;
        }
        if (Array.isArray(events)) {
            var eventCount = events.length;
            if (eventCount == 1) {
                if (this._tryEventListener(events[0], evt) === false) {
                    evt.propagationStopped = true;
                }
            }
            else {
                events = events.slice();
                for (var i = 0; i < eventCount; i++) {
                    if (this._tryEventListener(events[i], evt) === false) {
                        evt.propagationStopped = true;
                    }
                }
            }
        }
        else if (this._tryEventListener(events, evt) === false) {
            evt.propagationStopped = true;
        }
    };
    EventEmitter.prototype._tryEventListener = function (emEvt, evt) {
        try {
            return emEvt.listener.call(emEvt.context, evt);
        }
        catch (err) {
            logger_1.error(err);
        }
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function WaitError() { }
exports.WaitError = WaitError;
WaitError.prototype = {
    __proto__: Error.prototype,
    constructor: WaitError
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __webpack_require__(4);
var symbol_polyfill_1 = __webpack_require__(2);
var EventEmitter_1 = __webpack_require__(7);
var splice = Array.prototype.splice;
function defaultComparator(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
var ObservableList = /** @class */ (function (_super) {
    __extends(ObservableList, _super);
    function ObservableList(items, options) {
        var _this = _super.call(this) || this;
        _this._items = [];
        if (options && (options.sorted || (options.comparator && options.sorted !== false))) {
            _this._comparator = options.comparator || defaultComparator;
            _this._sorted = true;
        }
        else {
            _this._comparator = null;
            _this._sorted = false;
        }
        if (items) {
            if (_this._sorted) {
                if (items instanceof ObservableList) {
                    items = items._items.slice();
                }
                for (var i = 0, l = items.length; i < l; i++) {
                    _this._insertSortedValue(items[i]);
                }
            }
            else {
                // [,].slice() // => [empty]
                // [].push.apply(a = [], [,]), a // => [undefined]
                _this._items.push.apply(_this._items, items instanceof ObservableList ? items._items : items);
            }
        }
        return _this;
    }
    Object.defineProperty(ObservableList.prototype, "length", {
        get: function () {
            return this._items.length;
        },
        enumerable: true,
        configurable: true
    });
    ObservableList.prototype._validateIndex = function (index, allowEndIndex) {
        if (index === undefined) {
            return index;
        }
        if (index < 0) {
            index += this._items.length;
            if (index < 0) {
                throw new RangeError('Index out of valid range');
            }
        }
        else if (index > this._items.length - (allowEndIndex ? 0 : 1)) {
            throw new RangeError('Index out of valid range');
        }
        return index;
    };
    ObservableList.prototype.contains = function (value) {
        return this._items.indexOf(value) != -1;
    };
    ObservableList.prototype.indexOf = function (value, fromIndex) {
        return this._items.indexOf(value, this._validateIndex(fromIndex, true));
    };
    ObservableList.prototype.lastIndexOf = function (value, fromIndex) {
        return this._items.lastIndexOf(value, fromIndex === undefined ? -1 : this._validateIndex(fromIndex, true));
    };
    ObservableList.prototype.get = function (index) {
        return this._items[this._validateIndex(index, true)];
    };
    ObservableList.prototype.getRange = function (index, count) {
        index = this._validateIndex(index, true);
        if (count === undefined) {
            return this._items.slice(index);
        }
        if (index + count > this._items.length) {
            throw new RangeError('Sum of "index" and "count" out of valid range');
        }
        return this._items.slice(index, index + count);
    };
    ObservableList.prototype.set = function (index, value) {
        if (this._sorted) {
            throw new TypeError('Cannot set to sorted list');
        }
        index = this._validateIndex(index, true);
        if (!is_1.is(value, this._items[index])) {
            this._items[index] = value;
            this.emit('change');
        }
        return this;
    };
    ObservableList.prototype.setRange = function (index, values) {
        if (this._sorted) {
            throw new TypeError('Cannot set to sorted list');
        }
        index = this._validateIndex(index, true);
        if (values instanceof ObservableList) {
            values = values._items.slice();
        }
        var valueCount = values.length;
        if (!valueCount) {
            return this;
        }
        if (index + valueCount > this._items.length) {
            throw new RangeError('Sum of "index" and "values.length" out of valid range');
        }
        var items = this._items;
        var changed = false;
        for (var i = index + valueCount; i > index;) {
            var value = values[--i - index];
            if (!is_1.is(value, items[i])) {
                items[i] = value;
                changed = true;
            }
        }
        if (changed) {
            this.emit('change');
        }
        return this;
    };
    ObservableList.prototype.add = function (value) {
        if (this._sorted) {
            this._insertSortedValue(value);
        }
        else {
            this._items.push(value);
        }
        this.emit('change');
        return this;
    };
    ObservableList.prototype.addRange = function (values) {
        if (values instanceof ObservableList) {
            values = values._items.slice();
        }
        if (values.length) {
            if (this._sorted) {
                for (var i = 0, l = values.length; i < l; i++) {
                    this._insertSortedValue(values[i]);
                }
            }
            else {
                this._items.push.apply(this._items, values);
            }
            this.emit('change');
        }
        return this;
    };
    ObservableList.prototype.insert = function (index, value) {
        if (this._sorted) {
            throw new TypeError('Cannot insert to sorted list');
        }
        this._items.splice(this._validateIndex(index, true), 0, value);
        this.emit('change');
        return this;
    };
    ObservableList.prototype.insertRange = function (index, values) {
        if (this._sorted) {
            throw new TypeError('Cannot insert to sorted list');
        }
        index = this._validateIndex(index, true);
        if (values instanceof ObservableList) {
            values = values._items;
        }
        if (values.length) {
            splice.apply(this._items, [index, 0].concat(values));
            this.emit('change');
        }
        return this;
    };
    ObservableList.prototype.remove = function (value, fromIndex) {
        var index = this._items.indexOf(value, this._validateIndex(fromIndex, true));
        if (index == -1) {
            return false;
        }
        this._items.splice(index, 1);
        this.emit('change');
        return true;
    };
    ObservableList.prototype.removeAll = function (value, fromIndex) {
        var index = this._validateIndex(fromIndex, true);
        var items = this._items;
        var changed = false;
        while ((index = items.indexOf(value, index)) != -1) {
            items.splice(index, 1);
            changed = true;
        }
        if (changed) {
            this.emit('change');
        }
        return changed;
    };
    ObservableList.prototype.removeEach = function (values, fromIndex) {
        fromIndex = this._validateIndex(fromIndex, true);
        if (values instanceof ObservableList) {
            values = values._items.slice();
        }
        var items = this._items;
        var changed = false;
        for (var i = 0, l = values.length; i < l; i++) {
            var index = items.indexOf(values[i], fromIndex);
            if (index != -1) {
                items.splice(index, 1);
                changed = true;
            }
        }
        if (changed) {
            this.emit('change');
        }
        return changed;
    };
    ObservableList.prototype.removeAllEach = function (values, fromIndex) {
        fromIndex = this._validateIndex(fromIndex, true);
        if (values instanceof ObservableList) {
            values = values._items.slice();
        }
        var items = this._items;
        var changed = false;
        for (var i = 0, l = values.length; i < l; i++) {
            var value = values[i];
            for (var index = fromIndex; (index = items.indexOf(value, index)) != -1;) {
                items.splice(index, 1);
                changed = true;
            }
        }
        if (changed) {
            this.emit('change');
        }
        return changed;
    };
    ObservableList.prototype.removeAt = function (index) {
        var value = this._items.splice(this._validateIndex(index), 1)[0];
        this.emit('change');
        return value;
    };
    ObservableList.prototype.removeRange = function (index, count) {
        index = this._validateIndex(index, true);
        if (count === undefined) {
            count = this._items.length - index;
            if (!count) {
                return [];
            }
        }
        else {
            if (!count) {
                return [];
            }
            if (index + count > this._items.length) {
                throw new RangeError('Sum of "index" and "count" out of valid range');
            }
        }
        var values = this._items.splice(index, count);
        this.emit('change');
        return values;
    };
    ObservableList.prototype.clear = function () {
        if (this._items.length) {
            this._items.length = 0;
            this.emit('change', { subtype: 'clear' });
        }
        return this;
    };
    ObservableList.prototype.join = function (separator) {
        return this._items.join(separator);
    };
    ObservableList.prototype.find = function (callback, context) {
        var items = this._items;
        for (var i = 0, l = items.length; i < l; i++) {
            var item = items[i];
            if (callback.call(context, item, i, this)) {
                return item;
            }
        }
        return;
    };
    ObservableList.prototype.findIndex = function (callback, context) {
        var items = this._items;
        for (var i = 0, l = items.length; i < l; i++) {
            if (callback.call(context, items[i], i, this)) {
                return i;
            }
        }
        return -1;
    };
    ObservableList.prototype.clone = function (deep) {
        return new this.constructor(deep
            ? this._items.map(function (item) { return (item && item.clone ? item.clone(true) : item); })
            : this, {
            comparator: this._comparator || undefined,
            sorted: this._sorted
        });
    };
    ObservableList.prototype.toArray = function () {
        return this._items.slice();
    };
    ObservableList.prototype.toString = function () {
        return this._items.join();
    };
    ObservableList.prototype._insertSortedValue = function (value) {
        var items = this._items;
        var comparator = this._comparator;
        var low = 0;
        var high = items.length;
        while (low != high) {
            var mid = (low + high) >> 1;
            if (comparator(value, items[mid]) < 0) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        items.splice(low, 0, value);
    };
    return ObservableList;
}(EventEmitter_1.EventEmitter));
exports.ObservableList = ObservableList;
['forEach', 'map', 'filter', 'every', 'some'].forEach(function (name) {
    ObservableList.prototype[name] = function (callback, context) {
        return this._items[name](function (item, index) {
            return callback.call(context, item, index, this);
        }, this);
    };
});
['reduce', 'reduceRight'].forEach(function (name) {
    ObservableList.prototype[name] = function (callback, initialValue) {
        var list = this;
        function wrapper(accumulator, item, index) {
            return callback(accumulator, item, index, list);
        }
        return arguments.length >= 2
            ? this._items[name](wrapper, initialValue)
            : this._items[name](wrapper);
    };
});
[
    ['keys', function (index) { return index; }],
    ['values', function (index, item) { return item; }],
    ['entries', function (index, item) { return [index, item]; }]
].forEach(function (settings) {
    var getStepValue = settings[1];
    ObservableList.prototype[settings[0]] = function () {
        var items = this._items;
        var index = 0;
        var done = false;
        return {
            next: function () {
                if (!done) {
                    if (index < items.length) {
                        return {
                            value: getStepValue(index, items[index++]),
                            done: false
                        };
                    }
                    done = true;
                }
                return {
                    value: undefined,
                    done: true
                };
            }
        };
    };
});
ObservableList.prototype[symbol_polyfill_1.Symbol.iterator] = ObservableList.prototype.values;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = __webpack_require__(4);
var map_set_polyfill_1 = __webpack_require__(1);
var symbol_polyfill_1 = __webpack_require__(2);
var EventEmitter_1 = __webpack_require__(7);
var ObservableMap = /** @class */ (function (_super) {
    __extends(ObservableMap, _super);
    function ObservableMap(entries) {
        var _this = _super.call(this) || this;
        _this._entries = new map_set_polyfill_1.Map();
        if (entries) {
            var mapEntries_1 = _this._entries;
            if (entries instanceof map_set_polyfill_1.Map || entries instanceof ObservableMap) {
                (entries instanceof map_set_polyfill_1.Map ? entries : entries._entries).forEach(function (value, key) {
                    mapEntries_1.set(key, value);
                });
            }
            else if (Array.isArray(entries)) {
                for (var i = 0, l = entries.length; i < l; i++) {
                    mapEntries_1.set(entries[i][0], entries[i][1]);
                }
            }
            else {
                for (var key in entries) {
                    mapEntries_1.set(key, entries[key]);
                }
            }
        }
        return _this;
    }
    Object.defineProperty(ObservableMap.prototype, "size", {
        get: function () {
            return this._entries.size;
        },
        enumerable: true,
        configurable: true
    });
    ObservableMap.prototype.has = function (key) {
        return this._entries.has(key);
    };
    ObservableMap.prototype.get = function (key) {
        return this._entries.get(key);
    };
    ObservableMap.prototype.set = function (key, value) {
        var entries = this._entries;
        var hasKey = entries.has(key);
        var prev;
        if (hasKey) {
            prev = entries.get(key);
            if (is_1.is(value, prev)) {
                return this;
            }
        }
        entries.set(key, value);
        this.emit('change', {
            subtype: hasKey ? 'update' : 'add',
            key: key,
            prevValue: prev,
            value: value
        });
        return this;
    };
    ObservableMap.prototype.delete = function (key) {
        var entries = this._entries;
        if (entries.has(key)) {
            var value = entries.get(key);
            entries.delete(key);
            this.emit('change', {
                subtype: 'delete',
                key: key,
                value: value
            });
            return true;
        }
        return false;
    };
    ObservableMap.prototype.clear = function () {
        if (this._entries.size) {
            this._entries.clear();
            this.emit('change', { subtype: 'clear' });
        }
        return this;
    };
    ObservableMap.prototype.forEach = function (callback, context) {
        this._entries.forEach(function (value, key) {
            callback.call(context, value, key, this);
        }, this);
    };
    ObservableMap.prototype.keys = function () {
        return this._entries.keys();
    };
    ObservableMap.prototype.values = function () {
        return this._entries.values();
    };
    ObservableMap.prototype.entries = function () {
        return this._entries.entries();
    };
    ObservableMap.prototype.clone = function (deep) {
        var entries;
        if (deep) {
            entries = [];
            this._entries.forEach(function (value, key) {
                entries.push([
                    key,
                    value && value.clone ? value.clone(true) : value
                ]);
            });
        }
        return new this.constructor(entries || this);
    };
    return ObservableMap;
}(EventEmitter_1.EventEmitter));
exports.ObservableMap = ObservableMap;
ObservableMap.prototype[symbol_polyfill_1.Symbol.iterator] = ObservableMap.prototype.entries;


/***/ })
/******/ ]);
});