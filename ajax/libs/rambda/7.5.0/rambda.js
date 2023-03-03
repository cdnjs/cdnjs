'use strict';

function F() {
  return false;
}

function T() {
  return true;
}

function add(a, b) {
  if (arguments.length === 1) return _b => add(a, _b);
  return Number(a) + Number(b);
}

const cloneList = list => Array.prototype.slice.call(list);

function curry(fn, args = []) {
  return (..._args) => (rest => rest.length >= fn.length ? fn(...rest) : curry(fn, rest))([...args, ..._args]);
}

function adjustFn(index, replaceFn, list) {
  const actualIndex = index < 0 ? list.length + index : index;
  if (index >= list.length || actualIndex < 0) return list;
  const clone = cloneList(list);
  clone[actualIndex] = replaceFn(clone[actualIndex]);
  return clone;
}
const adjust = curry(adjustFn);

function all(predicate, list) {
  if (arguments.length === 1) return _list => all(predicate, _list);
  for (let i = 0; i < list.length; i++) {
    if (!predicate(list[i])) return false;
  }
  return true;
}

function allPass(predicates) {
  return (...input) => {
    let counter = 0;
    while (counter < predicates.length) {
      if (!predicates[counter](...input)) {
        return false;
      }
      counter++;
    }
    return true;
  };
}

function always(x) {
  return _ => x;
}

function and(a, b) {
  if (arguments.length === 1) return _b => and(a, _b);
  return a && b;
}

function any(predicate, list) {
  if (arguments.length === 1) return _list => any(predicate, _list);
  let counter = 0;
  while (counter < list.length) {
    if (predicate(list[counter], counter)) {
      return true;
    }
    counter++;
  }
  return false;
}

function anyPass(predicates) {
  return (...input) => {
    let counter = 0;
    while (counter < predicates.length) {
      if (predicates[counter](...input)) {
        return true;
      }
      counter++;
    }
    return false;
  };
}

function append(x, input) {
  if (arguments.length === 1) return _input => append(x, _input);
  if (typeof input === 'string') return input.split('').concat(x);
  const clone = cloneList(input);
  clone.push(x);
  return clone;
}

function apply(fn, args) {
  if (arguments.length === 1) {
    return _args => apply(fn, _args);
  }
  return fn.apply(this, args);
}

const {
  isArray
} = Array;

function __findHighestArity(spec, max = 0) {
  for (const key in spec) {
    if (spec.hasOwnProperty(key) === false || key === 'constructor') continue;
    if (typeof spec[key] === 'object') {
      max = Math.max(max, __findHighestArity(spec[key]));
    }
    if (typeof spec[key] === 'function') {
      max = Math.max(max, spec[key].length);
    }
  }
  return max;
}
function __filterUndefined() {
  const defined = [];
  let i = 0;
  const l = arguments.length;
  while (i < l) {
    if (typeof arguments[i] === 'undefined') break;
    defined[i] = arguments[i];
    i++;
  }
  return defined;
}
function __applySpecWithArity(spec, arity, cache) {
  const remaining = arity - cache.length;
  if (remaining === 1) return x => __applySpecWithArity(spec, arity, __filterUndefined(...cache, x));
  if (remaining === 2) return (x, y) => __applySpecWithArity(spec, arity, __filterUndefined(...cache, x, y));
  if (remaining === 3) return (x, y, z) => __applySpecWithArity(spec, arity, __filterUndefined(...cache, x, y, z));
  if (remaining === 4) return (x, y, z, a) => __applySpecWithArity(spec, arity, __filterUndefined(...cache, x, y, z, a));
  if (remaining > 4) return (...args) => __applySpecWithArity(spec, arity, __filterUndefined(...cache, ...args));
  if (isArray(spec)) {
    const ret = [];
    let i = 0;
    const l = spec.length;
    for (; i < l; i++) {
      if (typeof spec[i] === 'object' || isArray(spec[i])) {
        ret[i] = __applySpecWithArity(spec[i], arity, cache);
      }
      if (typeof spec[i] === 'function') {
        ret[i] = spec[i](...cache);
      }
    }
    return ret;
  }
  const ret = {};
  for (const key in spec) {
    if (spec.hasOwnProperty(key) === false || key === 'constructor') continue;
    if (typeof spec[key] === 'object') {
      ret[key] = __applySpecWithArity(spec[key], arity, cache);
      continue;
    }
    if (typeof spec[key] === 'function') {
      ret[key] = spec[key](...cache);
    }
  }
  return ret;
}
function applySpec(spec, ...args) {
  const arity = __findHighestArity(spec);
  if (arity === 0) {
    return () => ({});
  }
  const toReturn = __applySpecWithArity(spec, arity, args);
  return toReturn;
}

function assocFn(prop, newValue, obj) {
  return Object.assign({}, obj, {
    [prop]: newValue
  });
}
const assoc = curry(assocFn);

function _isInteger(n) {
  return n << 0 === n;
}
const isInteger = Number.isInteger || _isInteger;

function assocPathFn(path, newValue, input) {
  const pathArrValue = typeof path === 'string' ? path.split('.').map(x => isInteger(Number(x)) ? Number(x) : x) : path;
  if (pathArrValue.length === 0) {
    return newValue;
  }
  const index = pathArrValue[0];
  if (pathArrValue.length > 1) {
    const condition = typeof input !== 'object' || input === null || !input.hasOwnProperty(index);
    const nextInput = condition ? isInteger(pathArrValue[1]) ? [] : {} : input[index];
    newValue = assocPathFn(Array.prototype.slice.call(pathArrValue, 1), newValue, nextInput);
  }
  if (isInteger(index) && isArray(input)) {
    const arr = cloneList(input);
    arr[index] = newValue;
    return arr;
  }
  return assoc(index, newValue, input);
}
const assocPath = curry(assocPathFn);

function _curryN(n, cache, fn) {
  return function () {
    let ci = 0;
    let ai = 0;
    const cl = cache.length;
    const al = arguments.length;
    const args = new Array(cl + al);
    while (ci < cl) {
      args[ci] = cache[ci];
      ci++;
    }
    while (ai < al) {
      args[cl + ai] = arguments[ai];
      ai++;
    }
    const remaining = n - args.length;
    return args.length >= n ? fn.apply(this, args) : _arity$1(remaining, _curryN(n, args, fn));
  };
}
function _arity$1(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (_1) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (_1, _2) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (_1, _2, _3) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (_1, _2, _3, _4) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (_1, _2, _3, _4, _5) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (_1, _2, _3, _4, _5, _6) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (_1, _2, _3, _4, _5, _6, _7) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (_1, _2, _3, _4, _5, _6, _7, _8) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (_1, _2, _3, _4, _5, _6, _7, _8, _9) {
        return fn.apply(this, arguments);
      };
    default:
      return function (_1, _2, _3, _4, _5, _6, _7, _8, _9, _10) {
        return fn.apply(this, arguments);
      };
  }
}
function curryN(n, fn) {
  if (arguments.length === 1) return _fn => curryN(n, _fn);
  if (n > 10) {
    throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
  return _arity$1(n, _curryN(n, [], fn));
}

function bind(fn, thisObj) {
  if (arguments.length === 1) {
    return _thisObj => bind(fn, _thisObj);
  }
  return curryN(fn.length, (...args) => fn.apply(thisObj, args));
}

function both(f, g) {
  if (arguments.length === 1) return _g => both(f, _g);
  return (...input) => f(...input) && g(...input);
}

function chain(fn, list) {
  if (arguments.length === 1) {
    return _list => chain(fn, _list);
  }
  return [].concat(...list.map(fn));
}

function clampFn(min, max, input) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }
  if (input >= min && input <= max) return input;
  if (input > max) return max;
  if (input < min) return min;
}
const clamp = curry(clampFn);

