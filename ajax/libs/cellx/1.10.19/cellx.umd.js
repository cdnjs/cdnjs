(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.cellx = {}));
}(this, (function (exports) { 'use strict';

    const nextTick = (() => {
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
        const promise = Promise.resolve();
        return (cb) => {
            promise.then(cb);
        };
    })();

    const config = {
        logError: (...args) => {
            console.error(...args);
        }
    };
    function configure(options) {
        Object.assign(config, options);
        return config;
    }

    function logError(...args) {
        config.logError(...args);
    }

    const hasOwn = Object.prototype.hasOwnProperty;
    let currentlySubscribing = false;
    let transactionLevel = 0;
    let transactionEvents = [];
    let silently = 0;
    class EventEmitter {
        constructor() {
            this._events = new Map();
        }
        static get currentlySubscribing() {
            return currentlySubscribing;
        }
        static transact(cb) {
            transactionLevel++;
            try {
                cb();
            }
            catch (err) {
                logError(err);
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
        static silently(cb) {
            silently++;
            try {
                cb();
            }
            catch (err) {
                logError(err);
            }
            silently--;
        }
        getEvents(type) {
            if (type) {
                let events = this._events.get(type);
                if (!events) {
                    return [];
                }
                return Array.isArray(events) ? events : [events];
            }
            let events = new Map();
            for (let [type, typeEvents] of this._events) {
                events.set(type, Array.isArray(typeEvents) ? typeEvents : [typeEvents]);
            }
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
                        if (hasOwn.call(listeners, type)) {
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
                this._events.clear();
            }
            return this;
        }
        _on(type, listener, context) {
            let index;
            if (typeof type == 'string' && (index = type.indexOf(':')) != -1) {
                let propName = type.slice(index + 1);
                currentlySubscribing = true;
                ((this[KEY_VALUE_CELLS] || (this[KEY_VALUE_CELLS] = new Map())).get(propName) || (this[propName], this[KEY_VALUE_CELLS]).get(propName)).on(type.slice(0, index), listener, context);
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
            let index;
            if (typeof type == 'string' && (index = type.indexOf(':')) != -1) {
                let valueCell = this[KEY_VALUE_CELLS] && this[KEY_VALUE_CELLS].get(type.slice(index + 1));
                if (valueCell) {
                    valueCell.off(type.slice(0, index), listener, context);
                }
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
                if (transactionLevel) {
                    for (let i = transactionEvents.length;;) {
                        if (!i) {
                            (evt.data || (evt.data = {})).prevEvent = null;
                            transactionEvents.push(evt);
                            break;
                        }
                        let event = transactionEvents[--i];
                        if (event.target == this && event.type === evt.type) {
                            (evt.data || (evt.data = {})).prevEvent = event;
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
            let events = this._events.get(evt.type);
            if (!events) {
                return;
            }
            if (Array.isArray(events)) {
                if (events.length == 1) {
                    if (this._tryEventListener(events[0], evt) === false) {
                        evt.propagationStopped = true;
                    }
                }
                else {
                    events = events.slice();
                    for (let i = 0; i < events.length; i++) {
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
                logError(err);
            }
        }
    }

    class WaitError extends Error {
    }

    const KEY_LISTENER_WRAPPERS = Symbol('listenerWrappers');
    function defaultPut(cell, value) {
        cell.push(value);
    }
    const pendingCells = [];
    let pendingCellsIndex = 0;
    let afterRelease;
    let currentCell = null;
    const $error = { error: null };
    let lastUpdationId = 0;
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
            for (let cb of afterRelease_) {
                cb();
            }
        }
    }
    class Cell extends EventEmitter {
        constructor(value, options) {
            super();
            this._reactions = [];
            this._error = null;
            this._lastErrorEvent = null;
            this._hasSubscribers = false;
            this._active = false;
            this._currentlyPulling = false;
            this._updationId = -1;
            this.debugKey = options && options.debugKey;
            this.context = options && options.context !== undefined ? options.context : this;
            this._pull =
                (options && options.pull) || (typeof value == 'function' ? value : null);
            this._get = (options && options.get) || null;
            this._validate = (options && options.validate) || null;
            this._merge = (options && options.merge) || null;
            this._put = (options && options.put) || defaultPut;
            this._reap = (options && options.reap) || null;
            this.meta = (options && options.meta) || null;
            if (this._pull) {
                this._dependencies = undefined;
                this._value = undefined;
                this._state = 'dirty';
                this._inited = false;
            }
            else {
                this._dependencies = null;
                if (options && options.value !== undefined) {
                    value = options.value;
                }
                if (this._validate) {
                    this._validate(value, undefined);
                }
                if (this._merge) {
                    value = this._merge(value, undefined);
                }
                this._value = value;
                this._state = 'actual';
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
        static get currentlyPulling() {
            return !!currentCell;
        }
        static autorun(cb, cellOptions) {
            let disposer;
            new Cell(function (cell, next) {
                if (!disposer) {
                    disposer = () => {
                        cell.dispose();
                    };
                }
                return cb.call(this, next, disposer);
            }, cellOptions && cellOptions.onChange
                ? cellOptions
                : Object.assign(Object.assign({}, cellOptions), { onChange() { } }));
            return disposer;
        }
        static release() {
            release();
        }
        static afterRelease(cb) {
            (afterRelease || (afterRelease = [])).push(cb);
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
            this._hasSubscribers = true;
            this._activate(true);
            return this;
        }
        off(type, listener, context) {
            if (this._dependencies !== null) {
                this.actualize();
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
            if (this._hasSubscribers &&
                !this._reactions.length &&
                !this._events.has(Cell.EVENT_CHANGE) &&
                !this._events.has(Cell.EVENT_ERROR)) {
                this._hasSubscribers = false;
                this._deactivate();
                if (this._reap) {
                    this._reap.call(this.context);
                }
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
                return listener.call(this, evt.data.error || null, evt);
            }
            wrappers.set(this, wrapper);
            if (context === undefined) {
                context = this.context;
            }
            return this.on(Cell.EVENT_CHANGE, wrapper, context).on(Cell.EVENT_ERROR, wrapper, context);
        }
        unsubscribe(listener, context) {
            let wrappers = listener[KEY_LISTENER_WRAPPERS];
            let wrapper = wrappers && wrappers.get(this);
            if (!wrapper) {
                return this;
            }
            wrappers.delete(this);
            if (context === undefined) {
                context = this.context;
            }
            return this.off(Cell.EVENT_CHANGE, wrapper, context).off(Cell.EVENT_ERROR, wrapper, context);
        }
        _addReaction(reaction, actual) {
            this._reactions.push(reaction);
            this._hasSubscribers = true;
            this._activate(actual);
        }
        _deleteReaction(reaction) {
            this._reactions.splice(this._reactions.indexOf(reaction), 1);
            if (this._hasSubscribers &&
                !this._reactions.length &&
                !this._events.has(Cell.EVENT_CHANGE) &&
                !this._events.has(Cell.EVENT_ERROR)) {
                this._hasSubscribers = false;
                this._deactivate();
                if (this._reap) {
                    this._reap.call(this.context);
                }
            }
        }
        _activate(actual) {
            if (this._active || !this._pull) {
                return;
            }
            let deps = this._dependencies;
            if (deps) {
                let i = deps.length;
                do {
                    deps[--i]._addReaction(this, actual);
                } while (i);
                if (actual) {
                    this._state = 'actual';
                }
                this._active = true;
            }
        }
        _deactivate() {
            if (!this._active) {
                return;
            }
            let deps = this._dependencies;
            let i = deps.length;
            do {
                deps[--i]._deleteReaction(this);
            } while (i);
            this._state = 'dirty';
            this._active = false;
        }
        _onValueChange(evt) {
            this._inited = true;
            this._updationId = ++lastUpdationId;
            let reactions = this._reactions;
            for (let i = 0; i < reactions.length; i++) {
                reactions[i]._addToRelease(true);
            }
            this.handleEvent(evt);
        }
        _addToRelease(dirty) {
            this._state = dirty ? 'dirty' : 'check';
            let reactions = this._reactions;
            let i = reactions.length;
            if (i) {
                do {
                    if (reactions[--i]._state == 'actual') {
                        reactions[i]._addToRelease(false);
                    }
                } while (i);
            }
            else if (pendingCells.push(this) == 1) {
                nextTick(release);
            }
        }
        actualize() {
            if (this._state == 'dirty') {
                this.pull();
            }
            else if (this._state == 'check') {
                let deps = this._dependencies;
                for (let i = 0;;) {
                    deps[i].actualize();
                    if (this._state == 'dirty') {
                        this.pull();
                        break;
                    }
                    if (++i == deps.length) {
                        this._state = 'actual';
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
            if (this._state != 'actual' && this._updationId != lastUpdationId) {
                this.actualize();
            }
            if (currentCell) {
                if (currentCell._dependencies) {
                    if (currentCell._dependencies.indexOf(this) == -1) {
                        currentCell._dependencies.push(this);
                    }
                }
                else {
                    currentCell._dependencies = [this];
                }
                if (this._error && this._error instanceof WaitError) {
                    throw this._error;
                }
            }
            return this._get ? this._get(this._value) : this._value;
        }
        pull() {
            if (!this._pull) {
                return false;
            }
            if (this._currentlyPulling) {
                throw TypeError('Circular pulling detected');
            }
            this._currentlyPulling = true;
            let prevDeps = this._dependencies;
            this._dependencies = null;
            let prevCell = currentCell;
            currentCell = this;
            let value;
            try {
                value = this._pull.length
                    ? this._pull.call(this.context, this, this._value)
                    : this._pull.call(this.context);
            }
            catch (err) {
                $error.error = err;
                value = $error;
            }
            currentCell = prevCell;
            this._currentlyPulling = false;
            if (this._hasSubscribers) {
                let deps = this._dependencies;
                let newDepCount = 0;
                if (deps) {
                    let i = deps.length;
                    do {
                        let dep = deps[--i];
                        if (!prevDeps || prevDeps.indexOf(dep) == -1) {
                            dep._addReaction(this, false);
                            newDepCount++;
                        }
                    } while (i);
                }
                if (prevDeps && (!deps || deps.length - newDepCount < prevDeps.length)) {
                    for (let i = prevDeps.length; i;) {
                        i--;
                        if (!deps || deps.indexOf(prevDeps[i]) == -1) {
                            prevDeps[i]._deleteReaction(this);
                        }
                    }
                }
                if (deps) {
                    this._active = true;
                }
                else {
                    this._state = 'actual';
                    this._active = false;
                }
            }
            else {
                this._state = this._dependencies ? 'dirty' : 'actual';
            }
            return value === $error ? this.fail($error.error) : this.push(value);
        }
        set(value) {
            if (!this._inited) {
                // Не инициализированная ячейка не может иметь _state == 'check', поэтому вместо
                // actualize сразу pull.
                this.pull();
            }
            if (this._validate) {
                this._validate(value, this._value);
            }
            if (this._merge) {
                value = this._merge(value, this._value);
            }
            if (this._put.length >= 3) {
                this._put.call(this.context, this, value, this._value);
            }
            else {
                this._put.call(this.context, this, value);
            }
            return this;
        }
        push(value) {
            this._inited = true;
            if (this._error) {
                this._setError(null);
            }
            let prevValue = this._value;
            let changed = !Object.is(value, prevValue);
            if (changed) {
                this._value = value;
                if (prevValue instanceof EventEmitter) {
                    prevValue.off('change', this._onValueChange, this);
                }
                if (value instanceof EventEmitter) {
                    value.on('change', this._onValueChange, this);
                }
            }
            if (this._active) {
                this._state = 'actual';
            }
            this._updationId = ++lastUpdationId;
            if (changed) {
                let reactions = this._reactions;
                for (let i = 0; i < reactions.length; i++) {
                    reactions[i]._addToRelease(true);
                }
                this.emit(Cell.EVENT_CHANGE, {
                    prevValue,
                    value
                });
            }
            return changed;
        }
        fail(err) {
            this._inited = true;
            let isWaitError = err instanceof WaitError;
            if (!isWaitError) {
                if (this.debugKey) {
                    logError('[' + this.debugKey + ']', err);
                }
                else {
                    logError(err);
                }
                if (!(err instanceof Error)) {
                    err = new Error(String(err));
                }
            }
            this._setError(err);
            if (this._active) {
                this._state = 'actual';
            }
            return isWaitError;
        }
        _setError(err) {
            this._error = err;
            this._updationId = ++lastUpdationId;
            if (err) {
                this._handleErrorEvent({
                    target: this,
                    type: Cell.EVENT_ERROR,
                    data: {
                        error: err
                    }
                });
            }
        }
        _handleErrorEvent(evt) {
            if (this._lastErrorEvent === evt) {
                return;
            }
            this._lastErrorEvent = evt;
            this.handleEvent(evt);
            let reactions = this._reactions;
            for (let i = 0; i < reactions.length; i++) {
                reactions[i]._handleErrorEvent(evt);
            }
        }
        wait() {
            throw new WaitError();
        }
        reap() {
            this.off();
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

    const KEY_VALUE_CELLS = Symbol('valueCells');
    const cellxProto = {
        __proto__: Function.prototype,
        cell: null,
        on(type, listener, context) {
            return this.cell.on(type, listener, context);
        },
        off(type, listener, context) {
            return this.cell.off(type, listener, context);
        },
        onChange(listener, context) {
            return this.cell.onChange(listener, context);
        },
        offChange(listener, context) {
            return this.cell.offChange(listener, context);
        },
        onError(listener, context) {
            return this.cell.onError(listener, context);
        },
        offError(listener, context) {
            return this.cell.offError(listener, context);
        },
        subscribe(listener, context) {
            return this.cell.subscribe(listener, context);
        },
        unsubscribe(listener, context) {
            return this.cell.unsubscribe(listener, context);
        },
        get value() {
            return this.cell.value;
        },
        set value(value) {
            this.cell.value = value;
        },
        pull() {
            return this.cell.pull();
        },
        reap() {
            return this.cell.reap();
        },
        dispose() {
            return this.cell.dispose();
        }
    };
    function cellx(value, options) {
        let $cellx = function (value) {
            if (arguments.length) {
                $cellx.cell.set(value);
                return value;
            }
            return $cellx.cell.get();
        };
        Object.setPrototypeOf($cellx, cellxProto);
        $cellx.constructor = cellx;
        $cellx.cell = new Cell(value, options);
        return $cellx;
    }
    function defineObservableProperty(obj, name, value) {
        (obj[KEY_VALUE_CELLS] || (obj[KEY_VALUE_CELLS] = new Map())).set(name, value instanceof Cell ? value : new Cell(value, { context: obj }));
        Object.defineProperty(obj, name, {
            configurable: true,
            enumerable: true,
            get() {
                return this[KEY_VALUE_CELLS].get(name).get();
            },
            set(value) {
                this[KEY_VALUE_CELLS].get(name).set(value);
            }
        });
        return obj;
    }
    function defineObservableProperties(obj, props) {
        Object.keys(props).forEach((name) => {
            defineObservableProperty(obj, name, props[name]);
        });
        return obj;
    }
    function define(obj, nameOrProps, value) {
        if (typeof nameOrProps == 'object') {
            defineObservableProperties(obj, nameOrProps);
        }
        else {
            defineObservableProperty(obj, nameOrProps, value);
        }
        return obj;
    }

    exports.Cell = Cell;
    exports.EventEmitter = EventEmitter;
    exports.KEY_VALUE_CELLS = KEY_VALUE_CELLS;
    exports.WaitError = WaitError;
    exports.cellx = cellx;
    exports.configure = configure;
    exports.define = define;
    exports.defineObservableProperties = defineObservableProperties;
    exports.defineObservableProperty = defineObservableProperty;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
