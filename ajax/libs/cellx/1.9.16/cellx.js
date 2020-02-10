import { Cell } from './Cell';
export { EventEmitter } from './EventEmitter';
export { ObservableMap } from './collections/ObservableMap';
export { ObservableList } from './collections/ObservableList';
export { Cell } from './Cell';
export { WaitError } from './WaitError';
export { configure } from './config';
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
export function cellx(value, options) {
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
export function defineObservableProperty(obj, name, value) {
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
export function defineObservableProperties(obj, props) {
    Object.keys(props).forEach(name => {
        defineObservableProperty(obj, name, props[name]);
    });
    return obj;
}
export function define(obj, name, value) {
    if (typeof name == 'string') {
        defineObservableProperty(obj, name, value);
    }
    else {
        defineObservableProperties(obj, name);
    }
    return obj;
}