function clone(input) {
  const out = isArray(input) ? Array(input.length) : {};
  if (input && input.getTime) return new Date(input.getTime());
  for (const key in input) {
    const v = input[key];
    out[key] = typeof v === 'object' && v !== null ? v.getTime ? new Date(v.getTime()) : clone(v) : v;
  }
  return out;
}

function complement(fn) {
  return (...input) => !fn(...input);
}

class ReduceStopper {
  constructor(value) {
    this.value = value;
  }
}
function reduceFn(reducer, acc, list) {
  if (!isArray(list)) {
    throw new TypeError('reduce: list must be array or iterable');
  }
  let index = 0;
  const len = list.length;
  while (index < len) {
    acc = reducer(acc, list[index], index, list);
    if (acc instanceof ReduceStopper) {
      return acc.value;
    }
    index++;
  }
  return acc;
}
const reduce = curry(reduceFn);
const reduceStopper = value => new ReduceStopper(value);

function _arity(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}
function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}
function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(arguments[0].length, reduceFn(_pipe, arguments[0], Array.prototype.slice.call(arguments, 1, Infinity)));
}

function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe.apply(this, Array.prototype.slice.call(arguments, 0).reverse());
}

function concat(x, y) {
  if (arguments.length === 1) return _y => concat(x, _y);
  return typeof x === 'string' ? `${x}${y}` : [...x, ...y];
}

function cond(conditions) {
  return input => {
    let done = false;
    let toReturn;
    conditions.forEach(([predicate, resultClosure]) => {
      if (!done && predicate(input)) {
        done = true;
        toReturn = resultClosure(input);
      }
    });
    return toReturn;
  };
}

const INCORRECT_ITERABLE_INPUT = 'Incorrect iterable input';

const {
  keys: keys$1
} = Object;

function mapArray(fn, list, isIndexed = false) {
  let index = 0;
  const willReturn = Array(list.length);
  while (index < list.length) {
    willReturn[index] = isIndexed ? fn(list[index], index) : fn(list[index]);
    index++;
  }
  return willReturn;
}
function mapObject(fn, obj) {
  if (arguments.length === 1) {
    return _obj => mapObject(fn, _obj);
  }
  let index = 0;
  const objKeys = keys$1(obj);
  const len = objKeys.length;
  const willReturn = {};
  while (index < len) {
    const key = objKeys[index];
    willReturn[key] = fn(obj[key], key, obj);
    index++;
  }
  return willReturn;
}
const mapObjIndexed = mapObject;
function map(fn, iterable) {
  if (arguments.length === 1) return _iterable => map(fn, _iterable);
  if (!iterable) {
    throw new Error(INCORRECT_ITERABLE_INPUT);
  }
  if (isArray(iterable)) return mapArray(fn, iterable);
  return mapObject(fn, iterable);
}

function max(x, y) {
  if (arguments.length === 1) return _y => max(x, _y);
  return y > x ? y : x;
}

function converge(fn, transformers) {
  if (arguments.length === 1) return _transformers => converge(fn, _transformers);
  const highestArity = reduce((a, b) => max(a, b.length), 0, transformers);
  return curryN(highestArity, function () {
    return fn.apply(this, map(g => g.apply(this, arguments), transformers));
  });
}

function count(predicate, list) {
  if (arguments.length === 1) {
    return _list => count(predicate, _list);
  }
  if (!isArray(list)) return 0;
  return list.filter(x => predicate(x)).length;
}

function countBy(fn, list) {
  if (arguments.length === 1) {
    return _list => countBy(fn, _list);
  }
  const willReturn = {};
  list.forEach(item => {
    const key = fn(item);
    if (!willReturn[key]) {
      willReturn[key] = 1;
    } else {
      willReturn[key]++;
    }
  });
  return willReturn;
}

const dec = x => x - 1;

function isFalsy(input) {
  return input === undefined || input === null || Number.isNaN(input) === true;
}
function defaultTo(defaultArgument, input) {
  if (arguments.length === 1) {
    return _input => defaultTo(defaultArgument, _input);
  }
  return isFalsy(input) ? defaultArgument : input;
}

function type(input) {
  if (input === null) {
    return 'Null';
  } else if (input === undefined) {
    return 'Undefined';
  } else if (Number.isNaN(input)) {
    return 'NaN';
  }
  const typeResult = Object.prototype.toString.call(input).slice(8, -1);
  return typeResult === 'AsyncFunction' ? 'Promise' : typeResult;
}

function _lastIndexOf(valueToFind, list) {
  if (!isArray(list)) {
    throw new Error(`Cannot read property 'indexOf' of ${list}`);
  }
  const typeOfValue = type(valueToFind);
  if (!['Object', 'Array', 'NaN', 'RegExp'].includes(typeOfValue)) return list.lastIndexOf(valueToFind);
  const {
    length
  } = list;
  let index = length;
  let foundIndex = -1;
  while (--index > -1 && foundIndex === -1) {
    if (equals(list[index], valueToFind)) {
      foundIndex = index;
    }
  }
  return foundIndex;
}
function _indexOf(valueToFind, list) {
  if (!isArray(list)) {
    throw new Error(`Cannot read property 'indexOf' of ${list}`);
  }
  const typeOfValue = type(valueToFind);
  if (!['Object', 'Array', 'NaN', 'RegExp'].includes(typeOfValue)) return list.indexOf(valueToFind);
  let index = -1;
  let foundIndex = -1;
  const {
    length
  } = list;
  while (++index < length && foundIndex === -1) {
    if (equals(list[index], valueToFind)) {
      foundIndex = index;
    }
  }
  return foundIndex;
}
function _arrayFromIterator(iter) {
  const list = [];
  let next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}
function _equalsSets(a, b) {
  if (a.size !== b.size) {
    return false;
  }
  const aList = _arrayFromIterator(a.values());
  const bList = _arrayFromIterator(b.values());
  const filtered = aList.filter(aInstance => _indexOf(aInstance, bList) === -1);
  return filtered.length === 0;
}
function parseError(maybeError) {
  const typeofError = maybeError.__proto__.toString();
  if (!['Error', 'TypeError'].includes(typeofError)) return [];
  return [typeofError, maybeError.message];
}
function parseDate(maybeDate) {
  if (!maybeDate.toDateString) return [false];
  return [true, maybeDate.getTime()];
}
function parseRegex(maybeRegex) {
  if (maybeRegex.constructor !== RegExp) return [false];
  return [true, maybeRegex.toString()];
}
function equals(a, b) {
  if (arguments.length === 1) return _b => equals(a, _b);
  const aType = type(a);
  if (aType !== type(b)) return false;
  if (aType === 'Function') {
    return a.name === undefined ? false : a.name === b.name;
  }
  if (['NaN', 'Undefined', 'Null'].includes(aType)) return true;
  if (aType === 'Number') {
    if (Object.is(-0, a) !== Object.is(-0, b)) return false;
    return a.toString() === b.toString();
  }
  if (['String', 'Boolean'].includes(aType)) {
    return a.toString() === b.toString();
  }
  if (aType === 'Array') {
    const aClone = Array.from(a);
    const bClone = Array.from(b);
    if (aClone.toString() !== bClone.toString()) {
      return false;
    }
    let loopArrayFlag = true;
    aClone.forEach((aCloneInstance, aCloneIndex) => {
      if (loopArrayFlag) {
        if (aCloneInstance !== bClone[aCloneIndex] && !equals(aCloneInstance, bClone[aCloneIndex])) {
          loopArrayFlag = false;
        }
      }
    });
    return loopArrayFlag;
  }
  const aRegex = parseRegex(a);
  const bRegex = parseRegex(b);
  if (aRegex[0]) {
    return bRegex[0] ? aRegex[1] === bRegex[1] : false;
  } else if (bRegex[0]) return false;
  const aDate = parseDate(a);
  const bDate = parseDate(b);
  if (aDate[0]) {
    return bDate[0] ? aDate[1] === bDate[1] : false;
  } else if (bDate[0]) return false;
  const aError = parseError(a);
  const bError = parseError(b);
  if (aError[0]) {
    return bError[0] ? aError[0] === bError[0] && aError[1] === bError[1] : false;
  }
  if (aType === 'Set') {
    return _equalsSets(a, b);
  }
  if (aType === 'Object') {
    const aKeys = Object.keys(a);
    if (aKeys.length !== Object.keys(b).length) {
      return false;
    }
    let loopObjectFlag = true;
    aKeys.forEach(aKeyInstance => {
      if (loopObjectFlag) {
        const aValue = a[aKeyInstance];
        const bValue = b[aKeyInstance];
        if (aValue !== bValue && !equals(aValue, bValue)) {
          loopObjectFlag = false;
        }
      }
    });
    return loopObjectFlag;
  }
  return false;
}

