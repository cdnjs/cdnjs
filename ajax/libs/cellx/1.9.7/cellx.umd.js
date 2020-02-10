(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.cellx = {}));
}(this, function (exports) { 'use strict';

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

    /* istanbul ignore file */
    let Map_;
    if (typeof navigator != 'undefined' && navigator.userAgent.includes('Edge')) {
        const hasOwn = Object.prototype.hasOwnProperty;
        const KEY_MAP_ID = Symbol('mapId');
        let mapIdCounter = 0;
        const entryStub = {
            value: undefined
        };
        Map_ = function Map(entries) {
            this._entries = { __proto__: null };
            this._objectStamps = null;
            this._first = null;
            this._last = null;
            this.size = 0;
            if (entries) {
                for (let i = 0, l = entries.length; i < l; i++) {
                    this.set(entries[i][0], entries[i][1]);
                }
            }
        };
        Map_.prototype = {
            constructor: Map_,
            has(key) {
                return !!this._entries[this._getValueStamp(key)];
            },
            get(key) {
                return (this._entries[this._getValueStamp(key)] || entryStub).value;
            },
            set(key, value) {
                let entries = this._entries;
                let keyStamp = this._getValueStamp(key);
                if (entries[keyStamp]) {
                    entries[keyStamp].value = value;
                }
                else {
                    let entry = (entries[keyStamp] = {
                        key,
                        keyStamp,
                        value,
                        prev: this._last,
                        next: null
                    });
                    if (this.size++) {
                        this._last.next = entry;
                    }
                    else {
                        this._first = entry;
                    }
                    this._last = entry;
                }
                return this;
            },
            delete(key) {
                let keyStamp = this._getValueStamp(key);
                let entry = this._entries[keyStamp];
                if (!entry) {
                    return false;
                }
                if (--this.size) {
                    let prev = entry.prev;
                    let next = entry.next;
                    if (prev) {
                        prev.next = next;
                    }
                    else {
                        this._first = next;
                    }
                    if (next) {
                        next.prev = prev;
                    }
                    else {
                        this._last = prev;
                    }
                }
                else {
                    this._first = null;
                    this._last = null;
                }
                delete this._entries[keyStamp];
                if (this._objectStamps) {
                    delete this._objectStamps[keyStamp];
                }
                return true;
            },
            clear() {
                let entries = this._entries;
                for (let stamp in entries) {
                    delete entries[stamp];
                }
                this._objectStamps = null;
                this._first = null;
                this._last = null;
                this.size = 0;
            },
            // forEach(cb: Function, context: any) {
            // 	let entry = this._first;
            // 	while (entry) {
            // 		cb.call(context, entry.value, entry.key, this);
            // 		do {
            // 			entry = entry.next;
            // 		} while (entry && !this._entries[entry.keyStamp]);
            // 	}
            // },
            // toString() {
            // 	return '[object Map]';
            // },
            _getValueStamp(value) {
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
            _getObjectStamp(obj) {
                if (!hasOwn.call(obj, KEY_MAP_ID)) {
                    if (!Object.isExtensible(obj)) {
                        let stamps = this._objectStamps;
                        let stamp;
                        for (stamp in stamps) {
                            if (stamps[stamp] == obj) {
                                return stamp;
                            }
                        }
                        stamp = String(++mapIdCounter);
                        (stamps || (this._objectStamps = { __proto__: null }))[stamp] = obj;
                        return stamp;
                    }
                    Object.defineProperty(obj, KEY_MAP_ID, {
                        value: String(++mapIdCounter)
                    });
                }
                return obj[KEY_MAP_ID];
            }
        };
        [
            // ['keys', entry => entry.key],
            // ['values', entry => entry.value],
            ['entries', entry => [entry.key, entry.value]]
        ].forEach(settings => {
            let getStepValue = settings[1];
            Map_.prototype[settings[0]] = function () {
                let entries = this._entries;
                let entry;
                let done = false;
                let map = this;
                return {
                    next() {
                        if (!done) {
                            if (entry) {
                                do {
                                    entry = entry.next;
                                } while (entry && !entries[entry.keyStamp]);
                            }
                            else {
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
        });
        Map_.prototype[Symbol.iterator] = Map_.prototype.entries;
    }
    else {
        Map_ = Map;
    }

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
            this._events = new Map_();
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
            let events = new Map_();
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
                (this[propName + 'Cell'] || (this[propName], this[propName + 'Cell'])).on(type.slice(0, index), listener, context);
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
                let propName = type.slice(index + 1);
                (this[propName + 'Cell'] || (this[propName], this[propName + 'Cell'])).off(type.slice(0, index), listener, context);
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
                    // tslint:disable-next-line:prefer-for-of
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

    function WaitError() {
        if (!(this instanceof WaitError)) {
            return new WaitError();
        }
    }
    WaitError.prototype = {
        __proto__: Error.prototype,
        constructor: WaitError
    };

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
            // tslint:disable-next-line:prefer-for-of
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
                // tslint:disable-next-line:prefer-for-of
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
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < reactions.length; i++) {
                reactions[i]._handleErrorEvent(evt);
            }
        }
        wait() {
            throw WaitError();
        }
        reap() {
            this.off();
            let reactions = this._reactions;
            // tslint:disable-next-line:prefer-for-of
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

    const hasOwn$1 = Object.prototype.hasOwnProperty;
    class ObservableMap extends EventEmitter {
        constructor(entries) {
            super();
            this._entries = new Map();
            if (entries) {
                let mapEntries = this._entries;
                if (entries instanceof Map || entries instanceof ObservableMap) {
                    (entries instanceof Map ? entries : entries._entries).forEach((value, key) => {
                        mapEntries.set(key, value);
                    });
                }
                else if (Array.isArray(entries)) {
                    for (let i = 0, l = entries.length; i < l; i++) {
                        mapEntries.set(entries[i][0], entries[i][1]);
                    }
                }
                else {
                    for (let key in entries) {
                        if (hasOwn$1.call(entries, key)) {
                            mapEntries.set(key, entries[key]);
                        }
                    }
                }
            }
        }
        get size() {
            return this._entries.size;
        }
        onChange(listener, context) {
            return this.on(ObservableMap.EVENT_CHANGE, listener, context);
        }
        offChange(listener, context) {
            return this.off(ObservableMap.EVENT_CHANGE, listener, context);
        }
        has(key) {
            return this._entries.has(key);
        }
        get(key) {
            return this._entries.get(key);
        }
        set(key, value) {
            let entries = this._entries;
            let hasKey = entries.has(key);
            let prev;
            if (hasKey) {
                prev = entries.get(key);
                if (Object.is(value, prev)) {
                    return this;
                }
            }
            entries.set(key, value);
            this.emit(ObservableMap.EVENT_CHANGE, {
                subtype: hasKey ? 'update' : 'add',
                key,
                prevValue: prev,
                value
            });
            return this;
        }
        delete(key) {
            let entries = this._entries;
            if (entries.has(key)) {
                let value = entries.get(key);
                entries.delete(key);
                this.emit(ObservableMap.EVENT_CHANGE, {
                    subtype: 'delete',
                    key,
                    value
                });
                return true;
            }
            return false;
        }
        clear() {
            if (this._entries.size) {
                this._entries.clear();
                this.emit(ObservableMap.EVENT_CHANGE, { subtype: 'clear' });
            }
            return this;
        }
        equals(that) {
            if (!(that instanceof ObservableMap)) {
                return false;
            }
            if (this.size != that.size) {
                return false;
            }
            for (let entry of this) {
                if (entry[1] !== that.get(entry[0])) {
                    return false;
                }
            }
            return true;
        }
        forEach(cb, context) {
            this._entries.forEach(function (value, key) {
                cb.call(context, value, key, this);
            }, this);
        }
        keys() {
            return this._entries.keys();
        }
        values() {
            return this._entries.values();
        }
        entries() {
            return this._entries.entries();
        }
        clone(deep) {
            let entries;
            if (deep) {
                entries = [];
                this._entries.forEach((value, key) => {
                    entries.push([
                        key,
                        value && value.clone ? value.clone(true) : value
                    ]);
                });
            }
            return new this.constructor(entries || this);
        }
        merge(that) {
            if (!(that instanceof ObservableMap)) {
                throw TypeError('"that" must be instance of ObservableMap');
            }
            let entries = this._entries;
            let changed = false;
            for (let [key, value] of entries) {
                if (that.has(key)) {
                    let thatValue = that.get(key);
                    if (value !== thatValue) {
                        if (value &&
                            thatValue &&
                            value.merge &&
                            value.merge ===
                                thatValue.merge) {
                            if (value.merge(thatValue)) {
                                changed = true;
                            }
                        }
                        else {
                            entries.set(key, thatValue);
                            changed = true;
                        }
                    }
                }
                else {
                    entries.delete(key);
                    changed = true;
                }
            }
            for (let [key, value] of that) {
                if (!entries.has(key)) {
                    entries.set(key, value);
                    changed = true;
                }
            }
            if (changed) {
                this.emit(ObservableMap.EVENT_CHANGE, { subtype: 'merge' });
            }
            return changed;
        }
    }
    ObservableMap.EVENT_CHANGE = 'change';
    ObservableMap.prototype[Symbol.iterator] = ObservableMap.prototype.entries;

    const push = Array.prototype.push;
    const splice = Array.prototype.splice;
    const defaultComparator = (a, b) => {
        return a < b ? -1 : a > b ? 1 : 0;
    };
    class ObservableList extends EventEmitter {
        constructor(items, options) {
            super();
            this._items = [];
            if (options && (options.sorted || (options.comparator && options.sorted !== false))) {
                this._comparator = options.comparator || defaultComparator;
                this._sorted = true;
            }
            else {
                this._comparator = null;
                this._sorted = false;
            }
            if (items) {
                if (this._sorted) {
                    if (items instanceof ObservableList) {
                        items = items._items;
                    }
                    for (let i = 0, l = items.length; i < l; i++) {
                        this._insertSortedValue(items[i]);
                    }
                }
                else {
                    push.apply(this._items, items instanceof ObservableList ? items._items : items);
                }
            }
        }
        get length() {
            return this._items.length;
        }
        set length(value) {
            if (this._items.length != value) {
                if (value > this._items.length) {
                    throw RangeError('Length out of valid range');
                }
                this.emit(ObservableList.EVENT_CHANGE);
                this._items.length = value;
            }
        }
        onChange(listener, context) {
            return this.on(ObservableList.EVENT_CHANGE, listener, context);
        }
        offChange(listener, context) {
            return this.off(ObservableList.EVENT_CHANGE, listener, context);
        }
        _validateIndex(index, allowEndIndex) {
            if (index === undefined) {
                return index;
            }
            if (index < 0) {
                index += this._items.length;
                if (index < 0) {
                    throw RangeError('Index out of valid range');
                }
            }
            else if (index > this._items.length - (allowEndIndex ? 0 : 1)) {
                throw RangeError('Index out of valid range');
            }
            return index;
        }
        contains(value) {
            return this._items.indexOf(value) != -1;
        }
        indexOf(value, fromIndex) {
            return this._items.indexOf(value, this._validateIndex(fromIndex, true));
        }
        lastIndexOf(value, fromIndex) {
            return this._items.lastIndexOf(value, fromIndex === undefined ? -1 : this._validateIndex(fromIndex, true));
        }
        get(index) {
            return this._items[this._validateIndex(index, true)];
        }
        getRange(index, count) {
            index = this._validateIndex(index, true);
            if (count === undefined) {
                return this._items.slice(index);
            }
            if (index + count > this._items.length) {
                throw RangeError('Sum of "index" and "count" out of valid range');
            }
            return this._items.slice(index, index + count);
        }
        set(index, value) {
            if (this._sorted) {
                throw TypeError('Cannot set to sorted list');
            }
            index = this._validateIndex(index, true);
            if (!Object.is(value, this._items[index])) {
                this._items[index] = value;
                this.emit(ObservableList.EVENT_CHANGE);
            }
            return this;
        }
        setRange(index, values) {
            if (this._sorted) {
                throw TypeError('Cannot set to sorted list');
            }
            index = this._validateIndex(index, true);
            if (values instanceof ObservableList) {
                values = values._items;
            }
            let valueCount = values.length;
            if (!valueCount) {
                return this;
            }
            let items = this._items;
            if (index + valueCount > items.length) {
                throw RangeError('Sum of "index" and "values.length" out of valid range');
            }
            let changed = false;
            for (let i = index + valueCount; i > index;) {
                let value = values[--i - index];
                if (!Object.is(value, items[i])) {
                    items[i] = value;
                    changed = true;
                }
            }
            if (changed) {
                this.emit(ObservableList.EVENT_CHANGE);
            }
            return this;
        }
        add(value, unique) {
            if (unique && this._items.indexOf(value) != -1) {
                return this;
            }
            if (this._sorted) {
                this._insertSortedValue(value);
            }
            else {
                this._items.push(value);
            }
            this.emit(ObservableList.EVENT_CHANGE);
            return this;
        }
        addRange(values, unique) {
            if (values instanceof ObservableList) {
                values = values._items;
            }
            if (values.length) {
                if (unique) {
                    let items = this._items;
                    let sorted = this._sorted;
                    let changed = false;
                    for (let value of values) {
                        if (items.indexOf(value) == -1) {
                            if (sorted) {
                                this._insertSortedValue(value);
                            }
                            else {
                                items.push(value);
                            }
                            changed = true;
                        }
                    }
                    if (changed) {
                        this.emit(ObservableList.EVENT_CHANGE);
                    }
                }
                else {
                    if (this._sorted) {
                        for (let i = 0, l = values.length; i < l; i++) {
                            this._insertSortedValue(values[i]);
                        }
                    }
                    else {
                        push.apply(this._items, values);
                    }
                    this.emit(ObservableList.EVENT_CHANGE);
                }
            }
            return this;
        }
        insert(index, value) {
            if (this._sorted) {
                throw TypeError('Cannot insert to sorted list');
            }
            this._items.splice(this._validateIndex(index, true), 0, value);
            this.emit(ObservableList.EVENT_CHANGE);
            return this;
        }
        insertRange(index, values) {
            if (this._sorted) {
                throw TypeError('Cannot insert to sorted list');
            }
            index = this._validateIndex(index, true);
            if (values instanceof ObservableList) {
                values = values._items;
            }
            if (values.length) {
                splice.apply(this._items, [index, 0].concat(values));
                this.emit(ObservableList.EVENT_CHANGE);
            }
            return this;
        }
        remove(value, fromIndex) {
            let index = this._items.indexOf(value, this._validateIndex(fromIndex, true));
            if (index == -1) {
                return false;
            }
            this._items.splice(index, 1);
            this.emit(ObservableList.EVENT_CHANGE);
            return true;
        }
        removeAll(value, fromIndex) {
            let index = this._validateIndex(fromIndex, true);
            let items = this._items;
            let changed = false;
            while ((index = items.indexOf(value, index)) != -1) {
                items.splice(index, 1);
                changed = true;
            }
            if (changed) {
                this.emit(ObservableList.EVENT_CHANGE);
            }
            return changed;
        }
        removeEach(values, fromIndex) {
            fromIndex = this._validateIndex(fromIndex, true);
            if (values instanceof ObservableList) {
                values = values._items.slice();
            }
            let items = this._items;
            let changed = false;
            for (let i = 0, l = values.length; i < l; i++) {
                let index = items.indexOf(values[i], fromIndex);
                if (index != -1) {
                    items.splice(index, 1);
                    changed = true;
                }
            }
            if (changed) {
                this.emit(ObservableList.EVENT_CHANGE);
            }
            return changed;
        }
        removeAt(index) {
            let value = this._items.splice(this._validateIndex(index), 1)[0];
            this.emit(ObservableList.EVENT_CHANGE);
            return value;
        }
        removeRange(index, count) {
            index = this._validateIndex(index, true);
            if (count === undefined) {
                count = this._items.length - index;
                if (!count) {
                    return [];
                }
            }
            else {
                if (!count) {
                    return [];
                }
                if (index + count > this._items.length) {
                    throw RangeError('Sum of "index" and "count" out of valid range');
                }
            }
            let values = this._items.splice(index, count);
            this.emit(ObservableList.EVENT_CHANGE);
            return values;
        }
        clear() {
            if (this._items.length) {
                this._items.length = 0;
                this.emit(ObservableList.EVENT_CHANGE);
            }
            return this;
        }
        equals(that) {
            if (!(that instanceof ObservableList)) {
                return false;
            }
            let items = this._items;
            let thatItems = that._items;
            if (items.length != thatItems.length) {
                return false;
            }
            for (let i = items.length; i;) {
                if (items[--i] !== thatItems[i]) {
                    return false;
                }
            }
            return true;
        }
        join(separator) {
            return this._items.join(separator);
        }
        find(cb, context) {
            let items = this._items;
            for (let i = 0, l = items.length; i < l; i++) {
                let item = items[i];
                if (cb.call(context, item, i, this)) {
                    return item;
                }
            }
            return;
        }
        findIndex(cb, context) {
            let items = this._items;
            for (let i = 0, l = items.length; i < l; i++) {
                if (cb.call(context, items[i], i, this)) {
                    return i;
                }
            }
            return -1;
        }
        clone(deep) {
            return new this.constructor(deep
                ? this._items.map(item => item && item.clone ? item.clone(true) : item)
                : this, {
                comparator: this._comparator || undefined,
                sorted: this._sorted
            });
        }
        merge(that) {
            if (!(that instanceof ObservableList)) {
                throw TypeError('"that" must be instance of ObservableList');
            }
            let items = this._items;
            let thatItems = that._items;
            let changed = false;
            if (items.length != that.length) {
                items.length = that.length;
                changed = true;
            }
            for (let i = items.length; i;) {
                let item = items[--i];
                let thatItem = thatItems[i];
                if (item !== thatItem) {
                    if (item &&
                        thatItem &&
                        item.merge &&
                        item.merge === thatItem.merge) {
                        if (item.merge(thatItem)) {
                            changed = true;
                        }
                    }
                    else {
                        items[i] = thatItem;
                        changed = true;
                    }
                }
            }
            if (changed) {
                this.emit(ObservableList.EVENT_CHANGE);
            }
            return changed;
        }
        toArray() {
            return this._items.slice();
        }
        toString() {
            return this._items.join();
        }
        _insertSortedValue(value) {
            let items = this._items;
            let comparator = this._comparator;
            let low = 0;
            let high = items.length;
            while (low != high) {
                let mid = (low + high) >> 1;
                if (comparator(value, items[mid]) < 0) {
                    high = mid;
                }
                else {
                    low = mid + 1;
                }
            }
            items.splice(low, 0, value);
        }
    }
    ObservableList.EVENT_CHANGE = 'change';
    ['forEach', 'map', 'filter', 'every', 'some'].forEach(name => {
        ObservableList.prototype[name] = function (cb, context) {
            return this._items[name](function (item, index) {
                return cb.call(context, item, index, this);
            }, this);
        };
    });
    ['reduce', 'reduceRight'].forEach(name => {
        ObservableList.prototype[name] = function (cb, initialValue) {
            let list = this;
            function wrapper(accumulator, item, index) {
                return cb(accumulator, item, index, list);
            }
            return arguments.length >= 2
                ? this._items[name](wrapper, initialValue)
                : this._items[name](wrapper);
        };
    });
    [
        ['keys', (index) => index],
        ['values', (_index, item) => item],
        ['entries', (index, item) => [index, item]]
    ].forEach((settings) => {
        let getStepValue = settings[1];
        ObservableList.prototype[settings[0]] = function () {
            let items = this._items;
            let index = 0;
            let done = false;
            return {
                next() {
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
    });
    ObservableList.prototype[Symbol.iterator] = ObservableList.prototype.values;

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
        reap() {
            return this.cell.reap();
        },
        dispose() {
            return this.cell.dispose();
        }
    };
    function cellx(value, options) {
        // tslint:disable-next-line:only-arrow-functions
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
        let cellName = name + 'Cell';
        Object.defineProperty(obj, cellName, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: value instanceof Cell ? value : new Cell(value, { context: obj })
        });
        Object.defineProperty(obj, name, {
            configurable: true,
            enumerable: true,
            get() {
                return this[cellName].get();
            },
            set(value) {
                this[cellName].set(value);
            }
        });
        return obj;
    }
    function defineObservableProperties(obj, props) {
        Object.keys(props).forEach(name => {
            defineObservableProperty(obj, name, props[name]);
        });
        return obj;
    }
    function define(obj, name, value) {
        if (typeof name == 'string') {
            defineObservableProperty(obj, name, value);
        }
        else {
            defineObservableProperties(obj, name);
        }
        return obj;
    }

    exports.Cell = Cell;
    exports.EventEmitter = EventEmitter;
    exports.ObservableList = ObservableList;
    exports.ObservableMap = ObservableMap;
    exports.WaitError = WaitError;
    exports.cellx = cellx;
    exports.configure = configure;
    exports.define = define;
    exports.defineObservableProperties = defineObservableProperties;
    exports.defineObservableProperty = defineObservableProperty;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
