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
const map_set_polyfill_1 = __webpack_require__(1);
const symbol_polyfill_1 = __webpack_require__(2);
const Cell_1 = __webpack_require__(3);
const ObservableList_1 = __webpack_require__(9);
const ObservableMap_1 = __webpack_require__(10);
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
const hasOwn = Object.prototype.hasOwnProperty;
const slice = Array.prototype.slice;
const global_ = Function('return this;')();
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
    let initialValue = value;
    let cx = function (value) {
        let context = this;
        if (!context || context == global_) {
            context = cx;
        }
        if (!hasOwn.call(context, exports.KEY_CELL_MAP)) {
            context[exports.KEY_CELL_MAP] = new map_set_polyfill_1.Map();
        }
        let cell = context[exports.KEY_CELL_MAP].get(cx);
        if (!cell) {
            if (value === 'dispose' && arguments.length >= 2) {
                return;
            }
            cell = new Cell_1.Cell(initialValue, {
                __proto__: options,
                context
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
        let method = value;
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
        let result = Cell_1.Cell.prototype[method].apply(cell, slice.call(arguments, 1));
        return result === cell ? cx : result;
    };
    cx.constructor = cellx;
    if (options.onChange || options.onError) {
        cx.call(options.context || global_);
    }
    return cx;
}
exports.cellx = cellx;
function defineObservableProperty(obj, name, value) {
    let cellName = name + 'Cell';
    Object.defineProperty(obj, cellName, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value instanceof Cell_1.Cell ? value : new Cell_1.Cell(value, { context: obj })
    });
    Object.defineProperty(obj, name, {
        configurable: true,
        enumerable: true,
        get() {
            return this[cellName].get();
        },
        set(value) {
            this[cellName].set(value);
        }
    });
    return obj;
}
exports.defineObservableProperty = defineObservableProperty;
function defineObservableProperties(obj, props) {
    Object.keys(props).forEach(name => {
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
var Symbol =  true
	? __webpack_require__(2).Symbol
	: undefined;

var Map = global.Map;

if (!Map || Map.toString().indexOf('[native code]') == -1 || !new Map([[1, 1]]).size) {
	var hasOwn = Object.prototype.hasOwnProperty;

	var KEY_MAP_ID = Symbol('mapId');
	var mapIdCounter = 0;

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

		has: function(key) {
			return !!this._entries[this._getValueStamp(key)];
		},

		get: function(key) {
			return (this._entries[this._getValueStamp(key)] || entryStub).value;
		},

		set: function(key, value) {
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

		delete: function(key) {
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

		clear: function() {
			var entries = this._entries;

			for (var stamp in entries) {
				delete entries[stamp];
			}

			this._objectStamps = {};

			this._first = null;
			this._last = null;

			this.size = 0;
		},

		forEach: function(callback, context) {
			var entry = this._first;

			while (entry) {
				callback.call(context, entry.value, entry.key, this);

				do {
					entry = entry.next;
				} while (entry && !this._entries[entry.keyStamp]);
			}
		},

		toString: function() {
			return '[object Map]';
		},

		_getValueStamp: function(value) {
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

		_getObjectStamp: function(obj) {
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
		['keys', function(entry) {
			return entry.key;
		}],
		['values', function(entry) {
			return entry.value;
		}],
		['entries', function(entry) {
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

		has: function(value) {
			return this._values.has(value);
		},

		add: function(value) {
			this._values.set(value, value);
			this.size = this._values.size;
			return this;
		},

		delete: function(value) {
			if (this._values.delete(value)) {
				this.size--;
				return true;
			}

			return false;
		},

		clear: function() {
			this._values.clear();
			this.size = 0;
		},

		forEach: function(callback, context) {
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

if (!Symbol) {
	var idCounter = 0;

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

Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = __webpack_require__(4);
const logger_1 = __webpack_require__(5);
const map_set_polyfill_1 = __webpack_require__(1);
const next_tick_1 = __webpack_require__(6);
const symbol_polyfill_1 = __webpack_require__(2);
const EventEmitter_1 = __webpack_require__(7);
const WaitError_1 = __webpack_require__(8);
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 0x1fffffffffffff;
const KEY_WRAPPERS = symbol_polyfill_1.Symbol('cellx[wrappers]');
const releasePlan = new map_set_polyfill_1.Map();
let releasePlanIndex = MAX_SAFE_INTEGER;
let releasePlanToIndex = -1;
let releasePlanned = false;
let currentlyRelease = 0;
const releasedCells = new map_set_polyfill_1.Set();
let releaseVersion = 1;
let afterRelease;
let currentCell = null;
const $error = { error: null };
let pushingIndexCounter = 0;
let errorIndexCounter = 0;
const STATE_INITED = 1;
const STATE_ACTIVE = 1 << 1;
const STATE_HAS_FOLLOWERS = 1 << 2;
const STATE_CURRENTLY_PULLING = 1 << 3;
const STATE_PENDING = 1 << 4;
const STATE_FULFILLED = 1 << 5;
const STATE_REJECTED = 1 << 6;
const STATE_CAN_CANCEL_CHANGE = 1 << 7;
function release(force) {
    if (!releasePlanned && !force) {
        return;
    }
    releasePlanned = false;
    currentlyRelease++;
    let queue = releasePlan.get(releasePlanIndex);
    for (;;) {
        let cell = queue && queue.shift();
        if (!cell) {
            if (releasePlanIndex == releasePlanToIndex) {
                break;
            }
            queue = releasePlan.get(++releasePlanIndex);
            continue;
        }
        let prevReleasePlanIndex;
        let level = cell._level;
        let changeEvent = cell._changeEvent;
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
            if (releasedCells.has(cell)) {
                if (Cell.debug) {
                    logger_1.warn('Multiple cell pull in release', cell);
                }
            }
            else {
                releasedCells.add(cell);
            }
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
            let pushingIndex = cell._pushingIndex;
            let reactions = cell._reactions;
            for (let i = 0, l = reactions.length; i < l; i++) {
                let reaction = reactions[i];
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
        releasedCells.clear();
        releaseVersion++;
        if (afterRelease) {
            let afterRelease_ = afterRelease;
            afterRelease = null;
            for (let i = 0, l = afterRelease_.length; i < l; i++) {
                let callback = afterRelease_[i];
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
class Cell extends EventEmitter_1.EventEmitter {
    constructor(value, options) {
        super();
        this._error = null;
        this._pushingIndex = 0;
        this._errorIndex = 0;
        this._version = 0;
        this._dependencies = undefined;
        this._reactions = [];
        this._level = 0;
        this._levelInRelease = -1;
        this._selfPendingStatusCell = null;
        this._pendingStatusCell = null;
        this._selfErrorCell = null;
        this._errorCell = null;
        this._state = STATE_CAN_CANCEL_CHANGE;
        this._prevChangeEvent = null;
        this._changeEvent = null;
        this._lastErrorEvent = null;
        this.debugKey = options && options.debugKey;
        this.context = options && options.context !== undefined ? options.context : this;
        this._pull = typeof value == 'function' ? value : null;
        this._get = (options && options.get) || null;
        this._validate = (options && options.validate) || null;
        this._merge = (options && options.merge) || null;
        this._put = (options && options.put) || defaultPut;
        this._onFulfilled = this._onRejected = null;
        this._reap = (options && options.reap) || null;
        this.meta = (options && options.meta) || null;
        if (this._pull) {
            this._fixedValue = this._value = undefined;
        }
        else {
            if (this._validate) {
                this._validate(value, undefined);
            }
            if (this._merge) {
                value = this._merge(value, undefined);
            }
            this._fixedValue = this._value = value;
            if (value instanceof EventEmitter_1.EventEmitter) {
                value.on('change', this._onValueChange, this);
            }
        }
        if (options) {
            if (options.onChange) {
                this.on('change', options.onChange);
            }
            if (options.onError) {
                this.on('error', options.onError);
            }
        }
    }
    static get currentlyPulling() {
        return !!currentCell;
    }
    static autorun(callback, context) {
        let disposer;
        new Cell(function () {
            if (!disposer) {
                disposer = () => {
                    this.dispose();
                };
            }
            callback.call(context, disposer);
        }, {
            onChange() { }
        });
        return disposer;
    }
    static forceRelease() {
        if (releasePlanned || currentlyRelease) {
            release(true);
        }
    }
    static afterRelease(callback) {
        (afterRelease || (afterRelease = [])).push(callback);
    }
    on(type, listener, context) {
        if (releasePlanned || (currentlyRelease && this._level > releasePlanIndex)) {
            release(true);
        }
        this._activate();
        if (typeof type == 'object') {
            super.on(type, listener !== undefined ? listener : this.context);
        }
        else {
            super.on(type, listener, context !== undefined ? context : this.context);
        }
        this._state |= STATE_HAS_FOLLOWERS;
        return this;
    }
    off(type, listener, context) {
        if (releasePlanned || (currentlyRelease && this._level > releasePlanIndex)) {
            release(true);
        }
        if (type) {
            if (typeof type == 'object') {
                super.off(type, listener !== undefined ? listener : this.context);
            }
            else {
                super.off(type, listener, context !== undefined ? context : this.context);
            }
        }
        else {
            super.off();
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
    }
    addChangeListener(listener, context) {
        return this.on('change', listener, context !== undefined ? context : this.context);
    }
    removeChangeListener(listener, context) {
        return this.off('change', listener, context !== undefined ? context : this.context);
    }
    addErrorListener(listener, context) {
        return this.on('error', listener, context !== undefined ? context : this.context);
    }
    removeErrorListener(listener, context) {
        return this.off('error', listener, context !== undefined ? context : this.context);
    }
    subscribe(listener, context) {
        let wrappers = listener[KEY_WRAPPERS] || (listener[KEY_WRAPPERS] = new map_set_polyfill_1.Map());
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
    }
    unsubscribe(listener, context) {
        let wrappers = listener[KEY_WRAPPERS];
        let wrapper = wrappers && wrappers.get(this);
        if (!wrapper) {
            return this;
        }
        wrappers.delete(this);
        if (context === undefined) {
            context = this.context;
        }
        return this.off('change', wrapper, context).off('error', wrapper, context);
    }
    _addReaction(reaction) {
        this._activate();
        this._reactions.push(reaction);
        this._state |= STATE_HAS_FOLLOWERS;
    }
    _deleteReaction(reaction) {
        this._reactions.splice(this._reactions.indexOf(reaction), 1);
        if (!this._reactions.length && !this._events.has('change') && !this._events.has('error')) {
            this._state ^= STATE_HAS_FOLLOWERS;
            this._deactivate();
            if (this._reap) {
                this._reap.call(this.context);
            }
        }
    }
    _activate() {
        if (!this._pull || this._state & STATE_ACTIVE) {
            return;
        }
        let deps = this._dependencies;
        if (deps === null) {
            return;
        }
        if (this._version < releaseVersion) {
            let value = this._pull$();
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
            let i = deps.length;
            do {
                deps[--i]._addReaction(this);
            } while (i);
            this._state |= STATE_ACTIVE;
        }
    }
    _deactivate() {
        if (!(this._state & STATE_ACTIVE)) {
            return;
        }
        let deps = this._dependencies;
        let i = deps.length;
        do {
            deps[--i]._deleteReaction(this);
        } while (i);
        if (this._levelInRelease != -1) {
            this._levelInRelease = -1;
            this._changeEvent = null;
        }
        this._state ^= STATE_ACTIVE;
    }
    _onValueChange(evt) {
        this._pushingIndex = ++pushingIndexCounter;
        if (this._state & STATE_HAS_FOLLOWERS) {
            let changeEvent = ((evt.data || (evt.data = {})).prevEvent = this._changeEvent);
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
    }
    get() {
        if (this._pull) {
            if (this._state & STATE_ACTIVE) {
                if (releasePlanned ||
                    (currentlyRelease && !currentCell && this._level > releasePlanIndex)) {
                    release(true);
                }
            }
            else if (this._version <
                releaseVersion + +releasePlanned + +(currentlyRelease != 0)) {
                let prevDeps = this._dependencies;
                if (prevDeps !== null) {
                    let value = this._pull$();
                    let deps = this._dependencies;
                    if (prevDeps || deps || !(this._state & STATE_INITED)) {
                        if (deps && this._state & STATE_HAS_FOLLOWERS) {
                            let i = deps.length;
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
            let currentCellDeps = currentCell._dependencies;
            let level = this._level;
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
    }
    pull() {
        if (!this._pull) {
            return false;
        }
        if (releasePlanned) {
            release();
        }
        let prevDeps;
        let prevLevel;
        let value;
        if (this._state & STATE_HAS_FOLLOWERS) {
            prevDeps = this._dependencies;
            prevLevel = this._level;
            value = this._pull$();
            let deps = this._dependencies;
            let newDepCount = 0;
            if (deps) {
                let i = deps.length;
                do {
                    let dep = deps[--i];
                    if (!prevDeps || prevDeps.indexOf(dep) == -1) {
                        dep._addReaction(this);
                        newDepCount++;
                    }
                } while (i);
            }
            if (prevDeps && (deps ? deps.length - newDepCount : 0) < prevDeps.length) {
                for (let i = prevDeps.length; i;) {
                    let prevDep = prevDeps[--i];
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
    }
    _pull$() {
        if (this._state & STATE_CURRENTLY_PULLING) {
            throw new TypeError('Circular pulling detected');
        }
        let pull = this._pull;
        if (pull.length) {
            if (this._selfPendingStatusCell) {
                this._selfPendingStatusCell.set(true);
            }
            this._state |= STATE_PENDING;
            this._state &= ~(STATE_FULFILLED | STATE_REJECTED);
        }
        let prevCell = currentCell;
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
            let pendingStatusCell = this._pendingStatusCell;
            if (pendingStatusCell && pendingStatusCell._state & STATE_ACTIVE) {
                pendingStatusCell.pull();
            }
            let errorCell = this._errorCell;
            if (errorCell && errorCell._state & STATE_ACTIVE) {
                errorCell.pull();
            }
            this._state ^= STATE_CURRENTLY_PULLING;
        }
    }
    getError() {
        let errorCell = this._errorCell;
        if (!errorCell) {
            let debugKey = this.debugKey;
            this._selfErrorCell = new Cell(this._error, debugKey ? { debugKey: debugKey + '._selfErrorCell' } : undefined);
            errorCell = this._errorCell = new Cell(function () {
                this.get();
                let err = this._selfErrorCell.get();
                let errorIndex;
                if (err) {
                    errorIndex = this._errorIndex;
                    if (errorIndex == errorIndexCounter) {
                        return err;
                    }
                }
                let deps = this._dependencies;
                if (deps) {
                    let i = deps.length;
                    do {
                        let dep = deps[--i];
                        let depError = dep.getError();
                        if (depError) {
                            let depErrorIndex = dep._errorIndex;
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
            }, debugKey ? { debugKey: debugKey + '._errorCell', context: this } : { context: this });
        }
        return errorCell.get();
    }
    isPending() {
        let pendingStatusCell = this._pendingStatusCell;
        if (!pendingStatusCell) {
            let debugKey = this.debugKey;
            this._selfPendingStatusCell = new Cell(!!(this._state & STATE_PENDING), debugKey ? { debugKey: debugKey + '._selfPendingStatusCell' } : undefined);
            pendingStatusCell = this._pendingStatusCell = new Cell(function () {
                if (this._selfPendingStatusCell.get()) {
                    return true;
                }
                try {
                    this.get();
                }
                catch (_a) { }
                let deps = this._dependencies;
                if (deps) {
                    let i = deps.length;
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
    }
    set(value) {
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
    }
    push(value) {
        this._push(value, true, false);
        return this;
    }
    _push(value, public$, pulling) {
        if (public$ || (!currentlyRelease && pulling)) {
            this._pushingIndex = ++pushingIndexCounter;
        }
        this._state |= STATE_INITED;
        if (this._error) {
            this._setError(null, false);
        }
        let prevValue = this._value;
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
            let changeEvent = this._changeEvent || this._prevChangeEvent;
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
                            prevValue,
                            value
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
                        prevValue,
                        value
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
    }
    _fulfill(value) {
        this._resolvePending();
        if (!(this._state & STATE_FULFILLED)) {
            this._state |= STATE_FULFILLED;
            if (this._onFulfilled) {
                this._onFulfilled(value);
            }
        }
    }
    fail(err) {
        this._fail(err, true, false);
        return this;
    }
    _fail(err, public$, pulling) {
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
    }
    _setError(err, reject) {
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
    }
    _handleErrorEvent(evt, err) {
        if (this._lastErrorEvent === evt) {
            return;
        }
        this._lastErrorEvent = evt;
        this.handleEvent(evt);
        if (err) {
            this._reject(err);
        }
        let reactions = this._reactions;
        for (let i = reactions.length; i;) {
            reactions[--i]._handleErrorEvent(evt, err);
        }
    }
    _reject(err) {
        this._resolvePending();
        if (!(err instanceof WaitError_1.WaitError) && !(this._state & STATE_REJECTED)) {
            this._state |= STATE_REJECTED;
            if (this._onRejected) {
                this._onRejected(err);
            }
        }
    }
    wait() {
        throw new WaitError_1.WaitError();
    }
    _addToRelease() {
        let level = this._level;
        if (level <= this._levelInRelease) {
            return;
        }
        let queue;
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
    }
    _resolvePending() {
        if (this._state & STATE_PENDING) {
            if (this._selfPendingStatusCell) {
                this._selfPendingStatusCell.set(false);
            }
            this._state ^= STATE_PENDING;
        }
    }
    then(onFulfilled, onRejected) {
        let listener = () => { };
        this.on('change', listener);
        if (!this._pull || this._state & STATE_FULFILLED) {
            this.off('change', listener);
            return Promise.resolve(this._get ? this._get(this._value) : this._value).then(onFulfilled);
        }
        if (this._state & STATE_REJECTED) {
            this.off('change', listener);
            return Promise.reject(this._error).catch(onRejected);
        }
        let cell = this;
        let promise = new Promise((resolve, reject) => {
            cell._onFulfilled = value => {
                cell._onFulfilled = cell._onRejected = null;
                this.off('change', listener);
                resolve(cell._get ? cell._get(value) : value);
            };
            cell._onRejected = err => {
                cell._onFulfilled = cell._onRejected = null;
                this.off('change', listener);
                reject(err);
            };
        }).then(onFulfilled, onRejected);
        return promise;
    }
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    reap() {
        this.off();
        let reactions = this._reactions;
        for (let i = reactions.length; i;) {
            reactions[--i].reap();
        }
        return this;
    }
    dispose() {
        return this.reap();
    }
}
Cell.debug = false;
exports.Cell = Cell;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.is = Object.is || (function (a, b) { return (a === b ? a !== 0 || 1 / a == 1 / b : a != a && b != b); });


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function noop() { }
var defaultHandler = function (type) {
    var msg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        msg[_i - 1] = arguments[_i];
    }
    (console[type] || noop).apply(console, type == 'error' ? msg.map(function (m) { return (m && typeof m == 'object' && m.stack) || m; }) : msg);
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
exports.logger = (Logger.$instance = new Logger());
exports.log = exports.logger.log.bind(exports.logger);
exports.warn = exports.logger.warn.bind(exports.logger);
exports.error = exports.logger.error.bind(exports.logger);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(5);
exports.nextTick = (() => {
    const global = Function('return this;')();
    if (global.process &&
        global.process.toString() == '[object process]' &&
        global.process.nextTick) {
        return global.process.nextTick;
    }
    if (global.setImmediate && global.setImmediate.toString().indexOf('[native code]') != -1) {
        const setImmediate = global.setImmediate;
        return (cb) => {
            setImmediate(cb);
        };
    }
    if (global.Promise && Promise.toString().indexOf('[native code]') != -1) {
        const prm = Promise.resolve();
        return (cb) => {
            prm.then(() => {
                cb();
            });
        };
    }
    let queue;
    global.addEventListener('message', () => {
        if (queue) {
            let track = queue;
            queue = null;
            for (let i = 0, l = track.length; i < l; i++) {
                try {
                    track[i]();
                }
                catch (err) {
                    logger_1.error(err);
                }
            }
        }
    });
    return (cb) => {
        if (queue) {
            queue.push(cb);
        }
        else {
            queue = [cb];
            postMessage('__tic__', '*');
        }
    };
})();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(5);
const map_set_polyfill_1 = __webpack_require__(1);
const hasOwn = Object.prototype.hasOwnProperty;
let currentlySubscribing = false;
let transactionLevel = 0;
let transactionEvents = [];
class EventEmitter {
    static get currentlySubscribing() {
        return currentlySubscribing;
    }
    static set currentlySubscribing(value) {
        currentlySubscribing = value;
    }
    static transact(callback) {
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
        let events = transactionEvents;
        transactionEvents = [];
        for (let evt of events) {
            evt.target.handleEvent(evt);
        }
    }
    constructor() {
        this._events = new map_set_polyfill_1.Map();
    }
    getEvents(type) {
        let events;
        if (type) {
            events = this._events.get(type);
            if (!events) {
                return [];
            }
            return Array.isArray(events) ? events : [events];
        }
        events = { __proto__: null };
        this._events.forEach((typeEvents, type) => {
            events[type] = Array.isArray(typeEvents) ? typeEvents : [typeEvents];
        });
        return events;
    }
    on(type, listener, context) {
        if (typeof type == 'object') {
            context = listener !== undefined ? listener : this;
            let listeners = type;
            for (type in listeners) {
                if (hasOwn.call(listeners, type)) {
                    this._on(type, listeners[type], context);
                }
            }
        }
        else {
            this._on(type, listener, context !== undefined ? context : this);
        }
        return this;
    }
    off(type, listener, context) {
        if (type) {
            if (typeof type == 'object') {
                context = listener !== undefined ? listener : this;
                let listeners = type;
                for (type in listeners) {
                    if (hasOwn.call(listeners, type)) {
                        this._off(type, listeners[type], context);
                    }
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
    }
    _on(type, listener, context) {
        let index = type.indexOf(':');
        if (index != -1) {
            let propName = type.slice(index + 1);
            currentlySubscribing = true;
            (this[propName + 'Cell'] || (this[propName], this[propName + 'Cell'])).on(type.slice(0, index), listener, context);
            currentlySubscribing = false;
        }
        else {
            let events = this._events.get(type);
            let evt = { listener, context };
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
    }
    _off(type, listener, context) {
        let index = type.indexOf(':');
        if (index != -1) {
            let propName = type.slice(index + 1);
            (this[propName + 'Cell'] || (this[propName], this[propName + 'Cell'])).off(type.slice(0, index), listener, context);
        }
        else {
            let events = this._events.get(type);
            if (!events) {
                return;
            }
            let evt;
            if (!Array.isArray(events)) {
                evt = events;
            }
            else if (events.length == 1) {
                evt = events[0];
            }
            else {
                for (let i = events.length; i;) {
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
    }
    once(type, listener, context) {
        if (context === undefined) {
            context = this;
        }
        function wrapper(evt) {
            this._off(type, wrapper, context);
            return listener.call(this, evt);
        }
        this._on(type, wrapper, context);
        return wrapper;
    }
    emit(evt, data) {
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
            for (let i = transactionEvents.length;;) {
                if (!i) {
                    (evt.data || (evt.data = {})).prevEvent = null;
                    transactionEvents.push(evt);
                    break;
                }
                let event = transactionEvents[--i];
                if (event.target == this && event.type == evt.type) {
                    (evt.data || (evt.data = {})).prevEvent = event;
                    transactionEvents[i] = evt;
                    break;
                }
            }
        }
        else {
            this.handleEvent(evt);
        }
        return evt;
    }
    handleEvent(evt) {
        let events = this._events.get(evt.type);
        if (!events) {
            return;
        }
        if (Array.isArray(events)) {
            let eventCount = events.length;
            if (eventCount == 1) {
                if (this._tryEventListener(events[0], evt) === false) {
                    evt.propagationStopped = true;
                }
            }
            else {
                events = events.slice();
                for (let i = 0; i < eventCount; i++) {
                    if (this._tryEventListener(events[i], evt) === false) {
                        evt.propagationStopped = true;
                    }
                }
            }
        }
        else if (this._tryEventListener(events, evt) === false) {
            evt.propagationStopped = true;
        }
    }
    _tryEventListener(emEvt, evt) {
        try {
            return emEvt.listener.call(emEvt.context, evt);
        }
        catch (err) {
            logger_1.error(err);
        }
    }
}
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

Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = __webpack_require__(4);
const symbol_polyfill_1 = __webpack_require__(2);
const EventEmitter_1 = __webpack_require__(7);
const push = Array.prototype.push;
const splice = Array.prototype.splice;
const defaultComparator = (a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
};
class ObservableList extends EventEmitter_1.EventEmitter {
    constructor(items, options) {
        super();
        this._items = [];
        if (options && (options.sorted || (options.comparator && options.sorted !== false))) {
            this._comparator = options.comparator || defaultComparator;
            this._sorted = true;
        }
        else {
            this._comparator = null;
            this._sorted = false;
        }
        if (items) {
            if (this._sorted) {
                if (items instanceof ObservableList) {
                    items = items._items;
                }
                for (let i = 0, l = items.length; i < l; i++) {
                    this._insertSortedValue(items[i]);
                }
            }
            else {
                push.apply(this._items, items instanceof ObservableList ? items._items : items);
            }
        }
    }
    get length() {
        return this._items.length;
    }
    _validateIndex(index, allowEndIndex) {
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
    }
    contains(value) {
        return this._items.indexOf(value) != -1;
    }
    indexOf(value, fromIndex) {
        return this._items.indexOf(value, this._validateIndex(fromIndex, true));
    }
    lastIndexOf(value, fromIndex) {
        return this._items.lastIndexOf(value, fromIndex === undefined ? -1 : this._validateIndex(fromIndex, true));
    }
    get(index) {
        return this._items[this._validateIndex(index, true)];
    }
    getRange(index, count) {
        index = this._validateIndex(index, true);
        if (count === undefined) {
            return this._items.slice(index);
        }
        if (index + count > this._items.length) {
            throw new RangeError('Sum of "index" and "count" out of valid range');
        }
        return this._items.slice(index, index + count);
    }
    set(index, value) {
        if (this._sorted) {
            throw new TypeError('Cannot set to sorted list');
        }
        index = this._validateIndex(index, true);
        if (!is_1.is(value, this._items[index])) {
            this._items[index] = value;
            this.emit('change');
        }
        return this;
    }
    setRange(index, values) {
        if (this._sorted) {
            throw new TypeError('Cannot set to sorted list');
        }
        index = this._validateIndex(index, true);
        if (values instanceof ObservableList) {
            values = values._items;
        }
        let valueCount = values.length;
        if (!valueCount) {
            return this;
        }
        if (index + valueCount > this._items.length) {
            throw new RangeError('Sum of "index" and "values.length" out of valid range');
        }
        let items = this._items;
        let changed = false;
        for (let i = index + valueCount; i > index;) {
            let value = values[--i - index];
            if (!is_1.is(value, items[i])) {
                items[i] = value;
                changed = true;
            }
        }
        if (changed) {
            this.emit('change');
        }
        return this;
    }
    add(value, unique) {
        if (unique && this._items.indexOf(value) != -1) {
            return this;
        }
        if (this._sorted) {
            this._insertSortedValue(value);
        }
        else {
            this._items.push(value);
        }
        this.emit('change');
        return this;
    }
    addRange(values, unique) {
        if (values instanceof ObservableList) {
            values = values._items;
        }
        if (values.length) {
            if (unique) {
                let items = this._items;
                let sorted = this._sorted;
                let changed = false;
                for (let i = 0, l = values.length; i < l; i++) {
                    let value = values[i];
                    if (items.indexOf(value) == -1) {
                        if (sorted) {
                            this._insertSortedValue(value);
                        }
                        else {
                            items.push(value);
                        }
                        changed = true;
                    }
                }
                if (changed) {
                    this.emit('change');
                }
            }
            else {
                if (this._sorted) {
                    for (let i = 0, l = values.length; i < l; i++) {
                        this._insertSortedValue(values[i]);
                    }
                }
                else {
                    push.apply(this._items, values);
                }
                this.emit('change');
            }
        }
        return this;
    }
    insert(index, value) {
        if (this._sorted) {
            throw new TypeError('Cannot insert to sorted list');
        }
        this._items.splice(this._validateIndex(index, true), 0, value);
        this.emit('change');
        return this;
    }
    insertRange(index, values) {
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
    }
    remove(value, fromIndex) {
        let index = this._items.indexOf(value, this._validateIndex(fromIndex, true));
        if (index == -1) {
            return false;
        }
        this._items.splice(index, 1);
        this.emit('change');
        return true;
    }
    removeAll(value, fromIndex) {
        let index = this._validateIndex(fromIndex, true);
        let items = this._items;
        let changed = false;
        while ((index = items.indexOf(value, index)) != -1) {
            items.splice(index, 1);
            changed = true;
        }
        if (changed) {
            this.emit('change');
        }
        return changed;
    }
    removeEach(values, fromIndex) {
        fromIndex = this._validateIndex(fromIndex, true);
        if (values instanceof ObservableList) {
            values = values._items.slice();
        }
        let items = this._items;
        let changed = false;
        for (let i = 0, l = values.length; i < l; i++) {
            let index = items.indexOf(values[i], fromIndex);
            if (index != -1) {
                items.splice(index, 1);
                changed = true;
            }
        }
        if (changed) {
            this.emit('change');
        }
        return changed;
    }
    removeAt(index) {
        let value = this._items.splice(this._validateIndex(index), 1)[0];
        this.emit('change');
        return value;
    }
    removeRange(index, count) {
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
        let values = this._items.splice(index, count);
        this.emit('change');
        return values;
    }
    clear() {
        if (this._items.length) {
            this._items.length = 0;
            this.emit('change', { subtype: 'clear' });
        }
        return this;
    }
    join(separator) {
        return this._items.join(separator);
    }
    find(callback, context) {
        let items = this._items;
        for (let i = 0, l = items.length; i < l; i++) {
            let item = items[i];
            if (callback.call(context, item, i, this)) {
                return item;
            }
        }
        return;
    }
    findIndex(callback, context) {
        let items = this._items;
        for (let i = 0, l = items.length; i < l; i++) {
            if (callback.call(context, items[i], i, this)) {
                return i;
            }
        }
        return -1;
    }
    clone(deep) {
        return new this.constructor(deep
            ? this._items.map(item => item && item.clone ? item.clone(true) : item)
            : this, {
            comparator: this._comparator || undefined,
            sorted: this._sorted
        });
    }
    toArray() {
        return this._items.slice();
    }
    toString() {
        return this._items.join();
    }
    _insertSortedValue(value) {
        let items = this._items;
        let comparator = this._comparator;
        let low = 0;
        let high = items.length;
        while (low != high) {
            let mid = (low + high) >> 1;
            if (comparator(value, items[mid]) < 0) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        items.splice(low, 0, value);
    }
}
exports.ObservableList = ObservableList;
['forEach', 'map', 'filter', 'every', 'some'].forEach(name => {
    ObservableList.prototype[name] = function (callback, context) {
        return this._items[name](function (item, index) {
            return callback.call(context, item, index, this);
        }, this);
    };
});
['reduce', 'reduceRight'].forEach(name => {
    ObservableList.prototype[name] = function (callback, initialValue) {
        let list = this;
        function wrapper(accumulator, item, index) {
            return callback(accumulator, item, index, list);
        }
        return arguments.length >= 2
            ? this._items[name](wrapper, initialValue)
            : this._items[name](wrapper);
    };
});
[
    ['keys', (index) => index],
    ['values', (index, item) => item],
    ['entries', (index, item) => [index, item]]
].forEach((settings) => {
    let getStepValue = settings[1];
    ObservableList.prototype[settings[0]] = function () {
        let items = this._items;
        let index = 0;
        let done = false;
        return {
            next() {
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

Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = __webpack_require__(4);
const map_set_polyfill_1 = __webpack_require__(1);
const symbol_polyfill_1 = __webpack_require__(2);
const EventEmitter_1 = __webpack_require__(7);
const hasOwn = Object.prototype.hasOwnProperty;
class ObservableMap extends EventEmitter_1.EventEmitter {
    constructor(entries) {
        super();
        this._entries = new map_set_polyfill_1.Map();
        if (entries) {
            let mapEntries = this._entries;
            if (entries instanceof map_set_polyfill_1.Map || entries instanceof ObservableMap) {
                (entries instanceof map_set_polyfill_1.Map ? entries : entries._entries).forEach((value, key) => {
                    mapEntries.set(key, value);
                });
            }
            else if (Array.isArray(entries)) {
                for (let i = 0, l = entries.length; i < l; i++) {
                    mapEntries.set(entries[i][0], entries[i][1]);
                }
            }
            else {
                for (let key in entries) {
                    if (hasOwn.call(entries, key)) {
                        mapEntries.set(key, entries[key]);
                    }
                }
            }
        }
    }
    get size() {
        return this._entries.size;
    }
    has(key) {
        return this._entries.has(key);
    }
    get(key) {
        return this._entries.get(key);
    }
    set(key, value) {
        let entries = this._entries;
        let hasKey = entries.has(key);
        let prev;
        if (hasKey) {
            prev = entries.get(key);
            if (is_1.is(value, prev)) {
                return this;
            }
        }
        entries.set(key, value);
        this.emit('change', {
            subtype: hasKey ? 'update' : 'add',
            key,
            prevValue: prev,
            value
        });
        return this;
    }
    delete(key) {
        let entries = this._entries;
        if (entries.has(key)) {
            let value = entries.get(key);
            entries.delete(key);
            this.emit('change', {
                subtype: 'delete',
                key,
                value
            });
            return true;
        }
        return false;
    }
    clear() {
        if (this._entries.size) {
            this._entries.clear();
            this.emit('change', { subtype: 'clear' });
        }
        return this;
    }
    forEach(callback, context) {
        this._entries.forEach(function (value, key) {
            callback.call(context, value, key, this);
        }, this);
    }
    keys() {
        return this._entries.keys();
    }
    values() {
        return this._entries.values();
    }
    entries() {
        return this._entries.entries();
    }
    clone(deep) {
        let entries;
        if (deep) {
            entries = [];
            this._entries.forEach((value, key) => {
                entries.push([
                    key,
                    value && value.clone ? value.clone(true) : value
                ]);
            });
        }
        return new this.constructor(entries || this);
    }
}
exports.ObservableMap = ObservableMap;
ObservableMap.prototype[symbol_polyfill_1.Symbol.iterator] = ObservableMap.prototype.entries;


/***/ })
/******/ ]);
});