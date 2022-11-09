'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function empty(array) {
  array.length = 0;
}

function slice(arrayLike, start, end) {
  return Array.prototype.slice.call(arrayLike, start, end);
}

function find(arrayLike, predicate) {
  return slice(arrayLike).filter(predicate)[0];
}

function apply(func) {
  return func.bind(null, ...slice(arguments, 1));
}

const nextTick = setTimeout;

const noop = () => {
};

function raf(func) {
  return requestAnimationFrame(func);
}

function typeOf(type, subject) {
  return typeof subject === type;
}
function isObject(subject) {
  return !isNull(subject) && typeOf("object", subject);
}
const isArray = Array.isArray;
const isFunction = apply(typeOf, "function");
const isString = apply(typeOf, "string");
const isUndefined = apply(typeOf, "undefined");
function isNull(subject) {
  return subject === null;
}
function isHTMLElement(subject) {
  try {
    return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
  } catch (e) {
    return false;
  }
}

function toArray(value) {
  return isArray(value) ? value : [value];
}

function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}

function includes(array, value) {
  return array.indexOf(value) > -1;
}

function push(array, items) {
  array.push(...toArray(items));
  return array;
}

function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, (name) => {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}

function addClass(elm, classes) {
  toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
}

function append(parent, children) {
  forEach(children, parent.appendChild.bind(parent));
}

function before(nodes, ref) {
  forEach(nodes, (node) => {
    const parent = (ref || node).parentNode;
    if (parent) {
      parent.insertBefore(node, ref);
    }
  });
}

function matches(elm, selector) {
  return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}

function children(parent, selector) {
  const children2 = parent ? slice(parent.children) : [];
  return selector ? children2.filter((child) => matches(child, selector)) : children2;
}

function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}

const ownKeys = Object.keys;

function forOwn(object, iteratee, right) {
  if (object) {
    (right ? ownKeys(object).reverse() : ownKeys(object)).forEach((key) => {
      key !== "__proto__" && iteratee(object[key], key);
    });
  }
  return object;
}

function assign(object) {
  slice(arguments, 1).forEach((source) => {
    forOwn(source, (value, key) => {
      object[key] = source[key];
    });
  });
  return object;
}

function merge(object) {
  slice(arguments, 1).forEach((source) => {
    forOwn(source, (value, key) => {
      if (isArray(value)) {
        object[key] = value.slice();
      } else if (isObject(value)) {
        object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
      } else {
        object[key] = value;
      }
    });
  });
  return object;
}

function omit(object, keys) {
  forEach(keys || ownKeys(object), (key) => {
    delete object[key];
  });
}

function removeAttribute(elms, attrs) {
  forEach(elms, (elm) => {
    forEach(attrs, (attr) => {
      elm && elm.removeAttribute(attr);
    });
  });
}

function setAttribute(elms, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, (value2, name) => {
      setAttribute(elms, name, value2);
    });
  } else {
    forEach(elms, (elm) => {
      isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
    });
  }
}

function create(tag, attrs, parent) {
  const elm = document.createElement(tag);
  if (attrs) {
    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
  }
  parent && append(parent, elm);
  return elm;
}

function style(elm, prop, value) {
  if (isUndefined(value)) {
    return getComputedStyle(elm)[prop];
  }
  if (!isNull(value)) {
    elm.style[prop] = `${value}`;
  }
}

function display(elm, display2) {
  style(elm, "display", display2);
}

function focus(elm) {
  elm["setActive"] && elm["setActive"]() || elm.focus({ preventScroll: true });
}

function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}

function hasClass(elm, className) {
  return elm && elm.classList.contains(className);
}

function rect(target) {
  return target.getBoundingClientRect();
}

function remove(nodes) {
  forEach(nodes, (node) => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

function measure(parent, value) {
  if (isString(value)) {
    const div = create("div", { style: `width: ${value}; position: absolute;` }, parent);
    value = rect(div).width;
    remove(div);
  }
  return value;
}

function parseHtml(html) {
  return child(new DOMParser().parseFromString(html, "text/html").body);
}

function prevent(e, stopPropagation) {
  e.preventDefault();
  if (stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}

function query(parent, selector) {
  return parent && parent.querySelector(selector);
}

function queryAll(parent, selector) {
  return selector ? slice(parent.querySelectorAll(selector)) : [];
}

function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}

function timeOf(e) {
  return e.timeStamp;
}

function unit(value) {
  return isString(value) ? value : value ? `${value}px` : "";
}

const PROJECT_CODE = "splide";

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[${PROJECT_CODE}] ${message || ""}`);
  }
}

function error(message) {
  console.error(`[${PROJECT_CODE}] ${message}`);
}

const { min, max, floor, ceil, abs } = Math;

function approximatelyEqual(x, y, epsilon) {
  return abs(x - y) < epsilon;
}

function between(number, x, y, exclusive) {
  const minimum = min(x, y);
  const maximum = max(x, y);
  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
}

function clamp(number, x, y) {
  const minimum = min(x, y);
  const maximum = max(x, y);
  return min(max(minimum, number), maximum);
}

function sign(x) {
  return +(x > 0) - +(x < 0);
}

function camelToKebab(string) {
  return string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function format(string, replacements) {
  forEach(replacements, (replacement) => {
    string = string.replace("%s", `${replacement}`);
  });
  return string;
}

function pad(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

const ids = {};
function uniqueId(prefix) {
  return `${prefix}${pad(ids[prefix] = (ids[prefix] || 0) + 1)}`;
}

exports.abs = abs;
exports.addClass = addClass;
exports.append = append;
exports.apply = apply;
exports.approximatelyEqual = approximatelyEqual;
exports.assert = assert;
exports.assign = assign;
exports.before = before;
exports.between = between;
exports.camelToKebab = camelToKebab;
exports.ceil = ceil;
exports.child = child;
exports.children = children;
exports.clamp = clamp;
exports.create = create;
exports.display = display;
exports.empty = empty;
exports.error = error;
exports.find = find;
exports.floor = floor;
exports.focus = focus;
exports.forEach = forEach;
exports.forOwn = forOwn;
exports.format = format;
exports.getAttribute = getAttribute;
exports.hasClass = hasClass;
exports.includes = includes;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isHTMLElement = isHTMLElement;
exports.isNull = isNull;
exports.isObject = isObject;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.matches = matches;
exports.max = max;
exports.measure = measure;
exports.merge = merge;
exports.min = min;
exports.nextTick = nextTick;
exports.noop = noop;
exports.omit = omit;
exports.ownKeys = ownKeys;
exports.pad = pad;
exports.parseHtml = parseHtml;
exports.prevent = prevent;
exports.push = push;
exports.query = query;
exports.queryAll = queryAll;
exports.raf = raf;
exports.rect = rect;
exports.remove = remove;
exports.removeAttribute = removeAttribute;
exports.removeClass = removeClass;
exports.setAttribute = setAttribute;
exports.sign = sign;
exports.slice = slice;
exports.style = style;
exports.timeOf = timeOf;
exports.toArray = toArray;
exports.toggleClass = toggleClass;
exports.uniqueId = uniqueId;
exports.unit = unit;
