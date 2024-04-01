import { timeDay, timeHour, timeMinute, timeMonth, timeSecond, timeWeek, timeYear } from 'd3-time';
import { constants } from './constants.js';
import { config } from './config.js';
import { ascending } from 'd3-array';
export const pluck2 = function (n, f) {
    return function (d, i) {
        return f.call(d, d[n], i);
    };
};
export function sortBy(data, ordering) {
    // clone the array before sorting, otherwise Array.sort sorts in-place
    return [...data].sort((a, b) => {
        return ascending(ordering(a), ordering(b));
    });
}
/**
 * Print a single value filter.
 */
export function printSingleValue(filter) {
    let s = `${filter}`;
    if (filter instanceof Date) {
        s = config.dateFormat(filter);
    }
    else if (typeof filter === 'string') {
        s = filter;
    }
    else if (isFloat(filter)) {
        s = config.floatFormat(filter);
    }
    else if (isInteger(filter)) {
        s = `${Math.round(filter)}`;
    }
    return s;
}
// convert 'day' to d3.timeDay and similar
function _toTimeFunc(t) {
    const mappings = {
        second: timeSecond,
        minute: timeMinute,
        hour: timeHour,
        day: timeDay,
        week: timeWeek,
        month: timeMonth,
        year: timeYear,
    };
    return mappings[t];
}
/**
 * Arbitrary add one value to another.
 *
 * If the value l is of type Date, adds r units to it. t becomes the unit.
 * For example add(dt, 3, 'week') will add 3 (r = 3) weeks (t= 'week') to dt.
 *
 * If l is of type numeric, t is ignored. In this case if r is of type string,
 * it is assumed to be percentage (whether or not it includes %). For example
 * add(30, 10) will give 40 and add(30, '10') will give 33.
 *
 * They also generate strange results if l is a string.
 * @method add
 * @memberof utils
 * @param l the value to modify
 * @param r the amount by which to modify the value
 * @param [t=d3.timeDay] if `l` is a `Date`, then this should be a
 * [d3 time interval](https://github.com/d3/d3-time/blob/master/README.md#_interval).
 * For backward compatibility with dc.js 2.0, it can also be the name of an interval, i.e.
 * 'millis', 'second', 'minute', 'hour', 'day', 'week', 'month', or 'year'
 */
export function add(l, r, t) {
    if (typeof r === 'string') {
        r = r.replace('%', '');
    }
    if (l instanceof Date) {
        if (typeof r === 'string') {
            r = +r;
        }
        if (t === 'millis') {
            return new Date(l.getTime() + r);
        }
        t = t || timeDay;
        if (typeof t !== 'function') {
            t = _toTimeFunc(t);
        }
        return t.offset(l, r);
    }
    else if (typeof r === 'string') {
        const percentage = +r / 100;
        return l > 0 ? l * (1 + percentage) : l * (1 - percentage);
    }
    else {
        return l + r;
    }
}
/**
 * Arbitrary subtract one value from another.
 *
 * If the value l is of type Date, subtracts r units from it. t becomes the unit.
 * For example subtract(dt, 3, 'week') will subtract 3 (r = 3) weeks (t= 'week') from dt.
 *
 * If l is of type numeric, t is ignored. In this case if r is of type string,
 * it is assumed to be percentage (whether or not it includes %). For example
 * subtract(30, 10) will give 20 and subtract(30, '10') will give 27.
 *
 * They also generate strange results if l is a string.
 * @method subtract
 * @param l the value to modify
 * @param r the amount by which to modify the value
 * @param [t=d3.timeDay] if `l` is a `Date`, then this should be a
 * [d3 time interval](https://github.com/d3/d3-time/blob/master/README.md#_interval).
 * For backward compatibility with dc.js 2.0, it can also be the name of an interval, i.e.
 * 'millis', 'second', 'minute', 'hour', 'day', 'week', 'month', or 'year'
 */
