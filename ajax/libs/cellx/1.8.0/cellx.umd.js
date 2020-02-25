(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cellx"] = factory();
	else
		root["cellx"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __webpack_require__(1);
const ObservableList_1 = __webpack_require__(6);
const ObservableMap_1 = __webpack_require__(7);
var EventEmitter_1 = __webpack_require__(4);
exports.EventEmitter = EventEmitter_1.EventEmitter;
var ObservableMap_2 = __webpack_require__(7);
exports.ObservableMap = ObservableMap_2.ObservableMap;
var ObservableList_2 = __webpack_require__(6);
exports.ObservableList = ObservableList_2.ObservableList;
var Cell_2 = __webpack_require__(1);
exports.Cell = Cell_2.Cell;
var WaitError_1 = __webpack_require__(5);
exports.WaitError = WaitError_1.WaitError;
const hasOwn = Object.prototype.hasOwnProperty;
const slice = Array.prototype.slice;
const global_ = Function('return this;')();
function map(entries) {
    return new ObservableMap_1.ObservableMap(entries);
}
exports.map = map;
function list(items, options) {
    return new ObservableList_1.ObservableList(items, options);
}
exports.list = list;
exports.KEY_CELL_MAP = Symbol('cellx[cellMap]');
function cellx(value, options) {
    if (!options) {
        options = {};
    }
    let initialValue = value;
    let cx = function (value) {
        let context = this;
        if (!context || context == global_) {
            context = cx;
        }
        if (!hasOwn.call(context, exports.KEY_CELL_MAP)) {
            context[exports.KEY_CELL_MAP] = new Map();
        }
        let cell = context[exports.KEY_CELL_MAP].get(cx);
        if (!cell) {
            if (value === 'dispose' && arguments.length >= 2) {
                return;
            }
            cell = new Cell_1.Cell(initialValue, {
                __proto__: options,
                context
            });
            context[exports.KEY_CELL_MAP].set(cx, cell);
        }
        switch (arguments.length) {
            case 0: {
                return cell.get();
            }
            case 1: {
                cell.set(value);
                return value;
            }
        }
        let method = value;
        switch (method) {
            case 'cell': {
                return cell;
            }
            case 'bind': {
                cx = cx.bind(context);
                cx.constructor = cellx;
                return cx;
            }
        }
        let result = Cell_1.Cell.prototype[method].apply(cell, slice.call(arguments, 1));
        return result === cell ? cx : result;
    };
    cx.constructor = cellx;
    if (options.onChange || options.onError) {
        cx.call(options.context || global_);
    }
    return cx;
}
exports.cellx = cellx;
function defineObservableProperty(obj, name, value) {
    let cellName = name + 'Cell';
    Object.defineProperty(obj, cellName, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value instanceof Cell_1.Cell ? value : new Cell_1.Cell(value, { context: obj })
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
exports.defineObservableProperty = defineObservableProperty;
function defineObservableProperties(obj, props) {
    Object.keys(props).forEach(name => {
        defineObservableProperty(obj, name, props[name]);
    });
    return obj;
}
exports.defineObservableProperties = defineObservableProperties;
function define(obj, name, value) {
    if (typeof name == 'string') {
        defineObservableProperty(obj, name, value);
    }
    else {
        defineObservableProperties(obj, name);
    }
    return obj;
}
exports.define = define;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(2);
const next_tick_1 = __webpack_require__(3);
const EventEmitter_1 = __webpack_require__(4);
const WaitError_1 = __webpack_require__(5);
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
    for (; pendingCellsIndex < pendingCells.length; pendingCellsIndex++) {
        if (pendingCells[pendingCellsIndex]._active) {
            pendingCells[pendingCellsIndex].actualize();
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
class Cell extends EventEmitter_1.EventEmitter {
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
        this._pull = typeof value == 'function' ? value : null;
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
            if (this._validate) {
                this._validate(value, undefined);
            }
            if (this._merge) {
                value = this._merge(value, undefined);
            }
            this._value = value;
            this._state = 'actual';
            this._inited = true;
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
            !this._events.has('change') &&
            !this._events.has('error')) {
            this._hasSubscribers = false;
            this._deactivate();
            if (this._reap) {
                this._reap.call(this.context);
            }
        }
        return this;
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
            !this._events.has('change') &&
            !this._events.has('error')) {
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
            next_tick_1.nextTick(release);
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
        if (this._currentlyPulling) {
            throw new TypeError('Circular pulling detected');
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
            if (prevValue instanceof EventEmitter_1.EventEmitter) {
                prevValue.off('change', this._onValueChange, this);
            }
            if (value instanceof EventEmitter_1.EventEmitter) {
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
            this.emit('change', {
                prevValue,
                value
            });
        }
        return changed;
    }
    fail(err) {
        this._inited = true;
        let isWaitError = err instanceof WaitError_1.WaitError;
        if (!isWaitError) {
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
                type: 'error',
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
        throw new WaitError_1.WaitError();
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
exports.Cell = Cell;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function noop() { }
var defaultHandler = function (type) {
    var msg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        msg[_i - 1] = arguments[_i];
    }
    (console[type] || noop).apply(console, type == 'error' ? msg.map(function (m) { return (m && typeof m == 'object' && m.stack) || m; }) : msg);
};
var Logger = /** @class */ (function () {
    function Logger(handler) {
        this.handler = handler || defaultHandler;
    }
    Logger.prototype.log = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.handler.apply(this, ['log'].concat(msg));
    };
    Logger.prototype.warn = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.handler.apply(this, ['warn'].concat(msg));
    };
    Logger.prototype.error = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        this.handler.apply(this, ['error'].concat(msg));
    };
    return Logger;
}());
exports.Logger = Logger;
exports.logger = (Logger.$instance = new Logger());
exports.log = exports.logger.log.bind(exports.logger);
exports.warn = exports.logger.warn.bind(exports.logger);
exports.error = exports.logger.error.bind(exports.logger);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(2);
exports.nextTick = (() => {
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
    if (global.Promise && Promise.toString().indexOf('[native code]') != -1) {
        const prm = Promise.resolve();
        return (cb) => {
            prm.then(() => {
                cb();
            });
        };
    }
    let queue;
    global.addEventListener('message', () => {
        if (queue) {
            let track = queue;
            queue = null;
            for (let i = 0, l = track.length; i < l; i++) {
                try {
                    track[i]();
                }
                catch (err) {
                    logger_1.error(err);
                }
            }
        }
    });
    return (cb) => {
        if (queue) {
            queue.push(cb);
        }
        else {
            queue = [cb];
            postMessage('__tic__', '*');
        }
    };
})();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(2);
const hasOwn = Object.prototype.hasOwnProperty;
let currentlySubscribing = false;
let transactionLevel = 0;
let transactionEvents = [];
class EventEmitter {
    static get currentlySubscribing() {
        return currentlySubscribing;
    }
    static set currentlySubscribing(value) {
        currentlySubscribing = value;
    }
    static transact(cb) {
        transactionLevel++;
        try {
            cb();
        }
        catch (err) {
            logger_1.error(err);
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
    constructor() {
        this._events = new Map();
    }
    getEvents(type) {
        if (type) {
            let events = this._events.get(type);
            if (!events) {
                return [];
            }
            return Array.isArray(events) ? events : [events];
        }
        let events = { __proto__: null };
        this._events.forEach((typeEvents, type) => {
            events[type] = Array.isArray(typeEvents) ? typeEvents : [typeEvents];
        });
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
        let index = type.indexOf(':');
        if (index != -1) {
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
        let index = type.indexOf(':');
        if (index != -1) {
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
        if (typeof evt == 'string') {
            evt = {
                target: this,
                type: evt
            };
        }
        else if (!evt.target) {
            evt.target = this;
        }
        else if (evt.target != this) {
            throw new TypeError('Event cannot be emitted on this object');
        }
        if (data) {
            evt.data = data;
        }
        if (transactionLevel) {
            for (let i = transactionEvents.length;;) {
                if (!i) {
                    (evt.data || (evt.data = {})).prevEvent = null;
                    transactionEvents.push(evt);
                    break;
                }
                let event = transactionEvents[--i];
                if (event.target == this && event.type == evt.type) {
                    (evt.data || (evt.data = {})).prevEvent = event;
                    transactionEvents[i] = evt;
                    break;
                }
            }
        }
        else {
            this.handleEvent(evt);
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
            logger_1.error(err);
        }
    }
}
exports.EventEmitter = EventEmitter;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function WaitError() { }
exports.WaitError = WaitError;
WaitError.prototype = {
    __proto__: Error.prototype,
    constructor: WaitError
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter_1 = __webpack_require__(4);
const push = Array.prototype.push;
const splice = Array.prototype.splice;
const defaultComparator = (a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
};
class ObservableList extends EventEmitter_1.EventEmitter {
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
    _validateIndex(index, allowEndIndex) {
        if (index === undefined) {
            return index;
        }
        if (index < 0) {
            index += this._items.length;
            if (index < 0) {
                throw new RangeError('Index out of valid range');
            }
        }
        else if (index > this._items.length - (allowEndIndex ? 0 : 1)) {
            throw new RangeError('Index out of valid range');
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
            throw new RangeError('Sum of "index" and "count" out of valid range');
        }
        return this._items.slice(index, index + count);
    }
    set(index, value) {
        if (this._sorted) {
            throw new TypeError('Cannot set to sorted list');
        }
        index = this._validateIndex(index, true);
        if (!Object.is(value, this._items[index])) {
            this._items[index] = value;
            this.emit('change');
        }
        return this;
    }
    setRange(index, values) {
        if (this._sorted) {
            throw new TypeError('Cannot set to sorted list');
        }
        index = this._validateIndex(index, true);
        if (values instanceof ObservableList) {
            values = values._items;
        }
        let valueCount = values.length;
        if (!valueCount) {
            return this;
        }
        if (index + valueCount > this._items.length) {
            throw new RangeError('Sum of "index" and "values.length" out of valid range');
        }
        let items = this._items;
        let changed = false;
        for (let i = index + valueCount; i > index;) {
            let value = values[--i - index];
            if (!Object.is(value, items[i])) {
                items[i] = value;
                changed = true;
            }
        }
        if (changed) {
            this.emit('change');
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
        this.emit('change');
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
                for (let i = 0, l = values.length; i < l; i++) {
                    let value = values[i];
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
                    this.emit('change');
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
                this.emit('change');
            }
        }
        return this;
    }
    insert(index, value) {
        if (this._sorted) {
            throw new TypeError('Cannot insert to sorted list');
        }
        this._items.splice(this._validateIndex(index, true), 0, value);
        this.emit('change');
        return this;
    }
    insertRange(index, values) {
        if (this._sorted) {
            throw new TypeError('Cannot insert to sorted list');
        }
        index = this._validateIndex(index, true);
        if (values instanceof ObservableList) {
            values = values._items;
        }
        if (values.length) {
            splice.apply(this._items, [index, 0].concat(values));
            this.emit('change');
        }
        return this;
    }
    remove(value, fromIndex) {
        let index = this._items.indexOf(value, this._validateIndex(fromIndex, true));
        if (index == -1) {
            return false;
        }
        this._items.splice(index, 1);
        this.emit('change');
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
            this.emit('change');
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
            this.emit('change');
        }
        return changed;
    }
    removeAt(index) {
        let value = this._items.splice(this._validateIndex(index), 1)[0];
        this.emit('change');
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
                throw new RangeError('Sum of "index" and "count" out of valid range');
            }
        }
        let values = this._items.splice(index, count);
        this.emit('change');
        return values;
    }
    clear() {
        if (this._items.length) {
            this._items.length = 0;
            this.emit('change', { subtype: 'clear' });
        }
        return this;
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
exports.ObservableList = ObservableList;
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
    ['values', (index, item) => item],
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter_1 = __webpack_require__(4);
const hasOwn = Object.prototype.hasOwnProperty;
class ObservableMap extends EventEmitter_1.EventEmitter {
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
                    if (hasOwn.call(entries, key)) {
                        mapEntries.set(key, entries[key]);
                    }
                }
            }
        }
    }
    get size() {
        return this._entries.size;
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
        this.emit('change', {
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
            this.emit('change', {
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
            this.emit('change', { subtype: 'clear' });
        }
        return this;
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
}
exports.ObservableMap = ObservableMap;
ObservableMap.prototype[Symbol.iterator] = ObservableMap.prototype.entries;


/***/ })
/******/ ]);
});