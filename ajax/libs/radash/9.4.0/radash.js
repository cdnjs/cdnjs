var radash = (function (exports) {
  'use strict';

  const group = (array, getGroupId) => {
    return array.reduce((acc, item) => {
      const groupId = getGroupId(item);
      const groupList = acc[groupId] ?? [];
      return { ...acc, [groupId]: [...groupList, item] };
    }, {});
  };
  const boil = (array, compareFunc) => {
    if (!array || (array.length ?? 0) === 0)
      return null;
    return array.reduce(compareFunc);
  };
  const sum = (array, fn) => {
    return (array || []).reduce(
      (acc, item) => acc + (fn ? fn(item) : item),
      0
    );
  };
  const first = (array, defaultValue = void 0) => {
    return array?.length > 0 ? array[0] : defaultValue;
  };
  const last = (array, defaultValue = void 0) => {
    return array?.length > 0 ? array[array.length - 1] : defaultValue;
  };
  const sort = (array, getter, desc = false) => {
    if (!array)
      return [];
    const asc = (a, b) => getter(a) - getter(b);
    const dsc = (a, b) => getter(b) - getter(a);
    return array.slice().sort(desc === true ? dsc : asc);
  };
  const alphabetical = (array, getter, dir = "asc") => {
    if (!array)
      return [];
    const asc = (a, b) => `${getter(a)}`.localeCompare(getter(b));
    const dsc = (a, b) => `${getter(b)}`.localeCompare(getter(a));
    return array.slice().sort(dir === "desc" ? dsc : asc);
  };
  const counting = (list2, identity) => {
    return list2.reduce((acc, item) => {
      const id = identity(item);
      return {
        ...acc,
        [id]: (acc[id] ?? 0) + 1
      };
    }, {});
  };
  const replace = (list2, newItem, match) => {
    if (!list2)
      return [];
    if (!newItem)
      return [...list2];
    for (let idx = 0; idx < list2.length; idx++) {
      const item = list2[idx];
      if (match(item, idx)) {
        return [
          ...list2.slice(0, idx),
          newItem,
          ...list2.slice(idx + 1, list2.length)
        ];
      }
    }
    return [...list2];
  };
  const objectify = (array, getKey, getValue = (item) => item) => {
    return array.reduce(
      (acc, item) => ({
        ...acc,
        [getKey(item)]: getValue(item)
      }),
      {}
    );
  };
  const select = (array, mapper, condition) => {
    return array.reduce((acc, item) => {
      if (!condition(item))
        return acc;
      return [...acc, mapper(item)];
    }, []);
  };
  const max = (array, getter) => {
    const get = getter ? getter : (v) => v;
    return boil(array, (a, b) => get(a) > get(b) ? a : b);
  };
  const min = (array, getter) => {
    const get = getter ? getter : (v) => v;
    return boil(array, (a, b) => get(a) < get(b) ? a : b);
  };
  const cluster = (list2, size = 2) => {
    const clusterCount = Math.ceil(list2.length / size);
    return new Array(clusterCount).fill(null).map((_c, i) => {
      return list2.slice(i * size, i * size + size);
    });
  };
  const unique = (array, toKey) => {
    const valueMap = array.reduce((acc, item) => {
      const key = toKey ? toKey(item) : item;
      if (acc[key])
        return acc;
      return { ...acc, [key]: item };
    }, {});
    return Object.values(valueMap);
  };
  function* range(start, end, step = 1) {
    for (let i = start; i <= end; i += step) {
      yield i;
      if (i + step > end)
        break;
    }
  }
  const list = (start, end, step = 1) => {
    return Array.from(range(start, end, step));
  };
  const flat = (lists) => {
    return lists.reduce((acc, list2) => {
      return [...acc, ...list2];
    }, []);
  };
  const intersects = (listA, listB, identity) => {
    if (!listA || !listB)
      return false;
    const ident = identity ?? ((x) => x);
    const dictB = listB.reduce(
      (acc, item) => ({
        ...acc,
        [ident(item)]: true
      }),
      {}
    );
    return listA.some((value) => dictB[ident(value)]);
  };
  const fork = (list2, condition) => {
    if (!list2)
      return [[], []];
    return list2.reduce(
      (acc, item) => {
        const [a, b] = acc;
        if (condition(item)) {
          return [[...a, item], b];
        } else {
          return [a, [...b, item]];
        }
      },
      [[], []]
    );
  };
  const merge = (root, others, matcher) => {
    if (!others && !root)
      return [];
    if (!others)
      return root;
    if (!root)
      return [];
    if (!matcher)
      return root;
    return root.reduce((acc, r) => {
      const matched = others.find((o) => matcher(r) === matcher(o));
      if (matched)
        return [...acc, matched];
      else
        return [...acc, r];
    }, []);
  };
  const replaceOrAppend = (list2, newItem, match) => {
    if (!list2 && !newItem)
      return [];
    if (!newItem)
      return [...list2];
    if (!list2)
      return [newItem];
    for (let idx = 0; idx < list2.length; idx++) {
      const item = list2[idx];
      if (match(item, idx)) {
        return [
          ...list2.slice(0, idx),
          newItem,
          ...list2.slice(idx + 1, list2.length)
        ];
      }
    }
    return [...list2, newItem];
  };
  const toggle = (list2, item, toKey, options) => {
    if (!list2 && !item)
      return [];
    if (!list2)
      return [item];
    if (!item)
      return [...list2];
    const matcher = toKey ? (x, idx) => toKey(x, idx) === toKey(item, idx) : (x) => x === item;
    const existing = list2.find(matcher);
    if (existing)
      return list2.filter((x, idx) => !matcher(x, idx));
    const strategy = options?.strategy ?? "append";
    if (strategy === "append")
      return [...list2, item];
    return [item, ...list2];
  };
  const sift = (list2) => {
    return list2?.filter((x) => !!x) ?? [];
  };
  const iterate = (count, func, initValue) => {
    let value = initValue;
    for (let i = 1; i <= count; i++) {
      value = func(value, i);
    }
    return value;
  };
  const diff = (root, other, identity = (t) => t) => {
    if (!root?.length && !other?.length)
      return [];
    if (root?.length === void 0)
      return [...other];
    if (!other?.length)
      return [...root];
    const bKeys = other.reduce(
      (acc, item) => ({
        ...acc,
        [identity(item)]: true
      }),
      {}
    );
    return root.filter((a) => !bKeys[identity(a)]);
  };
  function shift(arr, n) {
    if (arr.length === 0)
      return arr;
    const shiftNumber = n % arr.length;
    if (shiftNumber === 0)
      return arr;
    return [...arr.slice(-shiftNumber, arr.length), ...arr.slice(0, -shiftNumber)];
  }

  const reduce = async (array, asyncReducer, initValue) => {
    const initProvided = initValue !== void 0;
    if (!initProvided && array?.length < 1) {
      throw new Error("Cannot reduce empty array with no init value");
    }
    const iter = initProvided ? array : array.slice(1);
    let value = initProvided ? initValue : array[0];
    for (const item of iter) {
      value = await asyncReducer(value, item);
    }
    return value;
  };
  const map = async (array, asyncMapFunc) => {
    if (!array)
      return [];
    let result = [];
    let index = 0;
    for (const value of array) {
      const newValue = await asyncMapFunc(value, index++);
      result.push(newValue);
    }
    return result;
  };
  const defer = async (func) => {
    const callbacks = [];
    const register = (fn, options) => callbacks.push({
      fn,
      rethrow: options?.rethrow ?? false
    });
    const [err, response] = await tryit(func)(register);
    for (const { fn, rethrow } of callbacks) {
      const [rethrown] = await tryit(fn)(err);
      if (rethrow)
        throw rethrown;
    }
    if (err)
      throw err;
    return response;
  };
  class AggregateError extends Error {
    constructor(errors) {
      super();
      this.errors = errors;
    }
  }
  const parallel = async (limit, array, func) => {
    const work = array.map((item, index) => ({
      index,
      item
    }));
    const processor = async (res) => {
      const results2 = [];
      while (true) {
        const next = work.pop();
        if (!next)
          return res(results2);
        const [error, result] = await tryit(func)(next.item);
        results2.push({
          error,
          result,
          index: next.index
        });
      }
    };
    const queues = list(1, limit).map(() => new Promise(processor));
    const itemResults = await Promise.all(queues);
    const [errors, results] = fork(
      sort(itemResults.flat(), (r) => r.index),
      (x) => !!x.error
    );
    if (errors.length > 0) {
      throw new AggregateError(errors.map((error) => error.error));
    }
    return results.map((r) => r.result);
  };
  const retry = async (options, func) => {
    const times = options?.times ?? 3;
    const delay = options?.delay;
    const backoff = options?.backoff ?? null;
    for (const i of range(1, times)) {
      const [err, result] = await tryit(func)((err2) => {
        throw { _exited: err2 };
      });
      if (!err)
        return result;
      if (err._exited)
        throw err._exited;
      if (i === times)
        throw err;
      if (delay)
        await sleep(delay);
      if (backoff)
        await sleep(backoff(i));
    }
    return void 0;
  };
  const sleep = (milliseconds) => {
    return new Promise((res) => setTimeout(res, milliseconds));
  };
  const tryit = (func) => {
    return async (...args) => {
      try {
        return [null, await func(...args)];
      } catch (err) {
        return [err, null];
      }
    };
  };

  const chain = (...funcs) => (...args) => {
    return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args));
  };
  const compose = (...funcs) => {
    return funcs.reverse().reduce((acc, fn) => fn(acc));
  };
  const partial = (fn, ...args) => {
    return (...rest) => fn(...args, ...rest);
  };
  const partob = (fn, argobj) => {
    return (restobj) => fn({
      ...argobj,
      ...restobj
    });
  };
  const proxied = (handler) => {
    return new Proxy(
      {},
      {
        get: (target, propertyName) => handler(propertyName)
      }
    );
  };
  const memoize = (cache, func, keyFunc, ttl) => {
    return function callWithMemo(...args) {
      const key = keyFunc ? keyFunc(...args) : JSON.stringify({ args });
      const existing = cache[key];
      if (existing !== void 0) {
        if (existing.exp > new Date().getTime()) {
          return existing.value;
        }
      }
      const result = func(...args);
      cache[key] = {
        exp: new Date().getTime() + ttl,
        value: result
      };
      return result;
    };
  };
  const memo = (func, {
    key = null,
    ttl = 300
  } = {}) => {
    return memoize({}, func, key, ttl);
  };
  const debounce = ({ delay }, func) => {
    let timer = null;
    const debounced = (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
    return debounced;
  };
  const throttle = ({ interval }, func) => {
    let ready = true;
    const throttled = (...args) => {
      if (!ready)
        return;
      func(...args);
      ready = false;
      setTimeout(() => {
        ready = true;
      }, interval);
    };
    return throttled;
  };
  const callable = (obj, fn) => {
    const FUNC = () => {
    };
    return new Proxy(Object.assign(FUNC, obj), {
      get: (target, key) => target[key],
      set: (target, key, value) => {
        target[key] = value;
        return true;
      },
      apply: (target, self, args) => fn(Object.assign({}, target))(...args)
    });
  };

  const toFloat = (value, defaultValue) => {
    const def = defaultValue === void 0 ? 0 : defaultValue;
    if (value === null || value === void 0) {
      return def;
    }
    const result = parseFloat(value);
    return isNaN(result) ? def : result;
  };
  const toInt = (value, defaultValue) => {
    const def = defaultValue === void 0 ? 0 : defaultValue;
    if (value === null || value === void 0) {
      return def;
    }
    const result = parseInt(value);
    return isNaN(result) ? def : result;
  };

  const isSymbol = (value) => {
    return !!value && value.constructor === Symbol;
  };
  const isArray = (value) => {
    return !!value && value.constructor === Array;
  };
  const isObject = (value) => {
    return !!value && value.constructor === Object;
  };
  const isPrimitive = (value) => {
    return value === void 0 || value === null || typeof value !== "object" && typeof value !== "function";
  };
  const isFunction = (value) => {
    return !!(value && value.constructor && value.call && value.apply);
  };
  const isString = (value) => {
    return typeof value === "string" || value instanceof String;
  };
  const isInt = (value) => {
    return isNumber(value) && value % 1 === 0;
  };
  const isFloat = (value) => {
    return isNumber(value) && value % 1 !== 0;
  };
  const isNumber = (value) => {
    try {
      return Number(value) === value;
    } catch {
      return false;
    }
  };
  const isDate = (value) => {
    return Object.prototype.toString.call(value) === "[object Date]";
  };
  const isEmpty = (value) => {
    if (value === true || value === false)
      return true;
    if (value === null || value === void 0)
      return true;
    if (isNumber(value))
      return value === 0;
    if (isDate(value))
      return isNaN(value.getTime());
    if (isFunction(value))
      return false;
    if (isSymbol(value))
      return false;
    const length = value.length;
    if (isNumber(length))
      return length === 0;
    const size = value.size;
    if (isNumber(size))
      return size === 0;
    const keys = Object.keys(value).length;
    return keys === 0;
  };
  const isEqual = (x, y) => {
    if (Object.is(x, y))
      return true;
    if (x instanceof Date && y instanceof Date) {
      return x.getTime() === y.getTime();
    }
    if (x instanceof RegExp && y instanceof RegExp) {
      return x.toString() === y.toString();
    }
    if (typeof x !== "object" || x === null || typeof y !== "object" || y === null) {
      return false;
    }
    const keysX = Reflect.ownKeys(x);
    const keysY = Reflect.ownKeys(y);
    if (keysX.length !== keysY.length)
      return false;
    for (let i = 0; i < keysX.length; i++) {
      if (!Reflect.has(y, keysX[i]))
        return false;
      if (!isEqual(x[keysX[i]], y[keysX[i]]))
        return false;
    }
    return true;
  };

  const shake = (obj, filter = (x) => x === void 0) => {
    if (!obj)
      return {};
    const keys = Object.keys(obj);
    return keys.reduce((acc, key) => {
      if (filter(obj[key])) {
        return acc;
      } else
        return { ...acc, [key]: obj[key] };
    }, {});
  };
  const mapKeys = (obj, mapFunc) => {
    const keys = Object.keys(obj);
    return keys.reduce(
      (acc, key) => ({
        ...acc,
        [mapFunc(key, obj[key])]: obj[key]
      }),
      {}
    );
  };
  const mapValues = (obj, mapFunc) => {
    const keys = Object.keys(obj);
    return keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: mapFunc(obj[key], key)
      }),
      {}
    );
  };
  const mapEntries = (obj, toEntry) => {
    if (!obj)
      return {};
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const [newKey, newValue] = toEntry(key, value);
      return {
        ...acc,
        [newKey]: newValue
      };
    }, {});
  };
  const invert = (obj) => {
    if (!obj)
      return {};
    const keys = Object.keys(obj);
    return keys.reduce(
      (acc, key) => ({
        ...acc,
        [obj[key]]: key
      }),
      {}
    );
  };
  const lowerize = (obj) => mapKeys(obj, (k) => k.toLowerCase());
  const upperize = (obj) => mapKeys(obj, (k) => k.toUpperCase());
  const clone = (obj) => {
    if (isPrimitive(obj)) {
      return obj;
    }
    if (typeof obj === "function") {
      return obj.bind({});
    }
    const newObj = new obj.constructor();
    Object.getOwnPropertyNames(obj).forEach((prop) => {
      newObj[prop] = obj[prop];
    });
    return newObj;
  };
  const listify = (obj, toItem) => {
    if (!obj)
      return [];
    const entries = Object.entries(obj);
    if (entries.length === 0)
      return [];
    return entries.reduce((acc, entry) => {
      return [...acc, toItem(entry[0], entry[1])];
    }, []);
  };
  const pick = (obj, keys) => {
    if (!obj)
      return {};
    return keys.reduce((acc, key) => {
      if (obj.hasOwnProperty(key))
        acc[key] = obj[key];
      return acc;
    }, {});
  };
  const omit = (obj, keys) => {
    if (!obj)
      return {};
    if (!keys || keys.length === 0)
      return obj;
    return keys.reduce(
      (acc, key) => {
        delete acc[key];
        return acc;
      },
      { ...obj }
    );
  };
  const get = (value, funcOrPath, defaultValue = null) => {
    if (isFunction(funcOrPath)) {
      try {
        return funcOrPath(value) ?? defaultValue;
      } catch {
        return defaultValue;
      }
    }
    const segments = funcOrPath.split(/[\.\[\]]/g);
    let current = value;
    for (const key of segments) {
      if (current === null)
        return defaultValue;
      if (current === void 0)
        return defaultValue;
      if (key.trim() === "")
        continue;
      current = current[key];
    }
    if (current === void 0)
      return defaultValue;
    return current;
  };
  const zip = (a, b) => {
    if (!a && !b)
      return {};
    if (!a)
      return b;
    if (!b)
      return a;
    return Object.entries(a).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: (() => {
          if (isObject(value))
            return zip(value, b[key]);
          return b[key];
        })()
      };
    }, {});
  };

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const draw = (array) => {
    const max = array.length;
    if (max === 0) {
      return null;
    }
    const index = random(0, max - 1);
    return array[index];
  };
  const shuffle = (array) => {
    return array.map((a) => ({ rand: Math.random(), value: a })).sort((a, b) => a.rand - b.rand).map((a) => a.value);
  };
  const uid = (length, specials = "") => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + specials;
    return iterate(
      length,
      (acc) => {
        return acc + characters.charAt(random(0, characters.length - 1));
      },
      ""
    );
  };

  const series = (...items) => {
    const { itemsByValue, itemsByIndex } = items.reduce(
      (acc, item, idx) => ({
        itemsByValue: {
          ...acc.itemsByValue,
          [item]: idx
        },
        itemsByIndex: {
          ...acc.itemsByIndex,
          [idx]: item
        }
      }),
      {
        itemsByValue: {},
        itemsByIndex: {}
      }
    );
    return {
      min: (a, b) => {
        return itemsByValue[a] < itemsByValue[b] ? a : b;
      },
      max: (a, b) => {
        return itemsByValue[a] > itemsByValue[b] ? a : b;
      },
      first: () => {
        return itemsByIndex[0];
      },
      last: () => {
        return itemsByIndex[items.length - 1];
      },
      next: (current, defaultValue) => {
        return itemsByIndex[itemsByValue[current] + 1] ?? defaultValue;
      },
      previous: (current, defaultValue) => {
        return itemsByIndex[itemsByValue[current] - 1] ?? defaultValue;
      }
    };
  };

  const capitalize = (str) => {
    if (!str || str.length === 0)
      return "";
    const lower = str.toLowerCase();
    return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length);
  };
  const camel = (str) => {
    const parts = str?.replace(/([A-Z])+/g, capitalize)?.split(/(?=[A-Z])|[\.\-\s_]/).map((x) => x.toLowerCase()) ?? [];
    if (parts.length === 0)
      return "";
    if (parts.length === 1)
      return parts[0];
    return parts.reduce((acc, part) => {
      return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`;
    });
  };
  const snake = (str) => {
    const parts = str?.replace(/([A-Z])+/g, capitalize).split(/(?=[A-Z])|[\.\-\s_]/).map((x) => x.toLowerCase()) ?? [];
    if (parts.length === 0)
      return "";
    if (parts.length === 1)
      return parts[0];
    return parts.reduce((acc, part) => {
      return `${acc}_${part.toLowerCase()}`;
    });
  };
  const dash = (str) => {
    const parts = str?.replace(/([A-Z])+/g, capitalize)?.split(/(?=[A-Z])|[\.\-\s_]/).map((x) => x.toLowerCase()) ?? [];
    if (parts.length === 0)
      return "";
    if (parts.length === 1)
      return parts[0];
    return parts.reduce((acc, part) => {
      return `${acc}-${part.toLowerCase()}`;
    });
  };
  const pascal = (str) => {
    const parts = str?.split(/[\.\-\s_]/).map((x) => x.toLowerCase()) ?? [];
    if (parts.length === 0)
      return "";
    return parts.map((str2) => str2.charAt(0).toUpperCase() + str2.slice(1)).join("");
  };
  const title = (str) => {
    if (!str)
      return "";
    return str.split(/(?=[A-Z])|[\.\-\s_]/).map((s) => s.trim()).filter((s) => !!s).map((s) => capitalize(s.toLowerCase())).join(" ");
  };
  const template = (str, data, regex = /\{\{(.+?)\}\}/g) => {
    return Array.from(str.matchAll(regex)).reduce((acc, match) => {
      return acc.replace(match[0], data[match[1]]);
    }, str);
  };

  exports.alphabetical = alphabetical;
  exports.boil = boil;
  exports.callable = callable;
  exports.camal = camel;
  exports.camel = camel;
  exports.capitalize = capitalize;
  exports.chain = chain;
  exports.clone = clone;
  exports.cluster = cluster;
  exports.compose = compose;
  exports.counting = counting;
  exports.dash = dash;
  exports.debounce = debounce;
  exports.defer = defer;
  exports.diff = diff;
  exports.draw = draw;
  exports.first = first;
  exports.flat = flat;
  exports.fork = fork;
  exports.get = get;
  exports.group = group;
  exports.intersects = intersects;
  exports.invert = invert;
  exports.isArray = isArray;
  exports.isDate = isDate;
  exports.isEmpty = isEmpty;
  exports.isEqual = isEqual;
  exports.isFloat = isFloat;
  exports.isFunction = isFunction;
  exports.isInt = isInt;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isPrimitive = isPrimitive;
  exports.isString = isString;
  exports.isSymbol = isSymbol;
  exports.iterate = iterate;
  exports.last = last;
  exports.list = list;
  exports.listify = listify;
  exports.lowerize = lowerize;
  exports.map = map;
  exports.mapEntries = mapEntries;
  exports.mapKeys = mapKeys;
  exports.mapValues = mapValues;
  exports.max = max;
  exports.memo = memo;
  exports.merge = merge;
  exports.min = min;
  exports.objectify = objectify;
  exports.omit = omit;
  exports.parallel = parallel;
  exports.partial = partial;
  exports.partob = partob;
  exports.pascal = pascal;
  exports.pick = pick;
  exports.proxied = proxied;
  exports.random = random;
  exports.range = range;
  exports.reduce = reduce;
  exports.replace = replace;
  exports.replaceOrAppend = replaceOrAppend;
  exports.retry = retry;
  exports.select = select;
  exports.series = series;
  exports.shake = shake;
  exports.shift = shift;
  exports.shuffle = shuffle;
  exports.sift = sift;
  exports.sleep = sleep;
  exports.snake = snake;
  exports.sort = sort;
  exports.sum = sum;
  exports.template = template;
  exports.throttle = throttle;
  exports.title = title;
  exports.toFloat = toFloat;
  exports.toInt = toInt;
  exports.toggle = toggle;
  exports.try = tryit;
  exports.tryit = tryit;
  exports.uid = uid;
  exports.unique = unique;
  exports.upperize = upperize;
  exports.zip = zip;

  return exports;

})({});
