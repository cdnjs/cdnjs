(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.cellx = {}));
})(this, (function (exports) { 'use strict';

    const config = {
        logError: (...args) => {
            console.error(...args);
        },
        compareValues: Object.is
    };
    function configure(options) {
        return Object.assign(config, options);
    }

    const KEY_VALUE_CELLS = Symbol('valueCells');

    let currentlySubscribing = false;
    let transactionLevel = 0;
    let transactionEvents = [];
    let silently = false;
    class EventEmitter {
        constructor() {
            this._$listeners = new Map();
        }
        static get currentlySubscribing() {
            return currentlySubscribing;
        }
        static transact(cb) {
            transactionLevel++;
            try {
                cb();
            }
            finally {
                if (--transactionLevel == 0) {
                    let events = transactionEvents;
                    transactionEvents = [];
                    for (let i = 0; i < events.length; i++) {
                        events[i].target.handleEvent(events[i]);
                    }
                }
            }
        }
        static silently(cb) {
            if (silently) {
                cb();
                return;
            }
            silently = true;
            try {
                cb();
            }
            finally {
                silently = false;
            }
        }
        get$Listeners(type) {
            return type ? (this._$listeners.get(type) ?? []) : this._$listeners;
        }
        on(type, listener, context) {
            if (typeof type == 'object') {
                context = listener !== undefined ? listener : this;
                let listeners = type;
                for (type in listeners) {
                    if (Object.prototype.hasOwnProperty.call(listeners, type)) {
                        this._on(type, listeners[type], context);
                    }
                }
                for (let type of Object.getOwnPropertySymbols(listeners)) {
                    this._on(type, listeners[type], context);
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
                        if (Object.prototype.hasOwnProperty.call(listeners, type)) {
                            this._off(type, listeners[type], context);
                        }
                    }
                    for (let type of Object.getOwnPropertySymbols(listeners)) {
                        this._off(type, listeners[type], context);
                    }
                }
                else {
                    this._off(type, listener, context !== undefined ? context : this);
                }
            }
            else {
                this._$listeners.clear();
            }
            return this;
        }
        _on(type, listener, context) {
            let index;
            if (typeof type == 'string' && (index = type.indexOf(':')) != -1) {
                let propName = type.slice(index + 1);
                currentlySubscribing = true;
                ((this[KEY_VALUE_CELLS] ?? (this[KEY_VALUE_CELLS] = new Map())).get(propName) ?? (this[propName], this[KEY_VALUE_CELLS]).get(propName)).on(type.slice(0, index), listener, context);
                currentlySubscribing = false;
            }
            else {
                let type$Listeners = this._$listeners.get(type);
                let $listener = {
                    listener,
                    context
                };
                if (type$Listeners) {
                    type$Listeners.push($listener);
                }
                else {
                    this._$listeners.set(type, [$listener]);
                }
            }
        }
        _off(type, listener, context) {
            let index;
            if (typeof type == 'string' && (index = type.indexOf(':')) != -1) {
                this[KEY_VALUE_CELLS]?.get(type.slice(index + 1))?.off(type.slice(0, index), listener, context);
            }
            else {
                let type$Listeners = this._$listeners.get(type);
                if (!type$Listeners) {
                    return;
                }
                if (type$Listeners.length == 1) {
                    if (type$Listeners[0].listener == listener &&
                        type$Listeners[0].context === context) {
                        this._$listeners.delete(type);
                    }
                }
                else {
                    for (let i = 0;; i++) {
                        if (type$Listeners[i].listener == listener &&
                            type$Listeners[i].context === context) {
                            type$Listeners.splice(i, 1);
                            break;
                        }
                        if (i + 1 == type$Listeners.length) {
                            break;
                        }
                    }
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
            if (typeof evt == 'object') {
                if (!evt.target) {
                    evt.target = this;
                }
                else if (evt.target != this) {
                    throw TypeError('Event cannot be emitted on this target');
                }
            }
            else {
                evt = {
                    target: this,
                    type: evt
                };
            }
            if (data) {
                evt.data = data;
            }
            if (!silently) {
                if (transactionLevel != 0) {
                    for (let i = transactionEvents.length;;) {
                        if (i == 0) {
                            if (evt.data) {
                                evt.data['prevEvent'] = null;
                            }
                            else {
                                evt.data = { prevEvent: null };
                            }
                            transactionEvents.push(evt);
                            break;
                        }
                        let event = transactionEvents[--i];
                        if (event.target == this && event.type === evt.type) {
                            if (evt.data) {
                                evt.data['prevEvent'] = event;
                            }
                            else {
                                evt.data = { prevEvent: event };
                            }
                            transactionEvents[i] = evt;
                            break;
                        }
                    }
                }
                else {
                    this.handleEvent(evt);
                }
            }
            return evt;
        }
        handleEvent(evt) {
            let type$Listeners = this._$listeners.get(evt.type);
            if (!type$Listeners) {
                return;
            }
            if (type$Listeners.length == 1) {
                if (this._tryEventListener(type$Listeners[0], evt) === false) {
                    evt.propagationStopped = true;
                }
            }
            else {
                type$Listeners = type$Listeners.slice();
                for (let i = 0; i < type$Listeners.length; i++) {
                    if (this._tryEventListener(type$Listeners[i], evt) === false) {
                        evt.propagationStopped = true;
                    }
                }
            }
        }
        _tryEventListener($listener, evt) {
            try {
                return $listener.listener.call($listener.context, evt);
            }
            catch (err) {
                config.logError(err);
            }
        }
    }

    function fastIndexOf(arr, value) {
        let len = arr.length;
        if (len != 0) {
            if (arr[0] === value) {
                return 0;
            }
            for (let i = 1; i < len; i++) {
                if (arr[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }

    /* istanbul ignore next */
    const nextTick = globalThis.process?.nextTick ??
        (() => {
            const resolvedPromise = Promise.resolve();
            return (cb) => {
                resolvedPromise.then(cb);
            };
        })();

    class WaitError extends Error {
    }

    var CellState;
    (function (CellState) {
        CellState["ACTUAL"] = "actual";
        CellState["DIRTY"] = "dirty";
        CellState["CHECK"] = "check";
    })(CellState || (CellState = {}));
    const KEY_LISTENER_WRAPPERS = Symbol('listenerWrappers');
    const pendingCells = [];
    let pendingCellsIndex = 0;
    let afterRelease;
    let currentCell = null;
    const $error = { error: null };
    let lastUpdationId = 0;
    let transaction = null;
    function release() {
        while (pendingCellsIndex < pendingCells.length) {
            let cell = pendingCells[pendingCellsIndex++];
            if (cell._active) {
                cell.actualize();
            }
        }
        pendingCells.length = 0;
        pendingCellsIndex = 0;
        if (afterRelease) {
            let afterRelease_ = afterRelease;
            afterRelease = null;
            for (let i = 0; i < afterRelease_.length; i++) {
                afterRelease_[i]();
            }
        }
    }
    class Cell extends EventEmitter {
        static get currentlyPulling() {
            return currentCell != null;
        }
        static autorun(cb, cellOptions) {
            let disposer;
            new Cell(function (cell, value) {
                if (!disposer) {
                    disposer = () => {
                        cell.dispose();
                    };
                }
                return cb.call(this, value, disposer);
            }, cellOptions?.onChange
                ? cellOptions
                : {
                    ...cellOptions,
                    onChange: () => { }
                });
            return disposer;
        }
        static release() {
            release();
        }
        static afterRelease(cb) {
            (afterRelease ?? (afterRelease = [])).push(cb);
        }
        static transact(cb) {
            if (transaction) {
                cb();
                return;
            }
            if (pendingCells.length != 0) {
                release();
            }
            transaction = {
                primaryCells: new Map(),
                secondaryCells: new Set()
            };
            try {
                cb();
            }
            catch (err) {
                for (let [cell, value] of transaction.primaryCells) {
                    cell._value = value;
                }
                for (let cell of transaction.secondaryCells) {
                    cell._state = CellState.ACTUAL;
                }
                pendingCells.length = 0;
                pendingCellsIndex = 0;
                transaction = null;
                throw err;
            }
            transaction = null;
            if (pendingCells.length != 0) {
                release();
            }
        }
        get error() {
            return currentCell
                ? (this._errorCell ?? (this._errorCell = new Cell(this._error))).get()
                : this._error;
        }
        get state() {
            return this._state;
        }
        constructor(value, options) {
            super();
            this._reactions = [];
            this._errorCell = null;
            this._error = null;
            this._lastErrorEvent = null;
            // active = deps && (reactions || listeners)
            this._active = false;
            this._currentlyPulling = false;
            this._updationId = -1;
            this._bound = false;
            this.debugKey = options?.debugKey;
            this.context = (options?.context ?? null);
            this.meta = options?.meta ?? null;
            this._slippery = options?.slippery ?? false;
            this._sticky = options?.sticky ?? false;
            this._pull = options?.pull ?? (typeof value == 'function' ? value : null);
            this._validate = options?.validate ?? null;
            this._put = options?.put ?? null;
            this._compareValues = options?.compareValues ?? config.compareValues;
            this._reap = options?.reap ?? null;
            if (this._pull) {
                this._dependencies = undefined;
                this._value = undefined;
                this._state = CellState.DIRTY;
                this._inited = false;
            }
            else {
                this._dependencies = null;
                if (options?.value !== undefined) {
                    value = options.value;
                }
                this._validate?.(value, undefined);
                this._value = value;
                this._state = CellState.ACTUAL;
                this._inited = true;
                if (value instanceof EventEmitter) {
                    value.on('change', this._onValueChange, this);
                }
            }
            if (options) {
                if (options.onChange) {
                    this.on('change', options.onChange);
                }
                if (options.onError) {
                    this.on(Cell.EVENT_ERROR, options.onError);
                }
            }
        }
        on(type, listener, context) {
            if (this._dependencies !== null) {
                this.actualize();
            }
            if (typeof type == 'object') {
                super.on(type, listener !== undefined ? listener : this.context);
            }
            else {
                super.on(type, listener, context !== undefined ? context : this.context);
            }
            this._activate();
            return this;
        }
        off(type, listener, context) {
            if (this._dependencies !== null) {
                this.actualize();
            }
            let hasListeners = this._$listeners.has(Cell.EVENT_CHANGE) || this._$listeners.has(Cell.EVENT_ERROR);
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
            if (hasListeners &&
                this._reactions.length == 0 &&
                (this._$listeners.size == 0 ||
                    (!this._$listeners.has(Cell.EVENT_CHANGE) &&
                        !this._$listeners.has(Cell.EVENT_ERROR)))) {
                this._deactivate();
                this._reap?.call(this.context);
            }
            return this;
        }
        onChange(listener, context) {
            return this.on(Cell.EVENT_CHANGE, listener, context !== undefined ? context : this.context);
        }
        offChange(listener, context) {
            return this.off(Cell.EVENT_CHANGE, listener, context !== undefined ? context : this.context);
        }
        onError(listener, context) {
            return this.on(Cell.EVENT_ERROR, listener, context !== undefined ? context : this.context);
        }
        offError(listener, context) {
            return this.off(Cell.EVENT_ERROR, listener, context !== undefined ? context : this.context);
        }
        subscribe(listener, context) {
            let wrappers = listener[KEY_LISTENER_WRAPPERS] || (listener[KEY_LISTENER_WRAPPERS] = new Map());
            if (wrappers.has(this)) {
                return this;
            }
            function wrapper(evt) {
                return listener.call(this, evt.data['error'] || null, evt);
            }
            wrappers.set(this, wrapper);
            if (context === undefined) {
                context = this.context;
            }
            return this.on(Cell.EVENT_CHANGE, wrapper, context).on(Cell.EVENT_ERROR, wrapper, context);
        }
        unsubscribe(listener, context) {
            let wrappers = listener[KEY_LISTENER_WRAPPERS];
            let wrapper = wrappers?.get(this);
            if (!wrapper) {
                return this;
            }
            wrappers.delete(this);
            if (context === undefined) {
                context = this.context;
            }
            return this.off(Cell.EVENT_CHANGE, wrapper, context).off(Cell.EVENT_ERROR, wrapper, context);
        }
        _addReaction(reaction) {
            this._reactions.push(reaction);
            this._activate();
        }
        _deleteReaction(reaction) {
            this._reactions.splice(fastIndexOf(this._reactions, reaction), 1);
            if (this._reactions.length == 0 &&
                (this._$listeners.size == 0 ||
                    (!this._$listeners.has(Cell.EVENT_CHANGE) &&
                        !this._$listeners.has(Cell.EVENT_ERROR)))) {
                this._deactivate();
                this._reap?.call(this.context);
            }
        }
        _activate() {
            if (this._active) {
                return;
            }
            let deps = this._dependencies;
            if (deps) {
                for (let i = 0;; i++) {
                    deps[i]._addReaction(this);
                    if (i + 1 == deps.length) {
                        break;
                    }
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
                    if (i + 1 == deps.length) {
                        break;
                    }
                }
                this._state = CellState.DIRTY;
                this._active = false;
            }
        }
        _onValueChange(evt) {
            this._updationId = ++lastUpdationId;
            let reactions = this._reactions;
            for (let i = 0; i < reactions.length; i++) {
                reactions[i]._addToRelease(true);
            }
            this.handleEvent(evt);
        }
        _addToRelease(dirty) {
            this._state = dirty ? CellState.DIRTY : CellState.CHECK;
            if (transaction) {
                transaction.secondaryCells.add(this);
            }
            let reactions = this._reactions;
            if (reactions.length != 0) {
                for (let i = 0;; i++) {
                    if (reactions[i]._state == CellState.ACTUAL) {
                        reactions[i]._addToRelease(false);
                    }
                    if (i + 1 == reactions.length) {
                        break;
                    }
                }
            }
            else {
                if (pendingCells.push(this) == 1) {
                    nextTick(release);
                }
            }
        }
        actualize() {
            if (this._state == CellState.DIRTY) {
                this.pull();
            }
            else if (this._state == CellState.CHECK) {
                let deps = this._dependencies;
                for (let i = 0;; i++) {
                    deps[i].actualize();
                    // @ts-ignore
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
        get(sticky) {
            if (this._state != CellState.ACTUAL && this._updationId != lastUpdationId) {
                this.actualize();
            }
            if (currentCell &&
                (!currentCell._slippery || sticky || (this._sticky && sticky !== false))) {
                if (currentCell._dependencies) {
                    if (fastIndexOf(currentCell._dependencies, this) == -1) {
                        currentCell._dependencies.push(this);
                    }
                }
                else {
                    currentCell._dependencies = [this];
                }
            }
            if (this._error && (currentCell || !(this._error instanceof WaitError))) {
                throw this._error;
            }
            return this._value;
        }
        pull() {
            if (!this._pull) {
                return false;
            }
            if (this._currentlyPulling) {
                throw TypeError('Circular pulling');
            }
            this._currentlyPulling = true;
            let prevDeps = this._dependencies;
            this._dependencies = null;
            let prevCell = currentCell;
            currentCell = this;
            let value;
            try {
                if (this._pull.length == 0) {
                    value = this._pull.call(this.context);
                }
                else {
                    if (!this._bound) {
                        this.push = this.push.bind(this);
                        this.fail = this.fail.bind(this);
                        this._bound = true;
                    }
                    value = this._pull.call(this.context, this, this._value);
                }
                if (value instanceof Promise) {
                    value.then((value) => this.push(value), (err) => this.fail(err));
                    $error.error = new WaitError();
                    value = $error;
                }
            }
            catch (err) {
                $error.error = err;
                value = $error;
            }
            currentCell = prevCell;
            this._currentlyPulling = false;
            if (this._reactions.length != 0 ||
                this._$listeners.has(Cell.EVENT_CHANGE) ||
                this._$listeners.has(Cell.EVENT_ERROR)) {
                let deps = this._dependencies;
                let newDepCount = 0;
                if (deps) {
                    for (let i = 0;; i++) {
                        let dep = deps[i];
                        if (!prevDeps || fastIndexOf(prevDeps, dep) == -1) {
                            dep._addReaction(this);
                            newDepCount++;
                        }
                        if (i + 1 == deps.length) {
                            break;
                        }
                    }
                }
                if (prevDeps && (!deps || deps.length - newDepCount < prevDeps.length)) {
                    for (let i = 0;; i++) {
                        if (!deps || fastIndexOf(deps, prevDeps[i]) == -1) {
                            prevDeps[i]._deleteReaction(this);
                        }
                        if (i + 1 == prevDeps.length) {
                            break;
                        }
                    }
                }
                if (deps) {
                    if (!prevDeps) {
                        this._active = true;
                    }
                }
                else {
                    this._state = CellState.ACTUAL;
                    this._active = false;
                }
            }
            else {
                this._state = this._dependencies ? CellState.DIRTY : CellState.ACTUAL;
            }
            return value === $error ? this.fail($error.error) : this.push(value);
        }
        set(value) {
            if (!this._inited) {
                // Не инициализированная ячейка не может иметь State.CHECK, поэтому сразу pull вместо
                // actualize.
                this.pull();
            }
            this._validate?.(value, this._value);
            if (this._put) {
                if (!this._bound) {
                    this.push = this.push.bind(this);
                    this.fail = this.fail.bind(this);
                    this._bound = true;
                }
                if (this._put.length >= 3) {
                    this._put.call(this.context, this, value, this._value);
                }
                else {
                    this._put.call(this.context, this, value);
                }
            }
            else {
                this.push(value);
            }
            return this;
        }
        push(value) {
            this._inited = true;
            let err = this._error;
            if (err) {
                this._setError(null);
            }
            let prevValue = this._value;
            let changed = !this._compareValues(value, prevValue);
            if (changed) {
                this._value = value;
                if (transaction && !transaction.primaryCells.has(this)) {
                    transaction.primaryCells.set(this, prevValue);
                }
                if (prevValue instanceof EventEmitter) {
                    prevValue.off('change', this._onValueChange, this);
                }
                if (value instanceof EventEmitter) {
                    value.on('change', this._onValueChange, this);
                }
            }
            if (this._active) {
                this._state = CellState.ACTUAL;
            }
            this._updationId = ++lastUpdationId;
            if (changed || err instanceof WaitError) {
                let reactions = this._reactions;
                for (let i = 0; i < reactions.length; i++) {
                    reactions[i]._addToRelease(true);
                }
                if (changed) {
                    this.emit(Cell.EVENT_CHANGE, {
                        prevValue,
                        value
                    });
                }
            }
            return changed;
        }
        fail(err) {
            this._inited = true;
            let isWaitError = err instanceof WaitError;
            if (!isWaitError) {
                if (this.debugKey != undefined) {
                    config.logError('[' + this.debugKey + ']', err);
                }
                else {
                    config.logError(err);
                }
                if (!(err instanceof Error)) {
                    err = Error(String(err));
                }
            }
            this._setError({
                target: this,
                type: Cell.EVENT_ERROR,
                data: { error: err }
            });
            if (this._active) {
                this._state = CellState.ACTUAL;
            }
            return isWaitError;
        }
        _setError(errorEvent) {
            if (this._lastErrorEvent === errorEvent) {
                return;
            }
            let err = errorEvent && errorEvent.data.error;
            this._errorCell?.set(err);
            this._error = err;
            this._lastErrorEvent = errorEvent;
            this._updationId = ++lastUpdationId;
            if (errorEvent) {
                this.handleEvent(errorEvent);
            }
            let reactions = this._reactions;
            for (let i = 0; i < reactions.length; i++) {
                reactions[i]._setError(errorEvent);
            }
        }
        wait() {
            throw new WaitError();
        }
        reap() {
            this.off();
            this._errorCell?.reap();
            let reactions = this._reactions;
            for (let i = 0; i < reactions.length; i++) {
                reactions[i].reap();
            }
            return this;
        }
        dispose() {
            return this.reap();
        }
    }
    Cell.EVENT_CHANGE = 'change';
    Cell.EVENT_ERROR = 'error';

    const autorun = Cell.autorun;
    function cellx(value, options) {
        return new Cell(value, options);
    }
    function defineObservableProperty(obj, key, value) {
        (obj[KEY_VALUE_CELLS] || (obj[KEY_VALUE_CELLS] = new Map())).set(key, value instanceof Cell ? value : new Cell(value, { context: obj }));
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                return this[KEY_VALUE_CELLS].get(key).get();
            },
            set(value) {
                this[KEY_VALUE_CELLS].get(key).set(value);
            }
        });
        return obj;
    }
    function defineObservableProperties(obj, props) {
        for (let key of Object.keys(props)) {
            defineObservableProperty(obj, key, props[key]);
        }
        return obj;
    }
    function define(obj, keyOrProps, value) {
        if (typeof keyOrProps == 'object') {
            defineObservableProperties(obj, keyOrProps);
        }
        else {
            defineObservableProperty(obj, keyOrProps, value);
        }
        return obj;
    }

    exports.Cell = Cell;
    exports.EventEmitter = EventEmitter;
    exports.KEY_VALUE_CELLS = KEY_VALUE_CELLS;
    exports.WaitError = WaitError;
    exports.autorun = autorun;
    exports.cellx = cellx;
    exports.configure = configure;
    exports.define = define;
    exports.defineObservableProperties = defineObservableProperties;
    exports.defineObservableProperty = defineObservableProperty;

}));
