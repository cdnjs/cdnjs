"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("./Cell");
var EventEmitter_1 = require("./EventEmitter");
exports.EventEmitter = EventEmitter_1.EventEmitter;
var ObservableMap_1 = require("./collections/ObservableMap");
exports.ObservableMap = ObservableMap_1.ObservableMap;
var ObservableList_1 = require("./collections/ObservableList");
exports.ObservableList = ObservableList_1.ObservableList;
var Cell_2 = require("./Cell");
exports.Cell = Cell_2.Cell;
var WaitError_1 = require("./WaitError");
exports.WaitError = WaitError_1.WaitError;
const hasOwn = Object.prototype.hasOwnProperty;
const slice = Array.prototype.slice;
const global_ = Function('return this;')();
exports.KEY_CELLS = Symbol('cells');
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
        if (!hasOwn.call(context, exports.KEY_CELLS)) {
            context[exports.KEY_CELLS] = new Map();
        }
        let cell = context[exports.KEY_CELLS].get(cx);
        if (!cell) {
            if (value === 'dispose' && arguments.length >= 2) {
                return;
            }
            cell = new Cell_1.Cell(initialValue, {
                __proto__: options,
                context
            });
            context[exports.KEY_CELLS].set(cx, cell);
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
