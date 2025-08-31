import { EventEmitter } from './EventEmitter';
import { WaitError } from './WaitError';
import { afterRelease } from './afterRelease';
import { autorun } from './autorun';
import { config } from './config';
import { KEY_LISTENER_WRAPPERS } from './keys';
import { release } from './release';
import { DependencyFilter } from './track';
import { transact } from './transact';
import { fastIndexOf } from './utils/fastIndexOf';
import { nextTick } from './utils/nextTick';
export var CellState;
(function (CellState) {
    CellState["ACTUAL"] = "actual";
    CellState["DIRTY"] = "dirty";
    CellState["CHECK"] = "check";
})(CellState || (CellState = {}));
export const Cell_CommonState = {
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
export class Cell extends EventEmitter {
    static get currentlyPulling() {
        return Cell_CommonState.currentCell != null;
    }
    get error() {
        return Cell_CommonState.currentCell
            ? (this._errorCell ?? (this._errorCell = new Cell(this._error))).get()
            : this._error;
    }
    get state() {
        return this._state;
    }
    get inited() {
        return this._inited;
    }
    get active() {
        return this._active;
    }
    get currentlyPulling() {
        return this._currentlyPulling;
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
        this._updateId = -1;
        this._bound = false;
        this.debugKey = options?.debugKey;
        this.context = (options?.context ?? null);
        this.meta = options?.meta ?? null;
        this._pull = typeof value == 'function' ? value : null;
        this._dependencyFilter = options?.dependencyFilter ?? DependencyFilter.allExceptUntracked;
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
        let wrappers = listener[KEY_LISTENER_WRAPPERS] ?? (listener[KEY_LISTENER_WRAPPERS] = new Map());
        if (wrappers.has(this)) {
            return this;
        }
        function wrapper(evt) {
            return listener.call(this, evt.data['error'] ?? null, evt);
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
        this._updateId = ++Cell_CommonState.lastUpdateId;
        let reactions = this._reactions;
        for (let i = 0; i < reactions.length; i++) {
            reactions[i]._addToRelease(true);
        }
        this.handleEvent(evt);
    }
    _addToRelease(dirty) {
        this._state = dirty ? CellState.DIRTY : CellState.CHECK;
        Cell_CommonState.transaction?.secondaryCells.add(this);
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
            if (Cell_CommonState.pendingCells.push(this) == 1) {
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
                // @ts-expect-error
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
        if (this._state != CellState.ACTUAL && this._updateId != Cell_CommonState.lastUpdateId) {
            this.actualize();
        }
        let { currentCell } = Cell_CommonState;
        if (currentCell?._dependencyFilter(this)) {
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
        let prevCell = Cell_CommonState.currentCell;
        Cell_CommonState.currentCell = this;
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
        Cell_CommonState.currentCell = prevCell;
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
        return value === $error ? this.fail($error.error, true) : this.push(value, true);
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
    push(value, _afterPull) {
        this._inited = true;
        let err = this._error;
        if (err) {
            this._setError(null, true);
        }
        let prevValue = this._value;
        let changed = !this._compareValues(value, prevValue);
        if (changed) {
            this._value = value;
            if (Cell_CommonState.transaction &&
                !Cell_CommonState.transaction.primaryCells.has(this)) {
                Cell_CommonState.transaction.primaryCells.set(this, prevValue);
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
        this._updateId = _afterPull
            ? Cell_CommonState.lastUpdateId
            : ++Cell_CommonState.lastUpdateId;
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
    fail(err, _afterPull) {
        this._inited = true;
        let isWaitError = err instanceof WaitError;
        if (!isWaitError) {
            if (this.debugKey !== undefined) {
                config.logError('[' + this.debugKey + ']', err);
            }
            else {
                config.logError(err);
            }
            if (!(err instanceof Error)) {
                err = Error(err);
            }
        }
        this._setError({
            target: this,
            type: Cell.EVENT_ERROR,
            data: { error: err }
        }, !!_afterPull);
        if (this._active) {
            this._state = CellState.ACTUAL;
        }
        return isWaitError;
    }
    _setError(errorEvent, afterPull) {
        if (this._lastErrorEvent === errorEvent) {
            return;
        }
        let err = errorEvent && errorEvent.data.error;
        this._errorCell?.set(err);
        this._error = err;
        this._lastErrorEvent = errorEvent;
        this._updateId = afterPull
            ? Cell_CommonState.lastUpdateId
            : ++Cell_CommonState.lastUpdateId;
        if (errorEvent) {
            this.handleEvent(errorEvent);
        }
        let reactions = this._reactions;
        for (let i = 0; i < reactions.length; i++) {
            reactions[i]._setError(errorEvent, afterPull);
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
Cell.autorun = autorun;
Cell.release = release;
Cell.afterRelease = afterRelease;
Cell.transact = transact;
