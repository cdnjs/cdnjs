import { Cell } from './Cell';
import { KEY_VALUE_CELLS } from './keys';
export { KEY_VALUE_CELLS } from './keys';
export { configure } from './config';
export { EventEmitter } from './EventEmitter';
export { Cell } from './Cell';
export { autorun } from './autorun';
export { WaitError } from './WaitError';
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
        if (arguments.length != 0) {
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
export function defineObservableProperty(obj, key, value) {
    (obj[KEY_VALUE_CELLS] || (obj[KEY_VALUE_CELLS] = new Map())).set(key, value instanceof Cell ? value : new Cell(value, { context: obj }));
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            return this[KEY_VALUE_CELLS].get(key).get();
        },
        set(value) {
            this[KEY_VALUE_CELLS].get(key).set(value);
        }
    });
    return obj;
}
export function defineObservableProperties(obj, props) {
    for (let key of Object.keys(props)) {
        defineObservableProperty(obj, key, props[key]);
    }
    return obj;
}
export function define(obj, keyOrProps, value) {
    if (typeof keyOrProps == 'object') {
        defineObservableProperties(obj, keyOrProps);
    }
    else {
        defineObservableProperty(obj, keyOrProps, value);
    }
    return obj;
}