function includes(valueToFind, iterable) {
  if (arguments.length === 1) return _iterable => includes(valueToFind, _iterable);
  if (typeof iterable === 'string') {
    return iterable.includes(valueToFind);
  }
  if (!iterable) {
    throw new TypeError(`Cannot read property \'indexOf\' of ${iterable}`);
  }
  if (!isArray(iterable)) return false;
  return _indexOf(valueToFind, iterable) > -1;
}

class _Set {
  constructor() {
    this.set = new Set();
    this.items = {};
  }
  checkUniqueness(item) {
    const type$1 = type(item);
    if (['Null', 'Undefined', 'NaN'].includes(type$1)) {
      if (type$1 in this.items) {
        return false;
      }
      this.items[type$1] = true;
      return true;
    }
    if (!['Object', 'Array'].includes(type$1)) {
      const prevSize = this.set.size;
      this.set.add(item);
      return this.set.size !== prevSize;
    }
    if (!(type$1 in this.items)) {
      this.items[type$1] = [item];
      return true;
    }
    if (_indexOf(item, this.items[type$1]) === -1) {
      this.items[type$1].push(item);
      return true;
    }
    return false;
  }
}

function uniq(list) {
  const set = new _Set();
  const willReturn = [];
  list.forEach(item => {
    if (set.checkUniqueness(item)) {
      willReturn.push(item);
    }
  });
  return willReturn;
}

function difference(a, b) {
  if (arguments.length === 1) return _b => difference(a, _b);
  return uniq(a).filter(aInstance => !includes(aInstance, b));
}

function dissoc(prop, obj) {
  if (arguments.length === 1) return _obj => dissoc(prop, _obj);
  if (obj === null || obj === undefined) return {};
  const willReturn = {};
  for (const p in obj) {
    willReturn[p] = obj[p];
  }
  delete willReturn[prop];
  return willReturn;
}

function divide(a, b) {
  if (arguments.length === 1) return _b => divide(a, _b);
  return a / b;
}

function drop(howManyToDrop, listOrString) {
  if (arguments.length === 1) return _list => drop(howManyToDrop, _list);
  return listOrString.slice(howManyToDrop > 0 ? howManyToDrop : 0);
}

function dropLast(howManyToDrop, listOrString) {
  if (arguments.length === 1) {
    return _listOrString => dropLast(howManyToDrop, _listOrString);
  }
  return howManyToDrop > 0 ? listOrString.slice(0, -howManyToDrop) : listOrString.slice();
}

function dropLastWhile(predicate, iterable) {
  if (arguments.length === 1) {
    return _iterable => dropLastWhile(predicate, _iterable);
  }
  if (iterable.length === 0) return iterable;
  const isArray$1 = isArray(iterable);
  if (typeof predicate !== 'function') {
    throw new Error(`'predicate' is from wrong type ${typeof predicate}`);
  }
  if (!isArray$1 && typeof iterable !== 'string') {
    throw new Error(`'iterable' is from wrong type ${typeof iterable}`);
  }
  const toReturn = [];
  let counter = iterable.length;
  while (counter) {
    const item = iterable[--counter];
    if (!predicate(item)) {
      toReturn.push(item);
      break;
    }
  }
  while (counter) {
    toReturn.push(iterable[--counter]);
  }
  return isArray$1 ? toReturn.reverse() : toReturn.reverse().join('');
}

function dropRepeats(list) {
  if (!isArray(list)) {
    throw new Error(`${list} is not a list`);
  }
  const toReturn = [];
  list.reduce((prev, current) => {
    if (!equals(prev, current)) {
      toReturn.push(current);
    }
    return current;
  }, undefined);
  return toReturn;
}

function dropRepeatsWith(predicate, list) {
  if (arguments.length === 1) {
    return _iterable => dropRepeatsWith(predicate, _iterable);
  }
  if (!isArray(list)) {
    throw new Error(`${list} is not a list`);
  }
  const toReturn = [];
  list.reduce((prev, current) => {
    if (prev === undefined) {
      toReturn.push(current);
      return current;
    }
    if (!predicate(prev, current)) {
      toReturn.push(current);
    }
    return current;
  }, undefined);
  return toReturn;
}

function dropWhile(predicate, iterable) {
  if (arguments.length === 1) {
    return _iterable => dropWhile(predicate, _iterable);
  }
  const isArray$1 = isArray(iterable);
  if (!isArray$1 && typeof iterable !== 'string') {
    throw new Error('`iterable` is neither list nor a string');
  }
  const toReturn = [];
  let counter = 0;
  while (counter < iterable.length) {
    const item = iterable[counter++];
    if (!predicate(item)) {
      toReturn.push(item);
      break;
    }
  }
  while (counter < iterable.length) {
    toReturn.push(iterable[counter++]);
  }
  return isArray$1 ? toReturn : toReturn.join('');
}

function either(firstPredicate, secondPredicate) {
  if (arguments.length === 1) {
    return _secondPredicate => either(firstPredicate, _secondPredicate);
  }
  return (...input) => Boolean(firstPredicate(...input) || secondPredicate(...input));
}

function endsWith(target, iterable) {
  if (arguments.length === 1) return _iterable => endsWith(target, _iterable);
  if (typeof iterable === 'string') {
    return iterable.endsWith(target);
  }
  if (!isArray(target)) return false;
  const diff = iterable.length - target.length;
  let correct = true;
  const filtered = target.filter((x, index) => {
    if (!correct) return false;
    const result = equals(x, iterable[index + diff]);
    if (!result) correct = false;
    return result;
  });
  return filtered.length === target.length;
}

function prop(propToFind, obj) {
  if (arguments.length === 1) return _obj => prop(propToFind, _obj);
  if (!obj) return undefined;
  return obj[propToFind];
}

function eqPropsFn(property, objA, objB) {
  return equals(prop(property, objA), prop(property, objB));
}
const eqProps = curry(eqPropsFn);

function evolveArray(rules, list) {
  return mapArray((x, i) => {
    if (type(rules[i]) === 'Function') {
      return rules[i](x);
    }
    return x;
  }, list, true);
}
function evolveObject(rules, iterable) {
  return mapObject((x, prop) => {
    if (type(x) === 'Object') {
      const typeRule = type(rules[prop]);
      if (typeRule === 'Function') {
        return rules[prop](x);
      }
      if (typeRule === 'Object') {
        return evolve(rules[prop], x);
      }
      return x;
    }
    if (type(rules[prop]) === 'Function') {
      return rules[prop](x);
    }
    return x;
  }, iterable);
}
function evolve(rules, iterable) {
  if (arguments.length === 1) {
    return _iterable => evolve(rules, _iterable);
  }
  const rulesType = type(rules);
  const iterableType = type(iterable);
  if (iterableType !== rulesType) {
    throw new Error('iterableType !== rulesType');
  }
  if (!['Object', 'Array'].includes(rulesType)) {
    throw new Error(`'iterable' and 'rules' are from wrong type ${rulesType}`);
  }
  if (iterableType === 'Object') {
    return evolveObject(rules, iterable);
  }
  return evolveArray(rules, iterable);
}

