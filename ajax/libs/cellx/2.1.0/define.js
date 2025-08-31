import { Cell } from './Cell';
import { KEY_VALUE_CELLS } from './keys';
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
