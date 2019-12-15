(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@riim/object-assign-polyfill'), require('@riim/map-set-polyfill'), require('@riim/logger'), require('@riim/symbol-polyfill'), require('@riim/is'), require('@riim/mixin'), require('@riim/next-tick')) :
	typeof define === 'function' && define.amd ? define(['@riim/object-assign-polyfill', '@riim/map-set-polyfill', '@riim/logger', '@riim/symbol-polyfill', '@riim/is', '@riim/mixin', '@riim/next-tick'], factory) :
	(global.cellx = factory(global.objectAssignPolyfill,global.mapSetPolyfill,global.errorLogger,global.symbolPolyfill,global.is,global.mixin,global.nextTick));
}(this, (function (objectAssignPolyfill,mapSetPolyfill,logger,symbolPolyfill,is,mixin,nextTick) { 'use strict';

/**
 * @typedef {{
 *     target?: Object,
 *     type: string,
 *     bubbles?: boolean,
 *     isPropagationStopped?: boolean
 * }} cellx~Event
 */

/**
 * @typedef {(evt: cellx~Event) -> ?boolean} cellx~Listener
 */

/**
 * @typedef {{
 *     listener: cellx~Listener,
 *     context
 * }} cellx~RegisteredEvent
 */

/**
 * @class cellx.EventEmitter
 * @extends {Object}
 * @typesign new EventEmitter();
 */
function EventEmitter() {
	/**
  * @type {{ [type: string]: cellx~RegisteredEvent | Array<cellx~RegisteredEvent> }}
  */
	this._events = new mapSetPolyfill.Map();
}

EventEmitter.currentlySubscribing = false;

EventEmitter.prototype = {
	constructor: EventEmitter,

	/**
  * @typesign () -> { [type: string]: Array<cellx~RegisteredEvent> };
  * @typesign (type: string) -> Array<cellx~RegisteredEvent>;
  */
	getEvents: function getEvents(type) {
		var events;

		if (type) {
			events = this._events.get(type);

			if (!events) {
				return [];
			}

			return Array.isArray(events) ? events : [events];
		}

		events = Object.create(null);

		this._events.forEach((function (typeEvents, type) {
			events[type] = Array.isArray(typeEvents) ? typeEvents : [typeEvents];
		}));

		return events;
	},

	/**
  * @typesign (type: string, listener: cellx~Listener, context?) -> this;
  * @typesign (listeners: { [type: string]: cellx~Listener }, context?) -> this;
  */
	on: function on(type, listener, context) {
		if (typeof type == 'object') {
			context = listener !== undefined ? listener : this;

			var listeners = type;

			for (type in listeners) {
				this._on(type, listeners[type], context);
			}
		} else {
			this._on(type, listener, context !== undefined ? context : this);
		}

		return this;
	},

	/**
  * @typesign (type: string, listener: cellx~Listener, context?) -> this;
  * @typesign (listeners?: { [type: string]: cellx~Listener }, context?) -> this;
  */
	off: function off(type, listener, context) {
		if (type) {
			if (typeof type == 'object') {
				context = listener !== undefined ? listener : this;

				var listeners = type;

				for (type in listeners) {
					this._off(type, listeners[type], context);
				}
			} else {
				this._off(type, listener, context !== undefined ? context : this);
			}
		} else {
			this._events.clear();
		}

		return this;
	},

	/**
  * @typesign (type: string, listener: cellx~Listener, context);
  */
	_on: function _on(type, listener, context) {
		var index = type.indexOf(':');

		if (index != -1) {
			var propName = type.slice(index + 1);

			EventEmitter.currentlySubscribing = true;
			(this[propName + 'Cell'] || (this[propName], this[propName + 'Cell'])).on(type.slice(0, index), listener, context);
			EventEmitter.currentlySubscribing = false;
		} else {
			var events = this._events.get(type);
			var evt = { listener: listener, context: context };

			if (!events) {
				this._events.set(type, evt);
			} else if (Array.isArray(events)) {
				events.push(evt);
			} else {
				this._events.set(type, [events, evt]);
			}
		}
	},

	/**
  * @typesign (type: string, listener: cellx~Listener, context);
  */
	_off: function _off(type, listener, context) {
		var index = type.indexOf(':');

		if (index != -1) {
			var propName = type.slice(index + 1);

			(this[propName + 'Cell'] || (this[propName], this[propName + 'Cell'])).off(type.slice(0, index), listener, context);
		} else {
			var events = this._events.get(type);

			if (!events) {
				return;
			}

			var evt;

			if (!Array.isArray(events)) {
				evt = events;
			} else if (events.length == 1) {
				evt = events[0];
			} else {
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
	},

	/**
  * @typesign (type: string, listener: cellx~Listener, context?) -> cellx~Listener;
  */
	once: function once(type, listener, context) {
		if (context === undefined) {
			context = this;
		}

		function wrapper(evt) {
			this._off(type, wrapper, context);
			return listener.call(this, evt);
		}

		this._on(type, wrapper, context);

		return wrapper;
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
  */
	_handleEvent: function _handleEvent(evt) {
		var events = this._events.get(evt.type);

		if (!events) {
			return;
		}

		if (Array.isArray(events)) {
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
		} else if (this._tryEventListener(events, evt) === false) {
			evt.isPropagationStopped = true;
		}
	},

	/**
  * @typesign (emEvt: cellx~RegisteredEvent, evt: cellx~Event);
  */
	_tryEventListener: function _tryEventListener(emEvt, evt) {
		try {
			return emEvt.listener.call(emEvt.context, evt);
		} catch (err) {
			logger.error(err);
		}
	}
};

var EventEmitterProto = EventEmitter.prototype;

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 0x1fffffffffffff;
var KEY_WRAPPERS = symbolPolyfill.Symbol('wrappers');

var errorIndexCounter = 0;
var pushingIndexCounter = 0;

var releasePlan = new mapSetPolyfill.Map();
var releasePlanIndex = MAX_SAFE_INTEGER;
var releasePlanToIndex = -1;
var releasePlanned = false;
var currentlyRelease = false;
var currentCell = null;
var $error = { error: null };
var releaseVersion = 1;

var transactionLevel = 0;
var transactionFailure = false;
var pendingReactions = [];

var afterReleasePushings;
var afterReleaseCallbacks;

var STATE_INITED = 1;
var STATE_NOT_RELEASED = 1 << 1;
var STATE_CURRENTLY_PULLING = 1 << 2;
var STATE_ACTIVE = 1 << 3;
var STATE_HAS_FOLLOWERS = 1 << 4;
var STATE_PENDING = 1 << 5;
var STATE_CAN_CANCEL_CHANGE = 1 << 6;

function release(force) {
	if (!releasePlanned && !force) {
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

		var oldReleasePlanIndex = releasePlanIndex;

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

			if (level > oldReleasePlanIndex) {
				if (releasePlanIndex == oldReleasePlanIndex) {
					if (!queue.length) {
						queue = releasePlan.get(++releasePlanIndex);
					}
				} else {
					queue = releasePlan.get(releasePlanIndex);
				}

				continue;
			}

			changeEvent = cell._changeEvent;
		}

		cell._levelInRelease = -1;

		if (changeEvent) {
			cell._fixedValue = cell._value;
			cell._changeEvent = null;

			cell._state |= STATE_NOT_RELEASED;
			cell._handleEvent(changeEvent);

			if (!(cell._state & STATE_NOT_RELEASED)) {
				break;
			}

			cell._state ^= STATE_NOT_RELEASED;

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

			if (releasePlanIndex == MAX_SAFE_INTEGER) {
				break;
			}
		}

		if (releasePlanIndex == oldReleasePlanIndex) {
			if (!queue.length) {
				if (releasePlanIndex == releasePlanToIndex) {
					break;
				}

				queue = releasePlan.get(++releasePlanIndex);
			}
		} else {
			queue = releasePlan.get(releasePlanIndex);
		}
	}

	if (releasePlanIndex != MAX_SAFE_INTEGER) {
		releasePlanIndex = MAX_SAFE_INTEGER;
		releasePlanToIndex = -1;
		currentlyRelease = false;
		releaseVersion++;

		if (afterReleasePushings) {
			var pushings = afterReleasePushings;

			afterReleasePushings = null;

			for (var i = 0, l = pushings.length; i < l; i += 2) {
				pushings[i]._push(pushings[i + 1], true, false);
			}
		}
	}

	if (afterReleaseCallbacks) {
		var callbacks = afterReleaseCallbacks;

		afterReleaseCallbacks = null;

		for (var i = 0, l = callbacks.length; i < l; i++) {
			callbacks[i]();
		}
	}
}

/**
 * @typesign (cell: Cell, value);
 */
function defaultPut(cell, value) {
	cell.push(value);
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
 *     context?: Object,
 *     get?: (value) -> *,
 *     validate?: (value, oldValue),
 *     merge: (value, oldValue) -> *,
 *     put?: (cell: Cell, value, oldValue),
 *     reap?: (),
 *     onChange?: (evt: cellx~Event) -> ?boolean,
 *     onError?: (evt: cellx~Event) -> ?boolean
 * });
 * @typesign new Cell(pull: (cell: Cell, next) -> *, opts?: {
 *     debugKey?: string,
 *     context?: Object,
 *     get?: (value) -> *,
 *     validate?: (value, oldValue),
 *     merge: (value, oldValue) -> *,
 *     put?: (cell: Cell, value, oldValue),
 *     reap?: (),
 *     onChange?: (evt: cellx~Event) -> ?boolean,
 *     onError?: (evt: cellx~Event) -> ?boolean
 * });
 */
function Cell(value, opts) {
	EventEmitter.call(this);

	this.debugKey = opts && opts.debugKey;

	this.context = opts && (opts.context || opts.owner) || this;

	this._pull = typeof value == 'function' ? value : null;
	this._get = opts && opts.get || null;

	this._validate = opts && opts.validate || null;
	this._merge = opts && opts.merge || null;
	this._put = opts && opts.put || defaultPut;

	this._reap = opts && opts.reap || null;

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

	this._selfPendingStatusCell = null;
	this._pendingStatusCell = null;

	this._changeEvent = null;
	this._lastErrorEvent = null;

	this._state = STATE_CAN_CANCEL_CHANGE;

	if (opts) {
		if (opts.onChange) {
			this.on('change', opts.onChange);
		}
		if (opts.onError) {
			this.on('error', opts.onError);
		}
	}
}

mixin.mixin(Cell, {
	/**
  * @typesign (cnfg: { asynchronous?: boolean });
  */
	configure: function configure(cnfg) {
		if (cnfg.asynchronous !== undefined) {
			if (releasePlanned || currentlyRelease) {
				release(true);
			}

			config.asynchronous = cnfg.asynchronous;
		}
	},

	/**
  * @type {boolean}
  */
	get currentlyPulling() {
		return !!currentCell;
	},

	/**
  * @typesign (callback: (), context?) -> ();
  */
	autorun: function autorun(callback, context) {
		var disposer;

		new Cell(function () {
			var cell = this;

			if (!disposer) {
				disposer = function disposer() {
					cell.dispose();
				};
			}

			if (transactionLevel) {
				var index = pendingReactions.indexOf(this);

				if (index != -1) {
					pendingReactions.splice(index, 1);
				}

				pendingReactions.push(this);
			} else {
				callback.call(context, disposer);
			}
		}, { onChange: function noop() {} });

		return disposer;
	},

	/**
  * @typesign ();
  */
	forceRelease: function forceRelease() {
		if (releasePlanned || currentlyRelease) {
			release(true);
		}
	},

	/**
  * @typesign (callback: ());
  */
	transaction: function transaction(callback) {
		if (!transactionLevel++ && (releasePlanned || currentlyRelease)) {
			release(true);
		}

		try {
			callback();
		} catch (err) {
			logger.error(err);
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

		if (! --transactionLevel && !transactionFailure) {
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
  * @typesign (callback: ());
  */
	afterRelease: function afterRelease(callback) {
		(afterReleaseCallbacks || (afterReleaseCallbacks = [])).push(callback);
	}
});

Cell.prototype = {
	__proto__: EventEmitter.prototype,

	constructor: Cell,

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
		if (releasePlanned || currentlyRelease) {
			release(true);
		}

		this._activate();

		if (typeof type == 'object') {
			EventEmitterProto.on.call(this, type, listener !== undefined ? listener : this.context);
		} else {
			EventEmitterProto.on.call(this, type, listener, context !== undefined ? context : this.context);
		}

		this._state |= STATE_HAS_FOLLOWERS;

		return this;
	},

	/**
  * @override
  */
	off: function off(type, listener, context) {
		if (releasePlanned || currentlyRelease) {
			release(true);
		}

		if (type) {
			if (typeof type == 'object') {
				EventEmitterProto.off.call(this, type, listener !== undefined ? listener : this.context);
			} else {
				EventEmitterProto.off.call(this, type, listener, context !== undefined ? context : this.context);
			}
		} else {
			EventEmitterProto.off.call(this);
		}

		if (!this._slaves.length && !this._events.has('change') && !this._events.has('error') && this._state & STATE_HAS_FOLLOWERS) {
			this._state ^= STATE_HAS_FOLLOWERS;

			this._deactivate();

			if (this._reap) {
				this._reap.call(this.context);
			}
		}

		return this;
	},

	/**
  * @typesign (listener: (evt: cellx~Event) -> ?boolean, context?) -> this;
  */
	addChangeListener: function addChangeListener(listener, context) {
		return this.on('change', listener, context !== undefined ? context : this.context);
	},

	/**
  * @typesign (listener: (evt: cellx~Event) -> ?boolean, context?) -> this;
  */
	removeChangeListener: function removeChangeListener(listener, context) {
		return this.off('change', listener, context !== undefined ? context : this.context);
	},

	/**
  * @typesign (listener: (evt: cellx~Event) -> ?boolean, context?) -> this;
  */
	addErrorListener: function addErrorListener(listener, context) {
		return this.on('error', listener, context !== undefined ? context : this.context);
	},

	/**
  * @typesign (listener: (evt: cellx~Event) -> ?boolean, context?) -> this;
  */
	removeErrorListener: function removeErrorListener(listener, context) {
		return this.off('error', listener, context !== undefined ? context : this.context);
	},

	/**
  * @typesign (listener: (err: ?Error, evt: cellx~Event) -> ?boolean, context?) -> this;
  */
	subscribe: function subscribe(listener, context) {
		var wrappers = listener[KEY_WRAPPERS];

		if (wrappers && wrappers.has(listener)) {
			return this;
		}

		function wrapper(evt) {
			return listener.call(this, evt.error || null, evt);
		}
		(wrappers || (listener[KEY_WRAPPERS] = new mapSetPolyfill.Map())).set(this, wrapper);

		if (context === undefined) {
			context = this.context;
		}

		return this.on('change', wrapper, context).on('error', wrapper, context);
	},

	/**
  * @typesign (listener: (err: ?Error, evt: cellx~Event) -> ?boolean, context?) -> this;
  */
	unsubscribe: function unsubscribe(listener, context) {
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
	},

	/**
  * @typesign (slave: cellx.Cell);
  */
	_registerSlave: function _registerSlave(slave) {
		this._activate();

		this._slaves.push(slave);
		this._state |= STATE_HAS_FOLLOWERS;
	},

	/**
  * @typesign (slave: cellx.Cell);
  */
	_unregisterSlave: function _unregisterSlave(slave) {
		this._slaves.splice(this._slaves.indexOf(slave), 1);

		if (!this._slaves.length && !this._events.has('change') && !this._events.has('error')) {
			this._state ^= STATE_HAS_FOLLOWERS;

			this._deactivate();

			if (this._reap) {
				this._reap.call(this.context);
			}
		}
	},

	/**
  * @typesign ();
  */
	_activate: function _activate() {
		if (!this._pull || this._state & STATE_ACTIVE || this._masters === null) {
			return;
		}

		var masters = this._masters;

		if (this._version < releaseVersion) {
			var value = this._tryPull();

			if (masters || this._masters || !(this._state & STATE_INITED)) {
				if (value === $error) {
					this._fail($error.error, false);
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

			this._state |= STATE_ACTIVE;
		}
	},

	/**
  * @typesign ();
  */
	_deactivate: function _deactivate() {
		if (!(this._state & STATE_ACTIVE)) {
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

		this._state ^= STATE_ACTIVE;
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

		(releasePlan.get(level) || (releasePlan.set(level, queue = []), queue)).push(this);

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
				nextTick.nextTick(release);
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
				this._state &= ~STATE_CAN_CANCEL_CHANGE;
			}
		} else {
			evt.prev = null;
			this._changeEvent = evt;
			this._state &= ~STATE_CAN_CANCEL_CHANGE;

			this._addToRelease();
		}
	},

	/**
  * @typesign () -> *;
  */
	get: function get() {
		if ((releasePlanned || currentlyRelease && !currentCell) && this._pull) {
			release(true);
		}

		if (this._pull && !(this._state & STATE_ACTIVE) && this._version < releaseVersion && this._masters !== null) {
			var oldMasters = this._masters;
			var value = this._tryPull();
			var masters = this._masters;

			if (oldMasters || masters || !(this._state & STATE_INITED)) {
				if (masters && this._state & STATE_HAS_FOLLOWERS) {
					var i = masters.length;

					do {
						masters[--i]._registerSlave(this);
					} while (i);

					this._state |= STATE_ACTIVE;
				}

				if (value === $error) {
					this._fail($error.error, false);
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

		var hasFollowers = this._state & STATE_HAS_FOLLOWERS;

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
				for (var i = oldMasters.length; i;) {
					var oldMaster = oldMasters[--i];

					if (!masters || masters.indexOf(oldMaster) == -1) {
						oldMaster._unregisterSlave(this);
					}
				}
			}

			if (masters && masters.length) {
				this._state |= STATE_ACTIVE;
			} else {
				this._state &= ~STATE_ACTIVE;
			}

			if (currentlyRelease && this._level > oldLevel) {
				this._addToRelease();
				return false;
			}
		}

		if (value === $error) {
			this._fail($error.error, false);
			return true;
		}

		return this._push(value, false, true);
	},

	/**
  * @typesign () -> *;
  */
	_tryPull: function _tryPull() {
		if (this._state & STATE_CURRENTLY_PULLING) {
			throw new TypeError('Circular pulling detected');
		}

		var pull = this._pull;

		if (pull.length) {
			this._state |= STATE_PENDING;
			if (this._selfPendingStatusCell) {
				this._selfPendingStatusCell.set(true);
			}
		}

		var prevCell = currentCell;
		currentCell = this;

		this._state |= STATE_CURRENTLY_PULLING;
		this._masters = null;
		this._level = 0;

		try {
			return pull.length ? pull.call(this.context, this, this._value) : pull.call(this.context);
		} catch (err) {
			$error.error = err;
			return $error;
		} finally {
			currentCell = prevCell;

			this._version = releaseVersion + currentlyRelease;

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
	},

	/**
  * @typesign () -> ?Error;
  */
	getError: function getError() {
		var errorCell = this._errorCell;

		if (!errorCell) {
			var debugKey = this.debugKey;

			this._selfErrorCell = new Cell(this._error, debugKey ? { debugKey: debugKey + '._selfErrorCell' } : null);

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

							if (!err || errorIndex < masterErrorIndex) {
								err = masterError;
								errorIndex = masterErrorIndex;
							}
						}
					} while (i);
				}

				return err;
			}, debugKey ? { debugKey: debugKey + '._errorCell', context: this } : { context: this });
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

			this._selfPendingStatusCell = new Cell(!!(this._state & STATE_PENDING), debugKey ? { debugKey: debugKey + '._selfPendingStatusCell' } : null);

			pendingStatusCell = this._pendingStatusCell = new Cell(function () {
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
			}, debugKey ? { debugKey: debugKey + '._pendingStatusCell', context: this } : { context: this });
		}

		return pendingStatusCell.get();
	},

	/**
  * @typesign (value) -> this;
  */
	set: function set(value) {
		if (this._validate) {
			this._validate(value, this._value);
		}
		if (this._merge) {
			value = this._merge(value, this._value);
		}

		this._state |= STATE_PENDING;
		if (this._selfPendingStatusCell) {
			this._selfPendingStatusCell.set(true);
		}

		if (this._put.length >= 3) {
			this._put.call(this.context, this, value, this._value);
		} else {
			this._put.call(this.context, this, value);
		}

		return this;
	},

	/**
  * @typesign (value) -> this;
  */
	push: function push(value) {
		this._push(value, true, false);
		return this;
	},

	/**
  * @typesign (value, external: boolean, pulling: boolean) -> boolean;
  */
	_push: function _push(value, external, pulling) {
		this._state |= STATE_INITED;

		var oldValue = this._value;

		if (external && currentCell && this._state & STATE_HAS_FOLLOWERS) {
			if (is.is(value, oldValue)) {
				this._setError(null);
				this._resolvePending();
				return false;
			}

			(afterReleasePushings || (afterReleasePushings = [])).push(this, value);

			return true;
		}

		if (external || !currentlyRelease && pulling) {
			this._pushingIndex = ++pushingIndexCounter;
		}

		this._setError(null);

		if (is.is(value, oldValue)) {
			if (external || currentlyRelease && pulling) {
				this._resolvePending();
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

		if (this._state & STATE_HAS_FOLLOWERS || transactionLevel) {
			if (this._changeEvent) {
				if (is.is(value, this._fixedValue) && this._state & STATE_CAN_CANCEL_CHANGE) {
					this._levelInRelease = -1;
					this._changeEvent = null;
				} else {
					this._changeEvent = {
						target: this,
						type: 'change',
						data: {
							oldValue: oldValue,
							value: value,
							prev: this._changeEvent
						}
					};
				}
			} else {
				this._changeEvent = {
					target: this,
					type: 'change',
					data: {
						oldValue: oldValue,
						value: value,
						prev: null
					}
				};
				this._state |= STATE_CAN_CANCEL_CHANGE;

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
			this._resolvePending();
		}

		return true;
	},

	/**
  * @typesign (err) -> this;
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

		logger.error('[' + this.debugKey + ']', err);

		if (!(err instanceof Error)) {
			err = new Error(String(err));
		}

		this._setError(err);

		if (external) {
			this._resolvePending();
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
				data: {
					error: err
				}
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
  * @typesign ();
  */
	_resolvePending: function _resolvePending() {
		if (this._state & STATE_PENDING) {
			this._state ^= STATE_PENDING;

			if (this._selfPendingStatusCell) {
				this._selfPendingStatusCell.set(false);
			}
		}
	},

	/**
  * @typesign () -> this;
  */
	reap: function reap() {
		var slaves = this._slaves;

		for (var i = 0, l = slaves.length; i < l; i++) {
			slaves[i].reap();
		}

		return this.off();
	},

	/**
  * @typesign () -> this;
  */
	dispose: function dispose() {
		return this.reap();
	}
};

Cell.prototype[symbolPolyfill.Symbol.iterator] = function () {
	return this._value[symbolPolyfill.Symbol.iterator]();
};

function FreezableCollectionMixin() {
	/**
  * @type {boolean}
  */
	this._isFrozen = false;
}

FreezableCollectionMixin.prototype = {
	/**
  * @type {boolean}
  */
	get isFrozen() {
		return this._isFrozen;
	},

	/**
  * @typesign () -> this;
  */
	freeze: function freeze() {
		this._isFrozen = true;
		return this;
	},

	/**
  * @typesign () -> this;
  */
	unfreeze: function unfreeze() {
		this._isFrozen = false;
		return this;
	},

	/**
  * @typesign (msg: string);
  */
	_throwIfFrozen: function _throwIfFrozen(msg) {
		if (this._isFrozen) {
			throw new TypeError(msg || 'Frozen collection cannot be mutated');
		}
	}
};

function ObservableCollectionMixin() {
	/**
  * @type {Map<*, uint>}
  */
	this._valueCounts = new mapSetPolyfill.Map();
}

ObservableCollectionMixin.prototype = {
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
};

var push = Array.prototype.push;
var splice = Array.prototype.splice;

/**
 * @typesign (a, b) -> -1 | 1 | 0;
 */
function defaultComparator(a, b) {
	return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * @class cellx.ObservableList
 * @extends {cellx.EventEmitter}
 * @implements {cellx.FreezableCollectionMixin}
 * @implements {cellx.ObservableCollectionMixin}
 *
 * @typesign new ObservableList(items?: Array | cellx.ObservableList, opts?: {
 *     adoptsValueChanges?: boolean,
 *     comparator?: (a, b) -> int,
 *     sorted?: boolean
 * });
 * @typesign new ObservableList(items?: Array | cellx.ObservableList, adoptsValueChanges?: boolean);
 */
function ObservableList(items, opts) {
	EventEmitter.call(this);
	FreezableCollectionMixin.call(this);
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

	if (opts && (opts.sorted || opts.comparator && opts.sorted !== false)) {
		this.comparator = opts.comparator || defaultComparator;
		this.sorted = true;
	}

	if (items) {
		this._addRange(items);
	}
}

ObservableList.prototype = mixin.mixin({ __proto__: EventEmitter.prototype }, [FreezableCollectionMixin.prototype, ObservableCollectionMixin.prototype, {
	constructor: ObservableList,

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
  * @typesign (index: int, value) -> this;
  */
	set: function set(index, value) {
		if (this.sorted) {
			throw new TypeError('Cannot set to sorted list');
		}

		index = this._validateIndex(index, true);

		var items = this._items;

		if (is.is(value, items[index])) {
			return this;
		}

		this._throwIfFrozen();

		this._unregisterValue(items[index]);
		this._registerValue(value);
		items[index] = value;

		this.emit('change');

		return this;
	},

	/**
  * @typesign (index: int, values: Array | cellx.ObservableList) -> this;
  */
	setRange: function setRange(index, values) {
		if (this.sorted) {
			throw new TypeError('Cannot set to sorted list');
		}

		index = this._validateIndex(index, true);

		var valueCount = values.length;

		if (!valueCount) {
			return this;
		}

		if (index + valueCount > this.length) {
			throw new RangeError('Sum of "index" and "values.length" out of valid range');
		}

		if (values instanceof ObservableList) {
			values = values._items.slice();
		}

		var items = this._items;
		var changed = false;

		for (var i = index + valueCount; i > index;) {
			var value = values[--i - index];

			if (!is.is(value, items[i])) {
				if (!changed) {
					this._throwIfFrozen();
				}

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
  * @typesign (value) -> this;
  */
	add: function add(value) {
		this._throwIfFrozen();

		if (this.sorted) {
			this._insertSortedValue(value);
		} else {
			this._registerValue(value);
			this._items.push(value);
		}

		this.length++;

		this.emit('change');

		return this;
	},

	/**
  * @typesign (values: Array | cellx.ObservableList) -> this;
  */
	addRange: function addRange(values) {
		if (values.length) {
			this._throwIfFrozen();

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
			values = values._items.slice();
		}

		if (this.sorted) {
			for (var i = 0, l = values.length; i < l; i++) {
				this._insertSortedValue(values[i]);
			}

			this.length += values.length;
		} else {
			for (var i = values.length; i;) {
				this._registerValue(values[--i]);
			}

			this.length = push.apply(this._items, values);
		}
	},

	/**
  * @typesign (index: int, value) -> this;
  */
	insert: function insert(index, value) {
		if (this.sorted) {
			throw new TypeError('Cannot insert to sorted list');
		}

		index = this._validateIndex(index, true);

		this._throwIfFrozen();

		this._registerValue(value);
		this._items.splice(index, 0, value);
		this.length++;

		this.emit('change');

		return this;
	},

	/**
  * @typesign (index: int, values: Array | cellx.ObservableList) -> this;
  */
	insertRange: function insertRange(index, values) {
		if (this.sorted) {
			throw new TypeError('Cannot insert to sorted list');
		}

		index = this._validateIndex(index, true);

		var valueCount = values.length;

		if (!valueCount) {
			return this;
		}

		this._throwIfFrozen();

		if (values instanceof ObservableList) {
			values = values._items;
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

		this._throwIfFrozen();

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
			if (!changed) {
				this._throwIfFrozen();
			}

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
			values = values._items.slice();
		}

		var items = this._items;
		var changed = false;

		for (var i = 0, l = values.length; i < l; i++) {
			var value = values[i];
			var index = items.indexOf(value, fromIndex);

			if (index != -1) {
				if (!changed) {
					this._throwIfFrozen();
				}

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
			values = values._items.slice();
		}

		var items = this._items;
		var changed = false;

		for (var i = 0, l = values.length; i < l; i++) {
			var value = values[i];

			for (var index = fromIndex; (index = items.indexOf(value, index)) != -1;) {
				if (!changed) {
					this._throwIfFrozen();
				}

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

		this._throwIfFrozen();

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

		this._throwIfFrozen();

		for (var i = index + count; i > index;) {
			this._unregisterValue(items[--i]);
		}
		var values = items.splice(index, count);
		this.length -= count;

		this.emit('change');

		return values;
	},

	/**
  * @typesign () -> this;
  */
	clear: function clear() {
		if (!this.length) {
			return this;
		}

		this._throwIfFrozen();

		if (this.adoptsValueChanges) {
			this._valueCounts.forEach((function (value) {
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
			data: {
				subtype: 'clear'
			}
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
  *     callback: (item, index: uint, list: cellx.ObservableList),
  *     context?
  * );
  */
	forEach: null,

	/**
  * @typesign (
  *     callback: (item, index: uint, list: cellx.ObservableList) -> *,
  *     context?
  * ) -> Array;
  */
	map: null,

	/**
  * @typesign (
  *     callback: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
  *     context?
  * ) -> Array;
  */
	filter: null,

	/**
  * @typesign (
  *     callback: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
  *     context?
  * ) -> *;
  */
	find: function (callback, context) {
		var items = this._items;

		for (var i = 0, l = items.length; i < l; i++) {
			var item = items[i];

			if (callback.call(context, item, i, this)) {
				return item;
			}
		}
	},

	/**
  * @typesign (
  *     callback: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
  *     context?
  * ) -> int;
  */
	findIndex: function (callback, context) {
		var items = this._items;

		for (var i = 0, l = items.length; i < l; i++) {
			if (callback.call(context, items[i], i, this)) {
				return i;
			}
		}

		return -1;
	},

	/**
  * @typesign (
  *     callback: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
  *     context?
  * ) -> boolean;
  */
	every: null,

	/**
  * @typesign (
  *     callback: (item, index: uint, list: cellx.ObservableList) -> ?boolean,
  *     context?
  * ) -> boolean;
  */
	some: null,

	/**
  * @typesign (
  *     callback: (accumulator, item, index: uint, list: cellx.ObservableList) -> *,
  *     initialValue?
  * ) -> *;
  */
	reduce: null,

	/**
  * @typesign (
  *     callback: (accumulator, item, index: uint, list: cellx.ObservableList) -> *,
  *     initialValue?
  * ) -> *;
  */
	reduceRight: null,

	/**
  * @typesign () -> this;
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
	},

	/**
  * @typesign (index: ?int, allowEndIndex?: boolean) -> ?uint;
  */
	_validateIndex: function _validateIndex(index, allowEndIndex) {
		if (index === undefined) {
			return index;
		}

		if (index < 0) {
			index += this.length;

			if (index < 0) {
				throw new RangeError('Index out of valid range');
			}
		} else if (index >= this.length + (allowEndIndex ? 1 : 0)) {
			throw new RangeError('Index out of valid range');
		}

		return index;
	},

	/**
  * @typesign (value);
  */
	_insertSortedValue: function _insertSortedValue(value) {
		this._registerValue(value);

		var items = this._items;
		var comparator = this.comparator;
		var low = 0;
		var high = items.length;

		while (low != high) {
			var mid = low + high >> 1;

			if (comparator(value, items[mid]) < 0) {
				high = mid;
			} else {
				low = mid + 1;
			}
		}

		items.splice(low, 0, value);
	}
}]);

['forEach', 'map', 'filter', 'every', 'some'].forEach((function (name) {
	ObservableList.prototype[name] = function (callback, context) {
		return this._items[name]((function (item, index) {
			return callback.call(context, item, index, this);
		}), this);
	};
}));

['reduce', 'reduceRight'].forEach((function (name) {
	ObservableList.prototype[name] = function (callback, initialValue) {
		var items = this._items;
		var list = this;

		function wrapper(accumulator, item, index) {
			return callback(accumulator, item, index, list);
		}

		return arguments.length >= 2 ? items[name](wrapper, initialValue) : items[name](wrapper);
	};
}));

[['keys', function keys(index) {
	return index;
}], ['values', function values(index, item) {
	return item;
}], ['entries', function entries(index, item) {
	return [index, item];
}]].forEach((function (settings) {
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
}));

ObservableList.prototype[symbolPolyfill.Symbol.iterator] = ObservableList.prototype.values;

/**
 * @class cellx.ObservableMap
 * @extends {cellx.EventEmitter}
 * @implements {cellx.FreezableCollectionMixin}
 * @implements {cellx.ObservableCollectionMixin}
 *
 * @typesign new ObservableMap(entries?: Object | cellx.ObservableMap | Map | Array<{ 0, 1 }>, opts?: {
 *     adoptsValueChanges?: boolean
 * });
 * @typesign new ObservableMap(
 *     entries?: Object | cellx.ObservableMap | Map | Array<{ 0, 1 }>,
 *     adoptsValueChanges?: boolean
 * );
 */
function ObservableMap(entries, opts) {
	EventEmitter.call(this);
	FreezableCollectionMixin.call(this);
	ObservableCollectionMixin.call(this);

	if (typeof opts == 'boolean') {
		opts = { adoptsValueChanges: opts };
	}

	this._entries = new mapSetPolyfill.Map();

	this.size = 0;

	/**
  * @type {boolean}
  */
	this.adoptsValueChanges = !!(opts && opts.adoptsValueChanges);

	if (entries) {
		var mapEntries = this._entries;

		if (entries instanceof ObservableMap || entries instanceof mapSetPolyfill.Map) {
			entries._entries.forEach((function (value, key) {
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
}

ObservableMap.prototype = mixin.mixin({ __proto__: EventEmitter.prototype }, [FreezableCollectionMixin.prototype, ObservableCollectionMixin.prototype, {
	constructor: ObservableMap,

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
  * @typesign (key, value) -> this;
  */
	set: function set(key, value) {
		var entries = this._entries;
		var hasKey = entries.has(key);
		var oldValue;

		if (hasKey) {
			oldValue = entries.get(key);

			if (is.is(value, oldValue)) {
				return this;
			}

			this._throwIfFrozen();

			this._unregisterValue(oldValue);
		} else {
			this._throwIfFrozen();
		}

		this._registerValue(value);
		entries.set(key, value);

		if (!hasKey) {
			this.size++;
		}

		this.emit({
			type: 'change',
			data: {
				subtype: hasKey ? 'update' : 'add',
				key: key,
				oldValue: oldValue,
				value: value
			}
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

		this._throwIfFrozen();

		var value = entries.get(key);

		this._unregisterValue(value);
		entries.delete(key);
		this.size--;

		this.emit({
			type: 'change',
			data: {
				subtype: 'delete',
				key: key,
				oldValue: value,
				value: undefined
			}
		});

		return true;
	},

	/**
  * @typesign () -> this;
  */
	clear: function clear() {
		if (!this.size) {
			return this;
		}

		this._throwIfFrozen();

		if (this.adoptsValueChanges) {
			this._valueCounts.forEach((function (value) {
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
			data: {
				subtype: 'clear'
			}
		});

		return this;
	},

	/**
  * @typesign (
  *     callback: (value, key, map: cellx.ObservableMap),
  *     context?
  * );
  */
	forEach: function forEach(callback, context) {
		this._entries.forEach((function (value, key) {
			callback.call(context, value, key, this);
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
  * @typesign () -> this;
  */
	clone: function clone() {
		return new this.constructor(this, {
			adoptsValueChanges: this.adoptsValueChanges
		});
	}
}]);

ObservableMap.prototype[symbolPolyfill.Symbol.iterator] = ObservableMap.prototype.entries;

var KEY_CELL_MAP = symbolPolyfill.Symbol('cellx.cellMap');

var hasOwn = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;

var global = Function('return this;')();

/**
 * @typesign (value?, opts?: {
 *     debugKey?: string,
 *     context?: Object,
 *     validate?: (value, oldValue),
 *     merge: (value, oldValue) -> *,
 *     put?: (cell: Cell, value, oldValue),
 *     reap?: (),
 *     onChange?: (evt: cellx~Event) -> ?boolean,
 *     onError?: (evt: cellx~Event) -> ?boolean
 * }) -> cellx;
 * @typesign (pull: (cell: Cell, next) -> *, opts?: {
 *     debugKey?: string,
 *     context?: Object,
 *     validate?: (value, oldValue),
 *     merge: (value, oldValue) -> *,
 *     put?: (cell: Cell, value, oldValue),
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
		var context = this;

		if (!context || context == global) {
			context = cx;
		}

		if (!hasOwn.call(context, KEY_CELL_MAP)) {
			Object.defineProperty(context, KEY_CELL_MAP, { value: new mapSetPolyfill.Map() });
		}

		var cell = context[KEY_CELL_MAP].get(cx);

		if (!cell) {
			if (value === 'dispose' && arguments.length >= 2) {
				return;
			}

			cell = new Cell(initialValue, objectAssignPolyfill.assign({ context: context }, opts));

			context[KEY_CELL_MAP].set(cx, cell);
		}

		switch (arguments.length) {
			case 0:
				{
					return cell.get();
				}
			case 1:
				{
					cell.set(value);
					return value;
				}
			default:
				{
					var method = value;

					switch (method) {
						case 'bind':
							{
								cx = cx.bind(context);
								cx.constructor = cellx;
								return cx;
							}
						case 'unwrap':
							{
								return cell;
							}
						default:
							{
								var result = Cell.prototype[method].apply(cell, slice.call(arguments, 1));
								return result === cell ? cx : result;
							}
					}
				}
		}
	}
	cx.constructor = cellx;

	if (opts.onChange || opts.onError) {
		cx.call(opts.context || global);
	}

	return cx;
}

cellx.configure = function (config) {
	Cell.configure(config);
};

cellx.EventEmitter = EventEmitter;
cellx.FreezableCollectionMixin = FreezableCollectionMixin;
cellx.ObservableCollectionMixin = ObservableCollectionMixin;
cellx.ObservableMap = ObservableMap;
cellx.ObservableList = ObservableList;
cellx.Cell = Cell;
cellx.autorun = Cell.autorun;
cellx.transact = cellx.transaction = Cell.transaction;
cellx.KEY_CELL_MAP = KEY_CELL_MAP;

/**
 * @typesign (
 *     entries?: Object | Array<{ 0, 1 }> | cellx.ObservableMap,
 *     opts?: { adoptsValueChanges?: boolean }
 * ) -> cellx.ObservableMap;
 * @typesign (
 *     entries?: Object | Array<{ 0, 1 }> | cellx.ObservableMap,
 *     adoptsValueChanges?: boolean
 * ) -> cellx.ObservableMap;
 */
function map(entries, opts) {
	return new ObservableMap(entries, opts);
}

cellx.map = map;

/**
 * @typesign (items?: Array | cellx.ObservableList, opts?: {
 *     adoptsValueChanges?: boolean,
 *     comparator?: (a, b) -> int,
 *     sorted?: boolean
 * }) -> cellx.ObservableList;
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
	var cellName = name + 'Cell';

	Object.defineProperty(obj, cellName, {
		configurable: true,
		enumerable: false,
		writable: true,
		value: value instanceof Cell ? value : new Cell(value, { context: obj })
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

cellx.defineObservableProperty = defineObservableProperty;

/**
 * @typesign (obj: cellx.EventEmitter, props: Object) -> cellx.EventEmitter;
 */
function defineObservableProperties(obj, props) {
	Object.keys(props).forEach((function (name) {
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
	if (typeof name == 'string') {
		defineObservableProperty(obj, name, value);
	} else {
		defineObservableProperties(obj, name);
	}

	return obj;
}

cellx.define = define;

cellx.cellx = cellx;

cellx.default = cellx;
cellx.__esModule = true;

return cellx;

})));