function filterObject(predicate, obj) {
  const willReturn = {};
  for (const prop in obj) {
    if (predicate(obj[prop], prop, obj)) {
      willReturn[prop] = obj[prop];
    }
  }
  return willReturn;
}
function filterArray(predicate, list, indexed = false) {
  let index = 0;
  const len = list.length;
  const willReturn = [];
  while (index < len) {
    const predicateResult = indexed ? predicate(list[index], index) : predicate(list[index]);
    if (predicateResult) {
      willReturn.push(list[index]);
    }
    index++;
  }
  return willReturn;
}
function filter(predicate, iterable) {
  if (arguments.length === 1) return _iterable => filter(predicate, _iterable);
  if (!iterable) {
    throw new Error('Incorrect iterable input');
  }
  if (isArray(iterable)) return filterArray(predicate, iterable, false);
  return filterObject(predicate, iterable);
}

function find(predicate, list) {
  if (arguments.length === 1) return _list => find(predicate, _list);
  let index = 0;
  const len = list.length;
  while (index < len) {
    const x = list[index];
    if (predicate(x)) {
      return x;
    }
    index++;
  }
}

function findIndex(predicate, list) {
  if (arguments.length === 1) return _list => findIndex(predicate, _list);
  const len = list.length;
  let index = -1;
  while (++index < len) {
    if (predicate(list[index])) {
      return index;
    }
  }
  return -1;
}

function findLast(predicate, list) {
  if (arguments.length === 1) return _list => findLast(predicate, _list);
  let index = list.length;
  while (--index >= 0) {
    if (predicate(list[index])) {
      return list[index];
    }
  }
  return undefined;
}

function findLastIndex(fn, list) {
  if (arguments.length === 1) return _list => findLastIndex(fn, _list);
  let index = list.length;
  while (--index >= 0) {
    if (fn(list[index])) {
      return index;
    }
  }
  return -1;
}

function flatten(list, input) {
  const willReturn = input === undefined ? [] : input;
  for (let i = 0; i < list.length; i++) {
    if (isArray(list[i])) {
      flatten(list[i], willReturn);
    } else {
      willReturn.push(list[i]);
    }
  }
  return willReturn;
}

function flipFn(fn) {
  return (...input) => {
    if (input.length === 1) {
      return holder => fn(holder, input[0]);
    } else if (input.length === 2) {
      return fn(input[1], input[0]);
    } else if (input.length === 3) {
      return fn(input[1], input[0], input[2]);
    } else if (input.length === 4) {
      return fn(input[1], input[0], input[2], input[3]);
    }
    throw new Error('R.flip doesn\'t work with arity > 4');
  };
}
function flip(fn) {
  return flipFn(fn);
}

function forEach(fn, list) {
  if (arguments.length === 1) return _list => forEach(fn, _list);
  if (list === undefined) {
    return;
  }
  if (isArray(list)) {
    let index = 0;
    const len = list.length;
    while (index < len) {
      fn(list[index]);
      index++;
    }
  } else {
    let index = 0;
    const listKeys = keys$1(list);
    const len = listKeys.length;
    while (index < len) {
      const key = listKeys[index];
      fn(list[key], key, list);
      index++;
    }
  }
  return list;
}

function fromPairs(listOfPairs) {
  const toReturn = {};
  listOfPairs.forEach(([prop, value]) => toReturn[prop] = value);
  return toReturn;
}

function groupBy(groupFn, list) {
  if (arguments.length === 1) return _list => groupBy(groupFn, _list);
  const result = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const key = groupFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

function groupWith(compareFn, list) {
  if (!isArray(list)) throw new TypeError('list.reduce is not a function');
  const clone = cloneList(list);
  if (list.length === 1) return [clone];
  const toReturn = [];
  let holder = [];
  clone.reduce((prev, current, i) => {
    if (i === 0) return current;
    const okCompare = compareFn(prev, current);
    const holderIsEmpty = holder.length === 0;
    const lastCall = i === list.length - 1;
    if (okCompare) {
      if (holderIsEmpty) holder.push(prev);
      holder.push(current);
      if (lastCall) toReturn.push(holder);
      return current;
    }
    if (holderIsEmpty) {
      toReturn.push([prev]);
      if (lastCall) toReturn.push([current]);
      return current;
    }
    toReturn.push(holder);
    if (lastCall) toReturn.push([current]);
    holder = [];
    return current;
  }, undefined);
  return toReturn;
}

function has(prop, obj) {
  if (arguments.length === 1) return _obj => has(prop, _obj);
  if (!obj) return false;
  return obj.hasOwnProperty(prop);
}

function createPath(path, delimiter = '.') {
  return typeof path === 'string' ? path.split(delimiter) : path;
}

function path(pathInput, obj) {
  if (arguments.length === 1) return _obj => path(pathInput, _obj);
  if (obj === null || obj === undefined) {
    return undefined;
  }
  let willReturn = obj;
  let counter = 0;
  const pathArrValue = createPath(pathInput);
  while (counter < pathArrValue.length) {
    if (willReturn === null || willReturn === undefined) {
      return undefined;
    }
    if (willReturn[pathArrValue[counter]] === null) return undefined;
    willReturn = willReturn[pathArrValue[counter]];
    counter++;
  }
  return willReturn;
}

function hasPath(pathInput, obj) {
  if (arguments.length === 1) {
    return objHolder => hasPath(pathInput, objHolder);
  }
  return path(pathInput, obj) !== undefined;
}

function head(listOrString) {
  if (typeof listOrString === 'string') return listOrString[0] || '';
  return listOrString[0];
}

function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }
  return a !== a && b !== b;
}
const objectIs = Object.is || _objectIs;

function identical(a, b) {
  if (arguments.length === 1) return _b => identical(a, _b);
  return objectIs(a, b);
}

function identity(x) {
  return x;
}

function ifElseFn(condition, onTrue, onFalse) {
  return (...input) => {
    const conditionResult = typeof condition === 'boolean' ? condition : condition(...input);
    if (conditionResult === true) {
      return onTrue(...input);
    }
    return onFalse(...input);
  };
}
const ifElse = curry(ifElseFn);

const inc = x => x + 1;

function indexByPath(pathInput, list) {
  const toReturn = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    toReturn[path(pathInput, item)] = item;
  }
  return toReturn;
}
function indexBy(condition, list) {
  if (arguments.length === 1) {
    return _list => indexBy(condition, _list);
  }
  if (typeof condition === 'string') {
    return indexByPath(condition, list);
  }
  const toReturn = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    toReturn[condition(item)] = item;
  }
  return toReturn;
}

function indexOf(valueToFind, list) {
  if (arguments.length === 1) {
    return _list => _indexOf(valueToFind, _list);
  }
  return _indexOf(valueToFind, list);
}

