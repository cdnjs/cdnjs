import { nextTick } from '@riim/next-tick';
import { EventEmitter } from './EventEmitter';
import { logError } from './utils';
import { WaitError } from './WaitError';
export var State;
(function (State) {
    State["ACTUAL"] = "actual";
    State["DIRTY"] = "dirty";
    State["CHECK"] = "check";
})(State || (State = {}));
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
export class Cell extends EventEmitter {
    constructor(value, options) {
        var _a, _b, _c, _d, _e, _f, _g;
        super();
        this._reactions = [];
        this._error = null;
        this._lastErrorEvent = null;
        this._hasSubscribers = false;
        this._active = false;
        this._currentlyPulling = false;
        this._updationId = -1;
        this.debugKey = options === null || options === void 0 ? void 0 : options.debugKey;
        this.context = options && options.context !== undefined ? options.context : this;
        this._pull = (_a = options === null || options === void 0 ? void 0 : options.pull) !== null && _a !== void 0 ? _a : (typeof value == 'function' ? value : null);
        this._get = (_b = options === null || options === void 0 ? void 0 : options.get) !== null && _b !== void 0 ? _b : null;
        this._validate = (_c = options === null || options === void 0 ? void 0 : options.validate) !== null && _c !== void 0 ? _c : null;
        this._merge = (_d = options === null || options === void 0 ? void 0 : options.merge) !== null && _d !== void 0 ? _d : null;
        this._put = (_e = options === null || options === void 0 ? void 0 : options.put) !== null && _e !== void 0 ? _e : defaultPut;
        this._reap = (_f = options === null || options === void 0 ? void 0 : options.reap) !== null && _f !== void 0 ? _f : null;
        this.meta = (_g = options === null || options === void 0 ? void 0 : options.meta) !== null && _g !== void 0 ? _g : null;
        if (this._pull) {
            this._dependencies = undefined;
            this._value = undefined;
            this._state = State.DIRTY;
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
            this._state = State.ACTUAL;
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
        return currentCell != null;
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
        }, (cellOptions === null || cellOptions === void 0 ? void 0 : cellOptions.onChange)
            ? cellOptions
            : Object.assign(Object.assign({}, cellOptions), { 
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onChange() { } }));
        return disposer;
    }
    static release() {
        release();
    }
    static afterRelease(cb) {
        (afterRelease !== null && afterRelease !== void 0 ? afterRelease : (afterRelease = [])).push(cb);
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
            this._reactions.length == 0 &&
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
        let wrapper = wrappers === null || wrappers === void 0 ? void 0 : wrappers.get(this);
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
            this._reactions.length == 0 &&
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
            } while (i != 0);
            if (actual) {
                this._state = State.ACTUAL;
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
        } while (i != 0);
        this._state = State.DIRTY;
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
        this._state = dirty ? State.DIRTY : State.CHECK;
        let reactions = this._reactions;
        let i = reactions.length;
        if (i != 0) {
            do {
                if (reactions[--i]._state == State.ACTUAL) {
                    reactions[i]._addToRelease(false);
                }
            } while (i != 0);
        }
        else if (pendingCells.push(this) == 1) {
            nextTick(release);
        }
    }
    actualize() {
        if (this._state == State.DIRTY) {
            this.pull();
        }
        else if (this._state == State.CHECK) {
            let deps = this._dependencies;
            for (let i = 0;;) {
                deps[i].actualize();
                if (this._state == State.DIRTY) {
                    this.pull();
                    break;
                }
                if (++i == deps.length) {
                    this._state = State.ACTUAL;
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
        if (this._state != State.ACTUAL && this._updationId != lastUpdationId) {
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
            value =
                this._pull.length != 0
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
                } while (i != 0);
            }
            if (prevDeps && (!deps || deps.length - newDepCount < prevDeps.length)) {
                for (let i = prevDeps.length; i != 0;) {
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
                this._state = State.ACTUAL;
                this._active = false;
            }
        }
        else {
            this._state = this._dependencies ? State.DIRTY : State.ACTUAL;
        }
        return value === $error ? this.fail($error.error) : this.push(value);
    }
    set(value) {
        if (!this._inited) {
            // Не инициализированная ячейка не может иметь _state == State.CHECK, поэтому вместо
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
        let err = this._error;
        if (err) {
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
            this._state = State.ACTUAL;
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
            this._state = State.ACTUAL;
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
