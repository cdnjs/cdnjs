(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cellx"] = factory();
	else
		root["cellx"] = factory();
})(this, function() {
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

	var ErrorLogger = __webpack_require__(1);
	var EventEmitter = __webpack_require__(2);
	var ObservableMap = __webpack_require__(7);
	var ObservableList = __webpack_require__(12);
	var Cell = __webpack_require__(13);
	var keys = __webpack_require__(10);
	var is = __webpack_require__(11);
	var Symbol = __webpack_require__(3);
	var Map = __webpack_require__(9);
	var logError = __webpack_require__(15);
	var nextUID = __webpack_require__(4);
	var mixin = __webpack_require__(6);
	var createClass = __webpack_require__(5);
	var nextTick = __webpack_require__(14);

	var KEY_UID = keys.UID;
	var KEY_CELLS = keys.CELLS;

	var createObject = Object.create;
	var hasOwn = Object.prototype.hasOwnProperty;
	var slice = Array.prototype.slice;
	var global = Function('return this;')();

	ErrorLogger.setHandler(logError);

	/**
	 * @typesign (value?, opts?: {
	 *     debugKey?: string,
	 *     owner?: Object,
	 *     validate?: (value, oldValue),
	 *     onChange?: (evt: cellx~Event) -> ?boolean,
	 *     onError?: (evt: cellx~Event) -> ?boolean
	 * }) -> cellx;
	 *
	 * @typesign (pull: (push: (value), fail: (err), oldValue) -> *, opts?: {
	 *     debugKey?: string
	 *     owner?: Object,
	 *     validate?: (value, oldValue),
	 *     put?: (value, push: (value), fail: (err), oldValue),
	 *     reap?: (),
	 *     onChange?: (evt: cellx~Event) -> ?boolean,
	 *     onError?: (evt: cellx~Event) -> ?boolean
	 * }) -> cellx;
	 */
	function cellx(value, opts) {
		if (!opts) {
			opts = {};
		}

		var initialValue = value;

		function cx(value) {
			var owner = this;

			if (!owner || owner == global) {
				owner = cx;
			}

			if (!hasOwn.call(owner, KEY_CELLS)) {
				Object.defineProperty(owner, KEY_CELLS, {
					value: new Map()
				});
			}

			var cell = owner[KEY_CELLS].get(cx);

			if (!cell) {
				if (value === 'dispose' && arguments.length >= 2) {
					return;
				}

				opts = createObject(opts);
				opts.owner = owner;

				cell = new Cell(initialValue, opts);

				owner[KEY_CELLS].set(cx, cell);
			}

			switch (arguments.length) {
				case 0: {
					return cell.get();
				}
				case 1: {
					cell.set(value);
					return value;
				}
				default: {
					var method = value;

					switch (method) {
						case 'bind': {
							cx = cx.bind(owner);
							cx.constructor = cellx;
							return cx;
						}
						case 'unwrap': {
							return cell;
						}
						default: {
							var result = Cell.prototype[method].apply(cell, slice.call(arguments, 1));
							return result === cell ? cx : result;
						}
					}
				}
			}
		}
		cx.constructor = cellx;

		if (opts.onChange || opts.onError) {
			cx.call(opts.owner || global);
		}

		return cx;
	}

	cellx.KEY_UID = KEY_UID;
	cellx.ErrorLogger = ErrorLogger;
	cellx.EventEmitter = EventEmitter;
	cellx.ObservableMap = ObservableMap;
	cellx.ObservableList = ObservableList;
	cellx.Cell = Cell;

	/**
	 * @typesign (
	 *     entries?: Object|Array<{ 0, 1 }>|cellx.ObservableMap,
	 *     opts?: { adoptsItemChanges?: boolean }
	 * ) -> cellx.ObservableMap;
	 *
	 * @typesign (
	 *     entries?: Object|Array<{ 0, 1 }>|cellx.ObservableMap,
	 *     adoptsItemChanges?: boolean
	 * ) -> cellx.ObservableMap;
	 */
	function map(entries, opts) {
		return new ObservableMap(entries, typeof opts == 'boolean' ? { adoptsItemChanges: opts } : opts);
	}

	cellx.map = map;

	/**
	 * @typesign (items?: Array|cellx.ObservableList, opts?: {
	 *     adoptsItemChanges?: boolean,
	 *     comparator?: (a, b) -> int,
	 *     sorted?: boolean
	 * }) -> cellx.ObservableList;
	 *
	 * @typesign (items?: Array|cellx.ObservableList, adoptsItemChanges?: boolean) -> cellx.ObservableList;
	 */
	function list(items, opts) {
		return new ObservableList(items, typeof opts == 'boolean' ? { adoptsItemChanges: opts } : opts);
	}

	cellx.list = list;

	/**
	 * @typesign (obj: cellx.EventEmitter, name: string, value) -> cellx.EventEmitter;
	 */
	function defineObservableProperty(obj, name, value) {
		var privateName = '_' + name;

		obj[privateName] = value instanceof Cell ? value : new Cell(value, { owner: obj });

		Object.defineProperty(obj, name, {
			configurable: true,
			enumerable: true,

			get: function() {
				return this[privateName].get();
			},

			set: function(value) {
				this[privateName].set(value);
			}
		});

		return obj;
	}

	/**
	 * @typesign (obj: cellx.EventEmitter, props: Object) -> cellx.EventEmitter;
	 */
	function defineObservableProperties(obj, props) {
		Object.keys(props).forEach(function(name) {
			defineObservableProperty(obj, name, props[name]);
		});

		return obj;
	}

	/**
	 * @typesign (obj: cellx.EventEmitter, name: string, value) -> cellx.EventEmitter;
	 * @typesign (obj: cellx.EventEmitter, props: Object) -> cellx.EventEmitter;
	 */
	function define(obj, name, value) {
		if (arguments.length == 3) {
			defineObservableProperty(obj, name, value);
		} else {
			defineObservableProperties(obj, name);
		}

		return obj;
	}

	cellx.define = define;

	cellx.js = {
		is: is,
		Symbol: Symbol,
		Map: Map
	};

	cellx.utils = {
		logError: logError,
		nextUID: nextUID,
		mixin: mixin,
		createClass: createClass,
		nextTick: nextTick,
		defineObservableProperty: defineObservableProperty,
		defineObservableProperties: defineObservableProperties
	};

	cellx.cellx = cellx; // for destructuring

	module.exports = cellx;


/***/ },
/* 1 */
/***/ function(module, exports) {

	var ErrorLogger = {
		_handler: null,

		/**
		 * @typesign (handler: (...msg));
		 */
		setHandler: function setHandler(handler) {
			this._handler = handler;
		},

		/**
		 * @typesign (...msg);
		 */
		log: function log() {
			this._handler.apply(this, arguments);
		}
	};

	module.exports = ErrorLogger;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var ErrorLogger = __webpack_require__(1);
	var Symbol = __webpack_require__(3);
	var createClass = __webpack_require__(5);

	var createObject = Object.create;
	var hasOwn = Object.prototype.hasOwnProperty;

	var KEY_INNER = Symbol('inner');

	/**
	 * @typedef {{
	 *     target?: Object,
	 *     type: string,
	 *     bubbles?: boolean,
	 *     isPropagationStopped?: boolean
	 * }} cellx~Event
	 */

	/**
	 * @class cellx.EventEmitter
	 * @extends {Object}
	 * @typesign new EventEmitter() -> cellx.EventEmitter;
	 */
	var EventEmitter = createClass({
		Static: {
			KEY_INNER: KEY_INNER
		},

		constructor: function EventEmitter() {
			/**
			 * @type {Object<Array<{
			 *     listener: (evt: cellx~Event) -> ?boolean,
			 *     context
			 * }>>}
			 */
			this._events = createObject(null);
		},

		/**
		 * @typesign (
		 *     type: string,
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.EventEmitter;
		 *
		 * @typesign (
		 *     listeners: Object<(evt: cellx~Event) -> ?boolean>,
		 *     context?
		 * ) -> cellx.EventEmitter;
		 */
		on: function on(type, listener, context) {
			if (typeof type == 'object') {
				context = arguments.length >= 2 ? listener : this;

				var listeners = type;

				for (type in listeners) {
					if (hasOwn.call(listeners, type)) {
						this._on(type, listeners[type], context);
					}
				}
			} else {
				this._on(type, listener, arguments.length >= 3 ? context : this);
			}

			return this;
		},
		/**
		 * @typesign (
		 *     type: string,
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.EventEmitter;
		 *
		 * @typesign (
		 *     listeners: Object<(evt: cellx~Event) -> ?boolean>,
		 *     context?
		 * ) -> cellx.EventEmitter;
		 *
		 * @typesign () -> cellx.EventEmitter;
		 */
		off: function off(type, listener, context) {
			var argCount = arguments.length;

			if (argCount) {
				if (typeof type == 'object') {
					context = argCount >= 2 ? listener : this;

					var listeners = type;

					for (type in listeners) {
						if (hasOwn.call(listeners, type)) {
							this._off(type, listeners[type], context);
						}
					}
				} else {
					this._off(type, listener, argCount >= 3 ? context : this);
				}
			} else if (this._events) {
				this._events = createObject(null);
			}

			return this;
		},

		/**
		 * @typesign (
		 *     type: string,
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context
		 * );
		 */
		_on: function _on(type, listener, context) {
			var index = type.indexOf(':');

			if (index != -1) {
				this['_' + type.slice(index + 1)].on(type.slice(0, index), listener, context);
			} else {
				var events = (this._events || (this._events = createObject(null)))[type];

				if (!events) {
					events = this._events[type] = [];
				}

				events.push({
					listener: listener,
					context: context
				});
			}
		},
		/**
		 * @typesign (
		 *     type: string,
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context
		 * );
		 */
		_off: function _off(type, listener, context) {
			var index = type.indexOf(':');

			if (index != -1) {
				this['_' + type.slice(index + 1)].off(type.slice(0, index), listener, context);
			} else {
				var events = this._events && this._events[type];

				if (!events) {
					return;
				}

				for (var i = events.length; i;) {
					var evt = events[--i];

					if ((evt.listener == listener || evt.listener[KEY_INNER] === listener) && evt.context === context) {
						events.splice(i, 1);
						break;
					}
				}

				if (!events.length) {
					delete this._events[type];
				}
			}
		},

		/**
		 * @typesign (
		 *     type: string,
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.EventEmitter;
		 */
		once: function once(type, listener, context) {
			if (arguments.length < 3) {
				context = this;
			}

			function wrapper() {
				this._off(type, wrapper, context);
				return listener.apply(this, arguments);
			}
			wrapper[KEY_INNER] = listener;

			this._on(type, wrapper, context);

			return this;
		},

		/**
		 * @typesign (evt: cellx~Event) -> cellx~Event;
		 * @typesign (type: string) -> cellx~Event;
		 */
		emit: function emit(evt) {
			if (typeof evt == 'string') {
				evt = {
					target: this,
					type: evt
				};
			} else if (!evt.target) {
				evt.target = this;
			} else if (evt.target != this) {
				throw new TypeError('Event cannot be emitted on this object');
			}

			try {
				this._handleEvent(evt);
			} catch (err) {
				this._logError(err);
			}

			return evt;
		},

		/**
		 * @typesign (evt: cellx~Event);
		 *
		 * For override:
		 * @example
		 * function View(el) {
		 *     this.element = el;
		 *     el._view = this;
		 * }
		 *
		 * View.prototype = Object.create(EventEmitter.prototype);
		 * View.prototype.constructor = View;
		 *
		 * View.prototype.getParent = function() {
		 *     var node = this.element;
		 *
		 *     while (node = node.parentNode) {
		 *         if (node._view) {
		 *             return node._view;
		 *         }
		 *     }
		 *
		 *     return null;
		 * };
		 *
		 * View.prototype._handleEvent = function(evt) {
		 *     EventEmitter.prototype._handleEvent.call(this, evt);
		 *
		 *     if (evt.bubbles !== false && !evt.isPropagationStopped) {
		 *         var parent = this.getParent();
		 *
		 *         if (parent) {
		 *             parent._handleEvent(evt);
		 *         }
		 *     }
		 * };
		 */
		_handleEvent: function _handleEvent(evt) {
			var events = this._events && this._events[evt.type];

			if (events) {
				events = events.slice();

				for (var i = 0, l = events.length; i < l; i++) {
					if (events[i].listener.call(events[i].context, evt) === false) {
						evt.isPropagationStopped = true;
					}
				}
			}
		},

		/**
		 * @typesign (...msg);
		 */
		_logError: function _logError() {
			ErrorLogger.log.apply(ErrorLogger, arguments);
		}
	});

	module.exports = EventEmitter;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var nextUID = __webpack_require__(4);

	var Symbol = Function('return this;')().Symbol;

	if (!Symbol) {
		Symbol = function Symbol(key) {
			return '__' + key + '_' + Math.floor(Math.random() * 1e9) + '_' + nextUID() + '__';
		};

		Symbol.iterator = Symbol('iterator');
	}

	module.exports = Symbol;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var uidCounter = 0;

	/**
	 * @typesign () -> string;
	 */
	function nextUID() {
		return String(++uidCounter);
	}

	module.exports = nextUID;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var mixin = __webpack_require__(6);

	var createObject = Object.create;
	var hasOwn = Object.prototype.hasOwnProperty;

	var extend;

	/**
	 * @typesign (description: {
	 *     Extends?: Function,
	 *     Implements?: Array<Object|Function>,
	 *     Static?: Object,
	 *     constructor?: Function,
	 *     [key: string]
	 * }) -> Function;
	 */
	function createClass(description) {
		var parent;

		if (description.Extends) {
			parent = description.Extends;
			delete description.Extends;
		} else {
			parent = Object;
		}

		var constr;

		if (hasOwn.call(description, 'constructor')) {
			constr = description.constructor;
			delete description.constructor;
		} else {
			constr = parent == Object ?
				function() {} :
				function() {
					return parent.apply(this, arguments);
				};
		}

		var proto = constr.prototype = createObject(parent.prototype);

		if (description.Implements) {
			description.Implements.forEach(function(implementation) {
				if (typeof implementation == 'function') {
					Object.keys(implementation).forEach(function(name) {
						Object.defineProperty(constr, name, Object.getOwnPropertyDescriptor(implementation, name));
					});

					mixin(proto, implementation.prototype);
				} else {
					mixin(proto, implementation);
				}
			});

			delete description.Implements;
		}

		Object.keys(parent).forEach(function(name) {
			Object.defineProperty(constr, name, Object.getOwnPropertyDescriptor(parent, name));
		});

		if (description.Static) {
			mixin(constr, description.Static);
			delete description.Static;
		}

		if (constr.extend === void 0) {
			constr.extend = extend;
		}

		mixin(proto, description);

		Object.defineProperty(proto, 'constructor', {
			configurable: true,
			writable: true,
			value: constr
		});

		return constr;
	}

	/**
	 * @this {Function}
	 *
	 * @typesign (description: {
	 *     Implements?: Array<Object|Function>,
	 *     Static?: Object,
	 *     constructor?: Function,
	 *     [key: string]
	 * }) -> Function;
	 */
	extend = function extend(description) {
		description.Extends = this;
		return createClass(description);
	};

	module.exports = createClass;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * @typesign (target: Object, source: Object) -> Object;
	 */
	function mixin(target, source) {
		var names = Object.getOwnPropertyNames(source);

		for (var i = 0, l = names.length; i < l; i++) {
			var name = names[i];
			Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
		}

		return target;
	}

	module.exports = mixin;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(2);
	var ObservableCollectionMixin = __webpack_require__(8);
	var is = __webpack_require__(11);
	var Symbol = __webpack_require__(3);
	var Map = __webpack_require__(9);

	var hasOwn = Object.prototype.hasOwnProperty;
	var isArray = Array.isArray;
	var global = Function('return this;')();

	/**
	 * @class cellx.ObservableMap
	 * @extends {cellx.EventEmitter}
	 * @implements {ObservableCollectionMixin}
	 *
	 * @typesign new ObservableMap(entries?: Object|cellx.ObservableMap|Map|Array<{ 0, 1 }>, opts?: {
	 *     adoptsItemChanges?: boolean
	 * }) -> cellx.ObservableMap;
	 */
	var ObservableMap = EventEmitter.extend({
		Implements: [ObservableCollectionMixin],

		constructor: function ObservableMap(entries, opts) {
			EventEmitter.call(this);
			ObservableCollectionMixin.call(this);

			this._entries = new Map();

			this.size = 0;

			/**
			 * @type {boolean}
			 */
			this.adoptsItemChanges = !opts || opts.adoptsItemChanges !== false;

			if (entries) {
				var mapEntries = this._entries;

				if (entries instanceof ObservableMap || entries instanceof Map) {
					entries._entries.forEach(function(value, key) {
						this._registerValue(value);
						mapEntries.set(key, value);
					}, this);
				} else if (isArray(entries)) {
					for (var i = 0, l = entries.length; i < l; i++) {
						var entry = entries[i];

						this._registerValue(entry[1]);
						mapEntries.set(entry[0], entry[1]);
					}
				} else {
					for (var key in entries) {
						if (hasOwn.call(entries, key)) {
							this._registerValue(entries[key]);
							mapEntries.set(key, entries[key]);
						}
					}
				}

				this.size = mapEntries.size;
			}
		},

		/**
		 * @typesign (key) -> boolean;
		 */
		has: function has(key) {
			return this._entries.has(key);
		},

		/**
		 * @typesign (value) -> boolean;
		 */
		contains: function contains(value) {
			return this._valueCounts.has(value);
		},

		/**
		 * @typesign (key) -> *;
		 */
		get: function get(key) {
			return this._entries.get(key);
		},

		/**
		 * @typesign (key, value) -> cellx.ObservableMap;
		 */
		set: function set(key, value) {
			var entries = this._entries;
			var hasKey = entries.has(key);
			var oldValue;

			if (hasKey) {
				oldValue = entries.get(key);

				if (is(value, oldValue)) {
					return this;
				}

				this._unregisterValue(oldValue);
			}

			this._registerValue(value);
			entries.set(key, value);

			if (!hasKey) {
				this.size++;
			}

			this.emit({
				type: 'change',
				subtype: hasKey ? 'update' : 'add',
				key: key,
				oldValue: oldValue,
				value: value
			});

			return this;
		},

		/**
		 * @typesign (key) -> boolean;
		 */
		delete: function _delete(key) {
			var entries = this._entries;

			if (!entries.has(key)) {
				return false;
			}

			var value = entries.get(key);

			this._unregisterValue(value);
			entries.delete(key);
			this.size--;

			this.emit({
				type: 'change',
				subtype: 'delete',
				key: key,
				oldValue: value,
				value: void 0
			});

			return true;
		},

		/**
		 * @typesign () -> cellx.ObservableMap;
		 */
		clear: function clear() {
			if (!this.size) {
				return this;
			}

			if (this.adoptsItemChanges) {
				this._valueCounts.forEach(function(value) {
					if (value instanceof EventEmitter) {
						value.off('change', this._onItemChange, this);
					}
				}, this);
			}

			this._entries.clear();
			this._valueCounts.clear();
			this.size = 0;

			this.emit({
				type: 'change',
				subtype: 'clear'
			});

			return this;
		},

		/**
		 * @typesign (
		 *     cb: (value, key, map: cellx.ObservableMap),
		 *     context?
		 * );
		 */
		forEach: function forEach(cb, context) {
			context = arguments.length >= 2 ? context : global;

			this._entries.forEach(function(value, key) {
				cb.call(context, value, key, this);
			}, this);
		},

		/**
		 * @typesign () -> { next: () -> { value, done: boolean } };
		 */
		keys: function keys() {
			return this._entries.keys();
		},

		/**
		 * @typesign () -> { next: () -> { value, done: boolean } };
		 */
		values: function values() {
			return this._entries.values();
		},

		/**
		 * @typesign () -> { next: () -> { value: { 0, 1 }, done: boolean } };
		 */
		entries: function entries() {
			return this._entries.entries();
		},

		/**
		 * @typesign () -> cellx.ObservableMap;
		 */
		clone: function clone() {
			return new this.constructor(this, {
				adoptsItemChanges: this.adoptsItemChanges
			});
		}
	});

	ObservableMap.prototype[Symbol.iterator] = ObservableMap.prototype.entries;

	module.exports = ObservableMap;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(2);
	var Map = __webpack_require__(9);

	var ObservableCollectionMixin = EventEmitter.extend({
		constructor: function ObservableCollectionMixin() {
			/**
			 * @type {Map<*, uint>}
			 */
			this._valueCounts = new Map();
		},

		/**
		 * @typesign (evt: cellx~Event);
		 */
		_onItemChange: function _onItemChange(evt) {
			this._handleEvent(evt);
		},

		/**
		 * @typesign (value);
		 */
		_registerValue: function _registerValue(value) {
			var valueCounts = this._valueCounts;
			var valueCount = valueCounts.get(value);

			if (valueCount) {
				valueCounts.set(value, valueCount + 1);
			} else {
				valueCounts.set(value, 1);

				if (this.adoptsItemChanges && value instanceof EventEmitter) {
					value.on('change', this._onItemChange, this);
				}
			}
		},

		/**
		 * @typesign (value);
		 */
		_unregisterValue: function _unregisterValue(value) {
			var valueCounts = this._valueCounts;
			var valueCount = valueCounts.get(value);

			if (valueCount > 1) {
				valueCounts.set(value, valueCount - 1);
			} else {
				valueCounts.delete(value);

				if (this.adoptsItemChanges && value instanceof EventEmitter) {
					value.off('change', this._onItemChange, this);
				}
			}
		}
	});

	module.exports = ObservableCollectionMixin;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(10);
	var Symbol = __webpack_require__(3);
	var nextUID = __webpack_require__(4);
	var createClass = __webpack_require__(5);

	var KEY_UID = keys.UID;

	var createObject = Object.create;
	var hasOwn = Object.prototype.hasOwnProperty;
	var global = Function('return this;')();

	var Map = global.Map;

	if (!Map) {
		var entryStub = {
			value: void 0
		};

		Map = createClass({
			constructor: function Map(entries) {
				this._entries = createObject(null);
				this._objectStamps = {};

				this._first = null;
				this._last = null;

				this.size = 0;

				if (entries) {
					for (var i = 0, l = entries.length; i < l; i++) {
						this.set(entries[i][0], entries[i][1]);
					}
				}
			},

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

			delete: function _delete(key) {
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
				if (!hasOwn.call(obj, KEY_UID)) {
					if (!Object.isExtensible(obj)) {
						var stamps = this._objectStamps;
						var stamp;

						for (stamp in stamps) {
							if (hasOwn.call(stamps, stamp) && stamps[stamp] == obj) {
								return stamp;
							}
						}

						stamp = nextUID();
						stamps[stamp] = obj;

						return stamp;
					}

					Object.defineProperty(obj, KEY_UID, {
						value: nextUID()
					});
				}

				return obj[KEY_UID];
			},

			forEach: function forEach(cb, context) {
				context = arguments.length >= 2 ? context : global;

				var entry = this._first;

				while (entry) {
					cb.call(context, entry.value, entry.key, this);

					do {
						entry = entry.next;
					} while (entry && !this._entries[entry.keyStamp]);
				}
			},

			toString: function toString() {
				return '[object Map]';
			}
		});

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
							value: void 0,
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

	module.exports = Map;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(3);

	module.exports = {
		UID: Symbol('uid'),
		CELLS: Symbol('cells')
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * @typesign (a, b) -> boolean;
	 */
	var is = Object.is || function is(a, b) {
		if (a === 0 && b === 0) {
			return 1 / a == 1 / b;
		}
		return a === b || (a != a && b != b);
	};

	module.exports = is;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(2);
	var ObservableCollectionMixin = __webpack_require__(8);
	var is = __webpack_require__(11);
	var Symbol = __webpack_require__(3);

	var push = Array.prototype.push;
	var splice = Array.prototype.splice;
	var global = Function('return this;')();

	/**
	 * @typesign (a, b) -> -1|1|0;
	 */
	function defaultComparator(a, b) {
		if (a < b) { return -1; }
		if (a > b) { return 1; }
		return 0;
	}

	/**
	 * @class cellx.ObservableList
	 * @extends {cellx.EventEmitter}
	 * @implements {ObservableCollectionMixin}
	 *
	 * @typesign new ObservableList(items?: Array|cellx.ObservableList, opts?: {
	 *     adoptsItemChanges?: boolean,
	 *     comparator?: (a, b) -> int,
	 *     sorted?: boolean
	 * }) -> cellx.ObservableList;
	 */
	var ObservableList = EventEmitter.extend({
		Implements: [ObservableCollectionMixin],

		constructor: function ObservableList(items, opts) {
			EventEmitter.call(this);
			ObservableCollectionMixin.call(this);

			if (!opts) {
				opts = {};
			}

			this._items = [];

			this.length = 0;

			/**
			 * @type {boolean}
			 */
			this.adoptsItemChanges = opts.adoptsItemChanges !== false;

			/**
			 * @type {?(a, b) -> int}
			 */
			this.comparator = null;

			this.sorted = false;

			if (opts.sorted || (opts.comparator && opts.sorted !== false)) {
				this.comparator = opts.comparator || defaultComparator;
				this.sorted = true;
			}

			if (items) {
				this._addRange(items instanceof ObservableList ? items._items : items);
			}
		},

		/**
		 * @typesign (index: ?int, allowedEndIndex?: boolean) -> ?uint;
		 */
		_validateIndex: function _validateIndex(index, allowedEndIndex) {
			if (index === void 0) {
				return index;
			}

			if (index < 0) {
				index += this.length;

				if (index < 0) {
					throw new RangeError('Index out of valid range');
				}
			} else if (index >= (this.length + (allowedEndIndex ? 1 : 0))) {
				throw new RangeError('Index out of valid range');
			}

			return index;
		},

		/**
		 * @typesign (value) -> boolean;
		 */
		contains: function contains(value) {
			return this._valueCounts.has(value);
		},

		/**
		 * @typesign (value, fromIndex?: int) -> int;
		 */
		indexOf: function indexOf(value, fromIndex) {
			return this._items.indexOf(value, this._validateIndex(fromIndex));
		},

		/**
		 * @typesign (value, fromIndex?: int) -> int;
		 */
		lastIndexOf: function lastIndexOf(value, fromIndex) {
			return this._items.lastIndexOf(value, fromIndex === void 0 ? -1 : this._validateIndex(fromIndex));
		},

		/**
		 * @typesign (index: int) -> *;
		 */
		get: function get(index) {
			return this._items[this._validateIndex(index)];
		},

		/**
		 * @typesign (index: int, count?: uint) -> Array;
		 */
		getRange: function getRange(index, count) {
			index = this._validateIndex(index, true);

			var items = this._items;

			if (count === void 0) {
				return items.slice(index);
			}

			if (index + count > items.length) {
				throw new RangeError('Sum of "index" and "count" out of valid range');
			}

			return items.slice(index, index + count);
		},

		/**
		 * @typesign (index: int, value) -> cellx.ObservableList;
		 */
		set: function set(index, value) {
			if (this.sorted) {
				throw new TypeError('Cannot set to sorted list');
			}

			index = this._validateIndex(index);

			var items = this._items;

			if (is(value, items[index])) {
				return this;
			}

			this._unregisterValue(items[index]);
			this._registerValue(value);
			items[index] = value;

			this.emit('change');

			return this;
		},

		/**
		 * @typesign (index: int, items: Array) -> cellx.ObservableList;
		 */
		setRange: function setRange(index, items) {
			if (this.sorted) {
				throw new TypeError('Cannot set to sorted list');
			}

			index = this._validateIndex(index);

			var itemCount = items.length;

			if (!itemCount) {
				return this;
			}

			if (index + itemCount > this.length) {
				throw new RangeError('Sum of "index" and "items.length" out of valid range');
			}

			var listItems = this._items;
			var changed = false;

			for (var i = index + itemCount; i > index;) {
				var item = items[--i - index];

				if (!is(item, listItems[i])) {
					this._unregisterValue(listItems[i]);
					this._registerValue(item);
					listItems[i] = item;
					changed = true;
				}
			}

			if (changed) {
				this.emit('change');
			}

			return this;
		},

		/**
		 * @typesign (item) -> cellx.ObservableList;
		 */
		add: function add(item) {
			if (this.sorted) {
				this._placeItem(item);
			} else {
				this._registerValue(item);
				this._items.push(item);
			}

			this.length++;

			this.emit('change');

			return this;
		},

		/**
		 * @typesign (items: Array) -> cellx.ObservableList;
		 */
		addRange: function addRange(items) {
			if (items.length) {
				this._addRange(items);
				this.emit('change');
			}

			return this;
		},

		/**
		 * @typesign (items: Array);
		 */
		_addRange: function _addRange(items) {
			if (this.sorted) {
				for (var i = 0, l = items.length; i < l; i++) {
					this._placeItem(items[i]);
				}

				this.length += items.length;
			} else {
				for (var j = items.length; j;) {
					this._registerValue(items[--j]);
				}

				this.length = push.apply(this._items, items);
			}
		},

		/**
		 * @typesign (item);
		 */
		_placeItem: function _placeItem(item) {
			this._registerValue(item);

			var items = this._items;
			var comparator = this.comparator;
			var low = 0;
			var high = items.length;

			while (low != high) {
				var mid = (low + high) >> 1;

				if (comparator(item, items[mid]) < 0) {
					high = mid;
				} else {
					low = mid + 1;
				}
			}

			items.splice(low, 0, item);
		},

		/**
		 * @typesign (index: int, item) -> cellx.ObservableList;
		 */
		insert: function insert(index, item) {
			this.insertRange(index, [item]);
			return this;
		},

		/**
		 * @typesign (index: int, items: Array) -> cellx.ObservableList;
		 */
		insertRange: function insertRange(index, items) {
			if (this.sorted) {
				throw new TypeError('Cannot insert to sorted list');
			}

			index = this._validateIndex(index, true);

			var itemCount = items.length;

			if (!itemCount) {
				return this;
			}

			for (var i = itemCount; i;) {
				this._registerValue(items[--i]);
			}

			splice.apply(this._items, [index, 0].concat(items));
			this.length += itemCount;

			this.emit('change');

			return this;
		},

		/**
		 * @typesign (item, fromIndex?: int) -> boolean;
		 */
		remove: function remove(item, fromIndex) {
			var index = this._items.indexOf(item, this._validateIndex(fromIndex));

			if (index == -1) {
				return false;
			}

			this._unregisterValue(item);
			this._items.splice(index, 1);
			this.length--;

			this.emit('change');

			return true;
		},

		/**
		 * @typesign (item, fromIndex?: int) -> boolean;
		 */
		removeAll: function removeAll(item, fromIndex) {
			var index = this._validateIndex(fromIndex);
			var items = this._items;
			var changed = false;

			while ((index = items.indexOf(item, index)) != -1) {
				this._unregisterValue(item);
				items.splice(index, 1);
				changed = true;
			}

			if (changed) {
				this.length = items.length;
				this.emit('change');
			}

			return changed;
		},

		/**
		 * @typesign (items: Array, fromIndex?: int) -> boolean;
		 */
		removeEach: function removeEach(items, fromIndex) {
			fromIndex = this._validateIndex(fromIndex);

			var listItems = this._items;
			var changed = false;

			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];
				var index = listItems.indexOf(item, fromIndex);

				if (index != -1) {
					this._unregisterValue(item);
					listItems.splice(index, 1);
					changed = true;
				}
			}

			if (changed) {
				this.length = listItems.length;
				this.emit('change');
			}

			return changed;
		},

		/**
		 * @typesign (items: Array, fromIndex?: int) -> boolean;
		 */
		removeAllEach: function removeAllEach(items, fromIndex) {
			fromIndex = this._validateIndex(fromIndex);

			var listItems = this._items;
			var changed = false;

			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];

				for (var index = fromIndex; (index = listItems.indexOf(item, index)) != -1;) {
					this._unregisterValue(item);
					listItems.splice(index, 1);
					changed = true;
				}
			}

			if (changed) {
				this.length = listItems.length;
				this.emit('change');
			}

			return changed;
		},

		/**
		 * @typesign (index: int) -> *;
		 */
		removeAt: function removeAt(index) {
			var removedItem = this._items.splice(this._validateIndex(index), 1)[0];
			this._unregisterValue(removedItem);
			this.length--;

			this.emit('change');

			return removedItem;
		},

		/**
		 * @typesign (index: int, count?: uint) -> Array;
		 */
		removeRange: function removeRange(index, count) {
			index = this._validateIndex(index, true);

			var items = this._items;

			if (count === void 0) {
				count = items.length - index;
			} else if (index + count > items.length) {
				throw new RangeError('Sum of "index" and "count" out of valid range');
			}

			if (!count) {
				return [];
			}

			for (var i = index + count; i > index;) {
				this._unregisterValue(items[--i]);
			}
			var removedItems = items.splice(index, count);
			this.length -= count;

			this.emit('change');

			return removedItems;
		},

		/**
		 * @typesign () -> cellx.ObservableList;
		 */
		clear: function clear() {
			if (!this.length) {
				return this;
			}

			if (this.adoptsItemChanges) {
				this._valueCounts.forEach(function(value) {
					if (value instanceof EventEmitter) {
						value.off('change', this._onItemChange, this);
					}
				}, this);
			}

			this._items.length = 0;
			this._valueCounts.clear();

			this.length = 0;

			this.emit('change');

			return this;
		},

		/**
		 * @typesign (separator?: string) -> string;
		 */
		join: function join(separator) {
			return this._items.join(separator);
		},

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList),
		 *     context?
		 * );
		 */
		forEach: null,

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> *,
		 *     context?
		 * ) -> Array;
		 */
		map: null,

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
		 *     context?
		 * ) -> Array;
		 */
		filter: null,

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
		 *     context?
		 * ) -> *;
		 */
		find: function(cb, context) {
			context = arguments.length >= 2 ? context : global;

			var items = this._items;

			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];

				if (cb.call(context, item, i, this)) {
					return item;
				}
			}
		},

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
		 *     context?
		 * ) -> int;
		 */
		findIndex: function(cb, context) {
			context = arguments.length >= 2 ? context : global;

			var items = this._items;

			for (var i = 0, l = items.length; i < l; i++) {
				if (cb.call(context, items[i], i, this)) {
					return i;
				}
			}

			return -1;
		},

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
		 *     context?
		 * ) -> boolean;
		 */
		every: null,

		/**
		 * @typesign (
		 *     cb: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
		 *     context?
		 * ) -> boolean;
		 */
		some: null,

		/**
		 * @typesign (
		 *     cb: (accumulator, item, index: uint, list: cellx.ObservableList) -> *,
		 *     initialValue?
		 * ) -> *;
		 */
		reduce: null,

		/**
		 * @typesign (
		 *     cb: (accumulator, item, index: uint, list: cellx.ObservableList) -> *,
		 *     initialValue?
		 * ) -> *;
		 */
		reduceRight: null,

		/**
		 * @typesign () -> cellx.ObservableList;
		 */
		clone: function clone() {
			return new this.constructor(this, {
				adoptsItemChanges: this.adoptsItemChanges,
				comparator: this.comparator,
				sorted: this.sorted
			});
		},

		/**
		 * @typesign () -> Array;
		 */
		toArray: function toArray() {
			return this._items.slice();
		},

		/**
		 * @typesign () -> string;
		 */
		toString: function toString() {
			return this._items.join();
		}
	});

	['forEach', 'map', 'filter', 'every', 'some'].forEach(function(name) {
		ObservableList.prototype[name] = function(cb, context) {
			context = arguments.length >= 2 ? context : global;

			return this._items[name](function(item, index) {
				return cb.call(context, item, index, this);
			}, this);
		};
	});

	['reduce', 'reduceRight'].forEach(function(name) {
		ObservableList.prototype[name] = function(cb, initialValue) {
			var items = this._items;
			var list = this;

			function wrapper(accumulator, item, index) {
				return cb(accumulator, item, index, list);
			}

			return arguments.length >= 2 ? items[name](wrapper, initialValue) : items[name](wrapper);
		};
	});

	[
		['keys', function keys(index) {
			return index;
		}],
		['values', function values(index, item) {
			return item;
		}],
		['entries', function entries(index, item) {
			return [index, item];
		}]
	].forEach(function(settings) {
		var getStepValue = settings[1];

		ObservableList.prototype[settings[0]] = function() {
			var items = this._items;
			var index = 0;
			var done = false;

			return {
				next: function() {
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
						value: void 0,
						done: true
					};
				}
			};
		};
	});

	ObservableList.prototype[Symbol.iterator] = ObservableList.prototype.values;

	module.exports = ObservableList;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(2);
	var is = __webpack_require__(11);
	var nextTick = __webpack_require__(14);

	var slice = Array.prototype.slice;

	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 0x1fffffffffffff;
	var KEY_INNER = EventEmitter.KEY_INNER;

	var pushingIndexCounter = 0;

	var releasePlan = [];

	var releasePlanIndex = MAX_SAFE_INTEGER;
	var releasePlanToIndex = -1;

	var releasePlanned = false;
	var currentlyRelease = false;

	var releaseVersion = 1;

	function release() {
		if (!releasePlanned) {
			return;
		}

		releasePlanned = false;
		currentlyRelease = true;

		var queue = releasePlan[releasePlanIndex];

		for (;;) {
			var cell = (queue || []).shift();

			if (!cell) {
				if (++releasePlanIndex > releasePlanToIndex) {
					break;
				}

				queue = releasePlan[releasePlanIndex];
				continue;
			}

			var oldReleasePlanIndex = releasePlanIndex;

			var level = cell._level;
			var changeEvent = cell._changeEvent;

			if (!changeEvent) {
				if (level > releasePlanIndex || cell._levelInRelease == -1) {
					if (!queue.length) {
						if (++releasePlanIndex > releasePlanToIndex) {
							break;
						}

						queue = releasePlan[releasePlanIndex];
					}

					continue;
				}

				cell.pull();

				level = cell._level;
				changeEvent = cell._changeEvent;

				if (releasePlanIndex == oldReleasePlanIndex) {
					if (level > releasePlanIndex) {
						if (!queue.length) {
							queue = releasePlan[++releasePlanIndex];
						}

						continue;
					}
				} else {
					if (changeEvent) {
						queue.unshift(cell);
					} else if (level <= oldReleasePlanIndex) {
						cell._levelInRelease = -1;
					}

					queue = releasePlan[releasePlanIndex];
					continue;
				}
			}

			cell._levelInRelease = -1;

			if (changeEvent) {
				cell._fixedValue = cell._value;
				cell._changeEvent = null;

				if (cell._events.change) {
					cell._handleEvent(changeEvent);
				}

				var pushingIndex = cell._pushingIndex;
				var slaves = cell._slaves;

				for (var i = 0, l = slaves.length; i < l; i++) {
					var slave = slaves[i];

					if (slave._level <= level) {
						slave._level = level + 1;
					}

					if (pushingIndex > slave._pushingIndex) {
						slave._pushingIndex = pushingIndex;
						slave._changeEvent = null;

						slave._addToRelease();
					}
				}
			}

			if (releasePlanIndex == oldReleasePlanIndex) {
				if (queue.length) {
					continue;
				}

				if (++releasePlanIndex > releasePlanToIndex) {
					break;
				}
			}

			queue = releasePlan[releasePlanIndex];
		}

		releasePlanIndex = MAX_SAFE_INTEGER;
		releasePlanToIndex = -1;

		currentlyRelease = false;

		releaseVersion++;
	}

	var currentCell = null;
	var error = {
		original: null
	};

	/**
	 * @typesign (value);
	 */
	function defaultPut(value, push) {
		push(value);
	}

	/**
	 * @class cellx.Cell
	 * @extends {cellx.EventEmitter}
	 *
	 * @example
	 * var a = new Cell(1);
	 * var b = new Cell(2);
	 * var c = new Cell(function() {
	 *     return a.get() + b.get();
	 * });
	 *
	 * c.on('change', function() {
	 *     console.log('c = ' + c.get());
	 * });
	 *
	 * console.log(c.get());
	 * // => 3
	 *
	 * a.set(5);
	 * b.set(10);
	 * // => 'c = 15'
	 *
	 * @typesign new Cell(value?, opts?: {
	 *     debugKey?: string,
	 *     owner?: Object,
	 *     get?: (value) -> *,
	 *     validate?: (value, oldValue),
	 *     merge: (value, oldValue) -> *,
	 *     onChange?: (evt: cellx~Event) -> ?boolean,
	 *     onError?: (evt: cellx~Event) -> ?boolean
	 * }) -> cellx.Cell;
	 *
	 * @typesign new Cell(pull: (push: (value), fail: (err), oldValue) -> *, opts?: {
	 *     debugKey?: string,
	 *     owner?: Object,
	 *     get?: (value) -> *,
	 *     validate?: (value, oldValue),
	 *     merge: (value, oldValue) -> *,
	 *     put?: (value, push: (value), fail: (err), oldValue),
	 *     reap?: (),
	 *     onChange?: (evt: cellx~Event) -> ?boolean,
	 *     onError?: (evt: cellx~Event) -> ?boolean
	 * }) -> cellx.Cell;
	 */
	var Cell = EventEmitter.extend({
		Static: {
			forceRelease: function() {
				if (releasePlanned) {
					release();
				}
			}
		},

		constructor: function Cell(value, opts) {
			EventEmitter.call(this);

			if (!opts) {
				opts = {};
			}

			var cell = this;

			this.debugKey = opts.debugKey;

			this.owner = opts.owner || this;

			this._pull = typeof value == 'function' ? value : null;
			this._get = opts.get || null;

			this._validate = opts.validate || null;
			this._merge = opts.merge || null;

			this._put = opts.put || defaultPut;

			var push = this.push;
			var fail = this.fail;

			this.push = function(value) { push.call(cell, value); };
			this.fail = function(err) { fail.call(cell, err); };

			this._onFulfilled = this._onRejected = null;

			this._reap = opts.reap || null;

			if (this._pull) {
				this._fixedValue = this._value = void 0;
			} else {
				if (this._validate) {
					this._validate(value, void 0);
				}
				if (this._merge) {
					value = this._merge(value, void 0);
				}

				this._fixedValue = this._value = value;

				if (value instanceof EventEmitter) {
					value.on('change', this._onValueChange, this);
				}
			}

			this._error = null;
			this._errorCell = null;

			this._pushingIndex = 0;
			this._version = 0;

			this._inited = false;
			this._currentlyPulls = false;
			this._active = false;
			this._hasFollowers = false;

			/**
			 * Ведущие ячейки.
			 * @type {?Array<cellx.Cell>}
			 */
			this._masters = null;
			/**
			 * Ведомые ячейки.
			 * @type {Array<cellx.Cell>}
			 */
			this._slaves = [];

			this._level = 0;
			this._levelInRelease = -1;

			this._pending = this._fulfilled = this._rejected = false;

			this._changeEvent = null;
			this._canCancelChange = true;

			this._lastErrorEvent = null;

			if (opts.onChange) {
				this.on('change', opts.onChange);
			}
			if (opts.onError) {
				this.on('error', opts.onError);
			}
		},

		/**
		 * @override
		 */
		on: function on(type, listener, context) {
			if (releasePlanned) {
				release();
			}

			this._activate();

			if (typeof type == 'object') {
				EventEmitter.prototype.on.call(this, type, arguments.length >= 2 ? listener : this.owner);
			} else {
				EventEmitter.prototype.on.call(this, type, listener, arguments.length >= 3 ? context : this.owner);
			}

			this._hasFollowers = true;

			return this;
		},
		/**
		 * @override
		 */
		off: function off(type, listener, context) {
			if (releasePlanned) {
				release();
			}

			var argCount = arguments.length;

			if (argCount) {
				if (typeof type == 'object') {
					EventEmitter.prototype.off.call(this, type, argCount >= 2 ? listener : this.owner);
				} else {
					EventEmitter.prototype.off.call(this, type, listener, argCount >= 3 ? context : this.owner);
				}
			} else {
				EventEmitter.prototype.off.call(this);
			}

			if (!this._slaves.length && !this._events.change && !this._events.error) {
				this._hasFollowers = false;
				this._deactivate();
			}

			return this;
		},

		/**
		 * @typesign (
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		addChangeListener: function addChangeListener(listener, context) {
			return this.on('change', listener, arguments.length >= 2 ? context : this.owner);
		},
		/**
		 * @typesign (
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		removeChangeListener: function removeChangeListener(listener, context) {
			return this.off('change', listener, arguments.length >= 2 ? context : this.owner);
		},

		/**
		 * @typesign (
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		addErrorListener: function addErrorListener(listener, context) {
			return this.on('error', listener, arguments.length >= 2 ? context : this.owner);
		},
		/**
		 * @typesign (
		 *     listener: (evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		removeErrorListener: function removeErrorListener(listener, context) {
			return this.off('error', listener, arguments.length >= 2 ? context : this.owner);
		},

		/**
		 * @typesign (
		 *     listener: (err: ?Error, evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		subscribe: function subscribe(listener, context) {
			function wrapper(evt) {
				return listener.call(this, evt.error || null, evt);
			}
			wrapper[KEY_INNER] = listener;

			if (arguments.length < 2) {
				context = this.owner;
			}

			return this
				.on('change', wrapper, context)
				.on('error', wrapper, context);
		},
		/**
		 * @typesign (
		 *     listener: (err: ?Error, evt: cellx~Event) -> ?boolean,
		 *     context?
		 * ) -> cellx.Cell;
		 */
		unsubscribe: function unsubscribe(listener, context) {
			if (arguments.length < 2) {
				context = this.owner;
			}

			return this
				.off('change', listener, context)
				.off('error', listener, context);
		},

		/**
		 * @typesign (slave: cellx.Cell);
		 */
		_registerSlave: function _registerSlave(slave) {
			this._activate();

			this._slaves.push(slave);
			this._hasFollowers = true;
		},
		/**
		 * @typesign (slave: cellx.Cell);
		 */
		_unregisterSlave: function _unregisterSlave(slave) {
			this._slaves.splice(this._slaves.indexOf(slave), 1);

			if (!this._slaves.length && !this._events.change && !this._events.error) {
				this._hasFollowers = false;
				this._deactivate();
			}
		},

		/**
		 * @typesign ();
		 */
		_activate: function _activate() {
			if (!this._pull || this._active || this._inited && !this._masters) {
				return;
			}

			if (this._version < releaseVersion) {
				var value = this._tryPull();

				if (value === error) {
					this._fail(error.original, true);
				} else {
					this._push(value, true);
				}
			}

			var masters = this._masters;

			if (masters) {
				for (var i = masters.length; i;) {
					masters[--i]._registerSlave(this);
				}

				this._active = true;
			}
		},
		/**
		 * @typesign ();
		 */
		_deactivate: function _deactivate() {
			if (!this._active) {
				return;
			}

			var masters = this._masters;

			for (var i = masters.length; i;) {
				masters[--i]._unregisterSlave(this);
			}

			this._active = false;

			if (this._reap) {
				this._reap.call(this.owner);
			}
		},

		/**
		 * @typesign ();
		 */
		_addToRelease: function _addToRelease() {
			var level = this._level;

			if (level <= this._levelInRelease) {
				return;
			}

			(releasePlan[level] || (releasePlan[level] = [])).push(this);

			if (releasePlanIndex > level) {
				releasePlanIndex = level;
			}
			if (releasePlanToIndex < level) {
				releasePlanToIndex = level;
			}

			this._levelInRelease = level;

			if (!releasePlanned && !currentlyRelease) {
				releasePlanned = true;
				nextTick(release);
			}
		},

		/**
		 * @typesign (evt: cellx~Event);
		 */
		_onValueChange: function _onValueChange(evt) {
			this._pushingIndex = ++pushingIndexCounter;

			if (this._changeEvent) {
				evt.prev = this._changeEvent;
				this._changeEvent = evt;

				if (this._value === this._fixedValue) {
					this._canCancelChange = false;
				}
			} else {
				evt.prev = null;
				this._changeEvent = evt;
				this._canCancelChange = false;

				this._addToRelease();
			}
		},

		/**
		 * @typesign () -> cellx.Cell;
		 */
		pull: function pull() {
			if (!this._pull) {
				return this;
			}

			if (releasePlanned) {
				release();
			}

			var hasFollowers = this._hasFollowers;

			var oldMasters;
			var oldLevel;

			if (hasFollowers) {
				oldMasters = this._masters || [];
				oldLevel = this._level;
			}

			this._pending = true;
			this._fulfilled = this._rejected = false;

			var value = this._tryPull();

			if (hasFollowers) {
				var masters = this._masters || [];
				var masterCount = masters.length;
				var notFoundMasterCount = 0;

				for (var i = masterCount; i;) {
					var master = masters[--i];

					if (oldMasters.indexOf(master) == -1) {
						master._registerSlave(this);
						notFoundMasterCount++;
					}
				}

				if (masterCount - notFoundMasterCount < oldMasters.length) {
					for (var j = oldMasters.length; j;) {
						var oldMaster = oldMasters[--j];

						if (masters.indexOf(oldMaster) == -1) {
							oldMaster._unregisterSlave(this);
						}
					}
				}

				this._active = !!masterCount;

				if (currentlyRelease && this._level > oldLevel) {
					this._addToRelease();
					return this;
				}
			}

			if (value === error) {
				this._fail(error.original, currentlyRelease);
			} else {
				this._push(value, currentlyRelease);
			}

			return this;
		},

		/**
		 * @typesign () -> *;
		 */
		_tryPull: function _tryPull() {
			if (this._currentlyPulls) {
				throw new TypeError('Circular pulling detected');
			}

			var prevCell = currentCell;
			currentCell = this;

			this._currentlyPulls = true;
			this._masters = null;
			this._level = 0;

			try {
				return this._pull.call(this.owner, this.push, this.fail, this._value);
			} catch (err) {
				error.original = err;
				return error;
			} finally {
				currentCell = prevCell;

				this._version = releaseVersion + currentlyRelease;

				this._inited = true;
				this._currentlyPulls = false;
			}
		},

		/**
		 * @typesign () -> *;
		 */
		get: function get() {
			if (releasePlanned && this._pull) {
				release();
			}

			if (this._pull && !this._active && this._version < releaseVersion && (!this._inited || this._masters)) {
				var value = this._tryPull();

				if (this._hasFollowers) {
					var masters = this._masters;

					if (masters) {
						for (var i = masters.length; i;) {
							masters[--i]._registerSlave(this);
						}

						this._active = true;
					}
				}

				if (value === error) {
					this._fail(error.original, true);
				} else {
					this._push(value, true);
				}
			}

			if (currentCell) {
				var currentCellMasters = currentCell._masters;
				var level = this._level;

				if (currentCellMasters) {
					if (currentCellMasters.indexOf(this) == -1) {
						currentCellMasters.push(this);

						if (currentCell._level <= level) {
							currentCell._level = level + 1;
						}
					}
				} else {
					currentCell._masters = [this];
					currentCell._level = level + 1;
				}
			}

			return this._get ? this._get(this._value) : this._value;
		},

		/**
		 * @typesign (value) -> cellx.Cell;
		 */
		set: function set(value) {
			var oldValue = this._value;

			if (this._validate) {
				this._validate(value, oldValue);
			}
			if (this._merge) {
				value = this._merge(value, oldValue);
			}

			this._put.call(this.owner, value, this.push, this.fail, oldValue);

			return this;
		},

		/**
		 * @typesign (value) -> cellx.Cell;
		 */
		push: function push(value) {
			this._push(value, false);
			return this;
		},

		/**
		 * @typesign (value, internal: boolean);
		 */
		_push: function _push(value, internal) {
			this._setError(null);

			if (!internal) {
				this._pushingIndex = ++pushingIndexCounter;
			}

			var oldValue = this._value;

			if (is(value, oldValue)) {
				return;
			}

			this._value = value;

			if (oldValue instanceof EventEmitter) {
				oldValue.off('change', this._onValueChange, this);
			}
			if (value instanceof EventEmitter) {
				value.on('change', this._onValueChange, this);
			}

			if (this._hasFollowers) {
				if (this._changeEvent) {
					if (is(value, this._fixedValue) && this._canCancelChange) {
						this._levelInRelease = -1;
						this._changeEvent = null;
					} else {
						this._changeEvent = {
							target: this,
							type: 'change',
							oldValue: oldValue,
							value: value,
							prev: this._changeEvent
						};
					}
				} else {
					this._changeEvent = {
						target: this,
						type: 'change',
						oldValue: oldValue,
						value: value,
						prev: null
					};
					this._canCancelChange = true;

					this._addToRelease();
				}
			} else {
				if (!currentlyRelease && !internal) {
					releaseVersion++;
				}

				this._fixedValue = value;
			}

			if (!internal && this._pending) {
				this._pending = false;
				this._fulfilled = true;

				if (this._onFulfilled) {
					this._onFulfilled(value);
				}
			}
		},

		/**
		 * @typesign (err) -> cellx.Cell;
		 */
		fail: function fail(err) {
			this._fail(err, false);
			return this;
		},

		/**
		 * @typesign (err, internal: boolean);
		 */
		_fail: function _fail(err, internal) {
			this._logError(err);

			if (!(err instanceof Error)) {
				err = new Error(String(err));
			}

			if (!internal && this._pending) {
				this._pending = false;
				this._rejected = true;

				if (this._onRejected) {
					this._onRejected(err);
				}
			}

			this._handleErrorEvent({
				type: 'error',
				error: err
			});
		},

		/**
		 * @typesign (evt: cellx~Event{ error: Error });
		 */
		_handleErrorEvent: function _handleErrorEvent(evt) {
			if (this._lastErrorEvent === evt) {
				return;
			}

			this._setError(evt.error);

			this._lastErrorEvent = evt;
			this._handleEvent(evt);

			var slaves = this._slaves;

			for (var i = 0, l = slaves.length; i < l; i++) {
				slaves[i]._handleErrorEvent(evt);
			}
		},

		/**
		 * @typesign () -> ?Error;
		 */
		getError: function getError() {
			return (this._errorCell || (this._errorCell = new Cell(this._error))).get();
		},

		/**
		 * @typesign (err: ?Error);
		 */
		_setError: function _setError(err) {
			if (this._error === err) {
				return;
			}

			this._error = err;

			if (this._errorCell) {
				this._errorCell.set(err);
			}

			if (!err) {
				var slaves = this._slaves;

				for (var i = 0, l = slaves.length; i < l; i++) {
					slaves[i]._setError(err);
				}
			}
		},

		/**
		 * @typesign (onFulfilled?: (value) -> *, onRejected?: (err) -> *) -> Promise;
		 */
		then: function then(onFulfilled, onRejected) {
			if (releasePlanned) {
				release();
			}

			if (!this._pull || this._fulfilled) {
				return Promise.resolve(this._get ? this._get(this._value) : this._value).then(onFulfilled);
			}

			if (this._rejected) {
				return Promise.reject(this._error).catch(onRejected);
			}

			var cell = this;

			var promise = new Promise(function(resolve, reject) {
				cell._onFulfilled = function onFulfilled(value) {
					cell._onFulfilled = cell._onRejected = null;
					resolve(cell._get ? cell._get(value) : value);
				};

				cell._onRejected = function onRejected(err) {
					cell._onFulfilled = cell._onRejected = null;
					reject(err);
				};
			}).then(onFulfilled, onRejected);

			if (!this._pending) {
				this.pull();
			}

			return promise;
		},

		/**
		 * @typesign (onRejected: (err) -> *) -> Promise;
		 */
		catch: function _catch(onRejected) {
			return this.then(null, onRejected);
		},

		/**
		 * @override
		 */
		_logError: function _logError() {
			var msg = slice.call(arguments);

			if (this.debugKey) {
				msg.unshift('[' + this.debugKey + ']');
			}

			EventEmitter.prototype._logError.apply(this, msg);
		},

		/**
		 * @typesign () -> cellx.Cell;
		 */
		dispose: function dispose() {
			if (releasePlanned) {
				release();
			}

			this._dispose();

			return this;
		},

		/**
		 * @typesign ();
		 */
		_dispose: function _dispose() {
			var slaves = this._slaves;

			for (var i = 0, l = slaves.length; i < l; i++) {
				slaves[i]._dispose();
			}

			this.off();
		}
	});

	module.exports = Cell;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var ErrorLogger = __webpack_require__(1);

	var global = Function('return this;')();

	/**
	 * @typesign (cb: ());
	 */
	var nextTick;

	if (global.process && process.toString() == '[object process]' && process.nextTick) {
		nextTick = process.nextTick;
	} else if (global.setImmediate) {
		nextTick = function nextTick(cb) {
			setImmediate(cb);
		};
	} else if (global.Promise && Promise.toString().indexOf('[native code]') != -1) {
		var prm = Promise.resolve();

		nextTick = function nextTick(cb) {
			prm.then(function() {
				cb();
			});
		};
	} else {
		var queue;

		global.addEventListener('message', function() {
			if (queue) {
				var track = queue;

				queue = null;

				for (var i = 0, l = track.length; i < l; i++) {
					try {
						track[i]();
					} catch (err) {
						ErrorLogger.log(err);
					}
				}
			}
		});

		nextTick = function nextTick(cb) {
			if (queue) {
				queue.push(cb);
			} else {
				queue = [cb];
				postMessage('__tic__', '*');
			}
		};
	}

	module.exports = nextTick;


/***/ },
/* 15 */
/***/ function(module, exports) {

	function noop() {}

	var map = Array.prototype.map;
	var global = Function('return this;')();

	/**
	 * @typesign (...msg);
	 */
	function logError() {
		var console = global.console;

		(console && console.error || noop).call(console || global, map.call(arguments, function(part) {
			return part === Object(part) && part.stack || part;
		}).join(' '));
	}

	module.exports = logError;


/***/ }
/******/ ])
});
;