function baseSlice(array, start, end) {
  let index = -1;
  let {
    length
  } = array;
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  const result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

function init(listOrString) {
  if (typeof listOrString === 'string') return listOrString.slice(0, -1);
  return listOrString.length ? baseSlice(listOrString, 0, -1) : [];
}

function intersection(listA, listB) {
  if (arguments.length === 1) return _list => intersection(listA, _list);
  return filter(x => includes(x, listA), listB);
}

function intersperse(separator, list) {
  if (arguments.length === 1) return _list => intersperse(separator, _list);
  let index = -1;
  const len = list.length;
  const willReturn = [];
  while (++index < len) {
    if (index === len - 1) {
      willReturn.push(list[index]);
    } else {
      willReturn.push(list[index], separator);
    }
  }
  return willReturn;
}

function is(targetPrototype, x) {
  if (arguments.length === 1) return _x => is(targetPrototype, _x);
  return x != null && x.constructor === targetPrototype || x instanceof targetPrototype;
}

function isEmpty(input) {
  const inputType = type(input);
  if (['Undefined', 'NaN', 'Number', 'Null'].includes(inputType)) return false;
  if (!input) return true;
  if (inputType === 'Object') {
    return Object.keys(input).length === 0;
  }
  if (inputType === 'Array') {
    return input.length === 0;
  }
  return false;
}

function isNil(x) {
  return x === undefined || x === null;
}

function join(glue, list) {
  if (arguments.length === 1) return _list => join(glue, _list);
  return list.join(glue);
}

function juxt(listOfFunctions) {
  return (...args) => listOfFunctions.map(fn => fn(...args));
}

function keys(x) {
  return Object.keys(x);
}

function last(listOrString) {
  if (typeof listOrString === 'string') {
    return listOrString[listOrString.length - 1] || '';
  }
  return listOrString[listOrString.length - 1];
}

function lastIndexOf(valueToFind, list) {
  if (arguments.length === 1) {
    return _list => _lastIndexOf(valueToFind, _list);
  }
  return _lastIndexOf(valueToFind, list);
}

function length(x) {
  if (isArray(x)) return x.length;
  if (typeof x === 'string') return x.length;
  return NaN;
}

function lens(getter, setter) {
  return function (functor) {
    return function (target) {
      return functor(getter(target)).map(focus => setter(focus, target));
    };
  };
}

function nth(index, input) {
  if (arguments.length === 1) return _input => nth(index, _input);
  const idx = index < 0 ? input.length + index : index;
  return Object.prototype.toString.call(input) === '[object String]' ? input.charAt(idx) : input[idx];
}

function updateFn(index, newValue, list) {
  const clone = cloneList(list);
  if (index === -1) return clone.fill(newValue, index);
  return clone.fill(newValue, index, index + 1);
}
const update = curry(updateFn);

function lensIndex(index) {
  return lens(nth(index), update(index));
}

function lensPath(key) {
  return lens(path(key), assocPath(key));
}

function lensProp(key) {
  return lens(prop(key), assoc(key));
}

function match(pattern, input) {
  if (arguments.length === 1) return _input => match(pattern, _input);
  const willReturn = input.match(pattern);
  return willReturn === null ? [] : willReturn;
}

function mathMod(x, y) {
  if (arguments.length === 1) return _y => mathMod(x, _y);
  if (!isInteger(x) || !isInteger(y) || y < 1) return NaN;
  return (x % y + y) % y;
}

function maxByFn(compareFn, x, y) {
  return compareFn(y) > compareFn(x) ? y : x;
}
const maxBy = curry(maxByFn);

function sum(list) {
  return list.reduce((prev, current) => prev + current, 0);
}

function mean(list) {
  return sum(list) / list.length;
}

function median(list) {
  const len = list.length;
  if (len === 0) return NaN;
  const width = 2 - len % 2;
  const idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort((a, b) => {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }).slice(idx, idx + width));
}

function mergeRight(target, newProps) {
  if (arguments.length === 1) return _newProps => mergeRight(target, _newProps);
  return Object.assign({}, target || {}, newProps || {});
}

function mergeAll(arr) {
  let willReturn = {};
  map(val => {
    willReturn = mergeRight(willReturn, val);
  }, arr);
  return willReturn;
}

function mergeDeepRight(target, source) {
  if (arguments.length === 1) {
    return sourceHolder => mergeDeepRight(target, sourceHolder);
  }
  const willReturn = clone(target);
  Object.keys(source).forEach(key => {
    if (type(source[key]) === 'Object') {
      if (type(target[key]) === 'Object') {
        willReturn[key] = mergeDeepRight(target[key], source[key]);
      } else {
        willReturn[key] = source[key];
      }
    } else {
      willReturn[key] = source[key];
    }
  });
  return willReturn;
}

function mergeLeft(x, y) {
  if (arguments.length === 1) return _y => mergeLeft(x, _y);
  return mergeRight(y, x);
}

function mergeWithFn(mergeFn, a, b) {
  const willReturn = {};
  Object.keys(a).forEach(key => {
    if (b[key] === undefined) {
      willReturn[key] = a[key];
    } else {
      willReturn[key] = mergeFn(a[key], b[key]);
    }
  });
  Object.keys(b).forEach(key => {
    if (willReturn[key] !== undefined) return;
    if (a[key] === undefined) {
      willReturn[key] = b[key];
    } else {
      willReturn[key] = mergeFn(a[key], b[key]);
    }
  });
  return willReturn;
}
const mergeWith = curry(mergeWithFn);

function min(x, y) {
  if (arguments.length === 1) return _y => min(x, _y);
  return y < x ? y : x;
}

function minByFn(compareFn, x, y) {
  return compareFn(y) < compareFn(x) ? y : x;
}
const minBy = curry(minByFn);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function isIterable(input) {
  return Array.isArray(input) || type(input) === 'Object';
}

function modifyFn(property, fn, iterable) {
  if (!isIterable(iterable)) return iterable;
  if (iterable[property] === undefined) return iterable;
  if (isArray(iterable)) {
    return updateFn(property, fn(iterable[property]), iterable);
  }
  return _objectSpread2(_objectSpread2({}, iterable), {}, {
    [property]: fn(iterable[property])
  });
}
const modify = curry(modifyFn);

function modifyPathFn(pathInput, fn, object) {
  const path$1 = createPath(pathInput);
  if (path$1.length === 1) {
    return _objectSpread2(_objectSpread2({}, object), {}, {
      [path$1[0]]: fn(object[path$1[0]])
    });
  }
  if (path(path$1, object) === undefined) return object;
  const val = modifyPath(Array.prototype.slice.call(path$1, 1), fn, object[path$1[0]]);
  if (val === object[path$1[0]]) {
    return object;
  }
  return assoc(path$1[0], val, object);
}
const modifyPath = curry(modifyPathFn);

function modulo(x, y) {
  if (arguments.length === 1) return _y => modulo(x, _y);
  return x % y;
}

function moveFn(fromIndex, toIndex, list) {
  if (fromIndex < 0 || toIndex < 0) {
    throw new Error('Rambda.move does not support negative indexes');
  }
  if (fromIndex > list.length - 1 || toIndex > list.length - 1) return list;
  const clone = cloneList(list);
  clone[fromIndex] = list[toIndex];
  clone[toIndex] = list[fromIndex];
  return clone;
}
const move = curry(moveFn);

function multiply(x, y) {
  if (arguments.length === 1) return _y => multiply(x, _y);
  return x * y;
}

function negate(x) {
  return -x;
}

function none(predicate, list) {
  if (arguments.length === 1) return _list => none(predicate, _list);
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return false;
  }
  return true;
}

function nop() {}

function not(input) {
  return !input;
}

function objOf(key, value) {
  if (arguments.length === 1) {
    return _value => objOf(key, _value);
  }
  return {
    [key]: value
  };
}

function of(value) {
  return [value];
}

function omit(propsToOmit, obj) {
  if (arguments.length === 1) return _obj => omit(propsToOmit, _obj);
  if (obj === null || obj === undefined) {
    return undefined;
  }
  const propsToOmitValue = createPath(propsToOmit, ',');
  const willReturn = {};
  for (const key in obj) {
    if (!propsToOmitValue.includes(key)) {
      willReturn[key] = obj[key];
    }
  }
  return willReturn;
}