export function subtract(l, r, t) {
    if (typeof r === 'string') {
        r = r.replace('%', '');
    }
    if (l instanceof Date) {
        if (typeof r === 'string') {
            r = +r;
        }
        if (t === 'millis') {
            return new Date(l.getTime() - r);
        }
        t = t || timeDay;
        if (typeof t !== 'function') {
            t = _toTimeFunc(t);
        }
        return t.offset(l, -r);
    }
    else if (typeof r === 'string') {
        const percentage = +r / 100;
        return l < 0 ? l * (1 + percentage) : l * (1 - percentage);
    }
    else {
        return l - r;
    }
}
/**
 * Is the value a number?
 */
export function isNumber(n) {
    return n === +n;
}
/**
 * Is the value a float?
 */
export function isFloat(n) {
    // tslint:disable-next-line:no-bitwise
    return n === +n && n !== (n | 0);
}
/**
 * Is the value an integer?
 */
export function isInteger(n) {
    // tslint:disable-next-line:no-bitwise
    return n === +n && n === (n | 0);
}
/**
 * Is the value very close to zero?
 */
export function isNegligible(n) {
    return !isNumber(n) || (n < constants.NEGLIGIBLE_NUMBER && n > -constants.NEGLIGIBLE_NUMBER);
}
/**
 * Ensure the value is no greater or less than the min/max values.  If it is return the boundary value.
 */
export function clamp(val, min, max) {
    return val < min ? min : val > max ? max : val;
}
/**
 * Using a simple static counter, provide a unique integer id.
 */
let _idCounter = 0;
export function uniqueId() {
    return ++_idCounter;
}
/**
 * Convert a name to an ID.
 */
export function nameToId(name) {
    return name.toLowerCase().replace(/[\s]/g, '_').replace(/[\.']/g, '');
}
/**
 * Append or select an item on a parent element.
 */
export function appendOrSelect(parent, selector, tag) {
    tag = tag || selector;
    let element = parent.select(selector);
    if (element.empty()) {
        element = parent.append(tag);
    }
    return element;
}
/**
 * Return the number if the value is a number; else 0.
 */
export function safeNumber(n) {
    return isNumber(+n) ? +n : 0;
}
/**
 * Return true if both arrays are equal, if both array are null these are considered equal
 */
export function arraysEqual(a1, a2) {
    if (!a1 && !a2) {
        return true;
    }
    if (!a1 || !a2) {
        return false;
    }
    return (a1.length === a2.length &&
        // If elements are not integers/strings, we hope that it will match because of toString
        // Test cases cover dates as well.
        a1.every((elem, i) => elem.valueOf() === a2[i].valueOf()));
}
// ******** Sunburst Chart ********
export function allChildren(node) {
    let paths = [];
    paths.push(node.path);
    console.log('currentNode', node);
    if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
            paths = paths.concat(allChildren(node.children[i]));
        }
    }
    return paths;
}
// builds a d3 Hierarchy from a collection
// TODO: turn this monster method something better.
export function toHierarchy(list, accessor) {
    const root = { key: 'root', children: [] };
    for (let i = 0; i < list.length; i++) {
        const data = list[i];
        const parts = data.key;
        const value = accessor(data);
        let currentNode = root;
        for (let j = 0; j < parts.length; j++) {
            const currentPath = parts.slice(0, j + 1);
            const children = currentNode.children;
            const nodeName = parts[j];
            let childNode;
            if (j + 1 < parts.length) {
                // Not yet at the end of the sequence; move down the tree.
                childNode = _findChild(children, nodeName);
                // If we don't already have a child node for this branch, create it.
                if (childNode === void 0) {
                    childNode = { key: nodeName, children: [], path: currentPath };
                    children.push(childNode);
                }
                currentNode = childNode;
            }
            else {
                // Reached the end of the sequence; create a leaf node.
                childNode = { key: nodeName, value, data, path: currentPath };
                children.push(childNode);
            }
        }
    }
    return root;
}
function _findChild(children, nodeName) {
    for (let k = 0; k < children.length; k++) {
        if (children[k].key === nodeName) {
            return children[k];
        }
    }
}
export function getAncestors(node) {
    const path = [];
    let current = node;
    while (current.parent) {
        path.unshift(current.name);
        current = current.parent;
    }
    return path;
}
export function arraysIdentical(a, b) {
    let i = a.length;
    if (i !== b.length) {
        return false;
    }
    while (i--) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=utils.js.map