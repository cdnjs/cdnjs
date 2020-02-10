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
var config_1 = require("./config");
exports.configure = config_1.configure;
const cellxProto = {
    __proto__: Function.prototype,
    cell: null,
    on(type, listener, context) {
        return this.cell.on(type, listener, context);
    },
    off(type, listener, context) {
        return this.cell.off(type, listener, context);
    },
    addChangeListener(listener, context) {
        return this.cell.addChangeListener(listener, context);
    },
    removeChangeListener(listener, context) {
        return this.cell.removeChangeListener(listener, context);
    },
    addErrorListener(listener, context) {
        return this.cell.addErrorListener(listener, context);
    },
    removeErrorListener(listener, context) {
        return this.cell.removeErrorListener(listener, context);
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
    $cellx.cell = new Cell_1.Cell(value, options);
    return $cellx;
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
