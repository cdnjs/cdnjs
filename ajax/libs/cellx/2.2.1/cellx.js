//#region src/config.ts
var config = {
  logError: (...args) => {
    console.error(...args);
  },
  compareValues: Object.is
};
function configure(options) {
  return Object.assign(config, options);
}

//#endregion
//#region src/EventEmitter.ts
var EventEmitter_CommonState = {
  inBatchCounter: 0,
  batchedEvents: [],
  inSilentlyCounter: 0
};
var EventEmitter = class {
  static batch(fn) {
    EventEmitter_CommonState.inBatchCounter++;
    try {
      fn();
    } finally {
      if (--EventEmitter_CommonState.inBatchCounter == 0) {
        var events = EventEmitter_CommonState.batchedEvents;
        EventEmitter_CommonState.batchedEvents = [];
        for (var i = 0; i < events.length; i++) events[i].target.handleEvent(events[i]);
      }
    }
  }
  static silently(fn) {
    EventEmitter_CommonState.inSilentlyCounter++;
    try {
      fn();
    } finally {
      EventEmitter_CommonState.inSilentlyCounter--;
    }
  }
  _$listeners = /* @__PURE__ */new Map();
  get$Listeners(type) {
    return type ? this._$listeners.get(type) ?? [] : this._$listeners;
  }
  on(type, listener, context) {
    if (typeof type == "object") {
      context = listener !== void 0 ? listener : this;
      var listeners = type;
      for (type in listeners) if (Object.prototype.hasOwnProperty.call(listeners, type)) this._on(type, listeners[type], context);
      for (var type$1 of Object.getOwnPropertySymbols(listeners)) this._on(type$1, listeners[type$1], context);
    } else this._on(type, listener, context !== void 0 ? context : this);
    return this;
  }
  off(type, listener, context) {
    if (type) {
      if (typeof type == "object") {
        context = listener !== void 0 ? listener : this;
        var listeners = type;
        for (type in listeners) if (Object.prototype.hasOwnProperty.call(listeners, type)) this._off(type, listeners[type], context);
        for (var type$1 of Object.getOwnPropertySymbols(listeners)) this._off(type$1, listeners[type$1], context);
      } else this._off(type, listener, context !== void 0 ? context : this);
    } else this._$listeners.clear();
    return this;
  }
  _on(type, listener, context) {
    var type$Listeners = this._$listeners.get(type);
    var $listener = {
      listener,
      context
    };
    if (type$Listeners) type$Listeners.push($listener);else this._$listeners.set(type, [$listener]);
  }
  _off(type, listener, context) {
    var type$Listeners = this._$listeners.get(type);
    if (!type$Listeners) return;
    if (type$Listeners.length == 1) {
      if (type$Listeners[0].listener == listener && type$Listeners[0].context === context) this._$listeners.delete(type);
    } else for (var i = 0;; i++) {
      if (type$Listeners[i].listener == listener && type$Listeners[i].context === context) {
        type$Listeners.splice(i, 1);
        break;
      }
      if (i + 1 == type$Listeners.length) break;
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
      if (!evt.target) evt.target = this;else if (evt.target != this) throw TypeError("Event cannot be emitted on this target");
    } else evt = {
      target: this,
      type: evt
    };
    if (data) evt.data = data;
    if (EventEmitter_CommonState.inSilentlyCounter == 0) if (EventEmitter_CommonState.inBatchCounter != 0) for (var i = EventEmitter_CommonState.batchedEvents.length;;) {
      if (i == 0) {
        if (evt.data) evt.data["prevEvent"] = null;else evt.data = {
          prevEvent: null
        };
        EventEmitter_CommonState.batchedEvents.push(evt);
        break;
      }
      var event = EventEmitter_CommonState.batchedEvents[--i];
      if (event.target == this && event.type === evt.type) {
        if (evt.data) evt.data["prevEvent"] = event;else evt.data = {
          prevEvent: event
        };
        EventEmitter_CommonState.batchedEvents[i] = evt;
        break;
      }
    } else this.handleEvent(evt);
    return evt;
  }
  handleEvent(evt) {
    var type$Listeners = this._$listeners.get(evt.type);
    if (!type$Listeners) return;
    if (type$Listeners.length == 1) {
      if (this._tryEventListener(type$Listeners[0], evt) === false) evt.propagationStopped = true;
    } else {
      type$Listeners = type$Listeners.slice();
      for (var i = 0; i < type$Listeners.length; i++) if (this._tryEventListener(type$Listeners[i], evt) === false) evt.propagationStopped = true;
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
  var disposer;
  new Cell({
    onChange: () => {},
    ...cellOptions,
    pull: function (cell, value) {
      return fn.call(this, value, disposer ??= () => {
        cell.dispose();
      });
    }
  });
  return disposer;
}

//#endregion
//#region src/keys.ts
var KEY_LISTENER_WRAPPERS = Symbol("listenerWrappers");

//#endregion
//#region src/reaction.ts
function reaction(source, fn, cellOptions) {
  var cell = new Cell({
    ...cellOptions,
    pull: source instanceof Cell ? () => source.value : Array.isArray(source) ? () => source.map(cell$1 => cell$1.value) : source
  });
  var disposer = () => {
    cell.dispose();
  };
  cell.onChange(function ({
    data
  }) {
    return fn.call(this, data.value, data.prevValue, disposer);
  });
  return disposer;
}

//#endregion
//#region src/release.ts
function release() {
  while (Cell_CommonState.pendingCellsIndex < Cell_CommonState.pendingCells.length) {
    var cell = Cell_CommonState.pendingCells[Cell_CommonState.pendingCellsIndex++];
    if (cell._active) cell.actualize();
  }
  Cell_CommonState.pendingCells.length = 0;
  Cell_CommonState.pendingCellsIndex = 0;
  if (Cell_CommonState.afterRelease) {
    var {
      afterRelease: afterRelease$1
    } = Cell_CommonState;
    Cell_CommonState.afterRelease = null;
    for (var i = 0; i < afterRelease$1.length; i++) afterRelease$1[i]();
  }
}

//#endregion
//#region src/track.ts
var DependencyFilter = {
  allExceptUntracked: dependency => Cell_CommonState.inUntrackedCounter == 0,
  onlyTracked: dependency => Cell_CommonState.inTrackedCounter != 0
};
function untracked(fn) {
  Cell_CommonState.inUntrackedCounter++;
  try {
    return fn();
  } finally {
    Cell_CommonState.inUntrackedCounter--;
  }
}
function tracked(fn) {
  Cell_CommonState.inTrackedCounter++;
  try {
    return fn();
  } finally {
    Cell_CommonState.inTrackedCounter--;
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
    primaryCells: /* @__PURE__ */new Map(),
    secondaryCells: /* @__PURE__ */new Set()
  };
  try {
    fn();
  } catch (err) {
    for (var [cell, value] of Cell_CommonState.transaction.primaryCells) cell._value = value;
    for (var _cell of Cell_CommonState.transaction.secondaryCells) _cell._state = CellState.ACTUAL;
    Cell_CommonState.pendingCells.length = 0;
    Cell_CommonState.pendingCellsIndex = 0;
    Cell_CommonState.transaction = null;
    throw err;
  }
  Cell_CommonState.transaction = null;
  if (Cell_CommonState.pendingCells.length != 0) release();
}

//#endregion
//#region src/utils/isEventEmitterLike.ts
function isEventEmitterLike(value) {
  return !!value && typeof value["on"] == "function" && typeof value["off"] == "function" && typeof value["emit"] == "function";
}

//#endregion
//#region src/utils/isPromiseLike.ts
function isPromiseLike(value) {
  return !!value && typeof value["then"] == "function";
}

//#endregion
//#region src/utils/nextTick.ts
/* istanbul ignore next */
var nextTick = globalThis.process?.nextTick ?? (() => {
  var resolvedPromise = Promise.resolve();
  return cb => {
    resolvedPromise.then(cb);
  };
})();

//#endregion
//#region src/Cell.ts
var CellState = /* @__PURE__ */function (CellState$1) {
  CellState$1["ACTUAL"] = "actual";
  CellState$1["DIRTY"] = "dirty";
  CellState$1["CHECK"] = "check";
  CellState$1["PULLING"] = "pulling";
  return CellState$1;
}({});
var Cell_CommonState = {
  pendingCells: [],
  pendingCellsIndex: 0,
  afterRelease: null,
  currentCell: null,
  inUntrackedCounter: 0,
  inTrackedCounter: 0,
  lastUpdateId: 0,
  transaction: null
};
var $error = null;
var Cell = class Cell extends EventEmitter {
  static EVENT_CHANGE = "change";
  static EVENT_ERROR = "error";
  static get currentlyPulling() {
    return Cell_CommonState.currentCell != null;
  }
  static autorun = autorun;
  static reaction = reaction;
  static release = release;
  static afterRelease = afterRelease;
  static transact = transact;
  context;
  meta;
  _pull;
  _dependencyFilter;
  _validateValue;
  _put;
  _compareValues;
  _reap;
  _dependencies;
  _dependents = null;
  _value;
  _error$ = null;
  _error = null;
  get error() {
    return Cell_CommonState.currentCell ? (this._error$ ?? (this._error$ = new Cell({
      value: this._error
    }))).get() : this._error;
  }
  _bound = false;
  _inited;
  get inited() {
    return this._inited;
  }
  _active = false;
  get active() {
    return this._active;
  }
  _state;
  get state() {
    return this._state;
  }
  _updateId = -1;
  constructor(options) {
    super();
    this.context = options.context ?? null;
    this.meta = options.meta ?? null;
    this._pull = options.pull ?? null;
    this._dependencyFilter = options.dependencyFilter ?? DependencyFilter.allExceptUntracked;
    this._validateValue = options.validate ?? null;
    this._put = options.put ?? null;
    this._compareValues = options.compareValues ?? config.compareValues;
    this._reap = options.reap ?? null;
    if (this._pull) {
      if (this._pull.length != 0) {
        this.push = this.push.bind(this);
        this.fail = this.fail.bind(this);
        this._bound = true;
      }
      this._dependencies = void 0;
      this._value = void 0;
      this._inited = false;
      this._state = CellState.DIRTY;
    } else {
      var value = options.value;
      this._validateValue?.(value, void 0);
      this._dependencies = null;
      this._value = value;
      this._inited = true;
      this._state = CellState.ACTUAL;
      if (isEventEmitterLike(value)) value.on("change", this._onValueChange, this);
    }
    if (options.onChange) this.on("change", options.onChange);
    if (options.onError) this.on("error", options.onError);
  }
  on(type, listener, context) {
    if (this._dependencies !== null) this.actualize();
    if (typeof type == "object") super.on(type, listener !== void 0 ? listener : this.context);else super.on(type, listener, context !== void 0 ? context : this.context);
    this._activate();
    return this;
  }
  off(type, listener, context) {
    if (this._dependencies !== null) this.actualize();
    var hasListeners = this._$listeners.has(Cell.EVENT_CHANGE) || this._$listeners.has(Cell.EVENT_ERROR);
    if (type) {
      if (typeof type == "object") super.off(type, listener !== void 0 ? listener : this.context);else super.off(type, listener, context !== void 0 ? context : this.context);
    } else super.off();
    if (hasListeners && !this._dependents && (this._$listeners.size == 0 || !this._$listeners.has(Cell.EVENT_CHANGE) && !this._$listeners.has(Cell.EVENT_ERROR))) {
      this._deactivate();
      this._reap?.call(this.context);
    }
    return this;
  }
  onChange(listener, context) {
    return this.on(Cell.EVENT_CHANGE, listener, context);
  }
  offChange(listener, context) {
    return this.off(Cell.EVENT_CHANGE, listener, context);
  }
  onError(listener, context) {
    return this.on(Cell.EVENT_ERROR, listener, context);
  }
  offError(listener, context) {
    return this.off(Cell.EVENT_ERROR, listener, context);
  }
  subscribe(listener, context) {
    var wrappers = listener[KEY_LISTENER_WRAPPERS] ?? (listener[KEY_LISTENER_WRAPPERS] = /* @__PURE__ */new Map());
    if (wrappers.has(this)) return this;
    function wrapper(evt) {
      return listener.call(this, evt.data["error"] ?? null, evt);
    }
    wrappers.set(this, wrapper);
    if (context === void 0) context = this.context;
    return this.on(Cell.EVENT_CHANGE, wrapper, context).on(Cell.EVENT_ERROR, wrapper, context);
  }
  unsubscribe(listener, context) {
    var wrappers = listener[KEY_LISTENER_WRAPPERS];
    var wrapper = wrappers?.get(this);
    if (!wrapper) return this;
    wrappers.delete(this);
    if (context === void 0) context = this.context;
    return this.off(Cell.EVENT_CHANGE, wrapper, context).off(Cell.EVENT_ERROR, wrapper, context);
  }
  _addDependent(dependent) {
    var currentDependent = this._dependents;
    if (currentDependent) {
      for (;; currentDependent = currentDependent.next) if (!currentDependent.next) {
        currentDependent.next = {
          cell: dependent,
          next: null
        };
        break;
      }
    } else this._dependents = {
      cell: dependent,
      next: null
    };
    this._activate();
  }
  _deleteDependent(dependent) {
    var currentDependent = this._dependents;
    if (currentDependent.cell == dependent) this._dependents = currentDependent.next;else for (var prevDependent;;) {
      prevDependent = currentDependent;
      currentDependent = currentDependent.next;
      if (!currentDependent) break;
      if (currentDependent.cell == dependent) {
        prevDependent.next = currentDependent.next;
        break;
      }
    }
    if (!this._dependents && (this._$listeners.size == 0 || !this._$listeners.has(Cell.EVENT_CHANGE) && !this._$listeners.has(Cell.EVENT_ERROR))) {
      this._deactivate();
      this._reap?.call(this.context);
    }
  }
  _activate() {
    if (this._active) return;
    var dependency = this._dependencies;
    if (dependency) {
      do dependency.cell._addDependent(this); while (dependency = dependency.next);
      this._active = true;
      this._state = CellState.ACTUAL;
    }
  }
  _deactivate() {
    var dependency = this._dependencies;
    if (dependency) {
      do dependency.cell._deleteDependent(this); while (dependency = dependency.next);
      this._active = false;
      this._state = CellState.DIRTY;
    }
  }
  _onValueChange(evt) {
    this._updateId = ++Cell_CommonState.lastUpdateId;
    for (var dependent = this._dependents; dependent; dependent = dependent.next) dependent.cell._addToRelease(true);
    this.emit("change", {
      sourceEvent: evt
    });
  }
  _addToRelease(dirty) {
    this._state = dirty ? CellState.DIRTY : CellState.CHECK;
    Cell_CommonState.transaction?.secondaryCells.add(this);
    var dependent = this._dependents;
    if (dependent) {
      do if (dependent.cell._state == CellState.ACTUAL) dependent.cell._addToRelease(false); while (dependent = dependent.next);
    } else if (Cell_CommonState.pendingCells.push(this) == 1) nextTick(release);
  }
  actualize() {
    if (this._state == CellState.DIRTY) this.pull();else if (this._state == CellState.CHECK) for (var dependency = this._dependencies;;) {
      if (dependency.cell.actualize()._error) {
        this._fail(dependency.cell._error);
        break;
      }
      if (this._state == CellState.DIRTY) {
        this.pull();
        break;
      }
      if (!(dependency = dependency.next)) {
        this._state = CellState.ACTUAL;
        break;
      }
    }
    return this;
  }
  get value() {
    return this.get();
  }
  set value(value) {
    this.set(value);
  }
  get() {
    if (this._state != CellState.ACTUAL && this._updateId != Cell_CommonState.lastUpdateId) this.actualize();
    var {
      currentCell
    } = Cell_CommonState;
    if (currentCell?._dependencyFilter(this)) {
      var dependency = currentCell._dependencies;
      if (dependency) for (;;) {
        if (dependency.cell == this) {
          dependency.state = 1;
          break;
        }
        if (dependency.next) dependency = dependency.next;else {
          dependency.next = {
            cell: this,
            state: 2,
            next: null
          };
          break;
        }
      } else currentCell._dependencies = {
        cell: this,
        state: 2,
        next: null
      };
    }
    if (this._error && (currentCell || !(this._error instanceof WaitError))) throw this._error;
    return this._value;
  }
  pull() {
    if (!this._pull) return false;
    if (this._state == CellState.PULLING) throw TypeError("Circular pulling");
    this._state = CellState.PULLING;
    var dependency = this._dependencies;
    if (dependency) do dependency.state = 0; while (dependency = dependency.next);else this._dependencies = null;
    var prevCell = Cell_CommonState.currentCell;
    Cell_CommonState.currentCell = this;
    var value;
    try {
      value = this._bound ? this._pull.call(this.context, this, this._value) : this._pull.call(this.context);
      if (isPromiseLike(value)) {
        value.then(value$1 => this._push(value$1), err => this._fail(err));
        $error = {
          error: new WaitError()
        };
        value = $error;
      }
    } catch (err) {
      $error = {
        error: err
      };
    }
    Cell_CommonState.currentCell = prevCell;
    if (this._dependents || this._$listeners.has(Cell.EVENT_CHANGE) || this._$listeners.has(Cell.EVENT_ERROR)) {
      for (var holder = this, dependency$1 = this._dependencies; dependency$1;) if (dependency$1.state == 0) {
        dependency$1.cell._deleteDependent(this);
        dependency$1 = holder == this ? this._dependencies = dependency$1.next : holder.next = dependency$1.next;
      } else {
        if (dependency$1.state == 2) dependency$1.cell._addDependent(this);
        holder = dependency$1;
        dependency$1 = dependency$1.next;
      }
      if (this._dependencies) this._active = true;else {
        this._active = false;
        this._state = CellState.ACTUAL;
      }
    } else this._state = this._dependencies ? CellState.DIRTY : CellState.ACTUAL;
    return $error ? this._fail($error.error, true) : this._push(value, true);
  }
  set(value) {
    if (!this._inited) this.pull();
    this._validateValue?.(value, this._value);
    if (this._put) {
      if (!this._bound) {
        this.push = this.push.bind(this);
        this.fail = this.fail.bind(this);
        this._bound = true;
      }
      if (this._put.length >= 3) this._put.call(this.context, this, value, this._value);else this._put.call(this.context, this, value);
    } else this._push(value);
    return this;
  }
  push(value) {
    return this._push(value);
  }
  _push(value, fromPull) {
    this._inited = true;
    var err = this._error;
    if (err) {
      this._error$?.set(err);
      this._error = err;
    }
    var prevValue = this._value;
    var changed = !this._compareValues(value, prevValue);
    if (changed) {
      this._value = value;
      if (Cell_CommonState.transaction && !Cell_CommonState.transaction.primaryCells.has(this)) Cell_CommonState.transaction.primaryCells.set(this, prevValue);
      if (isEventEmitterLike(prevValue)) prevValue.off("change", this._onValueChange, this);
      if (isEventEmitterLike(value)) value.on("change", this._onValueChange, this);
    }
    if (this._active) this._state = CellState.ACTUAL;
    this._updateId = fromPull ? Cell_CommonState.lastUpdateId : ++Cell_CommonState.lastUpdateId;
    if (changed || err instanceof WaitError) {
      for (var dependent = this._dependents; dependent; dependent = dependent.next) dependent.cell._addToRelease(true);
      if (changed) this.emit(Cell.EVENT_CHANGE, {
        prevValue,
        value
      });
    }
    return changed;
  }
  fail(err) {
    return this._fail(err);
  }
  _fail(err, fromPull) {
    this._inited = true;
    var isWaitError = err instanceof WaitError;
    if (!isWaitError && !(err instanceof Error)) err = Error(err);
    this._error$?.set(err);
    this._error = err;
    if (this._active) this._state = CellState.ACTUAL;
    this._updateId = fromPull ? Cell_CommonState.lastUpdateId : ++Cell_CommonState.lastUpdateId;
    if (!isWaitError && $error) {
      $error = null;
      if (this.meta?.["id"] !== void 0) config.logError(`[${this.meta?.["id"]}]`, err);else config.logError(err);
    }
    this.emit(Cell.EVENT_ERROR, {
      error: err
    });
    return isWaitError;
  }
  wait() {
    throw new WaitError();
  }
  reap() {
    this.off();
    this._error$?.reap();
    for (var dependent = this._dependents; dependent; dependent = dependent.next) dependent.cell.reap();
    return this;
  }
  dispose() {
    return this.reap();
  }
};

//#endregion
//#region src/define.ts
function defineObservableProperty(obj, key, value) {
  var cell = new Cell({
    value,
    context: obj
  });
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      return cell.get();
    },
    set(value$1) {
      cell.set(value$1);
    }
  });
  return obj;
}
function defineObservableProperties(obj, props) {
  for (var key of Object.keys(props)) defineObservableProperty(obj, key, props[key]);
  return obj;
}
function define(obj, keyOrProps, value) {
  if (typeof keyOrProps == "object") defineObservableProperties(obj, keyOrProps);else defineObservableProperty(obj, keyOrProps, value);
  return obj;
}

//#endregion
//#region src/cellx.ts
function observable(value, options) {
  return new Cell({
    ...options,
    pull: void 0,
    value
  });
}
function computed(pullFn, options) {
  return new Cell({
    ...options,
    pull: pullFn
  });
}
function cellx(valueOrPullFn, options) {
  return typeof valueOrPullFn == "function" ? computed(valueOrPullFn, options) : observable(valueOrPullFn, options);
}

//#endregion
export { Cell, CellState, DependencyFilter, EventEmitter, WaitError, afterRelease, autorun, cellx, computed, configure, define, defineObservableProperties, defineObservableProperty, observable, reaction, release, tracked, transact, untracked };