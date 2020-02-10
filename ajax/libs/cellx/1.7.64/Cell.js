"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("@riim/is");
var logger_1 = require("@riim/logger");
var map_set_polyfill_1 = require("@riim/map-set-polyfill");
var next_tick_1 = require("@riim/next-tick");
var symbol_polyfill_1 = require("@riim/symbol-polyfill");
var EventEmitter_1 = require("./EventEmitter");
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 0x1fffffffffffff;
var KEY_WRAPPERS = symbol_polyfill_1.Symbol('wrappers');
var releasePlan = new map_set_polyfill_1.Map();
var releasePlanIndex = MAX_SAFE_INTEGER;
var releasePlanToIndex = -1;
var releasePlanned = false;
var currentlyRelease = 0;
var currentCell = null;
var $error = { error: null };
var pushingIndexCounter = 0;
var errorIndexCounter = 0;
var releaseVersion = 1;
var afterRelease;
var STATE_INITED = 1;
var STATE_CURRENTLY_PULLING = 1 << 1;
var STATE_ACTIVE = 1 << 2;
var STATE_HAS_FOLLOWERS = 1 << 3;
var STATE_PENDING = 1 << 4;
var STATE_CAN_CANCEL_CHANGE = 1 << 5;
function release(force) {
    if (!releasePlanned && !force) {
        return;
    }
    releasePlanned = false;
    currentlyRelease++;
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
            cell.handleEvent(changeEvent);
            if (releasePlanIndex == MAX_SAFE_INTEGER) {
                break;
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
    if (!--currentlyRelease) {
        releasePlanIndex = MAX_SAFE_INTEGER;
        releasePlanToIndex = -1;
        releaseVersion++;
        if (afterRelease) {
            var after = afterRelease;
            afterRelease = null;
            for (var i = 0, l = after.length; i < l; i++) {
                var afterItem = after[i];
                if (typeof afterItem == 'function') {
                    afterItem();
                }
                else {
                    afterItem[0]._push(afterItem[1], true, false);
                }
            }
        }
    }
}
function defaultPut(cell, value) {
    cell.push(value);
}
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(value, opts) {
        var _this = _super.call(this) || this;
        _this._error = null;
        _this._pushingIndex = 0;
        _this._errorIndex = 0;
        _this._version = 0;
        _this._masters = undefined;
        _this._slaves = [];
        _this._level = 0;
        _this._levelInRelease = -1;
        _this._selfPendingStatusCell = null;
        _this._pendingStatusCell = null;
        _this._selfErrorCell = null;
        _this._errorCell = null;
        _this._state = STATE_CAN_CANCEL_CHANGE;
        _this._changeEvent = null;
        _this._lastErrorEvent = null;
        _this.debugKey = opts && opts.debugKey;
        _this.context = opts && opts.context || _this;
        _this._pull = typeof value == 'function' ? value : null;
        _this._get = opts && opts.get || null;
        _this._validate = opts && opts.validate || null;
        _this._merge = opts && opts.merge || null;
        _this._put = opts && opts.put || defaultPut;
        _this._reap = opts && opts.reap || null;
        if (_this._pull) {
            _this._fixedValue = _this._value = undefined;
        }
        else {
            if (_this._validate) {
                _this._validate(value, undefined);
            }
            if (_this._merge) {
                value = _this._merge(value, undefined);
            }
            _this._fixedValue = _this._value = value;
            if (value instanceof EventEmitter_1.EventEmitter) {
                value.on('change', _this._onValueChange, _this);
            }
        }
        if (opts) {
            if (opts.onChange) {
                _this.on('change', opts.onChange);
            }
            if (opts.onError) {
                _this.on('error', opts.onError);
            }
        }
        return _this;
    }
    Object.defineProperty(Cell, "currentlyPulling", {
        get: function () {
            return !!currentCell;
        },
        enumerable: true,
        configurable: true
    });
    Cell.autorun = function (callback, context) {
        var disposer;
        new Cell(function () {
            var _this = this;
            if (!disposer) {
                disposer = function () {
                    _this.dispose();
                };
            }
            callback.call(context, disposer);
        }, {
            onChange: function () { }
        });
        return disposer;
    };
    Cell.forceRelease = function () {
        if (releasePlanned || currentlyRelease) {
            release(true);
        }
    };
    Cell.afterRelease = function (callback) {
        (afterRelease || (afterRelease = [])).push(callback);
    };
    Cell.prototype.on = function (type, listener, context) {
        if (releasePlanned || currentlyRelease) {
            release(true);
        }
        this._activate();
        if (typeof type == 'object') {
            _super.prototype.on.call(this, type, listener !== undefined ? listener : this.context);
        }
        else {
            _super.prototype.on.call(this, type, listener, context !== undefined ? context : this.context);
        }
        this._state |= STATE_HAS_FOLLOWERS;
        return this;
    };
    Cell.prototype.off = function (type, listener, context) {
        if (releasePlanned || currentlyRelease) {
            release(true);
        }
        if (type) {
            if (typeof type == 'object') {
                _super.prototype.off.call(this, type, listener !== undefined ? listener : this.context);
            }
            else {
                _super.prototype.off.call(this, type, listener, context !== undefined ? context : this.context);
            }
        }
        else {
            _super.prototype.off.call(this);
        }
        if (!this._slaves.length && !this._events.has('change') && !this._events.has('error') &&
            (this._state & STATE_HAS_FOLLOWERS)) {
            this._state ^= STATE_HAS_FOLLOWERS;
            this._deactivate();
            if (this._reap) {
                this._reap.call(this.context);
            }
        }
        return this;
    };
    Cell.prototype.addChangeListener = function (listener, context) {
        return this.on('change', listener, context !== undefined ? context : this.context);
    };
    Cell.prototype.removeChangeListener = function (listener, context) {
        return this.off('change', listener, context !== undefined ? context : this.context);
    };
    Cell.prototype.addErrorListener = function (listener, context) {
        return this.on('error', listener, context !== undefined ? context : this.context);
    };
    Cell.prototype.removeErrorListener = function (listener, context) {
        return this.off('error', listener, context !== undefined ? context : this.context);
    };
    Cell.prototype.subscribe = function (listener, context) {
        var wrappers = listener[KEY_WRAPPERS] ||
            (listener[KEY_WRAPPERS] = new map_set_polyfill_1.Map());
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
        return this
            .on('change', wrapper, context)
            .on('error', wrapper, context);
    };
    Cell.prototype.unsubscribe = function (listener, context) {
        var wrappers = listener[KEY_WRAPPERS];
        var wrapper = wrappers && wrappers.get(this);
        if (!wrapper) {
            return this;
        }
        wrappers.delete(this);
        if (context === undefined) {
            context = this.context;
        }
        return this
            .off('change', wrapper, context)
            .off('error', wrapper, context);
    };
    Cell.prototype._registerSlave = function (slave) {
        this._activate();
        this._slaves.push(slave);
        this._state |= STATE_HAS_FOLLOWERS;
    };
    Cell.prototype._unregisterSlave = function (slave) {
        this._slaves.splice(this._slaves.indexOf(slave), 1);
        if (!this._slaves.length && !this._events.has('change') && !this._events.has('error')) {
            this._state ^= STATE_HAS_FOLLOWERS;
            this._deactivate();
            if (this._reap) {
                this._reap.call(this.context);
            }
        }
    };
    Cell.prototype._activate = function () {
        if (!this._pull || (this._state & STATE_ACTIVE)) {
            return;
        }
        var masters = this._masters;
        if (masters === null) {
            return;
        }
        if (this._version < releaseVersion) {
            var value = this._tryPull();
            if (masters || this._masters || !(this._state & STATE_INITED)) {
                if (value === $error) {
                    this._fail($error.error, false);
                }
                else {
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
    };
    Cell.prototype._deactivate = function () {
        if (!(this._state & STATE_ACTIVE)) {
            return;
        }
        var masters = this._masters;
        var i = masters.length;
        do {
            masters[--i]._unregisterSlave(this);
        } while (i);
        if (this._levelInRelease != -1) {
            this._levelInRelease = -1;
            this._changeEvent = null;
        }
        this._state ^= STATE_ACTIVE;
    };
    Cell.prototype._onValueChange = function (evt) {
        var _this = this;
        if (this._state & STATE_HAS_FOLLOWERS) {
            if (currentCell) {
                (afterRelease || (afterRelease = [])).push(function () {
                    _this._onValueChange$(evt);
                });
            }
            else {
                this._onValueChange$(evt);
            }
        }
        else {
            this._pushingIndex = ++pushingIndexCounter;
            this._version = ++releaseVersion + +(currentlyRelease > 0);
        }
    };
    Cell.prototype._onValueChange$ = function (evt) {
        this._pushingIndex = ++pushingIndexCounter;
        var changeEvent = (evt.data || (evt.data = {})).prev = this._changeEvent;
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
    };
    Cell.prototype.get = function () {
        if (this._pull) {
            if (this._state & STATE_ACTIVE) {
                if (releasePlanned || currentlyRelease && !currentCell) {
                    release(true);
                }
            }
            else if (this._version < releaseVersion + +(currentlyRelease > 0)) {
                var oldMasters = this._masters;
                if (oldMasters !== null) {
                    var value = this._tryPull();
                    var masters = this._masters;
                    if (oldMasters || masters || !(this._state & STATE_INITED)) {
                        if (masters && (this._state & STATE_HAS_FOLLOWERS)) {
                            var i = masters.length;
                            do {
                                masters[--i]._registerSlave(this);
                            } while (i);
                            this._state |= STATE_ACTIVE;
                        }
                        if (value === $error) {
                            this._fail($error.error, false);
                        }
                        else {
                            this._push(value, false, false);
                        }
                    }
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
            }
            else {
                currentCell._masters = [this];
                currentCell._level = level + 1;
            }
        }
        return this._get ? this._get(this._value) : this._value;
    };
    Cell.prototype.pull = function () {
        if (!this._pull) {
            return false;
        }
        if (releasePlanned) {
            release();
        }
        var oldMasters;
        var oldLevel;
        var value;
        if (this._state & STATE_HAS_FOLLOWERS) {
            oldMasters = this._masters;
            oldLevel = this._level;
            value = this._tryPull();
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
            if (masters) {
                this._state |= STATE_ACTIVE;
            }
            else {
                this._state &= ~STATE_ACTIVE;
            }
            if (currentlyRelease && this._level > oldLevel) {
                this._addToRelease();
                return false;
            }
        }
        else {
            value = this._tryPull();
        }
        if (value === $error) {
            this._fail($error.error, false);
            return true;
        }
        return this._push(value, false, true);
    };
    Cell.prototype._tryPull = function () {
        if (this._state & STATE_CURRENTLY_PULLING) {
            throw new TypeError('Circular pulling detected');
        }
        var pull = this._pull;
        if (pull.length) {
            if (this._selfPendingStatusCell) {
                this._selfPendingStatusCell.set(true);
            }
            this._state |= STATE_PENDING;
        }
        var prevCell = currentCell;
        currentCell = this;
        this._masters = null;
        this._level = 0;
        this._state |= STATE_CURRENTLY_PULLING;
        try {
            return pull.length ? pull.call(this.context, this, this._value) : pull.call(this.context);
        }
        catch (err) {
            $error.error = err;
            return $error;
        }
        finally {
            currentCell = prevCell;
            this._version = releaseVersion + +(currentlyRelease > 0);
            var pendingStatusCell = this._pendingStatusCell;
            if (pendingStatusCell && (pendingStatusCell._state & STATE_ACTIVE)) {
                pendingStatusCell.pull();
            }
            var errorCell = this._errorCell;
            if (errorCell && (errorCell._state & STATE_ACTIVE)) {
                errorCell.pull();
            }
            this._state ^= STATE_CURRENTLY_PULLING;
        }
    };
    Cell.prototype.getError = function () {
        var errorCell = this._errorCell;
        if (!errorCell) {
            var debugKey = this.debugKey;
            this._selfErrorCell = new Cell(this._error, debugKey ? { debugKey: debugKey + '._selfErrorCell' } : undefined);
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
    };
    Cell.prototype.isPending = function () {
        var pendingStatusCell = this._pendingStatusCell;
        if (!pendingStatusCell) {
            var debugKey = this.debugKey;
            this._selfPendingStatusCell = new Cell(!!(this._state & STATE_PENDING), debugKey ? { debugKey: debugKey + '._selfPendingStatusCell' } : undefined);
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
    };
    Cell.prototype.set = function (value) {
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
        if (this._put.length >= 3) {
            this._put.call(this.context, this, value, this._value);
        }
        else {
            this._put.call(this.context, this, value);
        }
        return this;
    };
    Cell.prototype.push = function (value) {
        this._push(value, true, false);
        return this;
    };
    Cell.prototype._push = function (value, external, pulling) {
        this._state |= STATE_INITED;
        var oldValue = this._value;
        if (external && currentCell && (this._state & STATE_HAS_FOLLOWERS)) {
            if (is_1.is(value, oldValue)) {
                if (this._error) {
                    this._setError(null);
                }
                this._resolvePending();
                return false;
            }
            (afterRelease || (afterRelease = [])).push([this, value]);
            return true;
        }
        if (external || !currentlyRelease && pulling) {
            this._pushingIndex = ++pushingIndexCounter;
        }
        if (this._error) {
            this._setError(null);
        }
        if (is_1.is(value, oldValue)) {
            if (external || currentlyRelease && pulling) {
                this._resolvePending();
            }
            return false;
        }
        this._value = value;
        if (oldValue instanceof EventEmitter_1.EventEmitter) {
            oldValue.off('change', this._onValueChange, this);
        }
        if (value instanceof EventEmitter_1.EventEmitter) {
            value.on('change', this._onValueChange, this);
        }
        if (this._state & STATE_HAS_FOLLOWERS) {
            if (this._changeEvent) {
                if (is_1.is(value, this._fixedValue) && (this._state & STATE_CAN_CANCEL_CHANGE)) {
                    this._levelInRelease = -1;
                    this._changeEvent = null;
                }
                else {
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
            }
            else {
                this._state |= STATE_CAN_CANCEL_CHANGE;
                this._changeEvent = {
                    target: this,
                    type: 'change',
                    data: {
                        oldValue: oldValue,
                        value: value,
                        prev: null
                    }
                };
                this._addToRelease();
            }
        }
        else {
            if (external || !currentlyRelease && pulling) {
                releaseVersion++;
            }
            this._fixedValue = value;
            this._version = releaseVersion + +(currentlyRelease > 0);
        }
        if (external || currentlyRelease && pulling) {
            this._resolvePending();
        }
        return true;
    };
    Cell.prototype._addToRelease = function () {
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
            next_tick_1.nextTick(release);
        }
    };
    Cell.prototype.fail = function (err) {
        this._fail(err, true);
        return this;
    };
    Cell.prototype._fail = function (err, external) {
        logger_1.error('[' + this.debugKey + ']', err);
        if (!(err instanceof Error)) {
            err = new Error(String(err));
        }
        this._setError(err);
        if (external) {
            this._resolvePending();
        }
    };
    Cell.prototype._setError = function (err) {
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
            });
        }
    };
    Cell.prototype._handleErrorEvent = function (evt) {
        if (this._lastErrorEvent === evt) {
            return;
        }
        this._lastErrorEvent = evt;
        this.handleEvent(evt);
        var slaves = this._slaves;
        for (var i = 0, l = slaves.length; i < l; i++) {
            slaves[i]._handleErrorEvent(evt);
        }
    };
    Cell.prototype._resolvePending = function () {
        if (this._state & STATE_PENDING) {
            if (this._selfPendingStatusCell) {
                this._selfPendingStatusCell.set(false);
            }
            this._state ^= STATE_PENDING;
        }
    };
    Cell.prototype.reap = function () {
        var slaves = this._slaves;
        for (var i = 0, l = slaves.length; i < l; i++) {
            slaves[i].reap();
        }
        return this.off();
    };
    Cell.prototype.dispose = function () {
        return this.reap();
    };
    return Cell;
}(EventEmitter_1.EventEmitter));
exports.Cell = Cell;