function on(binaryFn, unaryFn, a, b) {
  if (arguments.length === 3) {
    return _b => on(binaryFn, unaryFn, a, _b);
  }
  if (arguments.length === 2) {
    return (_a, _b) => on(binaryFn, unaryFn, _a, _b);
  }
  return binaryFn(unaryFn(a), unaryFn(b));
}

function onceFn(fn, context) {
  let result;
  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
    return result;
  };
}
function once(fn, context) {
  if (arguments.length === 1) {
    const wrap = onceFn(fn, context);
    return curry(wrap);
  }
  return onceFn(fn, context);
}

function or(a, b) {
  if (arguments.length === 1) return _b => or(a, _b);
  return a || b;
}

const Identity = x => ({
  x,
  map: fn => Identity(fn(x))
});
function overFn(lens, fn, object) {
  return lens(x => Identity(fn(x)))(object).x;
}
const over = curry(overFn);

function partial(fn, ...args) {
  const len = fn.length;
  return (...rest) => {
    if (args.length + rest.length >= len) {
      return fn(...args, ...rest);
    }
    return partial(fn, ...[...args, ...rest]);
  };
}

function partialObject(fn, input) {
  return nextInput => fn(mergeDeepRight(nextInput, input));
}

function partitionObject(predicate, iterable) {
  const yes = {};
  const no = {};
  Object.entries(iterable).forEach(([prop, value]) => {
    if (predicate(value, prop)) {
      yes[prop] = value;
    } else {
      no[prop] = value;
    }
  });
  return [yes, no];
}
function partitionArray(predicate, list, indexed = false) {
  const yes = [];
  const no = [];
  let counter = -1;
  while (counter++ < list.length - 1) {
    if (indexed ? predicate(list[counter], counter) : predicate(list[counter])) {
      yes.push(list[counter]);
    } else {
      no.push(list[counter]);
    }
  }
  return [yes, no];
}
function partition(predicate, iterable) {
  if (arguments.length === 1) {
    return listHolder => partition(predicate, listHolder);
  }
  if (!isArray(iterable)) return partitionObject(predicate, iterable);
  return partitionArray(predicate, iterable);
}

function pathEqFn(pathToSearch, target, input) {
  return equals(path(pathToSearch, input), target);
}
const pathEq = curry(pathEqFn);

function pathOrFn(defaultValue, pathInput, obj) {
  return defaultTo(defaultValue, path(pathInput, obj));
}
const pathOr = curry(pathOrFn);

function paths(pathsToSearch, obj) {
  if (arguments.length === 1) {
    return _obj => paths(pathsToSearch, _obj);
  }
  return pathsToSearch.map(singlePath => path(singlePath, obj));
}

function pick(propsToPick, input) {
  if (arguments.length === 1) return _input => pick(propsToPick, _input);
  if (input === null || input === undefined) {
    return undefined;
  }
  const keys = createPath(propsToPick, ',');
  const willReturn = {};
  let counter = 0;
  while (counter < keys.length) {
    if (keys[counter] in input) {
      willReturn[keys[counter]] = input[keys[counter]];
    }
    counter++;
  }
  return willReturn;
}

function pickAll(propsToPick, obj) {
  if (arguments.length === 1) return _obj => pickAll(propsToPick, _obj);
  if (obj === null || obj === undefined) {
    return undefined;
  }
  const keysValue = createPath(propsToPick, ',');
  const willReturn = {};
  let counter = 0;
  while (counter < keysValue.length) {
    if (keysValue[counter] in obj) {
      willReturn[keysValue[counter]] = obj[keysValue[counter]];
    } else {
      willReturn[keysValue[counter]] = undefined;
    }
    counter++;
  }
  return willReturn;
}

function pluck(property, list) {
  if (arguments.length === 1) return _list => pluck(property, _list);
  const willReturn = [];
  map(x => {
    if (x[property] !== undefined) {
      willReturn.push(x[property]);
    }
  }, list);
  return willReturn;
}

function prepend(x, input) {
  if (arguments.length === 1) return _input => prepend(x, _input);
  if (typeof input === 'string') return [x].concat(input.split(''));
  return [x].concat(input);
}

const product = reduce(multiply, 1);

function propEqFn(propToFind, valueToMatch, obj) {
  if (!obj) return false;
  return equals(valueToMatch, prop(propToFind, obj));
}
const propEq = curry(propEqFn);

function propIsFn(targetPrototype, property, obj) {
  return is(targetPrototype, obj[property]);
}
const propIs = curry(propIsFn);

function propOrFn(defaultValue, property, obj) {
  if (!obj) return defaultValue;
  return defaultTo(defaultValue, obj[property]);
}
const propOr = curry(propOrFn);

function propSatisfiesFn(predicate, property, obj) {
  return predicate(prop(property, obj));
}
const propSatisfies = curry(propSatisfiesFn);

function props(propsToPick, obj) {
  if (arguments.length === 1) {
    return _obj => props(propsToPick, _obj);
  }
  if (!isArray(propsToPick)) {
    throw new Error('propsToPick is not a list');
  }
  return mapArray(prop => obj[prop], propsToPick);
}

function range(start, end) {
  if (arguments.length === 1) return _end => range(start, _end);
  if (Number.isNaN(Number(start)) || Number.isNaN(Number(end))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  if (end < start) return [];
  const len = end - start;
  const willReturn = Array(len);
  for (let i = 0; i < len; i++) {
    willReturn[i] = start + i;
  }
  return willReturn;
}

function reject(predicate, list) {
  if (arguments.length === 1) return _list => reject(predicate, _list);
  return filter(x => !predicate(x), list);
}

function repeat(x, timesToRepeat) {
  if (arguments.length === 1) {
    return _timesToRepeat => repeat(x, _timesToRepeat);
  }
  return Array(timesToRepeat).fill(x);
}

function replaceFn(pattern, replacer, str) {
  return str.replace(pattern, replacer);
}
const replace = curry(replaceFn);

function reverse(listOrString) {
  if (typeof listOrString === 'string') {
    return listOrString.split('').reverse().join('');
  }
  const clone = listOrString.slice();
  return clone.reverse();
}

function setFn(lens, replacer, x) {
  return over(lens, always(replacer), x);
}
const set = curry(setFn);

function sliceFn(from, to, list) {
  return list.slice(from, to);
}
const slice = curry(sliceFn);

function sort(sortFn, list) {
  if (arguments.length === 1) return _list => sort(sortFn, _list);
  return cloneList(list).sort(sortFn);
}

function sortBy(sortFn, list) {
  if (arguments.length === 1) return _list => sortBy(sortFn, _list);
  const clone = cloneList(list);
  return clone.sort((a, b) => {
    const aSortResult = sortFn(a);
    const bSortResult = sortFn(b);
    if (aSortResult === bSortResult) return 0;
    return aSortResult < bSortResult ? -1 : 1;
  });
}

function split(separator, str) {
  if (arguments.length === 1) return _str => split(separator, _str);
  return str.split(separator);
}

function maybe(ifRule, whenIf, whenElse) {
  const whenIfInput = ifRule && type(whenIf) === 'Function' ? whenIf() : whenIf;
  const whenElseInput = !ifRule && type(whenElse) === 'Function' ? whenElse() : whenElse;
  return ifRule ? whenIfInput : whenElseInput;
}

function take(howMany, listOrString) {
  if (arguments.length === 1) return _listOrString => take(howMany, _listOrString);
  if (howMany < 0) return listOrString.slice();
  if (typeof listOrString === 'string') return listOrString.slice(0, howMany);
  return baseSlice(listOrString, 0, howMany);
}

function splitAt(index, input) {
  if (arguments.length === 1) {
    return _list => splitAt(index, _list);
  }
  if (!input) throw new TypeError(`Cannot read property 'slice' of ${input}`);
  if (!isArray(input) && typeof input !== 'string') return [[], []];
  const correctIndex = maybe(index < 0, input.length + index < 0 ? 0 : input.length + index, index);
  return [take(correctIndex, input), drop(correctIndex, input)];
}

function splitEvery(sliceLength, listOrString) {
  if (arguments.length === 1) {
    return _listOrString => splitEvery(sliceLength, _listOrString);
  }
  if (sliceLength < 1) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }
  const willReturn = [];
  let counter = 0;
  while (counter < listOrString.length) {
    willReturn.push(listOrString.slice(counter, counter += sliceLength));
  }
  return willReturn;
}

