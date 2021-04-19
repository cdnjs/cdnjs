import { Cell } from './Cell';
export { configure } from './config';
export { EventEmitter } from './EventEmitter';
export { Cell } from './Cell';
export { WaitError } from './WaitError';
export const KEY_VALUE_CELLS = Symbol('valueCells');
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
export function cellx(value, options) {
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
export function defineObservableProperties(obj, props) {
    Object.keys(props).forEach((name) => {
        defineObservableProperty(obj, name, props[name]);
    });
    return obj;
}
export function define(obj, nameOrProps, value) {
    if (typeof nameOrProps == 'object') {
        defineObservableProperties(obj, nameOrProps);
    }
    else {
        defineObservableProperty(obj, nameOrProps, value);
    }
    return obj;
}
