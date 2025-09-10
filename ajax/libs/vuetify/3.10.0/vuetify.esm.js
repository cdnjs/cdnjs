/*!
* Vuetify v3.10.0
* Forged by John Leider
* Released under the MIT License.
*/

import { shallowRef, reactive, watchEffect, toRef, capitalize, unref, Fragment, camelize, isVNode, Comment, warn, getCurrentInstance as getCurrentInstance$1, ref, computed, provide, inject as inject$1, defineComponent as defineComponent$1, h, createVNode, mergeProps, createElementVNode, normalizeClass, toValue, onBeforeUnmount, watch, readonly, onMounted, useId, onDeactivated, onActivated, onScopeDispose, effectScope, toRaw, getCurrentScope, normalizeStyle, TransitionGroup, Transition, toRefs, isRef, onBeforeMount, nextTick, withDirectives, vShow, onUpdated, Text, resolveDynamicComponent, toDisplayString, markRaw, Teleport, cloneVNode, createTextVNode, normalizeProps, guardReactiveProps, onUnmounted, onBeforeUpdate, withModifiers, vModelText, resolveComponent, render } from 'vue';

const IN_BROWSER = typeof window !== 'undefined';
const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window;
const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
const SUPPORTS_EYE_DROPPER = IN_BROWSER && 'EyeDropper' in window;
const SUPPORTS_MATCH_MEDIA = IN_BROWSER && 'matchMedia' in window && typeof window.matchMedia === 'function';
const PREFERS_REDUCED_MOTION = () => SUPPORTS_MATCH_MEDIA && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

// Types

function getNestedValue(obj, path, fallback) {
  const last = path.length - 1;
  if (last < 0) return obj === undefined ? fallback : obj;
  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback;
    }
    obj = obj[path[i]];
  }
  if (obj == null) return fallback;
  return obj[path[last]] === undefined ? fallback : obj[path[last]];
}
function deepEqual(a, b) {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
    // If the values are Date, compare them as timestamps
    return false;
  }
  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false;
  }
  const props = Object.keys(a);
  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false;
  }
  return props.every(p => deepEqual(a[p], b[p]));
}
function getObjectValueByPath(obj, path, fallback) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string') return fallback;
  if (obj[path] !== undefined) return obj[path];
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  return getNestedValue(obj, path.split('.'), fallback);
}
function getPropertyFromItem(item, property, fallback) {
  if (property === true) return item === undefined ? fallback : item;
  if (property == null || typeof property === 'boolean') return fallback;
  if (item !== Object(item)) {
    if (typeof property !== 'function') return fallback;
    const value = property(item, fallback);
    return typeof value === 'undefined' ? fallback : value;
  }
  if (typeof property === 'string') return getObjectValueByPath(item, property, fallback);
  if (Array.isArray(property)) return getNestedValue(item, property, fallback);
  if (typeof property !== 'function') return fallback;
  const value = property(item, fallback);
  return typeof value === 'undefined' ? fallback : value;
}
function createRange(length) {
  let start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Array.from({
    length
  }, (v, k) => start + k);
}
function convertToUnit(str) {
  let unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';
  if (str == null || str === '') {
    return undefined;
  }
  const num = Number(str);
  if (isNaN(num)) {
    return String(str);
  } else if (!isFinite(num)) {
    return undefined;
  } else {
    return `${num}${unit}`;
  }
}
function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}
function isPlainObject(obj) {
  let proto;
  return obj !== null && typeof obj === 'object' && ((proto = Object.getPrototypeOf(obj)) === Object.prototype || proto === null);
}
function refElement(obj) {
  if (obj && '$el' in obj) {
    const el = obj.$el;
    if (el?.nodeType === Node.TEXT_NODE) {
      // Multi-root component, use the first element
      return el.nextElementSibling;
    }
    return el;
  }
  return obj;
}
const keyValues = Object.freeze({
  enter: 'Enter',
  tab: 'Tab',
  delete: 'Delete',
  esc: 'Escape',
  space: 'Space',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  end: 'End',
  home: 'Home',
  del: 'Delete',
  backspace: 'Backspace',
  insert: 'Insert',
  pageup: 'PageUp',
  pagedown: 'PageDown',
  shift: 'Shift'
});
function keys(o) {
  return Object.keys(o);
}
function has(obj, key) {
  return key.every(k => obj.hasOwnProperty(k));
}
// Array of keys
function pick(obj, paths) {
  const found = {};
  for (const key of paths) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      found[key] = obj[key];
    }
  }
  return found;
}

// Array of keys

// Array of keys or RegExp to test keys against

function pickWithRest(obj, paths, exclude) {
  const found = Object.create(null);
  const rest = Object.create(null);
  for (const key in obj) {
    if (paths.some(path => path instanceof RegExp ? path.test(key) : path === key) && true) {
      found[key] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  }
  return [found, rest];
}
function omit(obj, exclude) {
  const clone = {
    ...obj
  };
  exclude.forEach(prop => delete clone[prop]);
  return clone;
}
const onRE = /^on[^a-z]/;
const isOn = key => onRE.test(key);
const bubblingEvents = ['onAfterscriptexecute', 'onAnimationcancel', 'onAnimationend', 'onAnimationiteration', 'onAnimationstart', 'onAuxclick', 'onBeforeinput', 'onBeforescriptexecute', 'onChange', 'onClick', 'onCompositionend', 'onCompositionstart', 'onCompositionupdate', 'onContextmenu', 'onCopy', 'onCut', 'onDblclick', 'onFocusin', 'onFocusout', 'onFullscreenchange', 'onFullscreenerror', 'onGesturechange', 'onGestureend', 'onGesturestart', 'onGotpointercapture', 'onInput', 'onKeydown', 'onKeypress', 'onKeyup', 'onLostpointercapture', 'onMousedown', 'onMousemove', 'onMouseout', 'onMouseover', 'onMouseup', 'onMousewheel', 'onPaste', 'onPointercancel', 'onPointerdown', 'onPointerenter', 'onPointerleave', 'onPointermove', 'onPointerout', 'onPointerover', 'onPointerup', 'onReset', 'onSelect', 'onSubmit', 'onTouchcancel', 'onTouchend', 'onTouchmove', 'onTouchstart', 'onTransitioncancel', 'onTransitionend', 'onTransitionrun', 'onTransitionstart', 'onWheel'];
const compositionIgnoreKeys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Enter', 'Escape', 'Tab', ' '];
function isComposingIgnoreKey(e) {
  return e.isComposing && compositionIgnoreKeys.includes(e.key);
}

/**
 * Filter attributes that should be applied to
 * the root element of an input component. Remaining
 * attributes should be passed to the <input> element inside.
 */
function filterInputAttrs(attrs) {
  const [events, props] = pickWithRest(attrs, [onRE]);
  const inputEvents = omit(events, bubblingEvents);
  const [rootAttrs, inputAttrs] = pickWithRest(props, ['class', 'style', 'id', /^data-/]);
  Object.assign(rootAttrs, events);
  Object.assign(inputAttrs, inputEvents);
  return [rootAttrs, inputAttrs];
}
function wrapInArray(v) {
  return v == null ? [] : Array.isArray(v) ? v : [v];
}
function debounce(fn, delay) {
  let timeoutId = 0;
  const wrap = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), unref(delay));
  };
  wrap.clear = () => {
    clearTimeout(timeoutId);
  };
  wrap.immediate = fn;
  return wrap;
}
function clamp(value) {
  let min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Math.max(min, Math.min(max, value));
}
function getDecimals(value) {
  const trimmedStr = value.toString().trim();
  return trimmedStr.includes('.') ? trimmedStr.length - trimmedStr.indexOf('.') - 1 : 0;
}
function padEnd(str, length) {
  let char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
  return str + char.repeat(Math.max(0, length - str.length));
}
function padStart(str, length) {
  let char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
  return char.repeat(Math.max(0, length - str.length)) + str;
}
function chunk(str) {
  let size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  const chunked = [];
  let index = 0;
  while (index < str.length) {
    chunked.push(str.substr(index, size));
    index += size;
  }
  return chunked;
}
function humanReadableFileSize(bytes) {
  let base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  if (bytes < base) {
    return `${bytes} B`;
  }
  const prefix = base === 1024 ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
  let unit = -1;
  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }
  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}
function mergeDeep() {
  let source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let arrayFn = arguments.length > 2 ? arguments[2] : undefined;
  const out = {};
  for (const key in source) {
    out[key] = source[key];
  }
  for (const key in target) {
    const sourceProperty = source[key];
    const targetProperty = target[key];

    // Only continue deep merging if
    // both properties are plain objects
    if (isPlainObject(sourceProperty) && isPlainObject(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
      continue;
    }
    if (arrayFn && Array.isArray(sourceProperty) && Array.isArray(targetProperty)) {
      out[key] = arrayFn(sourceProperty, targetProperty);
      continue;
    }
    out[key] = targetProperty;
  }
  return out;
}
function flattenFragments(nodes) {
  return nodes.map(node => {
    if (node.type === Fragment) {
      return flattenFragments(node.children);
    } else {
      return node;
    }
  }).flat();
}
function toKebabCase() {
  let str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str);
  const kebab = str.replace(/[^a-z]/gi, '-').replace(/\B([A-Z])/g, '-$1').toLowerCase();
  toKebabCase.cache.set(str, kebab);
  return kebab;
}
toKebabCase.cache = new Map();
function findChildrenWithProvide(key, vnode) {
  if (!vnode || typeof vnode !== 'object') return [];
  if (Array.isArray(vnode)) {
    return vnode.map(child => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.suspense) {
    return findChildrenWithProvide(key, vnode.ssContent);
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map(child => findChildrenWithProvide(key, child)).flat(1);
  } else if (vnode.component) {
    if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key)) {
      return [vnode.component];
    } else if (vnode.component.subTree) {
      return findChildrenWithProvide(key, vnode.component.subTree).flat(1);
    }
  }
  return [];
}
var _arr = /*#__PURE__*/new WeakMap();
var _pointer = /*#__PURE__*/new WeakMap();
class CircularBuffer {
  constructor(size) {
    _classPrivateFieldInitSpec(this, _arr, []);
    _classPrivateFieldInitSpec(this, _pointer, 0);
    this.size = size;
  }
  get isFull() {
    return _classPrivateFieldGet(_arr, this).length === this.size;
  }
  push(val) {
    _classPrivateFieldGet(_arr, this)[_classPrivateFieldGet(_pointer, this)] = val;
    _classPrivateFieldSet(_pointer, this, (_classPrivateFieldGet(_pointer, this) + 1) % this.size);
  }
  values() {
    return _classPrivateFieldGet(_arr, this).slice(_classPrivateFieldGet(_pointer, this)).concat(_classPrivateFieldGet(_arr, this).slice(0, _classPrivateFieldGet(_pointer, this)));
  }
  clear() {
    _classPrivateFieldGet(_arr, this).length = 0;
    _classPrivateFieldSet(_pointer, this, 0);
  }
}
function getEventCoordinates(e) {
  if ('touches' in e) {
    return {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    };
  }
  return {
    clientX: e.clientX,
    clientY: e.clientY
  };
}

// Only allow a single return type

/**
 * Convert a computed ref to a record of refs.
 * The getter function must always return an object with the same keys.
 */

function destructComputed(getter) {
  const refs = reactive({});
  watchEffect(() => {
    const base = getter();
    for (const key in base) {
      refs[key] = base[key];
    }
  }, {
    flush: 'sync'
  });
  const obj = {};
  for (const key in refs) {
    obj[key] = toRef(() => refs[key]);
  }
  return obj;
}

/** Array.includes but value can be any type */
function includes(arr, val) {
  return arr.includes(val);
}
function eventName(propName) {
  return propName[2].toLowerCase() + propName.slice(3);
}

// TODO: this should be an array but vue's types don't accept arrays: vuejs/core#8025

const EventProp = () => [Function, Array];
function hasEvent(props, name) {
  name = 'on' + capitalize(name);
  return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`]);
}
function callEvent(handler) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  if (Array.isArray(handler)) {
    for (const h of handler) {
      h(...args);
    }
  } else if (typeof handler === 'function') {
    handler(...args);
  }
}
function focusableChildren(el) {
  let filterByTabIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const targets = ['button', '[href]', 'input:not([type="hidden"])', 'select', 'textarea', '[tabindex]'].map(s => `${s}${filterByTabIndex ? ':not([tabindex="-1"])' : ''}:not([disabled])`).join(', ');
  return [...el.querySelectorAll(targets)];
}
function getNextElement(elements, location, condition) {
  let _el;
  let idx = elements.indexOf(document.activeElement);
  const inc = location === 'next' ? 1 : -1;
  do {
    idx += inc;
    _el = elements[idx];
  } while ((!_el || _el.offsetParent == null || !(condition?.(_el) ?? true)) && idx < elements.length && idx >= 0);
  return _el;
}
function focusChild(el, location) {
  const focusable = focusableChildren(el);
  if (location == null) {
    if (el === document.activeElement || !el.contains(document.activeElement)) {
      focusable[0]?.focus();
    }
  } else if (location === 'first') {
    focusable[0]?.focus();
  } else if (location === 'last') {
    focusable.at(-1)?.focus();
  } else if (typeof location === 'number') {
    focusable[location]?.focus();
  } else {
    const _el = getNextElement(focusable, location);
    if (_el) _el.focus();else focusChild(el, location === 'next' ? 'first' : 'last');
  }
}
function isEmpty(val) {
  return val === null || val === undefined || typeof val === 'string' && val.trim() === '';
}
function noop() {}

/** Returns null if the selector is not supported or we can't check */
function matchesSelector(el, selector) {
  const supportsSelector = IN_BROWSER && typeof CSS !== 'undefined' && typeof CSS.supports !== 'undefined' && CSS.supports(`selector(${selector})`);
  if (!supportsSelector) return null;
  try {
    return !!el && el.matches(selector);
  } catch (err) {
    return null;
  }
}
function ensureValidVNode(vnodes) {
  return vnodes.some(child => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    return child.type !== Fragment || ensureValidVNode(child.children);
  }) ? vnodes : null;
}
function renderSlot(slot, props, fallback) {
  // TODO: check if slot returns elements: #18308
  return slot?.(props) ?? fallback?.(props);
}
function defer(timeout, cb) {
  if (!IN_BROWSER || timeout === 0) {
    cb();
    return () => {};
  }
  const timeoutId = window.setTimeout(cb, timeout);
  return () => window.clearTimeout(timeoutId);
}
function isClickInsideElement(event, targetDiv) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const divRect = targetDiv.getBoundingClientRect();
  const divLeft = divRect.left;
  const divTop = divRect.top;
  const divRight = divRect.right;
  const divBottom = divRect.bottom;
  return mouseX >= divLeft && mouseX <= divRight && mouseY >= divTop && mouseY <= divBottom;
}
function templateRef() {
  const el = shallowRef();
  const fn = target => {
    el.value = target;
  };
  Object.defineProperty(fn, 'value', {
    enumerable: true,
    get: () => el.value,
    set: val => el.value = val
  });
  Object.defineProperty(fn, 'el', {
    enumerable: true,
    get: () => refElement(el.value)
  });
  return fn;
}
function checkPrintable(e) {
  const isPrintableChar = e.key.length === 1;
  const noModifier = !e.ctrlKey && !e.metaKey && !e.altKey;
  return isPrintableChar && noModifier;
}
function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint';
}
function escapeForRegex(sign) {
  return '\\^$*+?.()|{}[]'.includes(sign) ? `\\${sign}` : sign;
}
function extractNumber(text, decimalDigitsLimit, decimalSeparator) {
  const onlyValidCharacters = new RegExp(`[\\d\\-${escapeForRegex(decimalSeparator)}]`);
  const cleanText = text.split('').filter(x => onlyValidCharacters.test(x)).filter((x, i, all) => i === 0 && /[-]/.test(x) ||
  // sign allowed at the start
  x === decimalSeparator && i === all.indexOf(x) ||
  // decimal separator allowed only once
  /\d/.test(x)).join('');
  if (decimalDigitsLimit === 0) {
    return cleanText.split(decimalSeparator)[0];
  }
  const decimalPart = new RegExp(`${escapeForRegex(decimalSeparator)}\\d`);
  if (decimalDigitsLimit !== null && decimalPart.test(cleanText)) {
    const parts = cleanText.split(decimalSeparator);
    return [parts[0], parts[1].substring(0, decimalDigitsLimit)].join(decimalSeparator);
  }
  return cleanText;
}
function camelizeProps(props) {
  const out = {};
  for (const prop in props) {
    out[camelize(prop)] = props[prop];
  }
  return out;
}
function onlyDefinedProps(props) {
  const booleanAttributes = ['checked', 'disabled'];
  return Object.fromEntries(Object.entries(props).filter(_ref => {
    let [key, v] = _ref;
    return booleanAttributes.includes(key) ? !!v : v !== undefined;
  }));
}

// Utilities
const block = ['top', 'bottom'];
const inline = ['start', 'end', 'left', 'right'];
/** Parse a raw anchor string into an object */
function parseAnchor(anchor, isRtl) {
  let [side, align] = anchor.split(' ');
  if (!align) {
    align = includes(block, side) ? 'start' : includes(inline, side) ? 'top' : 'center';
  }
  return {
    side: toPhysical(side, isRtl),
    align: toPhysical(align, isRtl)
  };
}
function toPhysical(str, isRtl) {
  if (str === 'start') return isRtl ? 'right' : 'left';
  if (str === 'end') return isRtl ? 'left' : 'right';
  return str;
}
function flipSide(anchor) {
  return {
    side: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left'
    }[anchor.side],
    align: anchor.align
  };
}
function flipAlign(anchor) {
  return {
    side: anchor.side,
    align: {
      center: 'center',
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left'
    }[anchor.align]
  };
}
function flipCorner(anchor) {
  return {
    side: anchor.align,
    align: anchor.side
  };
}
function getAxis(anchor) {
  return includes(block, anchor.side) ? 'y' : 'x';
}

class Box {
  constructor(_ref) {
    let {
      x,
      y,
      width,
      height
    } = _ref;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function getOverflow(a, b) {
  return {
    x: {
      before: Math.max(0, b.left - a.left),
      after: Math.max(0, a.right - b.right)
    },
    y: {
      before: Math.max(0, b.top - a.top),
      after: Math.max(0, a.bottom - b.bottom)
    }
  };
}
function getTargetBox(target) {
  if (Array.isArray(target)) {
    return new Box({
      x: target[0],
      y: target[1],
      width: 0,
      height: 0
    });
  } else {
    return target.getBoundingClientRect();
  }
}
function getElementBox(el) {
  if (el === document.documentElement) {
    if (!visualViewport) {
      return new Box({
        x: 0,
        y: 0,
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      });
    } else {
      return new Box({
        x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
        y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
        width: visualViewport.width * visualViewport.scale,
        height: visualViewport.height * visualViewport.scale
      });
    }
  } else {
    const rect = el.getBoundingClientRect();
    return new Box({
      x: rect.x,
      y: rect.y,
      width: el.clientWidth,
      height: el.clientHeight
    });
  }
}

// Utilities

/** @see https://stackoverflow.com/a/57876601/2074736 */
function nullifyTransforms(el) {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const tx = style.transform;
  if (tx) {
    let ta, sx, sy, dx, dy;
    if (tx.startsWith('matrix3d(')) {
      ta = tx.slice(9, -1).split(/, /);
      sx = Number(ta[0]);
      sy = Number(ta[5]);
      dx = Number(ta[12]);
      dy = Number(ta[13]);
    } else if (tx.startsWith('matrix(')) {
      ta = tx.slice(7, -1).split(/, /);
      sx = Number(ta[0]);
      sy = Number(ta[3]);
      dx = Number(ta[4]);
      dy = Number(ta[5]);
    } else {
      return new Box(rect);
    }
    const to = style.transformOrigin;
    const x = rect.x - dx - (1 - sx) * parseFloat(to);
    const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(' ') + 1));
    const w = sx ? rect.width / sx : el.offsetWidth + 1;
    const h = sy ? rect.height / sy : el.offsetHeight + 1;
    return new Box({
      x,
      y,
      width: w,
      height: h
    });
  } else {
    return new Box(rect);
  }
}
function animate(el, keyframes, options) {
  if (typeof el.animate === 'undefined') return {
    finished: Promise.resolve()
  };
  let animation;
  try {
    animation = el.animate(keyframes, options);
  } catch (err) {
    return {
      finished: Promise.resolve()
    };
  }
  if (typeof animation.finished === 'undefined') {
    animation.finished = new Promise(resolve => {
      animation.onfinish = () => {
        resolve(animation);
      };
    });
  }
  return animation;
}

// Utilities
const handlers = new WeakMap();
function bindProps(el, props) {
  Object.keys(props).forEach(k => {
    if (isOn(k)) {
      const name = eventName(k);
      const handler = handlers.get(el);
      if (props[k] == null) {
        handler?.forEach(v => {
          const [n, fn] = v;
          if (n === name) {
            el.removeEventListener(name, fn);
            handler.delete(v);
          }
        });
      } else if (!handler || ![...handler]?.some(v => v[0] === name && v[1] === props[k])) {
        el.addEventListener(name, props[k]);
        const _handler = handler || new Set();
        _handler.add([name, props[k]]);
        if (!handlers.has(el)) handlers.set(el, _handler);
      }
    } else {
      if (props[k] == null) {
        el.removeAttribute(k);
      } else {
        el.setAttribute(k, props[k]);
      }
    }
  });
}
function unbindProps(el, props) {
  Object.keys(props).forEach(k => {
    if (isOn(k)) {
      const name = eventName(k);
      const handler = handlers.get(el);
      handler?.forEach(v => {
        const [n, fn] = v;
        if (n === name) {
          el.removeEventListener(name, fn);
          handler.delete(v);
        }
      });
    } else {
      el.removeAttribute(k);
    }
  });
}

/**
 * WCAG 3.0 APCA perceptual contrast algorithm from https://github.com/Myndex/SAPC-APCA
 * @licence https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @see https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup
 */
// Types

// MAGICAL NUMBERS

// sRGB Conversion to Relative Luminance (Y)

// Transfer Curve (aka "Gamma") for sRGB linearization
// Simple power curve vs piecewise described in docs
// Essentially, 2.4 best models actual display
// characteristics in combination with the total method
const mainTRC = 2.4;
const Rco = 0.2126729; // sRGB Red Coefficient (from matrix)
const Gco = 0.7151522; // sRGB Green Coefficient (from matrix)
const Bco = 0.0721750; // sRGB Blue Coefficient (from matrix)

// For Finding Raw SAPC Contrast from Relative Luminance (Y)

// Constants for SAPC Power Curve Exponents
// One pair for normal text, and one for reverse
// These are the "beating heart" of SAPC
const normBG = 0.55;
const normTXT = 0.58;
const revTXT = 0.57;
const revBG = 0.62;

// For Clamping and Scaling Values

const blkThrs = 0.03; // Level that triggers the soft black clamp
const blkClmp = 1.45; // Exponent for the soft black clamp curve
const deltaYmin = 0.0005; // Lint trap
const scaleBoW = 1.25; // Scaling for dark text on light
const scaleWoB = 1.25; // Scaling for light text on dark
const loConThresh = 0.078; // Threshold for new simple offset scale
const loConFactor = 12.82051282051282; // = 1/0.078,
const loConOffset = 0.06; // The simple offset
const loClip = 0.001; // Output clip (lint trap #2)

function APCAcontrast(text, background) {
  // Linearize sRGB
  const Rtxt = (text.r / 255) ** mainTRC;
  const Gtxt = (text.g / 255) ** mainTRC;
  const Btxt = (text.b / 255) ** mainTRC;
  const Rbg = (background.r / 255) ** mainTRC;
  const Gbg = (background.g / 255) ** mainTRC;
  const Bbg = (background.b / 255) ** mainTRC;

  // Apply the standard coefficients and sum to Y
  let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
  let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;

  // Soft clamp Y when near black.
  // Now clamping all colors to prevent crossover errors
  if (Ytxt <= blkThrs) Ytxt += (blkThrs - Ytxt) ** blkClmp;
  if (Ybg <= blkThrs) Ybg += (blkThrs - Ybg) ** blkClmp;

  // Return 0 Early for extremely low ∆Y (lint trap #1)
  if (Math.abs(Ybg - Ytxt) < deltaYmin) return 0.0;

  // SAPC CONTRAST

  let outputContrast; // For weighted final values
  if (Ybg > Ytxt) {
    // For normal polarity, black text on white
    // Calculate the SAPC contrast value and scale

    const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;

    // NEW! SAPC SmoothScale™
    // Low Contrast Smooth Scale Rollout to prevent polarity reversal
    // and also a low clip for very low contrasts (lint trap #2)
    // much of this is for very low contrasts, less than 10
    // therefore for most reversing needs, only loConOffset is important
    outputContrast = SAPC < loClip ? 0.0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
  } else {
    // For reverse polarity, light text on dark
    // WoB should always return negative value.

    const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
    outputContrast = SAPC > -loClip ? 0.0 : SAPC > -loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
  }
  return outputContrast * 100;
}

/* eslint-disable no-console */

function consoleWarn(message) {
  warn(`Vuetify: ${message}`);
}
function consoleError(message) {
  warn(`Vuetify error: ${message}`);
}
function deprecate(original, replacement) {
  replacement = Array.isArray(replacement) ? replacement.slice(0, -1).map(s => `'${s}'`).join(', ') + ` or '${replacement.at(-1)}'` : `'${replacement}'`;
  warn(`[Vuetify UPGRADE] '${original}' is deprecated, use ${replacement} instead.`);
}

// Types

const delta = 0.20689655172413793; // 6÷29

const cielabForwardTransform = t => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
const cielabReverseTransform = t => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
function fromXYZ$1(xyz) {
  const transform = cielabForwardTransform;
  const transformedY = transform(xyz[1]);
  return [116 * transformedY - 16, 500 * (transform(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform(xyz[2] / 1.08883))];
}
function toXYZ$1(lab) {
  const transform = cielabReverseTransform;
  const Ln = (lab[0] + 16) / 116;
  return [transform(Ln + lab[1] / 500) * 0.95047, transform(Ln), transform(Ln - lab[2] / 200) * 1.08883];
}

// Utilities

// Types

// For converting XYZ to sRGB
const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.0570]];

// Forward gamma adjust
const srgbForwardTransform = C => C <= 0.0031308 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055;

// For converting sRGB to XYZ
const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];

// Reverse gamma adjust
const srgbReverseTransform = C => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;
function fromXYZ(xyz) {
  const rgb = Array(3);
  const transform = srgbForwardTransform;
  const matrix = srgbForwardMatrix;

  // Matrix transform, then gamma adjustment
  for (let i = 0; i < 3; ++i) {
    // Rescale back to [0, 255]
    rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
  }
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2]
  };
}
function toXYZ(_ref) {
  let {
    r,
    g,
    b
  } = _ref;
  const xyz = [0, 0, 0];
  const transform = srgbReverseTransform;
  const matrix = srgbReverseMatrix;

  // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB
  r = transform(r / 255);
  g = transform(g / 255);
  b = transform(b / 255);

  // Matrix color space transform
  for (let i = 0; i < 3; ++i) {
    xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
  }
  return xyz;
}

// Utilities

// Types

function isCssColor(color) {
  return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
}
function isParsableColor(color) {
  return isCssColor(color) && !/^((rgb|hsl)a?\()?var\(--/.test(color);
}
const cssColorRe = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/;
const mappers = {
  rgb: (r, g, b, a) => ({
    r,
    g,
    b,
    a
  }),
  rgba: (r, g, b, a) => ({
    r,
    g,
    b,
    a
  }),
  hsl: (h, s, l, a) => HSLtoRGB({
    h,
    s,
    l,
    a
  }),
  hsla: (h, s, l, a) => HSLtoRGB({
    h,
    s,
    l,
    a
  }),
  hsv: (h, s, v, a) => HSVtoRGB({
    h,
    s,
    v,
    a
  }),
  hsva: (h, s, v, a) => HSVtoRGB({
    h,
    s,
    v,
    a
  })
};
function parseColor(color) {
  if (typeof color === 'number') {
    if (isNaN(color) || color < 0 || color > 0xFFFFFF) {
      // int can't have opacity
      consoleWarn(`'${color}' is not a valid hex color`);
    }
    return {
      r: (color & 0xFF0000) >> 16,
      g: (color & 0xFF00) >> 8,
      b: color & 0xFF
    };
  } else if (typeof color === 'string' && cssColorRe.test(color)) {
    const {
      groups
    } = color.match(cssColorRe);
    const {
      fn,
      values
    } = groups;
    const realValues = values.split(/,\s*|\s*\/\s*|\s+/).map((v, i) => {
      if (v.endsWith('%') ||
      // unitless slv are %
      i > 0 && i < 3 && ['hsl', 'hsla', 'hsv', 'hsva'].includes(fn)) {
        return parseFloat(v) / 100;
      } else {
        return parseFloat(v);
      }
    });
    return mappers[fn](...realValues);
  } else if (typeof color === 'string') {
    let hex = color.startsWith('#') ? color.slice(1) : color;
    if ([3, 4].includes(hex.length)) {
      hex = hex.split('').map(char => char + char).join('');
    } else if (![6, 8].includes(hex.length)) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    const int = parseInt(hex, 16);
    if (isNaN(int) || int < 0 || int > 0xFFFFFFFF) {
      consoleWarn(`'${color}' is not a valid hex(a) color`);
    }
    return HexToRGB(hex);
  } else if (typeof color === 'object') {
    if (has(color, ['r', 'g', 'b'])) {
      return color;
    } else if (has(color, ['h', 's', 'l'])) {
      return HSVtoRGB(HSLtoHSV(color));
    } else if (has(color, ['h', 's', 'v'])) {
      return HSVtoRGB(color);
    }
  }
  throw new TypeError(`Invalid color: ${color == null ? color : String(color) || color.constructor.name}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}

/** Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
function HSVtoRGB(hsva) {
  const {
    h,
    s,
    v,
    a
  } = hsva;
  const f = n => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };
  const rgb = [f(5), f(3), f(1)].map(v => Math.round(v * 255));
  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a
  };
}
function HSLtoRGB(hsla) {
  return HSVtoRGB(HSLtoHSV(hsla));
}

/** Converts RGBA to HSVA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
function RGBtoHSV(rgba) {
  if (!rgba) return {
    h: 0,
    s: 1,
    v: 1,
    a: 1
  };
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  if (max !== min) {
    if (max === r) {
      h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
      h = 60 * (4 + (r - g) / (max - min));
    }
  }
  if (h < 0) h = h + 360;
  const s = max === 0 ? 0 : (max - min) / max;
  const hsv = [h, s, max];
  return {
    h: hsv[0],
    s: hsv[1],
    v: hsv[2],
    a: rgba.a
  };
}
function HSVtoHSL(hsva) {
  const {
    h,
    s,
    v,
    a
  } = hsva;
  const l = v - v * s / 2;
  const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);
  return {
    h,
    s: sprime,
    l,
    a
  };
}
function HSLtoHSV(hsl) {
  const {
    h,
    s,
    l,
    a
  } = hsl;
  const v = l + s * Math.min(l, 1 - l);
  const sprime = v === 0 ? 0 : 2 - 2 * l / v;
  return {
    h,
    s: sprime,
    v,
    a
  };
}
function RGBtoCSS(_ref) {
  let {
    r,
    g,
    b,
    a
  } = _ref;
  return a === undefined ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
}
function HSVtoCSS(hsva) {
  return RGBtoCSS(HSVtoRGB(hsva));
}
function toHex(v) {
  const h = Math.round(v).toString(16);
  return ('00'.substr(0, 2 - h.length) + h).toUpperCase();
}
function RGBtoHex(_ref2) {
  let {
    r,
    g,
    b,
    a
  } = _ref2;
  return `#${[toHex(r), toHex(g), toHex(b), a !== undefined ? toHex(Math.round(a * 255)) : ''].join('')}`;
}
function HexToRGB(hex) {
  hex = parseHex(hex);
  let [r, g, b, a] = chunk(hex, 2).map(c => parseInt(c, 16));
  a = a === undefined ? a : a / 255;
  return {
    r,
    g,
    b,
    a
  };
}
function HexToHSV(hex) {
  const rgb = HexToRGB(hex);
  return RGBtoHSV(rgb);
}
function HSVtoHex(hsva) {
  return RGBtoHex(HSVtoRGB(hsva));
}
function parseHex(hex) {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }
  hex = hex.replace(/([^0-9a-f])/gi, 'F');
  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split('').map(x => x + x).join('');
  }
  if (hex.length !== 6) {
    hex = padEnd(padEnd(hex, 6), 8, 'F');
  }
  return hex;
}
function lighten(value, amount) {
  const lab = fromXYZ$1(toXYZ(value));
  lab[0] = lab[0] + amount * 10;
  return fromXYZ(toXYZ$1(lab));
}
function darken(value, amount) {
  const lab = fromXYZ$1(toXYZ(value));
  lab[0] = lab[0] - amount * 10;
  return fromXYZ(toXYZ$1(lab));
}

/**
 * Calculate the relative luminance of a given color
 * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
function getLuma(color) {
  const rgb = parseColor(color);
  return toXYZ(rgb)[1];
}

/**
 * Returns the contrast ratio (1-21) between two colors.
 * @see https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
function getContrast(first, second) {
  const l1 = getLuma(first);
  const l2 = getLuma(second);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}
function getForeground(color) {
  const blackContrast = Math.abs(APCAcontrast(parseColor(0), parseColor(color)));
  const whiteContrast = Math.abs(APCAcontrast(parseColor(0xffffff), parseColor(color)));

  // TODO: warn about poor color selections
  // const contrastAsText = Math.abs(APCAcontrast(colorVal, colorToInt(theme.colors.background)))
  // const minContrast = Math.max(blackContrast, whiteContrast)
  // if (minContrast < 60) {
  //   consoleInfo(`${key} theme color ${color} has poor contrast (${minContrast.toFixed()}%)`)
  // } else if (contrastAsText < 60 && !['background', 'surface'].includes(color)) {
  //   consoleInfo(`${key} theme color ${color} has poor contrast as text (${contrastAsText.toFixed()}%)`)
  // }

  // Prefer white text if both have an acceptable contrast ratio
  return whiteContrast > Math.min(blackContrast, 50) ? '#fff' : '#000';
}

// Types
// eslint-disable-line vue/prefer-import-from-vue

/**
 * Creates a factory function for props definitions.
 * This is used to define props in a composable then override
 * default values in an implementing component.
 *
 * @example Simplified signature
 * (props: Props) => (defaults?: Record<keyof props, any>) => Props
 *
 * @example Usage
 * const makeProps = propsFactory({
 *   foo: String,
 * })
 *
 * defineComponent({
 *   props: {
 *     ...makeProps({
 *       foo: 'a',
 *     }),
 *   },
 *   setup (props) {
 *     // would be "string | undefined", now "string" because a default has been provided
 *     props.foo
 *   },
 * }
 */

function propsFactory(props, source) {
  return defaults => {
    return Object.keys(props).reduce((obj, prop) => {
      const isObjectDefinition = typeof props[prop] === 'object' && props[prop] != null && !Array.isArray(props[prop]);
      const definition = isObjectDefinition ? props[prop] : {
        type: props[prop]
      };
      if (defaults && prop in defaults) {
        obj[prop] = {
          ...definition,
          default: defaults[prop]
        };
      } else {
        obj[prop] = definition;
      }
      if (source && !obj[prop].source) {
        obj[prop].source = source;
      }
      return obj;
    }, {});
  };
}

/**
 * Like `Partial<T>` but doesn't care what the value is
 */

// Copied from Vue

// Utilities

// Types

// Composables
const makeComponentProps = propsFactory({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, 'component');

// Utilities
function getCurrentInstance(name, message) {
  const vm = getCurrentInstance$1();
  if (!vm) {
    throw new Error(`[Vuetify] ${name} ${'must be called from inside a setup function'}`);
  }
  return vm;
}
function getCurrentInstanceName() {
  let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'composables';
  const vm = getCurrentInstance(name).type;
  return toKebabCase(vm?.aliasName || vm?.name);
}

// Utilities

// Types

function injectSelf(key) {
  let vm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstance('injectSelf');
  const {
    provides
  } = vm;
  if (provides && key in provides) {
    // TS doesn't allow symbol as index type
    return provides[key];
  }
  return undefined;
}

// Utilities

// Types

const DefaultsSymbol = Symbol.for('vuetify:defaults');
function createDefaults(options) {
  return ref(options);
}
function injectDefaults() {
  const defaults = inject$1(DefaultsSymbol);
  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance');
  return defaults;
}
function provideDefaults(defaults, options) {
  const injectedDefaults = injectDefaults();
  const providedDefaults = ref(defaults);
  const newDefaults = computed(() => {
    const disabled = unref(options?.disabled);
    if (disabled) return injectedDefaults.value;
    const scoped = unref(options?.scoped);
    const reset = unref(options?.reset);
    const root = unref(options?.root);
    if (providedDefaults.value == null && !(scoped || reset || root)) return injectedDefaults.value;
    let properties = mergeDeep(providedDefaults.value, {
      prev: injectedDefaults.value
    });
    if (scoped) return properties;
    if (reset || root) {
      const len = Number(reset || Infinity);
      for (let i = 0; i <= len; i++) {
        if (!properties || !('prev' in properties)) {
          break;
        }
        properties = properties.prev;
      }
      if (properties && typeof root === 'string' && root in properties) {
        properties = mergeDeep(mergeDeep(properties, {
          prev: properties
        }), properties[root]);
      }
      return properties;
    }
    return properties.prev ? mergeDeep(properties.prev, properties) : properties;
  });
  provide(DefaultsSymbol, newDefaults);
  return newDefaults;
}
function propIsDefined(vnode, prop) {
  return vnode.props && (typeof vnode.props[prop] !== 'undefined' || typeof vnode.props[toKebabCase(prop)] !== 'undefined');
}
function internalUseDefaults() {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let name = arguments.length > 1 ? arguments[1] : undefined;
  let defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : injectDefaults();
  const vm = getCurrentInstance('useDefaults');
  name = name ?? vm.type.name ?? vm.type.__name;
  if (!name) {
    throw new Error('[Vuetify] Could not determine component name');
  }
  const componentDefaults = computed(() => defaults.value?.[props._as ?? name]);
  const _props = new Proxy(props, {
    get(target, prop) {
      const propValue = Reflect.get(target, prop);
      if (prop === 'class' || prop === 'style') {
        return [componentDefaults.value?.[prop], propValue].filter(v => v != null);
      }
      if (propIsDefined(vm.vnode, prop)) return propValue;
      const _componentDefault = componentDefaults.value?.[prop];
      if (_componentDefault !== undefined) return _componentDefault;
      const _globalDefault = defaults.value?.global?.[prop];
      if (_globalDefault !== undefined) return _globalDefault;
      return propValue;
    }
  });
  const _subcomponentDefaults = shallowRef();
  watchEffect(() => {
    if (componentDefaults.value) {
      const subComponents = Object.entries(componentDefaults.value).filter(_ref => {
        let [key] = _ref;
        return key.startsWith(key[0].toUpperCase());
      });
      _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : undefined;
    } else {
      _subcomponentDefaults.value = undefined;
    }
  });
  function provideSubDefaults() {
    const injected = injectSelf(DefaultsSymbol, vm);
    provide(DefaultsSymbol, computed(() => {
      return _subcomponentDefaults.value ? mergeDeep(injected?.value ?? {}, _subcomponentDefaults.value) : injected?.value;
    }));
  }
  return {
    props: _props,
    provideSubDefaults
  };
}
function useDefaults() {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let name = arguments.length > 1 ? arguments[1] : undefined;
  const {
    props: _props,
    provideSubDefaults
  } = internalUseDefaults(props, name);
  provideSubDefaults();
  return _props;
}

// Composables

// Types

// No props

// Object Props

// Implementation
function defineComponent(options) {
  options._setup = options._setup ?? options.setup;
  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value');
    return options;
  }
  if (options._setup) {
    options.props = propsFactory(options.props ?? {}, options.name)();
    const propKeys = Object.keys(options.props).filter(key => key !== 'class' && key !== 'style');
    options.filterProps = function filterProps(props) {
      return pick(props, propKeys);
    };
    options.props._as = String;
    options.setup = function setup(props, ctx) {
      const defaults = injectDefaults();

      // Skip props proxy if defaults are not provided
      if (!defaults.value) return options._setup(props, ctx);
      const {
        props: _props,
        provideSubDefaults
      } = internalUseDefaults(props, props._as ?? options.name, defaults);
      const setupBindings = options._setup(_props, ctx);
      provideSubDefaults();
      return setupBindings;
    };
  }
  return options;
}

// No argument - simple default slot

// Generic constructor argument - generic props and slots

// Slots argument - simple slots

// Implementation
function genericComponent() {
  let exposeDefaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return options => (exposeDefaults ? defineComponent : defineComponent$1)(options);
}
function defineFunctionalComponent(props, render) {
  render.props = props;
  return render;
}

// Adds a filterProps method to the component options

// https://github.com/vuejs/core/pull/10557

// not a vue Component

// Composables
function createSimpleFunctional(klass) {
  let tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  let name = arguments.length > 2 ? arguments[2] : undefined;
  return genericComponent()({
    name: name ?? capitalize(camelize(klass.replace(/__/g, '-'))),
    props: {
      tag: {
        type: String,
        default: tag
      },
      ...makeComponentProps()
    },
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        return h(props.tag, {
          class: [klass, props.class],
          style: props.style
        }, slots.default?.());
      };
    }
  });
}

/**
 * Returns:
 *  - 'null' if the node is not attached to the DOM
 *  - the root node (HTMLDocument | ShadowRoot) otherwise
 */
function attachedRoot(node) {
  /* istanbul ignore next */
  if (typeof node.getRootNode !== 'function') {
    // Shadow DOM not supported (IE11), lets find the root of this node
    while (node.parentNode) node = node.parentNode;

    // The root parent is the document if the node is attached to the DOM
    if (node !== document) return null;
    return document;
  }
  const root = node.getRootNode();

  // The composed root node is the document if the node is attached to the DOM
  if (root !== document && root.getRootNode({
    composed: true
  }) !== document) return null;
  return root;
}

// Utilities

// Types

const standardEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';
const deceleratedEasing = 'cubic-bezier(0.0, 0, 0.2, 1)'; // Entering
const acceleratedEasing = 'cubic-bezier(0.4, 0, 1, 1)'; // Leaving

const easingPatterns = {
  linear: t => t,
  easeInQuad: t => t ** 2,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t,
  easeInCubic: t => t ** 3,
  easeOutCubic: t => --t ** 3 + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: t => t ** 4,
  easeOutQuart: t => 1 - --t ** 4,
  easeInOutQuart: t => t < 0.5 ? 8 * t ** 4 : 1 - 8 * --t ** 4,
  easeInQuint: t => t ** 5,
  easeOutQuint: t => 1 + --t ** 5,
  easeInOutQuint: t => t < 0.5 ? 16 * t ** 5 : 1 + 16 * --t ** 5,
  instant: t => 1
};

// Utilities
function getPrefixedEventHandlers(attrs, suffix, getData) {
  return Object.keys(attrs).filter(key => isOn(key) && key.endsWith(suffix)).reduce((acc, key) => {
    acc[key.slice(0, -suffix.length)] = event => attrs[key](event, getData(event));
    return acc;
  }, {});
}

function getScrollParent(el) {
  let includeHidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  while (el) {
    if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el)) return el;
    el = el.parentElement;
  }
  return document.scrollingElement;
}
function getScrollParents(el, stopAt) {
  const elements = [];
  if (stopAt && el && !stopAt.contains(el)) return elements;
  while (el) {
    if (hasScrollbar(el)) elements.push(el);
    if (el === stopAt) break;
    el = el.parentElement;
  }
  return elements;
}
function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const style = window.getComputedStyle(el);
  const hasVerticalScrollbar = style.overflowY === 'scroll' || style.overflowY === 'auto' && el.scrollHeight > el.clientHeight;
  const hasHorizontalScrollbar = style.overflowX === 'scroll' || style.overflowX === 'auto' && el.scrollWidth > el.clientWidth;
  return hasVerticalScrollbar || hasHorizontalScrollbar;
}
function isPotentiallyScrollable(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  const style = window.getComputedStyle(el);
  return ['scroll', 'auto'].includes(style.overflowY);
}

// Types

function getIndentLines(_ref) {
  let {
    depth,
    isLast,
    isLastGroup,
    leafLinks,
    separateRoots,
    parentIndentLines,
    variant
  } = _ref;
  if (!parentIndentLines || !depth) {
    return {
      leaf: undefined,
      node: undefined,
      children: parentIndentLines
    };
  }
  if (variant === 'simple') {
    return {
      leaf: [...parentIndentLines, 'line'],
      node: [...parentIndentLines, 'line'],
      children: [...parentIndentLines, 'line']
    };
  }
  const isLastLeaf = isLast && (!isLastGroup || separateRoots || depth > 1);
  return {
    leaf: [...parentIndentLines, isLastLeaf ? 'last-leaf' : 'leaf', ...(leafLinks ? ['leaf-link'] : [])],
    node: [...parentIndentLines, isLastLeaf ? 'last-leaf' : 'leaf'],
    children: [...parentIndentLines, isLastLeaf ? 'none' : 'line']
  };
}

function isFixedPosition(el) {
  while (el) {
    if (window.getComputedStyle(el).position === 'fixed') {
      return true;
    }
    el = el.offsetParent;
  }
  return false;
}

// Utilities

// Types

function useRender(render) {
  const vm = getCurrentInstance('useRender');
  vm.render = render;
}

// Types

const IconValue = [String, Function, Object, Array];
const IconSymbol = Symbol.for('vuetify:icons');
const makeIconProps = propsFactory({
  icon: {
    type: IconValue
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: [String, Object, Function],
    required: true
  }
}, 'icon');
const VComponentIcon = genericComponent()({
  name: 'VComponentIcon',
  props: makeIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      const Icon = props.icon;
      return createVNode(props.tag, null, {
        default: () => [props.icon ? createVNode(Icon, null, null) : slots.default?.()]
      });
    };
  }
});
const VSvgIcon = defineComponent({
  name: 'VSvgIcon',
  inheritAttrs: false,
  props: makeIconProps(),
  setup(props, _ref2) {
    let {
      attrs
    } = _ref2;
    return () => {
      return createVNode(props.tag, mergeProps(attrs, {
        "style": null
      }), {
        default: () => [createElementVNode("svg", {
          "class": "v-icon__svg",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24",
          "role": "img",
          "aria-hidden": "true"
        }, [Array.isArray(props.icon) ? props.icon.map(path => Array.isArray(path) ? createElementVNode("path", {
          "d": path[0],
          "fill-opacity": path[1]
        }, null) : createElementVNode("path", {
          "d": path
        }, null)) : createElementVNode("path", {
          "d": props.icon
        }, null)])]
      });
    };
  }
});
const VLigatureIcon = defineComponent({
  name: 'VLigatureIcon',
  props: makeIconProps(),
  setup(props) {
    return () => {
      return createVNode(props.tag, null, {
        default: () => [props.icon]
      });
    };
  }
});
const VClassIcon = defineComponent({
  name: 'VClassIcon',
  props: makeIconProps(),
  setup(props) {
    return () => {
      return createVNode(props.tag, {
        "class": normalizeClass(props.icon)
      }, null);
    };
  }
});
function genDefaults$3() {
  return {
    svg: {
      component: VSvgIcon
    },
    class: {
      component: VClassIcon
    }
  };
}

// Composables
function createIcons(options) {
  const sets = genDefaults$3();
  const defaultSet = options?.defaultSet ?? 'mdi';
  if (defaultSet === 'mdi' && !sets.mdi) {
    sets.mdi = mdi;
  }
  return mergeDeep({
    defaultSet,
    sets,
    aliases: {
      ...aliases,
      /* eslint-disable max-len */
      vuetify: ['M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z', ['M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z', 0.6]],
      'vuetify-outline': 'svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z',
      'vuetify-play': ['m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z', ['M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z', 0.6]]
      /* eslint-enable max-len */
    }
  }, options);
}
const useIcon = props => {
  const icons = inject$1(IconSymbol);
  if (!icons) throw new Error('Missing Vuetify Icons provide!');
  const iconData = computed(() => {
    const iconAlias = toValue(props);
    if (!iconAlias) return {
      component: VComponentIcon
    };
    let icon = iconAlias;
    if (typeof icon === 'string') {
      icon = icon.trim();
      if (icon.startsWith('$')) {
        icon = icons.aliases?.[icon.slice(1)];
      }
    }
    if (!icon) consoleWarn(`Could not find aliased icon "${iconAlias}"`);
    if (Array.isArray(icon)) {
      return {
        component: VSvgIcon,
        icon
      };
    } else if (typeof icon !== 'string') {
      return {
        component: VComponentIcon,
        icon
      };
    }
    const iconSetName = Object.keys(icons.sets).find(setName => typeof icon === 'string' && icon.startsWith(`${setName}:`));
    const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
    const iconSet = icons.sets[iconSetName ?? icons.defaultSet];
    return {
      component: iconSet.component,
      icon: iconName
    };
  });
  return {
    iconData
  };
};

// Composables

// Types

const aliases = {
  collapse: 'mdi-chevron-up',
  complete: 'mdi-check',
  cancel: 'mdi-close-circle',
  close: 'mdi-close',
  delete: 'mdi-close-circle',
  // delete (e.g. v-chip close)
  clear: 'mdi-close-circle',
  success: 'mdi-check-circle',
  info: 'mdi-information',
  warning: 'mdi-alert-circle',
  error: 'mdi-close-circle',
  prev: 'mdi-chevron-left',
  next: 'mdi-chevron-right',
  checkboxOn: 'mdi-checkbox-marked',
  checkboxOff: 'mdi-checkbox-blank-outline',
  checkboxIndeterminate: 'mdi-minus-box',
  delimiter: 'mdi-circle',
  // for carousel
  sortAsc: 'mdi-arrow-up',
  sortDesc: 'mdi-arrow-down',
  expand: 'mdi-chevron-down',
  menu: 'mdi-menu',
  subgroup: 'mdi-menu-down',
  dropdown: 'mdi-menu-down',
  radioOn: 'mdi-radiobox-marked',
  radioOff: 'mdi-radiobox-blank',
  edit: 'mdi-pencil',
  ratingEmpty: 'mdi-star-outline',
  ratingFull: 'mdi-star',
  ratingHalf: 'mdi-star-half-full',
  loading: 'mdi-cached',
  first: 'mdi-page-first',
  last: 'mdi-page-last',
  unfold: 'mdi-unfold-more-horizontal',
  file: 'mdi-paperclip',
  plus: 'mdi-plus',
  minus: 'mdi-minus',
  calendar: 'mdi-calendar',
  treeviewCollapse: 'mdi-menu-down',
  treeviewExpand: 'mdi-menu-right',
  tableGroupCollapse: 'mdi-chevron-down',
  tableGroupExpand: 'mdi-chevron-right',
  eyeDropper: 'mdi-eyedropper',
  upload: 'mdi-cloud-upload',
  color: 'mdi-palette',
  command: 'mdi-apple-keyboard-command',
  ctrl: 'mdi-apple-keyboard-control',
  space: 'mdi-keyboard-space',
  shift: 'mdi-apple-keyboard-shift',
  alt: 'mdi-apple-keyboard-option',
  enter: 'mdi-keyboard-return',
  arrowup: 'mdi-arrow-up',
  arrowdown: 'mdi-arrow-down',
  arrowleft: 'mdi-arrow-left',
  arrowright: 'mdi-arrow-right',
  backspace: 'mdi-backspace',
  play: 'mdi-play',
  pause: 'mdi-pause',
  fullscreen: 'mdi-fullscreen',
  fullscreenExit: 'mdi-fullscreen-exit',
  volumeHigh: 'mdi-volume-high',
  volumeMedium: 'mdi-volume-medium',
  volumeLow: 'mdi-volume-low',
  volumeOff: 'mdi-volume-variant-off'
};
const mdi = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: props => h(VClassIcon, {
    ...props,
    class: 'mdi'
  })
};

// Icons

// Types

const md1 = {
  defaults: {
    global: {
      rounded: 'sm'
    },
    VAvatar: {
      rounded: 'circle'
    },
    VAutocomplete: {
      variant: 'underlined'
    },
    VBanner: {
      color: 'primary'
    },
    VBtn: {
      color: 'primary',
      rounded: 0
    },
    VCheckbox: {
      color: 'secondary'
    },
    VCombobox: {
      variant: 'underlined'
    },
    VDatePicker: {
      color: 'primary',
      controlHeight: 44,
      elevation: 1,
      rounded: 0,
      VBtn: {
        color: 'high-emphasis',
        rounded: 'circle'
      }
    },
    VSelect: {
      variant: 'underlined'
    },
    VSlider: {
      color: 'primary'
    },
    VTabs: {
      color: 'primary'
    },
    VTextarea: {
      variant: 'underlined'
    },
    VTextField: {
      variant: 'underlined'
    },
    VToolbar: {
      VBtn: {
        color: null
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#3F51B5',
          'primary-darken-1': '#303F9F',
          'primary-lighten-1': '#C5CAE9',
          secondary: '#FF4081',
          'secondary-darken-1': '#F50057',
          'secondary-lighten-1': '#FF80AB',
          accent: '#009688'
        }
      }
    }
  }
};

// Icons

// Types

const md2 = {
  defaults: {
    global: {
      rounded: 'md'
    },
    VAvatar: {
      rounded: 'circle'
    },
    VAutocomplete: {
      variant: 'filled'
    },
    VBanner: {
      color: 'primary'
    },
    VBtn: {
      color: 'primary'
    },
    VCheckbox: {
      color: 'secondary'
    },
    VCombobox: {
      variant: 'filled'
    },
    VDatePicker: {
      color: 'primary',
      controlHeight: 56,
      elevation: 2,
      rounded: 'md',
      VBtn: {
        color: 'high-emphasis',
        rounded: 'circle'
      }
    },
    VSelect: {
      variant: 'filled'
    },
    VSlider: {
      color: 'primary'
    },
    VTabs: {
      color: 'primary'
    },
    VTextarea: {
      variant: 'filled'
    },
    VTextField: {
      variant: 'filled'
    },
    VToolbar: {
      VBtn: {
        color: null
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#6200EE',
          'primary-darken-1': '#3700B3',
          secondary: '#03DAC6',
          'secondary-darken-1': '#018786',
          error: '#B00020'
        }
      }
    }
  }
};

// Icons

// Types

const md3 = {
  defaults: {
    VAppBar: {
      flat: true
    },
    VAutocomplete: {
      variant: 'outlined'
    },
    VBanner: {
      color: 'primary'
    },
    VBottomSheet: {
      contentClass: 'rounded-t-xl overflow-hidden'
    },
    VBtn: {
      color: 'primary',
      rounded: 'xl'
    },
    VBtnGroup: {
      rounded: 'xl',
      VBtn: {
        rounded: null
      }
    },
    VCard: {
      rounded: 'lg'
    },
    VCheckbox: {
      color: 'secondary',
      inset: true
    },
    VChip: {
      rounded: 'sm'
    },
    VCombobox: {
      variant: 'outlined'
    },
    VDateInput: {
      variant: 'outlined'
    },
    VDatePicker: {
      controlHeight: 48,
      color: 'primary',
      divided: true,
      headerColor: '',
      elevation: 3,
      rounded: 'xl',
      VBtn: {
        color: 'high-emphasis',
        rounded: 'circle'
      }
    },
    VFileInput: {
      variant: 'outlined'
    },
    VNavigationDrawer: {
      // VList: {
      //   nav: true,
      //   VListItem: {
      //     rounded: 'xl',
      //   },
      // },
    },
    VNumberInput: {
      variant: 'outlined',
      VBtn: {
        color: undefined,
        rounded: undefined
      }
    },
    VSelect: {
      variant: 'outlined'
    },
    VSlider: {
      color: 'primary'
    },
    VTabs: {
      color: 'primary'
    },
    VTextarea: {
      variant: 'outlined'
    },
    VTextField: {
      variant: 'outlined'
    },
    VToolbar: {
      VBtn: {
        color: null
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi
    }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#6750a4',
          secondary: '#b4b0bb',
          tertiary: '#7d5260',
          error: '#b3261e',
          surface: '#fffbfe'
        }
      }
    }
  }
};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  md1: md1,
  md2: md2,
  md3: md3
});

// Utilities

// Types

function useResizeObserver(callback) {
  let box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'content';
  const resizeRef = templateRef();
  const contentRect = ref();
  if (IN_BROWSER) {
    const observer = new ResizeObserver(entries => {
      callback?.(entries, observer);
      if (!entries.length) return;
      if (box === 'content') {
        contentRect.value = entries[0].contentRect;
      } else {
        contentRect.value = entries[0].target.getBoundingClientRect();
      }
    });
    onBeforeUnmount(() => {
      observer.disconnect();
    });
    watch(() => resizeRef.el, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(oldValue);
        contentRect.value = undefined;
      }
      if (newValue) observer.observe(newValue);
    }, {
      flush: 'post'
    });
  }
  return {
    resizeRef,
    contentRect: readonly(contentRect)
  };
}

// Composables

// Types

const VuetifyLayoutKey = Symbol.for('vuetify:layout');
const VuetifyLayoutItemKey = Symbol.for('vuetify:layout-item');
const ROOT_ZINDEX = 1000;
const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => []
  },
  fullHeight: Boolean
}, 'layout');

// Composables
const makeLayoutItemProps = propsFactory({
  name: {
    type: String
  },
  order: {
    type: [Number, String],
    default: 0
  },
  absolute: Boolean
}, 'layout-item');
function useLayout() {
  const layout = inject$1(VuetifyLayoutKey);
  if (!layout) throw new Error('[Vuetify] Could not find injected layout');
  return {
    getLayoutItem: layout.getLayoutItem,
    mainRect: layout.mainRect,
    mainStyles: layout.mainStyles
  };
}
function useLayoutItem(options) {
  const layout = inject$1(VuetifyLayoutKey);
  if (!layout) throw new Error('[Vuetify] Could not find injected layout');
  const id = options.id ?? `layout-item-${useId()}`;
  const vm = getCurrentInstance('useLayoutItem');
  provide(VuetifyLayoutItemKey, {
    id
  });
  const isKeptAlive = shallowRef(false);
  onDeactivated(() => isKeptAlive.value = true);
  onActivated(() => isKeptAlive.value = false);
  const {
    layoutItemStyles,
    layoutItemScrimStyles
  } = layout.register(vm, {
    ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id
  });
  onBeforeUnmount(() => layout.unregister(id));
  return {
    layoutItemStyles,
    layoutRect: layout.layoutRect,
    layoutItemScrimStyles
  };
}
const generateLayers = (layout, positions, layoutSizes, activeItems) => {
  let previousLayer = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  const layers = [{
    id: '',
    layer: {
      ...previousLayer
    }
  }];
  for (const id of layout) {
    const position = positions.get(id);
    const amount = layoutSizes.get(id);
    const active = activeItems.get(id);
    if (!position || !amount || !active) continue;
    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
    };
    layers.push({
      id,
      layer
    });
    previousLayer = layer;
  }
  return layers;
};
function createLayout(props) {
  const parentLayout = inject$1(VuetifyLayoutKey, null);
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
  const registered = ref([]);
  const positions = reactive(new Map());
  const layoutSizes = reactive(new Map());
  const priorities = reactive(new Map());
  const activeItems = reactive(new Map());
  const disabledTransitions = reactive(new Map());
  const {
    resizeRef,
    contentRect: layoutRect
  } = useResizeObserver();
  const computedOverlaps = computed(() => {
    const map = new Map();
    const overlaps = props.overlaps ?? [];
    for (const overlap of overlaps.filter(item => item.includes(':'))) {
      const [top, bottom] = overlap.split(':');
      if (!registered.value.includes(top) || !registered.value.includes(bottom)) continue;
      const topPosition = positions.get(top);
      const bottomPosition = positions.get(bottom);
      const topAmount = layoutSizes.get(top);
      const bottomAmount = layoutSizes.get(bottom);
      if (!topPosition || !bottomPosition || !topAmount || !bottomAmount) continue;
      map.set(bottom, {
        position: topPosition.value,
        amount: parseInt(topAmount.value, 10)
      });
      map.set(top, {
        position: bottomPosition.value,
        amount: -parseInt(bottomAmount.value, 10)
      });
    }
    return map;
  });
  const layers = computed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map(p => p.value))].sort((a, b) => a - b);
    const layout = [];
    for (const p of uniquePriorities) {
      const items = registered.value.filter(id => priorities.get(id)?.value === p);
      layout.push(...items);
    }
    return generateLayers(layout, positions, layoutSizes, activeItems);
  });
  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some(ref => ref.value);
  });
  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer;
  });
  const mainStyles = toRef(() => {
    return {
      '--v-layout-left': convertToUnit(mainRect.value.left),
      '--v-layout-right': convertToUnit(mainRect.value.right),
      '--v-layout-top': convertToUnit(mainRect.value.top),
      '--v-layout-bottom': convertToUnit(mainRect.value.bottom),
      ...(transitionsEnabled.value ? undefined : {
        transition: 'none'
      })
    };
  });
  const items = computed(() => {
    return layers.value.slice(1).map((_ref, index) => {
      let {
        id
      } = _ref;
      const {
        layer
      } = layers.value[index];
      const size = layoutSizes.get(id);
      const position = positions.get(id);
      return {
        id,
        ...layer,
        size: Number(size.value),
        position: position.value
      };
    });
  });
  const getLayoutItem = id => {
    return items.value.find(item => item.id === id);
  };
  const rootVm = getCurrentInstance('createLayout');
  const isMounted = shallowRef(false);
  onMounted(() => {
    isMounted.value = true;
  });
  provide(VuetifyLayoutKey, {
    register: (vm, _ref2) => {
      let {
        id,
        order,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute
      } = _ref2;
      priorities.set(id, order);
      positions.set(id, position);
      layoutSizes.set(id, layoutSize);
      activeItems.set(id, active);
      disableTransitions && disabledTransitions.set(id, disableTransitions);
      const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm?.vnode);
      const instanceIndex = instances.indexOf(vm);
      if (instanceIndex > -1) registered.value.splice(instanceIndex, 0, id);else registered.value.push(id);
      const index = computed(() => items.value.findIndex(i => i.id === id));
      const zIndex = computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
      const layoutItemStyles = computed(() => {
        const isHorizontal = position.value === 'left' || position.value === 'right';
        const isOppositeHorizontal = position.value === 'right';
        const isOppositeVertical = position.value === 'bottom';
        const size = elementSize.value ?? layoutSize.value;
        const unit = size === 0 ? '%' : 'px';
        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? 'X' : 'Y'}(${(active.value ? 0 : -(size === 0 ? 100 : size)) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}${unit})`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? 'absolute' : 'fixed',
          ...(transitionsEnabled.value ? undefined : {
            transition: 'none'
          })
        };
        if (!isMounted.value) return styles;
        const item = items.value[index.value];
        if (!item) consoleWarn(`[Vuetify] Could not find layout item "${id}"`);
        const overlap = computedOverlaps.value.get(id);
        if (overlap) {
          item[overlap.position] += overlap.amount;
        }
        return {
          ...styles,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : undefined,
          left: isOppositeHorizontal ? undefined : `${item.left}px`,
          right: isOppositeHorizontal ? `${item.right}px` : undefined,
          top: position.value !== 'bottom' ? `${item.top}px` : undefined,
          bottom: position.value !== 'top' ? `${item.bottom}px` : undefined,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : undefined
        };
      });
      const layoutItemScrimStyles = computed(() => ({
        zIndex: zIndex.value - 1
      }));
      return {
        layoutItemStyles,
        layoutItemScrimStyles,
        zIndex
      };
    },
    unregister: id => {
      priorities.delete(id);
      positions.delete(id);
      layoutSizes.delete(id);
      activeItems.delete(id);
      disabledTransitions.delete(id);
      registered.value = registered.value.filter(v => v !== id);
    },
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex
  });
  const layoutClasses = toRef(() => ['v-layout', {
    'v-layout--full-height': props.fullHeight
  }]);
  const layoutStyles = toRef(() => ({
    zIndex: parentLayout ? rootZIndex.value : undefined,
    position: parentLayout ? 'relative' : undefined,
    overflow: parentLayout ? 'hidden' : undefined
  }));
  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutRef: resizeRef
  };
}

// Utilities

// Types

function useToggleScope(source, fn) {
  let scope;
  function start() {
    scope = effectScope();
    scope.run(() => fn.length ? fn(() => {
      scope?.stop();
      start();
    }) : fn());
  }
  watch(source, active => {
    if (active && !scope) {
      start();
    } else if (!active) {
      scope?.stop();
      scope = undefined;
    }
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    scope?.stop();
  });
}

// Composables

// Types

// Composables
function useProxiedModel(props, prop, defaultValue) {
  let transformIn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : v => v;
  let transformOut = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : v => v;
  const vm = getCurrentInstance('useProxiedModel');
  const internal = ref(props[prop] !== undefined ? props[prop] : defaultValue);
  const kebabProp = toKebabCase(prop);
  const checkKebab = kebabProp !== prop;
  const isControlled = checkKebab ? computed(() => {
    void props[prop];
    return !!((vm.vnode.props?.hasOwnProperty(prop) || vm.vnode.props?.hasOwnProperty(kebabProp)) && (vm.vnode.props?.hasOwnProperty(`onUpdate:${prop}`) || vm.vnode.props?.hasOwnProperty(`onUpdate:${kebabProp}`)));
  }) : computed(() => {
    void props[prop];
    return !!(vm.vnode.props?.hasOwnProperty(prop) && vm.vnode.props?.hasOwnProperty(`onUpdate:${prop}`));
  });
  useToggleScope(() => !isControlled.value, () => {
    watch(() => props[prop], val => {
      internal.value = val;
    });
  });
  const model = computed({
    get() {
      const externalValue = props[prop];
      return transformIn(isControlled.value ? externalValue : internal.value);
    },
    set(internalValue) {
      const newValue = transformOut(internalValue);
      const value = toRaw(isControlled.value ? props[prop] : internal.value);
      if (value === newValue || transformIn(value) === internalValue) {
        return;
      }
      internal.value = newValue;
      vm?.emit(`update:${prop}`, newValue);
    }
  });
  Object.defineProperty(model, 'externalValue', {
    get: () => isControlled.value ? props[prop] : internal.value
  });
  return model;
}

var en = {
  badge: 'Badge',
  open: 'Open',
  close: 'Close',
  dismiss: 'Dismiss',
  confirmEdit: {
    ok: 'OK',
    cancel: 'Cancel'
  },
  dataIterator: {
    noResultsText: 'No matching records found',
    loadingText: 'Loading items...'
  },
  dataTable: {
    itemsPerPageText: 'Rows per page:',
    ariaLabel: {
      sortDescending: 'Sorted descending.',
      sortAscending: 'Sorted ascending.',
      sortNone: 'Not sorted.',
      activateNone: 'Activate to remove sorting.',
      activateDescending: 'Activate to sort descending.',
      activateAscending: 'Activate to sort ascending.'
    },
    sortBy: 'Sort by'
  },
  dataFooter: {
    itemsPerPageText: 'Items per page:',
    itemsPerPageAll: 'All',
    nextPage: 'Next page',
    prevPage: 'Previous page',
    firstPage: 'First page',
    lastPage: 'Last page',
    pageText: '{0}-{1} of {2}'
  },
  dateRangeInput: {
    divider: 'to'
  },
  datePicker: {
    itemsSelected: '{0} selected',
    range: {
      title: 'Select dates',
      header: 'Enter dates'
    },
    title: 'Select date',
    header: 'Enter date',
    input: {
      placeholder: 'Enter date'
    },
    ariaLabel: {
      previousMonth: 'Previous month',
      nextMonth: 'Next month',
      selectYear: 'Select year',
      selectDate: '{0}',
      // Full date format
      currentDate: 'Today, {0}'
    }
  },
  noDataText: 'No data available',
  carousel: {
    prev: 'Previous visual',
    next: 'Next visual',
    ariaLabel: {
      delimiter: 'Carousel slide {0} of {1}'
    }
  },
  calendar: {
    moreEvents: '{0} more',
    today: 'Today'
  },
  input: {
    clear: 'Clear {0}',
    prependAction: '{0} prepended action',
    appendAction: '{0} appended action',
    otp: 'Please enter OTP character {0}'
  },
  fileInput: {
    counter: '{0} files',
    counterSize: '{0} files ({1} in total)'
  },
  fileUpload: {
    title: 'Drag and drop files here',
    divider: 'or',
    browse: 'Browse Files'
  },
  timePicker: {
    am: 'AM',
    pm: 'PM',
    title: 'Select Time'
  },
  pagination: {
    ariaLabel: {
      root: 'Pagination Navigation',
      next: 'Next page',
      previous: 'Previous page',
      page: 'Go to page {0}',
      currentPage: 'Page {0}, Current page',
      first: 'First page',
      last: 'Last page'
    }
  },
  stepper: {
    next: 'Next',
    prev: 'Previous'
  },
  rating: {
    ariaLabel: {
      item: 'Rating {0} of {1}'
    }
  },
  loading: 'Loading...',
  infiniteScroll: {
    loadMore: 'Load more',
    empty: 'No more'
  },
  rules: {
    required: 'This field is required',
    email: 'Please enter a valid email',
    number: 'This field can only contain numbers',
    integer: 'This field can only contain integer values',
    capital: 'This field can only contain uppercase letters',
    maxLength: 'You must enter a maximum of {0} characters',
    minLength: 'You must enter a minimum of {0} characters',
    strictLength: 'The length of the entered field is invalid',
    exclude: 'The {0} character is not allowed',
    notEmpty: 'Please choose at least one value',
    pattern: 'Invalid format'
  },
  hotkey: {
    then: 'then',
    ctrl: 'Ctrl',
    command: 'Command',
    space: 'Space',
    shift: 'Shift',
    alt: 'Alt',
    enter: 'Enter',
    escape: 'Escape',
    upArrow: 'Up Arrow',
    downArrow: 'Down Arrow',
    leftArrow: 'Left Arrow',
    rightArrow: 'Right Arrow',
    backspace: 'Backspace',
    option: 'Option',
    plus: 'plus',
    shortcut: 'Keyboard shortcut: {0}'
  },
  video: {
    play: 'Play',
    pause: 'Pause',
    seek: 'Seek',
    volume: 'Volume',
    showVolume: 'Show volume control',
    mute: 'Mute',
    unmute: 'Unmute',
    enterFullscreen: 'Full screen',
    exitFullscreen: 'Exit full screen'
  },
  colorPicker: {
    ariaLabel: {
      eyedropper: 'Select color with eyedropper',
      hueSlider: 'Hue',
      alphaSlider: 'Alpha',
      redInput: 'Red value',
      greenInput: 'Green value',
      blueInput: 'Blue value',
      alphaInput: 'Alpha value',
      hueInput: 'Hue value',
      saturationInput: 'Saturation value',
      lightnessInput: 'Lightness value',
      hexInput: 'HEX value',
      hexaInput: 'HEX with alpha value',
      changeFormat: 'Change color format'
    }
  }
};

// Composables

// Types

const LANG_PREFIX = '$vuetify.';
const replace = (str, params) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    return String(params[Number(index)]);
  });
};
const createTranslateFunction = (current, fallback, messages) => {
  return function (key) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    if (!key.startsWith(LANG_PREFIX)) {
      return replace(key, params);
    }
    const shortKey = key.replace(LANG_PREFIX, '');
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];
    let str = getObjectValueByPath(currentLocale, shortKey, null);
    if (!str) {
      consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
      str = getObjectValueByPath(fallbackLocale, shortKey, null);
    }
    if (!str) {
      consoleError(`Translation key "${key}" not found in fallback`);
      str = key;
    }
    if (typeof str !== 'string') {
      consoleError(`Translation key "${key}" has a non-string value`);
      str = key;
    }
    return replace(str, params);
  };
};
function createNumberFunction(current, fallback) {
  return (value, options) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);
    return numberFormat.format(value);
  };
}
function inferDecimalSeparator(current, fallback) {
  const format = createNumberFunction(current, fallback);
  return format(0.1).includes(',') ? ',' : '.';
}
function useProvided(props, prop, provided) {
  const internal = useProxiedModel(props, prop, props[prop] ?? provided.value);

  // TODO: Remove when defaultValue works
  internal.value = props[prop] ?? provided.value;
  watch(provided, v => {
    if (props[prop] == null) {
      internal.value = provided.value;
    }
  });
  return internal;
}
function createProvideFunction(state) {
  return props => {
    const current = useProvided(props, 'locale', state.current);
    const fallback = useProvided(props, 'fallback', state.fallback);
    const messages = useProvided(props, 'messages', state.messages);
    return {
      name: 'vuetify',
      current,
      fallback,
      messages,
      decimalSeparator: toRef(() => inferDecimalSeparator(current, fallback)),
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback),
      provide: createProvideFunction({
        current,
        fallback,
        messages
      })
    };
  };
}
function createVuetifyAdapter(options) {
  const current = shallowRef(options?.locale ?? 'en');
  const fallback = shallowRef(options?.fallback ?? 'en');
  const messages = ref({
    en,
    ...options?.messages
  });
  return {
    name: 'vuetify',
    current,
    fallback,
    messages,
    decimalSeparator: toRef(() => options?.decimalSeparator ?? inferDecimalSeparator(current, fallback)),
    t: createTranslateFunction(current, fallback, messages),
    n: createNumberFunction(current, fallback),
    provide: createProvideFunction({
      current,
      fallback,
      messages
    })
  };
}

// Utilities

// Types

const LocaleSymbol = Symbol.for('vuetify:locale');
function isLocaleInstance(obj) {
  return obj.name != null;
}
function createLocale(options) {
  const i18n = options?.adapter && isLocaleInstance(options?.adapter) ? options?.adapter : createVuetifyAdapter(options);
  const rtl = createRtl(i18n, options);
  return {
    ...i18n,
    ...rtl
  };
}
function useLocale() {
  const locale = inject$1(LocaleSymbol);
  if (!locale) throw new Error('[Vuetify] Could not find injected locale instance');
  return locale;
}
function provideLocale(props) {
  const locale = inject$1(LocaleSymbol);
  if (!locale) throw new Error('[Vuetify] Could not find injected locale instance');
  const i18n = locale.provide(props);
  const rtl = provideRtl(i18n, locale.rtl, props);
  const data = {
    ...i18n,
    ...rtl
  };
  provide(LocaleSymbol, data);
  return data;
}
function genDefaults$2() {
  return {
    af: false,
    ar: true,
    bg: false,
    ca: false,
    ckb: false,
    cs: false,
    de: false,
    el: false,
    en: false,
    es: false,
    et: false,
    fa: true,
    fi: false,
    fr: false,
    hr: false,
    hu: false,
    he: true,
    id: false,
    it: false,
    ja: false,
    km: false,
    ko: false,
    lv: false,
    lt: false,
    nl: false,
    no: false,
    pl: false,
    pt: false,
    ro: false,
    ru: false,
    sk: false,
    sl: false,
    srCyrl: false,
    srLatn: false,
    sv: false,
    th: false,
    tr: false,
    az: false,
    uk: false,
    vi: false,
    zhHans: false,
    zhHant: false
  };
}
function createRtl(i18n, options) {
  const rtl = ref(options?.rtl ?? genDefaults$2());
  const isRtl = computed(() => rtl.value[i18n.current.value] ?? false);
  return {
    isRtl,
    rtl,
    rtlClasses: toRef(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`)
  };
}
function provideRtl(locale, rtl, props) {
  const isRtl = computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false);
  return {
    isRtl,
    rtl,
    rtlClasses: toRef(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`)
  };
}
function useRtl() {
  const locale = inject$1(LocaleSymbol);
  if (!locale) throw new Error('[Vuetify] Could not find injected rtl instance');
  return {
    isRtl: locale.isRtl,
    rtlClasses: locale.rtlClasses
  };
}

// Utilities

// Types

const ThemeSymbol = Symbol.for('vuetify:theme');
const makeThemeProps = propsFactory({
  theme: String
}, 'theme');
function genDefaults$1() {
  return {
    defaultTheme: 'light',
    prefix: 'v-',
    variations: {
      colors: [],
      lighten: 0,
      darken: 0
    },
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          'surface-bright': '#FFFFFF',
          'surface-light': '#EEEEEE',
          'surface-variant': '#424242',
          'on-surface-variant': '#EEEEEE',
          primary: '#1867C0',
          'primary-darken-1': '#1F5592',
          secondary: '#48A9A6',
          'secondary-darken-1': '#018786',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        },
        variables: {
          'border-color': '#000000',
          'border-opacity': 0.12,
          'high-emphasis-opacity': 0.87,
          'medium-emphasis-opacity': 0.60,
          'disabled-opacity': 0.38,
          'idle-opacity': 0.04,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'activated-opacity': 0.12,
          'pressed-opacity': 0.12,
          'dragged-opacity': 0.08,
          'theme-kbd': '#EEEEEE',
          'theme-on-kbd': '#000000',
          'theme-code': '#F5F5F5',
          'theme-on-code': '#000000'
        }
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#212121',
          'surface-bright': '#ccbfd6',
          'surface-light': '#424242',
          'surface-variant': '#c8c8c8',
          'on-surface-variant': '#000000',
          primary: '#2196F3',
          'primary-darken-1': '#277CC1',
          secondary: '#54B6B2',
          'secondary-darken-1': '#48A9A6',
          error: '#CF6679',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        },
        variables: {
          'border-color': '#FFFFFF',
          'border-opacity': 0.12,
          'high-emphasis-opacity': 1,
          'medium-emphasis-opacity': 0.70,
          'disabled-opacity': 0.50,
          'idle-opacity': 0.10,
          'hover-opacity': 0.04,
          'focus-opacity': 0.12,
          'selected-opacity': 0.08,
          'activated-opacity': 0.12,
          'pressed-opacity': 0.16,
          'dragged-opacity': 0.08,
          'theme-kbd': '#424242',
          'theme-on-kbd': '#FFFFFF',
          'theme-code': '#343434',
          'theme-on-code': '#CCCCCC'
        }
      }
    },
    stylesheetId: 'vuetify-theme-stylesheet',
    scoped: false,
    unimportant: false,
    utilities: true
  };
}
function parseThemeOptions() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : genDefaults$1();
  const defaults = genDefaults$1();
  if (!options) return {
    ...defaults,
    isDisabled: true
  };
  const themes = {};
  for (const [key, theme] of Object.entries(options.themes ?? {})) {
    const defaultTheme = theme.dark || key === 'dark' ? defaults.themes?.dark : defaults.themes?.light;
    themes[key] = mergeDeep(defaultTheme, theme);
  }
  return mergeDeep(defaults, {
    ...options,
    themes
  });
}
function createCssClass(lines, selector, content, scope) {
  lines.push(`${getScopedSelector(selector, scope)} {\n`, ...content.map(line => `  ${line};\n`), '}\n');
}
function genCssVariables(theme, prefix) {
  const lightOverlay = theme.dark ? 2 : 1;
  const darkOverlay = theme.dark ? 1 : 2;
  const variables = [];
  for (const [key, value] of Object.entries(theme.colors)) {
    const rgb = parseColor(value);
    variables.push(`--${prefix}theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`);
    if (!key.startsWith('on-')) {
      variables.push(`--${prefix}theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`);
    }
  }
  for (const [key, value] of Object.entries(theme.variables)) {
    const color = typeof value === 'string' && value.startsWith('#') ? parseColor(value) : undefined;
    const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined;
    variables.push(`--${prefix}${key}: ${rgb ?? value}`);
  }
  return variables;
}
function genVariation(name, color, variations) {
  const object = {};
  if (variations) {
    for (const variation of ['lighten', 'darken']) {
      const fn = variation === 'lighten' ? lighten : darken;
      for (const amount of createRange(variations[variation], 1)) {
        object[`${name}-${variation}-${amount}`] = RGBtoHex(fn(parseColor(color), amount));
      }
    }
  }
  return object;
}
function genVariations(colors, variations) {
  if (!variations) return {};
  let variationColors = {};
  for (const name of variations.colors) {
    const color = colors[name];
    if (!color) continue;
    variationColors = {
      ...variationColors,
      ...genVariation(name, color, variations)
    };
  }
  return variationColors;
}
function genOnColors(colors) {
  const onColors = {};
  for (const color of Object.keys(colors)) {
    if (color.startsWith('on-') || colors[`on-${color}`]) continue;
    const onColor = `on-${color}`;
    const colorVal = parseColor(colors[color]);
    onColors[onColor] = getForeground(colorVal);
  }
  return onColors;
}
function getScopedSelector(selector, scope) {
  if (!scope) return selector;
  const scopeSelector = `:where(${scope})`;
  return selector === ':root' ? scopeSelector : `${scopeSelector} ${selector}`;
}
function upsertStyles(id, cspNonce, styles) {
  const styleEl = getOrCreateStyleElement(id, cspNonce);
  if (!styleEl) return;
  styleEl.innerHTML = styles;
}
function getOrCreateStyleElement(id, cspNonce) {
  if (!IN_BROWSER) return null;
  let style = document.getElementById(id);
  if (!style) {
    style = document.createElement('style');
    style.id = id;
    style.type = 'text/css';
    if (cspNonce) style.setAttribute('nonce', cspNonce);
    document.head.appendChild(style);
  }
  return style;
}

// Composables
function createTheme(options) {
  const parsedOptions = parseThemeOptions(options);
  const _name = shallowRef(parsedOptions.defaultTheme);
  const themes = ref(parsedOptions.themes);
  const systemName = shallowRef('light');
  const name = computed({
    get() {
      return _name.value === 'system' ? systemName.value : _name.value;
    },
    set(val) {
      _name.value = val;
    }
  });
  const computedThemes = computed(() => {
    const acc = {};
    for (const [name, original] of Object.entries(themes.value)) {
      const colors = {
        ...original.colors,
        ...genVariations(original.colors, parsedOptions.variations)
      };
      acc[name] = {
        ...original,
        colors: {
          ...colors,
          ...genOnColors(colors)
        }
      };
    }
    return acc;
  });
  const current = toRef(() => computedThemes.value[name.value]);
  const isSystem = toRef(() => _name.value === 'system');
  const styles = computed(() => {
    const lines = [];
    const important = parsedOptions.unimportant ? '' : ' !important';
    const scoped = parsedOptions.scoped ? parsedOptions.prefix : '';
    if (current.value?.dark) {
      createCssClass(lines, ':root', ['color-scheme: dark'], parsedOptions.scope);
    }
    createCssClass(lines, ':root', genCssVariables(current.value, parsedOptions.prefix), parsedOptions.scope);
    for (const [themeName, theme] of Object.entries(computedThemes.value)) {
      createCssClass(lines, `.${parsedOptions.prefix}theme--${themeName}`, [`color-scheme: ${theme.dark ? 'dark' : 'normal'}`, ...genCssVariables(theme, parsedOptions.prefix)], parsedOptions.scope);
    }
    if (parsedOptions.utilities) {
      const bgLines = [];
      const fgLines = [];
      const colors = new Set(Object.values(computedThemes.value).flatMap(theme => Object.keys(theme.colors)));
      for (const key of colors) {
        if (key.startsWith('on-')) {
          createCssClass(fgLines, `.${key}`, [`color: rgb(var(--${parsedOptions.prefix}theme-${key}))${important}`], parsedOptions.scope);
        } else {
          createCssClass(bgLines, `.${scoped}bg-${key}`, [`--${parsedOptions.prefix}theme-overlay-multiplier: var(--${parsedOptions.prefix}theme-${key}-overlay-multiplier)`, `background-color: rgb(var(--${parsedOptions.prefix}theme-${key}))${important}`, `color: rgb(var(--${parsedOptions.prefix}theme-on-${key}))${important}`], parsedOptions.scope);
          createCssClass(fgLines, `.${scoped}text-${key}`, [`color: rgb(var(--${parsedOptions.prefix}theme-${key}))${important}`], parsedOptions.scope);
          createCssClass(fgLines, `.${scoped}border-${key}`, [`--${parsedOptions.prefix}border-color: var(--${parsedOptions.prefix}theme-${key})`], parsedOptions.scope);
        }
      }
      lines.push(...bgLines, ...fgLines);
    }
    return lines.map((str, i) => i === 0 ? str : `    ${str}`).join('');
  });
  const themeClasses = toRef(() => parsedOptions.isDisabled ? undefined : `${parsedOptions.prefix}theme--${name.value}`);
  const themeNames = toRef(() => Object.keys(computedThemes.value));
  if (SUPPORTS_MATCH_MEDIA) {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    function updateSystemName() {
      systemName.value = media.matches ? 'dark' : 'light';
    }
    updateSystemName();
    media.addEventListener('change', updateSystemName, {
      passive: true
    });
    if (getCurrentScope()) {
      onScopeDispose(() => {
        media.removeEventListener('change', updateSystemName);
      });
    }
  }
  function install(app) {
    if (parsedOptions.isDisabled) return;
    const head = app._context.provides.usehead;
    if (head) {
      function getHead() {
        return {
          style: [{
            textContent: styles.value,
            id: parsedOptions.stylesheetId,
            nonce: parsedOptions.cspNonce || false
          }]
        };
      }
      if (head.push) {
        const entry = head.push(getHead);
        if (IN_BROWSER) {
          watch(styles, () => {
            entry.patch(getHead);
          });
        }
      } else {
        if (IN_BROWSER) {
          head.addHeadObjs(toRef(getHead));
          watchEffect(() => head.updateDOM());
        } else {
          head.addHeadObjs(getHead());
        }
      }
    } else {
      if (IN_BROWSER) {
        watch(styles, updateStyles, {
          immediate: true
        });
      } else {
        updateStyles();
      }
      function updateStyles() {
        upsertStyles(parsedOptions.stylesheetId, parsedOptions.cspNonce, styles.value);
      }
    }
  }
  function change(themeName) {
    if (themeName !== 'system' && !themeNames.value.includes(themeName)) {
      consoleWarn(`Theme "${themeName}" not found on the Vuetify theme instance`);
      return;
    }
    name.value = themeName;
  }
  function cycle() {
    let themeArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : themeNames.value;
    const currentIndex = themeArray.indexOf(name.value);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themeArray.length;
    change(themeArray[nextIndex]);
  }
  function toggle() {
    let themeArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['light', 'dark'];
    cycle(themeArray);
  }
  const globalName = new Proxy(name, {
    get(target, prop) {
      return Reflect.get(target, prop);
    },
    set(target, prop, val) {
      if (prop === 'value') {
        deprecate(`theme.global.name.value = ${val}`, `theme.change('${val}')`);
      }
      return Reflect.set(target, prop, val);
    }
  });
  return {
    install,
    change,
    cycle,
    toggle,
    isDisabled: parsedOptions.isDisabled,
    isSystem,
    name,
    themes,
    current,
    computedThemes,
    prefix: parsedOptions.prefix,
    themeClasses,
    styles,
    global: {
      name: globalName,
      current
    }
  };
}
function provideTheme(props) {
  getCurrentInstance('provideTheme');
  const theme = inject$1(ThemeSymbol, null);
  if (!theme) throw new Error('Could not find Vuetify theme injection');
  const name = toRef(() => props.theme ?? theme.name.value);
  const current = toRef(() => theme.themes.value[name.value]);
  const themeClasses = toRef(() => theme.isDisabled ? undefined : `${theme.prefix}theme--${name.value}`);
  const newTheme = {
    ...theme,
    name,
    current,
    themeClasses
  };
  provide(ThemeSymbol, newTheme);
  return newTheme;
}
function useTheme() {
  getCurrentInstance('useTheme');
  const theme = inject$1(ThemeSymbol, null);
  if (!theme) throw new Error('Could not find Vuetify theme injection');
  return theme;
}

const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...omit(makeLayoutProps(), ['fullHeight']),
  ...makeThemeProps()
}, 'VApp');
const VApp = genericComponent()({
  name: 'VApp',
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout({
      ...props,
      fullHeight: true
    });
    const {
      rtlClasses
    } = useRtl();
    useRender(() => createElementVNode("div", {
      "ref": layoutRef,
      "class": normalizeClass(['v-application', theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class]),
      "style": normalizeStyle([props.style])
    }, [createElementVNode("div", {
      "class": "v-application__wrap"
    }, [slots.default?.()])]));
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});

// Utilities

// Types

// Types

// Composables
const makeTagProps = propsFactory({
  tag: {
    type: [String, Object, Function],
    default: 'div'
  }
}, 'tag');

const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VToolbarTitle');
const VToolbarTitle = genericComponent()({
  name: 'VToolbarTitle',
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": normalizeClass(['v-toolbar-title', props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [hasText && createElementVNode("div", {
          "class": "v-toolbar-title__placeholder"
        }, [slots.text ? slots.text() : props.text, slots.default?.()])]
      });
    });
    return {};
  }
});

// Utilities

// Types

const makeTransitionProps$1 = propsFactory({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, 'transition');
function createCssTransition(name, origin, mode) {
  return genericComponent()({
    name,
    props: makeTransitionProps$1({
      mode,
      origin
    }),
    setup(props, _ref) {
      let {
        slots
      } = _ref;
      const functions = {
        onBeforeEnter(el) {
          if (props.origin) {
            el.style.transformOrigin = props.origin;
          }
        },
        onLeave(el) {
          if (props.leaveAbsolute) {
            const {
              offsetTop,
              offsetLeft,
              offsetWidth,
              offsetHeight
            } = el;
            el._transitionInitialStyles = {
              position: el.style.position,
              top: el.style.top,
              left: el.style.left,
              width: el.style.width,
              height: el.style.height
            };
            el.style.position = 'absolute';
            el.style.top = `${offsetTop}px`;
            el.style.left = `${offsetLeft}px`;
            el.style.width = `${offsetWidth}px`;
            el.style.height = `${offsetHeight}px`;
          }
          if (props.hideOnLeave) {
            el.style.setProperty('display', 'none', 'important');
          }
        },
        onAfterLeave(el) {
          if (props.leaveAbsolute && el?._transitionInitialStyles) {
            const {
              position,
              top,
              left,
              width,
              height
            } = el._transitionInitialStyles;
            delete el._transitionInitialStyles;
            el.style.position = position || '';
            el.style.top = top || '';
            el.style.left = left || '';
            el.style.width = width || '';
            el.style.height = height || '';
          }
        }
      };
      return () => {
        const tag = props.group ? TransitionGroup : Transition;
        return h(tag, {
          name: props.disabled ? '' : name,
          css: !props.disabled,
          ...(props.group ? undefined : {
            mode: props.mode
          }),
          ...(props.disabled ? {} : functions)
        }, slots.default);
      };
    }
  });
}
function createJavascriptTransition(name, functions) {
  let mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'in-out';
  return genericComponent()({
    name,
    props: {
      mode: {
        type: String,
        default: mode
      },
      disabled: {
        type: Boolean,
        default: PREFERS_REDUCED_MOTION()
      },
      group: Boolean
    },
    setup(props, _ref2) {
      let {
        slots
      } = _ref2;
      const tag = props.group ? TransitionGroup : Transition;
      return () => {
        return h(tag, {
          name: props.disabled ? '' : name,
          css: !props.disabled,
          // mode: props.mode, // TODO: vuejs/vue-next#3104
          ...(props.disabled ? {} : functions)
        }, slots.default);
      };
    }
  });
}

// Utilities
function ExpandTransitionGenerator () {
  let expandedParentClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const sizeProperty = x ? 'width' : 'height';
  const offsetProperty = camelize(`offset-${sizeProperty}`);
  return {
    onBeforeEnter(el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
    },
    onEnter(el) {
      const initialStyle = el._initialStyle;
      if (!initialStyle) return;
      el.style.setProperty('transition', 'none', 'important');
      // Hide overflow to account for collapsed margins in the calculated height
      el.style.overflow = 'hidden';
      const offset = `${el[offsetProperty]}px`;
      el.style[sizeProperty] = '0';
      void el.offsetHeight; // force reflow

      el.style.transition = initialStyle.transition;
      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass);
      }
      requestAnimationFrame(() => {
        el.style[sizeProperty] = offset;
      });
    },
    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,
    onLeave(el) {
      el._initialStyle = {
        transition: '',
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      };
      el.style.overflow = 'hidden';
      el.style[sizeProperty] = `${el[offsetProperty]}px`;
      void el.offsetHeight; // force reflow

      requestAnimationFrame(() => el.style[sizeProperty] = '0');
    },
    onAfterLeave,
    onLeaveCancelled: onAfterLeave
  };
  function onAfterLeave(el) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass);
    }
    resetStyles(el);
  }
  function resetStyles(el) {
    if (!el._initialStyle) return;
    const size = el._initialStyle[sizeProperty];
    el.style.overflow = el._initialStyle.overflow;
    if (size != null) el.style[sizeProperty] = size;
    delete el._initialStyle;
  }
}

// Utilities

// Types

const makeVDialogTransitionProps = propsFactory({
  target: [Object, Array]
}, 'v-dialog-transition');
const saved = new WeakMap();
const VDialogTransition = genericComponent()({
  name: 'VDialogTransition',
  props: makeVDialogTransitionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const functions = {
      onBeforeEnter(el) {
        el.style.pointerEvents = 'none';
        el.style.visibility = 'hidden';
      },
      async onEnter(el, done) {
        await new Promise(resolve => requestAnimationFrame(resolve));
        await new Promise(resolve => requestAnimationFrame(resolve));
        el.style.visibility = '';
        const dimensions = getDimensions(props.target, el);
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = dimensions;
        saved.set(el, dimensions);
        if (PREFERS_REDUCED_MOTION()) {
          animate(el, [{
            opacity: 0
          }, {}], {
            duration: 125 * speed,
            easing: deceleratedEasing
          }).finished.then(() => done());
        } else {
          const animation = animate(el, [{
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }, {}], {
            duration: 225 * speed,
            easing: deceleratedEasing
          });
          getChildren(el)?.forEach(el => {
            animate(el, [{
              opacity: 0
            }, {
              opacity: 0,
              offset: 0.33
            }, {}], {
              duration: 225 * 2 * speed,
              easing: standardEasing
            });
          });
          animation.finished.then(() => done());
        }
      },
      onAfterEnter(el) {
        el.style.removeProperty('pointer-events');
      },
      onBeforeLeave(el) {
        el.style.pointerEvents = 'none';
      },
      async onLeave(el, done) {
        await new Promise(resolve => requestAnimationFrame(resolve));
        let dimensions;
        if (!saved.has(el) || Array.isArray(props.target) || props.target.offsetParent || props.target.getClientRects().length) {
          dimensions = getDimensions(props.target, el);
        } else {
          dimensions = saved.get(el);
        }
        const {
          x,
          y,
          sx,
          sy,
          speed
        } = dimensions;
        if (PREFERS_REDUCED_MOTION()) {
          animate(el, [{}, {
            opacity: 0
          }], {
            duration: 85 * speed,
            easing: acceleratedEasing
          }).finished.then(() => done());
        } else {
          const animation = animate(el, [{}, {
            transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
            opacity: 0
          }], {
            duration: 125 * speed,
            easing: acceleratedEasing
          });
          animation.finished.then(() => done());
          getChildren(el)?.forEach(el => {
            animate(el, [{}, {
              opacity: 0,
              offset: 0.2
            }, {
              opacity: 0
            }], {
              duration: 125 * 2 * speed,
              easing: standardEasing
            });
          });
        }
      },
      onAfterLeave(el) {
        el.style.removeProperty('pointer-events');
      }
    };
    return () => {
      return props.target ? createVNode(Transition, mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots) : createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }
});

/** Animatable children (card, sheet, list) */
function getChildren(el) {
  const els = el.querySelector(':scope > .v-card, :scope > .v-sheet, :scope > .v-list')?.children;
  return els && [...els];
}
function getDimensions(target, el) {
  const targetBox = getTargetBox(target);
  const elBox = nullifyTransforms(el);
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(' ').map(v => parseFloat(v));
  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue('--v-overlay-anchor-origin').split(' ');
  let offsetX = targetBox.left + targetBox.width / 2;
  if (anchorSide === 'left' || anchorOffset === 'left') {
    offsetX -= targetBox.width / 2;
  } else if (anchorSide === 'right' || anchorOffset === 'right') {
    offsetX += targetBox.width / 2;
  }
  let offsetY = targetBox.top + targetBox.height / 2;
  if (anchorSide === 'top' || anchorOffset === 'top') {
    offsetY -= targetBox.height / 2;
  } else if (anchorSide === 'bottom' || anchorOffset === 'bottom') {
    offsetY += targetBox.height / 2;
  }
  const tsx = targetBox.width / elBox.width;
  const tsy = targetBox.height / elBox.height;
  const maxs = Math.max(1, tsx, tsy);
  const sx = tsx / maxs || 0;
  const sy = tsy / maxs || 0;

  // Animate elements larger than 12% of the screen area up to 1.5x slower
  const asa = elBox.width * elBox.height / (window.innerWidth * window.innerHeight);
  const speed = asa > 0.12 ? Math.min(1.5, (asa - 0.12) * 10 + 1) : 1;
  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top),
    sx,
    sy,
    speed
  };
}

// Component specific transitions
const VFabTransition = createCssTransition('fab-transition', 'center center', 'out-in');

// Generic transitions
const VDialogBottomTransition = createCssTransition('dialog-bottom-transition');
const VDialogTopTransition = createCssTransition('dialog-top-transition');
const VFadeTransition = createCssTransition('fade-transition');
const VScaleTransition = createCssTransition('scale-transition');
const VScrollXTransition = createCssTransition('scroll-x-transition');
const VScrollXReverseTransition = createCssTransition('scroll-x-reverse-transition');
const VScrollYTransition = createCssTransition('scroll-y-transition');
const VScrollYReverseTransition = createCssTransition('scroll-y-reverse-transition');
const VSlideXTransition = createCssTransition('slide-x-transition');
const VSlideXReverseTransition = createCssTransition('slide-x-reverse-transition');
const VSlideYTransition = createCssTransition('slide-y-transition');
const VSlideYReverseTransition = createCssTransition('slide-y-reverse-transition');

// Javascript transitions
const VExpandTransition = createJavascriptTransition('expand-transition', ExpandTransitionGenerator());
const VExpandXTransition = createJavascriptTransition('expand-x-transition', ExpandTransitionGenerator('', true));

// Composables

// Types

const makeVDefaultsProviderProps = propsFactory({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, 'VDefaultsProvider');
const VDefaultsProvider = genericComponent(false)({
  name: 'VDefaultsProvider',
  props: makeVDefaultsProviderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      defaults,
      disabled,
      reset,
      root,
      scoped
    } = toRefs(props);
    provideDefaults(defaults, {
      reset,
      root,
      scoped,
      disabled
    });
    return () => slots.default?.();
  }
});

// Utilities

// Types

// Composables
const makeDimensionProps = propsFactory({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, 'dimension');
function useDimension(props) {
  const dimensionStyles = computed(() => {
    const styles = {};
    const height = convertToUnit(props.height);
    const maxHeight = convertToUnit(props.maxHeight);
    const maxWidth = convertToUnit(props.maxWidth);
    const minHeight = convertToUnit(props.minHeight);
    const minWidth = convertToUnit(props.minWidth);
    const width = convertToUnit(props.width);
    if (height != null) styles.height = height;
    if (maxHeight != null) styles.maxHeight = maxHeight;
    if (maxWidth != null) styles.maxWidth = maxWidth;
    if (minHeight != null) styles.minHeight = minHeight;
    if (minWidth != null) styles.minWidth = minWidth;
    if (width != null) styles.width = width;
    return styles;
  });
  return {
    dimensionStyles
  };
}

function useAspectStyles(props) {
  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio);
      return ratio ? {
        paddingBottom: String(1 / ratio * 100) + '%'
      } : undefined;
    })
  };
}
const makeVResponsiveProps = propsFactory({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, 'VResponsive');
const VResponsive = genericComponent()({
  name: 'VResponsive',
  props: makeVResponsiveProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      aspectStyles
    } = useAspectStyles(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(['v-responsive', {
        'v-responsive--inline': props.inline
      }, props.class]),
      "style": normalizeStyle([dimensionStyles.value, props.style])
    }, [createElementVNode("div", {
      "class": "v-responsive__sizer",
      "style": normalizeStyle(aspectStyles.value)
    }, null), slots.additional?.(), slots.default && createElementVNode("div", {
      "class": normalizeClass(['v-responsive__content', props.contentClass])
    }, [slots.default()])]));
    return {};
  }
});

// Utilities

// Types

// Composables
function useColor(colors) {
  return destructComputed(() => {
    const {
      class: colorClasses,
      style: colorStyles
    } = computeColor(colors);
    return {
      colorClasses,
      colorStyles
    };
  });
}
function useTextColor(color) {
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles
  } = useColor(() => ({
    text: toValue(color)
  }));
  return {
    textColorClasses,
    textColorStyles
  };
}
function useBackgroundColor(color) {
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles
  } = useColor(() => ({
    background: toValue(color)
  }));
  return {
    backgroundColorClasses,
    backgroundColorStyles
  };
}
function computeColor(colors) {
  const _colors = toValue(colors);
  const classes = [];
  const styles = {};
  if (_colors.background) {
    if (isCssColor(_colors.background)) {
      styles.backgroundColor = _colors.background;
      if (!_colors.text && isParsableColor(_colors.background)) {
        const backgroundColor = parseColor(_colors.background);
        if (backgroundColor.a == null || backgroundColor.a === 1) {
          const textColor = getForeground(backgroundColor);
          styles.color = textColor;
          styles.caretColor = textColor;
        }
      }
    } else {
      classes.push(`bg-${_colors.background}`);
    }
  }
  if (_colors.text) {
    if (isCssColor(_colors.text)) {
      styles.color = _colors.text;
      styles.caretColor = _colors.text;
    } else {
      classes.push(`text-${_colors.text}`);
    }
  }
  return {
    class: classes,
    style: styles
  };
}

// Utilities

// Types

// Composables
const makeRoundedProps = propsFactory({
  rounded: {
    type: [Boolean, Number, String],
    default: undefined
  },
  tile: Boolean
}, 'rounded');
function useRounded(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const roundedClasses = computed(() => {
    const rounded = isRef(props) ? props.value : props.rounded;
    const tile = isRef(props) ? false : props.tile;
    const classes = [];
    if (tile || rounded === false) {
      classes.push('rounded-0');
    } else if (rounded === true || rounded === '') {
      classes.push(`${name}--rounded`);
    } else if (typeof rounded === 'string' || rounded === 0) {
      for (const value of String(rounded).split(' ')) {
        classes.push(`rounded-${value}`);
      }
    }
    return classes;
  });
  return {
    roundedClasses
  };
}

// Utilities

// Types

const makeTransitionProps = propsFactory({
  transition: {
    type: null,
    default: 'fade-transition',
    validator: val => val !== true
  }
}, 'transition');
const MaybeTransition = (props, _ref) => {
  let {
    slots
  } = _ref;
  const {
    transition,
    disabled,
    group,
    ...rest
  } = props;
  const {
    component = group ? TransitionGroup : Transition,
    ...customProps
  } = isObject(transition) ? transition : {};
  let transitionProps;
  if (isObject(transition)) {
    transitionProps = mergeProps(customProps, onlyDefinedProps({
      disabled,
      group
    }), rest);
  } else {
    transitionProps = mergeProps({
      name: disabled || !transition ? '' : transition
    }, rest);
  }
  return h(component, transitionProps, slots);
};

// Utilities

// Types

function mounted$5(el, binding) {
  if (!SUPPORTS_INTERSECTION) return;
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    handler,
    options
  } = typeof value === 'object' ? value : {
    handler: value,
    options: {}
  };
  const observer = new IntersectionObserver(function () {
    let entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let observer = arguments.length > 1 ? arguments[1] : undefined;
    const _observe = el._observe?.[binding.instance.$.uid];
    if (!_observe) return; // Just in case, should never fire

    const isIntersecting = entries.some(entry => entry.isIntersecting);

    // If is not quiet or has already been
    // initted, invoke the user callback
    if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) {
      handler(isIntersecting, entries, observer);
    }
    if (isIntersecting && modifiers.once) unmounted$5(el, binding);else _observe.init = true;
  }, options);
  el._observe = Object(el._observe);
  el._observe[binding.instance.$.uid] = {
    init: false,
    observer
  };
  observer.observe(el);
}
function unmounted$5(el, binding) {
  const observe = el._observe?.[binding.instance.$.uid];
  if (!observe) return;
  observe.observer.unobserve(el);
  delete el._observe[binding.instance.$.uid];
}
const Intersect = {
  mounted: mounted$5,
  unmounted: unmounted$5
};

// Types

// not intended for public use, this is passed in by vuetify-loader

const makeVImgProps = propsFactory({
  absolute: Boolean,
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: undefined
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: undefined,
      rootMargin: undefined,
      threshold: undefined
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ''
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...makeVResponsiveProps(),
  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeTransitionProps()
}, 'VImg');
const VImg = genericComponent()({
  name: 'VImg',
  directives: {
    vIntersect: Intersect
  },
  props: makeVImgProps(),
  emits: {
    loadstart: value => true,
    load: value => true,
    error: value => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      roundedClasses
    } = useRounded(props);
    const vm = getCurrentInstance('VImg');
    const currentSrc = shallowRef(''); // Set from srcset
    const image = ref();
    const state = shallowRef(props.eager ? 'loading' : 'idle');
    const naturalWidth = shallowRef();
    const naturalHeight = shallowRef();
    const normalisedSrc = computed(() => {
      return props.src && typeof props.src === 'object' ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect || 0)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    watch(() => props.src, () => {
      init(state.value !== 'idle');
    });
    watch(aspectRatio, (val, oldVal) => {
      if (!val && oldVal && image.value) {
        pollForSize(image.value);
      }
    });

    // TODO: getSrc when window width changes

    onBeforeMount(() => init());
    function init(isIntersecting) {
      if (props.eager && isIntersecting) return;
      if (SUPPORTS_INTERSECTION && !isIntersecting && !props.eager) return;
      state.value = 'loading';
      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
      if (!normalisedSrc.value.src) return;
      nextTick(() => {
        emit('loadstart', image.value?.currentSrc || normalisedSrc.value.src);
        setTimeout(() => {
          if (vm.isUnmounted) return;
          if (image.value?.complete) {
            if (!image.value.naturalWidth) {
              onError();
            }
            if (state.value === 'error') return;
            if (!aspectRatio.value) pollForSize(image.value, null);
            if (state.value === 'loading') onLoad();
          } else {
            if (!aspectRatio.value) pollForSize(image.value);
            getSrc();
          }
        });
      });
    }
    function onLoad() {
      if (vm.isUnmounted) return;
      getSrc();
      pollForSize(image.value);
      state.value = 'loaded';
      emit('load', image.value?.currentSrc || normalisedSrc.value.src);
    }
    function onError() {
      if (vm.isUnmounted) return;
      state.value = 'error';
      emit('error', image.value?.currentSrc || normalisedSrc.value.src);
    }
    function getSrc() {
      const img = image.value;
      if (img) currentSrc.value = img.currentSrc || img.src;
    }
    let timer = -1;
    onBeforeUnmount(() => {
      clearTimeout(timer);
    });
    function pollForSize(img) {
      let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      const poll = () => {
        clearTimeout(timer);
        if (vm.isUnmounted) return;
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;
        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === 'loading' && timeout != null) {
          timer = window.setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith('.svg') || img.currentSrc.startsWith('data:image/svg+xml')) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };
      poll();
    }
    const containClasses = toRef(() => ({
      'v-img__img--cover': props.cover,
      'v-img__img--contain': !props.cover
    }));
    const __image = () => {
      if (!normalisedSrc.value.src || state.value === 'idle') return null;
      const img = createElementVNode("img", {
        "class": normalizeClass(['v-img__img', containClasses.value]),
        "style": {
          objectPosition: props.position
        },
        "crossorigin": props.crossorigin,
        "src": normalisedSrc.value.src,
        "srcset": normalisedSrc.value.srcset,
        "alt": props.alt,
        "referrerpolicy": props.referrerpolicy,
        "draggable": props.draggable,
        "sizes": props.sizes,
        "ref": image,
        "onLoad": onLoad,
        "onError": onError
      }, null);
      const sources = slots.sources?.();
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [withDirectives(sources ? createElementVNode("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vShow, state.value === 'loaded']])]
      });
    };
    const __preloadImage = () => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== 'loaded' && createElementVNode("img", {
        "class": normalizeClass(['v-img__img', 'v-img__img--preload', containClasses.value]),
        "style": {
          objectPosition: props.position
        },
        "crossorigin": props.crossorigin,
        "src": normalisedSrc.value.lazySrc,
        "alt": props.alt,
        "referrerpolicy": props.referrerpolicy,
        "draggable": props.draggable
      }, null)]
    });
    const __placeholder = () => {
      if (!slots.placeholder) return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === 'loading' || state.value === 'error' && !slots.error) && createElementVNode("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      });
    };
    const __error = () => {
      if (!slots.error) return null;
      return createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === 'error' && createElementVNode("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      });
    };
    const __gradient = () => {
      if (!props.gradient) return null;
      return createElementVNode("div", {
        "class": "v-img__gradient",
        "style": {
          backgroundImage: `linear-gradient(${props.gradient})`
        }
      }, null);
    };
    const isBooted = shallowRef(false);
    {
      const stop = watch(aspectRatio, val => {
        if (val) {
          // Doesn't work with nextTick, idk why
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true;
            });
          });
          stop();
        }
      });
    }
    useRender(() => {
      const responsiveProps = VResponsive.filterProps(props);
      return withDirectives(createVNode(VResponsive, mergeProps({
        "class": ['v-img', {
          'v-img--absolute': props.absolute,
          'v-img--booting': !isBooted.value
        }, backgroundColorClasses.value, roundedClasses.value, props.class],
        "style": [{
          width: convertToUnit(props.width === 'auto' ? naturalWidth.value : props.width)
        }, backgroundColorStyles.value, props.style]
      }, responsiveProps, {
        "aspectRatio": aspectRatio.value,
        "aria-label": props.alt,
        "role": props.alt ? 'img' : undefined
      }), {
        additional: () => createElementVNode(Fragment, null, [createVNode(__image, null, null), createVNode(__preloadImage, null, null), createVNode(__gradient, null, null), createVNode(__placeholder, null, null), createVNode(__error, null, null)]),
        default: slots.default
      }), [[Intersect, {
        handler: init,
        options: props.options
      }, null, {
        once: true
      }]]);
    });
    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight
    };
  }
});

// Utilities

// Types

// Composables
const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, 'border');
function useBorder(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const borderClasses = computed(() => {
    const border = props.border;
    if (border === true || border === '') {
      return `${name}--border`;
    } else if (typeof border === 'string' || border === 0) {
      return String(border).split(' ').map(v => `border-${v}`);
    }
    return [];
  });
  return {
    borderClasses
  };
}

// Utilities

// Types

// Composables
const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 &&
      // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }
  }
}, 'elevation');
function useElevation(props) {
  const elevationClasses = toRef(() => {
    const elevation = isRef(props) ? props.value : props.elevation;
    if (elevation == null) return [];
    return [`elevation-${elevation}`];
  });
  return {
    elevationClasses
  };
}

// Types

const allowedDensities$1 = [null, 'prominent', 'default', 'comfortable', 'compact'];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  color: String,
  density: {
    type: String,
    default: 'default',
    validator: v => allowedDensities$1.includes(v)
  },
  extended: {
    type: Boolean,
    default: null
  },
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: 'header'
  }),
  ...makeThemeProps()
}, 'VToolbar');
const VToolbar = genericComponent()({
  name: 'VToolbar',
  props: makeVToolbarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(props.extended === null ? !!slots.extension?.() : props.extended);
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === 'prominent' ? Number(props.height) : 0) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === 'prominent' ? Number(props.extensionHeight) : 0) - (props.density === 'comfortable' ? 4 : 0) - (props.density === 'compact' ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: 'text'
      }
    });
    useRender(() => {
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = slots.extension?.();
      isExtended.value = props.extended === null ? !!extension : props.extended;
      return createVNode(props.tag, {
        "class": normalizeClass(['v-toolbar', {
          'v-toolbar--absolute': props.absolute,
          'v-toolbar--collapse': props.collapse,
          'v-toolbar--flat': props.flat,
          'v-toolbar--floating': props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, props.style])
      }, {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => [createElementVNode("div", {
            "class": "v-toolbar__content",
            "style": {
              height: convertToUnit(contentHeight.value)
            }
          }, [slots.prepend && createElementVNode("div", {
            "class": "v-toolbar__prepend"
          }, [slots.prepend?.()]), hasTitle && createVNode(VToolbarTitle, {
            "key": "title",
            "text": props.title
          }, {
            text: slots.title
          }), slots.default?.(), slots.append && createElementVNode("div", {
            "class": "v-toolbar__append"
          }, [slots.append?.()])])]
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createElementVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});

// Utilities

// Types

// Composables
const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, 'scroll');
function useScroll(props) {
  let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    canScroll
  } = args;
  let previousScroll = 0;
  let previousScrollHeight = 0;
  const target = ref(null);
  const currentScroll = shallowRef(0);
  const savedScroll = shallowRef(0);
  const currentThreshold = shallowRef(0);
  const isScrollActive = shallowRef(false);
  const isScrollingUp = shallowRef(false);
  const scrollThreshold = computed(() => {
    return Number(props.scrollThreshold);
  });

  /**
   * 1: at top
   * 0: at threshold
   */
  const scrollRatio = computed(() => {
    return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
  });
  const onScroll = () => {
    const targetEl = target.value;
    if (!targetEl || canScroll && !canScroll.value) return;
    previousScroll = currentScroll.value;
    currentScroll.value = 'window' in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
    const currentScrollHeight = targetEl instanceof Window ? document.documentElement.scrollHeight : targetEl.scrollHeight;
    if (previousScrollHeight !== currentScrollHeight) {
      previousScrollHeight = currentScrollHeight;
      return;
    }
    isScrollingUp.value = currentScroll.value < previousScroll;
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
  };
  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value;
  });
  watch(isScrollActive, () => {
    savedScroll.value = 0;
  });
  onMounted(() => {
    watch(() => props.scrollTarget, scrollTarget => {
      const newTarget = scrollTarget ? document.querySelector(scrollTarget) : window;
      if (!newTarget) {
        consoleWarn(`Unable to locate element with identifier ${scrollTarget}`);
        return;
      }
      if (newTarget === target.value) return;
      target.value?.removeEventListener('scroll', onScroll);
      target.value = newTarget;
      target.value.addEventListener('scroll', onScroll, {
        passive: true
      });
    }, {
      immediate: true
    });
  });
  onBeforeUnmount(() => {
    target.value?.removeEventListener('scroll', onScroll);
  });

  // Do we need this? If yes - seems that
  // there's no need to expose onScroll
  canScroll && watch(canScroll, onScroll, {
    immediate: true
  });
  return {
    scrollThreshold,
    currentScroll,
    currentThreshold,
    isScrollActive,
    scrollRatio,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll
  };
}

// Utilities

// Composables
function useSsrBoot() {
  const isBooted = shallowRef(false);
  onMounted(() => {
    window.requestAnimationFrame(() => {
      isBooted.value = true;
    });
  });
  const ssrBootStyles = toRef(() => !isBooted.value ? {
    transition: 'none !important'
  } : undefined);
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted)
  };
}

// Types

const makeVAppBarProps = propsFactory({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    default: 'top',
    validator: value => ['top', 'bottom'].includes(value)
  },
  ...makeVToolbarProps(),
  ...makeLayoutItemProps(),
  ...makeScrollProps(),
  height: {
    type: [Number, String],
    default: 64
  }
}, 'VAppBar');
const VAppBar = genericComponent()({
  name: 'VAppBar',
  props: makeVAppBarProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, 'modelValue');
    const scrollBehavior = computed(() => {
      const behavior = new Set(props.scrollBehavior?.split(' ') ?? []);
      return {
        hide: behavior.has('hide'),
        fullyHide: behavior.has('fully-hide'),
        inverted: behavior.has('inverted'),
        collapse: behavior.has('collapse'),
        elevate: behavior.has('elevate'),
        fadeImage: behavior.has('fade-image')
        // shrink: behavior.has('shrink'),
      };
    });
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value;
      return behavior.hide || behavior.fullyHide || behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage ||
      // behavior.shrink ||
      !isActive.value;
    });
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio
    } = useScroll(props, {
      canScroll
    });
    const canHide = toRef(() => scrollBehavior.value.hide || scrollBehavior.value.fullyHide);
    const isCollapsed = computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
    const isFlat = computed(() => props.flat || scrollBehavior.value.fullyHide && !isActive.value || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
    const opacity = computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : undefined);
    const height = computed(() => {
      if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0;
      const height = vToolbarRef.value?.contentHeight ?? 0;
      const extensionHeight = vToolbarRef.value?.extensionHeight ?? 0;
      if (!canHide.value) return height + extensionHeight;
      return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide ? height + extensionHeight : height;
    });
    useToggleScope(() => !!props.scrollBehavior, () => {
      watchEffect(() => {
        if (canHide.value) {
          if (scrollBehavior.value.inverted) {
            isActive.value = currentScroll.value > scrollThreshold.value;
          } else {
            isActive.value = isScrollingUp.value || currentScroll.value < scrollThreshold.value;
          }
        } else {
          isActive.value = true;
        }
      });
    });
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(() => props.location),
      layoutSize: height,
      elementSize: shallowRef(undefined),
      active: isActive,
      absolute: toRef(() => props.absolute)
    });
    useRender(() => {
      const toolbarProps = VToolbar.filterProps(props);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ['v-app-bar', {
          'v-app-bar--bottom': props.location === 'bottom'
        }, props.class],
        "style": [{
          ...layoutItemStyles.value,
          '--v-toolbar-image-opacity': opacity.value,
          height: undefined,
          ...ssrBootStyles.value
        }, props.style]
      }, toolbarProps, {
        "collapse": isCollapsed.value,
        "flat": isFlat.value
      }), slots);
    });
    return {};
  }
});

// Utilities

// Types

const allowedDensities = [null, 'default', 'comfortable', 'compact'];

// typeof allowedDensities[number] evaluates to any
// when generating api types for whatever reason.

// Composables
const makeDensityProps = propsFactory({
  density: {
    type: String,
    default: 'default',
    validator: v => allowedDensities.includes(v)
  }
}, 'density');
function useDensity(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const densityClasses = toRef(() => {
    return `${name}--density-${props.density}`;
  });
  return {
    densityClasses
  };
}

// Types

const allowedVariants$2 = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'];
function genOverlays(isClickable, name) {
  return createElementVNode(Fragment, null, [isClickable && createElementVNode("span", {
    "key": "overlay",
    "class": normalizeClass(`${name}__overlay`)
  }, null), createElementVNode("span", {
    "key": "underlay",
    "class": normalizeClass(`${name}__underlay`)
  }, null)]);
}
const makeVariantProps = propsFactory({
  color: String,
  variant: {
    type: String,
    default: 'elevated',
    validator: v => allowedVariants$2.includes(v)
  }
}, 'variant');
function useVariant(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const variantClasses = toRef(() => {
    const {
      variant
    } = toValue(props);
    return `${name}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = useColor(() => {
    const {
      variant,
      color
    } = toValue(props);
    return {
      [['elevated', 'flat'].includes(variant) ? 'background' : 'text']: color
    };
  });
  return {
    colorClasses,
    colorStyles,
    variantClasses
  };
}

// Types

const makeVBtnGroupProps = propsFactory({
  baseColor: String,
  divided: Boolean,
  direction: {
    type: String,
    default: 'horizontal'
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps()
}, 'VBtnGroup');
const VBtnGroup = genericComponent()({
  name: 'VBtnGroup',
  props: makeVBtnGroupProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBtn: {
        height: toRef(() => props.direction === 'horizontal' ? 'auto' : null),
        baseColor: toRef(() => props.baseColor),
        color: toRef(() => props.color),
        density: toRef(() => props.density),
        flat: true,
        variant: toRef(() => props.variant)
      }
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": normalizeClass(['v-btn-group', `v-btn-group--${props.direction}`, {
          'v-btn-group--divided': props.divided
        }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class]),
        "style": normalizeStyle(props.style)
      }, slots);
    });
  }
});

// Composables

// Types

const makeGroupProps = propsFactory({
  modelValue: {
    type: null,
    default: undefined
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, 'group');
const makeGroupItemProps = propsFactory({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, 'group-item');

// Composables

function useGroupItem(props, injectKey) {
  let required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const vm = getCurrentInstance('useGroupItem');
  if (!vm) {
    throw new Error('[Vuetify] useGroupItem composable must be used inside a component setup function');
  }
  const id = useId();
  provide(Symbol.for(`${injectKey.description}:id`), id);
  const group = inject$1(injectKey, null);
  if (!group) {
    if (!required) return group;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
  }
  const value = toRef(() => props.value);
  const disabled = computed(() => !!(group.disabled.value || props.disabled));
  group.register({
    id,
    value,
    disabled
  }, vm);
  onBeforeUnmount(() => {
    group.unregister(id);
  });
  const isSelected = computed(() => {
    return group.isSelected(id);
  });
  const isFirst = computed(() => {
    return group.items.value[0].id === id;
  });
  const isLast = computed(() => {
    return group.items.value[group.items.value.length - 1].id === id;
  });
  const selectedClass = computed(() => isSelected.value && [group.selectedClass.value, props.selectedClass]);
  watch(isSelected, value => {
    vm.emit('group:selected', {
      value
    });
  }, {
    flush: 'sync'
  });
  return {
    id,
    isSelected,
    isFirst,
    isLast,
    toggle: () => group.select(id, !isSelected.value),
    select: value => group.select(id, value),
    selectedClass,
    value,
    disabled,
    group
  };
}
function useGroup(props, injectKey) {
  let isUnmounted = false;
  const items = reactive([]);
  const selected = useProxiedModel(props, 'modelValue', [], v => {
    if (v == null) return [];
    return getIds(items, wrapInArray(v));
  }, v => {
    const arr = getValues(items, v);
    return props.multiple ? arr : arr[0];
  });
  const groupVm = getCurrentInstance('useGroup');
  function register(item, vm) {
    // Is there a better way to fix this typing?
    const unwrapped = item;
    const key = Symbol.for(`${injectKey.description}:id`);
    const children = findChildrenWithProvide(key, groupVm?.vnode);
    const index = children.indexOf(vm);
    if (unref(unwrapped.value) == null) {
      unwrapped.value = index;
      unwrapped.useIndexAsValue = true;
    }
    if (index > -1) {
      items.splice(index, 0, unwrapped);
    } else {
      items.push(unwrapped);
    }
  }
  function unregister(id) {
    if (isUnmounted) return;

    // TODO: re-evaluate this line's importance in the future
    // should we only modify the model if mandatory is set.
    // selected.value = selected.value.filter(v => v !== id)

    forceMandatoryValue();
    const index = items.findIndex(item => item.id === id);
    items.splice(index, 1);
  }

  // If mandatory and nothing is selected, then select first non-disabled item
  function forceMandatoryValue() {
    const item = items.find(item => !item.disabled);
    if (item && props.mandatory === 'force' && !selected.value.length) {
      selected.value = [item.id];
    }
  }
  onMounted(() => {
    forceMandatoryValue();
  });
  onBeforeUnmount(() => {
    isUnmounted = true;
  });
  onUpdated(() => {
    // #19655 update the items that use the index as the value.
    for (let i = 0; i < items.length; i++) {
      if (items[i].useIndexAsValue) {
        items[i].value = i;
      }
    }
  });
  function select(id, value) {
    const item = items.find(item => item.id === id);
    if (value && item?.disabled) return;
    if (props.multiple) {
      const internalValue = selected.value.slice();
      const index = internalValue.findIndex(v => v === id);
      const isSelected = ~index;
      value = value ?? !isSelected;

      // We can't remove value if group is
      // mandatory, value already exists,
      // and it is the only value
      if (isSelected && props.mandatory && internalValue.length <= 1) return;

      // We can't add value if it would
      // cause max limit to be exceeded
      if (!isSelected && props.max != null && internalValue.length + 1 > props.max) return;
      if (index < 0 && value) internalValue.push(id);else if (index >= 0 && !value) internalValue.splice(index, 1);
      selected.value = internalValue;
    } else {
      const isSelected = selected.value.includes(id);
      if (props.mandatory && isSelected) return;
      if (!isSelected && !value) return;
      selected.value = value ?? !isSelected ? [id] : [];
    }
  }
  function step(offset) {
    // getting an offset from selected value obviously won't work with multiple values
    if (props.multiple) consoleWarn('This method is not supported when using "multiple" prop');
    if (!selected.value.length) {
      const item = items.find(item => !item.disabled);
      item && (selected.value = [item.id]);
    } else {
      const currentId = selected.value[0];
      const currentIndex = items.findIndex(i => i.id === currentId);
      let newIndex = (currentIndex + offset) % items.length;
      let newItem = items[newIndex];
      while (newItem.disabled && newIndex !== currentIndex) {
        newIndex = (newIndex + offset) % items.length;
        newItem = items[newIndex];
      }
      if (newItem.disabled) return;
      selected.value = [items[newIndex].id];
    }
  }
  const state = {
    register,
    unregister,
    selected,
    select,
    disabled: toRef(() => props.disabled),
    prev: () => step(items.length - 1),
    next: () => step(1),
    isSelected: id => selected.value.includes(id),
    selectedClass: toRef(() => props.selectedClass),
    items: toRef(() => items),
    getItemIndex: value => getItemIndex(items, value)
  };
  provide(injectKey, state);
  return state;
}
function getItemIndex(items, value) {
  const ids = getIds(items, [value]);
  if (!ids.length) return -1;
  return items.findIndex(item => item.id === ids[0]);
}
function getIds(items, modelValue) {
  const ids = [];
  modelValue.forEach(value => {
    const item = items.find(item => deepEqual(value, item.value));
    const itemByIndex = items[value];
    if (item?.value != null) {
      ids.push(item.id);
    } else if (itemByIndex?.useIndexAsValue) {
      ids.push(itemByIndex.id);
    }
  });
  return ids;
}
function getValues(items, ids) {
  const values = [];
  ids.forEach(id => {
    const itemIndex = items.findIndex(item => item.id === id);
    if (~itemIndex) {
      const item = items[itemIndex];
      values.push(item.value != null ? item.value : itemIndex);
    }
  });
  return values;
}

// Types

const VBtnToggleSymbol = Symbol.for('vuetify:v-btn-toggle');
const makeVBtnToggleProps = propsFactory({
  ...makeVBtnGroupProps(),
  ...makeGroupProps()
}, 'VBtnToggle');
const VBtnToggle = genericComponent()({
  name: 'VBtnToggle',
  props: makeVBtnToggleProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      next,
      prev,
      select,
      selected
    } = useGroup(props, VBtnToggleSymbol);
    useRender(() => {
      const btnGroupProps = VBtnGroup.filterProps(props);
      return createVNode(VBtnGroup, mergeProps({
        "class": ['v-btn-toggle', props.class]
      }, btnGroupProps, {
        "style": props.style
      }), {
        default: () => [slots.default?.({
          isSelected,
          next,
          prev,
          select,
          selected
        })]
      });
    });
    return {
      next,
      prev,
      select
    };
  }
});

// Utilities

// Types
const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large'];
// Composables
const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: 'default'
  }
}, 'size');
function useSize(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  return destructComputed(() => {
    const size = props.size;
    let sizeClasses;
    let sizeStyles;
    if (includes(predefinedSizes, size)) {
      sizeClasses = `${name}--size-${size}`;
    } else if (size) {
      sizeStyles = {
        width: convertToUnit(size),
        height: convertToUnit(size)
      };
    }
    return {
      sizeClasses,
      sizeStyles
    };
  });
}

const makeVIconProps = propsFactory({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  opacity: [String, Number],
  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: 'i'
  }),
  ...makeThemeProps()
}, 'VIcon');
const VIcon = genericComponent()({
  name: 'VIcon',
  props: makeVIconProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const slotIcon = shallowRef();
    const {
      themeClasses
    } = useTheme();
    const {
      iconData
    } = useIcon(() => slotIcon.value || props.icon);
    const {
      sizeClasses
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    useRender(() => {
      const slotValue = slots.default?.();
      if (slotValue) {
        slotIcon.value = flattenFragments(slotValue).filter(node => node.type === Text && node.children && typeof node.children === 'string')[0]?.children;
      }
      const hasClick = !!(attrs.onClick || attrs.onClickOnce);
      return createVNode(iconData.value.component, {
        "tag": props.tag,
        "icon": iconData.value.icon,
        "class": normalizeClass(['v-icon', 'notranslate', themeClasses.value, sizeClasses.value, textColorClasses.value, {
          'v-icon--clickable': hasClick,
          'v-icon--disabled': props.disabled,
          'v-icon--start': props.start,
          'v-icon--end': props.end
        }, props.class]),
        "style": normalizeStyle([{
          '--v-icon-opacity': props.opacity
        }, !sizeClasses.value ? {
          fontSize: convertToUnit(props.size),
          height: convertToUnit(props.size),
          width: convertToUnit(props.size)
        } : undefined, textColorStyles.value, props.style]),
        "role": hasClick ? 'button' : undefined,
        "aria-hidden": !hasClick,
        "tabindex": hasClick ? props.disabled ? -1 : 0 : undefined
      }, {
        default: () => [slotValue]
      });
    });
    return {};
  }
});

// Utilities
function useIntersectionObserver(callback, options) {
  const intersectionRef = ref();
  const isIntersecting = shallowRef(false);
  if (SUPPORTS_INTERSECTION) {
    const observer = new IntersectionObserver(entries => {
      isIntersecting.value = !!entries.find(entry => entry.isIntersecting);
    }, options);
    onScopeDispose(() => {
      observer.disconnect();
    });
    watch(intersectionRef, (newValue, oldValue) => {
      if (oldValue) {
        observer.unobserve(oldValue);
        isIntersecting.value = false;
      }
      if (newValue) observer.observe(newValue);
    }, {
      flush: 'post'
    });
  }
  return {
    intersectionRef,
    isIntersecting
  };
}

// Types

const makeVProgressCircularProps = propsFactory({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: 'div'
  }),
  ...makeThemeProps()
}, 'VProgressCircular');
const VProgressCircular = genericComponent()({
  name: 'VProgressCircular',
  props: makeVProgressCircularProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const MAGIC_RADIUS_CONSTANT = 20;
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
    const root = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles
    } = useTextColor(() => props.bgColor);
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const normalizedValue = toRef(() => clamp(parseFloat(props.modelValue), 0, 100));
    const width = toRef(() => Number(props.width));
    const size = toRef(() => {
      // Get size from element if size prop value is small, large etc
      return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
    });
    const diameter = toRef(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
    const strokeWidth = toRef(() => width.value / size.value * diameter.value);
    const strokeDashOffset = toRef(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
    watchEffect(() => {
      intersectionRef.value = root.value;
      resizeRef.value = root.value;
    });
    useRender(() => createVNode(props.tag, {
      "ref": root,
      "class": normalizeClass(['v-progress-circular', {
        'v-progress-circular--indeterminate': !!props.indeterminate,
        'v-progress-circular--visible': isIntersecting.value,
        'v-progress-circular--disable-shrink': props.indeterminate && (props.indeterminate === 'disable-shrink' || PREFERS_REDUCED_MOTION())
      }, themeClasses.value, sizeClasses.value, textColorClasses.value, props.class]),
      "style": normalizeStyle([sizeStyles.value, textColorStyles.value, props.style]),
      "role": "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": props.indeterminate ? undefined : normalizedValue.value
    }, {
      default: () => [createElementVNode("svg", {
        "style": {
          transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
        },
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": `0 0 ${diameter.value} ${diameter.value}`
      }, [createElementVNode("circle", {
        "class": normalizeClass(['v-progress-circular__underlay', underlayColorClasses.value]),
        "style": normalizeStyle(underlayColorStyles.value),
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": 0
      }, null), createElementVNode("circle", {
        "class": "v-progress-circular__overlay",
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": strokeDashOffset.value
      }, null)]), slots.default && createElementVNode("div", {
        "class": "v-progress-circular__content"
      }, [slots.default({
        value: normalizedValue.value
      })])]
    }));
    return {};
  }
});

// Composables

// Types

const oppositeMap = {
  center: 'center',
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
};
const makeLocationProps = propsFactory({
  location: String
}, 'location');
function useLocation(props) {
  let opposite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let offset = arguments.length > 2 ? arguments[2] : undefined;
  const {
    isRtl
  } = useRtl();
  const locationStyles = computed(() => {
    if (!props.location) return {};
    const {
      side,
      align
    } = parseAnchor(props.location.split(' ').length > 1 ? props.location : `${props.location} center`, isRtl.value);
    function getOffset(side) {
      return offset ? offset(side) : 0;
    }
    const styles = {};
    if (side !== 'center') {
      if (opposite) styles[oppositeMap[side]] = `calc(100% - ${getOffset(side)}px)`;else styles[side] = 0;
    }
    if (align !== 'center') {
      if (opposite) styles[oppositeMap[align]] = `calc(100% - ${getOffset(align)}px)`;else styles[align] = 0;
    } else {
      if (side === 'center') styles.top = styles.left = '50%';else {
        styles[{
          top: 'left',
          bottom: 'left',
          left: 'top',
          right: 'top'
        }[side]] = '50%';
      }
      styles.transform = {
        top: 'translateX(-50%)',
        bottom: 'translateX(-50%)',
        left: 'translateY(-50%)',
        right: 'translateY(-50%)',
        center: 'translate(-50%, -50%)'
      }[side];
    }
    return styles;
  });
  return {
    locationStyles
  };
}

// Utilities

// Types

// Composables
const makeChunksProps = propsFactory({
  chunkCount: {
    type: [Number, String],
    default: null
  },
  chunkWidth: {
    type: [Number, String],
    default: null
  },
  chunkGap: {
    type: [Number, String],
    default: 4
  }
}, 'chunks');
function useChunks(props, containerWidth) {
  const hasChunks = toRef(() => !!props.chunkCount || !!props.chunkWidth);
  const chunkWidth = computed(() => {
    const containerSize = toValue(containerWidth);
    if (!containerSize) {
      return 0;
    }
    if (!props.chunkCount) {
      return Number(props.chunkWidth);
    }
    const count = Number(props.chunkCount);
    const availableWidth = containerSize - Number(props.chunkGap) * (count - 1);
    return availableWidth / count;
  });
  const chunkGap = toRef(() => Number(props.chunkGap));
  const chunksMaskStyles = computed(() => {
    if (!hasChunks.value) {
      return {};
    }
    const chunkGapPx = convertToUnit(chunkGap.value);
    const chunkWidthPx = convertToUnit(chunkWidth.value);
    return {
      maskRepeat: 'repeat-x',
      maskImage: `linear-gradient(90deg, #000, #000 ${chunkWidthPx}, transparent ${chunkWidthPx}, transparent)`,
      maskSize: `calc(${chunkWidthPx} + ${chunkGapPx}) 100%`
    };
  });
  function snapValueToChunk(val) {
    const containerSize = toValue(containerWidth);
    if (!containerSize) {
      return val;
    }
    const gapRelativeSize = 100 * chunkGap.value / containerSize;
    const chunkRelativeSize = 100 * (chunkWidth.value + chunkGap.value) / containerSize;
    const filledChunks = Math.floor((val + gapRelativeSize) / chunkRelativeSize);
    return clamp(0, filledChunks * chunkRelativeSize - gapRelativeSize / 2, 100);
  }
  return {
    hasChunks,
    chunksMaskStyles,
    snapValueToChunk
  };
}

const makeVProgressLinearProps = propsFactory({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: true
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  bufferColor: String,
  bufferOpacity: [Number, String],
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  opacity: [Number, String],
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...makeChunksProps(),
  ...makeComponentProps(),
  ...makeLocationProps({
    location: 'top'
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, 'VProgressLinear');
const VProgressLinear = genericComponent()({
  name: 'VProgressLinear',
  props: makeVProgressLinearProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const root = ref();
    const progress = useProxiedModel(props, 'modelValue');
    const {
      isRtl,
      rtlClasses
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor || props.color);
    const {
      backgroundColorClasses: bufferColorClasses,
      backgroundColorStyles: bufferColorStyles
    } = useBackgroundColor(() => props.bufferColor || props.bgColor || props.color);
    const {
      backgroundColorClasses: barColorClasses,
      backgroundColorStyles: barColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const max = computed(() => parseFloat(props.max));
    const height = computed(() => parseFloat(props.height));
    const normalizedBuffer = computed(() => clamp(parseFloat(props.bufferValue) / max.value * 100, 0, 100));
    const normalizedValue = computed(() => clamp(parseFloat(progress.value) / max.value * 100, 0, 100));
    const isReversed = computed(() => isRtl.value !== props.reverse);
    const transition = computed(() => props.indeterminate ? 'fade-transition' : 'slide-x-transition');
    const containerWidth = shallowRef(0);
    const {
      hasChunks,
      chunksMaskStyles,
      snapValueToChunk
    } = useChunks(props, containerWidth);
    useToggleScope(hasChunks, () => {
      const {
        resizeRef
      } = useResizeObserver(entries => containerWidth.value = entries[0].contentRect.width);
      watchEffect(() => resizeRef.value = root.value);
    });
    const bufferWidth = computed(() => {
      return hasChunks.value ? snapValueToChunk(normalizedBuffer.value) : normalizedBuffer.value;
    });
    const barWidth = computed(() => {
      return hasChunks.value ? snapValueToChunk(normalizedValue.value) : normalizedValue.value;
    });
    function handleClick(e) {
      if (!intersectionRef.value) return;
      const {
        left,
        right,
        width
      } = intersectionRef.value.getBoundingClientRect();
      const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
      progress.value = Math.round(value / width * max.value);
    }
    watchEffect(() => {
      intersectionRef.value = root.value;
    });
    useRender(() => createVNode(props.tag, {
      "ref": root,
      "class": normalizeClass(['v-progress-linear', {
        'v-progress-linear--absolute': props.absolute,
        'v-progress-linear--active': props.active && isIntersecting.value,
        'v-progress-linear--reverse': isReversed.value,
        'v-progress-linear--rounded': props.rounded,
        'v-progress-linear--rounded-bar': props.roundedBar,
        'v-progress-linear--striped': props.striped,
        'v-progress-linear--clickable': props.clickable
      }, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class]),
      "style": normalizeStyle([{
        bottom: props.location === 'bottom' ? 0 : undefined,
        top: props.location === 'top' ? 0 : undefined,
        height: props.active ? convertToUnit(height.value) : 0,
        '--v-progress-linear-height': convertToUnit(height.value),
        ...(props.absolute ? locationStyles.value : {})
      }, chunksMaskStyles.value, props.style]),
      "role": "progressbar",
      "aria-hidden": props.active ? 'false' : 'true',
      "aria-valuemin": "0",
      "aria-valuemax": props.max,
      "aria-valuenow": props.indeterminate ? undefined : Math.min(parseFloat(progress.value), max.value),
      "onClick": props.clickable && handleClick
    }, {
      default: () => [props.stream && createElementVNode("div", {
        "key": "stream",
        "class": normalizeClass(['v-progress-linear__stream', textColorClasses.value]),
        "style": {
          ...textColorStyles.value,
          [isReversed.value ? 'left' : 'right']: convertToUnit(-height.value),
          borderTop: `${convertToUnit(height.value / 2)} dotted`,
          opacity: parseFloat(props.bufferOpacity),
          top: `calc(50% - ${convertToUnit(height.value / 4)})`,
          width: convertToUnit(100 - normalizedBuffer.value, '%'),
          '--v-progress-linear-stream-to': convertToUnit(height.value * (isReversed.value ? 1 : -1))
        }
      }, null), createElementVNode("div", {
        "class": normalizeClass(['v-progress-linear__background', backgroundColorClasses.value]),
        "style": normalizeStyle([backgroundColorStyles.value, {
          opacity: parseFloat(props.bgOpacity),
          width: props.stream ? 0 : undefined
        }])
      }, null), createElementVNode("div", {
        "class": normalizeClass(['v-progress-linear__buffer', bufferColorClasses.value]),
        "style": normalizeStyle([bufferColorStyles.value, {
          opacity: parseFloat(props.bufferOpacity),
          width: convertToUnit(bufferWidth.value, '%')
        }])
      }, null), createVNode(Transition, {
        "name": transition.value
      }, {
        default: () => [!props.indeterminate ? createElementVNode("div", {
          "class": normalizeClass(['v-progress-linear__determinate', barColorClasses.value]),
          "style": normalizeStyle([barColorStyles.value, {
            width: convertToUnit(barWidth.value, '%')
          }])
        }, null) : createElementVNode("div", {
          "class": "v-progress-linear__indeterminate"
        }, [['long', 'short'].map(bar => createElementVNode("div", {
          "key": bar,
          "class": normalizeClass(['v-progress-linear__indeterminate', bar, barColorClasses.value]),
          "style": normalizeStyle(barColorStyles.value)
        }, null))])]
      }), slots.default && createElementVNode("div", {
        "class": "v-progress-linear__content"
      }, [slots.default({
        value: normalizedValue.value,
        buffer: normalizedBuffer.value
      })])]
    }));
    return {};
  }
});

// Types

// Composables
const makeLoaderProps = propsFactory({
  loading: [Boolean, String]
}, 'loader');
function useLoader(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const loaderClasses = toRef(() => ({
    [`${name}--loading`]: props.loading
  }));
  return {
    loaderClasses
  };
}
function LoaderSlot(props, _ref) {
  let {
    slots
  } = _ref;
  return createElementVNode("div", {
    "class": normalizeClass(`${props.name}__loader`)
  }, [slots.default?.({
    color: props.color,
    isActive: props.active
  }) || createVNode(VProgressLinear, {
    "absolute": props.absolute,
    "active": props.active,
    "color": props.color,
    "height": "2",
    "indeterminate": true
  }, null)]);
}

// Utilities

// Types

const positionValues = ['static', 'relative', 'fixed', 'absolute', 'sticky'];
// Composables
const makePositionProps = propsFactory({
  position: {
    type: String,
    validator: /* istanbul ignore next */v => positionValues.includes(v)
  }
}, 'position');
function usePosition(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const positionClasses = toRef(() => {
    return props.position ? `${name}--${props.position}` : undefined;
  });
  return {
    positionClasses
  };
}

// Utilities

// Types

function useRoute() {
  const vm = getCurrentInstance('useRoute');
  return computed(() => vm?.proxy?.$route);
}
function useRouter() {
  return getCurrentInstance('useRouter')?.proxy?.$router;
}
function useLink(props, attrs) {
  const RouterLink = resolveDynamicComponent('RouterLink');
  const isLink = toRef(() => !!(props.href || props.to));
  const isClickable = computed(() => {
    return isLink?.value || hasEvent(attrs, 'click') || hasEvent(props, 'click');
  });
  if (typeof RouterLink === 'string' || !('useLink' in RouterLink)) {
    const href = toRef(() => props.href);
    return {
      isLink,
      isClickable,
      href,
      linkProps: reactive({
        href
      })
    };
  }

  // vue-router useLink `to` prop needs to be reactive and useLink will crash if undefined
  const routerLink = RouterLink.useLink({
    to: toRef(() => props.to || ''),
    replace: toRef(() => props.replace)
  });
  // Actual link needs to be undefined when to prop is not used
  const link = computed(() => props.to ? routerLink : undefined);
  const route = useRoute();
  const isActive = computed(() => {
    if (!link.value) return false;
    if (!props.exact) return link.value.isActive?.value ?? false;
    if (!route.value) return link.value.isExactActive?.value ?? false;
    return link.value.isExactActive?.value && deepEqual(link.value.route.value.query, route.value.query);
  });
  const href = computed(() => props.to ? link.value?.route.value.href : props.href);
  return {
    isLink,
    isClickable,
    isActive,
    route: link.value?.route,
    navigate: link.value?.navigate,
    href,
    linkProps: reactive({
      href,
      'aria-current': toRef(() => isActive.value ? 'page' : undefined)
    })
  };
}
const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, 'router');
let inTransition = false;
function useBackButton(router, cb) {
  let popped = false;
  let removeBefore;
  let removeAfter;
  if (IN_BROWSER && router?.beforeEach) {
    nextTick(() => {
      window.addEventListener('popstate', onPopstate);
      removeBefore = router.beforeEach((to, from, next) => {
        if (!inTransition) {
          setTimeout(() => popped ? cb(next) : next());
        } else {
          popped ? cb(next) : next();
        }
        inTransition = true;
      });
      removeAfter = router?.afterEach(() => {
        inTransition = false;
      });
    });
    onScopeDispose(() => {
      window.removeEventListener('popstate', onPopstate);
      removeBefore?.();
      removeAfter?.();
    });
  }
  function onPopstate(e) {
    if (e.state?.replaced) return;
    popped = true;
    setTimeout(() => popped = false);
  }
}

// Utilities

// Types

function useSelectLink(link, select) {
  watch(() => link.isActive?.value, isActive => {
    if (link.isLink.value && isActive != null && select) {
      nextTick(() => {
        select(isActive);
      });
    }
  }, {
    immediate: true
  });
}

// Styles

// Types

const stopSymbol = Symbol('rippleStop');
const DELAY_RIPPLE = 80;
function transform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
}
function isTouchEvent(e) {
  return e.constructor.name === 'TouchEvent';
}
function isKeyboardEvent(e) {
  return e.constructor.name === 'KeyboardEvent';
}
const calculate = function (e, el) {
  let value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let localX = 0;
  let localY = 0;
  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    localX = target.clientX - offset.left;
    localY = target.clientY - offset.top;
  }
  let radius = 0;
  let scale = 0.3;
  if (el._ripple?.circle) {
    scale = 0.15;
    radius = el.clientWidth / 2;
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
  }
  const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
  const x = value.center ? centerX : `${localX - radius}px`;
  const y = value.center ? centerY : `${localY - radius}px`;
  return {
    radius,
    scale,
    x,
    y,
    centerX,
    centerY
  };
};
const ripples = {
  /* eslint-disable max-statements */
  show(e, el) {
    let value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!el?._ripple?.enabled) {
      return;
    }
    const container = document.createElement('span');
    const animation = document.createElement('span');
    container.appendChild(animation);
    container.className = 'v-ripple__container';
    if (value.class) {
      container.className += ` ${value.class}`;
    }
    const {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    } = calculate(e, el, value);
    const size = `${radius * 2}px`;
    animation.className = 'v-ripple__animation';
    animation.style.width = size;
    animation.style.height = size;
    el.appendChild(container);
    const computed = window.getComputedStyle(el);
    if (computed && computed.position === 'static') {
      el.style.position = 'relative';
      el.dataset.previousPosition = 'static';
    }
    animation.classList.add('v-ripple__animation--enter');
    animation.classList.add('v-ripple__animation--visible');
    transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
    animation.dataset.activated = String(performance.now());
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        animation.classList.remove('v-ripple__animation--enter');
        animation.classList.add('v-ripple__animation--in');
        transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      });
    });
  },
  hide(el) {
    if (!el?._ripple?.enabled) return;
    const ripples = el.getElementsByClassName('v-ripple__animation');
    if (ripples.length === 0) return;
    const animation = Array.from(ripples).findLast(ripple => !ripple.dataset.isHiding);
    if (!animation) return;else animation.dataset.isHiding = 'true';
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--in');
      animation.classList.add('v-ripple__animation--out');
      setTimeout(() => {
        const ripples = el.getElementsByClassName('v-ripple__animation');
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition;
          delete el.dataset.previousPosition;
        }
        if (animation.parentNode?.parentNode === el) el.removeChild(animation.parentNode);
      }, 300);
    }, delay);
  }
};
function isRippleEnabled(value) {
  return typeof value === 'undefined' || !!value;
}
function rippleShow(e) {
  const value = {};
  const element = e.currentTarget;
  if (!element?._ripple || element._ripple.touched || e[stopSymbol]) return;

  // Don't allow the event to trigger ripples on any other elements
  e[stopSymbol] = true;
  if (isTouchEvent(e)) {
    element._ripple.touched = true;
    element._ripple.isTouch = true;
  } else {
    // It's possible for touch events to fire
    // as mouse events on Android/iOS, this
    // will skip the event call if it has
    // already been registered as touch
    if (element._ripple.isTouch) return;
  }
  value.center = element._ripple.centered || isKeyboardEvent(e);
  if (element._ripple.class) {
    value.class = element._ripple.class;
  }
  if (isTouchEvent(e)) {
    // already queued that shows or hides the ripple
    if (element._ripple.showTimerCommit) return;
    element._ripple.showTimerCommit = () => {
      ripples.show(e, element, value);
    };
    element._ripple.showTimer = window.setTimeout(() => {
      if (element?._ripple?.showTimerCommit) {
        element._ripple.showTimerCommit();
        element._ripple.showTimerCommit = null;
      }
    }, DELAY_RIPPLE);
  } else {
    ripples.show(e, element, value);
  }
}
function rippleStop(e) {
  e[stopSymbol] = true;
}
function rippleHide(e) {
  const element = e.currentTarget;
  if (!element?._ripple) return;
  window.clearTimeout(element._ripple.showTimer);

  // The touch interaction occurs before the show timer is triggered.
  // We still want to show ripple effect.
  if (e.type === 'touchend' && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit();
    element._ripple.showTimerCommit = null;

    // re-queue ripple hiding
    element._ripple.showTimer = window.setTimeout(() => {
      rippleHide(e);
    });
    return;
  }
  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false;
    }
  });
  ripples.hide(element);
}
function rippleCancelShow(e) {
  const element = e.currentTarget;
  if (!element?._ripple) return;
  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null;
  }
  window.clearTimeout(element._ripple.showTimer);
}
let keyboardRipple = false;
function keyboardRippleShow(e, keys) {
  if (!keyboardRipple && keys.includes(e.key)) {
    keyboardRipple = true;
    rippleShow(e);
  }
}
function keyboardRippleHide(e) {
  keyboardRipple = false;
  rippleHide(e);
}
function focusRippleHide(e) {
  if (keyboardRipple) {
    keyboardRipple = false;
    rippleHide(e);
  }
}
function updateRipple(el, binding, wasEnabled) {
  const {
    value,
    modifiers
  } = binding;
  const enabled = isRippleEnabled(value);
  if (!enabled) {
    ripples.hide(el);
  }
  el._ripple = el._ripple ?? {};
  el._ripple.enabled = enabled;
  el._ripple.centered = modifiers.center;
  el._ripple.circle = modifiers.circle;
  const bindingValue = isObject(value) ? value : {};
  if (bindingValue.class) {
    el._ripple.class = bindingValue.class;
  }
  const allowedKeys = bindingValue.keys ?? ['Enter', 'Space'];
  el._ripple.keyDownHandler = e => keyboardRippleShow(e, allowedKeys);
  if (enabled && !wasEnabled) {
    if (modifiers.stop) {
      el.addEventListener('touchstart', rippleStop, {
        passive: true
      });
      el.addEventListener('mousedown', rippleStop);
      return;
    }
    el.addEventListener('touchstart', rippleShow, {
      passive: true
    });
    el.addEventListener('touchend', rippleHide, {
      passive: true
    });
    el.addEventListener('touchmove', rippleCancelShow, {
      passive: true
    });
    el.addEventListener('touchcancel', rippleHide);
    el.addEventListener('mousedown', rippleShow);
    el.addEventListener('mouseup', rippleHide);
    el.addEventListener('mouseleave', rippleHide);
    el.addEventListener('keydown', e => keyboardRippleShow(e, allowedKeys));
    el.addEventListener('keyup', keyboardRippleHide);
    el.addEventListener('blur', focusRippleHide);

    // Anchor tags can be dragged, causes other hides to fail - #1537
    el.addEventListener('dragstart', rippleHide, {
      passive: true
    });
  } else if (!enabled && wasEnabled) {
    removeListeners(el);
  }
}
function removeListeners(el) {
  el.removeEventListener('mousedown', rippleShow);
  el.removeEventListener('touchstart', rippleShow);
  el.removeEventListener('touchend', rippleHide);
  el.removeEventListener('touchmove', rippleCancelShow);
  el.removeEventListener('touchcancel', rippleHide);
  el.removeEventListener('mouseup', rippleHide);
  el.removeEventListener('mouseleave', rippleHide);
  if (el._ripple?.keyDownHandler) {
    el.removeEventListener('keydown', el._ripple.keyDownHandler);
  }
  el.removeEventListener('keyup', keyboardRippleHide);
  el.removeEventListener('dragstart', rippleHide);
  el.removeEventListener('blur', focusRippleHide);
}
function mounted$4(el, binding) {
  updateRipple(el, binding, false);
}
function unmounted$4(el) {
  removeListeners(el);
  delete el._ripple;
}
function updated$1(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }
  const wasEnabled = isRippleEnabled(binding.oldValue);
  updateRipple(el, binding, wasEnabled);
}
const Ripple = {
  mounted: mounted$4,
  unmounted: unmounted$4,
  updated: updated$1
};

// Types

const makeVBtnProps = propsFactory({
  active: {
    type: Boolean,
    default: undefined
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: VBtnToggleSymbol
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: IconValue,
  appendIcon: IconValue,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  spaced: String,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: {
    type: [String, Number, Boolean],
    default: undefined
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: 'button'
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'elevated'
  })
}, 'VBtn');
const VBtn = genericComponent()({
  name: 'VBtn',
  props: makeVBtnProps(),
  emits: {
    'group:selected': val => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    const group = useGroupItem(props, props.symbol, false);
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      if (props.active !== undefined) {
        return props.active;
      }
      if (link.isLink.value) {
        return link.isActive?.value;
      }
      return group?.isSelected.value;
    });
    const color = toRef(() => isActive.value ? props.activeColor ?? props.color : props.color);
    const variantProps = computed(() => {
      const showColor = group?.isSelected.value && (!link.isLink.value || link.isActive?.value) || !group || link.isActive?.value;
      return {
        color: showColor ? color.value ?? props.baseColor : props.baseColor,
        variant: props.variant
      };
    });
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const isDisabled = computed(() => group?.disabled.value || props.disabled);
    const isElevated = toRef(() => {
      return props.variant === 'elevated' && !(props.disabled || props.flat || props.border);
    });
    const valueAttr = computed(() => {
      if (props.value === undefined || typeof props.value === 'symbol') return undefined;
      return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
    });
    function onClick(e) {
      if (isDisabled.value || link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || attrs.target === '_blank')) return;
      link.navigate?.(e);
      group?.toggle();
    }
    useSelectLink(link, group?.select);
    useRender(() => {
      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasPrepend = !!(props.prependIcon || slots.prepend);
      const hasAppend = !!(props.appendIcon || slots.append);
      const hasIcon = !!(props.icon && props.icon !== true);
      return withDirectives(createVNode(Tag, mergeProps({
        "type": Tag === 'a' ? undefined : 'button',
        "class": ['v-btn', group?.selectedClass.value, {
          'v-btn--active': isActive.value,
          'v-btn--block': props.block,
          'v-btn--disabled': isDisabled.value,
          'v-btn--elevated': isElevated.value,
          'v-btn--flat': props.flat,
          'v-btn--icon': !!props.icon,
          'v-btn--loading': props.loading,
          'v-btn--readonly': props.readonly,
          'v-btn--slim': props.slim,
          'v-btn--stacked': props.stacked
        }, props.spaced ? ['v-btn--spaced', `v-btn--spaced-${props.spaced}`] : [], themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, sizeStyles.value, props.style],
        "aria-busy": props.loading ? true : undefined,
        "disabled": isDisabled.value || undefined,
        "tabindex": props.loading || props.readonly ? -1 : undefined,
        "onClick": onClick,
        "value": valueAttr.value
      }, link.linkProps), {
        default: () => [genOverlays(true, 'v-btn'), !props.icon && hasPrepend && createElementVNode("span", {
          "key": "prepend",
          "class": "v-btn__prepend"
        }, [!slots.prepend ? createVNode(VIcon, {
          "key": "prepend-icon",
          "icon": props.prependIcon
        }, null) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !props.prependIcon,
          "defaults": {
            VIcon: {
              icon: props.prependIcon
            }
          }
        }, slots.prepend)]), createElementVNode("span", {
          "class": "v-btn__content",
          "data-no-activator": ""
        }, [!slots.default && hasIcon ? createVNode(VIcon, {
          "key": "content-icon",
          "icon": props.icon
        }, null) : createVNode(VDefaultsProvider, {
          "key": "content-defaults",
          "disabled": !hasIcon,
          "defaults": {
            VIcon: {
              icon: props.icon
            }
          }
        }, {
          default: () => [slots.default?.() ?? toDisplayString(props.text)]
        })]), !props.icon && hasAppend && createElementVNode("span", {
          "key": "append",
          "class": "v-btn__append"
        }, [!slots.append ? createVNode(VIcon, {
          "key": "append-icon",
          "icon": props.appendIcon
        }, null) : createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !props.appendIcon,
          "defaults": {
            VIcon: {
              icon: props.appendIcon
            }
          }
        }, slots.append)]), !!props.loading && createElementVNode("span", {
          "key": "loader",
          "class": "v-btn__loader"
        }, [slots.loader?.() ?? createVNode(VProgressCircular, {
          "color": typeof props.loading === 'boolean' ? undefined : props.loading,
          "indeterminate": true,
          "width": "2"
        }, null)])]
      }), [[Ripple, !isDisabled.value && props.ripple, '', {
        center: !!props.icon
      }]]);
    });
    return {
      group
    };
  }
});

// Types

const makeVAppBarNavIconProps = propsFactory({
  ...omit(makeVBtnProps({
    icon: '$menu',
    variant: 'text'
  }), ['spaced'])
}, 'VAppBarNavIcon');
const VAppBarNavIcon = genericComponent()({
  name: 'VAppBarNavIcon',
  props: makeVAppBarNavIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VBtn, mergeProps(props, {
      "class": ['v-app-bar-nav-icon']
    }), slots));
    return {};
  }
});

// Types

const VAppBarTitle = genericComponent()({
  name: 'VAppBarTitle',
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VToolbarTitle, mergeProps(props, {
      "class": "v-app-bar-title"
    }), slots));
    return {};
  }
});

// Utilities
const VAlertTitle = createSimpleFunctional('v-alert-title');

// Utilities

// Types

// Types

// Composables
const makeIconSizeProps = propsFactory({
  iconSize: [Number, String],
  iconSizes: {
    type: Array,
    default: () => [['x-small', 10], ['small', 16], ['default', 24], ['large', 28], ['x-large', 32]]
  }
}, 'iconSize');
function useIconSizes(props, fallback) {
  const iconSize = computed(() => {
    const iconSizeMap = new Map(props.iconSizes);
    const _iconSize = props.iconSize ?? fallback() ?? 'default';
    return iconSizeMap.has(_iconSize) ? iconSizeMap.get(_iconSize) : _iconSize;
  });
  return {
    iconSize
  };
}

// Types

const allowedTypes = ['success', 'info', 'warning', 'error'];
const makeVAlertProps = propsFactory({
  border: {
    type: [Boolean, String],
    validator: val => {
      return typeof val === 'boolean' || ['top', 'end', 'bottom', 'start'].includes(val);
    }
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: '$close'
  },
  closeLabel: {
    type: String,
    default: '$vuetify.close'
  },
  icon: {
    type: [Boolean, String, Function, Object],
    default: null
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  prominent: Boolean,
  title: String,
  text: String,
  type: {
    type: String,
    validator: val => allowedTypes.includes(val)
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeIconSizeProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'flat'
  })
}, 'VAlert');
const VAlert = genericComponent()({
  name: 'VAlert',
  props: makeVAlertProps(),
  emits: {
    'click:close': e => true,
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const icon = toRef(() => {
      if (props.icon === false) return undefined;
      if (!props.type) return props.icon;
      return props.icon ?? `$${props.type}`;
    });
    const {
      iconSize
    } = useIconSizes(props, () => props.prominent ? 44 : undefined);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(() => ({
      color: props.color ?? props.type,
      variant: props.variant
    }));
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.borderColor);
    const {
      t
    } = useLocale();
    const closeProps = toRef(() => ({
      'aria-label': t(props.closeLabel),
      onClick(e) {
        isActive.value = false;
        emit('click:close', e);
      }
    }));
    return () => {
      const hasPrepend = !!(slots.prepend || icon.value);
      const hasTitle = !!(slots.title || props.title);
      const hasClose = !!(slots.close || props.closable);
      const iconProps = {
        density: props.density,
        icon: icon.value,
        size: props.iconSize || props.prominent ? iconSize.value : undefined
      };
      return isActive.value && createVNode(props.tag, {
        "class": normalizeClass(['v-alert', props.border && {
          'v-alert--border': !!props.border,
          [`v-alert--border-${props.border === true ? 'start' : props.border}`]: true
        }, {
          'v-alert--prominent': props.prominent
        }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class]),
        "style": normalizeStyle([colorStyles.value, dimensionStyles.value, locationStyles.value, props.style]),
        "role": "alert"
      }, {
        default: () => [genOverlays(false, 'v-alert'), props.border && createElementVNode("div", {
          "key": "border",
          "class": normalizeClass(['v-alert__border', textColorClasses.value]),
          "style": normalizeStyle(textColorStyles.value)
        }, null), hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-alert__prepend"
        }, [!slots.prepend ? createVNode(VIcon, mergeProps({
          "key": "prepend-icon"
        }, iconProps), null) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !icon.value,
          "defaults": {
            VIcon: {
              ...iconProps
            }
          }
        }, slots.prepend)]), createElementVNode("div", {
          "class": "v-alert__content"
        }, [hasTitle && createVNode(VAlertTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.() ?? props.title]
        }), slots.text?.() ?? props.text, slots.default?.()]), slots.append && createElementVNode("div", {
          "key": "append",
          "class": "v-alert__append"
        }, [slots.append()]), hasClose && createElementVNode("div", {
          "key": "close",
          "class": "v-alert__close"
        }, [!slots.close ? createVNode(VBtn, mergeProps({
          "key": "close-btn",
          "icon": props.closeIcon,
          "size": "x-small",
          "variant": "text"
        }, closeProps.value), null) : createVNode(VDefaultsProvider, {
          "key": "close-defaults",
          "defaults": {
            VBtn: {
              icon: props.closeIcon,
              size: 'x-small',
              variant: 'text'
            }
          }
        }, {
          default: () => [slots.close?.({
            props: closeProps.value
          })]
        })])]
      });
    };
  }
});

const makeVAvatarProps = propsFactory({
  start: Boolean,
  end: Boolean,
  icon: IconValue,
  image: String,
  text: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'flat'
  })
}, 'VAvatar');
const VAvatar = genericComponent()({
  name: 'VAvatar',
  props: makeVAvatarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-avatar', {
        'v-avatar--start': props.start,
        'v-avatar--end': props.end
      }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, props.class]),
      "style": normalizeStyle([colorStyles.value, sizeStyles.value, props.style])
    }, {
      default: () => [!slots.default ? props.image ? createVNode(VImg, {
        "key": "image",
        "src": props.image,
        "alt": "",
        "cover": true
      }, null) : props.icon ? createVNode(VIcon, {
        "key": "icon",
        "icon": props.icon
      }, null) : props.text : createVNode(VDefaultsProvider, {
        "key": "content-defaults",
        "defaults": {
          VImg: {
            cover: true,
            src: props.image
          },
          VIcon: {
            icon: props.icon
          }
        }
      }, {
        default: () => [slots.default()]
      }), genOverlays(false, 'v-avatar')]
    }));
    return {};
  }
});

const makeVLabelProps = propsFactory({
  text: String,
  onClick: EventProp(),
  ...makeComponentProps(),
  ...makeThemeProps()
}, 'VLabel');
const VLabel = genericComponent()({
  name: 'VLabel',
  props: makeVLabelProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createElementVNode("label", {
      "class": normalizeClass(['v-label', {
        'v-label--clickable': !!props.onClick
      }, props.class]),
      "style": normalizeStyle(props.style),
      "onClick": props.onClick
    }, [props.text, slots.default?.()]));
    return {};
  }
});

// Types

const VSelectionControlGroupSymbol = Symbol.for('vuetify:selection-control-group');
const makeSelectionControlGroupProps = propsFactory({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeThemeProps()
}, 'SelectionControlGroup');
const makeVSelectionControlGroupProps = propsFactory({
  ...makeSelectionControlGroupProps({
    defaultsTarget: 'VSelectionControl'
  })
}, 'VSelectionControlGroup');
const VSelectionControlGroup = genericComponent()({
  name: 'VSelectionControlGroup',
  props: makeVSelectionControlGroupProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const modelValue = useProxiedModel(props, 'modelValue');
    const uid = useId();
    const id = toRef(() => props.id || `v-selection-control-group-${uid}`);
    const name = toRef(() => props.name || id.value);
    const updateHandlers = new Set();
    provide(VSelectionControlGroupSymbol, {
      modelValue,
      forceUpdate: () => {
        updateHandlers.forEach(fn => fn());
      },
      onForceUpdate: cb => {
        updateHandlers.add(cb);
        onScopeDispose(() => {
          updateHandlers.delete(cb);
        });
      }
    });
    provideDefaults({
      [props.defaultsTarget]: {
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled),
        density: toRef(() => props.density),
        error: toRef(() => props.error),
        inline: toRef(() => props.inline),
        modelValue,
        multiple: toRef(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
        name,
        falseIcon: toRef(() => props.falseIcon),
        trueIcon: toRef(() => props.trueIcon),
        readonly: toRef(() => props.readonly),
        ripple: toRef(() => props.ripple),
        type: toRef(() => props.type),
        valueComparator: toRef(() => props.valueComparator)
      }
    });
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(['v-selection-control-group', {
        'v-selection-control-group--inline': props.inline
      }, props.class]),
      "style": normalizeStyle(props.style),
      "role": props.type === 'radio' ? 'radiogroup' : undefined
    }, [slots.default?.()]));
    return {};
  }
});

// Types

const makeVSelectionControlProps = propsFactory({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...makeComponentProps(),
  ...makeSelectionControlGroupProps()
}, 'VSelectionControl');
function useSelectionControl(props) {
  const group = inject$1(VSelectionControlGroupSymbol, undefined);
  const {
    densityClasses
  } = useDensity(props);
  const modelValue = useProxiedModel(props, 'modelValue');
  const trueValue = computed(() => props.trueValue !== undefined ? props.trueValue : props.value !== undefined ? props.value : true);
  const falseValue = computed(() => props.falseValue !== undefined ? props.falseValue : false);
  const isMultiple = computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value;
      return isMultiple.value ? wrapInArray(val).some(v => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
    },
    set(val) {
      if (props.readonly) return;
      const currentValue = val ? trueValue.value : falseValue.value;
      let newVal = currentValue;
      if (isMultiple.value) {
        newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter(item => !props.valueComparator(item, trueValue.value));
      }
      if (group) {
        group.modelValue.value = newVal;
      } else {
        modelValue.value = newVal;
      }
    }
  });
  const {
    textColorClasses,
    textColorStyles
  } = useTextColor(() => {
    if (props.error || props.disabled) return undefined;
    return model.value ? props.color : props.baseColor;
  });
  const {
    backgroundColorClasses,
    backgroundColorStyles
  } = useBackgroundColor(() => {
    return model.value && !props.error && !props.disabled ? props.color : props.baseColor;
  });
  const icon = computed(() => model.value ? props.trueIcon : props.falseIcon);
  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    backgroundColorClasses,
    backgroundColorStyles,
    icon
  };
}
const VSelectionControl = genericComponent()({
  name: 'VSelectionControl',
  directives: {
    vRipple: Ripple
  },
  inheritAttrs: false,
  props: makeVSelectionControlProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      group,
      densityClasses,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      trueValue
    } = useSelectionControl(props);
    const uid = useId();
    const isFocused = shallowRef(false);
    const isFocusVisible = shallowRef(false);
    const input = ref();
    const id = toRef(() => props.id || `input-${uid}`);
    const isInteractive = toRef(() => !props.disabled && !props.readonly);
    group?.onForceUpdate(() => {
      if (input.value) {
        input.value.checked = model.value;
      }
    });
    function onFocus(e) {
      if (!isInteractive.value) return;
      isFocused.value = true;
      if (matchesSelector(e.target, ':focus-visible') !== false) {
        isFocusVisible.value = true;
      }
    }
    function onBlur() {
      isFocused.value = false;
      isFocusVisible.value = false;
    }
    function onClickLabel(e) {
      e.stopPropagation();
    }
    function onInput(e) {
      if (!isInteractive.value) {
        if (input.value) {
          // model value is not updated when input is not interactive
          // but the internal checked state of the input is still updated,
          // so here it's value is restored
          input.value.checked = model.value;
        }
        return;
      }
      if (props.readonly && group) {
        nextTick(() => group.forceUpdate());
      }
      model.value = e.target.checked;
    }
    useRender(() => {
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const inputNode = createElementVNode("input", mergeProps({
        "ref": input,
        "checked": model.value,
        "disabled": !!props.disabled,
        "id": id.value,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onInput": onInput,
        "aria-disabled": !!props.disabled,
        "aria-label": props.label,
        "type": props.type,
        "value": trueValue.value,
        "name": props.name,
        "aria-checked": props.type === 'checkbox' ? model.value : undefined
      }, inputAttrs), null);
      return createElementVNode("div", mergeProps({
        "class": ['v-selection-control', {
          'v-selection-control--dirty': model.value,
          'v-selection-control--disabled': props.disabled,
          'v-selection-control--error': props.error,
          'v-selection-control--focused': isFocused.value,
          'v-selection-control--focus-visible': isFocusVisible.value,
          'v-selection-control--inline': props.inline
        }, densityClasses.value, props.class]
      }, rootAttrs, {
        "style": props.style
      }), [createElementVNode("div", {
        "class": normalizeClass(['v-selection-control__wrapper', textColorClasses.value]),
        "style": normalizeStyle(textColorStyles.value)
      }, [slots.default?.({
        backgroundColorClasses,
        backgroundColorStyles
      }), withDirectives(createElementVNode("div", {
        "class": normalizeClass(['v-selection-control__input'])
      }, [slots.input?.({
        model,
        textColorClasses,
        textColorStyles,
        backgroundColorClasses,
        backgroundColorStyles,
        inputNode,
        icon: icon.value,
        props: {
          onFocus,
          onBlur,
          id: id.value
        }
      }) ?? createElementVNode(Fragment, null, [icon.value && createVNode(VIcon, {
        "key": "icon",
        "icon": icon.value
      }, null), inputNode])]), [[Ripple, !props.disabled && !props.readonly && props.ripple, null, {
        center: true,
        circle: true
      }]])]), label && createVNode(VLabel, {
        "for": id.value,
        "onClick": onClickLabel
      }, {
        default: () => [label]
      })]);
    });
    return {
      isFocused,
      input
    };
  }
});

// Types

const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: '$checkboxIndeterminate'
  },
  ...makeVSelectionControlProps({
    falseIcon: '$checkboxOff',
    trueIcon: '$checkboxOn'
  })
}, 'VCheckboxBtn');
const VCheckboxBtn = genericComponent()({
  name: 'VCheckboxBtn',
  props: makeVCheckboxBtnProps(),
  emits: {
    'update:modelValue': value => true,
    'update:indeterminate': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, 'indeterminate');
    const model = useProxiedModel(props, 'modelValue');
    function onChange(v) {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    const falseIcon = toRef(() => {
      return indeterminate.value ? props.indeterminateIcon : props.falseIcon;
    });
    const trueIcon = toRef(() => {
      return indeterminate.value ? props.indeterminateIcon : props.trueIcon;
    });
    useRender(() => {
      const controlProps = omit(VSelectionControl.filterProps(props), ['modelValue']);
      return createVNode(VSelectionControl, mergeProps(controlProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": [$event => model.value = $event, onChange],
        "class": ['v-checkbox-btn', props.class],
        "style": props.style,
        "type": "checkbox",
        "falseIcon": falseIcon.value,
        "trueIcon": trueIcon.value,
        "aria-checked": indeterminate.value ? 'mixed' : undefined
      }), slots);
    });
    return {};
  }
});

// Types

function useInputIcon(props) {
  const {
    t
  } = useLocale();
  function InputIcon(_ref) {
    let {
      name,
      color,
      ...attrs
    } = _ref;
    const localeKey = {
      prepend: 'prependAction',
      prependInner: 'prependAction',
      append: 'appendAction',
      appendInner: 'appendAction',
      clear: 'clear'
    }[name];
    const listener = props[`onClick:${name}`];
    function onKeydown(e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      e.stopPropagation();
      callEvent(listener, new PointerEvent('click', e));
    }
    const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, props.label ?? '') : undefined;
    return createVNode(VIcon, mergeProps({
      "icon": props[`${name}Icon`],
      "aria-label": label,
      "onClick": listener,
      "onKeydown": onKeydown,
      "color": color
    }, attrs), null);
  }
  return {
    InputIcon
  };
}

// Types

const makeVMessagesProps = propsFactory({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...makeComponentProps(),
  ...makeTransitionProps({
    transition: {
      component: VSlideYTransition,
      leaveAbsolute: true,
      group: true
    }
  })
}, 'VMessages');
const VMessages = genericComponent()({
  name: 'VMessages',
  props: makeVMessagesProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const messages = computed(() => wrapInArray(props.messages));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition,
      "tag": "div",
      "class": normalizeClass(['v-messages', textColorClasses.value, props.class]),
      "style": normalizeStyle([textColorStyles.value, props.style])
    }, {
      default: () => [props.active && messages.value.map((message, i) => createElementVNode("div", {
        "class": "v-messages__message",
        "key": `${i}-${messages.value}`
      }, [slots.message ? slots.message({
        message
      }) : message]))]
    }));
    return {};
  }
});

// Composables

// Types

// Composables
const makeFocusProps = propsFactory({
  focused: Boolean,
  'onUpdate:focused': EventProp()
}, 'focus');
function useFocus(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const isFocused = useProxiedModel(props, 'focused');
  const focusClasses = toRef(() => {
    return {
      [`${name}--focused`]: isFocused.value
    };
  });
  function focus() {
    isFocused.value = true;
  }
  function blur() {
    isFocused.value = false;
  }
  return {
    focusClasses,
    isFocused,
    focus,
    blur
  };
}

// Composables

// Types

const FormKey = Symbol.for('vuetify:form');
const makeFormProps = propsFactory({
  disabled: Boolean,
  fastFail: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  validateOn: {
    type: String,
    default: 'input'
  }
}, 'form');
function createForm(props) {
  const model = useProxiedModel(props, 'modelValue');
  const isDisabled = toRef(() => props.disabled);
  const isReadonly = toRef(() => props.readonly);
  const isValidating = shallowRef(false);
  const items = ref([]);
  const errors = ref([]);
  async function validate() {
    const results = [];
    let valid = true;
    errors.value = [];
    isValidating.value = true;
    for (const item of items.value) {
      const itemErrorMessages = await item.validate();
      if (itemErrorMessages.length > 0) {
        valid = false;
        results.push({
          id: item.id,
          errorMessages: itemErrorMessages
        });
      }
      if (!valid && props.fastFail) break;
    }
    errors.value = results;
    isValidating.value = false;
    return {
      valid,
      errors: errors.value
    };
  }
  function reset() {
    items.value.forEach(item => item.reset());
  }
  function resetValidation() {
    items.value.forEach(item => item.resetValidation());
  }
  watch(items, () => {
    let valid = 0;
    let invalid = 0;
    const results = [];
    for (const item of items.value) {
      if (item.isValid === false) {
        invalid++;
        results.push({
          id: item.id,
          errorMessages: item.errorMessages
        });
      } else if (item.isValid === true) valid++;
    }
    errors.value = results;
    model.value = invalid > 0 ? false : valid === items.value.length ? true : null;
  }, {
    deep: true,
    flush: 'post'
  });
  provide(FormKey, {
    register: _ref => {
      let {
        id,
        vm,
        validate,
        reset,
        resetValidation
      } = _ref;
      if (items.value.some(item => item.id === id)) {
        consoleWarn(`Duplicate input name "${id}"`);
      }
      items.value.push({
        id,
        validate,
        reset,
        resetValidation,
        vm: markRaw(vm),
        isValid: null,
        errorMessages: []
      });
    },
    unregister: id => {
      items.value = items.value.filter(item => {
        return item.id !== id;
      });
    },
    update: (id, isValid, errorMessages) => {
      const found = items.value.find(item => item.id === id);
      if (!found) return;
      found.isValid = isValid;
      found.errorMessages = errorMessages;
    },
    isDisabled,
    isReadonly,
    isValidating,
    isValid: model,
    items,
    validateOn: toRef(() => props.validateOn)
  });
  return {
    errors,
    isDisabled,
    isReadonly,
    isValidating,
    isValid: model,
    items,
    validate,
    reset,
    resetValidation
  };
}
function useForm(props) {
  const form = inject$1(FormKey, null);
  return {
    ...form,
    isReadonly: computed(() => !!(props?.readonly ?? form?.isReadonly.value)),
    isDisabled: computed(() => !!(props?.disabled ?? form?.isDisabled.value))
  };
}

// Utilities
const RulesSymbol = Symbol.for('vuetify:rules');
function useRules(fn) {
  const rules = inject$1(RulesSymbol, null);
  if (!fn) {
    if (!rules) {
      throw new Error('Could not find Vuetify rules injection');
    }
    return rules.aliases;
  }
  return rules?.resolve(fn) ?? toRef(fn);
}

// Composables

// Types

const makeValidationProps = propsFactory({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...makeFocusProps()
}, 'validation');
function useValidation(props) {
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  let id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : useId();
  const model = useProxiedModel(props, 'modelValue');
  const validationModel = computed(() => props.validationValue === undefined ? model.value : props.validationValue);
  const form = useForm(props);
  const rules = useRules(() => props.rules);
  const internalErrorMessages = ref([]);
  const isPristine = shallowRef(true);
  const isDirty = computed(() => !!(wrapInArray(model.value === '' ? null : model.value).length || wrapInArray(validationModel.value === '' ? null : validationModel.value).length));
  const errorMessages = computed(() => {
    return props.errorMessages?.length ? wrapInArray(props.errorMessages).concat(internalErrorMessages.value).slice(0, Math.max(0, Number(props.maxErrors))) : internalErrorMessages.value;
  });
  const validateOn = computed(() => {
    let value = (props.validateOn ?? form.validateOn?.value) || 'input';
    if (value === 'lazy') value = 'input lazy';
    if (value === 'eager') value = 'input eager';
    const set = new Set(value?.split(' ') ?? []);
    return {
      input: set.has('input'),
      blur: set.has('blur') || set.has('input') || set.has('invalid-input'),
      invalidInput: set.has('invalid-input'),
      lazy: set.has('lazy'),
      eager: set.has('eager')
    };
  });
  const isValid = computed(() => {
    if (props.error || props.errorMessages?.length) return false;
    if (!props.rules.length) return true;
    if (isPristine.value) {
      return internalErrorMessages.value.length || validateOn.value.lazy ? null : true;
    } else {
      return !internalErrorMessages.value.length;
    }
  });
  const isValidating = shallowRef(false);
  const validationClasses = computed(() => {
    return {
      [`${name}--error`]: isValid.value === false,
      [`${name}--dirty`]: isDirty.value,
      [`${name}--disabled`]: form.isDisabled.value,
      [`${name}--readonly`]: form.isReadonly.value
    };
  });
  const vm = getCurrentInstance('validation');
  const uid = computed(() => props.name ?? unref(id));
  onBeforeMount(() => {
    form.register?.({
      id: uid.value,
      vm,
      validate,
      reset,
      resetValidation
    });
  });
  onBeforeUnmount(() => {
    form.unregister?.(uid.value);
  });
  onMounted(async () => {
    if (!validateOn.value.lazy) {
      await validate(!validateOn.value.eager);
    }
    form.update?.(uid.value, isValid.value, errorMessages.value);
  });
  useToggleScope(() => validateOn.value.input || validateOn.value.invalidInput && isValid.value === false, () => {
    watch(validationModel, () => {
      if (validationModel.value != null) {
        validate();
      } else if (props.focused) {
        const unwatch = watch(() => props.focused, val => {
          if (!val) validate();
          unwatch();
        });
      }
    });
  });
  useToggleScope(() => validateOn.value.blur, () => {
    watch(() => props.focused, val => {
      if (!val) validate();
    });
  });
  watch([isValid, errorMessages], () => {
    form.update?.(uid.value, isValid.value, errorMessages.value);
  });
  async function reset() {
    model.value = null;
    await nextTick();
    await resetValidation();
  }
  async function resetValidation() {
    isPristine.value = true;
    if (!validateOn.value.lazy) {
      await validate(!validateOn.value.eager);
    } else {
      internalErrorMessages.value = [];
    }
  }
  async function validate() {
    let silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const results = [];
    isValidating.value = true;
    for (const rule of rules.value) {
      if (results.length >= Number(props.maxErrors ?? 1)) {
        break;
      }
      const handler = typeof rule === 'function' ? rule : () => rule;
      const result = await handler(validationModel.value);
      if (result === true) continue;
      if (result !== false && typeof result !== 'string') {
        // eslint-disable-next-line no-console
        console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
        continue;
      }
      results.push(result || '');
    }
    internalErrorMessages.value = results;
    isValidating.value = false;
    isPristine.value = silent;
    return internalErrorMessages.value;
  }
  return {
    errorMessages,
    isDirty,
    isDisabled: form.isDisabled,
    isReadonly: form.isReadonly,
    isPristine,
    isValid,
    isValidating,
    reset,
    resetValidation,
    validate,
    validationClasses
  };
}

// Types

const makeVInputProps = propsFactory({
  id: String,
  appendIcon: IconValue,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: true
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: IconValue,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: 'horizontal',
    validator: v => ['horizontal', 'vertical'].includes(v)
  },
  'onClick:prepend': EventProp(),
  'onClick:append': EventProp(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...pick(makeDimensionProps(), ['maxWidth', 'minWidth', 'width']),
  ...makeThemeProps(),
  ...makeValidationProps()
}, 'VInput');
const VInput = genericComponent()({
  name: 'VInput',
  props: {
    ...makeVInputProps()
  },
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const {
      InputIcon
    } = useInputIcon(props);
    const uid = useId();
    const id = computed(() => props.id || `input-${uid}`);
    const {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses
    } = useValidation(props, 'v-input', id);
    const messages = computed(() => {
      if (props.errorMessages?.length || !isPristine.value && errorMessages.value.length) {
        return errorMessages.value;
      } else if (props.hint && (props.persistentHint || props.focused)) {
        return props.hint;
      } else {
        return props.messages;
      }
    });
    const hasMessages = toRef(() => messages.value.length > 0);
    const hasDetails = toRef(() => !props.hideDetails || props.hideDetails === 'auto' && (hasMessages.value || !!slots.details));
    const messagesId = computed(() => hasDetails.value ? `${id.value}-messages` : undefined);
    const slotProps = computed(() => ({
      id,
      messagesId,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      hasDetails,
      reset,
      resetValidation,
      validate
    }));
    const color = toRef(() => {
      return props.error || props.disabled ? undefined : props.focused ? props.color : props.baseColor;
    });
    const iconColor = toRef(() => {
      if (!props.iconColor) return undefined;
      return props.iconColor === true ? color.value : props.iconColor;
    });
    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.prependIcon);
      const hasAppend = !!(slots.append || props.appendIcon);
      return createElementVNode("div", {
        "class": normalizeClass(['v-input', `v-input--${props.direction}`, {
          'v-input--center-affix': props.centerAffix,
          'v-input--focused': props.focused,
          'v-input--glow': props.glow,
          'v-input--hide-spin-buttons': props.hideSpinButtons
        }, densityClasses.value, themeClasses.value, rtlClasses.value, validationClasses.value, props.class]),
        "style": normalizeStyle([dimensionStyles.value, props.style])
      }, [hasPrepend && createElementVNode("div", {
        "key": "prepend",
        "class": "v-input__prepend"
      }, [slots.prepend?.(slotProps.value), props.prependIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prepend",
        "color": iconColor.value
      }, null)]), slots.default && createElementVNode("div", {
        "class": "v-input__control"
      }, [slots.default?.(slotProps.value)]), hasAppend && createElementVNode("div", {
        "key": "append",
        "class": "v-input__append"
      }, [props.appendIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "append",
        "color": iconColor.value
      }, null), slots.append?.(slotProps.value)]), hasDetails.value && createElementVNode("div", {
        "id": messagesId.value,
        "class": "v-input__details",
        "role": "alert",
        "aria-live": "polite"
      }, [createVNode(VMessages, {
        "active": hasMessages.value,
        "messages": messages.value
      }, {
        message: slots.message
      }), slots.details?.(slotProps.value)])]);
    });
    return {
      reset,
      resetValidation,
      validate,
      isValid,
      errorMessages
    };
  }
});

// Types

const Refs = Symbol('Forwarded refs');

/** Omit properties starting with P */

/** Omit keyof $props from T */

function getDescriptor(obj, key) {
  let currentObj = obj;
  while (currentObj) {
    const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
    if (descriptor) return descriptor;
    currentObj = Object.getPrototypeOf(currentObj);
  }
  return undefined;
}
function forwardRefs(target) {
  for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    refs[_key - 1] = arguments[_key];
  }
  target[Refs] = refs;
  return new Proxy(target, {
    get(target, key) {
      if (Reflect.has(target, key)) {
        return Reflect.get(target, key);
      }

      // Skip internal properties
      if (typeof key === 'symbol' || key.startsWith('$') || key.startsWith('__')) return;
      for (const ref of refs) {
        if (ref.value && Reflect.has(ref.value, key)) {
          const val = Reflect.get(ref.value, key);
          return typeof val === 'function' ? val.bind(ref.value) : val;
        }
      }
    },
    has(target, key) {
      if (Reflect.has(target, key)) {
        return true;
      }

      // Skip internal properties
      if (typeof key === 'symbol' || key.startsWith('$') || key.startsWith('__')) return false;
      for (const ref of refs) {
        if (ref.value && Reflect.has(ref.value, key)) {
          return true;
        }
      }
      return false;
    },
    set(target, key, value) {
      if (Reflect.has(target, key)) {
        return Reflect.set(target, key, value);
      }

      // Skip internal properties
      if (typeof key === 'symbol' || key.startsWith('$') || key.startsWith('__')) return false;
      for (const ref of refs) {
        if (ref.value && Reflect.has(ref.value, key)) {
          return Reflect.set(ref.value, key, value);
        }
      }
      return false;
    },
    getOwnPropertyDescriptor(target, key) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (descriptor) return descriptor;

      // Skip internal properties
      if (typeof key === 'symbol' || key.startsWith('$') || key.startsWith('__')) return;

      // Check each ref's own properties
      for (const ref of refs) {
        if (!ref.value) continue;
        const descriptor = getDescriptor(ref.value, key) ?? ('_' in ref.value ? getDescriptor(ref.value._?.setupState, key) : undefined);
        if (descriptor) return descriptor;
      }

      // Recursive search up each ref's prototype
      for (const ref of refs) {
        const childRefs = ref.value && ref.value[Refs];
        if (!childRefs) continue;
        const queue = childRefs.slice();
        while (queue.length) {
          const ref = queue.shift();
          const descriptor = getDescriptor(ref.value, key);
          if (descriptor) return descriptor;
          const childRefs = ref.value && ref.value[Refs];
          if (childRefs) queue.push(...childRefs);
        }
      }
      return undefined;
    }
  });
}

// Types

const makeVCheckboxProps = propsFactory({
  ...makeVInputProps(),
  ...omit(makeVCheckboxBtnProps(), ['inline'])
}, 'VCheckbox');
const VCheckbox = genericComponent()({
  name: 'VCheckbox',
  inheritAttrs: false,
  props: makeVCheckboxProps(),
  emits: {
    'update:modelValue': value => true,
    'update:focused': focused => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const inputRef = ref();
    const uid = useId();
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props);
      const checkboxProps = VCheckboxBtn.filterProps(props);
      return createVNode(VInput, mergeProps({
        "ref": inputRef,
        "class": ['v-checkbox', props.class]
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "id": props.id || `checkbox-${uid}`,
        "focused": isFocused.value,
        "style": props.style
      }), {
        ...slots,
        default: _ref2 => {
          let {
            id,
            messagesId,
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VCheckboxBtn, mergeProps(checkboxProps, {
            "id": id.value,
            "aria-describedby": messagesId.value,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs, {
            "error": isValid.value === false,
            "modelValue": model.value,
            "onUpdate:modelValue": $event => model.value = $event,
            "onFocus": focus,
            "onBlur": blur
          }), slots);
        }
      });
    });
    return forwardRefs({}, inputRef);
  }
});

// Utilities

// Types

const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl']; // no xs

const DisplaySymbol = Symbol.for('vuetify:display');
const defaultDisplayOptions = {
  mobileBreakpoint: 'lg',
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
};
const parseDisplayOptions = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDisplayOptions;
  return mergeDeep(defaultDisplayOptions, options);
};
function getClientWidth(ssr) {
  return IN_BROWSER && !ssr ? window.innerWidth : typeof ssr === 'object' && ssr.clientWidth || 0;
}
function getClientHeight(ssr) {
  return IN_BROWSER && !ssr ? window.innerHeight : typeof ssr === 'object' && ssr.clientHeight || 0;
}
function getPlatform(ssr) {
  const userAgent = IN_BROWSER && !ssr ? window.navigator.userAgent : 'ssr';
  function match(regexp) {
    return Boolean(userAgent.match(regexp));
  }
  const android = match(/android/i);
  const ios = match(/iphone|ipad|ipod/i);
  const cordova = match(/cordova/i);
  const electron = match(/electron/i);
  const chrome = match(/chrome/i);
  const edge = match(/edge/i);
  const firefox = match(/firefox/i);
  const opera = match(/opera/i);
  const win = match(/win/i);
  const mac = match(/mac/i);
  const linux = match(/linux/i);
  return {
    android,
    ios,
    cordova,
    electron,
    chrome,
    edge,
    firefox,
    opera,
    win,
    mac,
    linux,
    touch: SUPPORTS_TOUCH,
    ssr: userAgent === 'ssr'
  };
}
function createDisplay(options, ssr) {
  const {
    thresholds,
    mobileBreakpoint
  } = parseDisplayOptions(options);
  const height = shallowRef(getClientHeight(ssr));
  const platform = shallowRef(getPlatform(ssr));
  const state = reactive({});
  const width = shallowRef(getClientWidth(ssr));
  function updateSize() {
    height.value = getClientHeight();
    width.value = getClientWidth();
  }
  function update() {
    updateSize();
    platform.value = getPlatform();
  }

  // eslint-disable-next-line max-statements
  watchEffect(() => {
    const xs = width.value < thresholds.sm;
    const sm = width.value < thresholds.md && !xs;
    const md = width.value < thresholds.lg && !(sm || xs);
    const lg = width.value < thresholds.xl && !(md || sm || xs);
    const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
    const xxl = width.value >= thresholds.xxl;
    const name = xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : xl ? 'xl' : 'xxl';
    const breakpointValue = typeof mobileBreakpoint === 'number' ? mobileBreakpoint : thresholds[mobileBreakpoint];
    const mobile = width.value < breakpointValue;
    state.xs = xs;
    state.sm = sm;
    state.md = md;
    state.lg = lg;
    state.xl = xl;
    state.xxl = xxl;
    state.smAndUp = !xs;
    state.mdAndUp = !(xs || sm);
    state.lgAndUp = !(xs || sm || md);
    state.xlAndUp = !(xs || sm || md || lg);
    state.smAndDown = !(md || lg || xl || xxl);
    state.mdAndDown = !(lg || xl || xxl);
    state.lgAndDown = !(xl || xxl);
    state.xlAndDown = !xxl;
    state.name = name;
    state.height = height.value;
    state.width = width.value;
    state.mobile = mobile;
    state.mobileBreakpoint = mobileBreakpoint;
    state.platform = platform.value;
    state.thresholds = thresholds;
  });
  if (IN_BROWSER) {
    window.addEventListener('resize', updateSize, {
      passive: true
    });
    onScopeDispose(() => {
      window.removeEventListener('resize', updateSize);
    }, true);
  }
  return {
    ...toRefs(state),
    update,
    ssr: !!ssr
  };
}
const makeDisplayProps = propsFactory({
  mobile: {
    type: Boolean,
    default: false
  },
  mobileBreakpoint: [Number, String]
}, 'display');
function useDisplay() {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    mobile: null
  };
  let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstanceName();
  const display = inject$1(DisplaySymbol);
  if (!display) throw new Error('Could not find Vuetify display injection');
  const mobile = computed(() => {
    if (props.mobile) {
      return true;
    } else if (typeof props.mobileBreakpoint === 'number') {
      return display.width.value < props.mobileBreakpoint;
    } else if (props.mobileBreakpoint) {
      return display.width.value < display.thresholds.value[props.mobileBreakpoint];
    } else if (props.mobile === null) {
      return display.mobile.value;
    } else {
      return false;
    }
  });
  const displayClasses = toRef(() => {
    if (!name) return {};
    return {
      [`${name}--mobile`]: mobile.value
    };
  });
  return {
    ...display,
    displayClasses,
    mobile
  };
}

// Utilities

// Types

const GoToSymbol = Symbol.for('vuetify:goto');
function genDefaults() {
  return {
    container: undefined,
    duration: 300,
    layout: false,
    offset: 0,
    easing: 'easeInOutCubic',
    patterns: easingPatterns
  };
}
function getContainer(el) {
  return getTarget$1(el) ?? (document.scrollingElement || document.body);
}
function getTarget$1(el) {
  return typeof el === 'string' ? document.querySelector(el) : refElement(el);
}
function getOffset$2(target, horizontal, rtl) {
  if (typeof target === 'number') return horizontal && rtl ? -target : target;
  let el = getTarget$1(target);
  let totalOffset = 0;
  while (el) {
    totalOffset += horizontal ? el.offsetLeft : el.offsetTop;
    el = el.offsetParent;
  }
  return totalOffset;
}
function createGoTo(options, locale) {
  return {
    rtl: locale.isRtl,
    options: mergeDeep(genDefaults(), options)
  };
}
async function scrollTo(_target, _options, horizontal, goTo) {
  const property = horizontal ? 'scrollLeft' : 'scrollTop';
  const options = mergeDeep(goTo?.options ?? genDefaults(), _options);
  const rtl = goTo?.rtl.value;
  const target = (typeof _target === 'number' ? _target : getTarget$1(_target)) ?? 0;
  const container = options.container === 'parent' && target instanceof HTMLElement ? target.parentElement : getContainer(options.container);
  const ease = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? options.patterns.instant : typeof options.easing === 'function' ? options.easing : options.patterns[options.easing];
  if (!ease) throw new TypeError(`Easing function "${options.easing}" not found.`);
  let targetLocation;
  if (typeof target === 'number') {
    targetLocation = getOffset$2(target, horizontal, rtl);
  } else {
    targetLocation = getOffset$2(target, horizontal, rtl) - getOffset$2(container, horizontal, rtl);
    if (options.layout) {
      const styles = window.getComputedStyle(target);
      const layoutOffset = styles.getPropertyValue('--v-layout-top');
      if (layoutOffset) targetLocation -= parseInt(layoutOffset, 10);
    }
  }
  targetLocation += options.offset;
  targetLocation = clampTarget(container, targetLocation, !!rtl, !!horizontal);
  const startLocation = container[property] ?? 0;
  if (targetLocation === startLocation) return Promise.resolve(targetLocation);
  const startTime = performance.now();
  return new Promise(resolve => requestAnimationFrame(function step(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = timeElapsed / options.duration;
    const location = Math.floor(startLocation + (targetLocation - startLocation) * ease(clamp(progress, 0, 1)));
    container[property] = location;

    // Allow for some jitter if target time has elapsed
    if (progress >= 1 && Math.abs(location - container[property]) < 10) {
      return resolve(targetLocation);
    } else if (progress > 2) {
      // The target might not be reachable
      consoleWarn('Scroll target is not reachable');
      return resolve(container[property]);
    }
    requestAnimationFrame(step);
  }));
}
function useGoTo() {
  let _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const goToInstance = inject$1(GoToSymbol);
  const {
    isRtl
  } = useRtl();
  if (!goToInstance) throw new Error('[Vuetify] Could not find injected goto instance');
  const goTo = {
    ...goToInstance,
    // can be set via VLocaleProvider
    rtl: toRef(() => goToInstance.rtl.value || isRtl.value)
  };
  async function go(target, options) {
    return scrollTo(target, mergeDeep(_options, options), false, goTo);
  }
  go.horizontal = async (target, options) => {
    return scrollTo(target, mergeDeep(_options, options), true, goTo);
  };
  return go;
}

/**
 * Clamp target value to achieve a smooth scroll animation
 * when the value goes outside the scroll container size
 */
function clampTarget(container, value, rtl, horizontal) {
  const {
    scrollWidth,
    scrollHeight
  } = container;
  const [containerWidth, containerHeight] = container === document.scrollingElement ? [window.innerWidth, window.innerHeight] : [container.offsetWidth, container.offsetHeight];
  let min;
  let max;
  if (horizontal) {
    if (rtl) {
      min = -(scrollWidth - containerWidth);
      max = 0;
    } else {
      min = 0;
      max = scrollWidth - containerWidth;
    }
  } else {
    min = 0;
    max = scrollHeight + -containerHeight;
  }
  return clamp(value, min, max);
}

function calculateUpdatedTarget(_ref) {
  let {
    selectedElement,
    containerElement,
    isRtl,
    isHorizontal
  } = _ref;
  const containerSize = getOffsetSize(isHorizontal, containerElement);
  const scrollPosition = getScrollPosition(isHorizontal, isRtl, containerElement);
  const childrenSize = getOffsetSize(isHorizontal, selectedElement);
  const childrenStartPosition = getOffsetPosition(isHorizontal, selectedElement);
  const additionalOffset = childrenSize * 0.4;
  if (scrollPosition > childrenStartPosition) {
    return childrenStartPosition - additionalOffset;
  } else if (scrollPosition + containerSize < childrenStartPosition + childrenSize) {
    return childrenStartPosition - containerSize + childrenSize + additionalOffset;
  }
  return scrollPosition;
}
function calculateCenteredTarget(_ref2) {
  let {
    selectedElement,
    containerElement,
    isHorizontal
  } = _ref2;
  const containerOffsetSize = getOffsetSize(isHorizontal, containerElement);
  const childrenOffsetPosition = getOffsetPosition(isHorizontal, selectedElement);
  const childrenOffsetSize = getOffsetSize(isHorizontal, selectedElement);
  return childrenOffsetPosition - containerOffsetSize / 2 + childrenOffsetSize / 2;
}
function getScrollSize(isHorizontal, element) {
  const key = isHorizontal ? 'scrollWidth' : 'scrollHeight';
  return element?.[key] || 0;
}
function getClientSize(isHorizontal, element) {
  const key = isHorizontal ? 'clientWidth' : 'clientHeight';
  return element?.[key] || 0;
}
function getScrollPosition(isHorizontal, rtl, element) {
  if (!element) {
    return 0;
  }
  const {
    scrollLeft,
    offsetWidth,
    scrollWidth
  } = element;
  if (isHorizontal) {
    return rtl ? scrollWidth - offsetWidth + scrollLeft : scrollLeft;
  }
  return element.scrollTop;
}
function getOffsetSize(isHorizontal, element) {
  const key = isHorizontal ? 'offsetWidth' : 'offsetHeight';
  return element?.[key] || 0;
}
function getOffsetPosition(isHorizontal, element) {
  const key = isHorizontal ? 'offsetLeft' : 'offsetTop';
  return element?.[key] || 0;
}

// Types

const VSlideGroupSymbol = Symbol.for('vuetify:v-slide-group');
const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  contentClass: null,
  direction: {
    type: String,
    default: 'horizontal'
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol
  },
  nextIcon: {
    type: IconValue,
    default: '$next'
  },
  prevIcon: {
    type: IconValue,
    default: '$prev'
  },
  showArrows: {
    type: [Boolean, String],
    validator: v => typeof v === 'boolean' || ['always', 'desktop', 'mobile'].includes(v)
  },
  ...makeComponentProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: 'v-slide-group-item--active'
  })
}, 'VSlideGroup');
const VSlideGroup = genericComponent()({
  name: 'VSlideGroup',
  props: makeVSlideGroupProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const group = useGroup(props, props.symbol);
    const isOverflowing = shallowRef(false);
    const scrollOffset = shallowRef(0);
    const containerSize = shallowRef(0);
    const contentSize = shallowRef(0);
    const isHorizontal = computed(() => props.direction === 'horizontal');
    const {
      resizeRef: containerRef,
      contentRect: containerRect
    } = useResizeObserver();
    const {
      resizeRef: contentRef,
      contentRect
    } = useResizeObserver();
    const goTo = useGoTo();
    const goToOptions = computed(() => {
      return {
        container: containerRef.el,
        duration: 200,
        easing: 'easeOutQuart'
      };
    });
    const firstSelectedIndex = computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex(item => item.id === group.selected.value[0]);
    });
    const lastSelectedIndex = computed(() => {
      if (!group.selected.value.length) return -1;
      return group.items.value.findIndex(item => item.id === group.selected.value[group.selected.value.length - 1]);
    });
    if (IN_BROWSER) {
      let frame = -1;
      watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (containerRect.value && contentRect.value) {
            const sizeProperty = isHorizontal.value ? 'width' : 'height';
            containerSize.value = containerRect.value[sizeProperty];
            contentSize.value = contentRect.value[sizeProperty];
            isOverflowing.value = containerSize.value + 1 < contentSize.value;
          }
          if (firstSelectedIndex.value >= 0 && contentRef.el) {
            // TODO: Is this too naive? Should we store element references in group composable?
            const selectedElement = contentRef.el.children[lastSelectedIndex.value];
            scrollToChildren(selectedElement, props.centerActive);
          }
        });
      });
    }
    const isFocused = shallowRef(false);
    function scrollToChildren(children, center) {
      let target = 0;
      if (center) {
        target = calculateCenteredTarget({
          containerElement: containerRef.el,
          isHorizontal: isHorizontal.value,
          selectedElement: children
        });
      } else {
        target = calculateUpdatedTarget({
          containerElement: containerRef.el,
          isHorizontal: isHorizontal.value,
          isRtl: isRtl.value,
          selectedElement: children
        });
      }
      scrollToPosition(target);
    }
    function scrollToPosition(newPosition) {
      if (!IN_BROWSER || !containerRef.el) return;
      const offsetSize = getOffsetSize(isHorizontal.value, containerRef.el);
      const scrollPosition = getScrollPosition(isHorizontal.value, isRtl.value, containerRef.el);
      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
      if (scrollSize <= offsetSize ||
      // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(newPosition - scrollPosition) < 16) return;
      if (isHorizontal.value && isRtl.value && containerRef.el) {
        const {
          scrollWidth,
          offsetWidth: containerWidth
        } = containerRef.el;
        newPosition = scrollWidth - containerWidth - newPosition;
      }
      if (isHorizontal.value) {
        goTo.horizontal(newPosition, goToOptions.value);
      } else {
        goTo(newPosition, goToOptions.value);
      }
    }
    function onScroll(e) {
      const {
        scrollTop,
        scrollLeft
      } = e.target;
      scrollOffset.value = isHorizontal.value ? scrollLeft : scrollTop;
    }
    function onFocusin(e) {
      isFocused.value = true;
      if (!isOverflowing.value || !contentRef.el) return;

      // Focused element is likely to be the root of an item, so a
      // breadth-first search will probably find it in the first iteration
      for (const el of e.composedPath()) {
        for (const item of contentRef.el.children) {
          if (item === el) {
            scrollToChildren(item);
            return;
          }
        }
      }
    }
    function onFocusout(e) {
      isFocused.value = false;
    }

    // Affix clicks produce onFocus that we have to ignore to avoid extra scrollToChildren
    let ignoreFocusEvent = false;
    function onFocus(e) {
      if (!ignoreFocusEvent && !isFocused.value && !(e.relatedTarget && contentRef.el?.contains(e.relatedTarget))) focus();
      ignoreFocusEvent = false;
    }
    function onFocusAffixes() {
      ignoreFocusEvent = true;
    }
    function onKeydown(e) {
      if (!contentRef.el) return;
      function toFocus(location) {
        e.preventDefault();
        focus(location);
      }
      if (isHorizontal.value) {
        if (e.key === 'ArrowRight') {
          toFocus(isRtl.value ? 'prev' : 'next');
        } else if (e.key === 'ArrowLeft') {
          toFocus(isRtl.value ? 'next' : 'prev');
        }
      } else {
        if (e.key === 'ArrowDown') {
          toFocus('next');
        } else if (e.key === 'ArrowUp') {
          toFocus('prev');
        }
      }
      if (e.key === 'Home') {
        toFocus('first');
      } else if (e.key === 'End') {
        toFocus('last');
      }
    }
    function getSiblingElement(el, location) {
      if (!el) return undefined;
      let sibling = el;
      do {
        sibling = sibling?.[location === 'next' ? 'nextElementSibling' : 'previousElementSibling'];
      } while (sibling?.hasAttribute('disabled'));
      return sibling;
    }
    function focus(location) {
      if (!contentRef.el) return;
      let el;
      if (!location) {
        const focusable = focusableChildren(contentRef.el);
        el = focusable[0];
      } else if (location === 'next') {
        el = getSiblingElement(contentRef.el.querySelector(':focus'), location);
        if (!el) return focus('first');
      } else if (location === 'prev') {
        el = getSiblingElement(contentRef.el.querySelector(':focus'), location);
        if (!el) return focus('last');
      } else if (location === 'first') {
        el = contentRef.el.firstElementChild;
        if (el?.hasAttribute('disabled')) el = getSiblingElement(el, 'next');
      } else if (location === 'last') {
        el = contentRef.el.lastElementChild;
        if (el?.hasAttribute('disabled')) el = getSiblingElement(el, 'prev');
      }
      if (el) {
        el.focus({
          preventScroll: true
        });
      }
    }
    function scrollTo(location) {
      const direction = isHorizontal.value && isRtl.value ? -1 : 1;
      const offsetStep = (location === 'prev' ? -direction : direction) * containerSize.value;
      let newPosition = scrollOffset.value + offsetStep;

      // TODO: improve it
      if (isHorizontal.value && isRtl.value && containerRef.el) {
        const {
          scrollWidth,
          offsetWidth: containerWidth
        } = containerRef.el;
        newPosition += scrollWidth - containerWidth;
      }
      scrollToPosition(newPosition);
    }
    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected
    }));
    const hasOverflowOrScroll = computed(() => isOverflowing.value || Math.abs(scrollOffset.value) > 0);
    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        // Always show arrows on desktop & mobile
        case 'always':
          return true;

        // Always show arrows on desktop
        case 'desktop':
          return !mobile.value;

        // Show arrows on mobile when overflowing.
        // This matches the default 2.2 behavior
        case true:
          return hasOverflowOrScroll.value;

        // Always show on mobile
        case 'mobile':
          return mobile.value || hasOverflowOrScroll.value;

        // https://material.io/components/tabs#scrollable-tabs
        // Always show arrows when
        // overflowed on desktop
        default:
          return !mobile.value && hasOverflowOrScroll.value;
      }
    });
    const hasPrev = computed(() => {
      // 1 pixel in reserve, may be lost after rounding
      return Math.abs(scrollOffset.value) > 1;
    });
    const hasNext = computed(() => {
      if (!containerRef.value || !hasOverflowOrScroll.value) return false;
      const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
      const clientSize = getClientSize(isHorizontal.value, containerRef.el);
      const scrollSizeMax = scrollSize - clientSize;

      // 1 pixel in reserve, may be lost after rounding
      return scrollSizeMax - Math.abs(scrollOffset.value) > 1;
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-slide-group', {
        'v-slide-group--vertical': !isHorizontal.value,
        'v-slide-group--has-affixes': hasAffixes.value,
        'v-slide-group--is-overflowing': isOverflowing.value
      }, displayClasses.value, props.class]),
      "style": normalizeStyle(props.style),
      "tabindex": isFocused.value || group.selected.value.length ? -1 : 0,
      "onFocus": onFocus
    }, {
      default: () => [hasAffixes.value && createElementVNode("div", {
        "key": "prev",
        "class": normalizeClass(['v-slide-group__prev', {
          'v-slide-group__prev--disabled': !hasPrev.value
        }]),
        "onMousedown": onFocusAffixes,
        "onClick": () => hasPrev.value && scrollTo('prev')
      }, [slots.prev?.(slotProps.value) ?? createVNode(VFadeTransition, null, {
        default: () => [createVNode(VIcon, {
          "icon": isRtl.value ? props.nextIcon : props.prevIcon
        }, null)]
      })]), createElementVNode("div", {
        "key": "container",
        "ref": containerRef,
        "class": normalizeClass(['v-slide-group__container', props.contentClass]),
        "onScroll": onScroll
      }, [createElementVNode("div", {
        "ref": contentRef,
        "class": "v-slide-group__content",
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onKeydown": onKeydown
      }, [slots.default?.(slotProps.value)])]), hasAffixes.value && createElementVNode("div", {
        "key": "next",
        "class": normalizeClass(['v-slide-group__next', {
          'v-slide-group__next--disabled': !hasNext.value
        }]),
        "onMousedown": onFocusAffixes,
        "onClick": () => hasNext.value && scrollTo('next')
      }, [slots.next?.(slotProps.value) ?? createVNode(VFadeTransition, null, {
        default: () => [createVNode(VIcon, {
          "icon": isRtl.value ? props.prevIcon : props.nextIcon
        }, null)]
      })])]
    }));
    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus,
      hasPrev,
      hasNext
    };
  }
});

// Types

const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group');
const makeVChipGroupProps = propsFactory({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeVSlideGroupProps(),
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: 'v-chip--selected'
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'tonal'
  })
}, 'VChipGroup');
const VChipGroup = genericComponent()({
  name: 'VChipGroup',
  props: makeVChipGroupProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VChipGroupSymbol);
    provideDefaults({
      VChip: {
        baseColor: toRef(() => props.baseColor),
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled),
        filter: toRef(() => props.filter),
        variant: toRef(() => props.variant)
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      return createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "class": ['v-chip-group', {
          'v-chip-group--column': props.column
        }, themeClasses.value, props.class],
        "style": props.style
      }), {
        default: () => [slots.default?.({
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })]
      });
    });
    return {};
  }
});

// Types

const makeVChipProps = propsFactory({
  activeClass: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: '$delete'
  },
  closeLabel: {
    type: String,
    default: '$vuetify.close'
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: IconValue,
    default: '$complete'
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: undefined
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  text: {
    type: [String, Number, Boolean],
    default: undefined
  },
  modelValue: {
    type: Boolean,
    default: true
  },
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: 'span'
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'tonal'
  })
}, 'VChip');
const VChip = genericComponent()({
  name: 'VChip',
  directives: {
    vRipple: Ripple
  },
  props: makeVChipProps(),
  emits: {
    'click:close': e => true,
    'update:modelValue': value => true,
    'group:selected': val => true,
    click: e => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const {
      themeClasses
    } = provideTheme(props);
    const isActive = useProxiedModel(props, 'modelValue');
    const group = useGroupItem(props, VChipGroupSymbol, false);
    const link = useLink(props, attrs);
    const isLink = toRef(() => props.link !== false && link.isLink.value);
    const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
    const closeProps = toRef(() => ({
      'aria-label': t(props.closeLabel),
      disabled: props.disabled,
      onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        isActive.value = false;
        emit('click:close', e);
      }
    }));
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(() => {
      const showColor = !group || group.isSelected.value;
      return {
        color: showColor ? props.color ?? props.baseColor : props.baseColor,
        variant: props.variant
      };
    });
    function onClick(e) {
      emit('click', e);
      if (!isClickable.value) return;
      link.navigate?.(e);
      group?.toggle();
    }
    function onKeyDown(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(e);
      }
    }
    return () => {
      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasClose = !!(slots.close || props.closable);
      const hasFilter = !!(slots.filter || props.filter) && group;
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      return isActive.value && withDirectives(createVNode(Tag, mergeProps({
        "class": ['v-chip', {
          'v-chip--disabled': props.disabled,
          'v-chip--label': props.label,
          'v-chip--link': isClickable.value,
          'v-chip--filter': hasFilter,
          'v-chip--pill': props.pill,
          [`${props.activeClass}`]: props.activeClass && link.isActive?.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group?.selectedClass.value, props.class],
        "style": [colorStyles.value, props.style],
        "disabled": props.disabled || undefined,
        "draggable": props.draggable,
        "tabindex": isClickable.value ? 0 : undefined,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, link.linkProps), {
        default: () => [genOverlays(isClickable.value, 'v-chip'), hasFilter && createVNode(VExpandXTransition, {
          "key": "filter"
        }, {
          default: () => [withDirectives(createElementVNode("div", {
            "class": "v-chip__filter"
          }, [!slots.filter ? createVNode(VIcon, {
            "key": "filter-icon",
            "icon": props.filterIcon
          }, null) : createVNode(VDefaultsProvider, {
            "key": "filter-defaults",
            "disabled": !props.filterIcon,
            "defaults": {
              VIcon: {
                icon: props.filterIcon
              }
            }
          }, slots.filter)]), [[vShow, group.isSelected.value]])]
        }), hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-chip__prepend"
        }, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependIcon && createVNode(VIcon, {
          "key": "prepend-icon",
          "icon": props.prependIcon,
          "start": true
        }, null), props.prependAvatar && createVNode(VAvatar, {
          "key": "prepend-avatar",
          "image": props.prependAvatar,
          "start": true
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !hasPrependMedia,
          "defaults": {
            VAvatar: {
              image: props.prependAvatar,
              start: true
            },
            VIcon: {
              icon: props.prependIcon,
              start: true
            }
          }
        }, slots.prepend)]), createElementVNode("div", {
          "class": "v-chip__content",
          "data-no-activator": ""
        }, [slots.default?.({
          isSelected: group?.isSelected.value,
          selectedClass: group?.selectedClass.value,
          select: group?.select,
          toggle: group?.toggle,
          value: group?.value.value,
          disabled: props.disabled
        }) ?? toDisplayString(props.text)]), hasAppend && createElementVNode("div", {
          "key": "append",
          "class": "v-chip__append"
        }, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
          "key": "append-icon",
          "end": true,
          "icon": props.appendIcon
        }, null), props.appendAvatar && createVNode(VAvatar, {
          "key": "append-avatar",
          "end": true,
          "image": props.appendAvatar
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !hasAppendMedia,
          "defaults": {
            VAvatar: {
              end: true,
              image: props.appendAvatar
            },
            VIcon: {
              end: true,
              icon: props.appendIcon
            }
          }
        }, slots.append)]), hasClose && createElementVNode("button", mergeProps({
          "key": "close",
          "class": "v-chip__close",
          "type": "button",
          "data-testid": "close-chip"
        }, closeProps.value), [!slots.close ? createVNode(VIcon, {
          "key": "close-icon",
          "icon": props.closeIcon,
          "size": "x-small"
        }, null) : createVNode(VDefaultsProvider, {
          "key": "close-defaults",
          "defaults": {
            VIcon: {
              icon: props.closeIcon,
              size: 'x-small'
            }
          }
        }, slots.close)])]
      }), [[Ripple, isClickable.value && props.ripple, null]]);
    };
  }
});

const makeVDividerProps = propsFactory({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...makeComponentProps(),
  ...makeThemeProps()
}, 'VDivider');
const VDivider = genericComponent()({
  name: 'VDivider',
  props: makeVDividerProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    const dividerStyles = computed(() => {
      const styles = {};
      if (props.length) {
        styles[props.vertical ? 'height' : 'width'] = convertToUnit(props.length);
      }
      if (props.thickness) {
        styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = convertToUnit(props.thickness);
      }
      return styles;
    });
    useRender(() => {
      const divider = createElementVNode("hr", {
        "class": normalizeClass([{
          'v-divider': true,
          'v-divider--inset': props.inset,
          'v-divider--vertical': props.vertical
        }, themeClasses.value, textColorClasses.value, props.class]),
        "style": normalizeStyle([dividerStyles.value, textColorStyles.value, {
          '--v-border-opacity': props.opacity
        }, props.style]),
        "aria-orientation": !attrs.role || attrs.role === 'separator' ? props.vertical ? 'vertical' : 'horizontal' : undefined,
        "role": `${attrs.role || 'separator'}`
      }, null);
      if (!slots.default) return divider;
      return createElementVNode("div", {
        "class": normalizeClass(['v-divider__wrapper', {
          'v-divider__wrapper--vertical': props.vertical,
          'v-divider__wrapper--inset': props.inset
        }])
      }, [divider, createElementVNode("div", {
        "class": "v-divider__content"
      }, [slots.default()]), divider]);
    });
    return {};
  }
});

// Utilities

// List
const ListKey = Symbol.for('vuetify:list');
function createList() {
  let {
    filterable
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    filterable: false
  };
  const parent = inject$1(ListKey, {
    filterable: false,
    hasPrepend: shallowRef(false),
    updateHasPrepend: () => null
  });
  const data = {
    filterable: parent.filterable || filterable,
    hasPrepend: shallowRef(false),
    updateHasPrepend: value => {
      if (value) data.hasPrepend.value = value;
    }
  };
  provide(ListKey, data);
  return parent;
}
function useList() {
  return inject$1(ListKey, null);
}

/* eslint-disable sonarjs/no-identical-functions */
// Utilities
const independentActiveStrategy = mandatory => {
  const strategy = {
    activate: _ref => {
      let {
        id,
        value,
        activated
      } = _ref;
      id = toRaw(id);

      // When mandatory and we're trying to deselect when id
      // is the only currently selected item then do nothing
      if (mandatory && !value && activated.size === 1 && activated.has(id)) return activated;
      if (value) {
        activated.add(id);
      } else {
        activated.delete(id);
      }
      return activated;
    },
    in: (v, children, parents) => {
      let set = new Set();
      if (v != null) {
        for (const id of wrapInArray(v)) {
          set = strategy.activate({
            id,
            value: true,
            activated: new Set(set),
            children,
            parents
          });
        }
      }
      return set;
    },
    out: v => {
      return Array.from(v);
    }
  };
  return strategy;
};
const independentSingleActiveStrategy = mandatory => {
  const parentStrategy = independentActiveStrategy(mandatory);
  const strategy = {
    activate: _ref2 => {
      let {
        activated,
        id,
        ...rest
      } = _ref2;
      id = toRaw(id);
      const singleSelected = activated.has(id) ? new Set([id]) : new Set();
      return parentStrategy.activate({
        ...rest,
        id,
        activated: singleSelected
      });
    },
    in: (v, children, parents) => {
      let set = new Set();
      if (v != null) {
        const arr = wrapInArray(v);
        if (arr.length) {
          set = parentStrategy.in(arr.slice(0, 1), children, parents);
        }
      }
      return set;
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafActiveStrategy = mandatory => {
  const parentStrategy = independentActiveStrategy(mandatory);
  const strategy = {
    activate: _ref3 => {
      let {
        id,
        activated,
        children,
        ...rest
      } = _ref3;
      id = toRaw(id);
      if (children.has(id)) return activated;
      return parentStrategy.activate({
        id,
        activated,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleActiveStrategy = mandatory => {
  const parentStrategy = independentSingleActiveStrategy(mandatory);
  const strategy = {
    activate: _ref4 => {
      let {
        id,
        activated,
        children,
        ...rest
      } = _ref4;
      id = toRaw(id);
      if (children.has(id)) return activated;
      return parentStrategy.activate({
        id,
        activated,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};

const singleOpenStrategy = {
  open: _ref => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref;
    if (value) {
      const newOpened = new Set();
      newOpened.add(id);
      let parent = parents.get(id);
      while (parent != null) {
        newOpened.add(parent);
        parent = parents.get(parent);
      }
      return newOpened;
    } else {
      opened.delete(id);
      return opened;
    }
  },
  select: () => null
};
const multipleOpenStrategy = {
  open: _ref2 => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref2;
    if (value) {
      let parent = parents.get(id);
      opened.add(id);
      while (parent != null && parent !== id) {
        opened.add(parent);
        parent = parents.get(parent);
      }
      return opened;
    } else {
      opened.delete(id);
    }
    return opened;
  },
  select: () => null
};
const listOpenStrategy = {
  open: multipleOpenStrategy.open,
  select: _ref3 => {
    let {
      id,
      value,
      opened,
      parents
    } = _ref3;
    if (!value) return opened;
    const path = [];
    let parent = parents.get(id);
    while (parent != null) {
      path.push(parent);
      parent = parents.get(parent);
    }
    return new Set(path);
  }
};

/* eslint-disable sonarjs/no-identical-functions */
// Utilities
const independentSelectStrategy = mandatory => {
  const strategy = {
    select: _ref => {
      let {
        id,
        value,
        selected
      } = _ref;
      id = toRaw(id);

      // When mandatory and we're trying to deselect when id
      // is the only currently selected item then do nothing
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref2) => {
          let [key, value] = _ref2;
          if (value === 'on') arr.push(key);
          return arr;
        }, []);
        if (on.length === 1 && on[0] === id) return selected;
      }
      selected.set(id, value ? 'on' : 'off');
      return selected;
    },
    in: (v, children, parents, disabled) => {
      const map = new Map();
      for (const id of v || []) {
        strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled
        });
      }
      return map;
    },
    out: v => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === 'on') arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const independentSingleSelectStrategy = mandatory => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: _ref3 => {
      let {
        selected,
        id,
        ...rest
      } = _ref3;
      id = toRaw(id);
      const singleSelected = selected.has(id) ? new Map([[id, selected.get(id)]]) : new Map();
      return parentStrategy.select({
        ...rest,
        id,
        selected: singleSelected
      });
    },
    in: (v, children, parents, disabled) => {
      if (v?.length) {
        return parentStrategy.in(v.slice(0, 1), children, parents, disabled);
      }
      return new Map();
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    }
  };
  return strategy;
};
const leafSelectStrategy = mandatory => {
  const parentStrategy = independentSelectStrategy(mandatory);
  const strategy = {
    select: _ref4 => {
      let {
        id,
        selected,
        children,
        ...rest
      } = _ref4;
      id = toRaw(id);
      if (children.has(id)) return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const leafSingleSelectStrategy = mandatory => {
  const parentStrategy = independentSingleSelectStrategy(mandatory);
  const strategy = {
    select: _ref5 => {
      let {
        id,
        selected,
        children,
        ...rest
      } = _ref5;
      id = toRaw(id);
      if (children.has(id)) return selected;
      return parentStrategy.select({
        id,
        selected,
        children,
        ...rest
      });
    },
    in: parentStrategy.in,
    out: parentStrategy.out
  };
  return strategy;
};
const classicSelectStrategy = mandatory => {
  const strategy = {
    select: _ref6 => {
      let {
        id,
        value,
        selected,
        children,
        parents,
        disabled
      } = _ref6;
      id = toRaw(id);
      const original = new Map(selected);
      const items = [id];
      while (items.length) {
        const item = items.shift();
        if (!disabled.has(item)) {
          selected.set(toRaw(item), value ? 'on' : 'off');
        }
        if (children.has(item)) {
          items.push(...children.get(item));
        }
      }
      let parent = toRaw(parents.get(id));
      while (parent) {
        let everySelected = true;
        let noneSelected = true;
        for (const child of children.get(parent)) {
          const cid = toRaw(child);
          if (disabled.has(cid)) continue;
          if (selected.get(cid) !== 'on') everySelected = false;
          if (selected.has(cid) && selected.get(cid) !== 'off') noneSelected = false;
          if (!everySelected && !noneSelected) break;
        }
        selected.set(parent, everySelected ? 'on' : noneSelected ? 'off' : 'indeterminate');
        parent = toRaw(parents.get(parent));
      }

      // If mandatory and planned deselect results in no selected
      // items then we can't do it, so return original state
      if (mandatory && !value) {
        const on = Array.from(selected.entries()).reduce((arr, _ref7) => {
          let [key, value] = _ref7;
          if (value === 'on') arr.push(key);
          return arr;
        }, []);
        if (on.length === 0) return original;
      }
      return selected;
    },
    in: (v, children, parents, disabled) => {
      let map = new Map();
      for (const id of v || []) {
        map = strategy.select({
          id,
          value: true,
          selected: map,
          children,
          parents,
          disabled
        });
      }
      return map;
    },
    out: (v, children) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === 'on' && !children.has(key)) arr.push(key);
      }
      return arr;
    }
  };
  return strategy;
};
const trunkSelectStrategy = mandatory => {
  const parentStrategy = classicSelectStrategy(mandatory);
  const strategy = {
    select: parentStrategy.select,
    in: parentStrategy.in,
    out: (v, children, parents) => {
      const arr = [];
      for (const [key, value] of v.entries()) {
        if (value === 'on') {
          if (parents.has(key)) {
            const parent = parents.get(key);
            if (v.get(parent) === 'on') continue;
          }
          arr.push(key);
        }
      }
      return arr;
    }
  };
  return strategy;
};

// Composables

// Types

const VNestedSymbol = Symbol.for('vuetify:nested');
const emptyNested = {
  id: shallowRef(),
  root: {
    register: () => null,
    unregister: () => null,
    children: ref(new Map()),
    parents: ref(new Map()),
    disabled: ref(new Set()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: ref(false),
    selectable: ref(false),
    opened: ref(new Set()),
    activated: ref(new Set()),
    selected: ref(new Map()),
    selectedValues: ref([]),
    getPath: () => []
  }
};
const makeNestedProps = propsFactory({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean
}, 'nested');
const useNested = props => {
  let isUnmounted = false;
  const children = shallowRef(new Map());
  const parents = shallowRef(new Map());
  const disabled = shallowRef(new Set());
  const opened = useProxiedModel(props, 'opened', props.opened, v => new Set(Array.isArray(v) ? v.map(i => toRaw(i)) : v), v => [...v.values()]);
  const activeStrategy = computed(() => {
    if (typeof props.activeStrategy === 'object') return props.activeStrategy;
    if (typeof props.activeStrategy === 'function') return props.activeStrategy(props.mandatory);
    switch (props.activeStrategy) {
      case 'leaf':
        return leafActiveStrategy(props.mandatory);
      case 'single-leaf':
        return leafSingleActiveStrategy(props.mandatory);
      case 'independent':
        return independentActiveStrategy(props.mandatory);
      case 'single-independent':
      default:
        return independentSingleActiveStrategy(props.mandatory);
    }
  });
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === 'object') return props.selectStrategy;
    if (typeof props.selectStrategy === 'function') return props.selectStrategy(props.mandatory);
    switch (props.selectStrategy) {
      case 'single-leaf':
        return leafSingleSelectStrategy(props.mandatory);
      case 'leaf':
        return leafSelectStrategy(props.mandatory);
      case 'independent':
        return independentSelectStrategy(props.mandatory);
      case 'single-independent':
        return independentSingleSelectStrategy(props.mandatory);
      case 'trunk':
        return trunkSelectStrategy(props.mandatory);
      case 'classic':
      default:
        return classicSelectStrategy(props.mandatory);
    }
  });
  const openStrategy = computed(() => {
    if (typeof props.openStrategy === 'object') return props.openStrategy;
    switch (props.openStrategy) {
      case 'list':
        return listOpenStrategy;
      case 'single':
        return singleOpenStrategy;
      case 'multiple':
      default:
        return multipleOpenStrategy;
    }
  });
  const activated = useProxiedModel(props, 'activated', props.activated, v => activeStrategy.value.in(v, children.value, parents.value), v => activeStrategy.value.out(v, children.value, parents.value));
  const selected = useProxiedModel(props, 'selected', props.selected, v => selectStrategy.value.in(v, children.value, parents.value, disabled.value), v => selectStrategy.value.out(v, children.value, parents.value));
  onBeforeUnmount(() => {
    isUnmounted = true;
  });
  function getPath(id) {
    const path = [];
    let parent = toRaw(id);
    while (parent !== undefined) {
      path.unshift(parent);
      parent = parents.value.get(parent);
    }
    return path;
  }
  const vm = getCurrentInstance('nested');
  const nodeIds = new Set();
  const nested = {
    id: shallowRef(),
    root: {
      opened,
      activatable: toRef(() => props.activatable),
      selectable: toRef(() => props.selectable),
      activated,
      selected,
      selectedValues: computed(() => {
        const arr = [];
        for (const [key, value] of selected.value.entries()) {
          if (value === 'on') arr.push(key);
        }
        return arr;
      }),
      register: (id, parentId, isDisabled, isGroup) => {
        if (nodeIds.has(id)) {
          const path = getPath(id).map(String).join(' -> ');
          const newPath = getPath(parentId).concat(id).map(String).join(' -> ');
          consoleError(`Multiple nodes with the same ID\n\t${path}\n\t${newPath}`);
          return;
        } else {
          nodeIds.add(id);
        }
        parentId && id !== parentId && parents.value.set(id, parentId);
        isDisabled && disabled.value.add(id);
        isGroup && children.value.set(id, []);
        if (parentId != null) {
          children.value.set(parentId, [...(children.value.get(parentId) || []), id]);
        }
      },
      unregister: id => {
        if (isUnmounted) return;
        nodeIds.delete(id);
        children.value.delete(id);
        disabled.value.delete(id);
        const parent = parents.value.get(id);
        if (parent) {
          const list = children.value.get(parent) ?? [];
          children.value.set(parent, list.filter(child => child !== id));
        }
        parents.value.delete(id);
      },
      open: (id, value, event) => {
        vm.emit('click:open', {
          id,
          value,
          path: getPath(id),
          event
        });
        const newOpened = openStrategy.value.open({
          id,
          value,
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      openOnSelect: (id, value, event) => {
        const newOpened = openStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      select: (id, value, event) => {
        vm.emit('click:select', {
          id,
          value,
          path: getPath(id),
          event
        });
        const newSelected = selectStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          children: children.value,
          parents: parents.value,
          disabled: disabled.value,
          event
        });
        newSelected && (selected.value = newSelected);
        nested.root.openOnSelect(id, value, event);
      },
      activate: (id, value, event) => {
        if (!props.activatable) {
          return nested.root.select(id, true, event);
        }
        vm.emit('click:activate', {
          id,
          value,
          path: getPath(id),
          event
        });
        const newActivated = activeStrategy.value.activate({
          id,
          value,
          activated: new Set(activated.value),
          children: children.value,
          parents: parents.value,
          event
        });
        if (newActivated.size !== activated.value.size) {
          activated.value = newActivated;
        } else {
          for (const value of newActivated) {
            if (!activated.value.has(value)) {
              activated.value = newActivated;
              return;
            }
          }
          for (const value of activated.value) {
            if (!newActivated.has(value)) {
              activated.value = newActivated;
              return;
            }
          }
        }
      },
      children,
      parents,
      disabled,
      getPath
    }
  };
  provide(VNestedSymbol, nested);
  return nested.root;
};
const useNestedItem = (id, isDisabled, isGroup) => {
  const parent = inject$1(VNestedSymbol, emptyNested);
  const uidSymbol = Symbol('nested item');
  const computedId = computed(() => {
    const idValue = toRaw(toValue(id));
    return idValue !== undefined ? idValue : uidSymbol;
  });
  const item = {
    ...parent,
    id: computedId,
    open: (open, e) => parent.root.open(computedId.value, open, e),
    openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    activate: (activated, e) => parent.root.activate(computedId.value, activated, e),
    isActivated: computed(() => parent.root.activated.value.has(computedId.value)),
    select: (selected, e) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(computedId.value) === 'on'),
    isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === 'indeterminate'),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
    isGroupActivator: parent.isGroupActivator
  };
  onBeforeMount(() => {
    if (!parent.isGroupActivator) {
      parent.root.register(computedId.value, parent.id.value, toValue(isDisabled), isGroup);
    }
  });
  onBeforeUnmount(() => {
    if (!parent.isGroupActivator) {
      parent.root.unregister(computedId.value);
    }
  });
  isGroup && provide(VNestedSymbol, item);
  return item;
};
const useNestedGroupActivator = () => {
  const parent = inject$1(VNestedSymbol, emptyNested);
  provide(VNestedSymbol, {
    ...parent,
    isGroupActivator: true
  });
};

const VListGroupActivator = defineComponent({
  name: 'VListGroupActivator',
  setup(_, _ref) {
    let {
      slots
    } = _ref;
    useNestedGroupActivator();
    return () => slots.default?.();
  }
});
const makeVListGroupProps = propsFactory({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: IconValue,
    default: '$collapse'
  },
  disabled: Boolean,
  expandIcon: {
    type: IconValue,
    default: '$expand'
  },
  rawId: [String, Number],
  prependIcon: IconValue,
  appendIcon: IconValue,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VListGroup');
const VListGroup = genericComponent()({
  name: 'VListGroup',
  props: makeVListGroupProps(),
  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    const {
      isOpen,
      open,
      id: _id
    } = useNestedItem(() => props.value, () => props.disabled, true);
    const id = computed(() => `v-list-group--id-${String(props.rawId ?? _id.value)}`);
    const list = useList();
    const {
      isBooted
    } = useSsrBoot();
    function onClick(e) {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      open(!isOpen.value, e);
    }
    const activatorProps = computed(() => ({
      onClick,
      class: 'v-list-group__header',
      id: id.value
    }));
    const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
    const activatorDefaults = computed(() => ({
      VListItem: {
        activeColor: props.activeColor,
        baseColor: props.baseColor,
        color: props.color,
        prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
        appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
        title: props.title,
        value: props.value
      }
    }));
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-list-group', {
        'v-list-group--prepend': list?.hasPrepend.value,
        'v-list-group--fluid': props.fluid,
        'v-list-group--subgroup': props.subgroup,
        'v-list-group--open': isOpen.value
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.activator && createVNode(VDefaultsProvider, {
        "defaults": activatorDefaults.value
      }, {
        default: () => [createVNode(VListGroupActivator, null, {
          default: () => [slots.activator({
            props: activatorProps.value,
            isOpen: isOpen.value
          })]
        })]
      }), createVNode(MaybeTransition, {
        "transition": {
          component: VExpandTransition
        },
        "disabled": !isBooted.value
      }, {
        default: () => [withDirectives(createElementVNode("div", {
          "class": "v-list-group__items",
          "role": "group",
          "aria-labelledby": id.value
        }, [slots.default?.()]), [[vShow, isOpen.value]])]
      })]
    }));
    return {
      isOpen
    };
  }
});

const makeVListItemSubtitleProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VListItemSubtitle');
const VListItemSubtitle = genericComponent()({
  name: 'VListItemSubtitle',
  props: makeVListItemSubtitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-list-item-subtitle', props.class]),
      "style": normalizeStyle([{
        '--v-list-item-subtitle-opacity': props.opacity
      }, props.style])
    }, slots));
    return {};
  }
});

// Utilities
const VListItemTitle = createSimpleFunctional('v-list-item-title');

// Types

const makeVListItemProps = propsFactory({
  active: {
    type: Boolean,
    default: undefined
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: undefined
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  slim: Boolean,
  subtitle: {
    type: [String, Number, Boolean],
    default: undefined
  },
  title: {
    type: [String, Number, Boolean],
    default: undefined
  },
  value: null,
  onClick: EventProp(),
  onClickOnce: EventProp(),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'text'
  })
}, 'VListItem');
const VListItem = genericComponent()({
  name: 'VListItem',
  directives: {
    vRipple: Ripple
  },
  props: makeVListItemProps(),
  emits: {
    click: e => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const link = useLink(props, attrs);
    const id = computed(() => props.value === undefined ? link.href.value : props.value);
    const {
      activate,
      isActivated,
      select,
      isOpen,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      parent,
      openOnSelect,
      id: uid
    } = useNestedItem(id, () => props.disabled, false);
    const list = useList();
    const isActive = computed(() => props.active !== false && (props.active || link.isActive?.value || (root.activatable.value ? isActivated.value : isSelected.value)));
    const isLink = toRef(() => props.link !== false && link.isLink.value);
    const isSelectable = computed(() => !!list && (root.selectable.value || root.activatable.value || props.value != null));
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || isSelectable.value));
    const role = computed(() => list ? isSelectable.value ? 'option' : 'listitem' : undefined);
    const ariaSelected = computed(() => {
      if (!isSelectable.value) return undefined;
      return root.activatable.value ? isActivated.value : root.selectable.value ? isSelected.value : isActive.value;
    });
    const roundedProps = toRef(() => props.rounded || props.nav);
    const color = toRef(() => props.color ?? props.activeColor);
    const variantProps = toRef(() => ({
      color: isActive.value ? color.value ?? props.baseColor : props.baseColor,
      variant: props.variant
    }));

    // useNestedItem doesn't call register until beforeMount,
    // so this can't be an immediate watcher as we don't know parent yet
    watch(() => link.isActive?.value, val => {
      if (!val) return;
      handleActiveLink();
    });
    onBeforeMount(() => {
      if (link.isActive?.value) handleActiveLink();
    });
    function handleActiveLink() {
      if (parent.value != null) {
        root.open(parent.value, true);
      }
      openOnSelect(true);
    }
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(roundedProps);
    const lineClasses = toRef(() => props.lines ? `v-list-item--${props.lines}-line` : undefined);
    const rippleOptions = toRef(() => props.ripple !== undefined && !!props.ripple && list?.filterable ? {
      keys: ['Enter']
    } : props.ripple);
    const slotProps = computed(() => ({
      isActive: isActive.value,
      select,
      isOpen: isOpen.value,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value
    }));
    function onClick(e) {
      emit('click', e);
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      if (!isClickable.value) return;
      link.navigate?.(e);
      if (isGroupActivator) return;
      if (root.activatable.value) {
        activate(!isActivated.value, e);
      } else if (root.selectable.value) {
        select(!isSelected.value, e);
      } else if (props.value != null) {
        select(!isSelected.value, e);
      }
    }
    function onKeyDown(e) {
      const target = e.target;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      if (e.key === 'Enter' || e.key === ' ' && !list?.filterable) {
        e.preventDefault();
        e.stopPropagation();
        e.target.dispatchEvent(new MouseEvent('click', e));
      }
    }
    useRender(() => {
      const Tag = isLink.value ? 'a' : props.tag;
      const hasTitle = slots.title || props.title != null;
      const hasSubtitle = slots.subtitle || props.subtitle != null;
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      list?.updateHasPrepend(hasPrepend);
      if (props.activeColor) {
        deprecate('active-color', ['color', 'base-color']);
      }
      return withDirectives(createVNode(Tag, mergeProps({
        "class": ['v-list-item', {
          'v-list-item--active': isActive.value,
          'v-list-item--disabled': props.disabled,
          'v-list-item--link': isClickable.value,
          'v-list-item--nav': props.nav,
          'v-list-item--prepend': !hasPrepend && list?.hasPrepend.value,
          'v-list-item--slim': props.slim,
          [`${props.activeClass}`]: props.activeClass && isActive.value
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, props.style],
        "tabindex": isClickable.value ? list ? -2 : 0 : undefined,
        "aria-selected": ariaSelected.value,
        "role": role.value,
        "onClick": onClick,
        "onKeydown": isClickable.value && !isLink.value && onKeyDown
      }, link.linkProps), {
        default: () => [genOverlays(isClickable.value || isActive.value, 'v-list-item'), hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-list-item__prepend"
        }, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependAvatar && createVNode(VAvatar, {
          "key": "prepend-avatar",
          "density": props.density,
          "image": props.prependAvatar
        }, null), props.prependIcon && createVNode(VIcon, {
          "key": "prepend-icon",
          "density": props.density,
          "icon": props.prependIcon
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !hasPrependMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.prependAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.prependIcon
            },
            VListItemAction: {
              start: true
            }
          }
        }, {
          default: () => [slots.prepend?.(slotProps.value)]
        }), createElementVNode("div", {
          "class": "v-list-item__spacer"
        }, null)]), createElementVNode("div", {
          "class": "v-list-item__content",
          "data-no-activator": ""
        }, [hasTitle && createVNode(VListItemTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.({
            title: props.title
          }) ?? toDisplayString(props.title)]
        }), hasSubtitle && createVNode(VListItemSubtitle, {
          "key": "subtitle"
        }, {
          default: () => [slots.subtitle?.({
            subtitle: props.subtitle
          }) ?? toDisplayString(props.subtitle)]
        }), slots.default?.(slotProps.value)]), hasAppend && createElementVNode("div", {
          "key": "append",
          "class": "v-list-item__append"
        }, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
          "key": "append-icon",
          "density": props.density,
          "icon": props.appendIcon
        }, null), props.appendAvatar && createVNode(VAvatar, {
          "key": "append-avatar",
          "density": props.density,
          "image": props.appendAvatar
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !hasAppendMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.appendAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.appendIcon
            },
            VListItemAction: {
              end: true
            }
          }
        }, {
          default: () => [slots.append?.(slotProps.value)]
        }), createElementVNode("div", {
          "class": "v-list-item__spacer"
        }, null)])]
      }), [[Ripple, isClickable.value && rippleOptions.value]]);
    });
    return {
      activate,
      isActivated,
      isGroupActivator,
      isSelected,
      list,
      select,
      root,
      id: uid,
      link
    };
  }
});

const makeVListSubheaderProps = propsFactory({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VListSubheader');
const VListSubheader = genericComponent()({
  name: 'VListSubheader',
  props: makeVListSubheaderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    useRender(() => {
      const hasText = !!(slots.default || props.title);
      return createVNode(props.tag, {
        "class": normalizeClass(['v-list-subheader', {
          'v-list-subheader--inset': props.inset,
          'v-list-subheader--sticky': props.sticky
        }, textColorClasses.value, props.class]),
        "style": normalizeStyle([{
          textColorStyles
        }, props.style])
      }, {
        default: () => [hasText && createElementVNode("div", {
          "class": "v-list-subheader__text"
        }, [slots.default?.() ?? props.title])]
      });
    });
    return {};
  }
});

// Types

const makeVListChildrenProps = propsFactory({
  items: Array,
  returnObject: Boolean
}, 'VListChildren');
const VListChildren = genericComponent()({
  name: 'VListChildren',
  props: makeVListChildrenProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    createList();
    return () => slots.default?.() ?? props.items?.map(_ref2 => {
      let {
        children,
        props: itemProps,
        type,
        raw: item
      } = _ref2;
      if (type === 'divider') {
        return slots.divider?.({
          props: itemProps
        }) ?? createVNode(VDivider, itemProps, null);
      }
      if (type === 'subheader') {
        return slots.subheader?.({
          props: itemProps
        }) ?? createVNode(VListSubheader, itemProps, null);
      }
      const slotsWithItem = {
        subtitle: slots.subtitle ? slotProps => slots.subtitle?.({
          ...slotProps,
          item
        }) : undefined,
        prepend: slots.prepend ? slotProps => slots.prepend?.({
          ...slotProps,
          item
        }) : undefined,
        append: slots.append ? slotProps => slots.append?.({
          ...slotProps,
          item
        }) : undefined,
        title: slots.title ? slotProps => slots.title?.({
          ...slotProps,
          item
        }) : undefined
      };
      const listGroupProps = VListGroup.filterProps(itemProps);
      return children ? createVNode(VListGroup, mergeProps(listGroupProps, {
        "value": props.returnObject ? item : itemProps?.value,
        "rawId": itemProps?.value
      }), {
        activator: _ref3 => {
          let {
            props: activatorProps
          } = _ref3;
          const listItemProps = mergeProps(itemProps, activatorProps, {
            value: props.returnObject ? item : itemProps.value
          });
          return slots.header ? slots.header({
            props: listItemProps
          }) : createVNode(VListItem, listItemProps, slotsWithItem);
        },
        default: () => createVNode(VListChildren, {
          "items": children,
          "returnObject": props.returnObject
        }, slots)
      }) : slots.item ? slots.item({
        props: itemProps
      }) : createVNode(VListItem, mergeProps(itemProps, {
        "value": props.returnObject ? item : itemProps.value
      }), slotsWithItem);
    });
  }
});

// Utilities

// Types

// Composables
const makeItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: 'title'
  },
  itemValue: {
    type: [String, Array, Function],
    default: 'value'
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: 'children'
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: 'props'
  },
  itemType: {
    type: [Boolean, String, Array, Function],
    default: 'type'
  },
  returnObject: Boolean,
  valueComparator: Function
}, 'list-items');
const itemTypes$1 = new Set(['item', 'divider', 'subheader']);
function transformItem$3(props, item) {
  const title = getPropertyFromItem(item, props.itemTitle, item);
  const value = getPropertyFromItem(item, props.itemValue, title);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? typeof item === 'object' && item != null && !Array.isArray(item) ? 'children' in item ? omit(item, ['children']) : item : undefined : getPropertyFromItem(item, props.itemProps);
  let type = getPropertyFromItem(item, props.itemType, 'item');
  if (!itemTypes$1.has(type)) {
    type = 'item';
  }
  const _props = {
    title,
    value,
    ...itemProps
  };
  return {
    type,
    title: String(_props.title ?? ''),
    value: _props.value,
    props: _props,
    children: type === 'item' && Array.isArray(children) ? transformItems$3(props, children) : undefined,
    raw: item
  };
}
transformItem$3.neededProps = ['itemTitle', 'itemValue', 'itemChildren', 'itemProps', 'itemType'];
function transformItems$3(props, items) {
  // avoid reactive access in the loop
  const _props = pick(props, transformItem$3.neededProps);
  const array = [];
  for (const item of items) {
    array.push(transformItem$3(_props, item));
  }
  return array;
}
function useItems(props) {
  const items = computed(() => transformItems$3(props, props.items));
  const hasNullItem = computed(() => items.value.some(item => item.value === null));
  const itemsMap = shallowRef(new Map());
  const keylessItems = shallowRef([]);
  watchEffect(() => {
    const _items = items.value;
    const map = new Map();
    const keyless = [];
    for (let i = 0; i < _items.length; i++) {
      const item = _items[i];
      if (isPrimitive(item.value) || item.value === null) {
        let values = map.get(item.value);
        if (!values) {
          values = [];
          map.set(item.value, values);
        }
        values.push(item);
      } else {
        keyless.push(item);
      }
    }
    itemsMap.value = map;
    keylessItems.value = keyless;
  });
  function transformIn(value) {
    // Cache unrefed values outside the loop,
    // proxy getters can be slow when you call them a billion times
    const _items = itemsMap.value;
    const _allItems = items.value;
    const _keylessItems = keylessItems.value;
    const _hasNullItem = hasNullItem.value;
    const _returnObject = props.returnObject;
    const hasValueComparator = !!props.valueComparator;
    const valueComparator = props.valueComparator || deepEqual;
    const _props = pick(props, transformItem$3.neededProps);
    const returnValue = [];
    main: for (const v of value) {
      // When the model value is null, return an InternalItem
      // based on null only if null is one of the items
      if (!_hasNullItem && v === null) continue;

      // String model value means value is a custom input value from combobox
      // Don't look up existing items if the model value is a string
      if (_returnObject && typeof v === 'string') {
        returnValue.push(transformItem$3(_props, v));
        continue;
      }

      // Fast path, items with primitive values and no
      // custom valueComparator can use a constant-time
      // map lookup instead of searching the items array
      const fastItems = _items.get(v);

      // Slow path, always use valueComparator.
      // This is O(n^2) so we really don't want to
      // do it for more than a couple hundred items.
      if (hasValueComparator || !fastItems) {
        for (const item of hasValueComparator ? _allItems : _keylessItems) {
          if (valueComparator(v, item.value)) {
            returnValue.push(item);
            continue main;
          }
        }
        // Not an existing item, construct it from the model (#4000)
        returnValue.push(transformItem$3(_props, v));
        continue;
      }
      returnValue.push(...fastItems);
    }
    return returnValue;
  }
  function transformOut(value) {
    return props.returnObject ? value.map(_ref => {
      let {
        raw
      } = _ref;
      return raw;
    }) : value.map(_ref2 => {
      let {
        value
      } = _ref2;
      return value;
    });
  }
  return {
    items,
    transformIn,
    transformOut
  };
}

// Types

const itemTypes = new Set(['item', 'divider', 'subheader']);
function transformItem$2(props, item) {
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
  const value = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemValue, undefined);
  const children = getPropertyFromItem(item, props.itemChildren);
  const itemProps = props.itemProps === true ? omit(item, ['children']) : getPropertyFromItem(item, props.itemProps);
  let type = getPropertyFromItem(item, props.itemType, 'item');
  if (!itemTypes.has(type)) {
    type = 'item';
  }
  const _props = {
    title,
    value,
    ...itemProps
  };
  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === 'item' && children ? transformItems$2(props, children) : undefined,
    raw: item
  };
}
function transformItems$2(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem$2(props, item));
  }
  return array;
}
function useListItems(props) {
  const items = computed(() => transformItems$2(props, props.items));
  return {
    items
  };
}
const makeVListProps = propsFactory({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  filterable: Boolean,
  expandIcon: IconValue,
  collapseIcon: IconValue,
  lines: {
    type: [Boolean, String],
    default: 'one'
  },
  slim: Boolean,
  nav: Boolean,
  'onClick:open': EventProp(),
  'onClick:select': EventProp(),
  'onUpdate:opened': EventProp(),
  ...makeNestedProps({
    selectStrategy: 'single-leaf',
    openStrategy: 'list'
  }),
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeItemsProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'text'
  })
}, 'VList');
const VList = genericComponent()({
  name: 'VList',
  props: makeVListProps(),
  emits: {
    'update:selected': value => true,
    'update:activated': value => true,
    'update:opened': value => true,
    'click:open': value => true,
    'click:activate': value => true,
    'click:select': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      items
    } = useListItems(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      children,
      open,
      parents,
      select,
      getPath
    } = useNested(props);
    const lineClasses = toRef(() => props.lines ? `v-list--${props.lines}-line` : undefined);
    const activeColor = toRef(() => props.activeColor);
    const baseColor = toRef(() => props.baseColor);
    const color = toRef(() => props.color);
    const isSelectable = toRef(() => props.selectable || props.activatable);
    createList({
      filterable: props.filterable
    });
    provideDefaults({
      VListGroup: {
        activeColor,
        baseColor,
        color,
        expandIcon: toRef(() => props.expandIcon),
        collapseIcon: toRef(() => props.collapseIcon)
      },
      VListItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor,
        baseColor,
        color,
        density: toRef(() => props.density),
        disabled: toRef(() => props.disabled),
        lines: toRef(() => props.lines),
        nav: toRef(() => props.nav),
        slim: toRef(() => props.slim),
        variant: toRef(() => props.variant)
      }
    });
    const isFocused = shallowRef(false);
    const contentRef = ref();
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onFocusout(e) {
      isFocused.value = false;
    }
    function onFocus(e) {
      if (!isFocused.value && !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget))) focus();
    }
    function onKeydown(e) {
      const target = e.target;
      if (!contentRef.value || target.tagName === 'INPUT' && ['Home', 'End'].includes(e.key) || target.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowDown') {
        focus('next');
      } else if (e.key === 'ArrowUp') {
        focus('prev');
      } else if (e.key === 'Home') {
        focus('first');
      } else if (e.key === 'End') {
        focus('last');
      } else {
        return;
      }
      e.preventDefault();
    }
    function onMousedown(e) {
      isFocused.value = true;
    }
    function focus(location) {
      if (contentRef.value) {
        return focusChild(contentRef.value, location);
      }
    }
    useRender(() => {
      return createVNode(props.tag, {
        "ref": contentRef,
        "class": normalizeClass(['v-list', {
          'v-list--disabled': props.disabled,
          'v-list--nav': props.nav,
          'v-list--slim': props.slim
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, props.style]),
        "tabindex": props.disabled ? -1 : 0,
        "role": isSelectable.value ? 'listbox' : 'list',
        "aria-activedescendant": undefined,
        "onFocusin": onFocusin,
        "onFocusout": onFocusout,
        "onFocus": onFocus,
        "onKeydown": onKeydown,
        "onMousedown": onMousedown
      }, {
        default: () => [createVNode(VListChildren, {
          "items": items.value,
          "returnObject": props.returnObject
        }, slots)]
      });
    });
    return {
      open,
      select,
      focus,
      children,
      parents,
      getPath
    };
  }
});

// Utilities
const VListImg = createSimpleFunctional('v-list-img');

const makeVListItemActionProps = propsFactory({
  start: Boolean,
  end: Boolean,
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VListItemAction');
const VListItemAction = genericComponent()({
  name: 'VListItemAction',
  props: makeVListItemActionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-list-item-action', {
        'v-list-item-action--start': props.start,
        'v-list-item-action--end': props.end
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, slots));
    return {};
  }
});

const makeVListItemMediaProps = propsFactory({
  start: Boolean,
  end: Boolean,
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VListItemMedia');
const VListItemMedia = genericComponent()({
  name: 'VListItemMedia',
  props: makeVListItemMediaProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      return createVNode(props.tag, {
        "class": normalizeClass(['v-list-item-media', {
          'v-list-item-media--start': props.start,
          'v-list-item-media--end': props.end
        }, props.class]),
        "style": normalizeStyle(props.style)
      }, slots);
    });
    return {};
  }
});

// Types

/** Convert a point in local space to viewport space */
function elementToViewport(point, offset) {
  return {
    x: point.x + offset.x,
    y: point.y + offset.y
  };
}

/** Get the difference between two points */
function getOffset$1(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}

/** Convert an anchor object to a point in local space */
function anchorToPoint(anchor, box) {
  if (anchor.side === 'top' || anchor.side === 'bottom') {
    const {
      side,
      align
    } = anchor;
    const x = align === 'left' ? 0 : align === 'center' ? box.width / 2 : align === 'right' ? box.width : align;
    const y = side === 'top' ? 0 : side === 'bottom' ? box.height : side;
    return elementToViewport({
      x,
      y
    }, box);
  } else if (anchor.side === 'left' || anchor.side === 'right') {
    const {
      side,
      align
    } = anchor;
    const x = side === 'left' ? 0 : side === 'right' ? box.width : side;
    const y = align === 'top' ? 0 : align === 'center' ? box.height / 2 : align === 'bottom' ? box.height : align;
    return elementToViewport({
      x,
      y
    }, box);
  }
  return elementToViewport({
    x: box.width / 2,
    y: box.height / 2
  }, box);
}

// Composables

// Types

const locationStrategies = {
  static: staticLocationStrategy,
  // specific viewport position, usually centered
  connected: connectedLocationStrategy // connected to a certain element
};
const makeLocationStrategyProps = propsFactory({
  locationStrategy: {
    type: [String, Function],
    default: 'static',
    validator: val => typeof val === 'function' || val in locationStrategies
  },
  location: {
    type: String,
    default: 'bottom'
  },
  origin: {
    type: String,
    default: 'auto'
  },
  offset: [Number, String, Array],
  stickToTarget: Boolean
}, 'VOverlay-location-strategies');
function useLocationStrategies(props, data) {
  const contentStyles = ref({});
  const updateLocation = ref();
  if (IN_BROWSER) {
    useToggleScope(() => !!(data.isActive.value && props.locationStrategy), reset => {
      watch(() => props.locationStrategy, reset);
      onScopeDispose(() => {
        window.removeEventListener('resize', onResize);
        visualViewport?.removeEventListener('resize', onVisualResize);
        visualViewport?.removeEventListener('scroll', onVisualScroll);
        updateLocation.value = undefined;
      });
      window.addEventListener('resize', onResize, {
        passive: true
      });
      visualViewport?.addEventListener('resize', onVisualResize, {
        passive: true
      });
      visualViewport?.addEventListener('scroll', onVisualScroll, {
        passive: true
      });
      if (typeof props.locationStrategy === 'function') {
        updateLocation.value = props.locationStrategy(data, props, contentStyles)?.updateLocation;
      } else {
        updateLocation.value = locationStrategies[props.locationStrategy](data, props, contentStyles)?.updateLocation;
      }
    });
  }
  function onResize(e) {
    updateLocation.value?.(e);
  }
  function onVisualResize(e) {
    updateLocation.value?.(e);
  }
  function onVisualScroll(e) {
    updateLocation.value?.(e);
  }
  return {
    contentStyles,
    updateLocation
  };
}
function staticLocationStrategy() {
  // TODO
}

/** Get size of element ignoring max-width/max-height */
function getIntrinsicSize(el, isRtl) {
  // const scrollables = new Map<Element, [number, number]>()
  // el.querySelectorAll('*').forEach(el => {
  //   const x = el.scrollLeft
  //   const y = el.scrollTop
  //   if (x || y) {
  //     scrollables.set(el, [x, y])
  //   }
  // })

  // const initialMaxWidth = el.style.maxWidth
  // const initialMaxHeight = el.style.maxHeight
  // el.style.removeProperty('max-width')
  // el.style.removeProperty('max-height')

  /* eslint-disable-next-line sonarjs/prefer-immediate-return */
  const contentBox = nullifyTransforms(el);
  if (isRtl) {
    contentBox.x += parseFloat(el.style.right || 0);
  } else {
    contentBox.x -= parseFloat(el.style.left || 0);
  }
  contentBox.y -= parseFloat(el.style.top || 0);

  // el.style.maxWidth = initialMaxWidth
  // el.style.maxHeight = initialMaxHeight
  // scrollables.forEach((position, el) => {
  //   el.scrollTo(...position)
  // })

  return contentBox;
}
function connectedLocationStrategy(data, props, contentStyles) {
  const activatorFixed = Array.isArray(data.target.value) || isFixedPosition(data.target.value);
  if (activatorFixed) {
    Object.assign(contentStyles.value, {
      position: 'fixed',
      top: 0,
      [data.isRtl.value ? 'right' : 'left']: 0
    });
  }
  const {
    preferredAnchor,
    preferredOrigin
  } = destructComputed(() => {
    const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
    const parsedOrigin = props.origin === 'overlap' ? parsedAnchor : props.origin === 'auto' ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);

    // Some combinations of props may produce an invalid origin
    if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
      return {
        preferredAnchor: flipCorner(parsedAnchor),
        preferredOrigin: flipCorner(parsedOrigin)
      };
    } else {
      return {
        preferredAnchor: parsedAnchor,
        preferredOrigin: parsedOrigin
      };
    }
  });
  const [minWidth, minHeight, maxWidth, maxHeight] = ['minWidth', 'minHeight', 'maxWidth', 'maxHeight'].map(key => {
    return computed(() => {
      const val = parseFloat(props[key]);
      return isNaN(val) ? Infinity : val;
    });
  });
  const offset = computed(() => {
    if (Array.isArray(props.offset)) {
      return props.offset;
    }
    if (typeof props.offset === 'string') {
      const offset = props.offset.split(' ').map(parseFloat);
      if (offset.length < 2) offset.push(0);
      return offset;
    }
    return typeof props.offset === 'number' ? [props.offset, 0] : [0, 0];
  });
  let observe = false;
  let lastFrame = -1;
  const flipped = new CircularBuffer(4);
  const observer = new ResizeObserver(() => {
    if (!observe) return;

    // Detect consecutive frames
    requestAnimationFrame(newTime => {
      if (newTime !== lastFrame) flipped.clear();
      requestAnimationFrame(newNewTime => {
        lastFrame = newNewTime;
      });
    });
    if (flipped.isFull) {
      const values = flipped.values();
      if (deepEqual(values.at(-1), values.at(-3)) && !deepEqual(values.at(-1), values.at(-2))) {
        // Flipping is causing a container resize loop
        return;
      }
    }
    const result = updateLocation();
    if (result) flipped.push(result.flipped);
  });
  let targetBox = new Box({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  watch(data.target, (newTarget, oldTarget) => {
    if (oldTarget && !Array.isArray(oldTarget)) observer.unobserve(oldTarget);
    if (!Array.isArray(newTarget)) {
      if (newTarget) observer.observe(newTarget);
    } else if (!deepEqual(newTarget, oldTarget)) {
      updateLocation();
    }
  }, {
    immediate: true
  });
  watch(data.contentEl, (newContentEl, oldContentEl) => {
    if (oldContentEl) observer.unobserve(oldContentEl);
    if (newContentEl) observer.observe(newContentEl);
  }, {
    immediate: true
  });
  onScopeDispose(() => {
    observer.disconnect();
  });

  // eslint-disable-next-line max-statements
  function updateLocation() {
    observe = false;
    requestAnimationFrame(() => observe = true);
    if (!data.target.value || !data.contentEl.value) return;
    if (Array.isArray(data.target.value) || data.target.value.offsetParent || data.target.value.getClientRects().length) {
      targetBox = getTargetBox(data.target.value);
    } // Otherwise target element is hidden, use last known value

    const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value);
    const scrollParents = getScrollParents(data.contentEl.value);
    const viewportMargin = 12;
    if (!scrollParents.length) {
      scrollParents.push(document.documentElement);
      if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
        contentBox.x -= parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-x') || 0);
        contentBox.y -= parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-y') || 0);
      }
    }
    const viewport = scrollParents.reduce((box, el) => {
      const scrollBox = getElementBox(el);
      if (box) {
        return new Box({
          x: Math.max(box.left, scrollBox.left),
          y: Math.max(box.top, scrollBox.top),
          width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
          height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
        });
      }
      return scrollBox;
    }, undefined);
    viewport.x += viewportMargin;
    viewport.y += viewportMargin;
    viewport.width -= viewportMargin * 2;
    viewport.height -= viewportMargin * 2;
    let placement = {
      anchor: preferredAnchor.value,
      origin: preferredOrigin.value
    };
    function checkOverflow(_placement) {
      const box = new Box(contentBox);
      const targetPoint = anchorToPoint(_placement.anchor, targetBox);
      const contentPoint = anchorToPoint(_placement.origin, box);
      let {
        x,
        y
      } = getOffset$1(targetPoint, contentPoint);
      switch (_placement.anchor.side) {
        case 'top':
          y -= offset.value[0];
          break;
        case 'bottom':
          y += offset.value[0];
          break;
        case 'left':
          x -= offset.value[0];
          break;
        case 'right':
          x += offset.value[0];
          break;
      }
      switch (_placement.anchor.align) {
        case 'top':
          y -= offset.value[1];
          break;
        case 'bottom':
          y += offset.value[1];
          break;
        case 'left':
          x -= offset.value[1];
          break;
        case 'right':
          x += offset.value[1];
          break;
      }
      box.x += x;
      box.y += y;
      box.width = Math.min(box.width, maxWidth.value);
      box.height = Math.min(box.height, maxHeight.value);
      const overflows = getOverflow(box, viewport);
      return {
        overflows,
        x,
        y
      };
    }
    let x = 0;
    let y = 0;
    const available = {
      x: 0,
      y: 0
    };
    const flipped = {
      x: false,
      y: false
    };
    let resets = -1;
    while (true) {
      if (resets++ > 10) {
        consoleError('Infinite loop detected in connectedLocationStrategy');
        break;
      }
      const {
        x: _x,
        y: _y,
        overflows
      } = checkOverflow(placement);
      x += _x;
      y += _y;
      contentBox.x += _x;
      contentBox.y += _y;

      // flip
      {
        const axis = getAxis(placement.anchor);
        const hasOverflowX = overflows.x.before || overflows.x.after;
        const hasOverflowY = overflows.y.before || overflows.y.after;
        let reset = false;
        ['x', 'y'].forEach(key => {
          if (key === 'x' && hasOverflowX && !flipped.x || key === 'y' && hasOverflowY && !flipped.y) {
            const newPlacement = {
              anchor: {
                ...placement.anchor
              },
              origin: {
                ...placement.origin
              }
            };
            const flip = key === 'x' ? axis === 'y' ? flipAlign : flipSide : axis === 'y' ? flipSide : flipAlign;
            newPlacement.anchor = flip(newPlacement.anchor);
            newPlacement.origin = flip(newPlacement.origin);
            const {
              overflows: newOverflows
            } = checkOverflow(newPlacement);
            if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
              placement = newPlacement;
              reset = flipped[key] = true;
            }
          }
        });
        if (reset) continue;
      }

      // shift
      if (overflows.x.before) {
        if (!props.stickToTarget) x += overflows.x.before;
        contentBox.x += overflows.x.before;
      }
      if (overflows.x.after) {
        if (!props.stickToTarget) x -= overflows.x.after;
        contentBox.x -= overflows.x.after;
      }
      if (overflows.y.before) {
        if (!props.stickToTarget) y += overflows.y.before;
        contentBox.y += overflows.y.before;
      }
      if (overflows.y.after) {
        if (!props.stickToTarget) y -= overflows.y.after;
        contentBox.y -= overflows.y.after;
      }

      // size
      {
        const overflows = getOverflow(contentBox, viewport);
        available.x = viewport.width - overflows.x.before - overflows.x.after;
        available.y = viewport.height - overflows.y.before - overflows.y.after;
        if (!props.stickToTarget) x += overflows.x.before;
        contentBox.x += overflows.x.before;
        if (!props.stickToTarget) y += overflows.y.before;
        contentBox.y += overflows.y.before;
      }
      break;
    }
    const axis = getAxis(placement.anchor);
    Object.assign(contentStyles.value, {
      '--v-overlay-anchor-origin': `${placement.anchor.side} ${placement.anchor.align}`,
      transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: convertToUnit(pixelRound(y)),
      left: data.isRtl.value ? undefined : convertToUnit(pixelRound(x)),
      right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : undefined,
      minWidth: convertToUnit(axis === 'y' ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
      maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
      maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
    });
    return {
      available,
      contentBox,
      flipped
    };
  }
  watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation());
  nextTick(() => {
    const result = updateLocation();

    // TODO: overflowing content should only require a single updateLocation call
    // Icky hack to make sure the content is positioned consistently
    if (!result) return;
    const {
      available,
      contentBox
    } = result;
    if (contentBox.height > available.y) {
      requestAnimationFrame(() => {
        updateLocation();
        requestAnimationFrame(() => {
          updateLocation();
        });
      });
    }
  });
  return {
    updateLocation
  };
}
function pixelRound(val) {
  return Math.round(val * devicePixelRatio) / devicePixelRatio;
}
function pixelCeil(val) {
  return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
}

let clean = true;
const frames = [];

/**
 * Schedule a task to run in an animation frame on its own
 * This is useful for heavy tasks that may cause jank if all ran together
 */
function requestNewFrame(cb) {
  if (!clean || frames.length) {
    frames.push(cb);
    run();
  } else {
    clean = false;
    cb();
    run();
  }
}
let raf = -1;
function run() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const frame = frames.shift();
    if (frame) frame();
    if (frames.length) run();else clean = true;
  });
}

// Utilities

// Types

const scrollStrategies = {
  none: null,
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy
};
const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function],
    default: 'block',
    validator: val => typeof val === 'function' || val in scrollStrategies
  }
}, 'VOverlay-scroll-strategies');
function useScrollStrategies(props, data) {
  if (!IN_BROWSER) return;
  let scope;
  watchEffect(async () => {
    scope?.stop();
    if (!(data.isActive.value && props.scrollStrategy)) return;
    scope = effectScope();
    await new Promise(resolve => setTimeout(resolve));
    scope.active && scope.run(() => {
      if (typeof props.scrollStrategy === 'function') {
        props.scrollStrategy(data, props, scope);
      } else {
        scrollStrategies[props.scrollStrategy]?.(data, props, scope);
      }
    });
  });
  onScopeDispose(() => {
    scope?.stop();
  });
}
function closeScrollStrategy(data) {
  function onScroll(e) {
    data.isActive.value = false;
  }
  bindScroll(getTargetEl(data.target.value, data.contentEl.value), onScroll);
}
function blockScrollStrategy(data, props) {
  const offsetParent = data.root.value?.offsetParent;
  const target = getTargetEl(data.target.value, data.contentEl.value);
  const scrollElements = [...new Set([...getScrollParents(target, props.contained ? offsetParent : undefined), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : undefined)])].filter(el => !el.classList.contains('v-overlay-scroll-blocked'));
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
  const scrollableParent = (el => hasScrollbar(el) && el)(offsetParent || document.documentElement);
  if (scrollableParent) {
    data.root.value.classList.add('v-overlay--scroll-blocked');
  }
  scrollElements.forEach((el, i) => {
    el.style.setProperty('--v-body-scroll-x', convertToUnit(-el.scrollLeft));
    el.style.setProperty('--v-body-scroll-y', convertToUnit(-el.scrollTop));
    if (el !== document.documentElement) {
      el.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth));
    }
    el.classList.add('v-overlay-scroll-blocked');
  });
  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      const x = parseFloat(el.style.getPropertyValue('--v-body-scroll-x'));
      const y = parseFloat(el.style.getPropertyValue('--v-body-scroll-y'));
      const scrollBehavior = el.style.scrollBehavior;
      el.style.scrollBehavior = 'auto';
      el.style.removeProperty('--v-body-scroll-x');
      el.style.removeProperty('--v-body-scroll-y');
      el.style.removeProperty('--v-scrollbar-offset');
      el.classList.remove('v-overlay-scroll-blocked');
      el.scrollLeft = -x;
      el.scrollTop = -y;
      el.style.scrollBehavior = scrollBehavior;
    });
    if (scrollableParent) {
      data.root.value.classList.remove('v-overlay--scroll-blocked');
    }
  });
}
function repositionScrollStrategy(data, props, scope) {
  let slow = false;
  let raf = -1;
  let ric = -1;
  function update(e) {
    requestNewFrame(() => {
      const start = performance.now();
      data.updateLocation.value?.(e);
      const time = performance.now() - start;
      slow = time / (1000 / 60) > 2;
    });
  }
  ric = (typeof requestIdleCallback === 'undefined' ? cb => cb() : requestIdleCallback)(() => {
    scope.run(() => {
      bindScroll(getTargetEl(data.target.value, data.contentEl.value), e => {
        if (slow) {
          // If the position calculation is slow,
          // defer updates until scrolling is finished.
          // Browsers usually fire one scroll event per frame so
          // we just wait until we've got two frames without an event
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            raf = requestAnimationFrame(() => {
              update(e);
            });
          });
        } else {
          update(e);
        }
      });
    });
  });
  onScopeDispose(() => {
    typeof cancelIdleCallback !== 'undefined' && cancelIdleCallback(ric);
    cancelAnimationFrame(raf);
  });
}
function getTargetEl(target, contentEl) {
  return Array.isArray(target) ? document.elementsFromPoint(...target).find(el => !contentEl?.contains(el)) : target ?? contentEl;
}
function bindScroll(el, onScroll) {
  const scrollElements = [document, ...getScrollParents(el)];
  scrollElements.forEach(el => {
    el.addEventListener('scroll', onScroll, {
      passive: true
    });
  });
  onScopeDispose(() => {
    scrollElements.forEach(el => {
      el.removeEventListener('scroll', onScroll);
    });
  });
}

// Types

const VMenuSymbol = Symbol.for('vuetify:v-menu');

// Utilities

// Types

// Composables
const makeDelayProps = propsFactory({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, 'delay');
function useDelay(props, cb) {
  let clearDelay = () => {};
  function runDelay(isOpening) {
    clearDelay?.();
    const delay = Number(isOpening ? props.openDelay : props.closeDelay);
    return new Promise(resolve => {
      clearDelay = defer(delay, () => {
        cb?.(isOpening);
        resolve(isOpening);
      });
    });
  }
  function runOpenDelay() {
    return runDelay(true);
  }
  function runCloseDelay() {
    return runDelay(false);
  }
  return {
    clearDelay,
    runOpenDelay,
    runCloseDelay
  };
}

// Components

// Types

const makeActivatorProps = propsFactory({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: undefined
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: undefined
  },
  closeOnContentClick: Boolean,
  ...makeDelayProps()
}, 'VOverlay-activator');
function useActivator(props, _ref) {
  let {
    isActive,
    isTop,
    contentEl
  } = _ref;
  const vm = getCurrentInstance('useActivator');
  const activatorEl = ref();
  let isHovered = false;
  let isFocused = false;
  let firstEnter = true;
  const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
  const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
  const {
    runOpenDelay,
    runCloseDelay
  } = useDelay(props, value => {
    if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
      if (isActive.value !== value) {
        firstEnter = true;
      }
      isActive.value = value;
    }
  });
  const cursorTarget = ref();
  const availableEvents = {
    onClick: e => {
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      if (!isActive.value) {
        cursorTarget.value = [e.clientX, e.clientY];
      }
      isActive.value = !isActive.value;
    },
    onMouseenter: e => {
      if (e.sourceCapabilities?.firesTouchEvents) return;
      isHovered = true;
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onMouseleave: e => {
      isHovered = false;
      runCloseDelay();
    },
    onFocus: e => {
      if (matchesSelector(e.target, ':focus-visible') === false) return;
      isFocused = true;
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      runOpenDelay();
    },
    onBlur: e => {
      isFocused = false;
      e.stopPropagation();
      runCloseDelay();
    }
  };
  const activatorEvents = computed(() => {
    const events = {};
    if (openOnClick.value) {
      events.onClick = availableEvents.onClick;
    }
    if (props.openOnHover) {
      events.onMouseenter = availableEvents.onMouseenter;
      events.onMouseleave = availableEvents.onMouseleave;
    }
    if (openOnFocus.value) {
      events.onFocus = availableEvents.onFocus;
      events.onBlur = availableEvents.onBlur;
    }
    return events;
  });
  const contentEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        isHovered = true;
        runOpenDelay();
      };
      events.onMouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    if (openOnFocus.value) {
      events.onFocusin = () => {
        isFocused = true;
        runOpenDelay();
      };
      events.onFocusout = () => {
        isFocused = false;
        runCloseDelay();
      };
    }
    if (props.closeOnContentClick) {
      const menu = inject$1(VMenuSymbol, null);
      events.onClick = () => {
        isActive.value = false;
        menu?.closeParents();
      };
    }
    return events;
  });
  const scrimEvents = computed(() => {
    const events = {};
    if (props.openOnHover) {
      events.onMouseenter = () => {
        if (firstEnter) {
          isHovered = true;
          firstEnter = false;
          runOpenDelay();
        }
      };
      events.onMouseleave = () => {
        isHovered = false;
        runCloseDelay();
      };
    }
    return events;
  });
  watch(isTop, val => {
    if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered)) && !contentEl.value?.contains(document.activeElement)) {
      isActive.value = false;
    }
  });
  watch(isActive, val => {
    if (!val) {
      setTimeout(() => {
        cursorTarget.value = undefined;
      });
    }
  }, {
    flush: 'post'
  });
  const activatorRef = templateRef();
  watchEffect(() => {
    if (!activatorRef.value) return;
    nextTick(() => {
      activatorEl.value = activatorRef.el;
    });
  });
  const targetRef = templateRef();
  const target = computed(() => {
    if (props.target === 'cursor' && cursorTarget.value) return cursorTarget.value;
    if (targetRef.value) return targetRef.el;
    return getTarget(props.target, vm) || activatorEl.value;
  });
  const targetEl = computed(() => {
    return Array.isArray(target.value) ? undefined : target.value;
  });
  let scope;
  watch(() => !!props.activator, val => {
    if (val && IN_BROWSER) {
      scope = effectScope();
      scope.run(() => {
        _useActivator(props, vm, {
          activatorEl,
          activatorEvents
        });
      });
    } else if (scope) {
      scope.stop();
    }
  }, {
    flush: 'post',
    immediate: true
  });
  onScopeDispose(() => {
    scope?.stop();
  });
  return {
    activatorEl,
    activatorRef,
    target,
    targetEl,
    targetRef,
    activatorEvents,
    contentEvents,
    scrimEvents
  };
}
function _useActivator(props, vm, _ref2) {
  let {
    activatorEl,
    activatorEvents
  } = _ref2;
  watch(() => props.activator, (val, oldVal) => {
    if (oldVal && val !== oldVal) {
      const activator = getActivator(oldVal);
      activator && unbindActivatorProps(activator);
    }
    if (val) {
      nextTick(() => bindActivatorProps());
    }
  }, {
    immediate: true
  });
  watch(() => props.activatorProps, () => {
    bindActivatorProps();
  });
  onScopeDispose(() => {
    unbindActivatorProps();
  });
  function bindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActivator();
    let _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.activatorProps;
    if (!el) return;
    bindProps(el, mergeProps(activatorEvents.value, _props));
  }
  function unbindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActivator();
    let _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.activatorProps;
    if (!el) return;
    unbindProps(el, mergeProps(activatorEvents.value, _props));
  }
  function getActivator() {
    let selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.activator;
    const activator = getTarget(selector, vm);

    // The activator should only be a valid element (Ignore comments and text nodes)
    activatorEl.value = activator?.nodeType === Node.ELEMENT_NODE ? activator : undefined;
    return activatorEl.value;
  }
}
function getTarget(selector, vm) {
  if (!selector) return;
  let target;
  if (selector === 'parent') {
    let el = vm?.proxy?.$el?.parentNode;
    while (el?.hasAttribute('data-no-activator')) {
      el = el.parentNode;
    }
    target = el;
  } else if (typeof selector === 'string') {
    // Selector
    target = document.querySelector(selector);
  } else if ('$el' in selector) {
    // Component (ref)
    target = selector.$el;
  } else {
    // HTMLElement | Element | [x, y]
    target = selector;
  }
  return target;
}

// Composables
function useHydration() {
  if (!IN_BROWSER) return shallowRef(false);
  const {
    ssr
  } = useDisplay();
  if (ssr) {
    const isMounted = shallowRef(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return isMounted;
  } else {
    return shallowRef(true);
  }
}

// Utilities

// Types

const makeLazyProps = propsFactory({
  eager: Boolean
}, 'lazy');
function useLazy(props, active) {
  const isBooted = shallowRef(false);
  const hasContent = toRef(() => isBooted.value || props.eager || active.value);
  watch(active, () => isBooted.value = true);
  function onAfterLeave() {
    if (!props.eager) isBooted.value = false;
  }
  return {
    isBooted,
    hasContent,
    onAfterLeave
  };
}

// Utilities
function useScopeId() {
  const vm = getCurrentInstance('useScopeId');
  const scopeId = vm.vnode.scopeId;
  return {
    scopeId: scopeId ? {
      [scopeId]: ''
    } : undefined
  };
}

// Composables

// Types

const StackSymbol = Symbol.for('vuetify:stack');
const globalStack = reactive([]);
function useStack(isActive, zIndex, disableGlobalStack) {
  const vm = getCurrentInstance('useStack');
  const createStackEntry = !disableGlobalStack;
  const parent = inject$1(StackSymbol, undefined);
  const stack = reactive({
    activeChildren: new Set()
  });
  provide(StackSymbol, stack);
  const _zIndex = shallowRef(Number(toValue(zIndex)));
  useToggleScope(isActive, () => {
    const lastZIndex = globalStack.at(-1)?.[1];
    _zIndex.value = lastZIndex ? lastZIndex + 10 : Number(toValue(zIndex));
    if (createStackEntry) {
      globalStack.push([vm.uid, _zIndex.value]);
    }
    parent?.activeChildren.add(vm.uid);
    onScopeDispose(() => {
      if (createStackEntry) {
        const idx = toRaw(globalStack).findIndex(v => v[0] === vm.uid);
        globalStack.splice(idx, 1);
      }
      parent?.activeChildren.delete(vm.uid);
    });
  });
  const globalTop = shallowRef(true);
  if (createStackEntry) {
    watchEffect(() => {
      const _isTop = globalStack.at(-1)?.[0] === vm.uid;
      setTimeout(() => globalTop.value = _isTop);
    });
  }
  const localTop = toRef(() => !stack.activeChildren.size);
  return {
    globalTop: readonly(globalTop),
    localTop,
    stackStyles: toRef(() => ({
      zIndex: _zIndex.value
    }))
  };
}

// Utilities
function useTeleport(target) {
  const teleportTarget = computed(() => {
    const _target = target();
    if (_target === true || !IN_BROWSER) return undefined;
    const targetElement = _target === false ? document.body : typeof _target === 'string' ? document.querySelector(_target) : _target;
    if (targetElement == null) {
      warn(`Unable to locate target ${_target}`);
      return undefined;
    }
    let container = [...targetElement.children].find(el => el.matches('.v-overlay-container'));
    if (!container) {
      container = document.createElement('div');
      container.className = 'v-overlay-container';
      targetElement.appendChild(container);
    }
    return container;
  });
  return {
    teleportTarget
  };
}

// Utilities

// Types

function defaultConditional() {
  return true;
}
function checkEvent(e, el, binding) {
  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility
  // with non-toggleable components
  if (!e || checkIsActive(e, binding) === false) return false;

  // If we're clicking inside the shadowroot, then the app root doesn't get the same
  // level of introspection as to _what_ we're clicking. We want to check to see if
  // our target is the shadowroot parent container, and if it is, ignore.
  const root = attachedRoot(el);
  if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot && root.host === e.target) return false;

  // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)
  const elements = (typeof binding.value === 'object' && binding.value.include || (() => []))();
  // Add the root element for the component this directive was defined on
  elements.push(el);

  // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occur before
  // the bubbling click event on any outside elements.
  return !elements.some(el => el?.contains(e.target));
}
function checkIsActive(e, binding) {
  const isActive = typeof binding.value === 'object' && binding.value.closeConditional || defaultConditional;
  return isActive(e);
}
function directive(e, el, binding) {
  const handler = typeof binding.value === 'function' ? binding.value : binding.value.handler;

  // Clicks in the Shadow DOM change their target while using setTimeout, so the original target is saved here
  e.shadowTarget = e.target;
  el._clickOutside.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
    checkIsActive(e, binding) && handler && handler(e);
  }, 0);
}
function handleShadow(el, callback) {
  const root = attachedRoot(el);
  callback(document);
  if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot) {
    callback(root);
  }
}
const ClickOutside = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(el, binding) {
    const onClick = e => directive(e, el, binding);
    const onMousedown = e => {
      el._clickOutside.lastMousedownWasOutside = checkEvent(e, el, binding);
    };
    handleShadow(el, app => {
      app.addEventListener('click', onClick, true);
      app.addEventListener('mousedown', onMousedown, true);
    });
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: false
      };
    }
    el._clickOutside[binding.instance.$.uid] = {
      onClick,
      onMousedown
    };
  },
  beforeUnmount(el, binding) {
    if (!el._clickOutside) return;
    handleShadow(el, app => {
      if (!app || !el._clickOutside?.[binding.instance.$.uid]) return;
      const {
        onClick,
        onMousedown
      } = el._clickOutside[binding.instance.$.uid];
      app.removeEventListener('click', onClick, true);
      app.removeEventListener('mousedown', onMousedown, true);
    });
    delete el._clickOutside[binding.instance.$.uid];
  }
};

// Types

function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return createVNode(Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && createElementVNode("div", mergeProps({
      "class": ['v-overlay__scrim', props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null)]
  });
}
const makeVOverlayProps = propsFactory({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: true
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true
  },
  zIndex: {
    type: [Number, String],
    default: 2000
  },
  ...makeActivatorProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps(),
  ...makeScrollStrategyProps(),
  ...makeThemeProps(),
  ...makeTransitionProps()
}, 'VOverlay');
const VOverlay = genericComponent()({
  name: 'VOverlay',
  directives: {
    vClickOutside: ClickOutside
  },
  inheritAttrs: false,
  props: {
    _disableGlobalStack: Boolean,
    ...makeVOverlayProps()
  },
  emits: {
    'click:outside': e => true,
    'update:modelValue': value => true,
    keydown: e => true,
    afterEnter: () => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const vm = getCurrentInstance('VOverlay');
    const root = ref();
    const scrimEl = ref();
    const contentEl = ref();
    const model = useProxiedModel(props, 'modelValue');
    const isActive = computed({
      get: () => model.value,
      set: v => {
        if (!(v && props.disabled)) model.value = v;
      }
    });
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses,
      isRtl
    } = useRtl();
    const {
      hasContent,
      onAfterLeave: _onAfterLeave
    } = useLazy(props, isActive);
    const scrimColor = useBackgroundColor(() => {
      return typeof props.scrim === 'string' ? props.scrim : null;
    });
    const {
      globalTop,
      localTop,
      stackStyles
    } = useStack(isActive, () => props.zIndex, props._disableGlobalStack);
    const {
      activatorEl,
      activatorRef,
      target,
      targetEl,
      targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    } = useActivator(props, {
      isActive,
      isTop: localTop,
      contentEl
    });
    const {
      teleportTarget
    } = useTeleport(() => {
      const target = props.attach || props.contained;
      if (target) return target;
      const rootNode = activatorEl?.value?.getRootNode() || vm.proxy?.$el?.getRootNode();
      if (rootNode instanceof ShadowRoot) return rootNode;
      return false;
    });
    const {
      dimensionStyles
    } = useDimension(props);
    const isMounted = useHydration();
    const {
      scopeId
    } = useScopeId();
    watch(() => props.disabled, v => {
      if (v) isActive.value = false;
    });
    const {
      contentStyles,
      updateLocation
    } = useLocationStrategies(props, {
      isRtl,
      contentEl,
      target,
      isActive
    });
    useScrollStrategies(props, {
      root,
      contentEl,
      targetEl,
      target,
      isActive,
      updateLocation
    });
    function onClickOutside(e) {
      emit('click:outside', e);
      if (!props.persistent) isActive.value = false;else animateClick();
    }
    function closeConditional(e) {
      return isActive.value && globalTop.value && (
      // If using scrim, only close if clicking on it rather than anything opened on top
      !props.scrim || e.target === scrimEl.value || e instanceof MouseEvent && e.shadowTarget === scrimEl.value);
    }
    IN_BROWSER && watch(isActive, val => {
      if (val) {
        window.addEventListener('keydown', onKeydown);
      } else {
        window.removeEventListener('keydown', onKeydown);
      }
    }, {
      immediate: true
    });
    onBeforeUnmount(() => {
      if (!IN_BROWSER) return;
      window.removeEventListener('keydown', onKeydown);
    });
    function onKeydown(e) {
      if (e.key === 'Escape' && globalTop.value) {
        if (!contentEl.value?.contains(document.activeElement)) {
          emit('keydown', e);
        }
        if (!props.persistent) {
          isActive.value = false;
          if (contentEl.value?.contains(document.activeElement)) {
            activatorEl.value?.focus();
          }
        } else animateClick();
      }
    }
    function onKeydownSelf(e) {
      if (e.key === 'Escape' && !globalTop.value) return;
      emit('keydown', e);
    }
    const router = useRouter();
    useToggleScope(() => props.closeOnBack, () => {
      useBackButton(router, next => {
        if (globalTop.value && isActive.value) {
          next(false);
          if (!props.persistent) isActive.value = false;else animateClick();
        } else {
          next();
        }
      });
    });
    const top = ref();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, val => {
      if (val) {
        const scrollParent = getScrollParent(root.value);
        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    });

    // Add a quick "bounce" animation to the content
    function animateClick() {
      if (props.noClickAnimation) return;
      contentEl.value && animate(contentEl.value, [{
        transformOrigin: 'center'
      }, {
        transform: 'scale(1.03)'
      }, {
        transformOrigin: 'center'
      }], {
        duration: 150,
        easing: standardEasing
      });
    }
    function onAfterEnter() {
      emit('afterEnter');
    }
    function onAfterLeave() {
      _onAfterLeave();
      emit('afterLeave');
    }
    useRender(() => createElementVNode(Fragment, null, [slots.activator?.({
      isActive: isActive.value,
      targetRef,
      props: mergeProps({
        ref: activatorRef
      }, activatorEvents.value, props.activatorProps)
    }), isMounted.value && hasContent.value && createVNode(Teleport, {
      "disabled": !teleportTarget.value,
      "to": teleportTarget.value
    }, {
      default: () => [createElementVNode("div", mergeProps({
        "class": ['v-overlay', {
          'v-overlay--absolute': props.absolute || props.contained,
          'v-overlay--active': isActive.value,
          'v-overlay--contained': props.contained
        }, themeClasses.value, rtlClasses.value, props.class],
        "style": [stackStyles.value, {
          '--v-overlay-opacity': props.opacity,
          top: convertToUnit(top.value)
        }, props.style],
        "ref": root,
        "onKeydown": onKeydownSelf
      }, scopeId, attrs), [createVNode(Scrim, mergeProps({
        "color": scrimColor,
        "modelValue": isActive.value && !!props.scrim,
        "ref": scrimEl
      }, scrimEvents.value), null), createVNode(MaybeTransition, {
        "appear": true,
        "persisted": true,
        "transition": props.transition,
        "target": target.value,
        "onAfterEnter": onAfterEnter,
        "onAfterLeave": onAfterLeave
      }, {
        default: () => [withDirectives(createElementVNode("div", mergeProps({
          "ref": contentEl,
          "class": ['v-overlay__content', props.contentClass],
          "style": [dimensionStyles.value, contentStyles.value]
        }, contentEvents.value, props.contentProps), [slots.default?.({
          isActive
        })]), [[vShow, isActive.value], [ClickOutside, {
          handler: onClickOutside,
          closeConditional,
          include: () => [activatorEl.value]
        }]])]
      })])]
    })]));
    return {
      activatorEl,
      scrimEl,
      target,
      animateClick,
      contentEl,
      globalTop,
      localTop,
      updateLocation
    };
  }
});

// Types

const makeVMenuProps = propsFactory({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  disableInitialFocus: Boolean,
  ...omit(makeVOverlayProps({
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: 'connected',
    location: undefined,
    openDelay: 300,
    scrim: false,
    scrollStrategy: 'reposition',
    stickToTarget: true,
    transition: {
      component: VDialogTransition
    }
  }), ['absolute'])
}, 'VMenu');
const VMenu = genericComponent()({
  name: 'VMenu',
  props: makeVMenuProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const {
      scopeId
    } = useScopeId();
    const {
      isRtl
    } = useRtl();
    const uid = useId();
    const id = toRef(() => props.id || `v-menu-${uid}`);
    const overlay = ref();
    const parent = inject$1(VMenuSymbol, null);
    const openChildren = shallowRef(new Set());
    provide(VMenuSymbol, {
      register() {
        openChildren.value.add(uid);
      },
      unregister() {
        openChildren.value.delete(uid);
      },
      closeParents(e) {
        setTimeout(() => {
          if (!openChildren.value.size && !props.persistent && (e == null || overlay.value?.contentEl && !isClickInsideElement(e, overlay.value.contentEl))) {
            isActive.value = false;
            parent?.closeParents();
          }
        }, 40);
      }
    });
    onBeforeUnmount(() => {
      parent?.unregister();
      document.removeEventListener('focusin', onFocusIn);
    });
    onDeactivated(() => isActive.value = false);
    async function onFocusIn(e) {
      const before = e.relatedTarget;
      const after = e.target;
      await nextTick();
      if (isActive.value && before !== after && overlay.value?.contentEl &&
      // We're the topmost menu
      overlay.value?.globalTop &&
      // It isn't the document or the menu body
      ![document, overlay.value.contentEl].includes(after) &&
      // It isn't inside the menu body
      !overlay.value.contentEl.contains(after)) {
        const focusable = focusableChildren(overlay.value.contentEl);
        focusable[0]?.focus();
      }
    }
    watch(isActive, val => {
      if (val) {
        parent?.register();
        if (IN_BROWSER && !props.disableInitialFocus) {
          document.addEventListener('focusin', onFocusIn, {
            once: true
          });
        }
      } else {
        parent?.unregister();
        if (IN_BROWSER) {
          document.removeEventListener('focusin', onFocusIn);
        }
      }
    }, {
      immediate: true
    });
    function onClickOutside(e) {
      parent?.closeParents(e);
    }
    function onKeydown(e) {
      if (props.disabled) return;
      if (e.key === 'Tab' || e.key === 'Enter' && !props.closeOnContentClick) {
        if (e.key === 'Enter' && (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement && !!e.target.closest('form'))) return;
        if (e.key === 'Enter') e.preventDefault();
        const nextElement = getNextElement(focusableChildren(overlay.value?.contentEl, false), e.shiftKey ? 'prev' : 'next', el => el.tabIndex >= 0);
        if (!nextElement) {
          isActive.value = false;
          overlay.value?.activatorEl?.focus();
        }
      } else if (props.submenu && e.key === (isRtl.value ? 'ArrowRight' : 'ArrowLeft')) {
        isActive.value = false;
        overlay.value?.activatorEl?.focus();
      }
    }
    function onActivatorKeydown(e) {
      if (props.disabled) return;
      const el = overlay.value?.contentEl;
      if (el && isActive.value) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          e.stopImmediatePropagation();
          focusChild(el, 'next');
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          e.stopImmediatePropagation();
          focusChild(el, 'prev');
        } else if (props.submenu) {
          if (e.key === (isRtl.value ? 'ArrowRight' : 'ArrowLeft')) {
            isActive.value = false;
          } else if (e.key === (isRtl.value ? 'ArrowLeft' : 'ArrowRight')) {
            e.preventDefault();
            focusChild(el, 'first');
          }
        }
      } else if (props.submenu ? e.key === (isRtl.value ? 'ArrowLeft' : 'ArrowRight') : ['ArrowDown', 'ArrowUp'].includes(e.key)) {
        isActive.value = true;
        e.preventDefault();
        setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
      }
    }
    const activatorProps = computed(() => mergeProps({
      'aria-haspopup': 'menu',
      'aria-expanded': String(isActive.value),
      'aria-controls': id.value,
      onKeydown: onActivatorKeydown
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "id": id.value,
        "class": ['v-menu', props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "absolute": true,
        "activatorProps": activatorProps.value,
        "location": props.location ?? (props.submenu ? 'end' : 'bottom'),
        "onClick:outside": onClickOutside,
        "onKeydown": onKeydown
      }, scopeId), {
        activator: slots.activator,
        default: function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VMenu"
          }, {
            default: () => [slots.default?.(...args)]
          });
        }
      });
    });
    return forwardRefs({
      id,
      ΨopenChildren: openChildren
    }, overlay);
  }
});

// Types

const makeVCounterProps = propsFactory({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...makeComponentProps(),
  ...makeTransitionProps({
    transition: {
      component: VSlideYTransition
    }
  })
}, 'VCounter');
const VCounter = genericComponent()({
  name: 'VCounter',
  functional: true,
  props: makeVCounterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const counter = toRef(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value);
    });
    useRender(() => createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [withDirectives(createElementVNode("div", {
        "class": normalizeClass(['v-counter', {
          'text-error': props.max && !props.disabled && parseFloat(props.value) > parseFloat(props.max)
        }, props.class]),
        "style": normalizeStyle(props.style)
      }, [slots.default ? slots.default({
        counter: counter.value,
        max: props.max,
        value: props.value
      }) : counter.value]), [[vShow, props.active]])]
    }));
    return {};
  }
});

const makeVFieldLabelProps = propsFactory({
  floating: Boolean,
  ...makeComponentProps()
}, 'VFieldLabel');
const VFieldLabel = genericComponent()({
  name: 'VFieldLabel',
  props: makeVFieldLabelProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VLabel, {
      "class": normalizeClass(['v-field-label', {
        'v-field-label--floating': props.floating
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, slots));
    return {};
  }
});

// Types

const allowedVariants$1 = ['underlined', 'outlined', 'filled', 'solo', 'solo-inverted', 'solo-filled', 'plain'];
const makeVFieldProps = propsFactory({
  appendInnerIcon: IconValue,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: IconValue,
    default: '$clear'
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: undefined
  },
  color: String,
  baseColor: String,
  details: Boolean,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  glow: Boolean,
  error: Boolean,
  flat: Boolean,
  iconColor: [Boolean, String],
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: IconValue,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: 'filled',
    validator: v => allowedVariants$1.includes(v)
  },
  'onClick:clear': EventProp(),
  'onClick:appendInner': EventProp(),
  'onClick:prependInner': EventProp(),
  ...makeComponentProps(),
  ...makeLoaderProps(),
  ...makeRoundedProps(),
  ...makeThemeProps()
}, 'VField');
const VField = genericComponent()({
  name: 'VField',
  inheritAttrs: false,
  props: {
    id: String,
    ...makeFocusProps(),
    ...makeVFieldProps()
  },
  emits: {
    'update:focused': focused => true,
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      focusClasses,
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      InputIcon
    } = useInputIcon(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      rtlClasses
    } = useRtl();
    const isActive = toRef(() => props.dirty || props.active);
    const hasLabel = toRef(() => !!(props.label || slots.label));
    const hasFloatingLabel = toRef(() => !props.singleLine && hasLabel.value);
    const uid = useId();
    const id = computed(() => props.id || `input-${uid}`);
    const messagesId = toRef(() => !props.details ? undefined : `${id.value}-messages`);
    const labelRef = ref();
    const floatingLabelRef = ref();
    const controlRef = ref();
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
    const color = computed(() => {
      return props.error || props.disabled ? undefined : isActive.value && isFocused.value ? props.color : props.baseColor;
    });
    const iconColor = computed(() => {
      if (!props.iconColor || props.glow && !isFocused.value) return undefined;
      return props.iconColor === true ? color.value : props.iconColor;
    });
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    watch(isActive, val => {
      if (hasFloatingLabel.value && !PREFERS_REDUCED_MOTION()) {
        const el = labelRef.value.$el;
        const targetEl = floatingLabelRef.value.$el;
        requestAnimationFrame(() => {
          const rect = nullifyTransforms(el);
          const targetRect = targetEl.getBoundingClientRect();
          const x = targetRect.x - rect.x;
          const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
          const targetWidth = targetRect.width / 0.75;
          const width = Math.abs(targetWidth - rect.width) > 1 ? {
            maxWidth: convertToUnit(targetWidth)
          } : undefined;
          const style = getComputedStyle(el);
          const targetStyle = getComputedStyle(targetEl);
          const duration = parseFloat(style.transitionDuration) * 1000 || 150;
          const scale = parseFloat(targetStyle.getPropertyValue('--v-field-label-scale'));
          const color = targetStyle.getPropertyValue('color');
          el.style.visibility = 'visible';
          targetEl.style.visibility = 'hidden';
          animate(el, {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            color,
            ...width
          }, {
            duration,
            easing: standardEasing,
            direction: val ? 'normal' : 'reverse'
          }).finished.then(() => {
            el.style.removeProperty('visibility');
            targetEl.style.removeProperty('visibility');
          });
        });
      }
    }, {
      flush: 'post'
    });
    const slotProps = computed(() => ({
      isActive,
      isFocused,
      controlRef,
      blur,
      focus
    }));
    function onClick(e) {
      if (e.target !== document.activeElement) {
        e.preventDefault();
      }
    }
    useRender(() => {
      const isOutlined = props.variant === 'outlined';
      const hasPrepend = !!(slots['prepend-inner'] || props.prependInnerIcon);
      const hasClear = !!(props.clearable || slots.clear) && !props.disabled;
      const hasAppend = !!(slots['append-inner'] || props.appendInnerIcon || hasClear);
      const label = () => slots.label ? slots.label({
        ...slotProps.value,
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createElementVNode("div", mergeProps({
        "class": ['v-field', {
          'v-field--active': isActive.value,
          'v-field--appended': hasAppend,
          'v-field--center-affix': props.centerAffix ?? !isPlainOrUnderlined.value,
          'v-field--disabled': props.disabled,
          'v-field--dirty': props.dirty,
          'v-field--error': props.error,
          'v-field--glow': props.glow,
          'v-field--flat': props.flat,
          'v-field--has-background': !!props.bgColor,
          'v-field--persistent-clear': props.persistentClear,
          'v-field--prepended': hasPrepend,
          'v-field--reverse': props.reverse,
          'v-field--single-line': props.singleLine,
          'v-field--no-label': !label(),
          [`v-field--variant-${props.variant}`]: true
        }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value, roundedClasses.value, rtlClasses.value, props.class],
        "style": [backgroundColorStyles.value, props.style],
        "onClick": onClick
      }, attrs), [createElementVNode("div", {
        "class": "v-field__overlay"
      }, null), createVNode(LoaderSlot, {
        "name": "v-field",
        "active": !!props.loading,
        "color": props.error ? 'error' : typeof props.loading === 'string' ? props.loading : props.color
      }, {
        default: slots.loader
      }), hasPrepend && createElementVNode("div", {
        "key": "prepend",
        "class": "v-field__prepend-inner"
      }, [props.prependInnerIcon && createVNode(InputIcon, {
        "key": "prepend-icon",
        "name": "prependInner",
        "color": iconColor.value
      }, null), slots['prepend-inner']?.(slotProps.value)]), createElementVNode("div", {
        "class": "v-field__field",
        "data-no-activator": ""
      }, [['filled', 'solo', 'solo-inverted', 'solo-filled'].includes(props.variant) && hasFloatingLabel.value && createVNode(VFieldLabel, {
        "key": "floating-label",
        "ref": floatingLabelRef,
        "class": normalizeClass([textColorClasses.value]),
        "floating": true,
        "for": id.value,
        "aria-hidden": !isActive.value,
        "style": normalizeStyle(textColorStyles.value)
      }, {
        default: () => [label()]
      }), hasLabel.value && createVNode(VFieldLabel, {
        "key": "label",
        "ref": labelRef,
        "for": id.value
      }, {
        default: () => [label()]
      }), slots.default?.({
        ...slotProps.value,
        props: {
          id: id.value,
          class: 'v-field__input',
          'aria-describedby': messagesId.value
        },
        focus,
        blur
      }) ?? createElementVNode("div", {
        "id": id.value,
        "class": "v-field__input",
        "aria-describedby": messagesId.value
      }, null)]), hasClear && createVNode(VExpandXTransition, {
        "key": "clear"
      }, {
        default: () => [withDirectives(createElementVNode("div", {
          "class": "v-field__clearable",
          "onMousedown": e => {
            e.preventDefault();
            e.stopPropagation();
          }
        }, [createVNode(VDefaultsProvider, {
          "defaults": {
            VIcon: {
              icon: props.clearIcon
            }
          }
        }, {
          default: () => [slots.clear ? slots.clear({
            ...slotProps.value,
            props: {
              onFocus: focus,
              onBlur: blur,
              onClick: props['onClick:clear'],
              tabindex: -1
            }
          }) : createVNode(InputIcon, {
            "name": "clear",
            "onFocus": focus,
            "onBlur": blur,
            "tabindex": -1
          }, null)]
        })]), [[vShow, props.dirty]])]
      }), hasAppend && createElementVNode("div", {
        "key": "append",
        "class": "v-field__append-inner"
      }, [slots['append-inner']?.(slotProps.value), props.appendInnerIcon && createVNode(InputIcon, {
        "key": "append-icon",
        "name": "appendInner",
        "color": iconColor.value
      }, null)]), createElementVNode("div", {
        "class": normalizeClass(['v-field__outline', textColorClasses.value]),
        "style": normalizeStyle(textColorStyles.value)
      }, [isOutlined && createElementVNode(Fragment, null, [createElementVNode("div", {
        "class": "v-field__outline__start"
      }, null), hasFloatingLabel.value && createElementVNode("div", {
        "class": "v-field__outline__notch"
      }, [createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true,
        "for": id.value,
        "aria-hidden": !isActive.value
      }, {
        default: () => [label()]
      })]), createElementVNode("div", {
        "class": "v-field__outline__end"
      }, null)]), isPlainOrUnderlined.value && hasFloatingLabel.value && createVNode(VFieldLabel, {
        "ref": floatingLabelRef,
        "floating": true,
        "for": id.value,
        "aria-hidden": !isActive.value
      }, {
        default: () => [label()]
      })])]);
    });
    return {
      controlRef,
      fieldIconColor: iconColor
    };
  }
});

// Utilities

// Types

// Types

// Composables
const makeAutocompleteProps = propsFactory({
  autocomplete: String
}, 'autocomplete');
function useAutocomplete(props) {
  const uniqueId = useId();
  const reloadTrigger = shallowRef(0);
  const isSuppressing = toRef(() => props.autocomplete === 'suppress');
  const fieldName = toRef(() => {
    return isSuppressing.value ? `${props.name}-${uniqueId}-${reloadTrigger.value}` : props.name;
  });
  const fieldAutocomplete = toRef(() => {
    return isSuppressing.value ? 'off' : props.autocomplete;
  });
  return {
    isSuppressing,
    fieldAutocomplete,
    fieldName,
    update: () => reloadTrigger.value = new Date().getTime()
  };
}

function useAutofocus(props) {
  function onIntersect(isIntersecting, entries) {
    if (!props.autofocus || !isIntersecting) return;
    entries[0].target?.focus?.();
  }
  return {
    onIntersect
  };
}

// Types

const activeTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];
const makeVTextFieldProps = propsFactory({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: 'text'
  },
  modelModifiers: Object,
  ...makeAutocompleteProps(),
  ...makeVInputProps(),
  ...makeVFieldProps()
}, 'VTextField');
const VTextField = genericComponent()({
  name: 'VTextField',
  directives: {
    vIntersect: Intersect
  },
  inheritAttrs: false,
  props: makeVTextFieldProps(),
  emits: {
    'click:control': e => true,
    'mousedown:control': e => true,
    'update:focused': focused => true,
    'update:modelValue': val => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      onIntersect
    } = useAutofocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value) : typeof props.counterValue === 'number' ? props.counterValue : (model.value ?? '').toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== 'number' && typeof props.counter !== 'string') return undefined;
      return props.counter;
    });
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const autocomplete = useAutocomplete(props);
    const isActive = computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      if (autocomplete.isSuppressing.value) {
        autocomplete.update();
      }
      if (!isFocused.value) focus();
      nextTick(() => {
        if (inputRef.value !== document.activeElement) {
          inputRef.value?.focus();
        }
      });
    }
    function onControlMousedown(e) {
      emit('mousedown:control', e);
      if (e.target === inputRef.value) return;
      onFocus();
      e.preventDefault();
    }
    function onControlClick(e) {
      emit('click:control', e);
    }
    function onClear(e, reset) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = null;
        reset();
        callEvent(props['onClick:clear'], e);
      });
    }
    function onInput(e) {
      const el = e.target;
      model.value = el.value;
      if (props.modelModifiers?.trim && ['text', 'search', 'password', 'tel', 'url'].includes(props.type)) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter !== false && props.counter != null);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = VField.filterProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-text-field', {
          'v-text-field--prefixed': props.prefix,
          'v-text-field--suffixed': props.suffix,
          'v-input--plain-underlined': isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: _ref2 => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid,
            hasDetails,
            reset
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "onMousedown": onControlMousedown,
            "onClick": onControlClick,
            "onClick:clear": e => onClear(e, reset),
            "onClick:prependInner": props['onClick:prependInner'],
            "onClick:appendInner": props['onClick:appendInner'],
            "role": props.role
          }, omit(fieldProps, ['onClick:clear']), {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "details": hasDetails.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: _ref3 => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              const inputNode = withDirectives(createElementVNode("input", mergeProps({
                "ref": inputRef,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "name": autocomplete.fieldName.value,
                "autocomplete": autocomplete.fieldAutocomplete.value,
                "placeholder": props.placeholder,
                "size": 1,
                "role": props.role,
                "type": props.type,
                "onFocus": focus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[Intersect, {
                handler: onIntersect
              }, null, {
                once: true
              }]]);
              return createElementVNode(Fragment, null, [props.prefix && createElementVNode("span", {
                "class": "v-text-field__prefix"
              }, [createElementVNode("span", {
                "class": "v-text-field__prefix__text"
              }, [props.prefix])]), slots.default ? createElementVNode("div", {
                "class": normalizeClass(fieldClass),
                "data-no-activator": ""
              }, [slots.default(), inputNode]) : cloneVNode(inputNode, {
                class: fieldClass
              }), props.suffix && createElementVNode("span", {
                "class": "v-text-field__suffix"
              }, [createElementVNode("span", {
                "class": "v-text-field__suffix__text"
              }, [props.suffix])])]);
            }
          });
        },
        details: hasDetails ? slotProps => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
          "active": props.persistentCounter || isFocused.value,
          "value": counterValue.value,
          "max": max.value,
          "disabled": props.disabled
        }, slots.counter)])]) : undefined
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});

// Types

const makeVVirtualScrollItemProps = propsFactory({
  renderless: Boolean,
  ...makeComponentProps()
}, 'VVirtualScrollItem');
const VVirtualScrollItem = genericComponent()({
  name: 'VVirtualScrollItem',
  inheritAttrs: false,
  props: makeVVirtualScrollItemProps(),
  emits: {
    'update:height': height => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      resizeRef,
      contentRect
    } = useResizeObserver(undefined, 'border');
    watch(() => contentRect.value?.height, height => {
      if (height != null) emit('update:height', height);
    });
    useRender(() => props.renderless ? createElementVNode(Fragment, null, [slots.default?.({
      itemRef: resizeRef
    })]) : createElementVNode("div", mergeProps({
      "ref": resizeRef,
      "class": ['v-virtual-scroll__item', props.class],
      "style": props.style
    }, attrs), [slots.default?.()]));
  }
});

// Composables

// Types

const UP = -1;
const DOWN = 1;

/** Determines how large each batch of items should be */
const BUFFER_PX = 100;
const makeVirtualProps = propsFactory({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  itemKey: {
    type: [String, Array, Function],
    default: null
  },
  height: [Number, String]
}, 'virtual');
function useVirtual(props, items) {
  const display = useDisplay();
  const itemHeight = shallowRef(0);
  watchEffect(() => {
    itemHeight.value = parseFloat(props.itemHeight || 0);
  });
  const first = shallowRef(0);
  const last = shallowRef(Math.ceil(
  // Assume 16px items filling the entire screen height if
  // not provided. This is probably incorrect but it minimises
  // the chance of ending up with empty space at the bottom.
  // The default value is set here to avoid poisoning getSize()
  (parseInt(props.height) || display.height.value) / (itemHeight.value || 16)) || 1);
  const paddingTop = shallowRef(0);
  const paddingBottom = shallowRef(0);

  /** The scrollable element */
  const containerRef = ref();
  /** An element marking the top of the scrollable area,
   * used to add an offset if there's padding or other elements above the virtual list */
  const markerRef = ref();
  /** markerRef's offsetTop, lazily evaluated */
  let markerOffset = 0;
  const {
    resizeRef,
    contentRect
  } = useResizeObserver();
  watchEffect(() => {
    resizeRef.value = containerRef.value;
  });
  const viewportHeight = computed(() => {
    return containerRef.value === document.documentElement ? display.height.value : contentRect.value?.height || parseInt(props.height) || 0;
  });
  /** All static elements have been rendered and we have an assumed item height */
  const hasInitialRender = computed(() => {
    return !!(containerRef.value && markerRef.value && viewportHeight.value && itemHeight.value);
  });
  let sizes = Array.from({
    length: items.value.length
  });
  let offsets = Array.from({
    length: items.value.length
  });
  const updateTime = shallowRef(0);
  let targetScrollIndex = -1;
  function getSize(index) {
    return sizes[index] || itemHeight.value;
  }
  const updateOffsets = debounce(() => {
    const start = performance.now();
    offsets[0] = 0;
    const length = items.value.length;
    for (let i = 1; i <= length - 1; i++) {
      offsets[i] = (offsets[i - 1] || 0) + getSize(i - 1);
    }
    updateTime.value = Math.max(updateTime.value, performance.now() - start);
  }, updateTime);
  const unwatch = watch(hasInitialRender, v => {
    if (!v) return;
    // First render is complete, update offsets and visible
    // items in case our assumed item height was incorrect

    unwatch();
    markerOffset = markerRef.value.offsetTop;
    updateOffsets.immediate();
    calculateVisibleItems();
    if (!~targetScrollIndex) return;
    nextTick(() => {
      IN_BROWSER && window.requestAnimationFrame(() => {
        scrollToIndex(targetScrollIndex);
        targetScrollIndex = -1;
      });
    });
  });
  onScopeDispose(() => {
    updateOffsets.clear();
  });
  function handleItemResize(index, height) {
    const prevHeight = sizes[index];
    const prevMinHeight = itemHeight.value;
    itemHeight.value = prevMinHeight ? Math.min(itemHeight.value, height) : height;
    if (prevHeight !== height || prevMinHeight !== itemHeight.value) {
      sizes[index] = height;
      updateOffsets();
    }
  }
  function calculateOffset(index) {
    index = clamp(index, 0, items.value.length - 1);
    const whole = Math.floor(index);
    const fraction = index % 1;
    const next = whole + 1;
    const wholeOffset = offsets[whole] || 0;
    const nextOffset = offsets[next] || wholeOffset;
    return wholeOffset + (nextOffset - wholeOffset) * fraction;
  }
  function calculateIndex(scrollTop) {
    return binaryClosest(offsets, scrollTop);
  }
  let lastScrollTop = 0;
  let scrollVelocity = 0;
  let lastScrollTime = 0;
  watch(viewportHeight, (val, oldVal) => {
    if (oldVal) {
      calculateVisibleItems();
      if (val < oldVal) {
        requestAnimationFrame(() => {
          scrollVelocity = 0;
          calculateVisibleItems();
        });
      }
    }
  });
  let scrollTimeout = -1;
  function handleScroll() {
    if (!containerRef.value || !markerRef.value) return;
    const scrollTop = containerRef.value.scrollTop;
    const scrollTime = performance.now();
    const scrollDeltaT = scrollTime - lastScrollTime;
    if (scrollDeltaT > 500) {
      scrollVelocity = Math.sign(scrollTop - lastScrollTop);

      // Not super important, only update at the
      // start of a scroll sequence to avoid reflows
      markerOffset = markerRef.value.offsetTop;
    } else {
      scrollVelocity = scrollTop - lastScrollTop;
    }
    lastScrollTop = scrollTop;
    lastScrollTime = scrollTime;
    window.clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(handleScrollend, 500);
    calculateVisibleItems();
  }
  function handleScrollend() {
    if (!containerRef.value || !markerRef.value) return;
    scrollVelocity = 0;
    lastScrollTime = 0;
    window.clearTimeout(scrollTimeout);
    calculateVisibleItems();
  }
  let raf = -1;
  function calculateVisibleItems() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(_calculateVisibleItems);
  }
  function _calculateVisibleItems() {
    if (!containerRef.value || !viewportHeight.value || !itemHeight.value) return;
    const scrollTop = lastScrollTop - markerOffset;
    const direction = Math.sign(scrollVelocity);
    const startPx = Math.max(0, scrollTop - BUFFER_PX);
    const start = clamp(calculateIndex(startPx), 0, items.value.length);
    const endPx = scrollTop + viewportHeight.value + BUFFER_PX;
    const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length);
    if (
    // Only update the side we're scrolling towards,
    // the other side will be updated incidentally
    (direction !== UP || start < first.value) && (direction !== DOWN || end > last.value)) {
      const topOverflow = calculateOffset(first.value) - calculateOffset(start);
      const bottomOverflow = calculateOffset(end) - calculateOffset(last.value);
      const bufferOverflow = Math.max(topOverflow, bottomOverflow);
      if (bufferOverflow > BUFFER_PX) {
        first.value = start;
        last.value = end;
      } else {
        // Only update the side that's reached its limit if there's still buffer left
        if (start <= 0) first.value = start;
        if (end >= items.value.length) last.value = end;
      }
    }
    paddingTop.value = calculateOffset(first.value);
    paddingBottom.value = calculateOffset(items.value.length) - calculateOffset(last.value);
  }
  function scrollToIndex(index) {
    const offset = calculateOffset(index);
    if (!containerRef.value || index && !offset) {
      targetScrollIndex = index;
    } else {
      containerRef.value.scrollTop = offset;
    }
  }
  const computedItems = computed(() => {
    return items.value.slice(first.value, last.value).map((item, index) => {
      const _index = index + first.value;
      return {
        raw: item,
        index: _index,
        key: getPropertyFromItem(item, props.itemKey, _index)
      };
    });
  });
  watch(items, () => {
    sizes = Array.from({
      length: items.value.length
    });
    offsets = Array.from({
      length: items.value.length
    });
    updateOffsets.immediate();
    calculateVisibleItems();
  }, {
    deep: 1
  });
  return {
    calculateVisibleItems,
    containerRef,
    markerRef,
    computedItems,
    paddingTop,
    paddingBottom,
    scrollToIndex,
    handleScroll,
    handleScrollend,
    handleItemResize
  };
}

// https://gist.github.com/robertleeplummerjr/1cc657191d34ecd0a324
function binaryClosest(arr, val) {
  let high = arr.length - 1;
  let low = 0;
  let mid = 0;
  let item = null;
  let target = -1;
  if (arr[high] < val) {
    return high;
  }
  while (low <= high) {
    mid = low + high >> 1;
    item = arr[mid];
    if (item > val) {
      high = mid - 1;
    } else if (item < val) {
      target = mid;
      low = mid + 1;
    } else if (item === val) {
      return mid;
    } else {
      return low;
    }
  }
  return target;
}

// Types

const makeVVirtualScrollProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...makeVirtualProps(),
  ...makeComponentProps(),
  ...makeDimensionProps()
}, 'VVirtualScroll');
const VVirtualScroll = genericComponent()({
  name: 'VVirtualScroll',
  props: makeVVirtualScrollProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vm = getCurrentInstance('VVirtualScroll');
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      calculateVisibleItems,
      containerRef,
      markerRef,
      handleScroll,
      handleScrollend,
      handleItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems
    } = useVirtual(props, toRef(() => props.items));
    useToggleScope(() => props.renderless, () => {
      function handleListeners() {
        let add = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        const method = add ? 'addEventListener' : 'removeEventListener';
        if (containerRef.value === document.documentElement) {
          document[method]('scroll', handleScroll, {
            passive: true
          });
          document[method]('scrollend', handleScrollend);
        } else {
          containerRef.value?.[method]('scroll', handleScroll, {
            passive: true
          });
          containerRef.value?.[method]('scrollend', handleScrollend);
        }
      }
      onMounted(() => {
        containerRef.value = getScrollParent(vm.vnode.el, true);
        handleListeners(true);
      });
      onScopeDispose(handleListeners);
    });
    useRender(() => {
      const children = computedItems.value.map(item => createVNode(VVirtualScrollItem, {
        "key": item.key,
        "renderless": props.renderless,
        "onUpdate:height": height => handleItemResize(item.index, height)
      }, {
        default: slotProps => slots.default?.({
          item: item.raw,
          index: item.index,
          ...slotProps
        })
      }));
      return props.renderless ? createElementVNode(Fragment, null, [createElementVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingTop: convertToUnit(paddingTop.value)
        }
      }, null), children, createElementVNode("div", {
        "class": "v-virtual-scroll__spacer",
        "style": {
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, null)]) : createElementVNode("div", {
        "ref": containerRef,
        "class": normalizeClass(['v-virtual-scroll', props.class]),
        "onScrollPassive": handleScroll,
        "onScrollend": handleScrollend,
        "style": normalizeStyle([dimensionStyles.value, props.style])
      }, [createElementVNode("div", {
        "ref": markerRef,
        "class": "v-virtual-scroll__container",
        "style": {
          paddingTop: convertToUnit(paddingTop.value),
          paddingBottom: convertToUnit(paddingBottom.value)
        }
      }, [children])]);
    });
    return {
      calculateVisibleItems,
      scrollToIndex
    };
  }
});

// Utilities

// Types

function useScrolling(listRef, textFieldRef) {
  const isScrolling = shallowRef(false);
  let scrollTimeout;
  function onListScroll(e) {
    cancelAnimationFrame(scrollTimeout);
    isScrolling.value = true;
    scrollTimeout = requestAnimationFrame(() => {
      scrollTimeout = requestAnimationFrame(() => {
        isScrolling.value = false;
      });
    });
  }
  async function finishScrolling() {
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => {
      if (isScrolling.value) {
        const stop = watch(isScrolling, () => {
          stop();
          resolve();
        });
      } else resolve();
    });
  }
  async function onListKeydown(e) {
    if (e.key === 'Tab') {
      textFieldRef.value?.focus();
    }
    if (!['PageDown', 'PageUp', 'Home', 'End'].includes(e.key)) return;
    const el = listRef.value?.$el;
    if (!el) return;
    if (e.key === 'Home' || e.key === 'End') {
      el.scrollTo({
        top: e.key === 'Home' ? 0 : el.scrollHeight,
        behavior: 'smooth'
      });
    }
    await finishScrolling();
    const children = el.querySelectorAll(':scope > :not(.v-virtual-scroll__spacer)');
    if (e.key === 'PageDown' || e.key === 'Home') {
      const top = el.getBoundingClientRect().top;
      for (const child of children) {
        if (child.getBoundingClientRect().top >= top) {
          child.focus();
          break;
        }
      }
    } else {
      const bottom = el.getBoundingClientRect().bottom;
      for (const child of [...children].reverse()) {
        if (child.getBoundingClientRect().bottom <= bottom) {
          child.focus();
          break;
        }
      }
    }
  }
  return {
    onScrollPassive: onListScroll,
    onKeydown: onListKeydown
  }; // typescript doesn't know about vue's event merging
}

// Types

const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: '$vuetify.close'
  },
  openText: {
    type: String,
    default: '$vuetify.open'
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: IconValue,
    default: '$dropdown'
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText'
  },
  openOnClear: Boolean,
  itemColor: String,
  noAutoScroll: Boolean,
  ...makeItemsProps({
    itemChildren: false
  })
}, 'Select');
const makeVSelectProps = propsFactory({
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox'
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  ...makeTransitionProps({
    transition: {
      component: VDialogTransition
    }
  })
}, 'VSelect');
const VSelect = genericComponent()({
  name: 'VSelect',
  props: makeVSelectProps(),
  emits: {
    'update:focused': focused => true,
    'update:modelValue': value => true,
    'update:menu': ue => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const model = useProxiedModel(props, 'modelValue', [], v => transformIn(v === null ? [null] : wrapInArray(v)), v => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value) : typeof props.counterValue === 'number' ? props.counterValue : model.value.length;
    });
    const form = useForm(props);
    const selectedValues = computed(() => model.value.map(selection => selection.value));
    const isFocused = shallowRef(false);
    let keyboardLookupPrefix = '';
    let keyboardLookupIndex = -1;
    let keyboardLookupLastTime;
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return items.value.filter(item => !model.value.some(s => (props.valueComparator || deepEqual)(s, item)));
      }
      return items.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || form.isReadonly.value || form.isDisabled.value);
    const _menu = useProxiedModel(props, 'menu');
    const menu = computed({
      get: () => _menu.value,
      set: v => {
        if (_menu.value && !v && vMenuRef.value?.ΨopenChildren.size) return;
        if (v && menuDisabled.value) return;
        _menu.value = v;
      }
    });
    const label = toRef(() => menu.value ? props.closeText : props.openText);
    const computedMenuProps = computed(() => {
      return {
        ...props.menuProps,
        activatorProps: {
          ...(props.menuProps?.activatorProps || {}),
          'aria-haspopup': 'listbox' // Set aria-haspopup to 'listbox'
        }
      };
    });
    const listRef = ref();
    const listEvents = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;
      menu.value = !menu.value;
    }
    function onListKeydown(e) {
      if (checkPrintable(e)) {
        onKeydown(e);
      }
    }
    function onKeydown(e) {
      if (!e.key || form.isReadonly.value) return;
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
      }
      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        menu.value = true;
      }
      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false;
      }
      if (e.key === 'Home') {
        listRef.value?.focus('first');
      } else if (e.key === 'End') {
        listRef.value?.focus('last');
      }

      // html select hotkeys
      const KEYBOARD_LOOKUP_THRESHOLD = 1000; // milliseconds

      if (!checkPrintable(e)) return;
      const now = performance.now();
      if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        keyboardLookupPrefix = '';
        keyboardLookupIndex = -1;
      }
      keyboardLookupPrefix += e.key.toLowerCase();
      keyboardLookupLastTime = now;
      const items = displayItems.value;
      function findItem() {
        let result = findItemBase();
        if (result) return result;
        if (keyboardLookupPrefix.at(-1) === keyboardLookupPrefix.at(-2)) {
          // No matches but we have a repeated letter, try the next item with that prefix
          keyboardLookupPrefix = keyboardLookupPrefix.slice(0, -1);
          result = findItemBase();
          if (result) return result;
        }

        // Still nothing, wrap around to the top
        keyboardLookupIndex = -1;
        result = findItemBase();
        if (result) return result;

        // Still nothing, try just the new letter
        keyboardLookupPrefix = e.key.toLowerCase();
        return findItemBase();
      }
      function findItemBase() {
        for (let i = keyboardLookupIndex + 1; i < items.length; i++) {
          const _item = items[i];
          if (_item.title.toLowerCase().startsWith(keyboardLookupPrefix)) {
            return [_item, i];
          }
        }
        return undefined;
      }
      const result = findItem();
      if (!result) return;
      const [item, index] = result;
      keyboardLookupIndex = index;
      listRef.value?.focus(index);
      if (!props.multiple) {
        model.value = [item];
      }
    }

    /** @param set - null means toggle */
    function select(item) {
      let set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (item.props.disabled) return;
      if (props.multiple) {
        const index = model.value.findIndex(selection => (props.valueComparator || deepEqual)(selection.value, item.value));
        const add = set == null ? !~index : set;
        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        nextTick(() => {
          menu.value = false;
        });
      }
    }
    function onBlur(e) {
      if (!listRef.value?.$el.contains(e.relatedTarget)) {
        menu.value = false;
      }
    }
    function onAfterEnter() {
      if (props.eager) {
        vVirtualScrollRef.value?.calculateVisibleItems();
      }
    }
    function onAfterLeave() {
      if (isFocused.value) {
        vTextFieldRef.value?.focus();
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
    }
    function onModelUpdate(v) {
      if (v == null) model.value = [];else if (matchesSelector(vTextFieldRef.value, ':autofill') || matchesSelector(vTextFieldRef.value, ':-webkit-autofill')) {
        const item = items.value.find(item => item.title === v);
        if (item) {
          select(item);
        }
      } else if (vTextFieldRef.value) {
        vTextFieldRef.value.value = '';
      }
    }
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        const index = displayItems.value.findIndex(item => model.value.some(s => (props.valueComparator || deepEqual)(s.value, item.value)));
        IN_BROWSER && !props.noAutoScroll && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index);
        });
      }
    });
    watch(() => props.items, (newVal, oldVal) => {
      if (menu.value) return;
      if (isFocused.value && props.hideNoData && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots['prepend-item'] || slots['append-item'] || slots['no-data']);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      const placeholder = isDirty || !isFocused.value && props.label && !props.persistentPlaceholder ? undefined : props.placeholder;
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": model.value.map(v => v.props.value).join(', '),
        "onUpdate:modelValue": onModelUpdate,
        "focused": isFocused.value,
        "onUpdate:focused": $event => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "class": ['v-select', {
          'v-select--active-menu': menu.value,
          'v-select--chips': !!props.chips,
          [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true,
          'v-select--selected': model.value.length,
          'v-select--selection-slot': !!slots.selection
        }, props.class],
        "style": props.style,
        "inputmode": "none",
        "placeholder": placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onBlur": onBlur,
        "onKeydown": onKeydown,
        "aria-label": t(label.value),
        "title": t(label.value)
      }), {
        ...slots,
        default: () => createElementVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": $event => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-select__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterEnter": onAfterEnter,
          "onAfterLeave": onAfterLeave
        }, computedMenuProps.value), {
          default: () => [hasList && createVNode(VList, mergeProps({
            "ref": listRef,
            "selected": selectedValues.value,
            "selectStrategy": props.multiple ? 'independent' : 'single-independent',
            "onMousedown": e => e.preventDefault(),
            "onKeydown": onListKeydown,
            "onFocusin": onFocusin,
            "tabindex": "-1",
            "selectable": true,
            "aria-live": "polite",
            "aria-label": `${props.label}-list`,
            "color": props.itemColor ?? props.color
          }, listEvents, props.listProps), {
            default: () => [slots['prepend-item']?.(), !displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? createVNode(VListItem, {
              "key": "no-data",
              "title": t(props.noDataText)
            }, null)), createVNode(VVirtualScroll, {
              "ref": vVirtualScrollRef,
              "renderless": true,
              "items": displayItems.value,
              "itemKey": "value"
            }, {
              default: _ref2 => {
                let {
                  item,
                  index,
                  itemRef
                } = _ref2;
                const camelizedProps = camelizeProps(item.props);
                const itemProps = mergeProps(item.props, {
                  ref: itemRef,
                  key: item.value,
                  onClick: () => select(item, null)
                });
                if (item.type === 'divider') {
                  return slots.divider?.({
                    props: item.raw,
                    index
                  }) ?? createVNode(VDivider, mergeProps(item.props, {
                    "key": `divider-${index}`
                  }), null);
                }
                if (item.type === 'subheader') {
                  return slots.subheader?.({
                    props: item.raw,
                    index
                  }) ?? createVNode(VListSubheader, mergeProps(item.props, {
                    "key": `subheader-${index}`
                  }), null);
                }
                return slots.item?.({
                  item,
                  index,
                  props: itemProps
                }) ?? createVNode(VListItem, mergeProps(itemProps, {
                  "role": "option"
                }), {
                  prepend: _ref3 => {
                    let {
                      isSelected
                    } = _ref3;
                    return createElementVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                      "key": item.value,
                      "modelValue": isSelected,
                      "ripple": false,
                      "tabindex": "-1"
                    }, null) : undefined, camelizedProps.prependAvatar && createVNode(VAvatar, {
                      "image": camelizedProps.prependAvatar
                    }, null), camelizedProps.prependIcon && createVNode(VIcon, {
                      "icon": camelizedProps.prependIcon
                    }, null)]);
                  }
                });
              }
            }), slots['append-item']?.()]
          })]
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = {
            'onClick:close': onChipClose,
            onKeydown(e) {
              if (e.key !== 'Enter' && e.key !== ' ') return;
              e.preventDefault();
              e.stopPropagation();
              onChipClose(e);
            },
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            'onUpdate:modelValue': undefined
          };
          const hasSlot = hasChips ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : undefined;
          if (hasSlot && !slotContent) return undefined;
          return createElementVNode("div", {
            "key": item.value,
            "class": "v-select__selection"
          }, [hasChips ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: 'small',
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent ?? createElementVNode("span", {
            "class": "v-select__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && createElementVNode("span", {
            "class": "v-select__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        'append-inner': function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createElementVNode(Fragment, null, [slots['append-inner']?.(...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-select__menu-icon",
            "color": vTextFieldRef.value?.fieldIconColor,
            "icon": props.menuIcon
          }, null) : undefined]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      menu,
      select
    }, vTextFieldRef);
  }
});

/* eslint-disable max-statements */
/* eslint-disable no-labels */


// Types

/**
 * - boolean: match without highlight
 * - number: single match (index), length already known
 * - []: single match (start, end)
 * - [][]: multiple matches (start, end), shouldn't overlap
 */

// Composables
const defaultFilter = (value, query, item) => {
  if (value == null || query == null) return -1;
  if (!query.length) return 0;
  value = value.toString().toLocaleLowerCase();
  query = query.toString().toLocaleLowerCase();
  const result = [];
  let idx = value.indexOf(query);
  while (~idx) {
    result.push([idx, idx + query.length]);
    idx = value.indexOf(query, idx + query.length);
  }
  return result.length ? result : -1;
};
function normaliseMatch(match, query) {
  if (match == null || typeof match === 'boolean' || match === -1) return;
  if (typeof match === 'number') return [[match, match + query.length]];
  if (Array.isArray(match[0])) return match;
  return [match];
}
const makeFilterProps = propsFactory({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: 'intersection'
  },
  noFilter: Boolean
}, 'filter');

// eslint-disable-next-line complexity
function filterItems(items, query, options) {
  const array = [];
  // always ensure we fall back to a functioning filter
  const filter = options?.default ?? defaultFilter;
  const keys = options?.filterKeys ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys(options?.customKeyFilter ?? {}).length;
  if (!items?.length) return array;
  let lookAheadItem = null;
  loop: for (let i = 0; i < items.length; i++) {
    const [item, transformed = item] = wrapInArray(items[i]);
    const customMatches = {};
    const defaultMatches = {};
    let match = -1;
    if ((query || customFiltersLength > 0) && !options?.noFilter) {
      let hasOnlyCustomFilters = false;
      if (typeof item === 'object') {
        if (item.type === 'divider' || item.type === 'subheader') {
          if (lookAheadItem?.type === 'divider' && item.type === 'subheader') {
            array.push(lookAheadItem); // divider before subheader
          }
          lookAheadItem = {
            index: i,
            matches: {},
            type: item.type
          };
          continue;
        }
        const filterKeys = keys || Object.keys(transformed);
        hasOnlyCustomFilters = filterKeys.length === customFiltersLength;
        for (const key of filterKeys) {
          const value = getPropertyFromItem(transformed, key);
          const keyFilter = options?.customKeyFilter?.[key];
          match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
          if (match !== -1 && match !== false) {
            if (keyFilter) customMatches[key] = normaliseMatch(match, query);else defaultMatches[key] = normaliseMatch(match, query);
          } else if (options?.filterMode === 'every') {
            continue loop;
          }
        }
      } else {
        match = filter(item, query, item);
        if (match !== -1 && match !== false) {
          defaultMatches.title = normaliseMatch(match, query);
        }
      }
      const defaultMatchesLength = Object.keys(defaultMatches).length;
      const customMatchesLength = Object.keys(customMatches).length;
      if (!defaultMatchesLength && !customMatchesLength) continue;
      if (options?.filterMode === 'union' && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
      if (options?.filterMode === 'intersection' && (customMatchesLength !== customFiltersLength || !defaultMatchesLength && customFiltersLength > 0 && !hasOnlyCustomFilters)) continue;
    }
    if (lookAheadItem) {
      array.push(lookAheadItem);
      lookAheadItem = null;
    }
    array.push({
      index: i,
      matches: {
        ...defaultMatches,
        ...customMatches
      }
    });
  }
  return array;
}
function useFilter(props, items, query, options) {
  const filteredItems = shallowRef([]);
  const filteredMatches = shallowRef(new Map());
  const transformedItems = computed(() => options?.transform ? unref(items).map(item => [item, options.transform(item)]) : unref(items));
  watchEffect(() => {
    const _query = typeof query === 'function' ? query() : unref(query);
    const strQuery = typeof _query !== 'string' && typeof _query !== 'number' ? '' : String(_query);
    const results = filterItems(transformedItems.value, strQuery, {
      customKeyFilter: {
        ...props.customKeyFilter,
        ...unref(options?.customKeyFilter)
      },
      default: props.customFilter,
      filterKeys: props.filterKeys,
      filterMode: props.filterMode,
      noFilter: props.noFilter
    });
    const originalItems = unref(items);
    const _filteredItems = [];
    const _filteredMatches = new Map();
    results.forEach(_ref => {
      let {
        index,
        matches
      } = _ref;
      const item = originalItems[index];
      _filteredItems.push(item);
      _filteredMatches.set(item.value, matches);
    });
    filteredItems.value = _filteredItems;
    filteredMatches.value = _filteredMatches;
  });
  function getMatches(item) {
    return filteredMatches.value.get(item.value);
  }
  return {
    filteredItems,
    filteredMatches,
    getMatches
  };
}
function highlightResult(name, text, matches) {
  if (matches == null || !matches.length) return text;
  return matches.map((match, i) => {
    const start = i === 0 ? 0 : matches[i - 1][1];
    const result = [createElementVNode("span", {
      "class": normalizeClass(`${name}__unmask`)
    }, [text.slice(start, match[0])]), createElementVNode("span", {
      "class": normalizeClass(`${name}__mask`)
    }, [text.slice(match[0], match[1])])];
    if (i === matches.length - 1) {
      result.push(createElementVNode("span", {
        "class": normalizeClass(`${name}__unmask`)
      }, [text.slice(match[1])]));
    }
    return createElementVNode(Fragment, null, [result]);
  });
}

// Types

const makeVAutocompleteProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...makeFilterProps({
    filterKeys: ['title']
  }),
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox'
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  ...makeTransitionProps({
    transition: false
  })
}, 'VAutocomplete');
const VAutocomplete = genericComponent()({
  name: 'VAutocomplete',
  props: makeVAutocompleteProps(),
  emits: {
    'update:focused': focused => true,
    'update:search': value => true,
    'update:modelValue': value => true,
    'update:menu': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = shallowRef(false);
    const isPristine = shallowRef(true);
    const listHasFocus = shallowRef(false);
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const selectionIndex = shallowRef(-1);
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => vTextFieldRef.value?.color);
    const search = useProxiedModel(props, 'search', '');
    const model = useProxiedModel(props, 'modelValue', [], v => transformIn(v === null ? [null] : wrapInArray(v)), v => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value) : typeof props.counterValue === 'number' ? props.counterValue : model.value.length;
    });
    const form = useForm(props);
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, () => isPristine.value ? '' : search.value);
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter(filteredItem => !model.value.some(s => s.value === filteredItem.value));
      }
      return filteredItems.value;
    });
    const hasChips = computed(() => !!(props.chips || slots.chip));
    const hasSelectionSlot = computed(() => hasChips.value || !!slots.selection);
    const selectedValues = computed(() => model.value.map(selection => selection.props.value));
    const highlightFirst = computed(() => {
      const selectFirst = props.autoSelectFirst === true || props.autoSelectFirst === 'exact' && search.value === displayItems.value[0]?.title;
      return selectFirst && displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || form.isReadonly.value || form.isDisabled.value);
    const _menu = useProxiedModel(props, 'menu');
    const menu = computed({
      get: () => _menu.value,
      set: v => {
        if (_menu.value && !v && vMenuRef.value?.ΨopenChildren.size) return;
        if (v && menuDisabled.value) return;
        _menu.value = v;
      }
    });
    const label = computed(() => menu.value ? props.closeText : props.openText);
    const listRef = ref();
    const listEvents = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
      search.value = '';
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;
      menu.value = true;
    }
    function onMousedownMenuIcon(e) {
      if (menuDisabled.value) return;
      if (isFocused.value) {
        e.preventDefault();
        e.stopPropagation();
      }
      menu.value = !menu.value;
    }
    function onListKeydown(e) {
      if (checkPrintable(e) || e.key === 'Backspace') {
        vTextFieldRef.value?.focus();
      }
    }
    function onKeydown(e) {
      if (form.isReadonly.value) return;
      const selectionStart = vTextFieldRef.value?.selectionStart;
      const length = model.value.length;
      if (['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
      }
      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true;
      }
      if (['Escape'].includes(e.key)) {
        menu.value = false;
      }
      if (highlightFirst.value && ['Enter', 'Tab'].includes(e.key) && !model.value.some(_ref2 => {
        let {
          value
        } = _ref2;
        return value === displayItems.value[0].value;
      })) {
        select(displayItems.value[0]);
      }
      if (e.key === 'ArrowDown' && highlightFirst.value) {
        listRef.value?.focus('next');
      }
      if (['Backspace', 'Delete'].includes(e.key)) {
        if (!props.multiple && hasSelectionSlot.value && model.value.length > 0 && !search.value) return select(model.value[0], false);
        if (~selectionIndex.value) {
          e.preventDefault();
          const originalSelectionIndex = selectionIndex.value;
          select(model.value[selectionIndex.value], false);
          selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
        } else if (e.key === 'Backspace' && !search.value) {
          selectionIndex.value = length - 1;
        }
        return;
      }
      if (!props.multiple) return;
      if (e.key === 'ArrowLeft') {
        if (selectionIndex.value < 0 && selectionStart && selectionStart > 0) return;
        const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
        if (model.value[prev]) {
          selectionIndex.value = prev;
        } else {
          const searchLength = search.value?.length ?? null;
          selectionIndex.value = -1;
          vTextFieldRef.value?.setSelectionRange(searchLength, searchLength);
        }
      } else if (e.key === 'ArrowRight') {
        if (selectionIndex.value < 0) return;
        const next = selectionIndex.value + 1;
        if (model.value[next]) {
          selectionIndex.value = next;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value?.setSelectionRange(0, 0);
        }
      } else if (~selectionIndex.value && checkPrintable(e)) {
        selectionIndex.value = -1;
      }
    }
    function onChange(e) {
      if (matchesSelector(vTextFieldRef.value, ':autofill') || matchesSelector(vTextFieldRef.value, ':-webkit-autofill')) {
        const item = items.value.find(item => item.title === e.target.value);
        if (item) {
          select(item);
        }
      }
    }
    function onAfterEnter() {
      if (props.eager) {
        vVirtualScrollRef.value?.calculateVisibleItems();
      }
    }
    function onAfterLeave() {
      if (isFocused.value) {
        isPristine.value = true;
        vTextFieldRef.value?.focus();
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
      setTimeout(() => {
        listHasFocus.value = true;
      });
    }
    function onFocusout(e) {
      listHasFocus.value = false;
    }
    function onUpdateModelValue(v) {
      if (v == null || v === '' && !props.multiple && !hasSelectionSlot.value) model.value = [];
    }
    const isSelecting = shallowRef(false);

    /** @param set - null means toggle */
    function select(item) {
      let set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!item || item.props.disabled) return;
      if (props.multiple) {
        const index = model.value.findIndex(selection => (props.valueComparator || deepEqual)(selection.value, item.value));
        const add = set == null ? !~index : set;
        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
        if (props.clearOnSelect) {
          search.value = '';
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        search.value = add && !hasSelectionSlot.value ? item.title : '';

        // watch for search watcher to trigger
        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
      }
    }
    watch(isFocused, (val, oldVal) => {
      if (val === oldVal) return;
      if (val) {
        isSelecting.value = true;
        search.value = props.multiple || hasSelectionSlot.value ? '' : String(model.value.at(-1)?.props.title ?? '');
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      } else {
        if (!props.multiple && search.value == null) model.value = [];
        menu.value = false;
        if (props.multiple || hasSelectionSlot.value) search.value = '';
        selectionIndex.value = -1;
      }
    });
    watch(search, val => {
      if (!isFocused.value || isSelecting.value) return;
      if (val) menu.value = true;
      isPristine.value = !val;
    });
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        const index = displayItems.value.findIndex(item => model.value.some(s => item.value === s.value));
        IN_BROWSER && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index);
        });
      }
    });
    watch(() => props.items, (newVal, oldVal) => {
      if (menu.value) return;
      if (isFocused.value && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots['prepend-item'] || slots['append-item'] || slots['no-data']);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": [$event => search.value = $event, onUpdateModelValue],
        "focused": isFocused.value,
        "onUpdate:focused": $event => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "onChange": onChange,
        "class": ['v-autocomplete', `v-autocomplete--${props.multiple ? 'multiple' : 'single'}`, {
          'v-autocomplete--active-menu': menu.value,
          'v-autocomplete--chips': !!props.chips,
          'v-autocomplete--selection-slot': !!hasSelectionSlot.value,
          'v-autocomplete--selecting-index': selectionIndex.value > -1
        }, props.class],
        "style": props.style,
        "readonly": form.isReadonly.value,
        "placeholder": isDirty ? undefined : props.placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => createElementVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": $event => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-autocomplete__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterEnter": onAfterEnter,
          "onAfterLeave": onAfterLeave
        }, props.menuProps), {
          default: () => [hasList && createVNode(VList, mergeProps({
            "ref": listRef,
            "filterable": true,
            "selected": selectedValues.value,
            "selectStrategy": props.multiple ? 'independent' : 'single-independent',
            "onMousedown": e => e.preventDefault(),
            "onKeydown": onListKeydown,
            "onFocusin": onFocusin,
            "onFocusout": onFocusout,
            "tabindex": "-1",
            "selectable": true,
            "aria-live": "polite",
            "color": props.itemColor ?? props.color
          }, listEvents, props.listProps), {
            default: () => [slots['prepend-item']?.(), !displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? createVNode(VListItem, {
              "key": "no-data",
              "title": t(props.noDataText)
            }, null)), createVNode(VVirtualScroll, {
              "ref": vVirtualScrollRef,
              "renderless": true,
              "items": displayItems.value,
              "itemKey": "value"
            }, {
              default: _ref3 => {
                let {
                  item,
                  index,
                  itemRef
                } = _ref3;
                const itemProps = mergeProps(item.props, {
                  ref: itemRef,
                  key: item.value,
                  active: highlightFirst.value && index === 0 ? true : undefined,
                  onClick: () => select(item, null)
                });
                if (item.type === 'divider') {
                  return slots.divider?.({
                    props: item.raw,
                    index
                  }) ?? createVNode(VDivider, mergeProps(item.props, {
                    "key": `divider-${index}`
                  }), null);
                }
                if (item.type === 'subheader') {
                  return slots.subheader?.({
                    props: item.raw,
                    index
                  }) ?? createVNode(VListSubheader, mergeProps(item.props, {
                    "key": `subheader-${index}`
                  }), null);
                }
                return slots.item?.({
                  item,
                  index,
                  props: itemProps
                }) ?? createVNode(VListItem, mergeProps(itemProps, {
                  "role": "option"
                }), {
                  prepend: _ref4 => {
                    let {
                      isSelected
                    } = _ref4;
                    return createElementVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                      "key": item.value,
                      "modelValue": isSelected,
                      "ripple": false,
                      "tabindex": "-1"
                    }, null) : undefined, item.props.prependAvatar && createVNode(VAvatar, {
                      "image": item.props.prependAvatar
                    }, null), item.props.prependIcon && createVNode(VIcon, {
                      "icon": item.props.prependIcon
                    }, null)]);
                  },
                  title: () => {
                    return isPristine.value ? item.title : highlightResult('v-autocomplete', item.title, getMatches(item)?.title);
                  }
                });
              }
            }), slots['append-item']?.()]
          })]
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = {
            'onClick:close': onChipClose,
            onKeydown(e) {
              if (e.key !== 'Enter' && e.key !== ' ') return;
              e.preventDefault();
              e.stopPropagation();
              onChipClose(e);
            },
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            'onUpdate:modelValue': undefined
          };
          const hasSlot = hasChips.value ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips.value ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : undefined;
          if (hasSlot && !slotContent) return undefined;
          return createElementVNode("div", {
            "key": item.value,
            "class": normalizeClass(['v-autocomplete__selection', index === selectionIndex.value && ['v-autocomplete__selection--selected', textColorClasses.value]]),
            "style": normalizeStyle(index === selectionIndex.value ? textColorStyles.value : {})
          }, [hasChips.value ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: 'small',
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent ?? createElementVNode("span", {
            "class": "v-autocomplete__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && createElementVNode("span", {
            "class": "v-autocomplete__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        'append-inner': function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createElementVNode(Fragment, null, [slots['append-inner']?.(...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-autocomplete__menu-icon",
            "color": vTextFieldRef.value?.fieldIconColor,
            "icon": props.menuIcon,
            "onMousedown": onMousedownMenuIcon,
            "onClick": noop,
            "aria-label": t(label.value),
            "title": t(label.value),
            "tabindex": "-1"
          }, null) : undefined]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});

const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: '$vuetify.badge'
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: 'top end'
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps({
    transition: 'scale-rotate-transition'
  }),
  ...makeDimensionProps()
}, 'VBadge');
const VBadge = genericComponent()({
  name: 'VBadge',
  inheritAttrs: false,
  props: makeVBadgeProps(),
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.textColor);
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, side => {
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (['top', 'bottom'].includes(side) ? Number(props.offsetY ?? 0) : ['left', 'right'].includes(side) ? Number(props.offsetX ?? 0) : 0);
    });
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= Number(props.max) ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, ['aria-atomic', 'aria-label', 'aria-live', 'role', 'title']);
      return createVNode(props.tag, mergeProps({
        "class": ['v-badge', {
          'v-badge--bordered': props.bordered,
          'v-badge--dot': props.dot,
          'v-badge--floating': props.floating,
          'v-badge--inline': props.inline
        }, props.class]
      }, attrs, {
        "style": props.style
      }), {
        default: () => [createElementVNode("div", {
          "class": "v-badge__wrapper"
        }, [ctx.slots.default?.(), createVNode(MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [withDirectives(createElementVNode("span", mergeProps({
            "class": ['v-badge__badge', themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
            "style": [backgroundColorStyles.value, textColorStyles.value, dimensionStyles.value, props.inline ? {} : locationStyles.value],
            "aria-atomic": "true",
            "aria-label": t(props.label, value),
            "aria-live": "polite",
            "role": "status"
          }, badgeAttrs), [props.dot ? undefined : ctx.slots.badge ? ctx.slots.badge?.() : props.icon ? createVNode(VIcon, {
            "icon": props.icon
          }, null) : content]), [[vShow, props.modelValue]])]
        })])]
      });
    });
    return {};
  }
});

const makeVBannerActionsProps = propsFactory({
  color: String,
  density: String,
  ...makeComponentProps()
}, 'VBannerActions');
const VBannerActions = genericComponent()({
  name: 'VBannerActions',
  props: makeVBannerActionsProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        color: props.color,
        density: props.density,
        slim: true,
        variant: 'text'
      }
    });
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(['v-banner-actions', props.class]),
      "style": normalizeStyle(props.style)
    }, [slots.default?.()]));
    return {};
  }
});

// Utilities
const VBannerText = createSimpleFunctional('v-banner-text');

// Types

const makeVBannerProps = propsFactory({
  avatar: String,
  bgColor: String,
  color: String,
  icon: IconValue,
  lines: String,
  stacked: Boolean,
  sticky: Boolean,
  text: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, 'VBanner');
const VBanner = genericComponent()({
  name: 'VBanner',
  props: makeVBannerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      borderClasses
    } = useBorder(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const color = toRef(() => props.color);
    const density = toRef(() => props.density);
    provideDefaults({
      VBannerActions: {
        color,
        density
      }
    });
    useRender(() => {
      const hasText = !!(props.text || slots.text);
      const hasPrependMedia = !!(props.avatar || props.icon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      return createVNode(props.tag, {
        "class": normalizeClass(['v-banner', {
          'v-banner--stacked': props.stacked || mobile.value,
          'v-banner--sticky': props.sticky,
          [`v-banner--${props.lines}-line`]: !!props.lines
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, displayClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style]),
        "role": "banner"
      }, {
        default: () => [hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-banner__prepend"
        }, [!slots.prepend ? createVNode(VAvatar, {
          "key": "prepend-avatar",
          "color": color.value,
          "density": density.value,
          "icon": props.icon,
          "image": props.avatar
        }, null) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !hasPrependMedia,
          "defaults": {
            VAvatar: {
              color: color.value,
              density: density.value,
              icon: props.icon,
              image: props.avatar
            }
          }
        }, slots.prepend)]), createElementVNode("div", {
          "class": "v-banner__content"
        }, [hasText && createVNode(VBannerText, {
          "key": "text"
        }, {
          default: () => [slots.text?.() ?? props.text]
        }), slots.default?.()]), slots.actions && createVNode(VBannerActions, {
          "key": "actions"
        }, slots.actions)]
      });
    });
  }
});

// Types

const makeVBottomNavigationProps = propsFactory({
  baseColor: String,
  bgColor: String,
  color: String,
  grow: Boolean,
  mode: {
    type: String,
    validator: v => !v || ['horizontal', 'shift'].includes(v)
  },
  height: {
    type: [Number, String],
    default: 56
  },
  active: {
    type: Boolean,
    default: true
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeLayoutItemProps({
    name: 'bottom-navigation'
  }),
  ...makeTagProps({
    tag: 'header'
  }),
  ...makeGroupProps({
    selectedClass: 'v-btn--selected'
  }),
  ...makeThemeProps()
}, 'VBottomNavigation');
const VBottomNavigation = genericComponent()({
  name: 'VBottomNavigation',
  props: makeVBottomNavigationProps(),
  emits: {
    'update:active': value => true,
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme();
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      densityClasses
    } = useDensity(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const height = computed(() => Number(props.height) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
    const isActive = useProxiedModel(props, 'active', props.active);
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(() => 'bottom'),
      layoutSize: toRef(() => isActive.value ? height.value : 0),
      elementSize: height,
      active: isActive,
      absolute: toRef(() => props.absolute)
    });
    useGroup(props, VBtnToggleSymbol);
    provideDefaults({
      VBtn: {
        baseColor: toRef(() => props.baseColor),
        color: toRef(() => props.color),
        density: toRef(() => props.density),
        stacked: toRef(() => props.mode !== 'horizontal'),
        variant: 'text'
      }
    }, {
      scoped: true
    });
    useRender(() => {
      return createVNode(props.tag, {
        "class": normalizeClass(['v-bottom-navigation', {
          'v-bottom-navigation--active': isActive.value,
          'v-bottom-navigation--grow': props.grow,
          'v-bottom-navigation--shift': props.mode === 'shift'
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, layoutItemStyles.value, {
          height: convertToUnit(height.value)
        }, ssrBootStyles.value, props.style])
      }, {
        default: () => [slots.default && createElementVNode("div", {
          "class": "v-bottom-navigation__content"
        }, [slots.default()])]
      });
    });
    return {};
  }
});

// Types

const makeVDialogProps = propsFactory({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: true
  },
  scrollable: Boolean,
  ...makeVOverlayProps({
    origin: 'center center',
    scrollStrategy: 'block',
    transition: {
      component: VDialogTransition
    },
    zIndex: 2400
  })
}, 'VDialog');
const VDialog = genericComponent()({
  name: 'VDialog',
  props: makeVDialogProps(),
  emits: {
    'update:modelValue': value => true,
    afterEnter: () => true,
    afterLeave: () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const {
      scopeId
    } = useScopeId();
    const overlay = ref();
    function onFocusin(e) {
      const before = e.relatedTarget;
      const after = e.target;
      if (before !== after && overlay.value?.contentEl &&
      // We're the topmost dialog
      overlay.value?.globalTop &&
      // It isn't the document or the dialog body
      ![document, overlay.value.contentEl].includes(after) &&
      // It isn't inside the dialog body
      !overlay.value.contentEl.contains(after)) {
        const focusable = focusableChildren(overlay.value.contentEl);
        if (!focusable.length) return;
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];
        if (before === firstElement) {
          lastElement.focus();
        } else {
          firstElement.focus();
        }
      }
    }
    onBeforeUnmount(() => {
      document.removeEventListener('focusin', onFocusin);
    });
    if (IN_BROWSER) {
      watch(() => isActive.value && props.retainFocus, val => {
        val ? document.addEventListener('focusin', onFocusin) : document.removeEventListener('focusin', onFocusin);
      }, {
        immediate: true
      });
    }
    function onAfterEnter() {
      emit('afterEnter');
      if ((props.scrim || props.retainFocus) && overlay.value?.contentEl && !overlay.value.contentEl.contains(document.activeElement)) {
        overlay.value.contentEl.focus({
          preventScroll: true
        });
      }
    }
    function onAfterLeave() {
      emit('afterLeave');
    }
    watch(isActive, async val => {
      if (!val) {
        await nextTick();
        overlay.value.activatorEl?.focus({
          preventScroll: true
        });
      }
    });
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      const activatorProps = mergeProps({
        'aria-haspopup': 'dialog'
      }, props.activatorProps);
      const contentProps = mergeProps({
        tabindex: -1
      }, props.contentProps);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ['v-dialog', {
          'v-dialog--fullscreen': props.fullscreen,
          'v-dialog--scrollable': props.scrollable
        }, props.class],
        "style": props.style
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "aria-modal": "true",
        "activatorProps": activatorProps,
        "contentProps": contentProps,
        "height": !props.fullscreen ? props.height : undefined,
        "width": !props.fullscreen ? props.width : undefined,
        "maxHeight": !props.fullscreen ? props.maxHeight : undefined,
        "maxWidth": !props.fullscreen ? props.maxWidth : undefined,
        "role": "dialog",
        "onAfterEnter": onAfterEnter,
        "onAfterLeave": onAfterLeave
      }, scopeId), {
        activator: slots.activator,
        default: function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createVNode(VDefaultsProvider, {
            "root": "VDialog"
          }, {
            default: () => [slots.default?.(...args)]
          });
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});

// Types

const makeVBottomSheetProps = propsFactory({
  inset: Boolean,
  ...makeVDialogProps({
    transition: 'bottom-sheet-transition'
  })
}, 'VBottomSheet');
const VBottomSheet = genericComponent()({
  name: 'VBottomSheet',
  props: makeVBottomSheetProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    useRender(() => {
      const dialogProps = VDialog.filterProps(props);
      return createVNode(VDialog, mergeProps(dialogProps, {
        "contentClass": ['v-bottom-sheet__content', props.contentClass],
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "class": ['v-bottom-sheet', {
          'v-bottom-sheet--inset': props.inset
        }, props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});

const makeVBreadcrumbsDividerProps = propsFactory({
  divider: [Number, String],
  ...makeComponentProps()
}, 'VBreadcrumbsDivider');
const VBreadcrumbsDivider = genericComponent()({
  name: 'VBreadcrumbsDivider',
  props: makeVBreadcrumbsDividerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createElementVNode("li", {
      "aria-hidden": "true",
      "class": normalizeClass(['v-breadcrumbs-divider', props.class]),
      "style": normalizeStyle(props.style)
    }, [slots?.default?.() ?? props.divider]));
    return {};
  }
});

const makeVBreadcrumbsItemProps = propsFactory({
  active: Boolean,
  activeClass: String,
  activeColor: String,
  color: String,
  disabled: Boolean,
  title: String,
  ...makeComponentProps(),
  ...makeRouterProps(),
  ...makeTagProps({
    tag: 'li'
  })
}, 'VBreadcrumbsItem');
const VBreadcrumbsItem = genericComponent()({
  name: 'VBreadcrumbsItem',
  props: makeVBreadcrumbsItemProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const link = useLink(props, attrs);
    const isActive = computed(() => props.active || link.isActive?.value);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => isActive.value ? props.activeColor : props.color);
    useRender(() => {
      return createVNode(props.tag, {
        "class": normalizeClass(['v-breadcrumbs-item', {
          'v-breadcrumbs-item--active': isActive.value,
          'v-breadcrumbs-item--disabled': props.disabled,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value, props.class]),
        "style": normalizeStyle([textColorStyles.value, props.style]),
        "aria-current": isActive.value ? 'page' : undefined
      }, {
        default: () => [!link.isLink.value ? slots.default?.() ?? props.title : createElementVNode("a", mergeProps({
          "class": "v-breadcrumbs-item--link",
          "onClick": link.navigate
        }, link.linkProps), [slots.default?.() ?? props.title])]
      });
    });
    return {};
  }
});

// Types

const makeVBreadcrumbsProps = propsFactory({
  activeClass: String,
  activeColor: String,
  bgColor: String,
  color: String,
  disabled: Boolean,
  divider: {
    type: String,
    default: '/'
  },
  icon: IconValue,
  items: {
    type: Array,
    default: () => []
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: 'ul'
  })
}, 'VBreadcrumbs');
const VBreadcrumbs = genericComponent()({
  name: 'VBreadcrumbs',
  props: makeVBreadcrumbsProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      densityClasses
    } = useDensity(props);
    const {
      roundedClasses
    } = useRounded(props);
    provideDefaults({
      VBreadcrumbsDivider: {
        divider: toRef(() => props.divider)
      },
      VBreadcrumbsItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor: toRef(() => props.activeColor),
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled)
      }
    });
    const items = computed(() => props.items.map(item => {
      return typeof item === 'string' ? {
        item: {
          title: item
        },
        raw: item
      } : {
        item,
        raw: item
      };
    }));
    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.icon);
      return createVNode(props.tag, {
        "class": normalizeClass(['v-breadcrumbs', backgroundColorClasses.value, densityClasses.value, roundedClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, props.style])
      }, {
        default: () => [hasPrepend && createElementVNode("li", {
          "key": "prepend",
          "class": "v-breadcrumbs__prepend"
        }, [!slots.prepend ? createVNode(VIcon, {
          "key": "prepend-icon",
          "start": true,
          "icon": props.icon
        }, null) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !props.icon,
          "defaults": {
            VIcon: {
              icon: props.icon,
              start: true
            }
          }
        }, slots.prepend)]), items.value.map((_ref2, index, array) => {
          let {
            item,
            raw
          } = _ref2;
          return createElementVNode(Fragment, null, [slots.item?.({
            item,
            index
          }) ?? createVNode(VBreadcrumbsItem, mergeProps({
            "key": index,
            "disabled": index >= array.length - 1
          }, typeof item === 'string' ? {
            title: item
          } : item), {
            default: slots.title ? () => slots.title?.({
              item,
              index
            }) : undefined
          }), index < array.length - 1 && createVNode(VBreadcrumbsDivider, null, {
            default: slots.divider ? () => slots.divider?.({
              item: raw,
              index
            }) : undefined
          })]);
        }), slots.default?.()]
      });
    });
    return {};
  }
});

const makeVCardActionsProps = propsFactory({
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VCardActions');
const VCardActions = genericComponent()({
  name: 'VCardActions',
  props: makeVCardActionsProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        slim: true,
        variant: 'text'
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-card-actions', props.class]),
      "style": normalizeStyle(props.style)
    }, slots));
    return {};
  }
});

const makeVCardSubtitleProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VCardSubtitle');
const VCardSubtitle = genericComponent()({
  name: 'VCardSubtitle',
  props: makeVCardSubtitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-card-subtitle', props.class]),
      "style": normalizeStyle([{
        '--v-card-subtitle-opacity': props.opacity
      }, props.style])
    }, slots));
    return {};
  }
});

// Utilities
const VCardTitle = createSimpleFunctional('v-card-title');

const makeCardItemProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  prependAvatar: String,
  prependIcon: IconValue,
  subtitle: {
    type: [String, Number, Boolean],
    default: undefined
  },
  title: {
    type: [String, Number, Boolean],
    default: undefined
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps()
}, 'VCardItem');
const VCardItem = genericComponent()({
  name: 'VCardItem',
  props: makeCardItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
      const hasPrepend = !!(hasPrependMedia || slots.prepend);
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
      const hasAppend = !!(hasAppendMedia || slots.append);
      const hasTitle = !!(props.title != null || slots.title);
      const hasSubtitle = !!(props.subtitle != null || slots.subtitle);
      return createVNode(props.tag, {
        "class": normalizeClass(['v-card-item', props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [hasPrepend && createElementVNode("div", {
          "key": "prepend",
          "class": "v-card-item__prepend"
        }, [!slots.prepend ? createElementVNode(Fragment, null, [props.prependAvatar && createVNode(VAvatar, {
          "key": "prepend-avatar",
          "density": props.density,
          "image": props.prependAvatar
        }, null), props.prependIcon && createVNode(VIcon, {
          "key": "prepend-icon",
          "density": props.density,
          "icon": props.prependIcon
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "prepend-defaults",
          "disabled": !hasPrependMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.prependAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.prependIcon
            }
          }
        }, slots.prepend)]), createElementVNode("div", {
          "class": "v-card-item__content"
        }, [hasTitle && createVNode(VCardTitle, {
          "key": "title"
        }, {
          default: () => [slots.title?.() ?? toDisplayString(props.title)]
        }), hasSubtitle && createVNode(VCardSubtitle, {
          "key": "subtitle"
        }, {
          default: () => [slots.subtitle?.() ?? toDisplayString(props.subtitle)]
        }), slots.default?.()]), hasAppend && createElementVNode("div", {
          "key": "append",
          "class": "v-card-item__append"
        }, [!slots.append ? createElementVNode(Fragment, null, [props.appendIcon && createVNode(VIcon, {
          "key": "append-icon",
          "density": props.density,
          "icon": props.appendIcon
        }, null), props.appendAvatar && createVNode(VAvatar, {
          "key": "append-avatar",
          "density": props.density,
          "image": props.appendAvatar
        }, null)]) : createVNode(VDefaultsProvider, {
          "key": "append-defaults",
          "disabled": !hasAppendMedia,
          "defaults": {
            VAvatar: {
              density: props.density,
              image: props.appendAvatar
            },
            VIcon: {
              density: props.density,
              icon: props.appendIcon
            }
          }
        }, slots.append)])]
      });
    });
    return {};
  }
});

const makeVCardTextProps = propsFactory({
  opacity: [Number, String],
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VCardText');
const VCardText = genericComponent()({
  name: 'VCardText',
  props: makeVCardTextProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-card-text', props.class]),
      "style": normalizeStyle([{
        '--v-card-text-opacity': props.opacity
      }, props.style])
    }, slots));
    return {};
  }
});

// Types

const makeVCardProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: undefined
  },
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  subtitle: {
    type: [String, Number, Boolean],
    default: undefined
  },
  text: {
    type: [String, Number, Boolean],
    default: undefined
  },
  title: {
    type: [String, Number, Boolean],
    default: undefined
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'elevated'
  })
}, 'VCard');
const VCard = genericComponent()({
  name: 'VCard',
  directives: {
    vRipple: Ripple
  },
  props: makeVCardProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      loaderClasses
    } = useLoader(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const link = useLink(props, attrs);
    useRender(() => {
      const isLink = props.link !== false && link.isLink.value;
      const isClickable = !props.disabled && props.link !== false && (props.link || link.isClickable.value);
      const Tag = isLink ? 'a' : props.tag;
      const hasTitle = !!(slots.title || props.title != null);
      const hasSubtitle = !!(slots.subtitle || props.subtitle != null);
      const hasHeader = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasCardItem = hasHeader || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text != null);
      return withDirectives(createVNode(Tag, mergeProps({
        "class": ['v-card', {
          'v-card--disabled': props.disabled,
          'v-card--flat': props.flat,
          'v-card--hover': props.hover && !(props.disabled || props.flat),
          'v-card--link': isClickable
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, props.class],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value, props.style],
        "onClick": isClickable && link.navigate,
        "tabindex": props.disabled ? -1 : undefined
      }, link.linkProps), {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-card__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(LoaderSlot, {
          "name": "v-card",
          "active": !!props.loading,
          "color": typeof props.loading === 'boolean' ? undefined : props.loading
        }, {
          default: slots.loader
        }), hasCardItem && createVNode(VCardItem, {
          "key": "item",
          "prependAvatar": props.prependAvatar,
          "prependIcon": props.prependIcon,
          "title": props.title,
          "subtitle": props.subtitle,
          "appendAvatar": props.appendAvatar,
          "appendIcon": props.appendIcon
        }, {
          default: slots.item,
          prepend: slots.prepend,
          title: slots.title,
          subtitle: slots.subtitle,
          append: slots.append
        }), hasText && createVNode(VCardText, {
          "key": "text"
        }, {
          default: () => [slots.text?.() ?? props.text]
        }), slots.default?.(), slots.actions && createVNode(VCardActions, null, {
          default: slots.actions
        }), genOverlays(isClickable, 'v-card')]
      }), [[Ripple, isClickable && props.ripple]]);
    });
    return {};
  }
});

// Utilities

// Types

const handleGesture = wrapper => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  wrapper.start?.({
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  wrapper.end?.({
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  wrapper.move?.({
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: e => touchstart(e, wrapper),
    touchend: e => touchend(e, wrapper),
    touchmove: e => touchmove(e, wrapper)
  };
}
function mounted$3(el, binding) {
  const value = binding.value;
  const target = value?.parent ? el.parentElement : el;
  const options = value?.options ?? {
    passive: true
  };
  const uid = binding.instance?.$.uid; // TODO: use custom uid generator

  if (!target || uid === undefined) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach(eventName => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted$3(el, binding) {
  const target = binding.value?.parent ? el.parentElement : el;
  const uid = binding.instance?.$.uid;
  if (!target?._touchHandlers || uid === undefined) return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach(eventName => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted: mounted$3,
  unmounted: unmounted$3
};

// Types

const VWindowSymbol = Symbol.for('vuetify:v-window');
const VWindowGroupSymbol = Symbol.for('vuetify:v-window-group');
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: '$next'
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: '$prev'
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: v => typeof v === 'boolean' || v === 'hover'
  },
  verticalArrows: [Boolean, String],
  touch: {
    type: [Object, Boolean],
    default: undefined
  },
  direction: {
    type: String,
    default: 'horizontal'
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: 'v-window-item--active'
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: 'force'
  },
  crossfade: Boolean,
  transitionDuration: Number,
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, 'VWindow');
const VWindow = genericComponent()({
  name: 'VWindow',
  directives: {
    vTouch: Touch
  },
  props: makeVWindowProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      if (props.crossfade) {
        return 'v-window-crossfade-transition';
      }
      const axis = props.direction === 'vertical' ? 'y' : 'x';
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? '-reverse' : '';
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(undefined);
    const activeIndex = computed(() => {
      return group.items.value.findIndex(item => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false;
      } else {
        isReversed.value = newVal < oldVal;
      }
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = toRef(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = toRef(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? 'right' : 'left'}`,
        onClick: group.prev,
        'aria-label': t('$vuetify.carousel.prev')
      };
      arrows.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createElementVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? 'left' : 'right'}`,
        onClick: group.next,
        'aria-label': t('$vuetify.carousel.next')
      };
      arrows.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createElementVNode("div", null, null));
      return arrows;
    });
    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: _ref2 => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...(props.touch === true ? {} : props.touch)
      };
    });
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": normalizeClass(['v-window', {
        'v-window--show-arrows-on-hover': props.showArrows === 'hover',
        'v-window--vertical-arrows': !!props.verticalArrows,
        'v-window--crossfade': !!props.crossfade
      }, themeClasses.value, props.class]),
      "style": normalizeStyle([props.style, props.transitionDuration && !PREFERS_REDUCED_MOTION ? {
        '--v-window-transition-duration': convertToUnit(props.transitionDuration, 'ms')
      } : undefined])
    }, {
      default: () => [createElementVNode("div", {
        "class": "v-window__container",
        "style": {
          height: transitionHeight.value
        }
      }, [slots.default?.({
        group
      }), props.showArrows !== false && createElementVNode("div", {
        "class": normalizeClass(['v-window__controls', {
          'v-window__controls--left': props.verticalArrows === 'left' || props.verticalArrows === true
        }, {
          'v-window__controls--right': props.verticalArrows === 'right'
        }])
      }, [arrows.value])]), slots.additional?.({
        group
      })]
    }), [[Touch, touchOptions.value]]));
    return {
      group
    };
  }
});

// Types

const makeVCarouselProps = propsFactory({
  color: String,
  cycle: Boolean,
  delimiterIcon: {
    type: IconValue,
    default: '$delimiter'
  },
  height: {
    type: [Number, String],
    default: 500
  },
  hideDelimiters: Boolean,
  hideDelimiterBackground: Boolean,
  interval: {
    type: [Number, String],
    default: 6000,
    validator: value => Number(value) > 0
  },
  progress: [Boolean, String],
  verticalDelimiters: [Boolean, String],
  ...makeVWindowProps({
    continuous: true,
    mandatory: 'force',
    showArrows: true
  })
}, 'VCarousel');
const VCarousel = genericComponent()({
  name: 'VCarousel',
  props: makeVCarouselProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const {
      t
    } = useLocale();
    const windowRef = ref();
    let slideTimeout = -1;
    watch(model, restartTimeout);
    watch(() => props.interval, restartTimeout);
    watch(() => props.cycle, val => {
      if (val) restartTimeout();else window.clearTimeout(slideTimeout);
    });
    onMounted(startTimeout);
    function startTimeout() {
      if (!props.cycle || !windowRef.value) return;
      slideTimeout = window.setTimeout(windowRef.value.group.next, Number(props.interval) > 0 ? Number(props.interval) : 6000);
    }
    function restartTimeout() {
      window.clearTimeout(slideTimeout);
      window.requestAnimationFrame(startTimeout);
    }
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "ref": windowRef
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-carousel', {
          'v-carousel--hide-delimiter-background': props.hideDelimiterBackground,
          'v-carousel--vertical-delimiters': props.verticalDelimiters
        }, props.class],
        "style": [{
          height: convertToUnit(props.height)
        }, props.style]
      }), {
        default: slots.default,
        additional: _ref2 => {
          let {
            group
          } = _ref2;
          return createElementVNode(Fragment, null, [!props.hideDelimiters && createElementVNode("div", {
            "class": "v-carousel__controls",
            "style": {
              left: props.verticalDelimiters === 'left' && props.verticalDelimiters ? 0 : 'auto',
              right: props.verticalDelimiters === 'right' ? 0 : 'auto'
            }
          }, [group.items.value.length > 0 && createVNode(VDefaultsProvider, {
            "defaults": {
              VBtn: {
                color: props.color,
                icon: props.delimiterIcon,
                size: 'x-small',
                variant: 'text'
              }
            },
            "scoped": true
          }, {
            default: () => [group.items.value.map((item, index) => {
              const props = {
                id: `carousel-item-${item.id}`,
                'aria-label': t('$vuetify.carousel.ariaLabel.delimiter', index + 1, group.items.value.length),
                class: ['v-carousel__controls__item', group.isSelected(item.id) && 'v-btn--active'],
                onClick: () => group.select(item.id, true)
              };
              return slots.item ? slots.item({
                props,
                item
              }) : createVNode(VBtn, mergeProps(item, props), null);
            })]
          })]), props.progress && createVNode(VProgressLinear, {
            "absolute": true,
            "class": "v-carousel__progress",
            "color": typeof props.progress === 'string' ? props.progress : undefined,
            "modelValue": (group.getItemIndex(model.value) + 1) / group.items.value.length * 100
          }, null)]);
        },
        prev: slots.prev,
        next: slots.next
      });
    });
    return {};
  }
});

const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: undefined
  },
  transition: {
    type: [Boolean, String],
    default: undefined
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, 'VWindowItem');
const VWindowItem = genericComponent()({
  name: 'VWindowItem',
  directives: {
    vTouch: Touch
  },
  props: makeVWindowItemProps(),
  emits: {
    'group:selected': val => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject$1(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window || !groupItem) throw new Error('[Vuetify] VWindowItem must be used inside VWindow');
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }

      // Finalize transition state.
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;

        // Remove container height if we are out of transition.
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = undefined;
        }
      }
    }
    function onBeforeTransition() {
      if (isTransitioning.value || !window) {
        return;
      }

      // Initialize transition state here.
      isTransitioning.value = true;
      if (window.transitionCount.value === 0) {
        // Set initial height for height transition.
        window.transitionHeight.value = convertToUnit(window.rootRef.value?.clientHeight);
      }
      window.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition(); // This should have the same path as normal transition end.
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        // Do not set height if no transition or cancelled.
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }

        // Set transition target height.
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== 'string' ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => [withDirectives(createElementVNode("div", {
        "class": normalizeClass(['v-window-item', groupItem.selectedClass.value, props.class]),
        "style": normalizeStyle(props.style)
      }, [hasContent.value && slots.default?.()]), [[vShow, groupItem.isSelected.value]])]
    }));
    return {
      groupItem
    };
  }
});

// Types

const makeVCarouselItemProps = propsFactory({
  ...makeVImgProps(),
  ...makeVWindowItemProps()
}, 'VCarouselItem');
const VCarouselItem = genericComponent()({
  name: 'VCarouselItem',
  inheritAttrs: false,
  props: makeVCarouselItemProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    useRender(() => {
      const imgProps = VImg.filterProps(props);
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "class": ['v-carousel-item', props.class]
      }, windowItemProps), {
        default: () => [createVNode(VImg, mergeProps(attrs, imgProps), slots)]
      });
    });
  }
});

// Styles
const VCode = createSimpleFunctional('v-code', 'code');

// Types

const makeVColorPickerCanvasProps = propsFactory({
  color: {
    type: Object
  },
  disabled: Boolean,
  dotSize: {
    type: [Number, String],
    default: 10
  },
  height: {
    type: [Number, String],
    default: 150
  },
  width: {
    type: [Number, String],
    default: 300
  },
  ...makeComponentProps()
}, 'VColorPickerCanvas');
const VColorPickerCanvas = defineComponent({
  name: 'VColorPickerCanvas',
  props: makeVColorPickerCanvasProps(),
  emits: {
    'update:color': color => true,
    'update:position': hue => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const isInteracting = shallowRef(false);
    const canvasRef = ref();
    const canvasWidth = shallowRef(parseFloat(props.width));
    const canvasHeight = shallowRef(parseFloat(props.height));
    const _dotPosition = ref({
      x: 0,
      y: 0
    });
    const dotPosition = computed({
      get: () => _dotPosition.value,
      set(val) {
        if (!canvasRef.value) return;
        const {
          x,
          y
        } = val;
        _dotPosition.value = val;
        emit('update:color', {
          h: props.color?.h ?? 0,
          s: clamp(x, 0, canvasWidth.value) / canvasWidth.value,
          v: 1 - clamp(y, 0, canvasHeight.value) / canvasHeight.value,
          a: props.color?.a ?? 1
        });
      }
    });
    const dotStyles = computed(() => {
      const {
        x,
        y
      } = dotPosition.value;
      const radius = parseInt(props.dotSize, 10) / 2;
      return {
        width: convertToUnit(props.dotSize),
        height: convertToUnit(props.dotSize),
        transform: `translate(${convertToUnit(x - radius)}, ${convertToUnit(y - radius)})`
      };
    });
    const {
      resizeRef
    } = useResizeObserver(entries => {
      if (!resizeRef.el?.offsetParent) return;
      const {
        width,
        height
      } = entries[0].contentRect;
      canvasWidth.value = width;
      canvasHeight.value = height;
    });
    function updateDotPosition(x, y, rect) {
      const {
        left,
        top,
        width,
        height
      } = rect;
      dotPosition.value = {
        x: clamp(x - left, 0, width),
        y: clamp(y - top, 0, height)
      };
    }
    function handleMouseDown(e) {
      if (e.type === 'mousedown') {
        // Prevent text selection while dragging
        e.preventDefault();
      }
      if (props.disabled) return;
      handleMouseMove(e);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    function handleMouseMove(e) {
      if (props.disabled || !canvasRef.value) return;
      isInteracting.value = true;
      const coords = getEventCoordinates(e);
      updateDotPosition(coords.clientX, coords.clientY, canvasRef.value.getBoundingClientRect());
    }
    function handleMouseUp() {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    function updateCanvas() {
      if (!canvasRef.value) return;
      const canvas = canvasRef.value;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      saturationGradient.addColorStop(0, 'hsla(0, 0%, 100%, 1)'); // white
      saturationGradient.addColorStop(1, `hsla(${props.color?.h ?? 0}, 100%, 50%, 1)`);
      ctx.fillStyle = saturationGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      valueGradient.addColorStop(0, 'hsla(0, 0%, 0%, 0)'); // transparent
      valueGradient.addColorStop(1, 'hsla(0, 0%, 0%, 1)'); // black
      ctx.fillStyle = valueGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    watch(() => props.color?.h, updateCanvas, {
      immediate: true
    });
    watch(() => [canvasWidth.value, canvasHeight.value], (newVal, oldVal) => {
      updateCanvas();
      _dotPosition.value = {
        x: dotPosition.value.x * newVal[0] / oldVal[0],
        y: dotPosition.value.y * newVal[1] / oldVal[1]
      };
    }, {
      flush: 'post'
    });
    watch(() => props.color, () => {
      if (isInteracting.value) {
        isInteracting.value = false;
        return;
      }
      _dotPosition.value = props.color ? {
        x: props.color.s * canvasWidth.value,
        y: (1 - props.color.v) * canvasHeight.value
      } : {
        x: 0,
        y: 0
      };
    }, {
      deep: true,
      immediate: true
    });
    onMounted(() => updateCanvas());
    useRender(() => createElementVNode("div", {
      "ref": resizeRef,
      "class": normalizeClass(['v-color-picker-canvas', props.class]),
      "style": normalizeStyle(props.style),
      "onMousedown": handleMouseDown,
      "onTouchstartPassive": handleMouseDown
    }, [createElementVNode("canvas", {
      "ref": canvasRef,
      "width": canvasWidth.value,
      "height": canvasHeight.value
    }, null), props.color && createElementVNode("div", {
      "class": normalizeClass(['v-color-picker-canvas__dot', {
        'v-color-picker-canvas__dot--disabled': props.disabled
      }]),
      "style": normalizeStyle(dotStyles.value)
    }, null)]));
    return {};
  }
});

// Utilities

// Types

function stripAlpha(color, stripAlpha) {
  if (stripAlpha) {
    const {
      a,
      ...rest
    } = color;
    return rest;
  }
  return color;
}
function extractColor(color, input) {
  if (input == null || typeof input === 'string') {
    const hasA = color.a !== 1;
    if (input?.startsWith('rgb(')) {
      const {
        r,
        g,
        b,
        a
      } = HSVtoRGB(color);
      return `rgb(${r} ${g} ${b}` + (hasA ? ` / ${a})` : ')');
    } else if (input?.startsWith('hsl(')) {
      const {
        h,
        s,
        l,
        a
      } = HSVtoHSL(color);
      return `hsl(${h} ${Math.round(s * 100)} ${Math.round(l * 100)}` + (hasA ? ` / ${a})` : ')');
    }
    const hex = HSVtoHex(color);
    if (color.a === 1) return hex.slice(0, 7);else return hex;
  }
  if (typeof input === 'object') {
    let converted;
    if (has(input, ['r', 'g', 'b'])) converted = HSVtoRGB(color);else if (has(input, ['h', 's', 'l'])) converted = HSVtoHSL(color);else if (has(input, ['h', 's', 'v'])) converted = color;
    return stripAlpha(converted, !has(input, ['a']) && color.a === 1);
  }
  return color;
}
const nullColor = {
  h: 0,
  s: 0,
  v: 0,
  a: 1
};
const rgba = {
  inputProps: {
    type: 'number',
    min: 0
  },
  inputs: [{
    label: 'R',
    max: 255,
    step: 1,
    getValue: c => Math.round(c.r),
    getColor: (c, v) => ({
      ...c,
      r: Number(v)
    }),
    localeKey: 'redInput'
  }, {
    label: 'G',
    max: 255,
    step: 1,
    getValue: c => Math.round(c.g),
    getColor: (c, v) => ({
      ...c,
      g: Number(v)
    }),
    localeKey: 'greenInput'
  }, {
    label: 'B',
    max: 255,
    step: 1,
    getValue: c => Math.round(c.b),
    getColor: (c, v) => ({
      ...c,
      b: Number(v)
    }),
    localeKey: 'blueInput'
  }, {
    label: 'A',
    max: 1,
    step: 0.01,
    getValue: _ref => {
      let {
        a
      } = _ref;
      return a != null ? Math.round(a * 100) / 100 : 1;
    },
    getColor: (c, v) => ({
      ...c,
      a: Number(v)
    }),
    localeKey: 'alphaInput'
  }],
  to: HSVtoRGB,
  from: RGBtoHSV
};
const rgb = {
  ...rgba,
  inputs: rgba.inputs?.slice(0, 3)
};
const hsla = {
  inputProps: {
    type: 'number',
    min: 0
  },
  inputs: [{
    label: 'H',
    max: 360,
    step: 1,
    getValue: c => Math.round(c.h),
    getColor: (c, v) => ({
      ...c,
      h: Number(v)
    }),
    localeKey: 'hueInput'
  }, {
    label: 'S',
    max: 1,
    step: 0.01,
    getValue: c => Math.round(c.s * 100) / 100,
    getColor: (c, v) => ({
      ...c,
      s: Number(v)
    }),
    localeKey: 'saturationInput'
  }, {
    label: 'L',
    max: 1,
    step: 0.01,
    getValue: c => Math.round(c.l * 100) / 100,
    getColor: (c, v) => ({
      ...c,
      l: Number(v)
    }),
    localeKey: 'lightnessInput'
  }, {
    label: 'A',
    max: 1,
    step: 0.01,
    getValue: _ref2 => {
      let {
        a
      } = _ref2;
      return a != null ? Math.round(a * 100) / 100 : 1;
    },
    getColor: (c, v) => ({
      ...c,
      a: Number(v)
    }),
    localeKey: 'alphaInput'
  }],
  to: HSVtoHSL,
  from: HSLtoHSV
};
const hsl = {
  ...hsla,
  inputs: hsla.inputs.slice(0, 3)
};
const hexa = {
  inputProps: {
    type: 'text'
  },
  inputs: [{
    label: 'HEXA',
    getValue: c => c,
    getColor: (c, v) => v,
    localeKey: 'hexaInput'
  }],
  to: HSVtoHex,
  from: HexToHSV
};
const hex = {
  ...hexa,
  inputs: [{
    label: 'HEX',
    getValue: c => c.slice(0, 7),
    getColor: (c, v) => v,
    localeKey: 'hexInput'
  }]
};
const modes = {
  rgb,
  rgba,
  hsl,
  hsla,
  hex,
  hexa
};

// Types

const VColorPickerInput = _ref => {
  let {
    label,
    ...rest
  } = _ref;
  return createElementVNode("div", {
    "class": "v-color-picker-edit__input"
  }, [createElementVNode("input", normalizeProps(guardReactiveProps(rest)), null), createElementVNode("span", null, [label])]);
};
const makeVColorPickerEditProps = propsFactory({
  color: Object,
  disabled: Boolean,
  mode: {
    type: String,
    default: 'rgba',
    validator: v => Object.keys(modes).includes(v)
  },
  modes: {
    type: Array,
    default: () => Object.keys(modes),
    validator: v => Array.isArray(v) && v.every(m => Object.keys(modes).includes(m))
  },
  ...makeComponentProps()
}, 'VColorPickerEdit');
const VColorPickerEdit = defineComponent({
  name: 'VColorPickerEdit',
  props: makeVColorPickerEditProps(),
  emits: {
    'update:color': color => true,
    'update:mode': mode => true
  },
  setup(props, _ref2) {
    let {
      emit
    } = _ref2;
    const {
      t
    } = useLocale();
    const enabledModes = computed(() => {
      return props.modes.map(key => ({
        ...modes[key],
        name: key
      }));
    });
    const inputs = computed(() => {
      const mode = enabledModes.value.find(m => m.name === props.mode);
      if (!mode) return [];
      const color = props.color ? mode.to(props.color) : null;
      return mode.inputs?.map(_ref3 => {
        let {
          getValue,
          getColor,
          localeKey,
          ...inputProps
        } = _ref3;
        return {
          ...mode.inputProps,
          ...inputProps,
          ariaLabel: t(`$vuetify.colorPicker.ariaLabel.${localeKey}`),
          disabled: props.disabled,
          value: color && getValue(color),
          onChange: e => {
            const target = e.target;
            if (!target) return;
            emit('update:color', mode.from(getColor(color ?? mode.to(nullColor), target.value)));
          }
        };
      });
    });
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(['v-color-picker-edit', props.class]),
      "style": normalizeStyle(props.style)
    }, [inputs.value?.map(props => createVNode(VColorPickerInput, props, null)), enabledModes.value.length > 1 && createVNode(VBtn, {
      "icon": "$unfold",
      "size": "x-small",
      "variant": "plain",
      "aria-label": t('$vuetify.colorPicker.ariaLabel.changeFormat'),
      "onClick": () => {
        const mi = enabledModes.value.findIndex(m => m.name === props.mode);
        emit('update:mode', enabledModes.value[(mi + 1) % enabledModes.value.length].name);
      }
    }, null)]));
    return {};
  }
});

/* eslint-disable max-statements */
// Composables

// Types

const VSliderSymbol = Symbol.for('vuetify:v-slider');
function getOffset(e, el, direction) {
  const vertical = direction === 'vertical';
  const rect = el.getBoundingClientRect();
  const touch = 'touches' in e ? e.touches[0] : e;
  return vertical ? touch.clientY - (rect.top + rect.height / 2) : touch.clientX - (rect.left + rect.width / 2);
}
function getPosition(e, position) {
  if ('touches' in e && e.touches.length) return e.touches[0][position];else if ('changedTouches' in e && e.changedTouches.length) return e.changedTouches[0][position];else return e[position];
}
const makeSliderProps = propsFactory({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  readonly: {
    type: Boolean,
    default: null
  },
  max: {
    type: [Number, String],
    default: 100
  },
  min: {
    type: [Number, String],
    default: 0
  },
  step: {
    type: [Number, String],
    default: 0
  },
  thumbColor: String,
  thumbLabel: {
    type: [Boolean, String],
    default: undefined,
    validator: v => typeof v === 'boolean' || v === 'always'
  },
  thumbSize: {
    type: [Number, String],
    default: 20
  },
  showTicks: {
    type: [Boolean, String],
    default: false,
    validator: v => typeof v === 'boolean' || v === 'always'
  },
  ticks: {
    type: [Array, Object]
  },
  tickSize: {
    type: [Number, String],
    default: 2
  },
  color: String,
  trackColor: String,
  trackFillColor: String,
  trackSize: {
    type: [Number, String],
    default: 4
  },
  direction: {
    type: String,
    default: 'horizontal',
    validator: v => ['vertical', 'horizontal'].includes(v)
  },
  reverse: Boolean,
  noKeyboard: Boolean,
  ...makeRoundedProps(),
  ...makeElevationProps({
    elevation: 2
  }),
  ripple: {
    type: Boolean,
    default: true
  }
}, 'Slider');
const useSteps = props => {
  const min = computed(() => parseFloat(props.min));
  const max = computed(() => parseFloat(props.max));
  const step = computed(() => Number(props.step) > 0 ? parseFloat(props.step) : 0);
  const decimals = computed(() => Math.max(getDecimals(step.value), getDecimals(min.value)));
  function roundValue(value) {
    value = parseFloat(value);
    if (step.value <= 0) return value;
    const clamped = clamp(value, min.value, max.value);
    const offset = min.value % step.value;
    let newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
    if (clamped > newValue && newValue + step.value > max.value) {
      newValue = max.value;
    }
    return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value));
  }
  return {
    min,
    max,
    step,
    decimals,
    roundValue
  };
};
const useSlider = _ref => {
  let {
    props,
    steps,
    onSliderStart,
    onSliderMove,
    onSliderEnd,
    getActiveThumb
  } = _ref;
  const {
    isRtl
  } = useRtl();
  const isReversed = toRef(() => props.reverse);
  const vertical = computed(() => props.direction === 'vertical');
  const indexFromEnd = computed(() => vertical.value !== isReversed.value);
  const {
    min,
    max,
    step,
    decimals,
    roundValue
  } = steps;
  const thumbSize = computed(() => parseInt(props.thumbSize, 10));
  const tickSize = computed(() => parseInt(props.tickSize, 10));
  const trackSize = computed(() => parseInt(props.trackSize, 10));
  const numTicks = computed(() => (max.value - min.value) / step.value);
  const disabled = toRef(() => props.disabled);
  const thumbColor = computed(() => props.error || props.disabled ? undefined : props.thumbColor ?? props.color);
  const thumbLabelColor = computed(() => props.error || props.disabled ? undefined : props.thumbColor);
  const trackColor = computed(() => props.error || props.disabled ? undefined : props.trackColor ?? props.color);
  const trackFillColor = computed(() => props.error || props.disabled ? undefined : props.trackFillColor ?? props.color);
  const mousePressed = shallowRef(false);
  const startOffset = shallowRef(0);
  const trackContainerRef = ref();
  const activeThumbRef = ref();
  function parseMouseMove(e) {
    const el = trackContainerRef.value?.$el;
    if (!el) return;
    const vertical = props.direction === 'vertical';
    const start = vertical ? 'top' : 'left';
    const length = vertical ? 'height' : 'width';
    const position = vertical ? 'clientY' : 'clientX';
    const {
      [start]: trackStart,
      [length]: trackLength
    } = el.getBoundingClientRect();
    const clickOffset = getPosition(e, position);

    // It is possible for left to be NaN, force to number
    let clickPos = clamp((clickOffset - trackStart - startOffset.value) / trackLength) || 0;
    if (vertical ? indexFromEnd.value : indexFromEnd.value !== isRtl.value) clickPos = 1 - clickPos;
    return roundValue(min.value + clickPos * (max.value - min.value));
  }
  const handleStop = e => {
    const value = parseMouseMove(e);
    if (value != null) {
      onSliderEnd({
        value
      });
    }
    mousePressed.value = false;
    startOffset.value = 0;
  };
  const handleStart = e => {
    const value = parseMouseMove(e);
    activeThumbRef.value = getActiveThumb(e);
    if (!activeThumbRef.value) return;
    mousePressed.value = true;
    if (activeThumbRef.value.contains(e.target)) {
      startOffset.value = getOffset(e, activeThumbRef.value, props.direction);
    } else {
      startOffset.value = 0;
      if (value != null) {
        onSliderMove({
          value
        });
      }
    }
    if (value != null) {
      onSliderStart({
        value
      });
    }
    nextTick(() => activeThumbRef.value?.focus());
  };
  const moveListenerOptions = {
    passive: true,
    capture: true
  };
  function onMouseMove(e) {
    const value = parseMouseMove(e);
    if (value != null) {
      onSliderMove({
        value
      });
    }
  }
  function onSliderMouseUp(e) {
    e.stopPropagation();
    e.preventDefault();
    handleStop(e);
    window.removeEventListener('mousemove', onMouseMove, moveListenerOptions);
    window.removeEventListener('mouseup', onSliderMouseUp);
  }
  function onSliderTouchend(e) {
    handleStop(e);
    window.removeEventListener('touchmove', onMouseMove, moveListenerOptions);
    e.target?.removeEventListener('touchend', onSliderTouchend);
  }
  function onSliderTouchstart(e) {
    handleStart(e);
    window.addEventListener('touchmove', onMouseMove, moveListenerOptions);
    e.target?.addEventListener('touchend', onSliderTouchend, {
      passive: false
    });
  }
  function onSliderMousedown(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    handleStart(e);
    window.addEventListener('mousemove', onMouseMove, moveListenerOptions);
    window.addEventListener('mouseup', onSliderMouseUp, {
      passive: false
    });
  }
  const position = val => {
    const percentage = (val - min.value) / (max.value - min.value) * 100;
    return clamp(isNaN(percentage) ? 0 : percentage, 0, 100);
  };
  const showTicks = toRef(() => props.showTicks);
  const parsedTicks = computed(() => {
    if (!showTicks.value) return [];
    if (!props.ticks) {
      return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map(t => {
        const value = min.value + t * step.value;
        return {
          value,
          position: position(value)
        };
      }) : [];
    }
    if (Array.isArray(props.ticks)) return props.ticks.map(t => ({
      value: t,
      position: position(t),
      label: t.toString()
    }));
    return Object.keys(props.ticks).map(key => ({
      value: parseFloat(key),
      position: position(parseFloat(key)),
      label: props.ticks[key]
    }));
  });
  const hasLabels = computed(() => parsedTicks.value.some(_ref2 => {
    let {
      label
    } = _ref2;
    return !!label;
  }));
  const data = {
    activeThumbRef,
    color: toRef(() => props.color),
    decimals,
    disabled,
    direction: toRef(() => props.direction),
    elevation: toRef(() => props.elevation),
    hasLabels,
    isReversed,
    indexFromEnd,
    min,
    max,
    mousePressed,
    noKeyboard: toRef(() => props.noKeyboard),
    numTicks,
    onSliderMousedown,
    onSliderTouchstart,
    parsedTicks,
    parseMouseMove,
    position,
    readonly: toRef(() => props.readonly),
    rounded: toRef(() => props.rounded),
    roundValue,
    showTicks,
    startOffset,
    step,
    thumbSize,
    thumbColor,
    thumbLabelColor,
    thumbLabel: toRef(() => props.thumbLabel),
    ticks: toRef(() => props.ticks),
    tickSize,
    trackColor,
    trackContainerRef,
    trackFillColor,
    trackSize,
    vertical
  };
  provide(VSliderSymbol, data);
  return data;
};

// Types

const makeVSliderThumbProps = propsFactory({
  focused: Boolean,
  max: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Number,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  name: String,
  noKeyboard: Boolean,
  ...makeComponentProps()
}, 'VSliderThumb');
const VSliderThumb = genericComponent()({
  name: 'VSliderThumb',
  directives: {
    vRipple: Ripple
  },
  props: makeVSliderThumbProps(),
  emits: {
    'update:modelValue': v => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const slider = inject$1(VSliderSymbol);
    const {
      isRtl,
      rtlClasses
    } = useRtl();
    if (!slider) throw new Error('[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider');
    const {
      min,
      max,
      thumbColor,
      thumbLabelColor,
      step,
      disabled,
      thumbSize,
      thumbLabel,
      direction,
      isReversed,
      vertical,
      readonly,
      elevation,
      mousePressed,
      decimals,
      indexFromEnd
    } = slider;
    const elevationProps = computed(() => !disabled.value ? elevation.value : undefined);
    const {
      elevationClasses
    } = useElevation(elevationProps);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(thumbColor);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(thumbLabelColor);
    const {
      pageup,
      pagedown,
      end,
      home,
      left,
      right,
      down,
      up
    } = keyValues;
    const relevantKeys = [pageup, pagedown, end, home, left, right, down, up];
    const multipliers = computed(() => {
      if (step.value) return [1, 2, 3];else return [1, 5, 10];
    });
    function parseKeydown(e, value) {
      if (props.noKeyboard) return;
      if (!relevantKeys.includes(e.key)) return;
      e.preventDefault();
      const _step = step.value || 0.1;
      const steps = (max.value - min.value) / _step;
      if ([left, right, down, up].includes(e.key)) {
        const increase = vertical.value ? [isRtl.value ? left : right, isReversed.value ? down : up] : indexFromEnd.value !== isRtl.value ? [left, up] : [right, up];
        const direction = increase.includes(e.key) ? 1 : -1;
        const multiplier = e.shiftKey ? 2 : e.ctrlKey ? 1 : 0;
        if (direction === -1 && value === max.value && !multiplier && !Number.isInteger(steps)) {
          value = value - steps % 1 * _step;
        } else {
          value = value + direction * _step * multipliers.value[multiplier];
        }
      } else if (e.key === home) {
        value = min.value;
      } else if (e.key === end) {
        value = max.value;
      } else {
        const direction = e.key === pagedown ? 1 : -1;
        value = value - direction * _step * (steps > 100 ? steps / 10 : 10);
      }
      return Math.max(props.min, Math.min(props.max, value));
    }
    function onKeydown(e) {
      const newValue = parseKeydown(e, props.modelValue);
      newValue != null && emit('update:modelValue', newValue);
    }
    useRender(() => {
      const positionPercentage = convertToUnit(indexFromEnd.value ? 100 - props.position : props.position, '%');
      return createElementVNode("div", {
        "class": normalizeClass(['v-slider-thumb', {
          'v-slider-thumb--focused': props.focused,
          'v-slider-thumb--pressed': props.focused && mousePressed.value
        }, props.class, rtlClasses.value]),
        "style": normalizeStyle([{
          '--v-slider-thumb-position': positionPercentage,
          '--v-slider-thumb-size': convertToUnit(thumbSize.value)
        }, props.style]),
        "role": "slider",
        "tabindex": disabled.value ? -1 : 0,
        "aria-label": props.name,
        "aria-valuemin": min.value,
        "aria-valuemax": max.value,
        "aria-valuenow": props.modelValue,
        "aria-readonly": !!readonly.value,
        "aria-orientation": direction.value,
        "onKeydown": !readonly.value ? onKeydown : undefined
      }, [createElementVNode("div", {
        "class": normalizeClass(['v-slider-thumb__surface', textColorClasses.value, elevationClasses.value]),
        "style": normalizeStyle(textColorStyles.value)
      }, null), withDirectives(createElementVNode("div", {
        "class": normalizeClass(['v-slider-thumb__ripple', textColorClasses.value]),
        "style": normalizeStyle(textColorStyles.value)
      }, null), [[Ripple, props.ripple, null, {
        circle: true,
        center: true
      }]]), createVNode(VScaleTransition, {
        "origin": "bottom center"
      }, {
        default: () => [withDirectives(createElementVNode("div", {
          "class": "v-slider-thumb__label-container"
        }, [createElementVNode("div", {
          "class": normalizeClass(['v-slider-thumb__label', backgroundColorClasses.value]),
          "style": normalizeStyle(backgroundColorStyles.value)
        }, [createElementVNode("div", null, [slots['thumb-label']?.({
          modelValue: props.modelValue
        }) ?? props.modelValue.toFixed(step.value ? decimals.value : 1)]), createElementVNode("div", {
          "class": "v-slider-thumb__label-wedge"
        }, null)])]), [[vShow, thumbLabel.value && props.focused || thumbLabel.value === 'always']])]
      })]);
    });
    return {};
  }
});

// Types

const makeVSliderTrackProps = propsFactory({
  start: {
    type: Number,
    required: true
  },
  stop: {
    type: Number,
    required: true
  },
  ...makeComponentProps()
}, 'VSliderTrack');
const VSliderTrack = genericComponent()({
  name: 'VSliderTrack',
  props: makeVSliderTrackProps(),
  emits: {},
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slider = inject$1(VSliderSymbol);
    if (!slider) throw new Error('[Vuetify] v-slider-track must be inside v-slider or v-range-slider');
    const {
      color,
      parsedTicks,
      rounded,
      showTicks,
      tickSize,
      trackColor,
      trackFillColor,
      trackSize,
      vertical,
      min,
      max,
      indexFromEnd
    } = slider;
    const {
      roundedClasses
    } = useRounded(rounded);
    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles
    } = useBackgroundColor(trackFillColor);
    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles
    } = useBackgroundColor(trackColor);
    const startDir = computed(() => `inset-${vertical.value ? 'block' : 'inline'}-${indexFromEnd.value ? 'end' : 'start'}`);
    const endDir = computed(() => vertical.value ? 'height' : 'width');
    const backgroundStyles = computed(() => {
      return {
        [startDir.value]: '0%',
        [endDir.value]: '100%'
      };
    });
    const trackFillWidth = computed(() => props.stop - props.start);
    const trackFillStyles = computed(() => {
      return {
        [startDir.value]: convertToUnit(props.start, '%'),
        [endDir.value]: convertToUnit(trackFillWidth.value, '%')
      };
    });
    const computedTicks = computed(() => {
      if (!showTicks.value) return [];
      const ticks = vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
      return ticks.map((tick, index) => {
        const directionValue = tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, '%') : undefined;
        return createElementVNode("div", {
          "key": tick.value,
          "class": normalizeClass(['v-slider-track__tick', {
            'v-slider-track__tick--filled': tick.position >= props.start && tick.position <= props.stop,
            'v-slider-track__tick--first': tick.value === min.value,
            'v-slider-track__tick--last': tick.value === max.value
          }]),
          "style": {
            [startDir.value]: directionValue
          }
        }, [(tick.label || slots['tick-label']) && createElementVNode("div", {
          "class": "v-slider-track__tick-label"
        }, [slots['tick-label']?.({
          tick,
          index
        }) ?? tick.label])]);
      });
    });
    useRender(() => {
      return createElementVNode("div", {
        "class": normalizeClass(['v-slider-track', roundedClasses.value, props.class]),
        "style": normalizeStyle([{
          '--v-slider-track-size': convertToUnit(trackSize.value),
          '--v-slider-tick-size': convertToUnit(tickSize.value)
        }, props.style])
      }, [createElementVNode("div", {
        "class": normalizeClass(['v-slider-track__background', trackColorClasses.value, {
          'v-slider-track__background--opacity': !!color.value || !trackFillColor.value
        }]),
        "style": {
          ...backgroundStyles.value,
          ...trackColorStyles.value
        }
      }, null), createElementVNode("div", {
        "class": normalizeClass(['v-slider-track__fill', trackFillColorClasses.value]),
        "style": {
          ...trackFillStyles.value,
          ...trackFillColorStyles.value
        }
      }, null), showTicks.value && createElementVNode("div", {
        "class": normalizeClass(['v-slider-track__ticks', {
          'v-slider-track__ticks--always-show': showTicks.value === 'always'
        }])
      }, [computedTicks.value])]);
    });
    return {};
  }
});

// Types

const makeVSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeSliderProps(),
  ...makeVInputProps(),
  modelValue: {
    type: [Number, String],
    default: 0
  }
}, 'VSlider');
const VSlider = genericComponent()({
  name: 'VSlider',
  props: makeVSliderProps(),
  emits: {
    'update:focused': value => true,
    'update:modelValue': v => true,
    start: value => true,
    end: value => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const thumbContainerRef = ref();
    const inputRef = ref();
    const {
      rtlClasses
    } = useRtl();
    const steps = useSteps(props);
    const model = useProxiedModel(props, 'modelValue', undefined, value => {
      return steps.roundValue(value == null ? steps.min.value : value);
    });
    const {
      min,
      max,
      mousePressed,
      roundValue,
      onSliderMousedown,
      onSliderTouchstart,
      trackContainerRef,
      position,
      hasLabels,
      readonly,
      noKeyboard
    } = useSlider({
      props,
      steps,
      onSliderStart: () => {
        emit('start', model.value);
      },
      onSliderEnd: _ref2 => {
        let {
          value
        } = _ref2;
        const roundedValue = roundValue(value);
        model.value = roundedValue;
        emit('end', roundedValue);
      },
      onSliderMove: _ref3 => {
        let {
          value
        } = _ref3;
        return model.value = roundValue(value);
      },
      getActiveThumb: () => thumbContainerRef.value?.$el
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStop = computed(() => position(model.value));
    useRender(() => {
      const inputProps = VInput.filterProps(props);
      const hasPrepend = !!(props.label || slots.label || slots.prepend);
      return createVNode(VInput, mergeProps({
        "ref": inputRef,
        "class": ['v-slider', {
          'v-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
          'v-slider--focused': isFocused.value,
          'v-slider--pressed': mousePressed.value,
          'v-slider--disabled': props.disabled
        }, rtlClasses.value, props.class],
        "style": props.style
      }, inputProps, {
        "focused": isFocused.value
      }), {
        ...slots,
        prepend: hasPrepend ? slotProps => createElementVNode(Fragment, null, [slots.label?.(slotProps) ?? (props.label ? createVNode(VLabel, {
          "id": slotProps.id.value,
          "class": "v-slider__label",
          "text": props.label
        }, null) : undefined), slots.prepend?.(slotProps)]) : undefined,
        default: _ref4 => {
          let {
            id,
            messagesId
          } = _ref4;
          return createElementVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly.value ? onSliderMousedown : undefined,
            "onTouchstartPassive": !readonly.value ? onSliderTouchstart : undefined
          }, [createElementVNode("input", {
            "id": id.value,
            "name": props.name || id.value,
            "disabled": !!props.disabled,
            "readonly": !!props.readonly,
            "tabindex": "-1",
            "value": model.value
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": 0,
            "stop": trackStop.value
          }, {
            'tick-label': slots['tick-label']
          }), createVNode(VSliderThumb, {
            "ref": thumbContainerRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused.value,
            "noKeyboard": noKeyboard.value,
            "min": min.value,
            "max": max.value,
            "modelValue": model.value,
            "onUpdate:modelValue": v => model.value = v,
            "position": trackStop.value,
            "elevation": props.elevation,
            "onFocus": focus,
            "onBlur": blur,
            "ripple": props.ripple,
            "name": props.name
          }, {
            'thumb-label': slots['thumb-label']
          })]);
        }
      });
    });
    return forwardRefs({
      focus: () => thumbContainerRef.value?.$el.focus()
    }, inputRef);
  }
});

// Types

const makeVColorPickerPreviewProps = propsFactory({
  color: {
    type: Object
  },
  disabled: Boolean,
  hideAlpha: Boolean,
  hideEyeDropper: Boolean,
  eyeDropperIcon: {
    type: IconValue,
    default: '$eyeDropper'
  },
  ...makeComponentProps()
}, 'VColorPickerPreview');
const VColorPickerPreview = defineComponent({
  name: 'VColorPickerPreview',
  props: makeVColorPickerPreviewProps(),
  emits: {
    'update:color': color => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const {
      t
    } = useLocale();
    const abortController = new AbortController();
    onUnmounted(() => abortController.abort());
    async function openEyeDropper() {
      if (!SUPPORTS_EYE_DROPPER || props.disabled) return;
      const eyeDropper = new window.EyeDropper();
      try {
        const result = await eyeDropper.open({
          signal: abortController.signal
        });
        const colorHexValue = RGBtoHSV(parseColor(result.sRGBHex));
        emit('update:color', {
          ...(props.color ?? nullColor),
          ...colorHexValue
        });
      } catch (e) {}
    }
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(['v-color-picker-preview', {
        'v-color-picker-preview--hide-alpha': props.hideAlpha
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, [SUPPORTS_EYE_DROPPER && !props.hideEyeDropper && createElementVNode("div", {
      "class": "v-color-picker-preview__eye-dropper",
      "key": "eyeDropper"
    }, [createVNode(VBtn, {
      "aria-label": t('$vuetify.colorPicker.ariaLabel.eyedropper'),
      "density": "comfortable",
      "disabled": props.disabled,
      "icon": props.eyeDropperIcon,
      "variant": "plain",
      "onClick": openEyeDropper
    }, null)]), createElementVNode("div", {
      "class": "v-color-picker-preview__dot"
    }, [createElementVNode("div", {
      "style": {
        background: HSVtoCSS(props.color ?? nullColor)
      }
    }, null)]), createElementVNode("div", {
      "class": "v-color-picker-preview__sliders"
    }, [createVNode(VSlider, {
      "class": "v-color-picker-preview__track v-color-picker-preview__hue",
      "name": t('$vuetify.colorPicker.ariaLabel.hueSlider'),
      "modelValue": props.color?.h,
      "onUpdate:modelValue": h => emit('update:color', {
        ...(props.color ?? nullColor),
        h
      }),
      "step": 0,
      "min": 0,
      "max": 360,
      "disabled": props.disabled,
      "thumbSize": 14,
      "trackSize": 8,
      "trackFillColor": "white",
      "hideDetails": true
    }, null), !props.hideAlpha && createVNode(VSlider, {
      "class": "v-color-picker-preview__track v-color-picker-preview__alpha",
      "name": t('$vuetify.colorPicker.ariaLabel.alphaSlider'),
      "modelValue": props.color?.a ?? 1,
      "onUpdate:modelValue": a => emit('update:color', {
        ...(props.color ?? nullColor),
        a
      }),
      "step": 1 / 256,
      "min": 0,
      "max": 1,
      "disabled": props.disabled,
      "thumbSize": 14,
      "trackSize": 8,
      "trackFillColor": "white",
      "hideDetails": true
    }, null)])]));
    return {};
  }
});

const red = {
  base: '#f44336',
  lighten5: '#ffebee',
  lighten4: '#ffcdd2',
  lighten3: '#ef9a9a',
  lighten2: '#e57373',
  lighten1: '#ef5350',
  darken1: '#e53935',
  darken2: '#d32f2f',
  darken3: '#c62828',
  darken4: '#b71c1c',
  accent1: '#ff8a80',
  accent2: '#ff5252',
  accent3: '#ff1744',
  accent4: '#d50000'
};
const pink = {
  base: '#e91e63',
  lighten5: '#fce4ec',
  lighten4: '#f8bbd0',
  lighten3: '#f48fb1',
  lighten2: '#f06292',
  lighten1: '#ec407a',
  darken1: '#d81b60',
  darken2: '#c2185b',
  darken3: '#ad1457',
  darken4: '#880e4f',
  accent1: '#ff80ab',
  accent2: '#ff4081',
  accent3: '#f50057',
  accent4: '#c51162'
};
const purple = {
  base: '#9c27b0',
  lighten5: '#f3e5f5',
  lighten4: '#e1bee7',
  lighten3: '#ce93d8',
  lighten2: '#ba68c8',
  lighten1: '#ab47bc',
  darken1: '#8e24aa',
  darken2: '#7b1fa2',
  darken3: '#6a1b9a',
  darken4: '#4a148c',
  accent1: '#ea80fc',
  accent2: '#e040fb',
  accent3: '#d500f9',
  accent4: '#aa00ff'
};
const deepPurple = {
  base: '#673ab7',
  lighten5: '#ede7f6',
  lighten4: '#d1c4e9',
  lighten3: '#b39ddb',
  lighten2: '#9575cd',
  lighten1: '#7e57c2',
  darken1: '#5e35b1',
  darken2: '#512da8',
  darken3: '#4527a0',
  darken4: '#311b92',
  accent1: '#b388ff',
  accent2: '#7c4dff',
  accent3: '#651fff',
  accent4: '#6200ea'
};
const indigo = {
  base: '#3f51b5',
  lighten5: '#e8eaf6',
  lighten4: '#c5cae9',
  lighten3: '#9fa8da',
  lighten2: '#7986cb',
  lighten1: '#5c6bc0',
  darken1: '#3949ab',
  darken2: '#303f9f',
  darken3: '#283593',
  darken4: '#1a237e',
  accent1: '#8c9eff',
  accent2: '#536dfe',
  accent3: '#3d5afe',
  accent4: '#304ffe'
};
const blue = {
  base: '#2196f3',
  lighten5: '#e3f2fd',
  lighten4: '#bbdefb',
  lighten3: '#90caf9',
  lighten2: '#64b5f6',
  lighten1: '#42a5f5',
  darken1: '#1e88e5',
  darken2: '#1976d2',
  darken3: '#1565c0',
  darken4: '#0d47a1',
  accent1: '#82b1ff',
  accent2: '#448aff',
  accent3: '#2979ff',
  accent4: '#2962ff'
};
const lightBlue = {
  base: '#03a9f4',
  lighten5: '#e1f5fe',
  lighten4: '#b3e5fc',
  lighten3: '#81d4fa',
  lighten2: '#4fc3f7',
  lighten1: '#29b6f6',
  darken1: '#039be5',
  darken2: '#0288d1',
  darken3: '#0277bd',
  darken4: '#01579b',
  accent1: '#80d8ff',
  accent2: '#40c4ff',
  accent3: '#00b0ff',
  accent4: '#0091ea'
};
const cyan = {
  base: '#00bcd4',
  lighten5: '#e0f7fa',
  lighten4: '#b2ebf2',
  lighten3: '#80deea',
  lighten2: '#4dd0e1',
  lighten1: '#26c6da',
  darken1: '#00acc1',
  darken2: '#0097a7',
  darken3: '#00838f',
  darken4: '#006064',
  accent1: '#84ffff',
  accent2: '#18ffff',
  accent3: '#00e5ff',
  accent4: '#00b8d4'
};
const teal = {
  base: '#009688',
  lighten5: '#e0f2f1',
  lighten4: '#b2dfdb',
  lighten3: '#80cbc4',
  lighten2: '#4db6ac',
  lighten1: '#26a69a',
  darken1: '#00897b',
  darken2: '#00796b',
  darken3: '#00695c',
  darken4: '#004d40',
  accent1: '#a7ffeb',
  accent2: '#64ffda',
  accent3: '#1de9b6',
  accent4: '#00bfa5'
};
const green = {
  base: '#4caf50',
  lighten5: '#e8f5e9',
  lighten4: '#c8e6c9',
  lighten3: '#a5d6a7',
  lighten2: '#81c784',
  lighten1: '#66bb6a',
  darken1: '#43a047',
  darken2: '#388e3c',
  darken3: '#2e7d32',
  darken4: '#1b5e20',
  accent1: '#b9f6ca',
  accent2: '#69f0ae',
  accent3: '#00e676',
  accent4: '#00c853'
};
const lightGreen = {
  base: '#8bc34a',
  lighten5: '#f1f8e9',
  lighten4: '#dcedc8',
  lighten3: '#c5e1a5',
  lighten2: '#aed581',
  lighten1: '#9ccc65',
  darken1: '#7cb342',
  darken2: '#689f38',
  darken3: '#558b2f',
  darken4: '#33691e',
  accent1: '#ccff90',
  accent2: '#b2ff59',
  accent3: '#76ff03',
  accent4: '#64dd17'
};
const lime = {
  base: '#cddc39',
  lighten5: '#f9fbe7',
  lighten4: '#f0f4c3',
  lighten3: '#e6ee9c',
  lighten2: '#dce775',
  lighten1: '#d4e157',
  darken1: '#c0ca33',
  darken2: '#afb42b',
  darken3: '#9e9d24',
  darken4: '#827717',
  accent1: '#f4ff81',
  accent2: '#eeff41',
  accent3: '#c6ff00',
  accent4: '#aeea00'
};
const yellow = {
  base: '#ffeb3b',
  lighten5: '#fffde7',
  lighten4: '#fff9c4',
  lighten3: '#fff59d',
  lighten2: '#fff176',
  lighten1: '#ffee58',
  darken1: '#fdd835',
  darken2: '#fbc02d',
  darken3: '#f9a825',
  darken4: '#f57f17',
  accent1: '#ffff8d',
  accent2: '#ffff00',
  accent3: '#ffea00',
  accent4: '#ffd600'
};
const amber = {
  base: '#ffc107',
  lighten5: '#fff8e1',
  lighten4: '#ffecb3',
  lighten3: '#ffe082',
  lighten2: '#ffd54f',
  lighten1: '#ffca28',
  darken1: '#ffb300',
  darken2: '#ffa000',
  darken3: '#ff8f00',
  darken4: '#ff6f00',
  accent1: '#ffe57f',
  accent2: '#ffd740',
  accent3: '#ffc400',
  accent4: '#ffab00'
};
const orange = {
  base: '#ff9800',
  lighten5: '#fff3e0',
  lighten4: '#ffe0b2',
  lighten3: '#ffcc80',
  lighten2: '#ffb74d',
  lighten1: '#ffa726',
  darken1: '#fb8c00',
  darken2: '#f57c00',
  darken3: '#ef6c00',
  darken4: '#e65100',
  accent1: '#ffd180',
  accent2: '#ffab40',
  accent3: '#ff9100',
  accent4: '#ff6d00'
};
const deepOrange = {
  base: '#ff5722',
  lighten5: '#fbe9e7',
  lighten4: '#ffccbc',
  lighten3: '#ffab91',
  lighten2: '#ff8a65',
  lighten1: '#ff7043',
  darken1: '#f4511e',
  darken2: '#e64a19',
  darken3: '#d84315',
  darken4: '#bf360c',
  accent1: '#ff9e80',
  accent2: '#ff6e40',
  accent3: '#ff3d00',
  accent4: '#dd2c00'
};
const brown = {
  base: '#795548',
  lighten5: '#efebe9',
  lighten4: '#d7ccc8',
  lighten3: '#bcaaa4',
  lighten2: '#a1887f',
  lighten1: '#8d6e63',
  darken1: '#6d4c41',
  darken2: '#5d4037',
  darken3: '#4e342e',
  darken4: '#3e2723'
};
const blueGrey = {
  base: '#607d8b',
  lighten5: '#eceff1',
  lighten4: '#cfd8dc',
  lighten3: '#b0bec5',
  lighten2: '#90a4ae',
  lighten1: '#78909c',
  darken1: '#546e7a',
  darken2: '#455a64',
  darken3: '#37474f',
  darken4: '#263238'
};
const grey = {
  base: '#9e9e9e',
  lighten5: '#fafafa',
  lighten4: '#f5f5f5',
  lighten3: '#eeeeee',
  lighten2: '#e0e0e0',
  lighten1: '#bdbdbd',
  darken1: '#757575',
  darken2: '#616161',
  darken3: '#424242',
  darken4: '#212121'
};
const shades = {
  black: '#000000',
  white: '#ffffff',
  transparent: '#ffffff00'
};
var colors = {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  blueGrey,
  grey,
  shades
};

// Types

const makeVColorPickerSwatchesProps = propsFactory({
  swatches: {
    type: Array,
    default: () => parseDefaultColors(colors)
  },
  disabled: Boolean,
  color: Object,
  maxHeight: [Number, String],
  ...makeComponentProps()
}, 'VColorPickerSwatches');
function parseDefaultColors(colors) {
  return Object.keys(colors).map(key => {
    const color = colors[key];
    return color.base ? [color.base, color.darken4, color.darken3, color.darken2, color.darken1, color.lighten1, color.lighten2, color.lighten3, color.lighten4, color.lighten5] : [color.black, color.white, color.transparent];
  });
}
const VColorPickerSwatches = defineComponent({
  name: 'VColorPickerSwatches',
  props: makeVColorPickerSwatchesProps(),
  emits: {
    'update:color': color => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(['v-color-picker-swatches', props.class]),
      "style": normalizeStyle([{
        maxHeight: convertToUnit(props.maxHeight)
      }, props.style])
    }, [createElementVNode("div", null, [props.swatches.map(swatch => createElementVNode("div", {
      "class": "v-color-picker-swatches__swatch"
    }, [swatch.map(color => {
      const rgba = parseColor(color);
      const hsva = RGBtoHSV(rgba);
      const background = RGBtoCSS(rgba);
      return createElementVNode("div", {
        "class": "v-color-picker-swatches__color",
        "onClick": () => hsva && emit('update:color', hsva)
      }, [createElementVNode("div", {
        "style": {
          background
        }
      }, [props.color && deepEqual(props.color, hsva) ? createVNode(VIcon, {
        "size": "x-small",
        "icon": "$success",
        "color": getContrast(color, '#FFFFFF') > 2 ? 'white' : 'black'
      }, null) : undefined])]);
    })]))])]));
    return {};
  }
});

// Utilities
const VPickerTitle = createSimpleFunctional('v-picker-title');

const makeVSheetProps = propsFactory({
  color: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, 'VSheet');
const VSheet = genericComponent()({
  name: 'VSheet',
  props: makeVSheetProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-sheet', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, props.style])
    }, slots));
    return {};
  }
});

// Types

const makeVPickerProps = propsFactory({
  bgColor: String,
  divided: Boolean,
  landscape: Boolean,
  title: String,
  hideHeader: Boolean,
  hideTitle: Boolean,
  ...makeVSheetProps()
}, 'VPicker');
const VPicker = genericComponent()({
  name: 'VPicker',
  props: makeVPickerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    useRender(() => {
      const sheetProps = VSheet.filterProps(props);
      const hasTitle = !props.hideTitle && !!(props.title || slots.title);
      return createVNode(VSheet, mergeProps(sheetProps, {
        "color": props.bgColor,
        "class": ['v-picker', {
          'v-picker--divided': props.divided,
          'v-picker--landscape': props.landscape,
          'v-picker--with-actions': !!slots.actions
        }, props.class],
        "style": props.style
      }), {
        default: () => [!props.hideHeader && createElementVNode("div", {
          "key": "header",
          "class": normalizeClass([backgroundColorClasses.value]),
          "style": normalizeStyle([backgroundColorStyles.value])
        }, [hasTitle && createVNode(VPickerTitle, {
          "key": "picker-title"
        }, {
          default: () => [slots.title?.() ?? props.title]
        }), slots.header && createElementVNode("div", {
          "class": "v-picker__header"
        }, [slots.header()])]), createElementVNode("div", {
          "class": "v-picker__body"
        }, [slots.default?.()]), slots.actions && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              slim: true,
              variant: 'text'
            }
          }
        }, {
          default: () => [createElementVNode("div", {
            "class": "v-picker__actions"
          }, [slots.actions()])]
        })]
      });
    });
    return {};
  }
});

// Utilities

// Types

function weekInfo(locale) {
  // https://simplelocalize.io/data/locales/
  // then `new Intl.Locale(...).getWeekInfo()`
  const code = locale.slice(-2).toUpperCase();
  switch (true) {
    case locale === 'GB-alt-variant':
      {
        return {
          firstDay: 0,
          firstWeekSize: 4
        };
      }
    case locale === '001':
      {
        return {
          firstDay: 1,
          firstWeekSize: 1
        };
      }
    case `AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(code):
      {
        return {
          firstDay: 0,
          firstWeekSize: 1
        };
      }
    case `AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(code):
      {
        return {
          firstDay: 1,
          firstWeekSize: 1
        };
      }
    case `AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(code):
      {
        return {
          firstDay: 1,
          firstWeekSize: 4
        };
      }
    case `AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY`.includes(code):
      {
        return {
          firstDay: 6,
          firstWeekSize: 1
        };
      }
    case code === 'MV':
      {
        return {
          firstDay: 5,
          firstWeekSize: 1
        };
      }
    case code === 'PT':
      {
        return {
          firstDay: 0,
          firstWeekSize: 4
        };
      }
    default:
      return null;
  }
}
function getWeekArray(date, locale, firstDayOfWeek) {
  const weeks = [];
  let currentWeek = [];
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const first = firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0;
  const firstDayWeekIndex = (firstDayOfMonth.getDay() - first + 7) % 7;
  const lastDayWeekIndex = (lastDayOfMonth.getDay() - first + 7) % 7;
  for (let i = 0; i < firstDayWeekIndex; i++) {
    const adjacentDay = new Date(firstDayOfMonth);
    adjacentDay.setDate(adjacentDay.getDate() - (firstDayWeekIndex - i));
    currentWeek.push(adjacentDay);
  }
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const day = new Date(date.getFullYear(), date.getMonth(), i);

    // Add the day to the current week
    currentWeek.push(day);

    // If the current week has 7 days, add it to the weeks array and start a new week
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
    const adjacentDay = new Date(lastDayOfMonth);
    adjacentDay.setDate(adjacentDay.getDate() + i);
    currentWeek.push(adjacentDay);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  return weeks;
}
function startOfWeek(date, locale, firstDayOfWeek) {
  let day = (firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0) % 7;

  // prevent infinite loop
  if (![0, 1, 2, 3, 4, 5, 6].includes(day)) {
    consoleWarn('Invalid firstDayOfWeek, expected discrete number in range [0-6]');
    day = 0;
  }
  const d = new Date(date);
  while (d.getDay() !== day) {
    d.setDate(d.getDate() - 1);
  }
  return d;
}
function endOfWeek(date, locale) {
  const d = new Date(date);
  const lastDay = ((weekInfo(locale)?.firstDay ?? 0) + 6) % 7;
  while (d.getDay() !== lastDay) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function parseLocalDate(value) {
  const parts = value.split('-').map(Number);

  // new Date() uses local time zone when passing individual date component values
  return new Date(parts[0], parts[1] - 1, parts[2]);
}
const _YYYMMDD = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function date(value) {
  if (value == null) return new Date();
  if (value instanceof Date) return value;
  if (typeof value === 'string') {
    let parsed;
    if (_YYYMMDD.test(value)) {
      return parseLocalDate(value);
    } else {
      parsed = Date.parse(value);
    }
    if (!isNaN(parsed)) return new Date(parsed);
  }
  return null;
}
const sundayJanuarySecond2000 = new Date(2000, 0, 2);
function getWeekdays(locale, firstDayOfWeek, weekdayFormat) {
  const daysFromSunday = firstDayOfWeek ?? weekInfo(locale)?.firstDay ?? 0;
  return createRange(7).map(i => {
    const weekday = new Date(sundayJanuarySecond2000);
    weekday.setDate(sundayJanuarySecond2000.getDate() + daysFromSunday + i);
    return new Intl.DateTimeFormat(locale, {
      weekday: weekdayFormat ?? 'narrow'
    }).format(weekday);
  });
}
function format(value, formatString, locale, formats) {
  const newDate = date(value) ?? new Date();
  const customFormat = formats?.[formatString];
  if (typeof customFormat === 'function') {
    return customFormat(newDate, formatString, locale);
  }
  let options = {};
  switch (formatString) {
    case 'fullDate':
      options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      break;
    case 'fullDateWithWeekday':
      options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      break;
    case 'normalDate':
      const day = newDate.getDate();
      const month = new Intl.DateTimeFormat(locale, {
        month: 'long'
      }).format(newDate);
      return `${day} ${month}`;
    case 'normalDateWithWeekday':
      options = {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      };
      break;
    case 'shortDate':
      options = {
        month: 'short',
        day: 'numeric'
      };
      break;
    case 'year':
      options = {
        year: 'numeric'
      };
      break;
    case 'month':
      options = {
        month: 'long'
      };
      break;
    case 'monthShort':
      options = {
        month: 'short'
      };
      break;
    case 'monthAndYear':
      options = {
        month: 'long',
        year: 'numeric'
      };
      break;
    case 'monthAndDate':
      options = {
        month: 'long',
        day: 'numeric'
      };
      break;
    case 'weekday':
      options = {
        weekday: 'long'
      };
      break;
    case 'weekdayShort':
      options = {
        weekday: 'short'
      };
      break;
    case 'dayOfMonth':
      return new Intl.NumberFormat(locale).format(newDate.getDate());
    case 'hours12h':
      options = {
        hour: 'numeric',
        hour12: true
      };
      break;
    case 'hours24h':
      options = {
        hour: 'numeric',
        hour12: false
      };
      break;
    case 'minutes':
      options = {
        minute: 'numeric'
      };
      break;
    case 'seconds':
      options = {
        second: 'numeric'
      };
      break;
    case 'fullTime':
      options = {
        hour: 'numeric',
        minute: 'numeric'
      };
      break;
    case 'fullTime12h':
      options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      break;
    case 'fullTime24h':
      options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      };
      break;
    case 'fullDateTime':
      options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      break;
    case 'fullDateTime12h':
      options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      break;
    case 'fullDateTime24h':
      options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      };
      break;
    case 'keyboardDate':
      options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      };
      break;
    case 'keyboardDateTime':
      options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric'
      };
      return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, ' ');
    case 'keyboardDateTime12h':
      options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
      return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, ' ');
    case 'keyboardDateTime24h':
      options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      };
      return new Intl.DateTimeFormat(locale, options).format(newDate).replace(/, /g, ' ');
    default:
      options = customFormat ?? {
        timeZone: 'UTC',
        timeZoneName: 'short'
      };
  }
  return new Intl.DateTimeFormat(locale, options).format(newDate);
}
function toISO(adapter, value) {
  const date = adapter.toJsDate(value);
  const year = date.getFullYear();
  const month = padStart(String(date.getMonth() + 1), 2, '0');
  const day = padStart(String(date.getDate()), 2, '0');
  return `${year}-${month}-${day}`;
}
function parseISO(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}
function addMinutes(date, amount) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + amount);
  return d;
}
function addHours(date, amount) {
  const d = new Date(date);
  d.setHours(d.getHours() + amount);
  return d;
}
function addDays(date, amount) {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}
function addWeeks(date, amount) {
  const d = new Date(date);
  d.setDate(d.getDate() + amount * 7);
  return d;
}
function addMonths(date, amount) {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + amount);
  return d;
}
function getYear(date) {
  return date.getFullYear();
}
function getMonth(date) {
  return date.getMonth();
}
function getWeek(date, locale, firstDayOfWeek, firstDayOfYear) {
  const weekInfoFromLocale = weekInfo(locale);
  const weekStart = firstDayOfWeek ?? weekInfoFromLocale?.firstDay ?? 0;
  const minWeekSize = weekInfoFromLocale?.firstWeekSize ?? 1;
  return firstDayOfYear !== undefined ? calculateWeekWithFirstDayOfYear(date, locale, weekStart, firstDayOfYear) : calculateWeekWithMinWeekSize(date, locale, weekStart, minWeekSize);
}
function calculateWeekWithFirstDayOfYear(date, locale, weekStart, firstDayOfYear) {
  const firstDayOfYearOffset = (7 + firstDayOfYear - weekStart) % 7;
  const currentWeekStart = startOfWeek(date, locale, weekStart);
  const currentWeekEnd = addDays(currentWeekStart, 6);
  function yearStartWeekdayOffset(year) {
    return (7 + new Date(year, 0, 1).getDay() - weekStart) % 7;
  }
  let year = getYear(date);
  if (year < getYear(currentWeekEnd) && yearStartWeekdayOffset(year + 1) <= firstDayOfYearOffset) {
    year++;
  }
  const yearStart = new Date(year, 0, 1);
  const offset = yearStartWeekdayOffset(year);
  const d1w1 = offset <= firstDayOfYearOffset ? addDays(yearStart, -offset) : addDays(yearStart, 7 - offset);
  return 1 + getDiff(endOfDay(date), startOfDay(d1w1), 'weeks');
}
function calculateWeekWithMinWeekSize(date, locale, weekStart, minWeekSize) {
  const currentWeekEnd = addDays(startOfWeek(date, locale, weekStart), 6);
  function firstWeekSize(year) {
    const yearStart = new Date(year, 0, 1);
    return 7 - getDiff(yearStart, startOfWeek(yearStart, locale, weekStart), 'days');
  }
  let year = getYear(date);
  if (year < getYear(currentWeekEnd) && firstWeekSize(year + 1) >= minWeekSize) {
    year++;
  }
  const yearStart = new Date(year, 0, 1);
  const size = firstWeekSize(year);
  const d1w1 = size >= minWeekSize ? addDays(yearStart, size - 7) : addDays(yearStart, size);
  return 1 + getDiff(endOfDay(date), startOfDay(d1w1), 'weeks');
}
function getDate(date) {
  return date.getDate();
}
function getNextMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}
function getPreviousMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}
function getHours(date) {
  return date.getHours();
}
function getMinutes(date) {
  return date.getMinutes();
}
function startOfYear(date) {
  return new Date(date.getFullYear(), 0, 1);
}
function endOfYear(date) {
  return new Date(date.getFullYear(), 11, 31);
}
function isWithinRange(date, range) {
  return isAfter(date, range[0]) && isBefore(date, range[1]);
}
function isValid(date) {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}
function isAfter(date, comparing) {
  return date.getTime() > comparing.getTime();
}
function isAfterDay(date, comparing) {
  return isAfter(startOfDay(date), startOfDay(comparing));
}
function isBefore(date, comparing) {
  return date.getTime() < comparing.getTime();
}
function isEqual(date, comparing) {
  return date.getTime() === comparing.getTime();
}
function isSameDay(date, comparing) {
  return date.getDate() === comparing.getDate() && date.getMonth() === comparing.getMonth() && date.getFullYear() === comparing.getFullYear();
}
function isSameMonth(date, comparing) {
  return date.getMonth() === comparing.getMonth() && date.getFullYear() === comparing.getFullYear();
}
function isSameYear(date, comparing) {
  return date.getFullYear() === comparing.getFullYear();
}
function getDiff(date, comparing, unit) {
  const d = new Date(date);
  const c = new Date(comparing);
  switch (unit) {
    case 'years':
      return d.getFullYear() - c.getFullYear();
    case 'quarters':
      return Math.floor((d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12) / 4);
    case 'months':
      return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12;
    case 'weeks':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24 * 7));
    case 'days':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24));
    case 'hours':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60));
    case 'minutes':
      return Math.floor((d.getTime() - c.getTime()) / (1000 * 60));
    case 'seconds':
      return Math.floor((d.getTime() - c.getTime()) / 1000);
    default:
      {
        return d.getTime() - c.getTime();
      }
  }
}
function setHours(date, count) {
  const d = new Date(date);
  d.setHours(count);
  return d;
}
function setMinutes(date, count) {
  const d = new Date(date);
  d.setMinutes(count);
  return d;
}
function setMonth(date, count) {
  const d = new Date(date);
  d.setMonth(count);
  return d;
}
function setDate(date, day) {
  const d = new Date(date);
  d.setDate(day);
  return d;
}
function setYear(date, year) {
  const d = new Date(date);
  d.setFullYear(year);
  return d;
}
function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}
function endOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}
class VuetifyDateAdapter {
  constructor(options) {
    this.locale = options.locale;
    this.formats = options.formats;
  }
  date(value) {
    return date(value);
  }
  toJsDate(date) {
    return date;
  }
  toISO(date) {
    return toISO(this, date);
  }
  parseISO(date) {
    return parseISO(date);
  }
  addMinutes(date, amount) {
    return addMinutes(date, amount);
  }
  addHours(date, amount) {
    return addHours(date, amount);
  }
  addDays(date, amount) {
    return addDays(date, amount);
  }
  addWeeks(date, amount) {
    return addWeeks(date, amount);
  }
  addMonths(date, amount) {
    return addMonths(date, amount);
  }
  getWeekArray(date, firstDayOfWeek) {
    const firstDay = firstDayOfWeek !== undefined ? Number(firstDayOfWeek) : undefined;
    return getWeekArray(date, this.locale, firstDay);
  }
  startOfWeek(date, firstDayOfWeek) {
    const firstDay = firstDayOfWeek !== undefined ? Number(firstDayOfWeek) : undefined;
    return startOfWeek(date, this.locale, firstDay);
  }
  endOfWeek(date) {
    return endOfWeek(date, this.locale);
  }
  startOfMonth(date) {
    return startOfMonth(date);
  }
  endOfMonth(date) {
    return endOfMonth(date);
  }
  format(date, formatString) {
    return format(date, formatString, this.locale, this.formats);
  }
  isEqual(date, comparing) {
    return isEqual(date, comparing);
  }
  isValid(date) {
    return isValid(date);
  }
  isWithinRange(date, range) {
    return isWithinRange(date, range);
  }
  isAfter(date, comparing) {
    return isAfter(date, comparing);
  }
  isAfterDay(date, comparing) {
    return isAfterDay(date, comparing);
  }
  isBefore(date, comparing) {
    return !isAfter(date, comparing) && !isEqual(date, comparing);
  }
  isSameDay(date, comparing) {
    return isSameDay(date, comparing);
  }
  isSameMonth(date, comparing) {
    return isSameMonth(date, comparing);
  }
  isSameYear(date, comparing) {
    return isSameYear(date, comparing);
  }
  setMinutes(date, count) {
    return setMinutes(date, count);
  }
  setHours(date, count) {
    return setHours(date, count);
  }
  setMonth(date, count) {
    return setMonth(date, count);
  }
  setDate(date, day) {
    return setDate(date, day);
  }
  setYear(date, year) {
    return setYear(date, year);
  }
  getDiff(date, comparing, unit) {
    return getDiff(date, comparing, unit);
  }
  getWeekdays(firstDayOfWeek, weekdayFormat) {
    const firstDay = firstDayOfWeek !== undefined ? Number(firstDayOfWeek) : undefined;
    return getWeekdays(this.locale, firstDay, weekdayFormat);
  }
  getYear(date) {
    return getYear(date);
  }
  getMonth(date) {
    return getMonth(date);
  }
  getWeek(date, firstDayOfWeek, firstDayOfYear) {
    const firstDay = firstDayOfWeek !== undefined ? Number(firstDayOfWeek) : undefined;
    const firstWeekStart = firstDayOfYear !== undefined ? Number(firstDayOfYear) : undefined;
    return getWeek(date, this.locale, firstDay, firstWeekStart);
  }
  getDate(date) {
    return getDate(date);
  }
  getNextMonth(date) {
    return getNextMonth(date);
  }
  getPreviousMonth(date) {
    return getPreviousMonth(date);
  }
  getHours(date) {
    return getHours(date);
  }
  getMinutes(date) {
    return getMinutes(date);
  }
  startOfDay(date) {
    return startOfDay(date);
  }
  endOfDay(date) {
    return endOfDay(date);
  }
  startOfYear(date) {
    return startOfYear(date);
  }
  endOfYear(date) {
    return endOfYear(date);
  }
}

// Composables
const DateOptionsSymbol = Symbol.for('vuetify:date-options');
const DateAdapterSymbol = Symbol.for('vuetify:date-adapter');
function createDate(options, locale) {
  const _options = mergeDeep({
    adapter: VuetifyDateAdapter,
    locale: {
      af: 'af-ZA',
      // ar: '', # not the same value for all variants
      bg: 'bg-BG',
      ca: 'ca-ES',
      ckb: '',
      cs: 'cs-CZ',
      de: 'de-DE',
      el: 'el-GR',
      en: 'en-US',
      // es: '', # not the same value for all variants
      et: 'et-EE',
      fa: 'fa-IR',
      fi: 'fi-FI',
      // fr: '', #not the same value for all variants
      hr: 'hr-HR',
      hu: 'hu-HU',
      he: 'he-IL',
      id: 'id-ID',
      it: 'it-IT',
      ja: 'ja-JP',
      ko: 'ko-KR',
      lv: 'lv-LV',
      lt: 'lt-LT',
      nl: 'nl-NL',
      no: 'no-NO',
      pl: 'pl-PL',
      pt: 'pt-PT',
      ro: 'ro-RO',
      ru: 'ru-RU',
      sk: 'sk-SK',
      sl: 'sl-SI',
      srCyrl: 'sr-SP',
      srLatn: 'sr-SP',
      sv: 'sv-SE',
      th: 'th-TH',
      tr: 'tr-TR',
      az: 'az-AZ',
      uk: 'uk-UA',
      vi: 'vi-VN',
      zhHans: 'zh-CN',
      zhHant: 'zh-TW'
    }
  }, options);
  return {
    options: _options,
    instance: createInstance(_options, locale)
  };
}
function createDateRange(adapter, start, stop) {
  const diff = adapter.getDiff(adapter.endOfDay(stop ?? start), adapter.startOfDay(start), 'days');
  const datesInRange = [start];
  for (let i = 1; i < diff; i++) {
    const nextDate = adapter.addDays(start, i);
    datesInRange.push(nextDate);
  }
  if (stop) {
    datesInRange.push(adapter.endOfDay(stop));
  }
  return datesInRange;
}
function createInstance(options, locale) {
  const instance = reactive(typeof options.adapter === 'function'
  // eslint-disable-next-line new-cap
  ? new options.adapter({
    locale: options.locale[locale.current.value] ?? locale.current.value,
    formats: options.formats
  }) : options.adapter);
  watch(locale.current, value => {
    instance.locale = options.locale[value] ?? value ?? instance.locale;
  });
  return instance;
}
function useDate() {
  const options = inject$1(DateOptionsSymbol);
  if (!options) throw new Error('[Vuetify] Could not find injected date options');
  const locale = useLocale();
  return createInstance(options, locale);
}

/**
 * Centralized key alias mapping for consistent key normalization across the hotkey system.
 *
 * This maps various user-friendly aliases to canonical key names that match
 * KeyboardEvent.key values (in lowercase) where possible.
 */
const keyAliasMap = {
  // Modifier aliases (from vue-use, other libraries, and current implementation)
  control: 'ctrl',
  command: 'cmd',
  option: 'alt',
  // Arrow key aliases (common abbreviations)
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright',
  // Other common key aliases
  esc: 'escape',
  spacebar: ' ',
  space: ' ',
  return: 'enter',
  del: 'delete',
  // Symbol aliases (existing from hotkey-parsing.ts)
  minus: '-',
  hyphen: '-'
};

/**
 * Normalizes a key string to its canonical form using the alias map.
 *
 * @param key - The key string to normalize
 * @returns The canonical key name in lowercase
 */
function normalizeKey(key) {
  const lowerKey = key.toLowerCase();
  return keyAliasMap[lowerKey] || lowerKey;
}

// Utilities

/**
 * Splits a single combination string into individual key parts.
 *
 * A combination is a set of keys that must be pressed simultaneously.
 * e.g. `ctrl+k`, `shift--`
 */
function splitKeyCombination(combination) {
  let isInternal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!combination) {
    if (!isInternal) consoleWarn('Invalid hotkey combination: empty string provided');
    return [];
  }

  // --- VALIDATION ---
  const startsWithPlusOrUnderscore = combination.startsWith('+') || combination.startsWith('_');
  const hasInvalidLeadingSeparator =
  // Starts with a single '+' or '_' followed by a non-separator character (e.g. '+a', '_a')
  startsWithPlusOrUnderscore && !(combination.startsWith('++') || combination.startsWith('__'));
  const hasInvalidStructure =
  // Invalid leading separator patterns
  combination.length > 1 && hasInvalidLeadingSeparator ||
  // Disallow literal + or _ keys (they require shift)
  combination.includes('++') || combination.includes('__') || combination === '+' || combination === '_' ||
  // Ends with a separator that is not part of a doubled literal
  combination.length > 1 && (combination.endsWith('+') || combination.endsWith('_')) && combination.at(-2) !== combination.at(-1) ||
  // Stand-alone doubled separators (dangling)
  combination === '++' || combination === '--' || combination === '__';
  if (hasInvalidStructure) {
    if (!isInternal) consoleWarn(`Invalid hotkey combination: "${combination}" has invalid structure`);
    return [];
  }
  const keys = [];
  let buffer = '';
  const flushBuffer = () => {
    if (buffer) {
      keys.push(normalizeKey(buffer));
      buffer = '';
    }
  };
  for (let i = 0; i < combination.length; i++) {
    const char = combination[i];
    const nextChar = combination[i + 1];
    if (char === '+' || char === '_' || char === '-') {
      if (char === nextChar) {
        flushBuffer();
        keys.push(char);
        i++;
      } else if (char === '+' || char === '_') {
        flushBuffer();
      } else {
        buffer += char;
      }
    } else {
      buffer += char;
    }
  }
  flushBuffer();

  // Within a combination, `-` is only valid as a literal key (e.g., `ctrl+-`).
  // `-` cannot be part of a longer key name within a combination.
  const hasInvalidMinus = keys.some(key => key.length > 1 && key.includes('-') && key !== '--');
  if (hasInvalidMinus) {
    if (!isInternal) consoleWarn(`Invalid hotkey combination: "${combination}" has invalid structure`);
    return [];
  }
  if (keys.length === 0 && combination) {
    return [normalizeKey(combination)];
  }
  return keys;
}

/**
 * Splits a hotkey string into its constituent combination groups.
 *
 * A sequence is a series of combinations that must be pressed in order.
 * e.g. `a-b`, `ctrl+k-p`
 */
function splitKeySequence(str) {
  if (!str) {
    consoleWarn('Invalid hotkey sequence: empty string provided');
    return [];
  }

  // A sequence is invalid if it starts or ends with a separator,
  // unless it is part of a combination (e.g., `shift+-`).
  const hasInvalidStart = str.startsWith('-') && !['---', '--+'].includes(str);
  const hasInvalidEnd = str.endsWith('-') && !str.endsWith('+-') && !str.endsWith('_-') && str !== '-' && str !== '---';
  if (hasInvalidStart || hasInvalidEnd) {
    consoleWarn(`Invalid hotkey sequence: "${str}" contains invalid combinations`);
    return [];
  }
  const result = [];
  let buffer = '';
  let i = 0;
  while (i < str.length) {
    const char = str[i];
    if (char === '-') {
      // Determine if this hyphen is part of the current combination
      const prevChar = str[i - 1];
      const prevPrevChar = i > 1 ? str[i - 2] : undefined;
      const precededBySinglePlusOrUnderscore = (prevChar === '+' || prevChar === '_') && prevPrevChar !== '+';
      if (precededBySinglePlusOrUnderscore) {
        // Treat as part of the combination (e.g., 'ctrl+-')
        buffer += char;
        i++;
      } else {
        // Treat as sequence separator
        if (buffer) {
          result.push(buffer);
          buffer = '';
        } else {
          // Empty buffer means we have a literal '-' key
          result.push('-');
        }
        i++;
      }
    } else {
      buffer += char;
      i++;
    }
  }

  // Add final buffer if it exists
  if (buffer) {
    result.push(buffer);
  }

  // Collapse runs of '-' so that every second '-' is removed
  const collapsed = [];
  let minusCount = 0;
  for (const part of result) {
    if (part === '-') {
      if (minusCount % 2 === 0) collapsed.push('-');
      minusCount++;
    } else {
      minusCount = 0;
      collapsed.push(part);
    }
  }

  // Validate that each part of the sequence is a valid combination
  const areAllValid = collapsed.every(s => splitKeyCombination(s, true).length > 0);
  if (!areAllValid) {
    consoleWarn(`Invalid hotkey sequence: "${str}" contains invalid combinations`);
    return [];
  }
  return collapsed;
}

// Composables

// Types

function useHotkey(keys, callback) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!IN_BROWSER) return function () {};
  const {
    event = 'keydown',
    inputs = false,
    preventDefault = true,
    sequenceTimeout = 1000
  } = options;
  const isMac = navigator?.userAgent?.includes('Macintosh') ?? false;
  let timeout = 0;
  let keyGroups;
  let isSequence = false;
  let groupIndex = 0;
  function clearTimer() {
    if (!timeout) return;
    clearTimeout(timeout);
    timeout = 0;
  }
  function isInputFocused() {
    if (toValue(inputs)) return false;
    const activeElement = document.activeElement;
    return activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable || activeElement.contentEditable === 'true');
  }
  function resetSequence() {
    groupIndex = 0;
    clearTimer();
  }
  function handler(e) {
    const group = keyGroups[groupIndex];
    if (!group || isInputFocused()) return;
    if (!matchesKeyGroup(e, group)) {
      if (isSequence) resetSequence();
      return;
    }
    if (toValue(preventDefault)) e.preventDefault();
    if (!isSequence) {
      callback(e);
      return;
    }
    clearTimer();
    groupIndex++;
    if (groupIndex === keyGroups.length) {
      callback(e);
      resetSequence();
      return;
    }
    timeout = window.setTimeout(resetSequence, toValue(sequenceTimeout));
  }
  function cleanup() {
    window.removeEventListener(toValue(event), handler);
    clearTimer();
  }
  watch(() => toValue(keys), function (unrefKeys) {
    cleanup();
    if (unrefKeys) {
      const groups = splitKeySequence(unrefKeys.toLowerCase());
      isSequence = groups.length > 1;
      keyGroups = groups;
      resetSequence();
      window.addEventListener(toValue(event), handler);
    }
  }, {
    immediate: true
  });

  // Watch for changes in the event type to re-register the listener
  watch(() => toValue(event), function (newEvent, oldEvent) {
    if (oldEvent && keyGroups && keyGroups.length > 0) {
      window.removeEventListener(oldEvent, handler);
      window.addEventListener(newEvent, handler);
    }
  });
  try {
    getCurrentInstance('useHotkey');
    onBeforeUnmount(cleanup);
  } catch {
    // Not in Vue setup context
  }
  function parseKeyGroup(group) {
    const MODIFIERS = ['ctrl', 'shift', 'alt', 'meta', 'cmd'];

    // Use the shared combination splitting logic
    const parts = splitKeyCombination(group.toLowerCase());

    // If the combination is invalid, return empty result
    if (parts.length === 0) {
      return {
        modifiers: Object.fromEntries(MODIFIERS.map(m => [m, false])),
        actualKey: undefined
      };
    }
    const modifiers = Object.fromEntries(MODIFIERS.map(m => [m, false]));
    let actualKey;
    for (const part of parts) {
      if (MODIFIERS.includes(part)) {
        modifiers[part] = true;
      } else {
        actualKey = part;
      }
    }
    return {
      modifiers,
      actualKey
    };
  }
  function matchesKeyGroup(e, group) {
    const {
      modifiers,
      actualKey
    } = parseKeyGroup(group);
    const expectCtrl = modifiers.ctrl || !isMac && (modifiers.cmd || modifiers.meta);
    const expectMeta = isMac && (modifiers.cmd || modifiers.meta);
    return e.ctrlKey === expectCtrl && e.metaKey === expectMeta && e.shiftKey === modifiers.shift && e.altKey === modifiers.alt && e.key.toLowerCase() === actualKey?.toLowerCase();
  }
  return cleanup;
}

// Utilities
const defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/;
const presets = {
  'credit-card': '#### - #### - #### - ####',
  date: '##/##/####',
  'date-time': '##/##/#### ##:##',
  'iso-date': '####-##-##',
  'iso-date-time': '####-##-## ##:##',
  phone: '(###) ### - ####',
  social: '###-##-####',
  time: '##:##',
  'time-with-seconds': '##:##:##'
};
const defaultTokens = {
  '#': {
    pattern: /[0-9]/
  },
  A: {
    pattern: /[A-Z]/i,
    convert: v => v.toUpperCase()
  },
  a: {
    pattern: /[a-z]/i,
    convert: v => v.toLowerCase()
  },
  N: {
    pattern: /[0-9A-Z]/i,
    convert: v => v.toUpperCase()
  },
  n: {
    pattern: /[0-9a-z]/i,
    convert: v => v.toLowerCase()
  },
  X: {
    pattern: defaultDelimiters
  }
};
function useMask(props) {
  const mask = computed(() => {
    if (typeof props.mask === 'string') {
      if (props.mask in presets) return presets[props.mask];
      return props.mask;
    }
    return props.mask?.mask ?? '';
  });
  const tokens = computed(() => {
    return {
      ...defaultTokens,
      ...(isObject(props.mask) ? props.mask.tokens : null)
    };
  });
  function isMask(char) {
    return char in tokens.value;
  }
  function maskValidates(mask, char) {
    if (char == null || !isMask(mask)) return false;
    const item = tokens.value[mask];
    if (item.pattern) return item.pattern.test(char);
    return item.test(char);
  }
  function convert(mask, char) {
    const item = tokens.value[mask];
    return item.convert ? item.convert(char) : char;
  }
  function maskText(text) {
    const trimmedText = text?.trim().replace(/\s+/g, ' ');
    if (trimmedText == null) return '';
    if (!mask.value.length || !trimmedText.length) return trimmedText;
    let textIndex = 0;
    let maskIndex = 0;
    let newText = '';
    while (maskIndex < mask.value.length) {
      const mchar = mask.value[maskIndex];
      const tchar = trimmedText[textIndex];

      // Escaped character in mask, the next mask character is inserted
      if (mchar === '\\') {
        newText += mask.value[maskIndex + 1];
        maskIndex += 2;
        continue;
      }
      if (!isMask(mchar)) {
        newText += mchar;
        if (tchar === mchar) {
          textIndex++;
        }
      } else if (maskValidates(mchar, tchar)) {
        newText += convert(mchar, tchar);
        textIndex++;
      } else {
        break;
      }
      maskIndex++;
    }
    return newText;
  }
  function unmaskText(text) {
    if (text == null) return null;
    if (!mask.value.length || !text.length) return text;
    let textIndex = 0;
    let maskIndex = 0;
    let newText = '';
    while (true) {
      const mchar = mask.value[maskIndex];
      const tchar = text[textIndex];
      if (tchar == null) break;
      if (mchar == null) {
        newText += tchar;
        textIndex++;
        continue;
      }

      // Escaped character in mask, skip the next input character
      if (mchar === '\\') {
        if (tchar === mask.value[maskIndex + 1]) {
          textIndex++;
        }
        maskIndex += 2;
        continue;
      }
      if (maskValidates(mchar, tchar)) {
        // masked char
        newText += tchar;
        textIndex++;
        maskIndex++;
        continue;
      } else if (mchar !== tchar) {
        // input doesn't match mask, skip forward until it does
        while (true) {
          const mchar = mask.value[maskIndex++];
          if (mchar == null || maskValidates(mchar, tchar)) break;
        }
        continue;
      }
      textIndex++;
      maskIndex++;
    }
    return newText;
  }
  function isValid(text) {
    if (!text) return false;
    return unmaskText(text) === unmaskText(maskText(text));
  }
  function isComplete(text) {
    if (!text) return false;
    const maskedText = maskText(text);
    return maskedText.length === mask.value.length && isValid(text);
  }
  return {
    isValid,
    isComplete,
    mask: maskText,
    unmask: unmaskText
  };
}

// Types

const makeVColorPickerProps = propsFactory({
  canvasHeight: {
    type: [String, Number],
    default: 150
  },
  disabled: Boolean,
  dotSize: {
    type: [Number, String],
    default: 10
  },
  hideCanvas: Boolean,
  hideSliders: Boolean,
  hideInputs: Boolean,
  mode: {
    type: String,
    default: 'rgba',
    validator: v => Object.keys(modes).includes(v)
  },
  modes: {
    type: Array,
    default: () => Object.keys(modes),
    validator: v => Array.isArray(v) && v.every(m => Object.keys(modes).includes(m))
  },
  showSwatches: Boolean,
  swatches: Array,
  swatchesMaxHeight: {
    type: [Number, String],
    default: 150
  },
  modelValue: {
    type: [Object, String]
  },
  ...makeVPickerProps({
    hideHeader: true
  }),
  ...pick(makeVColorPickerPreviewProps(), ['hideEyeDropper', 'eyeDropperIcon'])
}, 'VColorPicker');
const VColorPicker = defineComponent({
  name: 'VColorPicker',
  props: makeVColorPickerProps(),
  emits: {
    'update:modelValue': color => true,
    'update:mode': mode => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const mode = useProxiedModel(props, 'mode');
    const hue = ref(null);
    const model = useProxiedModel(props, 'modelValue', undefined, v => {
      if (v == null || v === '') return null;
      let c;
      try {
        c = RGBtoHSV(parseColor(v));
      } catch (err) {
        consoleWarn(err);
        return null;
      }
      return c;
    }, v => {
      if (!v) return null;
      return extractColor(v, props.modelValue);
    });
    const currentColor = computed(() => {
      return model.value ? {
        ...model.value,
        h: hue.value ?? model.value.h
      } : null;
    });
    const {
      rtlClasses
    } = useRtl();
    let externalChange = true;
    watch(model, v => {
      if (!externalChange) {
        // prevent hue shift from rgb conversion inaccuracy
        externalChange = true;
        return;
      }
      if (!v) return;
      hue.value = v.h;
    }, {
      immediate: true
    });
    const updateColor = hsva => {
      externalChange = false;
      hue.value = hsva.h;
      model.value = hsva;
    };
    onBeforeMount(() => {
      if (!props.modes.includes(mode.value)) mode.value = props.modes[0];
    });
    provideDefaults({
      VSlider: {
        color: undefined,
        trackColor: undefined,
        trackFillColor: undefined
      }
    });
    useRender(() => {
      const pickerProps = VPicker.filterProps(props);
      return createVNode(VPicker, mergeProps(pickerProps, {
        "class": ['v-color-picker', rtlClasses.value, props.class],
        "style": [{
          '--v-color-picker-color-hsv': HSVtoCSS({
            ...(currentColor.value ?? nullColor),
            a: 1
          })
        }, props.style]
      }), {
        ...slots,
        default: () => createElementVNode(Fragment, null, [!props.hideCanvas && createVNode(VColorPickerCanvas, {
          "key": "canvas",
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "disabled": props.disabled,
          "dotSize": props.dotSize,
          "width": props.width,
          "height": props.canvasHeight
        }, null), (!props.hideSliders || !props.hideInputs) && createElementVNode("div", {
          "key": "controls",
          "class": "v-color-picker__controls"
        }, [!props.hideSliders && createVNode(VColorPickerPreview, {
          "key": "preview",
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "hideAlpha": !mode.value.endsWith('a'),
          "disabled": props.disabled,
          "hideEyeDropper": props.hideEyeDropper,
          "eyeDropperIcon": props.eyeDropperIcon
        }, null), !props.hideInputs && createVNode(VColorPickerEdit, {
          "key": "edit",
          "modes": props.modes,
          "mode": mode.value,
          "onUpdate:mode": m => mode.value = m,
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "disabled": props.disabled
        }, null)]), props.showSwatches && createVNode(VColorPickerSwatches, {
          "key": "swatches",
          "color": currentColor.value,
          "onUpdate:color": updateColor,
          "maxHeight": props.swatchesMaxHeight,
          "swatches": props.swatches,
          "disabled": props.disabled
        }, null)])
      });
    });
    return {};
  }
});

// Types

const makeVComboboxProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: {
    type: Boolean,
    default: true
  },
  delimiters: Array,
  ...makeFilterProps({
    filterKeys: ['title']
  }),
  ...makeSelectProps({
    hideNoData: true,
    returnObject: true
  }),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox'
  }), ['validationValue', 'dirty', 'appendInnerIcon']),
  ...makeTransitionProps({
    transition: false
  })
}, 'VCombobox');
const VCombobox = genericComponent()({
  name: 'VCombobox',
  props: makeVComboboxProps(),
  emits: {
    'update:focused': focused => true,
    'update:modelValue': value => true,
    'update:search': value => true,
    'update:menu': value => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = shallowRef(false);
    const isPristine = shallowRef(true);
    const listHasFocus = shallowRef(false);
    const showAllItemsForNoMatch = shallowRef(false);
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const selectionIndex = shallowRef(-1);
    let cleared = false;
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => vTextFieldRef.value?.color);
    const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const form = useForm(props);
    const hasChips = computed(() => !!(props.chips || slots.chip));
    const hasSelectionSlot = computed(() => hasChips.value || !!slots.selection);
    const _search = shallowRef(!props.multiple && !hasSelectionSlot.value ? model.value[0]?.title ?? '' : '');
    const search = computed({
      get: () => {
        return _search.value;
      },
      set: async val => {
        _search.value = val ?? '';
        if (!props.multiple && !hasSelectionSlot.value) {
          model.value = [transformItem$3(props, val)];
          nextTick(() => vVirtualScrollRef.value?.scrollToIndex(0));
        }
        if (val && props.multiple && props.delimiters?.length) {
          const signsToMatch = props.delimiters.map(escapeForRegex).join('|');
          const values = val.split(new RegExp(`(?:${signsToMatch})+`));
          if (values.length > 1) {
            for (let v of values) {
              v = v.trim();
              if (v) {
                select(transformItem$3(props, v));
                await nextTick();
              }
            }
            _search.value = '';
          }
        }
        if (!val) selectionIndex.value = -1;
        isPristine.value = !val;
      }
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value) : typeof props.counterValue === 'number' ? props.counterValue : props.multiple ? model.value.length : search.value.length;
    });
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, () => isPristine.value ? '' : search.value);
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter(filteredItem => !model.value.some(s => s.value === filteredItem.value));
      }
      if (filteredItems.value.length === 0 && showAllItemsForNoMatch.value) {
        return items.value;
      }
      return filteredItems.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || form.isReadonly.value || form.isDisabled.value);
    const _menu = useProxiedModel(props, 'menu');
    const menu = computed({
      get: () => _menu.value,
      set: v => {
        if (_menu.value && !v && vMenuRef.value?.ΨopenChildren.size) return;
        if (v && menuDisabled.value) return;
        _menu.value = v;
      }
    });
    const label = toRef(() => menu.value ? props.closeText : props.openText);
    watch(_search, value => {
      showAllItemsForNoMatch.value = false;
      if (cleared) {
        // wait for clear to finish, VTextField sets _search to null
        // then search computed triggers and updates _search to ''
        nextTick(() => cleared = false);
      } else if (isFocused.value && !menu.value) {
        menu.value = true;
      }
      isPristine.value = !value;
      emit('update:search', value);
    });
    watch(model, value => {
      if (!props.multiple && !hasSelectionSlot.value) {
        _search.value = value[0]?.title ?? '';
      }
    });
    const selectedValues = computed(() => model.value.map(selection => selection.value));
    const highlightFirst = computed(() => {
      const selectFirst = props.autoSelectFirst === true || props.autoSelectFirst === 'exact' && search.value === displayItems.value[0]?.title;
      return selectFirst && displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value;
    });
    const listRef = ref();
    const listEvents = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      cleared = true;
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;
      menu.value = true;
    }
    function onMousedownMenuIcon(e) {
      if (menuDisabled.value) return;
      if (isFocused.value) {
        e.preventDefault();
        e.stopPropagation();
      }
      menu.value = !menu.value;
    }
    function onListKeydown(e) {
      if (checkPrintable(e) || e.key === 'Backspace') {
        vTextFieldRef.value?.focus();
      }
    }
    // eslint-disable-next-line complexity
    function onKeydown(e) {
      if (isComposingIgnoreKey(e) || form.isReadonly.value) return;
      const selectionStart = vTextFieldRef.value?.selectionStart;
      const length = model.value.length;
      if (['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
      }
      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true;
      }
      if (['Escape'].includes(e.key)) {
        menu.value = false;
      }
      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        if (highlightFirst.value && ['Enter', 'Tab'].includes(e.key) && !model.value.some(_ref2 => {
          let {
            value
          } = _ref2;
          return value === displayItems.value[0].value;
        })) {
          select(filteredItems.value[0]);
        }
        isPristine.value = true;
      }
      if (e.key === 'ArrowDown' && highlightFirst.value) {
        listRef.value?.focus('next');
      }
      if (e.key === 'Enter' && search.value) {
        select(transformItem$3(props, search.value));
        if (hasSelectionSlot.value) _search.value = '';
      }
      if (['Backspace', 'Delete'].includes(e.key)) {
        if (!props.multiple && hasSelectionSlot.value && model.value.length > 0 && !search.value) return select(model.value[0], false);
        if (~selectionIndex.value) {
          e.preventDefault();
          const originalSelectionIndex = selectionIndex.value;
          select(model.value[selectionIndex.value], false);
          selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
        } else if (e.key === 'Backspace' && !search.value) {
          selectionIndex.value = length - 1;
        }
        return;
      }
      if (!props.multiple) return;
      if (e.key === 'ArrowLeft') {
        if (selectionIndex.value < 0 && selectionStart && selectionStart > 0) return;
        const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
        if (model.value[prev]) {
          selectionIndex.value = prev;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value?.setSelectionRange(search.value.length, search.value.length);
        }
      } else if (e.key === 'ArrowRight') {
        if (selectionIndex.value < 0) return;
        const next = selectionIndex.value + 1;
        if (model.value[next]) {
          selectionIndex.value = next;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value?.setSelectionRange(0, 0);
        }
      } else if (~selectionIndex.value && checkPrintable(e)) {
        selectionIndex.value = -1;
      }
    }
    function onAfterEnter() {
      if (props.eager) {
        vVirtualScrollRef.value?.calculateVisibleItems();
      }
    }
    function onAfterLeave() {
      if (isFocused.value) {
        isPristine.value = true;
        vTextFieldRef.value?.focus();
      }
    }
    /** @param set - null means toggle */
    function select(item) {
      let set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!item || item.props.disabled) return;
      if (props.multiple) {
        const index = model.value.findIndex(selection => (props.valueComparator || deepEqual)(selection.value, item.value));
        const add = set == null ? !~index : set;
        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
        if (props.clearOnSelect) {
          search.value = '';
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        _search.value = add && !hasSelectionSlot.value ? item.title : '';

        // watch for search watcher to trigger
        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
      setTimeout(() => {
        listHasFocus.value = true;
      });
    }
    function onFocusout(e) {
      listHasFocus.value = false;
    }
    function onUpdateModelValue(v) {
      if (v == null || v === '' && !props.multiple && !hasSelectionSlot.value) model.value = [];
    }
    watch(isFocused, (val, oldVal) => {
      if (val || val === oldVal) return;
      selectionIndex.value = -1;
      menu.value = false;
      if (search.value) {
        if (props.multiple) {
          select(transformItem$3(props, search.value));
          return;
        }
        if (!hasSelectionSlot.value) return;
        if (model.value.some(_ref3 => {
          let {
            title
          } = _ref3;
          return title === search.value;
        })) {
          _search.value = '';
        } else {
          select(transformItem$3(props, search.value));
        }
      }
    });
    watch(menu, val => {
      if (!props.hideSelected && val && model.value.length) {
        const index = displayItems.value.findIndex(item => model.value.some(s => (props.valueComparator || deepEqual)(s.value, item.value)));
        IN_BROWSER && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index);
        });
      }
      if (val && search.value && filteredItems.value.length === 0) {
        showAllItemsForNoMatch.value = true;
      }
      isPristine.value = !search.value;
    }, {
      immediate: true
    });
    watch(() => props.items, (newVal, oldVal) => {
      if (menu.value) return;
      if (isFocused.value && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots['prepend-item'] || slots['append-item'] || slots['no-data']);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": [$event => search.value = $event, onUpdateModelValue],
        "focused": isFocused.value,
        "onUpdate:focused": $event => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "class": ['v-combobox', {
          'v-combobox--active-menu': menu.value,
          'v-combobox--chips': !!props.chips,
          'v-combobox--selection-slot': !!hasSelectionSlot.value,
          'v-combobox--selecting-index': selectionIndex.value > -1,
          [`v-combobox--${props.multiple ? 'multiple' : 'single'}`]: true
        }, props.class],
        "style": props.style,
        "readonly": form.isReadonly.value,
        "placeholder": isDirty ? undefined : props.placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => createElementVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": $event => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-combobox__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterEnter": onAfterEnter,
          "onAfterLeave": onAfterLeave
        }, props.menuProps), {
          default: () => [hasList && createVNode(VList, mergeProps({
            "ref": listRef,
            "filterable": true,
            "selected": selectedValues.value,
            "selectStrategy": props.multiple ? 'independent' : 'single-independent',
            "onMousedown": e => e.preventDefault(),
            "selectable": true,
            "onKeydown": onListKeydown,
            "onFocusin": onFocusin,
            "onFocusout": onFocusout,
            "tabindex": "-1",
            "aria-live": "polite",
            "color": props.itemColor ?? props.color
          }, listEvents, props.listProps), {
            default: () => [slots['prepend-item']?.(), !displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? createVNode(VListItem, {
              "key": "no-data",
              "title": t(props.noDataText)
            }, null)), createVNode(VVirtualScroll, {
              "ref": vVirtualScrollRef,
              "renderless": true,
              "items": displayItems.value,
              "itemKey": "value"
            }, {
              default: _ref4 => {
                let {
                  item,
                  index,
                  itemRef
                } = _ref4;
                const itemProps = mergeProps(item.props, {
                  ref: itemRef,
                  key: item.value,
                  active: highlightFirst.value && index === 0 ? true : undefined,
                  onClick: () => select(item, null)
                });
                if (item.type === 'divider') {
                  return slots.divider?.({
                    props: item.raw,
                    index
                  }) ?? createVNode(VDivider, mergeProps(item.props, {
                    "key": `divider-${index}`
                  }), null);
                }
                if (item.type === 'subheader') {
                  return slots.subheader?.({
                    props: item.raw,
                    index
                  }) ?? createVNode(VListSubheader, mergeProps(item.props, {
                    "key": `subheader-${index}`
                  }), null);
                }
                return slots.item?.({
                  item,
                  index,
                  props: itemProps
                }) ?? createVNode(VListItem, mergeProps(itemProps, {
                  "role": "option"
                }), {
                  prepend: _ref5 => {
                    let {
                      isSelected
                    } = _ref5;
                    return createElementVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                      "key": item.value,
                      "modelValue": isSelected,
                      "ripple": false,
                      "tabindex": "-1"
                    }, null) : undefined, item.props.prependAvatar && createVNode(VAvatar, {
                      "image": item.props.prependAvatar
                    }, null), item.props.prependIcon && createVNode(VIcon, {
                      "icon": item.props.prependIcon
                    }, null)]);
                  },
                  title: () => {
                    return isPristine.value ? item.title : highlightResult('v-combobox', item.title, getMatches(item)?.title);
                  }
                });
              }
            }), slots['append-item']?.()]
          })]
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = {
            'onClick:close': onChipClose,
            onKeydown(e) {
              if (e.key !== 'Enter' && e.key !== ' ') return;
              e.preventDefault();
              e.stopPropagation();
              onChipClose(e);
            },
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            'onUpdate:modelValue': undefined
          };
          const hasSlot = hasChips.value ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips.value ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : undefined;
          if (hasSlot && !slotContent) return undefined;
          return createElementVNode("div", {
            "key": item.value,
            "class": normalizeClass(['v-combobox__selection', index === selectionIndex.value && ['v-combobox__selection--selected', textColorClasses.value]]),
            "style": normalizeStyle(index === selectionIndex.value ? textColorStyles.value : {})
          }, [hasChips.value ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: 'small',
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent ?? createElementVNode("span", {
            "class": "v-combobox__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && createElementVNode("span", {
            "class": "v-combobox__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        'append-inner': function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createElementVNode(Fragment, null, [slots['append-inner']?.(...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-combobox__menu-icon",
            "color": vTextFieldRef.value?.fieldIconColor,
            "icon": props.menuIcon,
            "onMousedown": onMousedownMenuIcon,
            "onClick": noop,
            "aria-label": t(label.value),
            "title": t(label.value),
            "tabindex": "-1"
          }, null) : undefined]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      selectionIndex,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});

// Types

const makeVConfirmEditProps = propsFactory({
  modelValue: null,
  color: String,
  cancelText: {
    type: String,
    default: '$vuetify.confirmEdit.cancel'
  },
  okText: {
    type: String,
    default: '$vuetify.confirmEdit.ok'
  },
  disabled: {
    type: [Boolean, Array],
    default: undefined
  },
  hideActions: Boolean
}, 'VConfirmEdit');
const VConfirmEdit = genericComponent()({
  name: 'VConfirmEdit',
  props: makeVConfirmEditProps(),
  emits: {
    cancel: () => true,
    save: value => true,
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const internalModel = ref();
    watchEffect(() => {
      internalModel.value = structuredClone(toRaw(model.value));
    });
    const {
      t
    } = useLocale();
    const isPristine = computed(() => {
      return deepEqual(model.value, internalModel.value);
    });
    function isActionDisabled(action) {
      if (typeof props.disabled === 'boolean') {
        return props.disabled;
      }
      if (Array.isArray(props.disabled)) {
        return props.disabled.includes(action);
      }
      return isPristine.value;
    }
    const isSaveDisabled = computed(() => isActionDisabled('save'));
    const isCancelDisabled = computed(() => isActionDisabled('cancel'));
    function save() {
      model.value = internalModel.value;
      emit('save', internalModel.value);
    }
    function cancel() {
      internalModel.value = structuredClone(toRaw(model.value));
      emit('cancel');
    }
    function actions(actionsProps) {
      return createElementVNode(Fragment, null, [createVNode(VBtn, mergeProps({
        "disabled": isCancelDisabled.value,
        "variant": "text",
        "color": props.color,
        "onClick": cancel,
        "text": t(props.cancelText)
      }, actionsProps), null), createVNode(VBtn, mergeProps({
        "disabled": isSaveDisabled.value,
        "variant": "text",
        "color": props.color,
        "onClick": save,
        "text": t(props.okText)
      }, actionsProps), null)]);
    }
    let actionsUsed = false;
    useRender(() => {
      return createElementVNode(Fragment, null, [slots.default?.({
        model: internalModel,
        save,
        cancel,
        isPristine: isPristine.value,
        get actions() {
          actionsUsed = true;
          return actions;
        }
      }), !props.hideActions && !actionsUsed && actions()]);
    });
    return {
      save,
      cancel,
      isPristine
    };
  }
});

// Composables

// Types

const makeDataTableExpandProps = propsFactory({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, 'DataTable-expand');
const VDataTableExpandedKey = Symbol.for('vuetify:datatable:expanded');
function provideExpanded(props) {
  const expandOnClick = toRef(() => props.expandOnClick);
  const expanded = useProxiedModel(props, 'expanded', props.expanded, v => {
    return new Set(v);
  }, v => {
    return [...v.values()];
  });
  function expand(item, value) {
    const newExpanded = new Set(expanded.value);
    if (!value) {
      newExpanded.delete(item.value);
    } else {
      newExpanded.add(item.value);
    }
    expanded.value = newExpanded;
  }
  function isExpanded(item) {
    return expanded.value.has(item.value);
  }
  function toggleExpand(item) {
    expand(item, !isExpanded(item));
  }
  const data = {
    expand,
    expanded,
    expandOnClick,
    isExpanded,
    toggleExpand
  };
  provide(VDataTableExpandedKey, data);
  return data;
}
function useExpanded() {
  const data = inject$1(VDataTableExpandedKey);
  if (!data) throw new Error('foo');
  return data;
}

// Composables

// Types

const makeDataTableGroupProps = propsFactory({
  groupBy: {
    type: Array,
    default: () => []
  }
}, 'DataTable-group');
const VDataTableGroupSymbol = Symbol.for('vuetify:data-table-group');
function createGroupBy(props) {
  const groupBy = useProxiedModel(props, 'groupBy');
  return {
    groupBy
  };
}
function provideGroupBy(options) {
  const {
    disableSort,
    groupBy,
    sortBy
  } = options;
  const opened = ref(new Set());
  const sortByWithGroups = computed(() => {
    return groupBy.value.map(val => ({
      ...val,
      order: val.order ?? false
    })).concat(disableSort?.value ? [] : sortBy.value);
  });
  function isGroupOpen(group) {
    return opened.value.has(group.id);
  }
  function toggleGroup(group) {
    const newOpened = new Set(opened.value);
    if (!isGroupOpen(group)) newOpened.add(group.id);else newOpened.delete(group.id);
    opened.value = newOpened;
  }
  function extractRows(items) {
    function dive(group) {
      const arr = [];
      for (const item of group.items) {
        if ('type' in item && item.type === 'group') {
          arr.push(...dive(item));
        } else {
          arr.push(item);
        }
      }
      return [...new Set(arr)];
    }
    return dive({
      items});
  }

  // onBeforeMount(() => {
  //   for (const key of groupedItems.value.keys()) {
  //     opened.value.add(key)
  //   }
  // })

  const data = {
    sortByWithGroups,
    toggleGroup,
    opened,
    groupBy,
    extractRows,
    isGroupOpen
  };
  provide(VDataTableGroupSymbol, data);
  return data;
}
function useGroupBy() {
  const data = inject$1(VDataTableGroupSymbol);
  if (!data) throw new Error('Missing group!');
  return data;
}
function groupItemsByProperty(items, groupBy) {
  if (!items.length) return [];
  const groups = new Map();
  for (const item of items) {
    const value = getObjectValueByPath(item.raw, groupBy);
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value).push(item);
  }
  return groups;
}
function groupItems(items, groupBy) {
  let depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'root';
  if (!groupBy.length) return [];
  const groupedItems = groupItemsByProperty(items, groupBy[0]);
  const groups = [];
  const rest = groupBy.slice(1);
  groupedItems.forEach((items, value) => {
    const key = groupBy[0];
    const id = `${prefix}_${key}_${value}`;
    groups.push({
      depth,
      id,
      key,
      value,
      items: rest.length ? groupItems(items, rest, depth + 1, id) : items,
      type: 'group'
    });
  });
  return groups;
}
function flattenItems(items, opened, hasSummary) {
  const flatItems = [];
  for (const item of items) {
    // TODO: make this better
    if ('type' in item && item.type === 'group') {
      if (item.value != null) {
        flatItems.push(item);
      }
      if (opened.has(item.id) || item.value == null) {
        flatItems.push(...flattenItems(item.items, opened, hasSummary));
        if (hasSummary) {
          flatItems.push({
            ...item,
            type: 'group-summary'
          });
        }
      }
    } else {
      flatItems.push(item);
    }
  }
  return flatItems;
}
function useGroupedItems(items, groupBy, opened, hasSummary) {
  const flatItems = computed(() => {
    if (!groupBy.value.length) return items.value;
    const groupedItems = groupItems(items.value, groupBy.value.map(item => item.key));
    return flattenItems(groupedItems, opened.value, toValue(hasSummary));
  });
  return {
    flatItems
  };
}

// Utilities

// Types

function useOptions(_ref) {
  let {
    page,
    itemsPerPage,
    sortBy,
    groupBy,
    search
  } = _ref;
  const vm = getCurrentInstance('VDataTable');
  const options = () => ({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
    groupBy: groupBy.value,
    search: search.value
  });
  let oldOptions = null;
  watch(options, value => {
    if (deepEqual(oldOptions, value)) return;

    // Reset page when searching
    if (oldOptions && oldOptions.search !== value.search) {
      page.value = 1;
    }
    vm.emit('update:options', value);
    oldOptions = value;
  }, {
    deep: true,
    immediate: true
  });
}

// Composables

// Types

const makeDataTablePaginateProps = propsFactory({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, 'DataTable-paginate');
const VDataTablePaginationSymbol = Symbol.for('vuetify:data-table-pagination');
function createPagination(props) {
  const page = useProxiedModel(props, 'page', undefined, value => Number(value ?? 1));
  const itemsPerPage = useProxiedModel(props, 'itemsPerPage', undefined, value => Number(value ?? 10));
  return {
    page,
    itemsPerPage
  };
}
function providePagination(options) {
  const {
    page,
    itemsPerPage,
    itemsLength
  } = options;
  const startIndex = computed(() => {
    if (itemsPerPage.value === -1) return 0;
    return itemsPerPage.value * (page.value - 1);
  });
  const stopIndex = computed(() => {
    if (itemsPerPage.value === -1) return itemsLength.value;
    return Math.min(itemsLength.value, startIndex.value + itemsPerPage.value);
  });
  const pageCount = computed(() => {
    if (itemsPerPage.value === -1 || itemsLength.value === 0) return 1;
    return Math.ceil(itemsLength.value / itemsPerPage.value);
  });

  // Don't run immediately, items may not have been loaded yet: #17966
  watch([page, pageCount], () => {
    if (page.value > pageCount.value) {
      page.value = pageCount.value;
    }
  });
  function setItemsPerPage(value) {
    itemsPerPage.value = value;
    page.value = 1;
  }
  function nextPage() {
    page.value = clamp(page.value + 1, 1, pageCount.value);
  }
  function prevPage() {
    page.value = clamp(page.value - 1, 1, pageCount.value);
  }
  function setPage(value) {
    page.value = clamp(value, 1, pageCount.value);
  }
  const data = {
    page,
    itemsPerPage,
    startIndex,
    stopIndex,
    pageCount,
    itemsLength,
    nextPage,
    prevPage,
    setPage,
    setItemsPerPage
  };
  provide(VDataTablePaginationSymbol, data);
  return data;
}
function usePagination() {
  const data = inject$1(VDataTablePaginationSymbol);
  if (!data) throw new Error('Missing pagination!');
  return data;
}
function usePaginatedItems(options) {
  const vm = getCurrentInstance('usePaginatedItems');
  const {
    items,
    startIndex,
    stopIndex,
    itemsPerPage
  } = options;
  const paginatedItems = computed(() => {
    if (itemsPerPage.value <= 0) return items.value;
    return items.value.slice(startIndex.value, stopIndex.value);
  });
  watch(paginatedItems, val => {
    vm.emit('update:currentItems', val);
  }, {
    immediate: true
  });
  return {
    paginatedItems
  };
}

// Composables

// Types

const singleSelectStrategy = {
  showSelectAll: false,
  allSelected: () => [],
  select: _ref => {
    let {
      items,
      value
    } = _ref;
    return new Set(value ? [items[0]?.value] : []);
  },
  selectAll: _ref2 => {
    let {
      selected
    } = _ref2;
    return selected;
  }
};
const pageSelectStrategy = {
  showSelectAll: true,
  allSelected: _ref3 => {
    let {
      currentPage
    } = _ref3;
    return currentPage;
  },
  select: _ref4 => {
    let {
      items,
      value,
      selected
    } = _ref4;
    for (const item of items) {
      if (value) selected.add(item.value);else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: _ref5 => {
    let {
      value,
      currentPage,
      selected
    } = _ref5;
    return pageSelectStrategy.select({
      items: currentPage,
      value,
      selected
    });
  }
};
const allSelectStrategy = {
  showSelectAll: true,
  allSelected: _ref6 => {
    let {
      allItems
    } = _ref6;
    return allItems;
  },
  select: _ref7 => {
    let {
      items,
      value,
      selected
    } = _ref7;
    for (const item of items) {
      if (value) selected.add(item.value);else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: _ref8 => {
    let {
      value,
      allItems,
      selected
    } = _ref8;
    return allSelectStrategy.select({
      items: allItems,
      value,
      selected
    });
  }
};
const makeDataTableSelectProps = propsFactory({
  showSelect: Boolean,
  selectStrategy: {
    type: [String, Object],
    default: 'page'
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  valueComparator: {
    type: Function,
    default: deepEqual
  }
}, 'DataTable-select');
const VDataTableSelectionSymbol = Symbol.for('vuetify:data-table-selection');
function provideSelection(props, _ref9) {
  let {
    allItems,
    currentPage
  } = _ref9;
  const selected = useProxiedModel(props, 'modelValue', props.modelValue, v => {
    return new Set(wrapInArray(v).map(v => {
      return allItems.value.find(item => props.valueComparator(v, item.value))?.value ?? v;
    }));
  }, v => {
    return [...v.values()];
  });
  const allSelectable = computed(() => allItems.value.filter(item => item.selectable));
  const currentPageSelectable = computed(() => currentPage.value.filter(item => item.selectable));
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === 'object') return props.selectStrategy;
    switch (props.selectStrategy) {
      case 'single':
        return singleSelectStrategy;
      case 'all':
        return allSelectStrategy;
      case 'page':
      default:
        return pageSelectStrategy;
    }
  });
  const lastSelectedIndex = shallowRef(null);
  function isSelected(items) {
    return wrapInArray(items).every(item => selected.value.has(item.value));
  }
  function isSomeSelected(items) {
    return wrapInArray(items).some(item => selected.value.has(item.value));
  }
  function select(items, value) {
    const newSelected = selectStrategy.value.select({
      items,
      value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  function toggleSelect(item, index, event) {
    const items = [];
    index = index ?? currentPage.value.findIndex(i => i.value === item.value);
    if (props.selectStrategy !== 'single' && event?.shiftKey && lastSelectedIndex.value !== null) {
      const [start, end] = [lastSelectedIndex.value, index].sort((a, b) => a - b);
      items.push(...currentPage.value.slice(start, end + 1).filter(item => item.selectable));
    } else {
      items.push(item);
      lastSelectedIndex.value = index;
    }
    select(items, !isSelected([item]));
  }
  function selectAll(value) {
    const newSelected = selectStrategy.value.selectAll({
      value,
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  const someSelected = computed(() => selected.value.size > 0);
  const allSelected = computed(() => {
    const items = selectStrategy.value.allSelected({
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value
    });
    return !!items.length && isSelected(items);
  });
  const showSelectAll = toRef(() => selectStrategy.value.showSelectAll);
  const data = {
    toggleSelect,
    select,
    selectAll,
    isSelected,
    isSomeSelected,
    someSelected,
    allSelected,
    showSelectAll,
    lastSelectedIndex,
    selectStrategy
  };
  provide(VDataTableSelectionSymbol, data);
  return data;
}
function useSelection() {
  const data = inject$1(VDataTableSelectionSymbol);
  if (!data) throw new Error('Missing selection!');
  return data;
}

// Composables

// Types

const makeDataTableSortProps = propsFactory({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, 'DataTable-sort');
const VDataTableSortSymbol = Symbol.for('vuetify:data-table-sort');
function createSort(props) {
  const sortBy = useProxiedModel(props, 'sortBy');
  const mustSort = toRef(() => props.mustSort);
  const multiSort = toRef(() => props.multiSort);
  return {
    sortBy,
    mustSort,
    multiSort
  };
}
function provideSort(options) {
  const {
    sortBy,
    mustSort,
    multiSort,
    page
  } = options;
  const toggleSort = column => {
    if (column.key == null) return;
    let newSortBy = sortBy.value.map(x => ({
      ...x
    })) ?? [];
    const item = newSortBy.find(x => x.key === column.key);
    if (!item) {
      if (multiSort.value) {
        newSortBy.push({
          key: column.key,
          order: 'asc'
        });
      } else {
        newSortBy = [{
          key: column.key,
          order: 'asc'
        }];
      }
    } else if (item.order === 'desc') {
      if (mustSort.value && newSortBy.length === 1) {
        item.order = 'asc';
      } else {
        newSortBy = newSortBy.filter(x => x.key !== column.key);
      }
    } else {
      item.order = 'desc';
    }
    sortBy.value = newSortBy;
    if (page) page.value = 1;
  };
  function isSorted(column) {
    return !!sortBy.value.find(item => item.key === column.key);
  }
  const data = {
    sortBy,
    toggleSort,
    isSorted
  };
  provide(VDataTableSortSymbol, data);
  return data;
}
function useSort() {
  const data = inject$1(VDataTableSortSymbol);
  if (!data) throw new Error('Missing sort!');
  return data;
}

// TODO: abstract into project composable
function useSortedItems(props, items, sortBy, options) {
  const locale = useLocale();
  const sortedItems = computed(() => {
    if (!sortBy.value.length) return items.value;
    return sortItems(items.value, sortBy.value, locale.current.value, {
      transform: options?.transform,
      sortFunctions: {
        ...props.customKeySort,
        ...options?.sortFunctions?.value
      },
      sortRawFunctions: options?.sortRawFunctions?.value
    });
  });
  return {
    sortedItems
  };
}
function sortItems(items, sortByItems, locale, options) {
  const stringCollator = new Intl.Collator(locale, {
    sensitivity: 'accent',
    usage: 'sort'
  });
  const transformedItems = items.map(item => [item, options?.transform ? options.transform(item) : item]);
  return transformedItems.sort((a, b) => {
    for (let i = 0; i < sortByItems.length; i++) {
      let hasCustomResult = false;
      const sortKey = sortByItems[i].key;
      const sortOrder = sortByItems[i].order ?? 'asc';
      if (sortOrder === false) continue;
      let sortA = getObjectValueByPath(a[1], sortKey);
      let sortB = getObjectValueByPath(b[1], sortKey);
      let sortARaw = a[0].raw;
      let sortBRaw = b[0].raw;
      if (sortOrder === 'desc') {
        [sortA, sortB] = [sortB, sortA];
        [sortARaw, sortBRaw] = [sortBRaw, sortARaw];
      }
      if (options?.sortRawFunctions?.[sortKey]) {
        const customResult = options.sortRawFunctions[sortKey](sortARaw, sortBRaw);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if (options?.sortFunctions?.[sortKey]) {
        const customResult = options.sortFunctions[sortKey](sortA, sortB);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if (hasCustomResult) continue;

      // Dates should be compared numerically
      if (sortA instanceof Date && sortB instanceof Date) {
        sortA = sortA.getTime();
        sortB = sortB.getTime();
      }
      [sortA, sortB] = [sortA, sortB].map(s => s != null ? s.toString().toLocaleLowerCase() : s);
      if (sortA !== sortB) {
        if (isEmpty(sortA) && isEmpty(sortB)) return 0;
        if (isEmpty(sortA)) return -1;
        if (isEmpty(sortB)) return 1;
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
        return stringCollator.compare(sortA, sortB);
      }
    }
    return 0;
  }).map(_ref => {
    let [item] = _ref;
    return item;
  });
}

// Utilities

// Types

// Composables
const makeDataIteratorItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: 'id'
  },
  itemSelectable: {
    type: [String, Array, Function],
    default: null
  },
  returnObject: Boolean
}, 'DataIterator-items');
function transformItem$1(props, item) {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
  const selectable = getPropertyFromItem(item, props.itemSelectable, true);
  return {
    type: 'item',
    value,
    selectable,
    raw: item
  };
}
function transformItems$1(props, items) {
  const array = [];
  for (const item of items) {
    array.push(transformItem$1(props, item));
  }
  return array;
}
function useDataIteratorItems(props) {
  const items = computed(() => transformItems$1(props, props.items));
  return {
    items
  };
}

// Types

const makeVDataIteratorProps = propsFactory({
  search: String,
  loading: Boolean,
  ...makeComponentProps(),
  ...makeDataIteratorItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeDataTablePaginateProps({
    itemsPerPage: 5
  }),
  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeFilterProps(),
  ...makeTagProps(),
  ...makeTransitionProps({
    transition: {
      component: VFadeTransition,
      hideOnLeave: true
    }
  })
}, 'VDataIterator');
const VDataIterator = genericComponent()({
  name: 'VDataIterator',
  props: makeVDataIteratorProps(),
  emits: {
    'update:modelValue': value => true,
    'update:groupBy': value => true,
    'update:page': value => true,
    'update:itemsPerPage': value => true,
    'update:sortBy': value => true,
    'update:options': value => true,
    'update:expanded': value => true,
    'update:currentItems': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const groupBy = useProxiedModel(props, 'groupBy');
    const search = toRef(() => props.search);
    const {
      items
    } = useDataIteratorItems(props);
    const {
      filteredItems
    } = useFilter(props, items, search, {
      transform: item => item.raw
    });
    const {
      sortBy,
      multiSort,
      mustSort
    } = createSort(props);
    const {
      page,
      itemsPerPage
    } = createPagination(props);
    const {
      toggleSort
    } = provideSort({
      sortBy,
      multiSort,
      mustSort,
      page
    });
    const {
      sortByWithGroups,
      opened,
      extractRows,
      isGroupOpen,
      toggleGroup
    } = provideGroupBy({
      groupBy,
      sortBy
    });
    const {
      sortedItems
    } = useSortedItems(props, filteredItems, sortByWithGroups, {
      transform: item => item.raw
    });
    const {
      flatItems
    } = useGroupedItems(sortedItems, groupBy, opened, false);
    const itemsLength = toRef(() => flatItems.value.length);
    const {
      startIndex,
      stopIndex,
      pageCount,
      prevPage,
      nextPage,
      setItemsPerPage,
      setPage
    } = providePagination({
      page,
      itemsPerPage,
      itemsLength
    });
    const {
      paginatedItems
    } = usePaginatedItems({
      items: flatItems,
      startIndex,
      stopIndex,
      itemsPerPage
    });
    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));
    const {
      isSelected,
      select,
      selectAll,
      toggleSelect
    } = provideSelection(props, {
      allItems: items,
      currentPage: paginatedItemsWithoutGroups
    });
    const {
      isExpanded,
      toggleExpand
    } = provideExpanded(props);
    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search
    });
    const slotProps = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      prevPage,
      nextPage,
      setPage,
      setItemsPerPage,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value,
      itemsCount: filteredItems.value.length,
      groupedItems: paginatedItems.value
    }));
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-data-iterator', {
        'v-data-iterator--loading': props.loading
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.header?.(slotProps.value), createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [props.loading ? createVNode(LoaderSlot, {
          "key": "loader",
          "name": "v-data-iterator",
          "active": true
        }, {
          default: slotProps => slots.loader?.(slotProps)
        }) : createElementVNode("div", {
          "key": "items"
        }, [!paginatedItems.value.length ? slots['no-data']?.() : slots.default?.(slotProps.value)])]
      }), slots.footer?.(slotProps.value)]
    }));
    return {};
  }
});

// Utilities

// Types

function useRefs() {
  const refs = ref([]);
  onBeforeUpdate(() => refs.value = []);
  function updateRef(e, i) {
    refs.value[i] = e;
  }
  return {
    refs,
    updateRef
  };
}

// Types

const makeVPaginationProps = propsFactory({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1
  },
  modelValue: {
    type: Number,
    default: props => props.start
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: val => val % 1 === 0
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: IconValue,
    default: '$first'
  },
  prevIcon: {
    type: IconValue,
    default: '$prev'
  },
  nextIcon: {
    type: IconValue,
    default: '$next'
  },
  lastIcon: {
    type: IconValue,
    default: '$last'
  },
  ariaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.root'
  },
  pageAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.page'
  },
  currentPageAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.currentPage'
  },
  firstAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.first'
  },
  previousAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.previous'
  },
  nextAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.next'
  },
  lastAriaLabel: {
    type: String,
    default: '$vuetify.pagination.ariaLabel.last'
  },
  ellipsis: {
    type: String,
    default: '...'
  },
  showFirstLastPage: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: 'nav'
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: 'text'
  })
}, 'VPagination');
const VPagination = genericComponent()({
  name: 'VPagination',
  props: makeVPaginationProps(),
  emits: {
    'update:modelValue': value => true,
    first: value => true,
    prev: value => true,
    next: value => true,
    last: value => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const page = useProxiedModel(props, 'modelValue');
    const {
      t,
      n
    } = useLocale();
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      width
    } = useDisplay();
    const maxButtons = shallowRef(-1);
    provideDefaults(undefined, {
      scoped: true
    });
    const {
      resizeRef
    } = useResizeObserver(entries => {
      if (!entries.length) return;
      const {
        target,
        contentRect
      } = entries[0];
      const firstItem = target.querySelector('.v-pagination__list > *');
      if (!firstItem) return;
      const totalWidth = contentRect.width;
      const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight) * 2;
      maxButtons.value = getMax(totalWidth, itemWidth);
    });
    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));
    const totalVisible = computed(() => {
      if (props.totalVisible != null) return parseInt(props.totalVisible, 10);else if (maxButtons.value >= 0) return maxButtons.value;
      return getMax(width.value, 58);
    });
    function getMax(totalWidth, itemWidth) {
      const minButtons = props.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
      // Round to two decimal places to avoid floating point errors
      Number(((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2))));
    }
    const range = computed(() => {
      if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return [];
      if (totalVisible.value <= 0) return [];else if (totalVisible.value === 1) return [page.value];
      if (length.value <= totalVisible.value) {
        return createRange(length.value, start.value);
      }
      const even = totalVisible.value % 2 === 0;
      const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
      const left = even ? middle : middle + 1;
      const right = length.value - middle;
      if (left - page.value >= 0) {
        return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
      } else if (page.value - right >= (even ? 1 : 0)) {
        const rangeLength = totalVisible.value - 1;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 2);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    });

    // TODO: 'first' | 'prev' | 'next' | 'last' does not work here?
    function setValue(e, value, event) {
      e.preventDefault();
      page.value = value;
      event && emit(event, value);
    }
    const {
      refs,
      updateRef
    } = useRefs();
    provideDefaults({
      VPaginationBtn: {
        color: toRef(() => props.color),
        border: toRef(() => props.border),
        density: toRef(() => props.density),
        size: toRef(() => props.size),
        variant: toRef(() => props.variant),
        rounded: toRef(() => props.rounded),
        elevation: toRef(() => props.elevation)
      }
    });
    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref = e => updateRef(e, index);
        if (typeof item === 'string') {
          return {
            isActive: false,
            key: `ellipsis-${index}`,
            page: item,
            props: {
              ref,
              ellipsis: true,
              icon: true,
              disabled: true
            }
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            key: item,
            page: n(item),
            props: {
              ref,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || Number(props.length) < 2,
              color: isActive ? props.activeColor : props.color,
              'aria-current': isActive,
              'aria-label': t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
              onClick: e => setValue(e, item)
            }
          };
        }
      });
    });
    const controls = computed(() => {
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
      return {
        first: props.showFirstLastPage ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: e => setValue(e, start.value, 'first'),
          disabled: prevDisabled,
          'aria-label': t(props.firstAriaLabel),
          'aria-disabled': prevDisabled
        } : undefined,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: e => setValue(e, page.value - 1, 'prev'),
          disabled: prevDisabled,
          'aria-label': t(props.previousAriaLabel),
          'aria-disabled': prevDisabled
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: e => setValue(e, page.value + 1, 'next'),
          disabled: nextDisabled,
          'aria-label': t(props.nextAriaLabel),
          'aria-disabled': nextDisabled
        },
        last: props.showFirstLastPage ? {
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: e => setValue(e, start.value + length.value - 1, 'last'),
          disabled: nextDisabled,
          'aria-label': t(props.lastAriaLabel),
          'aria-disabled': nextDisabled
        } : undefined
      };
    });
    function updateFocus() {
      const currentIndex = page.value - start.value;
      refs.value[currentIndex]?.$el.focus();
    }
    function onKeydown(e) {
      if (e.key === keyValues.left && !props.disabled && page.value > Number(props.start)) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": normalizeClass(['v-pagination', themeClasses.value, props.class]),
      "style": normalizeStyle(props.style),
      "role": "navigation",
      "aria-label": t(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [createElementVNode("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && createElementVNode("li", {
        "key": "first",
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.first), null)]), createElementVNode("li", {
        "key": "prev",
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.prev), null)]), items.value.map((item, index) => createElementVNode("li", {
        "key": item.key,
        "class": normalizeClass(['v-pagination__item', {
          'v-pagination__item--is-active': item.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, item.props), {
        default: () => [item.page]
      })])), createElementVNode("li", {
        "key": "next",
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.next), null)]), props.showFirstLastPage && createElementVNode("li", {
        "key": "last",
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.last), null)])])]
    }));
    return {};
  }
});

// Types

const makeVDataTableFooterProps = propsFactory({
  prevIcon: {
    type: IconValue,
    default: '$prev'
  },
  nextIcon: {
    type: IconValue,
    default: '$next'
  },
  firstIcon: {
    type: IconValue,
    default: '$first'
  },
  lastIcon: {
    type: IconValue,
    default: '$last'
  },
  itemsPerPageText: {
    type: String,
    default: '$vuetify.dataFooter.itemsPerPageText'
  },
  pageText: {
    type: String,
    default: '$vuetify.dataFooter.pageText'
  },
  firstPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.firstPage'
  },
  prevPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.prevPage'
  },
  nextPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.nextPage'
  },
  lastPageLabel: {
    type: String,
    default: '$vuetify.dataFooter.lastPage'
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [{
      value: 10,
      title: '10'
    }, {
      value: 25,
      title: '25'
    }, {
      value: 50,
      title: '50'
    }, {
      value: 100,
      title: '100'
    }, {
      value: -1,
      title: '$vuetify.dataFooter.itemsPerPageAll'
    }]
  },
  showCurrentPage: Boolean
}, 'VDataTableFooter');
const VDataTableFooter = genericComponent()({
  name: 'VDataTableFooter',
  props: makeVDataTableFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      page,
      pageCount,
      startIndex,
      stopIndex,
      itemsLength,
      itemsPerPage,
      setItemsPerPage
    } = usePagination();
    const itemsPerPageOptions = computed(() => props.itemsPerPageOptions.map(option => {
      if (typeof option === 'number') {
        return {
          value: option,
          title: option === -1 ? t('$vuetify.dataFooter.itemsPerPageAll') : String(option)
        };
      }
      return {
        ...option,
        title: !isNaN(Number(option.title)) ? option.title : t(option.title)
      };
    }));
    useRender(() => {
      const paginationProps = VPagination.filterProps(props);
      return createElementVNode("div", {
        "class": "v-data-table-footer"
      }, [slots.prepend?.(), createElementVNode("div", {
        "class": "v-data-table-footer__items-per-page"
      }, [createElementVNode("span", {
        "aria-label": t(props.itemsPerPageText)
      }, [t(props.itemsPerPageText)]), createVNode(VSelect, {
        "items": itemsPerPageOptions.value,
        "modelValue": itemsPerPage.value,
        "onUpdate:modelValue": v => setItemsPerPage(Number(v)),
        "density": "compact",
        "variant": "outlined",
        "hideDetails": true
      }, null)]), createElementVNode("div", {
        "class": "v-data-table-footer__info"
      }, [createElementVNode("div", null, [t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value)])]), createElementVNode("div", {
        "class": "v-data-table-footer__pagination"
      }, [createVNode(VPagination, mergeProps({
        "modelValue": page.value,
        "onUpdate:modelValue": $event => page.value = $event,
        "density": "comfortable",
        "firstAriaLabel": props.firstPageLabel,
        "lastAriaLabel": props.lastPageLabel,
        "length": pageCount.value,
        "nextAriaLabel": props.nextPageLabel,
        "previousAriaLabel": props.prevPageLabel,
        "rounded": true,
        "showFirstLastPage": true,
        "totalVisible": props.showCurrentPage ? 1 : 0,
        "variant": "plain"
      }, paginationProps), null)])]);
    });
    return {};
  }
});

// Types

const VDataTableColumn = defineFunctionalComponent({
  align: {
    type: String,
    default: 'start'
  },
  fixed: {
    type: [Boolean, String],
    default: false
  },
  fixedOffset: [Number, String],
  fixedEndOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  firstFixedEnd: Boolean,
  noPadding: Boolean,
  indent: [Number, String],
  empty: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (props, _ref) => {
  let {
    slots
  } = _ref;
  const Tag = props.tag ?? 'td';
  const fixedSide = typeof props.fixed === 'string' ? props.fixed : props.fixed ? 'start' : 'none';
  return createVNode(Tag, {
    "class": normalizeClass(['v-data-table__td', {
      'v-data-table-column--fixed': fixedSide === 'start',
      'v-data-table-column--fixed-end': fixedSide === 'end',
      'v-data-table-column--last-fixed': props.lastFixed,
      'v-data-table-column--first-fixed-end': props.firstFixedEnd,
      'v-data-table-column--no-padding': props.noPadding,
      'v-data-table-column--nowrap': props.nowrap,
      'v-data-table-column--empty': props.empty
    }, `v-data-table-column--align-${props.align}`]),
    "style": {
      height: convertToUnit(props.height),
      width: convertToUnit(props.width),
      maxWidth: convertToUnit(props.maxWidth),
      left: fixedSide === 'start' ? convertToUnit(props.fixedOffset || null) : undefined,
      right: fixedSide === 'end' ? convertToUnit(props.fixedEndOffset || null) : undefined,
      paddingInlineStart: props.indent ? convertToUnit(props.indent) : undefined
    }
  }, {
    default: () => [slots.default?.()]
  });
});

// Utilities

// Types

const makeDataTableHeaderProps = propsFactory({
  headers: Array
}, 'DataTable-header');
const VDataTableHeadersSymbol = Symbol.for('vuetify:data-table-headers');
const defaultHeader = {
  title: '',
  sortable: false
};
const defaultActionHeader = {
  ...defaultHeader,
  width: 48
};
function priorityQueue() {
  let arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const queue = arr.map(element => ({
    element,
    priority: 0
  }));
  return {
    enqueue: (element, priority) => {
      let added = false;
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (item.priority > priority) {
          queue.splice(i, 0, {
            element,
            priority
          });
          added = true;
          break;
        }
      }
      if (!added) queue.push({
        element,
        priority
      });
    },
    size: () => queue.length,
    count: () => {
      let count = 0;
      if (!queue.length) return 0;
      const whole = Math.floor(queue[0].priority);
      for (let i = 0; i < queue.length; i++) {
        if (Math.floor(queue[i].priority) === whole) count += 1;
      }
      return count;
    },
    dequeue: () => {
      return queue.shift();
    }
  };
}
function extractLeaves(item) {
  let columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!item.children) {
    columns.push(item);
  } else {
    for (const child of item.children) {
      extractLeaves(child, columns);
    }
  }
  return columns;
}
function extractKeys(headers) {
  let keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();
  for (const item of headers) {
    if (item.key) keys.add(item.key);
    if (item.children) {
      extractKeys(item.children, keys);
    }
  }
  return keys;
}
function getDefaultItem(item) {
  if (!item.key) return undefined;
  if (item.key === 'data-table-group') return defaultHeader;
  if (['data-table-expand', 'data-table-select'].includes(item.key)) return defaultActionHeader;
  return undefined;
}
function getDepth(item) {
  let depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!item.children) return depth;
  return Math.max(depth, ...item.children.map(child => getDepth(child, depth + 1)));
}
function parseFixedColumns(items) {
  let seenFixed = false;
  function setFixed(item, side) {
    let parentFixedSide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'none';
    if (!item) return;
    if (parentFixedSide !== 'none') {
      item.fixed = parentFixedSide;
    }

    // normalize to simplify logic below
    if (item.fixed === true) {
      item.fixed = 'start';
    }
    if (item.fixed === side) {
      if (item.children) {
        if (side === 'start') {
          for (let i = item.children.length - 1; i >= 0; i--) {
            setFixed(item.children[i], side, side);
          }
        } else {
          for (let i = 0; i < item.children.length; i++) {
            setFixed(item.children[i], side, side);
          }
        }
      } else {
        if (!seenFixed && side === 'start') {
          item.lastFixed = true;
        } else if (!seenFixed && side === 'end') {
          item.firstFixedEnd = true;
        } else if (isNaN(Number(item.width))) {
          consoleError(`Multiple fixed columns should have a static width (key: ${item.key})`);
        } else {
          item.minWidth = Math.max(Number(item.width) || 0, Number(item.minWidth) || 0);
        }
        seenFixed = true;
      }
    } else {
      if (item.children) {
        if (side === 'start') {
          for (let i = item.children.length - 1; i >= 0; i--) {
            setFixed(item.children[i], side);
          }
        } else {
          for (let i = 0; i < item.children.length; i++) {
            setFixed(item.children[i], side);
          }
        }
      } else {
        seenFixed = false;
      }
    }
  }
  for (let i = items.length - 1; i >= 0; i--) {
    setFixed(items[i], 'start');
  }
  for (let i = 0; i < items.length; i++) {
    setFixed(items[i], 'end');
  }
  let fixedOffset = 0;
  for (let i = 0; i < items.length; i++) {
    fixedOffset = setFixedOffset(items[i], fixedOffset);
  }
  let fixedEndOffset = 0;
  for (let i = items.length - 1; i >= 0; i--) {
    fixedEndOffset = setFixedEndOffset(items[i], fixedEndOffset);
  }
}
function setFixedOffset(item) {
  let offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!item) return offset;
  if (item.children) {
    item.fixedOffset = offset;
    for (const child of item.children) {
      offset = setFixedOffset(child, offset);
    }
  } else if (item.fixed && item.fixed !== 'end') {
    item.fixedOffset = offset;
    offset += parseFloat(item.width || '0') || 0;
  }
  return offset;
}
function setFixedEndOffset(item) {
  let offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!item) return offset;
  if (item.children) {
    item.fixedEndOffset = offset;
    for (const child of item.children) {
      offset = setFixedEndOffset(child, offset);
    }
  } else if (item.fixed === 'end') {
    item.fixedEndOffset = offset;
    offset += parseFloat(item.width || '0') || 0;
  }
  return offset;
}
function parse(items, maxDepth) {
  const headers = [];
  let currentDepth = 0;
  const queue = priorityQueue(items);
  while (queue.size() > 0) {
    let rowSize = queue.count();
    const row = [];
    let fraction = 1;
    while (rowSize > 0) {
      const {
        element: item,
        priority
      } = queue.dequeue();
      const diff = maxDepth - currentDepth - getDepth(item);
      row.push({
        ...item,
        rowspan: diff ?? 1,
        colspan: item.children ? extractLeaves(item).length : 1
      });
      if (item.children) {
        for (const child of item.children) {
          // This internally sorts items that are on the same priority "row"
          const sort = priority % 1 + fraction / Math.pow(10, currentDepth + 2);
          queue.enqueue(child, currentDepth + diff + sort);
        }
      }
      fraction += 1;
      rowSize -= 1;
    }
    currentDepth += 1;
    headers.push(row);
  }
  const columns = items.map(item => extractLeaves(item)).flat();
  return {
    columns,
    headers
  };
}
function convertToInternalHeaders(items) {
  const internalHeaders = [];
  for (const item of items) {
    const defaultItem = {
      ...getDefaultItem(item),
      ...item
    };
    const key = defaultItem.key ?? (typeof defaultItem.value === 'string' ? defaultItem.value : null);
    const value = defaultItem.value ?? key ?? null;
    const internalItem = {
      ...defaultItem,
      key,
      value,
      sortable: defaultItem.sortable ?? (defaultItem.key != null || !!defaultItem.sort),
      children: defaultItem.children ? convertToInternalHeaders(defaultItem.children) : undefined
    };
    internalHeaders.push(internalItem);
  }
  return internalHeaders;
}
function createHeaders(props, options) {
  const headers = ref([]);
  const columns = ref([]);
  const sortFunctions = ref({});
  const sortRawFunctions = ref({});
  const filterFunctions = ref({});
  watchEffect(() => {
    const _headers = props.headers || Object.keys(props.items[0] ?? {}).map(key => ({
      key,
      title: capitalize(key)
    }));
    const items = _headers.slice();
    const keys = extractKeys(items);
    if (options?.groupBy?.value.length && !keys.has('data-table-group')) {
      items.unshift({
        key: 'data-table-group',
        title: 'Group'
      });
    }
    if (options?.showSelect?.value && !keys.has('data-table-select')) {
      items.unshift({
        key: 'data-table-select'
      });
    }
    if (options?.showExpand?.value && !keys.has('data-table-expand')) {
      items.push({
        key: 'data-table-expand'
      });
    }
    const internalHeaders = convertToInternalHeaders(items);
    parseFixedColumns(internalHeaders);
    const maxDepth = Math.max(...internalHeaders.map(item => getDepth(item))) + 1;
    const parsed = parse(internalHeaders, maxDepth);
    headers.value = parsed.headers;
    columns.value = parsed.columns;
    const flatHeaders = parsed.headers.flat(1);
    for (const header of flatHeaders) {
      if (!header.key) continue;
      if (header.sortable) {
        if (header.sort) {
          sortFunctions.value[header.key] = header.sort;
        }
        if (header.sortRaw) {
          sortRawFunctions.value[header.key] = header.sortRaw;
        }
      }
      if (header.filter) {
        filterFunctions.value[header.key] = header.filter;
      }
    }
  });
  const data = {
    headers,
    columns,
    sortFunctions,
    sortRawFunctions,
    filterFunctions
  };
  provide(VDataTableHeadersSymbol, data);
  return data;
}
function useHeaders() {
  const data = inject$1(VDataTableHeadersSymbol);
  if (!data) throw new Error('Missing headers!');
  return data;
}

// Types

const makeVDataTableHeadersProps = propsFactory({
  color: String,
  disableSort: Boolean,
  fixedHeader: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: IconValue,
    default: '$sortAsc'
  },
  sortDescIcon: {
    type: IconValue,
    default: '$sortDesc'
  },
  headerProps: {
    type: Object
  },
  /** @deprecated */
  sticky: Boolean,
  ...makeDisplayProps(),
  ...makeLoaderProps()
}, 'VDataTableHeaders');
const VDataTableHeaders = genericComponent()({
  name: 'VDataTableHeaders',
  props: makeVDataTableHeadersProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      someSelected,
      allSelected,
      selectAll,
      showSelectAll
    } = useSelection();
    const {
      columns,
      headers
    } = useHeaders();
    const {
      loaderClasses
    } = useLoader(props);
    function getFixedStyles(column, y) {
      if (!(props.sticky || props.fixedHeader) && !column.fixed) return undefined;
      const fixedSide = typeof column.fixed === 'string' ? column.fixed : column.fixed ? 'start' : 'none';
      return {
        position: 'sticky',
        left: fixedSide === 'start' ? convertToUnit(column.fixedOffset) : undefined,
        right: fixedSide === 'end' ? convertToUnit(column.fixedEndOffset) : undefined,
        top: props.sticky || props.fixedHeader ? `calc(var(--v-table-header-height) * ${y})` : undefined
      };
    }
    function handleEnterKeyPress(event, column) {
      if (event.key === 'Enter' && !props.disableSort) {
        toggleSort(column);
      }
    }
    function getSortIcon(column) {
      const item = sortBy.value.find(item => item.key === column.key);
      if (!item) return props.sortAscIcon;
      return item.order === 'asc' ? props.sortAscIcon : props.sortDescIcon;
    }
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const slotProps = computed(() => ({
      headers: headers.value,
      columns: columns.value,
      toggleSort,
      isSorted,
      sortBy: sortBy.value,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      selectAll,
      getSortIcon
    }));
    const headerCellClasses = computed(() => ['v-data-table__th', {
      'v-data-table__th--sticky': props.sticky || props.fixedHeader
    }, displayClasses.value, loaderClasses.value]);
    const VDataTableHeaderCell = _ref2 => {
      let {
        column,
        x,
        y
      } = _ref2;
      const noPadding = column.key === 'data-table-select' || column.key === 'data-table-expand';
      const isEmpty = column.key === 'data-table-group' && column.width === 0 && !column.title;
      const headerProps = mergeProps(props.headerProps ?? {}, column.headerProps ?? {});
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "align": column.align,
        "class": [{
          'v-data-table__th--sortable': column.sortable && !props.disableSort,
          'v-data-table__th--sorted': isSorted(column),
          'v-data-table__th--fixed': column.fixed
        }, ...headerCellClasses.value],
        "style": {
          width: convertToUnit(column.width),
          minWidth: convertToUnit(column.minWidth),
          maxWidth: convertToUnit(column.maxWidth),
          ...getFixedStyles(column, y)
        },
        "colspan": column.colspan,
        "rowspan": column.rowspan,
        "fixed": column.fixed,
        "nowrap": column.nowrap,
        "lastFixed": column.lastFixed,
        "firstFixedEnd": column.firstFixedEnd,
        "noPadding": noPadding,
        "empty": isEmpty,
        "tabindex": column.sortable ? 0 : undefined,
        "onClick": column.sortable ? () => toggleSort(column) : undefined,
        "onKeydown": column.sortable ? event => handleEnterKeyPress(event, column) : undefined
      }, headerProps), {
        default: () => {
          const columnSlotName = `header.${column.key}`;
          const columnSlotProps = {
            column,
            selectAll,
            isSorted,
            toggleSort,
            sortBy: sortBy.value,
            someSelected: someSelected.value,
            allSelected: allSelected.value,
            getSortIcon
          };
          if (slots[columnSlotName]) return slots[columnSlotName](columnSlotProps);
          if (isEmpty) return '';
          if (column.key === 'data-table-select') {
            return slots['header.data-table-select']?.(columnSlotProps) ?? (showSelectAll.value && createVNode(VCheckboxBtn, {
              "modelValue": allSelected.value,
              "indeterminate": someSelected.value && !allSelected.value,
              "onUpdate:modelValue": selectAll
            }, null));
          }
          return createElementVNode("div", {
            "class": "v-data-table-header__content"
          }, [createElementVNode("span", null, [column.title]), column.sortable && !props.disableSort && createVNode(VIcon, {
            "key": "icon",
            "class": "v-data-table-header__sort-icon",
            "icon": getSortIcon(column)
          }, null), props.multiSort && isSorted(column) && createElementVNode("div", {
            "key": "badge",
            "class": normalizeClass(['v-data-table-header__sort-badge', ...backgroundColorClasses.value]),
            "style": normalizeStyle(backgroundColorStyles.value)
          }, [sortBy.value.findIndex(x => x.key === column.key) + 1])]);
        }
      });
    };
    const VDataTableMobileHeaderCell = () => {
      const displayItems = computed(() => {
        return columns.value.filter(column => column?.sortable && !props.disableSort);
      });
      const appendIcon = computed(() => {
        const showSelectColumn = columns.value.find(column => column.key === 'data-table-select');
        if (showSelectColumn == null) return;
        return allSelected.value ? '$checkboxOn' : someSelected.value ? '$checkboxIndeterminate' : '$checkboxOff';
      });
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "class": [...headerCellClasses.value],
        "colspan": headers.value.length + 1
      }, props.headerProps), {
        default: () => [createElementVNode("div", {
          "class": "v-data-table-header__content"
        }, [createVNode(VSelect, {
          "chips": true,
          "class": "v-data-table__td-sort-select",
          "clearable": true,
          "density": "default",
          "items": displayItems.value,
          "label": t('$vuetify.dataTable.sortBy'),
          "multiple": props.multiSort,
          "variant": "underlined",
          "onClick:clear": () => sortBy.value = [],
          "appendIcon": appendIcon.value,
          "onClick:append": () => selectAll(!allSelected.value)
        }, {
          chip: props => createVNode(VChip, {
            "onClick": props.item.raw?.sortable ? () => toggleSort(props.item.raw) : undefined,
            "onMousedown": e => {
              e.preventDefault();
              e.stopPropagation();
            }
          }, {
            default: () => [props.item.title, createVNode(VIcon, {
              "class": normalizeClass(['v-data-table__td-sort-icon', isSorted(props.item.raw) && 'v-data-table__td-sort-icon-active']),
              "icon": getSortIcon(props.item.raw),
              "size": "small"
            }, null)]
          })
        })])]
      });
    };
    useRender(() => {
      return mobile.value ? createElementVNode("tr", null, [createVNode(VDataTableMobileHeaderCell, null, null)]) : createElementVNode(Fragment, null, [slots.headers ? slots.headers(slotProps.value) : headers.value.map((row, y) => createElementVNode("tr", null, [row.map((column, x) => createVNode(VDataTableHeaderCell, {
        "column": column,
        "x": x,
        "y": y
      }, null))])), props.loading && createElementVNode("tr", {
        "class": "v-data-table-progress"
      }, [createElementVNode("th", {
        "colspan": columns.value.length
      }, [createVNode(LoaderSlot, {
        "name": "v-data-table-progress",
        "absolute": true,
        "active": true,
        "color": typeof props.loading === 'boolean' ? undefined : props.loading,
        "indeterminate": true
      }, {
        default: slots.loader
      })])])]);
    });
  }
});

// Types

const makeVDataTableGroupHeaderRowProps = propsFactory({
  item: {
    type: Object,
    required: true
  },
  groupCollapseIcon: {
    type: IconValue,
    default: '$tableGroupCollapse'
  },
  groupExpandIcon: {
    type: IconValue,
    default: '$tableGroupExpand'
  }
}, 'VDataTableGroupHeaderRow');
const VDataTableGroupHeaderRow = genericComponent()({
  name: 'VDataTableGroupHeaderRow',
  props: makeVDataTableGroupHeaderRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isGroupOpen,
      toggleGroup,
      extractRows
    } = useGroupBy();
    const {
      isSelected,
      isSomeSelected,
      select
    } = useSelection();
    const {
      columns
    } = useHeaders();
    const rows = computed(() => {
      return extractRows([props.item]);
    });
    const colspan = toRef(() => columns.value.length - (columns.value.some(c => c.key === 'data-table-select') ? 1 : 0));
    return () => createElementVNode("tr", {
      "class": "v-data-table-group-header-row",
      "style": {
        '--v-data-table-group-header-row-depth': props.item.depth
      }
    }, [columns.value.map(column => {
      if (column.key === 'data-table-group') {
        const icon = isGroupOpen(props.item) ? props.groupCollapseIcon : props.groupExpandIcon;
        const onClick = () => toggleGroup(props.item);
        return slots['data-table-group']?.({
          item: props.item,
          count: rows.value.length,
          props: {
            icon,
            onClick
          }
        }) ?? createVNode(VDataTableColumn, {
          "class": "v-data-table-group-header-row__column",
          "colspan": colspan.value
        }, {
          default: () => [createVNode(VBtn, {
            "size": "small",
            "variant": "text",
            "icon": icon,
            "onClick": onClick
          }, null), createElementVNode("span", null, [props.item.value]), createElementVNode("span", null, [createTextVNode("("), rows.value.length, createTextVNode(")")])]
        });
      } else if (column.key === 'data-table-select') {
        const modelValue = isSelected(rows.value);
        const indeterminate = isSomeSelected(rows.value) && !modelValue;
        const selectGroup = v => select(rows.value, v);
        return slots['data-table-select']?.({
          props: {
            modelValue,
            indeterminate,
            'onUpdate:modelValue': selectGroup
          }
        }) ?? createVNode(VDataTableColumn, {
          "class": "v-data-table__td--select-row",
          "noPadding": true
        }, {
          default: () => [createVNode(VCheckboxBtn, {
            "modelValue": modelValue,
            "indeterminate": indeterminate,
            "onUpdate:modelValue": selectGroup
          }, null)]
        });
      }
      return '';
    })]);
  }
});

// Types

const makeVDataTableRowProps = propsFactory({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  collapseIcon: {
    type: IconValue,
    default: '$collapse'
  },
  expandIcon: {
    type: IconValue,
    default: '$expand'
  },
  onClick: EventProp(),
  onContextmenu: EventProp(),
  onDblclick: EventProp(),
  ...makeDisplayProps()
}, 'VDataTableRow');
const VDataTableRow = genericComponent()({
  name: 'VDataTableRow',
  props: makeVDataTableRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      displayClasses,
      mobile
    } = useDisplay(props, 'v-data-table__tr');
    const {
      isSelected,
      toggleSelect,
      someSelected,
      allSelected,
      selectAll
    } = useSelection();
    const {
      isExpanded,
      toggleExpand
    } = useExpanded();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      columns
    } = useHeaders();
    useRender(() => createElementVNode("tr", {
      "class": normalizeClass(['v-data-table__tr', {
        'v-data-table__tr--clickable': !!(props.onClick || props.onContextmenu || props.onDblclick)
      }, displayClasses.value]),
      "onClick": props.onClick,
      "onContextmenu": props.onContextmenu,
      "onDblclick": props.onDblclick
    }, [props.item && columns.value.map((column, i) => {
      const item = props.item;
      const slotName = `item.${column.key}`;
      const headerSlotName = `header.${column.key}`;
      const slotProps = {
        index: props.index,
        item: item.raw,
        internalItem: item,
        value: getObjectValueByPath(item.columns, column.key),
        column,
        isSelected,
        toggleSelect,
        isExpanded,
        toggleExpand
      };
      const columnSlotProps = {
        column,
        selectAll,
        isSorted,
        toggleSort,
        sortBy: sortBy.value,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        getSortIcon: () => ''
      };
      const cellProps = typeof props.cellProps === 'function' ? props.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value,
        column
      }) : props.cellProps;
      const columnCellProps = typeof column.cellProps === 'function' ? column.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value
      }) : column.cellProps;
      const noPadding = column.key === 'data-table-select' || column.key === 'data-table-expand';
      const isEmpty = column.key === 'data-table-group' && column.width === 0 && !column.title;
      return createVNode(VDataTableColumn, mergeProps({
        "align": column.align,
        "indent": column.intent,
        "class": {
          'v-data-table__td--expanded-row': column.key === 'data-table-expand',
          'v-data-table__td--select-row': column.key === 'data-table-select'
        },
        "fixed": column.fixed,
        "fixedOffset": column.fixedOffset,
        "fixedEndOffset": column.fixedEndOffset,
        "lastFixed": column.lastFixed,
        "firstFixedEnd": column.firstFixedEnd,
        "maxWidth": !mobile.value ? column.maxWidth : undefined,
        "noPadding": noPadding,
        "empty": isEmpty,
        "nowrap": column.nowrap,
        "width": !mobile.value ? column.width : undefined
      }, cellProps, columnCellProps), {
        default: () => {
          if (column.key === 'data-table-select') {
            return slots['item.data-table-select']?.({
              ...slotProps,
              props: {
                disabled: !item.selectable,
                modelValue: isSelected([item]),
                onClick: withModifiers(() => toggleSelect(item), ['stop'])
              }
            }) ?? createVNode(VCheckboxBtn, {
              "disabled": !item.selectable,
              "modelValue": isSelected([item]),
              "onClick": withModifiers(event => toggleSelect(item, props.index, event), ['stop'])
            }, null);
          }
          if (column.key === 'data-table-expand') {
            return slots['item.data-table-expand']?.({
              ...slotProps,
              props: {
                icon: isExpanded(item) ? props.collapseIcon : props.expandIcon,
                size: 'small',
                variant: 'text',
                onClick: withModifiers(() => toggleExpand(item), ['stop'])
              }
            }) ?? createVNode(VBtn, {
              "icon": isExpanded(item) ? props.collapseIcon : props.expandIcon,
              "size": "small",
              "variant": "text",
              "onClick": withModifiers(() => toggleExpand(item), ['stop'])
            }, null);
          }
          if (slots[slotName] && !mobile.value) return slots[slotName](slotProps);
          const displayValue = toDisplayString(slotProps.value);
          return !mobile.value ? displayValue : createElementVNode(Fragment, null, [createElementVNode("div", {
            "class": "v-data-table__td-title"
          }, [slots[headerSlotName]?.(columnSlotProps) ?? column.title]), createElementVNode("div", {
            "class": "v-data-table__td-value"
          }, [slots[slotName]?.(slotProps) ?? displayValue])]);
        }
      });
    })]));
  }
});

// Types

const makeVDataTableRowsProps = propsFactory({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: '$vuetify.dataIterator.loadingText'
  },
  hideNoData: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  noDataText: {
    type: String,
    default: '$vuetify.noDataText'
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  ...pick(makeVDataTableRowProps(), ['collapseIcon', 'expandIcon']),
  ...pick(makeVDataTableGroupHeaderRowProps(), ['groupCollapseIcon', 'groupExpandIcon']),
  ...makeDisplayProps()
}, 'VDataTableRows');
const VDataTableRows = genericComponent()({
  name: 'VDataTableRows',
  inheritAttrs: false,
  props: makeVDataTableRowsProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      columns
    } = useHeaders();
    const {
      expandOnClick,
      toggleExpand,
      isExpanded
    } = useExpanded();
    const {
      isSelected,
      toggleSelect
    } = useSelection();
    const {
      toggleGroup,
      isGroupOpen
    } = useGroupBy();
    const {
      t
    } = useLocale();
    const {
      mobile
    } = useDisplay(props);
    useRender(() => {
      const groupHeaderRowProps = pick(props, ['groupCollapseIcon', 'groupExpandIcon']);
      if (props.loading && (!props.items.length || slots.loading)) {
        return createElementVNode("tr", {
          "class": "v-data-table-rows-loading",
          "key": "loading"
        }, [createElementVNode("td", {
          "colspan": columns.value.length
        }, [slots.loading?.() ?? t(props.loadingText)])]);
      }
      if (!props.loading && !props.items.length && !props.hideNoData) {
        return createElementVNode("tr", {
          "class": "v-data-table-rows-no-data",
          "key": "no-data"
        }, [createElementVNode("td", {
          "colspan": columns.value.length
        }, [slots['no-data']?.() ?? t(props.noDataText)])]);
      }
      return createElementVNode(Fragment, null, [props.items.map((item, index) => {
        if (item.type === 'group') {
          const slotProps = {
            index,
            item,
            columns: columns.value,
            isExpanded,
            toggleExpand,
            isSelected,
            toggleSelect,
            toggleGroup,
            isGroupOpen
          };
          return slots['group-header'] ? slots['group-header'](slotProps) : createVNode(VDataTableGroupHeaderRow, mergeProps({
            "key": `group-header_${item.id}`,
            "item": item
          }, getPrefixedEventHandlers(attrs, ':group-header', () => slotProps), groupHeaderRowProps), slots);
        }
        if (item.type === 'group-summary') {
          const slotProps = {
            index,
            item,
            columns: columns.value,
            toggleGroup
          };
          return slots['group-summary']?.(slotProps) ?? '';
        }
        const slotProps = {
          index,
          item: item.raw,
          internalItem: item,
          columns: columns.value,
          isExpanded,
          toggleExpand,
          isSelected,
          toggleSelect
        };
        const itemSlotProps = {
          ...slotProps,
          props: mergeProps({
            key: `item_${item.key ?? item.index}`,
            onClick: expandOnClick.value ? () => {
              toggleExpand(item);
            } : undefined,
            index,
            item,
            cellProps: props.cellProps,
            collapseIcon: props.collapseIcon,
            expandIcon: props.expandIcon,
            mobile: mobile.value
          }, getPrefixedEventHandlers(attrs, ':row', () => slotProps), typeof props.rowProps === 'function' ? props.rowProps({
            item: slotProps.item,
            index: slotProps.index,
            internalItem: slotProps.internalItem
          }) : props.rowProps)
        };
        return createElementVNode(Fragment, {
          "key": itemSlotProps.props.key
        }, [slots.item ? slots.item(itemSlotProps) : createVNode(VDataTableRow, itemSlotProps.props, slots), isExpanded(item) && slots['expanded-row']?.(slotProps)]);
      })]);
    });
    return {};
  }
});

const makeVTableProps = propsFactory({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  striped: {
    type: String,
    default: null,
    validator: v => ['even', 'odd'].includes(v)
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, 'VTable');
const VTable = genericComponent()({
  name: 'VTable',
  props: makeVTableProps(),
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    useRender(() => {
      const tableContentDefaults = {
        VCheckboxBtn: {
          density: props.density
        }
      };
      return createVNode(props.tag, {
        "class": normalizeClass(['v-table', {
          'v-table--fixed-height': !!props.height,
          'v-table--fixed-header': props.fixedHeader,
          'v-table--fixed-footer': props.fixedFooter,
          'v-table--has-top': !!slots.top,
          'v-table--has-bottom': !!slots.bottom,
          'v-table--hover': props.hover,
          'v-table--striped-even': props.striped === 'even',
          'v-table--striped-odd': props.striped === 'odd'
        }, themeClasses.value, densityClasses.value, props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [slots.top?.(), createVNode(VDefaultsProvider, {
          "defaults": tableContentDefaults
        }, {
          default: () => [slots.default ? createElementVNode("div", {
            "class": "v-table__wrapper",
            "style": {
              height: convertToUnit(props.height)
            }
          }, [createElementVNode("table", null, [slots.default()])]) : slots.wrapper?.()]
        }), slots.bottom?.()]
      });
    });
    return {};
  }
});

// Utilities

// Types

// Composables
const makeDataTableItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: 'id'
  },
  itemSelectable: {
    type: [String, Array, Function],
    default: null
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  returnObject: Boolean
}, 'DataTable-items');
function transformItem(props, item, index, columns) {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
  const selectable = getPropertyFromItem(item, props.itemSelectable, true);
  const itemColumns = columns.reduce((obj, column) => {
    if (column.key != null) obj[column.key] = getPropertyFromItem(item, column.value);
    return obj;
  }, {});
  return {
    type: 'item',
    key: props.returnObject ? getPropertyFromItem(item, props.itemValue) : value,
    index,
    value,
    selectable,
    columns: itemColumns,
    raw: item
  };
}
function transformItems(props, items, columns) {
  return items.map((item, index) => transformItem(props, item, index, columns));
}
function useDataTableItems(props, columns) {
  const items = computed(() => transformItems(props, props.items, columns.value));
  return {
    items
  };
}

// Types

const makeDataTableProps = propsFactory({
  ...makeVDataTableRowsProps(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeDataTableHeaderProps(),
  ...makeDataTableItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeVDataTableHeadersProps(),
  ...makeVTableProps()
}, 'DataTable');
const makeVDataTableProps = propsFactory({
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeFilterProps(),
  ...makeVDataTableFooterProps()
}, 'VDataTable');
const VDataTable = genericComponent()({
  name: 'VDataTable',
  props: makeVDataTableProps(),
  emits: {
    'update:modelValue': value => true,
    'update:page': value => true,
    'update:itemsPerPage': value => true,
    'update:sortBy': value => true,
    'update:options': value => true,
    'update:groupBy': value => true,
    'update:expanded': value => true,
    'update:currentItems': value => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      groupBy
    } = createGroupBy(props);
    const {
      sortBy,
      multiSort,
      mustSort
    } = createSort(props);
    const {
      page,
      itemsPerPage
    } = createPagination(props);
    const {
      disableSort
    } = toRefs(props);
    const {
      columns,
      headers,
      sortFunctions,
      sortRawFunctions,
      filterFunctions
    } = createHeaders(props, {
      groupBy,
      showSelect: toRef(() => props.showSelect),
      showExpand: toRef(() => props.showExpand)
    });
    const {
      items
    } = useDataTableItems(props, columns);
    const search = toRef(() => props.search);
    const {
      filteredItems
    } = useFilter(props, items, search, {
      transform: item => item.columns,
      customKeyFilter: filterFunctions
    });
    const {
      toggleSort
    } = provideSort({
      sortBy,
      multiSort,
      mustSort,
      page
    });
    const {
      sortByWithGroups,
      opened,
      extractRows,
      isGroupOpen,
      toggleGroup
    } = provideGroupBy({
      groupBy,
      sortBy,
      disableSort
    });
    const {
      sortedItems
    } = useSortedItems(props, filteredItems, sortByWithGroups, {
      transform: item => ({
        ...item.raw,
        ...item.columns
      }),
      sortFunctions,
      sortRawFunctions
    });
    const {
      flatItems
    } = useGroupedItems(sortedItems, groupBy, opened, () => !!slots['group-summary']);
    const itemsLength = computed(() => flatItems.value.length);
    const {
      startIndex,
      stopIndex,
      pageCount,
      setItemsPerPage
    } = providePagination({
      page,
      itemsPerPage,
      itemsLength
    });
    const {
      paginatedItems
    } = usePaginatedItems({
      items: flatItems,
      startIndex,
      stopIndex,
      itemsPerPage
    });
    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));
    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected
    } = provideSelection(props, {
      allItems: items,
      currentPage: paginatedItemsWithoutGroups
    });
    const {
      isExpanded,
      toggleExpand
    } = provideExpanded(props);
    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search
    });
    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(() => props.hideNoData),
        noDataText: toRef(() => props.noDataText),
        loading: toRef(() => props.loading),
        loadingText: toRef(() => props.loadingText)
      }
    });
    const slotProps = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      setItemsPerPage,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value.map(item => item.raw),
      internalItems: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
      columns: columns.value,
      headers: headers.value
    }));
    useRender(() => {
      const dataTableFooterProps = VDataTableFooter.filterProps(props);
      const dataTableHeadersProps = VDataTableHeaders.filterProps(props);
      const dataTableRowsProps = VDataTableRows.filterProps(props);
      const tableProps = VTable.filterProps(props);
      return createVNode(VTable, mergeProps({
        "class": ['v-data-table', {
          'v-data-table--show-select': props.showSelect,
          'v-data-table--loading': props.loading
        }, props.class],
        "style": props.style
      }, tableProps, {
        "fixedHeader": props.fixedHeader || props.sticky
      }), {
        top: () => slots.top?.(slotProps.value),
        default: () => slots.default ? slots.default(slotProps.value) : createElementVNode(Fragment, null, [slots.colgroup?.(slotProps.value), !props.hideDefaultHeader && createElementVNode("thead", {
          "key": "thead"
        }, [createVNode(VDataTableHeaders, dataTableHeadersProps, slots)]), slots.thead?.(slotProps.value), !props.hideDefaultBody && createElementVNode("tbody", null, [slots['body.prepend']?.(slotProps.value), slots.body ? slots.body(slotProps.value) : createVNode(VDataTableRows, mergeProps(attrs, dataTableRowsProps, {
          "items": paginatedItems.value
        }), slots), slots['body.append']?.(slotProps.value)]), slots.tbody?.(slotProps.value), slots.tfoot?.(slotProps.value)]),
        bottom: () => slots.bottom ? slots.bottom(slotProps.value) : !props.hideDefaultFooter && createElementVNode(Fragment, null, [createVNode(VDivider, null, null), createVNode(VDataTableFooter, dataTableFooterProps, {
          prepend: slots['footer.prepend']
        })])
      });
    });
    return {};
  }
});

// Types

const makeVDataTableVirtualProps = propsFactory({
  ...omit(makeDataTableProps(), ['hideDefaultFooter']),
  ...makeDataTableGroupProps(),
  ...makeVirtualProps(),
  ...makeFilterProps()
}, 'VDataTableVirtual');
const VDataTableVirtual = genericComponent()({
  name: 'VDataTableVirtual',
  props: makeVDataTableVirtualProps(),
  emits: {
    'update:modelValue': value => true,
    'update:sortBy': value => true,
    'update:options': value => true,
    'update:groupBy': value => true,
    'update:expanded': value => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      groupBy
    } = createGroupBy(props);
    const {
      sortBy,
      multiSort,
      mustSort
    } = createSort(props);
    const {
      disableSort
    } = toRefs(props);
    const {
      columns,
      headers,
      filterFunctions,
      sortFunctions,
      sortRawFunctions
    } = createHeaders(props, {
      groupBy,
      showSelect: toRef(() => props.showSelect),
      showExpand: toRef(() => props.showExpand)
    });
    const {
      items
    } = useDataTableItems(props, columns);
    const search = toRef(() => props.search);
    const {
      filteredItems
    } = useFilter(props, items, search, {
      transform: item => item.columns,
      customKeyFilter: filterFunctions
    });
    const {
      toggleSort
    } = provideSort({
      sortBy,
      multiSort,
      mustSort
    });
    const {
      sortByWithGroups,
      opened,
      extractRows,
      isGroupOpen,
      toggleGroup
    } = provideGroupBy({
      groupBy,
      sortBy,
      disableSort
    });
    const {
      sortedItems
    } = useSortedItems(props, filteredItems, sortByWithGroups, {
      transform: item => ({
        ...item.raw,
        ...item.columns
      }),
      sortFunctions,
      sortRawFunctions
    });
    const {
      flatItems
    } = useGroupedItems(sortedItems, groupBy, opened, () => !!slots['group-summary']);
    const allItems = computed(() => extractRows(flatItems.value));
    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected
    } = provideSelection(props, {
      allItems,
      currentPage: allItems
    });
    const {
      isExpanded,
      toggleExpand
    } = provideExpanded(props);
    const {
      containerRef,
      markerRef,
      paddingTop,
      paddingBottom,
      computedItems,
      handleItemResize,
      handleScroll,
      handleScrollend,
      calculateVisibleItems,
      scrollToIndex
    } = useVirtual(props, flatItems);
    const displayItems = computed(() => computedItems.value.map(item => item.raw));
    useOptions({
      sortBy,
      page: shallowRef(1),
      itemsPerPage: shallowRef(-1),
      groupBy,
      search
    });
    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(() => props.hideNoData),
        noDataText: toRef(() => props.noDataText),
        loading: toRef(() => props.loading),
        loadingText: toRef(() => props.loadingText)
      }
    });
    const slotProps = computed(() => ({
      sortBy: sortBy.value,
      toggleSort,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: allItems.value.map(item => item.raw),
      internalItems: allItems.value,
      groupedItems: flatItems.value,
      columns: columns.value,
      headers: headers.value
    }));
    useRender(() => {
      const dataTableHeadersProps = VDataTableHeaders.filterProps(props);
      const dataTableRowsProps = VDataTableRows.filterProps(props);
      const tableProps = VTable.filterProps(props);
      return createVNode(VTable, mergeProps({
        "class": ['v-data-table', {
          'v-data-table--loading': props.loading
        }, props.class],
        "style": props.style
      }, tableProps, {
        "fixedHeader": props.fixedHeader || props.sticky
      }), {
        top: () => slots.top?.(slotProps.value),
        wrapper: () => createElementVNode("div", {
          "ref": containerRef,
          "onScrollPassive": handleScroll,
          "onScrollend": handleScrollend,
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [createElementVNode("table", null, [slots.colgroup?.(slotProps.value), !props.hideDefaultHeader && createElementVNode("thead", {
          "key": "thead"
        }, [createVNode(VDataTableHeaders, dataTableHeadersProps, slots)]), slots.thead?.(slotProps.value), !props.hideDefaultBody && createElementVNode("tbody", {
          "key": "tbody"
        }, [createElementVNode("tr", {
          "ref": markerRef,
          "style": {
            height: convertToUnit(paddingTop.value),
            border: 0
          }
        }, [createElementVNode("td", {
          "colspan": columns.value.length,
          "style": {
            height: 0,
            border: 0
          }
        }, null)]), slots['body.prepend']?.(slotProps.value), createVNode(VDataTableRows, mergeProps(attrs, dataTableRowsProps, {
          "items": displayItems.value
        }), {
          ...slots,
          item: itemSlotProps => createVNode(VVirtualScrollItem, {
            "key": itemSlotProps.internalItem.index,
            "renderless": true,
            "onUpdate:height": height => handleItemResize(itemSlotProps.internalItem.index, height)
          }, {
            default: _ref2 => {
              let {
                itemRef
              } = _ref2;
              return slots.item?.({
                ...itemSlotProps,
                itemRef
              }) ?? createVNode(VDataTableRow, mergeProps(itemSlotProps.props, {
                "ref": itemRef,
                "key": itemSlotProps.internalItem.index,
                "index": itemSlotProps.internalItem.index
              }), slots);
            }
          })
        }), slots['body.append']?.(slotProps.value), createElementVNode("tr", {
          "style": {
            height: convertToUnit(paddingBottom.value),
            border: 0
          }
        }, [createElementVNode("td", {
          "colspan": columns.value.length,
          "style": {
            height: 0,
            border: 0
          }
        }, null)])]), slots.tbody?.(slotProps.value), slots.tfoot?.(slotProps.value)])]),
        bottom: () => slots.bottom?.(slotProps.value)
      });
    });
    return {
      calculateVisibleItems,
      scrollToIndex
    };
  }
});

// Types

const makeVDataTableServerProps = propsFactory({
  itemsLength: {
    type: [Number, String],
    required: true
  },
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeVDataTableFooterProps()
}, 'VDataTableServer');
const VDataTableServer = genericComponent()({
  name: 'VDataTableServer',
  props: makeVDataTableServerProps(),
  emits: {
    'update:modelValue': value => true,
    'update:page': page => true,
    'update:itemsPerPage': page => true,
    'update:sortBy': sortBy => true,
    'update:options': options => true,
    'update:expanded': options => true,
    'update:groupBy': value => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      groupBy
    } = createGroupBy(props);
    const {
      sortBy,
      multiSort,
      mustSort
    } = createSort(props);
    const {
      page,
      itemsPerPage
    } = createPagination(props);
    const {
      disableSort
    } = toRefs(props);
    const itemsLength = computed(() => parseInt(props.itemsLength, 10));
    const {
      columns,
      headers
    } = createHeaders(props, {
      groupBy,
      showSelect: toRef(() => props.showSelect),
      showExpand: toRef(() => props.showExpand)
    });
    const {
      items
    } = useDataTableItems(props, columns);
    const {
      toggleSort
    } = provideSort({
      sortBy,
      multiSort,
      mustSort,
      page
    });
    const {
      opened,
      isGroupOpen,
      toggleGroup,
      extractRows
    } = provideGroupBy({
      groupBy,
      sortBy,
      disableSort
    });
    const {
      pageCount,
      setItemsPerPage
    } = providePagination({
      page,
      itemsPerPage,
      itemsLength
    });
    const {
      flatItems
    } = useGroupedItems(items, groupBy, opened, () => !!slots['group-summary']);
    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected
    } = provideSelection(props, {
      allItems: items,
      currentPage: items
    });
    const {
      isExpanded,
      toggleExpand
    } = provideExpanded(props);
    const itemsWithoutGroups = computed(() => extractRows(items.value));
    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search: toRef(() => props.search)
    });
    provide('v-data-table', {
      toggleSort,
      sortBy
    });
    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(() => props.hideNoData),
        noDataText: toRef(() => props.noDataText),
        loading: toRef(() => props.loading),
        loadingText: toRef(() => props.loadingText)
      }
    });
    const slotProps = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      setItemsPerPage,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: itemsWithoutGroups.value.map(item => item.raw),
      internalItems: itemsWithoutGroups.value,
      groupedItems: flatItems.value,
      columns: columns.value,
      headers: headers.value
    }));
    useRender(() => {
      const dataTableFooterProps = VDataTableFooter.filterProps(props);
      const dataTableHeadersProps = VDataTableHeaders.filterProps(props);
      const dataTableRowsProps = VDataTableRows.filterProps(props);
      const tableProps = VTable.filterProps(props);
      return createVNode(VTable, mergeProps({
        "class": ['v-data-table', {
          'v-data-table--loading': props.loading
        }, props.class],
        "style": props.style
      }, tableProps, {
        "fixedHeader": props.fixedHeader || props.sticky
      }), {
        top: () => slots.top?.(slotProps.value),
        default: () => slots.default ? slots.default(slotProps.value) : createElementVNode(Fragment, null, [slots.colgroup?.(slotProps.value), !props.hideDefaultHeader && createElementVNode("thead", {
          "key": "thead",
          "class": "v-data-table__thead",
          "role": "rowgroup"
        }, [createVNode(VDataTableHeaders, dataTableHeadersProps, slots)]), slots.thead?.(slotProps.value), !props.hideDefaultBody && createElementVNode("tbody", {
          "class": "v-data-table__tbody",
          "role": "rowgroup"
        }, [slots['body.prepend']?.(slotProps.value), slots.body ? slots.body(slotProps.value) : createVNode(VDataTableRows, mergeProps(attrs, dataTableRowsProps, {
          "items": flatItems.value
        }), slots), slots['body.append']?.(slotProps.value)]), slots.tbody?.(slotProps.value), slots.tfoot?.(slotProps.value)]),
        bottom: () => slots.bottom ? slots.bottom(slotProps.value) : !props.hideDefaultFooter && createElementVNode(Fragment, null, [createVNode(VDivider, null, null), createVNode(VDataTableFooter, dataTableFooterProps, {
          prepend: slots['footer.prepend']
        })])
      });
    });
  }
});

const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false
  },
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps()
}, 'VContainer');
const VContainer = genericComponent()({
  name: 'VContainer',
  props: makeVContainerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = useRtl();
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-container', {
        'v-container--fluid': props.fluid
      }, rtlClasses.value, props.class]),
      "style": normalizeStyle([dimensionStyles.value, props.style])
    }, slots));
    return {};
  }
});

// Styles

// Types

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();
const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = 'offset' + capitalize(val);
    props[offsetKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    const orderKey = 'order' + capitalize(val);
    props[orderKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const propMap$1 = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};
function breakpointClass$1(type, prop, val) {
  let className = type;
  if (val == null || val === false) {
    return undefined;
  }
  if (prop) {
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  }
  if (type === 'col') {
    className = 'v-' + className;
  }
  // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <v-col sm></v-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.
  if (type === 'col' && (val === '' || val === true)) {
    // .v-col-md
    return className.toLowerCase();
  }
  // .order-md-6
  className += `-${val}`;
  return className.toLowerCase();
}
const ALIGN_SELF_VALUES = ['auto', 'start', 'end', 'center', 'baseline', 'stretch'];
const makeVColProps = propsFactory({
  cols: {
    type: [Boolean, String, Number],
    default: false
  },
  ...breakpointProps,
  offset: {
    type: [String, Number],
    default: null
  },
  ...offsetProps,
  order: {
    type: [String, Number],
    default: null
  },
  ...orderProps,
  alignSelf: {
    type: String,
    default: null,
    validator: str => ALIGN_SELF_VALUES.includes(str)
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VCol');
const VCol = genericComponent()({
  name: 'VCol',
  props: makeVColProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];

      // Loop through `col`, `offset`, `order` breakpoint props
      let type;
      for (type in propMap$1) {
        propMap$1[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass$1(type, prop, value);
          if (className) classList.push(className);
        });
      }
      const hasColClasses = classList.some(className => className.startsWith('v-col-'));
      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        'v-col': !hasColClasses || !props.cols,
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return classList;
    });
    return () => h(props.tag, {
      class: [classes.value, props.class],
      style: props.style
    }, slots.default?.());
  }
});

// Styles

// Types

const ALIGNMENT = ['start', 'end', 'center'];
const SPACE = ['space-between', 'space-around', 'space-evenly'];
function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    const prefixKey = prefix + capitalize(val);
    props[prefixKey] = def();
    return props;
  }, {});
}
const ALIGN_VALUES = [...ALIGNMENT, 'baseline', 'stretch'];
const alignValidator = str => ALIGN_VALUES.includes(str);
const alignProps = makeRowProps('align', () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
const justifyValidator = str => JUSTIFY_VALUES.includes(str);
const justifyProps = makeRowProps('justify', () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, 'stretch'];
const alignContentValidator = str => ALIGN_CONTENT_VALUES.includes(str);
const alignContentProps = makeRowProps('alignContent', () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: 'align',
  justify: 'justify',
  alignContent: 'align-content'
};
function breakpointClass(type, prop, val) {
  let className = classMap[type];
  if (val == null) {
    return undefined;
  }
  if (prop) {
    // alignSm -> Sm
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  }
  // .align-items-sm-center
  className += `-${val}`;
  return className.toLowerCase();
}
const makeVRowProps = propsFactory({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: alignValidator
  },
  ...alignProps,
  justify: {
    type: String,
    default: null,
    validator: justifyValidator
  },
  ...justifyProps,
  alignContent: {
    type: String,
    default: null,
    validator: alignContentValidator
  },
  ...alignContentProps,
  ...makeComponentProps(),
  ...makeTagProps()
}, 'VRow');
const VRow = genericComponent()({
  name: 'VRow',
  props: makeVRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];

      // Loop through `align`, `justify`, `alignContent` breakpoint props
      let type;
      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }
      classList.push({
        'v-row--no-gutters': props.noGutters,
        'v-row--dense': props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => h(props.tag, {
      class: ['v-row', classes.value, props.class],
      style: props.style
    }, slots.default?.());
  }
});

// Styles
const VSpacer = createSimpleFunctional('v-spacer', 'div', 'VSpacer');

// Types

const makeVDatePickerControlsProps = propsFactory({
  active: {
    type: [String, Array],
    default: undefined
  },
  controlHeight: [Number, String],
  disabled: {
    type: [Boolean, String, Array],
    default: null
  },
  nextIcon: {
    type: IconValue,
    default: '$next'
  },
  prevIcon: {
    type: IconValue,
    default: '$prev'
  },
  modeIcon: {
    type: IconValue,
    default: '$subgroup'
  },
  text: String,
  viewMode: {
    type: String,
    default: 'month'
  }
}, 'VDatePickerControls');
const VDatePickerControls = genericComponent()({
  name: 'VDatePickerControls',
  props: makeVDatePickerControlsProps(),
  emits: {
    'click:year': () => true,
    'click:month': () => true,
    'click:prev': () => true,
    'click:next': () => true,
    'click:text': () => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const {
      t
    } = useLocale();
    const disableMonth = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes('text') : !!props.disabled;
    });
    const disableYear = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes('mode') : !!props.disabled;
    });
    const disablePrev = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes('prev') : !!props.disabled;
    });
    const disableNext = computed(() => {
      return Array.isArray(props.disabled) ? props.disabled.includes('next') : !!props.disabled;
    });
    function onClickPrev() {
      emit('click:prev');
    }
    function onClickNext() {
      emit('click:next');
    }
    function onClickYear() {
      emit('click:year');
    }
    function onClickMonth() {
      emit('click:month');
    }
    useRender(() => {
      // TODO: add slot support and scope defaults
      return createElementVNode("div", {
        "class": normalizeClass(['v-date-picker-controls']),
        "style": {
          '--v-date-picker-controls-height': convertToUnit(props.controlHeight)
        }
      }, [createVNode(VBtn, {
        "class": "v-date-picker-controls__month-btn",
        "data-testid": "month-btn",
        "disabled": disableMonth.value,
        "text": props.text,
        "variant": "text",
        "rounded": true,
        "onClick": onClickMonth
      }, null), createVNode(VBtn, {
        "class": "v-date-picker-controls__mode-btn",
        "data-testid": "year-btn",
        "disabled": disableYear.value,
        "density": "comfortable",
        "icon": props.modeIcon,
        "variant": "text",
        "aria-label": t('$vuetify.datePicker.ariaLabel.selectYear'),
        "onClick": onClickYear
      }, null), createVNode(VSpacer, null, null), createElementVNode("div", {
        "class": "v-date-picker-controls__month"
      }, [createVNode(VBtn, {
        "data-testid": "prev-month",
        "disabled": disablePrev.value,
        "density": "comfortable",
        "icon": props.prevIcon,
        "variant": "text",
        "aria-label": t('$vuetify.datePicker.ariaLabel.previousMonth'),
        "onClick": onClickPrev
      }, null), createVNode(VBtn, {
        "data-testid": "next-month",
        "disabled": disableNext.value,
        "icon": props.nextIcon,
        "density": "comfortable",
        "variant": "text",
        "aria-label": t('$vuetify.datePicker.ariaLabel.nextMonth'),
        "onClick": onClickNext
      }, null)])]);
    });
    return {};
  }
});

// Types

const makeVDatePickerHeaderProps = propsFactory({
  appendIcon: IconValue,
  color: String,
  header: String,
  transition: String,
  onClick: EventProp()
}, 'VDatePickerHeader');
const VDatePickerHeader = genericComponent()({
  name: 'VDatePickerHeader',
  props: makeVDatePickerHeaderProps(),
  emits: {
    click: () => true,
    'click:append': () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    function onClick() {
      emit('click');
    }
    function onClickAppend() {
      emit('click:append');
    }
    useRender(() => {
      const hasContent = !!(slots.default || props.header);
      const hasAppend = !!(slots.append || props.appendIcon);
      return createElementVNode("div", {
        "class": normalizeClass(['v-date-picker-header', {
          'v-date-picker-header--clickable': !!props.onClick
        }, backgroundColorClasses.value]),
        "style": normalizeStyle(backgroundColorStyles.value),
        "onClick": onClick
      }, [slots.prepend && createElementVNode("div", {
        "key": "prepend",
        "class": "v-date-picker-header__prepend"
      }, [slots.prepend()]), hasContent && createVNode(MaybeTransition, {
        "key": "content",
        "name": props.transition
      }, {
        default: () => [createElementVNode("div", {
          "key": props.header,
          "class": "v-date-picker-header__content"
        }, [slots.default?.() ?? props.header])]
      }), hasAppend && createElementVNode("div", {
        "class": "v-date-picker-header__append"
      }, [!slots.append ? createVNode(VBtn, {
        "key": "append-btn",
        "icon": props.appendIcon,
        "variant": "text",
        "onClick": onClickAppend
      }, null) : createVNode(VDefaultsProvider, {
        "key": "append-defaults",
        "disabled": !props.appendIcon,
        "defaults": {
          VBtn: {
            icon: props.appendIcon,
            variant: 'text'
          }
        }
      }, {
        default: () => [slots.append?.()]
      })])]);
    });
    return {};
  }
});

// Composables

// Types

// Types

// Composables
const makeCalendarProps = propsFactory({
  allowedDates: [Array, Function],
  disabled: {
    type: Boolean,
    default: null
  },
  displayValue: null,
  modelValue: Array,
  month: [Number, String],
  max: null,
  min: null,
  showAdjacentMonths: Boolean,
  year: [Number, String],
  weekdays: {
    type: Array,
    default: () => [0, 1, 2, 3, 4, 5, 6]
  },
  weeksInMonth: {
    type: String,
    default: 'dynamic'
  },
  firstDayOfWeek: {
    type: [Number, String],
    default: undefined
  },
  firstDayOfYear: {
    type: [Number, String],
    default: undefined
  },
  weekdayFormat: String
}, 'calendar');
function useCalendar(props) {
  const adapter = useDate();
  const model = useProxiedModel(props, 'modelValue', [], v => wrapInArray(v).map(i => adapter.date(i)));
  const displayValue = computed(() => {
    if (props.displayValue) return adapter.date(props.displayValue);
    if (model.value.length > 0) return adapter.date(model.value[0]);
    if (props.min) return adapter.date(props.min);
    if (Array.isArray(props.allowedDates)) return adapter.date(props.allowedDates[0]);
    return adapter.date();
  });
  const year = useProxiedModel(props, 'year', undefined, v => {
    const value = v != null ? Number(v) : adapter.getYear(displayValue.value);
    return adapter.startOfYear(adapter.setYear(adapter.date(), value));
  }, v => adapter.getYear(v));
  const month = useProxiedModel(props, 'month', undefined, v => {
    const value = v != null ? Number(v) : adapter.getMonth(displayValue.value);
    const date = adapter.setYear(adapter.startOfMonth(adapter.date()), adapter.getYear(year.value));
    return adapter.setMonth(date, value);
  }, v => adapter.getMonth(v));
  const weekdayLabels = computed(() => {
    const firstDayOfWeek = adapter.toJsDate(adapter.startOfWeek(adapter.date(), props.firstDayOfWeek)).getDay();
    return adapter.getWeekdays(props.firstDayOfWeek, props.weekdayFormat).filter((_, i) => props.weekdays.includes((i + firstDayOfWeek) % 7));
  });
  const weeksInMonth = computed(() => {
    const weeks = adapter.getWeekArray(month.value, props.firstDayOfWeek);
    const days = weeks.flat();

    // Make sure there's always 6 weeks in month (6 * 7 days)
    // if weeksInMonth is 'static'
    const daysInMonth = 6 * 7;
    if (props.weeksInMonth === 'static' && days.length < daysInMonth) {
      const lastDay = days[days.length - 1];
      let week = [];
      for (let day = 1; day <= daysInMonth - days.length; day++) {
        week.push(adapter.addDays(lastDay, day));
        if (day % 7 === 0) {
          weeks.push(week);
          week = [];
        }
      }
    }
    return weeks;
  });
  function genDays(days, today) {
    return days.filter(date => {
      return props.weekdays.includes(adapter.toJsDate(date).getDay());
    }).map((date, index) => {
      const isoDate = adapter.toISO(date);
      const isAdjacent = !adapter.isSameMonth(date, month.value);
      const isStart = adapter.isSameDay(date, adapter.startOfMonth(month.value));
      const isEnd = adapter.isSameDay(date, adapter.endOfMonth(month.value));
      const isSame = adapter.isSameDay(date, month.value);
      const weekdaysCount = props.weekdays.length;
      return {
        date,
        formatted: adapter.format(date, 'keyboardDate'),
        isAdjacent,
        isDisabled: isDisabled(date),
        isEnd,
        isHidden: isAdjacent && !props.showAdjacentMonths,
        isSame,
        isSelected: model.value.some(value => adapter.isSameDay(date, value)),
        isStart,
        isToday: adapter.isSameDay(date, today),
        isWeekEnd: index % weekdaysCount === weekdaysCount - 1,
        isWeekStart: index % weekdaysCount === 0,
        isoDate,
        localized: adapter.format(date, 'dayOfMonth'),
        month: adapter.getMonth(date),
        year: adapter.getYear(date)
      };
    });
  }
  const daysInWeek = computed(() => {
    const lastDay = adapter.startOfWeek(displayValue.value, props.firstDayOfWeek);
    const week = [];
    for (let day = 0; day <= 6; day++) {
      week.push(adapter.addDays(lastDay, day));
    }
    const today = adapter.date();
    return genDays(week, today);
  });
  const daysInMonth = computed(() => {
    const days = weeksInMonth.value.flat();
    const today = adapter.date();
    return genDays(days, today);
  });
  const weekNumbers = computed(() => {
    return weeksInMonth.value.map(week => {
      return week.length ? adapter.getWeek(week[0], props.firstDayOfWeek, props.firstDayOfYear) : null;
    });
  });
  function isDisabled(value) {
    if (props.disabled) return true;
    const date = adapter.date(value);
    if (props.min && adapter.isBefore(adapter.endOfDay(date), adapter.date(props.min))) return true;
    if (props.max && adapter.isAfter(date, adapter.date(props.max))) return true;
    if (Array.isArray(props.allowedDates) && props.allowedDates.length > 0) {
      return !props.allowedDates.some(d => adapter.isSameDay(adapter.date(d), date));
    }
    if (typeof props.allowedDates === 'function') {
      return !props.allowedDates(date);
    }
    return false;
  }
  return {
    displayValue,
    daysInMonth,
    daysInWeek,
    genDays,
    model,
    weeksInMonth,
    weekdayLabels,
    weekNumbers
  };
}

// Types

const makeVDatePickerMonthProps = propsFactory({
  color: String,
  hideWeekdays: Boolean,
  multiple: [Boolean, Number, String],
  showWeek: Boolean,
  transition: {
    type: String,
    default: 'picker-transition'
  },
  reverseTransition: {
    type: String,
    default: 'picker-reverse-transition'
  },
  ...omit(makeCalendarProps(), ['displayValue'])
}, 'VDatePickerMonth');
const VDatePickerMonth = genericComponent()({
  name: 'VDatePickerMonth',
  props: makeVDatePickerMonthProps(),
  emits: {
    'update:modelValue': date => true,
    'update:month': date => true,
    'update:year': date => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const daysRef = ref();
    const {
      t
    } = useLocale();
    const {
      daysInMonth,
      model,
      weekNumbers,
      weekdayLabels
    } = useCalendar(props);
    const adapter = useDate();
    const rangeStart = shallowRef();
    const rangeStop = shallowRef();
    const isReverse = shallowRef(false);
    const transition = toRef(() => {
      return !isReverse.value ? props.transition : props.reverseTransition;
    });
    if (props.multiple === 'range' && model.value.length > 0) {
      rangeStart.value = model.value[0];
      if (model.value.length > 1) {
        rangeStop.value = model.value[model.value.length - 1];
      }
    }
    const atMax = computed(() => {
      const max = ['number', 'string'].includes(typeof props.multiple) ? Number(props.multiple) : Infinity;
      return model.value.length >= max;
    });
    watch(daysInMonth, (val, oldVal) => {
      if (!oldVal) return;
      isReverse.value = adapter.isBefore(val[0].date, oldVal[0].date);
    });
    function onRangeClick(value) {
      const _value = adapter.startOfDay(value);
      if (model.value.length === 0) {
        rangeStart.value = undefined;
      } else if (model.value.length === 1) {
        rangeStart.value = model.value[0];
        rangeStop.value = undefined;
      }
      if (!rangeStart.value) {
        rangeStart.value = _value;
        model.value = [rangeStart.value];
      } else if (!rangeStop.value) {
        if (adapter.isSameDay(_value, rangeStart.value)) {
          rangeStart.value = undefined;
          model.value = [];
          return;
        } else if (adapter.isBefore(_value, rangeStart.value)) {
          rangeStop.value = adapter.endOfDay(rangeStart.value);
          rangeStart.value = _value;
        } else {
          rangeStop.value = adapter.endOfDay(_value);
        }
        model.value = createDateRange(adapter, rangeStart.value, rangeStop.value);
      } else {
        rangeStart.value = value;
        rangeStop.value = undefined;
        model.value = [rangeStart.value];
      }
    }
    function getDateAriaLabel(item) {
      const fullDate = adapter.format(item.date, 'fullDateWithWeekday');
      const localeKey = item.isToday ? 'currentDate' : 'selectDate';
      return t(`$vuetify.datePicker.ariaLabel.${localeKey}`, fullDate);
    }
    function onMultipleClick(value) {
      const index = model.value.findIndex(selection => adapter.isSameDay(selection, value));
      if (index === -1) {
        model.value = [...model.value, value];
      } else {
        const value = [...model.value];
        value.splice(index, 1);
        model.value = value;
      }
    }
    function onClick(value) {
      if (props.multiple === 'range') {
        onRangeClick(value);
      } else if (props.multiple) {
        onMultipleClick(value);
      } else {
        model.value = [value];
      }
    }
    useRender(() => createElementVNode("div", {
      "class": "v-date-picker-month",
      "style": {
        '--v-date-picker-days-in-week': props.weekdays.length
      }
    }, [props.showWeek && createElementVNode("div", {
      "key": "weeks",
      "class": "v-date-picker-month__weeks"
    }, [!props.hideWeekdays && createElementVNode("div", {
      "key": "hide-week-days",
      "class": "v-date-picker-month__day"
    }, [createTextVNode("\xA0")]), weekNumbers.value.map(week => createElementVNode("div", {
      "class": normalizeClass(['v-date-picker-month__day', 'v-date-picker-month__day--adjacent'])
    }, [week]))]), createVNode(MaybeTransition, {
      "name": transition.value
    }, {
      default: () => [createElementVNode("div", {
        "ref": daysRef,
        "key": daysInMonth.value[0].date?.toString(),
        "class": "v-date-picker-month__days"
      }, [!props.hideWeekdays && weekdayLabels.value.map(weekDay => createElementVNode("div", {
        "class": normalizeClass(['v-date-picker-month__day', 'v-date-picker-month__weekday'])
      }, [weekDay])), daysInMonth.value.map((item, i) => {
        const slotProps = {
          props: {
            class: 'v-date-picker-month__day-btn',
            color: item.isSelected || item.isToday ? props.color : undefined,
            disabled: item.isDisabled,
            icon: true,
            ripple: false,
            text: item.localized,
            variant: item.isSelected ? 'flat' : item.isToday ? 'outlined' : 'text',
            'aria-label': getDateAriaLabel(item),
            'aria-current': item.isToday ? 'date' : undefined,
            onClick: () => onClick(item.date)
          },
          item,
          i
        };
        if (atMax.value && !item.isSelected) {
          item.isDisabled = true;
        }
        return createElementVNode("div", {
          "class": normalizeClass(['v-date-picker-month__day', {
            'v-date-picker-month__day--adjacent': item.isAdjacent,
            'v-date-picker-month__day--hide-adjacent': item.isHidden,
            'v-date-picker-month__day--selected': item.isSelected,
            'v-date-picker-month__day--week-end': item.isWeekEnd,
            'v-date-picker-month__day--week-start': item.isWeekStart
          }]),
          "data-v-date": !item.isDisabled ? item.isoDate : undefined
        }, [(props.showAdjacentMonths || !item.isAdjacent) && (slots.day?.(slotProps) ?? createVNode(VBtn, slotProps.props, null))]);
      })])]
    })]));
  }
});

// Types

const makeVDatePickerMonthsProps = propsFactory({
  color: String,
  height: [String, Number],
  min: null,
  max: null,
  modelValue: Number,
  year: Number,
  allowedMonths: [Array, Function]
}, 'VDatePickerMonths');
const VDatePickerMonths = genericComponent()({
  name: 'VDatePickerMonths',
  props: makeVDatePickerMonthsProps(),
  emits: {
    'update:modelValue': date => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const adapter = useDate();
    const model = useProxiedModel(props, 'modelValue');
    const months = computed(() => {
      let date = adapter.startOfYear(adapter.date());
      if (props.year) {
        date = adapter.setYear(date, props.year);
      }
      return createRange(12).map(i => {
        const text = adapter.format(date, 'monthShort');
        const label = adapter.format(date, 'month');
        const isDisabled = !!(!isMonthAllowed(i) || props.min && adapter.isAfter(adapter.startOfMonth(adapter.date(props.min)), date) || props.max && adapter.isAfter(date, adapter.startOfMonth(adapter.date(props.max))));
        date = adapter.getNextMonth(date);
        return {
          isDisabled,
          text,
          label,
          value: i
        };
      });
    });
    watchEffect(() => {
      model.value = model.value ?? adapter.getMonth(adapter.date());
    });
    function isMonthAllowed(month) {
      if (Array.isArray(props.allowedMonths) && props.allowedMonths.length) {
        return props.allowedMonths.includes(month);
      }
      if (typeof props.allowedMonths === 'function') {
        return props.allowedMonths(month);
      }
      return true;
    }
    useRender(() => createElementVNode("div", {
      "class": "v-date-picker-months",
      "style": {
        height: convertToUnit(props.height)
      }
    }, [createElementVNode("div", {
      "class": "v-date-picker-months__content"
    }, [months.value.map((month, i) => {
      const btnProps = {
        active: model.value === i,
        ariaLabel: month.label,
        color: model.value === i ? props.color : undefined,
        disabled: month.isDisabled,
        rounded: true,
        text: month.text,
        variant: model.value === month.value ? 'flat' : 'text',
        onClick: () => onClick(i)
      };
      function onClick(i) {
        if (model.value === i) {
          emit('update:modelValue', model.value);
          return;
        }
        model.value = i;
      }
      return slots.month?.({
        month,
        i,
        props: btnProps
      }) ?? createVNode(VBtn, mergeProps({
        "key": "month"
      }, btnProps), null);
    })])]));
    return {};
  }
});

// Types

// Types

const makeVDatePickerYearsProps = propsFactory({
  color: String,
  height: [String, Number],
  min: null,
  max: null,
  modelValue: Number,
  allowedYears: [Array, Function]
}, 'VDatePickerYears');
const VDatePickerYears = genericComponent()({
  name: 'VDatePickerYears',
  props: makeVDatePickerYearsProps(),
  directives: {
    vIntersect: Intersect
  },
  emits: {
    'update:modelValue': year => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const adapter = useDate();
    const model = useProxiedModel(props, 'modelValue');
    const years = computed(() => {
      const year = adapter.getYear(adapter.date());
      let min = year - 100;
      let max = year + 52;
      if (props.min) {
        min = adapter.getYear(adapter.date(props.min));
      }
      if (props.max) {
        max = adapter.getYear(adapter.date(props.max));
      }
      let date = adapter.startOfYear(adapter.date());
      date = adapter.setYear(date, min);
      return createRange(max - min + 1, min).map(i => {
        const text = adapter.format(date, 'year');
        date = adapter.setYear(date, adapter.getYear(date) + 1);
        return {
          text,
          value: i,
          isDisabled: !isYearAllowed(i)
        };
      });
    });
    watchEffect(() => {
      model.value = model.value ?? adapter.getYear(adapter.date());
    });
    const yearRef = templateRef();
    function focusSelectedYear() {
      yearRef.el?.focus();
      yearRef.el?.scrollIntoView({
        block: 'center'
      });
    }
    function isYearAllowed(year) {
      if (Array.isArray(props.allowedYears) && props.allowedYears.length) {
        return props.allowedYears.includes(year);
      }
      if (typeof props.allowedYears === 'function') {
        return props.allowedYears(year);
      }
      return true;
    }
    useRender(() => withDirectives(createElementVNode("div", {
      "class": "v-date-picker-years",
      "style": {
        height: convertToUnit(props.height)
      }
    }, [createElementVNode("div", {
      "class": "v-date-picker-years__content"
    }, [years.value.map((year, i) => {
      const btnProps = {
        ref: model.value === year.value ? yearRef : undefined,
        active: model.value === year.value,
        color: model.value === year.value ? props.color : undefined,
        rounded: true,
        text: year.text,
        disabled: year.isDisabled,
        variant: model.value === year.value ? 'flat' : 'text',
        onClick: () => {
          if (model.value === year.value) {
            emit('update:modelValue', model.value);
            return;
          }
          model.value = year.value;
        }
      };
      return slots.year?.({
        year,
        i,
        props: btnProps
      }) ?? createVNode(VBtn, mergeProps({
        "key": "month"
      }, btnProps), null);
    })])]), [[Intersect, {
      handler: focusSelectedYear
    }, null, {
      once: true
    }]]));
    return {};
  }
});

// Types

// Types

const makeVDatePickerProps = propsFactory({
  // TODO: implement in v3.5
  // calendarIcon: {
  //   type: String,
  //   default: '$calendar',
  // },
  // keyboardIcon: {
  //   type: String,
  //   default: '$edit',
  // },
  // inputMode: {
  //   type: String as PropType<'calendar' | 'keyboard'>,
  //   default: 'calendar',
  // },
  // inputText: {
  //   type: String,
  //   default: '$vuetify.datePicker.input.placeholder',
  // },
  // inputPlaceholder: {
  //   type: String,
  //   default: 'dd/mm/yyyy',
  // },
  header: {
    type: String,
    default: '$vuetify.datePicker.header'
  },
  headerColor: String,
  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerMonthProps({
    weeksInMonth: 'static'
  }),
  ...omit(makeVDatePickerMonthsProps(), ['modelValue']),
  ...omit(makeVDatePickerYearsProps(), ['modelValue']),
  ...makeVPickerProps({
    title: '$vuetify.datePicker.title'
  }),
  modelValue: null
}, 'VDatePicker');
const VDatePicker = genericComponent()({
  name: 'VDatePicker',
  props: makeVDatePickerProps(),
  emits: {
    'update:modelValue': date => true,
    'update:month': date => true,
    'update:year': date => true,
    // 'update:inputMode': (date: any) => true,
    'update:viewMode': date => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const adapter = useDate();
    const {
      t
    } = useLocale();
    const {
      rtlClasses
    } = useRtl();
    const model = useProxiedModel(props, 'modelValue', undefined, v => wrapInArray(v).map(i => adapter.date(i)), v => props.multiple ? v : v[0]);
    const viewMode = useProxiedModel(props, 'viewMode');
    // const inputMode = useProxiedModel(props, 'inputMode')

    const minDate = computed(() => {
      const date = adapter.date(props.min);
      return props.min && adapter.isValid(date) ? date : null;
    });
    const maxDate = computed(() => {
      const date = adapter.date(props.max);
      return props.max && adapter.isValid(date) ? date : null;
    });
    const internal = computed(() => {
      const today = adapter.date();
      let value = today;
      if (model.value?.[0]) {
        value = adapter.date(model.value[0]);
      } else if (minDate.value && adapter.isBefore(today, minDate.value)) {
        value = minDate.value;
      } else if (maxDate.value && adapter.isAfter(today, maxDate.value)) {
        value = maxDate.value;
      }
      return value && adapter.isValid(value) ? value : today;
    });
    const headerColor = toRef(() => props.headerColor ?? props.color);
    const _month = useProxiedModel(props, 'month');
    const month = computed({
      get: () => Number(_month.value ?? adapter.getMonth(adapter.startOfMonth(internal.value))),
      set: v => _month.value = v
    });
    const _year = useProxiedModel(props, 'year');
    const year = computed({
      get: () => Number(_year.value ?? adapter.getYear(adapter.startOfYear(adapter.setMonth(internal.value, month.value)))),
      set: v => _year.value = v
    });
    const isReversing = shallowRef(false);
    const header = computed(() => {
      if (props.multiple && model.value.length > 1) {
        return t('$vuetify.datePicker.itemsSelected', model.value.length);
      }
      return model.value[0] && adapter.isValid(model.value[0]) ? adapter.format(adapter.date(model.value[0]), 'normalDateWithWeekday') : t(props.header);
    });
    const text = computed(() => {
      let date = adapter.date();
      date = adapter.setDate(date, 1);
      date = adapter.setMonth(date, month.value);
      date = adapter.setYear(date, year.value);
      return adapter.format(date, 'monthAndYear');
    });
    // const headerIcon = toRef(() => props.inputMode === 'calendar' ? props.keyboardIcon : props.calendarIcon)
    const headerTransition = toRef(() => `date-picker-header${isReversing.value ? '-reverse' : ''}-transition`);
    const disabled = computed(() => {
      if (props.disabled) return true;
      const targets = [];
      if (viewMode.value !== 'month') {
        targets.push(...['prev', 'next']);
      } else {
        let _date = adapter.date();
        _date = adapter.startOfMonth(_date);
        _date = adapter.setMonth(_date, month.value);
        _date = adapter.setYear(_date, year.value);
        if (minDate.value) {
          const date = adapter.addDays(adapter.startOfMonth(_date), -1);
          adapter.isAfter(minDate.value, date) && targets.push('prev');
        }
        if (maxDate.value) {
          const date = adapter.addDays(adapter.endOfMonth(_date), 1);
          adapter.isAfter(date, maxDate.value) && targets.push('next');
        }
      }
      return targets;
    });
    const allowedYears = computed(() => {
      return props.allowedYears || isYearAllowed;
    });
    const allowedMonths = computed(() => {
      return props.allowedMonths || isMonthAllowed;
    });
    function isAllowedInRange(start, end) {
      const allowedDates = props.allowedDates;
      if (typeof allowedDates !== 'function') return true;
      const days = adapter.getDiff(end, start, 'days');
      for (let i = 0; i < days; i++) {
        if (allowedDates(adapter.addDays(start, i))) return true;
      }
      return false;
    }
    function isYearAllowed(year) {
      if (typeof props.allowedDates === 'function') {
        const startOfYear = adapter.parseISO(`${year}-01-01`);
        return isAllowedInRange(startOfYear, adapter.endOfYear(startOfYear));
      }
      if (Array.isArray(props.allowedDates) && props.allowedDates.length) {
        for (const date of props.allowedDates) {
          if (adapter.getYear(adapter.date(date)) === year) return true;
        }
        return false;
      }
      return true;
    }
    function isMonthAllowed(month) {
      if (typeof props.allowedDates === 'function') {
        const monthTwoDigits = String(month + 1).padStart(2, '0');
        const startOfMonth = adapter.parseISO(`${year.value}-${monthTwoDigits}-01`);
        return isAllowedInRange(startOfMonth, adapter.endOfMonth(startOfMonth));
      }
      if (Array.isArray(props.allowedDates) && props.allowedDates.length) {
        for (const date of props.allowedDates) {
          if (adapter.getYear(adapter.date(date)) === year.value && adapter.getMonth(adapter.date(date)) === month) return true;
        }
        return false;
      }
      return true;
    }

    // function onClickAppend () {
    //   inputMode.value = inputMode.value === 'calendar' ? 'keyboard' : 'calendar'
    // }

    function onClickNext() {
      if (month.value < 11) {
        month.value++;
      } else {
        year.value++;
        month.value = 0;
        onUpdateYear();
      }
      onUpdateMonth();
    }
    function onClickPrev() {
      if (month.value > 0) {
        month.value--;
      } else {
        year.value--;
        month.value = 11;
        onUpdateYear();
      }
      onUpdateMonth();
    }
    function onClickDate() {
      viewMode.value = 'month';
    }
    function onClickMonth() {
      viewMode.value = viewMode.value === 'months' ? 'month' : 'months';
    }
    function onClickYear() {
      viewMode.value = viewMode.value === 'year' ? 'month' : 'year';
    }
    function onUpdateMonth() {
      if (viewMode.value === 'months') onClickMonth();
    }
    function onUpdateYear() {
      if (viewMode.value === 'year') onClickYear();
    }
    watch(model, (val, oldVal) => {
      const arrBefore = wrapInArray(oldVal);
      const arrAfter = wrapInArray(val);
      if (!arrAfter.length) return;
      const before = adapter.date(arrBefore[arrBefore.length - 1]);
      const after = adapter.date(arrAfter[arrAfter.length - 1]);
      const newMonth = adapter.getMonth(after);
      const newYear = adapter.getYear(after);
      if (newMonth !== month.value) {
        month.value = newMonth;
        onUpdateMonth();
      }
      if (newYear !== year.value) {
        year.value = newYear;
        onUpdateYear();
      }
      isReversing.value = adapter.isBefore(before, after);
    });
    useRender(() => {
      const pickerProps = VPicker.filterProps(props);
      const datePickerControlsProps = VDatePickerControls.filterProps(props);
      const datePickerHeaderProps = VDatePickerHeader.filterProps(props);
      const datePickerMonthProps = VDatePickerMonth.filterProps(props);
      const datePickerMonthsProps = omit(VDatePickerMonths.filterProps(props), ['modelValue']);
      const datePickerYearsProps = omit(VDatePickerYears.filterProps(props), ['modelValue']);
      const headerProps = {
        color: headerColor.value,
        header: header.value,
        transition: headerTransition.value
      };
      return createVNode(VPicker, mergeProps(pickerProps, {
        "color": headerColor.value,
        "class": ['v-date-picker', `v-date-picker--${viewMode.value}`, {
          'v-date-picker--show-week': props.showWeek
        }, rtlClasses.value, props.class],
        "style": props.style
      }), {
        title: () => slots.title?.() ?? createElementVNode("div", {
          "class": "v-date-picker__title"
        }, [t(props.title)]),
        header: () => slots.header ? createVNode(VDefaultsProvider, {
          "defaults": {
            VDatePickerHeader: {
              ...headerProps
            }
          }
        }, {
          default: () => [slots.header?.(headerProps)]
        }) : createVNode(VDatePickerHeader, mergeProps({
          "key": "header"
        }, datePickerHeaderProps, headerProps, {
          "onClick": viewMode.value !== 'month' ? onClickDate : undefined
        }), {
          prepend: slots.prepend,
          append: slots.append
        }),
        default: () => createElementVNode(Fragment, null, [createVNode(VDatePickerControls, mergeProps(datePickerControlsProps, {
          "disabled": disabled.value,
          "text": text.value,
          "onClick:next": onClickNext,
          "onClick:prev": onClickPrev,
          "onClick:month": onClickMonth,
          "onClick:year": onClickYear
        }), null), createVNode(VFadeTransition, {
          "hideOnLeave": true
        }, {
          default: () => [viewMode.value === 'months' ? createVNode(VDatePickerMonths, mergeProps({
            "key": "date-picker-months"
          }, datePickerMonthsProps, {
            "modelValue": month.value,
            "onUpdate:modelValue": [$event => month.value = $event, onUpdateMonth],
            "min": minDate.value,
            "max": maxDate.value,
            "year": year.value,
            "allowedMonths": allowedMonths.value
          }), {
            month: slots.month
          }) : viewMode.value === 'year' ? createVNode(VDatePickerYears, mergeProps({
            "key": "date-picker-years"
          }, datePickerYearsProps, {
            "modelValue": year.value,
            "onUpdate:modelValue": [$event => year.value = $event, onUpdateYear],
            "min": minDate.value,
            "max": maxDate.value,
            "allowedYears": allowedYears.value
          }), {
            year: slots.year
          }) : createVNode(VDatePickerMonth, mergeProps({
            "key": "date-picker-month"
          }, datePickerMonthProps, {
            "modelValue": model.value,
            "onUpdate:modelValue": $event => model.value = $event,
            "month": month.value,
            "onUpdate:month": [$event => month.value = $event, onUpdateMonth],
            "year": year.value,
            "onUpdate:year": [$event => year.value = $event, onUpdateYear],
            "min": minDate.value,
            "max": maxDate.value
          }), {
            day: slots.day
          })]
        })]),
        actions: slots.actions
      });
    });
    return {};
  }
});

// Types

// Types

const makeVEmptyStateProps = propsFactory({
  actionText: String,
  bgColor: String,
  color: String,
  icon: IconValue,
  image: String,
  justify: {
    type: String,
    default: 'center'
  },
  headline: String,
  title: String,
  text: String,
  textWidth: {
    type: [Number, String],
    default: 500
  },
  href: String,
  to: String,
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeSizeProps({
    size: undefined
  }),
  ...makeThemeProps()
}, 'VEmptyState');
const VEmptyState = genericComponent()({
  name: 'VEmptyState',
  props: makeVEmptyStateProps(),
  emits: {
    'click:action': e => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      displayClasses
    } = useDisplay();
    function onClickAction(e) {
      emit('click:action', e);
    }
    useRender(() => {
      const hasActions = !!(slots.actions || props.actionText);
      const hasHeadline = !!(slots.headline || props.headline);
      const hasTitle = !!(slots.title || props.title);
      const hasText = !!(slots.text || props.text);
      const hasMedia = !!(slots.media || props.image || props.icon);
      const size = props.size || (props.image ? 200 : 96);
      return createElementVNode("div", {
        "class": normalizeClass(['v-empty-state', {
          [`v-empty-state--${props.justify}`]: true
        }, themeClasses.value, backgroundColorClasses.value, displayClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, props.style])
      }, [hasMedia && createElementVNode("div", {
        "key": "media",
        "class": "v-empty-state__media"
      }, [!slots.media ? createElementVNode(Fragment, null, [props.image ? createVNode(VImg, {
        "key": "image",
        "src": props.image,
        "height": size
      }, null) : props.icon ? createVNode(VIcon, {
        "key": "icon",
        "color": props.color,
        "size": size,
        "icon": props.icon
      }, null) : undefined]) : createVNode(VDefaultsProvider, {
        "key": "media-defaults",
        "defaults": {
          VImg: {
            src: props.image,
            height: size
          },
          VIcon: {
            size,
            icon: props.icon
          }
        }
      }, {
        default: () => [slots.media()]
      })]), hasHeadline && createElementVNode("div", {
        "key": "headline",
        "class": "v-empty-state__headline"
      }, [slots.headline?.() ?? props.headline]), hasTitle && createElementVNode("div", {
        "key": "title",
        "class": "v-empty-state__title"
      }, [slots.title?.() ?? props.title]), hasText && createElementVNode("div", {
        "key": "text",
        "class": "v-empty-state__text",
        "style": {
          maxWidth: convertToUnit(props.textWidth)
        }
      }, [slots.text?.() ?? props.text]), slots.default && createElementVNode("div", {
        "key": "content",
        "class": "v-empty-state__content"
      }, [slots.default()]), hasActions && createElementVNode("div", {
        "key": "actions",
        "class": "v-empty-state__actions"
      }, [createVNode(VDefaultsProvider, {
        "defaults": {
          VBtn: {
            class: 'v-empty-state__action-btn',
            color: props.color ?? 'surface-variant',
            href: props.href,
            text: props.actionText,
            to: props.to
          }
        }
      }, {
        default: () => [slots.actions?.({
          props: {
            onClick: onClickAction
          }
        }) ?? createVNode(VBtn, {
          "onClick": onClickAction
        }, null)]
      })])]);
    });
    return {};
  }
});

// Types

const VExpansionPanelSymbol = Symbol.for('vuetify:v-expansion-panel');

const makeVExpansionPanelTextProps = propsFactory({
  ...makeComponentProps(),
  ...makeLazyProps()
}, 'VExpansionPanelText');
const VExpansionPanelText = genericComponent()({
  name: 'VExpansionPanelText',
  props: makeVExpansionPanelTextProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject$1(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel');
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, expansionPanel.isSelected);
    useRender(() => createVNode(VExpandTransition, {
      "onAfterLeave": onAfterLeave
    }, {
      default: () => [withDirectives(createElementVNode("div", {
        "class": normalizeClass(['v-expansion-panel-text', props.class]),
        "style": normalizeStyle(props.style)
      }, [slots.default && hasContent.value && createElementVNode("div", {
        "class": "v-expansion-panel-text__wrapper"
      }, [slots.default?.()])]), [[vShow, expansionPanel.isSelected.value]])]
    }));
    return {};
  }
});

// Types

const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: IconValue,
    default: '$expand'
  },
  collapseIcon: {
    type: IconValue,
    default: '$collapse'
  },
  hideActions: Boolean,
  focusable: Boolean,
  static: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false
  },
  readonly: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, 'VExpansionPanelTitle');
const VExpansionPanelTitle = genericComponent()({
  name: 'VExpansionPanelTitle',
  directives: {
    vRipple: Ripple
  },
  props: makeVExpansionPanelTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject$1(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel');
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      dimensionStyles
    } = useDimension(props);
    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly
    }));
    const icon = toRef(() => expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon);
    useRender(() => withDirectives(createElementVNode("button", {
      "class": normalizeClass(['v-expansion-panel-title', {
        'v-expansion-panel-title--active': expansionPanel.isSelected.value,
        'v-expansion-panel-title--focusable': props.focusable,
        'v-expansion-panel-title--static': props.static
      }, backgroundColorClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, props.style]),
      "type": "button",
      "tabindex": expansionPanel.disabled.value ? -1 : undefined,
      "disabled": expansionPanel.disabled.value,
      "aria-expanded": expansionPanel.isSelected.value,
      "onClick": !props.readonly ? expansionPanel.toggle : undefined
    }, [createElementVNode("span", {
      "class": "v-expansion-panel-title__overlay"
    }, null), slots.default?.(slotProps.value), !props.hideActions && createVNode(VDefaultsProvider, {
      "defaults": {
        VIcon: {
          icon: icon.value
        }
      }
    }, {
      default: () => [createElementVNode("span", {
        "class": "v-expansion-panel-title__icon"
      }, [slots.actions?.(slotProps.value) ?? createVNode(VIcon, null, null)])]
    })]), [[Ripple, props.ripple]]));
    return {};
  }
});

const makeVExpansionPanelProps = propsFactory({
  title: String,
  text: String,
  bgColor: String,
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeVExpansionPanelTitleProps(),
  ...makeVExpansionPanelTextProps()
}, 'VExpansionPanel');
const VExpansionPanel = genericComponent()({
  name: 'VExpansionPanel',
  props: makeVExpansionPanelProps(),
  emits: {
    'group:selected': val => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const groupItem = useGroupItem(props, VExpansionPanelSymbol);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const isDisabled = toRef(() => groupItem?.disabled.value || props.disabled);
    const selectedIndices = computed(() => groupItem.group.items.value.reduce((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id)) arr.push(index);
      return arr;
    }, []));
    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some(selectedIndex => selectedIndex - index === 1);
    });
    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some(selectedIndex => selectedIndex - index === -1);
    });
    provide(VExpansionPanelSymbol, groupItem);
    useRender(() => {
      const hasText = !!(slots.text || props.text);
      const hasTitle = !!(slots.title || props.title);
      const expansionPanelTitleProps = VExpansionPanelTitle.filterProps(props);
      const expansionPanelTextProps = VExpansionPanelText.filterProps(props);
      return createVNode(props.tag, {
        "class": normalizeClass(['v-expansion-panel', {
          'v-expansion-panel--active': groupItem.isSelected.value,
          'v-expansion-panel--before-active': isBeforeSelected.value,
          'v-expansion-panel--after-active': isAfterSelected.value,
          'v-expansion-panel--disabled': isDisabled.value
        }, roundedClasses.value, backgroundColorClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, props.style])
      }, {
        default: () => [createElementVNode("div", {
          "class": normalizeClass(['v-expansion-panel__shadow', ...elevationClasses.value])
        }, null), createVNode(VDefaultsProvider, {
          "defaults": {
            VExpansionPanelTitle: {
              ...expansionPanelTitleProps
            },
            VExpansionPanelText: {
              ...expansionPanelTextProps
            }
          }
        }, {
          default: () => [hasTitle && createVNode(VExpansionPanelTitle, {
            "key": "title"
          }, {
            default: () => [slots.title ? slots.title() : props.title]
          }), hasText && createVNode(VExpansionPanelText, {
            "key": "text"
          }, {
            default: () => [slots.text ? slots.text() : props.text]
          }), slots.default?.()]
        })]
      });
    });
    return {
      groupItem
    };
  }
});

// Types

const allowedVariants = ['default', 'accordion', 'inset', 'popout'];
const makeVExpansionPanelsProps = propsFactory({
  flat: Boolean,
  ...makeGroupProps(),
  ...pick(makeVExpansionPanelProps(), ['bgColor', 'collapseIcon', 'color', 'eager', 'elevation', 'expandIcon', 'focusable', 'hideActions', 'readonly', 'ripple', 'rounded', 'tile', 'static']),
  ...makeThemeProps(),
  ...makeComponentProps(),
  ...makeTagProps(),
  variant: {
    type: String,
    default: 'default',
    validator: v => allowedVariants.includes(v)
  }
}, 'VExpansionPanels');
const VExpansionPanels = genericComponent()({
  name: 'VExpansionPanels',
  props: makeVExpansionPanelsProps(),
  emits: {
    'update:modelValue': val => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      next,
      prev
    } = useGroup(props, VExpansionPanelSymbol);
    const {
      themeClasses
    } = provideTheme(props);
    const variantClass = toRef(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    provideDefaults({
      VExpansionPanel: {
        bgColor: toRef(() => props.bgColor),
        collapseIcon: toRef(() => props.collapseIcon),
        color: toRef(() => props.color),
        eager: toRef(() => props.eager),
        elevation: toRef(() => props.elevation),
        expandIcon: toRef(() => props.expandIcon),
        focusable: toRef(() => props.focusable),
        hideActions: toRef(() => props.hideActions),
        readonly: toRef(() => props.readonly),
        ripple: toRef(() => props.ripple),
        rounded: toRef(() => props.rounded),
        static: toRef(() => props.static)
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-expansion-panels', {
        'v-expansion-panels--flat': props.flat,
        'v-expansion-panels--tile': props.tile
      }, themeClasses.value, variantClass.value, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.default?.({
        prev,
        next
      })]
    }));
    return {
      next,
      prev
    };
  }
});

// Types

const makeVFabProps = propsFactory({
  app: Boolean,
  appear: Boolean,
  extended: Boolean,
  layout: Boolean,
  offset: Boolean,
  modelValue: {
    type: Boolean,
    default: true
  },
  ...omit(makeVBtnProps({
    active: true
  }), ['location', 'spaced']),
  ...makeLayoutItemProps(),
  ...makeLocationProps(),
  ...makeTransitionProps({
    transition: 'fab-transition'
  })
}, 'VFab');
const VFab = genericComponent()({
  name: 'VFab',
  props: makeVFabProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const height = shallowRef(56);
    const layoutItemStyles = ref();
    const {
      resizeRef
    } = useResizeObserver(entries => {
      if (!entries.length) return;
      height.value = entries[0].target.clientHeight;
    });
    const hasPosition = toRef(() => props.app || props.absolute);
    const position = computed(() => {
      if (!hasPosition.value) return false;
      return props.location?.split(' ').shift() ?? 'bottom';
    });
    const orientation = computed(() => {
      if (!hasPosition.value) return false;
      return props.location?.split(' ')[1] ?? 'end';
    });
    useToggleScope(() => props.app, () => {
      const layout = useLayoutItem({
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position,
        layoutSize: computed(() => props.layout ? height.value + 24 : 0),
        elementSize: computed(() => height.value + 24),
        active: computed(() => props.app && model.value),
        absolute: toRef(() => props.absolute)
      });
      watchEffect(() => {
        layoutItemStyles.value = layout.layoutItemStyles.value;
      });
    });
    const vFabRef = ref();
    useRender(() => {
      const btnProps = VBtn.filterProps(props);
      return createElementVNode("div", {
        "ref": vFabRef,
        "class": normalizeClass(['v-fab', {
          'v-fab--absolute': props.absolute,
          'v-fab--app': !!props.app,
          'v-fab--extended': props.extended,
          'v-fab--offset': props.offset,
          [`v-fab--${position.value}`]: hasPosition.value,
          [`v-fab--${orientation.value}`]: hasPosition.value
        }, props.class]),
        "style": normalizeStyle([props.app ? {
          ...layoutItemStyles.value
        } : {
          height: props.absolute ? '100%' : 'inherit'
        }, props.style])
      }, [createElementVNode("div", {
        "class": "v-fab__container"
      }, [createVNode(MaybeTransition, {
        "appear": props.appear,
        "transition": props.transition
      }, {
        default: () => [withDirectives(createVNode(VBtn, mergeProps({
          "ref": resizeRef
        }, btnProps, {
          "active": undefined,
          "location": undefined
        }), slots), [[vShow, props.active]])]
      })])]);
    });
    return {};
  }
});

// Types

function useFileDrop() {
  function hasFilesOrFolders(e) {
    const entries = [...(e.dataTransfer?.items ?? [])].filter(x => x.kind === 'file').map(x => x.webkitGetAsEntry()).filter(Boolean);
    return entries.length > 0 || [...(e.dataTransfer?.files ?? [])].length > 0;
  }
  async function handleDrop(e) {
    const result = [];
    const entries = [...(e.dataTransfer?.items ?? [])].filter(x => x.kind === 'file').map(x => x.webkitGetAsEntry()).filter(Boolean);
    if (entries.length) {
      for (const entry of entries) {
        const files = await traverseFileTree(entry, appendIfDirectory('.', entry));
        result.push(...files.map(x => x.file));
      }
    } else {
      result.push(...[...(e.dataTransfer?.files ?? [])]);
    }
    return result;
  }
  return {
    handleDrop,
    hasFilesOrFolders
  };
}
function traverseFileTree(item) {
  let path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return new Promise((resolve, reject) => {
    if (item.isFile) {
      const fileEntry = item;
      fileEntry.file(file => resolve([{
        file,
        path
      }]), reject);
    } else if (item.isDirectory) {
      const directoryReader = item.createReader();
      directoryReader.readEntries(async entries => {
        const files = [];
        for (const entry of entries) {
          files.push(...(await traverseFileTree(entry, appendIfDirectory(path, entry))));
        }
        resolve(files);
      });
    }
  });
}
function appendIfDirectory(path, item) {
  return item.isDirectory ? `${path}/${item.name}` : path;
}

// Utilities
// Composables
const makeFileFilterProps = propsFactory({
  filterByType: String
}, 'file-accept');
function useFileFilter(props) {
  const fileFilter = computed(() => props.filterByType ? createFilter(props.filterByType) : null);
  function filterAccepted(files) {
    if (fileFilter.value) {
      const accepted = files.filter(fileFilter.value);
      return {
        accepted,
        rejected: files.filter(f => !accepted.includes(f))
      };
    }
    return {
      accepted: files,
      rejected: []
    };
  }
  return {
    filterAccepted
  };
}
function createFilter(v) {
  const types = v.split(',').map(x => x.trim().toLowerCase());
  const extensionsToMatch = types.filter(x => x.startsWith('.'));
  const wildcards = types.filter(x => x.endsWith('/*'));
  const typesToMatch = types.filter(x => !extensionsToMatch.includes(x) && !wildcards.includes(x));
  return file => {
    const extension = file.name.split('.').at(-1)?.toLowerCase() ?? '';
    const typeGroup = file.type.split('/').at(0)?.toLowerCase() ?? '';
    return typesToMatch.includes(file.type) || extensionsToMatch.includes(`.${extension}`) || wildcards.includes(`${typeGroup}/*`);
  };
}

// Types

const makeVFileInputProps = propsFactory({
  chips: Boolean,
  counter: Boolean,
  counterSizeString: {
    type: String,
    default: '$vuetify.fileInput.counterSize'
  },
  counterString: {
    type: String,
    default: '$vuetify.fileInput.counter'
  },
  hideInput: Boolean,
  multiple: Boolean,
  showSize: {
    type: [Boolean, Number, String],
    default: false,
    validator: v => {
      return typeof v === 'boolean' || [1000, 1024].includes(Number(v));
    }
  },
  truncateLength: {
    type: [Number, String],
    default: 22
  },
  ...makeVInputProps({
    prependIcon: '$file'
  }),
  modelValue: {
    type: [Array, Object],
    default: props => props.multiple ? [] : null,
    validator: val => {
      return wrapInArray(val).every(v => v != null && typeof v === 'object');
    }
  },
  ...makeFileFilterProps(),
  ...makeVFieldProps({
    clearable: true
  })
}, 'VFileInput');
const VFileInput = genericComponent()({
  name: 'VFileInput',
  inheritAttrs: false,
  props: makeVFileInputProps(),
  emits: {
    'click:control': e => true,
    'mousedown:control': e => true,
    'update:focused': focused => true,
    'update:modelValue': files => true,
    rejected: files => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      filterAccepted
    } = useFileFilter(props);
    const model = useProxiedModel(props, 'modelValue', props.modelValue, val => wrapInArray(val), val => !props.multiple && Array.isArray(val) ? val[0] : val);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined);
    const totalBytes = computed(() => (model.value ?? []).reduce((bytes, _ref2) => {
      let {
        size = 0
      } = _ref2;
      return bytes + size;
    }, 0));
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
    const fileNames = computed(() => (model.value ?? []).map(file => {
      const {
        name = '',
        size = 0
      } = file;
      const truncatedText = truncateText(name);
      return !props.showSize ? truncatedText : `${truncatedText} (${humanReadableFileSize(size, base.value)})`;
    }));
    const counterValue = computed(() => {
      const fileCount = model.value?.length ?? 0;
      if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value);else return t(props.counterString, fileCount);
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const isActive = toRef(() => isFocused.value || props.active);
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
    const isDragging = shallowRef(false);
    const {
      handleDrop,
      hasFilesOrFolders
    } = useFileDrop();
    function onFocus() {
      if (inputRef.value !== document.activeElement) {
        inputRef.value?.focus();
      }
      if (!isFocused.value) focus();
    }
    function onClickPrepend(e) {
      inputRef.value?.click();
    }
    function onControlMousedown(e) {
      emit('mousedown:control', e);
    }
    function onControlClick(e) {
      inputRef.value?.click();
      emit('click:control', e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = [];
        callEvent(props['onClick:clear'], e);
      });
    }
    function truncateText(str) {
      if (str.length < Number(props.truncateLength)) return str;
      const charsKeepOneSide = Math.floor((Number(props.truncateLength) - 1) / 2);
      return `${str.slice(0, charsKeepOneSide)}…${str.slice(str.length - charsKeepOneSide)}`;
    }
    function onDragover(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      isDragging.value = true;
    }
    function onDragleave(e) {
      e.preventDefault();
      isDragging.value = false;
    }
    async function onDrop(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      isDragging.value = false;
      if (!inputRef.value || !hasFilesOrFolders(e)) return;
      const allDroppedFiles = await handleDrop(e);
      selectAccepted(allDroppedFiles);
    }
    function onFileSelection(e) {
      if (!e.target || e.repack) return; // prevent loop

      if (!props.filterByType) {
        const target = e.target;
        model.value = [...(target.files ?? [])];
      } else {
        selectAccepted([...e.target.files]);
      }
    }
    function selectAccepted(files) {
      const dataTransfer = new DataTransfer();
      const {
        accepted,
        rejected
      } = filterAccepted(files);
      if (rejected.length) {
        emit('rejected', rejected);
      }
      for (const file of accepted) {
        dataTransfer.items.add(file);
      }
      inputRef.value.files = dataTransfer.files;
      model.value = [...dataTransfer.files];
      const event = new Event('change', {
        bubbles: true
      });
      event.repack = true;
      inputRef.value.dispatchEvent(event);
    }
    watch(model, newValue => {
      const hasModelReset = !Array.isArray(newValue) || !newValue.length;
      if (hasModelReset && inputRef.value) {
        inputRef.value.value = '';
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = {
        ...VField.filterProps(props),
        'onClick:clear': onClear
      };
      const expectsDirectory = attrs.webkitdirectory !== undefined && attrs.webkitdirectory !== false;
      const inputAccept = expectsDirectory ? undefined : props.filterByType ?? String(attrs.accept);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": props.multiple ? model.value : model.value[0],
        "class": ['v-file-input', {
          'v-file-input--chips': !!props.chips,
          'v-file-input--dragging': isDragging.value,
          'v-file-input--hide': props.hideInput,
          'v-input--plain-underlined': isPlainOrUnderlined.value
        }, props.class],
        "style": props.style,
        "onClick:prepend": onClickPrepend
      }, rootAttrs, inputProps, {
        "centerAffix": !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: _ref3 => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid,
            hasDetails
          } = _ref3;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "prependIcon": props.prependIcon,
            "onMousedown": onControlMousedown,
            "onClick": onControlClick,
            "onClick:prependInner": props['onClick:prependInner'],
            "onClick:appendInner": props['onClick:appendInner']
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "details": hasDetails.value,
            "error": isValid.value === false,
            "onDragover": onDragover,
            "onDrop": onDrop
          }), {
            ...slots,
            default: _ref4 => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref4;
              return createElementVNode(Fragment, null, [createElementVNode("input", mergeProps({
                "ref": inputRef,
                "type": "file",
                "accept": inputAccept,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "multiple": props.multiple,
                "name": props.name,
                "onClick": e => {
                  e.stopPropagation();
                  if (isReadonly.value) e.preventDefault();
                  onFocus();
                },
                "onChange": onFileSelection,
                "onDragleave": onDragleave,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), createElementVNode("div", {
                "class": normalizeClass(fieldClass)
              }, [!!model.value?.length && !props.hideInput && (slots.selection ? slots.selection({
                fileNames: fileNames.value,
                totalBytes: totalBytes.value,
                totalBytesReadable: totalBytesReadable.value
              }) : props.chips ? fileNames.value.map(text => createVNode(VChip, {
                "key": text,
                "size": "small",
                "text": text
              }, null)) : fileNames.value.join(', '))])]);
            }
          });
        },
        details: hasDetails ? slotProps => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
          "active": !!model.value?.length,
          "value": counterValue.value,
          "disabled": props.disabled
        }, slots.counter)])]) : undefined
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});

const makeVFooterProps = propsFactory({
  app: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 'auto'
  },
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: 'footer'
  }),
  ...makeThemeProps()
}, 'VFooter');
const VFooter = genericComponent()({
  name: 'VFooter',
  props: makeVFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const layoutItemStyles = ref();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const autoHeight = shallowRef(32);
    const {
      resizeRef
    } = useResizeObserver(entries => {
      if (!entries.length) return;
      autoHeight.value = entries[0].target.clientHeight;
    });
    const height = computed(() => props.height === 'auto' ? autoHeight.value : parseInt(props.height, 10));
    useToggleScope(() => props.app, () => {
      const layout = useLayoutItem({
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: toRef(() => 'bottom'),
        layoutSize: height,
        elementSize: computed(() => props.height === 'auto' ? undefined : height.value),
        active: toRef(() => props.app),
        absolute: toRef(() => props.absolute)
      });
      watchEffect(() => {
        layoutItemStyles.value = layout.layoutItemStyles.value;
      });
    });
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": normalizeClass(['v-footer', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, props.app ? layoutItemStyles.value : {
        height: convertToUnit(props.height)
      }, props.style])
    }, slots));
    return {};
  }
});

// Types

const makeVFormProps = propsFactory({
  ...makeComponentProps(),
  ...makeFormProps()
}, 'VForm');
const VForm = genericComponent()({
  name: 'VForm',
  props: makeVFormProps(),
  emits: {
    'update:modelValue': val => true,
    submit: e => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const form = createForm(props);
    const formRef = ref();
    function onReset(e) {
      e.preventDefault();
      form.reset();
    }
    function onSubmit(_e) {
      const e = _e;
      const ready = form.validate();
      e.then = ready.then.bind(ready);
      e.catch = ready.catch.bind(ready);
      e.finally = ready.finally.bind(ready);
      emit('submit', e);
      if (!e.defaultPrevented) {
        ready.then(_ref2 => {
          let {
            valid
          } = _ref2;
          if (valid) {
            formRef.value?.submit();
          }
        });
      }
      e.preventDefault();
    }
    useRender(() => createElementVNode("form", {
      "ref": formRef,
      "class": normalizeClass(['v-form', props.class]),
      "style": normalizeStyle(props.style),
      "novalidate": true,
      "onReset": onReset,
      "onSubmit": onSubmit
    }, [slots.default?.(form)]));
    return forwardRefs(form, formRef);
  }
});

// Composables
const makeVHoverProps = propsFactory({
  disabled: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  ...makeDelayProps()
}, 'VHover');
const VHover = genericComponent()({
  name: 'VHover',
  props: makeVHoverProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isHovering = useProxiedModel(props, 'modelValue');
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, value => !props.disabled && (isHovering.value = value));
    return () => slots.default?.({
      isHovering: isHovering.value,
      props: {
        onMouseenter: runOpenDelay,
        onMouseleave: runCloseDelay
      }
    });
  }
});

// Types

const makeVInfiniteScrollProps = propsFactory({
  color: String,
  direction: {
    type: String,
    default: 'vertical',
    validator: v => ['vertical', 'horizontal'].includes(v)
  },
  side: {
    type: String,
    default: 'end',
    validator: v => ['start', 'end', 'both'].includes(v)
  },
  mode: {
    type: String,
    default: 'intersect',
    validator: v => ['intersect', 'manual'].includes(v)
  },
  margin: [Number, String],
  loadMoreText: {
    type: String,
    default: '$vuetify.infiniteScroll.loadMore'
  },
  emptyText: {
    type: String,
    default: '$vuetify.infiniteScroll.empty'
  },
  ...makeDimensionProps(),
  ...makeTagProps()
}, 'VInfiniteScroll');
const VInfiniteScrollIntersect = defineComponent({
  name: 'VInfiniteScrollIntersect',
  props: {
    side: {
      type: String,
      required: true
    },
    rootMargin: String
  },
  emits: {
    intersect: (side, isIntersecting) => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    watch(isIntersecting, async val => {
      emit('intersect', props.side, val);
    });
    useRender(() => createElementVNode("div", {
      "class": "v-infinite-scroll-intersect",
      "style": {
        '--v-infinite-margin-size': props.rootMargin
      },
      "ref": intersectionRef
    }, [createTextVNode("\xA0")]));
    return {};
  }
});
const VInfiniteScroll = genericComponent()({
  name: 'VInfiniteScroll',
  props: makeVInfiniteScrollProps(),
  emits: {
    load: options => true
  },
  setup(props, _ref2) {
    let {
      slots,
      emit
    } = _ref2;
    const rootEl = ref();
    const startStatus = shallowRef('ok');
    const endStatus = shallowRef('ok');
    const margin = computed(() => convertToUnit(props.margin));
    const isIntersecting = shallowRef(false);
    function setScrollAmount(amount) {
      if (!rootEl.value) return;
      const property = props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
      rootEl.value[property] = amount;
    }
    function getScrollAmount() {
      if (!rootEl.value) return 0;
      const property = props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
      return rootEl.value[property];
    }
    function getScrollSize() {
      if (!rootEl.value) return 0;
      const property = props.direction === 'vertical' ? 'scrollHeight' : 'scrollWidth';
      return rootEl.value[property];
    }
    function getContainerSize() {
      if (!rootEl.value) return 0;
      const property = props.direction === 'vertical' ? 'clientHeight' : 'clientWidth';
      return rootEl.value[property];
    }
    onMounted(() => {
      if (!rootEl.value) return;
      if (props.side === 'start') {
        setScrollAmount(getScrollSize());
      } else if (props.side === 'both') {
        setScrollAmount(getScrollSize() / 2 - getContainerSize() / 2);
      }
    });
    function setStatus(side, status) {
      if (side === 'start') {
        startStatus.value = status;
      } else if (side === 'end') {
        endStatus.value = status;
      } else if (side === 'both') {
        startStatus.value = status;
        endStatus.value = status;
      }
    }
    function getStatus(side) {
      return side === 'start' ? startStatus.value : endStatus.value;
    }
    let previousScrollSize = 0;
    function handleIntersect(side, _isIntersecting) {
      isIntersecting.value = _isIntersecting;
      if (isIntersecting.value) {
        intersecting(side);
      }
    }
    function intersecting(side) {
      if (props.mode !== 'manual' && !isIntersecting.value) return;
      const status = getStatus(side);
      if (!rootEl.value || ['empty', 'loading'].includes(status)) return;
      previousScrollSize = getScrollSize();
      setStatus(side, 'loading');
      function done(status) {
        setStatus(side, status);
        nextTick(() => {
          if (status === 'empty' || status === 'error') return;
          if (status === 'ok' && side === 'start') {
            setScrollAmount(getScrollSize() - previousScrollSize + getScrollAmount());
          }
          if (props.mode !== 'manual') {
            nextTick(() => {
              // Browser takes 2 - 3 animation frames to trigger IntersectionObserver after
              // VInfiniteScrollIntersect leaves the viewpoint. So far I couldn't come up
              // with a better solution than using 3 nested window.requestAnimationFrame. (#17475)
              window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    intersecting(side);
                  });
                });
              });
            });
          }
        });
      }
      emit('load', {
        side,
        done
      });
    }
    const {
      t
    } = useLocale();
    function renderSide(side, status) {
      if (props.side !== side && props.side !== 'both') return;
      const onClick = () => intersecting(side);
      const slotProps = {
        side,
        props: {
          onClick,
          color: props.color
        }
      };
      if (status === 'error') return slots.error?.(slotProps);
      if (status === 'empty') return slots.empty?.(slotProps) ?? createElementVNode("div", null, [t(props.emptyText)]);
      if (props.mode === 'manual') {
        if (status === 'loading') {
          return slots.loading?.(slotProps) ?? createVNode(VProgressCircular, {
            "indeterminate": true,
            "color": props.color
          }, null);
        }
        return slots['load-more']?.(slotProps) ?? createVNode(VBtn, {
          "variant": "outlined",
          "color": props.color,
          "onClick": onClick
        }, {
          default: () => [t(props.loadMoreText)]
        });
      }
      return slots.loading?.(slotProps) ?? createVNode(VProgressCircular, {
        "indeterminate": true,
        "color": props.color
      }, null);
    }
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      const Tag = props.tag;
      const hasStartIntersect = props.side === 'start' || props.side === 'both';
      const hasEndIntersect = props.side === 'end' || props.side === 'both';
      const intersectMode = props.mode === 'intersect';
      return createVNode(Tag, {
        "ref": rootEl,
        "class": normalizeClass(['v-infinite-scroll', `v-infinite-scroll--${props.direction}`, {
          'v-infinite-scroll--start': hasStartIntersect,
          'v-infinite-scroll--end': hasEndIntersect
        }]),
        "style": normalizeStyle(dimensionStyles.value)
      }, {
        default: () => [createElementVNode("div", {
          "class": "v-infinite-scroll__side"
        }, [renderSide('start', startStatus.value)]), hasStartIntersect && intersectMode && createVNode(VInfiniteScrollIntersect, {
          "key": "start",
          "side": "start",
          "onIntersect": handleIntersect,
          "rootMargin": margin.value
        }, null), slots.default?.(), hasEndIntersect && intersectMode && createVNode(VInfiniteScrollIntersect, {
          "key": "end",
          "side": "end",
          "onIntersect": handleIntersect,
          "rootMargin": margin.value
        }, null), createElementVNode("div", {
          "class": "v-infinite-scroll__side"
        }, [renderSide('end', endStatus.value)])]
      });
    });
    function reset(side) {
      const effectiveSide = side ?? props.side;
      setStatus(effectiveSide, 'ok');
      nextTick(() => {
        setScrollAmount(getScrollSize() - previousScrollSize + getScrollAmount());
        if (props.mode !== 'manual') {
          nextTick(() => {
            // See #17475
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                  if (effectiveSide === 'both') {
                    intersecting('start');
                    intersecting('end');
                  } else {
                    intersecting(effectiveSide);
                  }
                });
              });
            });
          });
        }
      });
    }
    return {
      reset
    };
  }
});

// Types

const VItemGroupSymbol = Symbol.for('vuetify:v-item-group');
const makeVItemGroupProps = propsFactory({
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: 'v-item--selected'
  }),
  ...makeTagProps(),
  ...makeThemeProps()
}, 'VItemGroup');
const VItemGroup = genericComponent()({
  name: 'VItemGroup',
  props: makeVItemGroupProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VItemGroupSymbol);
    return () => createVNode(props.tag, {
      "class": normalizeClass(['v-item-group', themeClasses.value, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.default?.({
        isSelected,
        select,
        next,
        prev,
        selected: selected.value
      })]
    });
  }
});

// Composables
const VItem = genericComponent()({
  name: 'VItem',
  props: makeGroupItemProps(),
  emits: {
    'group:selected': val => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      select,
      toggle,
      selectedClass,
      value,
      disabled
    } = useGroupItem(props, VItemGroupSymbol);
    return () => slots.default?.({
      isSelected: isSelected.value,
      selectedClass: selectedClass.value,
      select,
      toggle,
      value: value.value,
      disabled: disabled.value
    });
  }
});

const makeVKbdProps = propsFactory({
  color: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: 'kbd'
  }),
  ...makeThemeProps(),
  ...makeElevationProps()
}, 'VKbd');
const VKbd = genericComponent()({
  name: 'VKbd',
  props: makeVKbdProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      elevationClasses
    } = useElevation(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-kbd', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, props.style])
    }, slots));
    return {};
  }
});

const makeVLayoutProps = propsFactory({
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLayoutProps()
}, 'VLayout');
const VLayout = genericComponent()({
  name: 'VLayout',
  props: makeVLayoutProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout(props);
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => createElementVNode("div", {
      "ref": layoutRef,
      "class": normalizeClass([layoutClasses.value, props.class]),
      "style": normalizeStyle([dimensionStyles.value, layoutStyles.value, props.style])
    }, [slots.default?.()]));
    return {
      getLayoutItem,
      items
    };
  }
});

// Types

const makeVLayoutItemProps = propsFactory({
  position: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 300
  },
  modelValue: Boolean,
  ...makeComponentProps(),
  ...makeLayoutItemProps()
}, 'VLayoutItem');
const VLayoutItem = genericComponent()({
  name: 'VLayoutItem',
  props: makeVLayoutItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(() => props.position),
      elementSize: toRef(() => props.size),
      layoutSize: toRef(() => props.size),
      active: toRef(() => props.modelValue),
      absolute: toRef(() => props.absolute)
    });
    return () => createElementVNode("div", {
      "class": normalizeClass(['v-layout-item', props.class]),
      "style": normalizeStyle([layoutItemStyles.value, props.style])
    }, [slots.default?.()]);
  }
});

// Types

const makeVLazyProps = propsFactory({
  modelValue: Boolean,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: undefined,
      rootMargin: undefined,
      threshold: undefined
    })
  },
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps(),
  ...makeTransitionProps({
    transition: 'fade-transition'
  })
}, 'VLazy');
const VLazy = genericComponent()({
  name: 'VLazy',
  directives: {
    vIntersect: Intersect
  },
  props: makeVLazyProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const isActive = useProxiedModel(props, 'modelValue');
    function onIntersect(isIntersecting) {
      if (isActive.value) return;
      isActive.value = isIntersecting;
    }
    useRender(() => withDirectives(createVNode(props.tag, {
      "class": normalizeClass(['v-lazy', props.class]),
      "style": normalizeStyle([dimensionStyles.value, props.style])
    }, {
      default: () => [isActive.value && createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [slots.default?.()]
      })]
    }), [[Intersect, {
      handler: onIntersect,
      options: props.options
    }, null]]));
    return {};
  }
});

const makeVLocaleProviderProps = propsFactory({
  locale: String,
  fallbackLocale: String,
  messages: Object,
  rtl: {
    type: Boolean,
    default: undefined
  },
  ...makeComponentProps()
}, 'VLocaleProvider');
const VLocaleProvider = genericComponent()({
  name: 'VLocaleProvider',
  props: makeVLocaleProviderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = provideLocale(props);
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(['v-locale-provider', rtlClasses.value, props.class]),
      "style": normalizeStyle(props.style)
    }, [slots.default?.()]));
    return {};
  }
});

const makeVMainProps = propsFactory({
  scrollable: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps({
    tag: 'main'
  })
}, 'VMain');
const VMain = genericComponent()({
  name: 'VMain',
  props: makeVMainProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-main', {
        'v-main--scrollable': props.scrollable
      }, props.class]),
      "style": normalizeStyle([mainStyles.value, ssrBootStyles.value, dimensionStyles.value, props.style])
    }, {
      default: () => [props.scrollable ? createElementVNode("div", {
        "class": "v-main__scroller"
      }, [slots.default?.()]) : slots.default?.()]
    }));
    return {};
  }
});

// Utilities

// Types

function useSticky(_ref) {
  let {
    rootEl,
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = shallowRef(false);
  const stuckPosition = shallowRef(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === 'boolean' ? 'top' : isStuck.value;
    return [isSticky.value ? {
      top: 'auto',
      bottom: 'auto',
      height: undefined
    } : undefined, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  onMounted(() => {
    watch(isSticky, val => {
      if (val) {
        window.addEventListener('scroll', onScroll, {
          passive: true
        });
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    }, {
      immediate: true
    });
  });
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
  let lastScrollTop = 0;
  function onScroll() {
    const direction = lastScrollTop > window.scrollY ? 'up' : 'down';
    const rect = rootEl.value.getBoundingClientRect();
    const layoutTop = parseFloat(layoutItemStyles.value.top ?? 0);
    const top = window.scrollY - Math.max(0, stuckPosition.value - layoutTop);
    const bottom = rect.height + Math.max(stuckPosition.value, layoutTop) - window.scrollY - window.innerHeight;
    const bodyScroll = parseFloat(getComputedStyle(rootEl.value).getPropertyValue('--v-body-scroll-y')) || 0;
    if (rect.height < window.innerHeight - layoutTop) {
      isStuck.value = 'top';
      stuckPosition.value = layoutTop;
    } else if (direction === 'up' && isStuck.value === 'bottom' || direction === 'down' && isStuck.value === 'top') {
      stuckPosition.value = window.scrollY + rect.top - bodyScroll;
      isStuck.value = true;
    } else if (direction === 'down' && bottom <= 0) {
      stuckPosition.value = 0;
      isStuck.value = 'bottom';
    } else if (direction === 'up' && top <= 0) {
      if (!bodyScroll) {
        stuckPosition.value = rect.top + top;
        isStuck.value = 'top';
      } else if (isStuck.value !== 'top') {
        stuckPosition.value = -top + bodyScroll + layoutTop;
        isStuck.value = 'top';
      }
    }
    lastScrollTop = window.scrollY;
  }
  return {
    isStuck,
    stickyStyles
  };
}

// Utilities
const HORIZON = 100; // ms
const HISTORY = 20; // number of samples to keep

/** @see https://android.googlesource.com/platform/frameworks/native/+/master/libs/input/VelocityTracker.cpp */
function kineticEnergyToVelocity(work) {
  const sqrt2 = 1.41421356237;
  return (work < 0 ? -1 : 1.0) * Math.sqrt(Math.abs(work)) * sqrt2;
}

/**
 * Returns pointer velocity in px/s
 */
function calculateImpulseVelocity(samples) {
  // The input should be in reversed time order (most recent sample at index i=0)
  if (samples.length < 2) {
    // if 0 or 1 points, velocity is zero
    return 0;
  }
  // if (samples[1].t > samples[0].t) {
  //   // Algorithm will still work, but not perfectly
  //   consoleWarn('Samples provided to calculateImpulseVelocity in the wrong order')
  // }
  if (samples.length === 2) {
    // if 2 points, basic linear calculation
    if (samples[1].t === samples[0].t) {
      // consoleWarn(`Events have identical time stamps t=${samples[0].t}, setting velocity = 0`)
      return 0;
    }
    return (samples[1].d - samples[0].d) / (samples[1].t - samples[0].t);
  }
  // Guaranteed to have at least 3 points here
  // start with the oldest sample and go forward in time
  let work = 0;
  for (let i = samples.length - 1; i > 0; i--) {
    if (samples[i].t === samples[i - 1].t) {
      // consoleWarn(`Events have identical time stamps t=${samples[i].t}, skipping sample`)
      continue;
    }
    const vprev = kineticEnergyToVelocity(work); // v[i-1]
    const vcurr = (samples[i].d - samples[i - 1].d) / (samples[i].t - samples[i - 1].t); // v[i]
    work += (vcurr - vprev) * Math.abs(vcurr);
    if (i === samples.length - 1) {
      work *= 0.5;
    }
  }
  return kineticEnergyToVelocity(work) * 1000;
}
function useVelocity() {
  const touches = {};
  function addMovement(e) {
    Array.from(e.changedTouches).forEach(touch => {
      const samples = touches[touch.identifier] ?? (touches[touch.identifier] = new CircularBuffer(HISTORY));
      samples.push([e.timeStamp, touch]);
    });
  }
  function endTouch(e) {
    Array.from(e.changedTouches).forEach(touch => {
      delete touches[touch.identifier];
    });
  }
  function getVelocity(id) {
    const samples = touches[id]?.values().reverse();
    if (!samples) {
      throw new Error(`No samples for touch id ${id}`);
    }
    const newest = samples[0];
    const x = [];
    const y = [];
    for (const val of samples) {
      if (newest[0] - val[0] > HORIZON) break;
      x.push({
        t: val[0],
        d: val[1].clientX
      });
      y.push({
        t: val[0],
        d: val[1].clientY
      });
    }
    return {
      x: calculateImpulseVelocity(x),
      y: calculateImpulseVelocity(y),
      get direction() {
        const {
          x,
          y
        } = this;
        const [absX, absY] = [Math.abs(x), Math.abs(y)];
        return absX > absY && x >= 0 ? 'right' : absX > absY && x <= 0 ? 'left' : absY > absX && y >= 0 ? 'down' : absY > absX && y <= 0 ? 'up' : oops$1();
      }
    };
  }
  return {
    addMovement,
    endTouch,
    getVelocity
  };
}
function oops$1() {
  throw new Error();
}

// Composables

// Types

function useTouch(_ref) {
  let {
    el,
    isActive,
    isTemporary,
    width,
    touchless,
    position
  } = _ref;
  onMounted(() => {
    window.addEventListener('touchstart', onTouchstart, {
      passive: true
    });
    window.addEventListener('touchmove', onTouchmove, {
      passive: false
    });
    window.addEventListener('touchend', onTouchend, {
      passive: true
    });
  });
  onBeforeUnmount(() => {
    window.removeEventListener('touchstart', onTouchstart);
    window.removeEventListener('touchmove', onTouchmove);
    window.removeEventListener('touchend', onTouchend);
  });
  const isHorizontal = computed(() => ['left', 'right'].includes(position.value));
  const {
    addMovement,
    endTouch,
    getVelocity
  } = useVelocity();
  let maybeDragging = false;
  const isDragging = shallowRef(false);
  const dragProgress = shallowRef(0);
  const offset = shallowRef(0);
  let start;
  function getOffset(pos, active) {
    return (position.value === 'left' ? pos : position.value === 'right' ? document.documentElement.clientWidth - pos : position.value === 'top' ? pos : position.value === 'bottom' ? document.documentElement.clientHeight - pos : oops()) - (active ? width.value : 0);
  }
  function getProgress(pos) {
    let limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const progress = position.value === 'left' ? (pos - offset.value) / width.value : position.value === 'right' ? (document.documentElement.clientWidth - pos - offset.value) / width.value : position.value === 'top' ? (pos - offset.value) / width.value : position.value === 'bottom' ? (document.documentElement.clientHeight - pos - offset.value) / width.value : oops();
    return limit ? clamp(progress) : progress;
  }
  function onTouchstart(e) {
    if (touchless.value) return;
    const touchX = e.changedTouches[0].clientX;
    const touchY = e.changedTouches[0].clientY;
    const touchZone = 25;
    const inTouchZone = position.value === 'left' ? touchX < touchZone : position.value === 'right' ? touchX > document.documentElement.clientWidth - touchZone : position.value === 'top' ? touchY < touchZone : position.value === 'bottom' ? touchY > document.documentElement.clientHeight - touchZone : oops();
    const inElement = isActive.value && (position.value === 'left' ? touchX < width.value : position.value === 'right' ? touchX > document.documentElement.clientWidth - width.value : position.value === 'top' ? touchY < width.value : position.value === 'bottom' ? touchY > document.documentElement.clientHeight - width.value : oops());
    if (inTouchZone || inElement || isActive.value && isTemporary.value) {
      start = [touchX, touchY];
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, isActive.value);
      dragProgress.value = getProgress(isHorizontal.value ? touchX : touchY);
      maybeDragging = offset.value > -20 && offset.value < 80;
      endTouch(e);
      addMovement(e);
    }
  }
  function onTouchmove(e) {
    const touchX = e.changedTouches[0].clientX;
    const touchY = e.changedTouches[0].clientY;
    if (maybeDragging) {
      if (!e.cancelable) {
        maybeDragging = false;
        return;
      }
      const dx = Math.abs(touchX - start[0]);
      const dy = Math.abs(touchY - start[1]);
      const thresholdMet = isHorizontal.value ? dx > dy && dx > 3 : dy > dx && dy > 3;
      if (thresholdMet) {
        isDragging.value = true;
        maybeDragging = false;
      } else if ((isHorizontal.value ? dy : dx) > 3) {
        maybeDragging = false;
      }
    }
    if (!isDragging.value) return;
    e.preventDefault();
    addMovement(e);
    const progress = getProgress(isHorizontal.value ? touchX : touchY, false);
    dragProgress.value = Math.max(0, Math.min(1, progress));
    if (progress > 1) {
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, true);
    } else if (progress < 0) {
      offset.value = getOffset(isHorizontal.value ? touchX : touchY, false);
    }
  }
  function onTouchend(e) {
    maybeDragging = false;
    if (!isDragging.value) return;
    addMovement(e);
    isDragging.value = false;
    const velocity = getVelocity(e.changedTouches[0].identifier);
    const vx = Math.abs(velocity.x);
    const vy = Math.abs(velocity.y);
    const thresholdMet = isHorizontal.value ? vx > vy && vx > 400 : vy > vx && vy > 3;
    if (thresholdMet) {
      isActive.value = velocity.direction === ({
        left: 'right',
        right: 'left',
        top: 'down',
        bottom: 'up'
      }[position.value] || oops());
    } else {
      isActive.value = dragProgress.value > 0.5;
    }
  }
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === 'left' ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === 'right' ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === 'top' ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === 'bottom' ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: 'none'
    } : undefined;
  });
  useToggleScope(isDragging, () => {
    const transform = el.value?.style.transform ?? null;
    const transition = el.value?.style.transition ?? null;
    watchEffect(() => {
      el.value?.style.setProperty('transform', dragStyles.value?.transform || 'none');
      el.value?.style.setProperty('transition', dragStyles.value?.transition || null);
    });
    onScopeDispose(() => {
      el.value?.style.setProperty('transform', transform);
      el.value?.style.setProperty('transition', transition);
    });
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}

// Types

const locations = ['start', 'end', 'left', 'right', 'top', 'bottom'];
const makeVNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  permanent: Boolean,
  rail: {
    type: Boolean,
    default: null
  },
  railWidth: {
    type: [Number, String],
    default: 56
  },
  scrim: {
    type: [Boolean, String],
    default: true
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256
  },
  location: {
    type: String,
    default: 'start',
    validator: value => locations.includes(value)
  },
  sticky: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDelayProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: 'nav'
  }),
  ...makeThemeProps()
}, 'VNavigationDrawer');
const VNavigationDrawer = genericComponent()({
  name: 'VNavigationDrawer',
  props: makeVNavigationDrawerProps(),
  emits: {
    'update:modelValue': val => true,
    'update:rail': val => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, 'modelValue', null, v => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      scopeId
    } = useScopeId();
    const rootEl = ref();
    const isHovering = shallowRef(false);
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, value => {
      isHovering.value = value;
    });
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isPersistent = toRef(() => props.persistent);
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== 'bottom');
    useToggleScope(() => props.expandOnHover && props.rail != null, () => {
      watch(isHovering, val => emit('update:rail', !val));
    });
    useToggleScope(() => !props.disableResizeWatcher, () => {
      watch(isTemporary, val => !props.permanent && nextTick(() => isActive.value = !val));
    });
    useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    });
    watch(() => props.permanent, val => {
      if (val) isActive.value = true;
    });
    if (props.modelValue == null && !isTemporary.value) {
      isActive.value = props.permanent || !mobile.value;
    }
    const {
      isDragging,
      dragProgress
    } = useTouch({
      el: rootEl,
      isActive,
      isTemporary,
      width,
      touchless: toRef(() => props.touchless),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize: width,
      active: readonly(isActive),
      disableTransitions: toRef(() => isDragging.value),
      absolute: computed(() =>
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      props.absolute || isSticky.value && typeof isStuck.value !== 'string')
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      rootEl,
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(() => {
      return typeof props.scrim === 'string' ? props.scrim : null;
    });
    const scrimStyles = computed(() => ({
      ...(isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: 'none'
      } : undefined),
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: 'transparent'
      }
    });
    useRender(() => {
      const hasImage = slots.image || props.image;
      return createElementVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": runOpenDelay,
        "onMouseleave": runCloseDelay,
        "class": ['v-navigation-drawer', `v-navigation-drawer--${location.value}`, {
          'v-navigation-drawer--expand-on-hover': props.expandOnHover,
          'v-navigation-drawer--floating': props.floating,
          'v-navigation-drawer--is-hovering': isHovering.value,
          'v-navigation-drawer--rail': props.rail,
          'v-navigation-drawer--temporary': isTemporary.value,
          'v-navigation-drawer--persistent': isPersistent.value,
          'v-navigation-drawer--active': isActive.value,
          'v-navigation-drawer--sticky': isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, displayClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, stickyStyles.value, props.style]
      }, scopeId, attrs), {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-navigation-drawer__img"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "alt": "",
          "cover": true,
          "height": "inherit",
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              alt: '',
              cover: true,
              height: 'inherit',
              src: props.image
            }
          }
        }, slots.image)]), slots.prepend && createElementVNode("div", {
          "class": "v-navigation-drawer__prepend"
        }, [slots.prepend?.()]), createElementVNode("div", {
          "class": "v-navigation-drawer__content"
        }, [slots.default?.()]), slots.append && createElementVNode("div", {
          "class": "v-navigation-drawer__append"
        }, [slots.append?.()])]
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createElementVNode("div", mergeProps({
          "class": ['v-navigation-drawer__scrim', scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => {
            if (isPersistent.value) return;
            isActive.value = false;
          }
        }, scopeId), null)]
      })]);
    });
    return {
      isStuck
    };
  }
});

// Composables
const VNoSsr = defineComponent({
  name: 'VNoSsr',
  setup(_, _ref) {
    let {
      slots
    } = _ref;
    const show = useHydration();
    return () => show.value && slots.default?.();
  }
});

// Utilities
const HOLD_REPEAT = 50;
const HOLD_DELAY = 500;
function useHold(_ref) {
  let {
    toggleUpDown
  } = _ref;
  let timeout = -1;
  let interval = -1;
  onScopeDispose(holdStop);
  function holdStart(value) {
    holdStop();
    tick(value);
    window.addEventListener('pointerup', holdStop);
    document.addEventListener('blur', holdStop);
    timeout = window.setTimeout(() => {
      interval = window.setInterval(() => tick(value), HOLD_REPEAT);
    }, HOLD_DELAY);
  }
  function holdStop() {
    window.clearTimeout(timeout);
    window.clearInterval(interval);
    window.removeEventListener('pointerup', holdStop);
    document.removeEventListener('blur', holdStop);
  }
  function tick(value) {
    toggleUpDown(value === 'up');
  }
  return {
    holdStart,
    holdStop
  };
}

// Types

const makeVNumberInputProps = propsFactory({
  controlVariant: {
    type: String,
    default: 'default'
  },
  inset: Boolean,
  hideInput: Boolean,
  modelValue: {
    type: Number,
    default: null
  },
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER
  },
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER
  },
  step: {
    type: Number,
    default: 1
  },
  precision: {
    type: Number,
    default: 0
  },
  minFractionDigits: {
    type: Number,
    default: null
  },
  decimalSeparator: {
    type: String,
    validator: v => !v || v.length === 1
  },
  ...omit(makeVTextFieldProps(), ['modelValue', 'validationValue'])
}, 'VNumberInput');
const VNumberInput = genericComponent()({
  name: 'VNumberInput',
  props: {
    ...makeVNumberInputProps()
  },
  emits: {
    'update:focused': val => true,
    'update:modelValue': val => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vTextFieldRef = ref();
    const {
      holdStart,
      holdStop
    } = useHold({
      toggleUpDown
    });
    const form = useForm(props);
    const controlsDisabled = computed(() => form.isDisabled.value || form.isReadonly.value);
    const isFocused = shallowRef(props.focused);
    const {
      decimalSeparator: decimalSeparatorFromLocale
    } = useLocale();
    const decimalSeparator = computed(() => props.decimalSeparator?.[0] || decimalSeparatorFromLocale.value);
    function correctPrecision(val) {
      let precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.precision;
      let trim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      const fixed = precision == null ? String(val) : val.toFixed(precision);
      if (isFocused.value && trim) {
        return Number(fixed).toString() // trim zeros
        .replace('.', decimalSeparator.value);
      }
      if (props.minFractionDigits === null || precision !== null && precision < props.minFractionDigits) {
        return fixed.replace('.', decimalSeparator.value);
      }
      let [baseDigits, fractionDigits] = fixed.split('.');
      fractionDigits = (fractionDigits ?? '').padEnd(props.minFractionDigits, '0').replace(new RegExp(`(?<=\\d{${props.minFractionDigits}})0+$`, 'g'), '');
      return [baseDigits, fractionDigits].filter(Boolean).join(decimalSeparator.value);
    }
    const model = useProxiedModel(props, 'modelValue', null, val => val ?? null, val => val == null ? val ?? null : clamp(Number(val), props.min, props.max));
    const _inputText = shallowRef(null);
    watchEffect(() => {
      if (isFocused.value && !controlsDisabled.value && Number(_inputText.value) === model.value) ; else if (model.value == null) {
        _inputText.value = null;
      } else if (!isNaN(model.value)) {
        _inputText.value = correctPrecision(model.value);
      }
    });
    const inputText = computed({
      get: () => _inputText.value,
      set(val) {
        if (val === null || val === '') {
          model.value = null;
          _inputText.value = null;
          return;
        }
        const parsedValue = Number(val.replace(decimalSeparator.value, '.'));
        if (!isNaN(parsedValue) && parsedValue <= props.max && parsedValue >= props.min) {
          model.value = parsedValue;
          _inputText.value = val;
        }
      }
    });
    const canIncrease = computed(() => {
      if (controlsDisabled.value) return false;
      return (model.value ?? 0) + props.step <= props.max;
    });
    const canDecrease = computed(() => {
      if (controlsDisabled.value) return false;
      return (model.value ?? 0) - props.step >= props.min;
    });
    const controlVariant = computed(() => {
      return props.hideInput ? 'stacked' : props.controlVariant;
    });
    const incrementIcon = toRef(() => controlVariant.value === 'split' ? '$plus' : '$collapse');
    const decrementIcon = toRef(() => controlVariant.value === 'split' ? '$minus' : '$expand');
    const controlNodeSize = toRef(() => controlVariant.value === 'split' ? 'default' : 'small');
    const controlNodeDefaultHeight = toRef(() => controlVariant.value === 'stacked' ? 'auto' : '100%');
    const incrementSlotProps = {
      props: {
        onClick: onControlClick,
        onPointerup: onControlMouseup,
        onPointerdown: onUpControlMousedown,
        onPointercancel: onControlMouseup
      }
    };
    const decrementSlotProps = {
      props: {
        onClick: onControlClick,
        onPointerup: onControlMouseup,
        onPointerdown: onDownControlMousedown,
        onPointercancel: onControlMouseup
      }
    };
    watch(() => props.precision, () => formatInputValue());
    watch(() => props.minFractionDigits, () => formatInputValue());
    onMounted(() => {
      clampModel();
    });
    function inferPrecision(value) {
      if (value == null) return 0;
      const str = value.toString();
      const idx = str.indexOf('.');
      return ~idx ? str.length - idx : 0;
    }
    function toggleUpDown() {
      let increment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (controlsDisabled.value) return;
      if (model.value == null) {
        inputText.value = correctPrecision(clamp(0, props.min, props.max));
        return;
      }
      let inferredPrecision = Math.max(inferPrecision(model.value), inferPrecision(props.step));
      if (props.precision != null) inferredPrecision = Math.max(inferredPrecision, props.precision);
      if (increment) {
        if (canIncrease.value) inputText.value = correctPrecision(model.value + props.step, inferredPrecision);
      } else {
        if (canDecrease.value) inputText.value = correctPrecision(model.value - props.step, inferredPrecision);
      }
    }
    function onBeforeinput(e) {
      if (!e.data) return;
      const inputElement = e.target;
      const {
        value: existingTxt,
        selectionStart,
        selectionEnd
      } = inputElement ?? {};
      const potentialNewInputVal = existingTxt ? existingTxt.slice(0, selectionStart) + e.data + existingTxt.slice(selectionEnd) : e.data;
      const potentialNewNumber = extractNumber(potentialNewInputVal, props.precision, decimalSeparator.value);

      // Allow only numbers, "-" and {decimal separator}
      // Allow "-" and {decimal separator} only once
      // Allow "-" only at the start
      if (!new RegExp(`^-?\\d*${escapeForRegex(decimalSeparator.value)}?\\d*$`).test(potentialNewInputVal)) {
        e.preventDefault();
        inputElement.value = potentialNewNumber;
      }
      if (props.precision == null) return;

      // Ignore decimal digits above precision limit
      if (potentialNewInputVal.split(decimalSeparator.value)[1]?.length > props.precision) {
        e.preventDefault();
        inputElement.value = potentialNewNumber;
        const cursorPosition = (selectionStart ?? 0) + e.data.length;
        inputElement.setSelectionRange(cursorPosition, cursorPosition);
      }
      // Ignore decimal separator when precision = 0
      if (props.precision === 0 && potentialNewInputVal.includes(decimalSeparator.value)) {
        e.preventDefault();
        inputElement.value = potentialNewNumber;
      }
    }
    async function onKeydown(e) {
      if (['Enter', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].includes(e.key) || e.ctrlKey) return;
      if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        clampModel();
        // _model is controlled, so need to wait until props['modelValue'] is updated
        await nextTick();
        if (e.key === 'ArrowDown') {
          toggleUpDown(false);
        } else {
          toggleUpDown();
        }
      }
    }
    function onControlClick(e) {
      e.stopPropagation();
    }
    function onControlMouseup(e) {
      const el = e.currentTarget;
      el?.releasePointerCapture(e.pointerId);
      e.preventDefault();
      holdStop();
    }
    function onUpControlMousedown(e) {
      const el = e.currentTarget;
      el?.setPointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
      holdStart('up');
    }
    function onDownControlMousedown(e) {
      const el = e.currentTarget;
      el?.setPointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
      holdStart('down');
    }
    function clampModel() {
      if (controlsDisabled.value) return;
      if (!vTextFieldRef.value) return;
      const actualText = vTextFieldRef.value.value;
      const parsedValue = Number(actualText.replace(decimalSeparator.value, '.'));
      if (actualText && !isNaN(parsedValue)) {
        inputText.value = correctPrecision(clamp(parsedValue, props.min, props.max));
      } else {
        inputText.value = null;
      }
    }
    function formatInputValue() {
      if (controlsDisabled.value) return;
      inputText.value = model.value !== null && !isNaN(model.value) ? correctPrecision(model.value, props.precision, false) : null;
    }
    function trimDecimalZeros() {
      if (controlsDisabled.value) return;
      if (model.value === null || isNaN(model.value)) {
        inputText.value = null;
        return;
      }
      inputText.value = model.value.toString().replace('.', decimalSeparator.value);
    }
    function onFocus() {
      trimDecimalZeros();
    }
    function onBlur() {
      clampModel();
    }
    useRender(() => {
      const {
        modelValue: _,
        ...textFieldProps
      } = VTextField.filterProps(props);
      function incrementControlNode() {
        return !slots.increment ? createVNode(VBtn, {
          "aria-hidden": "true",
          "data-testid": "increment",
          "disabled": !canIncrease.value,
          "height": controlNodeDefaultHeight.value,
          "icon": incrementIcon.value,
          "key": "increment-btn",
          "onClick": onControlClick,
          "onPointerdown": onUpControlMousedown,
          "onPointerup": onControlMouseup,
          "onPointercancel": onControlMouseup,
          "size": controlNodeSize.value,
          "variant": "text",
          "tabindex": "-1"
        }, null) : createVNode(VDefaultsProvider, {
          "key": "increment-defaults",
          "defaults": {
            VBtn: {
              disabled: !canIncrease.value,
              height: controlNodeDefaultHeight.value,
              size: controlNodeSize.value,
              icon: incrementIcon.value,
              variant: 'text'
            }
          }
        }, {
          default: () => [slots.increment(incrementSlotProps)]
        });
      }
      function decrementControlNode() {
        return !slots.decrement ? createVNode(VBtn, {
          "aria-hidden": "true",
          "data-testid": "decrement",
          "disabled": !canDecrease.value,
          "height": controlNodeDefaultHeight.value,
          "icon": decrementIcon.value,
          "key": "decrement-btn",
          "onClick": onControlClick,
          "onPointerdown": onDownControlMousedown,
          "onPointerup": onControlMouseup,
          "onPointercancel": onControlMouseup,
          "size": controlNodeSize.value,
          "variant": "text",
          "tabindex": "-1"
        }, null) : createVNode(VDefaultsProvider, {
          "key": "decrement-defaults",
          "defaults": {
            VBtn: {
              disabled: !canDecrease.value,
              height: controlNodeDefaultHeight.value,
              size: controlNodeSize.value,
              icon: decrementIcon.value,
              variant: 'text'
            }
          }
        }, {
          default: () => [slots.decrement(decrementSlotProps)]
        });
      }
      function controlNode() {
        return createElementVNode("div", {
          "class": "v-number-input__control"
        }, [decrementControlNode(), createVNode(VDivider, {
          "vertical": controlVariant.value !== 'stacked'
        }, null), incrementControlNode()]);
      }
      function dividerNode() {
        return !props.hideInput && !props.inset ? createVNode(VDivider, {
          "vertical": true
        }, null) : undefined;
      }
      const appendInnerControl = controlVariant.value === 'split' ? createElementVNode("div", {
        "class": "v-number-input__control"
      }, [createVNode(VDivider, {
        "vertical": true
      }, null), incrementControlNode()]) : props.reverse || controlVariant.value === 'hidden' ? undefined : createElementVNode(Fragment, null, [dividerNode(), controlNode()]);
      const hasAppendInner = slots['append-inner'] || appendInnerControl;
      const prependInnerControl = controlVariant.value === 'split' ? createElementVNode("div", {
        "class": "v-number-input__control"
      }, [decrementControlNode(), createVNode(VDivider, {
        "vertical": true
      }, null)]) : props.reverse && controlVariant.value !== 'hidden' ? createElementVNode(Fragment, null, [controlNode(), dividerNode()]) : undefined;
      const hasPrependInner = slots['prepend-inner'] || prependInnerControl;
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": inputText.value,
        "onUpdate:modelValue": $event => inputText.value = $event,
        "focused": isFocused.value,
        "onUpdate:focused": $event => isFocused.value = $event,
        "validationValue": model.value,
        "onBeforeinput": onBeforeinput,
        "onFocus": onFocus,
        "onBlur": onBlur,
        "onKeydown": onKeydown,
        "class": ['v-number-input', {
          'v-number-input--default': controlVariant.value === 'default',
          'v-number-input--hide-input': props.hideInput,
          'v-number-input--inset': props.inset,
          'v-number-input--reverse': props.reverse,
          'v-number-input--split': controlVariant.value === 'split',
          'v-number-input--stacked': controlVariant.value === 'stacked'
        }, props.class],
        "style": props.style,
        "inputmode": "decimal"
      }), {
        ...slots,
        'append-inner': hasAppendInner ? function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createElementVNode(Fragment, null, [slots['append-inner']?.(...args), appendInnerControl]);
        } : undefined,
        'prepend-inner': hasPrependInner ? function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return createElementVNode(Fragment, null, [prependInnerControl, slots['prepend-inner']?.(...args)]);
        } : undefined
      });
    });
    return forwardRefs({}, vTextFieldRef);
  }
});

// Types

// Types

const makeVOtpInputProps = propsFactory({
  autofocus: Boolean,
  divider: String,
  focusAll: Boolean,
  label: {
    type: String,
    default: '$vuetify.input.otp'
  },
  length: {
    type: [Number, String],
    default: 6
  },
  modelValue: {
    type: [Number, String],
    default: undefined
  },
  placeholder: String,
  type: {
    type: String,
    default: 'number'
  },
  ...makeDimensionProps(),
  ...makeFocusProps(),
  ...pick(makeVFieldProps({
    variant: 'outlined'
  }), ['baseColor', 'bgColor', 'class', 'color', 'disabled', 'error', 'loading', 'rounded', 'style', 'theme', 'variant'])
}, 'VOtpInput');
const VOtpInput = genericComponent()({
  name: 'VOtpInput',
  props: makeVOtpInputProps(),
  emits: {
    finish: val => true,
    'update:focused': val => true,
    'update:modelValue': val => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const model = useProxiedModel(props, 'modelValue', '', val => val == null ? [] : String(val).split(''), val => val.join(''));
    const {
      t
    } = useLocale();
    const length = computed(() => Number(props.length));
    const fields = computed(() => Array(length.value).fill(0));
    const focusIndex = ref(-1);
    const contentRef = ref();
    const inputRef = ref([]);
    const current = computed(() => inputRef.value[focusIndex.value]);
    let _isComposing = false;
    useToggleScope(() => props.autofocus, () => {
      const intersectScope = effectScope();
      intersectScope.run(() => {
        const {
          intersectionRef,
          isIntersecting
        } = useIntersectionObserver();
        watchEffect(() => {
          intersectionRef.value = inputRef.value[0];
        });
        watch(isIntersecting, v => {
          if (!v) return;
          intersectionRef.value?.focus();
          intersectScope.stop();
        });
      });
    });
    function onInput() {
      // The maxlength attribute doesn't work for the number type input, so the text type is used.
      // The following logic simulates the behavior of a number input.
      if (isValidNumber(current.value.value)) {
        current.value.value = '';
        return;
      }
      if (_isComposing) return;
      const array = model.value.slice();
      const value = current.value.value;
      array[focusIndex.value] = value;
      let target = null;
      if (focusIndex.value > model.value.length) {
        target = model.value.length + 1;
      } else if (focusIndex.value + 1 !== length.value) {
        target = 'next';
      }
      model.value = array;
      if (target) focusChild(contentRef.value, target);
    }
    function onCompositionend() {
      _isComposing = false;
      onInput();
    }
    function onKeydown(e) {
      const array = model.value.slice();
      const index = focusIndex.value;
      let target = null;
      if (!['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'ArrowLeft') {
        target = 'prev';
      } else if (e.key === 'ArrowRight') {
        target = 'next';
      } else if (['Backspace', 'Delete'].includes(e.key)) {
        array[focusIndex.value] = '';
        model.value = array;
        if (focusIndex.value > 0 && e.key === 'Backspace') {
          target = 'prev';
        } else {
          requestAnimationFrame(() => {
            inputRef.value[index]?.select();
          });
        }
      }
      requestAnimationFrame(() => {
        if (target != null) {
          focusChild(contentRef.value, target);
        }
      });
    }
    function onPaste(index, e) {
      e.preventDefault();
      e.stopPropagation();
      const clipboardText = e?.clipboardData?.getData('Text').trim().slice(0, length.value) ?? '';
      const finalIndex = clipboardText.length - 1 === -1 ? index : clipboardText.length - 1;
      if (isValidNumber(clipboardText)) return;
      model.value = clipboardText.split('');
      focusIndex.value = finalIndex;
    }
    function reset() {
      model.value = [];
    }
    function onFocus(e, index) {
      focus();
      focusIndex.value = index;
    }
    function onBlur() {
      blur();
      focusIndex.value = -1;
    }
    function isValidNumber(value) {
      return props.type === 'number' && /[^0-9]/g.test(value);
    }
    provideDefaults({
      VField: {
        color: toRef(() => props.color),
        bgColor: toRef(() => props.color),
        baseColor: toRef(() => props.baseColor),
        disabled: toRef(() => props.disabled),
        error: toRef(() => props.error),
        variant: toRef(() => props.variant)
      }
    }, {
      scoped: true
    });
    watch(model, val => {
      if (val.length === length.value) {
        emit('finish', val.join(''));
      }
    }, {
      deep: true
    });
    watch(focusIndex, val => {
      if (val < 0) return;
      nextTick(() => {
        inputRef.value[val]?.select();
      });
    });
    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      return createElementVNode("div", mergeProps({
        "class": ['v-otp-input', {
          'v-otp-input--divided': !!props.divider
        }, props.class],
        "style": [props.style]
      }, rootAttrs), [createElementVNode("div", {
        "ref": contentRef,
        "class": "v-otp-input__content",
        "style": normalizeStyle([dimensionStyles.value])
      }, [fields.value.map((_, i) => createElementVNode(Fragment, null, [props.divider && i !== 0 && createElementVNode("span", {
        "class": "v-otp-input__divider"
      }, [props.divider]), createVNode(VField, {
        "focused": isFocused.value && props.focusAll || focusIndex.value === i,
        "key": i
      }, {
        ...slots,
        loader: undefined,
        default: () => {
          return createElementVNode("input", {
            "ref": val => inputRef.value[i] = val,
            "aria-label": t(props.label, i + 1),
            "autofocus": i === 0 && props.autofocus,
            "autocomplete": "one-time-code",
            "class": normalizeClass(['v-otp-input__field']),
            "disabled": props.disabled,
            "inputmode": props.type === 'number' ? 'numeric' : 'text',
            "min": props.type === 'number' ? 0 : undefined,
            "maxlength": i === 0 ? length.value : '1',
            "placeholder": props.placeholder,
            "type": props.type === 'number' ? 'text' : props.type,
            "value": model.value[i],
            "onInput": onInput,
            "onFocus": e => onFocus(e, i),
            "onBlur": onBlur,
            "onKeydown": onKeydown,
            "onCompositionstart": () => _isComposing = true,
            "onCompositionend": onCompositionend,
            "onPaste": event => onPaste(i, event)
          }, null);
        }
      })])), createElementVNode("input", mergeProps({
        "class": "v-otp-input-input",
        "type": "hidden"
      }, inputAttrs, {
        "value": model.value.join('')
      }), null), createVNode(VOverlay, {
        "contained": true,
        "contentClass": "v-otp-input__loader",
        "modelValue": !!props.loading,
        "persistent": true
      }, {
        default: () => [slots.loader?.() ?? createVNode(VProgressCircular, {
          "color": typeof props.loading === 'boolean' ? undefined : props.loading,
          "indeterminate": true,
          "size": "24",
          "width": "2"
        }, null)]
      }), slots.default?.()])]);
    });
    return {
      blur: () => {
        inputRef.value?.some(input => input.blur());
      },
      focus: () => {
        inputRef.value?.[0].focus();
      },
      reset,
      isFocused
    };
  }
});

// Types

function floor(val) {
  return Math.floor(Math.abs(val)) * Math.sign(val);
}
const makeVParallaxProps = propsFactory({
  scale: {
    type: [Number, String],
    default: 0.5
  },
  ...makeComponentProps()
}, 'VParallax');
const VParallax = genericComponent()({
  name: 'VParallax',
  props: makeVParallaxProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const {
      height: displayHeight
    } = useDisplay();
    const root = ref();
    watchEffect(() => {
      intersectionRef.value = resizeRef.value = root.value?.$el;
    });
    let scrollParent;
    watch(isIntersecting, val => {
      if (val) {
        scrollParent = getScrollParent(intersectionRef.value);
        scrollParent = scrollParent === document.scrollingElement ? document : scrollParent;
        scrollParent.addEventListener('scroll', onScroll, {
          passive: true
        });
        onScroll();
      } else {
        scrollParent.removeEventListener('scroll', onScroll);
      }
    });
    onBeforeUnmount(() => {
      scrollParent?.removeEventListener('scroll', onScroll);
    });
    watch(displayHeight, onScroll);
    watch(() => contentRect.value?.height, onScroll);
    const scale = computed(() => {
      return 1 - clamp(Number(props.scale));
    });
    let frame = -1;
    function onScroll() {
      if (!isIntersecting.value || PREFERS_REDUCED_MOTION()) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = (root.value?.$el).querySelector('.v-img__img');
        if (!el) return;
        const scrollHeight = scrollParent instanceof Document ? document.documentElement.clientHeight : scrollParent.clientHeight;
        const scrollPos = scrollParent instanceof Document ? window.scrollY : scrollParent.scrollTop;
        const top = intersectionRef.value.getBoundingClientRect().top + scrollPos;
        const height = contentRect.value.height;
        const center = top + (height - scrollHeight) / 2;
        const translate = floor((scrollPos - center) * scale.value);
        const sizeScale = Math.max(1, (scale.value * (scrollHeight - height) + height) / height);
        el.style.setProperty('transform', `translateY(${translate}px) scale(${sizeScale})`);
      });
    }
    useRender(() => createVNode(VImg, {
      "class": normalizeClass(['v-parallax', {
        'v-parallax--active': isIntersecting.value
      }, props.class]),
      "style": normalizeStyle(props.style),
      "ref": root,
      "cover": true,
      "onLoadstart": onScroll,
      "onLoad": onScroll
    }, slots));
    return {};
  }
});

// Types

const makeVRadioProps = propsFactory({
  ...makeVSelectionControlProps({
    falseIcon: '$radioOff',
    trueIcon: '$radioOn'
  })
}, 'VRadio');
const VRadio = genericComponent()({
  name: 'VRadio',
  props: makeVRadioProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const controlProps = VSelectionControl.filterProps(props);
      return createVNode(VSelectionControl, mergeProps(controlProps, {
        "class": ['v-radio', props.class],
        "style": props.style,
        "type": "radio"
      }), slots);
    });
    return {};
  }
});

// Types

const makeVRadioGroupProps = propsFactory({
  height: {
    type: [Number, String],
    default: 'auto'
  },
  ...makeVInputProps(),
  ...omit(makeSelectionControlGroupProps(), ['multiple']),
  trueIcon: {
    type: IconValue,
    default: '$radioOn'
  },
  falseIcon: {
    type: IconValue,
    default: '$radioOff'
  },
  type: {
    type: String,
    default: 'radio'
  }
}, 'VRadioGroup');
const VRadioGroup = genericComponent()({
  name: 'VRadioGroup',
  inheritAttrs: false,
  props: makeVRadioGroupProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const uid = useId();
    const id = computed(() => props.id || `radio-group-${uid}`);
    const model = useProxiedModel(props, 'modelValue');
    const inputRef = ref();
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props);
      const controlProps = VSelectionControl.filterProps(props);
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return createVNode(VInput, mergeProps({
        "ref": inputRef,
        "class": ['v-radio-group', props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "id": id.value
      }), {
        ...slots,
        default: _ref2 => {
          let {
            id,
            messagesId,
            isDisabled,
            isReadonly
          } = _ref2;
          return createElementVNode(Fragment, null, [label && createVNode(VLabel, {
            "id": id.value
          }, {
            default: () => [label]
          }), createVNode(VSelectionControlGroup, mergeProps(controlProps, {
            "id": id.value,
            "aria-describedby": messagesId.value,
            "defaultsTarget": "VRadio",
            "trueIcon": props.trueIcon,
            "falseIcon": props.falseIcon,
            "type": props.type,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value,
            "aria-labelledby": label ? id.value : undefined,
            "multiple": false
          }, controlAttrs, {
            "modelValue": model.value,
            "onUpdate:modelValue": $event => model.value = $event
          }), slots)]);
        }
      });
    });
    return forwardRefs({}, inputRef);
  }
});

// Types

const makeVRangeSliderProps = propsFactory({
  ...makeFocusProps(),
  ...makeVInputProps(),
  ...makeSliderProps(),
  strict: Boolean,
  modelValue: {
    type: Array,
    default: () => [0, 0]
  }
}, 'VRangeSlider');
const VRangeSlider = genericComponent()({
  name: 'VRangeSlider',
  props: makeVRangeSliderProps(),
  emits: {
    'update:focused': value => true,
    'update:modelValue': value => true,
    end: value => true,
    start: value => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const startThumbRef = ref();
    const stopThumbRef = ref();
    const inputRef = ref();
    const {
      rtlClasses
    } = useRtl();
    function getActiveThumb(e) {
      if (!startThumbRef.value || !stopThumbRef.value) return;
      const startOffset = getOffset(e, startThumbRef.value.$el, props.direction);
      const stopOffset = getOffset(e, stopThumbRef.value.$el, props.direction);
      const a = Math.abs(startOffset);
      const b = Math.abs(stopOffset);
      return a < b || a === b && startOffset < 0 ? startThumbRef.value.$el : stopThumbRef.value.$el;
    }
    const steps = useSteps(props);
    const model = useProxiedModel(props, 'modelValue', undefined, arr => {
      if (!arr?.length) return [0, 0];
      return arr.map(value => steps.roundValue(value));
    });
    const {
      activeThumbRef,
      hasLabels,
      max,
      min,
      mousePressed,
      onSliderMousedown,
      onSliderTouchstart,
      position,
      trackContainerRef,
      readonly
    } = useSlider({
      props,
      steps,
      onSliderStart: () => {
        emit('start', model.value);
      },
      onSliderEnd: _ref2 => {
        let {
          value
        } = _ref2;
        const newValue = activeThumbRef.value === startThumbRef.value?.$el ? [value, model.value[1]] : [model.value[0], value];
        if (!props.strict && newValue[0] < newValue[1]) {
          model.value = newValue;
        }
        emit('end', model.value);
      },
      onSliderMove: _ref3 => {
        let {
          value
        } = _ref3;
        const [start, stop] = model.value;
        if (!props.strict && start === stop && start !== min.value) {
          activeThumbRef.value = value > start ? stopThumbRef.value?.$el : startThumbRef.value?.$el;
          activeThumbRef.value?.focus();
        }
        if (activeThumbRef.value === startThumbRef.value?.$el) {
          model.value = [Math.min(value, stop), stop];
        } else {
          model.value = [start, Math.max(start, value)];
        }
      },
      getActiveThumb
    });
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const trackStart = computed(() => position(model.value[0]));
    const trackStop = computed(() => position(model.value[1]));
    useRender(() => {
      const inputProps = VInput.filterProps(props);
      const hasPrepend = !!(props.label || slots.label || slots.prepend);
      return createVNode(VInput, mergeProps({
        "class": ['v-slider', 'v-range-slider', {
          'v-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
          'v-slider--focused': isFocused.value,
          'v-slider--pressed': mousePressed.value,
          'v-slider--disabled': props.disabled
        }, rtlClasses.value, props.class],
        "style": props.style,
        "ref": inputRef
      }, inputProps, {
        "focused": isFocused.value
      }), {
        ...slots,
        prepend: hasPrepend ? slotProps => createElementVNode(Fragment, null, [slots.label?.(slotProps) ?? (props.label ? createVNode(VLabel, {
          "class": "v-slider__label",
          "text": props.label
        }, null) : undefined), slots.prepend?.(slotProps)]) : undefined,
        default: _ref4 => {
          let {
            id,
            messagesId
          } = _ref4;
          return createElementVNode("div", {
            "class": "v-slider__container",
            "onMousedown": !readonly.value ? onSliderMousedown : undefined,
            "onTouchstartPassive": !readonly.value ? onSliderTouchstart : undefined
          }, [createElementVNode("input", {
            "id": `${id.value}_start`,
            "name": props.name || id.value,
            "disabled": !!props.disabled,
            "readonly": !!props.readonly,
            "tabindex": "-1",
            "value": model.value[0]
          }, null), createElementVNode("input", {
            "id": `${id.value}_stop`,
            "name": props.name || id.value,
            "disabled": !!props.disabled,
            "readonly": !!props.readonly,
            "tabindex": "-1",
            "value": model.value[1]
          }, null), createVNode(VSliderTrack, {
            "ref": trackContainerRef,
            "start": trackStart.value,
            "stop": trackStop.value
          }, {
            'tick-label': slots['tick-label']
          }), createVNode(VSliderThumb, {
            "ref": startThumbRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused && activeThumbRef.value === startThumbRef.value?.$el,
            "modelValue": model.value[0],
            "onUpdate:modelValue": v => model.value = [v, model.value[1]],
            "onFocus": e => {
              focus();
              activeThumbRef.value = startThumbRef.value?.$el;

              // Make sure second thumb is focused if
              // the thumbs are on top of each other
              // and they are both at minimum value
              // but only if focused from outside.
              if (max.value !== min.value && model.value[0] === model.value[1] && model.value[1] === min.value && e.relatedTarget !== stopThumbRef.value?.$el) {
                startThumbRef.value?.$el.blur();
                stopThumbRef.value?.$el.focus();
              }
            },
            "onBlur": () => {
              blur();
              activeThumbRef.value = undefined;
            },
            "min": min.value,
            "max": model.value[1],
            "position": trackStart.value,
            "ripple": props.ripple
          }, {
            'thumb-label': slots['thumb-label']
          }), createVNode(VSliderThumb, {
            "ref": stopThumbRef,
            "aria-describedby": messagesId.value,
            "focused": isFocused && activeThumbRef.value === stopThumbRef.value?.$el,
            "modelValue": model.value[1],
            "onUpdate:modelValue": v => model.value = [model.value[0], v],
            "onFocus": e => {
              focus();
              activeThumbRef.value = stopThumbRef.value?.$el;

              // Make sure first thumb is focused if
              // the thumbs are on top of each other
              // and they are both at maximum value
              // but only if focused from outside.
              if (max.value !== min.value && model.value[0] === model.value[1] && model.value[0] === max.value && e.relatedTarget !== startThumbRef.value?.$el) {
                stopThumbRef.value?.$el.blur();
                startThumbRef.value?.$el.focus();
              }
            },
            "onBlur": () => {
              blur();
              activeThumbRef.value = undefined;
            },
            "min": model.value[0],
            "max": max.value,
            "position": trackStop.value,
            "ripple": props.ripple
          }, {
            'thumb-label': slots['thumb-label']
          })]);
        }
      });
    });
    return forwardRefs({
      focus: () => startThumbRef.value?.$el.focus()
    }, inputRef);
  }
});

// Types

const makeVRatingProps = propsFactory({
  name: String,
  itemAriaLabel: {
    type: String,
    default: '$vuetify.rating.ariaLabel.item'
  },
  activeColor: String,
  color: String,
  clearable: Boolean,
  disabled: Boolean,
  emptyIcon: {
    type: IconValue,
    default: '$ratingEmpty'
  },
  fullIcon: {
    type: IconValue,
    default: '$ratingFull'
  },
  halfIncrements: Boolean,
  hover: Boolean,
  length: {
    type: [Number, String],
    default: 5
  },
  readonly: Boolean,
  modelValue: {
    type: [Number, String],
    default: 0
  },
  itemLabels: Array,
  itemLabelPosition: {
    type: String,
    default: 'top',
    validator: v => ['top', 'bottom'].includes(v)
  },
  ripple: Boolean,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, 'VRating');
const VRating = genericComponent()({
  name: 'VRating',
  props: makeVRatingProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      themeClasses
    } = provideTheme(props);
    const rating = useProxiedModel(props, 'modelValue');
    const normalizedValue = computed(() => clamp(parseFloat(rating.value), 0, Number(props.length)));
    const range = computed(() => createRange(Number(props.length), 1));
    const increments = computed(() => range.value.flatMap(v => props.halfIncrements ? [v - 0.5, v] : [v]));
    const hoverIndex = shallowRef(-1);
    const itemState = computed(() => increments.value.map(value => {
      const isHovering = props.hover && hoverIndex.value > -1;
      const isFilled = normalizedValue.value >= value;
      const isHovered = hoverIndex.value >= value;
      const isFullIcon = isHovering ? isHovered : isFilled;
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
      const activeColor = props.activeColor ?? props.color;
      const color = isFilled || isHovered ? activeColor : props.color;
      return {
        isFilled,
        isHovered,
        icon,
        color
      };
    }));
    const eventState = computed(() => [0, ...increments.value].map(value => {
      function onMouseenter() {
        hoverIndex.value = value;
      }
      function onMouseleave() {
        hoverIndex.value = -1;
      }
      function onClick() {
        if (props.disabled || props.readonly) return;
        rating.value = normalizedValue.value === value && props.clearable ? 0 : value;
      }
      return {
        onMouseenter: props.hover ? onMouseenter : undefined,
        onMouseleave: props.hover ? onMouseleave : undefined,
        onClick
      };
    }));
    const uid = useId();
    const name = computed(() => props.name ?? `v-rating-${uid}`);
    function VRatingItem(_ref2) {
      let {
        value,
        index,
        showStar = true
      } = _ref2;
      const {
        onMouseenter,
        onMouseleave,
        onClick
      } = eventState.value[index + 1];
      const id = `${name.value}-${String(value).replace('.', '-')}`;
      const btnProps = {
        color: itemState.value[index]?.color,
        density: props.density,
        disabled: props.disabled,
        icon: itemState.value[index]?.icon,
        ripple: props.ripple,
        size: props.size,
        variant: 'plain'
      };
      return createElementVNode(Fragment, null, [createElementVNode("label", {
        "for": id,
        "class": normalizeClass({
          'v-rating__item--half': props.halfIncrements && value % 1 > 0,
          'v-rating__item--full': props.halfIncrements && value % 1 === 0
        }),
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave,
        "onClick": onClick
      }, [createElementVNode("span", {
        "class": "v-rating__hidden"
      }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? undefined : slots.item ? slots.item({
        ...itemState.value[index],
        props: btnProps,
        value,
        index,
        rating: normalizedValue.value
      }) : createVNode(VBtn, mergeProps({
        "aria-label": t(props.itemAriaLabel, value, props.length)
      }, btnProps), null)]), createElementVNode("input", {
        "class": "v-rating__hidden",
        "name": name.value,
        "id": id,
        "type": "radio",
        "value": value,
        "checked": normalizedValue.value === value,
        "tabindex": -1,
        "readonly": props.readonly,
        "disabled": props.disabled
      }, null)]);
    }
    function createLabel(labelProps) {
      if (slots['item-label']) return slots['item-label'](labelProps);
      if (labelProps.label) return createElementVNode("span", null, [labelProps.label]);
      return createElementVNode("span", null, [createTextVNode("\xA0")]);
    }
    useRender(() => {
      const hasLabels = !!props.itemLabels?.length || slots['item-label'];
      return createVNode(props.tag, {
        "class": normalizeClass(['v-rating', {
          'v-rating--hover': props.hover,
          'v-rating--readonly': props.readonly
        }, themeClasses.value, props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [createVNode(VRatingItem, {
          "value": 0,
          "index": -1,
          "showStar": false
        }, null), range.value.map((value, i) => createElementVNode("div", {
          "class": "v-rating__wrapper"
        }, [hasLabels && props.itemLabelPosition === 'top' ? createLabel({
          value,
          index: i,
          label: props.itemLabels?.[i]
        }) : undefined, createElementVNode("div", {
          "class": "v-rating__item"
        }, [props.halfIncrements ? createElementVNode(Fragment, null, [createVNode(VRatingItem, {
          "value": value - 0.5,
          "index": i * 2
        }, null), createVNode(VRatingItem, {
          "value": value,
          "index": i * 2 + 1
        }, null)]) : createVNode(VRatingItem, {
          "value": value,
          "index": i
        }, null)]), hasLabels && props.itemLabelPosition === 'bottom' ? createLabel({
          value,
          index: i,
          label: props.itemLabels?.[i]
        }) : undefined]))]
      });
    });
    return {};
  }
});

// Types

const rootTypes = {
  actions: 'button@2',
  article: 'heading, paragraph',
  avatar: 'avatar',
  button: 'button',
  card: 'image, heading',
  'card-avatar': 'image, list-item-avatar',
  chip: 'chip',
  'date-picker': 'list-item, heading, divider, date-picker-options, date-picker-days, actions',
  'date-picker-options': 'text, avatar@2',
  'date-picker-days': 'avatar@28',
  divider: 'divider',
  heading: 'heading',
  image: 'image',
  'list-item': 'text',
  'list-item-avatar': 'avatar, text',
  'list-item-two-line': 'sentences',
  'list-item-avatar-two-line': 'avatar, sentences',
  'list-item-three-line': 'paragraph',
  'list-item-avatar-three-line': 'avatar, paragraph',
  ossein: 'ossein',
  paragraph: 'text@3',
  sentences: 'text@2',
  subtitle: 'text',
  table: 'table-heading, table-thead, table-tbody, table-tfoot',
  'table-heading': 'chip, text',
  'table-thead': 'heading@6',
  'table-tbody': 'table-row-divider@6',
  'table-row-divider': 'table-row, divider',
  'table-row': 'text@6',
  'table-tfoot': 'text@2, avatar@2',
  text: 'text'
};
function genBone(type) {
  let children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return createElementVNode("div", {
    "class": normalizeClass(['v-skeleton-loader__bone', `v-skeleton-loader__${type}`])
  }, [children]);
}
function genBones(bone) {
  // e.g. 'text@3'
  const [type, length] = bone.split('@');

  // Generate a length array based upon
  // value after @ in the bone string
  return Array.from({
    length
  }).map(() => genStructure(type));
}
function genStructure(type) {
  let children = [];
  if (!type) return children;

  // TODO: figure out a better way to type this
  const bone = rootTypes[type];

  // End of recursion, do nothing
  /* eslint-disable-next-line no-empty, brace-style */
  if (type === bone) ;
  // Array of values - e.g. 'heading, paragraph, text@2'
  else if (type.includes(',')) return mapBones(type);
  // Array of values - e.g. 'paragraph@4'
  else if (type.includes('@')) return genBones(type);
  // Array of values - e.g. 'card@2'
  else if (bone.includes(',')) children = mapBones(bone);
  // Array of values - e.g. 'list-item@2'
  else if (bone.includes('@')) children = genBones(bone);
  // Single value - e.g. 'card-heading'
  else if (bone) children.push(genStructure(bone));
  return [genBone(type, children)];
}
function mapBones(bones) {
  // Remove spaces and return array of structures
  return bones.replace(/\s/g, '').split(',').map(genStructure);
}
const makeVSkeletonLoaderProps = propsFactory({
  boilerplate: Boolean,
  color: String,
  loading: Boolean,
  loadingText: {
    type: String,
    default: '$vuetify.loading'
  },
  type: {
    type: [String, Array],
    default: 'ossein'
  },
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeThemeProps()
}, 'VSkeletonLoader');
const VSkeletonLoader = genericComponent()({
  name: 'VSkeletonLoader',
  inheritAttrs: false,
  props: makeVSkeletonLoaderProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      t
    } = useLocale();
    const items = computed(() => genStructure(wrapInArray(props.type).join(',')));
    useRender(() => {
      const isLoading = !slots.default || props.loading;
      const loadingProps = props.boilerplate || !isLoading ? {} : {
        ariaLive: 'polite',
        ariaLabel: t(props.loadingText),
        role: 'alert'
      };
      return createElementVNode(Fragment, null, [isLoading ? createElementVNode("div", mergeProps({
        "class": ['v-skeleton-loader', {
          'v-skeleton-loader--boilerplate': props.boilerplate
        }, themeClasses.value, backgroundColorClasses.value, elevationClasses.value],
        "style": [backgroundColorStyles.value, dimensionStyles.value]
      }, loadingProps, attrs), [items.value]) : slots.default?.()]);
    });
    return {};
  }
});

// Composables

// Types

const VSlideGroupItem = genericComponent()({
  name: 'VSlideGroupItem',
  props: makeGroupItemProps(),
  emits: {
    'group:selected': val => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const slideGroupItem = useGroupItem(props, VSlideGroupSymbol);
    return () => slots.default?.({
      isSelected: slideGroupItem.isSelected.value,
      select: slideGroupItem.select,
      toggle: slideGroupItem.toggle,
      selectedClass: slideGroupItem.selectedClass.value
    });
  }
});

// Types

function useCountdown(milliseconds) {
  const time = shallowRef(milliseconds());
  let timer = -1;
  function clear() {
    clearInterval(timer);
  }
  function reset() {
    clear();
    nextTick(() => time.value = milliseconds());
  }
  function start(el) {
    const style = el ? getComputedStyle(el) : {
      transitionDuration: 0.2
    };
    const interval = parseFloat(style.transitionDuration) * 1000 || 200;
    clear();
    if (time.value <= 0) return;
    const startTime = performance.now();
    timer = window.setInterval(() => {
      const elapsed = performance.now() - startTime + interval;
      time.value = Math.max(milliseconds() - elapsed, 0);
      if (time.value <= 0) clear();
    }, interval);
  }
  onScopeDispose(clear);
  return {
    clear,
    time,
    start,
    reset
  };
}
const makeVSnackbarProps = propsFactory({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5000
  },
  vertical: Boolean,
  ...makeLocationProps({
    location: 'bottom'
  }),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeVariantProps(),
  ...makeThemeProps(),
  ...omit(makeVOverlayProps({
    transition: 'v-snackbar-transition'
  }), ['persistent', 'noClickAnimation', 'scrim', 'scrollStrategy', 'stickToTarget'])
}, 'VSnackbar');
const VSnackbar = genericComponent()({
  name: 'VSnackbar',
  props: makeVSnackbarProps(),
  emits: {
    'update:modelValue': v => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const {
      positionClasses
    } = usePosition(props);
    const {
      scopeId
    } = useScopeId();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      roundedClasses
    } = useRounded(props);
    const countdown = useCountdown(() => Number(props.timeout));
    const overlay = ref();
    const timerRef = ref();
    const isHovering = shallowRef(false);
    const startY = shallowRef(0);
    const mainStyles = ref();
    const hasLayout = inject$1(VuetifyLayoutKey, undefined);
    useToggleScope(() => !!hasLayout, () => {
      const layout = useLayout();
      watchEffect(() => {
        mainStyles.value = layout.mainStyles.value;
      });
    });
    watch(isActive, startTimeout);
    watch(() => props.timeout, startTimeout);
    onMounted(() => {
      if (isActive.value) startTimeout();
    });
    let activeTimeout = -1;
    function startTimeout() {
      countdown.reset();
      window.clearTimeout(activeTimeout);
      const timeout = Number(props.timeout);
      if (!isActive.value || timeout === -1) return;
      const element = refElement(timerRef.value);
      countdown.start(element);
      activeTimeout = window.setTimeout(() => {
        isActive.value = false;
      }, timeout);
    }
    function clearTimeout() {
      countdown.reset();
      window.clearTimeout(activeTimeout);
    }
    function onPointerenter() {
      isHovering.value = true;
      clearTimeout();
    }
    function onPointerleave() {
      isHovering.value = false;
      startTimeout();
    }
    function onTouchstart(event) {
      startY.value = event.touches[0].clientY;
    }
    function onTouchend(event) {
      if (Math.abs(startY.value - event.changedTouches[0].clientY) > 50) {
        isActive.value = false;
      }
    }
    function onAfterLeave() {
      if (isHovering.value) onPointerleave();
    }
    const locationClasses = computed(() => {
      return props.location.split(' ').reduce((acc, loc) => {
        acc[`v-snackbar--${loc}`] = true;
        return acc;
      }, {});
    });
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      const hasContent = !!(slots.default || slots.text || props.text);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ['v-snackbar', {
          'v-snackbar--active': isActive.value,
          'v-snackbar--multi-line': props.multiLine && !props.vertical,
          'v-snackbar--timer': !!props.timer,
          'v-snackbar--vertical': props.vertical
        }, locationClasses.value, positionClasses.value, props.class],
        "style": [mainStyles.value, props.style]
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "contentProps": mergeProps({
          class: ['v-snackbar__wrapper', themeClasses.value, colorClasses.value, roundedClasses.value, variantClasses.value],
          style: [colorStyles.value],
          onPointerenter,
          onPointerleave
        }, overlayProps.contentProps),
        "persistent": true,
        "noClickAnimation": true,
        "scrim": false,
        "scrollStrategy": "none",
        "_disableGlobalStack": true,
        "onTouchstartPassive": onTouchstart,
        "onTouchend": onTouchend,
        "onAfterLeave": onAfterLeave
      }, scopeId), {
        default: () => [genOverlays(false, 'v-snackbar'), props.timer && !isHovering.value && createElementVNode("div", {
          "key": "timer",
          "class": "v-snackbar__timer"
        }, [createVNode(VProgressLinear, {
          "ref": timerRef,
          "color": typeof props.timer === 'string' ? props.timer : 'info',
          "max": props.timeout,
          "modelValue": countdown.time.value
        }, null)]), hasContent && createElementVNode("div", {
          "key": "content",
          "class": "v-snackbar__content",
          "role": "status",
          "aria-live": "polite"
        }, [slots.text?.() ?? props.text, slots.default?.()]), slots.actions && createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              variant: 'text',
              ripple: false,
              slim: true
            }
          }
        }, {
          default: () => [createElementVNode("div", {
            "class": "v-snackbar__actions"
          }, [slots.actions({
            isActive
          })])]
        })],
        activator: slots.activator
      });
    });
    return forwardRefs({}, overlay);
  }
});

// Types

const makeVSnackbarQueueProps = propsFactory({
  // TODO: Port this to Snackbar on dev
  closable: [Boolean, String],
  closeText: {
    type: String,
    default: '$vuetify.dismiss'
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  ...omit(makeVSnackbarProps(), ['modelValue'])
}, 'VSnackbarQueue');
const VSnackbarQueue = genericComponent()({
  name: 'VSnackbarQueue',
  props: makeVSnackbarQueueProps(),
  emits: {
    'update:modelValue': val => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const isActive = shallowRef(false);
    const isVisible = shallowRef(false);
    const current = shallowRef();
    watch(() => props.modelValue.length, (val, oldVal) => {
      if (!isVisible.value && val > oldVal) {
        showNext();
      }
    });
    watch(isActive, val => {
      if (val) isVisible.value = true;
    });
    function onAfterLeave() {
      if (props.modelValue.length) {
        showNext();
      } else {
        current.value = undefined;
        isVisible.value = false;
      }
    }
    function showNext() {
      const [next, ...rest] = props.modelValue;
      emit('update:modelValue', rest);
      current.value = typeof next === 'string' ? {
        text: next
      } : next;
      nextTick(() => {
        isActive.value = true;
      });
    }
    function onClickClose() {
      isActive.value = false;
    }
    const btnProps = computed(() => ({
      color: typeof props.closable === 'string' ? props.closable : undefined,
      text: t(props.closeText)
    }));
    useRender(() => {
      const hasActions = !!(props.closable || slots.actions);
      const {
        modelValue: _,
        ...snackbarProps
      } = VSnackbar.filterProps(props);
      return createElementVNode(Fragment, null, [isVisible.value && !!current.value && (slots.default ? createVNode(VDefaultsProvider, {
        "defaults": {
          VSnackbar: current.value
        }
      }, {
        default: () => [slots.default({
          item: current.value
        })]
      }) : createVNode(VSnackbar, mergeProps(snackbarProps, current.value, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "onAfterLeave": onAfterLeave
      }), {
        text: slots.text ? () => slots.text?.({
          item: current.value
        }) : undefined,
        actions: hasActions ? () => createElementVNode(Fragment, null, [!slots.actions ? createVNode(VBtn, mergeProps(btnProps.value, {
          "onClick": onClickClose
        }), null) : createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: btnProps.value
          }
        }, {
          default: () => [slots.actions({
            item: current.value,
            props: {
              onClick: onClickClose
            }
          })]
        })]) : undefined
      }))]);
    });
  }
});

// Utilities

// Types

const makeLineProps = propsFactory({
  autoDraw: Boolean,
  autoDrawDuration: [Number, String],
  autoDrawEasing: {
    type: String,
    default: 'ease'
  },
  color: String,
  gradient: {
    type: Array,
    default: () => []
  },
  gradientDirection: {
    type: String,
    validator: val => ['top', 'bottom', 'left', 'right'].includes(val),
    default: 'top'
  },
  height: {
    type: [String, Number],
    default: 75
  },
  labels: {
    type: Array,
    default: () => []
  },
  labelSize: {
    type: [Number, String],
    default: 7
  },
  lineWidth: {
    type: [String, Number],
    default: 4
  },
  id: String,
  itemValue: {
    type: String,
    default: 'value'
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  min: [String, Number],
  max: [String, Number],
  padding: {
    type: [String, Number],
    default: 8
  },
  showLabels: Boolean,
  smooth: [Boolean, String, Number],
  width: {
    type: [Number, String],
    default: 300
  }
}, 'Line');

// Utilities

// Types

const makeVBarlineProps = propsFactory({
  autoLineWidth: Boolean,
  ...makeLineProps()
}, 'VBarline');
const VBarline = genericComponent()({
  name: 'VBarline',
  props: makeVBarlineProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const uid = useId();
    const id = computed(() => props.id || `barline-${uid}`);
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || 500);
    const hasLabels = computed(() => {
      return Boolean(props.showLabels || props.labels.length > 0 || !!slots?.label);
    });
    const lineWidth = computed(() => parseFloat(props.lineWidth) || 4);
    const totalWidth = computed(() => Math.max(props.modelValue.length * lineWidth.value, Number(props.width)));
    const boundary = computed(() => {
      return {
        minX: 0,
        maxX: totalWidth.value,
        minY: 0,
        maxY: parseInt(props.height, 10)
      };
    });
    const items = computed(() => props.modelValue.map(item => getPropertyFromItem(item, props.itemValue, item)));
    function genBars(values, boundary) {
      const {
        minX,
        maxX,
        minY,
        maxY
      } = boundary;
      const totalValues = values.length;
      let maxValue = props.max != null ? Number(props.max) : Math.max(...values);
      let minValue = props.min != null ? Number(props.min) : Math.min(...values);
      if (minValue > 0 && props.min == null) minValue = 0;
      if (maxValue < 0 && props.max == null) maxValue = 0;
      const gridX = maxX / (totalValues === 1 ? 2 : totalValues);
      const gridY = (maxY - minY) / (maxValue - minValue || 1);
      const horizonY = maxY - Math.abs(minValue * gridY);
      return values.map((value, index) => {
        const height = Math.abs(gridY * value);
        return {
          x: minX + index * gridX,
          y: horizonY - height + Number(value < 0) * height,
          height,
          value
        };
      });
    }
    const parsedLabels = computed(() => {
      const labels = [];
      const points = genBars(items.value, boundary.value);
      const len = points.length;
      for (let i = 0; labels.length < len; i++) {
        const item = points[i];
        let value = props.labels[i];
        if (!value) {
          value = typeof item === 'object' ? item.value : item;
        }
        labels.push({
          x: item.x,
          value: String(value)
        });
      }
      return labels;
    });
    const bars = computed(() => genBars(items.value, boundary.value));
    const offsetX = computed(() => bars.value.length === 1 ? (boundary.value.maxX - lineWidth.value) / 2 : (Math.abs(bars.value[0].x - bars.value[1].x) - lineWidth.value) / 2);
    const smooth = computed(() => typeof props.smooth === 'boolean' ? props.smooth ? 2 : 0 : Number(props.smooth));
    useRender(() => {
      const gradientData = !props.gradient.slice().length ? [''] : props.gradient.slice().reverse();
      return createElementVNode("svg", {
        "display": "block"
      }, [createElementVNode("defs", null, [createElementVNode("linearGradient", {
        "id": id.value,
        "gradientUnits": "userSpaceOnUse",
        "x1": props.gradientDirection === 'left' ? '100%' : '0',
        "y1": props.gradientDirection === 'top' ? '100%' : '0',
        "x2": props.gradientDirection === 'right' ? '100%' : '0',
        "y2": props.gradientDirection === 'bottom' ? '100%' : '0'
      }, [gradientData.map((color, index) => createElementVNode("stop", {
        "offset": index / Math.max(gradientData.length - 1, 1),
        "stop-color": color || 'currentColor'
      }, null))])]), createElementVNode("clipPath", {
        "id": `${id.value}-clip`
      }, [bars.value.map(item => createElementVNode("rect", {
        "x": item.x + offsetX.value,
        "y": item.y,
        "width": lineWidth.value,
        "height": item.height,
        "rx": smooth.value,
        "ry": smooth.value
      }, [props.autoDraw && !PREFERS_REDUCED_MOTION() && createElementVNode(Fragment, null, [createElementVNode("animate", {
        "attributeName": "y",
        "from": item.y + item.height,
        "to": item.y,
        "dur": `${autoDrawDuration.value}ms`,
        "fill": "freeze"
      }, null), createElementVNode("animate", {
        "attributeName": "height",
        "from": "0",
        "to": item.height,
        "dur": `${autoDrawDuration.value}ms`,
        "fill": "freeze"
      }, null)])]))]), hasLabels.value && createElementVNode("g", {
        "key": "labels",
        "style": {
          textAnchor: 'middle',
          dominantBaseline: 'mathematical',
          fill: 'currentColor'
        }
      }, [parsedLabels.value.map((item, i) => createElementVNode("text", {
        "x": item.x + offsetX.value + lineWidth.value / 2,
        "y": parseInt(props.height, 10) - 2 + (parseInt(props.labelSize, 10) || 7 * 0.75),
        "font-size": Number(props.labelSize) || 7
      }, [slots.label?.({
        index: i,
        value: item.value
      }) ?? item.value]))]), createElementVNode("g", {
        "clip-path": `url(#${id.value}-clip)`,
        "fill": `url(#${id.value})`
      }, [createElementVNode("rect", {
        "x": 0,
        "y": 0,
        "width": Math.max(props.modelValue.length * lineWidth.value, Number(props.width)),
        "height": props.height
      }, null)])]);
    });
  }
});

// @ts-nocheck
/* eslint-disable */

// import { checkCollinear, getDistance, moveTo } from './math'

/**
 * From https://github.com/unsplash/react-trend/blob/master/src/helpers/DOM.helpers.js#L18
 */
function genPath(points, radius) {
  let fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 75;
  if (points.length === 0) return '';
  const start = points.shift();
  const end = points[points.length - 1];
  return (fill ? `M${start.x} ${height - start.x + 2} L${start.x} ${start.y}` : `M${start.x} ${start.y}`) + points.map((point, index) => {
    const next = points[index + 1];
    const prev = points[index - 1] || start;
    const isCollinear = next && checkCollinear(next, point, prev);
    if (!next || isCollinear) {
      return `L${point.x} ${point.y}`;
    }
    const threshold = Math.min(getDistance(prev, point), getDistance(next, point));
    const isTooCloseForRadius = threshold / 2 < radius;
    const radiusForPoint = isTooCloseForRadius ? threshold / 2 : radius;
    const before = moveTo(prev, point, radiusForPoint);
    const after = moveTo(next, point, radiusForPoint);
    return `L${before.x} ${before.y}S${point.x} ${point.y} ${after.x} ${after.y}`;
  }).join('') + (fill ? `L${end.x} ${height - start.x + 2} Z` : '');
}
function int(value) {
  return parseInt(value, 10);
}

/**
 * https://en.wikipedia.org/wiki/Collinearity
 * x=(x1+x2)/2
 * y=(y1+y2)/2
 */
function checkCollinear(p0, p1, p2) {
  return int(p0.x + p2.x) === int(2 * p1.x) && int(p0.y + p2.y) === int(2 * p1.y);
}
function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
function moveTo(to, from, radius) {
  const vector = {
    x: to.x - from.x,
    y: to.y - from.y
  };
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  const unitVector = {
    x: vector.x / length,
    y: vector.y / length
  };
  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius
  };
}

// Utilities

// Types

const makeVTrendlineProps = propsFactory({
  fill: Boolean,
  ...makeLineProps()
}, 'VTrendline');
const VTrendline = genericComponent()({
  name: 'VTrendline',
  props: makeVTrendlineProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const uid = useId();
    const id = computed(() => props.id || `trendline-${uid}`);
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || (props.fill ? 500 : 2000));
    const lastLength = ref(0);
    const path = ref(null);
    function genPoints(values, boundary) {
      const {
        minX,
        maxX,
        minY,
        maxY
      } = boundary;
      if (values.length === 1) {
        values = [values[0], values[0]];
      }
      const totalValues = values.length;
      const maxValue = props.max != null ? Number(props.max) : Math.max(...values);
      const minValue = props.min != null ? Number(props.min) : Math.min(...values);
      const gridX = (maxX - minX) / (totalValues - 1);
      const gridY = (maxY - minY) / (maxValue - minValue || 1);
      return values.map((value, index) => {
        return {
          x: minX + index * gridX,
          y: maxY - (value - minValue) * gridY,
          value
        };
      });
    }
    const hasLabels = computed(() => {
      return Boolean(props.showLabels || props.labels.length > 0 || !!slots?.label);
    });
    const lineWidth = computed(() => {
      return parseFloat(props.lineWidth) || 4;
    });
    const totalWidth = computed(() => Number(props.width));
    const boundary = computed(() => {
      const padding = Number(props.padding);
      return {
        minX: padding,
        maxX: totalWidth.value - padding,
        minY: padding,
        maxY: parseInt(props.height, 10) - padding
      };
    });
    const items = computed(() => props.modelValue.map(item => getPropertyFromItem(item, props.itemValue, item)));
    const parsedLabels = computed(() => {
      const labels = [];
      const points = genPoints(items.value, boundary.value);
      const len = points.length;
      for (let i = 0; labels.length < len; i++) {
        const item = points[i];
        let value = props.labels[i];
        if (!value) {
          value = typeof item === 'object' ? item.value : item;
        }
        labels.push({
          x: item.x,
          value: String(value)
        });
      }
      return labels;
    });
    watch(() => props.modelValue, async () => {
      await nextTick();
      if (!props.autoDraw || !path.value || PREFERS_REDUCED_MOTION()) return;
      const pathRef = path.value;
      const length = pathRef.getTotalLength();
      if (!props.fill) {
        // Initial setup to "hide" the line by using the stroke dash array
        pathRef.style.strokeDasharray = `${length}`;
        pathRef.style.strokeDashoffset = `${length}`;

        // Force reflow to ensure the transition starts from this state
        pathRef.getBoundingClientRect();

        // Animate the stroke dash offset to "draw" the line
        pathRef.style.transition = `stroke-dashoffset ${autoDrawDuration.value}ms ${props.autoDrawEasing}`;
        pathRef.style.strokeDashoffset = '0';
      } else {
        // Your existing logic for filled paths remains the same
        pathRef.style.transformOrigin = 'bottom center';
        pathRef.style.transition = 'none';
        pathRef.style.transform = `scaleY(0)`;
        pathRef.getBoundingClientRect();
        pathRef.style.transition = `transform ${autoDrawDuration.value}ms ${props.autoDrawEasing}`;
        pathRef.style.transform = `scaleY(1)`;
      }
      lastLength.value = length;
    }, {
      immediate: true
    });
    function genPath$1(fill) {
      const smoothValue = typeof props.smooth === 'boolean' ? props.smooth ? 8 : 0 : Number(props.smooth);
      return genPath(genPoints(items.value, boundary.value), smoothValue, fill, parseInt(props.height, 10));
    }
    useRender(() => {
      const gradientData = !props.gradient.slice().length ? [''] : props.gradient.slice().reverse();
      return createElementVNode("svg", {
        "display": "block",
        "stroke-width": parseFloat(props.lineWidth) ?? 4
      }, [createElementVNode("defs", null, [createElementVNode("linearGradient", {
        "id": id.value,
        "gradientUnits": "userSpaceOnUse",
        "x1": props.gradientDirection === 'left' ? '100%' : '0',
        "y1": props.gradientDirection === 'top' ? '100%' : '0',
        "x2": props.gradientDirection === 'right' ? '100%' : '0',
        "y2": props.gradientDirection === 'bottom' ? '100%' : '0'
      }, [gradientData.map((color, index) => createElementVNode("stop", {
        "offset": index / Math.max(gradientData.length - 1, 1),
        "stop-color": color || 'currentColor'
      }, null))])]), hasLabels.value && createElementVNode("g", {
        "key": "labels",
        "style": {
          textAnchor: 'middle',
          dominantBaseline: 'mathematical',
          fill: 'currentColor'
        }
      }, [parsedLabels.value.map((item, i) => createElementVNode("text", {
        "x": item.x + lineWidth.value / 2 + lineWidth.value / 2,
        "y": parseInt(props.height, 10) - 4 + (parseInt(props.labelSize, 10) || 7 * 0.75),
        "font-size": Number(props.labelSize) || 7
      }, [slots.label?.({
        index: i,
        value: item.value
      }) ?? item.value]))]), createElementVNode("path", {
        "ref": path,
        "d": genPath$1(props.fill),
        "fill": props.fill ? `url(#${id.value})` : 'none',
        "stroke": props.fill ? 'none' : `url(#${id.value})`
      }, null), props.fill && createElementVNode("path", {
        "d": genPath$1(false),
        "fill": "none",
        "stroke": props.color ?? props.gradient?.[0]
      }, null)]);
    });
  }
});

// Types

// Types

const makeVSparklineProps = propsFactory({
  type: {
    type: String,
    default: 'trend'
  },
  ...makeVBarlineProps(),
  ...makeVTrendlineProps()
}, 'VSparkline');
const VSparkline = genericComponent()({
  name: 'VSparkline',
  props: makeVSparklineProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    const hasLabels = computed(() => {
      return Boolean(props.showLabels || props.labels.length > 0 || !!slots?.label);
    });
    const totalHeight = computed(() => {
      let height = parseInt(props.height, 10);
      if (hasLabels.value) height += parseInt(props.labelSize, 10) * 1.5;
      return height;
    });
    useRender(() => {
      const Tag = props.type === 'trend' ? VTrendline : VBarline;
      const lineProps = props.type === 'trend' ? VTrendline.filterProps(props) : VBarline.filterProps(props);
      return createVNode(Tag, mergeProps({
        "key": props.type,
        "class": textColorClasses.value,
        "style": textColorStyles.value,
        "viewBox": `0 0 ${props.width} ${parseInt(totalHeight.value, 10)}`
      }, lineProps), slots);
    });
  }
});

// Types

const makeVSpeedDialProps = propsFactory({
  ...makeComponentProps(),
  ...makeVMenuProps({
    offset: 8,
    minWidth: 0,
    openDelay: 0,
    closeDelay: 100,
    location: 'top center',
    transition: 'scale-transition'
  })
}, 'VSpeedDial');
const VSpeedDial = genericComponent()({
  name: 'VSpeedDial',
  props: makeVSpeedDialProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const menuRef = ref();
    const location = computed(() => {
      const [y, x = 'center'] = props.location?.split(' ') ?? [];
      return `${y} ${x}`;
    });
    const locationClasses = computed(() => ({
      [`v-speed-dial__content--${location.value.replace(' ', '-')}`]: true
    }));
    useRender(() => {
      const menuProps = VMenu.filterProps(props);
      return createVNode(VMenu, mergeProps(menuProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": props.class,
        "style": props.style,
        "contentClass": ['v-speed-dial__content', locationClasses.value, props.contentClass],
        "location": location.value,
        "ref": menuRef,
        "transition": "fade-transition"
      }), {
        ...slots,
        default: slotProps => createVNode(VDefaultsProvider, {
          "defaults": {
            VBtn: {
              size: 'small'
            }
          }
        }, {
          default: () => [createVNode(MaybeTransition, {
            "appear": true,
            "group": true,
            "transition": props.transition
          }, {
            default: () => [slots.default?.(slotProps)]
          })]
        })
      });
    });
    return {};
  }
});

// Types

const VStepperSymbol = Symbol.for('vuetify:v-stepper');

// Types

const makeVStepperActionsProps = propsFactory({
  color: String,
  disabled: {
    type: [Boolean, String],
    default: false
  },
  prevText: {
    type: String,
    default: '$vuetify.stepper.prev'
  },
  nextText: {
    type: String,
    default: '$vuetify.stepper.next'
  }
}, 'VStepperActions');
const VStepperActions = genericComponent()({
  name: 'VStepperActions',
  props: makeVStepperActionsProps(),
  emits: {
    'click:prev': () => true,
    'click:next': () => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    function onClickPrev() {
      emit('click:prev');
    }
    function onClickNext() {
      emit('click:next');
    }
    useRender(() => {
      const prevSlotProps = {
        onClick: onClickPrev
      };
      const nextSlotProps = {
        onClick: onClickNext
      };
      return createElementVNode("div", {
        "class": "v-stepper-actions"
      }, [createVNode(VDefaultsProvider, {
        "defaults": {
          VBtn: {
            disabled: ['prev', true].includes(props.disabled),
            text: t(props.prevText),
            variant: 'text'
          }
        }
      }, {
        default: () => [slots.prev?.({
          props: prevSlotProps
        }) ?? createVNode(VBtn, prevSlotProps, null)]
      }), createVNode(VDefaultsProvider, {
        "defaults": {
          VBtn: {
            color: props.color,
            disabled: ['next', true].includes(props.disabled),
            text: t(props.nextText),
            variant: 'tonal'
          }
        }
      }, {
        default: () => [slots.next?.({
          props: nextSlotProps
        }) ?? createVNode(VBtn, nextSlotProps, null)]
      })]);
    });
    return {};
  }
});

// Utilities
const VStepperHeader = createSimpleFunctional('v-stepper-header');

// Types

const makeStepperItemProps = propsFactory({
  color: String,
  title: String,
  subtitle: String,
  complete: Boolean,
  completeIcon: {
    type: IconValue,
    default: '$complete'
  },
  editable: Boolean,
  editIcon: {
    type: IconValue,
    default: '$edit'
  },
  error: Boolean,
  errorIcon: {
    type: IconValue,
    default: '$error'
  },
  icon: IconValue,
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  rules: {
    type: Array,
    default: () => []
  }
}, 'StepperItem');
const makeVStepperItemProps = propsFactory({
  ...makeStepperItemProps(),
  ...makeGroupItemProps()
}, 'VStepperItem');
const VStepperItem = genericComponent()({
  name: 'VStepperItem',
  directives: {
    vRipple: Ripple
  },
  props: makeVStepperItemProps(),
  emits: {
    'group:selected': val => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = useGroupItem(props, VStepperSymbol, true);
    const step = computed(() => group?.value.value ?? props.value);
    const isValid = computed(() => props.rules.every(handler => handler() === true));
    const isClickable = computed(() => !props.disabled && props.editable);
    const canEdit = computed(() => !props.disabled && props.editable);
    const hasError = computed(() => props.error || !isValid.value);
    const hasCompleted = computed(() => props.complete || props.rules.length > 0 && isValid.value);
    const icon = computed(() => {
      if (hasError.value) return props.errorIcon;
      if (hasCompleted.value) return props.completeIcon;
      if (group.isSelected.value && props.editable) return props.editIcon;
      return props.icon;
    });
    const slotProps = computed(() => ({
      canEdit: canEdit.value,
      hasError: hasError.value,
      hasCompleted: hasCompleted.value,
      title: props.title,
      subtitle: props.subtitle,
      step: step.value,
      value: props.value
    }));
    useRender(() => {
      const hasColor = (!group || group.isSelected.value || hasCompleted.value || canEdit.value) && !hasError.value && !props.disabled;
      const hasTitle = !!(props.title != null || slots.title);
      const hasSubtitle = !!(props.subtitle != null || slots.subtitle);
      function onClick() {
        group?.toggle();
      }
      return withDirectives(createElementVNode("button", {
        "class": normalizeClass(['v-stepper-item', {
          'v-stepper-item--complete': hasCompleted.value,
          'v-stepper-item--disabled': props.disabled,
          'v-stepper-item--error': hasError.value
        }, group?.selectedClass.value]),
        "disabled": !props.editable,
        "type": "button",
        "onClick": onClick
      }, [isClickable.value && genOverlays(true, 'v-stepper-item'), createVNode(VAvatar, {
        "key": "stepper-avatar",
        "class": "v-stepper-item__avatar",
        "color": hasColor ? props.color : undefined,
        "size": 24
      }, {
        default: () => [slots.icon?.(slotProps.value) ?? (icon.value ? createVNode(VIcon, {
          "icon": icon.value
        }, null) : step.value)]
      }), createElementVNode("div", {
        "class": "v-stepper-item__content"
      }, [hasTitle && createElementVNode("div", {
        "key": "title",
        "class": "v-stepper-item__title"
      }, [slots.title?.(slotProps.value) ?? props.title]), hasSubtitle && createElementVNode("div", {
        "key": "subtitle",
        "class": "v-stepper-item__subtitle"
      }, [slots.subtitle?.(slotProps.value) ?? props.subtitle]), slots.default?.(slotProps.value)])]), [[Ripple, props.editable && props.ripple, null]]);
    });
    return {};
  }
});

const makeVStepperWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ['continuous', 'nextIcon', 'prevIcon', 'showArrows', 'touch', 'mandatory'])
}, 'VStepperWindow');
const VStepperWindow = genericComponent()({
  name: 'VStepperWindow',
  props: makeVStepperWindowProps(),
  emits: {
    'update:modelValue': v => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = inject$1(VStepperSymbol, null);
    const _model = useProxiedModel(props, 'modelValue');
    const model = computed({
      get() {
        // Always return modelValue if defined
        // or if not within a VStepper group
        if (_model.value != null || !group) return _model.value;

        // If inside of a VStepper, find the currently selected
        // item by id. Item value may be assigned by its index
        return group.items.value.find(item => group.selected.value.includes(item.id))?.value;
      },
      set(val) {
        _model.value = val;
      }
    });
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "_as": "VStepperWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-stepper-window', props.class],
        "style": props.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});

const makeVStepperWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, 'VStepperWindowItem');
const VStepperWindowItem = genericComponent()({
  name: 'VStepperWindowItem',
  props: makeVStepperWindowItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VStepperWindowItem"
      }, windowItemProps, {
        "class": ['v-stepper-window-item', props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});

// Types

const makeStepperProps = propsFactory({
  altLabels: Boolean,
  bgColor: String,
  completeIcon: IconValue,
  editIcon: IconValue,
  editable: Boolean,
  errorIcon: IconValue,
  hideActions: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: String,
    default: 'title'
  },
  itemValue: {
    type: String,
    default: 'value'
  },
  nonLinear: Boolean,
  flat: Boolean,
  ...makeDisplayProps()
}, 'Stepper');
const makeVStepperProps = propsFactory({
  ...makeStepperProps(),
  ...makeGroupProps({
    mandatory: 'force',
    selectedClass: 'v-stepper-item--selected'
  }),
  ...makeVSheetProps(),
  ...pick(makeVStepperActionsProps(), ['prevText', 'nextText'])
}, 'VStepper');
const VStepper = genericComponent()({
  name: 'VStepper',
  props: makeVStepperProps(),
  emits: {
    'update:modelValue': v => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      items: _items,
      next,
      prev,
      selected
    } = useGroup(props, VStepperSymbol);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const {
      completeIcon,
      editIcon,
      errorIcon,
      color,
      editable,
      prevText,
      nextText
    } = toRefs(props);
    const items = computed(() => props.items.map((item, index) => {
      const title = getPropertyFromItem(item, props.itemTitle, item);
      const value = getPropertyFromItem(item, props.itemValue, index + 1);
      return {
        title,
        value,
        raw: item
      };
    }));
    const activeIndex = computed(() => {
      return _items.value.findIndex(item => selected.value.includes(item.id));
    });
    const disabled = computed(() => {
      if (props.disabled) return props.disabled;
      if (activeIndex.value === 0) return 'prev';
      if (activeIndex.value === _items.value.length - 1) return 'next';
      return false;
    });
    provideDefaults({
      VStepperItem: {
        editable,
        errorIcon,
        completeIcon,
        editIcon,
        prevText,
        nextText
      },
      VStepperActions: {
        color,
        disabled,
        prevText,
        nextText
      }
    });
    useRender(() => {
      const sheetProps = VSheet.filterProps(props);
      const hasHeader = !!(slots.header || props.items.length);
      const hasWindow = props.items.length > 0;
      const hasActions = !props.hideActions && !!(hasWindow || slots.actions);
      return createVNode(VSheet, mergeProps(sheetProps, {
        "color": props.bgColor,
        "class": ['v-stepper', {
          'v-stepper--alt-labels': props.altLabels,
          'v-stepper--flat': props.flat,
          'v-stepper--non-linear': props.nonLinear,
          'v-stepper--mobile': mobile.value
        }, displayClasses.value, props.class],
        "style": props.style
      }), {
        default: () => [hasHeader && createVNode(VStepperHeader, {
          "key": "stepper-header"
        }, {
          default: () => [items.value.map((_ref2, index) => {
            let {
              raw,
              ...item
            } = _ref2;
            return createElementVNode(Fragment, null, [!!index && createVNode(VDivider, null, null), createVNode(VStepperItem, item, {
              default: slots[`header-item.${item.value}`] ?? slots.header,
              icon: slots.icon,
              title: slots.title,
              subtitle: slots.subtitle
            })]);
          })]
        }), hasWindow && createVNode(VStepperWindow, {
          "key": "stepper-window"
        }, {
          default: () => [items.value.map(item => createVNode(VStepperWindowItem, {
            "value": item.value
          }, {
            default: () => slots[`item.${item.value}`]?.(item) ?? slots.item?.(item)
          }))]
        }), slots.default?.({
          prev,
          next
        }), hasActions && (slots.actions?.({
          next,
          prev
        }) ?? createVNode(VStepperActions, {
          "key": "stepper-actions",
          "onClick:prev": prev,
          "onClick:next": next
        }, slots))]
      });
    });
    return {
      prev,
      next
    };
  }
});

// Types

const makeVSwitchProps = propsFactory({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: false
  },
  ...makeVInputProps(),
  ...makeVSelectionControlProps()
}, 'VSwitch');
const VSwitch = genericComponent()({
  name: 'VSwitch',
  inheritAttrs: false,
  props: makeVSwitchProps(),
  emits: {
    'update:focused': focused => true,
    'update:modelValue': value => true,
    'update:indeterminate': value => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, 'indeterminate');
    const model = useProxiedModel(props, 'modelValue');
    const {
      loaderClasses
    } = useLoader(props);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const control = ref();
    const inputRef = ref();
    const isForcedColorsModeActive = IN_BROWSER && window.matchMedia('(forced-colors: active)').matches;
    const loaderColor = toRef(() => {
      return typeof props.loading === 'string' && props.loading !== '' ? props.loading : props.color;
    });
    const uid = useId();
    const id = toRef(() => props.id || `switch-${uid}`);
    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }
    function onTrackClick(e) {
      e.stopPropagation();
      e.preventDefault();
      control.value?.input?.click();
    }
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props);
      const controlProps = VSelectionControl.filterProps(props);
      return createVNode(VInput, mergeProps({
        "ref": inputRef,
        "class": ['v-switch', {
          'v-switch--flat': props.flat
        }, {
          'v-switch--inset': props.inset
        }, {
          'v-switch--indeterminate': indeterminate.value
        }, loaderClasses.value, props.class]
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "id": id.value,
        "focused": isFocused.value,
        "style": props.style
      }), {
        ...slots,
        default: _ref2 => {
          let {
            id,
            messagesId,
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          const slotProps = {
            model,
            isValid
          };
          return createVNode(VSelectionControl, mergeProps({
            "ref": control
          }, controlProps, {
            "modelValue": model.value,
            "onUpdate:modelValue": [$event => model.value = $event, onChange],
            "id": id.value,
            "aria-describedby": messagesId.value,
            "type": "checkbox",
            "aria-checked": indeterminate.value ? 'mixed' : undefined,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value,
            "onFocus": focus,
            "onBlur": blur
          }, controlAttrs), {
            ...slots,
            default: _ref3 => {
              let {
                backgroundColorClasses,
                backgroundColorStyles
              } = _ref3;
              return createElementVNode("div", {
                "class": normalizeClass(['v-switch__track', !isForcedColorsModeActive ? backgroundColorClasses.value : undefined]),
                "style": normalizeStyle(backgroundColorStyles.value),
                "onClick": onTrackClick
              }, [slots['track-true'] && createElementVNode("div", {
                "key": "prepend",
                "class": "v-switch__track-true"
              }, [slots['track-true'](slotProps)]), slots['track-false'] && createElementVNode("div", {
                "key": "append",
                "class": "v-switch__track-false"
              }, [slots['track-false'](slotProps)])]);
            },
            input: _ref4 => {
              let {
                inputNode,
                icon,
                backgroundColorClasses,
                backgroundColorStyles
              } = _ref4;
              return createElementVNode(Fragment, null, [inputNode, createElementVNode("div", {
                "class": normalizeClass(['v-switch__thumb', {
                  'v-switch__thumb--filled': icon || props.loading
                }, props.inset || isForcedColorsModeActive ? undefined : backgroundColorClasses.value]),
                "style": normalizeStyle(props.inset ? undefined : backgroundColorStyles.value)
              }, [slots.thumb ? createVNode(VDefaultsProvider, {
                "defaults": {
                  VIcon: {
                    icon,
                    size: 'x-small'
                  }
                }
              }, {
                default: () => [slots.thumb({
                  ...slotProps,
                  icon
                })]
              }) : createVNode(VScaleTransition, null, {
                default: () => [!props.loading ? icon && createVNode(VIcon, {
                  "key": String(icon),
                  "icon": icon,
                  "size": "x-small"
                }, null) : createVNode(LoaderSlot, {
                  "name": "v-switch",
                  "active": true,
                  "color": isValid.value === false ? undefined : loaderColor.value
                }, {
                  default: slotProps => slots.loader ? slots.loader(slotProps) : createVNode(VProgressCircular, {
                    "active": slotProps.isActive,
                    "color": slotProps.color,
                    "indeterminate": true,
                    "size": "16",
                    "width": "2"
                  }, null)
                })]
              })])]);
            }
          });
        }
      });
    });
    return forwardRefs({}, inputRef);
  }
});

const makeVSystemBarProps = propsFactory({
  color: String,
  height: [Number, String],
  window: Boolean,
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, 'VSystemBar');
const VSystemBar = genericComponent()({
  name: 'VSystemBar',
  props: makeVSystemBarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const height = computed(() => props.height ?? (props.window ? 32 : 24));
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: shallowRef('top'),
      layoutSize: height,
      elementSize: height,
      active: computed(() => true),
      absolute: toRef(() => props.absolute)
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-system-bar', {
        'v-system-bar--window': props.window
      }, themeClasses.value, backgroundColorClasses.value, elevationClasses.value, roundedClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, props.style])
    }, slots));
    return {};
  }
});

// Types

const VTabsSymbol = Symbol.for('vuetify:v-tabs');

// Types

const makeVTabProps = propsFactory({
  fixed: Boolean,
  sliderColor: String,
  hideSlider: Boolean,
  direction: {
    type: String,
    default: 'horizontal'
  },
  ...omit(makeVBtnProps({
    selectedClass: 'v-tab--selected',
    variant: 'text'
  }), ['active', 'block', 'flat', 'location', 'position', 'symbol'])
}, 'VTab');
const VTab = genericComponent()({
  name: 'VTab',
  props: makeVTabProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(() => props.sliderColor);
    const rootEl = ref();
    const sliderEl = ref();
    const isHorizontal = computed(() => props.direction === 'horizontal');
    const isSelected = computed(() => rootEl.value?.group?.isSelected.value ?? false);
    function updateSlider(_ref2) {
      let {
        value
      } = _ref2;
      if (value) {
        const prevEl = rootEl.value?.$el.parentElement?.querySelector('.v-tab--selected .v-tab__slider');
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl) return;
        const color = getComputedStyle(prevEl).color;
        const prevBox = prevEl.getBoundingClientRect();
        const nextBox = nextEl.getBoundingClientRect();
        const xy = isHorizontal.value ? 'x' : 'y';
        const XY = isHorizontal.value ? 'X' : 'Y';
        const rightBottom = isHorizontal.value ? 'right' : 'bottom';
        const widthHeight = isHorizontal.value ? 'width' : 'height';
        const prevPos = prevBox[xy];
        const nextPos = nextBox[xy];
        const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
        const origin = Math.sign(delta) > 0 ? isHorizontal.value ? 'right' : 'bottom' : Math.sign(delta) < 0 ? isHorizontal.value ? 'left' : 'top' : 'center';
        const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
        const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
        const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;
        const sigma = 1.5;
        animate(nextEl, {
          backgroundColor: [color, 'currentcolor'],
          transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, 'none'],
          transformOrigin: Array(3).fill(origin)
        }, {
          duration: 225,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const btnProps = VBtn.filterProps(props);
      return createVNode(VBtn, mergeProps({
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ['v-tab', props.class],
        "style": props.style,
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false
      }, btnProps, attrs, {
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : undefined,
        "onGroup:selected": updateSlider
      }), {
        ...slots,
        default: () => createElementVNode(Fragment, null, [slots.default?.() ?? props.text, !props.hideSlider && createElementVNode("div", {
          "ref": sliderEl,
          "class": normalizeClass(['v-tab__slider', sliderColorClasses.value]),
          "style": normalizeStyle(sliderColorStyles.value)
        }, null)])
      });
    });
    return forwardRefs({}, rootEl);
  }
});

const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ['continuous', 'nextIcon', 'prevIcon', 'showArrows', 'touch', 'mandatory'])
}, 'VTabsWindow');
const VTabsWindow = genericComponent()({
  name: 'VTabsWindow',
  props: makeVTabsWindowProps(),
  emits: {
    'update:modelValue': v => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = inject$1(VTabsSymbol, null);
    const _model = useProxiedModel(props, 'modelValue');
    const model = computed({
      get() {
        // Always return modelValue if defined
        // or if not within a VTabs group
        if (_model.value != null || !group) return _model.value;

        // If inside of a VTabs, find the currently selected
        // item by id. Item value may be assigned by its index
        return group.items.value.find(item => group.selected.value.includes(item.id))?.value;
      },
      set(val) {
        _model.value = val;
      }
    });
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "_as": "VTabsWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-tabs-window', props.class],
        "style": props.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});

const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, 'VTabsWindowItem');
const VTabsWindowItem = genericComponent()({
  name: 'VTabsWindowItem',
  props: makeVTabsWindowItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VTabsWindowItem"
      }, windowItemProps, {
        "class": ['v-tabs-window-item', props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});

// Types

function parseItems(items) {
  if (!items) return [];
  return items.map(item => {
    if (!isObject(item)) return {
      text: item,
      value: item
    };
    return item;
  });
}
const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String,
    default: 'start'
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: undefined
  },
  hideSlider: Boolean,
  sliderColor: String,
  ...pick(makeVTabProps(), ['spaced']),
  ...makeVSlideGroupProps({
    mandatory: 'force',
    selectedClass: 'v-tab-item--selected'
  }),
  ...makeDensityProps(),
  ...makeTagProps()
}, 'VTabs');
const VTabs = genericComponent()({
  name: 'VTabs',
  props: makeVTabsProps(),
  emits: {
    'update:modelValue': v => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const items = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      scopeId
    } = useScopeId();
    provideDefaults({
      VTab: {
        color: toRef(() => props.color),
        direction: toRef(() => props.direction),
        stacked: toRef(() => props.stacked),
        fixed: toRef(() => props.fixedTabs),
        sliderColor: toRef(() => props.sliderColor),
        hideSlider: toRef(() => props.hideSlider)
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      const hasWindow = !!(slots.window || props.items.length > 0);
      return createElementVNode(Fragment, null, [createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-tabs', `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
          'v-tabs--fixed-tabs': props.fixedTabs,
          'v-tabs--grow': props.grow,
          'v-tabs--stacked': props.stacked
        }, densityClasses.value, backgroundColorClasses.value, props.class],
        "style": [{
          '--v-tabs-height': convertToUnit(props.height)
        }, backgroundColorStyles.value, props.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }, scopeId, attrs), {
        default: () => [slots.default?.() ?? items.value.map(item => slots.tab?.({
          item
        }) ?? createVNode(VTab, mergeProps(item, {
          "key": item.text,
          "value": item.value,
          "spaced": props.spaced
        }), {
          default: slots[`tab.${item.value}`] ? () => slots[`tab.${item.value}`]?.({
            item
          }) : undefined
        }))]
      }), hasWindow && createVNode(VTabsWindow, mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "key": "tabs-window"
      }, scopeId), {
        default: () => [items.value.map(item => slots.item?.({
          item
        }) ?? createVNode(VTabsWindowItem, {
          "value": item.value
        }, {
          default: () => slots[`item.${item.value}`]?.({
            item
          })
        })), slots.window?.()]
      })]);
    });
    return {};
  }
});

// Types

const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: v => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: v => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeAutocompleteProps(),
  ...makeVInputProps(),
  ...makeVFieldProps()
}, 'VTextarea');
const VTextarea = genericComponent()({
  name: 'VTextarea',
  directives: {
    vIntersect: Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    'click:control': e => true,
    'mousedown:control': e => true,
    'update:focused': focused => true,
    'update:modelValue': val => true,
    'update:rows': rows => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      onIntersect
    } = useAutofocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value) : (model.value || '').toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== 'number' && typeof props.counter !== 'string') return undefined;
      return props.counter;
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef('');
    const textareaRef = ref();
    const autocomplete = useAutocomplete(props);
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      if (autocomplete.isSuppressing.value) {
        autocomplete.update();
      }
      if (textareaRef.value !== document.activeElement) {
        textareaRef.value?.focus();
      }
      if (!isFocused.value) focus();
    }
    function onControlClick(e) {
      onFocus();
      emit('click:control', e);
    }
    function onControlMousedown(e) {
      emit('mousedown:control', e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = '';
        callEvent(props['onClick:clear'], e);
      });
    }
    function onInput(e) {
      const el = e.target;
      model.value = el.value;
      if (props.modelModifiers?.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    const sizerRef = ref();
    const rows = ref(Number(props.rows));
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow) rows.value = Number(props.rows);
    });
    function calculateInputHeight() {
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue('--v-field-padding-top')) + parseFloat(style.getPropertyValue('--v-input-padding-top')) + parseFloat(style.getPropertyValue('--v-field-padding-bottom'));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue('--v-input-control-height')));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height ?? 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    onMounted(calculateInputHeight);
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    watch(rows, val => {
      emit('update:rows', val);
    });
    let observer;
    watch(sizerRef, val => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer?.disconnect();
      }
    });
    onBeforeUnmount(() => {
      observer?.disconnect();
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = {
        ...VField.filterProps(props),
        'onClick:clear': onClear
      };
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": $event => model.value = $event,
        "class": ['v-textarea v-text-field', {
          'v-textarea--prefixed': props.prefix,
          'v-textarea--suffixed': props.suffix,
          'v-text-field--prefixed': props.prefix,
          'v-text-field--suffixed': props.suffix,
          'v-textarea--auto-grow': props.autoGrow,
          'v-textarea--no-resize': props.noResize || props.autoGrow,
          'v-input--plain-underlined': isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: _ref2 => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid,
            hasDetails
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              '--v-textarea-control-height': controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:prependInner": props['onClick:prependInner'],
            "onClick:appendInner": props['onClick:appendInner']
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "details": hasDetails.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: _ref3 => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createElementVNode(Fragment, null, [props.prefix && createElementVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createElementVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": autocomplete.fieldName.value,
                "autocomplete": autocomplete.fieldAutocomplete.value,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[Intersect, {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createElementVNode("textarea", {
                "class": normalizeClass([fieldClass, 'v-textarea__sizer']),
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": $event => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createElementVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? slotProps => createElementVNode(Fragment, null, [slots.details?.(slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
          "active": props.persistentCounter || isFocused.value,
          "value": counterValue.value,
          "max": max.value,
          "disabled": props.disabled
        }, slots.counter)])]) : undefined
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});

const makeVThemeProviderProps = propsFactory({
  withBackground: Boolean,
  ...makeComponentProps(),
  ...makeThemeProps(),
  ...makeTagProps()
}, 'VThemeProvider');
const VThemeProvider = genericComponent()({
  name: 'VThemeProvider',
  props: makeVThemeProviderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    return () => {
      if (!props.withBackground) return slots.default?.();
      return createVNode(props.tag, {
        "class": normalizeClass(['v-theme-provider', themeClasses.value, props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [slots.default?.()]
      });
    };
  }
});

const makeVTimelineDividerProps = propsFactory({
  dotColor: String,
  fillDot: Boolean,
  hideDot: Boolean,
  icon: IconValue,
  iconColor: String,
  lineColor: String,
  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeElevationProps()
}, 'VTimelineDivider');
const VTimelineDivider = genericComponent()({
  name: 'VTimelineDivider',
  props: makeVTimelineDividerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props, 'v-timeline-divider__dot');
    const {
      backgroundColorStyles,
      backgroundColorClasses
    } = useBackgroundColor(() => props.dotColor);
    const {
      roundedClasses
    } = useRounded(props, 'v-timeline-divider__dot');
    const {
      elevationClasses
    } = useElevation(props);
    const {
      backgroundColorClasses: lineColorClasses,
      backgroundColorStyles: lineColorStyles
    } = useBackgroundColor(() => props.lineColor);
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(['v-timeline-divider', {
        'v-timeline-divider--fill-dot': props.fillDot
      }, props.class]),
      "style": normalizeStyle(props.style)
    }, [createElementVNode("div", {
      "class": normalizeClass(['v-timeline-divider__before', lineColorClasses.value]),
      "style": normalizeStyle(lineColorStyles.value)
    }, null), !props.hideDot && createElementVNode("div", {
      "key": "dot",
      "class": normalizeClass(['v-timeline-divider__dot', elevationClasses.value, roundedClasses.value, sizeClasses.value]),
      "style": normalizeStyle(sizeStyles.value)
    }, [createElementVNode("div", {
      "class": normalizeClass(['v-timeline-divider__inner-dot', backgroundColorClasses.value, roundedClasses.value]),
      "style": normalizeStyle(backgroundColorStyles.value)
    }, [!slots.default ? createVNode(VIcon, {
      "key": "icon",
      "color": props.iconColor,
      "icon": props.icon,
      "size": props.size
    }, null) : createVNode(VDefaultsProvider, {
      "key": "icon-defaults",
      "disabled": !props.icon,
      "defaults": {
        VIcon: {
          color: props.iconColor,
          icon: props.icon,
          size: props.size
        }
      }
    }, slots.default)])]), createElementVNode("div", {
      "class": normalizeClass(['v-timeline-divider__after', lineColorClasses.value]),
      "style": normalizeStyle(lineColorStyles.value)
    }, null)]));
    return {};
  }
});

// Types

// Types

const makeVTimelineItemProps = propsFactory({
  density: String,
  dotColor: String,
  fillDot: Boolean,
  hideDot: Boolean,
  hideOpposite: {
    type: Boolean,
    default: undefined
  },
  icon: IconValue,
  iconColor: String,
  lineInset: [Number, String],
  side: {
    type: String,
    validator: v => v == null || ['start', 'end'].includes(v)
  },
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps()
}, 'VTimelineItem');
const VTimelineItem = genericComponent()({
  name: 'VTimelineItem',
  props: makeVTimelineItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const dotSize = shallowRef(0);
    const dotRef = ref();
    watch(dotRef, newValue => {
      if (!newValue) return;
      dotSize.value = newValue.$el.querySelector('.v-timeline-divider__dot')?.getBoundingClientRect().width ?? 0;
    }, {
      flush: 'post'
    });
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(['v-timeline-item', {
        'v-timeline-item--fill-dot': props.fillDot,
        'v-timeline-item--side-start': props.side === 'start',
        'v-timeline-item--side-end': props.side === 'end'
      }, props.class]),
      "style": normalizeStyle([{
        '--v-timeline-dot-size': convertToUnit(dotSize.value),
        '--v-timeline-line-inset': props.lineInset ? `calc(var(--v-timeline-dot-size) / 2 + ${convertToUnit(props.lineInset)})` : convertToUnit(0)
      }, props.style])
    }, [createElementVNode("div", {
      "class": "v-timeline-item__body",
      "style": normalizeStyle(dimensionStyles.value)
    }, [slots.default?.()]), createVNode(VTimelineDivider, {
      "ref": dotRef,
      "hideDot": props.hideDot,
      "icon": props.icon,
      "iconColor": props.iconColor,
      "size": props.size,
      "elevation": props.elevation,
      "dotColor": props.dotColor,
      "fillDot": props.fillDot,
      "rounded": props.rounded
    }, {
      default: slots.icon
    }), props.density !== 'compact' && createElementVNode("div", {
      "class": "v-timeline-item__opposite"
    }, [!props.hideOpposite && slots.opposite?.()])]));
    return {};
  }
});

const makeVTimelineProps = propsFactory({
  align: {
    type: String,
    default: 'center',
    validator: v => ['center', 'start'].includes(v)
  },
  direction: {
    type: String,
    default: 'vertical',
    validator: v => ['vertical', 'horizontal'].includes(v)
  },
  justify: {
    type: String,
    default: 'auto',
    validator: v => ['auto', 'center'].includes(v)
  },
  side: {
    type: String,
    validator: v => v == null || ['start', 'end'].includes(v)
  },
  lineThickness: {
    type: [String, Number],
    default: 2
  },
  lineColor: String,
  truncateLine: {
    type: String,
    validator: v => ['start', 'end', 'both'].includes(v)
  },
  ...pick(makeVTimelineItemProps({
    lineInset: 0
  }), ['dotColor', 'fillDot', 'hideOpposite', 'iconColor', 'lineInset', 'size']),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, 'VTimeline');
const VTimeline = genericComponent()({
  name: 'VTimeline',
  props: makeVTimelineProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      rtlClasses
    } = useRtl();
    provideDefaults({
      VTimelineDivider: {
        lineColor: toRef(() => props.lineColor)
      },
      VTimelineItem: {
        density: toRef(() => props.density),
        dotColor: toRef(() => props.dotColor),
        fillDot: toRef(() => props.fillDot),
        hideOpposite: toRef(() => props.hideOpposite),
        iconColor: toRef(() => props.iconColor),
        lineColor: toRef(() => props.lineColor),
        lineInset: toRef(() => props.lineInset),
        size: toRef(() => props.size)
      }
    });
    const sideClasses = computed(() => {
      const side = props.side ? props.side : props.density !== 'default' ? 'end' : null;
      return side && `v-timeline--side-${side}`;
    });
    const truncateClasses = computed(() => {
      const classes = ['v-timeline--truncate-line-start', 'v-timeline--truncate-line-end'];
      switch (props.truncateLine) {
        case 'both':
          return classes;
        case 'start':
          return classes[0];
        case 'end':
          return classes[1];
        default:
          return null;
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(['v-timeline', `v-timeline--${props.direction}`, `v-timeline--align-${props.align}`, `v-timeline--justify-${props.justify}`, truncateClasses.value, {
        'v-timeline--inset-line': !!props.lineInset
      }, themeClasses.value, densityClasses.value, sideClasses.value, rtlClasses.value, props.class]),
      "style": normalizeStyle([{
        '--v-timeline-line-thickness': convertToUnit(props.lineThickness)
      }, props.style])
    }, slots));
    return {};
  }
});

function pad(n) {
  let length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return String(n).padStart(length, '0');
}

// Types

const makeVTimePickerClockProps = propsFactory({
  allowedValues: Function,
  ampm: Boolean,
  color: String,
  disabled: Boolean,
  displayedValue: null,
  double: Boolean,
  format: {
    type: Function,
    default: val => val
  },
  max: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  scrollable: Boolean,
  readonly: Boolean,
  rotate: {
    type: Number,
    default: 0
  },
  step: {
    type: Number,
    default: 1
  },
  modelValue: {
    type: Number
  }
}, 'VTimePickerClock');
const VTimePickerClock = genericComponent()({
  name: 'VTimePickerClock',
  props: makeVTimePickerClockProps(),
  emits: {
    change: val => true,
    input: val => true
  },
  setup(props, _ref) {
    let {
      emit
    } = _ref;
    const clockRef = ref(null);
    const innerClockRef = ref(null);
    const inputValue = ref(undefined);
    const isDragging = ref(false);
    const valueOnMouseDown = ref(null);
    const valueOnMouseUp = ref(null);
    const emitChangeDebounced = debounce(value => emit('change', value), 750);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.color);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const count = computed(() => props.max - props.min + 1);
    const roundCount = computed(() => props.double ? count.value / 2 : count.value);
    const degreesPerUnit = computed(() => 360 / roundCount.value);
    const degrees = computed(() => degreesPerUnit.value * Math.PI / 180);
    const displayedValue = computed(() => props.modelValue == null ? props.min : props.modelValue);
    const innerRadiusScale = computed(() => 0.62);
    const genChildren = computed(() => {
      const children = [];
      for (let value = props.min; value <= props.max; value = value + props.step) {
        children.push(value);
      }
      return children;
    });
    watch(() => props.modelValue, val => {
      inputValue.value = val;
    });
    function update(value) {
      if (inputValue.value !== value) {
        inputValue.value = value;
      }
      emit('input', value);
    }
    function isAllowed(value) {
      return !props.allowedValues || props.allowedValues(value);
    }
    function wheel(e) {
      if (!props.scrollable || props.disabled) return;
      e.preventDefault();
      const delta = Math.sign(-e.deltaY || 1);
      let value = displayedValue.value;
      do {
        value = value + delta;
        value = (value - props.min + count.value) % count.value + props.min;
      } while (!isAllowed(value) && value !== displayedValue.value);
      if (value !== props.displayedValue) {
        update(value);
      }
      emitChangeDebounced(value);
    }
    function isInner(value) {
      return props.double && value - props.min >= roundCount.value;
    }
    function handScale(value) {
      return isInner(value) ? innerRadiusScale.value : 1;
    }
    function getPosition(value) {
      const rotateRadians = props.rotate * Math.PI / 180;
      return {
        x: Math.sin((value - props.min) * degrees.value + rotateRadians) * handScale(value),
        y: -Math.cos((value - props.min) * degrees.value + rotateRadians) * handScale(value)
      };
    }
    function angleToValue(angle, insideClick) {
      const value = (Math.round(angle / degreesPerUnit.value) + (insideClick ? roundCount.value : 0)) % count.value + props.min;

      // Necessary to fix edge case when selecting left part of the value(s) at 12 o'clock
      if (angle < 360 - degreesPerUnit.value / 2) return value;
      return insideClick ? props.max - roundCount.value + 1 : props.min;
    }
    function getTransform(i) {
      const {
        x,
        y
      } = getPosition(i);
      return {
        left: `${Math.round(50 + x * 50)}%`,
        top: `${Math.round(50 + y * 50)}%`
      };
    }
    function euclidean(p0, p1) {
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    function angle(center, p1) {
      const value = 2 * Math.atan2(p1.y - center.y - euclidean(center, p1), p1.x - center.x);
      return Math.abs(value * 180 / Math.PI);
    }
    function setMouseDownValue(value) {
      if (valueOnMouseDown.value === null) {
        valueOnMouseDown.value = value;
      }
      valueOnMouseUp.value = value;
      update(value);
    }
    function onDragMove(e) {
      e.preventDefault();
      if (!isDragging.value && e.type !== 'click' || !clockRef.value) return;
      const {
        width,
        top,
        left
      } = clockRef.value?.getBoundingClientRect();
      const {
        width: innerWidth
      } = innerClockRef.value?.getBoundingClientRect() ?? {
        width: 0
      };
      const {
        clientX,
        clientY
      } = 'touches' in e ? e.touches[0] : e;
      const center = {
        x: width / 2,
        y: -width / 2
      };
      const coords = {
        x: clientX - left,
        y: top - clientY
      };
      const handAngle = Math.round(angle(center, coords) - props.rotate + 360) % 360;
      const insideClick = props.double && euclidean(center, coords) < (innerWidth + innerWidth * innerRadiusScale.value) / 4;
      const checksCount = Math.ceil(15 / degreesPerUnit.value);
      let value;
      for (let i = 0; i < checksCount; i++) {
        value = angleToValue(handAngle + i * degreesPerUnit.value, insideClick);
        if (isAllowed(value)) return setMouseDownValue(value);
        value = angleToValue(handAngle - i * degreesPerUnit.value, insideClick);
        if (isAllowed(value)) return setMouseDownValue(value);
      }
    }
    function onMouseDown(e) {
      if (props.disabled) return;
      e.preventDefault();
      window.addEventListener('mousemove', onDragMove);
      window.addEventListener('touchmove', onDragMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchend', onMouseUp);
      valueOnMouseDown.value = null;
      valueOnMouseUp.value = null;
      isDragging.value = true;
      onDragMove(e);
    }
    function onMouseUp(e) {
      e.stopPropagation();
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('touchmove', onDragMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
      isDragging.value = false;
      if (valueOnMouseUp.value !== null && isAllowed(valueOnMouseUp.value)) {
        emit('change', valueOnMouseUp.value);
      }
    }
    useRender(() => {
      return createElementVNode("div", {
        "class": normalizeClass([{
          'v-time-picker-clock': true,
          'v-time-picker-clock--indeterminate': props.modelValue == null,
          'v-time-picker-clock--readonly': props.readonly
        }]),
        "onMousedown": onMouseDown,
        "onTouchstart": onMouseDown,
        "onWheel": wheel,
        "ref": clockRef
      }, [createElementVNode("div", {
        "class": "v-time-picker-clock__inner",
        "ref": innerClockRef
      }, [createElementVNode("div", {
        "class": normalizeClass([{
          'v-time-picker-clock__hand': true,
          'v-time-picker-clock__hand--inner': isInner(props.modelValue)
        }, textColorClasses.value]),
        "style": normalizeStyle([{
          transform: `rotate(${props.rotate + degreesPerUnit.value * (displayedValue.value - props.min)}deg) scaleY(${handScale(displayedValue.value)})`
        }, textColorStyles.value])
      }, null), genChildren.value.map(value => {
        const isActive = value === displayedValue.value;
        return createElementVNode("div", {
          "class": normalizeClass([{
            'v-time-picker-clock__item': true,
            'v-time-picker-clock__item--active': isActive,
            'v-time-picker-clock__item--disabled': props.disabled || !isAllowed(value)
          }, isActive && backgroundColorClasses.value]),
          "style": normalizeStyle([getTransform(value), isActive && backgroundColorStyles.value])
        }, [createElementVNode("span", null, [props.format(value)])]);
      })])]);
    });
  }
});

// Types

const makeVTimePickerControlsProps = propsFactory({
  ampm: Boolean,
  color: String,
  disabled: Boolean,
  hour: Number,
  minute: Number,
  second: Number,
  period: String,
  readonly: Boolean,
  useSeconds: Boolean,
  value: Number,
  viewMode: String
}, 'VTimePickerControls');
const VTimePickerControls = genericComponent()({
  name: 'VTimePickerControls',
  props: makeVTimePickerControlsProps(),
  emits: {
    'update:period': data => true,
    'update:viewMode': data => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    useRender(() => {
      let hour = props.hour;
      if (props.ampm) {
        hour = hour ? (hour - 1) % 12 + 1 : 12;
      }
      return createElementVNode("div", {
        "class": "v-time-picker-controls"
      }, [createElementVNode("div", {
        "class": normalizeClass({
          'v-time-picker-controls__time': true,
          'v-time-picker-controls__time--with-seconds': props.useSeconds
        })
      }, [createVNode(VBtn, {
        "active": props.viewMode === 'hour',
        "color": props.viewMode === 'hour' ? props.color : undefined,
        "disabled": props.disabled,
        "variant": "tonal",
        "class": normalizeClass({
          'v-time-picker-controls__time__btn': true,
          'v-time-picker-controls__time--with-ampm__btn': props.ampm,
          'v-time-picker-controls__time--with-seconds__btn': props.useSeconds
        }),
        "text": props.hour == null ? '--' : pad(`${hour}`),
        "onClick": () => emit('update:viewMode', 'hour')
      }, null), createElementVNode("span", {
        "class": normalizeClass(['v-time-picker-controls__time__separator', {
          'v-time-picker-controls--with-seconds__time__separator': props.useSeconds
        }])
      }, [createTextVNode(":")]), createVNode(VBtn, {
        "active": props.viewMode === 'minute',
        "color": props.viewMode === 'minute' ? props.color : undefined,
        "class": normalizeClass({
          'v-time-picker-controls__time__btn': true,
          'v-time-picker-controls__time__btn__active': props.viewMode === 'minute',
          'v-time-picker-controls__time--with-ampm__btn': props.ampm,
          'v-time-picker-controls__time--with-seconds__btn': props.useSeconds
        }),
        "disabled": props.disabled,
        "variant": "tonal",
        "text": props.minute == null ? '--' : pad(props.minute),
        "onClick": () => emit('update:viewMode', 'minute')
      }, null), props.useSeconds && createElementVNode("span", {
        "class": normalizeClass(['v-time-picker-controls__time__separator', {
          'v-time-picker-controls--with-seconds__time__separator': props.useSeconds
        }]),
        "key": "secondsDivider"
      }, [createTextVNode(":")]), props.useSeconds && createVNode(VBtn, {
        "key": "secondsVal",
        "active": props.viewMode === 'second',
        "color": props.viewMode === 'second' ? props.color : undefined,
        "variant": "tonal",
        "onClick": () => emit('update:viewMode', 'second'),
        "class": normalizeClass({
          'v-time-picker-controls__time__btn': true,
          'v-time-picker-controls__time__btn__active': props.viewMode === 'second',
          'v-time-picker-controls__time--with-seconds__btn': props.useSeconds
        }),
        "disabled": props.disabled,
        "text": props.second == null ? '--' : pad(props.second)
      }, null), props.ampm && createElementVNode("div", {
        "class": "v-time-picker-controls__ampm"
      }, [createVNode(VBtn, {
        "active": props.period === 'am',
        "color": props.period === 'am' ? props.color : undefined,
        "class": normalizeClass({
          'v-time-picker-controls__ampm__am': true,
          'v-time-picker-controls__ampm__btn': true,
          'v-time-picker-controls__ampm__btn__active': props.period === 'am'
        }),
        "disabled": props.disabled,
        "text": t('$vuetify.timePicker.am'),
        "variant": props.disabled && props.period === 'am' ? 'elevated' : 'tonal',
        "onClick": () => props.period !== 'am' ? emit('update:period', 'am') : null
      }, null), createVNode(VBtn, {
        "active": props.period === 'pm',
        "color": props.period === 'pm' ? props.color : undefined,
        "class": normalizeClass({
          'v-time-picker-controls__ampm__pm': true,
          'v-time-picker-controls__ampm__btn': true,
          'v-time-picker-controls__ampm__btn__active': props.period === 'pm'
        }),
        "disabled": props.disabled,
        "text": t('$vuetify.timePicker.pm'),
        "variant": props.disabled && props.period === 'pm' ? 'elevated' : 'tonal',
        "onClick": () => props.period !== 'pm' ? emit('update:period', 'pm') : null
      }, null)])])]);
    });
    return {};
  }
});

// Types

const rangeHours24 = createRange(24);
const rangeHours12am = createRange(12);
const rangeHours12pm = rangeHours12am.map(v => v + 12);
createRange(60);
const makeVTimePickerProps = propsFactory({
  allowedHours: [Function, Array],
  allowedMinutes: [Function, Array],
  allowedSeconds: [Function, Array],
  disabled: Boolean,
  format: {
    type: String,
    default: 'ampm'
  },
  max: String,
  min: String,
  viewMode: {
    type: String,
    default: 'hour'
  },
  period: {
    type: String,
    default: 'am',
    validator: v => ['am', 'pm'].includes(v)
  },
  modelValue: null,
  readonly: Boolean,
  scrollable: Boolean,
  useSeconds: Boolean,
  ...omit(makeVPickerProps({
    title: '$vuetify.timePicker.title'
  }), ['landscape'])
}, 'VTimePicker');
const VTimePicker = genericComponent()({
  name: 'VTimePicker',
  props: makeVTimePickerProps(),
  emits: {
    'update:hour': val => true,
    'update:minute': val => true,
    'update:period': val => true,
    'update:second': val => true,
    'update:modelValue': val => true,
    'update:viewMode': val => true
  },
  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const inputHour = ref(null);
    const inputMinute = ref(null);
    const inputSecond = ref(null);
    const lazyInputHour = ref(null);
    const lazyInputMinute = ref(null);
    const lazyInputSecond = ref(null);
    const period = useProxiedModel(props, 'period', 'am');
    const viewMode = useProxiedModel(props, 'viewMode', 'hour');
    const controlsRef = ref(null);
    const clockRef = ref(null);
    const isAllowedHourCb = computed(() => {
      let cb;
      if (props.allowedHours instanceof Array) {
        cb = val => props.allowedHours.includes(val);
      } else {
        cb = props.allowedHours;
      }
      if (!props.min && !props.max) return cb;
      const minHour = props.min ? Number(props.min.split(':')[0]) : 0;
      const maxHour = props.max ? Number(props.max.split(':')[0]) : 23;
      return val => {
        return val >= Number(minHour) && val <= Number(maxHour) && (!cb || cb(val));
      };
    });
    const isAllowedMinuteCb = computed(() => {
      let cb;
      const isHourAllowed = !isAllowedHourCb.value || inputHour.value === null || isAllowedHourCb.value(inputHour.value);
      if (props.allowedMinutes instanceof Array) {
        cb = val => props.allowedMinutes.includes(val);
      } else {
        cb = props.allowedMinutes;
      }
      if (!props.min && !props.max) {
        return isHourAllowed ? cb : () => false;
      }
      const [minHour, minMinute] = props.min ? props.min.split(':').map(Number) : [0, 0];
      const [maxHour, maxMinute] = props.max ? props.max.split(':').map(Number) : [23, 59];
      const minTime = minHour * 60 + Number(minMinute);
      const maxTime = maxHour * 60 + Number(maxMinute);
      return val => {
        const time = 60 * inputHour.value + val;
        return time >= minTime && time <= maxTime && isHourAllowed && (!cb || cb(val));
      };
    });
    const isAllowedSecondCb = computed(() => {
      let cb;
      const isHourAllowed = !isAllowedHourCb.value || inputHour.value === null || isAllowedHourCb.value(inputHour.value);
      const isMinuteAllowed = isHourAllowed && (!isAllowedMinuteCb.value || inputMinute.value === null || isAllowedMinuteCb.value(inputMinute.value));
      if (props.allowedSeconds instanceof Array) {
        cb = val => props.allowedSeconds.includes(val);
      } else {
        cb = props.allowedSeconds;
      }
      if (!props.min && !props.max) {
        return isMinuteAllowed ? cb : () => false;
      }
      const [minHour, minMinute, minSecond] = props.min ? props.min.split(':').map(Number) : [0, 0, 0];
      const [maxHour, maxMinute, maxSecond] = props.max ? props.max.split(':').map(Number) : [23, 59, 59];
      const minTime = minHour * 3600 + minMinute * 60 + Number(minSecond || 0);
      const maxTime = maxHour * 3600 + maxMinute * 60 + Number(maxSecond || 0);
      return val => {
        const time = 3600 * inputHour.value + 60 * inputMinute.value + val;
        return time >= minTime && time <= maxTime && isMinuteAllowed && (!cb || cb(val));
      };
    });
    const isAmPm = computed(() => {
      return props.format === 'ampm';
    });
    watch(() => props.period, val => setPeriod(val));
    watch(() => props.modelValue, val => setInputData(val));
    onMounted(() => {
      setInputData(props.modelValue);
    });
    function genValue() {
      if (inputHour.value != null && inputMinute.value != null && (!props.useSeconds || inputSecond.value != null)) {
        return `${pad(inputHour.value)}:${pad(inputMinute.value)}` + (props.useSeconds ? `:${pad(inputSecond.value)}` : '');
      }
      return null;
    }
    function emitValue() {
      const value = genValue();
      if (value !== null) emit('update:modelValue', value);
    }
    function convert24to12(hour) {
      return hour ? (hour - 1) % 12 + 1 : 12;
    }
    function convert12to24(hour, period) {
      return hour % 12 + (period === 'pm' ? 12 : 0);
    }
    function setInputData(value) {
      if (value == null || value === '') {
        inputHour.value = null;
        inputMinute.value = null;
        inputSecond.value = null;
      } else if (value instanceof Date) {
        inputHour.value = value.getHours();
        inputMinute.value = value.getMinutes();
        inputSecond.value = value.getSeconds();
      } else {
        const [hour,, minute,, second, period] = value.trim().toLowerCase().match(/^(\d+):(\d+)(:(\d+))?([ap]m)?$/) || new Array(6);
        inputHour.value = period ? convert12to24(parseInt(hour, 10), period) : parseInt(hour, 10);
        inputMinute.value = parseInt(minute, 10);
        inputSecond.value = parseInt(second || 0, 10);
      }
      period.value = inputHour.value == null || inputHour.value < 12 ? 'am' : 'pm';
    }
    function firstAllowed(type, value) {
      const allowedFn = isAllowedHourCb.value ;
      if (!allowedFn) return value;

      // TODO: clean up (Note from V2 code)
      const range = isAmPm.value ? value < 12 ? rangeHours12am : rangeHours12pm : rangeHours24;
      const first = range.find(v => allowedFn((v + value) % range.length + range[0]));
      return ((first || 0) + value) % range.length + range[0];
    }
    function setPeriod(val) {
      period.value = val;
      if (inputHour.value != null) {
        const newHour = inputHour.value + (period.value === 'am' ? -12 : 12);
        inputHour.value = firstAllowed('hour', newHour);
      }
      emit('update:period', val);
      emitValue();
      return true;
    }
    function onInput(value) {
      if (viewMode.value === 'hour') {
        inputHour.value = isAmPm.value ? convert12to24(value, period.value) : value;
      } else if (viewMode.value === 'minute') {
        inputMinute.value = value;
      } else {
        inputSecond.value = value;
      }
    }
    function onChange(value) {
      switch (viewMode.value || 'hour') {
        case 'hour':
          emit('update:hour', value);
          break;
        case 'minute':
          emit('update:minute', value);
          break;
        case 'second':
          emit('update:second', value);
          break;
      }
      const emitChange = inputHour.value !== null && inputMinute.value !== null && (props.useSeconds ? inputSecond.value !== null : true);
      if (viewMode.value === 'hour') {
        viewMode.value = 'minute';
      } else if (props.useSeconds && viewMode.value === 'minute') {
        viewMode.value = 'second';
      }
      if (inputHour.value === lazyInputHour.value && inputMinute.value === lazyInputMinute.value && (!props.useSeconds || inputSecond.value === lazyInputSecond.value)) return;
      const time = genValue();
      if (time === null) return;
      lazyInputHour.value = inputHour.value;
      lazyInputMinute.value = inputMinute.value;
      props.useSeconds && (lazyInputSecond.value = inputSecond.value);
      emitChange && emitValue();
    }
    useRender(() => {
      const pickerProps = VPicker.filterProps(props);
      const timePickerControlsProps = VTimePickerControls.filterProps(props);
      const timePickerClockProps = VTimePickerClock.filterProps(omit(props, ['format', 'modelValue', 'min', 'max']));
      return createVNode(VPicker, mergeProps(pickerProps, {
        "color": undefined,
        "class": ['v-time-picker', props.class],
        "style": props.style
      }), {
        title: () => slots.title?.() ?? createElementVNode("div", {
          "class": "v-time-picker__title"
        }, [t(props.title)]),
        header: () => createVNode(VTimePickerControls, mergeProps(timePickerControlsProps, {
          "ampm": isAmPm.value,
          "hour": inputHour.value,
          "minute": inputMinute.value,
          "period": period.value,
          "second": inputSecond.value,
          "viewMode": viewMode.value,
          "onUpdate:period": val => setPeriod(val),
          "onUpdate:viewMode": value => viewMode.value = value,
          "ref": controlsRef
        }), null),
        default: () => createVNode(VTimePickerClock, mergeProps(timePickerClockProps, {
          "allowedValues": viewMode.value === 'hour' ? isAllowedHourCb.value : viewMode.value === 'minute' ? isAllowedMinuteCb.value : isAllowedSecondCb.value,
          "double": viewMode.value === 'hour' && !isAmPm.value,
          "format": viewMode.value === 'hour' ? isAmPm.value ? convert24to12 : val => val : val => pad(val, 2),
          "max": viewMode.value === 'hour' ? isAmPm.value && period.value === 'am' ? 11 : 23 : 59,
          "min": viewMode.value === 'hour' && isAmPm.value && period.value === 'pm' ? 12 : 0,
          "size": 20,
          "step": viewMode.value === 'hour' ? 1 : 5,
          "modelValue": viewMode.value === 'hour' ? inputHour.value : viewMode.value === 'minute' ? inputMinute.value : inputSecond.value,
          "onChange": onChange,
          "onInput": onInput,
          "ref": clockRef
        }), null),
        actions: slots.actions
      });
    });
  }
});

const makeVToolbarItemsProps = propsFactory({
  ...makeComponentProps(),
  ...makeVariantProps({
    variant: 'text'
  })
}, 'VToolbarItems');
const VToolbarItems = genericComponent()({
  name: 'VToolbarItems',
  props: makeVToolbarItemsProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults({
      VBtn: {
        color: toRef(() => props.color),
        height: 'inherit',
        variant: toRef(() => props.variant)
      }
    });
    useRender(() => createElementVNode("div", {
      "class": normalizeClass(['v-toolbar-items', props.class]),
      "style": normalizeStyle(props.style)
    }, [slots.default?.()]));
    return {};
  }
});

// Types

const makeVTooltipProps = propsFactory({
  id: String,
  interactive: Boolean,
  text: String,
  ...omit(makeVOverlayProps({
    closeOnBack: false,
    location: 'end',
    locationStrategy: 'connected',
    eager: true,
    minWidth: 0,
    offset: 10,
    openOnClick: false,
    openOnHover: true,
    origin: 'auto',
    scrim: false,
    scrollStrategy: 'reposition',
    stickToTarget: true,
    transition: null
  }), ['absolute', 'persistent'])
}, 'VTooltip');
const VTooltip = genericComponent()({
  name: 'VTooltip',
  props: makeVTooltipProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const {
      scopeId
    } = useScopeId();
    const uid = useId();
    const id = toRef(() => props.id || `v-tooltip-${uid}`);
    const overlay = ref();
    const location = computed(() => {
      return props.location.split(' ').length > 1 ? props.location : props.location + ' center';
    });
    const origin = computed(() => {
      return props.origin === 'auto' || props.origin === 'overlap' || props.origin.split(' ').length > 1 || props.location.split(' ').length > 1 ? props.origin : props.origin + ' center';
    });
    const transition = toRef(() => {
      if (props.transition != null) return props.transition;
      return isActive.value ? 'scale-transition' : 'fade-transition';
    });
    const activatorProps = computed(() => mergeProps({
      'aria-describedby': id.value
    }, props.activatorProps));
    useRender(() => {
      const overlayProps = VOverlay.filterProps(props);
      return createVNode(VOverlay, mergeProps({
        "ref": overlay,
        "class": ['v-tooltip', {
          'v-tooltip--interactive': props.interactive
        }, props.class],
        "style": props.style,
        "id": id.value
      }, overlayProps, {
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "transition": transition.value,
        "absolute": true,
        "location": location.value,
        "origin": origin.value,
        "persistent": true,
        "role": "tooltip",
        "activatorProps": activatorProps.value,
        "_disableGlobalStack": true
      }, scopeId), {
        activator: slots.activator,
        default: function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return slots.default?.(...args) ?? props.text;
        }
      });
    });
    return forwardRefs({}, overlay);
  }
});

// Types

const makeVTreeviewGroupProps = propsFactory({
  ...omit(makeVListGroupProps({
    collapseIcon: '$treeviewCollapse',
    expandIcon: '$treeviewExpand'
  }), ['subgroup'])
}, 'VTreeviewGroup');
const VTreeviewGroup = genericComponent()({
  name: 'VTreeviewGroup',
  props: makeVTreeviewGroupProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vListGroupRef = ref();
    const toggleIcon = computed(() => vListGroupRef.value?.isOpen ? props.collapseIcon : props.expandIcon);
    const activatorDefaults = computed(() => ({
      VTreeviewItem: {
        prependIcon: undefined,
        appendIcon: undefined,
        toggleIcon: toggleIcon.value
      }
    }));
    useRender(() => {
      const listGroupProps = VListGroup.filterProps(props);
      return createVNode(VListGroup, mergeProps(listGroupProps, {
        "ref": vListGroupRef,
        "class": ['v-treeview-group', props.class],
        "subgroup": true
      }), {
        ...slots,
        activator: slots.activator ? slotProps => createElementVNode(Fragment, null, [createVNode(VDefaultsProvider, {
          "defaults": activatorDefaults.value
        }, {
          default: () => [slots.activator?.(slotProps)]
        })]) : undefined
      });
    });
    return {};
  }
});

// Types

const VTreeviewSymbol = Symbol.for('vuetify:v-treeview');

// Types

const makeVTreeviewItemProps = propsFactory({
  loading: Boolean,
  hideActions: Boolean,
  hasCustomPrepend: Boolean,
  indentLines: Array,
  toggleIcon: IconValue,
  ...makeVListItemProps({
    slim: true
  })
}, 'VTreeviewItem');
const VTreeviewItem = genericComponent()({
  name: 'VTreeviewItem',
  props: makeVTreeviewItemProps(),
  emits: {
    toggleExpand: value => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const visibleIds = inject$1(VTreeviewSymbol, {
      visibleIds: ref()
    }).visibleIds;
    const vListItemRef = ref();
    const isActivatableGroupActivator = computed(() => vListItemRef.value?.root.activatable.value && vListItemRef.value?.isGroupActivator);
    const vListItemRefIsClickable = computed(() => vListItemRef.value?.link.isClickable.value || props.value != null && !!vListItemRef.value?.list);
    const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || vListItemRefIsClickable.value || isActivatableGroupActivator.value));
    const isFiltered = computed(() => visibleIds.value && !visibleIds.value.has(toRaw(vListItemRef.value?.id)));
    function activateGroupActivator(e) {
      if (isClickable.value && isActivatableGroupActivator.value) {
        vListItemRef.value?.activate(!vListItemRef.value?.isActivated, e);
      }
    }
    function onClickAction(e) {
      e.preventDefault();
      e.stopPropagation();
      emit('toggleExpand', e);
    }
    useRender(() => {
      const listItemProps = VListItem.filterProps(props);
      const hasPrepend = slots.prepend || props.toggleIcon || props.indentLines || props.prependIcon || props.prependAvatar;
      return createVNode(VListItem, mergeProps({
        "ref": vListItemRef
      }, listItemProps, {
        "active": vListItemRef.value?.isActivated || undefined,
        "class": ['v-treeview-item', {
          'v-treeview-item--activatable-group-activator': isActivatableGroupActivator.value,
          'v-treeview-item--filtered': isFiltered.value
        }, props.class],
        "ripple": false,
        "onClick": activateGroupActivator
      }), {
        ...slots,
        prepend: hasPrepend ? slotProps => {
          return createElementVNode(Fragment, null, [props.indentLines && props.indentLines.length > 0 ? createElementVNode("div", {
            "key": "indent-lines",
            "class": "v-treeview-indent-lines",
            "style": {
              '--v-indent-parts': props.indentLines.length
            }
          }, [props.indentLines.map(type => createElementVNode("div", {
            "class": normalizeClass(`v-treeview-indent-line v-treeview-indent-line--${type}`)
          }, null))]) : '', !props.hideActions && createVNode(VListItemAction, {
            "start": true
          }, {
            default: () => [props.toggleIcon ? createElementVNode(Fragment, null, [!slots.toggle ? createVNode(VBtn, {
              "key": "prepend-toggle",
              "density": "compact",
              "icon": props.toggleIcon,
              "loading": props.loading,
              "variant": "text",
              "onClick": onClickAction
            }, {
              loader: () => createVNode(VProgressCircular, {
                "indeterminate": "disable-shrink",
                "size": "20",
                "width": "2"
              }, null)
            }) : createVNode(VDefaultsProvider, {
              "key": "prepend-defaults",
              "defaults": {
                VBtn: {
                  density: 'compact',
                  icon: props.toggleIcon,
                  variant: 'text',
                  loading: props.loading
                },
                VProgressCircular: {
                  indeterminate: 'disable-shrink',
                  size: 20,
                  width: 2
                }
              }
            }, {
              default: () => [slots.toggle({
                ...slotProps,
                loading: props.loading,
                props: {
                  onClick: onClickAction
                }
              })]
            })]) : createElementVNode("div", {
              "class": "v-treeview-item__level"
            }, null)]
          }), !props.hasCustomPrepend ? createElementVNode(Fragment, null, [slots.prepend?.(slotProps), props.prependAvatar && createVNode(VAvatar, {
            "key": "prepend-avatar",
            "density": props.density,
            "image": props.prependAvatar
          }, null), props.prependIcon && createVNode(VIcon, {
            "key": "prepend-icon",
            "density": props.density,
            "icon": props.prependIcon
          }, null)]) : createVNode(VDefaultsProvider, {
            "key": "prepend-defaults",
            "defaults": {
              VAvatar: {
                density: props.density,
                image: props.appendAvatar
              },
              VIcon: {
                density: props.density,
                icon: props.appendIcon
              },
              VListItemAction: {
                start: true
              }
            }
          }, {
            default: () => [slots.prepend?.(slotProps)]
          })]);
        } : undefined
      });
    });
    return forwardRefs({}, vListItemRef);
  }
});

// Types

const makeVTreeviewChildrenProps = propsFactory({
  fluid: Boolean,
  disabled: Boolean,
  loadChildren: Function,
  loadingIcon: {
    type: String,
    default: '$loading'
  },
  items: Array,
  openOnClick: {
    type: Boolean,
    default: undefined
  },
  indeterminateIcon: {
    type: IconValue,
    default: '$checkboxIndeterminate'
  },
  falseIcon: IconValue,
  trueIcon: IconValue,
  returnObject: Boolean,
  activatable: Boolean,
  selectable: Boolean,
  selectedColor: String,
  selectStrategy: [String, Function, Object],
  index: Number,
  isLastGroup: Boolean,
  separateRoots: Boolean,
  parentIndentLines: Array,
  indentLinesVariant: String,
  path: {
    type: Array,
    default: () => []
  },
  ...pick(makeVTreeviewItemProps(), ['hideActions']),
  ...makeDensityProps()
}, 'VTreeviewChildren');
const VTreeviewChildren = genericComponent()({
  name: 'VTreeviewChildren',
  props: makeVTreeviewChildrenProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const isLoading = reactive(new Set());
    const activatorItems = ref([]);
    const isClickOnOpen = computed(() => !props.disabled && (props.openOnClick != null ? props.openOnClick : props.selectable && !props.activatable));
    async function checkChildren(item) {
      try {
        if (!props.items?.length || !props.loadChildren) return;
        if (item?.children?.length === 0) {
          isLoading.add(item.value);
          await props.loadChildren(item.raw);
        }
      } finally {
        isLoading.delete(item.value);
      }
    }
    function selectItem(select, isSelected) {
      if (props.selectable) {
        select(isSelected);
      }
    }
    return () => slots.default?.() ?? props.items?.map((item, index, items) => {
      const {
        children,
        props: itemProps
      } = item;
      const loading = isLoading.has(item.value);
      const nextItemHasChildren = !!items.at(index + 1)?.children;
      const depth = props.path?.length ?? 0;
      const isLast = items.length - 1 === index;
      const treeItemProps = {
        index,
        depth,
        isFirst: index === 0,
        isLast,
        path: [...props.path, index],
        hideAction: props.hideActions
      };
      const indentLines = getIndentLines({
        depth,
        isLast,
        isLastGroup: props.isLastGroup,
        leafLinks: !props.hideActions && !props.fluid,
        separateRoots: props.separateRoots,
        parentIndentLines: props.parentIndentLines,
        variant: props.indentLinesVariant
      });
      const slotsWithItem = {
        toggle: slots.toggle ? slotProps => slots.toggle?.({
          ...slotProps,
          ...treeItemProps,
          item: item.raw,
          internalItem: item,
          loading
        }) : undefined,
        prepend: slotProps => createElementVNode(Fragment, null, [props.selectable && (!children || children && !['leaf', 'single-leaf'].includes(props.selectStrategy)) && createVNode(VListItemAction, {
          "start": true
        }, {
          default: () => [createVNode(VCheckboxBtn, {
            "key": item.value,
            "modelValue": slotProps.isSelected,
            "disabled": props.disabled,
            "loading": loading,
            "color": props.selectedColor,
            "density": props.density,
            "indeterminate": slotProps.isIndeterminate,
            "indeterminateIcon": props.indeterminateIcon,
            "falseIcon": props.falseIcon,
            "trueIcon": props.trueIcon,
            "onUpdate:modelValue": v => selectItem(slotProps.select, v),
            "onClick": e => e.stopPropagation(),
            "onKeydown": e => {
              if (!['Enter', 'Space'].includes(e.key)) return;
              e.stopPropagation();
              selectItem(slotProps.select, slotProps.isSelected);
            }
          }, null)]
        }), slots.prepend?.({
          ...slotProps,
          ...treeItemProps,
          item: item.raw,
          internalItem: item
        })]),
        append: slots.append ? slotProps => slots.append?.({
          ...slotProps,
          ...treeItemProps,
          item: item.raw,
          internalItem: item
        }) : undefined,
        title: slots.title ? slotProps => slots.title?.({
          ...slotProps,
          item: item.raw,
          internalItem: item
        }) : undefined,
        subtitle: slots.subtitle ? slotProps => slots.subtitle?.({
          ...slotProps,
          item: item.raw,
          internalItem: item
        }) : undefined
      };
      const treeviewGroupProps = VTreeviewGroup.filterProps(itemProps);
      const treeviewChildrenProps = VTreeviewChildren.filterProps({
        ...props,
        ...treeItemProps
      });
      return children ? createVNode(VTreeviewGroup, mergeProps(treeviewGroupProps, {
        "value": props.returnObject ? item.raw : treeviewGroupProps?.value,
        "rawId": treeviewGroupProps?.value
      }), {
        activator: _ref2 => {
          let {
            props: activatorProps
          } = _ref2;
          const listItemProps = {
            ...itemProps,
            ...activatorProps,
            value: itemProps?.value,
            onToggleExpand: [() => checkChildren(item), activatorProps.onClick],
            onClick: isClickOnOpen.value ? [() => checkChildren(item), activatorProps.onClick] : () => selectItem(activatorItems.value[index]?.select, !activatorItems.value[index]?.isSelected)
          };
          return renderSlot(slots.header, {
            props: listItemProps,
            item: item.raw,
            internalItem: item,
            loading
          }, () => createVNode(VTreeviewItem, mergeProps({
            "ref": el => activatorItems.value[index] = el
          }, listItemProps, {
            "hasCustomPrepend": !!slots.prepend,
            "hideActions": props.hideActions,
            "indentLines": indentLines.node,
            "value": props.returnObject ? item.raw : itemProps.value,
            "loading": loading
          }), slotsWithItem));
        },
        default: () => createVNode(VTreeviewChildren, mergeProps(treeviewChildrenProps, {
          "items": children,
          "indentLinesVariant": props.indentLinesVariant,
          "parentIndentLines": indentLines.children,
          "isLastGroup": nextItemHasChildren,
          "returnObject": props.returnObject
        }), slots)
      }) : renderSlot(slots.item, {
        props: itemProps,
        item: item.raw,
        internalItem: item
      }, () => {
        if (item.type === 'divider') {
          return renderSlot(slots.divider, {
            props: item.raw
          }, () => createVNode(VDivider, item.props, null));
        }
        if (item.type === 'subheader') {
          return renderSlot(slots.subheader, {
            props: item.raw
          }, () => createVNode(VListSubheader, item.props, null));
        }
        return createVNode(VTreeviewItem, mergeProps(itemProps, {
          "hasCustomPrepend": !!slots.prepend,
          "hideActions": props.hideActions,
          "indentLines": indentLines.leaf,
          "value": props.returnObject ? toRaw(item.raw) : itemProps.value
        }), slotsWithItem);
      });
    });
  }
});

function flatten(items) {
  let flat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  for (const item of items) {
    flat.push(item);
    if (item.children) flatten(item.children, flat);
  }
  return flat;
}
const makeVTreeviewProps = propsFactory({
  openAll: Boolean,
  indentLines: [Boolean, String],
  search: String,
  ...makeFilterProps({
    filterKeys: ['title']
  }),
  ...omit(makeVTreeviewChildrenProps(), ['index', 'path', 'indentLinesVariant', 'parentIndentLines', 'isLastGroup']),
  ...omit(makeVListProps({
    collapseIcon: '$treeviewCollapse',
    expandIcon: '$treeviewExpand',
    slim: true
  }), ['nav', 'openStrategy']),
  modelValue: Array
}, 'VTreeview');
const VTreeview = genericComponent()({
  name: 'VTreeview',
  props: makeVTreeviewProps(),
  emits: {
    'update:opened': val => true,
    'update:activated': val => true,
    'update:selected': val => true,
    'update:modelValue': val => true,
    'click:open': value => true,
    'click:select': value => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const {
      items
    } = useListItems(props);
    const activeColor = toRef(() => props.activeColor);
    const baseColor = toRef(() => props.baseColor);
    const color = toRef(() => props.color);
    const activated = useProxiedModel(props, 'activated');
    const _selected = useProxiedModel(props, 'selected');
    const selected = computed({
      get: () => props.modelValue ?? _selected.value,
      set(val) {
        _selected.value = val;
        emit('update:modelValue', val);
      }
    });
    const vListRef = ref();
    const opened = computed(() => props.openAll ? openAll(items.value) : props.opened);
    const flatItems = computed(() => flatten(items.value));
    const search = toRef(() => props.search);
    const {
      filteredItems
    } = useFilter(props, flatItems, search);
    const visibleIds = computed(() => {
      if (!search.value) return null;
      const getPath = vListRef.value?.getPath;
      if (!getPath) return null;
      return new Set(filteredItems.value.flatMap(item => {
        const itemVal = props.returnObject ? item.raw : item.props.value;
        return [...getPath(itemVal), ...getChildren(itemVal)].map(toRaw);
      }));
    });
    function getChildren(id) {
      const arr = [];
      const queue = (vListRef.value?.children.get(id) ?? []).slice();
      while (queue.length) {
        const child = queue.shift();
        if (!child) continue;
        arr.push(child);
        queue.push(...(vListRef.value?.children.get(child) ?? []).slice());
      }
      return arr;
    }
    function openAll(items) {
      let ids = [];
      for (const i of items) {
        if (!i.children) continue;
        ids.push(props.returnObject ? toRaw(i.raw) : i.value);
        if (i.children) {
          ids = ids.concat(openAll(i.children));
        }
      }
      return ids;
    }
    provide(VTreeviewSymbol, {
      visibleIds
    });
    provideDefaults({
      VTreeviewGroup: {
        activeColor,
        baseColor,
        color,
        collapseIcon: toRef(() => props.collapseIcon),
        expandIcon: toRef(() => props.expandIcon)
      },
      VTreeviewItem: {
        activeClass: toRef(() => props.activeClass),
        activeColor,
        baseColor,
        color,
        density: toRef(() => props.density),
        disabled: toRef(() => props.disabled),
        lines: toRef(() => props.lines),
        variant: toRef(() => props.variant)
      }
    });
    useRender(() => {
      const listProps = VList.filterProps(props);
      const treeviewChildrenProps = VTreeviewChildren.filterProps(props);
      const indentLinesVariant = typeof props.indentLines === 'boolean' ? 'default' : props.indentLines;
      return createVNode(VList, mergeProps({
        "ref": vListRef
      }, listProps, {
        "class": ['v-treeview', {
          'v-treeview--fluid': props.fluid
        }, props.class],
        "openStrategy": "multiple",
        "style": props.style,
        "opened": opened.value,
        "activated": activated.value,
        "onUpdate:activated": $event => activated.value = $event,
        "selected": selected.value,
        "onUpdate:selected": $event => selected.value = $event
      }), {
        default: () => [createVNode(VTreeviewChildren, mergeProps(treeviewChildrenProps, {
          "density": props.density,
          "returnObject": props.returnObject,
          "items": items.value,
          "parentIndentLines": props.indentLines ? [] : undefined,
          "indentLinesVariant": indentLinesVariant
        }), slots)]
      });
    });
    return {};
  }
});

// Composables

// Types

const VValidation = genericComponent()({
  name: 'VValidation',
  props: makeValidationProps(),
  emits: {
    'update:modelValue': value => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const validation = useValidation(props, 'validation');
    return () => slots.default?.(validation);
  }
});

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  VAlert: VAlert,
  VAlertTitle: VAlertTitle,
  VApp: VApp,
  VAppBar: VAppBar,
  VAppBarNavIcon: VAppBarNavIcon,
  VAppBarTitle: VAppBarTitle,
  VAutocomplete: VAutocomplete,
  VAvatar: VAvatar,
  VBadge: VBadge,
  VBanner: VBanner,
  VBannerActions: VBannerActions,
  VBannerText: VBannerText,
  VBottomNavigation: VBottomNavigation,
  VBottomSheet: VBottomSheet,
  VBreadcrumbs: VBreadcrumbs,
  VBreadcrumbsDivider: VBreadcrumbsDivider,
  VBreadcrumbsItem: VBreadcrumbsItem,
  VBtn: VBtn,
  VBtnGroup: VBtnGroup,
  VBtnToggle: VBtnToggle,
  VCard: VCard,
  VCardActions: VCardActions,
  VCardItem: VCardItem,
  VCardSubtitle: VCardSubtitle,
  VCardText: VCardText,
  VCardTitle: VCardTitle,
  VCarousel: VCarousel,
  VCarouselItem: VCarouselItem,
  VCheckbox: VCheckbox,
  VCheckboxBtn: VCheckboxBtn,
  VChip: VChip,
  VChipGroup: VChipGroup,
  VClassIcon: VClassIcon,
  VCode: VCode,
  VCol: VCol,
  VColorPicker: VColorPicker,
  VCombobox: VCombobox,
  VComponentIcon: VComponentIcon,
  VConfirmEdit: VConfirmEdit,
  VContainer: VContainer,
  VCounter: VCounter,
  VDataIterator: VDataIterator,
  VDataTable: VDataTable,
  VDataTableFooter: VDataTableFooter,
  VDataTableHeaders: VDataTableHeaders,
  VDataTableRow: VDataTableRow,
  VDataTableRows: VDataTableRows,
  VDataTableServer: VDataTableServer,
  VDataTableVirtual: VDataTableVirtual,
  VDatePicker: VDatePicker,
  VDatePickerControls: VDatePickerControls,
  VDatePickerHeader: VDatePickerHeader,
  VDatePickerMonth: VDatePickerMonth,
  VDatePickerMonths: VDatePickerMonths,
  VDatePickerYears: VDatePickerYears,
  VDefaultsProvider: VDefaultsProvider,
  VDialog: VDialog,
  VDialogBottomTransition: VDialogBottomTransition,
  VDialogTopTransition: VDialogTopTransition,
  VDialogTransition: VDialogTransition,
  VDivider: VDivider,
  VEmptyState: VEmptyState,
  VExpandTransition: VExpandTransition,
  VExpandXTransition: VExpandXTransition,
  VExpansionPanel: VExpansionPanel,
  VExpansionPanelText: VExpansionPanelText,
  VExpansionPanelTitle: VExpansionPanelTitle,
  VExpansionPanels: VExpansionPanels,
  VFab: VFab,
  VFabTransition: VFabTransition,
  VFadeTransition: VFadeTransition,
  VField: VField,
  VFieldLabel: VFieldLabel,
  VFileInput: VFileInput,
  VFooter: VFooter,
  VForm: VForm,
  VHover: VHover,
  VIcon: VIcon,
  VImg: VImg,
  VInfiniteScroll: VInfiniteScroll,
  VInput: VInput,
  VItem: VItem,
  VItemGroup: VItemGroup,
  VKbd: VKbd,
  VLabel: VLabel,
  VLayout: VLayout,
  VLayoutItem: VLayoutItem,
  VLazy: VLazy,
  VLigatureIcon: VLigatureIcon,
  VList: VList,
  VListGroup: VListGroup,
  VListImg: VListImg,
  VListItem: VListItem,
  VListItemAction: VListItemAction,
  VListItemMedia: VListItemMedia,
  VListItemSubtitle: VListItemSubtitle,
  VListItemTitle: VListItemTitle,
  VListSubheader: VListSubheader,
  VLocaleProvider: VLocaleProvider,
  VMain: VMain,
  VMenu: VMenu,
  VMessages: VMessages,
  VNavigationDrawer: VNavigationDrawer,
  VNoSsr: VNoSsr,
  VNumberInput: VNumberInput,
  VOtpInput: VOtpInput,
  VOverlay: VOverlay,
  VPagination: VPagination,
  VParallax: VParallax,
  VProgressCircular: VProgressCircular,
  VProgressLinear: VProgressLinear,
  VRadio: VRadio,
  VRadioGroup: VRadioGroup,
  VRangeSlider: VRangeSlider,
  VRating: VRating,
  VResponsive: VResponsive,
  VRow: VRow,
  VScaleTransition: VScaleTransition,
  VScrollXReverseTransition: VScrollXReverseTransition,
  VScrollXTransition: VScrollXTransition,
  VScrollYReverseTransition: VScrollYReverseTransition,
  VScrollYTransition: VScrollYTransition,
  VSelect: VSelect,
  VSelectionControl: VSelectionControl,
  VSelectionControlGroup: VSelectionControlGroup,
  VSheet: VSheet,
  VSkeletonLoader: VSkeletonLoader,
  VSlideGroup: VSlideGroup,
  VSlideGroupItem: VSlideGroupItem,
  VSlideXReverseTransition: VSlideXReverseTransition,
  VSlideXTransition: VSlideXTransition,
  VSlideYReverseTransition: VSlideYReverseTransition,
  VSlideYTransition: VSlideYTransition,
  VSlider: VSlider,
  VSnackbar: VSnackbar,
  VSnackbarQueue: VSnackbarQueue,
  VSpacer: VSpacer,
  VSparkline: VSparkline,
  VSpeedDial: VSpeedDial,
  VStepper: VStepper,
  VStepperActions: VStepperActions,
  VStepperHeader: VStepperHeader,
  VStepperItem: VStepperItem,
  VStepperWindow: VStepperWindow,
  VStepperWindowItem: VStepperWindowItem,
  VSvgIcon: VSvgIcon,
  VSwitch: VSwitch,
  VSystemBar: VSystemBar,
  VTab: VTab,
  VTable: VTable,
  VTabs: VTabs,
  VTabsWindow: VTabsWindow,
  VTabsWindowItem: VTabsWindowItem,
  VTextField: VTextField,
  VTextarea: VTextarea,
  VThemeProvider: VThemeProvider,
  VTimePicker: VTimePicker,
  VTimePickerClock: VTimePickerClock,
  VTimePickerControls: VTimePickerControls,
  VTimeline: VTimeline,
  VTimelineItem: VTimelineItem,
  VToolbar: VToolbar,
  VToolbarItems: VToolbarItems,
  VToolbarTitle: VToolbarTitle,
  VTooltip: VTooltip,
  VTreeview: VTreeview,
  VTreeviewGroup: VTreeviewGroup,
  VTreeviewItem: VTreeviewItem,
  VValidation: VValidation,
  VVirtualScroll: VVirtualScroll,
  VWindow: VWindow,
  VWindowItem: VWindowItem
});

// Types

function mounted$2(el, binding) {
  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    once,
    immediate,
    ...modifierKeys
  } = modifiers;
  const defaultValue = !Object.keys(modifierKeys).length;
  const {
    handler,
    options
  } = typeof value === 'object' ? value : {
    handler: value,
    options: {
      attributes: modifierKeys?.attr ?? defaultValue,
      characterData: modifierKeys?.char ?? defaultValue,
      childList: modifierKeys?.child ?? defaultValue,
      subtree: modifierKeys?.sub ?? defaultValue
    }
  };
  const observer = new MutationObserver(function () {
    let mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let observer = arguments.length > 1 ? arguments[1] : undefined;
    handler?.(mutations, observer);
    if (once) unmounted$2(el, binding);
  });
  if (immediate) handler?.([], observer);
  el._mutate = Object(el._mutate);
  el._mutate[binding.instance.$.uid] = {
    observer
  };
  observer.observe(el, options);
}
function unmounted$2(el, binding) {
  if (!el._mutate?.[binding.instance.$.uid]) return;
  el._mutate[binding.instance.$.uid].observer.disconnect();
  delete el._mutate[binding.instance.$.uid];
}
const Mutate = {
  mounted: mounted$2,
  unmounted: unmounted$2
};

// Types

function mounted$1(el, binding) {
  const handler = binding.value;
  const options = {
    passive: !binding.modifiers?.active
  };
  window.addEventListener('resize', handler, options);
  el._onResize = Object(el._onResize);
  el._onResize[binding.instance.$.uid] = {
    handler,
    options
  };
  if (!binding.modifiers?.quiet) {
    handler();
  }
}
function unmounted$1(el, binding) {
  if (!el._onResize?.[binding.instance.$.uid]) return;
  const {
    handler,
    options
  } = el._onResize[binding.instance.$.uid];
  window.removeEventListener('resize', handler, options);
  delete el._onResize[binding.instance.$.uid];
}
const Resize = {
  mounted: mounted$1,
  unmounted: unmounted$1
};

// Types

function mounted(el, binding) {
  const {
    self = false
  } = binding.modifiers ?? {};
  const value = binding.value;
  const options = typeof value === 'object' && value.options || {
    passive: true
  };
  const handler = typeof value === 'function' || 'handleEvent' in value ? value : value.handler;
  const target = self ? el : binding.arg ? document.querySelector(binding.arg) : window;
  if (!target) return;
  target.addEventListener('scroll', handler, options);
  el._onScroll = Object(el._onScroll);
  el._onScroll[binding.instance.$.uid] = {
    handler,
    options,
    // Don't reference self
    target: self ? undefined : target
  };
}
function unmounted(el, binding) {
  if (!el._onScroll?.[binding.instance.$.uid]) return;
  const {
    handler,
    options,
    target = el
  } = el._onScroll[binding.instance.$.uid];
  target.removeEventListener('scroll', handler, options);
  delete el._onScroll[binding.instance.$.uid];
}
function updated(el, binding) {
  if (binding.value === binding.oldValue) return;
  unmounted(el, binding);
  mounted(el, binding);
}
const Scroll = {
  mounted,
  unmounted,
  updated
};

// Utilities

// Types

function useDirectiveComponent(component, props) {
  const concreteComponent = typeof component === 'string' ? resolveComponent(component) : component;
  const hook = mountComponent(concreteComponent, props);
  return {
    mounted: hook,
    updated: hook,
    unmounted(el) {
      render(null, el);
    }
  };
}
function mountComponent(component, props) {
  return function (el, binding, vnode) {
    const _props = typeof props === 'function' ? props(binding) : props;
    const text = binding.value?.text ?? binding.value ?? _props?.text;
    const value = isObject(binding.value) ? binding.value : {};

    // Get the children from the props or directive value, or the element's children
    const children = () => text ?? el.textContent;

    // If vnode.ctx is the same as the instance, then we're bound to a plain element
    // and need to find the nearest parent component instance to inherit provides from
    const provides = (vnode.ctx === binding.instance.$ ? findComponentParent(vnode, binding.instance.$)?.provides : vnode.ctx?.provides) ?? binding.instance.$.provides;
    const node = h(component, mergeProps(_props, value), children);
    node.appContext = Object.assign(Object.create(null), binding.instance.$.appContext, {
      provides
    });
    render(node, el);
  };
}
function findComponentParent(vnode, root) {
  // Walk the tree from root until we find the child vnode
  const stack = new Set();
  const walk = children => {
    for (const child of children) {
      if (!child) continue;
      if (child === vnode || child.el && vnode.el && child.el === vnode.el) {
        return true;
      }
      stack.add(child);
      let result;
      if (child.suspense) {
        result = walk([child.ssContent]);
      } else if (Array.isArray(child.children)) {
        result = walk(child.children);
      } else if (child.component?.vnode) {
        result = walk([child.component?.subTree]);
      }
      if (result) {
        return result;
      }
      stack.delete(child);
    }
    return false;
  };
  if (!walk([root.subTree])) {
    consoleError('Could not find original vnode, component will not inherit provides');
    return root;
  }

  // Return the first component parent
  const result = Array.from(stack).reverse();
  for (const child of result) {
    if (child.component) {
      return child.component;
    }
  }
  return root;
}

// Components

// Types

const Tooltip = useDirectiveComponent(VTooltip, binding => {
  return {
    activator: 'parent',
    location: binding.arg?.replace('-', ' '),
    text: typeof binding.value === 'boolean' ? undefined : binding.value
  };
});

var directives = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ClickOutside: ClickOutside,
  Intersect: Intersect,
  Mutate: Mutate,
  Resize: Resize,
  Ripple: Ripple,
  Scroll: Scroll,
  Tooltip: Tooltip,
  Touch: Touch
});

// Composables
function createVuetify$1() {
  let vuetify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    blueprint,
    ...rest
  } = vuetify;
  const options = mergeDeep(blueprint, rest);
  const {
    aliases = {},
    components = {},
    directives = {}
  } = options;
  const scope = effectScope();
  return scope.run(() => {
    const defaults = createDefaults(options.defaults);
    const display = createDisplay(options.display, options.ssr);
    const theme = createTheme(options.theme);
    const icons = createIcons(options.icons);
    const locale = createLocale(options.locale);
    const date = createDate(options.date, locale);
    const goTo = createGoTo(options.goTo, locale);
    function install(app) {
      for (const key in directives) {
        app.directive(key, directives[key]);
      }
      for (const key in components) {
        app.component(key, components[key]);
      }
      for (const key in aliases) {
        app.component(key, defineComponent({
          ...aliases[key],
          name: key,
          aliasName: aliases[key].name
        }));
      }
      const appScope = effectScope();
      appScope.run(() => {
        theme.install(app);
      });
      app.onUnmount(() => appScope.stop());
      app.provide(DefaultsSymbol, defaults);
      app.provide(DisplaySymbol, display);
      app.provide(ThemeSymbol, theme);
      app.provide(IconSymbol, icons);
      app.provide(LocaleSymbol, locale);
      app.provide(DateOptionsSymbol, date.options);
      app.provide(DateAdapterSymbol, date.instance);
      app.provide(GoToSymbol, goTo);
      if (IN_BROWSER && options.ssr) {
        if (app.$nuxt) {
          app.$nuxt.hook('app:suspense:resolve', () => {
            display.update();
          });
        } else {
          const {
            mount
          } = app;
          app.mount = function () {
            const vm = mount(...arguments);
            nextTick(() => display.update());
            app.mount = mount;
            return vm;
          };
        }
      }
      if (typeof __VUE_OPTIONS_API__ !== 'boolean' || __VUE_OPTIONS_API__) {
        app.mixin({
          computed: {
            $vuetify() {
              return reactive({
                defaults: inject.call(this, DefaultsSymbol),
                display: inject.call(this, DisplaySymbol),
                theme: inject.call(this, ThemeSymbol),
                icons: inject.call(this, IconSymbol),
                locale: inject.call(this, LocaleSymbol),
                date: inject.call(this, DateAdapterSymbol)
              });
            }
          }
        });
      }
    }
    function unmount() {
      scope.stop();
    }
    return {
      install,
      unmount,
      defaults,
      display,
      theme,
      icons,
      locale,
      date,
      goTo
    };
  });
}
const version$1 = "3.10.0";
createVuetify$1.version = version$1;

// Vue's inject() can only be used in setup
function inject(key) {
  const vm = this.$;
  const provides = vm.parent?.provides ?? vm.vnode.appContext?.provides;
  if (provides && key in provides) {
    return provides[key];
  }
}

/* eslint-disable local-rules/sort-imports */


// Types

const createVuetify = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return createVuetify$1({
    components,
    directives,
    ...options
  });
};
const version = "3.10.0";
createVuetify.version = version;

export { index as blueprints, components, createVuetify, directives, useDate, useDefaults, useDisplay, useGoTo, useHotkey, useLayout, useLocale, useMask, useRtl, useTheme, version };
//# sourceMappingURL=vuetify.esm.js.map