function splitWhen(predicate, input) {
  if (arguments.length === 1) {
    return _input => splitWhen(predicate, _input);
  }
  if (!input) throw new TypeError(`Cannot read property 'length' of ${input}`);
  const preFound = [];
  const postFound = [];
  let found = false;
  let counter = -1;
  while (counter++ < input.length - 1) {
    if (found) {
      postFound.push(input[counter]);
    } else if (predicate(input[counter])) {
      postFound.push(input[counter]);
      found = true;
    } else {
      preFound.push(input[counter]);
    }
  }
  return [preFound, postFound];
}

function startsWith(target, iterable) {
  if (arguments.length === 1) return _iterable => startsWith(target, _iterable);
  if (typeof iterable === 'string') {
    return iterable.startsWith(target);
  }
  if (!isArray(target)) return false;
  let correct = true;
  const filtered = target.filter((x, index) => {
    if (!correct) return false;
    const result = equals(x, iterable[index]);
    if (!result) correct = false;
    return result;
  });
  return filtered.length === target.length;
}

function subtract(a, b) {
  if (arguments.length === 1) return _b => subtract(a, _b);
  return a - b;
}

function symmetricDifference(x, y) {
  if (arguments.length === 1) {
    return _y => symmetricDifference(x, _y);
  }
  return concat(filter(value => !includes(value, y), x), filter(value => !includes(value, x), y));
}

function tail(listOrString) {
  return drop(1, listOrString);
}

function takeLast(howMany, listOrString) {
  if (arguments.length === 1) return _listOrString => takeLast(howMany, _listOrString);
  const len = listOrString.length;
  if (howMany < 0) return listOrString.slice();
  let numValue = howMany > len ? len : howMany;
  if (typeof listOrString === 'string') return listOrString.slice(len - numValue);
  numValue = len - numValue;
  return baseSlice(listOrString, numValue, len);
}

function takeLastWhile(predicate, input) {
  if (arguments.length === 1) {
    return _input => takeLastWhile(predicate, _input);
  }
  if (input.length === 0) return input;
  const toReturn = [];
  let counter = input.length;
  while (counter) {
    const item = input[--counter];
    if (!predicate(item)) {
      break;
    }
    toReturn.push(item);
  }
  return isArray(input) ? toReturn.reverse() : toReturn.reverse().join('');
}

function takeWhile(predicate, iterable) {
  if (arguments.length === 1) {
    return _iterable => takeWhile(predicate, _iterable);
  }
  const isArray$1 = isArray(iterable);
  if (!isArray$1 && typeof iterable !== 'string') {
    throw new Error('`iterable` is neither list nor a string');
  }
  const toReturn = [];
  let counter = 0;
  while (counter < iterable.length) {
    const item = iterable[counter++];
    if (!predicate(item)) {
      break;
    }
    toReturn.push(item);
  }
  return isArray$1 ? toReturn : toReturn.join('');
}

function tap(fn, x) {
  if (arguments.length === 1) return _x => tap(fn, _x);
  fn(x);
  return x;
}

function test(pattern, str) {
  if (arguments.length === 1) return _str => test(pattern, _str);
  if (typeof pattern === 'string') {
    throw new TypeError(`R.test requires a value of type RegExp as its first argument; received "${pattern}"`);
  }
  return str.search(pattern) !== -1;
}

function times(fn, howMany) {
  if (arguments.length === 1) return _howMany => times(fn, _howMany);
  if (!isInteger(howMany) || howMany < 0) {
    throw new RangeError('n must be an integer');
  }
  return map(fn, range(0, howMany));
}

function toLower(str) {
  return str.toLowerCase();
}

function toPairs(obj) {
  return Object.entries(obj);
}

function toString(x) {
  return x.toString();
}

function toUpper(str) {
  return str.toUpperCase();
}

function transpose(array) {
  return array.reduce((acc, el) => {
    el.forEach((nestedEl, i) => isArray(acc[i]) ? acc[i].push(nestedEl) : acc.push([nestedEl]));
    return acc;
  }, []);
}

function trim(str) {
  return str.trim();
}

const isFunction = x => ['Promise', 'Function'].includes(type(x));
function tryCatch(fn, fallback) {
  if (!isFunction(fn)) {
    throw new Error(`R.tryCatch | fn '${fn}'`);
  }
  const passFallback = isFunction(fallback);
  return (...inputs) => {
    try {
      return fn(...inputs);
    } catch (e) {
      return passFallback ? fallback(e, ...inputs) : fallback;
    }
  };
}

function unapply(fn) {
  return function (...args) {
    return fn.call(this, args);
  };
}

function union(x, y) {
  if (arguments.length === 1) return _y => union(x, _y);
  const toReturn = cloneList(x);
  y.forEach(yInstance => {
    if (!includes(yInstance, x)) toReturn.push(yInstance);
  });
  return toReturn;
}

function uniqBy(fn, list) {
  if (arguments.length === 1) {
    return _list => uniqBy(fn, _list);
  }
  const set = new _Set();
  return list.filter(item => set.checkUniqueness(fn(item)));
}

function includesWith(predicate, target, list) {
  let willReturn = false;
  let index = -1;
  while (++index < list.length && !willReturn) {
    const value = list[index];
    if (predicate(target, value)) {
      willReturn = true;
    }
  }
  return willReturn;
}
function uniqWith(predicate, list) {
  if (arguments.length === 1) return _list => uniqWith(predicate, _list);
  let index = -1;
  const willReturn = [];
  while (++index < list.length) {
    const value = list[index];
    if (!includesWith(predicate, value, willReturn)) {
      willReturn.push(value);
    }
  }
  return willReturn;
}

function unless(predicate, whenFalse) {
  if (arguments.length === 1) {
    return _whenFalse => unless(predicate, _whenFalse);
  }
  return input => predicate(input) ? input : whenFalse(input);
}

function unnest(list) {
  return list.reduce((acc, item) => {
    if (Array.isArray(item)) {
      return [...acc, ...item];
    }
    return [...acc, item];
  }, []);
}

function unwind(property, obj) {
  if (arguments.length === 1) {
    return _obj => unwind(property, _obj);
  }
  if (!isArray(obj[property])) return [obj];
  return mapArray(x => _objectSpread2(_objectSpread2({}, obj), {}, {
    [property]: x
  }), obj[property]);
}

function values(obj) {
  if (type(obj) !== 'Object') return [];
  return Object.values(obj);
}

const Const = x => ({
  x,
  map: fn => Const(x)
});
function view(lens, target) {
  if (arguments.length === 1) return _target => view(lens, _target);
  return lens(Const)(target).x;
}

function whenFn(predicate, whenTrueFn, input) {
  if (!predicate(input)) return input;
  return whenTrueFn(input);
}
const when = curry(whenFn);

function where(conditions, input) {
  if (input === undefined) {
    return _input => where(conditions, _input);
  }
  let flag = true;
  for (const prop in conditions) {
    if (!flag) continue;
    const result = conditions[prop](input[prop]);
    if (flag && result === false) {
      flag = false;
    }
  }
  return flag;
}

