"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@riim/is");
const logger_1 = require("@riim/logger");
const map_set_polyfill_1 = require("@riim/map-set-polyfill");
const next_tick_1 = require("@riim/next-tick");
const symbol_polyfill_1 = require("@riim/symbol-polyfill");
const EventEmitter_1 = require("./EventEmitter");
const WaitError_1 = require("./WaitError");
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
                let cb = afterRelease_[i];
                if (typeof cb == 'function') {
                    cb();
                }
                else {
                    cb[0]._push(cb[1], true, false);
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
    static autorun(cb, context) {
        let disposer;
        new Cell(function () {
            if (!disposer) {
                disposer = () => {
                    this.dispose();
                };
            }
            cb.call(context, disposer);
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
    static release() {
        this.forceRelease();
    }
    static afterRelease(cb) {
        (afterRelease || (afterRelease = [])).push(cb);
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
            if (this._error && this._error instanceof WaitError_1.WaitError) {
                throw this._error;
            }
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
        let value;
        if (this._state & STATE_HAS_FOLLOWERS) {
            let prevDeps = this._dependencies;
            let prevLevel = this._level;
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
