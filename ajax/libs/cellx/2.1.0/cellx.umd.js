(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ?  factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.cellx = {})));
})(this, function(exports) {

//#region src/config.ts
const config = {
	logError: (...args) => {
		console.error(...args);
	},
	compareValues: Object.is
};
function configure(options) {
	return Object.assign(config, options);
}

//#endregion
//#region src/keys.ts
const KEY_LISTENER_WRAPPERS = Symbol("listenerWrappers");
const KEY_VALUE_CELLS = Symbol("valueCells");

//#endregion
//#region src/EventEmitter.ts
const EventEmitter_CommonState = {
	currentlySubscribing: false,
	transactionLevel: 0,
	transactionEvents: [],
	silently: false
};
var EventEmitter = class {
	static get currentlySubscribing() {
		return EventEmitter_CommonState.currentlySubscribing;
	}
	static transact(fn) {
		EventEmitter_CommonState.transactionLevel++;
		try {
			fn();
		} finally {
			if (--EventEmitter_CommonState.transactionLevel == 0) {
				let events = EventEmitter_CommonState.transactionEvents;
				EventEmitter_CommonState.transactionEvents = [];
				for (let i = 0; i < events.length; i++) events[i].target.handleEvent(events[i]);
			}
		}
	}
	static silently(fn) {
		if (EventEmitter_CommonState.silently) {
			fn();
			return;
		}
		EventEmitter_CommonState.silently = true;
		try {
			fn();
		} finally {
			EventEmitter_CommonState.silently = false;
		}
	}
	[KEY_VALUE_CELLS];
	_$listeners = /* @__PURE__ */ new Map();
	get$Listeners(type) {
		return type ? this._$listeners.get(type) ?? [] : this._$listeners;
	}
	on(type, listener, context) {
		if (typeof type == "object") {
			context = listener !== void 0 ? listener : this;
			let listeners = type;
			for (type in listeners) if (Object.prototype.hasOwnProperty.call(listeners, type)) this._on(type, listeners[type], context);
			for (let type$1 of Object.getOwnPropertySymbols(listeners)) this._on(type$1, listeners[type$1], context);
		} else this._on(type, listener, context !== void 0 ? context : this);
		return this;
	}
	off(type, listener, context) {
		if (type) if (typeof type == "object") {
			context = listener !== void 0 ? listener : this;
			let listeners = type;
			for (type in listeners) if (Object.prototype.hasOwnProperty.call(listeners, type)) this._off(type, listeners[type], context);
			for (let type$1 of Object.getOwnPropertySymbols(listeners)) this._off(type$1, listeners[type$1], context);
		} else this._off(type, listener, context !== void 0 ? context : this);
		else this._$listeners.clear();
		return this;
	}
	_on(type, listener, context) {
		let index;
		if (typeof type == "string" && (index = type.indexOf(":")) != -1) {
			let propName = type.slice(index + 1);
			EventEmitter_CommonState.currentlySubscribing = true;
			((this[KEY_VALUE_CELLS] ?? (this[KEY_VALUE_CELLS] = /* @__PURE__ */ new Map())).get(propName) ?? (this[propName], this[KEY_VALUE_CELLS]).get(propName)).on(type.slice(0, index), listener, context);
			EventEmitter_CommonState.currentlySubscribing = false;
		} else {
			let type$Listeners = this._$listeners.get(type);
			let $listener = {
				listener,
				context
			};
			if (type$Listeners) type$Listeners.push($listener);
			else this._$listeners.set(type, [$listener]);
		}
	}
	_off(type, listener, context) {
		let index;
		if (typeof type == "string" && (index = type.indexOf(":")) != -1) this[KEY_VALUE_CELLS]?.get(type.slice(index + 1))?.off(type.slice(0, index), listener, context);
		else {
			let type$Listeners = this._$listeners.get(type);
			if (!type$Listeners) return;
			if (type$Listeners.length == 1) {
				if (type$Listeners[0].listener == listener && type$Listeners[0].context === context) this._$listeners.delete(type);
			} else for (let i = 0;; i++) {
				if (type$Listeners[i].listener == listener && type$Listeners[i].context === context) {
					type$Listeners.splice(i, 1);
					break;
				}
				if (i + 1 == type$Listeners.length) break;
			}
		}
	}
	once(type, listener, context) {
		if (context === void 0) context = this;
		function wrapper(evt) {
			this._off(type, wrapper, context);
			return listener.call(this, evt);
		}
		this._on(type, wrapper, context);
		return wrapper;
	}
	emit(evt, data) {
		if (typeof evt == "object") {
			if (!evt.target) evt.target = this;
			else if (evt.target != this) throw TypeError("Event cannot be emitted on this target");
		} else evt = {
			target: this,
			type: evt
		};
		if (data) evt.data = data;
		if (!EventEmitter_CommonState.silently) if (EventEmitter_CommonState.transactionLevel != 0) for (let i = EventEmitter_CommonState.transactionEvents.length;;) {
			if (i == 0) {
				if (evt.data) evt.data["prevEvent"] = null;
				else evt.data = { prevEvent: null };
				EventEmitter_CommonState.transactionEvents.push(evt);
				break;
			}
			let event = EventEmitter_CommonState.transactionEvents[--i];
			if (event.target == this && event.type === evt.type) {
				if (evt.data) evt.data["prevEvent"] = event;
				else evt.data = { prevEvent: event };
				EventEmitter_CommonState.transactionEvents[i] = evt;
				break;
			}
		}
		else this.handleEvent(evt);
		return evt;
	}
	handleEvent(evt) {
		let type$Listeners = this._$listeners.get(evt.type);
		if (!type$Listeners) return;
		if (type$Listeners.length == 1) {
			if (this._tryEventListener(type$Listeners[0], evt) === false) evt.propagationStopped = true;
		} else {
			type$Listeners = type$Listeners.slice();
			for (let i = 0; i < type$Listeners.length; i++) if (this._tryEventListener(type$Listeners[i], evt) === false) evt.propagationStopped = true;
		}
	}
	_tryEventListener($listener, evt) {
		try {
			return $listener.listener.call($listener.context, evt);
		} catch (err) {
			config.logError(err);
		}
	}
};

//#endregion
//#region src/WaitError.ts
var WaitError = class extends Error {};

//#endregion
//#region src/afterRelease.ts
function afterRelease(cb) {
	(Cell_CommonState.afterRelease ?? (Cell_CommonState.afterRelease = [])).push(cb);
}

//#endregion
//#region src/autorun.ts
function autorun(fn, cellOptions) {
	let disposer;
	new Cell(function(cell, value) {
		return fn.call(this, value, disposer ??= () => {
			cell.dispose();
		});
	}, cellOptions?.onChange ? cellOptions : {
		...cellOptions,
		onChange: () => {}
	});
	return disposer;
}

//#endregion
//#region src/release.ts
function release() {
	while (Cell_CommonState.pendingCellsIndex < Cell_CommonState.pendingCells.length) {
		let cell = Cell_CommonState.pendingCells[Cell_CommonState.pendingCellsIndex++];
		if (cell._active) cell.actualize();
	}
	Cell_CommonState.pendingCells.length = 0;
	Cell_CommonState.pendingCellsIndex = 0;
	if (Cell_CommonState.afterRelease) {
		let { afterRelease: afterRelease$1 } = Cell_CommonState;
		Cell_CommonState.afterRelease = null;
		for (let i = 0; i < afterRelease$1.length; i++) afterRelease$1[i]();
	}
}

//#endregion
//#region src/track.ts
const DependencyFilter = {
	allExceptUntracked: (dep) => Cell_CommonState.untrackedCounter == 0,
	onlyTracked: (dep) => Cell_CommonState.trackedCounter != 0
};
function untracked(fn) {
	Cell_CommonState.untrackedCounter++;
	try {
		return fn();
	} finally {
		Cell_CommonState.untrackedCounter--;
	}
}
function tracked(fn) {
	Cell_CommonState.trackedCounter++;
	try {
		return fn();
	} finally {
		Cell_CommonState.trackedCounter--;
	}
}

//#endregion
//#region src/transact.ts
function transact(fn) {
	if (Cell_CommonState.transaction) {
		fn();
		return;
	}
	if (Cell_CommonState.pendingCells.length != 0) release();
	Cell_CommonState.transaction = {
		primaryCells: /* @__PURE__ */ new Map(),
		secondaryCells: /* @__PURE__ */ new Set()
	};
	try {
		fn();
	} catch (err) {
		for (let [cell, value] of Cell_CommonState.transaction.primaryCells) cell._value = value;
		for (let cell of Cell_CommonState.transaction.secondaryCells) cell._state = CellState.ACTUAL;
		Cell_CommonState.pendingCells.length = 0;
		Cell_CommonState.pendingCellsIndex = 0;
		Cell_CommonState.transaction = null;
		throw err;
	}
	Cell_CommonState.transaction = null;
	if (Cell_CommonState.pendingCells.length != 0) release();
}

//#endregion
//#region src/utils/fastIndexOf.ts
function fastIndexOf(arr, value) {
	let len = arr.length;
	if (len != 0) {
		if (arr[0] === value) return 0;
		for (let i = 1; i < len; i++) if (arr[i] === value) return i;
	}
	return -1;
}

//#endregion
//#region src/utils/nextTick.ts
/* istanbul ignore next */
const nextTick = globalThis.process?.nextTick ?? (() => {
	const resolvedPromise = Promise.resolve();
	return (cb) => {
		resolvedPromise.then(cb);
	};
})();

//#endregion
//#region src/Cell.ts
let CellState = /* @__PURE__ */ function(CellState$1) {
	CellState$1["ACTUAL"] = "actual";
	CellState$1["DIRTY"] = "dirty";
	CellState$1["CHECK"] = "check";
	return CellState$1;
}({});
const Cell_CommonState = {
	pendingCells: [],
	pendingCellsIndex: 0,
	afterRelease: null,
	currentCell: null,
	untrackedCounter: 0,
	trackedCounter: 0,
	lastUpdateId: 0,
	transaction: null
};
const $error = { error: Error() };
var Cell = class Cell extends EventEmitter {
	static EVENT_CHANGE = "change";
	static EVENT_ERROR = "error";
	static get currentlyPulling() {
		return Cell_CommonState.currentCell != null;
	}
	static autorun = autorun;
	static release = release;
	static afterRelease = afterRelease;
	static transact = transact;
	debugKey;
	context;
	meta;
	_pull;
	_dependencyFilter;
	_validate;
	_put;
	_compareValues;
	_reap;
	_dependencies;
	_reactions = [];
	_value;
	_errorCell = null;
	_error = null;
	_lastErrorEvent = null;
	get error() {
		return Cell_CommonState.currentCell ? (this._errorCell ?? (this._errorCell = new Cell(this._error))).get() : this._error;
	}
	_state;
	get state() {
		return this._state;
	}
	_inited;
	get inited() {
		return this._inited;
	}
	_active = false;
	get active() {
		return this._active;
	}
	_currentlyPulling = false;
	get currentlyPulling() {
		return this._currentlyPulling;
	}
	_updateId = -1;
	_bound = false;
	constructor(value, options) {
		super();
		this.debugKey = options?.debugKey;
		this.context = options?.context ?? null;
		this.meta = options?.meta ?? null;
		this._pull = typeof value == "function" ? value : null;
		this._dependencyFilter = options?.dependencyFilter ?? DependencyFilter.allExceptUntracked;
		this._validate = options?.validate ?? null;
		this._put = options?.put ?? null;
		this._compareValues = options?.compareValues ?? config.compareValues;
		this._reap = options?.reap ?? null;
		if (this._pull) {
			this._dependencies = void 0;
			this._value = void 0;
			this._state = CellState.DIRTY;
			this._inited = false;
		} else {
			this._dependencies = null;
			this._validate?.(value, void 0);
			this._value = value;
			this._state = CellState.ACTUAL;
			this._inited = true;
			if (value instanceof EventEmitter) value.on("change", this._onValueChange, this);
		}
		if (options) {
			if (options.onChange) this.on("change", options.onChange);
			if (options.onError) this.on(Cell.EVENT_ERROR, options.onError);
		}
	}
	on(type, listener, context) {
		if (this._dependencies !== null) this.actualize();
		if (typeof type == "object") super.on(type, listener !== void 0 ? listener : this.context);
		else super.on(type, listener, context !== void 0 ? context : this.context);
		this._activate();
		return this;
	}
	off(type, listener, context) {
		if (this._dependencies !== null) this.actualize();
		let hasListeners = this._$listeners.has(Cell.EVENT_CHANGE) || this._$listeners.has(Cell.EVENT_ERROR);
		if (type) if (typeof type == "object") super.off(type, listener !== void 0 ? listener : this.context);
		else super.off(type, listener, context !== void 0 ? context : this.context);
		else super.off();
		if (hasListeners && this._reactions.length == 0 && (this._$listeners.size == 0 || !this._$listeners.has(Cell.EVENT_CHANGE) && !this._$listeners.has(Cell.EVENT_ERROR))) {
			this._deactivate();
			this._reap?.call(this.context);
		}
		return this;
	}
	onChange(listener, context) {
		return this.on(Cell.EVENT_CHANGE, listener, context !== void 0 ? context : this.context);
	}
	offChange(listener, context) {
		return this.off(Cell.EVENT_CHANGE, listener, context !== void 0 ? context : this.context);
	}
	onError(listener, context) {
		return this.on(Cell.EVENT_ERROR, listener, context !== void 0 ? context : this.context);
	}
	offError(listener, context) {
		return this.off(Cell.EVENT_ERROR, listener, context !== void 0 ? context : this.context);
	}
	subscribe(listener, context) {
		let wrappers = listener[KEY_LISTENER_WRAPPERS] ?? (listener[KEY_LISTENER_WRAPPERS] = /* @__PURE__ */ new Map());
		if (wrappers.has(this)) return this;
		function wrapper(evt) {
			return listener.call(this, evt.data["error"] ?? null, evt);
		}
		wrappers.set(this, wrapper);
		if (context === void 0) context = this.context;
		return this.on(Cell.EVENT_CHANGE, wrapper, context).on(Cell.EVENT_ERROR, wrapper, context);
	}
	unsubscribe(listener, context) {
		let wrappers = listener[KEY_LISTENER_WRAPPERS];
		let wrapper = wrappers?.get(this);
		if (!wrapper) return this;
		wrappers.delete(this);
		if (context === void 0) context = this.context;
		return this.off(Cell.EVENT_CHANGE, wrapper, context).off(Cell.EVENT_ERROR, wrapper, context);
	}
	_addReaction(reaction) {
		this._reactions.push(reaction);
		this._activate();
	}
	_deleteReaction(reaction) {
		this._reactions.splice(fastIndexOf(this._reactions, reaction), 1);
		if (this._reactions.length == 0 && (this._$listeners.size == 0 || !this._$listeners.has(Cell.EVENT_CHANGE) && !this._$listeners.has(Cell.EVENT_ERROR))) {
			this._deactivate();
			this._reap?.call(this.context);
		}
	}
	_activate() {
		if (this._active) return;
		let deps = this._dependencies;
		if (deps) {
			for (let i = 0;; i++) {
				deps[i]._addReaction(this);
				if (i + 1 == deps.length) break;
			}
			this._state = CellState.ACTUAL;
			this._active = true;
		}
	}
	_deactivate() {
		let deps = this._dependencies;
		if (deps) {
			for (let i = 0;; i++) {
				deps[i]._deleteReaction(this);
				if (i + 1 == deps.length) break;
			}
			this._state = CellState.DIRTY;
			this._active = false;
		}
	}
	_onValueChange(evt) {
		this._updateId = ++Cell_CommonState.lastUpdateId;
		let reactions = this._reactions;
		for (let i = 0; i < reactions.length; i++) reactions[i]._addToRelease(true);
		this.handleEvent(evt);
	}
	_addToRelease(dirty) {
		this._state = dirty ? CellState.DIRTY : CellState.CHECK;
		Cell_CommonState.transaction?.secondaryCells.add(this);
		let reactions = this._reactions;
		if (reactions.length != 0) for (let i = 0;; i++) {
			if (reactions[i]._state == CellState.ACTUAL) reactions[i]._addToRelease(false);
			if (i + 1 == reactions.length) break;
		}
		else if (Cell_CommonState.pendingCells.push(this) == 1) nextTick(release);
	}
	actualize() {
		if (this._state == CellState.DIRTY) this.pull();
		else if (this._state == CellState.CHECK) {
			let deps = this._dependencies;
			for (let i = 0;; i++) {
				deps[i].actualize();
				if (this._state == CellState.DIRTY) {
					this.pull();
					break;
				}
				if (i + 1 == deps.length) {
					this._state = CellState.ACTUAL;
					break;
				}
			}
		}
	}
	get value() {
		return this.get();
	}
	set value(value) {
		this.set(value);
	}
	get() {
		if (this._state != CellState.ACTUAL && this._updateId != Cell_CommonState.lastUpdateId) this.actualize();
		let { currentCell } = Cell_CommonState;
		if (currentCell?._dependencyFilter(this)) if (currentCell._dependencies) {
			if (fastIndexOf(currentCell._dependencies, this) == -1) currentCell._dependencies.push(this);
		} else currentCell._dependencies = [this];
		if (this._error && (currentCell || !(this._error instanceof WaitError))) throw this._error;
		return this._value;
	}
	pull() {
		if (!this._pull) return false;
		if (this._currentlyPulling) throw TypeError("Circular pulling");
		this._currentlyPulling = true;
		let prevDeps = this._dependencies;
		this._dependencies = null;
		let prevCell = Cell_CommonState.currentCell;
		Cell_CommonState.currentCell = this;
		let value;
		try {
			if (this._pull.length == 0) value = this._pull.call(this.context);
			else {
				if (!this._bound) {
					this.push = this.push.bind(this);
					this.fail = this.fail.bind(this);
					this._bound = true;
				}
				value = this._pull.call(this.context, this, this._value);
			}
			if (value instanceof Promise) {
				value.then((value$1) => this.push(value$1), (err) => this.fail(err));
				$error.error = new WaitError();
				value = $error;
			}
		} catch (err) {
			$error.error = err;
			value = $error;
		}
		Cell_CommonState.currentCell = prevCell;
		this._currentlyPulling = false;
		if (this._reactions.length != 0 || this._$listeners.has(Cell.EVENT_CHANGE) || this._$listeners.has(Cell.EVENT_ERROR)) {
			let deps = this._dependencies;
			let newDepCount = 0;
			if (deps) for (let i = 0;; i++) {
				let dep = deps[i];
				if (!prevDeps || fastIndexOf(prevDeps, dep) == -1) {
					dep._addReaction(this);
					newDepCount++;
				}
				if (i + 1 == deps.length) break;
			}
			if (prevDeps && (!deps || deps.length - newDepCount < prevDeps.length)) for (let i = 0;; i++) {
				if (!deps || fastIndexOf(deps, prevDeps[i]) == -1) prevDeps[i]._deleteReaction(this);
				if (i + 1 == prevDeps.length) break;
			}
			if (deps) {
				if (!prevDeps) this._active = true;
			} else {
				this._state = CellState.ACTUAL;
				this._active = false;
			}
		} else this._state = this._dependencies ? CellState.DIRTY : CellState.ACTUAL;
		return value === $error ? this.fail($error.error, true) : this.push(value, true);
	}
	set(value) {
		if (!this._inited) this.pull();
		this._validate?.(value, this._value);
		if (this._put) {
			if (!this._bound) {
				this.push = this.push.bind(this);
				this.fail = this.fail.bind(this);
				this._bound = true;
			}
			if (this._put.length >= 3) this._put.call(this.context, this, value, this._value);
			else this._put.call(this.context, this, value);
		} else this.push(value);
		return this;
	}
	push(value, _afterPull) {
		this._inited = true;
		let err = this._error;
		if (err) this._setError(null, true);
		let prevValue = this._value;
		let changed = !this._compareValues(value, prevValue);
		if (changed) {
			this._value = value;
			if (Cell_CommonState.transaction && !Cell_CommonState.transaction.primaryCells.has(this)) Cell_CommonState.transaction.primaryCells.set(this, prevValue);
			if (prevValue instanceof EventEmitter) prevValue.off("change", this._onValueChange, this);
			if (value instanceof EventEmitter) value.on("change", this._onValueChange, this);
		}
		if (this._active) this._state = CellState.ACTUAL;
		this._updateId = _afterPull ? Cell_CommonState.lastUpdateId : ++Cell_CommonState.lastUpdateId;
		if (changed || err instanceof WaitError) {
			let reactions = this._reactions;
			for (let i = 0; i < reactions.length; i++) reactions[i]._addToRelease(true);
			if (changed) this.emit(Cell.EVENT_CHANGE, {
				prevValue,
				value
			});
		}
		return changed;
	}
	fail(err, _afterPull) {
		this._inited = true;
		let isWaitError = err instanceof WaitError;
		if (!isWaitError) {
			if (this.debugKey !== void 0) config.logError("[" + this.debugKey + "]", err);
			else config.logError(err);
			if (!(err instanceof Error)) err = Error(err);
		}
		this._setError({
			target: this,
			type: Cell.EVENT_ERROR,
			data: { error: err }
		}, !!_afterPull);
		if (this._active) this._state = CellState.ACTUAL;
		return isWaitError;
	}
	_setError(errorEvent, afterPull) {
		if (this._lastErrorEvent === errorEvent) return;
		let err = errorEvent && errorEvent.data.error;
		this._errorCell?.set(err);
		this._error = err;
		this._lastErrorEvent = errorEvent;
		this._updateId = afterPull ? Cell_CommonState.lastUpdateId : ++Cell_CommonState.lastUpdateId;
		if (errorEvent) this.handleEvent(errorEvent);
		let reactions = this._reactions;
		for (let i = 0; i < reactions.length; i++) reactions[i]._setError(errorEvent, afterPull);
	}
	wait() {
		throw new WaitError();
	}
	reap() {
		this.off();
		this._errorCell?.reap();
		let reactions = this._reactions;
		for (let i = 0; i < reactions.length; i++) reactions[i].reap();
		return this;
	}
	dispose() {
		return this.reap();
	}
};

//#endregion
//#region src/effect.ts
function effect(cell, fn, context) {
	let disposer;
	let listener = function(evt) {
		return fn.call(this, evt, disposer);
	};
	disposer = () => {
		cell.offChange(listener, context);
	};
	cell.onChange(listener, context);
	return disposer;
}

//#endregion
//#region src/define.ts
function defineObservableProperty(obj, key, value) {
	(obj[KEY_VALUE_CELLS] || (obj[KEY_VALUE_CELLS] = /* @__PURE__ */ new Map())).set(key, value instanceof Cell ? value : new Cell(value, { context: obj }));
	Object.defineProperty(obj, key, {
		configurable: true,
		enumerable: true,
		get() {
			return this[KEY_VALUE_CELLS].get(key).get();
		},
		set(value$1) {
			this[KEY_VALUE_CELLS].get(key).set(value$1);
		}
	});
	return obj;
}
function defineObservableProperties(obj, props) {
	for (let key of Object.keys(props)) defineObservableProperty(obj, key, props[key]);
	return obj;
}
function define(obj, keyOrProps, value) {
	if (typeof keyOrProps == "object") defineObservableProperties(obj, keyOrProps);
	else defineObservableProperty(obj, keyOrProps, value);
	return obj;
}

//#endregion
//#region src/cellx.ts
function cellx(value, options) {
	return new Cell(value, options);
}

//#endregion
exports.Cell = Cell;
exports.DependencyFilter = DependencyFilter;
exports.EventEmitter = EventEmitter;
exports.KEY_VALUE_CELLS = KEY_VALUE_CELLS;
exports.WaitError = WaitError;
exports.afterRelease = afterRelease;
exports.autorun = autorun;
exports.cellx = cellx;
exports.configure = configure;
exports.define = define;
exports.defineObservableProperties = defineObservableProperties;
exports.defineObservableProperty = defineObservableProperty;
exports.effect = effect;
exports.release = release;
exports.tracked = tracked;
exports.transact = transact;
exports.untracked = untracked;
});