function whereAny(conditions, input) {
  if (input === undefined) {
    return _input => whereAny(conditions, _input);
  }
  for (const prop in conditions) {
    if (conditions[prop](input[prop])) {
      return true;
    }
  }
  return false;
}

function whereEq(condition, input) {
  if (arguments.length === 1) {
    return _input => whereEq(condition, _input);
  }
  const result = filter((conditionValue, conditionProp) => equals(conditionValue, input[conditionProp]), condition);
  return Object.keys(result).length === Object.keys(condition).length;
}

function without(matchAgainst, source) {
  if (source === undefined) {
    return _source => without(matchAgainst, _source);
  }
  return reduce((prev, current) => _indexOf(current, matchAgainst) > -1 ? prev : prev.concat(current), [], source);
}

function xor(a, b) {
  if (arguments.length === 1) return _b => xor(a, _b);
  return Boolean(a) && !b || Boolean(b) && !a;
}

function zip(left, right) {
  if (arguments.length === 1) return _right => zip(left, _right);
  const result = [];
  const length = Math.min(left.length, right.length);
  for (let i = 0; i < length; i++) {
    result[i] = [left[i], right[i]];
  }
  return result;
}

function zipObj(keys, values) {
  if (arguments.length === 1) return yHolder => zipObj(keys, yHolder);
  return take(values.length, keys).reduce((prev, xInstance, i) => {
    prev[xInstance] = values[i];
    return prev;
  }, {});
}

function zipWithFn(fn, x, y) {
  return take(x.length > y.length ? y.length : x.length, x).map((xInstance, i) => fn(xInstance, y[i]));
}
const zipWith = curry(zipWithFn);

exports.F = F;
exports.T = T;
exports.__findHighestArity = __findHighestArity;
exports._arity = _arity;
exports._indexOf = _indexOf;
exports._lastIndexOf = _lastIndexOf;
exports._pipe = _pipe;
exports.add = add;
exports.adjust = adjust;
exports.all = all;
exports.allPass = allPass;
exports.always = always;
exports.and = and;
exports.any = any;
exports.anyPass = anyPass;
exports.append = append;
exports.apply = apply;
exports.applySpec = applySpec;
exports.assoc = assoc;
exports.assocPath = assocPath;
exports.bind = bind;
exports.both = both;
exports.chain = chain;
exports.clamp = clamp;
exports.clone = clone;
exports.complement = complement;
exports.compose = compose;
exports.concat = concat;
exports.cond = cond;
exports.converge = converge;
exports.count = count;
exports.countBy = countBy;
exports.curry = curry;
exports.curryN = curryN;
exports.dec = dec;
exports.defaultTo = defaultTo;
exports.difference = difference;
exports.dissoc = dissoc;
exports.divide = divide;
exports.drop = drop;
exports.dropLast = dropLast;
exports.dropLastWhile = dropLastWhile;
exports.dropRepeats = dropRepeats;
exports.dropRepeatsWith = dropRepeatsWith;
exports.dropWhile = dropWhile;
exports.either = either;
exports.endsWith = endsWith;
exports.eqProps = eqProps;
exports.equals = equals;
exports.evolve = evolve;
exports.evolveArray = evolveArray;
exports.evolveObject = evolveObject;
exports.filter = filter;
exports.filterArray = filterArray;
exports.filterObject = filterObject;
exports.find = find;
exports.findIndex = findIndex;
exports.findLast = findLast;
exports.findLastIndex = findLastIndex;
exports.flatten = flatten;
exports.flip = flip;
exports.forEach = forEach;
exports.fromPairs = fromPairs;
exports.groupBy = groupBy;
exports.groupWith = groupWith;
exports.has = has;
exports.hasPath = hasPath;
exports.head = head;
exports.identical = identical;
exports.identity = identity;
exports.ifElse = ifElse;
exports.inc = inc;
exports.includes = includes;
exports.indexBy = indexBy;
exports.indexOf = indexOf;
exports.init = init;
exports.intersection = intersection;
exports.intersperse = intersperse;
exports.is = is;
exports.isEmpty = isEmpty;
exports.isNil = isNil;
exports.join = join;
exports.juxt = juxt;
exports.keys = keys;
exports.last = last;
exports.lastIndexOf = lastIndexOf;
exports.length = length;
exports.lens = lens;
exports.lensIndex = lensIndex;
exports.lensPath = lensPath;
exports.lensProp = lensProp;
exports.map = map;
exports.mapArray = mapArray;
exports.mapObjIndexed = mapObjIndexed;
exports.mapObject = mapObject;
exports.match = match;
exports.mathMod = mathMod;
exports.max = max;
exports.maxBy = maxBy;
exports.maxByFn = maxByFn;
exports.mean = mean;
exports.median = median;
exports.merge = mergeRight;
exports.mergeAll = mergeAll;
exports.mergeDeepRight = mergeDeepRight;
exports.mergeLeft = mergeLeft;
exports.mergeRight = mergeRight;
exports.mergeWith = mergeWith;
exports.min = min;
exports.minBy = minBy;
exports.minByFn = minByFn;
exports.modify = modify;
exports.modifyPath = modifyPath;
exports.modifyPathFn = modifyPathFn;
exports.modulo = modulo;
exports.move = move;
exports.multiply = multiply;
exports.negate = negate;
exports.none = none;
exports.nop = nop;
exports.not = not;
exports.nth = nth;
exports.objOf = objOf;
exports.of = of;
exports.omit = omit;
exports.on = on;
exports.once = once;
exports.or = or;
exports.over = over;
exports.partial = partial;
exports.partialObject = partialObject;
exports.partition = partition;
exports.partitionArray = partitionArray;
exports.partitionObject = partitionObject;
exports.path = path;
exports.pathEq = pathEq;
exports.pathOr = pathOr;
exports.paths = paths;
exports.pick = pick;
exports.pickAll = pickAll;
exports.pipe = pipe;
exports.pluck = pluck;
exports.prepend = prepend;
exports.product = product;
exports.prop = prop;
exports.propEq = propEq;
exports.propIs = propIs;
exports.propOr = propOr;
exports.propSatisfies = propSatisfies;
exports.props = props;
exports.range = range;
exports.reduce = reduce;
exports.reduceFn = reduceFn;
exports.reduceStopper = reduceStopper;
exports.reject = reject;
exports.repeat = repeat;
exports.replace = replace;
exports.reverse = reverse;
exports.set = set;
exports.slice = slice;
exports.sort = sort;
exports.sortBy = sortBy;
exports.split = split;
exports.splitAt = splitAt;
exports.splitEvery = splitEvery;
exports.splitWhen = splitWhen;
exports.startsWith = startsWith;
exports.subtract = subtract;
exports.sum = sum;
exports.symmetricDifference = symmetricDifference;
exports.tail = tail;
exports.take = take;
exports.takeLast = takeLast;
exports.takeLastWhile = takeLastWhile;
exports.takeWhile = takeWhile;
exports.tap = tap;
exports.test = test;
exports.times = times;
exports.toLower = toLower;
exports.toPairs = toPairs;
exports.toString = toString;
exports.toUpper = toUpper;
exports.transpose = transpose;
exports.trim = trim;
exports.tryCatch = tryCatch;
exports.type = type;
exports.unapply = unapply;
exports.union = union;
exports.uniq = uniq;
exports.uniqBy = uniqBy;
exports.uniqWith = uniqWith;
exports.unless = unless;
exports.unnest = unnest;
exports.unwind = unwind;
exports.update = update;
exports.updateFn = updateFn;
exports.values = values;
exports.view = view;
exports.when = when;
exports.where = where;
exports.whereAny = whereAny;
exports.whereEq = whereEq;
exports.without = without;
exports.xor = xor;
exports.zip = zip;
exports.zipObj = zipObj;
exports.zipWith = zipWith;
