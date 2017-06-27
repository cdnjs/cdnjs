(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.cellx = factory());
}(this, (function () { 'use strict';

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

var uidCounter = 0;

/**
 * @typesign () -> string;
 */
function nextUID() {
	return String(++uidCounter);
}

var Symbol = Function('return this;')().Symbol;

if (!Symbol) {
	Symbol = function Symbol(key) {
		return '__' + key + '_' + Math.floor(Math.random() * 1e9) + '_' + nextUID() + '__';
	};

	Symbol.iterator = Symbol('Symbol.iterator');
}

var Symbol$1 = Symbol;

var UID = Symbol$1('cellx.uid');
var CELLS = Symbol$1('cellx.cells');

var global$1 = Function('return this;')();

/**
 * @typesign (a, b) -> boolean;
 */
var is = Object.is || function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a == 1 / b;
	}
	return a === b || (a != a && b != b);
};

var hasOwn = Object.prototype.hasOwnProperty;

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

var extend;

/**
 * @typesign (description: {
 *     Extends?: Function,
 *     Implements?: Array<Object | Function>,
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

	var proto = constr.prototype = Object.create(parent.prototype);

	if (description.Implements) {
		description.Implements.forEach((function(implementation) {
			if (typeof implementation == 'function') {
				Object.keys(implementation).forEach((function(name) {
					Object.defineProperty(constr, name, Object.getOwnPropertyDescriptor(implementation, name));
				}));

				mixin(proto, implementation.prototype);
			} else {
				mixin(proto, implementation);
			}
		}));

		delete description.Implements;
	}

	Object.keys(parent).forEach((function(name) {
		Object.defineProperty(constr, name, Object.getOwnPropertyDescriptor(parent, name));
	}));

	if (description.Static) {
		mixin(constr, description.Static);
		delete description.Static;
	}

	if (constr.extend === undefined) {
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
 *     Implements?: Array<Object | Function>,
 *     Static?: Object,
 *     constructor?: Function,
 *     [key: string]
 * }) -> Function;
 */
extend = function extend(description) {
	description.Extends = this;
	return createClass(description);
};

var Map = global$1.Map;

if (!Map) {
	var entryStub = {
		value: undefined
	};

	Map = createClass({
		constructor: function Map(entries) {
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
			if (!hasOwn.call(obj, UID)) {
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

				Object.defineProperty(obj, UID, {
					value: nextUID()
				});
			}

			return obj[UID];
		},

		forEach: function forEach(cb, context) {
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
	].forEach((function(settings) {
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
	}));
}

if (!Map.prototype[Symbol$1.iterator]) {
	Map.prototype[Symbol$1.iterator] = Map.prototype.entries;
}

var Map$1 = Map;

var KEY_INNER = Symbol$1('cellx.EventEmitter.inner');

var IS_EVENT = {};

/**
 * @typedef {{
 *     listener: (evt: cellx~Event) -> ?boolean,
 *     context
 * }} cellx~EmitterEvent
 */

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
		 * @type {{ [type: string]: cellx~EmitterEvent | Array<cellx~EmitterEvent> }}
		 */
		this._events = new Map$1();
	},

	/**
	 * @typesign () -> { [type: string]: Array<cellx~EmitterEvent> };
	 * @typesign (type: string) -> Array<cellx~EmitterEvent>;
	 */
	getEvents: function getEvents(type) {
		var events;

		if (type) {
			events = this._events.get(type);

			if (!events) {
				return [];
			}

			return events._isEvent === IS_EVENT ? [events] : events;
		}

		events = Object.create(null);

		this._events.forEach((function(typeEvents, type) {
			events[type] = typeEvents._isEvent === IS_EVENT ? [typeEvents] : typeEvents;
		}));

		return events;
	},

	/**
	 * @typesign (
	 *     type: string,
	 *     listener: (evt: cellx~Event) -> ?boolean,
	 *     context?
	 * ) -> cellx.EventEmitter;
	 *
	 * @typesign (
	 *     listeners: { [type: string]: (evt: cellx~Event) -> ?boolean },
	 *     context?
	 * ) -> cellx.EventEmitter;
	 */
	on: function on(type, listener, context) {
		if (typeof type == 'object') {
			context = arguments.length >= 2 ? listener : this;

			var listeners = type;

			for (type in listeners) {
				this._on(type, listeners[type], context);
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
	 *     listeners: { [type: string]: (evt: cellx~Event) -> ?boolean },
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
					this._off(type, listeners[type], context);
				}
			} else {
				this._off(type, listener, argCount >= 3 ? context : this);
			}
		} else {
			this._events.clear();
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
			var propName = type.slice(index + 1);

			(this['_' + propName] || (this[propName], this['_' + propName]))
				.on(type.slice(0, index), listener, context);
		} else {
			var events = this._events.get(type);
			var evt = {
				_isEvent: IS_EVENT,
				listener: listener,
				context: context
			};

			if (!events) {
				this._events.set(type, evt);
			} else if (events._isEvent === IS_EVENT) {
				this._events.set(type, [events, evt]);
			} else {
				events.push(evt);
			}
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
			var propName = type.slice(index + 1);

			(this['_' + propName] || (this[propName], this['_' + propName]))
				.off(type.slice(0, index), listener, context);
		} else {
			var events = this._events.get(type);

			if (!events) {
				return;
			}

			var isEvent = events._isEvent === IS_EVENT;
			var evt;

			if (isEvent || events.length == 1) {
				evt = isEvent ? events : events[0];

				if ((evt.listener == listener || evt.listener[KEY_INNER] === listener) && evt.context === context) {
					this._events.delete(type);
				}
			} else {
				for (var i = events.length; i;) {
					evt = events[--i];

					if ((evt.listener == listener || evt.listener[KEY_INNER] === listener) && evt.context === context) {
						events.splice(i, 1);
						break;
					}
				}
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

		this._handleEvent(evt);

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
	 * View.prototype = {
	 *     __proto__: EventEmitter.prototype,
	 *     constructor: View,
	 *
	 *     getParent: function() {
	 *         var node = this.element;
	 *
	 *         while (node = node.parentNode) {
	 *             if (node._view) {
	 *                 return node._view;
	 *             }
	 *         }
	 *
	 *         return null;
	 *     },
	 *
	 *     _handleEvent: function(evt) {
	 *         EventEmitter.prototype._handleEvent.call(this, evt);
	 *
	 *         if (evt.bubbles !== false && !evt.isPropagationStopped) {
	 *             var parent = this.getParent();
	 *
	 *             if (parent) {
	 *                 parent._handleEvent(evt);
	 *             }
	 *         }
	 *     }
	 * };
	 */
	_handleEvent: function _handleEvent(evt) {
		var events = this._events.get(evt.type);

		if (!events) {
			return;
		}

		if (events._isEvent === IS_EVENT) {
			if (this._tryEventListener(events, evt) === false) {
				evt.isPropagationStopped = true;
			}
		} else {
			var eventCount = events.length;

			if (eventCount == 1) {
				if (this._tryEventListener(events[0], evt) === false) {
					evt.isPropagationStopped = true;
				}
			} else {
				events = events.slice();

				for (var i = 0; i < eventCount; i++) {
					if (this._tryEventListener(events[i], evt) === false) {
						evt.isPropagationStopped = true;
					}
				}
			}
		}
	},

	/**
	 * @typesign (emEvt: cellx~EmitterEvent, evt: cellx~Event);
	 */
	_tryEventListener: function _tryEventListener(emEvt, evt) {
		try {
			return emEvt.listener.call(emEvt.context, evt);
		} catch (err) {
			this._logError(err);
		}
	},

	/**
	 * @typesign (...msg);
	 */
	_logError: function _logError() {
		ErrorLogger.log.apply(ErrorLogger, arguments);
	}
});

var ObservableCollectionMixin = EventEmitter.extend({
	constructor: function ObservableCollectionMixin() {
		/**
		 * @type {Map<*, uint>}
		 */
		this._valueCounts = new Map$1();
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

			if (this.adoptsValueChanges && value instanceof EventEmitter) {
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

			if (this.adoptsValueChanges && value instanceof EventEmitter) {
				value.off('change', this._onItemChange, this);
			}
		}
	}
});

/**
 * @class cellx.ObservableMap
 * @extends {cellx.EventEmitter}
 * @implements {cellx.ObservableCollectionMixin}
 *
 * @typesign new ObservableMap(entries?: Object | cellx.ObservableMap | Map | Array<{ 0, 1 }>, opts?: {
 *     adoptsValueChanges?: boolean
 * }) -> cellx.ObservableMap;
 *
 * @typesign new ObservableMap(
 *     entries?: Object | cellx.ObservableMap | Map | Array<{ 0, 1 }>,
 *     adoptsValueChanges?: boolean
 * ) -> cellx.ObservableMap;
 */
var ObservableMap = EventEmitter.extend({
	Implements: [ObservableCollectionMixin],

	constructor: function ObservableMap(entries, opts) {
		EventEmitter.call(this);
		ObservableCollectionMixin.call(this);

		if (typeof opts == 'boolean') {
			opts = { adoptsValueChanges: opts };
		}

		this._entries = new Map$1();

		this.size = 0;

		/**
		 * @type {boolean}
		 */
		this.adoptsValueChanges = !!(opts && opts.adoptsValueChanges);

		if (entries) {
			var mapEntries = this._entries;

			if (entries instanceof ObservableMap || entries instanceof Map$1) {
				entries._entries.forEach((function(value, key) {
					this._registerValue(value);
					mapEntries.set(key, value);
				}), this);
			} else if (Array.isArray(entries)) {
				for (var i = 0, l = entries.length; i < l; i++) {
					var entry = entries[i];

					this._registerValue(entry[1]);
					mapEntries.set(entry[0], entry[1]);
				}
			} else {
				for (var key in entries) {
					this._registerValue(entries[key]);
					mapEntries.set(key, entries[key]);
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
	delete: function delete_(key) {
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
			value: undefined
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

		if (this.adoptsValueChanges) {
			this._valueCounts.forEach((function(value) {
				if (value instanceof EventEmitter) {
					value.off('change', this._onItemChange, this);
				}
			}), this);
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
		this._entries.forEach((function(value, key) {
			cb.call(context, value, key, this);
		}), this);
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
			adoptsValueChanges: this.adoptsValueChanges
		});
	}
});

ObservableMap.prototype[Symbol$1.iterator] = ObservableMap.prototype.entries;

var slice = Array.prototype.slice;
var push = Array.prototype.push;
var splice = Array.prototype.splice;
var map$1 = Array.prototype.map;

/**
 * @typesign (a, b) -> 0 | -1 | 1;
 */
function defaultComparator(a, b) {
	if (a < b) { return -1; }
	if (a > b) { return 1; }
	return 0;
}

/**
 * @class cellx.ObservableList
 * @extends {cellx.EventEmitter}
 * @implements {cellx.ObservableCollectionMixin}
 *
 * @typesign new ObservableList(items?: Array | cellx.ObservableList, opts?: {
 *     adoptsValueChanges?: boolean,
 *     comparator?: (a, b) -> int,
 *     sorted?: boolean
 * }) -> cellx.ObservableList;
 *
 * @typesign new ObservableList(
 *     items?: Array | cellx.ObservableList,
 *     adoptsValueChanges?: boolean
 * ) -> cellx.ObservableList;
 */
var ObservableList = EventEmitter.extend({
	Implements: [ObservableCollectionMixin],

	constructor: function ObservableList(items, opts) {
		EventEmitter.call(this);
		ObservableCollectionMixin.call(this);

		if (typeof opts == 'boolean') {
			opts = { adoptsValueChanges: opts };
		}

		this._items = [];

		this.length = 0;

		/**
		 * @type {boolean}
		 */
		this.adoptsValueChanges = !!(opts && opts.adoptsValueChanges);

		/**
		 * @type {?(a, b) -> int}
		 */
		this.comparator = null;

		this.sorted = false;

		if (opts && (opts.sorted || (opts.comparator && opts.sorted !== false))) {
			this.comparator = opts.comparator || defaultComparator;
			this.sorted = true;
		}

		if (items) {
			this._addRange(items);
		}
	},

	/**
	 * @typesign (index: ?int, allowedEndIndex?: boolean) -> ?uint;
	 */
	_validateIndex: function _validateIndex(index, allowedEndIndex) {
		if (index === undefined) {
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
		return this._items.indexOf(value, this._validateIndex(fromIndex, true));
	},

	/**
	 * @typesign (value, fromIndex?: int) -> int;
	 */
	lastIndexOf: function lastIndexOf(value, fromIndex) {
		return this._items.lastIndexOf(value, fromIndex === undefined ? -1 : this._validateIndex(fromIndex, true));
	},

	/**
	 * @typesign (index: int) -> *;
	 */
	get: function get(index) {
		return this._items[this._validateIndex(index, true)];
	},

	/**
	 * @typesign (index: int, count?: uint) -> Array;
	 */
	getRange: function getRange(index, count) {
		index = this._validateIndex(index, true);

		var items = this._items;

		if (count === undefined) {
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

		index = this._validateIndex(index, true);

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
	 * @typesign (index: int, values: Array | cellx.ObservableList) -> cellx.ObservableList;
	 */
	setRange: function setRange(index, values) {
		if (this.sorted) {
			throw new TypeError('Cannot set to sorted list');
		}

		index = this._validateIndex(index, true);

		if (values instanceof ObservableList) {
			values = values._items;
		}

		var valueCount = values.length;

		if (!valueCount) {
			return this;
		}

		if (index + valueCount > this.length) {
			throw new RangeError('Sum of "index" and "values.length" out of valid range');
		}

		var items = this._items;
		var changed = false;

		for (var i = index + valueCount; i > index;) {
			var value = values[--i - index];

			if (!is(value, items[i])) {
				this._unregisterValue(items[i]);
				this._registerValue(value);
				items[i] = value;
				changed = true;
			}
		}

		if (changed) {
			this.emit('change');
		}

		return this;
	},

	/**
	 * @typesign (value) -> cellx.ObservableList;
	 */
	add: function add(value) {
		if (this.sorted) {
			this._insertValue(value);
		} else {
			this._registerValue(value);
			this._items.push(value);
		}

		this.length++;

		this.emit('change');

		return this;
	},

	/**
	 * @typesign (values: Array | cellx.ObservableList) -> cellx.ObservableList;
	 */
	addRange: function addRange(values) {
		if (values.length) {
			this._addRange(values);
			this.emit('change');
		}

		return this;
	},

	/**
	 * @typesign (values: Array | cellx.ObservableList);
	 */
	_addRange: function _addRange(values) {
		if (values instanceof ObservableList) {
			values = values._items;
		}

		if (this.sorted) {
			for (var i = 0, l = values.length; i < l; i++) {
				this._insertValue(values[i]);
			}

			this.length += values.length;
		} else {
			for (var j = values.length; j;) {
				this._registerValue(values[--j]);
			}

			this.length = push.apply(this._items, values);
		}
	},

	/**
	 * @typesign (value);
	 */
	_insertValue: function _insertValue(value) {
		this._registerValue(value);

		var items = this._items;
		var comparator = this.comparator;
		var low = 0;
		var high = items.length;

		while (low != high) {
			var mid = (low + high) >> 1;

			if (comparator(value, items[mid]) < 0) {
				high = mid;
			} else {
				low = mid + 1;
			}
		}

		items.splice(low, 0, value);
	},

	/**
	 * @typesign (index: int, value) -> cellx.ObservableList;
	 */
	insert: function insert(index, value) {
		if (this.sorted) {
			throw new TypeError('Cannot insert to sorted list');
		}

		index = this._validateIndex(index, true);

		this._registerValue(value);
		this._items.splice(index, 0, value);
		this.length++;

		this.emit('change');

		return this;
	},

	/**
	 * @typesign (index: int, values: Array | cellx.ObservableList) -> cellx.ObservableList;
	 */
	insertRange: function insertRange(index, values) {
		if (this.sorted) {
			throw new TypeError('Cannot insert to sorted list');
		}

		index = this._validateIndex(index, true);

		if (values instanceof ObservableList) {
			values = values._items;
		}

		var valueCount = values.length;

		if (!valueCount) {
			return this;
		}

		for (var i = valueCount; i;) {
			this._registerValue(values[--i]);
		}

		splice.apply(this._items, [index, 0].concat(values));
		this.length += valueCount;

		this.emit('change');

		return this;
	},

	/**
	 * @typesign (value, fromIndex?: int) -> boolean;
	 */
	remove: function remove(value, fromIndex) {
		var index = this._items.indexOf(value, this._validateIndex(fromIndex, true));

		if (index == -1) {
			return false;
		}

		this._unregisterValue(value);
		this._items.splice(index, 1);
		this.length--;

		this.emit('change');

		return true;
	},

	/**
	 * @typesign (value, fromIndex?: int) -> boolean;
	 */
	removeAll: function removeAll(value, fromIndex) {
		var index = this._validateIndex(fromIndex, true);
		var items = this._items;
		var changed = false;

		while ((index = items.indexOf(value, index)) != -1) {
			this._unregisterValue(value);
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
	 * @typesign (values: Array | cellx.ObservableList, fromIndex?: int) -> boolean;
	 */
	removeEach: function removeEach(values, fromIndex) {
		fromIndex = this._validateIndex(fromIndex, true);

		if (values instanceof ObservableList) {
			values = values._items;
		}

		var items = this._items;
		var changed = false;

		for (var i = 0, l = values.length; i < l; i++) {
			var value = values[i];
			var index = items.indexOf(value, fromIndex);

			if (index != -1) {
				this._unregisterValue(value);
				items.splice(index, 1);
				changed = true;
			}
		}

		if (changed) {
			this.length = items.length;
			this.emit('change');
		}

		return changed;
	},

	/**
	 * @typesign (values: Array | cellx.ObservableList, fromIndex?: int) -> boolean;
	 */
	removeAllEach: function removeAllEach(values, fromIndex) {
		fromIndex = this._validateIndex(fromIndex, true);

		if (values instanceof ObservableList) {
			values = values._items;
		}

		var items = this._items;
		var changed = false;

		for (var i = 0, l = values.length; i < l; i++) {
			var value = values[i];

			for (var index = fromIndex; (index = items.indexOf(value, index)) != -1;) {
				this._unregisterValue(value);
				items.splice(index, 1);
				changed = true;
			}
		}

		if (changed) {
			this.length = items.length;
			this.emit('change');
		}

		return changed;
	},

	/**
	 * @typesign (index: int) -> *;
	 */
	removeAt: function removeAt(index) {
		var value = this._items.splice(this._validateIndex(index), 1)[0];
		this._unregisterValue(value);
		this.length--;

		this.emit('change');

		return value;
	},

	/**
	 * @typesign (index: int, count?: uint) -> Array;
	 */
	removeRange: function removeRange(index, count) {
		index = this._validateIndex(index, true);

		var items = this._items;

		if (count === undefined) {
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
		var values = items.splice(index, count);
		this.length -= count;

		this.emit('change');

		return values;
	},

	/**
	 * @typesign () -> cellx.ObservableList;
	 */
	clear: function clear() {
		if (!this.length) {
			return this;
		}

		if (this.adoptsValueChanges) {
			this._valueCounts.forEach((function(value) {
				if (value instanceof EventEmitter) {
					value.off('change', this._onItemChange, this);
				}
			}), this);
		}

		this._items.length = 0;
		this._valueCounts.clear();

		this.length = 0;

		this.emit({
			type: 'change',
			subtype: 'clear'
		});

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
			adoptsValueChanges: this.adoptsValueChanges,
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

['forEach', 'map', 'filter', 'every', 'some'].forEach((function(name) {
	ObservableList.prototype[name] = function(cb, context) {
		return this._items[name]((function(item, index) {
			return cb.call(context, item, index, this);
		}), this);
	};
}));

['reduce', 'reduceRight'].forEach((function(name) {
	ObservableList.prototype[name] = function(cb, initialValue) {
		var items = this._items;
		var list = this;

		function wrapper(accumulator, item, index) {
			return cb(accumulator, item, index, list);
		}

		return arguments.length >= 2 ? items[name](wrapper, initialValue) : items[name](wrapper);
	};
}));

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
].forEach((function(settings) {
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
					value: undefined,
					done: true
				};
			}
		};
	};
}));

ObservableList.prototype[Symbol$1.iterator] = ObservableList.prototype.values;

/**
 * @typesign (cb: ());
 */
var nextTick;

/* istanbul ignore next */
if (global$1.process && process.toString() == '[object process]' && process.nextTick) {
	nextTick = process.nextTick;
} else if (global$1.setImmediate) {
	nextTick = function nextTick(cb) {
		setImmediate(cb);
	};
} else if (global$1.Promise && Promise.toString().indexOf('[native code]') != -1) {
	var prm = Promise.resolve();

	nextTick = function nextTick(cb) {
		prm.then((function() {
			cb();
		}));
	};
} else {
	var queue;

	global$1.addEventListener('message', (function() {
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
	}));

	nextTick = function nextTick(cb) {
		if (queue) {
			queue.push(cb);
		} else {
			queue = [cb];
			postMessage('__tic__', '*');
		}
	};
}

var nextTick$1 = nextTick;

function noop() {}

var EventEmitterProto = EventEmitter.prototype;

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 0x1fffffffffffff;
var KEY_INNER$1 = EventEmitter.KEY_INNER;

var errorIndexCounter = 0;
var pushingIndexCounter = 0;

var releasePlan = new Map$1();
var releasePlanIndex = MAX_SAFE_INTEGER;
var releasePlanToIndex = -1;
var releasePlanned = false;
var currentlyRelease = false;
var currentCell = null;
var error = { original: null };
var releaseVersion = 1;

var transactionLevel = 0;
var transactionFailure = false;
var pendingReactions = [];

var afterReleaseCallbacks;

function release() {
	if (!releasePlanned) {
		return;
	}

	releasePlanned = false;
	currentlyRelease = true;

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

		var level = cell._level;
		var changeEvent = cell._changeEvent;

		if (!changeEvent) {
			if (level > releasePlanIndex || cell._levelInRelease == -1) {
				if (!queue.length) {
					if (releasePlanIndex == releasePlanToIndex) {
						break;
					}

					queue = releasePlan.get(++releasePlanIndex);
				}

				continue;
			}

			cell.pull();

			level = cell._level;
			changeEvent = cell._changeEvent;

			if (level > releasePlanIndex) {
				if (!queue.length) {
					queue = releasePlan.get(++releasePlanIndex);
				}

				continue;
			}
		}

		cell._levelInRelease = -1;

		if (changeEvent) {
			var oldReleasePlanIndex = releasePlanIndex;

			cell._fixedValue = cell._value;
			cell._changeEvent = null;

			cell._handleEvent(changeEvent);

			var pushingIndex = cell._pushingIndex;
			var slaves = cell._slaves;

			for (var i = 0, l = slaves.length; i < l; i++) {
				var slave = slaves[i];

				if (slave._level <= level) {
					slave._level = level + 1;
				}

				if (pushingIndex >= slave._pushingIndex) {
					slave._pushingIndex = pushingIndex;
					slave._changeEvent = null;

					slave._addToRelease();
				}
			}

			if (releasePlanIndex != oldReleasePlanIndex) {
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

	releasePlanIndex = MAX_SAFE_INTEGER;
	releasePlanToIndex = -1;
	currentlyRelease = false;
	releaseVersion++;

	if (afterReleaseCallbacks) {
		var callbacks = afterReleaseCallbacks;

		afterReleaseCallbacks = null;

		for (var j = 0, m = callbacks.length; j < m; j++) {
			callbacks[j]();
		}
	}
}

/**
 * @typesign (value);
 */
function defaultPut(value, push$$1) {
	push$$1(value);
}

var config = {
	asynchronous: true
};

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
 *     put?: (value, push: (value), fail: (err)),
 *     reap?: (),
 *     onChange?: (evt: cellx~Event) -> ?boolean,
 *     onError?: (evt: cellx~Event) -> ?boolean
 * }) -> cellx.Cell;
 *
 * @typesign new Cell(pull: (push: (value), fail: (err), next) -> *, opts?: {
 *     debugKey?: string,
 *     owner?: Object,
 *     get?: (value) -> *,
 *     validate?: (value, oldValue),
 *     merge: (value, oldValue) -> *,
 *     put?: (value, push: (value), fail: (err)),
 *     reap?: (),
 *     onChange?: (evt: cellx~Event) -> ?boolean,
 *     onError?: (evt: cellx~Event) -> ?boolean
 * }) -> cellx.Cell;
 */
var Cell = EventEmitter.extend({
	Static: {
		_nextTick: nextTick$1,

		/**
		 * @typesign (cnfg: { asynchronous?: boolean });
		 */
		configure: function configure(cnfg) {
			if (cnfg.asynchronous !== undefined) {
				if (releasePlanned) {
					release();
				}

				config.asynchronous = cnfg.asynchronous;
			}
		},

		/**
		 * @typesign (cb: (), context?) -> ();
		 */
		autorun: function autorun(cb, context) {
			var disposer;

			new Cell(function() {
				var cell = this;

				if (!disposer) {
					disposer = function disposer() {
						cell.dispose();
					};
				}

				if (transactionLevel) {
					var index = pendingReactions.indexOf(this);

					if (index > -1) {
						pendingReactions.splice(index, 1);
					}

					pendingReactions.push(this);
				} else {
					cb.call(context, disposer);
				}
			}, { onChange: noop });

			return disposer;
		},

		/**
		 * @typesign ();
		 */
		forceRelease: function forceRelease() {
			if (releasePlanned) {
				release();
			}
		},

		/**
		 * @typesign (cb: ());
		 */
		transaction: function transaction(cb) {
			if (!transactionLevel++ && releasePlanned) {
				release();
			}

			try {
				cb();
			} catch (err) {
				ErrorLogger.log(err);
				transactionFailure = true;
			}

			if (transactionFailure) {
				for (var iterator = releasePlan.values(), step; !(step = iterator.next()).done;) {
					var queue = step.value;

					for (var i = queue.length; i;) {
						var cell = queue[--i];
						cell._value = cell._fixedValue;
						cell._levelInRelease = -1;
						cell._changeEvent = null;
					}
				}

				releasePlan.clear();
				releasePlanIndex = MAX_SAFE_INTEGER;
				releasePlanToIndex = -1;
				releasePlanned = false;
				pendingReactions.length = 0;
			}

			if (!--transactionLevel && !transactionFailure) {
				for (var i = 0, l = pendingReactions.length; i < l; i++) {
					var reaction = pendingReactions[i];

					if (reaction instanceof Cell) {
						reaction.pull();
					} else {
						EventEmitterProto._handleEvent.call(reaction[1], reaction[0]);
					}
				}

				transactionFailure = false;
				pendingReactions.length = 0;

				if (releasePlanned) {
					release();
				}
			}
		},

		/**
		 * @typesign (cb: ());
		 */
		afterRelease: function afterRelease(cb) {
			(afterReleaseCallbacks || (afterReleaseCallbacks = [])).push(cb);
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

		var push$$1 = this.push;
		var fail = this.fail;

		this.push = function(value) { push$$1.call(cell, value); };
		this.fail = function(err) { fail.call(cell, err); };

		this._onFulfilled = this._onRejected = null;

		this._reap = opts.reap || null;

		if (this._pull) {
			this._fixedValue = this._value = undefined;
		} else {
			if (this._validate) {
				this._validate(value, undefined);
			}
			if (this._merge) {
				value = this._merge(value, undefined);
			}

			this._fixedValue = this._value = value;

			if (value instanceof EventEmitter) {
				value.on('change', this._onValueChange, this);
			}
		}

		this._error = null;
		this._selfErrorCell = null;
		this._errorCell = null;

		this._inited = false;
		this._currentlyPulling = false;
		this._active = false;
		this._hasFollowers = false;

		this._errorIndex = 0;
		this._pushingIndex = 0;
		this._version = 0;

		/**
		 * Ведущие ячейки.
		 * @type {?Array<cellx.Cell>}
		 */
		this._masters = undefined;
		/**
		 * Ведомые ячейки.
		 * @type {Array<cellx.Cell>}
		 */
		this._slaves = [];

		this._level = 0;
		this._levelInRelease = -1;

		this._pending = false;
		this._selfPendingStatusCell = null;
		this._pendingStatusCell = null;

		this._status = null;

		this._fulfilled = false;
		this._rejected = false;

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

	_handleEvent: function _handleEvent(evt) {
		if (transactionLevel) {
			pendingReactions.push([evt, this]);
		} else {
			EventEmitterProto._handleEvent.call(this, evt);
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
			EventEmitterProto.on.call(this, type, arguments.length >= 2 ? listener : this.owner);
		} else {
			EventEmitterProto.on.call(this, type, listener, arguments.length >= 3 ? context : this.owner);
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
				EventEmitterProto.off.call(this, type, argCount >= 2 ? listener : this.owner);
			} else {
				EventEmitterProto.off.call(this, type, listener, argCount >= 3 ? context : this.owner);
			}
		} else {
			EventEmitterProto.off.call(this);
		}

		if (!this._slaves.length && !this._events.has('change') && !this._events.has('error') && this._hasFollowers) {
			this._hasFollowers = false;

			this._deactivate();

			if (this._reap) {
				this._reap.call(this.owner);
			}
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
		wrapper[KEY_INNER$1] = listener;

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

		if (!this._slaves.length && !this._events.has('change') && !this._events.has('error')) {
			this._hasFollowers = false;

			this._deactivate();

			if (this._reap) {
				this._reap.call(this.owner);
			}
		}
	},

	/**
	 * @typesign ();
	 */
	_activate: function _activate() {
		if (!this._pull || this._active || this._masters === null) {
			return;
		}

		var masters = this._masters;

		if (this._version < releaseVersion) {
			var value = this._tryPull();

			if (masters || this._masters || !this._inited) {
				if (value === error) {
					this._fail(error.original, false);
				} else {
					this._push(value, false, false);
				}
			}

			masters = this._masters;
		}

		if (masters) {
			var i = masters.length;

			do {
				masters[--i]._registerSlave(this);
			} while (i);

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
		var i = masters.length;

		do {
			masters[--i]._unregisterSlave(this);
		} while (i);

		if (this._levelInRelease != -1 && !this._changeEvent) {
			this._levelInRelease = -1;
		}

		this._active = false;
	},

	/**
	 * @typesign ();
	 */
	_addToRelease: function _addToRelease() {
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

			if (!transactionLevel && !config.asynchronous) {
				release();
			} else {
				Cell._nextTick(release);
			}
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
	 * @typesign () -> *;
	 */
	get: function get() {
		if (releasePlanned && this._pull) {
			release();
		}

		if (this._pull && !this._active && this._version < releaseVersion && this._masters !== null) {
			var oldMasters = this._masters;
			var value = this._tryPull();
			var masters = this._masters;

			if (oldMasters || masters || !this._inited) {
				if (masters && this._hasFollowers) {
					var i = masters.length;

					do {
						masters[--i]._registerSlave(this);
					} while (i);

					this._active = true;
				}

				if (value === error) {
					this._fail(error.original, false);
				} else {
					this._push(value, false, false);
				}
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
	 * @typesign () -> boolean;
	 */
	pull: function pull() {
		if (!this._pull) {
			return false;
		}

		if (releasePlanned) {
			release();
		}

		var hasFollowers = this._hasFollowers;

		var oldMasters;
		var oldLevel;

		if (hasFollowers) {
			oldMasters = this._masters;
			oldLevel = this._level;
		}

		var value = this._tryPull();

		if (hasFollowers) {
			var masters = this._masters;
			var newMasterCount = 0;

			if (masters) {
				var i = masters.length;

				do {
					var master = masters[--i];

					if (!oldMasters || oldMasters.indexOf(master) == -1) {
						master._registerSlave(this);
						newMasterCount++;
					}
				} while (i);
			}

			if (oldMasters && (masters ? masters.length - newMasterCount : 0) < oldMasters.length) {
				for (var j = oldMasters.length; j;) {
					var oldMaster = oldMasters[--j];

					if (!masters || masters.indexOf(oldMaster) == -1) {
						oldMaster._unregisterSlave(this);
					}
				}
			}

			this._active = !!(masters && masters.length);

			if (currentlyRelease && this._level > oldLevel) {
				this._addToRelease();
				return false;
			}
		}

		if (value === error) {
			this._fail(error.original, false);
			return true;
		}

		return this._push(value, false, true);
	},

	/**
	 * @typesign () -> *;
	 */
	_tryPull: function _tryPull() {
		if (this._currentlyPulling) {
			throw new TypeError('Circular pulling detected');
		}

		var pull = this._pull;

		if (pull.length) {
			this._pending = true;
			if (this._selfPendingStatusCell) {
				this._selfPendingStatusCell.set(true);
			}

			this._fulfilled = this._rejected = false;
		}

		var prevCell = currentCell;
		currentCell = this;

		this._currentlyPulling = true;
		this._masters = null;
		this._level = 0;

		try {
			return pull.length ? pull.call(this.owner, this.push, this.fail, this._value) : pull.call(this.owner);
		} catch (err) {
			error.original = err;
			return error;
		} finally {
			currentCell = prevCell;

			this._version = releaseVersion + currentlyRelease;

			var pendingStatusCell = this._pendingStatusCell;

			if (pendingStatusCell && pendingStatusCell._active) {
				pendingStatusCell.pull();
			}

			var errorCell = this._errorCell;

			if (errorCell && errorCell._active) {
				errorCell.pull();
			}

			this._currentlyPulling = false;
		}
	},

	/**
	 * @typesign () -> ?Error;
	 */
	getError: function getError() {
		var errorCell = this._errorCell;

		if (!errorCell) {
			var debugKey = this.debugKey;

			this._selfErrorCell = new Cell(this._error, debugKey ? { debugKey: debugKey + '._selfErrorCell' } : null);

			errorCell = this._errorCell = new Cell(function() {
				this.get();

				var err = this._selfErrorCell.get();
				var index;

				if (err) {
					index = this._errorIndex;

					if (index == errorIndexCounter) {
						return err;
					}
				}

				var masters = this._masters;

				if (masters) {
					var i = masters.length;

					do {
						var master = masters[--i];
						var masterError = master.getError();

						if (masterError) {
							var masterErrorIndex = master._errorIndex;

							if (masterErrorIndex == errorIndexCounter) {
								return masterError;
							}

							if (!err || index < masterErrorIndex) {
								err = masterError;
								index = masterErrorIndex;
							}
						}
					} while (i);
				}

				return err;
			}, debugKey ? { debugKey: debugKey + '._errorCell', owner: this } : { owner: this });
		}

		return errorCell.get();
	},

	/**
	 * @typesign () -> boolean;
	 */
	isPending: function isPending() {
		var pendingStatusCell = this._pendingStatusCell;

		if (!pendingStatusCell) {
			var debugKey = this.debugKey;

			this._selfPendingStatusCell = new Cell(
				this._pending,
				debugKey ? { debugKey: debugKey + '._selfPendingStatusCell' } : null
			);

			pendingStatusCell = this._pendingStatusCell = new Cell(function() {
				if (this._selfPendingStatusCell.get()) {
					return true;
				}

				this.get();

				var masters = this._masters;

				if (masters) {
					var i = masters.length;

					do {
						if (masters[--i].isPending()) {
							return true;
						}
					} while (i);
				}

				return false;
			}, debugKey ? { debugKey: debugKey + '._pendingStatusCell', owner: this } : { owner: this });
		}

		return pendingStatusCell.get();
	},

	getStatus: function getStatus() {
		var status = this._status;

		if (!status) {
			var cell = this;

			status = this._status = {
				get success() {
					return !cell.getError();
				},

				get pending() {
					return cell.isPending();
				}
			};
		}

		return status;
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

		this._pending = true;
		if (this._selfPendingStatusCell) {
			this._selfPendingStatusCell.set(true);
		}

		this._fulfilled = this._rejected = false;

		if (this._put.length >= 2) {
			this._put.call(this.owner, value, this.push, this.fail, oldValue);
		} else {
			this._put.call(this.owner, value);
		}

		return this;
	},

	/**
	 * @typesign (value) -> cellx.Cell;
	 */
	push: function push$$1(value) {
		this._push(value, true, false);
		return this;
	},

	/**
	 * @typesign (value, external: boolean, pulling: boolean) -> boolean;
	 */
	_push: function _push(value, external, pulling) {
		this._inited = true;

		var oldValue = this._value;

		if (external && currentlyRelease && this._hasFollowers) {
			if (is(value, oldValue)) {
				this._setError(null);
				this._fulfill(value);
				return false;
			}

			var cell = this;

			(afterReleaseCallbacks || (afterReleaseCallbacks = [])).push((function() {
				cell._push(value, true, false);
			}));

			return true;
		}

		if (external || !currentlyRelease && pulling) {
			this._pushingIndex = ++pushingIndexCounter;
		}

		this._setError(null);

		if (is(value, oldValue)) {
			if (external || currentlyRelease && pulling) {
				this._fulfill(value);
			}

			return false;
		}

		this._value = value;

		if (oldValue instanceof EventEmitter) {
			oldValue.off('change', this._onValueChange, this);
		}
		if (value instanceof EventEmitter) {
			value.on('change', this._onValueChange, this);
		}

		if (this._hasFollowers || transactionLevel) {
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
			if (external || !currentlyRelease && pulling) {
				releaseVersion++;
			}

			this._fixedValue = value;
			this._version = releaseVersion + currentlyRelease;
		}

		if (external || currentlyRelease && pulling) {
			this._fulfill(value);
		}

		return true;
	},

	/**
	 * @typesign (value);
	 */
	_fulfill: function _fulfill(value) {
		this._resolvePending();

		if (!this._fulfilled) {
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
		this._fail(err, true);
		return this;
	},

	/**
	 * @typesign (err, external: boolean);
	 */
	_fail: function _fail(err, external) {
		if (transactionLevel) {
			transactionFailure = true;
		}

		this._logError(err);

		if (!(err instanceof Error)) {
			err = new Error(String(err));
		}

		this._setError(err);

		if (external) {
			this._reject(err);
		}
	},

	/**
	 * @typesign (err: ?Error);
	 */
	_setError: function _setError(err) {
		if (!err && !this._error) {
			return;
		}

		this._error = err;
		if (this._selfErrorCell) {
			this._selfErrorCell.set(err);
		}

		if (err) {
			this._errorIndex = ++errorIndexCounter;

			this._handleErrorEvent({
				type: 'error',
				error: err
			});
		}
	},

	/**
	 * @typesign (evt: cellx~Event{ error: Error });
	 */
	_handleErrorEvent: function _handleErrorEvent(evt) {
		if (this._lastErrorEvent === evt) {
			return;
		}

		this._lastErrorEvent = evt;
		this._handleEvent(evt);

		var slaves = this._slaves;

		for (var i = 0, l = slaves.length; i < l; i++) {
			slaves[i]._handleErrorEvent(evt);
		}
	},

	/**
	 * @typesign (err: Error);
	 */
	_reject: function _reject(err) {
		this._resolvePending();

		if (!this._rejected) {
			this._rejected = true;

			if (this._onRejected) {
				this._onRejected(err);
			}
		}
	},

	/**
	 * @typesign ();
	 */
	_resolvePending: function _resolvePending() {
		if (this._pending) {
			this._pending = false;

			if (this._selfPendingStatusCell) {
				this._selfPendingStatusCell.set(false);
			}
		}
	},

	/**
	 * @typesign (onFulfilled: ?(value) -> *, onRejected?: (err) -> *) -> Promise;
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

		if (cell.isPending()) {
			cell._pendingStatusCell.on('change', (function onPendingStatusCellChange() {
				cell._pendingStatusCell.off('change', onPendingStatusCellChange);

				if (!cell._fulfilled && !cell._rejected) {
					var err = cell.getError();

					if (err) {
						cell._reject(err);
					} else {
						cell._fulfill(cell._get ? cell._get(cell._value) : cell._value);
					}
				}
			}));
		}

		return promise;
	},

	/**
	 * @typesign (onRejected: (err) -> *) -> Promise;
	 */
	catch: function catch_(onRejected) {
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

		EventEmitterProto._logError.apply(this, msg);
	},

	/**
	 * @typesign () -> cellx.Cell;
	 */
	reap: function reap() {
		var slaves = this._slaves;

		for (var i = 0, l = slaves.length; i < l; i++) {
			slaves[i].reap();
		}

		return this.off();
	},

	/**
	 * @typesign () -> cellx.Cell;
	 */
	dispose: function dispose() {
		return this.reap();
	}
});

Cell.prototype[Symbol$1.iterator] = function() {
	return this._value[Symbol$1.iterator]();
};

/**
 * @typesign (...msg);
 */
function logError() {
	var console = global$1.console;

	(console && console.error || noop).call(console || global$1, map$1.call(arguments, (function(arg) {
		return arg === Object(arg) && arg.stack || arg;
	})).join(' '));
}

ErrorLogger.setHandler(logError);

var assign = Object.assign || function(target, source) {
	for (var name in source) {
		target[name] = source[name];
	}

	return target;
};

/**
 * @typesign (value?, opts?: {
 *     debugKey?: string,
 *     owner?: Object,
 *     validate?: (value, oldValue),
 *     put?: (value, push: (value), fail: (err), oldValue),
 *     reap?: (),
 *     onChange?: (evt: cellx~Event) -> ?boolean,
 *     onError?: (evt: cellx~Event) -> ?boolean
 * }) -> cellx;
 *
 * @typesign (pull: (push: (value), fail: (err), next) -> *, opts?: {
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

		if (!owner || owner == global$1) {
			owner = cx;
		}

		if (!hasOwn.call(owner, CELLS)) {
			Object.defineProperty(owner, CELLS, { value: new Map$1() });
		}

		var cell = owner[CELLS].get(cx);

		if (!cell) {
			if (value === 'dispose' && arguments.length >= 2) {
				return;
			}

			cell = new Cell(initialValue, assign({ owner: owner }, opts));

			owner[CELLS].set(cx, cell);
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
		cx.call(opts.owner || global$1);
	}

	return cx;
}

cellx.configure = function(config) {
	Cell.configure(config);
};

cellx.ErrorLogger = ErrorLogger;
cellx.EventEmitter = EventEmitter;
cellx.ObservableCollectionMixin = ObservableCollectionMixin;
cellx.ObservableMap = ObservableMap;
cellx.ObservableList = ObservableList;
cellx.Cell = Cell;
cellx.autorun = Cell.autorun;
cellx.transact = cellx.transaction = Cell.transaction;
cellx.KEY_UID = UID;
cellx.KEY_CELLS = CELLS;

/**
 * @typesign (
 *     entries?: Object | Array<{ 0, 1 }> | cellx.ObservableMap,
 *     opts?: { adoptsValueChanges?: boolean }
 * ) -> cellx.ObservableMap;
 *
 * @typesign (
 *     entries?: Object | Array<{ 0, 1 }> | cellx.ObservableMap,
 *     adoptsValueChanges?: boolean
 * ) -> cellx.ObservableMap;
 */
function map$$1(entries, opts) {
	return new ObservableMap(entries, opts);
}

cellx.map = map$$1;

/**
 * @typesign (items?: Array | cellx.ObservableList, opts?: {
 *     adoptsValueChanges?: boolean,
 *     comparator?: (a, b) -> int,
 *     sorted?: boolean
 * }) -> cellx.ObservableList;
 *
 * @typesign (items?: Array | cellx.ObservableList, adoptsValueChanges?: boolean) -> cellx.ObservableList;
 */
function list(items, opts) {
	return new ObservableList(items, opts);
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

cellx.defineObservableProperty = defineObservableProperty;

/**
 * @typesign (obj: cellx.EventEmitter, props: Object) -> cellx.EventEmitter;
 */
function defineObservableProperties(obj, props) {
	Object.keys(props).forEach((function(name) {
		defineObservableProperty(obj, name, props[name]);
	}));

	return obj;
}

cellx.defineObservableProperties = defineObservableProperties;

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

cellx.JS = cellx.js = {
	is: is,
	Symbol: Symbol$1,
	Map: Map$1
};

cellx.Utils = cellx.utils = {
	logError: logError,
	nextUID: nextUID,
	mixin: mixin,
	createClass: createClass,
	nextTick: nextTick$1,
	noop: noop
};

cellx.cellx = cellx;

cellx.__esModule = true;
cellx.default = cellx;

return cellx;

})));
